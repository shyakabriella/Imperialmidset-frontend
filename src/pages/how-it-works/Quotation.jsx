import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Quotation() {
  const navigate = useNavigate();

  const packs = [
    {
      name: "Starter Guidance",
      price: "Request Quote",
      points: ["Consultation", "Country advice", "Checklist", "Basic planning"],
    },
    {
      name: "Application Support",
      price: "Request Quote",
      points: ["SOP + CV review", "Document checklist", "Submission support", "Follow-up"],
    },
    {
      name: "Full Package (End-to-End)",
      price: "Request Quote",
      points: ["Admissions + Visa", "Pre-departure", "Flight guidance", "Full tracking"],
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <Link to="/how-it-works" className="hover:underline">How It Works</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Pricing & Quotation</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
          Pricing & Quotation
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          We give a quotation based on your destination, program level, and needed support.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((p) => (
            <div key={p.name} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="text-lg font-extrabold text-gray-900">{p.name}</div>
              <div className="mt-2 text-sm font-semibold text-gray-600">{p.price}</div>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {p.points.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                    {x}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/how-it-works/appointments")}
                className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-gray-800 transition"
              >
                Request Quotation
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="text-sm font-extrabold text-gray-900">How pricing is calculated</div>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            Pricing depends on: country, university type, documents needed, visa complexity, and how much help you want.
            Book an appointment and we’ll send your quotation.
          </p>
        </div>
      </div>
    </div>
  );
}