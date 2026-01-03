import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Calendar,
  Users,
  Coins,
  Type,
  FileText,
  Rocket,
  ShieldCheck,
  AlertCircle,
  Zap,
} from "lucide-react";
import { imageUpload } from "../utils/imageUpload";
import { axiosSecure } from "../hooks/useAxios";
import { useUserData } from "../hooks/useUserData";
import { cn } from "../utils/cn";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, isUserLoading] = useUserData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewCost, setPreviewCost] = useState(0);
  const [workerCount, setWorkerCount] = useState("");
  const [payableAmount, setPayableAmount] = useState("");

  useEffect(() => {
    const total = (parseInt(workerCount) || 0) * (parseInt(payableAmount) || 0);
    setPreviewCost(total);
  }, [workerCount, payableAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const detail = form.detail.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseInt(form.payable_amount.value);
    const completion_date = form.completion_date.value;
    const submission_info = form.submission_info.value;
    const image = form.image.files[0];

    const totalCost = required_workers * payable_amount;
    const availableCoins = dbUser?.coins || 0;

    if (totalCost > availableCoins) {
      setLoading(false);
      return;
    }

    try {
      const image_url = await imageUpload(image);

      const newTask = {
        task_title: title,
        task_detail: detail,
        required_workers,
        payable_amount,
        completion_date,
        submission_info,
        task_image_url: image_url,
        buyer_name: dbUser?.name,
        buyer_email: user.email,
        status: "active",
      };

      await axiosSecure.post("/tasks", newTask);
      navigate("/dashboard/my-tasks");
    } catch (err) {
      setLoading(false);
    }
  };

  const isInsufficient = previewCost > (dbUser?.coins || 0);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header Area */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Mission Forge
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Deploy <span className="text-gradient">Mission</span>
          </h1>
        </div>

        <div className="bg-slate-900 shadow-2xl p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-yellow-500 shadow-inner">
            <Coins size={20} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
              Available Liquidity
            </p>
            <p className="text-xl font-black text-white">
              {dbUser?.coins?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />

              <div className="space-y-6">
                {/* Title */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Objective Title
                  </label>
                  <div className="relative">
                    <Type
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                      size={18}
                    />
                    <input
                      name="title"
                      type="text"
                      placeholder="e.g. Subscribe to channel"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                    />
                  </div>
                </div>

                {/* Detail */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Strategic Details
                  </label>
                  <textarea
                    name="detail"
                    rows="4"
                    placeholder="Specify the operation parameters..."
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 px-6 text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Workers */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Operator Count
                  </label>
                  <div className="relative">
                    <Users
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"
                      size={18}
                    />
                    <input
                      name="required_workers"
                      type="number"
                      min="1"
                      value={workerCount}
                      onChange={(e) => setWorkerCount(e.target.value)}
                      placeholder="100"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-black focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Payable */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Bounty per Unit
                  </label>
                  <div className="relative">
                    <Coins
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"
                      size={18}
                    />
                    <input
                      name="payable_amount"
                      type="number"
                      min="1"
                      value={payableAmount}
                      onChange={(e) => setPayableAmount(e.target.value)}
                      placeholder="10"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-black focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Deadline
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"
                      size={18}
                    />
                    <input
                      name="completion_date"
                      type="date"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="relative group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                    Visual Reference
                  </label>
                  <div className="relative">
                    <ImageIcon
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600"
                      size={18}
                    />
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-16 pr-6 text-slate-400 text-[10px] font-black file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Submission Proof */}
              <div className="relative group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                  Verification Proof Protocol
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-6 top-5 text-slate-600"
                    size={18}
                  />
                  <textarea
                    name="submission_info"
                    rows="3"
                    placeholder="Describe exactly what proof is required for authorization..."
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 pl-16 pr-6 text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all shadow-inner leading-relaxed"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isInsufficient}
              className={cn(
                "group relative w-full py-6 rounded-[2rem] text-white font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all shadow-2xl active:scale-[0.98]",
                isInsufficient
                  ? "bg-slate-800 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              )}
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <Zap className="animate-spin" size={18} />
                ) : (
                  <Rocket size={18} />
                )}
                {loading
                  ? "Initializing Deployment..."
                  : isInsufficient
                  ? "Insufficient Liquidity"
                  : "Deploy Mission Now"}
              </div>
              {!isInsufficient && !loading && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              )}
            </button>
          </form>
        </motion.div>

        {/* Sidebar / Recap */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Cost Summary */}
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">
              Fiscal Allocation
            </h4>

            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-bold">Total Exposure</span>
                <span className="text-white font-black">
                  {previewCost.toLocaleString()} Coins
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-bold">Safety Margin</span>
                <span className="text-emerald-400 font-black">Verified</span>
              </div>

              <div className="h-[1px] bg-slate-800" />

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  Post-Mission Balance
                </span>
                <span
                  className={cn(
                    "text-2xl font-black",
                    isInsufficient ? "text-red-500" : "text-white"
                  )}
                >
                  {(dbUser?.coins || 0) - previewCost}
                </span>
              </div>
            </div>

            <AnimatePresence>
              {isInsufficient && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 flex items-start gap-3 bg-red-500/10 p-4 rounded-2xl border border-red-500/20"
                >
                  <AlertCircle
                    className="text-red-500 shrink-0 mt-0.5"
                    size={16}
                  />
                  <p className="text-[10px] font-bold text-red-500/80 leading-relaxed uppercase">
                    Authorization Failed. Current liquidity is insufficient for
                    this mission scale.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Tips */}
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-indigo-400" size={18} />
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                Quality Control
              </h4>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Clear objectives lead to high-precision results. Ensure your
              strategic details are unambiguous to maintain 99.9% mission
              accuracy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddTask;
