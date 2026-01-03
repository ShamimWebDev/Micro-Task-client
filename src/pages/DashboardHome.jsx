import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import BuyerHome from "./BuyerHome";
import WorkerHome from "./WorkerHome";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role || "worker";

  if (role === "buyer") {
    return <BuyerHome />;
  }

  return <WorkerHome />;
};

export default DashboardHome;
