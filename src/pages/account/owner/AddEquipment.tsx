
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ImagePlus, Upload, Check, X, Info, MapPin, 
  DollarSign, Calendar, Tag, FileText
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const categories = [
  { id: "gros-oeuvre", name: "Gros œuvre" },
  { id: "elevation", name: "Élévation" },
  { id: "outillage", name: "Outillage" },
  { id: "electricite", name: "Électricité" },
  { id: "plomberie", name: "Plomberie" },
  { id: "terrassement", name: "Terrassement" },
  { id: "demolition", name: "Démolition" },
  { id: "equipement-securite", name: "Équipement de sécurité" },
];

const AddEquipment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipmentData, setEquipmentData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    location: "",
    deposit: "",
    minRentalDays: "1",
    available: true,
    featured: false,
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEquipmentData({
      ...equipmentData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setEquipmentData({
      ...equipmentData,
      [name]: value,
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setEquipmentData({
      ...equipmentData,
      [name]: checked,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Équipement ajouté",
        description: "Votre équipement a été ajouté avec succès.",
      });
      navigate("/account/equipment");
    }, 1500);
  };

  return (
    <AccountLayout title="Ajouter un équipement">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
                <CardDescription>
                  Les informations essentielles sur votre équipement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nom de l'équipement <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ex: Bétonnière 150L"
                    value={equipmentData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description détaillée <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Décrivez votre équipement en détail (caractéristiques, état, etc.)"
                    value={equipmentData.description}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Catégorie <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={equipmentData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Emplacement <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        placeholder="Ville, Code postal"
                        value={equipmentData.location}
                        onChange={handleChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Prix et conditions</CardTitle>
                <CardDescription>
                  Définissez les tarifs et conditions de location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Prix journalier (€) <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="45.00"
                        value={equipmentData.price}
                        onChange={handleChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deposit">
                      Caution (€) <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="deposit"
                        name="deposit"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="500.00"
                        value={equipmentData.deposit}
                        onChange={handleChange}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minRentalDays">
                      Durée minimum (jours)
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="minRentalDays"
                        name="minRentalDays"
                        type="number"
                        min="1"
                        placeholder="1"
                        value={equipmentData.minRentalDays}
                        onChange={handleChange}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="available">Disponible immédiatement</Label>
                      <p className="text-sm text-muted-foreground">
                        L'équipement pourra être loué immédiatement
                      </p>
                    </div>
                    <Switch
                      id="available"
                      checked={equipmentData.available}
                      onCheckedChange={(checked) => handleSwitchChange("available", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Mettre en avant</Label>
                      <p className="text-sm text-muted-foreground">
                        L'équipement sera mis en avant sur la page d'accueil
                      </p>
                    </div>
                    <Switch
                      id="featured"
                      checked={equipmentData.featured}
                      onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Photos de l'équipement</CardTitle>
                <CardDescription>
                  Ajoutez des photos claires de votre équipement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 p-6">
                  <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="mb-2 text-sm font-medium">
                    Déposez vos images ici ou cliquez pour parcourir
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG ou WEBP. 5 MB max.
                  </p>
                  <Button variant="secondary" size="sm" className="mt-4">
                    <Upload className="mr-2 h-4 w-4" />
                    Ajouter des photos
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Spécifications techniques</CardTitle>
                <CardDescription>
                  Ajoutez des informations techniques détaillées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specs">Caractéristiques techniques</Label>
                  <Textarea
                    id="specs"
                    name="specs"
                    placeholder="Puissance, dimensions, poids..."
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Exigences particulières</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    placeholder="Conditions spéciales, permis requis..."
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button variant="outline" onClick={() => navigate("/account/equipment")}>
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>Création en cours...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Créer l'équipement
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </AccountLayout>
  );
};

export default AddEquipment;
