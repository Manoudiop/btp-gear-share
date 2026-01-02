
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import PrivateRoute from "./components/auth/PrivateRoute";

// Pages
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";
import EquipmentDetails from "./pages/EquipmentDetails";
import Materials from "./pages/Materials";
import MaterialDetails from "./pages/MaterialDetails";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BecomeOwner from "./pages/BecomeOwner";
import CustomQuote from "./pages/CustomQuote";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Account Pages
import Dashboard from "./pages/account/Dashboard";

// Owner Dashboard Pages
import EquipmentList from "./pages/account/owner/EquipmentList";
import AddEquipment from "./pages/account/owner/AddEquipment";
import Stats from "./pages/account/owner/Stats";
import ActiveRentals from "./pages/account/owner/ActiveRentals";

// Admin Dashboard Pages
import UserManagement from "./pages/account/admin/UserManagement";
import ManageEquipment from "./pages/account/admin/ManageEquipment";
import ManageMaterials from "./pages/account/admin/ManageMaterials";

// Account Settings
import AccountSettings from "./pages/account/AccountSettings";

// Legal Pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

// Cart
import Cart from "./pages/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            {/* Public routes */}
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
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Private account routes */}
            <Route path="/account" element={<Dashboard />} />
            
            {/* Admin-only routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/account/users" element={<UserManagement />} />
              <Route path="/account/admin/equipment" element={<ManageEquipment />} />
              <Route path="/account/materials" element={<ManageMaterials />} />
            </Route>
            
            {/* Owner-only routes */}
            <Route element={<PrivateRoute allowedRoles={["owner"]} />}>
              <Route path="/account/equipment" element={<EquipmentList />} />
              <Route path="/account/equipment/add" element={<AddEquipment />} />
              <Route path="/account/stats" element={<Stats />} />
              <Route path="/account/rentals" element={<ActiveRentals />} />
            </Route>
            
            {/* Client-only routes */}
            <Route element={<PrivateRoute allowedRoles={["client"]} />}>
              {/* Add client-specific routes here */}
            </Route>
            
            {/* Shared account routes */}
            <Route path="/account/settings" element={<AccountSettings />} />
            
            {/* Static legal pages */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
