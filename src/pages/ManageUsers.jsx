import { useState } from "react";
import { FiTrash2, FiUser } from "react-icons/fi";

const ManageUsers = () => {
  // Mock Users Data
  const [users, setUsers] = useState([
    {
      id: 1,
      display_name: "Alice Smith",
      user_email: "alice@example.com",
      photo_url: "https://ui-avatars.com/api/?name=Alice+Smith",
      role: "worker",
      coins: 450,
    },
    {
      id: 2,
      display_name: "John Buyer",
      user_email: "john@buyer.com",
      photo_url: "https://ui-avatars.com/api/?name=John+Buyer",
      role: "buyer",
      coins: 1200,
    },
    {
      id: 3,
      display_name: "Super Admin",
      user_email: "admin@microtask.com",
      photo_url: "https://ui-avatars.com/api/?name=Super+Admin",
      role: "admin",
      coins: 50,
    },
  ]);

  const handleRemoveUser = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this user? This action cannot be undone."
      )
    ) {
      setUsers(users.filter((u) => u.id !== id));
      alert("User removed from the system.");
    }
  };

  const handleUpdateRole = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    alert(`User role updated to ${newRole}`);
  };

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
                  key={user.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photo_url}
                        alt={user.display_name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="text-white font-medium">
                          {user.display_name}
                        </div>
                        <div className="text-slate-500 text-xs italic">
                          {user.user_email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleUpdateRole(user.id, e.target.value)
                      }
                      className="bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer uppercase"
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
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-red-500 hover:text-white p-2 hover:bg-red-500/10 rounded-xl transition-all border border-red-500/10"
                      title="Remove User"
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
