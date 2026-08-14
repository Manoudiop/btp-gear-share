import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  Loader2,
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOrder } from "@/data/orders";
import { useLanguage } from "@/contexts/LanguageContext";


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

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, formatPrice } = useLanguage();
  const { data: order, isLoading } = useOrder(id);

  if (isLoading) {
    return (
      <AccountLayout title={t("account.orders")}>
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </AccountLayout>
    );
  }

  if (!order) {
    return (
      <AccountLayout title={t("bo.orderNotFound")}>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{t("ord.notFoundDesc")}</p>
          <Button asChild>
            <Link to="/account/orders">{t("ord.backToOrders")}</Link>
          </Button>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title={`Commande #${order.id}`}>
      <div className="space-y-6">
        {/* Back button and status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button variant="ghost" asChild className="w-fit">
            <Link to="/account/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux commandes
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{t("ord.placedOn")} {order.date}</span>
            {getStatusBadge(order.status, t)}
          </div>
        </div>

        {/* Delivery Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5" />
              {t("ord.tracking")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order.trackingNumber && (
              <p className="text-sm text-muted-foreground mb-4">
                {t("ord.trackingNumber")} : <span className="font-medium text-foreground">{order.trackingNumber}</span>
              </p>
            )}
            {order.estimatedDelivery && order.status !== "delivered" && (
              <p className="text-sm mb-6">
                {t("ord.estimatedDelivery")} : <span className="font-medium text-primary">{order.estimatedDelivery}</span>
              </p>
            )}
            
            {/* Timeline */}
            <div className="relative">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex gap-4 pb-6 last:pb-0">
                  {/* Timeline line and dot */}
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        step.completed 
                          ? "bg-primary border-primary" 
                          : step.current 
                            ? "border-primary bg-background" 
                            : "border-muted-foreground/30 bg-background"
                      }`}
                    >
                      {step.completed && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                      {step.current && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div 
                        className={`w-0.5 flex-1 mt-1 ${
                          step.completed ? "bg-primary" : "bg-muted-foreground/30"
                        }`} 
                      />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${step.current ? "text-primary" : step.completed ? "" : "text-muted-foreground"}`}>
                      {t(step.status)}
                    </p>
                    {step.date && (
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5" />
                {t("ord.items")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">{formatPrice(item.quantity * item.price)}</span>
                  </div>
                ))}
                <Separator className="my-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("common.subtotal")}</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison ({order.deliveryOption})</span>
                  <span>{order.deliveryFee === 0 ? "Offert" : formatPrice(order.deliveryFee)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between">
                  <span className="font-medium">{t("common.total")}</span>
                  <span className="font-bold text-lg">{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Payment Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t("ord.shippingAddress")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-muted-foreground">{order.shippingAddress.street}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.postalCode} {order.shippingAddress.city}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground pt-2">
                  <Phone className="h-4 w-4" />
                  {order.shippingAddress.phone}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{order.paymentMethod}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">{t("ord.downloadInvoice")}</Button>
          {order.status === "delivered" && (
            <Button variant="outline">{t("ord.reorder")}</Button>
          )}
          <Button variant="outline">{t("ord.contactSupport")}</Button>
        </div>
      </div>
    </AccountLayout>
  );
};

export default OrderDetails;
