import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

const WorkerHome = () => {
  // Mock States for Worker
  const stats = [
    {
      label: "Total Submissions",
      value: 25,
      icon: <FiCheckCircle />,
      color: "bg-indigo-500",
    },
    {
      label: "Pending Submissions",
      value: 8,
      icon: <FiClock />,
      color: "bg-yellow-500",
    },
    {
      label: "Total Earning",
      value: "🪙 450",
      icon: <FiDollarSign />,
      color: "bg-emerald-500",
    },
  ];

  // Mock Approved Submissions
  const approvedSubmissions = [
    {
      id: 1,
      task_title: "Watch YT Video",
      payable_amount: 10,
      buyer_name: "John Buyer",
      status: "approved",
    },
    {
      id: 2,
      task_title: "Social Share",
      payable_amount: 15,
      buyer_name: "Sarah Admin",
      status: "approved",
    },
    {
      id: 3,
      task_title: "App Review",
      payable_amount: 50,
      buyer_name: "Mike Dev",
      status: "approved",
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn transition-all duration-300">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Worker Dashboard</h1>
        <p className="text-slate-400">Track your performance and earnings.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl flex items-center gap-6 border border-slate-800"
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

      {/* Approved Submissions Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Approved Submissions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Task Title</th>
                <th className="px-6 py-4 font-semibold">Payable Amount</th>
                <th className="px-6 py-4 font-semibold">Buyer Name</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {approvedSubmissions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {sub.task_title}
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">
                    🪙 {sub.payable_amount}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{sub.buyer_name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                      {sub.status}
                    </span>
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

export default WorkerHome;
