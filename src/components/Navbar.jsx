import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  LogOut,
  LayoutDashboard,
  User,
  Coins,
  ChevronDown,
  Bell,
} from "lucide-react";
import { AuthContext } from "../providers/AuthProvider";
import { useUserData } from "../hooks/useUserData";
import NotificationDropdown from "./NotificationDropdown";
import { cn } from "../utils/cn";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dbUser] = useUserData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const coins = dbUser?.coins || 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-500 px-4 py-4 md:px-8",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-2xl transition-all duration-500",
          scrolled
            ? "glass-nav shadow-2xl scale-[0.98] py-2 px-6"
            : "bg-transparent py-2 px-0"
        )}
      >
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-aurora rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
                <span className="text-white font-black text-xl">M</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white hidden sm:block">
                Micro<span className="text-indigo-400">Task</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 hover:text-indigo-400",
                    pathname === link.path
                      ? "text-indigo-400"
                      : "text-slate-300"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <Link
                  to="/dashboard"
                  className={cn(
                    "text-sm font-medium transition-all duration-300 hover:text-indigo-400 flex items-center gap-2",
                    pathname.startsWith("/dashboard")
                      ? "text-indigo-400"
                      : "text-slate-300"
                  )}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              )}
            </div>

            <div className="h-6 w-[1px] bg-slate-800" />

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/25 border border-indigo-500/50"
                  >
                    Join Now
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <div className="hidden lg:flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1.5">
                    <Coins size={16} className="text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-500">
                      {coins}
                    </span>
                  </div>

                  <NotificationDropdown userEmail={user.email} />

                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-800"
                    >
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/30">
                        <img
                          src={user?.photoURL}
                          alt={user?.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <ChevronDown
                        size={16}
                        className={cn(
                          "text-slate-400 transition-transform duration-300",
                          showProfileMenu && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                      {showProfileMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-64 glass-card rounded-2xl p-2 shadow-2xl z-[60]"
                        >
                          <div className="px-4 py-3 border-b border-slate-800/50 mb-2">
                            <p className="text-sm font-bold text-white truncate">
                              {user.displayName}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {user.email}
                            </p>
                          </div>

                          <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-indigo-600/10 rounded-xl transition-all"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <LayoutDashboard
                              size={18}
                              className="text-indigo-400"
                            />
                            Dashboard
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                            <LogOut size={18} />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                <Coins size={14} className="text-yellow-400" />
                <span className="text-xs font-black text-yellow-500">
                  {coins}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass rounded-3xl mt-4 overflow-hidden shadow-2xl border border-slate-800"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-slate-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-[1px] bg-slate-800 my-4" />

              {!user ? (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-3 rounded-2xl border border-slate-800 text-white font-bold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-3 rounded-2xl bg-indigo-600 text-white font-bold"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 py-3 text-slate-300"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-3 text-red-400 w-full"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
