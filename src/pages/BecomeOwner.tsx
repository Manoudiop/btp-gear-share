
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSendOwnerApplication } from "@/data/requests";
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
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

// Le schéma dépend de la langue : les messages viennent de `t`.
const createFormSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(2, t("owner.error.firstName")),
    lastName: z.string().min(2, t("owner.error.lastName")),
    company: z.string().optional(),
    email: z.string().email(t("auth.error.email")),
    phone: z.string().min(10, t("owner.error.phone")),
    address: z.string().min(5, t("owner.error.address")),
    city: z.string().min(2, t("owner.error.city")),
    postalCode: z.string().min(5, t("owner.error.postalCode")),
    description: z.string().optional(),
    equipmentTypes: z.string().min(1, t("owner.error.equipmentTypes")),
  });

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

const BecomeOwner = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sendApplication = useSendOwnerApplication();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const formSchema = useMemo(() => createFormSchema(t), [t]);

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
      await sendApplication.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        equipmentTypes: data.equipmentTypes,
        description: data.description,
      });

      toast({
        title: t("owner.toastTitle"),
        description: t("owner.toastDesc"),
      });

      // L'écran de confirmation remplace la redirection automatique : l'utilisateur
      // a le temps de lire la suite du processus avant de quitter la page.
      setStep(3);
    } catch {
      // La candidature reste saisie : elle peut être renvoyée telle quelle.
      toast({ title: t("owner.failed"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    if (step !== 1) return;

    // `trigger` renvoie une promesse : sans await, l'étape 2 s'ouvrait même
    // quand les champs de l'étape 1 étaient invalides.
    const isStepValid = await form.trigger(["firstName", "lastName", "email", "phone"]);
    if (isStepValid) {
      setStep(2);
    }
  };

  const prevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="flex flex-col">
      <Seo title={t("owner.title")} description={t("owner.subtitle")} />

      <div className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">{t("owner.title")}</h1>
              <p className="text-muted-foreground">{t("owner.subtitle")}</p>
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
                  <span className={`text-sm font-medium ${step === 1 ? "text-primary" : ""}`}>
                    {t("owner.step1")}
                  </span>
                </div>
                <div className="text-center px-3">
                  <span className={`text-sm font-medium ${step === 2 ? "text-primary" : ""}`}>
                    {t("owner.step2")}
                  </span>
                </div>
                <div className="text-center px-3">
                  <span className={`text-sm font-medium ${step === 3 ? "text-primary" : ""}`}>
                    {t("owner.step3")}
                  </span>
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
                            <FormLabel>{t("owner.firstName")}*</FormLabel>
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
                            <FormLabel>{t("owner.lastName")}*</FormLabel>
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
                          <FormLabel>{t("owner.company")}</FormLabel>
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
                            <FormLabel>{t("auth.email")}*</FormLabel>
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
                            <FormLabel>{t("contact.phone")}*</FormLabel>
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
                        {t("owner.continue")}
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
                          <FormLabel>{t("owner.address")}*</FormLabel>
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
                            <FormLabel>{t("checkout.city")}*</FormLabel>
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
                            <FormLabel>{t("checkout.postalCode")}*</FormLabel>
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
                          <FormLabel>{t("owner.equipmentTypes")}*</FormLabel>
                          <FormControl>
                            <Input placeholder={t("owner.equipmentTypesPlaceholder")} {...field} />
                          </FormControl>
                          <FormDescription>{t("owner.equipmentTypesHelp")}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("owner.moreInfo")}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("owner.moreInfoPlaceholder")}
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
                        {t("common.back")}
                      </Button>
                      <Button
                        type="submit"
                        className="button-premium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t("owner.submitting") : t("owner.submit")}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center py-12 animate-fade-up">
                    <div className="bg-green-100 p-3 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{t("owner.successTitle")}</h2>
                    <p className="text-muted-foreground mb-8">{t("owner.successDesc")}</p>
                    <Button onClick={() => navigate("/")} size="lg">
                      {t("owner.backHome")}
                    </Button>
                  </div>
                )}
              </form>
            </Form>

            <div className="mt-12 bg-secondary/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">{t("owner.whyTitle")}</h3>
              <ul className="space-y-2">
                {["owner.why1", "owner.why2", "owner.why3", "owner.why4"].map((reason) => (
                  <li key={reason} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{t(reason)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BecomeOwner;
