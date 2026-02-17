import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      title: "1) Book a Consultation",
      desc: "Tell us your goals, country preference, budget, and timeline. We guide you with a clear plan.",
    },
    {
      title: "2) Profile Review + Matching",
      desc: "We analyze your profile (grades, experience, English level) and match you to best programs.",
    },
    {
      title: "3) Documents + Application",
      desc: "We support SOP, CV, recommendation guidance, document checklist, and submission.",
    },
    {
      title: "4) Visa + Pre-Departure",
      desc: "Visa checklist, interview practice, accommodation tips, flight guidance, and arrival preparation.",
    },
    {
      title: "5) Track Progress",
      desc: "You get updates at each stage, and you can always check where your process is.",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">How It Works</span>
        </div>

        <div className="mt-5 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              How It Works
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl">
              A simple step-by-step process to help you move from “I want to study abroad” to
              “I’m accepted and ready to travel”.
            </p>

            <div className="mt-8 space-y-4">
              {steps.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="text-lg font-extrabold text-gray-900">{s.title}</div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">Quick Actions ✅</div>
              <p className="mt-2 text-sm text-gray-600">
                Choose what you want to do next.
              </p>

              <div className="mt-5 grid gap-3">
                <button
                  onClick={() => navigate("/how-it-works/appointments")}
                  className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-gray-800 transition active:scale-[0.98]"
                >
                  Book Appointment
                </button>

                <button
                  onClick={() => navigate("/how-it-works/quotation")}
                  className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition active:scale-[0.98]"
                >
                  See Pricing & Quotation
                </button>

                <button
                  onClick={() => navigate("/how-it-works/tracking")}
                  className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition active:scale-[0.98]"
                >
                  Track Progress
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                <div className="font-semibold">Tip:</div>
                <div className="mt-1">
                  If you’re not sure where to start, book a consultation and we will guide you.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}