import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useUserData } from "../hooks/useUserData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  DollarSign,
  CreditCard,
  Hash,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Wallet,
} from "lucide-react";
import { axiosSecure } from "../hooks/useAxios";
import { cn } from "../utils/cn";

const Withdrawals = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, isUserLoading] = useUserData();
  const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
  const [loading, setLoading] = useState(false);

  if (isUserLoading) return null;

  const userCoins = dbUser?.coins || 0;
  const withdrawalAmount = (coinsToWithdraw / 20).toFixed(2);
  const canWithdraw = userCoins >= 200;

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const system = form.payment_system.value;
    const accountNumber = form.account_number.value;

    if (coinsToWithdraw < 200) {
      setLoading(false);
      return;
    }

    if (coinsToWithdraw > userCoins) {
      setLoading(false);
      return;
    }

    const withdrawalData = {
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdrawal_coin: coinsToWithdraw,
      withdrawal_amount: parseFloat(withdrawalAmount),
      payment_system: system,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    try {
      await axiosSecure.post("/withdrawals", withdrawalData);
      form.reset();
      setCoinsToWithdraw(0);
      alert("Settlement request initialized. Verification in progress.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Cinematic Header */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Fiscal Settlement
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Liquidate <span className="text-gradient">Assets</span>
          </h1>
        </div>

        <div className="bg-slate-900 shadow-2xl p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-yellow-500 shadow-inner">
            <Coins size={20} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
              Accumulated Credit
            </p>
            <p className="text-xl font-black text-white">
              {userCoins.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl" />

            <div className="space-y-8 grow text-center lg:text-left">
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">
                  Net Valuation
                </h4>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <DollarSign className="text-emerald-400" size={32} />
                  <span className="text-5xl font-black text-white tracking-tighter">
                    {(userCoins / 20).toFixed(2)}
                  </span>
                  <span className="text-xs font-black text-slate-500 uppercase mt-4">
                    USD
                  </span>
                </div>
              </div>

              <div className="h-[1px] bg-white/5 w-full" />

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">
                    Exchange Rate
                  </span>
                  <span className="text-white font-black">20 Coin = $1.00</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">
                    Min Settlement
                  </span>
                  <span className="text-indigo-400 font-black">
                    200 Coins ($10.00)
                  </span>
                </div>
              </div>

              <div className="mt-12 p-6 glass rounded-[2rem] border border-white/5 text-center">
                <ShieldCheck
                  className="mx-auto mb-3 text-indigo-400"
                  size={24}
                />
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                  All settlements undergo a 24h architectural verification
                  protocol.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Withdrawal Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          {!canWithdraw ? (
            <div className="glass-card p-12 rounded-[3rem] border border-white/5 h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-red-500 mb-8 shadow-inner">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Threshold Not Reached
              </h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                You require a minimum of{" "}
                <span className="text-indigo-400 font-black">200 coins</span> to
                authorize a fiscal transfer. Continue mission execution to reach
                the settlement threshold.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleWithdraw}
              className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Coins Input */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Liquidation Volume
                  </label>
                  <div className="relative">
                    <Hash
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                      size={18}
                    />
                    <input
                      name="withdrawal_coin"
                      type="number"
                      min="200"
                      max={userCoins}
                      value={coinsToWithdraw}
                      onChange={(e) =>
                        setCoinsToWithdraw(parseInt(e.target.value) || 0)
                      }
                      required
                      placeholder="Min 200"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-black focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Equal USD */}
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Dollar Delta
                  </label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500"
                      size={18}
                    />
                    <input
                      type="text"
                      readOnly
                      value={`$${withdrawalAmount}`}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-emerald-400 text-lg font-black focus:outline-none cursor-default shadow-inner"
                    />
                  </div>
                </div>

                {/* Payment System */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Transfer Protocol
                  </label>
                  <div className="relative">
                    <CreditCard
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      size={18}
                    />
                    <select
                      name="payment_system"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-xs font-black uppercase tracking-widest focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer shadow-inner"
                    >
                      <option value="bkash">Bkash</option>
                      <option value="rocket">Rocket</option>
                      <option value="nagad">Nagad</option>
                    </select>
                    <ArrowUpRight
                      size={14}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 rotate-45 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Account Number */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Destination ID
                  </label>
                  <div className="relative">
                    <Wallet
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                      size={18}
                    />
                    <input
                      name="account_number"
                      type="text"
                      placeholder="e.g. 017XXXXXXXX"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading || coinsToWithdraw < 200}
                  className={cn(
                    "group relative w-full py-6 rounded-[2rem] text-white font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all shadow-2xl active:scale-[0.98]",
                    loading || coinsToWithdraw < 200
                      ? "bg-slate-800 cursor-not-allowed text-slate-600"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  )}
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <Zap className="animate-spin" size={18} />
                    ) : (
                      <ArrowUpRight className="rotate-45" size={18} />
                    )}
                    {loading ? "Initializing..." : "Authorize Settlement"}
                  </div>
                  {!loading && coinsToWithdraw >= 200 && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Withdrawals;
