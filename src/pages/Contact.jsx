import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  User,
  Zap,
  Globe,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "../utils/cn";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-indigo-500" />
              <span className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px]">
                Communication Hub
              </span>
              <div className="w-12 h-[1px] bg-indigo-500" />
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
              Have questions about our platform? Need support or want to discuss
              enterprise solutions? Our team is here to help you succeed.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {[
                {
                  icon: <Mail size={24} />,
                  title: "Email Support",
                  info: "support@microtask.io",
                  subInfo: "24/7 Response Time",
                  color: "indigo",
                },
                {
                  icon: <Phone size={24} />,
                  title: "Phone",
                  info: "+1 (555) 123-4567",
                  subInfo: "Mon-Fri, 9AM-6PM EST",
                  color: "emerald",
                },
                {
                  icon: <MapPin size={24} />,
                  title: "Headquarters",
                  info: "San Francisco, CA",
                  subInfo: "United States",
                  color: "pink",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-all" />

                  <div className="relative flex items-start gap-4">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                        item.color === "indigo" &&
                          "bg-indigo-500/10 text-indigo-400",
                        item.color === "emerald" &&
                          "bg-emerald-500/10 text-emerald-400",
                        item.color === "pink" && "bg-pink-500/10 text-pink-400"
                      )}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-lg font-black text-white mb-1">
                        {item.info}
                      </p>
                      <p className="text-xs text-slate-500 font-bold">
                        {item.subInfo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Info */}
              <div className="glass-card p-8 rounded-[2.5rem] border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={18} className="text-indigo-400" />
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    Response Time
                  </h3>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Our support team typically responds within 2-4 hours during
                  business hours. For urgent matters, please mark your message
                  as high priority.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px]" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-indigo-400">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">
                        Send Message
                      </h2>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                        Secure Communication Channel
                      </p>
                    </div>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 text-center"
                    >
                      <div className="w-20 h-20 bg-emerald-500/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <CheckCircle2 size={40} className="text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-slate-500 font-medium max-w-md mx-auto">
                        Thank you for reaching out. Our team will get back to
                        you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="relative group">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                            Your Name
                          </label>
                          <div className="relative">
                            <User
                              className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                              size={18}
                            />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="John Doe"
                              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="relative group">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail
                              className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                              size={18}
                            />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="john@example.com"
                              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="relative group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                          Subject
                        </label>
                        <div className="relative">
                          <Globe
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                            size={18}
                          />
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="How can we help?"
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-16 pr-6 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="relative group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4">
                          Message
                        </label>
                        <div className="relative">
                          <MessageSquare
                            className="absolute left-6 top-6 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                            size={18}
                          />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="6"
                            placeholder="Tell us more about your inquiry..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-3xl py-6 pl-16 pr-6 text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner leading-relaxed"
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full py-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                      >
                        {loading ? (
                          <Zap className="animate-spin" size={16} />
                        ) : (
                          <Send
                            size={16}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          />
                        )}
                        {loading ? "Transmitting..." : "Send Message"}
                        {!loading && (
                          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
