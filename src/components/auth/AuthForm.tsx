
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Eye, EyeOff, Shield, Building, UserCircle } from "lucide-react";
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

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  confirmPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type UserRole = "admin" | "client" | "owner";

interface AuthFormProps {
  type: "login" | "register";
  redirectTo?: string;
}

const AuthForm = ({ type, redirectTo = "/account" }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("client");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const isLogin = type === "login";
  const title = isLogin ? "Connexion" : "Inscription";
  const schema = isLogin ? loginSchema : registerSchema;

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: isLogin 
      ? { email: "", password: "" } 
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  const roles: { value: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
    { value: "client", label: "Client", icon: <UserCircle className="h-5 w-5" />, description: "Louer du matériel" },
    { value: "owner", label: "Loueur", icon: <Building className="h-5 w-5" />, description: "Proposer vos équipements" },
    { value: "admin", label: "Administrateur", icon: <Shield className="h-5 w-5" />, description: "Gérer la plateforme" },
  ];

  const onSubmit = (data: LoginFormData | RegisterFormData) => {
    console.log("Form submitted:", data, "Role:", selectedRole);
    
    const userData = {
      id: `user-${Date.now()}`,
      name: isLogin ? (selectedRole === "admin" ? "Admin" : selectedRole === "owner" ? "Propriétaire" : "Client") : (data as RegisterFormData).name,
      email: data.email,
      role: selectedRole,
      isAuthenticated: true,
    };

    login(userData);
    
    toast({
      title: isLogin ? "Connexion réussie" : "Inscription réussie",
      description: isLogin 
        ? `Bienvenue ${userData.name} sur BTP Location.` 
        : "Votre compte a été créé avec succès.",
    });

    setTimeout(() => {
      navigate(redirectTo);
    }, 500);
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
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Votre nom" 
                        className="pl-10" 
                        {...field}
                      />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="email" 
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="********" 
                      className="pl-10 pr-10" 
                      {...field}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
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
          
          {!isLogin && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="********" 
                        className="pl-10 pr-10" 
                        {...field}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <button 
                        type="button"
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
                Mot de passe oublié ?
              </Link>
            </div>
          )}

          {/* Role Selection for Demo */}
          <div className="space-y-3">
            <FormLabel>Type de compte (Demo)</FormLabel>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
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
                  <span className="text-xs font-medium">{role.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {roles.find(r => r.value === selectedRole)?.description}
            </p>
          </div>
          
          <Button type="submit" className="w-full mt-6">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center text-sm">
        {isLogin ? (
          <p>
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              S'inscrire
            </Link>
          </p>
        ) : (
          <p>
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        )}
      </div>
      
      {!isLogin && (
        <p className="mt-4 text-xs text-center text-muted-foreground">
          En vous inscrivant, vous acceptez nos{" "}
          <Link to="/terms" className="text-primary hover:underline">
            conditions d'utilisation
          </Link>{" "}
          et notre{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            politique de confidentialité
          </Link>
          .
        </p>
      )}
    </div>
  );
};

export default AuthForm;
