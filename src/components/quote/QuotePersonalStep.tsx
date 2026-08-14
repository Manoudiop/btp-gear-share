
import { useMemo } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Building,
  ArrowRight
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
import { phoneField } from "@/lib/phone";

const createPersonalSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z.string().min(2, { message: t("quote.error.fullName") }),
    email: z.string().email({ message: t("auth.error.email") }),
    phone: phoneField(t("quote.error.phone")),
    company: z.string().optional(),
  });

type PersonalFormValues = z.infer<ReturnType<typeof createPersonalSchema>>;

interface QuotePersonalStepProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
  };
  updateFormData: (data: Partial<PersonalFormValues>) => void;
  onNext: () => void;
}

const QuotePersonalStep = ({
  formData,
  updateFormData,
  onNext,
}: QuotePersonalStepProps) => {
  const { t } = useLanguage();
  const personalSchema = useMemo(() => createPersonalSchema(t), [t]);

  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
    },
  });

  const onSubmit = (values: PersonalFormValues) => {
    updateFormData(values);
    onNext();
  };

  return (
    <div className="bg-white rounded-xl border p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-6">{t("quote.personalTitle")}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.fullName")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder={t("quote.fullNamePlaceholder")}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.email")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="votreemail@exemple.com"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contact.phone")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder={t("quote.phonePlaceholder")}
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
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quote.company")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder={t("quote.companyPlaceholder")}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full mt-6">
            {t("quote.continue")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuotePersonalStep;
