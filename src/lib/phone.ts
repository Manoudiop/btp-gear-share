import { z } from "zod";

/**
 * Numéro de téléphone, sans hypothèse de pays.
 *
 * La règle du tunnel de commande n'acceptait que la France
 * (`^(?:\+33|0)[1-9]…`), alors que le site affiche ses prix en franc CFA et
 * s'adresse à des chantiers hors de France. Un client sénégalais ne pouvait pas
 * finir sa commande.
 *
 * Valider un numéro pour de bon demande de connaître le plan de numérotation de
 * chaque pays — c'est le métier de bibliothèques dédiées, bien plus lourdes que
 * le besoin. On s'en tient donc à ce qu'on peut affirmer sans se tromper : un
 * indicatif facultatif, puis un nombre de chiffres plausible. Assez pour
 * attraper une faute de frappe, jamais assez pour rejeter un numéro valide.
 */

/** Séparateurs d'usage courant, ignorés : ils varient d'un pays à l'autre. */
const SEPARATORS = /[\s.\-()/]/g;

/**
 * Indicatif facultatif (`+` ou `00`), puis 6 à 15 chiffres. La borne haute est
 * celle de la norme E.164 ; la borne basse couvre les plans les plus courts.
 */
const PHONE = /^(?:\+|00)?\d{6,15}$/;

export const normalizePhone = (value: string) =>
  value.replace(SEPARATORS, "").trim();

export const isValidPhone = (value: string) => PHONE.test(normalizePhone(value));

/** Champ de formulaire, le message restant propre à chaque écran. */
export const phoneField = (message: string) =>
  z.string().refine(isValidPhone, { message });
