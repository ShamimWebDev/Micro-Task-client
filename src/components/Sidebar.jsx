import { NavLink, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  PlusSquare,
  LayoutList,
  CheckCircle2,
  Coins,
  History,
  Users,
  Settings,
  ChevronRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { cn } from "../utils/cn";

const Sidebar = ({ role }) => {
  const { user, logOut } = useContext(AuthContext);
  const { pathname } = useLocation();

  const buyerLinks = [
    { name: "Home", path: "/dashboard/buyer-home", icon: <Home size={18} /> },
    {
      name: "Add new Tasks",
      path: "/dashboard/add-task",
      icon: <PlusSquare size={18} />,
    },
    {
      name: "My Task’s",
      path: "/dashboard/my-tasks",
      icon: <LayoutList size={18} />,
    },
    {
      name: "Purchase Coin",
      path: "/dashboard/purchase-coin",
      icon: <Coins size={18} />,
    },
    {
      name: "Payment history",
      path: "/dashboard/payment-history",
      icon: <History size={18} />,
    },
  ];

  const workerLinks = [
    { name: "Home", path: "/dashboard/worker-home", icon: <Home size={18} /> },
    {
      name: "TaskList",
      path: "/dashboard/task-list",
      icon: <LayoutList size={18} />,
    },
    {
      name: "My Submission",
      path: "/dashboard/my-submissions",
      icon: <CheckCircle2 size={18} />,
    },
    {
      name: "Withdrawals",
      path: "/dashboard/withdrawals",
      icon: <Coins size={18} />,
    },
  ];

  const adminLinks = [
    { name: "Overview", path: "/dashboard", icon: <Home size={18} /> },
    {
      name: "User Directory",
      path: "/dashboard/manage-users",
      icon: <Users size={18} />,
    },
    {
      name: "Task Moderation",
      path: "/dashboard/manage-tasks",
      icon: <Settings size={18} />,
    },
  ];

  const links =
    role === "admin" ? adminLinks : role === "buyer" ? buyerLinks : workerLinks;

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 z-40 p-6 hidden lg:block">
      <div className="h-full glass-card rounded-[2.5rem] flex flex-col border-white/5 shadow-2xl overflow-hidden">
        {/* Branding Area */}
        <div className="p-8 pb-4">
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-aurora rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Micro<span className="text-indigo-400">Task</span>
            </span>
          </Link>
        </div>

        {/* User Card */}
        <div className="px-6 py-8">
          <div className="relative group p-6 glass rounded-3xl border-white/5 shadow-inner">
            <div className="absolute top-2 right-2 text-indigo-400 animate-pulse">
              <Sparkles size={14} />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-indigo-500 blur rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="relative w-16 h-16 rounded-2xl border-2 border-white/10 object-cover shadow-2xl"
                />
              </div>
              <h3 className="text-white font-black text-sm text-center mb-1 truncate w-full">
                {user?.displayName}
              </h3>
              <p className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-500/20">
                {role === "buyer"
                  ? "Buyer Dashboard"
                  : role === "worker"
                  ? "Worker Dashboard"
                  : "Admin Dashboard"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="grow overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300",
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                )
              }
            >
              <span
                className={cn(
                  "transition-transform duration-300 group-hover:scale-110",
                  pathname === link.path ? "text-white" : "text-slate-400"
                )}
              >
                {link.icon}
              </span>
              <div className="grow" />
              <span>{link.name}</span>
              {pathname === link.path && (
                <motion.div
                  layoutId="activeInd"
                  className="absolute left-1 w-1 h-6 bg-white rounded-full"
                />
              )}
              <ChevronRight
                size={14}
                className={cn(
                  "opacity-0 group-hover:opacity-100 transition-all",
                  pathname === link.path && "opacity-100"
                )}
              />
            </NavLink>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800/50">
          <button
            onClick={logOut}
            className="w-full flex items-center justify-center gap-3 py-4 glass text-red-400 hover:bg-red-500/10 rounded-2xl border-white/5 font-black text-xs uppercase tracking-widest transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
          <p className="text-[9px] text-slate-600 text-center font-black uppercase tracking-widest mt-6">
            MicroTask Core v2.4.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
