import type { Material } from "./types";

// Catalogue de matériaux à la vente.
// Source unique de vérité pour la grille d'accueil, la page catalogue et la fiche détail.

export const materials: Material[] = [
  {
    id: "1",
    name: "Sable de construction fin",
    image:
      "https://images.unsplash.com/photo-1582469566055-5216648cc753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Sable",
    price: 45,
    unit: "tonne",
    minOrder: 1,
    maxOrder: 20,
    stock: 500,
    rating: 4.7,
    supplier: "Matériaux Express",
    location: "Lyon",
    description:
      "Sable fin de construction de haute qualité, parfait pour les travaux de maçonnerie, la préparation du mortier et du béton. Granulométrie 0/4mm, conforme aux normes NF EN 12620 et NF EN 13139.",
    features: [
      "Granulométrie 0/4mm",
      "Sable lavé",
      "Conforme aux normes européennes",
      "Livraison possible",
    ],
    specifications: {
      granulometry: "0/4mm",
      density: "1.6 t/m³",
      source: "Carrière certifiée",
      color: "Beige",
      packaging: "Vrac",
    },
    isAvailable: true,
    deliveryOptions: [
      { type: "Standard", delay: "3-5 jours", price: 50 },
      { type: "Express", delay: "24h", price: 90 },
      { type: "Sur-mesure", delay: "À convenir", price: "Sur devis" },
    ],
    reviews: [
      {
        id: "r1",
        author: "Pierre M.",
        rating: 5,
        date: "10/04/2023",
        comment: "Sable de très bonne qualité, livraison rapide.",
      },
      {
        id: "r2",
        author: "Jacques D.",
        rating: 4,
        date: "25/03/2023",
        comment: "Bon produit, conforme à mes attentes.",
      },
    ],
  },
  {
    id: "2",
    name: "Ciment Portland 32.5",
    image:
      "https://images.unsplash.com/photo-1604163546180-039a1781c0d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Ciment",
    price: 95,
    unit: "tonne",
    minOrder: 0.5,
    maxOrder: 10,
    stock: 200,
    rating: 4.9,
    supplier: "Ciments de France",
    location: "Paris",
    description:
      "Ciment Portland de type CEM II/B-L 32,5 R, idéal pour les travaux courants de maçonnerie, les chapes et les fondations. Conforme à la norme NF EN 197-1.",
    features: [
      "Prise rapide",
      "Résistance 32.5 MPa",
      "Conditionnement en sacs ou vrac",
      "Excellente maniabilité",
    ],
    specifications: {
      type: "CEM II/B-L 32,5 R",
      resistance: "32.5 MPa",
      setting: "Prise normale",
      packaging: "Sacs 35kg ou vrac",
      color: "Gris",
    },
    isAvailable: true,
    deliveryOptions: [
      { type: "Standard", delay: "2-4 jours", price: 60 },
      { type: "Express", delay: "24h", price: 100 },
    ],
    reviews: [],
  },
  {
    id: "3",
    name: "Béton prêt à l'emploi C25/30",
    image:
      "https://images.unsplash.com/photo-1566027310713-1d34d3c2c654?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Béton",
    price: 110,
    unit: "m³",
    minOrder: 1,
    maxOrder: 15,
    stock: 150,
    rating: 4.8,
    supplier: "Béton Solutions",
    location: "Marseille",
    description:
      "Béton prêt à l'emploi de classe C25/30, adapté pour les structures soumises à des contraintes modérées. Livré par camion toupie pour garantir une qualité optimale.",
    features: [
      "Classe d'exposition XC2",
      "Consistance S3",
      "Taille des granulats 16mm",
      "Pompage possible",
    ],
    specifications: {
      class: "C25/30",
      exposure: "XC2",
      consistency: "S3",
      aggregates: "16mm",
      cement: "CEM II",
    },
    isAvailable: true,
    deliveryOptions: [
      { type: "Standard", delay: "Sur rendez-vous", price: 80 },
      { type: "Express", delay: "24h", price: 150 },
    ],
    reviews: [],
  },
  {
    id: "4",
    name: "Gravier 20/40mm",
    image:
      "https://images.unsplash.com/photo-1518406432532-9cbef5697723?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Agrégats",
    price: 38,
    unit: "tonne",
    minOrder: 1,
    maxOrder: 30,
    stock: 800,
    rating: 4.6,
    supplier: "Carrières du Sud",
    location: "Nîmes",
    description:
      "Gravier concassé calibre 20/40mm issu de carrière certifiée. Utilisé pour les drainages, les hérissons sous dalle, les allées et les lits de pose.",
    features: [
      "Calibre 20/40mm",
      "Roche calcaire concassée",
      "Excellent drainage",
      "Livraison en vrac",
    ],
    specifications: {
      granulometry: "20/40mm",
      density: "1.5 t/m³",
      source: "Carrière certifiée",
      color: "Gris clair",
      packaging: "Vrac ou big bag",
    },
    isAvailable: true,
    deliveryOptions: [
      { type: "Standard", delay: "3-5 jours", price: 45 },
      { type: "Express", delay: "48h", price: 85 },
    ],
    reviews: [
      {
        id: "r3",
        author: "Yann C.",
        rating: 5,
        date: "14/05/2023",
        comment: "Calibre régulier et propre, parfait pour mon hérisson.",
      },
    ],
  },
  {
    id: "5",
    name: "Terre végétale amendée",
    image:
      "https://images.unsplash.com/photo-1595915636540-3142ee10d19c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Terre",
    price: 55,
    unit: "m³",
    minOrder: 1,
    maxOrder: 25,
    stock: 0,
    rating: 4.5,
    supplier: "Terres & Jardins",
    location: "Bordeaux",
    description:
      "Terre végétale criblée et amendée en compost, prête à l'emploi pour l'engazonnement, les massifs et les plantations d'arbustes.",
    features: [
      "Criblée à 20mm",
      "Amendée en compost végétal",
      "Sans cailloux ni racines",
      "pH neutre",
    ],
    specifications: {
      screening: "20mm",
      organicMatter: "12 %",
      ph: "6,8",
      density: "1.3 t/m³",
      packaging: "Vrac",
    },
    isAvailable: false,
    deliveryOptions: [{ type: "Standard", delay: "5-7 jours", price: 55 }],
    reviews: [],
  },
  {
    id: "6",
    name: "Sable de rivière lavé",
    image:
      "https://images.unsplash.com/photo-1600007277799-44736c28e2f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Sable",
    price: 52,
    unit: "tonne",
    minOrder: 1,
    maxOrder: 20,
    stock: 350,
    rating: 4.8,
    supplier: "Matériaux Express",
    location: "Lyon",
    description:
      "Sable de rivière roulé et lavé, granulométrie 0/2mm. Sa forme arrondie en fait le sable de référence pour les enduits de finition et les mortiers de jointoiement.",
    features: [
      "Granulométrie 0/2mm",
      "Grains roulés",
      "Lavé et séché",
      "Idéal enduits de finition",
    ],
    specifications: {
      granulometry: "0/2mm",
      density: "1.5 t/m³",
      source: "Rivière",
      color: "Ocre clair",
      packaging: "Vrac ou big bag",
    },
    isAvailable: true,
    deliveryOptions: [
      { type: "Standard", delay: "3-5 jours", price: 50 },
      { type: "Express", delay: "24h", price: 90 },
    ],
    reviews: [
      {
        id: "r4",
        author: "Sonia L.",
        rating: 5,
        date: "20/05/2023",
        comment: "Sable très propre, rendu impeccable sur mes enduits.",
      },
    ],
  },
];

/** Catégories réellement présentes dans le catalogue, dans l'ordre d'apparition. */
export const materialCategories: string[] = Array.from(
  new Set(materials.map((item) => item.category)),
);

export const getMaterialById = (id?: string): Material | undefined =>
  materials.find((item) => item.id === id);

/**
 * Produits associés : même catégorie d'abord, puis même fournisseur, puis les mieux notés.
 * Calculé plutôt que codé en dur, pour éviter les références vers des produits absents.
 */
export const getRelatedMaterials = (id: string, limit = 3): Material[] => {
  const current = getMaterialById(id);
  if (!current) return [];

  const others = materials.filter((item) => item.id !== id);
  const score = (item: Material) =>
    (item.category === current.category ? 2 : 0) +
    (item.supplier === current.supplier ? 1 : 0);

  return [...others]
    .sort((a, b) => score(b) - score(a) || b.rating - a.rating)
    .slice(0, limit);
};
