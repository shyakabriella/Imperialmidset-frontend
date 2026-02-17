import React from "react";
import { Link } from "react-router-dom";

export default function ResourcesBlog() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Resources</span> <span className="mx-1">/</span>
          <span className="text-gray-700">Blog & Guides</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
          Blog & Guides
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Helpful articles about study abroad, applications, visas, and preparing for international life.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "How to Choose a University Abroad", tag: "Admissions" },
            { title: "SOP Writing Tips (Strong Examples)", tag: "Documents" },
            { title: "Visa Checklist: What Most Students Miss", tag: "Visa" },
            { title: "Scholarship Search Strategy", tag: "Scholarships" },
            { title: "Pre-Departure Essentials", tag: "Travel" },
            { title: "Culture Shock: How to Adapt Faster", tag: "Culture" },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="text-xs font-bold text-gray-500">{p.tag}</div>
              <div className="mt-2 text-lg font-extrabold text-gray-900">{p.title}</div>
              <p className="mt-2 text-sm text-gray-600">
                Coming soon — we are preparing this guide with clear steps and examples.
              </p>
              <button className="mt-5 rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-gray-800 transition">
                Read
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}