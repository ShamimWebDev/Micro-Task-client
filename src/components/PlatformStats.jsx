import { motion } from "framer-motion";
import { Users, CheckCircle2, DollarSign, Heart } from "lucide-react";

const PlatformStats = () => {
  const stats = [
    {
      label: "Global Workforce",
      value: "10K+",
      icon: <Users className="text-indigo-400" />,
      color: "from-indigo-500/10 to-transparent",
      borderColor: "border-indigo-500/20",
    },
    {
      label: "Success Rate",
      value: "99.8%",
      icon: <CheckCircle2 className="text-emerald-400" />,
      color: "from-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Weekly Payouts",
      value: "$500K+",
      icon: <DollarSign className="text-yellow-400" />,
      color: "from-yellow-500/10 to-transparent",
      borderColor: "border-yellow-500/20",
    },
    {
      label: "Client Love",
      value: "99%",
      icon: <Heart className="text-pink-400" />,
      color: "from-pink-500/10 to-transparent",
      borderColor: "border-pink-500/20",
    },
  ];

  return (
    <section className="relative py-24 mb-20">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative overflow-hidden glass-card p-8 rounded-[2rem] border ${stat.borderColor} hover:border-white/20`}
            >
              {/* Card Accent Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl glass border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">
                  {stat.value}
                </h3>

                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                  {stat.label}
                </p>

                {/* Decorative Dots */}
                <div className="flex gap-1.5 mt-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
