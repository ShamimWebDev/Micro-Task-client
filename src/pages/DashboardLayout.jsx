import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import PageWrapper from "../components/PageWrapper";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const role = user?.role || "worker";

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar role={role} />
      <main className="grow p-4 lg:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <PageWrapper key={pathname}>
            <Outlet />
          </PageWrapper>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
