import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  Award,
  Zap,
  Target,
  Users,
} from "lucide-react";
import { axiosPublic } from "../hooks/useAxios";
import { cn } from "../utils/cn";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Leaderboard = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/top-workers")
      .then((res) => {
        setWorkers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getRankConfig = (index) => {
    switch (index) {
      case 0:
        return {
          icon: (
            <Crown size={32} className="text-yellow-400" fill="currentColor" />
          ),
          badge: "Champion",
          gradient: "from-yellow-500/20 to-amber-500/20",
          borderColor: "border-yellow-500/30",
          glow: "shadow-[0_0_40px_rgba(234,179,8,0.3)]",
        };
      case 1:
        return {
          icon: <Medal size={28} className="text-slate-300" />,
          badge: "Elite",
          gradient: "from-slate-400/20 to-slate-500/20",
          borderColor: "border-slate-400/30",
          glow: "shadow-[0_0_30px_rgba(148,163,184,0.2)]",
        };
      case 2:
        return {
          icon: <Medal size={28} className="text-amber-600" />,
          badge: "Master",
          gradient: "from-amber-600/20 to-amber-700/20",
          borderColor: "border-amber-600/30",
          glow: "shadow-[0_0_30px_rgba(217,119,6,0.2)]",
        };
      default:
        return {
          icon: <Star size={20} className="text-indigo-400" />,
          badge: "Worker",
          gradient: "from-indigo-500/10 to-purple-500/10",
          borderColor: "border-white/5",
          glow: "",
        };
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="grow">
        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-indigo-500" />
              <span className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px]">
                Top Rated
              </span>
              <div className="w-12 h-px bg-indigo-500" />
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight mb-6">
              Top <span className="text-gradient">Workers</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
              Celebrating the most dedicated workers on our platform. Rankings
              based on verified completed tasks and excellence ratings.
            </p>
          </motion.header>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {[
              {
                icon: <Users size={24} />,
                label: "Active Workers",
                value: workers.length,
                color: "indigo",
              },
              {
                icon: <Target size={24} />,
                label: "Tasks Completed",
                value: workers.reduce(
                  (sum, w) => sum + (w.completedTasks || 0),
                  0
                ),
                color: "emerald",
              },
              {
                icon: <Zap size={24} fill="currentColor" />,
                label: "Total Earnings",
                value: `${workers
                  .reduce((sum, w) => sum + (w.totalEarnings || 0), 0)
                  .toLocaleString()} Coins`,
                color: "yellow",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-3xl border border-white/5 flex items-center gap-4"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                    stat.color === "indigo" &&
                      "bg-indigo-500/10 text-indigo-400",
                    stat.color === "emerald" &&
                      "bg-emerald-500/10 text-emerald-400",
                    stat.color === "yellow" &&
                      "bg-yellow-500/10 text-yellow-400"
                  )}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Leaderboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workers.map((worker, index) => {
              const config = getRankConfig(index);
              return (
                <motion.div
                  key={worker._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative glass-card rounded-[3rem] border overflow-hidden transition-all duration-500",
                    config.borderColor,
                    config.glow,
                    index < 3 ? "lg:col-span-1" : ""
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    )}
                  />

                  <div className="relative p-10 flex flex-col items-center text-center">
                    {/* Rank Badge */}
                    <div className="absolute top-6 right-6 w-12 h-12 glass rounded-2xl flex items-center justify-center text-white font-black text-lg border border-white/10">
                      #{index + 1}
                    </div>

                    {/* Rank Icon */}
                    <div className="mb-6">{config.icon}</div>

                    {/* Profile Image */}
                    <div className="relative mb-6">
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full blur-xl opacity-50",
                          index === 0 && "bg-yellow-500",
                          index === 1 && "bg-slate-400",
                          index === 2 && "bg-amber-600",
                          index > 2 && "bg-indigo-500"
                        )}
                      />
                      <img
                        src={worker.photo || worker.photoURL}
                        alt={worker.name}
                        className="relative w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                      />
                    </div>

                    {/* Name & Badge */}
                    <h3 className="text-xl font-black text-white mb-2 tracking-tight">
                      {worker.name}
                    </h3>
                    <div
                      className={cn(
                        "text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-xl mb-6",
                        index === 0 &&
                          "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
                        index === 1 &&
                          "bg-slate-400/20 text-slate-300 border border-slate-400/30",
                        index === 2 &&
                          "bg-amber-600/20 text-amber-500 border border-amber-600/30",
                        index > 2 &&
                          "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                      )}
                    >
                      {config.badge}
                    </div>

                    {/* Stats */}
                    <div className="grow space-y-6">
                      <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Tasks
                        </span>
                        <span className="text-lg font-black text-white">
                          {worker.completedTasks || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Earnings
                        </span>
                        <span className="text-lg font-black text-yellow-500">
                          {worker.totalEarnings || 0}
                        </span>
                      </div>
                    </div>

                    {/* Trophy for top 3 */}
                    {index < 3 && (
                      <div className="mt-6 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-600">
                        <Trophy size={14} />
                        Top Performer
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {workers.length === 0 && (
            <div className="text-center py-32">
              <div className="w-20 h-20 glass rounded-3xl mx-auto mb-8 flex items-center justify-center text-slate-700">
                <Award size={40} />
              </div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">
                Loading Leaderboard...
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
