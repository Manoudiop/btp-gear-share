
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Truck, Shield, Box, Info, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useMaterialDetail, useRelatedMaterials } from "@/data/queries";
import { useLanguage } from "@/contexts/LanguageContext";
import { categoryLabel } from "@/data/categoryIcons";
import Seo from "@/components/Seo";

const MaterialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, formatPrice } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const { data: material, isLoading } = useMaterialDetail(id);
  const { data: related = [] } = useRelatedMaterials(material);

  if (isLoading) {
    return (
      <div className="section-container flex min-h-[60vh] items-center justify-center">
        <div
          role="status"
          aria-label={t("common.loading")}
          className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary"
        />
      </div>
    );
  }

  if (!material) {
    return (
      <>
        <div className="section-container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("materials.notFound")}</h1>
          <p className="mb-8">{t("materials.notFoundDesc")}</p>
          <Button asChild>
            <Link to="/materials">{t("materials.backToList")}</Link>
          </Button>
        </div>
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
    addItem({
      id: material.id,
      name: material.name,
      image: material.image,
      price: material.price,
      unit: material.unit,
      supplier: material.supplier,
    }, quantity);
    
    toast({
      title: t("materials.addedToCart"),
      description: t("materials.addedToCartDesc", {
        quantity,
        unit: material.unit,
        name: material.name,
      }),
    });
  };

  const buyNow = () => {
    addToCart();
    // Navigation client : un window.location.href rechargeait toute l'application.
    navigate("/cart");
  };

  return (
    <>
      <Seo
        title={material.name}
        description={`${material.name} — ${material.supplier}. ${material.description.slice(0, 140)}…`}
      />


      <div className="bg-muted/20 py-4">
        <div className="section-container">
          <div className="flex items-center text-sm">
            <Link to="/materials" className="text-muted-foreground hover:text-primary flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t("materials.backToList")}
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
                <Badge className="mb-2">{categoryLabel(t, material.category)}</Badge>
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
                  <span>
                    {t("materials.stock")}: {material.stock} {material.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-2xl font-bold">
                    {formatPrice(material.price)}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{material.unit}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("materials.minQuantity")}: {material.minOrder} {material.unit}
                  </p>
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
                <Button className="flex-1" onClick={addToCart} disabled={!material.isAvailable}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t("materials.addToCart")}
                </Button>
                <Button
                  className="flex-1 button-premium"
                  onClick={buyNow}
                  disabled={!material.isAvailable}
                >
                  {t("materials.buyNow")}
                </Button>
              </div>
              {!material.isAvailable && (
                <p className="mt-3 text-sm text-muted-foreground">{t("materials.outOfStock")}</p>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t("materials.description")}</h2>
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
                  <h3 className="font-medium">
                    {t("materials.soldBy", { supplier: material.supplier })}
                  </h3>
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
                  <h3 className="font-medium">{t("common.delivery")}</h3>
                  <p className="text-sm text-muted-foreground">{t("materials.deliveryVariable")}</p>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg flex items-center">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">{t("materials.qualityGuarantee")}</h3>
                  <p className="text-sm text-muted-foreground">{t("materials.certified")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="specifications">
            <TabsList className="w-full border-b rounded-none justify-start">
              <TabsTrigger value="specifications">{t("equipment.specifications")}</TabsTrigger>
              <TabsTrigger value="features">{t("equipment.features")}</TabsTrigger>
              <TabsTrigger value="delivery">{t("common.delivery")}</TabsTrigger>
              <TabsTrigger value="reviews">
                {t("equipment.reviews")} ({material.reviews.length})
              </TabsTrigger>
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
                    <h3 className="font-medium">{t("materials.deliveryOptions")}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">{t("materials.deliveryType")}</th>
                          <th className="text-left py-2 font-medium">{t("materials.deliveryDelay")}</th>
                          <th className="text-left py-2 font-medium">{t("materials.deliveryPrice")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {material.deliveryOptions.map((option, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3">{option.type}</td>
                            <td className="py-3">{option.delay}</td>
                            <td className="py-3">
                              {typeof option.price === "number"
                                ? formatPrice(option.price)
                                : option.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{t("materials.deliveryNote")}</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{t("materials.importantInfo")}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("materials.info1")}</li>
                    <li>• {t("materials.info2")}</li>
                    <li>• {t("materials.info3")}</li>
                    <li>• {t("materials.info4")}</li>
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
                  <p className="text-muted-foreground mb-4">{t("materials.noReviews")}</p>
                  <Button variant="outline">{t("equipment.leaveReview")}</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Produits associés */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t("materials.related")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related
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
                      <p className="text-lg font-bold">
                        {formatPrice(item.price)}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{item.unit}
                        </span>
                      </p>
                      <Button asChild size="sm">
                        <Link to={`/material/${item.id}`}>{t("common.view")}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default MaterialDetails;
