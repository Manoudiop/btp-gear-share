
import { createContext, useContext, ReactNode, useCallback, useMemo, useState } from "react";
import type { UserRole } from "@/data/users";

export type { UserRole };

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClient: boolean;
  isOwner: boolean;
}

const STORAGE_KEY = "authUser";
const VALID_ROLES: UserRole[] = ["admin", "client", "owner"];

/**
 * Relit la session depuis localStorage.
 *
 * Lu de façon synchrone à l'initialisation du state : quand cette lecture se
 * faisait dans un useEffect, le premier rendu était toujours « non connecté » et
 * un simple rafraîchissement sur une page privée renvoyait vers /login.
 */
const readStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<AuthUser>;

    // Le contenu du localStorage est modifiable par l'utilisateur : on ne garde
    // qu'une session dont la forme et le rôle sont valides.
    if (
      typeof parsed?.id !== "string" ||
      typeof parsed?.email !== "string" ||
      typeof parsed?.name !== "string" ||
      !VALID_ROLES.includes(parsed?.role as UserRole) ||
      parsed?.isAuthenticated !== true
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed as AuthUser;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false,
  isClient: false,
  isOwner: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  const login = useCallback((userData: AuthUser) => {
    setUser(userData);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<AuthContextType>(() => {
    const isAuthenticated = user?.isAuthenticated === true;

    return {
      user,
      login,
      logout,
      isAuthenticated,
      isAdmin: isAuthenticated && user?.role === "admin",
      isClient: isAuthenticated && user?.role === "client",
      isOwner: isAuthenticated && user?.role === "owner",
    };
  }, [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
