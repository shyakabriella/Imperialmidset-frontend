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
      University Image
    </text>
  </svg>
`);

/* ✅ Example partners (replace names + images with your real partners) */
const PARTNERS = [
  { name: "Kent State University", country: "USA", programs: "Undergrad • Masters • PhD", img: "/universities/kent state.jpg" },
  { name: "Lewis University", country: "USA", programs: "Undergrad • Masters • PhD", img: "/universities/Lewis.jpg" },
  { name: "Arkansas State University", country: "USA", programs: "Undergrad • Masters • PhD", img: "/universities/Arkansas-State-University.jpg" },
  { name: "University of Oxford", country: "UK", programs: "Undergrad • Masters • PhD", img: "/universities/oxford.jpg" },
  { name: "University of Toronto", country: "Canada", programs: "Undergrad • Masters", img: "/universities/toronto.jpg" },
  { name: "University of Melbourne", country: "Australia", programs: "Masters • PhD", img: "/universities/melbourne.jpg" },
  { name: "Technical University", country: "Germany", programs: "Engineering • IT", img: "/universities/germany-tech.jpg" },
  { name: "Business School Partner", country: "France", programs: "MBA • Finance", img: "/universities/france-business.jpg" },
  { name: "Medical University Partner", country: "Poland", programs: "Medicine • Nursing", img: "/universities/poland-med.jpg" },
  { name: "International College Partner", country: "UAE", programs: "Diploma • Bachelor", img: "/universities/uae-college.jpg" },
];

export default function UniversityPartners() {
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
            University Partners
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
            Explore partner universities across multiple countries — Undergraduate,
            Postgraduate (Master’s & PhD), and professional training programs.
          </p>
        </div>

        {/* Layout */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Left big card */}
          <div
            className={[
              "rounded-2xl bg-neutral-900 text-white shadow-lg ring-1 ring-black/10",
              "p-10 flex flex-col justify-center min-h-[340px]",
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="text-xs uppercase tracking-widest text-white/60">
              Admissions • Scholarships • Academic Loan • Support
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold">
              Choose a Partner University
            </h3>

            <p className="mt-4 text-sm sm:text-base text-white/75 max-w-sm">
              We help you shortlist, apply, prepare documents, and track progress —
              step by step until admission.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-gray-900 shadow hover:bg-gray-100 transition active:scale-[0.98]">
                VIEW UNIVERSITIES
              </button>

              <button className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white shadow hover:bg-white/15 transition active:scale-[0.98]">
                REQUEST BROCHURE
              </button>
            </div>
          </div>

          {/* Right grid cards */}
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {PARTNERS.map((u, idx) => (
              <div
                key={u.name}
                className={[
                  "group relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10",
                  "min-h-[200px] sm:min-h-[230px]",
                  "transition-all duration-700 ease-out",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: `${180 + idx * 90}ms` }}
              >
                {/* background image (local) */}
                <img
                  src={u.img}
                  alt={u.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/20" />

                {/* content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/20">
                    {u.country}
                  </div>

                  <h4 className="mt-3 text-lg font-extrabold text-white leading-snug">
                    {u.name}
                  </h4>

                  <p className="mt-1 text-xs font-medium text-white/80">
                    {u.programs}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Small note (optional) */}
        <p className="mt-8 text-center text-base text-gray-600">
           The universities shown above are just a sample of our partners — we work with many more
  institutions worldwide.
        </p>
      </div>
    </section>
  );
}