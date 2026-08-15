/**
 * Vocabulaire des demandes de devis.
 *
 * Les libellés vivaient dans le JSX des trois étapes de l'assistant. L'écran
 * d'administration affichait donc les codes bruts stockés en base — « public »,
 * « biweekly », « excavator » — que personne n'a envie de déchiffrer.
 *
 * La liste est ici, et sert aux deux : la saisie et la relecture ne peuvent
 * plus diverger.
 */

export interface QuoteOption {
  id: string;
  labelKey: string;
}

export const PROJECT_TYPES: QuoteOption[] = [
  { id: "construction", labelKey: "quote.type.construction" },
  { id: "renovation", labelKey: "quote.type.renovation" },
  { id: "public", labelKey: "quote.type.public" },
  { id: "industrial", labelKey: "quote.type.industrial" },
  { id: "other", labelKey: "quote.type.other" },
];

export const PROJECT_DURATIONS: QuoteOption[] = [
  { id: "less-than-1-week", labelKey: "quote.duration.lt1w" },
  { id: "1-2-weeks", labelKey: "quote.duration.1to2w" },
  { id: "2-4-weeks", labelKey: "quote.duration.2to4w" },
  { id: "1-3-months", labelKey: "quote.duration.1to3m" },
  { id: "3-6-months", labelKey: "quote.duration.3to6m" },
  { id: "more-than-6-months", labelKey: "quote.duration.gt6m" },
];

export const EQUIPMENT_TYPES: QuoteOption[] = [
  { id: "excavator", labelKey: "category.Pelleteuses" },
  { id: "truck", labelKey: "category.Camions" },
  { id: "scaffold", labelKey: "category.Échafaudages" },
  { id: "breaker", labelKey: "category.Marteaux piqueurs" },
  { id: "mixer", labelKey: "category.Bétonnières" },
  { id: "tools", labelKey: "category.Outillage" },
  { id: "crane", labelKey: "quote.equip.crane" },
  { id: "compressor", labelKey: "quote.equip.compressor" },
];

export const RENTAL_DURATIONS: QuoteOption[] = [
  { id: "daily", labelKey: "quote.rental.daily" },
  { id: "weekly", labelKey: "quote.rental.weekly" },
  { id: "biweekly", labelKey: "quote.rental.biweekly" },
  { id: "monthly", labelKey: "quote.rental.monthly" },
  { id: "quarterly", labelKey: "quote.rental.quarterly" },
];

/**
 * Traduit un code stocké. Un code inconnu — venu d'une demande plus ancienne
 * que la liste — est rendu tel quel plutôt qu'effacé.
 */
export const labelOf = (
  options: QuoteOption[],
  id: string | undefined,
  t: (key: string) => string,
): string | undefined => {
  if (!id) return undefined;
  const option = options.find((item) => item.id === id);
  return option ? t(option.labelKey) : id;
};
