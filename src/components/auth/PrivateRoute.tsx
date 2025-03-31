
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  allowedRoles?: Array<"admin" | "client" | "owner">;
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has the right role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to account page if wrong role
    return <Navigate to="/account" replace />;
  }

  // User is authenticated and has the right role, render the outlet
  return <Outlet />;
};

export default PrivateRoute;
