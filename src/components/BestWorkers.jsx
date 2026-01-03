import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";
import { useEffect, useState } from "react";
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

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Top Performing</span> Workers
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Meet our dedicated professionals who have earned the most coins by
            delivering high-quality work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {workers.map((worker, index) => (
            <motion.div
              key={worker._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center hover:transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-pink-500 rounded-full blur opacity-50"></div>
                <img
                  src={
                    worker.photo ||
                    worker.photoURL ||
                    `https://ui-avatars.com/api/?name=${worker.name}&background=random`
                  }
                  alt={worker.name}
                  className="relative w-24 h-24 rounded-full border-2 border-white/20 object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-lg">
                  #{index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {worker.name}
              </h3>

              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 shadow-inner">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400">
                  <FiDollarSign className="w-4 h-4" />
                </span>
                <span className="text-yellow-400 font-bold">
                  {worker.coins?.toLocaleString() || 0} Coins
                </span>
              </div>
            </motion.div>
          ))}
          {workers.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500 italic">
              No workers found yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestWorkers;
