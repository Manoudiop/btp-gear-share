
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  
  const pricingPlans = [
    {
      name: "Basique",
      description: "Pour les petits entrepreneurs et les projets occasionnels",
      price: { monthly: "0", annually: "0" },
      features: [
        "Accès au catalogue d'équipements",
        "Jusqu'à 3 demandes de location par mois",
        "Support client par email",
        "Paiement sécurisé",
      ],
      limitations: [
        "Pas de réservation prioritaire",
        "Pas d'assurance premium",
        "Pas de livraison gratuite",
        "Pas de remises exclusives",
      ],
      cta: "Commencer gratuitement",
      popular: false,
    },
    {
      name: "Professionnel",
      description: "Pour les entrepreneurs et les PME du BTP",
      price: { monthly: "49", annually: "39" },
      features: [
        "Tout ce qui est inclus dans Basique",
        "Demandes de location illimitées",
        "Réservation prioritaire",
        "Support client 24/7",
        "Livraison gratuite (< 50km)",
        "Remise de 10% sur toutes les locations",
        "Assurance standard incluse",
      ],
      limitations: ["Pas d'assurance premium"],
      cta: "Essayer 14 jours gratuits",
      popular: true,
    },
    {
      name: "Entreprise",
      description: "Pour les grandes entreprises avec besoins réguliers",
      price: { monthly: "149", annually: "119" },
      features: [
        "Tout ce qui est inclus dans Professionnel",
        "Gestionnaire de compte dédié",
        "API pour intégration",
        "Livraison gratuite (< 100km)",
        "Remise de 20% sur toutes les locations",
        "Assurance premium incluse",
        "Rapports détaillés et analyses",
        "Formations personnalisées",
      ],
      limitations: [],
      cta: "Contacter les ventes",
      popular: false,
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Tarification simple et transparente</h1>
          <p className="text-xl text-muted-foreground">
            Choisissez le forfait qui correspond le mieux à vos besoins en matériel de construction
          </p>
        </div>

        <div className="mb-12">
          <Tabs defaultValue="monthly" className="w-fit mx-auto mb-12">
            <TabsList>
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
              <TabsTrigger value="annually">Annuel (économisez 20%)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="pt-8">
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`border rounded-xl p-8 relative flex flex-col h-full
                      ${plan.popular ? "border-primary shadow-lg" : "border-border"}
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Le plus populaire
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">{plan.price.monthly}€</span>
                        {plan.price.monthly !== "0" && (
                          <span className="text-muted-foreground ml-2">/mois</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-start text-muted-foreground">
                          <X className="h-5 w-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Button
                        className={`w-full ${
                          plan.popular ? "button-premium" : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="annually" className="pt-8">
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`border rounded-xl p-8 relative flex flex-col h-full
                      ${plan.popular ? "border-primary shadow-lg" : "border-border"}
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Le plus populaire
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">{plan.price.annually}€</span>
                        {plan.price.annually !== "0" && (
                          <span className="text-muted-foreground ml-2">/mois</span>
                        )}
                      </div>
                      {plan.price.annually !== "0" && (
                        <p className="text-sm text-muted-foreground">Facturation annuelle</p>
                      )}
                    </div>
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-start text-muted-foreground">
                          <X className="h-5 w-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Button
                        className={`w-full ${
                          plan.popular ? "button-premium" : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-secondary/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Besoin d'une solution sur mesure ?</h2>
              <p className="text-muted-foreground mb-6">
                Contactez notre équipe commerciale pour discuter de vos besoins spécifiques et obtenir une tarification personnalisée pour votre entreprise.
              </p>
              <Button 
                className="button-premium"
                onClick={() => navigate("/custom-quote")}
              >
                Demander un devis personnalisé
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-5xl">🤝</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
