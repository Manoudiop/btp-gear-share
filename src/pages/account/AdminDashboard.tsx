
import { Link } from "react-router-dom";
import { Users, Package, Briefcase, CreditCard, UserCog, Settings, Building } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const userDistribution = [
  { name: "Clients", value: 75, color: "hsl(var(--primary))" },
  { name: "Loueurs", value: 24, color: "hsl(210, 70%, 60%)" },
  { name: "Admins", value: 1, color: "hsl(142, 60%, 50%)" },
];

const monthlyRevenue = [
  { month: "Sep", revenue: 95000 },
  { month: "Oct", revenue: 102000 },
  { month: "Nov", revenue: 98000 },
  { month: "Déc", revenue: 115000 },
  { month: "Jan", revenue: 121000 },
  { month: "Fév", revenue: 128549 },
];

const AdminDashboard = () => {
  return (
    <AccountLayout title="Tableau de bord Administrateur">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/account/users">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" /> 
                Utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,254</p>
              <p className="text-sm text-muted-foreground">+12% ce mois</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/account/admin/equipment">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Package className="mr-2 h-5 w-5 text-primary" /> 
                Équipements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">328</p>
              <p className="text-sm text-muted-foreground">+8% ce mois</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/account/materials">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-primary" /> 
                Matériaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">48</p>
              <p className="text-sm text-muted-foreground">Types disponibles</p>
            </CardContent>
          </Card>
        </Link>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" /> 
              Revenus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">128,549€</p>
            <p className="text-sm text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Répartition des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Revenus mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k€`} />
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()}€`} />
                  <Bar dataKey="revenue" name="Revenus" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link to="/account/users">
              <Button>
                <UserCog className="mr-2 h-4 w-4" />
                Gérer les utilisateurs
              </Button>
            </Link>
            <Link to="/account/admin/equipment">
              <Button variant="outline">
                <Building className="mr-2 h-4 w-4" />
                Gérer les équipements
              </Button>
            </Link>
            <Link to="/account/materials">
              <Button variant="outline">
                <Briefcase className="mr-2 h-4 w-4" />
                Gérer les matériaux
              </Button>
            </Link>
            <Link to="/account/settings">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </AccountLayout>
  );
};

export default AdminDashboard;
