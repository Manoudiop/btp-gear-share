
import { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
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
import { toast } from "@/hooks/use-toast";
import { useEquipmentDetail, useSimilarEquipment } from "@/data/queries";
import { useCreateBooking } from "@/data/bookings";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { categoryLabel } from "@/data/categoryIcons";
import Seo from "@/components/Seo";

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const createBooking = useCreateBooking();
  const { t, formatPrice, locale } = useLanguage();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const { data: equipment, isLoading } = useEquipmentDetail(id);
  const { data: similar = [] } = useSimilarEquipment(equipment);

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

  if (!equipment) {
    return (
      <>
        <div className="section-container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("equipment.notFound")}</h1>
          <p className="mb-8">{t("equipment.notFoundDesc")}</p>
          <Button asChild>
            <Link to="/equipment">{t("equipment.backToList")}</Link>
          </Button>
        </div>
      </>
    );
  }

  const handleDateSelection = (date: string) => {
    // Forme fonctionnelle : lire `selectedDates` par fermeture perdait les
    // sélections rapprochées, plusieurs clics partageant le même état.
    setSelectedDates((previous) =>
      previous.includes(date)
        ? previous.filter((day) => day !== date)
        : [...previous, date],
    );
  };

  const handleRent = async () => {
    if (selectedDates.length === 0) {
      toast({
        title: "Erreur",
        description: t("equipment.selectDateError"),
        variant: "destructive",
      });
      return;
    }

    // Réserver engage l'utilisateur : la connexion est exigée, et la page
    // demandée est mémorisée pour y revenir après.
    if (!isAuthenticated) {
      toast({ description: t("equipment.loginToBook") });
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      const booking = await createBooking.mutateAsync({
        equipmentId: equipment.id,
        dates: selectedDates,
        pricePerDay: equipment.price,
        deposit: equipment.deposit,
      });

      toast({
        title: t("equipment.bookingSent"),
        description: t("equipment.bookingSentDesc", {
          reference: booking.reference,
          count: booking.days,
        }),
      });
      setSelectedDates([]);
      setIsBookingDialogOpen(false);
    } catch {
      toast({
        title: t("equipment.bookingError"),
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Seo
        title={equipment.name}
        description={`${equipment.name} — ${equipment.location}. ${equipment.description.slice(0, 140)}…`}
      />


      <div className="bg-muted/20 py-4">
        <div className="section-container">
          <div className="flex items-center text-sm">
            <Link to="/equipment" className="text-muted-foreground hover:text-primary flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t("equipment.backToList")}
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
                <Badge className="mb-2">{categoryLabel(t, equipment.category)}</Badge>
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
                  <p className="text-2xl font-bold">
                    {formatPrice(equipment.price)}
                    <span className="text-sm font-normal text-muted-foreground">
                      {t("common.perDay")}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("equipment.deposit")}: {formatPrice(equipment.deposit)}
                  </p>
                </div>
                <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="button-premium" disabled={!equipment.isAvailable}>
                      {equipment.isAvailable ? t("equipment.bookNow") : t("common.unavailable")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{t("equipment.bookTitle", { name: equipment.name })}</DialogTitle>
                      <DialogDescription>{t("equipment.bookDesc")}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="font-semibold mb-2">{t("equipment.availableDates")}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {equipment.availabilityDates.length === 0 ? (
                          <p className="text-sm text-muted-foreground">{t("equipment.noDates")}</p>
                        ) : (
                          equipment.availabilityDates.map((date) => (
                            <button
                              key={date}
                              className={`px-3 py-1.5 rounded-full text-sm ${
                                selectedDates.includes(date)
                                  ? "bg-primary text-white"
                                  : "bg-muted hover:bg-muted/70"
                              }`}
                              onClick={() => handleDateSelection(date)}
                            >
                              {new Date(date).toLocaleDateString(locale, {
                                day: "2-digit",
                                month: "short",
                              })}
                            </button>
                          ))
                        )}
                      </div>
                      <div className="space-y-3 mt-6">
                        <div className="flex justify-between">
                          <span>{t("equipment.pricePerDay")}</span>
                          <span>{formatPrice(equipment.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("equipment.numberOfDays")}</span>
                          <span>{selectedDates.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("equipment.depositRefundable")}</span>
                          <span>{formatPrice(equipment.deposit)}</span>
                        </div>
                        <div className="border-t pt-3 font-bold flex justify-between">
                          <span>{t("common.total")}</span>
                          <span>{formatPrice(selectedDates.length * equipment.price)}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-6"
                        size="lg"
                        onClick={handleRent}
                        disabled={createBooking.isPending}
                      >
                        {createBooking.isPending
                          ? t("equipment.bookingPending")
                          : t("equipment.confirmBooking")}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t("equipment.about")}</h2>
              <p className="text-muted-foreground">{equipment.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg flex items-center">
                <Truck className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">{t("common.delivery")}</h3>
                  <p className="text-sm text-muted-foreground">{t("equipment.deliveryOnRequest")}</p>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg flex items-center">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">{t("equipment.insuranceIncluded")}</h3>
                  <p className="text-sm text-muted-foreground">{t("equipment.basicProtection")}</p>
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
                      <span>{t("equipment.respondsIn", { time: equipment.ownerResponseTime })}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t("equipment.contactOwner")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="specifications">
            <TabsList className="w-full border-b rounded-none justify-start">
              <TabsTrigger value="specifications">{t("equipment.specifications")}</TabsTrigger>
              <TabsTrigger value="features">{t("equipment.features")}</TabsTrigger>
              <TabsTrigger value="reviews">
                {t("equipment.reviews")} ({equipment.reviews.length})
              </TabsTrigger>
              <TabsTrigger value="questions">
                {t("equipment.questions")} ({equipment.questionsAnswers.length})
              </TabsTrigger>
              <TabsTrigger value="insurance">{t("equipment.insurance")}</TabsTrigger>
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
                        <p className="text-sm text-muted-foreground">
                          {t("equipment.customerReviews", { count: equipment.reviews.length })}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = equipment.reviews.filter(r => r.rating === rating).length;
                          const percentage = (count / equipment.reviews.length) * 100;
                          return (
                            <div key={rating} className="flex items-center">
                              <div className="w-12 text-right mr-4">
                                {t("equipment.stars", { count: rating })}
                              </div>
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
                  <p className="text-muted-foreground mb-4">{t("equipment.noReviews")}</p>
                  <Button variant="outline">{t("equipment.leaveReview")}</Button>
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
                          <p className="text-sm text-muted-foreground mb-1">{t("equipment.ownerAnswer")}</p>
                          <p>{qa.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">{t("equipment.noQuestions")}</p>
                  <Button variant="outline">{t("equipment.askQuestion")}</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="insurance" className="pt-6">
              <div className="bg-muted/30 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">{t("equipment.insuranceIncluded")}</h3>
                <ul className="space-y-3">
                  {equipment.insurance.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">{t("equipment.insuranceNote")}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{t("equipment.reducedExcess")}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("equipment.reducedExcessDesc")}
                  </p>
                  <p className="text-lg font-bold">
                    +{formatPrice(15)}
                    {t("common.perDay")}
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{t("equipment.fullCoverage")}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("equipment.fullCoverageDesc")}
                  </p>
                  <p className="text-lg font-bold">
                    +{formatPrice(25)}
                    {t("common.perDay")}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Équipements similaires */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t("equipment.similar")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar
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
                      <p className="text-lg font-bold">
                        {formatPrice(item.price)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {t("common.perDay")}
                        </span>
                      </p>
                      <Button asChild size="sm">
                        <Link to={`/equipment/${item.id}`}>{t("common.view")}</Link>
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

export default EquipmentDetails;
