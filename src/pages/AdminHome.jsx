import { motion } from "framer-motion";
import {
  Users,
  Coins,
  CreditCard,
  CheckCircle2,
  ShieldAlert,
  BarChart3,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { axiosSecure } from "../hooks/useAxios";
import { cn } from "../utils/cn";

const AdminHome = () => {
  const [statsData, setStatsData] = useState(null);
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, withdrawRes] = await Promise.all([
          axiosSecure.get("/admin-stats"),
          axiosSecure.get("/withdrawals/pending"),
        ]);
        setStatsData(statsRes.data);
        setWithdrawRequests(withdrawRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePaymentSuccess = async (id, workerEmail, withdrawal_coin) => {
    try {
      await axiosSecure.patch(`/withdrawals/${id}`, {
        status: "approved",
        workerEmail,
        withdrawal_coin,
      });
      setWithdrawRequests(withdrawRequests.filter((req) => req._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  const stats = [
    {
      label: "Active Workers",
      value: statsData?.totalWorkers || 0,
      icon: <Users size={20} />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Active Buyers",
      value: statsData?.totalBuyers || 0,
      icon: <Users size={20} />,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      label: "Total Coins",
      value: statsData?.totalAvailableCoin || 0,
      icon: <Coins size={20} />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      suffix: "Coins",
    },
    {
      label: "Total Payouts",
      value: statsData?.totalPayments || 0,
      icon: <CheckCircle2 size={20} />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Executive Header */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Platform <span className="text-gradient">Overview</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="px-5 border-r border-slate-800">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 font-mono">
              System Status
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="text-emerald-400 font-bold text-sm tracking-wider">
                Online
              </span>
            </div>
          </div>
          <div className="px-5">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 font-mono">
              Platform Activity
            </p>
            <h2 className="text-xl font-black text-white">
              Withdrawal Requests
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Review and manage pending withdrawal requests.
            </p>
          </div>
        </div>
      </motion.header>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "group relative overflow-hidden glass-card p-8 rounded-[2.5rem] border transition-all duration-500",
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
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 glass border-white/5 shadow-inner",
                  stat.color
                )}
              >
                {stat.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">
                {stat.prefix}
                {stat.value.toLocaleString()}{" "}
                <span className="text-xs font-bold opacity-40">
                  {stat.suffix}
                </span>
              </h3>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                {stat.label}
              </p>

              <div className="mt-8 flex items-center gap-2 text-[9px] font-black text-indigo-500/60 uppercase tracking-widest">
                <BarChart3 size={12} />
                Master Analytics
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Withdrawal Requests Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative glass-card rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-yellow-500 shadow-inner">
                <Cpu size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  Withdrawal Requests
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Review and manage pending withdrawal requests.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                  {withdrawRequests.length} Pending Actions
                </span>
              </div>
              <button className="p-3 glass rounded-xl text-slate-400 hover:text-white transition-all">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Initiator
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Fiscal Detail
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Transmission
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Authorization
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {withdrawRequests.map((req) => (
                  <tr
                    key={req._id}
                    className="group p-4 rounded-xl border border-white/5 bg-white/0 hover:bg-white/2 hover:border-indigo-500/30 transition-all duration-300"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-sm font-black text-indigo-400 border-white/5">
                          {req.worker_name?.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white mb-0.5">
                            {req.worker_name}
                          </span>
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">
                            @{req.worker_email.split("@")[0]}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-yellow-500 font-black">
                          <Coins size={14} />
                          <span>{req.withdrawal_coin}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold mt-1 uppercase tracking-widest">
                          Liquid: ${req.withdrawal_amount}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-indigo-400">
                          <CreditCard size={14} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-300 uppercase tracking-widest">
                            {req.payment_system}
                          </span>
                          <span className="text-[9px] text-slate-600 font-bold font-mono tracking-tighter mt-1">
                            {req.account_number}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            handlePaymentSuccess(
                              req._id,
                              req.worker_email,
                              req.withdrawal_coin
                            )
                          }
                          className="group/btn relative px-6 py-3 bg-emerald-600 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                          <span className="relative z-10">
                            Approve Transfer
                          </span>
                          <div className="absolute inset-0 bg-emerald-400 opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {withdrawRequests.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-slate-700 mb-6 shadow-inner">
                          <ShieldAlert size={32} />
                        </div>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
                          No Pending Transactions in Buffer
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
    </div>
  );
};

export default AdminHome;
