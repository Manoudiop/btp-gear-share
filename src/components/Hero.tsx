
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10" />
      
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:pr-12 animate-fade-up">
            <div>
              <h2 className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                Premier service de location BTP en ligne
              </h2>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Louez du matériel BTP <span className="text-primary">en quelques clics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Trouvez, réservez et louez facilement des engins et équipements de chantier pour tous vos projets de construction.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="button-premium">
                Explorer le matériel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="button-outline">
                Comment ça marche
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                ))}
              </div>
              <p>Rejoint par <span className="font-semibold text-foreground">+2000</span> professionnels</p>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-tr from-equipment-800/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1571515476930-15c19f421eab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80" 
                alt="Equipment rental" 
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 glass-effect rounded-xl shadow-elevated p-4 max-w-[200px] animate-slide-in-right animation-delay-300">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                <p className="font-semibold">Livraison rapide</p>
              </div>
              <p className="text-sm text-muted-foreground">Directement sur votre chantier</p>
            </div>
            
            <div className="absolute -top-6 -right-6 glass-effect rounded-xl shadow-elevated p-4 max-w-[200px] animate-slide-in-right animation-delay-500">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">⭐</div>
                <p className="font-semibold">Location sécurisée</p>
              </div>
              <p className="text-sm text-muted-foreground">Équipements certifiés et assurés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
