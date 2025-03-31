
import { Users, Package, Briefcase, CreditCard, PieChart, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <AccountLayout title="Tableau de bord Administrateur">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
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
        
        <Card>
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
        
        <Card>
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
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-medium">Répartition des utilisateurs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <PieChart className="h-8 w-8 text-primary" />
                <div className="flex space-x-6 mt-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">Clients (75%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-sm">Loueurs (24%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm">Admins (1%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-medium">Revenus mensuels</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <BarChart className="h-8 w-8 text-primary" />
                <p className="text-sm text-muted-foreground mt-4">
                  Les revenus ont augmenté de 23% par rapport
                  au même trimestre de l'année précédente
                </p>
              </div>
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
                Gérer les utilisateurs
              </Button>
            </Link>
            <Link to="/account/equipment">
              <Button variant="outline">
                Gérer les équipements
              </Button>
            </Link>
            <Link to="/account/materials">
              <Button variant="outline">
                Gérer les matériaux
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </AccountLayout>
  );
};

export default AdminDashboard;
