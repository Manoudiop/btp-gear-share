import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: t("footer.newsletterSuccess"),
        description: t("footer.newsletterSuccessDesc"),
      });
      setEmail("");
    }
  };
  
  const socialLinks = {
    facebook: "https://facebook.com/btplocation",
    twitter: "https://twitter.com/btplocation",
    instagram: "https://instagram.com/btplocation",
    linkedin: "https://linkedin.com/company/btplocation",
  };
  
  return (
    <footer className="bg-secondary/20">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-muted-foreground max-w-xs mb-6">{t("footer.tagline")}</p>
            <div className="flex space-x-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/equipment" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.equipmentRental")}
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.materialPurchase")}
                </Link>
              </li>
              <li>
                <Link to="/become-owner" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.becomeOwner")}
                </Link>
              </li>
              <li>
                <Link to="/custom-quote" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.customQuote")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">{t("footer.info")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.howItWorks")}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">{t("footer.newsletter")}</h4>
            <p className="text-muted-foreground mb-4">{t("footer.newsletterDesc")}</p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder={t("footer.emailPlaceholder")}
                className="bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-6 space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span className="text-muted-foreground">123 Avenue des Entrepreneurs, 75001 Paris</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                <a href="tel:+33123456789" className="text-muted-foreground hover:text-primary transition-colors">01 23 45 67 89</a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                <a href="mailto:contact@btplocation.fr" className="text-muted-foreground hover:text-primary transition-colors">contact@btplocation.fr</a>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-border" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} BTP Location. {t("footer.rights")}
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
