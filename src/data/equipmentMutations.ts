import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isSupabaseConfigured, requireSupabase } from "@/lib/supabase";

/**
 * Dépôt d'une annonce par un loueur.
 *
 * L'annonce naît en attente : la modération existe déjà côté administration, et
 * une annonce publiée d'office la contournerait.
 */

export interface CreateEquipmentInput {
  name: string;
  description: string;
  category: string;
  pricePerDay: number;
  deposit: number;
  location: string;
  minRentalDays: number;
  available: boolean;
  /** Photos choisies dans le formulaire, dans l'ordre d'affichage. */
  photos: File[];
}

const BUCKET = "equipment";

/**
 * Dépose une photo dans le dossier du loueur. Le chemin commence par son
 * identifiant : c'est ce préfixe que les règles du dépôt vérifient.
 */
const uploadPhoto = async (file: File, userId: string): Promise<string> => {
  const supabase = requireSupabase();
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
  });

  if (error) throw error;

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateEquipmentInput) => {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase n'est pas configuré : dépôt impossible.");
      }

      const supabase = requireSupabase();
      const { data: session } = await supabase.auth.getUser();
      if (!session.user) throw new Error("Session expirée.");

      // La première photo sert de visuel principal ; les autres sont déposées
      // au même endroit et rattachées plus tard, quand la fiche les affichera.
      const urls = await Promise.all(
        input.photos.map((photo) => uploadPhoto(photo, session.user.id)),
      );

      const { data, error } = await supabase
        .from("equipment")
        .insert({
          owner_id: session.user.id,
          name: input.name,
          description: input.description,
          category: input.category,
          price_per_day: input.pricePerDay,
          deposit: input.deposit,
          location: input.location,
          min_rental_days: input.minRentalDays,
          image_url: urls[0] ?? null,
          availability: input.available ? "available" : "unavailable",
        })
        .select("id")
        .single();

      if (error) throw error;
      return data.id as string;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["equipment"] });
    },
  });
};
