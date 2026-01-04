import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ChevronRight,
  ShieldCheck,
  Fingerprint,
  Zap,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { axiosPublic } from "../hooks/useAxios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    switch (role) {
      case "buyer":
        setEmail("buyer@gmail.com");
        setPassword("buyer@gmail.comA");
        break;
      case "worker":
        setEmail("worker@gmail.com");
        setPassword("worker@gmail.comA");
        break;
      case "admin":
        setEmail("admin@gmail.com");
        setPassword("admin@gmail.comA");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      setError("Authorization Failed. Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();

      // Save or update user in MongoDB
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role: "worker", // Default role for existing Google users
        coins: 10, // Default coins for worker role
        uid: result.user.uid,
      };

      // Try to save user (will return existing user if already exists)
      await axiosPublic.post("/users", userInfo);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="grow lg:flex items-center justify-center p-8 bg-slate-900 relative overflow-hidden">
        {/* Background Section Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl" />

            <div className="text-center mb-10">
              <Link
                to="/"
                className="group inline-flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-12 bg-gradient-aurora rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
                  <span className="text-white font-black text-xl">M</span>
                </div>
              </Link>
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">
                Please sign in to your account
              </p>

              {/* Demo Credentials */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("buyer")}
                  className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-wider rounded-xl border border-indigo-500/20 transition-all"
                >
                  Buyer Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("worker")}
                  className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider rounded-xl border border-emerald-500/20 transition-all"
                >
                  Worker Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("admin")}
                  className="px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 text-[10px] font-black uppercase tracking-wider rounded-xl border border-pink-500/20 transition-all"
                >
                  Admin Demo
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-12 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-indigo-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/10 text-xs uppercase tracking-[0.2em] active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
              >
                {loading && <Zap className="animate-spin" size={16} />}
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="flex items-center my-8">
              <div className="grow bg-white/10 h-px" />
              <span className="text-slate-500 text-sm font-medium px-4">
                OR
              </span>
              <div className="grow bg-white/10 h-px" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-slate-900 border border-white/5 hover:bg-slate-800 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 text-xs uppercase tracking-widest shadow-lg"
            >
              <FaGoogle className="text-red-500" /> Continue with Google
            </button>

            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
              <div className="flex items-center gap-6 text-slate-600">
                <Fingerprint size={20} />
                <ShieldCheck size={20} />
                <LogIn size={20} />
              </div>
              <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-400 hover:text-indigo-300 ml-1"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
