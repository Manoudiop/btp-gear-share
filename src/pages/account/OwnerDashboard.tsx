
import { Link } from "react-router-dom";
import { CalendarDays, Building, CreditCard, Percent, TrendingUp, Package, Plus, Settings, ChartBarIcon } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OwnerDashboard = () => {
  return (
    <AccountLayout title="Tableau de bord Loueur">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Building className="mr-2 h-5 w-5 text-primary" /> 
              Équipements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Nombre total d'équipements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Percent className="mr-2 h-5 w-5 text-primary" /> 
              Taux d'occupation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">75%</p>
            <p className="text-sm text-muted-foreground">Équipements actuellement loués</p>
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
            <p className="text-3xl font-bold">3,250€</p>
            <p className="text-sm text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-medium">Locations actives</span>
              <Link to="/account/rentals">
                <Button variant="link" size="sm" className="p-0 h-auto">
                  Voir tout
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Bétonnière 150L</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      05/07 - 10/07 • Louis Martin
                    </div>
                  </div>
                </div>
                <Link to="/account/rentals">
                  <Button variant="outline" size="sm">Détails</Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Échafaudage 8m</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      02/07 - 15/07 • Marie Dubois
                    </div>
                  </div>
                </div>
                <Link to="/account/rentals">
                  <Button variant="outline" size="sm">Détails</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-medium">Revenus mensuels</span>
              <Link to="/account/stats">
                <Button variant="link" size="sm" className="p-0 h-auto">
                  Voir tout
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Évolution des revenus sur les 6 derniers mois
                </p>
                <p className="text-sm">
                  +12% par rapport au mois précédent
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
            <Link to="/account/equipment/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un équipement
              </Button>
            </Link>
            <Link to="/account/equipment">
              <Button variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Gérer mes équipements
              </Button>
            </Link>
            <Link to="/account/stats">
              <Button variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Voir mes statistiques
              </Button>
            </Link>
            <Link to="/account/settings">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Gérer mon profil
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </AccountLayout>
  );
};

export default OwnerDashboard;
