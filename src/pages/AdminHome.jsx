import { motion } from "framer-motion";
import { FiUsers, FiDollarSign, FiClock, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";

const AdminHome = () => {
  // Mock States for Admin
  const stats = [
    {
      label: "Total Workers",
      value: 156,
      icon: <FiUsers />,
      color: "bg-blue-500",
    },
    {
      label: "Total Buyers",
      value: 42,
      icon: <FiUsers />,
      color: "bg-indigo-500",
    },
    {
      label: "Total Coins",
      value: "🪙 15.4K",
      icon: <FiDollarSign />,
      color: "bg-yellow-500",
    },
    {
      label: "Total Payments",
      value: "$4,250",
      icon: <FiCheckCircle />,
      color: "bg-emerald-500",
    },
  ];

  // Mock Withdrawal Requests
  const [withdrawRequests, setWithdrawRequests] = useState([
    {
      id: 1,
      worker_name: "Alice Smith",
      worker_email: "alice@example.com",
      withdrawal_coin: 500,
      withdrawal_amount: 25,
      payment_system: "bkash",
      account_number: "01712345678",
      status: "pending",
    },
    {
      id: 2,
      worker_name: "Bob Jones",
      worker_email: "bob@example.com",
      withdrawal_coin: 200,
      withdrawal_amount: 10,
      payment_system: "nagad",
      account_number: "01987654321",
      status: "pending",
    },
  ]);

  const handlePaymentSuccess = (id) => {
    setWithdrawRequests(withdrawRequests.filter((req) => req.id !== id));
    alert("Payment Successful! User coins deducted and status updated.");
  };

  return (
    <div className="space-y-10 animate-fadeIn overflow-hidden">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">System overview and management.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-slate-800"
          >
            <div className={`${stat.color} p-3 rounded-xl text-white text-xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-xl font-bold text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Withdrawal Requests Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Withdrawal Requests</h2>
          <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/20 uppercase">
            {withdrawRequests.length} Pending
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Worker Info</th>
                <th className="px-6 py-4">Withdraw Info</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {withdrawRequests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">
                      {req.worker_name}
                    </div>
                    <div className="text-slate-500 text-xs italic">
                      {req.worker_email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-yellow-400 font-bold">
                      🪙 {req.withdrawal_coin}
                    </div>
                    <div className="text-indigo-400 text-xs font-bold">
                      ${req.withdrawal_amount}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white text-sm uppercase font-semibold">
                      {req.payment_system}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {req.account_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handlePaymentSuccess(req.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
                    >
                      Payment Success
                    </button>
                  </td>
                </tr>
              ))}
              {withdrawRequests.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    No pending withdrawal requests.
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

export default AdminHome;
