import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSend, FiFileText } from "react-icons/fi";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Mock Task Info (Ideally fetched from backend using id)
  const task = {
    id: id,
    title: "Watch and Comment on YouTube",
    detail:
      "Please watch the video for at least 3 minutes, like it, and leave a sensible comment about the content. Avoid generic comments like 'nice video'.",
    required_workers: 80,
    payable_amount: 15,
    completion_date: "2026-02-15",
    submission_info:
      "Include your YouTube username and a link to your comment.",
    image_url:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1074&auto=format&fit=crop",
    buyer_name: "Creative Labs",
    buyer_email: "creative@labs.com",
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setLoading(true);
    const details = e.target.submission_Details.value;

    const submissionData = {
      task_id: task.id,
      task_title: task.title,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      submission_details: details,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      current_date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    console.log("Submitting work:", submissionData);

    // Mock API call
    setTimeout(() => {
      alert("Work submitted successfully! Waiting for buyer approval.");
      navigate("/dashboard/my-submissions");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-fadeIn">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <FiArrowLeft /> Back to Tasks
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl border border-slate-800"
        >
          <img
            src={task.image_url}
            alt={task.title}
            className="w-full h-48 object-cover rounded-2xl mb-6"
          />
          <h1 className="text-2xl font-bold text-white mb-4">{task.title}</h1>
          <div className="flex gap-4 mb-6">
            <span className="bg-indigo-500/10 text-indigo-400 text-xs px-3 py-1 rounded-full border border-indigo-500/20">
              By {task.buyer_name}
            </span>
            <span className="bg-yellow-500/10 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-500/20">
              🪙 {task.payable_amount}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-white font-bold mb-2">Description</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {task.detail}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">What to Submit</h4>
              <p className="text-slate-400 text-sm p-4 bg-slate-900/50 rounded-xl border border-slate-800 italic">
                {task.submission_info}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Submission Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl border border-slate-800 h-fit"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Submit Your Work
          </h2>
          <form onSubmit={handleSubmission} className="space-y-6">
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-medium">
                Submission Details
              </label>
              <div className="relative">
                <FiFileText className="absolute left-4 top-4 text-slate-500" />
                <textarea
                  name="submission_Details"
                  rows="6"
                  placeholder="Enter proof details here (usernames, links, etc.)"
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              <FiSend /> {loading ? "Submitting..." : "Submit Task"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskDetails;
