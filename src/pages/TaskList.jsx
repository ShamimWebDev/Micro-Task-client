import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiCalendar, FiDollarSign } from "react-icons/fi";
import { useState, useEffect } from "react";
import { axiosSecure } from "../hooks/useAxios";

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
    <div className="space-y-10 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Available Tasks</h1>
        <p className="text-slate-400">
          Find tasks that match your skills and start earning.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col hover:border-indigo-500/50 transition-all group"
          >
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {task.task_title}
            </h3>
            <p className="text-slate-500 text-sm mb-6">By {task.buyer_name}</p>

            <div className="space-y-4 mb-8 grow">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center gap-2 italic">
                  <FiCalendar /> Deadline: {task.completion_date}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-lg">
                  🪙 {task.payable_amount}
                </div>
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  <FiUsers /> {task.required_workers} Spots
                </div>
              </div>
            </div>

            <Link
              to={`/dashboard/task-details/${task._id}`}
              className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all text-center border border-slate-700 hover:border-indigo-500"
            >
              View Details
            </Link>
          </motion.div>
        ))}
        {tasks.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500 italic">
            No tasks available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
