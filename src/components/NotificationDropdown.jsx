import { useState, useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { axiosSecure } from "../hooks/useAxios";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const NotificationDropdown = ({ userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (userEmail && isOpen) {
      axiosSecure
        .get(`/notifications/${userEmail}`)
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error(err));
    }
  }, [userEmail, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
      >
        <FiBell size={24} />
        {notifications.some((n) => !n.isRead) && (
          <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 border-2 border-slate-900 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 glass-card rounded-2xl border border-slate-700 shadow-2xl overflow-hidden z-50 animate-fadeIn">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <h3 className="font-bold text-white">Notifications</h3>
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">
              {notifications.length} Total
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto scrollbar-thin">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <Link
                  key={n._id}
                  to={n.actionRoute || "#"}
                  onClick={() => setIsOpen(false)}
                  className="block p-4 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0"
                >
                  <p className="text-sm text-slate-200 mb-1 leading-relaxed">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {formatDistanceToNow(new Date(n.time), { addSuffix: true })}
                  </span>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 italic">
                No notifications yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
