import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicLayout from "./components/layout/PublicLayout";

// Chargées à la demande : chaque page devient un chunk séparé, ce qui évite de
// livrer l'intégralité des espaces compte à un visiteur qui arrive sur l'accueil.
const Index = lazy(() => import("./pages/Index"));
const Equipment = lazy(() => import("./pages/Equipment"));
const EquipmentDetails = lazy(() => import("./pages/EquipmentDetails"));
const Materials = lazy(() => import("./pages/Materials"));
const MaterialDetails = lazy(() => import("./pages/MaterialDetails"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const BecomeOwner = lazy(() => import("./pages/BecomeOwner"));
const CustomQuote = lazy(() => import("./pages/CustomQuote"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Auth
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

// Compte
const Dashboard = lazy(() => import("./pages/account/Dashboard"));
const AccountSettings = lazy(() => import("./pages/account/AccountSettings"));

// Espace client
const Orders = lazy(() => import("./pages/account/client/Orders"));
const OrderDetails = lazy(() => import("./pages/account/client/OrderDetails"));
const History = lazy(() => import("./pages/account/client/History"));

// Espace loueur
const EquipmentList = lazy(() => import("./pages/account/owner/EquipmentList"));
const AddEquipment = lazy(() => import("./pages/account/owner/AddEquipment"));
const Stats = lazy(() => import("./pages/account/owner/Stats"));
const ActiveRentals = lazy(() => import("./pages/account/owner/ActiveRentals"));
const Income = lazy(() => import("./pages/account/owner/Income"));

// Espace administration
const UserManagement = lazy(() => import("./pages/account/admin/UserManagement"));
const ManageEquipment = lazy(() => import("./pages/account/admin/ManageEquipment"));
const ManageMaterials = lazy(() => import("./pages/account/admin/ManageMaterials"));

// Pages légales
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));

// Panier et commande
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div
      role="status"
      aria-label="Chargement"
      className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary"
    />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  {/* Pages publiques : navbar + footer fournis par le layout */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/equipment" element={<Equipment />} />
                    <Route path="/equipment/:id" element={<EquipmentDetails />} />
                    <Route path="/materials" element={<Materials />} />
                    <Route path="/material/:id" element={<MaterialDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/become-owner" element={<BecomeOwner />} />
                    <Route path="/custom-quote" element={<CustomQuote />} />

                    {/* Authentification */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Pages légales */}
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/cookies" element={<Cookies />} />

                    {/* Tunnel de commande : réservé aux utilisateurs connectés */}
                    <Route element={<PrivateRoute />}>
                      <Route path="/checkout" element={<Checkout />} />
                      <Route
                        path="/order-confirmation/:reference"
                        element={<OrderConfirmation />}
                      />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                  </Route>

                  {/* Espace compte : toute la section exige une session */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/account" element={<Dashboard />} />
                    <Route path="/account/settings" element={<AccountSettings />} />
                  </Route>

                  <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                    <Route path="/account/users" element={<UserManagement />} />
                    <Route path="/account/admin/equipment" element={<ManageEquipment />} />
                    <Route path="/account/materials" element={<ManageMaterials />} />
                  </Route>

                  <Route element={<PrivateRoute allowedRoles={["owner"]} />}>
                    <Route path="/account/equipment" element={<EquipmentList />} />
                    <Route path="/account/equipment/add" element={<AddEquipment />} />
                    <Route path="/account/stats" element={<Stats />} />
                    <Route path="/account/rentals" element={<ActiveRentals />} />
                    <Route path="/account/income" element={<Income />} />
                  </Route>

                  <Route element={<PrivateRoute allowedRoles={["client"]} />}>
                    <Route path="/account/orders" element={<Orders />} />
                    <Route path="/account/orders/:id" element={<OrderDetails />} />
                    <Route path="/account/history" element={<History />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
