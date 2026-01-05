import { useState, useMemo } from "react";
import { ShoppingCart, Package, Truck, CheckCircle, Clock, Search, Filter, CalendarIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const mockOrders = [
  {
    id: "1234",
    date: "05/01/2026",
    rawDate: new Date(2026, 0, 5),
    items: [
      { name: "Sac de ciment 35kg", quantity: 10, price: 8.99 },
      { name: "Sable 25kg", quantity: 5, price: 4.50 },
    ],
    total: 112.40,
    status: "shipping",
  },
  {
    id: "1201",
    date: "28/12/2025",
    rawDate: new Date(2025, 11, 28),
    items: [
      { name: "Parpaing 20x20x50", quantity: 50, price: 2.10 },
      { name: "Fer à béton 10mm", quantity: 20, price: 5.50 },
      { name: "Fil de fer recuit", quantity: 2, price: 8.99 },
    ],
    total: 232.98,
    status: "delivered",
  },
  {
    id: "1189",
    date: "20/12/2025",
    rawDate: new Date(2025, 11, 20),
    items: [
      { name: "Plaque de plâtre BA13", quantity: 15, price: 12.99 },
    ],
    total: 194.85,
    status: "delivered",
  },
  {
    id: "1156",
    date: "10/12/2025",
    rawDate: new Date(2025, 11, 10),
    items: [
      { name: "Carrelage sol 60x60", quantity: 8, price: 35.00 },
      { name: "Colle carrelage 25kg", quantity: 3, price: 18.50 },
    ],
    total: 335.50,
    status: "delivered",
  },
];

const statusOptions = [
  { value: "all", label: "Tous les statuts" },
  { value: "pending", label: "En attente" },
  { value: "processing", label: "En préparation" },
  { value: "shipping", label: "En livraison" },
  { value: "delivered", label: "Livrée" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          En attente
        </Badge>
      );
    case "processing":
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-100 text-yellow-800">
          <Package className="h-3 w-3" />
          En préparation
        </Badge>
      );
    case "shipping":
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-blue-100 text-blue-800">
          <Truck className="h-3 w-3" />
          En livraison
        </Badge>
      );
    case "delivered":
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3" />
          Livrée
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      // Search filter
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Status filter
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;

      // Date filter
      const matchesDateFrom = !dateFrom || order.rawDate >= dateFrom;
      const matchesDateTo = !dateTo || order.rawDate <= dateTo;

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [searchQuery, statusFilter, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const hasActiveFilters = searchQuery || statusFilter !== "all" || dateFrom || dateTo;

  return (
    <AccountLayout title="Mes commandes">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">Total commandes</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">En cours</p>
                </div>
                <Truck className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">875,73€</p>
                  <p className="text-sm text-muted-foreground">Total dépensé</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filtres
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Status filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Date from */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: fr }) : "Date début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                {/* Date to */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: fr }) : "Date fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="w-fit"
                >
                  <X className="h-4 w-4 mr-1" />
                  Réinitialiser les filtres
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {filteredOrders.length} commande{filteredOrders.length > 1 ? "s" : ""} trouvée{filteredOrders.length > 1 ? "s" : ""}
        </p>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Aucune commande ne correspond à vos critères.</p>
                <Button variant="link" onClick={clearFilters}>
                  Réinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-base font-medium">
                      Commande #{order.id}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{order.date}</span>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span>{(item.quantity * item.price).toFixed(2)}€</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-lg">{order.total.toFixed(2)}€</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/account/orders/${order.id}`}>Voir détails</Link>
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm" className="flex-1">
                          Recommander
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default Orders;
