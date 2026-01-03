import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiImage, FiBriefcase } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const role = form.role.value;

    setError("");

    // Basic Password Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);

      const userInfo = {
        name,
        email,
        photo,
        role,
        coins: role === "worker" ? 10 : 50,
        uid: result.user.uid,
      };

      console.log("Saving user to DB:", userInfo);
      // TODO: Post to backend API
      // await axiosPublic.post('/users', userInfo);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role: "worker", // Default role for social login
        coins: 10,
        uid: result.user.uid,
      };
      console.log("Saving Google user to DB:", userInfo);
      // TODO: Post to backend API
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-8 rounded-3xl border border-slate-800"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400">Join the MicroTask community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Photo URL */}
          <div className="relative">
            <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              name="photo"
              type="url"
              placeholder="Profile Picture URL"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Role */}
          <div className="relative">
            <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <select
              name="role"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
            >
              <option value="" disabled selected>
                Select Your Role
              </option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
          >
            Register Now
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-950 text-slate-500 font-medium">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <FaGoogle className="text-red-500" /> Google
        </button>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
