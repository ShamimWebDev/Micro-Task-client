import { Navigate, useLocation } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";

export const AdminRoute = ({ children }) => {
  const [dbUser, isLoading] = useUserData();
  const location = useLocation();

  if (isLoading) return null;
  if (dbUser?.role === "admin") return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export const BuyerRoute = ({ children }) => {
  const [dbUser, isLoading] = useUserData();
  const location = useLocation();

  if (isLoading) return null;
  if (dbUser?.role === "buyer") return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export const WorkerRoute = ({ children }) => {
  const [dbUser, isLoading] = useUserData();
  const location = useLocation();

  if (isLoading) return null;
  if (dbUser?.role === "worker") return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};
