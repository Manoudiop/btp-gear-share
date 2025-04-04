
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Edit, Trash2, EyeIcon, 
  ArrowUpDown, ChevronDown, MoreHorizontal, 
  Filter, Download
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
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
    category: "Gros oeuvre",
    price: 45,
    status: "available",
    rentals: 12,
    income: 540,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Échafaudage 8m",
    category: "Élévation",
    price: 120,
    status: "rented",
    rentals: 8,
    income: 960,
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Marteau-piqueur",
    category: "Démolition",
    price: 65,
    status: "available",
    rentals: 10,
    income: 650,
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Pelleteuse mini",
    category: "Terrassement",
    price: 250,
    status: "maintenance",
    rentals: 5,
    income: 1250,
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Perceuse électrique professionnelle",
    category: "Outillage",
    price: 30,
    status: "available",
    rentals: 20,
    income: 600,
    image: "/placeholder.svg"
  }
];

const EquipmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEquipment = equipmentData.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    toast({
      title: "Équipement supprimé",
      description: "L'équipement a été supprimé avec succès."
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Disponible</Badge>;
      case "rented":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Loué</Badge>;
      case "maintenance":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Maintenance</Badge>;
      default:
        return <Badge variant="outline">Non disponible</Badge>;
    }
  };

  return (
    <AccountLayout title="Mes équipements">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Équipements</CardTitle>
            <CardDescription>
              Gérez tous vos équipements disponibles à la location
            </CardDescription>
          </div>
          <Link to="/account/equipment/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un équipement
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 w-full max-w-sm">
              <Input
                placeholder="Rechercher un équipement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Nom
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Prix/jour
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Locations
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Revenus
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
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
                        <div className="h-12 w-12 rounded-md bg-secondary/20">
                          <img 
                            src={equipment.image} 
                            alt={equipment.name} 
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {equipment.name}
                      </TableCell>
                      <TableCell>{equipment.category}</TableCell>
                      <TableCell>{equipment.price} €</TableCell>
                      <TableCell>{getStatusBadge(equipment.status)}</TableCell>
                      <TableCell>{equipment.rentals}</TableCell>
                      <TableCell>{equipment.income} €</TableCell>
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
                                <EyeIcon className="mr-2 h-4 w-4" />
                                <span>Voir</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link to={`/account/equipment/edit/${equipment.id}`} className="flex items-center w-full">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Modifier</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(equipment.id)}
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

export default EquipmentList;
