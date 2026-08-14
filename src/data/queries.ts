import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured, requireSupabase } from "@/lib/supabase";
import { equipment as seedEquipment, getSimilarEquipment } from "./equipment";
import { materials as seedMaterials, getRelatedMaterials } from "./materials";
import type { Equipment, Material } from "./types";

/**
 * Lecture des catalogues.
 *
 * Une seule forme de données pour toute l'application : les lignes Supabase
 * sont converties vers les types `Equipment` et `Material` déjà utilisés par les
 * pages, qui n'ont donc pas à connaître la base. Sans projet configuré, les
 * mêmes fonctions renvoient le catalogue local — le dépôt reste exécutable.
 */

const STALE_TIME = 60_000;

/** Colonnes suffisantes pour une carte de catalogue. */
const EQUIPMENT_LIST_COLUMNS =
  "id, name, category, price_per_day, location, image_url, availability, rating";

const EQUIPMENT_DETAIL_COLUMNS = `
  id, name, description, category, price_per_day, deposit, location, image_url,
  features, insurance, specifications, availability, rating, response_time,
  owner:profiles!equipment_owner_id_fkey (name),
  equipment_availability (day),
  reviews (id, rating, comment, created_at, author:profiles (name)),
  questions (id, question, answer, created_at, author:profiles (name))
`;

const MATERIAL_LIST_COLUMNS =
  "id, name, category, price, unit, supplier_name, image_url, is_available, rating";

const MATERIAL_DETAIL_COLUMNS = `
  id, name, description, category, price, unit, min_order, max_order, stock,
  supplier_name, location, image_url, features, specifications, is_available, rating,
  delivery_options (type, delay, price),
  reviews (id, rating, comment, created_at, author:profiles (name))
`;

/* eslint-disable @typescript-eslint/no-explicit-any -- lignes brutes de PostgREST */
type Row = any;

const frenchDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString("fr-FR") : "";

const toEquipment = (row: Row): Equipment => ({
  id: row.id,
  name: row.name,
  image: row.image_url ?? "",
  category: row.category,
  price: Number(row.price_per_day),
  deposit: Number(row.deposit ?? 0),
  rating: Number(row.rating ?? 0),
  location: row.location,
  owner: row.owner?.name ?? "",
  // Absente du schéma : la note du loueur viendra avec ses propres avis.
  ownerRating: Number(row.rating ?? 0),
  ownerResponseTime: row.response_time ?? "",
  description: row.description ?? "",
  features: row.features ?? [],
  specifications: row.specifications ?? {},
  isAvailable: row.availability === "available",
  availabilityDates: (row.equipment_availability ?? [])
    .map((slot: Row) => slot.day)
    .sort(),
  reviews: (row.reviews ?? []).map((review: Row) => ({
    id: review.id,
    author: review.author?.name ?? "",
    rating: review.rating,
    date: frenchDate(review.created_at),
    comment: review.comment,
  })),
  questionsAnswers: (row.questions ?? []).map((question: Row) => ({
    id: question.id,
    question: question.question,
    answer: question.answer ?? "",
    date: frenchDate(question.created_at),
    author: question.author?.name ?? "",
  })),
  insurance: row.insurance ?? [],
});

const toMaterial = (row: Row): Material => ({
  id: row.id,
  name: row.name,
  image: row.image_url ?? "",
  category: row.category,
  price: Number(row.price),
  unit: row.unit,
  minOrder: Number(row.min_order ?? 1),
  maxOrder: Number(row.max_order ?? 100),
  stock: Number(row.stock ?? 0),
  rating: Number(row.rating ?? 0),
  supplier: row.supplier_name,
  location: row.location ?? "",
  description: row.description ?? "",
  features: row.features ?? [],
  specifications: row.specifications ?? {},
  isAvailable: row.is_available,
  deliveryOptions: (row.delivery_options ?? []).map((option: Row) => ({
    type: option.type,
    delay: option.delay,
    // Null en base signifie « sur devis ».
    price: option.price === null ? "Sur devis" : Number(option.price),
  })),
  reviews: (row.reviews ?? []).map((review: Row) => ({
    id: review.id,
    author: review.author?.name ?? "",
    rating: review.rating,
    date: frenchDate(review.created_at),
    comment: review.comment,
  })),
});
/* eslint-enable @typescript-eslint/no-explicit-any */

