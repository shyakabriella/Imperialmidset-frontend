import React from "react";
import { Link, useNavigate } from "react-router-dom";

/** Small in-view animation hook */
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

/** Brand colors (logo style) */
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

const PROCESS = [
  { title: "Free Profile Assessment", desc: "We review your education background, budget, preferred country, and goals." },
  { title: "University & Program Matching", desc: "We shortlist universities that match your profile and help you choose the best option." },
  { title: "Document Preparation", desc: "We guide you on SOP, CV, recommendations, transcripts, and any required forms." },
  { title: "Application Submission", desc: "We submit your applications and follow up with the university when needed." },
  { title: "Offer Letter & Next Steps", desc: "We guide you on acceptance, deposit, and timelines after you receive the offer." },
  { title: "Visa & Travel Support", desc: "We support visa steps, accommodation guidance, and air ticketing." },
];

const DOCS = [
  "Passport (valid)",
  "Academic transcripts & certificates",
  "CV / Resume",
  "Statement of Purpose (SOP) / Motivation letter",
  "Recommendation letters (if needed)",
  "English test results (Duolingo/IELTS) if required",
  "Bank statement / proof of funds (for visa stage)",
];

const DESTINATIONS = [
  { name: "Canada", note: "Strong education + work opportunities" },
  { name: "USA", note: "Top universities + wide program choices" },
  { name: "UK", note: "Shorter programs + global recognition" },
  { name: "Germany", note: "Affordable options in many cases" },
  { name: "Australia", note: "Good student life + work options" },
  { name: "Poland", note: "Growing destination + affordable tuition" },
];

const FAQS = [
  {
    q: "Do I need IELTS to apply?",
    a: "Not always. Some universities accept Duolingo or waive English tests depending on your background. We check requirements for each university.",
  },
  {
    q: "How long does the process take?",
    a: "Usually 2–8 weeks for applications (depends on the university). Visa time depends on the country. We guide you with a clear timeline.",
  },
  {
    q: "Can you help me get scholarships?",
    a: "Yes. We help you identify scholarship opportunities and strengthen SOP/CV to improve your chances.",
  },
  {
    q: "Do you only work with students from Rwanda?",
    a: "No. We support students and professionals from different countries. Everything can be done online.",
  },
];

function SectionTitle({ kicker, title, desc }) {
  return (
    <div className="text-center">
      <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
        {kicker}
      </div>
      <h2 className="mt-3 text-3xl font-extrabold text-gray-900">{title}</h2>
      {desc ? <p className="mt-3 text-gray-600">{desc}</p> : null}
    </div>
  );
}

export default function StudyAbroadUniversity() {
  const navigate = useNavigate();
  const hero = useInView({ threshold: 0.18 });

  // ✅ FIX: faqOpen state was missing
  const [faqOpen, setFaqOpen] = React.useState(0);

  /** ✅ Go to separate assessment page */
  const goAssessment = () => {
    navigate("/services/study-abroad/assessment");
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ✅ HERO + EDGE-TO-EDGE BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20" style={{ backgroundColor: HERO.paper }} />

        {/* texture (must NOT block clicks) */}
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
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">Study Abroad</h1>

          <div className="mt-4 text-sm sm:text-base text-gray-700">
            <Link to="/" className="text-yellow-700 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">Services</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Study Abroad</span>
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-gray-700 leading-relaxed">
            Get into the right university with full support: profile assessment, program matching, documents,
            application submission, and clear guidance for visa & travel steps.
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
                    Ready to start your application?
                  </div>
                  <div className="mt-1 text-sm sm:text-base text-gray-800">
                    Get a free assessment or contact us for guidance.
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={goAssessment}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: HERO.blue }}
                >
                  Get Free Assessment
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
            onClick={goAssessment}
            className="absolute right-0 top-0 h-full w-14 sm:w-20 flex items-center justify-center"
            style={{ backgroundColor: HERO.blue }}
            aria-label="Go to assessment form page"
          >
            <div className="rotate-90 text-white font-bold tracking-widest text-xs sm:text-sm">
              Assessment
            </div>
          </button>
        </div>

        <div className="h-10" />
      </section>

      {/* IMAGE ONLY */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10 min-h-[260px] sm:min-h-[660px]">
          <img src="/abroad.jpg" alt="Study abroad" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute left-5 top-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold text-gray-900 shadow ring-1 ring-black/5">
            Your pathway to success
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <SectionTitle
          kicker="HOW IT WORKS"
          title="Simple step-by-step process"
          desc="We keep everything clear, so you always know what happens next."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((s, idx) => (
            <div key={s.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-2xl text-white flex items-center justify-center font-extrabold shadow"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  {idx + 1}
                </div>
                <div className="text-sm font-extrabold text-gray-900">{s.title}</div>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={goAssessment}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
            style={{ backgroundColor: BRAND.primary }}
          >
            Start Free Assessment →
          </button>
        </div>
      </section>

      {/* DOCUMENTS + DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
              DOCUMENTS
            </div>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">What you should prepare 📄</h3>
            <p className="mt-2 text-sm text-gray-600">
              Don’t worry if you don’t have everything. We help you step by step.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              {DOCS.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
              DESTINATIONS
            </div>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Popular study destinations</h3>
            <p className="mt-2 text-sm text-gray-600">We guide you based on your budget, visa rules, and your goals.</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {DESTINATIONS.map((c) => (
                <div key={c.name} className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-sm font-extrabold text-gray-900">{c.name}</div>
                  <div className="mt-1 text-xs text-gray-600">{c.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={goAssessment}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
            style={{ backgroundColor: BRAND.primary }}
          >
            Apply Now →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle kicker="FAQ" title="Common questions" />

        <div className="mt-10 mx-auto max-w-3xl space-y-3">
          {FAQS.map((f, idx) => {
            const open = faqOpen === idx;
            return (
              <div key={f.q} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setFaqOpen((p) => (p === idx ? -1 : idx))}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <div className="text-sm font-extrabold text-gray-900">{f.q}</div>
                  <span className="text-lg" style={{ color: BRAND.primary }}>
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
      </section>
    </div>
  );
}
