import {
  Blocks,
  Box,
  Boxes,
  Construction,
  Hammer,
  LayoutGrid,
  Package,
  Shovel,
  Tractor,
  Truck,
  Wrench,
} from "lucide-react";
import { equipmentCategories } from "./equipment";
import { materialCategories } from "./materials";

// Association catégorie → icône. Les listes de catégories viennent des données ;
// ce fichier ne gère que leur représentation visuelle.

const iconClass = "h-6 w-6";

const equipmentIcons: Record<string, JSX.Element> = {
  Pelleteuses: <Tractor className={iconClass} />,
  Chargeuses: <Blocks className={iconClass} />,
  Camions: <Truck className={iconClass} />,
  Échafaudages: <Construction className={iconClass} />,
  "Marteaux piqueurs": <Hammer className={iconClass} />,
  Bétonnières: <Package className={iconClass} />,
  Outillage: <Wrench className={iconClass} />,
};

const materialIcons: Record<string, JSX.Element> = {
  Sable: <Box className={iconClass} />,
  Ciment: <Package className={iconClass} />,
  Béton: <Boxes className={iconClass} />,
  Agrégats: <Boxes className={iconClass} />,
  Terre: <Shovel className={iconClass} />,
};

/** Icône par défaut pour toute catégorie ajoutée aux données sans entrée ici. */
const fallbackIcon = <LayoutGrid className={iconClass} />;

export interface CategoryOption {
  label: string;
  icon: JSX.Element;
}

/** Libellé de la catégorie « toutes », partagé par les pages catalogue. */
export const ALL_CATEGORIES = "Tout";

/**
 * Étiquette affichée d'une catégorie.
 * La valeur brute reste l'identifiant du filtre (et de l'URL) ; si aucune
 * traduction n'existe pour une catégorie ajoutée aux données, on affiche la
 * valeur telle quelle plutôt qu'une clé.
 */
export const categoryLabel = (t: (key: string) => string, category: string): string => {
  if (category === ALL_CATEGORIES) return t("common.all");
  const key = `category.${category}`;
  const translated = t(key);
  return translated === key ? category : translated;
};

export const equipmentCategoryIcons = (category: string): JSX.Element =>
  equipmentIcons[category] ?? fallbackIcon;

export const materialCategoryIcons = (category: string): JSX.Element =>
  materialIcons[category] ?? fallbackIcon;

/** Catégories d'équipement avec leur icône, précédées de « Tout ». */
export const equipmentCategoryOptions: CategoryOption[] = [
  { label: ALL_CATEGORIES, icon: <LayoutGrid className={iconClass} /> },
  ...equipmentCategories.map((label) => ({ label, icon: equipmentCategoryIcons(label) })),
];

/** Catégories de matériaux avec leur icône, précédées de « Tout ». */
export const materialCategoryOptions: CategoryOption[] = [
  { label: ALL_CATEGORIES, icon: <LayoutGrid className={iconClass} /> },
  ...materialCategories.map((label) => ({ label, icon: materialCategoryIcons(label) })),
];

/** Sélection courte affichée sur la page d'accueil. */
export const popularEquipmentCategories: CategoryOption[] = equipmentCategories
  .slice(0, 6)
  .map((label) => ({ label, icon: equipmentCategoryIcons(label) }));

export const popularMaterialCategories: CategoryOption[] = materialCategories.map((label) => ({
  label,
  icon: materialCategoryIcons(label),
}));
