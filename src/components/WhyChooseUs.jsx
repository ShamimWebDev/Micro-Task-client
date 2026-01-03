import { motion } from "framer-motion";
import { FiShield, FiZap, FiUsers, FiAward } from "react-icons/fi";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FiShield className="w-12 h-12 text-indigo-400" />,
      title: "Safe & Secure",
      description:
        "Advanced fraud protection and secure payment gateways to keep your funds safe.",
    },
    {
      icon: <FiZap className="w-12 h-12 text-pink-400" />,
      title: "Fast Payments",
      description:
        "Withdraw your earnings instantly to your preferred payment method.",
    },
    {
      icon: <FiUsers className="w-12 h-12 text-yellow-400" />,
      title: "Active Community",
      description:
        "Join thousands of active workers and buyers collaborating daily.",
    },
    {
      icon: <FiAward className="w-12 h-12 text-emerald-400" />,
      title: "Quality Work",
      description:
        "Our rating system ensures you get high-quality work every time.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-900 border-t border-slate-700">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Why We Are The <br />
              <span className="text-gradient">Best Choice</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Our platform is designed with both workers and buyers in mind. We
              prioritize security, speed, and user experience to provide the
              best micro-tasking environment.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-indigo-500/30">
              Learn More About Us
            </button>
          </motion.div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass bg-slate-800/50 p-6 rounded-2xl hover:bg-slate-800/80 transition-all border border-slate-700/50"
              >
                <div className="mb-4 bg-slate-900/50 w-fit p-3 rounded-xl border border-slate-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
