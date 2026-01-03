import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  // In a real app, you'd fetch this from the DB or a custom claim
  // For now, we use the role stored in user object (which we sync on login)
  return [user?.role, loading];
};

export const AdminRoute = ({ children }) => {
  const [role, loading] = useRole();
  const location = useLocation();

  if (loading) return null;
  if (role === "admin") return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export const BuyerRoute = ({ children }) => {
  const [role, loading] = useRole();
  const location = useLocation();

  if (loading) return null;
  if (role === "buyer") return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export const WorkerRoute = ({ children }) => {
  const [role, loading] = useRole();
  const location = useLocation();

  if (loading) return null;
  if (role === "worker") return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};
