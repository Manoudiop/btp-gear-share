
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, AlertTriangle, MoreHorizontal, 
  Edit, Trash2, Download, Filter, Search,
  Eye, Star, Building
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock data
const equipmentData = [
  {
    id: "1",
    name: "Bétonnière 150L",
    owner: "Martin Construction",
    ownerId: "o1",
    category: "Gros oeuvre",
    price: 45,
    status: "approved",
    featured: true,
    rating: 4.5,
    totalRentals: 27,
    totalRevenue: 1215,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Échafaudage 8m",
    owner: "ÉchaFrance Pro",
    ownerId: "o2",
    category: "Élévation",
    price: 120,
    status: "approved",
    featured: false,
    rating: 4.2,
    totalRentals: 18,
    totalRevenue: 2160,
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Marteau-piqueur",
    owner: "Outillage Dupont",
    ownerId: "o3",
    category: "Démolition",
    price: 65,
    status: "pending",
    featured: false,
    rating: 0,
    totalRentals: 0,
    totalRevenue: 0,
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Pelleteuse mini",
    owner: "LoueBTP",
    ownerId: "o4",
    category: "Terrassement",
    price: 250,
    status: "approved",
    featured: true,
    rating: 4.8,
    totalRentals: 14,
    totalRevenue: 3500,
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Perceuse électrique professionnelle",
    owner: "OutilsPro",
    ownerId: "o5",
    category: "Outillage",
    price: 30,
    status: "rejected",
    featured: false,
    rating: 0,
    totalRentals: 0,
    totalRevenue: 0,
    image: "/placeholder.svg"
  }
];

const ManageEquipment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const filteredEquipment = equipmentData.filter(
    (item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || 
        item.status === statusFilter;
      
      const matchesCategory = 
        categoryFilter === "all" || 
        item.category.toLowerCase().includes(categoryFilter.toLowerCase());
      
      return matchesSearch && matchesStatus && matchesCategory;
    }
  );
  
  const handleStatusChange = (id: string, newStatus: string) => {
    toast({
      title: "Statut modifié",
      description: `L'équipement a été ${newStatus === "approved" ? "approuvé" : newStatus === "rejected" ? "rejeté" : "mis en attente"}.`
    });
  };
  
  const toggleFeatured = (id: string, currentFeatured: boolean) => {
    toast({
      title: currentFeatured ? "Retiré des équipements mis en avant" : "Ajouté aux équipements mis en avant",
      description: "Le statut mis en avant a été modifié avec succès."
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approuvé</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En attente</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejeté</Badge>;
      default:
        return <Badge variant="outline">Non défini</Badge>;
    }
  };

  return (
    <AccountLayout title="Gestion des équipements">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Équipements</CardTitle>
            <CardDescription>
              Gérez tous les équipements proposés sur la plateforme
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un équipement ou propriétaire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="gros oeuvre">Gros œuvre</SelectItem>
                  <SelectItem value="élévation">Élévation</SelectItem>
                  <SelectItem value="outillage">Outillage</SelectItem>
                  <SelectItem value="démolition">Démolition</SelectItem>
                  <SelectItem value="terrassement">Terrassement</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="approved">Approuvé</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Équipement</TableHead>
                  <TableHead>Propriétaire</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix/jour</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Mis en avant</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Aucun équipement trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEquipment.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md">
                            <img 
                              src={equipment.image} 
                              alt={equipment.name} 
                              className="h-full w-full object-cover rounded-md"
                            />
                          </div>
                          <span className="font-medium">{equipment.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/account/users/${equipment.ownerId}`} className="hover:underline">
                          <div className="flex items-center">
                            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                            {equipment.owner}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{equipment.category}</TableCell>
                      <TableCell>{equipment.price} €</TableCell>
                      <TableCell>{getStatusBadge(equipment.status)}</TableCell>
                      <TableCell>
                        {equipment.featured ? (
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Mis en avant</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">Non</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                          <span>{equipment.rating > 0 ? equipment.rating.toFixed(1) : "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link to={`/equipment/${equipment.id}`} className="flex items-center w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Voir</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/account/equipment/${equipment.id}/edit`} className="flex items-center w-full">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Modifier</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {equipment.status !== "approved" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(equipment.id, "approved")}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                <span>Approuver</span>
                              </DropdownMenuItem>
                            )}
                            {equipment.status !== "pending" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(equipment.id, "pending")}>
                                <AlertTriangle className="mr-2 h-4 w-4 text-amber-600" />
                                <span>Mettre en attente</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => toggleFeatured(equipment.id, equipment.featured)}>
                              <Star className="mr-2 h-4 w-4" fill={equipment.featured ? "currentColor" : "none"} />
                              <span>
                                {equipment.featured ? "Retirer des mis en avant" : "Mettre en avant"}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AccountLayout>
  );
};

export default ManageEquipment;
