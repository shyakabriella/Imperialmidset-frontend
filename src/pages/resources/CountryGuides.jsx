import React from "react";
import { Link } from "react-router-dom";

const COUNTRIES = [
  { name: "Canada", note: "Popular for students, PR pathways, strong colleges/universities" },
  { name: "USA", note: "Top universities, competitive scholarships, strong research programs" },
  { name: "UK", note: "Shorter programs, global recognition, strong academic structure" },
  { name: "Germany", note: "Affordable tuition, structured systems, high-quality education" },
  { name: "Australia", note: "Work opportunities, welcoming environment, strong student support" },
  { name: "Poland", note: "Affordable options, growing international student life" },
];

export default function CountryGuides() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Resources</span> <span className="mx-1">/</span>
          <span className="text-gray-700">Country Guides</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
          Country Guides
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Quick country overview: requirements, student life, and what to prepare.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRIES.map((c) => (
            <div key={c.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="text-lg font-extrabold text-gray-900">{c.name}</div>
              <p className="mt-2 text-sm text-gray-600">{c.note}</p>
              <button className="mt-5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-900 hover:bg-gray-50 transition">
                View guide
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}