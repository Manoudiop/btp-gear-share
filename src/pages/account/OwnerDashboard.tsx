
import { Link } from "react-router-dom";
import { CalendarDays, Building, CreditCard, Percent, TrendingUp, Package, Plus, Settings, ChartBarIcon } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const OwnerDashboard = () => {
  const { t, formatPrice } = useLanguage();
  return (
    <AccountLayout title={t("bo.ownerDashboard")}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Building className="mr-2 h-5 w-5 text-primary" /> 
              {t("bo.equipment")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">{t("dash.equipmentCount")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Percent className="mr-2 h-5 w-5 text-primary" /> 
              {t("dash.occupancy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">75%</p>
            <p className="text-sm text-muted-foreground">{t("dash.rentedNow")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" /> 
              {t("dash.revenue")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatPrice(3250)}</p>
            <p className="text-sm text-muted-foreground">{t("dash.thisMonth")}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                  <Button variant="outline" size="sm">{t("dash.details")}</Button>
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
                  <Button variant="outline" size="sm">{t("dash.details")}</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-medium">{t("dash.monthlyRevenue")}</span>
              <Link to="/account/stats">
                <Button variant="link" size="sm" className="p-0 h-auto">
                  {t("common.viewAll")}
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <p className="text-sm text-muted-foreground">
                  {t("dash.revenue6m")}
                </p>
                <p className="text-sm">
                  {t("dash.vsLastMonth")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">{t("dash.quickActions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link to="/account/equipment/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t("bo.addEquipment")}
              </Button>
            </Link>
            <Link to="/account/equipment">
              <Button variant="outline">
                <Package className="mr-2 h-4 w-4" />
                {t("dash.manageMyEquipment")}
              </Button>
            </Link>
            <Link to="/account/stats">
              <Button variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                {t("dash.viewMyStats")}
              </Button>
            </Link>
            <Link to="/account/settings">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                {t("dash.manageProfile")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </AccountLayout>
  );
};

export default OwnerDashboard;
