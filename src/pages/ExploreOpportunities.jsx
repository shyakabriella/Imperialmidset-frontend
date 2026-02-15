import React from "react";

function useInView(options = { threshold: 0.15 }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect(); // animate once
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/* ✅ local fallback (no external link) */
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
      Opportunity Image
    </text>
  </svg>
`);

const ITEMS = [
  {
    level: "Bachelor • Admissions Support",
    title: "Find the Right University Program",
    desc:
      "We help you choose schools that match your grades, budget, and career goals — then prepare a strong application.",
    meta: "Undergraduate • 100+ Partner Schools",
    cta: "START HERE",
    img: "/opportunities/bachelor.jpg",
  },
  {
    level: "Master’s • Scholarships Guidance",
    title: "Apply for Master’s Abroad",
    desc:
      "From program selection to SOP, CV, and documents — we guide you step-by-step and connect you with universities.",
    meta: "Master’s • Scholarship Opportunities",
    cta: "APPLY NOW",
    img: "/opportunities/masters.jpg",
  },
  {
    level: "PhD • Research Matching",
    title: "PhD & Supervisor Connection",
    desc:
      "We help you match with supervisors, prepare research proposals, and submit applications for PhD positions abroad.",
    meta: "PhD • Research & Proposal Support",
    cta: "GET MATCHED",
    img: "/opportunities/phd.jpg",
  },
  
  {
    level: "Visa • Travel • Settling",
    title: "Visa & Pre-Departure Support",
    desc:
      "We assist with visa checklists, interview prep, accommodation tips, and what to do after arrival.",
    meta: "Visa • Housing • Arrival Help",
    cta: "GET HELP",
    img: "/opportunities/visa.jpg",
  },
  {
    level: "Study Loan • Academic Financing",
    title: "Study Loan Opportunity",
    desc:
      "We guide you through study loan requirements, documents, and application steps — to help fund your education abroad.",
    meta: "Loan Support • Eligibility • Documentation",
    cta: "CHECK ELIGIBILITY",
    img: "/opportunities/study-loan.jpg",
  },
  {
    level: "Culture Exchange • Global Experience",
    title: "Culture Exchange Programs",
    desc:
      "Join exchange programs to experience new cultures, improve communication, and build international confidence.",
    meta: "Exchange • Travel • Community",
    cta: "EXPLORE OPTIONS",
    img: "/opportunities/culture-exchange.jpg",
  },
  {
    level: "Global Networking • Connections",
    title: "Global Networking & Mentorship",
    desc:
      "Connect with students, alumni, mentors, and professionals worldwide — build relationships that open opportunities.",
    meta: "Networking • Mentorship • Global Community",
    cta: "JOIN NETWORK",
    img: "/opportunities/global-networking.jpg",
  },
];

export default function ExploreOpportunities() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <div
          className={[
            "text-center transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Explore Opportunities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
            We support students worldwide with admissions, visas, study loans, culture exchange,
            and global networking — from Bachelor to PhD.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((c, idx) => (
            <article
              key={c.title}
              className={[
                "group rounded-2xl bg-white shadow-md ring-1 ring-black/5 overflow-hidden",
                "transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs font-semibold text-gray-500">
                  {c.level}
                </div>

                <h3 className="mt-2 text-lg font-extrabold text-gray-900">
                  {c.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {c.desc}
                </p>

                <div className="mt-4 text-xs text-gray-500">{c.meta}</div>

                <button className="mt-5 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-900 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]">
                  {c.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}