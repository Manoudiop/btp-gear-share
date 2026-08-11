
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryButton from "./CategoryButton";
import EquipmentCard from "./EquipmentCard";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { equipment } from "@/data/equipment";
import { categoryLabel, popularEquipmentCategories } from "@/data/categoryIcons";
import { useLanguage } from "@/contexts/LanguageContext";

const EquipmentGrid = () => {
  const { t } = useLanguage();
  const categories = popularEquipmentCategories;
  // Les 6 équipements les mieux notés, en guise de sélection « récents ».
  const featuredEquipment = [...equipment].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="section-container">
      <div className="mb-12 max-w-xl mx-auto text-center animate-fade-up">
        <h2 className="text-3xl font-bold mb-4">
          {t("equipment.gridTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("equipment.gridSubtitle")}
        </p>
      </div>

      <div className="mb-12 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <SearchBar />
      </div>

      <div className="mb-12 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{t("equipment.popularCategories")}</h3>
          <Button variant="ghost" className="text-primary flex items-center gap-1" asChild>
            <Link to="/equipment">
              {t("common.viewAll")} <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link to={`/equipment?category=${encodeURIComponent(category.label)}`} key={category.label}>
              <CategoryButton icon={category.icon} label={categoryLabel(t, category.label)} />
            </Link>
          ))}
        </div>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">{t("equipment.recent")}</h3>
          <Button variant="ghost" className="text-primary flex items-center gap-1" asChild>
            <Link to="/equipment">
              {t("common.viewAll")} <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEquipment.map((item) => (
            <EquipmentCard key={item.id} {...item} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" className="button-premium" asChild>
            <Link to="/equipment">
              {t("equipment.explore")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentGrid;
