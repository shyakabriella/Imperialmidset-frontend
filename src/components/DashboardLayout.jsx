import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import DashboardFooter from "./DashboardFooter";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const getRoleName = () => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) return String(savedRole).toLowerCase();

    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null;

    try {
      const user = JSON.parse(savedUser);

      if (
        user?.userRole &&
        typeof user.userRole === "object" &&
        user.userRole.name
      ) {
        return String(user.userRole.name).toLowerCase();
      }

      if (typeof user?.role === "string") {
        return user.role.toLowerCase();
      }

      if (user?.role && typeof user.role === "object" && user.role.name) {
        return String(user.role.name).toLowerCase();
      }

      if (Array.isArray(user?.roles) && user.roles.length > 0) {
        const firstRole = user.roles[0];

        if (typeof firstRole === "string") {
          return firstRole.toLowerCase();
        }

        if (firstRole?.name) {
          return String(firstRole.name).toLowerCase();
        }
      }

      if (typeof user?.user_type === "string") {
        return user.user_type.toLowerCase();
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleName = getRoleName();

    const adminRoles = ["admin", "administrator", "super_admin", "superadmin"];
    const isAdmin = roleName && adminRoles.includes(roleName);

    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    if (!isAdmin) {
      navigate("/", { replace: true });
      return;
    }

    setCheckingAuth(false);
  }, [navigate, location.pathname]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Checking access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <div className="flex h-full">
        {/* Desktop Sidebar */}
        <aside className="hidden h-screen w-[280px] shrink-0 border-r border-slate-200 bg-white lg:block">
          <div className="h-full overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="h-full w-[270px] max-w-[85%] bg-white shadow-2xl">
              <div className="h-full overflow-y-auto">
                <Sidebar />
              </div>
            </div>

            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              className="flex-1 bg-black/40 backdrop-blur-[1px]"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <TopNav onMenuClick={() => setSidebarOpen(true)} />

          <div className="flex-1 overflow-y-auto">
            <main className="p-4 md:p-6">
              <Outlet />
            </main>

            <DashboardFooter />
          </div>
        </div>
      </div>
    </div>
  );
}