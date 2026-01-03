import { useState } from "react";
import { FiTrash2, FiUser, FiCalendar } from "react-icons/fi";

const ManageTasks = () => {
  // Mock Tasks Data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Watch YT Video",
      buyer_name: "Creative Labs",
      required_workers: 80,
      payable_amount: 15,
      completion_date: "2026-02-15",
    },
    {
      id: 2,
      title: "Download App",
      buyer_name: "Game Studio",
      required_workers: 15,
      payable_amount: 45,
      completion_date: "2026-03-01",
    },
    {
      id: 3,
      title: "Share Post",
      buyer_name: "Startup Hub",
      required_workers: 120,
      payable_amount: 10,
      completion_date: "2026-02-28",
    },
  ]);

  const handleDeleteTask = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this task? This will remove it from all workers' lists."
      )
    ) {
      setTasks(tasks.filter((t) => t.id !== id));
      alert("Task deleted successfully.");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Tasks</h1>
        <p className="text-slate-400">
          Monitor and moderate all active tasks on the platform.
        </p>
      </header>

      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Task Info</th>
                <th className="px-6 py-4">Buyer</th>
                <th className="px-6 py-4 text-center">Required</th>
                <th className="px-6 py-4 text-center">Payable</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-white font-medium text-sm">
                      {task.title}
                    </div>
                    <div className="text-slate-500 text-[10px] flex items-center gap-1 mt-1">
                      <FiCalendar /> Deadline: {task.completion_date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-300 text-sm italic">
                      {task.buyer_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-indigo-400">
                    {task.required_workers}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-yellow-400">
                    🪙 {task.payable_amount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-white p-2 hover:bg-red-500/10 rounded-xl transition-all border border-red-500/10"
                      title="Delete Task"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
