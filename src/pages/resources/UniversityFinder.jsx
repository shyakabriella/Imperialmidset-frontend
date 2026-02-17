import React from "react";
import { Link } from "react-router-dom";

export default function UniversityFinder() {
  const [q, setQ] = React.useState("");
  const [country, setCountry] = React.useState("");

  const mock = [
    { name: "Sample University A", country: "Canada", program: "Computer Science" },
    { name: "Sample University B", country: "UK", program: "Business" },
    { name: "Sample University C", country: "Germany", program: "Engineering" },
  ];

  const results = mock.filter((u) => {
    const matchesQ = !q || `${u.name} ${u.program}`.toLowerCase().includes(q.toLowerCase());
    const matchesC = !country || u.country === country;
    return matchesQ && matchesC;
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Resources</span> <span className="mx-1">/</span>
          <span className="text-gray-700">University Finder</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
          University Finder
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Search universities by country and program (starter version).
        </p>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-gray-700">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Computer Science, Business, Engineering..."
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">All countries</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((u) => (
              <div key={u.name} className="rounded-2xl bg-gray-50 p-5">
                <div className="text-sm font-extrabold text-gray-900">{u.name}</div>
                <div className="mt-1 text-xs text-gray-600">{u.country}</div>
                <div className="mt-2 text-sm text-gray-700">{u.program}</div>
              </div>
            ))}

            {results.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-3 text-sm text-gray-600">
                No matches found.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}