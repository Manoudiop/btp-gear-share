
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type UserRole = "admin" | "client" | "owner";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClient: boolean;
  isOwner: boolean;
}

const defaultUser: User | null = null;

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false,
  isClient: false,
  isOwner: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  
  useEffect(() => {
    // Check for existing user in localStorage on initial load
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const isAuthenticated = user?.isAuthenticated || false;
  const isAdmin = isAuthenticated && user?.role === "admin";
  const isClient = isAuthenticated && user?.role === "client";
  const isOwner = isAuthenticated && user?.role === "owner";

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isClient,
    isOwner,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
