import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/data/users";

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // La session est restaurée de façon asynchrone : rediriger avant qu'elle soit
  // résolue renverrait vers /login à chaque rafraîchissement d'une page privée.
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          role="status"
          aria-label="Chargement"
          className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
