import { useState, useEffect, useContext } from "react";
import {
  Edit3,
  Trash2,
  Target,
  Coins,
  Calendar,
  Activity,
  Users as UsersIcon,
  ShieldCheck,
  Zap,
  LayoutDashboard,
} from "lucide-react";
import { axiosSecure } from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-tasks/${user.email}`)
        .then((res) => {
          setTasks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Authorize permanent decommissioning of this mission? Credits for unallocated slots will be returned."
      )
    ) {
      try {
        await axiosSecure.delete(`/tasks/${id}`);
        setTasks(tasks.filter((t) => t._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleUpdate = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const detail = form.detail.value;
    const submission_info = form.submission_info.value;

    try {
      await axiosSecure.patch(`/tasks/${editingTask._id}`, {
        task_title: title,
        task_detail: detail,
        submission_info: submission_info,
      });

      // Update local state
      setTasks(
        tasks.map((t) =>
          t._id === editingTask._id
            ? {
                ...t,
                task_title: title,
                task_detail: detail,
                submission_info: submission_info,
              }
            : t
        )
      );
      setIsEditModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

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
            <div className="w-12 h-px bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Operative Archive
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            My <span className="text-gradient">Deployments</span>
          </h1>
        </div>

        <div className="bg-slate-900 shadow-2xl p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400 shadow-inner">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
              Archive Depth
            </p>
            <p className="text-xl font-black text-white">
              {tasks.length} Missions
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
                <Target size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  Objective Logs
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Personal Mission Synchronization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
              <Activity size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">
                Status: Normalized
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
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Deployment Scale
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Allocation
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Protocol
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Control
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="group/row hover:bg-white/2 transition-colors"
                  >
                    <td className="px-10 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover/row:text-indigo-400 transition-colors uppercase tracking-tight">
                          {task.task_title}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                          <Calendar size={12} className="text-indigo-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest font-mono">
                            DEADLINE_{task.completion_date}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <UsersIcon size={14} className="text-indigo-400" />
                        <span className="text-sm font-black text-indigo-400 tracking-tighter">
                          {task.required_workers} Units
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <Coins size={14} className="text-yellow-500" />
                        <span className="text-lg font-black text-yellow-500 tracking-tighter">
                          {task.payable_amount}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-4 py-1.5 rounded-xl border border-indigo-500/20">
                        <Zap
                          size={10}
                          className="text-indigo-400"
                          fill="currentColor"
                        />
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                          Active
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleUpdate(task)}
                          className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all active:scale-95 border-white/5"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="w-10 h-10 glass rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 border-white/5 shadow-2xl"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-slate-700 mb-6 shadow-inner">
                          <ShieldCheck size={32} />
                        </div>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
                          Operative Archive Empty
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

      {/* Edit Modal */}
      {isEditModalOpen && editingTask && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg glass-card p-8 rounded-4xl border border-white/10 shadow-2xl relative"
          >
            <h2 className="text-2xl font-black text-white mb-6">
              Modify Mission Architecture
            </h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Objective Title
                </label>
                <input
                  name="title"
                  defaultValue={editingTask.task_title}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white text-sm font-bold focus:border-indigo-500 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Strategic Details
                </label>
                <textarea
                  name="detail"
                  defaultValue={editingTask.task_detail}
                  rows="4"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white text-sm font-medium focus:border-indigo-500 outline-none"
                  required
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Verification Proof Protocol
                </label>
                <textarea
                  name="submission_info"
                  defaultValue={editingTask.submission_info}
                  rows="3"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white text-sm font-medium focus:border-indigo-500 outline-none"
                  required
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:text-white glass border-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="group p-4 rounded-xl border border-white/5 bg-white/0 hover:bg-white/2 hover:border-indigo-500/30 transition-all duration-300"
                >
                  Confirm Updates
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
