import { motion } from "framer-motion";

const PlatformStats = () => {
  const stats = [
    { label: "Active Workers", value: "10K+", delay: 0 },
    { label: "Tasks Completed", value: "250K+", delay: 0.1 },
    { label: "Successful Payments", value: "$500K+", delay: 0.2 },
    { label: "Client Satisfaction", value: "99%", delay: 0.3 },
  ];

  return (
    <section className="py-16 bg-linear-to-r from-indigo-900 via-purple-900 to-indigo-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-indigo-200 text-lg uppercase tracking-wider font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
