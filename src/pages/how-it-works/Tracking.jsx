import React from "react";
import { Link } from "react-router-dom";

export default function Tracking() {
  const stages = [
    "Consultation booked",
    "Profile review completed",
    "University matching",
    "Documents prepared",
    "Application submitted",
    "Offer received",
    "Visa process",
    "Pre-departure",
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <Link to="/how-it-works" className="hover:underline">How It Works</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Track Progress</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
          Track Progress
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Your process is divided into clear stages so you always know what’s happening.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((s, idx) => (
            <div key={s} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-bold text-gray-500">Stage {idx + 1}</div>
              <div className="mt-2 text-sm font-extrabold text-gray-900">{s}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="text-sm font-extrabold text-gray-900">Coming next</div>
          <p className="mt-2 text-sm text-gray-700">
            Later we can connect this page to your real student dashboard and show real-time status.
          </p>
        </div>
      </div>
    </div>
  );
}