import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured, requireSupabase } from "@/lib/supabase";

/**
 * Réservations d'équipement.
 *
 * Réserver n'écrivait nulle part : la boîte de dialogue affichait une
 * confirmation et l'intention était perdue. C'est pourtant le cœur du métier,
 * et la seule partie du domaine qui n'avait aucun équivalent côté interface.
 */

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  reference: string;
  equipmentId: string;
  equipmentName: string;
  /** Loueur de l'équipement, pour la vue du locataire. */
  ownerName: string;
  /** Locataire, pour la vue du loueur. */
  renterName: string;
  startDate: string;
  endDate: string;
  days: number;
  pricePerDay: number;
  deposit: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
}

export interface CreateBookingInput {
  equipmentId: string;
  /** Jours retenus, au format ISO. */
  dates: string[];
  pricePerDay: number;
  deposit: number;
}

/**
 * Côté de la réservation que l'on regarde. Les règles de sécurité laissent les
 * deux parties lire la même ligne ; c'est l'écran qui choisit son point de vue.
 */
export type BookingScope = "renter" | "owner";

const BOOKING_COLUMNS = `
  id, reference, equipment_id, renter_name, start_date, end_date, days,
  price_per_day, deposit, total, status, created_at,
  equipment!inner (name, owner_name, owner_id)
`;

/* eslint-disable @typescript-eslint/no-explicit-any -- lignes brutes de PostgREST */
const toBooking = (row: any): Booking => ({
  id: row.id,
  reference: row.reference,
  equipmentId: row.equipment_id,
  equipmentName: row.equipment?.name ?? "",
  ownerName: row.equipment?.owner_name ?? "",
  renterName: row.renter_name ?? "",
  startDate: row.start_date,
  endDate: row.end_date,
  days: row.days,
  pricePerDay: Number(row.price_per_day),
  deposit: Number(row.deposit),
  total: Number(row.total),
  status: row.status,
  createdAt: row.created_at,
});
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Référence lisible, faute de séquence côté serveur. */
const buildReference = () => {
  const now = new Date();
  return `R${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getTime(),
  ).slice(-5)}`;
};

/**
 * Réservations de l'utilisateur courant, vues du côté demandé.
 *
 * Le filtre s'ajoute aux règles de sécurité, il ne les remplace pas : elles
 * bornent déjà ce qui est lisible, on ne fait ici que retenir un point de vue.
 */
export const useBookings = (scope: BookingScope) =>
  useQuery({
    queryKey: ["bookings", scope],
    queryFn: async (): Promise<Booking[]> => {
      if (!isSupabaseConfigured) return [];

      const supabase = requireSupabase();
      const { data: session } = await supabase.auth.getUser();
      if (!session.user) return [];

      let request = supabase
        .from("bookings")
        .select(BOOKING_COLUMNS)
        .order("start_date", { ascending: false });

      request =
        scope === "renter"
          ? request.eq("renter_id", session.user.id)
          : request.eq("equipment.owner_id", session.user.id);

      const { data, error } = await request;
      if (error) throw error;
      return (data ?? []).map(toBooking);
    },
  });

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBookingInput): Promise<Booking> => {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase n'est pas configuré : réservation impossible.");
      }

      const supabase = requireSupabase();
      const { data: session } = await supabase.auth.getUser();
      if (!session.user) throw new Error("Session expirée.");

      const sorted = [...input.dates].sort();
      const days = sorted.length;

      const { data, error } = await supabase
        .from("bookings")
        .insert({
          reference: buildReference(),
          equipment_id: input.equipmentId,
          renter_id: session.user.id,
          start_date: sorted[0],
          end_date: sorted[days - 1],
          days,
          price_per_day: input.pricePerDay,
          deposit: input.deposit,
          total: input.pricePerDay * days,
        })
        .select(BOOKING_COLUMNS)
        .single();

      if (error) throw error;
      return toBooking(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

/** Avancement d'une réservation : accepter, démarrer, clore, annuler. */
export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const { error } = await requireSupabase()
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
