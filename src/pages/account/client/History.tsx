import { History as HistoryIcon, Package, ShoppingCart, Calendar, ArrowUpDown } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { getOrders } from "@/data/orders";

const mockRentalHistory = [
  {
    id: 1,
    name: "Bétonnière 150L",
    dates: "01/11/2025 - 05/11/2025",
    duration: "4 jours",
    price: 120.00,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Échafaudage 6m",
    dates: "15/10/2025 - 22/10/2025",
    duration: "7 jours",
    price: 280.00,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Perforateur SDS+",
    dates: "02/10/2025 - 03/10/2025",
    duration: "1 jour",
    price: 35.00,
    image: "/placeholder.svg",
  },
];


const History = () => {
  const { formatPrice } = useLanguage();

  // Les achats affichés sont les commandes réelles, les locations restent fictives
  // tant que la réservation d'équipement n'est pas persistée.
  const purchaseHistory = getOrders().map((order) => ({
    id: order.id,
    date: order.date,
    items: order.items.length,
    total: order.total,
  }));

  const totalSpent =
    mockRentalHistory.reduce((sum, rental) => sum + rental.price, 0) +
    purchaseHistory.reduce((sum, purchase) => sum + purchase.total, 0);

  return (
    <AccountLayout title="Historique">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{mockRentalHistory.length}</p>
                  <p className="text-sm text-muted-foreground">Locations passées</p>
                </div>
                <Package className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{purchaseHistory.length}</p>
                  <p className="text-sm text-muted-foreground">Achats effectués</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{formatPrice(totalSpent)}</p>
                  <p className="text-sm text-muted-foreground">Total dépensé</p>
                </div>
                <HistoryIcon className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="rentals" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rentals" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Achats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rentals" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Historique des locations</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Trier
              </Button>
            </div>
            <div className="space-y-4">
              {mockRentalHistory.map((rental) => (
                <Card key={rental.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted rounded-lg p-3 shrink-0">
                        <Package className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{rental.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {rental.dates}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Durée: {rental.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(rental.price)}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          Relouer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Historique des achats</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Trier
              </Button>
            </div>
            <div className="space-y-4">
              {purchaseHistory.map((purchase) => (
                <Card key={purchase.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted rounded-lg p-3">
                          <ShoppingCart className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Commande #{purchase.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {purchase.date} • {purchase.items} article{purchase.items > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(purchase.total)}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AccountLayout>
  );
};

export default History;
