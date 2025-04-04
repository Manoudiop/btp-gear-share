
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChevronLeft, Star, MapPin, Calendar, Truck, Shield, ThumbsUp, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

// Données fictives - en pratique, ces données viendraient d'une API
const equipmentData = [
  {
    id: "1",
    name: "Pelleteuse Caterpillar 320",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Pelleteuses",
    price: 350,
    deposit: 1000,
    rating: 4.8,
    location: "Lyon",
    owner: "BTP Solutions",
    ownerRating: 4.9,
    ownerResponseTime: "1h",
    description: "Pelleteuse hydraulique Caterpillar 320 en excellent état. Idéale pour les travaux d'excavation, de terrassement et de démolition. Puissance de 120 kW, poids opérationnel de 20 tonnes, profondeur de fouille maximale de 6,7 mètres.",
    features: ["Cabine climatisée", "Système GPS", "Caméra de recul", "Godet standard et godet de curage"],
    specifications: {
      weight: "20 tonnes",
      power: "120 kW",
      year: "2019",
      hours: "2500 heures",
      fuelType: "Diesel",
    },
    isAvailable: true,
    availabilityDates: ["2023-06-01", "2023-06-02", "2023-06-03", "2023-06-04", "2023-06-05"],
    reviews: [
      { id: "r1", author: "Jean D.", rating: 5, date: "15/05/2023", comment: "Machine en parfait état, très satisfait de la location." },
      { id: "r2", author: "Michel P.", rating: 4, date: "22/04/2023", comment: "Bon rapport qualité-prix, le propriétaire est très professionnel." },
    ],
    questionsAnswers: [
      { 
        id: "q1", 
        question: "Est-ce que la livraison est incluse ?", 
        answer: "La livraison est possible avec supplément selon la distance.",
        date: "10/04/2023",
        author: "Sophie M."
      },
      { 
        id: "q2", 
        question: "Faut-il avoir une qualification spécifique pour utiliser cet équipement ?", 
        answer: "Oui, un CACES R482 catégorie C1 est nécessaire pour manipuler cette pelleteuse.",
        date: "05/04/2023",
        author: "Thomas L."
      },
    ],
    insurance: ["Dommages matériels", "Vol", "Bris de machine"],
    similiarItems: ["2", "7", "8"]
  },
  {
    id: "2",
    name: "Chargeuse JCB 437",
    image: "https://images.unsplash.com/photo-1573611030146-ff6916c398f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Chargeuses",
    price: 280,
    deposit: 800,
    rating: 4.6,
    location: "Marseille",
    owner: "Constructions Services",
    ownerRating: 4.7,
    ownerResponseTime: "2h",
    description: "Chargeuse sur pneus JCB 437 avec godet haute capacité. Parfaite pour le chargement de matériaux, le terrassement et la manutention sur chantier.",
    features: ["Climatisation", "Pesage embarqué", "Attache rapide hydraulique"],
    specifications: {
      weight: "14 tonnes",
      power: "97 kW",
      year: "2020",
      hours: "1200 heures",
      fuelType: "Diesel",
    },
    isAvailable: true,
    reviews: [],
    questionsAnswers: [],
    insurance: ["Dommages matériels", "Vol"],
    similiarItems: ["3", "7"]
  },
  // ... autres équipements
];

