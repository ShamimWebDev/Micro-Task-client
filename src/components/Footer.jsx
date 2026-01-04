import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Send,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 pt-24 pb-12 overflow-hidden border-t border-slate-900">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link to="/" className="group flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-aurora rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
                <span className="text-white font-black text-xl">M</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Micro<span className="text-indigo-400">Task</span>
              </span>
            </Link>

            <p className="text-slate-500 font-medium leading-relaxed">
              We've built the future of micro-tasking. A global platform where
              talent meets opportunity at the speed of thought.
            </p>

            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Home", "Marketplace", "Leaderboard", "How it Works"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to="/"
                      className="group flex items-center gap-2 text-slate-500 hover:text-white font-bold text-sm transition-all"
                    >
                      {link}{" "}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                      />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal / Protection */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">
              Protection
            </h4>
            <ul className="space-y-4">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Fraud Prevention",
                "Contact Support",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-slate-500 hover:text-white font-bold text-sm transition-all"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">
              Contact Us
            </h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-500">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-indigo-400" />
                </div>
                <span className="text-sm font-bold">
                  123 Digital Stream, <br />
                  Vapor City, VC 101
                </span>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-6 pr-14 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 rounded-xl flex items-center justify-center text-white hover:bg-indigo-500 transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            &copy; {new Date().getFullYear()} MicroTask Platform. Version 2.4
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                Status: Online
              </span>
            </div>
            <div className="text-slate-500 hover:text-white transition-colors cursor-pointer">
              <Github size={16} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
