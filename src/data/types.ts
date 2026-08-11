// Types partagés par toutes les données du catalogue.
// Tant qu'il n'y a pas d'API, ces types font office de contrat : le jour où les
// données viendront d'un backend, seules les fonctions d'accès changeront.

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  date: string;
  author: string;
}

export interface Equipment {
  id: string;
  name: string;
  image: string;
  category: string;
  /** Prix de location par jour, en euros (devise pivot). */
  price: number;
  deposit: number;
  rating: number;
  location: string;
  owner: string;
  ownerRating: number;
  ownerResponseTime: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  isAvailable: boolean;
  availabilityDates: string[];
  reviews: Review[];
  questionsAnswers: QuestionAnswer[];
  insurance: string[];
}

export interface DeliveryOption {
  type: string;
  delay: string;
  /** Prix en euros, ou libellé (« Sur devis ») quand il n'est pas chiffrable. */
  price: number | string;
}

export interface Material {
  id: string;
  name: string;
  image: string;
  category: string;
  /** Prix à l'unité, en euros (devise pivot). */
  price: number;
  unit: string;
  minOrder: number;
  maxOrder: number;
  stock: number;
  rating: number;
  supplier: string;
  supplierLogo?: string;
  location: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  isAvailable: boolean;
  deliveryOptions: DeliveryOption[];
  reviews: Review[];
}

export type ListingStatus = "approved" | "pending" | "rejected";
export type ListingAvailability = "available" | "rented" | "maintenance";

/** Une annonce telle que vue par son loueur et par l'administration. */
export interface Listing {
  id: string;
  name: string;
  category: string;
  price: number;
  owner: string;
  ownerId: string;
  /** Statut de modération, côté admin. */
  status: ListingStatus;
  /** Disponibilité opérationnelle, côté loueur. */
  availability: ListingAvailability;
  featured: boolean;
  rating: number;
  rentals: number;
  income: number;
  image: string;
}
