import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CreditCard, Landmark, Loader2, Lock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePlaceOrder } from "@/data/orders";
import { phoneField } from "@/lib/phone";
import Seo from "@/components/Seo";

const deliveryOptions = [
  { id: "standard", labelKey: "checkout.delivery.standard", delayKey: "checkout.delivery.standardDelay", price: 50, days: 5 },
  { id: "express", labelKey: "checkout.delivery.express", delayKey: "checkout.delivery.expressDelay", price: 90, days: 1 },
  { id: "pickup", labelKey: "checkout.delivery.pickup", delayKey: "checkout.delivery.pickupDelay", price: 0, days: 1 },
];

const paymentMethods = [
  { id: "card", labelKey: "checkout.payment.card", icon: CreditCard, detailKey: "checkout.payment.cardDetail" },
  { id: "transfer", labelKey: "checkout.payment.transfer", icon: Landmark, detailKey: "checkout.payment.transferDetail" },
];

// Le schéma dépend de la langue : les messages sont produits par `t`, donc
// reconstruits quand l'utilisateur change de langue.
const createCheckoutSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("checkout.error.name")),
    street: z.string().min(5, t("checkout.error.street")),
    // Chiffres, lettres et espaces : les codes postaux ne se ressemblent pas
    // d'un pays à l'autre, et cinq chiffres ne valent que pour quelques-uns.
    postalCode: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9][A-Za-z0-9\s-]{1,9}$/, t("checkout.error.postalCode")),
    city: z.string().min(2, t("checkout.error.city")),
    phone: phoneField(t("checkout.error.phone")),
    notes: z.string().max(500, t("checkout.error.notes")).optional(),
  });

type CheckoutFormData = z.infer<ReturnType<typeof createCheckoutSchema>>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { t, formatPrice } = useLanguage();

  const [deliveryOption, setDeliveryOption] = useState(deliveryOptions[0].id);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const placeOrder = usePlaceOrder();

  const checkoutSchema = useMemo(() => createCheckoutSchema(t), [t]);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name ?? "",
      street: "",
      postalCode: "",
      city: "",
      phone: "",
      notes: "",
    },
  });

  // Un panier vide n'a rien à valider — sauf juste après la commande, où la
  // redirection vers la confirmation a déjà été demandée.
  if (items.length === 0 && !isSubmitting) {
    return <Navigate to="/cart" replace />;
  }

  const selectedDelivery =
    deliveryOptions.find((option) => option.id === deliveryOption) ?? deliveryOptions[0];
  const selectedPayment =
    paymentMethods.find((method) => method.id === paymentMethod) ?? paymentMethods[0];
  const total = totalPrice + selectedDelivery.price;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      const order = await placeOrder.mutateAsync({
        items: items.map((item) => ({
          // Rattache la ligne au catalogue, sans dépendre de lui : le nom et le
          // prix restent figés si le matériau change ou disparaît.
          materialId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
        })),
        subtotal: totalPrice,
        deliveryFee: selectedDelivery.price,
        shippingAddress: {
          name: data.name,
          street: data.street,
          city: data.city,
          postalCode: data.postalCode,
          phone: data.phone,
        },
        paymentMethod: t(selectedPayment.labelKey),
        deliveryOption: t(selectedDelivery.labelKey),
        deliveryDays: selectedDelivery.days,
      });

      clearCart();
      toast({
        title: t("checkout.confirmed"),
        description: t("checkout.confirmedDesc", { reference: order.id }),
      });
      navigate(`/order-confirmation/${order.id}`, { replace: true });
    } catch {
      // Le panier est laissé intact : la commande peut être retentée telle quelle.
      setIsSubmitting(false);
      toast({ title: t("checkout.failed"), variant: "destructive" });
    }
  };

  return (
    <>
      <Seo title={t("checkout.title")} />

      <div className="container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("checkout.backToCart")}
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">{t("checkout.title")}</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t("checkout.shippingAddress")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("checkout.recipient")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("checkout.recipientPlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("checkout.street")}</FormLabel>
                        <FormControl>
                          <Input placeholder="12 rue des Bâtisseurs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("checkout.postalCode")}</FormLabel>
                          <FormControl>
                            <Input inputMode="numeric" placeholder="69001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("checkout.city")}</FormLabel>
                          <FormControl>
                            <Input placeholder="Lyon" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("checkout.phone")}</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="06 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("checkout.notes")}</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder={t("checkout.notesPlaceholder")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t("checkout.deliveryMethod")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={deliveryOption}
                    onValueChange={setDeliveryOption}
                    className="space-y-3"
                  >
                    {deliveryOptions.map((option) => (
                      <Label
                        key={option.id}
                        htmlFor={`delivery-${option.id}`}
                        className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.id} id={`delivery-${option.id}`} />
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              <Truck className="h-4 w-4 text-primary" />
                              {t(option.labelKey)}
                            </p>
                            <p className="text-sm text-muted-foreground">{t(option.delayKey)}</p>
                          </div>
                        </div>
                        <span className="font-semibold">
                          {option.price === 0 ? t("common.free") : formatPrice(option.price)}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t("checkout.payment")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <Label
                          key={method.id}
                          htmlFor={`payment-${method.id}`}
                          className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                        >
                          <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                          <Icon className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{t(method.labelKey)}</p>
                            <p className="text-sm text-muted-foreground">{t(method.detailKey)}</p>
                          </div>
                        </Label>
                      );
                    })}
                  </RadioGroup>

                  <p className="flex items-start gap-2 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                    {t("checkout.demoNotice")}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">{t("cart.summary")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between gap-2 text-sm">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity} {item.unit}
                        </span>
                        <span className="whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("common.subtotal")}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("common.delivery")} ({t(selectedDelivery.labelKey)})
                    </span>
                    <span>
                      {selectedDelivery.price === 0
                        ? t("common.free")
                        : formatPrice(selectedDelivery.price)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>{t("common.total")}</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("checkout.processing")}
                      </>
                    ) : (
                      t("checkout.confirm")
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Checkout;
