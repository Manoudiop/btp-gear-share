import type { Listing } from "./types";

// Annonces du parc de location, vues côté back-office.
// Le loueur y voit sa disponibilité et ses revenus, l'administration y voit le
// statut de modération et la mise en avant : un seul jeu de données pour les deux.

export const listings: Listing[] = [
  {
    id: "1",
    name: "Bétonnière 150L",
    category: "Gros oeuvre",
    price: 45,
    owner: "Martin Construction",
    ownerId: "o1",
    status: "approved",
    availability: "available",
    featured: true,
    rating: 4.5,
    rentals: 12,
    income: 540,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Échafaudage 8m",
    category: "Élévation",
    price: 120,
    owner: "ÉchaFrance Pro",
    ownerId: "o2",
    status: "approved",
    availability: "rented",
    featured: false,
    rating: 4.2,
    rentals: 8,
    income: 960,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Marteau-piqueur",
    category: "Démolition",
    price: 65,
    owner: "Outillage Dupont",
    ownerId: "o3",
    status: "pending",
    availability: "available",
    featured: false,
    rating: 0,
    rentals: 10,
    income: 650,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Pelleteuse mini",
    category: "Terrassement",
    price: 250,
    owner: "LoueBTP",
    ownerId: "o4",
    status: "approved",
    availability: "maintenance",
    featured: true,
    rating: 4.8,
    rentals: 5,
    income: 1250,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Perceuse électrique professionnelle",
    category: "Outillage",
    price: 30,
    owner: "OutilsPro",
    ownerId: "o5",
    status: "rejected",
    availability: "available",
    featured: false,
    rating: 0,
    rentals: 20,
    income: 600,
    image: "/placeholder.svg",
  },
];

/** Catégories du back-office, dérivées des annonces existantes. */
export const listingCategories: string[] = Array.from(
  new Set(listings.map((item) => item.category)),
);

/** Nombre de locations par annonce — utilisé par les graphiques du loueur. */
export const rentalsByListing = listings.map(({ name, rentals }) => ({ name, rentals }));
