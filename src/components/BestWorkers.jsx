import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trophy, Coins, Star, Award } from "lucide-react";
import { axiosPublic } from "../hooks/useAxios";

const BestWorkers = () => {
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

  if (loading) return null;

  const getRankStyle = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-500 text-yellow-950 shadow-[0_0_20px_rgba(234,179,8,0.4)]";
      case 1:
        return "bg-slate-300 text-slate-900 shadow-[0_0_20px_rgba(203,213,225,0.4)]";
      case 2:
        return "bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]";
      default:
        return "bg-slate-800 text-slate-400";
    }
  };

  return (
    <section id="leaderboard" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-indigo-500" />
              <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Leaderboard
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              Elite <span className="text-gradient">Taskmasters</span>
            </h2>
            <p className="text-lg text-slate-500 mt-6 font-medium">
              Celebrating the architects of our digital economy. These
              high-performing professionals consistently deliver world-class
              results.
            </p>
          </div>

          <div className="flex -space-x-4">
            {workers.slice(0, 5).map((w, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full border-4 border-slate-950 overflow-hidden shadow-2xl"
              >
                <img
                  src={w.photo || w.photoURL}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-400">
              +{workers.length > 5 ? workers.length - 5 : 0}
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {workers.map((worker, index) => (
            <motion.div
              key={worker._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative glass-card p-10 rounded-[3rem] text-center hover:border-indigo-500/30"
            >
              {/* Rank Badge */}
              <div
                className={`absolute top-8 right-8 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm z-20 ${getRankStyle(
                  index
                )}`}
              >
                {index < 3 ? <Trophy size={16} /> : `#${index + 1}`}
              </div>

              {/* Profile Image & Aura */}
              <div className="relative mx-auto mb-10 w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 group-hover:border-indigo-500/50 transition-colors duration-500">
                  <img
                    src={
                      worker.photo ||
                      worker.photoURL ||
                      `https://ui-avatars.com/api/?name=${worker.name}&background=random`
                    }
                    alt={worker.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {index === 0 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-yellow-950 p-1.5 rounded-full shadow-lg z-30 ring-4 ring-slate-950">
                    <Star size={14} fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                {worker.name}
              </h3>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">
                Verified Specialist
              </p>

              <div className="h-[1px] w-12 bg-slate-800 mx-auto mb-8" />

              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-yellow-500 font-black text-xl">
                    <Coins size={18} />
                    {worker.coins?.toLocaleString()}
                  </div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">
                    Total Earning
                  </p>
                </div>

                <div className="w-[1px] h-10 bg-slate-800" />

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-black text-xl">
                    <Award size={18} />
                    {index < 3 ? "Elite" : "Pro"}
                  </div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">
                    Tier Level
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {workers.length === 0 && (
            <div className="col-span-full py-32 text-center glass-card rounded-[3rem] border-dashed border-slate-800">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Waiting for the first legend...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestWorkers;
