import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Coins,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { axiosSecure } from "../hooks/useAxios";
import { cn } from "../utils/cn";

const TaskList = () => {
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

  if (loading) return null;

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      {/* Marketplace Header */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Mission Control
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Open <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-slate-500 mt-4 font-medium max-w-lg">
            High-precision missions vetted for the elite taskforce. Execute with
            speed and security.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-2xl border border-slate-800">
          <div className="px-5 border-r border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-indigo-400" />
              <span className="text-xs font-black text-white uppercase tracking-wider text-[10px]">
                99.9% Verified
              </span>
            </div>
          </div>
          <div className="px-5">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-wider text-[10px]">
              {tasks.length} Available Missions
            </span>
          </div>
        </div>
      </motion.header>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {tasks.map((task, index) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col glass-card rounded-[3rem] overflow-hidden border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(79,70,229,0.15)]"
          >
            {/* Visual Header */}
            <div className="h-44 overflow-hidden relative">
              <img
                src={task.task_image_url || task.image_url}
                alt={task.task_title || task.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute top-4 left-4">
                <div className="bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-white/10 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Priority Mission
                </div>
              </div>

              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 glass rounded-lg flex items-center justify-center text-xs font-black text-white">
                    {task.buyer_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      Origin Agent
                    </p>
                    <p className="text-xs font-bold text-white">
                      {task.buyer_name || "Nexus Client"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex flex-col grow">
              <h3 className="text-xl font-black text-white mb-4 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                {task.task_title || task.title}
              </h3>

              <div className="space-y-6 mb-10 grow font-medium">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Clock size={14} className="text-indigo-400" />
                    <span>Ends: {task.completion_date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-400 text-xs">
                    <Users size={14} />
                    <span className="font-bold">
                      {task.required_workers} Openings
                    </span>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-900" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                      <Coins size={18} />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        Mission Bounty
                      </p>
                      <p className="text-xl font-black text-yellow-500">
                        {task.payable_amount}
                      </p>
                    </div>
                  </div>

                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-full h-full glass rounded-2xl flex items-center justify-center text-indigo-400 border-white/5">
                      <TrendingUpIcon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to={`/dashboard/task-details/${task._id}`}
                className="group/btn relative w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl transition-all text-center border border-white/5 overflow-hidden active:scale-[0.98]"
              >
                <div className="relative z-10 flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                  Initiate Mission{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </motion.div>
        ))}

        {tasks.length === 0 && (
          <div className="col-span-full py-32 text-center glass-card rounded-[3rem] border-dashed border-slate-800">
            <div className="w-16 h-16 glass rounded-2xl mx-auto mb-6 flex items-center justify-center text-slate-700">
              <ShieldCheck size={32} />
            </div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
              Marketplace Synchronized. No Active Missions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple icon component if lucide TrendingUp is missing or for better control
const TrendingUpIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

export default TaskList;
