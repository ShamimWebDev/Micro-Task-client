import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiBell } from "react-icons/fi";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { axiosSecure } from "../hooks/useAxios";
import { useUserData } from "../hooks/useUserData";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dbUser] = useUserData();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const coins = dbUser?.coins || 0;

  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const notifyRef = useRef();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/notifications/${user.email}`)
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setIsNotifyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gradient">
              MicroTask
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <span className="text-yellow-400 font-semibold px-3 py-2 text-sm flex items-center gap-1">
                    🪙 {coins}
                  </span>
                </>
              )}

              <a
                href="https://github.com/ShamimWebDev/Micro-Task-client"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-slate-600"
              >
                <FiGithub /> Join as Developer
              </a>

              {user && (
                <div className="relative" ref={notifyRef}>
                  <button
                    onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                    className="p-2 text-slate-400 hover:text-white transition-colors relative"
                  >
                    <FiBell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
                  </button>

                  {/* Notification Pop-up */}
                  {isNotifyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute right-0 mt-3 w-80 glass-card rounded-2xl border border-slate-800 shadow-2xl p-4 overflow-hidden"
                    >
                      <h4 className="text-white font-bold mb-4 px-2">
                        Notifications
                      </h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-slate-900/50 hover:scrollbar-thumb-indigo-500">
                        {notifications.map((n) => (
                          <div
                            key={n._id}
                            className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all group cursor-pointer"
                          >
                            <p className="text-slate-300 text-xs leading-relaxed group-hover:text-white">
                              {n.message}
                            </p>
                            <span className="text-slate-600 text-[10px] mt-2 block italic text-right">
                              {new Date(n.time).toLocaleString()}
                            </span>
                          </div>
                        ))}
                        {notifications.length === 0 && (
                          <p className="text-center text-slate-500 text-sm py-10 italic">
                            No notifications yet.
                          </p>
                        )}
                      </div>
                      <button className="w-full text-center text-xs text-indigo-400 mt-4 font-bold hover:text-indigo-300 transition-colors">
                        Mark all as read
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {user && (
                <div className="ml-4 flex items-center gap-3">
                  <img
                    className="h-8 w-8 rounded-full border border-gray-600 object-cover"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden glass border-t border-gray-700"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                  <span className="text-yellow-400 font-semibold text-sm">
                    Available Coins: {coins}
                  </span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <img
                    className="h-10 w-10 rounded-full border border-gray-600 object-cover"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            <a
              href="https://github.com/ShamimWebDev/Micro-Task-client"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
            >
              <FiGithub /> Join as Developer
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
