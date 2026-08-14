
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
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
  BarChart3,
  CreditCard,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

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
  const { user, logout, isAdmin, isOwner } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // PrivateRoute garantit déjà la session ; ce garde-fou évite un rendu vide si
  // le layout est monté hors d'une route protégée.
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Chaque entrée pointe vers une route réellement autorisée pour le rôle :
  // les liens vers des routes d'un autre rôle renvoyaient l'utilisateur sur /account.
  const clientNavItems = [
    { href: "/account", icon: <LayoutDashboard size={18} />, label: t("account.dashboard") },
    { href: "/account/orders", icon: <ShoppingCart size={18} />, label: t("account.orders") },
    { href: "/account/history", icon: <History size={18} />, label: t("account.history") },
    { href: "/account/settings", icon: <Settings size={18} />, label: t("account.settings") },
  ];

  const ownerNavItems = [
    { href: "/account", icon: <LayoutDashboard size={18} />, label: t("account.dashboard") },
    { href: "/account/equipment", icon: <Package size={18} />, label: t("account.myEquipment") },
    { href: "/account/rentals", icon: <Building size={18} />, label: t("account.currentRentals") },
    { href: "/account/income", icon: <CreditCard size={18} />, label: t("account.income") },
    { href: "/account/stats", icon: <BarChart3 size={18} />, label: t("account.stats") },
    { href: "/account/settings", icon: <Settings size={18} />, label: t("account.settings") },
  ];

  const adminNavItems = [
    { href: "/account", icon: <LayoutDashboard size={18} />, label: t("account.dashboard") },
    { href: "/account/users", icon: <Users size={18} />, label: t("account.users") },
    {
      href: "/account/admin/equipment",
      icon: <Package size={18} />,
      label: t("account.equipment"),
    },
    { href: "/account/materials", icon: <Briefcase size={18} />, label: t("account.materials") },
    { href: "/account/settings", icon: <Settings size={18} />, label: t("account.settings") },
  ];

  const navItems = isAdmin ? adminNavItems : isOwner ? ownerNavItems : clientNavItems;

  return (
    <div className="min-h-screen flex flex-col">
      <Seo title={title} />

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
                      {t(`account.role.${user.role}`)}
                    </div>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>

                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
                  ))}
                  <hr className="my-2 border-muted" />
                  <Button
                    variant="ghost"
                    className="justify-start text-muted-foreground hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-3" />
                    {t("nav.logout")}
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
