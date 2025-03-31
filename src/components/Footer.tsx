
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ArrowRight, 
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/20">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-muted-foreground max-w-xs mb-6">
              BTP Location révolutionne la location d'équipements et l'achat de matériaux pour les professionnels du BTP.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/equipment" className="text-muted-foreground hover:text-primary transition-colors">
                  Location d'équipements
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-muted-foreground hover:text-primary transition-colors">
                  Achat de matériaux
                </Link>
              </li>
              <li>
                <Link to="/become-owner" className="text-muted-foreground hover:text-primary transition-colors">
                  Devenir loueur
                </Link>
              </li>
              <li>
                <Link to="/custom-quote" className="text-muted-foreground hover:text-primary transition-colors">
                  Devis personnalisé
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Informations</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Recevez nos actualités et offres exclusives
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Votre email"
                className="bg-white"
              />
              <Button>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span className="text-muted-foreground">123 Avenue des Entrepreneurs, 75001 Paris</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">01 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">contact@btplocation.fr</span>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-border" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} BTP Location. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
