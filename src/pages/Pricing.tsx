
import { useState } from "react";
import { Check, X, ArrowRight, Zap, Shield, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Plan IDs ready for Stripe integration
export const PRICING_PLANS = [
  {
    id: "free",
    stripePriceId: { monthly: null, annually: null },
    name: "Gratuit",
    description: "Pour découvrir la plateforme et les petits projets",
    icon: Zap,
    price: { monthly: 0, annually: 0 },
    features: [
      "Accès au catalogue d'équipements",
      "Jusqu'à 3 demandes de location par mois",
      "Support client par email",
      "Paiement sécurisé",
    ],
    limitations: [
      "Pas de réservation prioritaire",
      "Pas d'assurance premium",
      "Pas de livraison gratuite",
      "Pas de remises exclusives",
    ],
    cta: "Commencer gratuitement",
    popular: false,
  },
  {
    id: "pro",
    stripePriceId: { monthly: null, annually: null },
    name: "Pro",
    description: "Pour les entrepreneurs et PME du BTP",
    icon: Shield,
    price: { monthly: 49, annually: 39 },
    features: [
      "Tout ce qui est inclus dans Gratuit",
      "Demandes de location illimitées",
      "Réservation prioritaire",
      "Support client 24/7",
      "Livraison gratuite (< 50km)",
      "Remise de 10% sur toutes les locations",
      "Assurance standard incluse",
    ],
    limitations: ["Pas d'assurance premium"],
    cta: "Essayer 14 jours gratuits",
    popular: true,
  },
  {
    id: "enterprise",
    stripePriceId: { monthly: null, annually: null },
    name: "Enterprise",
    description: "Pour les grandes entreprises avec besoins réguliers",
    icon: HeadphonesIcon,
    price: { monthly: 149, annually: 119 },
    features: [
      "Tout ce qui est inclus dans Pro",
      "Gestionnaire de compte dédié",
      "API pour intégration",
      "Livraison gratuite (< 100km)",
      "Remise de 20% sur toutes les locations",
      "Assurance premium incluse",
      "Rapports détaillés et analyses",
      "Formations personnalisées",
    ],
    limitations: [],
    cta: "Contacter les ventes",
    popular: false,
  },
];

const FAQ_ITEMS = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Le changement prend effet immédiatement et la facturation est ajustée au prorata.",
  },
  {
    question: "Comment fonctionne l'essai gratuit de 14 jours ?",
    answer: "L'essai gratuit vous donne accès à toutes les fonctionnalités du plan Pro pendant 14 jours. Aucune carte bancaire n'est requise pour commencer. À la fin de la période d'essai, vous pouvez choisir de continuer ou revenir au plan Gratuit.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), les virements SEPA et les prélèvements automatiques pour les plans annuels.",
  },
  {
    question: "Y a-t-il un engagement de durée ?",
    answer: "Non, les plans mensuels sont sans engagement. Les plans annuels bénéficient d'une réduction de 20% et sont facturés annuellement. Vous pouvez annuler à tout moment.",
  },
  {
    question: "L'assurance est-elle incluse dans tous les plans ?",
    answer: "L'assurance standard est incluse dans le plan Pro. L'assurance premium, qui couvre les dommages accidentels et le vol, est incluse uniquement dans le plan Enterprise.",
  },
];

const COMPARISON_FEATURES = [
  { label: "Demandes de location", free: "3/mois", pro: "Illimitées", enterprise: "Illimitées" },
  { label: "Support client", free: "Email", pro: "24/7", enterprise: "Dédié" },
  { label: "Livraison gratuite", free: false, pro: "< 50km", enterprise: "< 100km" },
  { label: "Remise sur locations", free: false, pro: "10%", enterprise: "20%" },
  { label: "Réservation prioritaire", free: false, pro: true, enterprise: true },
  { label: "Assurance standard", free: false, pro: true, enterprise: true },
  { label: "Assurance premium", free: false, pro: false, enterprise: true },
  { label: "API & intégrations", free: false, pro: false, enterprise: true },
  { label: "Rapports & analyses", free: false, pro: false, enterprise: true },
  { label: "Gestionnaire dédié", free: false, pro: false, enterprise: true },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  const handleSubscribe = (planId: string) => {
    if (planId === "free") {
      navigate("/register");
    } else if (planId === "enterprise") {
      navigate("/contact");
    } else {
      // Stripe integration placeholder
      toast.info("L'intégration de paiement sera bientôt disponible. Créez un compte pour commencer !");
      navigate("/register");
    }
  };

  const renderCellValue = (value: boolean | string) => {
    if (value === true) return <Check className="h-5 w-5 text-primary mx-auto" />;
    if (value === false) return <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />;
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="secondary" className="mb-4">Tarification</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Des plans adaptés à <span className="text-primary">chaque besoin</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choisissez le forfait qui correspond le mieux à vos besoins en matériel de construction
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              billingPeriod === "monthly"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingPeriod("annually")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              billingPeriod === "annually"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Annuel
            <Badge variant="outline" className="ml-2 text-xs border-primary text-primary">
              -20%
            </Badge>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const price = plan.price[billingPeriod];
            const PlanIcon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative border rounded-2xl p-8 flex flex-col h-full transition-shadow hover:shadow-lg ${
                  plan.popular
                    ? "border-primary shadow-lg ring-1 ring-primary/20"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${plan.popular ? "bg-primary/10" : "bg-muted"}`}>
                      <PlanIcon className={`h-5 w-5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">{price}€</span>
                    {price > 0 && (
                      <span className="text-muted-foreground ml-2">/mois</span>
                    )}
                  </div>
                  {price > 0 && billingPeriod === "annually" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Soit {price * 12}€ facturé annuellement
                    </p>
                  )}
                  {price === 0 && (
                    <p className="text-sm text-muted-foreground mt-1">Pour toujours</p>
                  )}
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <div key={i} className="flex items-start text-muted-foreground">
                      <X className="h-5 w-5 text-muted-foreground/50 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${plan.popular ? "button-premium" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Comparaison détaillée</h2>
          <div className="border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Fonctionnalité</th>
                    <th className="text-center p-4 font-semibold">Gratuit</th>
                    <th className="text-center p-4 font-semibold text-primary">Pro</th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feature, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-4 text-sm font-medium">{feature.label}</td>
                      <td className="p-4 text-center">{renderCellValue(feature.free)}</td>
                      <td className="p-4 text-center bg-primary/5">{renderCellValue(feature.pro)}</td>
                      <td className="p-4 text-center">{renderCellValue(feature.enterprise)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="bg-secondary/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Besoin d'une solution sur mesure ?</h2>
              <p className="text-muted-foreground mb-6">
                Contactez notre équipe commerciale pour discuter de vos besoins spécifiques et obtenir une tarification personnalisée.
              </p>
              <Button
                className="button-premium"
                onClick={() => navigate("/custom-quote")}
              >
                Demander un devis personnalisé
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-5xl">🤝</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
