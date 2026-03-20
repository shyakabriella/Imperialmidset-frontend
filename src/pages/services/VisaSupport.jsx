import React from "react";
import { Link, useNavigate } from "react-router-dom";

/** In-view animation hook */
function useInView(options = { threshold: 0.15 }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/** Brand colors */
const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
};

/** Hero banner colors */
const HERO = {
  paper: "#F7F1E6",
  banner: "#F6B100",
  blue: "#2563EB",
  ink: "#0B1220",
};

const HERO_IMG_LOCAL = "/images/visa-hero.jpg";

const COUNTRIES = ["Canada", "USA", "UK", "Germany", "Australia", "Poland"];

const WHAT_WE_HELP_WITH = [
  {
    title: "Document Checklist & Review",
    desc: "We review your documents and help you prepare a strong, complete file.",
  },
  {
    title: "Application Form Assistance",
    desc: "We guide you step-by-step on online forms and help you avoid mistakes.",
  },
  {
    title: "Cover Letter / Statement Support",
    desc: "We help you write clear and convincing letters for visa officers.",
  },
  {
    title: "Financial Documents Guidance",
    desc: "We show you how to present your bank statement and sponsor documents properly.",
  },
  {
    title: "Appointment & Biometrics Guidance",
    desc: "We help you book appointments and prepare what to bring for biometrics.",
  },
  {
    title: "Interview Preparation",
    desc: "If an interview is required, we practice common questions and strong answers.",
  },
];

const PROCESS = [
  {
    title: "Free Initial Check",
    desc: "We understand your purpose, destination, and timeline, then advise the best approach.",
  },
  {
    title: "Checklist & Planning",
    desc: "We give you a checklist and a simple plan for preparing everything correctly.",
  },
  {
    title: "Document Review",
    desc: "We review your documents and tell you what to improve before submission.",
  },
  {
    title: "Application Support",
    desc: "We guide you through the application steps and make sure details are correct.",
  },
  {
    title: "Interview / Biometrics Prep",
    desc: "We prepare you for questions and show you what to bring to appointments.",
  },
  {
    title: "Submission & Follow-up",
    desc: "We help you stay organized and follow the next steps after submission.",
  },
];

const DOCS = [
  "Valid passport",
  "Passport photo(s) (as required)",
  "Proof of purpose (admission letter, invitation, itinerary, etc.)",
  "Proof of funds (bank statement / sponsor documents)",
  "Accommodation details (if required)",
  "Travel history (if available)",
  "Employment / study proof (letter, ID, transcripts if needed)",
];

const FAQS = [
  {
    q: "Do you guarantee visa approval?",
    a: "No one can guarantee approval. But we help you submit a strong and complete application and avoid mistakes that cause refusals.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the country and visa type. We help you plan early and follow official timelines.",
  },
  {
    q: "Can I apply without a sponsor?",
    a: "Sometimes yes. It depends on your visa type and financial proof. We advise the best option for your case.",
  },
  {
    q: "Can everything be done online?",
    a: "Yes. Most steps can be handled online. For biometrics/interview, you may need to attend in person depending on the country.",
  },
];

function Kicker({ children }) {
  return (
    <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
      {children}
    </div>
  );
}

