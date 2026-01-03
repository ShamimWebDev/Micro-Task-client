import { useUserData } from "../hooks/useUserData";
import BuyerHome from "./BuyerHome";
import WorkerHome from "./WorkerHome";
import AdminHome from "./AdminHome";

const DashboardHome = () => {
  const [dbUser, isUserLoading] = useUserData();

  if (isUserLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const role = dbUser?.role || "worker";

  if (role === "admin") {
    return <AdminHome />;
  }

  if (role === "buyer") {
    return <BuyerHome />;
  }

  return <WorkerHome />;
};

export default DashboardHome;
