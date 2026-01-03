import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import { axiosSecure } from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";

const WorkerHome = () => {
  const { user } = useContext(AuthContext);
  const [statsData, setStatsData] = useState(null);
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const fetchData = async () => {
        try {
          const [statsRes, subRes] = await Promise.all([
            axiosSecure.get(`/worker-stats/${user.email}`),
            axiosSecure.get(
              `/my-submissions?email=${user.email}&status=approved`
            ),
          ]);
          setStatsData(statsRes.data);
          // Filtering for approved on client for now if API doesn't filter perfectly
          setApprovedSubmissions(
            subRes.data.result.filter((s) => s.status === "approved")
          );
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  if (loading) return null;

  const stats = [
    {
      label: "Total Submissions",
      value: statsData?.totalSubmission || 0,
      icon: <FiCheckCircle />,
      color: "bg-indigo-500",
    },
    {
      label: "Pending Submissions",
      value: statsData?.pendingSubmission || 0,
      icon: <FiClock />,
      color: "bg-yellow-500",
    },
    {
      label: "Total Earning",
      value: `🪙 ${statsData?.totalEarning || 0}`,
      icon: <FiDollarSign />,
      color: "bg-emerald-500",
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
                <th className="px-6 py-4 font-semibold text-center">
                  Payable Amount
                </th>
                <th className="px-6 py-4 font-semibold">Buyer Name</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {approvedSubmissions.map((sub) => (
                <tr
                  key={sub._id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {sub.task_title}
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-bold text-center">
                    🪙 {sub.payable_amount}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{sub.buyer_name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-emerald-500/20 tracking-wider">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
              {approvedSubmissions.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    No approved submissions yet.
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

export default WorkerHome;