function InfoCard({ title, desc }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-sm font-extrabold text-gray-900">{title}</div>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineStep({ idx, title, desc }) {
  return (
    <div className="relative pl-10">
      <div
        className="absolute left-0 top-0 h-8 w-8 rounded-2xl flex items-center justify-center text-white font-extrabold shadow"
        style={{ backgroundColor: BRAND.primary }}
      >
        {idx}
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-extrabold text-gray-900">{title}</div>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function VisaSupport() {
  const navigate = useNavigate();
  const hero = useInView({ threshold: 0.18 });
  const [faqOpen, setFaqOpen] = React.useState(0);

  const goForm = () => navigate("/services/visa-support/request");

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ✅ HERO + EDGE-TO-EDGE BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20" style={{ backgroundColor: HERO.paper }} />

        {/* texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), radial-gradient(rgba(15,23,42,0.04) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            backgroundPosition: "0 0, 17px 17px",
          }}
        />

        <div ref={hero.ref} className="relative z-10 mx-auto max-w-7xl px-4 pt-[120px] pb-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">Visa Support</h1>

          <div className="mt-4 text-sm sm:text-base text-gray-700">
            <Link to="/" className="text-yellow-700 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">Services</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Visa Support</span>
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-gray-700 leading-relaxed">
            Submit your visa application with clarity and confidence. We guide you on documents, forms,
            letters, finances, biometrics, and interview preparation.
          </p>
        </div>

        {/* ✅ FULL WIDTH BANNER */}
        <div className="relative z-10 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: HERO.banner }} />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.08), transparent 55%)" }}
          />

          <div className="relative mx-auto max-w-7xl px-4">
            <div className="py-8 pr-[72px] sm:pr-[96px]">
              <div className="text-left flex items-center justify-center sm:justify-start">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                    Need visa support for your destination?
                  </div>
                  <div className="mt-1 text-sm sm:text-base text-gray-800">
                    Start your request form and we’ll guide you step by step.
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={goForm}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: HERO.blue }}
                >
                  Request Visa Support
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white/20 hover:bg-white/25 transition active:scale-[0.98]"
                  style={{ borderColor: "rgba(0,0,0,0.18)", color: HERO.ink }}
                >
                  Contact Us →
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goForm}
            className="absolute right-0 top-0 h-full w-14 sm:w-20 flex items-center justify-center"
            style={{ backgroundColor: HERO.blue }}
            aria-label="Go to visa support form"
          >
            <div className="rotate-90 text-white font-bold tracking-widest text-xs sm:text-sm">
              Start Form
            </div>
          </button>
        </div>

        <div className="h-10" />
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10 min-h-[260px] sm:min-h-[520px]">
          <img
            src={HERO_IMG_LOCAL}
            alt="Visa support"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute left-5 top-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold text-gray-900 shadow ring-1 ring-black/5">
            Visa guidance made simple
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="text-center">
          <Kicker>WHAT WE DO</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Visa support services
          </h2>
          <p className="mt-3 text-gray-600">
            Clear guidance and document review to help you avoid common mistakes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_HELP_WITH.map((it) => (
            <InfoCard key={it.title} title={it.title} desc={it.desc} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="text-center">
          <Kicker>PROCESS</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">How it works</h2>
          <p className="mt-3 text-gray-600">Simple steps so you always know what happens next.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {PROCESS.map((s, idx) => (
            <TimelineStep key={s.title} idx={idx + 1} title={s.title} desc={s.desc} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={goForm}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
            style={{ backgroundColor: BRAND.primary }}
          >
            Start My Visa Request
          </button>
        </div>
      </section>

      {/* DOCUMENTS + DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <Kicker>COMMON DOCUMENTS</Kicker>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">What to prepare</h3>
            <p className="mt-2 text-sm text-gray-600">
              Requirements vary by country, but these are common in many visa applications.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {DOCS.map((d) => (
                <div key={d} className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-sm text-gray-700">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <Kicker>DESTINATIONS</Kicker>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Where we support you</h3>
            <p className="mt-2 text-sm text-gray-600">
              We guide students and professionals based on destination and visa type.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border px-4 py-2 text-sm font-semibold"
                  style={{
                    borderColor: "rgba(47,13,52,0.15)",
                    color: BRAND.primary,
                    background: "white",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={goForm}
              className="mt-6 w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.primary }}
            >
              Request support
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <Kicker>FAQ</Kicker>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Common questions</h3>
          </div>

          <div className="mt-6 mx-auto max-w-3xl space-y-3">
            {FAQS.map((f, idx) => {
              const open = faqOpen === idx;
              return (
                <div key={f.q} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setFaqOpen((p) => (p === idx ? -1 : idx))}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                    aria-expanded={open}
                  >
                    <div className="text-sm font-extrabold text-gray-900">{f.q}</div>
                    <span className="text-lg font-bold" style={{ color: BRAND.primary }}>
                      {open ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={[
                      "grid transition-all duration-300 ease-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                      {f.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={goForm}
              className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
              style={{ borderColor: BRAND.accent, color: BRAND.primary }}
            >
              Go to Visa Support Form
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}