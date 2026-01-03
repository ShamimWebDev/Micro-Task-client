import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import BuyerHome from "./BuyerHome";
import WorkerHome from "./WorkerHome";
import AdminHome from "./AdminHome";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role || "worker";

  if (role === "admin") {
    return <AdminHome />;
  }

  if (role === "buyer") {
    return <BuyerHome />;
  }

  return <WorkerHome />;
};

export default DashboardHome;
