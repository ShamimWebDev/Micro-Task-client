import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useUserData } from "../hooks/useUserData";
import PageWrapper from "../components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const [dbUser, isUserLoading] = useUserData();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/5 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {isUserLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-[100] bg-slate-950"
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
              <div className="absolute inset-0 flex items-center justify-center font-black text-indigo-400">
                M
              </div>
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse">
              Syncing Protocols
            </p>
          </motion.div>
        ) : (
          <div className="relative z-10 flex min-h-screen">
            {/* Sidebar remains fixed/isolated by its own layout in LG */}
            <Sidebar role={dbUser?.role || "worker"} />

            {/* Content Area */}
            <main className="flex-grow lg:pl-72 p-6 lg:p-10 transition-all duration-500">
              <div className="max-w-7xl mx-auto">
                <PageWrapper key={pathname}>
                  <Outlet context={{ dbUser }} />
                </PageWrapper>
              </div>
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
