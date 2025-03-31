
import { ReactNode } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Package,
  Settings,
  LogOut,
  LayoutDashboard,
  ShoppingCart,
  History,
  Users,
  Building,
  Briefcase,
  CreditCard,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href}>
      <div
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </div>
    </Link>
  );
};

interface AccountLayoutProps {
  title: string;
  children: ReactNode;
}

const AccountLayout = ({ title, children }: AccountLayoutProps) => {
  const { user, logout, isAdmin, isClient, isOwner } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Define navigation items based on user role
  const clientNavItems = [
    {
      href: "/account",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
    {
      href: "/account/orders",
      icon: <ShoppingCart size={18} />,
      label: "Mes commandes",
    },
    {
      href: "/account/rentals",
      icon: <Package size={18} />,
      label: "Mes locations",
    },
    {
      href: "/account/history",
      icon: <History size={18} />,
      label: "Historique",
    },
    {
      href: "/account/settings",
      icon: <Settings size={18} />,
      label: "Paramètres",
    },
  ];

  const ownerNavItems = [
    {
      href: "/account",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
    {
      href: "/account/equipment",
      icon: <Package size={18} />,
      label: "Mes équipements",
    },
    {
      href: "/account/rentals",
      icon: <Building size={18} />,
      label: "Locations en cours",
    },
    {
      href: "/account/income",
      icon: <CreditCard size={18} />,
      label: "Mes revenus",
    },
    {
      href: "/account/settings",
      icon: <Settings size={18} />,
      label: "Paramètres",
    },
  ];

  const adminNavItems = [
    {
      href: "/account",
      icon: <LayoutDashboard size={18} />,
      label: "Tableau de bord",
    },
    {
      href: "/account/users",
      icon: <Users size={18} />,
      label: "Utilisateurs",
    },
    {
      href: "/account/equipment",
      icon: <Package size={18} />,
      label: "Équipements",
    },
    {
      href: "/account/materials",
      icon: <Briefcase size={18} />,
      label: "Matériaux",
    },
    {
      href: "/account/settings",
      icon: <Settings size={18} />,
      label: "Paramètres",
    },
  ];

  let navItems;
  if (isAdmin) {
    navItems = adminNavItems;
  } else if (isOwner) {
    navItems = ownerNavItems;
  } else {
    navItems = clientNavItems;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title} | BTP Location</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg shadow p-4 sticky top-24">
                <div className="flex items-center mb-6 pb-4 border-b">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User size={24} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary text-xs text-white px-2 py-0.5 rounded-md font-medium">
                      {user.role === "admin" && "Admin"}
                      {user.role === "owner" && "Loueur"}
                      {user.role === "client" && "Client"}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                    />
                  ))}
                  <hr className="my-2 border-muted" />
                  <Button
                    variant="ghost"
                    className="justify-start text-muted-foreground hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut size={18} className="mr-3" />
                    Se déconnecter
                  </Button>
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 bg-card rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6 pb-4 border-b">{title}</h1>
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountLayout;
