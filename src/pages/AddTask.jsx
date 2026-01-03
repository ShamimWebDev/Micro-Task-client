import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import {
  FiImage,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiType,
  FiFileText,
} from "react-icons/fi";
import { imageUpload } from "../utils/imageUpload";
import { axiosSecure } from "../hooks/useAxios";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const detail = form.detail.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseInt(form.payable_amount.value);
    const completion_date = form.completion_date.value;
    const submission_info = form.submission_info.value;
    const image = form.image.files[0];

    const totalCost = required_workers * payable_amount;
    const availableCoins = user?.coins || 100; // Mock coins if not found

    if (totalCost > availableCoins) {
      alert(
        `Not available Coin. Purchase Coin. Total needed: 🪙 ${totalCost}, but you have 🪙 ${availableCoins}`
      );
      navigate("/dashboard/purchase-coin");
      setLoading(false);
      return;
    }

    try {
      const image_url = await imageUpload(image);

      const newTask = {
        title,
        detail,
        required_workers,
        payable_amount,
        completion_date,
        submission_info,
        image_url,
        buyer_email: user.email,
        status: "active",
      };

      console.log("Saving Task:", newTask);

      await axiosSecure.post("/tasks", newTask);

      alert("Task added successfully! Coins deducted from your balance.");
      navigate("/dashboard/my-tasks");
      setLoading(false);
    } catch (err) {
      alert("Image upload failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-3xl border border-slate-800"
      >
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Task</h1>
          <p className="text-slate-400">
            Specify details for the workers to follow.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2 relative">
              <label className="text-slate-400 text-sm mb-2 block font-medium">
                Task Title
              </label>
              <div className="relative">
                <FiType className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="title"
                  type="text"
                  placeholder="e.g. Subscribe to channel"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Detail */}
            <div className="md:col-span-2 relative">
              <label className="text-slate-400 text-sm mb-2 block font-medium">
                Task Details
              </label>
              <textarea
                name="detail"
                rows="4"
                placeholder="Describe the task in detail..."
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            {/* Workers Needed */}
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-medium">
                Required Workers
              </label>
              <div className="relative">
                <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="required_workers"
                  type="number"
                  min="1"
                  placeholder="100"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Payable Amount */}
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-medium">
                Payable Amount (per worker)
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="payable_amount"
                  type="number"
                  min="1"
                  placeholder="10"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-medium">
                Completion Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="completion_date"
                  type="date"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Task Image */}
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-medium">
                Task Image
              </label>
              <div className="relative">
                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-12 pr-4 text-slate-400 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Submission Info */}
            <div className="md:col-span-2">
              <label className="text-slate-400 text-sm mb-2 block font-medium">
                Submission Proof Info
              </label>
              <div className="relative">
                <FiFileText className="absolute left-4 top-4 text-slate-500" />
                <textarea
                  name="submission_info"
                  rows="3"
                  placeholder="What proof should workers submit? (e.g. screenshot of comment)"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 text-lg mt-6"
          >
            {loading ? "Processing..." : "Create Task"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTask;
