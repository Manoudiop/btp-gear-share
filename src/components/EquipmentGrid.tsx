
import { Tractor, Truck, ChevronRight, Construction, Hammer, Package, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryButton from "./CategoryButton";
import EquipmentCard from "./EquipmentCard";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";

const EquipmentGrid = () => {
  const categories = [
    { icon: <Tractor className="h-6 w-6" />, label: "Pelleteuses" },
    { icon: <Truck className="h-6 w-6" />, label: "Camions" },
    { icon: <Construction className="h-6 w-6" />, label: "Échafaudages" },
    { icon: <Hammer className="h-6 w-6" />, label: "Marteaux piqueurs" },
    { icon: <Package className="h-6 w-6" />, label: "Bétonnières" },
    { icon: <Wrench className="h-6 w-6" />, label: "Outillage" },
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
  ];

  return (
    <div className="section-container">
      <div className="mb-12 max-w-xl mx-auto text-center animate-fade-up">
        <h2 className="text-3xl font-bold mb-4">
          Trouvez l'équipement parfait pour votre chantier
        </h2>
        <p className="text-muted-foreground">
          Des milliers d'équipements à louer pour tous vos travaux, de la petite rénovation aux grands chantiers
        </p>
      </div>

      <div className="mb-12 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <SearchBar />
      </div>

      <div className="mb-12 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Catégories populaires</h3>
          <Button variant="ghost" className="text-primary flex items-center gap-1" asChild>
            <Link to="/equipment">
              Voir tout <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link to={`/equipment`} key={index}>
              <CategoryButton
                icon={category.icon}
                label={category.label}
                isActive={index === 0}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Équipements récents</h3>
          <Button variant="ghost" className="text-primary flex items-center gap-1" asChild>
            <Link to="/equipment">
              Voir tout <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentData.map((equipment) => (
            <EquipmentCard key={equipment.id} {...equipment} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" className="button-premium" asChild>
            <Link to="/equipment">
              Explorer plus d'équipements
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentGrid;
