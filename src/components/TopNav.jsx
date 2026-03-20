import React from "react";
import { useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  UserCircle2,
} from "lucide-react";

export default function TopNav({ onMenuClick }) {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getPageTitle = (pathname) => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/web-manage") return "Web Manage";
    if (pathname === "/application") return "Application";
    if (pathname === "/report") return "Report";
    if (pathname === "/setting") return "Settings";
    return "Dashboard";
  };

  const pageTitle = getPageTitle(location.pathname);

  const getUserInitials = (name) => {
    if (!name) return "A";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 flex h-[78px] items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E67E22]">
            Admin Panel
          </p>
          <h1 className="text-xl font-bold text-[#0B3B82] md:text-2xl">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search */}
        <div className="hidden md:flex">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search here..."
              className="h-11 w-[250px] rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#0B3B82] focus:bg-white"
            />
          </div>
        </div>

        {/* Notification */}
        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#E67E22]"></span>
        </button>

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B3B82] text-sm font-bold text-white">
            {getUserInitials(user?.name || "Admin")}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-slate-500">
              {user?.role?.name || user?.role || "Administrator"}
            </p>
          </div>

          <ChevronDown size={18} className="hidden text-slate-500 sm:block" />
        </button>
      </div>
    </header>
  );
}