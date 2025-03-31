
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientDashboard from "./ClientDashboard";
import OwnerDashboard from "./OwnerDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { user, isAuthenticated, isAdmin, isClient, isOwner } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    
    console.log("User is authenticated", { 
      role: user?.role,
      isAdmin,
      isClient,
      isOwner
    });
  }, [isAuthenticated, user, isAdmin, isClient, isOwner]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (isOwner) {
    return <OwnerDashboard />;
  }

  return <ClientDashboard />;
};

export default Dashboard;
