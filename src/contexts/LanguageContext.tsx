import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "fr" | "en";
export type Currency = "EUR" | "XOF" | "USD";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (amountEur: number) => string;
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

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { fr: "Accueil", en: "Home" },
  "nav.equipment": { fr: "Équipement", en: "Equipment" },
  "nav.materials": { fr: "Matériaux", en: "Materials" },
  "nav.howItWorks": { fr: "Comment ça marche", en: "How it works" },
  "nav.pricing": { fr: "Tarifs", en: "Pricing" },
  "nav.about": { fr: "À propos", en: "About" },
  "nav.contact": { fr: "Contact", en: "Contact" },
  "nav.search": { fr: "Rechercher", en: "Search" },
  "nav.login": { fr: "Connexion", en: "Login" },
  "nav.becomeOwner": { fr: "Devenir loueur", en: "Become a renter" },
  "nav.myAccount": { fr: "Mon compte", en: "My account" },
  "nav.dashboard": { fr: "Tableau de bord", en: "Dashboard" },
  "nav.settings": { fr: "Paramètres", en: "Settings" },
  "nav.logout": { fr: "Se déconnecter", en: "Logout" },
  "nav.cart": { fr: "Panier", en: "Cart" },

  // Pricing page
  "pricing.badge": { fr: "Tarification", en: "Pricing" },
  "pricing.title1": { fr: "Des plans adaptés à ", en: "Plans tailored to " },
  "pricing.title2": { fr: "chaque besoin", en: "every need" },
  "pricing.subtitle": { fr: "Choisissez le forfait qui correspond le mieux à vos besoins en matériel de construction", en: "Choose the plan that best fits your construction equipment needs" },
  "pricing.monthly": { fr: "Mensuel", en: "Monthly" },
  "pricing.annually": { fr: "Annuel", en: "Annual" },
  "pricing.perMonth": { fr: "/mois", en: "/month" },
  "pricing.billedAnnually": { fr: "facturé annuellement", en: "billed annually" },
  "pricing.forever": { fr: "Pour toujours", en: "Forever" },
  "pricing.mostPopular": { fr: "Le plus populaire", en: "Most popular" },
  "pricing.comparison": { fr: "Comparaison détaillée", en: "Detailed comparison" },
  "pricing.feature": { fr: "Fonctionnalité", en: "Feature" },
  "pricing.faq": { fr: "Questions fréquentes", en: "FAQ" },
  "pricing.customTitle": { fr: "Besoin d'une solution sur mesure ?", en: "Need a custom solution?" },
  "pricing.customDesc": { fr: "Contactez notre équipe commerciale pour discuter de vos besoins spécifiques et obtenir une tarification personnalisée.", en: "Contact our sales team to discuss your specific needs and get custom pricing." },
  "pricing.customCta": { fr: "Demander un devis personnalisé", en: "Request a custom quote" },

  // Plan names
  "plan.free.name": { fr: "Gratuit", en: "Free" },
  "plan.free.desc": { fr: "Pour découvrir la plateforme et les petits projets", en: "To discover the platform and small projects" },
  "plan.free.cta": { fr: "Commencer gratuitement", en: "Start for free" },
  "plan.pro.name": { fr: "Pro", en: "Pro" },
  "plan.pro.desc": { fr: "Pour les entrepreneurs et PME du BTP", en: "For contractors and SMEs in construction" },
  "plan.pro.cta": { fr: "Essayer 14 jours gratuits", en: "Try 14 days free" },
  "plan.enterprise.name": { fr: "Enterprise", en: "Enterprise" },
  "plan.enterprise.desc": { fr: "Pour les grandes entreprises avec besoins réguliers", en: "For large companies with regular needs" },
  "plan.enterprise.cta": { fr: "Contacter les ventes", en: "Contact sales" },

  // Plan features
  "feature.catalog": { fr: "Accès au catalogue d'équipements", en: "Access to equipment catalog" },
  "feature.3requests": { fr: "Jusqu'à 3 demandes de location par mois", en: "Up to 3 rental requests per month" },
  "feature.emailSupport": { fr: "Support client par email", en: "Email customer support" },
  "feature.securePayment": { fr: "Paiement sécurisé", en: "Secure payment" },
  "feature.allFree": { fr: "Tout ce qui est inclus dans Gratuit", en: "Everything in Free" },
  "feature.unlimited": { fr: "Demandes de location illimitées", en: "Unlimited rental requests" },
  "feature.priority": { fr: "Réservation prioritaire", en: "Priority booking" },
  "feature.support247": { fr: "Support client 24/7", en: "24/7 customer support" },
  "feature.freeDelivery50": { fr: "Livraison gratuite (< 50km)", en: "Free delivery (< 50km)" },
  "feature.discount10": { fr: "Remise de 10% sur toutes les locations", en: "10% discount on all rentals" },
  "feature.standardInsurance": { fr: "Assurance standard incluse", en: "Standard insurance included" },
  "feature.allPro": { fr: "Tout ce qui est inclus dans Pro", en: "Everything in Pro" },
  "feature.dedicatedManager": { fr: "Gestionnaire de compte dédié", en: "Dedicated account manager" },
  "feature.api": { fr: "API pour intégration", en: "API for integration" },
  "feature.freeDelivery100": { fr: "Livraison gratuite (< 100km)", en: "Free delivery (< 100km)" },
  "feature.discount20": { fr: "Remise de 20% sur toutes les locations", en: "20% discount on all rentals" },
  "feature.premiumInsurance": { fr: "Assurance premium incluse", en: "Premium insurance included" },
  "feature.reports": { fr: "Rapports détaillés et analyses", en: "Detailed reports and analytics" },
  "feature.training": { fr: "Formations personnalisées", en: "Personalized training" },

  // Limitations
  "limit.noPriority": { fr: "Pas de réservation prioritaire", en: "No priority booking" },
  "limit.noPremiumInsurance": { fr: "Pas d'assurance premium", en: "No premium insurance" },
  "limit.noFreeDelivery": { fr: "Pas de livraison gratuite", en: "No free delivery" },
  "limit.noDiscounts": { fr: "Pas de remises exclusives", en: "No exclusive discounts" },

  // Comparison table
  "comp.rentalRequests": { fr: "Demandes de location", en: "Rental requests" },
  "comp.support": { fr: "Support client", en: "Customer support" },
  "comp.freeDelivery": { fr: "Livraison gratuite", en: "Free delivery" },
  "comp.discount": { fr: "Remise sur locations", en: "Rental discount" },
  "comp.priorityBooking": { fr: "Réservation prioritaire", en: "Priority booking" },
  "comp.standardInsurance": { fr: "Assurance standard", en: "Standard insurance" },
  "comp.premiumInsurance": { fr: "Assurance premium", en: "Premium insurance" },
  "comp.api": { fr: "API & intégrations", en: "API & integrations" },
  "comp.reports": { fr: "Rapports & analyses", en: "Reports & analytics" },
  "comp.dedicatedManager": { fr: "Gestionnaire dédié", en: "Dedicated manager" },
  "comp.3perMonth": { fr: "3/mois", en: "3/month" },
  "comp.unlimited": { fr: "Illimitées", en: "Unlimited" },
  "comp.email": { fr: "Email", en: "Email" },
  "comp.247": { fr: "24/7", en: "24/7" },
  "comp.dedicated": { fr: "Dédié", en: "Dedicated" },

  // FAQ
  "faq.q1": { fr: "Puis-je changer de plan à tout moment ?", en: "Can I change plans at any time?" },
  "faq.a1": { fr: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement prend effet immédiatement et la facturation est ajustée au prorata.", en: "Yes, you can upgrade or downgrade your plan at any time. The change takes effect immediately and billing is prorated." },
  "faq.q2": { fr: "Comment fonctionne l'essai gratuit de 14 jours ?", en: "How does the 14-day free trial work?" },
  "faq.a2": { fr: "L'essai gratuit vous donne accès à toutes les fonctionnalités du plan Pro pendant 14 jours. Aucune carte bancaire n'est requise pour commencer.", en: "The free trial gives you access to all Pro plan features for 14 days. No credit card is required to start." },
  "faq.q3": { fr: "Quels moyens de paiement acceptez-vous ?", en: "What payment methods do you accept?" },
  "faq.a3": { fr: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), les virements SEPA et les prélèvements automatiques pour les plans annuels.", en: "We accept credit cards (Visa, Mastercard, American Express), SEPA transfers and direct debits for annual plans." },
  "faq.q4": { fr: "Y a-t-il un engagement de durée ?", en: "Is there a commitment period?" },
  "faq.a4": { fr: "Non, les plans mensuels sont sans engagement. Les plans annuels bénéficient d'une réduction de 20% et sont facturés annuellement.", en: "No, monthly plans are commitment-free. Annual plans benefit from a 20% discount and are billed annually." },
  "faq.q5": { fr: "L'assurance est-elle incluse dans tous les plans ?", en: "Is insurance included in all plans?" },
  "faq.a5": { fr: "L'assurance standard est incluse dans le plan Pro. L'assurance premium est incluse uniquement dans le plan Enterprise.", en: "Standard insurance is included in the Pro plan. Premium insurance is included only in the Enterprise plan." },

  // General
  "general.language": { fr: "Langue", en: "Language" },
  "general.currency": { fr: "Devise", en: "Currency" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");
  const [currency, setCurrency] = useState<Currency>("EUR");

  const t = (key: string): string => {
    return translations[key]?.[language] ?? key;
  };

  const formatPrice = (amountEur: number): string => {
    const converted = Math.round(amountEur * CONVERSION_RATES[currency]);
    const formatted = converted.toLocaleString(language === "fr" ? "fr-FR" : "en-US");
    const { symbol, position } = CURRENCY_SYMBOLS[currency];
    return position === "before" ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
