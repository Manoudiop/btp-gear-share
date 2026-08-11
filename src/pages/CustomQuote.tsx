
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight, 
  Building, 
  User, 
  Mail, 
  Phone, 
  ClipboardList, 
  Truck, 
  Calendar, 
  Clock,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuotePersonalStep from "@/components/quote/QuotePersonalStep";
import QuoteProjectStep from "@/components/quote/QuoteProjectStep";
import QuoteEquipmentStep from "@/components/quote/QuoteEquipmentStep";
import QuoteConfirmation from "@/components/quote/QuoteConfirmation";
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

type QuoteFormData = {
  // Personal information
  fullName: string;
  email: string;
  phone: string;
  company: string;
  // Project details
  projectType: string;
  projectLocation: string;
  projectDuration: string;
  projectStartDate: string;
  // Equipment needs
  equipmentTypes: string[];
  equipmentDuration: string;
  equipmentQuantity: number;
  additionalRequirements: string;
};

const CustomQuote = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    projectLocation: "",
    projectDuration: "",
    projectStartDate: "",
    equipmentTypes: [],
    equipmentDuration: "",
    equipmentQuantity: 1,
    additionalRequirements: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;
  
  const updateFormData = (data: Partial<QuoteFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setCurrentStep(totalSteps + 1);
  };

  return (
    <div className="pt-24 pb-16">
      <Seo title={t("quote.title")} description={t("quote.subtitle")} />
      <div className="section-container max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {t("common.back")}
        </Button>

        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">{t("quote.title")}</h1>
          <p className="text-muted-foreground">{t("quote.subtitle")}</p>
        </div>

        {!isSubmitted && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                {t("quote.stepOf", { current: currentStep, total: totalSteps })}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {currentStep === 1 && (
          <QuotePersonalStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
          />
        )}

        {currentStep === 2 && (
          <QuoteProjectStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
          />
        )}

        {currentStep === 3 && (
          <QuoteEquipmentStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onSubmit={handleSubmit} 
            onPrevious={handlePrevious}
            isSubmitting={isSubmitting} 
          />
        )}

        {currentStep === 4 && (
          <QuoteConfirmation 
            formData={formData} 
            onBackToPricing={() => navigate("/pricing")} 
          />
        )}
      </div>
    </div>
  );
};

export default CustomQuote;
