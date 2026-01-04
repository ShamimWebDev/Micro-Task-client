import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  FileText,
  Target,
  Coins,
  User,
  Calendar,
  ShieldCheck,
  Zap,
  Briefcase,
} from "lucide-react";
import { axiosSecure } from "../hooks/useAxios";
import { cn } from "../utils/cn";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const details = e.target.submission_Details.value;

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      submission_details: details,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      current_date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    try {
      await axiosSecure.post("/submissions", submissionData);
      navigate("/dashboard/my-submissions");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!task) return null;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Navigation Header */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex items-center justify-between"
      >
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest bg-slate-900/50 px-6 py-3 rounded-2xl border border-white/5"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Task List
        </button>

        <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">
          <ShieldCheck size={14} className="text-indigo-400" />
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">
            Verified Task
          </span>
        </div>
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Task Brief */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="p-4 rounded-4xl bg-white/2 border border-white/5 overflow-hidden relative shadow-2xl">
            <div className="h-64 relative">
              <img
                src={task.task_image_url}
                alt={task.task_title}
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent z-10" />

              <div className="absolute bottom-6 left-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                    Active Task
                  </div>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  {task.task_title}
                </h1>
              </div>
            </div>

            <div className="p-10 space-y-10 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />

              <div className="flex flex-wrap gap-8 items-center border-b border-white/5 pb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-yellow-500 shadow-inner">
                    <Coins size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                      Task Payment
                    </p>
                    <p className="text-xl font-black text-yellow-500">
                      {task.payable_amount} Coins
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400 shadow-inner">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                      Buyer
                    </p>
                    <p className="text-xl font-black text-white">
                      {task.buyer_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400 shadow-inner">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                      Deadline
                    </p>
                    <p className="text-xl font-black text-white">
                      {task.completion_date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Target size={18} className="text-indigo-400 shadow-glow" />
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                      Task Description
                    </h3>
                  </div>
                  <p className="text-slate-400 font-medium leading-relaxed max-w-2xl text-md">
                    {task.task_detail}
                  </p>
                </section>

                <section className="bg-white/2 p-8 rounded-4xl border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck size={18} className="text-indigo-400" />
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                      Submission Requirements
                    </h3>
                  </div>
                  <p className="text-slate-500 font-bold italic text-sm leading-relaxed">
                    &quot; {task.submission_info} &quot;
                  </p>
                </section>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Submission Action */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="h-px w-full bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400 shadow-inner">
                <Briefcase size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Submit Work
                </h2>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Provide proof of completion
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmission} className="space-y-8">
              <div className="relative group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                  Submission Details
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-6 top-6 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                    size={18}
                  />
                  <textarea
                    name="submission_Details"
                    rows="8"
                    placeholder="Enter required proof details..."
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-3xl py-6 pl-16 pr-6 text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800 shadow-inner leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <Zap className="animate-spin" size={16} />
                ) : (
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                )}
                {loading ? "Submitting..." : "Submit Task"}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </button>
            </form>
          </div>

          {/* Quick Stats sidebar widget */}
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Status
              </span>
              <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                Normal
              </span>
            </div>
            <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              />
            </div>
            <p className="text-[10px] font-bold text-slate-600 leading-relaxed uppercase">
              Submissions are usually reviewed within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskDetails;
