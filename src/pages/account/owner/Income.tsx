
import { useState } from "react";
import { Helmet } from "react-helmet";
import AccountLayout from "@/components/account/AccountLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Download, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

// Données fictives pour les revenus mensuels
const monthlyRevenueData = [
  { month: "Jan", revenus: 2400, locations: 12 },
  { month: "Fév", revenus: 1800, locations: 9 },
  { month: "Mar", revenus: 3200, locations: 16 },
  { month: "Avr", revenus: 4100, locations: 22 },
  { month: "Mai", revenus: 3800, locations: 19 },
  { month: "Juin", revenus: 4500, locations: 25 },
  { month: "Juil", revenus: 5200, locations: 28 },
  { month: "Août", revenus: 4800, locations: 26 },
  { month: "Sep", revenus: 3900, locations: 20 },
  { month: "Oct", revenus: 4200, locations: 21 },
  { month: "Nov", revenus: 3600, locations: 18 },
  { month: "Déc", revenus: 2900, locations: 14 },
];

// Données fictives pour les transactions
const transactionsData = [
  {
    id: "TXN001",
    date: "28/12/2025",
    description: "Location - Pelleteuse CAT 320",
    client: "Entreprise BTP Lyon",
    montant: 850,
    statut: "payé",
    type: "crédit"
  },
  {
    id: "TXN002",
    date: "25/12/2025",
    description: "Location - Grue mobile 50T",
    client: "Construction Plus",
    montant: 1200,
    statut: "payé",
    type: "crédit"
  },
  {
    id: "TXN003",
    date: "22/12/2025",
    description: "Retrait vers compte bancaire",
    client: "-",
    montant: 2000,
    statut: "traité",
    type: "débit"
  },
  {
    id: "TXN004",
    date: "20/12/2025",
    description: "Location - Chariot élévateur",
    client: "Logistique Express",
    montant: 450,
    statut: "en_attente",
    type: "crédit"
  },
  {
    id: "TXN005",
    date: "18/12/2025",
    description: "Location - Bétonnière 350L",
    client: "Maçonnerie Martin",
    montant: 180,
    statut: "payé",
    type: "crédit"
  },
  {
    id: "TXN006",
    date: "15/12/2025",
    description: "Location - Compacteur vibrant",
    client: "Travaux Publics SA",
    montant: 320,
    statut: "payé",
    type: "crédit"
  },
];

// Données fictives pour les équipements les plus rentables
const topEquipmentData = [
  { name: "Pelleteuse CAT 320", revenus: 8500, locations: 42 },
  { name: "Grue mobile 50T", revenus: 7200, locations: 24 },
  { name: "Chariot élévateur", revenus: 5400, locations: 68 },
  { name: "Nacelle élévatrice", revenus: 4100, locations: 51 },
  { name: "Compacteur vibrant", revenus: 3200, locations: 48 },
];

const Income = () => {
  const [period, setPeriod] = useState("year");
  
  // Calculs des statistiques
  const totalRevenue = transactionsData
    .filter(t => t.type === "crédit" && t.statut === "payé")
    .reduce((sum, t) => sum + t.montant, 0);
  
  const pendingRevenue = transactionsData
    .filter(t => t.type === "crédit" && t.statut === "en_attente")
    .reduce((sum, t) => sum + t.montant, 0);
  
  const totalWithdrawn = transactionsData
    .filter(t => t.type === "débit")
    .reduce((sum, t) => sum + t.montant, 0);
  
  const availableBalance = totalRevenue - totalWithdrawn;

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "payé":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Payé</Badge>;
      case "en_attente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>;
      case "traité":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Traité</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Mes revenus | BTP Location</title>
        <meta name="description" content="Gérez et suivez vos revenus de location d'équipements BTP" />
      </Helmet>

      <AccountLayout title="Mes revenus">
        <div className="space-y-6">
          {/* Sélection de période */}
          <div className="flex justify-between items-center">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
                <SelectItem value="all">Tout</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>

          {/* Cartes de statistiques */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Solde disponible</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availableBalance.toLocaleString()} €</div>
                <div className="flex items-center pt-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% ce mois
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} €</div>
                <p className="text-xs text-muted-foreground">
                  Sur la période sélectionnée
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingRevenue.toLocaleString()} €</div>
                <p className="text-xs text-muted-foreground">
                  Paiements en cours
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Retiré</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalWithdrawn.toLocaleString()} €</div>
                <p className="text-xs text-muted-foreground">
                  Vers votre compte bancaire
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bouton de retrait */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-semibold">Retirer vos fonds</h3>
                  <p className="text-sm text-muted-foreground">
                    Transférez votre solde vers votre compte bancaire
                  </p>
                </div>
                <Button className="button-premium">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Retirer {availableBalance.toLocaleString()} €
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Graphique des revenus */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des revenus</CardTitle>
              <CardDescription>
                Revenus mensuels et nombre de locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis yAxisId="left" className="text-xs" />
                    <YAxis yAxisId="right" orientation="right" className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))' 
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenus" name="Revenus (€)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="locations" name="Locations" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Équipements les plus rentables */}
          <Card>
            <CardHeader>
              <CardTitle>Équipements les plus rentables</CardTitle>
              <CardDescription>
                Top 5 de vos équipements par revenus générés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEquipmentData.map((equipment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{equipment.name}</p>
                        <p className="text-sm text-muted-foreground">{equipment.locations} locations</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{equipment.revenus.toLocaleString()} €</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Historique des transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des transactions</CardTitle>
              <CardDescription>
                Toutes vos entrées et sorties de fonds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionsData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.client}</TableCell>
                      <TableCell>{getStatusBadge(transaction.statut)}</TableCell>
                      <TableCell className={`text-right font-semibold ${transaction.type === 'crédit' ? 'text-green-600' : 'text-blue-600'}`}>
                        {transaction.type === 'crédit' ? '+' : '-'}{transaction.montant.toLocaleString()} €
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </AccountLayout>
    </>
  );
};

export default Income;
