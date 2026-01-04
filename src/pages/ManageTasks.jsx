import { useState, useEffect } from "react";
import {
  Trash2,
  Calendar,
  UserCircle,
  Coins,
  Target,
  Users as UsersIcon,
  ShieldAlert,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { axiosSecure } from "../hooks/useAxios";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/tasks")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDeleteTask = async (id) => {
    if (
      window.confirm("Authorize permanent decommissioning of this mission?")
    ) {
      try {
        await axiosSecure.delete(`/tasks/${id}`);
        setTasks(tasks.filter((t) => t._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return null;

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
              Task Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Task <span className="text-gradient">List</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 shadow-2xl p-2 rounded-2xl border border-slate-800">
          <div className="px-5 border-r border-slate-800">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Global Buffer
            </p>
            <div className="flex items-center gap-2">
              <Target size={14} className="text-indigo-400" />
              <span className="text-xs font-black text-white uppercase tracking-wider text-[10px]">
                {tasks.length} Active Missions
              </span>
            </div>
          </div>
          <div className="px-5 text-indigo-400">
            <ArrowUpRight size={18} />
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
          <div className="p-10 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400 shadow-inner">
                <ShieldAlert size={20} />
              </div>
              <div>
                <p className="text-slate-500 mt-4 font-medium max-w-lg">
                  Complete overview of all platform tasks. Monitor, review, and
                  manage active listings.
                </p>{" "}
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Manage and review all platform tasks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">
              <Activity size={14} className="text-indigo-500" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                Master Link Online
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Task Details
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Task Owner
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Quantity
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Payment
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Actions
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
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            ETD: {task.completion_date}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-[10px] font-black text-slate-400 border-white/5 uppercase">
                          {task.buyer_name?.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-slate-300 italic">
                          {task.buyer_name}
                        </span>
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
                    <td className="px-10 py-6">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="group flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/0 hover:bg-white/2 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer active:scale-95"
                        >
                          <Trash2 size={18} />
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
                          <Target size={32} />
                        </div>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
                          Global Objective Buffer Empty
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

export default ManageTasks;
