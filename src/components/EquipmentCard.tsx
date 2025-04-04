
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EquipmentCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  location: string;
  isAvailable: boolean;
}

const EquipmentCard = ({
  id,
  name,
  image,
  category,
  price,
  rating,
  location,
  isAvailable,
}: EquipmentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/equipment/${id}`} className="block">
      <div
        className="bg-white rounded-xl overflow-hidden card-hover shadow-subtle h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">{price} €<span className="text-sm font-normal text-muted-foreground">/jour</span></p>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Réponse rapide</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EquipmentCard;
