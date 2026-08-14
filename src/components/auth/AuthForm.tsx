
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Eye, EyeOff, Building, UserCircle, Loader2 } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { demoAccounts, type UserRole } from "@/data/users";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

// Les schémas dépendent de la langue : les messages viennent de `t`.
const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("auth.error.email")),
    password: z.string().min(8, t("auth.error.password")),
  });

const createRegisterSchema = (t: (key: string) => string) =>
  createLoginSchema(t)
    .extend({
      name: z.string().min(2, t("auth.error.name")),
      confirmPassword: z.string().min(8, t("auth.error.password")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.error.mismatch"),
      path: ["confirmPassword"],
    });

type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;

interface AuthFormProps {
  type: "login" | "register";
  redirectTo?: string;
}

/** Rôles qu'un visiteur peut choisir à l'inscription — jamais « admin ». */
const signupRoles: {
  value: Extract<UserRole, "client" | "owner">;
  labelKey: string;
  icon: React.ReactNode;
  descriptionKey: string;
}[] = [
  {
    value: "client",
    labelKey: "auth.role.client",
    icon: <UserCircle className="h-5 w-5" />,
    descriptionKey: "auth.role.clientDesc",
  },
  {
    value: "owner",
    labelKey: "auth.role.owner",
    icon: <Building className="h-5 w-5" />,
    descriptionKey: "auth.role.ownerDesc",
  },
];

const AuthForm = ({ type, redirectTo = "/account" }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"client" | "owner">("client");
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();

  const isLogin = type === "login";
  const title = isLogin ? t("auth.login") : t("auth.register");
  const schema = useMemo(
    () => (isLogin ? createLoginSchema(t) : createRegisterSchema(t)),
    [isLogin, t],
  );

  // PrivateRoute mémorise la page demandée avant la redirection vers /login.
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
  const destination = from ?? redirectTo;

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  const fillDemoAccount = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(data.email, data.password);

        if (error) {
          // Les clés du dictionnaire sont traduites ici ; un message renvoyé
          // tel quel par le serveur est affiché sans traduction.
          form.setError("password", { message: error.startsWith("auth.") ? t(error) : error });
          return;
        }

        toast({ title: t("auth.loginSuccess") });
        navigate(destination, { replace: true });
        return;
      }

      const registerData = data as RegisterFormData;
      const { error } = await signUp({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        role: selectedRole,
      });

      if (error) {
        form.setError("email", { message: error });
        return;
      }

      toast({
        title: t("auth.registerSuccess"),
        description: t("auth.registerSuccessDesc"),
      });
      navigate(destination, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-card rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.name")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder={t("auth.namePlaceholder")} className="pl-10" {...field} />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.password")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      placeholder="********"
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <button
                      type="button"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isLogin && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.confirmPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="********"
                        className="pl-10 pr-10"
                        {...field}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <button
                        type="button"
                        aria-label={
                          showConfirmPassword
                            ? "Masquer le mot de passe"
                            : "Afficher le mot de passe"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {isLogin && (
            <div className="text-sm text-right">
              <Link to="/forgot-password" className="text-primary hover:underline">
                {t("auth.forgot")}
              </Link>
            </div>
          )}

          {!isLogin && (
            <div className="space-y-3">
              <FormLabel>{t("auth.iWant")}</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {signupRoles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                      selectedRole === role.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {role.icon}
                    <span className="text-xs font-medium">{t(role.labelKey)}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {t(signupRoles.find((r) => r.value === selectedRole)?.descriptionKey ?? "")}
              </p>
            </div>
          )}

          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? t("auth.signIn") : t("auth.signUp")}
          </Button>
        </form>
      </Form>

      {isLogin && (
        <div className="mt-6 rounded-lg border border-dashed p-4">
          <p className="text-sm font-medium mb-1">{t("auth.demoTitle")}</p>
          <p className="text-xs text-muted-foreground mb-3">
            {t(isSupabaseConfigured ? "auth.demoDescLive" : "auth.demoDesc")}
          </p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemoAccount(account.email, account.password)}
                className="w-full text-left text-xs rounded-md border px-3 py-2 hover:border-primary/50 hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">{account.email}</span>
                <span className="text-muted-foreground"> · {t(account.descriptionKey)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm">
        {isLogin ? (
          <p>
            {t("auth.noAccount")}{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              {t("auth.signUp")}
            </Link>
          </p>
        ) : (
          <p>
            {t("auth.hasAccount")}{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              {t("auth.signIn")}
            </Link>
          </p>
        )}
      </div>

      {!isLogin && (
        <p className="mt-4 text-xs text-center text-muted-foreground">
          {t("auth.terms")}{" "}
          <Link to="/terms" className="text-primary hover:underline">
            {t("auth.termsLink")}
          </Link>{" "}
          {t("auth.and")}{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            {t("auth.privacyLink")}
          </Link>
          .
        </p>
      )}
    </div>
  );
};

export default AuthForm;
