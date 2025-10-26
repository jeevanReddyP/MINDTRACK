import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  SparklesIcon,
  UserIcon,
  FireIcon,
  BookOpenIcon,
  // Correct water icon
  CloudIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { text: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/" },
  { text: "Habits", icon: <SparklesIcon className="h-5 w-5" />, path: "/habits" },
  { text: "Calendar", icon: <CalendarIcon className="h-5 w-5" />, path: "/calendar" },
  { text: "Water", icon: <CloudIcon className="h-5 w-5" />, path: "/water" },
  { text: "Exercise", icon: <FireIcon className="h-5 w-5" />, path: "/exercise" },
  { text: "Journal", icon: <BookOpenIcon className="h-5 w-5" />, path: "/journal" },
  { text: "Profile", icon: <UserIcon className="h-5 w-5" />, path: "/profile" },
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();

  return (
    <div>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 text-center border-b border-gray-200">
          <h2 className="text-2xl font-bold">MindTracker</h2>
        </div>

        {/* Menu */}
        <ul className="mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.text}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-100 transition-colors
                    ${isActive ? "bg-blue-500 text-white font-semibold" : ""}
                  `}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
