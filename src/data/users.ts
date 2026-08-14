import { createStore, useStore } from "./store";

export type UserRole = "admin" | "client" | "owner";
export type UserStatus = "active" | "inactive" | "suspended";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  lastLogin: string;
  rentals: number;
  orders: number;
  equipments?: number;
}

/**
 * Annuaire de départ, affiché dans l'administration.
 * Exporté pour que `scripts/generate-seed.mjs` produise le jeu de données SQL.
 */
export const seedUsers: PlatformUser[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "client",
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2023-08-10",
    rentals: 5,
    orders: 3,
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    role: "owner",
    status: "active",
    joinDate: "2023-02-20",
    lastLogin: "2023-08-05",
    rentals: 0,
    orders: 0,
    equipments: 7,
  },
  {
    id: "3",
    name: "Paul Bernard",
    email: "paul.bernard@example.com",
    role: "client",
    status: "inactive",
    joinDate: "2023-03-10",
    lastLogin: "2023-06-15",
    rentals: 1,
    orders: 0,
  },
  {
    id: "4",
    name: "Sophie Dubois",
    email: "sophie.dubois@example.com",
    role: "client",
    status: "suspended",
    joinDate: "2023-04-05",
    lastLogin: "2023-05-22",
    rentals: 0,
    orders: 2,
  },
  {
    id: "5",
    name: "Thomas Leroy",
    email: "thomas.leroy@example.com",
    role: "admin",
    status: "active",
    joinDate: "2022-11-08",
    lastLogin: "2023-08-12",
    rentals: 0,
    orders: 0,
  },
  {
    id: "6",
    name: "Laura Petit",
    email: "laura.petit@example.com",
    role: "owner",
    status: "active",
    joinDate: "2023-01-30",
    lastLogin: "2023-08-01",
    rentals: 0,
    orders: 0,
    equipments: 3,
  },
];

const usersStore = createStore("btp-users", seedUsers);

/** Utilisateurs courants, avec re-rendu à chaque modification. */
export const useUsers = (): PlatformUser[] => useStore(usersStore);

export const setUserStatus = (id: string, status: UserStatus) =>
  usersStore.set((items) =>
    items.map((item) => (item.id === id ? { ...item, status } : item)),
  );

export const removeUser = (id: string) =>
  usersStore.set((items) => items.filter((item) => item.id !== id));

export interface DemoAccount {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  /** Clé du dictionnaire i18n décrivant ce que permet le compte. */
  descriptionKey: string;
}

/**
 * Comptes de démonstration.
 *
 * ⚠️ Il n'y a pas encore de backend : ces identifiants sont vérifiés côté client
 * et ne protègent rien. Ils remplacent l'ancien sélecteur de rôle libre — qui
 * accordait le rôle administrateur en un clic — le temps de brancher une vraie
 * authentification serveur. À supprimer le jour où l'API arrive.
 */
export const demoAccounts: DemoAccount[] = [
  {
    email: "client@btp.demo",
    password: "Buildora123",
    name: "Jean Dupont",
    role: "client",
    descriptionKey: "auth.demo.client",
  },
  {
    email: "loueur@btp.demo",
    password: "Buildora123",
    name: "Marie Martin",
    role: "owner",
    descriptionKey: "auth.demo.owner",
  },
  {
    email: "admin@btp.demo",
    password: "Buildora123",
    name: "Thomas Leroy",
    role: "admin",
    descriptionKey: "auth.demo.admin",
  },
];

export const findDemoAccount = (email: string, password: string): DemoAccount | undefined =>
  demoAccounts.find(
    (account) =>
      account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password,
  );
