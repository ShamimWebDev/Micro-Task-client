import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiCalendar, FiDollarSign } from "react-icons/fi";

const TaskList = () => {
  // Mock Tasks for Workers
  const tasks = [
    {
      id: 1,
      title: "Watch and Comment on YouTube",
      buyer_name: "Creative Labs",
      completion_date: "2026-02-15",
      payable_amount: 15,
      required_workers: 80,
    },
    {
      id: 2,
      title: "Download and Rate App",
      buyer_name: "Game Studio",
      completion_date: "2026-03-01",
      payable_amount: 45,
      required_workers: 15,
    },
    {
      id: 3,
      title: "Share Post on LinkedIn",
      buyer_name: "Startup Hub",
      completion_date: "2026-02-28",
      payable_amount: 10,
      required_workers: 120,
    },
    {
      id: 4,
      title: "Survey for New Product",
      buyer_name: "Market Insights",
      completion_date: "2026-03-10",
      payable_amount: 30,
      required_workers: 50,
    },
  ];

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
            key={task.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col hover:border-indigo-500/50 transition-all group"
          >
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
              {task.title}
            </h3>
            <p className="text-slate-500 text-sm mb-6">By {task.buyer_name}</p>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 flex items-center gap-2 italic">
                  <FiCalendar /> Deadline: {task.completion_date}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-lg">
                  <FiDollarSign /> {task.payable_amount}
                </div>
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  <FiUsers /> {task.required_workers} Spots
                </div>
              </div>
            </div>

            <Link
              to={`/dashboard/task-details/${task.id}`}
              className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all text-center border border-slate-700 hover:border-indigo-500"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
