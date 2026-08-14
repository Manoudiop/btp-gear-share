import type { UserRole } from "./users";

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
