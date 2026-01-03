import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Clock,
  Coins,
  Eye,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  LayoutDashboard,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { axiosSecure } from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";
import { cn } from "../utils/cn";

const BuyerHome = () => {
  const { user } = useContext(AuthContext);
  const [statsData, setStatsData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const fetchData = async () => {
        try {
          const [statsRes, subRes] = await Promise.all([
            axiosSecure.get(`/buyer-stats/${user.email}`),
            axiosSecure.get(`/submissions/to-review/${user.email}`),
          ]);
          setStatsData(statsRes.data);
          setSubmissions(subRes.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleApprove = async (sub) => {
    try {
      await axiosSecure.patch(`/submissions/${sub._id}`, {
        status: "approved",
        payable_amount: sub.payable_amount,
        workerEmail: sub.worker_email,
        buyerName: user?.displayName,
        taskTitle: sub.task_title,
      });
      setSubmissions(submissions.filter((s) => s._id !== sub._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (sub) => {
    try {
      await axiosSecure.patch(`/submissions/${sub._id}`, {
        status: "rejected",
        workerEmail: sub.worker_email,
        buyerName: user?.displayName,
        taskTitle: sub.task_title,
      });
      setSubmissions(submissions.filter((s) => s._id !== sub._id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  const stats = [
    {
      label: "Active Missions",
      value: statsData?.totalTaskCount || 0,
      icon: <Briefcase size={20} />,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      label: "Available Slots",
      value: statsData?.pendingTaskCount || 0,
      icon: <Clock size={20} />,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
    },
    {
      label: "Capital Allocated",
      value: statsData?.totalPaymentPaid || 0,
      icon: <Coins size={20} />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      suffix: "Coins",
    },
  ];

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
              Buyer Control Panel
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Mission <span className="text-gradient">Intelligence</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800">
          <div className="px-4 border-r border-slate-800">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Queue Status
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider text-[10px]">
                {submissions.length} Review Ready
              </span>
            </div>
          </div>
          <div className="px-4">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Authorization
            </p>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
              Verified Buyer
            </span>
          </div>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "group relative overflow-hidden glass-card p-8 rounded-[2rem] border transition-all duration-500",
              stat.border
            )}
          >
            <div
              className={cn(
                "absolute top-0 right-0 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity",
                stat.bg
              )}
            />

            <div className="relative z-10 flex flex-col items-start">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 glass",
                  stat.color
                )}
              >
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">
                {stat.value}{" "}
                <span className="text-sm font-bold opacity-50">
                  {stat.suffix}
                </span>
              </h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                {stat.label}
              </p>

              <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                <Zap size={12} fill="currentColor" />
                High Efficiency Mode
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submissions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative glass-card rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  Review Pipeline
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Pending Validation Queue
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">
                {submissions.length} Tasks Requiring Action
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Operator
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Objective
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Bounty
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Control
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {submissions.map((sub) => (
                  <tr
                    key={sub._id}
                    className="group/row hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-sm font-black text-indigo-400 border-white/5">
                          {sub.worker_name?.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white mb-0.5">
                            {sub.worker_name}
                          </span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                            Worker Node
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-300 transition-colors group-hover/row:text-white">
                          {sub.task_title}
                        </span>
                        <span className="text-[9px] text-slate-500 font-medium font-mono mt-1 uppercase">
                          ARCHIVE_{sub._id.slice(-6)}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <Coins size={14} className="text-yellow-500" />
                        <span className="text-lg font-black text-yellow-500">
                          {sub.payable_amount}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setSelectedSub(sub)}
                          className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all shadow-lg"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleApprove(sub)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          onClick={() => handleReject(sub)}
                          className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl border border-red-500/20 transition-all shadow-lg active:scale-95"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {submissions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-10 py-24 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-slate-700 mb-6">
                          <ShieldCheck size={32} />
                        </div>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
                          Pipeline Synchronized. No Pending Actions.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Elite Modal */}
      <AnimatePresence>
        {selectedSub && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card max-w-xl w-full p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-indigo-400 shadow-inner">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    Proof Evidence
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    Verification Stream {selectedSub._id.slice(-6)}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 shadow-inner p-8 rounded-[2rem] border border-white/5 text-slate-300 font-medium leading-relaxed mb-10 min-h-[120px] max-h-60 overflow-y-auto custom-scrollbar italic">
                "{selectedSub.submission_details}"
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setSelectedSub(null)}
                  className="flex-grow py-4 glass text-white font-black text-xs uppercase tracking-widest rounded-2xl border-white/5 hover:bg-white/5 transition-all"
                >
                  Dismiss Proof
                </button>
                <button
                  onClick={() => {
                    handleApprove(selectedSub);
                    setSelectedSub(null);
                  }}
                  className="flex-grow py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                >
                  Authorize Payout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyerHome;
