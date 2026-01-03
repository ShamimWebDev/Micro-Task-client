import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPlusSquare,
  FiList,
  FiCheckSquare,
  FiDollarSign,
  FiClock,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Sidebar = ({ role }) => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);

  const buyerLinks = [
    { name: "Home", path: "/dashboard", icon: <FiHome /> },
    {
      name: "Add New Tasks",
      path: "/dashboard/add-task",
      icon: <FiPlusSquare />,
    },
    { name: "My Tasks", path: "/dashboard/my-tasks", icon: <FiList /> },
    {
      name: "Purchase Coin",
      path: "/dashboard/purchase-coin",
      icon: <FiDollarSign />,
    },
    {
      name: "Payment History",
      path: "/dashboard/payment-history",
      icon: <FiClock />,
    },
  ];

  // Placeholder for other roles
  const workerLinks = [
    { name: "Home", path: "/dashboard", icon: <FiHome /> },
    // ... more
  ];

  const links = role === "buyer" ? buyerLinks : workerLinks;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 rounded-lg text-white"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <aside
        className={`
                fixed inset-y-0 left-0 z-40 w-64 glass border-r border-slate-800 transition-transform duration-300 transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:relative lg:translate-x-0
            `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gradient mb-2">MicroTask</h2>
            <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-indigo-500 object-cover"
              />
              <h3 className="text-white font-semibold truncate">
                {user?.displayName}
              </h3>
              <p className="text-indigo-400 text-xs uppercase font-bold tracking-wider">
                {role}
              </p>
            </div>
          </div>

          <nav className="flex-grow space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end
                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${
                                      isActive
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }
                                `}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center uppercase tracking-widest">
              Dashboard v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
