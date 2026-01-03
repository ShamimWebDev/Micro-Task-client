const PaymentHistory = () => {
  // Mock Payment History
  const history = [
    {
      id: "PAY-123",
      amount: 10,
      coins: 150,
      date: "2026-01-02",
      status: "Success",
    },
    {
      id: "PAY-456",
      amount: 20,
      coins: 500,
      date: "2025-12-28",
      status: "Success",
    },
    {
      id: "PAY-789",
      amount: 1,
      coins: 10,
      date: "2025-12-15",
      status: "Success",
    },
    {
      id: "PAY-101",
      amount: 35,
      coins: 1000,
      date: "2025-11-20",
      status: "Success",
    },
  ];

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
                  key={pay.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-indigo-400 font-mono text-sm">
                    {pay.id}
                  </td>
                  <td className="px-6 py-4 text-white font-bold">
                    ${pay.amount}
                  </td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">
                    +{pay.coins} 🪙
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm italic">
                    {pay.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold px-2 py-1 rounded-full border border-emerald-500/20 tracking-wider">
                      {pay.status}
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

export default PaymentHistory;
