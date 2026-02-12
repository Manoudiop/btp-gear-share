
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Building, 
  Box, 
  Search,
  User,
  LogOut,
  Settings,
  ShoppingCart
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageCurrencySwitcher from "./LanguageCurrencySwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.equipment"), path: "/equipment" },
    { label: t("nav.materials"), path: "/materials" },
    { label: t("nav.howItWorks"), path: "/how-it-works" },
    { label: t("nav.pricing"), path: "/pricing" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-expo py-4 px-4 sm:px-6 lg:px-8",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-subtle"
          : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageCurrencySwitcher />
          
          <Button variant="outline" size="sm" className="rounded-full">
            <Search className="h-4 w-4 mr-2" />
            {t("nav.search")}
          </Button>
          
          <Button variant="outline" size="sm" className="rounded-full relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("nav.myAccount")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("nav.dashboard")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/settings" className="cursor-pointer w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t("nav.settings")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("nav.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="rounded-full" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                {t("nav.login")}
              </Link>
            </Button>
          )}
          
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link to="/become-owner">{t("nav.becomeOwner")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "block py-2 text-base font-medium",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/80"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <div className="flex justify-center">
                <LanguageCurrencySwitcher />
              </div>
              
              <Button variant="outline" className="w-full justify-start rounded-full">
                <Search className="h-4 w-4 mr-2" />
                {t("nav.search")}
              </Button>
              
              <Button variant="outline" className="w-full justify-start rounded-full relative" asChild>
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("nav.cart")}
                  {totalItems > 0 && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Button 
                    className="w-full justify-start rounded-full"
                    asChild
                  >
                    <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      {t("nav.myAccount")}
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-full text-destructive"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("nav.logout")}
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full justify-start rounded-full"
                  asChild
                >
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    {t("nav.login")}
                  </Link>
                </Button>
              )}
              
              <Button variant="outline" className="w-full justify-start rounded-full" asChild>
                <Link to="/become-owner" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.becomeOwner")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
