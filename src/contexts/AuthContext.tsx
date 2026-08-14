import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { findDemoAccount, type UserRole } from "@/data/users";

export type { UserRole };

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  role: Extract<UserRole, "client" | "owner">;
}

interface AuthContextType {
  user: AuthUser | null;
  /** Vrai tant que la session n'a pas été résolue au premier chargement. */
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (input: SignUpInput) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClient: boolean;
  isOwner: boolean;
}

const DEMO_STORAGE_KEY = "authUser";
const VALID_ROLES: UserRole[] = ["admin", "client", "owner"];

/**
 * Session de démonstration, utilisée seulement quand aucun projet Supabase
 * n'est configuré : le dépôt reste ainsi exécutable sans compte.
 */
const readDemoUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem(DEMO_STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<AuthUser>;
    if (
      typeof parsed?.id !== "string" ||
      typeof parsed?.email !== "string" ||
      typeof parsed?.name !== "string" ||
      !VALID_ROLES.includes(parsed?.role as UserRole) ||
      parsed?.isAuthenticated !== true
    ) {
      window.localStorage.removeItem(DEMO_STORAGE_KEY);
      return null;
    }
    return parsed as AuthUser;
  } catch {
    window.localStorage.removeItem(DEMO_STORAGE_KEY);
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() =>
    isSupabaseConfigured ? null : readDemoUser(),
  );
  // Sans backend la session est lue de façon synchrone : rien à attendre.
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  /**
   * Recompose l'utilisateur applicatif : Supabase porte l'identité, la table
   * `profiles` porte le nom et le rôle.
   */
  const loadProfile = useCallback(async (session: Session | null) => {
    if (!session?.user || !supabase) {
      setUser(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("name, role")
      .eq("id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Profil illisible :", error.message);
    }

    setUser({
      id: session.user.id,
      email: session.user.email ?? "",
      // Le déclencheur crée le profil à l'inscription ; on reste prudent au cas
      // où il aurait échoué, plutôt que de laisser l'écran vide.
      name: data?.name ?? session.user.email?.split("@")[0] ?? "",
      role: (data?.role as UserRole) ?? "client",
      isAuthenticated: true,
    });
  }, []);

  useEffect(() => {
    if (!supabase) return;

    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      await loadProfile(data.session);
      setIsLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      void loadProfile(session);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      if (!supabase) {
        const account = findDemoAccount(email, password);
        if (!account) return { error: "auth.badCredentials" };

        const demoUser: AuthUser = {
          id: `demo-${account.role}`,
          name: account.name,
          email: account.email,
          role: account.role,
          isAuthenticated: true,
        };
        window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
        return {};
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      return error ? { error: "auth.badCredentials" } : {};
    },
    [],
  );

  const signUp = useCallback(async (input: SignUpInput): Promise<{ error?: string }> => {
    if (!supabase) {
      const demoUser: AuthUser = {
        id: `user-${Date.now()}`,
        name: input.name,
        email: input.email,
        role: input.role,
        isAuthenticated: true,
      };
      window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      return {};
    }

    const { error } = await supabase.auth.signUp({
      email: input.email.trim(),
      password: input.password,
      // Reprises par le déclencheur `handle_new_user`, qui borne le rôle.
      options: { data: { name: input.name, role: input.role } },
    });

    return error ? { error: error.message } : {};
  }, []);

  const logout = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      window.localStorage.removeItem(DEMO_STORAGE_KEY);
    }
    setUser(null);
  }, []);

  const value = useMemo<AuthContextType>(() => {
    const isAuthenticated = user?.isAuthenticated === true;

    return {
      user,
      isLoading,
      signIn,
      signUp,
      logout,
      isAuthenticated,
      isAdmin: isAuthenticated && user?.role === "admin",
      isClient: isAuthenticated && user?.role === "client",
      isOwner: isAuthenticated && user?.role === "owner",
    };
  }, [user, isLoading, signIn, signUp, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
