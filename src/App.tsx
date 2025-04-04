
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
              {/* Add admin-specific routes here */}
            </Route>
            
            {/* Owner-only routes */}
            <Route element={<PrivateRoute allowedRoles={["owner"]} />}>
              {/* Add owner-specific routes here */}
            </Route>
            
            {/* Client-only routes */}
            <Route element={<PrivateRoute allowedRoles={["client"]} />}>
              {/* Add client-specific routes here */}
            </Route>
            
            {/* Static pages */}
            <Route path="/privacy" element={<NotFound />} />
            <Route path="/terms" element={<NotFound />} />
            <Route path="/cookies" element={<NotFound />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
