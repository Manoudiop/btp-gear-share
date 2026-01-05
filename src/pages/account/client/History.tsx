import { History as HistoryIcon, Package, ShoppingCart, Calendar, ArrowUpDown } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const mockPurchaseHistory = [
  {
    id: "1156",
    date: "10/12/2025",
    items: 2,
    total: 335.50,
  },
  {
    id: "1189",
    date: "20/12/2025",
    items: 1,
    total: 194.85,
  },
  {
    id: "1201",
    date: "28/12/2025",
    items: 3,
    total: 232.98,
  },
  {
    id: "1234",
    date: "05/01/2026",
    items: 2,
    total: 112.40,
  },
];

const History = () => {
  return (
    <AccountLayout title="Historique">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">3</p>
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
                  <p className="text-2xl font-bold">4</p>
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
                  <p className="text-2xl font-bold">1 310,73€</p>
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
                        <p className="font-bold">{rental.price.toFixed(2)}€</p>
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
              {mockPurchaseHistory.map((purchase) => (
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
                        <p className="font-bold">{purchase.total.toFixed(2)}€</p>
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
