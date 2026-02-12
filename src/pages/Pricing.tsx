
import { useState } from "react";
import { Check, X, ArrowRight, Zap, Shield, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Plan IDs ready for Stripe integration
export const PRICING_PLANS = [
  {
    id: "free",
    stripePriceId: { monthly: null, annually: null },
    nameKey: "plan.free.name",
    descKey: "plan.free.desc",
    ctaKey: "plan.free.cta",
    icon: Zap,
    price: { monthly: 0, annually: 0 },
    featureKeys: [
      "feature.catalog",
      "feature.3requests",
      "feature.emailSupport",
      "feature.securePayment",
    ],
    limitationKeys: [
      "limit.noPriority",
      "limit.noPremiumInsurance",
      "limit.noFreeDelivery",
      "limit.noDiscounts",
    ],
    popular: false,
  },
  {
    id: "pro",
    stripePriceId: { monthly: null, annually: null },
    nameKey: "plan.pro.name",
    descKey: "plan.pro.desc",
    ctaKey: "plan.pro.cta",
    icon: Shield,
    price: { monthly: 49, annually: 39 },
    featureKeys: [
      "feature.allFree",
      "feature.unlimited",
      "feature.priority",
      "feature.support247",
      "feature.freeDelivery50",
      "feature.discount10",
      "feature.standardInsurance",
    ],
    limitationKeys: ["limit.noPremiumInsurance"],
    popular: true,
  },
  {
    id: "enterprise",
    stripePriceId: { monthly: null, annually: null },
    nameKey: "plan.enterprise.name",
    descKey: "plan.enterprise.desc",
    ctaKey: "plan.enterprise.cta",
    icon: HeadphonesIcon,
    price: { monthly: 149, annually: 119 },
    featureKeys: [
      "feature.allPro",
      "feature.dedicatedManager",
      "feature.api",
      "feature.freeDelivery100",
      "feature.discount20",
      "feature.premiumInsurance",
      "feature.reports",
      "feature.training",
    ],
    limitationKeys: [],
    popular: false,
  },
];

const COMPARISON_FEATURE_KEYS = [
  { labelKey: "comp.rentalRequests", freeKey: "comp.3perMonth", proKey: "comp.unlimited", enterpriseKey: "comp.unlimited" },
  { labelKey: "comp.support", freeKey: "comp.email", proKey: "comp.247", enterpriseKey: "comp.dedicated" },
  { labelKey: "comp.freeDelivery", free: false, pro: "< 50km", enterprise: "< 100km" },
  { labelKey: "comp.discount", free: false, pro: "10%", enterprise: "20%" },
  { labelKey: "comp.priorityBooking", free: false, pro: true, enterprise: true },
  { labelKey: "comp.standardInsurance", free: false, pro: true, enterprise: true },
  { labelKey: "comp.premiumInsurance", free: false, pro: false, enterprise: true },
  { labelKey: "comp.api", free: false, pro: false, enterprise: true },
  { labelKey: "comp.reports", free: false, pro: false, enterprise: true },
  { labelKey: "comp.dedicatedManager", free: false, pro: false, enterprise: true },
];

const FAQ_KEYS = [
  { qKey: "faq.q1", aKey: "faq.a1" },
  { qKey: "faq.q2", aKey: "faq.a2" },
  { qKey: "faq.q3", aKey: "faq.a3" },
  { qKey: "faq.q4", aKey: "faq.a4" },
  { qKey: "faq.q5", aKey: "faq.a5" },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { t, formatPrice } = useLanguage();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  const handleSubscribe = (planId: string) => {
    if (planId === "free") {
      navigate("/register");
    } else if (planId === "enterprise") {
      navigate("/contact");
    } else {
      toast.info("L'intégration de paiement sera bientôt disponible.");
      navigate("/register");
    }
  };

  const renderCellValue = (value: boolean | string) => {
    if (value === true) return <Check className="h-5 w-5 text-primary mx-auto" />;
    if (value === false) return <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />;
    return <span className="text-sm font-medium">{value}</span>;
  };

  const getCompValue = (feature: typeof COMPARISON_FEATURE_KEYS[0], col: "free" | "pro" | "enterprise") => {
    const keyField = `${col}Key` as keyof typeof feature;
    if (keyField in feature) return t(feature[keyField] as string);
    return (feature as any)[col];
  };

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="secondary" className="mb-4">{t("pricing.badge")}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("pricing.title1")}<span className="text-primary">{t("pricing.title2")}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("pricing.subtitle")}
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
            {t("pricing.monthly")}
          </button>
          <button
            onClick={() => setBillingPeriod("annually")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              billingPeriod === "annually"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("pricing.annually")}
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
                    {t("pricing.mostPopular")}
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${plan.popular ? "bg-primary/10" : "bg-muted"}`}>
                      <PlanIcon className={`h-5 w-5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="text-2xl font-bold">{t(plan.nameKey)}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{t(plan.descKey)}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">{formatPrice(price)}</span>
                    {price > 0 && (
                      <span className="text-muted-foreground ml-2">{t("pricing.perMonth")}</span>
                    )}
                  </div>
                  {price > 0 && billingPeriod === "annually" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatPrice(price * 12)} {t("pricing.billedAnnually")}
                    </p>
                  )}
                  {price === 0 && (
                    <p className="text-sm text-muted-foreground mt-1">{t("pricing.forever")}</p>
                  )}
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.featureKeys.map((key, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{t(key)}</span>
                    </div>
                  ))}
                  {plan.limitationKeys.map((key, i) => (
                    <div key={i} className="flex items-start text-muted-foreground">
                      <X className="h-5 w-5 text-muted-foreground/50 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{t(key)}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${plan.popular ? "button-premium" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {t(plan.ctaKey)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">{t("pricing.comparison")}</h2>
          <div className="border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">{t("pricing.feature")}</th>
                    <th className="text-center p-4 font-semibold">{t("plan.free.name")}</th>
                    <th className="text-center p-4 font-semibold text-primary">{t("plan.pro.name")}</th>
                    <th className="text-center p-4 font-semibold">{t("plan.enterprise.name")}</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURE_KEYS.map((feature, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-4 text-sm font-medium">{t(feature.labelKey)}</td>
                      <td className="p-4 text-center">{renderCellValue(getCompValue(feature, "free"))}</td>
                      <td className="p-4 text-center bg-primary/5">{renderCellValue(getCompValue(feature, "pro"))}</td>
                      <td className="p-4 text-center">{renderCellValue(getCompValue(feature, "enterprise"))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">{t("pricing.faq")}</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_KEYS.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{t(item.qKey)}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(item.aKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="bg-secondary/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">{t("pricing.customTitle")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("pricing.customDesc")}
              </p>
              <Button
                className="button-premium"
                onClick={() => navigate("/custom-quote")}
              >
                {t("pricing.customCta")}
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
