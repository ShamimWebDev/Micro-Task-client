import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const MyTasks = () => {
  // Mock Tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "YouTube Subscribtion",
      required_workers: 50,
      payable_amount: 10,
      completion_date: "2026-05-20",
    },
    {
      id: 2,
      title: "App Download",
      required_workers: 20,
      payable_amount: 100,
      completion_date: "2026-04-15",
    },
    {
      id: 3,
      title: "Social Media Share",
      required_workers: 100,
      payable_amount: 5,
      completion_date: "2026-03-10",
    },
  ]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this task? Coins for uncompleted spots will be refilled."
      )
    ) {
      setTasks(tasks.filter((t) => t.id !== id));
      alert("Task deleted and coins refilled!");
    }
  };

  const handleUpdate = (task) => {
    const newTitle = prompt("Enter new title:", task.title);
    if (newTitle) {
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
      );
    }
  };

  // Sort tasks in descending order of completion date
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.completion_date) - new Date(a.completion_date)
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
        <p className="text-slate-400">
          Manage all the tasks you have posted on the platform.
        </p>
      </header>

      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Task Title</th>
                <th className="px-6 py-4 font-semibold">Workers</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Deadline</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 uppercase text-xs font-bold">
              {sortedTasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium normal-case text-sm">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {task.required_workers}
                  </td>
                  <td className="px-6 py-4 text-yellow-500">
                    🪙 {task.payable_amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {task.completion_date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleUpdate(task)}
                        className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors border border-indigo-500/10"
                        title="Edit Task"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/10"
                        title="Delete Task"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
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

export default MyTasks;
