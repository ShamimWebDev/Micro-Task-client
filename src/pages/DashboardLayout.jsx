import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  // In a real app, role would come from DB.
  // Mocking for now: if user is logged in, use their role, else 'worker'
  const role = user?.role || "worker";

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar role={role} />
      <main className="grow p-4 lg:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
