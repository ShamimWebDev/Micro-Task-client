import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { axiosSecure } from "../hooks/useAxios";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/${user.email}`)
        .then((res) => {
          setHistory(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Payment History</h1>
        <p className="text-slate-400">
          Track all your coin purchases and transactions.
        </p>
      </header>

      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Amount Paid</th>
                <th className="px-6 py-4 font-semibold">Coins Added</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {history.map((pay) => (
                <tr
                  key={pay._id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-indigo-400 font-mono text-sm">
                    {pay.transactionId}
                  </td>
                  <td className="px-6 py-4 text-white font-bold">
                    ${pay.price}
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">
                    +{pay.coins} 🪙
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm italic">
                    {new Date(pay.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold px-2 py-1 rounded-full border border-emerald-500/20 tracking-wider">
                      Success
                    </span>
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    No payment history found.
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

export default PaymentHistory;
