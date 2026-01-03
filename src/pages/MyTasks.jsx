import { useState, useEffect, useContext } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { axiosSecure } from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";

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
        "Are you sure you want to delete this task? Coins for uncompleted spots will be refilled."
      )
    ) {
      try {
        await axiosSecure.delete(`/tasks/${id}`);
        setTasks(tasks.filter((t) => t._id !== id));
        alert("Task deleted and coins refilled!");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdate = async (task) => {
    // For simplicity, using prompt, but ideally a modal
    const newTitle = prompt("Enter new title:", task.task_title);
    if (newTitle) {
      // TODO: Implement update API on server
      alert(
        "Update feature simplified: Refresh to see changes (needs server PATCH)"
      );
    }
  };

  if (loading) return null;

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
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold">Deadline</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 uppercase text-[10px] font-bold">
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium normal-case text-sm">
                    {task.task_title}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {task.required_workers}
                  </td>
                  <td className="px-6 py-4 text-yellow-500 font-bold">
                    🪙 {task.payable_amount}
                  </td>
                  <td className="px-6 py-4 text-center">
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
                        onClick={() => handleDelete(task._id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/10"
                        title="Delete Task"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    No tasks added by you yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
