import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Loader2, MapPin, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useOrder } from "@/data/orders";
import Seo from "@/components/Seo";

const OrderConfirmation = () => {
  const { reference } = useParams();
  const { t, formatPrice } = useLanguage();
  const { data: order, isLoading } = useOrder(reference);

  if (isLoading) {
    return (
      <div className="container py-16 text-center">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("confirmation.notFound")}</h1>
        <p className="text-muted-foreground mb-8">{t("confirmation.notFoundDesc")}</p>
        <Button asChild>
          <Link to="/materials">{t("materials.backToList")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Seo title={`${t("checkout.confirmed")} · ${order.id}`} />

      <div className="container py-12 max-w-3xl">
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{t("confirmation.title")}</h1>
          <p className="text-muted-foreground">
            {t("confirmation.reference", { reference: order.id, date: order.date })}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{t("confirmation.details")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.name} className="flex justify-between gap-2 text-sm">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity} {item.unit ?? ""}
                  </span>
                  <span className="whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("common.subtotal")}</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t("common.delivery")} ({order.deliveryOption})
              </span>
              <span>
                {order.deliveryFee === 0 ? t("common.free") : formatPrice(order.deliveryFee)}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>{t("common.total")}</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-primary" />
                {t("common.delivery")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.phone}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="h-4 w-4 text-primary" />
                {t("confirmation.tracking")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>
                {t("confirmation.method")} :{" "}
                <span className="text-foreground">{order.deliveryOption}</span>
              </p>
              {order.estimatedDelivery && (
                <p>
                  {t("confirmation.estimated")} :{" "}
                  <span className="text-foreground">{order.estimatedDelivery}</span>
                </p>
              )}
              <p>
                {t("confirmation.paymentLabel")} :{" "}
                <span className="text-foreground">{order.paymentMethod}</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/account/orders">
              <Package className="mr-2 h-4 w-4" />
              {t("confirmation.trackOrders")}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/materials">{t("confirmation.keepShopping")}</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
