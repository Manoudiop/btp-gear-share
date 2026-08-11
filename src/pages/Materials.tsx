
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MaterialsGrid from "@/components/MaterialsGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

const Materials = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Seo title={t("nav.materials")} description={t("seo.materialsDesc")} />

      <div className="pt-24 pb-10">
        <MaterialsGrid />
      </div>
      
      <section className="bg-primary/5 py-16">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("materials.customTitle")}</h2>
          <p className="text-muted-foreground mb-8">
            {t("materials.customDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-premium" asChild>
              <Link to="/contact">
                {t("materials.contactAdvisor")}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/custom-quote">
                {t("materials.requestQuote")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Materials;
