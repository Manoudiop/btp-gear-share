
import { useState } from "react";
import { 
  CreditCard, Calendar, TrendingUp, Percent, 
  ArrowUpRight, ArrowDownRight, Users, Package, Clock
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { listingCategories, listings, rentalsByListing } from "@/data/listings";

const revenueData = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 1900 },
  { name: "Mar", revenue: 1500 },
  { name: "Apr", revenue: 2200 },
  { name: "May", revenue: 2800 },
  { name: "Jun", revenue: 3200 },
  { name: "Jul", revenue: 3800 },
  { name: "Aug", revenue: 3500 },
  { name: "Sep", revenue: 4200 },
  { name: "Oct", revenue: 3700 },
  { name: "Nov", revenue: 3000 },
  { name: "Dec", revenue: 2700 },
];

// Répartition des locations par catégorie, calculée depuis le parc du loueur.
const totalRentals = listings.reduce((sum, item) => sum + item.rentals, 0);
const categoryData = listingCategories.map((category) => ({
  name: category,
  value: Math.round(
    (listings
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.rentals, 0) /
      totalRentals) *
      100,
  ),
}));

const equipmentData = rentalsByListing;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Stats = () => {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <AccountLayout title="Statistiques">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Aperçu de performance</h1>
        <Select
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">7 derniers jours</SelectItem>
            <SelectItem value="month">30 derniers jours</SelectItem>
            <SelectItem value="quarter">3 derniers mois</SelectItem>
            <SelectItem value="year">Année en cours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,540 €</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              vs période précédente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              vs période précédente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +4.3%
              </span>
              vs période précédente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center mr-1">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2.1%
              </span>
              vs période précédente
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="equipment">Performance équipements</TabsTrigger>
          <TabsTrigger value="categories">Répartition par catégorie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des revenus</CardTitle>
              <CardDescription>
                Analyse de vos revenus sur les 12 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle>Performance par équipement</CardTitle>
              <CardDescription>
                Les équipements les plus loués
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={equipmentData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 20,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="rentals" 
                      fill="#0088FE" 
                      name="Nombre de locations"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Revenus par catégorie</CardTitle>
              <CardDescription>
                Répartition des revenus par catégorie d'équipement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Durée moyenne de location</CardTitle>
            <CardDescription>
              Analyse de la durée des locations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex flex-col items-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-20 w-20 text-primary" />
              </div>
              <div className="mt-6 text-center">
                <div className="text-4xl font-bold">4.5</div>
                <div className="text-sm text-muted-foreground">Jours par location</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Prochaines réservations</CardTitle>
            <CardDescription>
              Les locations à venir ce mois-ci
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Échafaudage 8m</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(2023, 7, 10 + i * 5).toLocaleDateString()} - {new Date(2023, 7, 15 + i * 5).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">450 €</div>
                    <div className="text-sm text-muted-foreground">5 jours</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default Stats;
