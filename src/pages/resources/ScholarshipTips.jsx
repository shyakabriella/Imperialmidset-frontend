import React from "react";
import { Link } from "react-router-dom";

export default function ScholarshipTips() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Resources</span> <span className="mx-1">/</span>
          <span className="text-gray-700">Scholarship Tips</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
          Scholarship Tips
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Practical tips to improve your chances: documents, timing, and strong applications.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[
            { title: "Build a strong profile", points: ["Grades + consistency", "Volunteering / leadership", "Clear goals"] },
            { title: "Write a strong scholarship essay", points: ["Story + impact", "Clear reason for program", "Proof (results)"] },
            { title: "Prepare documents early", points: ["Transcripts", "Recommendation letters", "CV + SOP"] },
            { title: "Apply smart (not random)", points: ["Match eligibility", "Deadline calendar", "Quality > quantity"] },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-extrabold text-gray-900">{c.title}</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {c.points.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}