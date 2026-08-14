import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured, requireSupabase } from "@/lib/supabase";

export type UserRole = "admin" | "client" | "owner";
export type UserStatus = "active" | "inactive" | "suspended";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  lastLogin: string;
  rentals: number;
  orders: number;
  equipments?: number;
}

/**
 * Annuaire de la plateforme.
 *
 * Il vivait dans localStorage : suspendre un compte depuis l'administration
 * n'avait d'effet que sur le navigateur qui avait cliqué. Il lit maintenant la
 * table des profils, que les règles de sécurité réservent à l'administration —
 * un compte client n'y voit que le sien.
 */
const iso = (value?: string) => (value ? value.slice(0, 10) : "");

/* eslint-disable @typescript-eslint/no-explicit-any -- lignes brutes de PostgREST */
const toUser = (
  row: any,
  totals: { rentals: number; orders: number; equipments: number },
): PlatformUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  status: row.status,
  joinDate: iso(row.created_at),
  lastLogin: iso(row.last_login_at),
  rentals: totals.rentals,
  orders: totals.orders,
  // Seul un loueur a un parc : l'affichage distingue l'absence du zéro.
  equipments: row.role === "owner" ? totals.equipments : undefined,
});
/* eslint-enable @typescript-eslint/no-explicit-any */

const countBy = (rows: { key: string }[]) => {
  const counts = new Map<string, number>();
  for (const row of rows) counts.set(row.key, (counts.get(row.key) ?? 0) + 1);
  return counts;
};

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<PlatformUser[]> => {
      if (!isSupabaseConfigured) return [];

      const supabase = requireSupabase();
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, role, status, created_at, last_login_at")
        .order("name");

      if (error) throw error;

      // Les compteurs sont dérivés, jamais recopiés sur le profil : une valeur
      // stockée s'écarterait du réel à la première réservation annulée.
      const [bookings, orders, equipment] = await Promise.all([
        supabase.from("bookings").select("renter_id"),
        supabase.from("orders").select("user_id"),
        supabase.from("equipment").select("owner_id"),
      ]);

      const rentals = countBy((bookings.data ?? []).map((r) => ({ key: r.renter_id })));
      const orderCounts = countBy((orders.data ?? []).map((r) => ({ key: r.user_id })));
      const parcs = countBy((equipment.data ?? []).map((r) => ({ key: r.owner_id })));

      return (data ?? []).map((row) =>
        toUser(row, {
          rentals: rentals.get(row.id) ?? 0,
          orders: orderCounts.get(row.id) ?? 0,
          equipments: parcs.get(row.id) ?? 0,
        }),
      );
    },
  });

const useUserMutation = <TVariables>(run: (variables: TVariables) => Promise<void>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: run,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useSetUserStatus = () =>
  useUserMutation<{ id: string; status: UserStatus }>(async ({ id, status }) => {
    const { error } = await requireSupabase()
      .from("profiles")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
  });

/**
 * Supprime un compte, profil et authentification compris.
 *
 * Passe par une fonction serveur : effacer seulement le profil laisserait un
 * compte capable de se connecter sur une session sans profil.
 */
export const useRemoveUser = () =>
  useUserMutation<string>(async (id) => {
    const { error } = await requireSupabase().rpc("admin_delete_user", { target: id });
    if (error) throw error;
  });
