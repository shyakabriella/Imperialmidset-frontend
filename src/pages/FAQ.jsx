import React from "react";
import { Link } from "react-router-dom";

const FAQS = [
  { q: "Do you guarantee visa approval?", a: "No. But we help you submit a strong and complete application and reduce mistakes." },
  { q: "Can I get support online?", a: "Yes. Most services are available online: coaching, document review, planning, and guidance." },
  { q: "How do I book an appointment?", a: "Go to How It Works → Appointments, then choose a time that fits you." },
];

export default function FAQ() {
  const [open, setOpen] = React.useState(0);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">FAQ</span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-gray-600">
          Quick answers to common questions.
        </p>

        <div className="mt-8 space-y-3">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen((p) => (p === idx ? -1 : idx))}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                >
                  <div className="text-sm font-extrabold text-gray-900">{f.q}</div>
                  <span className="text-lg font-bold text-gray-900">{isOpen ? "−" : "+"}</span>
                </button>

                <div className={["grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"].join(" ")}>
                  <div className="overflow-hidden px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}