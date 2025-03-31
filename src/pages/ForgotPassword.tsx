
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  email: z.string().email("Email invalide"),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Email envoyé",
        description: "Consultez votre boîte mail pour réinitialiser votre mot de passe.",
      });
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Mot de passe oublié | BTP Location</title>
        <meta 
          name="description" 
          content="Réinitialisez votre mot de passe pour accéder à votre compte BTP Location."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-muted/30">
        <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold text-center mb-6">
            Réinitialisation du mot de passe
          </h2>
          
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-medium">Vérifiez votre email</h3>
              <p className="text-muted-foreground">
                Nous avons envoyé un lien de réinitialisation à votre adresse email.
              </p>
              <div className="pt-4">
                <Link to="/login">
                  <Button variant="link">Retour à la connexion</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6 text-center">
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="email" 
                              placeholder="votre@email.com" 
                              className="pl-10" 
                              {...field}
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full mt-6">
                    Envoyer le lien
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  Retour à la connexion
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
