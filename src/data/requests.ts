import { useMutation } from "@tanstack/react-query";
import { isSupabaseConfigured, requireSupabase } from "@/lib/supabase";

/**
 * Demandes entrantes : prise de contact et demandes de devis.
 *
 * Les deux formulaires affichaient un message de remerciement sans rien
 * envoyer. Ils écrivent maintenant dans `contact_messages` et `quotes`, que
 * seule l'administration peut relire.
 *
 * Un visiteur non connecté peut les déposer : c'est le principe même d'une
 * prise de contact. Les règles n'autorisent que l'insertion, jamais la lecture,
 * pour qu'un dépôt public ne devienne pas une fuite de la boîte de réception.
 */

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const useSendContactMessage = () =>
  useMutation({
    mutationFn: async (input: ContactMessageInput) => {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase n'est pas configuré : envoi impossible.");
      }

      const { error } = await requireSupabase().from("contact_messages").insert({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        subject: input.subject,
        message: input.message,
      });

      if (error) throw error;
    },
  });

export interface QuoteInput {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  projectLocation: string;
  projectDuration: string;
  projectStartDate?: string;
  equipmentTypes: string[];
  equipmentDuration?: string;
  equipmentQuantity?: number;
  additionalRequirements?: string;
}

export const useSendQuote = () =>
  useMutation({
    mutationFn: async (input: QuoteInput) => {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase n'est pas configuré : envoi impossible.");
      }

      const supabase = requireSupabase();
      // Rattache la demande au compte quand il y en a un, sans l'exiger.
      const { data: session } = await supabase.auth.getUser();

      const { error } = await supabase.from("quotes").insert({
        user_id: session.user?.id ?? null,
        full_name: input.fullName,
        email: input.email,
        phone: input.phone,
        company: input.company || null,
        project_type: input.projectType,
        project_location: input.projectLocation,
        project_duration: input.projectDuration,
        project_start_date: input.projectStartDate || null,
        equipment_types: input.equipmentTypes,
        equipment_duration: input.equipmentDuration || null,
        equipment_quantity: input.equipmentQuantity ?? null,
        additional_requirements: input.additionalRequirements || null,
      });

      if (error) throw error;
    },
  });
