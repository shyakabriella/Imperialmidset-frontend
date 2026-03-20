import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "WebManage",
      path: "/web-manage",
      icon: <Globe size={20} />,
    },
    {
      name: "Application",
      path: "/application",
      icon: <FileText size={20} />,
    },
    {
      name: "Report",
      path: "/report",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Setting",
      path: "/setting",
      icon: <Settings size={20} />,
    },
  ];

  const handleLogout = () => {
    // remove token or auth data here
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-[270px] flex-col justify-between border-r border-slate-200 bg-white shadow-sm">
      {/* Top */}
      <div>
        {/* Logo Area */}
        <div className="border-b border-slate-200 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B3B82] text-white shadow-md">
              <span className="text-xl font-bold">I</span>
            </div>

            <div>
              <h2 className="text-lg font-bold leading-5 text-[#0B3B82]">
                International
              </h2>
              <h3 className="text-sm font-semibold text-[#E67E22]">
                Mindset Pathways
              </h3>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="px-4 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#0B3B82] text-white shadow-md"
                      : "text-slate-700 hover:bg-[#F4F8FF] hover:text-[#0B3B82]"
                  }`
                }
              >
                <span className="transition-all duration-200">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom Logout */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl bg-[#E67E22] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#cf6d19]"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}