import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, ShoppingCart, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

interface MaterialCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  unit: string;
  rating: number;
  supplier: string;
  isAvailable: boolean;
}

const MaterialCard = ({
  id,
  name,
  image,
  category,
  price,
  unit,
  rating,
  supplier,
  isAvailable,
}: MaterialCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      image,
      price,
      unit,
      supplier,
    }, quantity);
    toast({
      title: "Ajouté au panier",
      description: `${quantity} ${unit} de ${name} ajouté au panier`,
    });
    setQuantity(1);
  };

  return (
    <Card
      className="overflow-hidden card-hover h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/material/${id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 ease-out-expo",
              isHovered ? "scale-105" : "scale-100"
            )}
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-primary hover:bg-white/80 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
          {!isAvailable && (
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="destructive" className="text-sm font-medium px-3 py-1.5">
                Non disponible
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{supplier}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">{price} €<span className="text-sm font-normal text-muted-foreground">/{unit}</span></p>
            </div>
          </div>
          
          {isAvailable && (
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center border rounded-md" onClick={(e) => e.stopPropagation()}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-r-none" 
                  onClick={decrementQuantity}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-l-none" 
                  onClick={incrementQuantity}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button 
                className="flex-1" 
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default MaterialCard;
