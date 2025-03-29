
import { useState } from "react";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  company: z.string().optional(),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().min(5, "Adresse invalide"),
  city: z.string().min(2, "Ville invalide"),
  postalCode: z.string().min(5, "Code postal invalide"),
  description: z.string().optional(),
  equipmentTypes: z.string().min(1, "Veuillez préciser les types d'équipements"),
});

type FormValues = z.infer<typeof formSchema>;

const BecomeOwner = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      description: "",
      equipmentTypes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Inscription réussie!",
        description: "Nous vous contacterons bientôt pour finaliser votre inscription.",
      });
      
      // Redirect to home page after successful submission
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      const isStepValid = form.trigger(["firstName", "lastName", "email", "phone"]);
      if (isStepValid) {
        setStep(2);
      }
    }
  };

  const prevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Devenir Loueur</h1>
              <p className="text-muted-foreground">
                Rejoignez notre communauté de propriétaires d'équipements et commencez à générer des revenus avec votre matériel BTP.
              </p>
            </div>
            
            {/* Progress steps */}
            <div className="mb-10">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}>
                    {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                  </div>
                  <div className={`h-1 w-24 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}>
                    {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                  </div>
                  <div className={`h-1 w-24 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}>
                    3
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="text-center px-3">
                  <span className={`text-sm font-medium ${step === 1 ? "text-primary" : ""}`}>Informations personnelles</span>
                </div>
                <div className="text-center px-3">
                  <span className={`text-sm font-medium ${step === 2 ? "text-primary" : ""}`}>Détails de l'équipement</span>
                </div>
                <div className="text-center px-3">
                  <span className={`text-sm font-medium ${step === 3 ? "text-primary" : ""}`}>Confirmation</span>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4 animate-fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom*</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom*</FormLabel>
                            <FormControl>
                              <Input placeholder="Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entreprise (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="BTP Dupont & Fils" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                              <Input placeholder="jean.dupont@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone*</FormLabel>
                            <FormControl>
                              <Input placeholder="06 12 34 56 78" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="button-premium"
                      >
                        Continuer
                      </Button>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-4 animate-fade-up">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse*</FormLabel>
                          <FormControl>
                            <Input placeholder="123 rue de la Construction" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville*</FormLabel>
                            <FormControl>
                              <Input placeholder="Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal*</FormLabel>
                            <FormControl>
                              <Input placeholder="75001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="equipmentTypes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Types d'équipements*</FormLabel>
                          <FormControl>
                            <Input placeholder="Pelleteuses, Camions, Échafaudages..." {...field} />
                          </FormControl>
                          <FormDescription>
                            Listez les types d'équipements que vous souhaitez proposer à la location
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Informations complémentaires (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Partagez plus d'informations sur vos équipements, leur état, disponibilité, etc." 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep}
                      >
                        Retour
                      </Button>
                      <Button 
                        type="submit"
                        className="button-premium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Traitement en cours..." : "Soumettre ma demande"}
                      </Button>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="text-center py-12 animate-fade-up">
                    <div className="bg-green-100 p-3 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Demande envoyée avec succès!</h2>
                    <p className="text-muted-foreground mb-8">
                      Merci pour votre intérêt! Notre équipe va examiner votre demande et vous contactera sous 48h pour finaliser votre inscription et configurer votre compte loueur.
                    </p>
                    <Button onClick={() => navigate("/")} size="lg">
                      Retourner à l'accueil
                    </Button>
                  </div>
                )}
              </form>
            </Form>
            
            <div className="mt-12 bg-secondary/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Pourquoi devenir loueur sur BTP Location?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Générez des revenus avec votre matériel inutilisé</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Profitez d'une visibilité auprès de milliers de professionnels</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Bénéficiez d'une assurance complète pour vos équipements</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Gérez facilement vos locations via notre plateforme intuitive</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BecomeOwner;