const EquipmentDetails = () => {
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  // Trouver l'équipement correspondant à l'ID
  const equipment = equipmentData.find(item => item.id === id);

  if (!equipment) {
    return (
      <>
        <Navbar />
        <div className="section-container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Équipement non trouvé</h1>
          <p className="mb-8">L'équipement que vous cherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/equipment">Retour aux équipements</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleDateSelection = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter(d => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleRent = () => {
    if (selectedDates.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une date",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Réservation en cours",
      description: `Demande de réservation envoyée pour ${selectedDates.length} jour(s)`,
    });
    setIsBookingDialogOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{equipment.name} | BTP Location</title>
        <meta name="description" content={`Louez ${equipment.name} à ${equipment.location}. ${equipment.description.substring(0, 150)}...`} />
      </Helmet>

      <Navbar />

      <div className="bg-muted/20 py-4">
        <div className="section-container">
          <div className="flex items-center text-sm">
            <Link to="/equipment" className="text-muted-foreground hover:text-primary flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour aux équipements
            </Link>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
              <img 
                src={equipment.image} 
                alt={equipment.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="aspect-[4/3] rounded-md overflow-hidden">
                <img src={equipment.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-md overflow-hidden">
                <img src={equipment.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-md overflow-hidden">
                <img src={equipment.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-md overflow-hidden">
                <img src={equipment.image} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Informations sur l'équipement */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <Badge className="mb-2">{equipment.category}</Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-medium">{equipment.rating.toFixed(1)}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold">{equipment.name}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{equipment.location}</span>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">{equipment.price} €<span className="text-sm font-normal text-muted-foreground">/jour</span></p>
                  <p className="text-sm text-muted-foreground">Caution: {equipment.deposit} €</p>
                </div>
                <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="button-premium">
                      Réserver maintenant
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Réserver {equipment.name}</DialogTitle>
                      <DialogDescription>
                        Sélectionnez les dates souhaitées pour votre location
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="font-semibold mb-2">Dates disponibles:</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {equipment.availabilityDates?.map((date) => (
                          <button
                            key={date}
                            className={`px-3 py-1.5 rounded-full text-sm ${
                              selectedDates.includes(date)
                                ? "bg-primary text-white"
                                : "bg-muted hover:bg-muted/70"
                            }`}
                            onClick={() => handleDateSelection(date)}
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-3 mt-6">
                        <div className="flex justify-between">
                          <span>Prix par jour</span>
                          <span>{equipment.price} €</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nombre de jours</span>
                          <span>{selectedDates.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Caution (remboursable)</span>
                          <span>{equipment.deposit} €</span>
                        </div>
                        <div className="border-t pt-3 font-bold flex justify-between">
                          <span>Total</span>
                          <span>{selectedDates.length * equipment.price} €</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-6" 
                        size="lg"
                        onClick={handleRent}
                      >
                        Confirmer la réservation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">À propos de cet équipement</h2>
              <p className="text-muted-foreground">{equipment.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg flex items-center">
                <Truck className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">Livraison</h3>
                  <p className="text-sm text-muted-foreground">Disponible sur demande</p>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg flex items-center">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">Assurance incluse</h3>
                  <p className="text-sm text-muted-foreground">Protection de base</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <ThumbsUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{equipment.owner}</h3>
                  <div className="flex items-center text-sm space-x-4">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" fill="currentColor" />
                      <span>{equipment.ownerRating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>Répond en {equipment.ownerResponseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contacter le loueur
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="specifications">
            <TabsList className="w-full border-b rounded-none justify-start">
              <TabsTrigger value="specifications">Spécifications</TabsTrigger>
              <TabsTrigger value="features">Caractéristiques</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({equipment.reviews.length})</TabsTrigger>
              <TabsTrigger value="questions">Questions ({equipment.questionsAnswers.length})</TabsTrigger>
              <TabsTrigger value="insurance">Assurance</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(equipment.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b pb-3">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="pt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {equipment.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              {equipment.reviews.length > 0 ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1">
                      <div className="text-center p-6 bg-muted/30 rounded-lg">
                        <div className="text-5xl font-bold mb-2">{equipment.rating}</div>
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-5 w-5 text-yellow-400" 
                              fill={i < Math.floor(equipment.rating) ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{equipment.reviews.length} avis clients</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = equipment.reviews.filter(r => r.rating === rating).length;
                          const percentage = (count / equipment.reviews.length) * 100;
                          return (
                            <div key={rating} className="flex items-center">
                              <div className="w-12 text-right mr-4">{rating} étoiles</div>
                              <Progress value={percentage} className="h-2 flex-1" />
                              <div className="w-12 text-left ml-4">{count}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {equipment.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{review.author}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="h-4 w-4 text-yellow-400" 
                                fill={i < review.rating ? "currentColor" : "none"} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Aucun avis pour cet équipement</p>
                  <Button variant="outline">Laisser un avis</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="questions" className="pt-6">
              {equipment.questionsAnswers.length > 0 ? (
                <div className="space-y-6">
                  {equipment.questionsAnswers.map((qa) => (
                    <div key={qa.id} className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-start mb-3">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{qa.author}</h4>
                            <span className="text-xs text-muted-foreground ml-2">{qa.date}</span>
                          </div>
                          <p className="mt-1">{qa.question}</p>
                        </div>
                      </div>
                      {qa.answer && (
                        <div className="ml-12 bg-background p-3 rounded-md">
                          <p className="text-sm text-muted-foreground mb-1">Réponse du loueur :</p>
                          <p>{qa.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Aucune question pour cet équipement</p>
                  <Button variant="outline">Poser une question</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="insurance" className="pt-6">
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">Assurance incluse</h3>
                <ul className="space-y-3">
                  {equipment.insurance.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  L'assurance de base est incluse dans le prix de la location. Des options supplémentaires 
                  peuvent être souscrites lors de la finalisation de votre réservation.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Franchise réduite</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Réduisez votre franchise en cas de sinistre de 80%
                  </p>
                  <p className="text-lg font-bold">+15 €/jour</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Assurance tous risques</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Couverture complète incluant les dommages accidentels
                  </p>
                  <p className="text-lg font-bold">+25 €/jour</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Équipements similaires */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Équipements similaires</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentData
              .filter(item => equipment.similiarItems.includes(item.id))
              .map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-subtle">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                      <span>{item.rating}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold">{item.price} €<span className="text-sm font-normal text-muted-foreground">/jour</span></p>
                      <Button asChild size="sm">
                        <Link to={`/equipment/${item.id}`}>Voir</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EquipmentDetails;
