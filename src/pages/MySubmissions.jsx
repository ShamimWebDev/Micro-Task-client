import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);

  // Mock Submissions
  const submissions = [
    {
      id: 1,
      task_title: "Watch YT Video",
      payable_amount: 15,
      buyer_name: "Creative Labs",
      status: "pending",
      date: "2026-01-03",
    },
    {
      id: 2,
      task_title: "App Download",
      payable_amount: 45,
      buyer_name: "Game Studio",
      status: "approved",
      date: "2026-01-02",
    },
    {
      id: 3,
      task_title: "Social Share",
      payable_amount: 10,
      buyer_name: "Startup Hub",
      status: "rejected",
      date: "2026-01-01",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">My Submissions</h1>
        <p className="text-slate-400">
          History of all tasks you have worked on.
        </p>
      </header>

      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Task Title</th>
                <th className="px-6 py-4 font-semibold">Buyer Name</th>
                <th className="px-6 py-4 font-semibold">Payable</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {sub.task_title}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{sub.buyer_name}</td>
                  <td className="px-6 py-4 text-yellow-400 font-bold">
                    🪙 {sub.payable_amount}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm italic">
                    {sub.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full border tracking-wider ${getStatusStyle(
                        sub.status
                      )}`}
                    >
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

export default MySubmissions;
