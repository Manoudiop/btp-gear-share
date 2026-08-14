import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured, requireSupabase } from "@/lib/supabase";
import type { Listing, ListingStatus, ListingAvailability } from "./types";

/**
 * Annonces du parc de location, vues côté back-office.
 *
 * Le loueur y voit sa disponibilité et ses revenus, l'administration y voit le
 * statut de modération et la mise en avant : un seul jeu de données pour les
 * deux, mais pas le même périmètre.
 *
 * Les annonces vivaient dans localStorage : approuver une annonce depuis le
 * back-office ne changeait rien pour personne d'autre que le navigateur qui
 * avait cliqué.
 */

/**
 * Périmètre demandé. Les règles de sécurité laissent un loueur lire tout le
 * catalogue approuvé — c'est ce qui alimente les pages publiques — donc « ses
 * annonces » doit être demandé explicitement.
 */
export type ListingScope = "owner" | "admin";

const LISTING_COLUMNS = `
  id, name, category, price_per_day, owner_id, owner_name, status,
  availability, featured, rating, image_url
`;

/* eslint-disable @typescript-eslint/no-explicit-any -- lignes brutes de PostgREST */
const toListing = (row: any, rentals: number, income: number): Listing => ({
  id: row.id,
  name: row.name,
  category: row.category,
  price: Number(row.price_per_day),
  owner: row.owner_name ?? "",
  ownerId: row.owner_id,
  status: row.status,
  availability: row.availability,
  featured: row.featured,
  rating: Number(row.rating ?? 0),
  rentals,
  income,
  image: row.image_url ?? "/placeholder.svg",
});
/* eslint-enable @typescript-eslint/no-explicit-any */

export const useListings = (scope: ListingScope) =>
  useQuery({
    queryKey: ["listings", scope],
    queryFn: async (): Promise<Listing[]> => {
      if (!isSupabaseConfigured) return [];

      const supabase = requireSupabase();
      const { data: session } = await supabase.auth.getUser();
      if (!session.user) return [];

      let request = supabase.from("equipment").select(LISTING_COLUMNS).order("name");
      if (scope === "owner") request = request.eq("owner_id", session.user.id);

      const { data, error } = await request;
      if (error) throw error;

      // Locations et revenus se déduisent des réservations, plutôt que d'être
      // recopiés sur l'annonce où ils dériveraient du réel.
      const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("equipment_id, total, status");

      if (bookingsError) throw bookingsError;

      const counts = new Map<string, { rentals: number; income: number }>();
      for (const booking of bookings ?? []) {
        if (booking.status === "cancelled") continue;

        const current = counts.get(booking.equipment_id) ?? { rentals: 0, income: 0 };
        current.rentals += 1;
        // Seule une location terminée a rapporté quelque chose.
        if (booking.status === "completed") current.income += Number(booking.total);
        counts.set(booking.equipment_id, current);
      }

      return (data ?? []).map((row) => {
        const totals = counts.get(row.id) ?? { rentals: 0, income: 0 };
        return toListing(row, totals.rentals, totals.income);
      });
    },
  });

/** Invalide les deux périmètres : une annonce modifiée l'est pour tout le monde. */
const useListingMutation = <TVariables>(
  run: (variables: TVariables) => Promise<void>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: run,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["listings"] });
      void queryClient.invalidateQueries({ queryKey: ["equipment"] });
    },
  });
};

export const useSetListingStatus = () =>
  useListingMutation<{ id: string; status: ListingStatus }>(async ({ id, status }) => {
    const { error } = await requireSupabase()
      .from("equipment")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
  });

export const useSetListingAvailability = () =>
  useListingMutation<{ id: string; availability: ListingAvailability }>(
    async ({ id, availability }) => {
      const { error } = await requireSupabase()
        .from("equipment")
        .update({ availability })
        .eq("id", id);

      if (error) throw error;
    },
  );

export const useToggleListingFeatured = () =>
  useListingMutation<{ id: string; featured: boolean }>(async ({ id, featured }) => {
    const { error } = await requireSupabase()
      .from("equipment")
      .update({ featured })
      .eq("id", id);

    if (error) throw error;
  });

export const useRemoveListing = () =>
  useListingMutation<string>(async (id) => {
    const { error } = await requireSupabase().from("equipment").delete().eq("id", id);
    if (error) throw error;
  });

/** Catégories réellement présentes, dans l'ordre alphabétique. */
export const listingCategoriesOf = (listings: Listing[]): string[] =>
  Array.from(new Set(listings.map((item) => item.category))).sort();
