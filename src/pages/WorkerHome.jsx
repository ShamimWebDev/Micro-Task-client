import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Coins,
  TrendingUp,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { axiosSecure } from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";
import { cn } from "../utils/cn";

const WorkerHome = () => {
  const { user } = useContext(AuthContext);
  const [statsData, setStatsData] = useState(null);
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const fetchData = async () => {
        try {
          const [statsRes, subRes] = await Promise.all([
            axiosSecure.get(`/worker-stats/${user.email}`),
            axiosSecure.get(
              `/my-submissions?email=${user.email}&status=approved`
            ),
          ]);
          setStatsData(statsRes.data);
          setApprovedSubmissions(
            subRes.data.result.filter((s) => s.status === "approved")
          );
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  if (loading) return null;

  const stats = [
    {
      label: "Total Submissions",
      value: statsData?.totalSubmission || 0,
      icon: <CheckCircle2 size={20} />,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      label: "Pending Review",
      value: statsData?.pendingSubmission || 0,
      icon: <Clock size={20} />,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "Accumulated Vault",
      value: statsData?.totalEarning || 0,
      icon: <Coins size={20} />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      suffix: "Coins",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Dynamic Header */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Worker Terminal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Performance <span className="text-gradient">Report</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800">
          <div className="px-4 border-r border-slate-800">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Status
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider text-[10px]">
                Active
              </span>
            </div>
          </div>
          <div className="px-4">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Last Update
            </p>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider text-[10px]">
              Real-time
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
            {/* Visual Flare */}
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

              <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                <Activity size={12} />
                Live Synchronization
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Approved Submissions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative glass-card rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div className="p-10 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  Verified Achievements
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Recently Approved Submissions
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Objective
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Reward
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Origin
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Protocol
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {approvedSubmissions.map((sub) => (
                  <tr
                    key={sub._id}
                    className="group/row hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover/row:text-indigo-400 transition-colors">
                          {sub.task_title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium font-mono mt-1 uppercase">
                          ID: {sub._id.slice(-8)}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                          <Coins size={14} />
                        </div>
                        <span className="text-lg font-black text-yellow-500">
                          {sub.payable_amount}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-xs font-bold text-slate-300">
                          {sub.buyer_name?.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-300">
                          {sub.buyer_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="inline-flex items-center justify-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-xl border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">
                          Verified
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                {approvedSubmissions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-10 py-20 text-center">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                        No records found in the archive
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkerHome;
