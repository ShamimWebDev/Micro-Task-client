import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Briefcase,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Fingerprint,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { imageUpload } from "../utils/imageUpload";
import { axiosPublic } from "../hooks/useAxios";
import { cn } from "../utils/cn";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.files[0];
    const password = form.password.value;
    const role = form.role.value;

    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (!/(?=.*[A-Z])(?=.*[!@#$&*])/.test(password)) {
      setError(
        "Password must have at least one capital letter and one special character."
      );
      setLoading(false);
      return;
    }

    try {
      const photoURL = await imageUpload(image);
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);

      const userInfo = {
        name,
        email,
        photo: photoURL,
        role,
        coins: role === "worker" ? 10 : 50,
        uid: result.user.uid,
      };

      await axiosPublic.post("/users", userInfo);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!selectedRole) {
      setError("Select operational role before Google synchronization.");
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role: selectedRole,
        coins: selectedRole === "worker" ? 10 : 50,
        uid: result.user.uid,
      };

      await axiosPublic.post("/users", userInfo);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="grow lg:flex items-center justify-center p-8 pt-24 bg-slate-900 relative overflow-hidden">
        {/* Background Section Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Side: Branding / Value Prop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block space-y-12"
          >
            <Link to="/" className="group flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-aurora rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
                <span className="text-white font-black text-2xl">M</span>
              </div>
              <span className="text-3xl font-black tracking-tight text-white line-height-1">
                Micro<span className="text-indigo-400">Task</span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-1">
                  Create Account
                </p>
              </span>
            </Link>

            <div className="space-y-8">
              <h2 className="text-5xl font-black text-white leading-tight">
                Begin your <span className="text-gradient">journey</span> with
                MicroTask.
              </h2>
              <p className="text-lg text-slate-500 max-w-md">
                Join our global community of workers and employers. Secure.
                Fast. Reliable.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <ShieldCheck className="text-emerald-400" />,
                  label: "Vetted Security",
                },
                {
                  icon: <Zap className="text-indigo-400" fill="currentColor" />,
                  label: "Instant Settlement",
                },
                {
                  icon: <Fingerprint className="text-pink-400" />,
                  label: "Data Protection",
                },
                {
                  icon: <Sparkles className="text-yellow-400" />,
                  label: "Premium Rewards",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 glass border-white/5 rounded-2xl"
                >
                  {item.icon}
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-sm mx-auto w-full"
          >
            <div className="relative w-full max-w-sm h-auto p-8 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800/50 backdrop-blur-xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl" />

              <div className="text-center mb-10">
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                  Create Account
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Fill in your details given below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                    size={18}
                  />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                  />
                </div>

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
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 shadow-inner"
                  />
                </div>

                {/* Profile Picture */}
                <div className="relative group">
                  <ImageIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    size={18}
                  />
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-400 text-[10px] font-black file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer shadow-inner"
                  />
                </div>

                {/* Role */}
                <div className="relative group">
                  <Briefcase
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                    size={18}
                  />
                  <select
                    name="role"
                    required
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer shadow-inner"
                  >
                    <option value="" disabled>
                      I want to...
                    </option>
                    <option value="worker">Work & Earn</option>
                    <option value="buyer">Post Tasks</option>
                  </select>
                  <ChevronRight
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 rotate-90"
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
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center rounded-xl"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/10 text-xs uppercase tracking-[0.2em] active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                >
                  {loading && <Zap className="animate-spin" size={16} />}
                  {loading ? "Signing Up..." : "Sign Up"}
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

              <p className="mt-10 text-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-400 hover:text-indigo-300 ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
