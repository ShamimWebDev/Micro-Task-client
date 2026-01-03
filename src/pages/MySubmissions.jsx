import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {
  History,
  ChevronLeft,
  ChevronRight,
  Coins,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
  Activity,
} from "lucide-react";
import { axiosSecure } from "../hooks/useAxios";
import { cn } from "../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [submissions, setSubmissions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(
          `/my-submissions?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`
        )
        .then((res) => {
          setSubmissions(res.data.result);
          setTotalCount(res.data.total);
        })
        .catch((err) => console.error(err));
    }
  }, [user, currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          icon: <CheckCircle2 size={12} />,
          className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          label: "Verified",
        };
      case "rejected":
        return {
          icon: <XCircle size={12} />,
          className: "bg-red-500/10 text-red-400 border-red-500/20",
          label: "Declined",
        };
      default:
        return {
          icon: <Clock size={12} />,
          className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          label: "Pending",
        };
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Cinematic Header */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Mission History
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Operative <span className="text-gradient">Log</span>
          </h1>
        </div>

        <div className="bg-slate-900 shadow-2xl p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400 shadow-inner">
            <History size={20} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
              Total Operations
            </p>
            <p className="text-xl font-black text-white">{totalCount}</p>
          </div>
        </div>
      </motion.header>

      {/* Modern Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative glass-card rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400 shadow-inner">
                <Briefcase size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  Execution Records
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Detailed Mission Lifecycle Tracking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">
              <Activity size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">
                Stream Online
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Objective Architecture
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Origin Agent
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Bounty Index
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Timestamp
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Protocol Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {submissions.map((sub) => {
                  const config = getStatusConfig(sub.status);
                  return (
                    <tr
                      key={sub._id}
                      className="group/row hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-10 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white group-hover/row:text-indigo-400 transition-colors uppercase tracking-tight">
                            {sub.task_title}
                          </span>
                          <span className="text-[9px] text-slate-600 font-bold font-mono tracking-widest mt-1 uppercase">
                            OP_REF_{sub._id.slice(-6)}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">
                            {sub.buyer_name?.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-slate-300 italic">
                            {sub.buyer_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center justify-center gap-2">
                          <Coins size={14} className="text-yellow-500" />
                          <span className="text-lg font-black text-yellow-500 tracking-tighter">
                            {sub.payable_amount}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-slate-500">
                          <Calendar size={12} className="text-indigo-400/50" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {sub.current_date}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <div
                          className={cn(
                            "inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl border",
                            config.className
                          )}
                        >
                          {config.icon}
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">
                            {config.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Evolution-style Pagination */}
          <AnimatePresence>
            {totalPages > 1 && (
              <div className="p-8 bg-slate-900/40 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
                  Index{" "}
                  <span className="text-white">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>
                  to{" "}
                  <span className="text-white">
                    {Math.min(currentPage * itemsPerPage, totalCount)}
                  </span>
                  / Total{" "}
                  <span className="text-white font-black">{totalCount}</span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5 transition-all border-white/5"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-white/5">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={cn(
                          "w-8 h-8 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          currentPage === i + 1
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                            : "text-slate-600 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/5 transition-all border-white/5"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MySubmissions;
