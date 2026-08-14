import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured, requireSupabase } from "@/lib/supabase";

/**
 * Commandes de matériaux.
 *
 * Les commandes vivaient dans localStorage : elles disparaissaient au premier
 * nettoyage du navigateur et n'existaient que sur la machine qui les avait
 * passées. Elles sont désormais écrites dans `orders` et `order_items`.
 *
 * Le suivi n'est pas stocké : c'est une lecture du statut, reconstruite à
 * l'affichage. Une étape en base pourrait contredire le statut ; dérivée, non.
 */

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  unit?: string;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface TimelineStep {
  /** Clé de traduction : l'étape est rendue dans la langue de l'utilisateur. */
  status: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  /** Référence lisible, celle qui apparaît dans les adresses. */
  id: string;
  /** Date d'affichage au format jj/mm/aaaa. */
  date: string;
  /** Date ISO, utilisée pour les tris et les filtres. */
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  deliveryOption: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  timeline: TimelineStep[];
}

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("fr-FR");

/**
 * Étapes du suivi, dans l'ordre. Chaque statut de la base marque une étape
 * atteinte ; les suivantes restent à venir, sans date inventée.
 */
const TIMELINE: { key: string; status: OrderStatus }[] = [
  { key: "ord.step.confirmed", status: "pending" },
  { key: "ord.step.preparing", status: "processing" },
  { key: "ord.step.shipped", status: "shipping" },
  { key: "ord.step.delivered", status: "delivered" },
];

const buildTimeline = (status: OrderStatus, createdAt: string): TimelineStep[] => {
  // Une commande annulée n'a pas de suivi : elle s'arrête à sa confirmation.
  if (status === "cancelled") {
    return [
      { status: "ord.step.confirmed", date: formatDate(createdAt), completed: true },
      { status: "ord.step.cancelled", date: "", completed: false, current: true },
    ];
  }

  const reached = TIMELINE.findIndex((step) => step.status === status);

  return TIMELINE.map((step, index) => ({
    status: step.key,
    // Seule la confirmation a une date sûre ; les autres ne sont pas horodatées.
    date: index === 0 ? formatDate(createdAt) : "",
    completed: index < reached,
    current: index === reached,
  }));
};

/* eslint-disable @typescript-eslint/no-explicit-any -- lignes brutes de PostgREST */
const toOrder = (row: any): Order => ({
  id: row.reference,
  date: formatDate(row.created_at),
  createdAt: row.created_at,
  items: (row.order_items ?? []).map((item: any) => ({
    name: item.name,
    quantity: Number(item.quantity),
    price: Number(item.unit_price),
    unit: item.unit ?? undefined,
  })),
  subtotal: Number(row.subtotal),
  deliveryFee: Number(row.delivery_fee),
  total: Number(row.total),
  status: row.status,
  shippingAddress: row.shipping_address,
  paymentMethod: row.payment_method,
  deliveryOption: row.delivery_option,
  trackingNumber: row.tracking_number ?? undefined,
  estimatedDelivery: row.estimated_delivery
    ? formatDate(row.estimated_delivery)
    : undefined,
  timeline: buildTimeline(row.status, row.created_at),
});
/* eslint-enable @typescript-eslint/no-explicit-any */

const ORDER_COLUMNS = `
  id, reference, status, subtotal, delivery_fee, total, shipping_address,
  payment_method, delivery_option, tracking_number, estimated_delivery, created_at,
  order_items (name, unit, quantity, unit_price)
`;

/** Commandes de l'utilisateur courant, de la plus récente à la plus ancienne. */
export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: async (): Promise<Order[]> => {
      if (!isSupabaseConfigured) return [];

      const { data, error } = await requireSupabase()
        .from("orders")
        .select(ORDER_COLUMNS)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []).map(toOrder);
    },
  });

/** Une commande, retrouvée par sa référence — celle qui figure dans l'adresse. */
export const useOrder = (reference?: string) =>
  useQuery({
    queryKey: ["orders", reference],
    enabled: Boolean(reference),
    queryFn: async (): Promise<Order | null> => {
      if (!isSupabaseConfigured) return null;

      const { data, error } = await requireSupabase()
        .from("orders")
        .select(ORDER_COLUMNS)
        .eq("reference", reference as string)
        .maybeSingle();

      if (error) throw error;
      return data ? toOrder(data) : null;
    },
  });

export interface PlaceOrderInput {
  items: (OrderItem & { materialId?: string })[];
  subtotal: number;
  deliveryFee: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  deliveryOption: string;
  /** Délai de livraison annoncé, en jours. */
  deliveryDays: number;
}

/** Référence lisible, faute de séquence côté serveur. */
const buildReference = (now: Date) =>
  `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getTime(),
  ).slice(-5)}`;

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PlaceOrderInput): Promise<Order> => {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase n'est pas configuré : commande impossible.");
      }

      const supabase = requireSupabase();
      const { data: session } = await supabase.auth.getUser();
      if (!session.user) throw new Error("Session expirée.");

      const now = new Date();
      const estimated = new Date(now);
      estimated.setDate(estimated.getDate() + input.deliveryDays);

      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          reference: buildReference(now),
          user_id: session.user.id,
          status: "processing",
          subtotal: input.subtotal,
          delivery_fee: input.deliveryFee,
          total: input.subtotal + input.deliveryFee,
          shipping_address: input.shippingAddress,
          payment_method: input.paymentMethod,
          delivery_option: input.deliveryOption,
          estimated_delivery: estimated.toISOString().slice(0, 10),
        })
        .select("id, reference")
        .single();

      if (error) throw error;

      const { error: itemsError } = await supabase.from("order_items").insert(
        input.items.map((item) => ({
          order_id: order.id,
          material_id: item.materialId ?? null,
          name: item.name,
          unit: item.unit ?? null,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      );

      // La commande est déjà écrite : signaler l'échec des lignes vaut mieux
      // que laisser croire à une commande complète.
      if (itemsError) throw itemsError;

      const { data: created, error: readError } = await supabase
        .from("orders")
        .select(ORDER_COLUMNS)
        .eq("id", order.id)
        .single();

      if (readError) throw readError;
      return toOrder(created);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
