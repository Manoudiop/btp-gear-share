
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDown, Map, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import EquipmentCard from "@/components/EquipmentCard";
import CategoryButton from "@/components/CategoryButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEquipmentList } from "@/data/queries";
import { ALL_CATEGORIES, equipmentCategoryOptions, categoryLabel } from "@/data/categoryIcons";
import type { Equipment as EquipmentItem } from "@/data/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

const PAGE_SIZE = 6;

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

const Equipment = () => {
  const { t } = useLanguage();
  const { data: equipment = [], isLoading, isError, refetch } = useEquipmentList();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? ALL_CATEGORIES;
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [page, setPage] = useState(1);

  const selectCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (category === ALL_CATEGORIES) {
      next.delete("category");
    } else {
      next.set("category", category);
    }
    setSearchParams(next);
  };

  const filteredEquipment = useMemo(() => {
    const byCategory =
      activeCategory === ALL_CATEGORIES
        ? equipment
        : equipment.filter((item) => item.category === activeCategory);

    const bySearch = query
      ? byCategory.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query),
        )
      : byCategory;

    const sorters: Record<SortOption, (a: EquipmentItem, b: EquipmentItem) => number> = {
      relevance: () => 0,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };

    return [...bySearch].sort(sorters[sortBy]);
  }, [equipment, activeCategory, query, sortBy]);

  // Une catégorie ou une recherche qui change peut rendre la page courante vide.
  useEffect(() => {
    setPage(1);
  }, [activeCategory, query, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredEquipment.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginatedEquipment = filteredEquipment.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const renderGrid = (items: EquipmentItem[]) =>
    isError ? (
      <div className="py-12 text-center">
        <p className="mb-4 text-muted-foreground">{t("common.loadError")}</p>
        <Button variant="outline" onClick={() => refetch()}>
          {t("common.retry")}
        </Button>
      </div>
    ) : isLoading ? (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    ) : items.length > 0 ? (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <EquipmentCard key={item.id} {...item} />
        ))}
      </div>
    ) : (
      <p className="py-12 text-center text-muted-foreground">
        {t("equipment.noResults")}
      </p>
    );

  return (
    <>
      <Seo title={t("equipment.pageTitle")} description={t("seo.equipmentDesc")} />
      <div className="pt-24 pb-16">
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{t("equipment.pageTitle")}</h1>
            <p className="text-muted-foreground">
              {t("equipment.pageSubtitle")}
            </p>
          </div>

          <div className="mb-8">
            <SearchBar placeholder={t("equipment.searchPlaceholder")} />
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{t("equipment.filterByCategory")}</h2>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <List className="h-4 w-4 mr-2" />
                  {t("equipment.viewGrid")}
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4 mr-2" />
                  {t("equipment.viewMap")}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {equipmentCategoryOptions.map((category) => (
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

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {t("equipment.results", { count: filteredEquipment.length })}
              </h2>
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

            {viewMode === "map" ? (
              <div className="rounded-xl border bg-muted/30 py-24 text-center text-muted-foreground">
                <Map className="mx-auto mb-3 h-8 w-8" />
                <p>{t("equipment.mapSoon")}</p>
              </div>
            ) : (
              <>
                <Tabs defaultValue="all" className="mb-6">
                  <TabsList>
                    <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
                    <TabsTrigger value="available">{t("common.available")}</TabsTrigger>
                    <TabsTrigger value="unavailable">{t("common.unavailable")}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="pt-4">
                    {renderGrid(paginatedEquipment)}
                  </TabsContent>
                  <TabsContent value="available" className="pt-4">
                    {renderGrid(paginatedEquipment.filter((item) => item.isAvailable))}
                  </TabsContent>
                  <TabsContent value="unavailable" className="pt-4">
                    {renderGrid(paginatedEquipment.filter((item) => !item.isAvailable))}
                  </TabsContent>
                </Tabs>

                {pageCount > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          aria-disabled={currentPage === 1}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage((p) => Math.max(1, p - 1));
                          }}
                        />
                      </PaginationItem>
                      {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            isActive={pageNumber === currentPage}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          aria-disabled={currentPage === pageCount}
                          className={
                            currentPage === pageCount ? "pointer-events-none opacity-50" : ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setPage((p) => Math.min(pageCount, p + 1));
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Equipment;
