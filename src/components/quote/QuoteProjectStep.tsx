import { useMemo } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ClipboardList, 
  MapPin, 
  Calendar, 
  Clock 
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECT_DURATIONS, PROJECT_TYPES } from "@/data/quoteOptions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createProjectSchema = (t: (key: string) => string) =>
  z.object({
    projectType: z.string().min(1, { message: t("quote.error.projectType") }),
    projectLocation: z.string().min(1, { message: t("quote.error.location") }),
    projectDuration: z.string().min(1, { message: t("quote.error.duration") }),
    projectStartDate: z.string().min(1, { message: t("quote.error.startDate") }),
  });

type ProjectFormValues = z.infer<ReturnType<typeof createProjectSchema>>;

interface QuoteProjectStepProps {
  formData: {
    projectType: string;
    projectLocation: string;
    projectDuration: string;
    projectStartDate: string;
  };
  updateFormData: (data: Partial<ProjectFormValues>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuoteProjectStep = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}: QuoteProjectStepProps) => {
  const { t } = useLanguage();
  const projectSchema = useMemo(() => createProjectSchema(t), [t]);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectType: formData.projectType,
      projectLocation: formData.projectLocation,
      projectDuration: formData.projectDuration,
      projectStartDate: formData.projectStartDate,
    },
  });

  const onSubmit = (values: ProjectFormValues) => {
    updateFormData(values);
    onNext();
  };

  return (
    <div className="bg-white rounded-xl border p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-6">{t("quote.projectTitle")}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.projectType")}</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <ClipboardList className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder={t("quote.projectTypePlaceholder")} />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_TYPES.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {t(option.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="projectLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.location")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder={t("quote.locationPlaceholder")}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="projectDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.duration")}</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder={t("quote.durationPlaceholder")} />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_DURATIONS.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {t(option.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="projectStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.startDate")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type="date"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-1/2"
              onClick={onPrevious}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("quote.previous")}
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-1/2"
            >
              {t("quote.continue")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuoteProjectStep;
