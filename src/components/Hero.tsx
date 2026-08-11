
import { Tractor, Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  const stats = [t("hero.stat.catalog"), t("hero.stat.delivery"), t("hero.stat.support")];

  return (
    <section className="pt-24 pb-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("hero.title1")}
              <span className="text-primary">{t("hero.title2")}</span>
            </h1>

            <p className="text-xl text-muted-foreground">{t("hero.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="button-premium" asChild>
                <Link to="/equipment">
                  <Tractor className="mr-2 h-5 w-5" />
                  {t("home.cta.find")}
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="button-outline" asChild>
                <Link to="/materials">
                  <Package className="mr-2 h-5 w-5" />
                  {t("hero.buyMaterials")}
                </Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              {stats.map((stat) => (
                <div key={stat} className="flex items-center">
                  <div className="bg-primary/10 text-primary rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="ml-2">{stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative order-first lg:order-last animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt={t("hero.subtitle")}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
              <p className="font-medium">{t("hero.saveUpTo")}</p>
              <p className="text-2xl font-bold text-primary">40%</p>
              <p className="text-sm text-muted-foreground">{t("hero.saveOn")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-secondary/30 py-6">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70">
            {[1, 2, 3, 4, 5].map((partner) => (
              <img
                key={partner}
                src="https://placehold.co/120x40/333/FFF?text=PARTNER"
                alt="Partner"
                className="h-6 md:h-8"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
