import { useState } from "react";
import { Package, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Material {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  status: "available" | "low_stock" | "out_of_stock";
}

const ManageMaterials = () => {
  const { t, formatPrice, currencySymbol } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [materials] = useState<Material[]>([
    { id: "1", name: "Sable fin 0/2", category: "Agrégats", price: 45, unit: "tonne", stock: 150, status: "available" },
    { id: "2", name: "Gravier 10/20", category: "Agrégats", price: 52, unit: "tonne", stock: 80, status: "available" },
    { id: "3", name: "Ciment Portland CEM I", category: "Liants", price: 8, unit: "sac 35kg", stock: 25, status: "low_stock" },
    { id: "4", name: "Parpaings 20x20x50", category: "Blocs", price: 1.5, unit: "unité", stock: 500, status: "available" },
    { id: "5", name: "Béton prêt à l'emploi C25/30", category: "Béton", price: 120, unit: "m³", stock: 0, status: "out_of_stock" },
    { id: "6", name: "Fer à béton HA 10mm", category: "Acier", price: 12, unit: "barre 6m", stock: 200, status: "available" },
    { id: "7", name: "Plaque de plâtre BA13", category: "Plaques", price: 6.5, unit: "plaque", stock: 45, status: "low_stock" },
    { id: "8", name: "Tuiles terre cuite", category: "Couverture", price: 1.2, unit: "unité", stock: 1200, status: "available" },
  ]);
  
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    stock: "",
    description: "",
  });
  
  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: Material["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">{t("bo.available")}</Badge>;
      case "low_stock":
        return <Badge className="bg-yellow-100 text-yellow-800">{t("mat.lowStock")}</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">{t("mat.outOfStock")}</Badge>;
    }
  };
  
  const handleAddMaterial = () => {
    toast({
      title: "Matériau ajouté",
      description: `${newMaterial.name} a été ajouté avec succès.`,
    });
    setIsAddDialogOpen(false);
    setNewMaterial({ name: "", category: "", price: "", unit: "", stock: "", description: "" });
  };
  
  const handleDelete = (id: string, name: string) => {
    toast({
      title: "Matériau supprimé",
      description: `${name} a été supprimé.`,
    });
  };
  
  return (
    <AccountLayout title={t("bo.manageMaterials")}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" />
              {t("mat.catalog")}
            </span>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("mat.add")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{t("mat.add")}</DialogTitle>
                  <DialogDescription>
                    Renseignez les informations du nouveau matériau
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("mat.name")}</Label>
                    <Input 
                      id="name" 
                      value={newMaterial.name}
                      onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                      placeholder="Ex: Sable fin 0/2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">{t("bo.category")}</Label>
                      <Input 
                        id="category" 
                        value={newMaterial.category}
                        onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                        placeholder="Ex: Agrégats"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">{t("mat.unit")}</Label>
                      <Input 
                        id="unit" 
                        value={newMaterial.unit}
                        onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                        placeholder="Ex: tonne"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix ({currencySymbol})</Label>
                      <Input 
                        id="price" 
                        type="number"
                        value={newMaterial.price}
                        onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">{t("mat.initialStock")}</Label>
                      <Input 
                        id="stock" 
                        type="number"
                        value={newMaterial.stock}
                        onChange={(e) => setNewMaterial({ ...newMaterial, stock: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">{t("inc.description")}</Label>
                    <Textarea 
                      id="description" 
                      value={newMaterial.description}
                      onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                      placeholder={t("mat.descPlaceholder")}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddMaterial}>
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("mat.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("bo.name")}</TableHead>
                  <TableHead>{t("bo.category")}</TableHead>
                  <TableHead>{t("mat.price")}</TableHead>
                  <TableHead>{t("mat.stock")}</TableHead>
                  <TableHead>{t("bo.status")}</TableHead>
                  <TableHead className="text-right">{t("bo.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.category}</TableCell>
                    <TableCell>
                      {formatPrice(material.price)}/{material.unit}
                    </TableCell>
                    <TableCell>{material.stock}</TableCell>
                    <TableCell>{getStatusBadge(material.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(material.id, material.name)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("mat.total")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{materials.length}</p>
            <p className="text-sm text-muted-foreground">{t("mat.types")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("mat.lowStock")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">
              {materials.filter(m => m.status === "low_stock").length}
            </p>
            <p className="text-sm text-muted-foreground">{t("mat.toRestock")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("mat.outOfStockLong")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">
              {materials.filter(m => m.status === "out_of_stock").length}
            </p>
            <p className="text-sm text-muted-foreground">{t("mat.unavailable")}</p>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default ManageMaterials;
