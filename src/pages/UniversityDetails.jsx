// src/pages/UniversityDetails.jsx

import React from "react";
import { Link, useParams } from "react-router-dom";
import universities from "../data/universities";

const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stop-color="#0f172a"/>
        <stop offset="1" stop-color="#111827"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial" font-size="34" fill="#e5e7eb">
      University Image
    </text>
  </svg>
`);

export default function UniversityDetails() {
  const { slug } = useParams();

  const university = universities.find((item) => item.slug === slug);

  if (!university) {
    return (
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-black/5 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              University not found
            </h1>
            <p className="mt-3 text-gray-600">
              The university you are looking for does not exist.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-yellow-600 px-6 py-3 text-sm font-bold text-white hover:bg-yellow-700 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
        {/* top */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-yellow-700 hover:text-yellow-800"
          >
            ← Back to Universities
          </Link>
        </div>

        {/* hero */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] sm:min-h-[360px]">
              <img
                src={university.img}
                alt={university.name}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="p-8 sm:p-10">
              <div className="inline-flex rounded-full bg-yellow-100 px-4 py-2 text-xs font-bold text-yellow-800">
                {university.country}
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                {university.name}
              </h1>

              <p className="mt-4 text-base leading-7 text-gray-600">
                {university.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Country
                  </div>
                  <div className="mt-1 text-sm font-bold text-gray-900">
                    {university.country}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    State / Region
                  </div>
                  <div className="mt-1 text-sm font-bold text-gray-900">
                    {university.state}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    City
                  </div>
                  <div className="mt-1 text-sm font-bold text-gray-900">
                    {university.city}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Study Levels
                  </div>
                  <div className="mt-1 text-sm font-bold text-gray-900">
                    {university.programSummary}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                     to={`/services/study-abroad/assessment?university=${encodeURIComponent(university.name)}`}
                      className="rounded-xl bg-yellow-600 px-6 py-3 text-sm font-bold text-white shadow hover:bg-yellow-700 transition"
                    >
                  Apply Now
                </Link>

                <Link
                  to="/contact"
                  className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50 transition"
                >
                  Talk to Advisor
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* details */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Programs Offered
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {university.programsOffered.map((program, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 bg-slate-50 p-4"
                >
                  <div className="text-sm font-bold text-gray-900">
                    {program}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Required Documents
            </h2>

            <ul className="mt-6 space-y-3">
              {university.requiredDocuments.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-yellow-50 p-5 ring-1 ring-yellow-100">
              <h3 className="text-base font-extrabold text-gray-900">
                Ready to apply?
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Our team can guide the student from document preparation up to
                final submission.
              </p>

              <Link
                to={`/contact?university=${encodeURIComponent(university.name)}`}
                className="mt-4 inline-flex rounded-xl bg-yellow-600 px-5 py-3 text-sm font-bold text-white hover:bg-yellow-700 transition"
              >
                Start Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}