import { useState, useEffect, useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { axiosSecure } from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";

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
    if (
      window.confirm(
        "Are you sure you want to remove this user? This action cannot be undone."
      )
    ) {
      try {
        await axiosSecure.delete(`/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
        alert("User removed from the system.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
      setUsers(users.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
      alert(`User role updated to ${newRole}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Users</h1>
        <p className="text-slate-400">
          View and manage all users on the platform.
        </p>
      </header>

      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4 text-center">Coins</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photo || user.photoURL}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="text-white font-medium">
                          {user.name}
                        </div>
                        <div className="text-slate-500 text-xs italic">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={user.role}
                      disabled={user.email === currentUser?.email}
                      onChange={(e) =>
                        handleUpdateRole(user._id, e.target.value)
                      }
                      className="bg-slate-900 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer uppercase"
                    >
                      <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                      <option value="worker">Worker</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-yellow-400 font-bold">
                      🪙 {user.coins}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      disabled={user.email === currentUser?.email}
                      onClick={() => handleRemoveUser(user._id)}
                      className="text-red-500 hover:text-white p-2 hover:bg-red-500/10 disabled:opacity-20 disabled:cursor-not-allowed rounded-xl transition-all border border-red-500/10"
                      title={
                        user.email === currentUser?.email
                          ? "You cannot remove yourself"
                          : "Remove User"
                      }
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
