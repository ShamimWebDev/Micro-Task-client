import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {
  Receipt,
  Coins,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Hash,
  Activity,
  CreditCard,
} from "lucide-react";
import { axiosSecure } from "../hooks/useAxios";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/${user.email}`)
        .then((res) => {
          setHistory(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return null;

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
              Transaction Archive
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Financial <span className="text-gradient">Ledger</span>
          </h1>
        </div>

        <div className="bg-slate-900 shadow-2xl p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400 shadow-inner">
            <Receipt size={20} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
              Entry Count
            </p>
            <p className="text-xl font-black text-white">
              {history.length} Records
            </p>
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
                <CreditCard size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  Acquisition Logs
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Liquidity Transaction Synchronization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
              <Activity size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">
                Verified Transactions
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Hash / Auth ID
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Settlement
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Credit Yield
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Timestamp
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {history.map((pay) => (
                  <tr
                    key={pay._id}
                    className="group/row hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-indigo-400/50">
                          <Hash size={14} />
                        </div>
                        <span className="text-xs font-black text-indigo-400 font-mono tracking-wider group-hover/row:text-indigo-300 transition-colors">
                          {pay.transactionId}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className="text-sm font-black text-white">
                        ${pay.price}.00
                      </span>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Coins size={14} className="text-yellow-500" />
                        <span className="text-lg font-black text-emerald-400 tracking-tighter">
                          +{pay.coins}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-slate-500">
                        <Calendar size={12} className="text-indigo-400/50" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {new Date(pay.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-xl border border-emerald-500/20 shadow-lg">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">
                          Settled
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                {history.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-slate-700 mb-6 shadow-inner">
                          <Receipt size={32} />
                        </div>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
                          No Transaction History Recorded
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

export default PaymentHistory;
