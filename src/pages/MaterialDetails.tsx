
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChevronLeft, Star, MapPin, Truck, Shield, Box, Info, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

// Données fictives - en pratique, ces données viendraient d'une API
const materialsData = [
  {
    id: "1",
    name: "Sable de construction fin",
    image: "https://images.unsplash.com/photo-1582469566055-5216648cc753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Sable",
    price: 45,
    unit: "tonne",
    minOrder: 1,
    maxOrder: 20,
    stock: 500,
    rating: 4.7,
    supplier: "Matériaux Express",
    supplierLogo: "https://via.placeholder.com/60",
    location: "Lyon",
    description: "Sable fin de construction de haute qualité, parfait pour les travaux de maçonnerie, la préparation du mortier et du béton. Granulométrie 0/4mm, conforme aux normes NF EN 12620 et NF EN 13139.",
    features: ["Granulométrie 0/4mm", "Sable lavé", "Conforme aux normes européennes", "Livraison possible"],
    specifications: {
      granulometry: "0/4mm",
      density: "1.6 t/m³",
      source: "Carrière certifiée",
      color: "Beige",
      packaging: "Vrac",
    },
    isAvailable: true,
    deliveryOptions: [
      { type: "Standard", delay: "3-5 jours", price: 50 },
      { type: "Express", delay: "24h", price: 90 },
      { type: "Sur-mesure", delay: "À convenir", price: "Sur devis" },
    ],
    reviews: [
      { id: "r1", author: "Pierre M.", rating: 5, date: "10/04/2023", comment: "Sable de très bonne qualité, livraison rapide." },
      { id: "r2", author: "Jacques D.", rating: 4, date: "25/03/2023", comment: "Bon produit, conforme à mes attentes." },
    ],
    relatedProducts: ["2", "3", "6"]
  },
  {
    id: "2",
    name: "Ciment Portland 32.5",
    image: "https://images.unsplash.com/photo-1604163546180-039a1781c0d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Ciment",
    price: 95,
    unit: "tonne",
    minOrder: 0.5,
    maxOrder: 10,
    stock: 200,
    rating: 4.9,
    supplier: "Ciments de France",
    location: "Paris",
    description: "Ciment Portland de type CEM II/B-L 32,5 R, idéal pour les travaux courants de maçonnerie, les chapes et les fondations. Conforme à la norme NF EN 197-1.",
    features: ["Prise rapide", "Résistance 32.5 MPa", "Conditionnement en sacs ou vrac", "Excellente maniabilité"],
    specifications: {
      type: "CEM II/B-L 32,5 R",
      resistance: "32.5 MPa",
      setting: "Prise normale",
      packaging: "Sacs 35kg ou vrac",
      color: "Gris",
    },
    isAvailable: true,
    deliveryOptions: [
      { type: "Standard", delay: "2-4 jours", price: 60 },
      { type: "Express", delay: "24h", price: 100 },
    ],
    reviews: [],
    relatedProducts: ["3", "4"]
  },
  {
    id: "3",
    name: "Béton prêt à l'emploi C25/30",
    image: "https://images.unsplash.com/photo-1566027310713-1d34d3c2c654?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Béton",
    price: 110,
    unit: "m³",
    minOrder: 1,
    maxOrder: 15,
    stock: 150,
    rating: 4.8,
    supplier: "Béton Solutions",
    location: "Marseille",
    description: "Béton prêt à l'emploi de classe C25/30, adapté pour les structures soumises à des contraintes modérées. Livré par camion toupie pour garantir une qualité optimale.",
    features: ["Classe d'exposition XC2", "Consistance S3", "Taille des granulats 16mm", "Pompage possible"],
    specifications: {
      class: "C25/30",
      exposure: "XC2",
      consistency: "S3",
      aggregates: "16mm",
      cement: "CEM II",
    },
    isAvailable: true,
    deliveryOptions: [
      { type: "Standard", delay: "Sur rendez-vous", price: 80 },
      { type: "Express", delay: "24h", price: 150 },
    ],
    reviews: [],
    relatedProducts: ["1", "2"]
  },
  // ... autres matériaux
];

const MaterialDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Trouver le matériau correspondant à l'ID
  const material = materialsData.find(item => item.id === id);

  if (!material) {
    return (
      <>
        <Navbar />
        <div className="section-container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Matériau non trouvé</h1>
          <p className="mb-8">Le matériau que vous cherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/materials">Retour aux matériaux</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const incrementQuantity = () => {
    if (quantity < material.maxOrder) {
      setQuantity(prev => prev + (material.minOrder || 1));
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > material.minOrder) {
      setQuantity(prev => prev - (material.minOrder || 1));
    }
  };

  const addToCart = () => {
    toast({
      title: "Ajouté au panier",
      description: `${quantity} ${material.unit} de ${material.name} ajouté au panier`,
    });
  };

  const buyNow = () => {
    toast({
      title: "Achat immédiat",
      description: `Redirection vers le paiement pour ${quantity} ${material.unit} de ${material.name}`,
    });
    // En production: rediriger vers la page de paiement
  };

  return (
    <>
      <Helmet>
        <title>{material.name} | BTP Location</title>
        <meta name="description" content={`Achetez ${material.name}. ${material.description.substring(0, 150)}...`} />
      </Helmet>

      <Navbar />

      <div className="bg-muted/20 py-4">
        <div className="section-container">
          <div className="flex items-center text-sm">
            <Link to="/materials" className="text-muted-foreground hover:text-primary flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour aux matériaux
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
                src={material.image} 
                alt={material.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="aspect-[4/3] rounded-md overflow-hidden">
                <img src={material.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-md overflow-hidden">
                <img src={material.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-md overflow-hidden">
                <img src={material.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-md overflow-hidden">
                <img src={material.image} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Informations sur le matériau */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <Badge className="mb-2">{material.category}</Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-medium">{material.rating.toFixed(1)}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold">{material.name}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <div className="mr-4 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{material.location}</span>
                </div>
                <div className="flex items-center">
                  <Box className="h-4 w-4 mr-1" />
                  <span>Stock: {material.stock} {material.unit}s</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-2xl font-bold">{material.price} €<span className="text-sm font-normal text-muted-foreground">/{material.unit}</span></p>
                  <p className="text-sm text-muted-foreground">Quantité min.: {material.minOrder} {material.unit}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-r-none" 
                      onClick={decrementQuantity}
                      disabled={quantity <= material.minOrder}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-12 text-center">{quantity}</div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-l-none" 
                      onClick={incrementQuantity}
                      disabled={quantity >= material.maxOrder}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-muted-foreground">{material.unit}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" onClick={addToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </Button>
                <Button className="flex-1 button-premium" onClick={buyNow}>
                  Acheter maintenant
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{material.description}</p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  {material.supplierLogo ? (
                    <img src={material.supplierLogo} alt={material.supplier} className="w-full h-full object-cover" />
                  ) : (
                    <Box className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Vendu et expédié par {material.supplier}</h3>
                  <div className="flex items-center text-sm">
                    <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" fill="currentColor" />
                    <span>{material.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg flex items-center">
                <Truck className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">Livraison</h3>
                  <p className="text-sm text-muted-foreground">Délais et tarifs variables</p>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg flex items-center">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">Garantie qualité</h3>
                  <p className="text-sm text-muted-foreground">Matériaux certifiés</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="specifications">
            <TabsList className="w-full border-b rounded-none justify-start">
              <TabsTrigger value="specifications">Spécifications</TabsTrigger>
              <TabsTrigger value="features">Caractéristiques</TabsTrigger>
              <TabsTrigger value="delivery">Livraison</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({material.reviews.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(material.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b pb-3">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="pt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {material.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Info className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="delivery" className="pt-6">
              <div className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Truck className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">Options de livraison</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Type</th>
                          <th className="text-left py-2 font-medium">Délai estimé</th>
                          <th className="text-left py-2 font-medium">Tarif</th>
                        </tr>
                      </thead>
                      <tbody>
                        {material.deliveryOptions.map((option, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3">{option.type}</td>
                            <td className="py-3">{option.delay}</td>
                            <td className="py-3">
                              {typeof option.price === 'number' ? `${option.price} €` : option.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Les délais de livraison sont indicatifs et peuvent varier selon votre zone géographique.
                    Pour une estimation précise, veuillez finaliser votre commande ou nous contacter.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Informations importantes</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Les matériaux en vrac sont livrés par camion benne et déchargés à l'adresse indiquée.</li>
                    <li>• L'accès au site de livraison doit être adapté pour un camion de grande taille.</li>
                    <li>• La présence d'une personne est requise pour réceptionner la livraison.</li>
                    <li>• Pour des quantités importantes, plusieurs livraisons peuvent être nécessaires.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              {material.reviews.length > 0 ? (
                <div className="space-y-6">
                  {material.reviews.map((review) => (
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Aucun avis pour ce matériau</p>
                  <Button variant="outline">Laisser un avis</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Produits associés */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Produits associés</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialsData
              .filter(item => material.relatedProducts.includes(item.id))
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
                      <span>{item.supplier}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold">{item.price} €<span className="text-sm font-normal text-muted-foreground">/{item.unit}</span></p>
                      <Button asChild size="sm">
                        <Link to={`/material/${item.id}`}>Voir</Link>
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

export default MaterialDetails;
