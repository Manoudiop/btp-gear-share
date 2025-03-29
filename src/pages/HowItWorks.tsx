
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      title: "Recherchez votre équipement",
      description:
        "Parcourez notre vaste catalogue d'équipements de construction et filtrez par type, localisation et disponibilité.",
      icon: "🔍",
    },
    {
      title: "Réservez en quelques clics",
      description:
        "Sélectionnez vos dates, vérifiez la disponibilité et réservez instantanément sans paperasse.",
      icon: "📅",
    },
    {
      title: "Paiement sécurisé",
      description:
        "Effectuez votre paiement en toute sécurité via notre plateforme de paiement protégée.",
      icon: "💳",
    },
    {
      title: "Récupérez ou faites-vous livrer",
      description:
        "Récupérez l'équipement au point de collecte ou optez pour une livraison directe sur votre chantier.",
      icon: "🚚",
    },
  ];

  const benefits = [
    {
      title: "Économisez jusqu'à 40%",
      description: "Louez uniquement ce dont vous avez besoin, quand vous en avez besoin.",
    },
    {
      title: "Équipements certifiés",
      description: "Tous nos équipements sont vérifiés et certifiés pour votre sécurité.",
    },
    {
      title: "Assurance incluse",
      description: "Chaque location comprend une assurance complète pour votre tranquillité d'esprit.",
    },
    {
      title: "Support client 24/7",
      description: "Notre équipe d'experts est disponible à tout moment pour vous aider.",
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Comment fonctionne BTPLocation</h1>
          <p className="text-xl text-muted-foreground">
            Nous simplifions la location de matériel de construction pour que vous puissiez vous concentrer sur votre chantier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="relative rounded-xl overflow-hidden shadow-premium aspect-video">
              <img
                src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                alt="Comment ça marche"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Location d'équipement BTP simplifiée</h2>
            <p className="text-lg text-muted-foreground">
              BTPLocation connecte les propriétaires d'équipements de construction avec les entrepreneurs et professionnels qui en ont besoin. Notre plateforme permet de louer facilement et en toute sécurité des équipements de qualité à des prix compétitifs.
            </p>
            <div className="flex flex-col space-y-4">
              {["Accès à des milliers d'équipements", "Économies importantes", "Processus simple et rapide", "Support client dédié"].map((item, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">En 4 étapes simples</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-secondary/30 p-6 rounded-xl relative hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-secondary/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir BTPLocation ?</h2>
            <p className="text-lg text-muted-foreground">
              Nous révolutionnons la façon dont les professionnels du BTP accèdent aux équipements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-subtle flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels qui font confiance à BTPLocation pour leurs besoins en équipement de construction.
          </p>
          <Button size="lg" className="button-premium">
            Explorer les équipements
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
