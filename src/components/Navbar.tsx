import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Building, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import useMobile from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Équipement", path: "/equipment" },
    { label: "Matériaux", path: "/materials" },
    { label: "Comment ça marche", path: "/how-it-works" },
    { label: "Tarifs", path: "/pricing" },
    { label: "À propos", path: "/about" },
    { label: "Contact", path: "/contact" },
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
          <Link to="/" className="text-2xl font-bold text-primary">
            BTP<span className="text-foreground">Location</span>
          </Link>
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
          <Button variant="outline" size="sm" className="rounded-full">
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
          <Button className="rounded-full">
            <User className="h-4 w-4 mr-2" />
            Connexion
          </Button>
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link to="/become-owner">Devenir loueur</Link>
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
              <Button variant="outline" className="w-full justify-start rounded-full">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
              <Button className="w-full justify-start rounded-full">
                <User className="h-4 w-4 mr-2" />
                Connexion
              </Button>
              <Button variant="outline" className="w-full justify-start rounded-full" asChild>
                <Link to="/become-owner" onClick={() => setMobileMenuOpen(false)}>
                  Devenir loueur
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
