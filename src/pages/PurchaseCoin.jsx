import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ZapOff,
  Star,
  Gem,
  Crown,
  Layers,
  ArrowRight,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PurchaseCoin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const packages = [
    {
      coins: 10,
      price: 1,
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30",
      icon: <Zap size={24} className="text-blue-400" />,
      label: "Start-up Link",
    },
    {
      coins: 150,
      price: 10,
      color: "from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-500/30",
      icon: <Layers size={24} className="text-indigo-400" />,
      label: "Operational Core",
    },
    {
      coins: 500,
      price: 20,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      icon: <Gem size={24} className="text-purple-400" />,
      label: "Premium Sector",
      popular: true,
    },
    {
      coins: 1000,
      price: 35,
      color: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
      icon: <Crown size={24} className="text-rose-400" />,
      label: "Elite Network",
    },
  ];

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Cinematic Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-indigo-500" />
          <span className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px]">
            Liquidity Center
          </span>
          <div className="w-12 h-px bg-indigo-500" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
          Acquire <span className="text-gradient">Operational</span> Credits
        </h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">
          Scale your mission reach with vetted liquidity. Secure instant credit
          allocation through our encrypted financial architecture.
        </p>
      </motion.header>

      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "group relative glass-card p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_0_50px_rgba(79,70,229,0.1)]",
              pkg.popular && "border-indigo-500/30 bg-indigo-500/[0.03]"
            )}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-600/20">
                <Star size={10} fill="currentColor" /> Recommend
              </div>
            )}

            <div
              className={cn(
                "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110",
                pkg.color
              )}
            >
              {pkg.icon}
            </div>

            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
              {pkg.label}
            </p>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">
              {pkg.coins.toLocaleString()}{" "}
              <span className="text-xs text-slate-600 align-top mt-1 inline-block ml-1">
                COINS
              </span>
            </h3>
            <p className="text-indigo-400 font-black text-xl mb-10 tracking-tight">
              ${pkg.price}.00
            </p>

            <div className="space-y-4 mb-10 w-full">
              {[
                { icon: <Zap size={12} />, label: "Instant Signal" },
                { icon: <ShieldCheck size={12} />, label: "Secure Link" },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 py-3 rounded-2xl"
                >
                  <span className="text-indigo-500">{feat.icon}</span>
                  {feat.label}
                </div>
              ))}
            </div>

            <button
              onClick={() => handlePurchase(pkg)}
              className={cn(
                "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95 group/btn",
                pkg.popular
                  ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-white/5"
              )}
            >
              Authorize{" "}
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Enterprise Promo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] group-hover:bg-indigo-600/10 transition-colors pointer-events-none rounded-full" />
        <div className="glass-card p-12 rounded-[3rem] border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px]" />

          <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center text-indigo-400 shadow-inner shrink-0 group-hover:rotate-6 transition-transform">
            <Star size={32} />
          </div>

          <div className="grow">
            <h4 className="text-2xl font-black text-white mb-2 tracking-tight">
              Enterprise Scaling?
            </h4>
            <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
              For missions requiring high-volume liquidity (5,000+ credits), our
              architectural consultants can provide preferential baseline rates.
            </p>
          </div>

          <button className="whitespace-nowrap bg-white text-slate-950 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95">
            Secure Consultation
          </button>
        </div>
      </motion.div>

      {/* Stripe Payment Modal */}
      <AnimatePresence>
        {showModal && selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign size={28} className="text-indigo-400" />
                </div>
                <h2 className="text-2xl font-black text-white">
                  Secure Payment
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Complete your coin purchase with Stripe
                </p>
              </div>

              {/* Stripe Elements */}
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  selectedPackage={selectedPackage}
                  onClose={closeModal}
                />
              </Elements>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseCoin;
