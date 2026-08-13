import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase, créé seulement si le projet est configuré.
 *
 * Tant que les variables d'environnement sont absentes, l'application continue
 * de fonctionner sur les données de démonstration de `src/data/`. Cela permet
 * de lancer le projet sans compte Supabase, et de basculer sans toucher au code
 * une fois les clés renseignées dans `.env.local`.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Vrai quand un projet Supabase est configuré. */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Renvoie le client en garantissant sa présence.
 * À n'appeler que derrière un test sur `isSupabaseConfigured`.
 */
export const requireSupabase = (): SupabaseClient => {
  if (!supabase) {
    throw new Error(
      "Supabase n'est pas configuré : renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local",
    );
  }
  return supabase;
};
