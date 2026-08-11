import type { Equipment } from "./types";

// Catalogue d'équipements de location.
// Source unique de vérité : la page catalogue, la fiche détail et les grilles de
// la page d'accueil lisent toutes ce fichier.

/**
 * Génère `count` dates disponibles à partir de `startOffset` jours après aujourd'hui.
 * Les jeux de dates codés en dur devenaient périmés : ici elles restent toujours à venir.
 */
const upcomingDates = (startOffset: number, count: number): string[] =>
  Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + startOffset + i);
    return date.toISOString().slice(0, 10);
  });

export const equipment: Equipment[] = [
  {
    id: "1",
    name: "Pelleteuse Caterpillar 320",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Pelleteuses",
    price: 350,
    deposit: 1000,
    rating: 4.8,
    location: "Lyon",
    owner: "BTP Solutions",
    ownerRating: 4.9,
    ownerResponseTime: "1h",
    description:
      "Pelleteuse hydraulique Caterpillar 320 en excellent état. Idéale pour les travaux d'excavation, de terrassement et de démolition. Puissance de 120 kW, poids opérationnel de 20 tonnes, profondeur de fouille maximale de 6,7 mètres.",
    features: [
      "Cabine climatisée",
      "Système GPS",
      "Caméra de recul",
      "Godet standard et godet de curage",
    ],
    specifications: {
      weight: "20 tonnes",
      power: "120 kW",
      year: "2019",
      hours: "2500 heures",
      fuelType: "Diesel",
    },
    isAvailable: true,
    availabilityDates: upcomingDates(3, 6),
    reviews: [
      {
        id: "r1",
        author: "Jean D.",
        rating: 5,
        date: "15/05/2023",
        comment: "Machine en parfait état, très satisfait de la location.",
      },
      {
        id: "r2",
        author: "Michel P.",
        rating: 4,
        date: "22/04/2023",
        comment: "Bon rapport qualité-prix, le propriétaire est très professionnel.",
      },
    ],
    questionsAnswers: [
      {
        id: "q1",
        question: "Est-ce que la livraison est incluse ?",
        answer: "La livraison est possible avec supplément selon la distance.",
        date: "10/04/2023",
        author: "Sophie M.",
      },
      {
        id: "q2",
        question: "Faut-il avoir une qualification spécifique pour utiliser cet équipement ?",
        answer:
          "Oui, un CACES R482 catégorie C1 est nécessaire pour manipuler cette pelleteuse.",
        date: "05/04/2023",
        author: "Thomas L.",
      },
    ],
    insurance: ["Dommages matériels", "Vol", "Bris de machine"],
  },
  {
    id: "2",
    name: "Chargeuse JCB 437",
    image:
      "https://images.unsplash.com/photo-1573611030146-ff6916c398f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Chargeuses",
    price: 280,
    deposit: 800,
    rating: 4.6,
    location: "Marseille",
    owner: "Constructions Services",
    ownerRating: 4.7,
    ownerResponseTime: "2h",
    description:
      "Chargeuse sur pneus JCB 437 avec godet haute capacité. Parfaite pour le chargement de matériaux, le terrassement et la manutention sur chantier.",
    features: ["Climatisation", "Pesage embarqué", "Attache rapide hydraulique"],
    specifications: {
      weight: "14 tonnes",
      power: "97 kW",
      year: "2020",
      hours: "1200 heures",
      fuelType: "Diesel",
    },
    isAvailable: true,
    availabilityDates: upcomingDates(2, 5),
    reviews: [],
    questionsAnswers: [],
    insurance: ["Dommages matériels", "Vol"],
  },
  {
    id: "3",
    name: "Camion benne Volvo FMX",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Camions",
    price: 420,
    deposit: 1200,
    rating: 4.9,
    location: "Paris",
    owner: "Transports Delmas",
    ownerRating: 4.8,
    ownerResponseTime: "30 min",
    description:
      "Camion benne Volvo FMX 8x4 d'une capacité de 20 m³. Conçu pour l'évacuation de déblais et l'approvisionnement de chantiers difficiles d'accès. Benne à bascule arrière avec bâchage automatique.",
    features: [
      "Benne 20 m³",
      "Bâchage automatique",
      "Boîte automatique I-Shift",
      "Suspension renforcée",
    ],
    specifications: {
      capacity: "20 m³",
      power: "324 kW",
      year: "2021",
      mileage: "85 000 km",
      fuelType: "Diesel",
    },
    isAvailable: true,
    availabilityDates: upcomingDates(5, 7),
    reviews: [
      {
        id: "r3",
        author: "Karim B.",
        rating: 5,
        date: "02/06/2023",
        comment: "Camion impeccable, chauffeur ponctuel. Rien à redire.",
      },
    ],
    questionsAnswers: [
      {
        id: "q3",
        question: "Le chauffeur est-il fourni avec le camion ?",
        answer: "Oui, la location se fait avec chauffeur, inclus dans le tarif journalier.",
        date: "28/05/2023",
        author: "Nadia R.",
      },
    ],
    insurance: ["Dommages matériels", "Vol", "Responsabilité civile"],
  },
  {
    id: "4",
    name: "Bétonnière PRO 350L",
    image:
      "https://images.unsplash.com/photo-1579165466741-7f35e4755183?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Bétonnières",
    price: 80,
    deposit: 250,
    rating: 4.5,
    location: "Toulouse",
    owner: "Loc'Chantier",
    ownerRating: 4.4,
    ownerResponseTime: "3h",
    description:
      "Bétonnière professionnelle de 350 litres à cuve basculante. Adaptée aux chantiers de maçonnerie de taille moyenne : dalles, chapes et enduits.",
    features: [
      "Cuve 350 L",
      "Châssis routier avec roues",
      "Moteur électrique 230 V",
      "Basculement par volant",
    ],
    specifications: {
      volume: "350 litres",
      power: "1,5 kW",
      year: "2022",
      voltage: "230 V",
      weight: "180 kg",
    },
    isAvailable: false,
    availabilityDates: [],
    reviews: [],
    questionsAnswers: [],
    insurance: ["Dommages matériels"],
  },
  {
    id: "5",
    name: "Marteau piqueur Bosch GSH 27",
    image:
      "https://images.unsplash.com/photo-1622142377395-2210cbdad39e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Marteaux piqueurs",
    price: 60,
    deposit: 200,
    rating: 4.7,
    location: "Nice",
    owner: "Outillage Dupont",
    ownerRating: 4.6,
    ownerResponseTime: "2h",
    description:
      "Marteau piqueur Bosch GSH 27 VC de 30 kg pour la démolition de béton armé, l'ouverture de tranchées et la reprise de fondations. Livré avec jeu de burins.",
    features: [
      "Système anti-vibration",
      "Jeu de 3 burins inclus",
      "Poignée pivotante",
      "Puissance de frappe 62 J",
    ],
    specifications: {
      weight: "30 kg",
      power: "2000 W",
      impactEnergy: "62 J",
      year: "2021",
      voltage: "230 V",
    },
    isAvailable: true,
    availabilityDates: upcomingDates(1, 6),
    reviews: [
      {
        id: "r4",
        author: "Luc F.",
        rating: 5,
        date: "18/05/2023",
        comment: "Très efficace sur du béton armé, matériel bien entretenu.",
      },
    ],
    questionsAnswers: [],
    insurance: ["Dommages matériels", "Vol"],
  },
  {
    id: "6",
    name: "Échafaudage modulaire 8m",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Échafaudages",
    price: 120,
    deposit: 400,
    rating: 4.4,
    location: "Bordeaux",
    owner: "ÉchaFrance Pro",
    ownerRating: 4.5,
    ownerResponseTime: "4h",
    description:
      "Échafaudage de façade modulaire d'une hauteur de travail de 8 mètres. Conforme à la norme NF EN 12811, garde-corps et plinthes inclus. Montage rapide sans outil.",
    features: [
      "Hauteur de travail 8 m",
      "Plateaux antidérapants",
      "Garde-corps et plinthes",
      "Montage sans outil",
    ],
    specifications: {
      height: "8 m",
      surface: "24 m²",
      load: "200 kg/m²",
      standard: "NF EN 12811",
      material: "Acier galvanisé",
    },
    isAvailable: true,
    availabilityDates: upcomingDates(4, 8),
    reviews: [],
    questionsAnswers: [
      {
        id: "q4",
        question: "Le montage est-il assuré par le loueur ?",
        answer: "Le montage peut être assuré en option, comptez 250 € pour une façade de 8 m.",
        date: "12/05/2023",
        author: "Émile T.",
      },
    ],
    insurance: ["Dommages matériels"],
  },
  {
    id: "7",
    name: "Pelleteuse Hitachi ZX350",
    image:
      "https://images.unsplash.com/photo-1506843561735-0e6b5a0e06fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Pelleteuses",
    price: 380,
    deposit: 1100,
    rating: 4.7,
    location: "Nantes",
    owner: "BTP Solutions",
    ownerRating: 4.9,
    ownerResponseTime: "1h",
    description:
      "Pelle sur chenilles Hitachi ZX350LC-6 de 35 tonnes. Machine de gros terrassement offrant une profondeur de fouille de 7,3 mètres et une excellente stabilité en pente.",
    features: [
      "Chenilles longues (LC)",
      "Cabine ROPS climatisée",
      "Circuit hydraulique pour brise-roche",
      "Godet 1,4 m³",
    ],
    specifications: {
      weight: "35 tonnes",
      power: "202 kW",
      year: "2020",
      hours: "3100 heures",
      fuelType: "Diesel",
    },
    isAvailable: true,
    availabilityDates: upcomingDates(6, 5),
    reviews: [
      {
        id: "r5",
        author: "Antoine V.",
        rating: 5,
        date: "30/04/2023",
        comment: "Puissante et sobre, parfaite pour notre chantier de terrassement.",
      },
      {
        id: "r6",
        author: "Farid S.",
        rating: 4,
        date: "11/04/2023",
        comment: "Bonne machine, livraison un peu tardive le premier jour.",
      },
    ],
    questionsAnswers: [],
    insurance: ["Dommages matériels", "Vol", "Bris de machine"],
  },
  {
    id: "8",
    name: "Mini pelle Kubota KX91-3",
    image:
      "https://images.unsplash.com/photo-1532343071564-5e97caaa9311?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Pelleteuses",
    price: 220,
    deposit: 600,
    rating: 4.9,
    location: "Lille",
    owner: "LoueBTP",
    ownerRating: 4.8,
    ownerResponseTime: "1h30",
    description:
      "Mini pelle Kubota KX91-3 de 3,5 tonnes, idéale pour les chantiers urbains et les accès étroits. Lame de remblayage et déport de flèche pour travailler au plus près des murs.",
    features: [
      "Poids 3,5 tonnes",
      "Déport de flèche",
      "Lame de remblayage",
      "3 godets fournis",
    ],
    specifications: {
      weight: "3,5 tonnes",
      power: "25 kW",
      year: "2021",
      hours: "1450 heures",
      fuelType: "Diesel",
    },
    isAvailable: true,
    availabilityDates: upcomingDates(2, 7),
    reviews: [
      {
        id: "r7",
        author: "Céline H.",
        rating: 5,
        date: "05/06/2023",
        comment: "Parfaite pour mon jardin, très maniable et propre.",
      },
    ],
    questionsAnswers: [],
    insurance: ["Dommages matériels", "Vol"],
  },
  {
    id: "9",
    name: "Scie circulaire Makita",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Outillage",
    price: 40,
    deposit: 150,
    rating: 4.6,
    location: "Strasbourg",
    owner: "OutilsPro",
    ownerRating: 4.5,
    ownerResponseTime: "5h",
    description:
      "Scie circulaire Makita 5008MG à lame de 210 mm, carter magnésium. Coupe jusqu'à 75,5 mm de profondeur, idéale pour la charpente et le coffrage.",
    features: [
      "Lame 210 mm",
      "Carter magnésium léger",
      "Éclairage LED",
      "Guide parallèle inclus",
    ],
    specifications: {
      bladeDiameter: "210 mm",
      power: "1800 W",
      cuttingDepth: "75,5 mm",
      year: "2022",
      weight: "5,1 kg",
    },
    isAvailable: true,
    availabilityDates: upcomingDates(1, 10),
    reviews: [],
    questionsAnswers: [],
    insurance: ["Dommages matériels"],
  },
];

/** Catégories réellement présentes dans le catalogue, dans l'ordre d'apparition. */
export const equipmentCategories: string[] = Array.from(
  new Set(equipment.map((item) => item.category)),
);

export const getEquipmentById = (id?: string): Equipment | undefined =>
  equipment.find((item) => item.id === id);

/**
 * Équipements similaires : même catégorie d'abord, complété par les mieux notés.
 * Calculé plutôt que codé en dur — les anciennes listes d'ID pointaient vers des
 * équipements inexistants et la section restait vide.
 */
export const getSimilarEquipment = (id: string, limit = 3): Equipment[] => {
  const current = getEquipmentById(id);
  if (!current) return [];

  const others = equipment.filter((item) => item.id !== id);
  const sameCategory = others.filter((item) => item.category === current.category);
  const rest = others
    .filter((item) => item.category !== current.category)
    .sort((a, b) => b.rating - a.rating);

  return [...sameCategory, ...rest].slice(0, limit);
};
