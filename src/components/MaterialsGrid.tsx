
import { Sand, Package, Shovel, Boxes, Box, ShoppingCart, ChevronRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CategoryButton from "./CategoryButton";
import MaterialCard from "./MaterialCard";
import SearchBar from "./SearchBar";

const MaterialsGrid = () => {
  const categories = [
    { icon: <Sand className="h-6 w-6" />, label: "Sable" },
    { icon: <Package className="h-6 w-6" />, label: "Ciment" },
    { icon: <Box className="h-6 w-6" />, label: "Béton" },
    { icon: <Boxes className="h-6 w-6" />, label: "Agrégats" },
    { icon: <Shovel className="h-6 w-6" />, label: "Terre" },
    { icon: <ShoppingCart className="h-6 w-6" />, label: "Tous" },
  ];

  const materialsData = [
    {
      id: "1",
      name: "Sable de construction fin",
      image: "https://images.unsplash.com/photo-1582469566055-5216648cc753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Sable",
      price: 45,
      unit: "tonne",
      rating: 4.7,
      supplier: "Matériaux Express",
      isAvailable: true,
    },
    {
      id: "2",
      name: "Ciment Portland 32.5",
      image: "https://images.unsplash.com/photo-1604163546180-039a1781c0d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Ciment",
      price: 95,
      unit: "tonne",
      rating: 4.9,
      supplier: "Ciments de France",
      isAvailable: true,
    },
    {
      id: "3",
      name: "Béton prêt à l'emploi C25/30",
      image: "https://images.unsplash.com/photo-1566027310713-1d34d3c2c654?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Béton",
      price: 110,
      unit: "m³",
      rating: 4.8,
      supplier: "Béton Solutions",
      isAvailable: true,
    },
    {
      id: "4",
      name: "Gravier 20/40mm",
      image: "https://images.unsplash.com/photo-1518406432532-9cbef5697723?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Agrégats",
      price: 38,
      unit: "tonne",
      rating: 4.6,
      supplier: "Carrières du Sud",
      isAvailable: true,
    },
    {
      id: "5",
      name: "Terre végétale amendée",
      image: "https://images.unsplash.com/photo-1595915636540-3142ee10d19c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Terre",
      price: 55,
      unit: "m³",
      rating: 4.5,
      supplier: "Terres & Jardins",
      isAvailable: false,
    },
    {
      id: "6",
      name: "Sable de rivière lavé",
      image: "https://images.unsplash.com/photo-1600007277799-44736c28e2f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Sable",
      price: 52,
      unit: "tonne",
      rating: 4.8,
      supplier: "Matériaux Express",
      isAvailable: true,
    },
  ];

  return (
    <div className="section-container">
      <div className="mb-12 max-w-xl mx-auto text-center animate-fade-up">
        <h2 className="text-3xl font-bold mb-4">
          Matériaux de construction de qualité
        </h2>
        <p className="text-muted-foreground">
          Commandez du sable, ciment, béton et autres matériaux directement auprès de nos fournisseurs certifiés
        </p>
      </div>

      <div className="mb-12 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <SearchBar placeholder="Rechercher des matériaux..." />
      </div>

      <div className="mb-12 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Catégories de matériaux</h3>
          <Button variant="ghost" className="text-primary flex items-center gap-1">
            <Filter className="h-4 w-4 mr-1" />
            Filtrer
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryButton
              key={index}
              icon={category.icon}
              label={category.label}
              isActive={index === 0}
            />
          ))}
        </div>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Matériaux populaires</h3>
          <Button variant="ghost" className="text-primary flex items-center gap-1">
            Voir tout <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialsData.map((material) => (
            <MaterialCard key={material.id} {...material} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" className="button-premium">
            Voir tous les matériaux
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaterialsGrid;
