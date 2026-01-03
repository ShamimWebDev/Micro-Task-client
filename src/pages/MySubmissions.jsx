import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { axiosSecure } from "../hooks/useAxios";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [submissions, setSubmissions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(
          `/my-submissions?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`
        )
        .then((res) => {
          setSubmissions(res.data.result);
          setTotalCount(res.data.total);
        })
        .catch((err) => console.error(err));
    }
  }, [user, currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">My Submissions</h1>
        <p className="text-slate-400">
          History of all tasks you have worked on.
        </p>
      </header>

      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Task Title</th>
                <th className="px-6 py-4 font-semibold">Buyer Name</th>
                <th className="px-6 py-4 font-semibold text-center">Payable</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {submissions.map((sub) => (
                <tr
                  key={sub._id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {sub.task_title}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{sub.buyer_name}</td>
                  <td className="px-6 py-4 text-yellow-400 font-bold text-center">
                    🪙 {sub.payable_amount}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm italic text-center">
                    {sub.current_date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full border tracking-wider ${getStatusStyle(
                        sub.status
                      )}`}
                    >
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-500 italic"
                  >
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 bg-slate-900/30 border-t border-slate-800 flex items-center justify-between">
            <p className="text-slate-500 text-sm">
              Showing{" "}
              <span className="text-slate-300">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="text-slate-300">
                {Math.min(currentPage * itemsPerPage, totalCount)}
              </span>{" "}
              of <span className="text-slate-300">{totalCount}</span>{" "}
              submissions
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-slate-800 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <FiChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all border ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-800 rounded-lg text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
