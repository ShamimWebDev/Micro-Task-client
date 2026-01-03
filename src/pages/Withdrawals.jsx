import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useUserData } from "../hooks/useUserData";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiCreditCard,
  FiHash,
  FiAlertCircle,
} from "react-icons/fi";
import { axiosSecure } from "../hooks/useAxios";

const Withdrawals = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, isUserLoading] = useUserData();
  const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
  const [loading, setLoading] = useState(false);

  if (isUserLoading) return null;

  const userCoins = dbUser?.coins || 0;
  const withdrawalAmount = (coinsToWithdraw / 20).toFixed(2);
  const canWithdraw = userCoins >= 200;

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const system = form.payment_system.value;
    const accountNumber = form.account_number.value;

    if (coinsToWithdraw < 200) {
      alert("Minimum withdrawal is 200 coins ($10).");
      setLoading(false);
      return;
    }

    if (coinsToWithdraw > userCoins) {
      alert("You don't have enough coins.");
      setLoading(false);
      return;
    }

    const withdrawalData = {
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdrawal_coin: coinsToWithdraw,
      withdrawal_amount: parseFloat(withdrawalAmount),
      payment_system: system,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    try {
      await axiosSecure.post("/withdrawals", withdrawalData);
      alert(`Withdrawal request of $${withdrawalAmount} sent successfully!`);
      form.reset();
      setCoinsToWithdraw(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-10 animate-fadeIn">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Withdraw Earnings
        </h1>
        <p className="text-slate-400">
          Convert your hard-earned coins into real money.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
        <div className="lg:col-span-1 glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-center">
          <p className="text-slate-400 text-sm mb-2">Your Current Balance</p>
          <h3 className="text-4xl font-bold text-yellow-400 mb-2">
            🪙 {userCoins}
          </h3>
          <p className="text-indigo-400 font-bold">
            = ${(userCoins / 20).toFixed(2)}
          </p>
          <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500 italic">
            20 Coins = $1.00 USD <br />
            Minimum Withdrawal: 200 Coins ($10.00)
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-slate-800">
          {!canWithdraw ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 py-10">
              <FiAlertCircle className="text-red-500 text-5xl" />
              <h3 className="text-xl font-bold text-white">
                Insufficient Balance
              </h3>
              <p className="text-slate-400">
                You need at least 200 coins to make a withdrawal request. Keep
                working to earn more!
              </p>
            </div>
          ) : (
            <form onSubmit={handleWithdraw} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-slate-400 text-sm mb-2 block font-medium">
                    Coins to Withdraw
                  </label>
                  <div className="relative">
                    <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      name="withdrawal_coin"
                      type="number"
                      min="200"
                      max={userCoins}
                      value={coinsToWithdraw}
                      onChange={(e) =>
                        setCoinsToWithdraw(parseInt(e.target.value) || 0)
                      }
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-2 block font-medium">
                    Equal to ($)
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      readOnly
                      value={withdrawalAmount}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-indigo-400 font-bold focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-2 block font-medium">
                    Payment System
                  </label>
                  <div className="relative">
                    <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <select
                      name="payment_system"
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 appearance-none"
                    >
                      <option value="bkash">bkash</option>
                      <option value="rocket">rocket</option>
                      <option value="nagad">nagad</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-2 block font-medium">
                    Account Number
                  </label>
                  <input
                    name="account_number"
                    type="text"
                    placeholder="e.g. 017xxxxxxxx"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || coinsToWithdraw < 200}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 text-lg mt-4"
              >
                {loading ? "Processing..." : "Submit Withdrawal Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;
