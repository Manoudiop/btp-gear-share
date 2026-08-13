import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { translations, type Language } from "@/i18n/translations";

export type { Language };
export type Currency = "EUR" | "XOF" | "USD";

type TranslateVars = Record<string, string | number>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string, vars?: TranslateVars) => string;
  formatPrice: (amountEur: number) => string;
  /** Symbole de la devise active, pour les libellés (« Prix (€) »…). */
  currencySymbol: string;
  /** Locale BCP 47 correspondant à la langue active, pour les dates et les nombres. */
  locale: string;
}

const CONVERSION_RATES: Record<Currency, number> = {
  EUR: 1,
  XOF: 655.957,
  USD: 1.08,
};

const CURRENCY_SYMBOLS: Record<Currency, { symbol: string; position: "before" | "after" }> = {
  EUR: { symbol: "€", position: "after" },
  XOF: { symbol: "FCFA", position: "after" },
  USD: { symbol: "$", position: "before" },
};

const LANGUAGE_KEY = "btp-language";
const CURRENCY_KEY = "btp-currency";
const LOCALES: Record<Language, string> = { fr: "fr-FR", en: "en-US" };

const isLanguage = (value: string | null): value is Language => value === "fr" || value === "en";
const isCurrency = (value: string | null): value is Currency =>
  value === "EUR" || value === "XOF" || value === "USD";

/** Langue initiale : préférence enregistrée, sinon celle du navigateur, sinon le français. */
const initialLanguage = (): Language => {
  if (typeof window === "undefined") return "fr";

  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  if (isLanguage(stored)) return stored;

  return window.navigator.language.toLowerCase().startsWith("en") ? "en" : "fr";
};

const initialCurrency = (): Currency => {
  if (typeof window === "undefined") return "EUR";

  const stored = window.localStorage.getItem(CURRENCY_KEY);
  return isCurrency(stored) ? stored : "EUR";
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency);

  // La préférence survit au rechargement, et <html lang> suit la langue choisie
  // (lecteurs d'écran, moteurs de recherche, césure typographique).
  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(CURRENCY_KEY, currency);
  }, [currency]);

  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);
  const setCurrency = useCallback((curr: Currency) => setCurrencyState(curr), []);

  const value = useMemo<LanguageContextType>(() => {
    const locale = LOCALES[language];

    /**
     * Traduit une clé, en remplaçant les variables `{nom}` fournies.
     * Une clé absente est renvoyée telle quelle : le manque se voit à l'écran
     * plutôt que de se traduire par un blanc silencieux.
     */
    const t = (key: string, vars?: TranslateVars): string => {
      const template = translations[key]?.[language] ?? key;
      if (!vars) return template;

      return template.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in vars ? String(vars[name]) : match,
      );
    };

    const formatPrice = (amountEur: number): string => {
      const converted = amountEur * CONVERSION_RATES[currency];
      // Le franc CFA ne se subdivise pas : on l'arrondit à l'unité.
      const fractionDigits = currency === "XOF" ? 0 : Number.isInteger(converted) ? 0 : 2;
      const formatted = converted.toLocaleString(locale, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      });
      const { symbol, position } = CURRENCY_SYMBOLS[currency];

      return position === "before" ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
    };

    return {
      language,
      setLanguage,
      currency,
      setCurrency,
      t,
      formatPrice,
      currencySymbol: CURRENCY_SYMBOLS[currency].symbol,
      locale,
    };
  }, [language, currency, setLanguage, setCurrency]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
