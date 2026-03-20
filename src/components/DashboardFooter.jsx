import React from "react";
import { Link } from "react-router-dom";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-4 md:px-6">
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        {/* Left */}
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-600">
            © {currentYear}{" "}
            <span className="font-semibold text-[#0B3B82]">
              International Mindset Pathways
            </span>
            . All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            to="/dashboard"
            className="font-medium text-slate-600 transition hover:text-[#0B3B82]"
          >
            Dashboard
          </Link>

          <Link
            to="/setting"
            className="font-medium text-slate-600 transition hover:text-[#0B3B82]"
          >
            Settings
          </Link>

          <Link
            to="/report"
            className="font-medium text-slate-600 transition hover:text-[#E67E22]"
          >
            Reports
          </Link>
        </div>
      </div>
    </footer>
  );
}