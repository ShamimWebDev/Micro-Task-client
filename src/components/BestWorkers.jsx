import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";

const BestWorkers = () => {
  // Mock data for top workers
  const workers = [
    {
      id: 1,
      name: "Sarah Johnson",
      coins: 15420,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      coins: 12350,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 3,
      name: "Emily Davis",
      coins: 11200,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 4,
      name: "David Wilson",
      coins: 9800,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 5,
      name: "Jessica Brown",
      coins: 8950,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 6,
      name: "James Taylor",
      coins: 7600,
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    },
  ];

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
              key={worker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur opacity-50"></div>
                <img
                  src={worker.image}
                  alt={worker.name}
                  className="relative w-24 h-24 rounded-full border-2 border-white/20 object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  #{index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {worker.name}
              </h3>

              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400/20 text-yellow-400">
                  <FiDollarSign className="w-4 h-4" />
                </span>
                <span className="text-yellow-400 font-bold">
                  {worker.coins.toLocaleString()} Coins
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestWorkers;
