// Commandes client.
//
// Les commandes de démonstration servent de base ; celles passées depuis le
// tunnel de commande sont ajoutées dans localStorage, faute de backend. Le jour
// où l'API existe, seules les quatre fonctions du bas changent.

export type OrderStatus = "pending" | "processing" | "shipping" | "delivered" | "cancelled";

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
  status: string;
  date: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
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

const STORAGE_KEY = "btp-orders";

const formatDate = (date: Date) => date.toLocaleDateString("fr-FR");
const formatTime = (date: Date) =>
  date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

const seedOrders: Order[] = [
  {
    id: "1234",
    date: "05/01/2026",
    createdAt: new Date(2026, 0, 5, 10, 30).toISOString(),
    items: [
      { name: "Sac de ciment 35kg", quantity: 10, price: 8.99 },
      { name: "Sable 25kg", quantity: 5, price: 4.5 },
    ],
    subtotal: 112.4,
    deliveryFee: 0,
    total: 112.4,
    status: "shipping",
    shippingAddress: {
      name: "Jean Dupont",
      street: "123 Rue de la Construction",
      city: "Paris",
      postalCode: "75001",
      phone: "06 12 34 56 78",
    },
    paymentMethod: "Carte bancaire ****4242",
    deliveryOption: "Standard",
    trackingNumber: "FR123456789",
    estimatedDelivery: "07/01/2026",
    timeline: [
      { status: "Commande confirmée", date: "05/01/2026", time: "10:30", completed: true },
      { status: "En préparation", date: "05/01/2026", time: "14:15", completed: true },
      { status: "Expédiée", date: "06/01/2026", time: "09:00", completed: true },
      {
        status: "En cours de livraison",
        date: "07/01/2026",
        time: "08:30",
        completed: false,
        current: true,
      },
      { status: "Livrée", date: "", time: "", completed: false },
    ],
  },
  {
    id: "1201",
    date: "28/12/2025",
    createdAt: new Date(2025, 11, 28, 11, 0).toISOString(),
    items: [
      { name: "Parpaing 20x20x50", quantity: 50, price: 2.1 },
      { name: "Fer à béton 10mm", quantity: 20, price: 5.5 },
      { name: "Fil de fer recuit", quantity: 2, price: 8.99 },
    ],
    subtotal: 232.98,
    deliveryFee: 0,
    total: 232.98,
    status: "delivered",
    shippingAddress: {
      name: "Jean Dupont",
      street: "123 Rue de la Construction",
      city: "Paris",
      postalCode: "75001",
      phone: "06 12 34 56 78",
    },
    paymentMethod: "Carte bancaire ****4242",
    deliveryOption: "Standard",
    trackingNumber: "FR987654321",
    timeline: [
      { status: "Commande confirmée", date: "28/12/2025", time: "11:00", completed: true },
      { status: "En préparation", date: "28/12/2025", time: "15:30", completed: true },
      { status: "Expédiée", date: "29/12/2025", time: "08:45", completed: true },
      { status: "En cours de livraison", date: "30/12/2025", time: "07:00", completed: true },
      { status: "Livrée", date: "30/12/2025", time: "14:22", completed: true },
    ],
  },
  {
    id: "1189",
    date: "20/12/2025",
    createdAt: new Date(2025, 11, 20, 9, 15).toISOString(),
    items: [{ name: "Plaque de plâtre BA13", quantity: 15, price: 12.99 }],
    subtotal: 194.85,
    deliveryFee: 0,
    total: 194.85,
    status: "delivered",
    shippingAddress: {
      name: "Jean Dupont",
      street: "123 Rue de la Construction",
      city: "Paris",
      postalCode: "75001",
      phone: "06 12 34 56 78",
    },
    paymentMethod: "Carte bancaire ****4242",
    deliveryOption: "Standard",
    trackingNumber: "FR456123789",
    timeline: [
      { status: "Commande confirmée", date: "20/12/2025", time: "09:15", completed: true },
      { status: "En préparation", date: "20/12/2025", time: "13:40", completed: true },
      { status: "Expédiée", date: "21/12/2025", time: "08:10", completed: true },
      { status: "En cours de livraison", date: "22/12/2025", time: "07:30", completed: true },
      { status: "Livrée", date: "22/12/2025", time: "11:05", completed: true },
    ],
  },
  {
    id: "1156",
    date: "10/12/2025",
    createdAt: new Date(2025, 11, 10, 16, 45).toISOString(),
    items: [
      { name: "Carrelage sol 60x60", quantity: 8, price: 35.0 },
      { name: "Colle carrelage 25kg", quantity: 3, price: 18.5 },
    ],
    subtotal: 335.5,
    deliveryFee: 0,
    total: 335.5,
    status: "delivered",
    shippingAddress: {
      name: "Jean Dupont",
      street: "123 Rue de la Construction",
      city: "Paris",
      postalCode: "75001",
      phone: "06 12 34 56 78",
    },
    paymentMethod: "Carte bancaire ****4242",
    deliveryOption: "Standard",
    trackingNumber: "FR321654987",
    timeline: [
      { status: "Commande confirmée", date: "10/12/2025", time: "16:45", completed: true },
      { status: "En préparation", date: "11/12/2025", time: "09:20", completed: true },
      { status: "Expédiée", date: "11/12/2025", time: "17:00", completed: true },
      { status: "En cours de livraison", date: "12/12/2025", time: "08:00", completed: true },
      { status: "Livrée", date: "12/12/2025", time: "15:30", completed: true },
    ],
  },
];

const readPlacedOrders = (): Order[] => {
  if (typeof window === "undefined") return [];

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

/** Toutes les commandes, de la plus récente à la plus ancienne. */
export const getOrders = (): Order[] =>
  [...readPlacedOrders(), ...seedOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

export const getOrderById = (id?: string): Order | undefined =>
  getOrders().find((order) => order.id === id);

export interface PlaceOrderInput {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  deliveryOption: string;
  /** Délai de livraison annoncé, en jours. */
  deliveryDays: number;
}

/** Enregistre une nouvelle commande et renvoie la commande créée. */
export const placeOrder = (input: PlaceOrderInput): Order => {
  const now = new Date();
  const estimated = new Date(now);
  estimated.setDate(estimated.getDate() + input.deliveryDays);

  const order: Order = {
    // Référence lisible et unique dans le temps, faute de séquence côté serveur.
    id: `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getTime(),
    ).slice(-5)}`,
    date: formatDate(now),
    createdAt: now.toISOString(),
    items: input.items,
    subtotal: input.subtotal,
    deliveryFee: input.deliveryFee,
    total: input.subtotal + input.deliveryFee,
    status: "processing",
    shippingAddress: input.shippingAddress,
    paymentMethod: input.paymentMethod,
    deliveryOption: input.deliveryOption,
    estimatedDelivery: formatDate(estimated),
    timeline: [
      { status: "Commande confirmée", date: formatDate(now), time: formatTime(now), completed: true },
      {
        status: "En préparation",
        date: formatDate(now),
        time: formatTime(now),
        completed: false,
        current: true,
      },
      { status: "Expédiée", date: "", time: "", completed: false },
      { status: "En cours de livraison", date: "", time: "", completed: false },
      { status: "Livrée", date: "", time: "", completed: false },
    ],
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...readPlacedOrders()]));

  return order;
};
