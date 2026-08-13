
import { CalendarDays, ShoppingCart, Package, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ClientDashboard = () => {
  const { t, formatPrice } = useLanguage();
  return (
    <AccountLayout title={t("account.dashboard")}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-primary" /> 
              Commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">{t("dash.openOrders")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" /> 
              Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">{t("dash.rentedEquipment")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" /> 
              Prochain retour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">10/07</p>
            <p className="text-sm text-muted-foreground">{t("dash.forTheMixer")}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-medium">{t("dash.activeRentals")}</span>
              <Link to="/account/rentals">
                <Button variant="link" size="sm" className="p-0 h-auto">
                  {t("common.viewAll")}
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Bétonnière 150L</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      05/07 - 10/07
                    </div>
                  </div>
                </div>
                <Link to="/account/rentals/1">
                  <Button variant="outline" size="sm">{t("dash.details")}</Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Échafaudage 8m</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      02/07 - 15/07
                    </div>
                  </div>
                </div>
                <Link to="/account/rentals/2">
                  <Button variant="outline" size="sm">{t("dash.details")}</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-medium">{t("dash.recentOrders")}</span>
              <Link to="/account/orders">
                <Button variant="link" size="sm" className="p-0 h-auto">
                  {t("common.viewAll")}
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("dash.order")} #1234</p>
                    <p className="text-sm text-muted-foreground">
                      {t("dash.items", { count: 3 })} • {formatPrice(249.99)}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-md">
                  En livraison
                </span>
              </div>
              
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("dash.order")} #1201</p>
                    <p className="text-sm text-muted-foreground">
                      {t("dash.items", { count: 5 })} • {formatPrice(532.5)}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-green-100 text-green-800 py-1 px-2 rounded-md">
                  Livrée
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default ClientDashboard;
