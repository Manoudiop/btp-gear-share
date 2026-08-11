
import { Shield, Truck, Watch, MessageSquare, CalendarCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import EquipmentGrid from "@/components/EquipmentGrid";
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Seo title={t("seo.home")} description={t("seo.homeDesc")} />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="bg-secondary/30 py-20">
        <div className="section-container">
          <div className="max-w-xl mx-auto text-center mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">{t("home.whyTitle")}</h2>
            <p className="text-muted-foreground">{t("home.whySubtitle")}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <FeatureCard 
              icon={<Shield className="h-6 w-6" />}
              title={t("home.feature.secure.title")}
              description={t("home.feature.secure.desc")}
            />
            <FeatureCard 
              icon={<Truck className="h-6 w-6" />}
              title={t("home.feature.delivery.title")}
              description={t("home.feature.delivery.desc")}
            />
            <FeatureCard 
              icon={<Watch className="h-6 w-6" />}
              title={t("home.feature.booking.title")}
              description={t("home.feature.booking.desc")}
            />
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6" />}
              title={t("home.feature.chat.title")}
              description={t("home.feature.chat.desc")}
            />
            <FeatureCard 
              icon={<CalendarCheck className="h-6 w-6" />}
              title={t("home.feature.flexible.title")}
              description={t("home.feature.flexible.desc")}
            />
            <FeatureCard 
              icon={<CreditCard className="h-6 w-6" />}
              title={t("home.feature.pricing.title")}
              description={t("home.feature.pricing.desc")}
            />
          </div>
        </div>
      </section>
      
      {/* Equipment Showcase */}
      <section className="py-20">
        <EquipmentGrid />
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="section-container">
          <div className="bg-white rounded-2xl shadow-premium p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">{t("home.cta.title")}</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("home.cta.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="button-premium" asChild>
                  <Link to="/equipment">{t("home.cta.find")}</Link>
                </Button>
                <Button variant="outline" size="lg" className="button-outline" asChild>
                  <Link to="/become-owner">{t("nav.becomeOwner")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("home.testimonials.title")}</h2>
            <p className="text-muted-foreground">{t("home.testimonials.subtitle")}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-subtle hover-lift">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-foreground italic">
                  « {t("home.testimonials.quote")} »
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Jean Dupont</p>
                    <p className="text-sm text-muted-foreground">{t("home.testimonials.role")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
    </div>
  );
};

export default Index;
