import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiGithub } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  // Mock logged in state for design integration
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useState({
    displayName: "John Doe",
    photoURL: "https://ui-avatars.com/api/?name=John+Doe",
    coins: 150,
  });

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
              {!isLoggedIn ? (
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
                    to="/"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <span className="text-yellow-400 font-semibold px-3 py-2 text-sm">
                    🪙 {user.coins}
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

              {isLoggedIn && (
                <div className="ml-4 flex items-center gap-3">
                  <img
                    className="h-8 w-8 rounded-full border border-gray-600"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                  <button
                    onClick={() => setIsLoggedIn(false)}
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
            {!isLoggedIn ? (
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
                  to="/"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                  <span className="text-yellow-400 font-semibold text-sm">
                    Available Coins: {user.coins}
                  </span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <img
                    className="h-8 w-8 rounded-full border border-gray-600"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                  <button
                    onClick={() => setIsLoggedIn(false)}
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
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
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
