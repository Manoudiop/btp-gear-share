
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaterialsGrid from "@/components/MaterialsGrid";

const Materials = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Matériaux de Construction | BTP Location</title>
        <meta name="description" content="Achetez en ligne sable, ciment, béton et autres matériaux de construction pour votre chantier. Livraison rapide et prix compétitifs." />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-24 pb-10">
        <MaterialsGrid />
      </div>
      
      <section className="bg-primary/5 py-16">
        <div className="section-container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Besoin d'une quantité spécifique ?</h2>
          <p className="text-muted-foreground mb-8">
            Notre équipe est à votre disposition pour vous aider à calculer les quantités exactes nécessaires 
            pour votre projet et vous proposer les meilleurs prix pour les commandes en gros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-premium" asChild>
              <Link to="/contact">
                Contacter un conseiller
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/custom-quote">
                Demander un devis personnalisé
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Materials;
