
import { 
  ArrowLeft, 
  Truck, 
  Clock, 
  Check,
  Loader2
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const equipmentSchema = z.object({
  equipmentTypes: z.array(z.string()).min(1, { message: "Sélectionnez au moins un type d'équipement" }),
  equipmentDuration: z.string().min(1, { message: "Durée de location requise" }),
  equipmentQuantity: z.coerce.number().min(1, { message: "La quantité doit être d'au moins 1" }),
  additionalRequirements: z.string().optional(),
});

type EquipmentFormValues = z.infer<typeof equipmentSchema>;

const equipmentOptions = [
  { id: "excavator", label: "Pelleteuses" },
  { id: "truck", label: "Camions" },
  { id: "scaffold", label: "Échafaudages" },
  { id: "breaker", label: "Marteaux piqueurs" },
  { id: "mixer", label: "Bétonnières" },
  { id: "tools", label: "Outillage" },
  { id: "crane", label: "Grues" },
  { id: "compressor", label: "Compresseurs" },
];

interface QuoteEquipmentStepProps {
  formData: {
    equipmentTypes: string[];
    equipmentDuration: string;
    equipmentQuantity: number;
    additionalRequirements: string;
  };
  updateFormData: (data: Partial<EquipmentFormValues>) => void;
  onSubmit: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

const QuoteEquipmentStep = ({
  formData,
  updateFormData,
  onSubmit,
  onPrevious,
  isSubmitting,
}: QuoteEquipmentStepProps) => {
  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      equipmentTypes: formData.equipmentTypes,
      equipmentDuration: formData.equipmentDuration,
      equipmentQuantity: formData.equipmentQuantity,
      additionalRequirements: formData.additionalRequirements,
    },
  });

  const handleSubmit = (values: EquipmentFormValues) => {
    updateFormData(values);
    onSubmit();
  };

  return (
    <div className="bg-white rounded-xl border p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-6">Besoins en équipement</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="equipmentTypes"
            render={() => (
              <FormItem>
                <FormLabel>Types d'équipements nécessaires</FormLabel>
                <FormDescription>
                  Sélectionnez tous les types d'équipements dont vous avez besoin
                </FormDescription>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {equipmentOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="equipmentTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, option.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="equipmentDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée de location prévue</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Sélectionnez une durée" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Journalière</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="biweekly">Bi-hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                      <SelectItem value="quarterly">Trimestrielle</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="equipmentQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité approximative</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="number"
                        min={1}
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="additionalRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exigences supplémentaires (facultatif)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez toute exigence spécifique ou information complémentaire concernant votre besoin en équipement"
                    className="min-h-[120px]"
                    {...field}
                  />
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
              disabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-1/2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Soumettre la demande
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuoteEquipmentStep;
