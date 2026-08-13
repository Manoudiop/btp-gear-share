import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuoteConfirmationProps {
  formData: {
    fullName: string;
    email: string;
  };
  onBackToPricing: () => void;
}

const QuoteConfirmation = ({ formData, onBackToPricing }: QuoteConfirmationProps) => {
  const { t } = useLanguage();

  const steps = ["quote.next1", "quote.next2", "quote.next3"];

  return (
    <div className="text-center bg-white rounded-xl border p-8">
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">{t("quote.doneTitle")}</h2>

      <p className="text-lg mb-2">{t("quote.doneThanks", { name: formData.fullName })}</p>

      <p className="text-muted-foreground mb-6">
        {t("quote.doneDesc", { email: formData.email })}
      </p>

      <div className="bg-primary/5 p-6 rounded-lg mb-8 max-w-md mx-auto">
        <h3 className="font-semibold mb-2">{t("quote.whatNext")}</h3>
        <ol className="text-left space-y-2">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start">
              <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                {index + 1}
              </span>
              <span>{t(step)}</span>
            </li>
          ))}
        </ol>
      </div>

      <Button onClick={onBackToPricing} className="button-premium">
        {t("quote.backToPricing")}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuoteConfirmation;
