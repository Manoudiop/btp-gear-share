
import { useState } from "react";
import { Filter, ArrowUpDown, Map, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import EquipmentCard from "@/components/EquipmentCard";
import CategoryButton from "@/components/CategoryButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Equipment = () => {
  const [activeCategory, setActiveCategory] = useState("Pelleteuses");
  const [viewMode, setViewMode] = useState("grid");
  
  const categories = [
    { icon: <Map className="h-6 w-6" />, label: "Tout" },
    { icon: <Filter className="h-6 w-6" />, label: "Pelleteuses" },
    { icon: <Filter className="h-6 w-6" />, label: "Camions" },
    { icon: <Filter className="h-6 w-6" />, label: "Échafaudages" },
    { icon: <Filter className="h-6 w-6" />, label: "Marteaux piqueurs" },
    { icon: <Filter className="h-6 w-6" />, label: "Bétonnières" },
    { icon: <Filter className="h-6 w-6" />, label: "Outillage" },
  ];

  const equipmentData = [
    {
      id: "1",
      name: "Pelleteuse Caterpillar 320",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Pelleteuses",
      price: 350,
      rating: 4.8,
      location: "Lyon",
      isAvailable: true,
    },
    {
      id: "2",
      name: "Chargeuse JCB 437",
      image: "https://images.unsplash.com/photo-1573611030146-ff6916c398f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Chargeuses",
      price: 280,
      rating: 4.6,
      location: "Marseille",
      isAvailable: true,
    },
    {
      id: "3",
      name: "Camion benne Volvo FMX",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Camions",
      price: 420,
      rating: 4.9,
      location: "Paris",
      isAvailable: true,
    },
    {
      id: "4",
      name: "Bétonnière PRO 350L",
      image: "https://images.unsplash.com/photo-1579165466741-7f35e4755183?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Bétonnières",
      price: 80,
      rating: 4.5,
      location: "Toulouse",
      isAvailable: false,
    },
    {
      id: "5",
      name: "Marteau piqueur Bosch GSH 27",
      image: "https://images.unsplash.com/photo-1622142377395-2210cbdad39e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Marteaux piqueurs",
      price: 60,
      rating: 4.7,
      location: "Nice",
      isAvailable: true,
    },
    {
      id: "6",
      name: "Échafaudage modulaire 8m",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Échafaudages",
      price: 120,
      rating: 4.4,
      location: "Bordeaux",
      isAvailable: true,
    },
    {
      id: "7",
      name: "Pelleteuse Hitachi ZX350",
      image: "https://images.unsplash.com/photo-1506843561735-0e6b5a0e06fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Pelleteuses",
      price: 380,
      rating: 4.7,
      location: "Nantes",
      isAvailable: true,
    },
    {
      id: "8",
      name: "Mini pelle Kubota KX91-3",
      image: "https://images.unsplash.com/photo-1532343071564-5e97caaa9311?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Pelleteuses",
      price: 220,
      rating: 4.9,
      location: "Lille",
      isAvailable: true,
    },
    {
      id: "9",
      name: "Scie circulaire Makita",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Outillage",
      price: 40,
      rating: 4.6,
      location: "Strasbourg",
      isAvailable: true,
    },
  ];

  const filteredEquipment = activeCategory === "Tout" 
    ? equipmentData 
    : equipmentData.filter(item => item.category === activeCategory);

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Équipements disponibles</h1>
          <p className="text-muted-foreground">
            Trouvez l'équipement parfait pour votre chantier parmi notre large sélection
          </p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Filtrer par catégorie</h2>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <List className="h-4 w-4 mr-2" />
                Grille
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <Map className="h-4 w-4 mr-2" />
                Carte
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                icon={category.icon}
                label={category.label}
                isActive={activeCategory === category.label}
                onClick={() => setActiveCategory(category.label)}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {filteredEquipment.length} résultats trouvés
            </h2>
            <div>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Trier par
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">Tout</TabsTrigger>
              <TabsTrigger value="available">Disponible</TabsTrigger>
              <TabsTrigger value="unavailable">Non disponible</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((equipment) => (
                  <EquipmentCard key={equipment.id} {...equipment} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="available" className="pt-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment
                  .filter((item) => item.isAvailable)
                  .map((equipment) => (
                    <EquipmentCard key={equipment.id} {...equipment} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="unavailable" className="pt-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment
                  .filter((item) => !item.isAvailable)
                  .map((equipment) => (
                    <EquipmentCard key={equipment.id} {...equipment} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
