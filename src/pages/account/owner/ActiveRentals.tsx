
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, Search, Filter, Download, 
  Check, X, MessageSquare, Clock, CheckCircle2, AlertCircle
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
const rentalsData = [
  {
    id: "1",
    clientName: "Jean Dupont",
    clientId: "c1",
    equipment: "Bétonnière 150L",
    equipmentId: "e1",
    startDate: "2023-08-05",
    endDate: "2023-08-10",
    totalPrice: 225,
    status: "active",
    phone: "06 12 34 56 78"
  },
  {
    id: "2",
    clientName: "Marie Martin",
    clientId: "c2",
    equipment: "Échafaudage 8m",
    equipmentId: "e2",
    startDate: "2023-08-02",
    endDate: "2023-08-15",
    totalPrice: 1560,
    status: "active",
    phone: "06 98 76 54 32"
  },
  {
    id: "3",
    clientName: "Paul Bernard",
    clientId: "c3",
    equipment: "Marteau-piqueur",
    equipmentId: "e3",
    startDate: "2023-08-01",
    endDate: "2023-08-03",
    totalPrice: 195,
    status: "completed",
    phone: "07 11 22 33 44"
  },
  {
    id: "4",
    clientName: "Sophie Dubois",
    clientId: "c4",
    equipment: "Perceuse électrique professionnelle",
    equipmentId: "e5",
    startDate: "2023-08-08",
    endDate: "2023-08-12",
    totalPrice: 150,
    status: "upcoming",
    phone: "06 55 66 77 88"
  },
  {
    id: "5",
    clientName: "Luc Petit",
    clientId: "c5",
    equipment: "Pelleteuse mini",
    equipmentId: "e4",
    startDate: "2023-07-25",
    endDate: "2023-07-30",
    totalPrice: 1250,
    status: "completed",
    phone: "07 99 88 77 66"
  }
];

const ActiveRentals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredRentals = rentalsData.filter(
    (rental) => {
      const matchesSearch = 
        rental.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.equipment.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || 
        rental.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    }
  );
  
  const handleConfirmReturn = (id: string) => {
    toast({
      title: "Retour confirmé",
      description: "Le retour de l'équipement a été confirmé avec succès."
    });
  };
  
  const handleContactClient = (phone: string) => {
    toast({
      title: "Contact client",
      description: `Appel en cours vers ${phone}...`
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">En cours</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">À venir</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Terminée</Badge>;
      case "late":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">En retard</Badge>;
      default:
        return <Badge variant="outline">Non défini</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <AccountLayout title="Locations en cours">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Gestion des locations</CardTitle>
            <CardDescription>
              Suivez toutes vos locations actives, passées et à venir
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between mb-6">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un client ou équipement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="w-full sm:w-[180px]">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">En cours</SelectItem>
                    <SelectItem value="upcoming">À venir</SelectItem>
                    <SelectItem value="completed">Terminées</SelectItem>
                    <SelectItem value="late">En retard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  <TableHead>Client</TableHead>
                  <TableHead>Équipement</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRentals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune location trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRentals.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell className="font-medium">
                        <Link to={`/account/clients/${rental.clientId}`} className="hover:underline">
                          {rental.clientName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/equipment/${rental.equipmentId}`} className="hover:underline">
                          {rental.equipment}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{rental.totalPrice} €</TableCell>
                      <TableCell>{getStatusBadge(rental.status)}</TableCell>
                      <TableCell className="text-right">
                        {rental.status === "active" && (
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleContactClient(rental.phone)}
                            >
                              <MessageSquare className="mr-1 h-4 w-4" />
                              <span className="hidden sm:inline">Contact</span>
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleConfirmReturn(rental.id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              <span className="hidden sm:inline">Retour</span>
                            </Button>
                          </div>
                        )}
                        {rental.status === "upcoming" && (
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleContactClient(rental.phone)}
                            >
                              <MessageSquare className="mr-1 h-4 w-4" />
                              <span className="hidden sm:inline">Contact</span>
                            </Button>
                            <Button variant="default" size="sm">
                              <Clock className="mr-1 h-4 w-4" />
                              <span className="hidden sm:inline">Rappel</span>
                            </Button>
                          </div>
                        )}
                        {rental.status === "completed" && (
                          <div className="flex justify-end">
                            <Button 
                              variant="ghost" 
                              size="sm"
                            >
                              <CheckCircle2 className="mr-1 h-4 w-4 text-green-600" />
                              <span className="hidden sm:inline text-muted-foreground">Terminée</span>
                            </Button>
                          </div>
                        )}
                        {rental.status === "late" && (
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleContactClient(rental.phone)}
                            >
                              <AlertCircle className="mr-1 h-4 w-4 text-red-600" />
                              <span className="hidden sm:inline">Urgent</span>
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleConfirmReturn(rental.id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              <span className="hidden sm:inline">Retour</span>
                            </Button>
                          </div>
                        )}
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

export default ActiveRentals;
