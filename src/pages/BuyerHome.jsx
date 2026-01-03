import { motion } from "framer-motion";
import { FiBriefcase, FiClock, FiDollarSign, FiEye } from "react-icons/fi";
import { useState } from "react";

const BuyerHome = () => {
  // Mock States
  const stats = [
    {
      label: "Total Tasks",
      value: 12,
      icon: <FiBriefcase />,
      color: "bg-indigo-500",
    },
    {
      label: "Pending Workers",
      value: 450,
      icon: <FiClock />,
      color: "bg-pink-500",
    },
    {
      label: "Total Paid",
      value: "$1,250",
      icon: <FiDollarSign />,
      color: "bg-emerald-500",
    },
  ];

  // Mock Submissions
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      worker_name: "Alice Smith",
      task_title: "Watch YT Video",
      payable_amount: 10,
      status: "pending",
    },
    {
      id: 2,
      worker_name: "Bob Jones",
      task_title: "Social Share",
      payable_amount: 15,
      status: "pending",
    },
    {
      id: 3,
      worker_name: "Charlie Brown",
      task_title: "App Review",
      payable_amount: 50,
      status: "pending",
    },
  ]);

  const handleApprove = (id) => {
    setSubmissions(submissions.filter((s) => s.id !== id));
    alert("Submission Approved! Coins transferred to worker.");
  };

  const handleReject = (id) => {
    setSubmissions(submissions.filter((s) => s.id !== id));
    alert("Submission Rejected! Required workers count increased.");
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Buyer Dashboard</h1>
        <p className="text-slate-400">
          Overview of your tasks and pending reviews.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl flex items-center gap-6"
          >
            <div className={`${stat.color} p-4 rounded-xl text-white text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submissions Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Submissions to Review
          </h2>
          <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/20">
            {submissions.length} Pending
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Worker Name</th>
                <th className="px-6 py-4 font-semibold">Task Title</th>
                <th className="px-6 py-4 font-semibold">Payable</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {sub.worker_name}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{sub.task_title}</td>
                  <td className="px-6 py-4 text-yellow-400 font-bold">
                    🪙 {sub.payable_amount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        className="text-slate-400 hover:text-white transition-colors"
                        title="View Detail"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => handleApprove(sub.id)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(sub.id)}
                        className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/20 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No pending submissions found.
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

export default BuyerHome;
