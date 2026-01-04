import { motion } from "framer-motion";
import { Shield, Zap, Users2, Award, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-indigo-400" />,
      title: "Secure Transactions",
      description:
        "Advanced security and encrypted payments ensure total safety.",
      gradient: "from-indigo-500/10 to-transparent",
    },
    {
      icon: <Zap className="w-6 h-6 text-pink-400" />,
      title: "Fast Payments",
      description:
        "Your earnings are available as soon as the task is verified. No waiting periods.",
      gradient: "from-pink-500/10 to-transparent",
    },
    {
      icon: <Users2 className="w-6 h-6 text-emerald-400" />,
      title: "Verified Users",
      description:
        "A global community of verified experts delivering high-quality results.",
      gradient: "from-emerald-500/10 to-transparent",
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-400" />,
      title: "Premium Standards",
      description:
        "Our dual-layered rating system maintains a high bar for quality and speed.",
      gradient: "from-yellow-500/10 to-transparent",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] -translate-x-1/2 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-indigo-500" />
                <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
                  Exceptional Value
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.1] mb-8">
                Why professionals <br /> choose our{" "}
                <span className="text-gradient">platform</span>
              </h2>

              <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg font-medium">
                We've re-engineered the micro-tasking landscape. By combining
                advanced security measures with instant payments, we provide an
                environment where talent meets opportunity at scale.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all">
                  Join as a Worker <ArrowUpRight size={18} />
                </button>
                <button className="flex items-center gap-2 glass px-8 py-4 rounded-2xl font-black text-sm text-white hover:bg-white/5 transition-all">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Features Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative glass-card p-8 rounded-[2.5rem] overflow-hidden hover:border-white/20"
              >
                {/* Accent Glow */}
                <div
                  className={cn(
                    `relative bg-slate-900 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-300 group overflow-hidden bg-linear-to-br ${feature.gradient}`
                  )}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