// ------------------------------------------------------------------ Équipements

export const useEquipmentList = () =>
  useQuery({
    queryKey: ["equipment", "list"],
    staleTime: STALE_TIME,
    queryFn: async (): Promise<Equipment[]> => {
      if (!isSupabaseConfigured) return seedEquipment;

      const { data, error } = await requireSupabase()
        .from("equipment")
        .select(EQUIPMENT_LIST_COLUMNS)
        .eq("status", "approved")
        .order("rating", { ascending: false });

      if (error) throw error;
      return (data ?? []).map(toEquipment);
    },
  });

export const useEquipmentDetail = (id?: string) =>
  useQuery({
    queryKey: ["equipment", "detail", id],
    enabled: Boolean(id),
    staleTime: STALE_TIME,
    queryFn: async (): Promise<Equipment | null> => {
      if (!isSupabaseConfigured) {
        return seedEquipment.find((item) => item.id === id) ?? null;
      }

      const { data, error } = await requireSupabase()
        .from("equipment")
        .select(EQUIPMENT_DETAIL_COLUMNS)
        .eq("id", id as string)
        .maybeSingle();

      if (error) throw error;
      return data ? toEquipment(data) : null;
    },
  });

/** Équipements proches : même catégorie d'abord, complétés par les mieux notés. */
export const useSimilarEquipment = (item?: Equipment | null, limit = 3) =>
  useQuery({
    queryKey: ["equipment", "similar", item?.id],
    enabled: Boolean(item),
    staleTime: STALE_TIME,
    queryFn: async (): Promise<Equipment[]> => {
      if (!item) return [];
      if (!isSupabaseConfigured) return getSimilarEquipment(item.id, limit);

      const { data, error } = await requireSupabase()
        .from("equipment")
        .select(EQUIPMENT_LIST_COLUMNS)
        .eq("status", "approved")
        .neq("id", item.id)
        .order("rating", { ascending: false })
        .limit(24);

      if (error) throw error;

      const others = (data ?? []).map(toEquipment);
      const sameCategory = others.filter((other) => other.category === item.category);
      const rest = others.filter((other) => other.category !== item.category);
      return [...sameCategory, ...rest].slice(0, limit);
    },
  });

// -------------------------------------------------------------------- Matériaux

export const useMaterialList = () =>
  useQuery({
    queryKey: ["materials", "list"],
    staleTime: STALE_TIME,
    queryFn: async (): Promise<Material[]> => {
      if (!isSupabaseConfigured) return seedMaterials;

      const { data, error } = await requireSupabase()
        .from("materials")
        .select(MATERIAL_LIST_COLUMNS)
        .order("name");

      if (error) throw error;
      return (data ?? []).map(toMaterial);
    },
  });

export const useMaterialDetail = (id?: string) =>
  useQuery({
    queryKey: ["materials", "detail", id],
    enabled: Boolean(id),
    staleTime: STALE_TIME,
    queryFn: async (): Promise<Material | null> => {
      if (!isSupabaseConfigured) {
        return seedMaterials.find((item) => item.id === id) ?? null;
      }

      const { data, error } = await requireSupabase()
        .from("materials")
        .select(MATERIAL_DETAIL_COLUMNS)
        .eq("id", id as string)
        .maybeSingle();

      if (error) throw error;
      return data ? toMaterial(data) : null;
    },
  });

export const useRelatedMaterials = (item?: Material | null, limit = 3) =>
  useQuery({
    queryKey: ["materials", "related", item?.id],
    enabled: Boolean(item),
    staleTime: STALE_TIME,
    queryFn: async (): Promise<Material[]> => {
      if (!item) return [];
      if (!isSupabaseConfigured) return getRelatedMaterials(item.id, limit);

      const { data, error } = await requireSupabase()
        .from("materials")
        .select(MATERIAL_LIST_COLUMNS)
        .neq("id", item.id)
        .limit(24);

      if (error) throw error;

      const others = (data ?? []).map(toMaterial);
      const score = (other: Material) =>
        (other.category === item.category ? 2 : 0) +
        (other.supplier === item.supplier ? 1 : 0);

      return [...others]
        .sort((a, b) => score(b) - score(a) || b.rating - a.rating)
        .slice(0, limit);
    },
  });
