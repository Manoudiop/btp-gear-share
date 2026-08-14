
import { useMemo, useState } from "react";
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
import { listingCategoriesOf, useListings } from "@/data/listings";
import { useLanguage } from "@/contexts/LanguageContext";

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Stats = () => {
  const { t, formatPrice } = useLanguage();
  const { data: listings = [] } = useListings("owner");
  const listingCategories = useMemo(() => listingCategoriesOf(listings), [listings]);
  const [timeRange, setTimeRange] = useState("year");

  // Répartition des locations par catégorie, recalculée quand le parc change.
  const totalRentals = listings.reduce((sum, item) => sum + item.rentals, 0) || 1;
  const categoryData = listingCategories
    .map((category) => ({
      name: category,
      value: Math.round(
        (listings
          .filter((item) => item.category === category)
          .reduce((sum, item) => sum + item.rentals, 0) /
          totalRentals) *
          100,
      ),
    }))
    .filter((entry) => entry.value > 0);

  const equipmentData = listings.map(({ name, rentals }) => ({ name, rentals }));

  return (
    <AccountLayout title={t("account.stats")}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t("st.overview")}</h1>
        <Select
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("inc.period")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">{t("st.last7")}</SelectItem>
            <SelectItem value="month">{t("st.last30")}</SelectItem>
            <SelectItem value="quarter">{t("st.last3m")}</SelectItem>
            <SelectItem value="year">{t("st.thisYear")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("st.totalRevenue")}</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(23540)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              {t("st.vsPrevious")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("st.rentals")}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              {t("st.vsPrevious")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("st.occupancy")}</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +4.3%
              </span>
              {t("st.vsPrevious")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("st.customers")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center mr-1">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2.1%
              </span>
              {t("st.vsPrevious")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="revenue">{t("st.tabRevenue")}</TabsTrigger>
          <TabsTrigger value="equipment">{t("st.tabEquipment")}</TabsTrigger>
          <TabsTrigger value="categories">{t("st.tabCategories")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>{t("st.revenueTrend")}</CardTitle>
              <CardDescription>
                {t("st.revenueTrendDesc")}
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
              <CardTitle>{t("st.byEquipment")}</CardTitle>
              <CardDescription>
                {t("st.byEquipmentDesc")}
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
              <CardTitle>{t("st.byCategory")}</CardTitle>
              <CardDescription>
                {t("st.byCategoryDesc")}
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
            <CardTitle>{t("st.avgDuration")}</CardTitle>
            <CardDescription>
              {t("st.avgDurationDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex flex-col items-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-20 w-20 text-primary" />
              </div>
              <div className="mt-6 text-center">
                <div className="text-4xl font-bold">4.5</div>
                <div className="text-sm text-muted-foreground">{t("st.daysPerRental")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("st.upcoming")}</CardTitle>
            <CardDescription>
              {t("st.upcomingDesc")}
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
                    <div className="font-medium">{formatPrice(450)}</div>
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
