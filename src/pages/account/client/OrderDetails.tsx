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
  CreditCard
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockOrders: Record<string, {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  timeline: { status: string; date: string; time: string; completed: boolean; current?: boolean }[];
}> = {
  "1234": {
    id: "1234",
    date: "05/01/2026",
    items: [
      { name: "Sac de ciment 35kg", quantity: 10, price: 8.99 },
      { name: "Sable 25kg", quantity: 5, price: 4.50 },
    ],
    total: 112.40,
    status: "shipping",
    shippingAddress: {
      name: "Jean Dupont",
      street: "123 Rue de la Construction",
      city: "Paris",
      postalCode: "75001",
      phone: "06 12 34 56 78",
    },
    paymentMethod: "Carte bancaire ****4242",
    trackingNumber: "FR123456789",
    estimatedDelivery: "07/01/2026",
    timeline: [
      { status: "Commande confirmée", date: "05/01/2026", time: "10:30", completed: true },
      { status: "En préparation", date: "05/01/2026", time: "14:15", completed: true },
      { status: "Expédiée", date: "06/01/2026", time: "09:00", completed: true },
      { status: "En cours de livraison", date: "07/01/2026", time: "08:30", completed: false, current: true },
      { status: "Livrée", date: "", time: "", completed: false },
    ],
  },
  "1201": {
    id: "1201",
    date: "28/12/2025",
    items: [
      { name: "Parpaing 20x20x50", quantity: 50, price: 2.10 },
      { name: "Fer à béton 10mm", quantity: 20, price: 5.50 },
      { name: "Fil de fer recuit", quantity: 2, price: 8.99 },
    ],
    total: 232.98,
    status: "delivered",
    shippingAddress: {
      name: "Jean Dupont",
      street: "123 Rue de la Construction",
      city: "Paris",
      postalCode: "75001",
      phone: "06 12 34 56 78",
    },
    paymentMethod: "Carte bancaire ****4242",
    trackingNumber: "FR987654321",
    timeline: [
      { status: "Commande confirmée", date: "28/12/2025", time: "11:00", completed: true },
      { status: "En préparation", date: "28/12/2025", time: "15:30", completed: true },
      { status: "Expédiée", date: "29/12/2025", time: "08:45", completed: true },
      { status: "En cours de livraison", date: "30/12/2025", time: "07:00", completed: true },
      { status: "Livrée", date: "30/12/2025", time: "14:22", completed: true },
    ],
  },
};

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

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const order = id ? mockOrders[id] : null;

  if (!order) {
    return (
      <AccountLayout title="Commande introuvable">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Cette commande n'existe pas.</p>
          <Button asChild>
            <Link to="/account/orders">Retour aux commandes</Link>
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
            <span className="text-sm text-muted-foreground">Passée le {order.date}</span>
            {getStatusBadge(order.status)}
          </div>
        </div>

        {/* Delivery Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Suivi de livraison
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order.trackingNumber && (
              <p className="text-sm text-muted-foreground mb-4">
                N° de suivi : <span className="font-medium text-foreground">{order.trackingNumber}</span>
              </p>
            )}
            {order.estimatedDelivery && order.status !== "delivered" && (
              <p className="text-sm mb-6">
                Livraison estimée : <span className="font-medium text-primary">{order.estimatedDelivery}</span>
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
                      {step.status}
                    </p>
                    {(step.date || step.time) && (
                      <p className="text-sm text-muted-foreground">
                        {step.date} {step.time && `à ${step.time}`}
                      </p>
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
                Articles commandés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">{(item.quantity * item.price).toFixed(2)}€</span>
                  </div>
                ))}
                <Separator className="my-3" />
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">{order.total.toFixed(2)}€</span>
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
                  Adresse de livraison
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
          <Button variant="outline">Télécharger la facture</Button>
          {order.status === "delivered" && (
            <Button variant="outline">Recommander</Button>
          )}
          <Button variant="outline">Contacter le support</Button>
        </div>
      </div>
    </AccountLayout>
  );
};

export default OrderDetails;
