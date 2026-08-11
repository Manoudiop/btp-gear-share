
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
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
import Seo from "@/components/Seo";

const createSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("auth.error.email")),
  });

type FormData = z.infer<ReturnType<typeof createSchema>>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const schema = useMemo(() => createSchema(t), [t]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = () => {
    // Sans backend, on confirme sans révéler si l'adresse existe — c'est aussi
    // le comportement attendu d'une vraie implémentation.
    window.setTimeout(() => {
      toast({
        title: t("forgot.sent"),
        description: t("forgot.sentDesc"),
      });
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col">
      <Seo title={t("forgot.title")} description={t("forgot.desc")} />

      <div className="flex items-center justify-center py-16 px-4 bg-muted/30 min-h-[70vh]">
        <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold text-center mb-6">{t("forgot.title")}</h2>

          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-medium">{t("forgot.sent")}</h3>
              <p className="text-muted-foreground">{t("forgot.sentDesc")}</p>
              <div className="pt-4">
                <Button variant="link" asChild>
                  <Link to="/login">{t("forgot.backToLogin")}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6 text-center">{t("forgot.desc")}</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("auth.email")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="email"
                              autoComplete="email"
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
                    {t("forgot.send")}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  {t("forgot.backToLogin")}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
