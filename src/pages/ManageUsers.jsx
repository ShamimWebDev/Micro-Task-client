import { useState, useEffect, useContext } from "react";
import {
  Trash2,
  ShieldCheck,
  UserCircle,
  Mail,
  Coins,
  ChevronDown,
  Search,
  Users as UsersIcon,
  Activity,
} from "lucide-react";
import { axiosSecure } from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleRemoveUser = async (id) => {
    if (window.confirm("Authorize permanent removal of this entity?")) {
      try {
        await axiosSecure.delete(`/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdateRole = async (id, newRole, userEmail) => {
    if (userEmail === currentUser?.email) return;

    try {
      await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
      setUsers(users.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-12 pb-20">
      {/* Executive Header */}
      <motion.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-indigo-500" />
            <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              User Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            User <span className="text-gradient">Database</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 shadow-2xl p-2 rounded-2xl border border-slate-800">
          <div className="px-5 border-r border-slate-800">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Global Registry
            </p>
            <div className="flex items-center gap-2">
              <UsersIcon size={14} className="text-indigo-400" />
              <span className="text-xs font-black text-white uppercase tracking-wider text-[10px]">
                {users.length} Active Profiles
              </span>
            </div>
          </div>
          <div className="relative group px-4">
            <Search size={16} className="text-slate-600" />
          </div>
        </div>
      </motion.header>

      {/* Modern Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative glass-card rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-10 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-400">
                <UserCircle size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  All Users
                </p>
                <p className="text-xl font-black text-white">
                  {users.length} Active Accounts
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Permission and Access Control
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
              <Activity size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                Real-time Delta Synchronized
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    User Profile
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    Role
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Balance
                  </th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="group/row hover:bg-white/2 transition-colors"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-indigo-500 blur rounded-full opacity-0 group-hover/row:opacity-20 transition-opacity" />
                          <img
                            src={u.photo || u.photoURL}
                            alt={u.name}
                            className="relative w-12 h-12 rounded-2xl object-cover border-2 border-white/10 shadow-lg"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white mb-1 group-hover/row:text-indigo-400 transition-colors uppercase tracking-tight">
                            {u.name}
                          </span>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Mail size={12} />
                            <span className="text-[10px] font-bold font-mono lowercase">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex justify-center">
                        <div className="relative group/sel min-w-[120px]">
                          <select
                            value={u.role}
                            disabled={u.email === currentUser?.email}
                            onChange={(e) =>
                              handleUpdateRole(u._id, e.target.value, u.email)
                            }
                            className={cn(
                              "w-full bg-slate-900 border border-white/5 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 transition-all",
                              u.email === currentUser?.email &&
                                "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <option value="admin">Level: Admin</option>
                            <option value="buyer">Level: Buyer</option>
                            <option value="worker">Level: Worker</option>
                          </select>
                          <ChevronDown
                            size={14}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none group-hover/sel:text-white transition-colors"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <Coins size={14} className="text-yellow-500" />
                        <span className="text-lg font-black text-yellow-500 tracking-tighter">
                          {u.coins?.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex justify-center">
                        <button
                          disabled={u.email === currentUser?.email}
                          onClick={() => handleRemoveUser(u._id)}
                          className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/0 hover:bg-white/2 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
