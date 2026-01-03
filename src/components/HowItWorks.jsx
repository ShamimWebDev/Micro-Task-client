import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  CheckSquare,
  Wallet,
  ArrowRight,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <UserPlus className="w-6 h-6" />,
      title: "Create Profile",
      description:
        "Initialize your professional identity in our high-trust network.",
      color: "text-indigo-400",
      glow: "shadow-indigo-500/20",
    },
    {
      id: 2,
      icon: <Search className="w-6 h-6" />,
      title: "Discover Missions",
      description:
        "Navigate through a diverse landscape of verified micro-tasks.",
      color: "text-pink-400",
      glow: "shadow-pink-500/20",
    },
    {
      id: 3,
      icon: <CheckSquare className="w-6 h-6" />,
      title: "Execute & Submit",
      description: "Deliver precision results and upload your digital proof.",
      color: "text-emerald-400",
      glow: "shadow-emerald-500/20",
    },
    {
      id: 4,
      icon: <Wallet className="w-6 h-6" />,
      title: "Instant Liquidity",
      description: "Withdraw your earnings via our automated payout engine.",
      color: "text-yellow-400",
      glow: "shadow-yellow-500/20",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Workflow
            </span>
            <div className="w-12 h-[1px] bg-indigo-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="text-lg text-slate-500 mt-6 font-medium max-w-2xl mx-auto">
            Our streamlined ecosystem is designed for speed. From registration
            to payout, experience a frictionless journey.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-0 w-full h-[1px] bg-slate-800 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative z-10 text-center"
            >
              {/* Icon Container */}
              <div className={`relative w-24 h-24 mx-auto mb-10 group`}>
                <div
                  className={`absolute inset-0 bg-slate-900 rounded-[2rem] border border-slate-800 transition-all duration-500 group-hover:rotate-12 group-hover:border-white/20`}
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center ${step.color} transition-transform duration-500 group-hover:scale-110`}
                >
                  {step.icon}
                </div>

                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-white font-black text-xs shadow-2xl">
                  0{step.id}
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-4">
                {step.title}
              </h3>

              <p className="text-sm font-medium text-slate-500 leading-relaxed px-4">
                {step.description}
              </p>

              {/* Mobile Mobile Indicator */}
              {index < steps.length - 1 && (
                <div className="lg:hidden mt-8 flex justify-center text-slate-800">
                  <ArrowRight size={24} className="rotate-90 md:rotate-0" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
