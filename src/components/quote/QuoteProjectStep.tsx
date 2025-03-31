
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectSchema = z.object({
  projectType: z.string().min(1, { message: "Type de projet requis" }),
  projectLocation: z.string().min(1, { message: "Lieu du projet requis" }),
  projectDuration: z.string().min(1, { message: "Durée du projet requise" }),
  projectStartDate: z.string().min(1, { message: "Date de début requise" }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

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
      <h2 className="text-xl font-semibold mb-6">Détails de votre projet</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de projet</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <ClipboardList className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Sélectionnez le type de projet" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="construction">Construction neuve</SelectItem>
                    <SelectItem value="renovation">Rénovation</SelectItem>
                    <SelectItem value="public">Travaux publics</SelectItem>
                    <SelectItem value="industrial">Projet industriel</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
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
                <FormLabel>Lieu du projet</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="Adresse ou ville du projet"
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
                <FormLabel>Durée estimée du projet</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Sélectionnez une durée" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="less-than-1-week">Moins d'une semaine</SelectItem>
                    <SelectItem value="1-2-weeks">1-2 semaines</SelectItem>
                    <SelectItem value="2-4-weeks">2-4 semaines</SelectItem>
                    <SelectItem value="1-3-months">1-3 mois</SelectItem>
                    <SelectItem value="3-6-months">3-6 mois</SelectItem>
                    <SelectItem value="more-than-6-months">Plus de 6 mois</SelectItem>
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
                <FormLabel>Date de début souhaitée</FormLabel>
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
              <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-1/2"
            >
              Continuer <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuoteProjectStep;
