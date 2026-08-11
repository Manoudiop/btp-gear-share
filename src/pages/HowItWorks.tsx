
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    { key: "how.step1", icon: "🔍" },
    { key: "how.step2", icon: "📅" },
    { key: "how.step3", icon: "💳" },
    { key: "how.step4", icon: "🚚" },
  ];

  const benefits = ["how.benefit1", "how.benefit2", "how.benefit3", "how.benefit4"];
  const points = ["how.point1", "how.point2", "how.point3", "how.point4"];

  return (
    <div className="pt-24 pb-16">
      <Seo title={t("how.title")} description={t("how.subtitle")} />

      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("how.title")}</h1>
          <p className="text-xl text-muted-foreground">{t("how.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="relative rounded-xl overflow-hidden shadow-premium aspect-video">
              <img
                src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                alt={t("how.introTitle")}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{t("how.introTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("how.introDesc")}</p>
            <div className="flex flex-col space-y-4">
              {points.map((point) => (
                <div key={point} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  <span>{t(point)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t("how.stepsTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.key}
                className="bg-secondary/30 p-6 rounded-xl relative hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4" aria-hidden="true">
                  {step.icon}
                </div>
                <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`${step.key}.title`)}</h3>
                <p className="text-muted-foreground">{t(`${step.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-secondary/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("how.whyTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("how.whySubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="bg-white p-6 rounded-xl shadow-subtle flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{t(`${benefit}.title`)}</h3>
                <p className="text-muted-foreground">{t(`${benefit}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{t("how.ctaTitle")}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{t("how.ctaDesc")}</p>
          <Button size="lg" className="button-premium" asChild>
            <Link to="/equipment">
              {t("how.ctaButton")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
