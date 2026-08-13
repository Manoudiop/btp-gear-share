import type { Listing, ListingStatus, ListingAvailability } from "./types";
import { createStore, useStore } from "./store";

// Annonces du parc de location, vues côté back-office.
// Le loueur y voit sa disponibilité et ses revenus, l'administration y voit le
// statut de modération et la mise en avant : un seul jeu de données pour les deux.

const seedListings: Listing[] = [
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

const listingsStore = createStore("btp-listings", seedListings);

/** Annonces courantes, hors composant React. */
export const getListings = (): Listing[] => listingsStore.get();

/** Annonces courantes, avec re-rendu à chaque modification. */
export const useListings = (): Listing[] => useStore(listingsStore);

export const setListingStatus = (id: string, status: ListingStatus) =>
  listingsStore.set((items) =>
    items.map((item) => (item.id === id ? { ...item, status } : item)),
  );

export const setListingAvailability = (id: string, availability: ListingAvailability) =>
  listingsStore.set((items) =>
    items.map((item) => (item.id === id ? { ...item, availability } : item)),
  );

export const toggleListingFeatured = (id: string) =>
  listingsStore.set((items) =>
    items.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item)),
  );

export const removeListing = (id: string) =>
  listingsStore.set((items) => items.filter((item) => item.id !== id));

export const addListing = (listing: Omit<Listing, "id">) =>
  listingsStore.set((items) => [
    { ...listing, id: `l-${Date.now()}` },
    ...items,
  ]);

/** Catégories du back-office, dérivées des annonces de référence. */
export const listingCategories: string[] = Array.from(
  new Set(seedListings.map((item) => item.category)),
);
