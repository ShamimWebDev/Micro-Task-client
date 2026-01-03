import { motion } from "framer-motion";
import { FiDollarSign, FiCheckCircle } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { axiosSecure } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const PurchaseCoin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const packages = [
    { coins: 10, price: 1, color: "from-blue-500 to-indigo-500" },
    { coins: 150, price: 10, color: "from-indigo-500 to-purple-500" },
    { coins: 500, price: 20, color: "from-purple-500 to-pink-500" },
    { coins: 1000, price: 35, color: "from-pink-500 to-rose-500" },
  ];

  const handlePurchase = async (pkg) => {
    const confirm = window.confirm(
      `Proceed to pay $${pkg.price} for ${pkg.coins} coins?`
    );
    if (confirm) {
      try {
        const paymentInfo = {
          email: user?.email,
          coins: pkg.coins,
          price: pkg.price,
          date: new Date().toISOString(),
          transactionId: `TXN-${Math.random()
            .toString(36)
            .substr(2, 9)
            .toUpperCase()}`,
        };
        await axiosSecure.post("/payments", paymentInfo);
        alert(
          `Payment of $${pkg.price} successful! Your balance has been updated with ${pkg.coins} coins.`
        );
        navigate("/dashboard/payment-history");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-12 py-6 animate-fadeIn">
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Top Up Your <span className="text-gradient">Coins</span>
        </h1>
        <p className="text-slate-400">
          Choose a package that fits your needs. More coins allow you to post
          more tasks and grow your reach.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col items-center text-center relative hover:border-indigo-500/50 transition-all group"
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-linear-to-br ${pkg.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform`}
            >
              <FiDollarSign />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {pkg.coins} Coins
            </h3>
            <p className="text-slate-400 mb-8 font-medium">For ${pkg.price}</p>

            <div className="space-y-3 mb-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-500" /> Instant Delivery
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-500" /> Secure Payment
              </div>
            </div>

            <button
              onClick={() => handlePurchase(pkg)}
              className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all border border-slate-700 group-hover:border-indigo-400"
            >
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-indigo-600/5 mt-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
            <FiDollarSign size={40} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">
              Need a custom package?
            </h4>
            <p className="text-slate-400">
              For large scale task campaigns, please contact our sales team for
              discounted bulk pricing.
            </p>
          </div>
          <button className="md:ml-auto whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoin;
