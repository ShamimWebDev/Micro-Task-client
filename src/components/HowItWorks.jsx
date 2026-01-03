import { motion } from "framer-motion";
import {
  FiUserPlus,
  FiSearch,
  FiCheckSquare,
  FiDollarSign,
} from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FiUserPlus className="w-8 h-8" />,
      title: "Register",
      description: "Sign up for free and create your account in seconds.",
    },
    {
      id: 2,
      icon: <FiSearch className="w-8 h-8" />,
      title: "Find Tasks",
      description: "Browse through hundreds of micro-tasks available.",
    },
    {
      id: 3,
      icon: <FiCheckSquare className="w-8 h-8" />,
      title: "Complete Work",
      description: "Submit your proof of work for the buyer to review.",
    },
    {
      id: 4,
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Get Paid",
      description: "Receive coins instantly after approval and withdraw.",
    },
  ];

  return (
    <section className="py-20 bg-slate-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Earning money has never been this simple. Follow these 4 easy steps
            to start your journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-2xl h-full text-center hover:bg-slate-700/50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 mb-6 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400">{step.description}</p>
              </div>

              {/* Connecting Line (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-600 transform -translate-y-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
