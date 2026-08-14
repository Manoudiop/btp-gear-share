import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Package, Truck, CheckCircle, Clock, Search, Filter, CalendarIcon, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useOrders } from "@/data/orders";
import { useLanguage } from "@/contexts/LanguageContext";


const statusOptions = [
  { value: "all", labelKey: "bo.allStatuses" },
  { value: "pending", labelKey: "ord.pending" },
  { value: "processing", labelKey: "ord.processing" },
  { value: "shipping", labelKey: "ord.shipping" },
  { value: "delivered", labelKey: "ord.delivered" },
];

const getStatusBadge = (status: string, t: (key: string) => string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {t("ord.pending")}
        </Badge>
      );
    case "processing":
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-100 text-yellow-800">
          <Package className="h-3 w-3" />
          {t("ord.processing")}
        </Badge>
      );
    case "shipping":
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-blue-100 text-blue-800">
          <Truck className="h-3 w-3" />
          {t("ord.shipping")}
        </Badge>
      );
    case "delivered":
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3" />
          {t("ord.delivered")}
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const ORDERS_PER_PAGE = 5;

const Orders = () => {
  // Les commandes passées depuis le tunnel s'ajoutent aux commandes de démonstration.
  const { t, formatPrice, language } = useLanguage();
  const dateLocale = language === "fr" ? fr : enUS;
  const { data: orders = [], isLoading } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search filter
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Status filter
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;

      // Date filter
      const orderDate = new Date(order.createdAt);
      const matchesDateFrom = !dateFrom || orderDate >= dateFrom;
      const matchesDateTo = !dateTo || orderDate <= dateTo;

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [orders, searchQuery, statusFilter, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateFrom, dateTo]);

  const stats = useMemo(
    () => ({
      total: orders.length,
      inProgress: orders.filter((order) => order.status !== "delivered").length,
      spent: orders.reduce((sum, order) => sum + order.total, 0),
    }),
    [orders],
  );

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const hasActiveFilters = searchQuery || statusFilter !== "all" || dateFrom || dateTo;

  return (
    <AccountLayout title={t("account.orders")}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">{t("ord.totalOrders")}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.inProgress}</p>
                  <p className="text-sm text-muted-foreground">{t("ord.inProgress")}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{formatPrice(stats.spent)}</p>
                  <p className="text-sm text-muted-foreground">{t("ord.totalSpent")}</p>
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
                {t("ord.filters")}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder={t("ord.search")} 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Status filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("bo.status")} />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {t(option.labelKey)}
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
                      {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: dateLocale }) : t("ord.dateFrom")}
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
                      {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: dateLocale }) : t("ord.dateTo")}
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
          {isLoading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ) : filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">{t("ord.noMatch")}</p>
                <Button variant="link" onClick={clearFilters}>
                  Réinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          ) : (
            paginatedOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-base font-medium">
                      Commande #{order.id}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{order.date}</span>
                      {getStatusBadge(order.status, t)}
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
                        <span>{formatPrice(item.quantity * item.price)}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t flex justify-between items-center">
                      <span className="font-medium">{t("common.total")}</span>
                      <span className="font-bold text-lg">{formatPrice(order.total)}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/account/orders/${order.id}`}>{t("ord.viewDetails")}</Link>
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm" className="flex-1">
                          {t("ord.reorder")}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </AccountLayout>
  );
};

export default Orders;
