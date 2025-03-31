
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuoteConfirmationProps {
  formData: {
    fullName: string;
    email: string;
  };
  onBackToPricing: () => void;
}

const QuoteConfirmation = ({ formData, onBackToPricing }: QuoteConfirmationProps) => {
  return (
    <div className="text-center bg-white rounded-xl border p-8">
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Demande envoyée avec succès !</h2>
      
      <p className="text-lg mb-2">
        Merci {formData.fullName} pour votre demande de devis personnalisé.
      </p>
      
      <p className="text-muted-foreground mb-6">
        Nous avons bien reçu votre demande et un de nos experts vous contactera à l'adresse {formData.email} sous 24 à 48 heures ouvrées pour discuter de vos besoins spécifiques et vous proposer une solution adaptée.
      </p>
      
      <div className="bg-primary/5 p-6 rounded-lg mb-8 max-w-md mx-auto">
        <h3 className="font-semibold mb-2">Que va-t-il se passer maintenant ?</h3>
        <ol className="text-left space-y-2">
          <li className="flex items-start">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Notre équipe analysera vos besoins en détail</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Un expert vous contactera pour discuter des détails</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Vous recevrez un devis personnalisé par email</span>
          </li>
        </ol>
      </div>
      
      <Button onClick={onBackToPricing} className="button-premium">
        Retour à la page des tarifs
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuoteConfirmation;
