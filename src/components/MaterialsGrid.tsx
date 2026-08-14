
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import CategoryButton from "./CategoryButton";
import MaterialCard from "./MaterialCard";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMaterialList } from "@/data/queries";
import { ALL_CATEGORIES, materialCategoryOptions, categoryLabel } from "@/data/categoryIcons";
import type { Material } from "@/data/types";
import { useLanguage } from "@/contexts/LanguageContext";

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

const MaterialsGrid = () => {
  const { t } = useLanguage();
  const { data: materials = [], isLoading, isError, refetch } = useMaterialList();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? ALL_CATEGORIES;
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const selectCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (category === ALL_CATEGORIES) {
      next.delete("category");
    } else {
      next.set("category", category);
    }
    setSearchParams(next);
  };

  const filteredMaterials = useMemo(() => {
    const byCategory =
      activeCategory === ALL_CATEGORIES
        ? materials
        : materials.filter((item) => item.category === activeCategory);

    const bySearch = query
      ? byCategory.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.supplier.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query),
        )
      : byCategory;

    const sorters: Record<SortOption, (a: Material, b: Material) => number> = {
      relevance: () => 0,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };

    return [...bySearch].sort(sorters[sortBy]);
  }, [materials, activeCategory, query, sortBy]);

  return (
    <div className="section-container">
      <div className="mb-12 max-w-xl mx-auto text-center animate-fade-up">
        <h2 className="text-3xl font-bold mb-4">{t("materials.gridTitle")}</h2>
        <p className="text-muted-foreground">
          {t("materials.gridSubtitle")}
        </p>
      </div>

      <div className="mb-12 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <SearchBar target="/materials" placeholder={t("materials.searchPlaceholder")} />
      </div>

      <div className="mb-12 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <h3 className="text-xl font-semibold mb-6">{t("materials.categories")}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {materialCategoryOptions.map((category) => (
            <CategoryButton
              key={category.label}
              icon={category.icon}
              label={categoryLabel(t, category.label)}
              isActive={activeCategory === category.label}
              onClick={() => selectCategory(category.label)}
            />
          ))}
        </div>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {t("materials.count", { count: filteredMaterials.length })}
          </h3>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[200px]">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t("common.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">{t("common.relevance")}</SelectItem>
              <SelectItem value="price-asc">{t("common.priceAsc")}</SelectItem>
              <SelectItem value="price-desc">{t("common.priceDesc")}</SelectItem>
              <SelectItem value="rating">{t("common.bestRated")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isError ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-muted-foreground">{t("common.loadError")}</p>
            <Button variant="outline" onClick={() => refetch()}>
              {t("common.retry")}
            </Button>
          </div>
        ) : isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : filteredMaterials.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <MaterialCard key={material.id} {...material} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            {t("materials.noResults")}
          </p>
        )}
      </div>
    </div>
  );
};

export default MaterialsGrid;
