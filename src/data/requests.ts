import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export interface OwnerApplicationInput {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  equipmentTypes: string;
  description?: string;
}

export const useSendOwnerApplication = () =>
  useMutation({
    mutationFn: async (input: OwnerApplicationInput) => {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase n'est pas configuré : envoi impossible.");
      }

      const supabase = requireSupabase();
      const { data: session } = await supabase.auth.getUser();

      const { error } = await supabase.from("owner_applications").insert({
        user_id: session.user?.id ?? null,
        first_name: input.firstName,
        last_name: input.lastName,
        company: input.company || null,
        email: input.email,
        phone: input.phone,
        address: input.address,
        city: input.city,
        postal_code: input.postalCode,
        equipment_types: input.equipmentTypes,
        description: input.description || null,
      });

      if (error) throw error;
    },
  });

// ------------------------------------------------------------------- Lecture
//
// Ces demandes étaient écrites sans que rien ne les affiche : l'administration
// devait ouvrir la base pour savoir qu'elle en avait reçu. Les règles limitent
// déjà la lecture à l'administration ; c'est elle seule qui verra ces écrans.

export interface ContactMessage extends ContactMessageInput {
  id: string;
  handled: boolean;
  createdAt: string;
}

export interface Quote extends QuoteInput {
  id: string;
  handled: boolean;
  createdAt: string;
}

export interface OwnerApplication extends OwnerApplicationInput {
  id: string;
  handled: boolean;
  createdAt: string;
}

/** Tables de demandes, seules cibles autorisées du marquage « traité ». */
export type RequestTable =
  | "contact_messages"
  | "quotes"
  | "owner_applications";

const useRequestList = <TResult>(
  table: RequestTable,
  columns: string,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any -- ligne brute */
  map: (row: any) => TResult,
) =>
  useQuery({
    queryKey: ["requests", table],
    queryFn: async (): Promise<TResult[]> => {
      if (!isSupabaseConfigured) return [];

      const { data, error } = await requireSupabase()
        .from(table)
        .select(columns)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []).map(map);
    },
  });

export const useContactMessages = () =>
  useRequestList<ContactMessage>(
    "contact_messages",
    "id, name, email, phone, subject, message, handled, created_at",
    (row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone ?? undefined,
      subject: row.subject,
      message: row.message,
      handled: row.handled,
      createdAt: row.created_at,
    }),
  );

export const useQuotes = () =>
  useRequestList<Quote>(
    "quotes",
    `id, full_name, email, phone, company, project_type, project_location,
     project_duration, project_start_date, equipment_types, equipment_duration,
     equipment_quantity, additional_requirements, handled, created_at`,
    (row) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      company: row.company ?? undefined,
      projectType: row.project_type,
      projectLocation: row.project_location,
      projectDuration: row.project_duration,
      projectStartDate: row.project_start_date ?? undefined,
      equipmentTypes: row.equipment_types ?? [],
      equipmentDuration: row.equipment_duration ?? undefined,
      equipmentQuantity: row.equipment_quantity ?? undefined,
      additionalRequirements: row.additional_requirements ?? undefined,
      handled: row.handled,
      createdAt: row.created_at,
    }),
  );

export const useOwnerApplications = () =>
  useRequestList<OwnerApplication>(
    "owner_applications",
    `id, first_name, last_name, company, email, phone, address, city,
     postal_code, equipment_types, description, handled, created_at`,
    (row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      company: row.company ?? undefined,
      email: row.email,
      phone: row.phone,
      address: row.address,
      city: row.city,
      postalCode: row.postal_code,
      equipmentTypes: row.equipment_types,
      description: row.description ?? undefined,
      handled: row.handled,
      createdAt: row.created_at,
    }),
  );

/** Marque une demande comme traitée, ou la rouvre. */
export const useMarkHandled = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      table,
      id,
      handled,
    }: {
      table: RequestTable;
      id: string;
      handled: boolean;
    }) => {
      const { error } = await requireSupabase()
        .from(table)
        .update({ handled })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
};
