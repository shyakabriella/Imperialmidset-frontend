import React from "react";

/* ---------------- InView Hook ---------------- */
function useInView(options = { threshold: 0.15 }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/* ---------------- Testimonials ---------------- */
const TESTIMONIALS = [
  {
    name: "Jessica Davis",
    role: "Master’s Applicant • Canada",
    quote:
      "They guided me through every step — school selection, SOP, and documents. I got accepted and felt supported the whole time.",
    stars: 5,
    img: "/testimonials/jessica.jpg",
  },
  {
    name: "Elvis TUYISHIME",
    role: "PhD Applicant • Europe",
    quote:
      "The team helped me match with a supervisor and refine my research proposal. The process became clear and professional.",
    stars: 5,
    img: "/testimonials/Elvis TUYISHIME.jpg",
  },
  {
    name: "Misha Stam",
    role: "Bachelor Applicant • USA",
    quote:
      "I was confused about requirements and deadlines. They organized everything and connected me with the right university.",
    stars: 5,
    img: "/testimonials/misha.jpg",
  },
  {
    name: "Grace Mwangi",
    role: "IELTS Candidate • Kenya",
    quote:
      "Their coaching improved my writing and speaking score. Everything was structured, clear, and very practical.",
    stars: 5,
    img: "/testimonials/grace.jpg",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="mt-4 flex justify-center gap-1 text-amber-400">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const next = React.useCallback(() => {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  const prev = React.useCallback(() => {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto slide when section is visible
  React.useEffect(() => {
    if (!inView) return;
    if (paused) return;
    if (TESTIMONIALS.length <= 1) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 4500);

    return () => clearInterval(t);
  }, [inView, paused]);

  return (
    <section ref={ref} className="relative bg-white py-16 sm:py-20">
      {/* subtle premium background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Title */}
        <div
          className={[
            "text-center transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-blue-700/80">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Trusted by Students Worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
            Hear directly from students who used our support to secure admissions, improve
            applications, and confidently take the next step.
          </p>
        </div>

        {/* Slider */}
        <div
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
            {/* Track */}
            <div
              className="flex transition-transform duration-700 ease-out will-change-transform"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full shrink-0 p-8 sm:p-12">
                  <div className="mx-auto max-w-3xl text-center">
                    {/* profile image on TOP */}
                    <img
                      src={t.img}
                      alt={t.name}
                      className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                      loading="lazy"
                    />

                    {/* name + role */}
                    <div className="mt-4">
                      <div className="text-base font-extrabold text-gray-900">
                        {t.name}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">{t.role}</div>
                    </div>

                    {/* quote */}
                    <div className="relative mt-7 rounded-2xl bg-gray-50 px-6 py-7 text-left ring-1 ring-black/5">
                      <div className="absolute -top-4 left-6 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">
                        Feedback
                      </div>

                      <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                        <span className="text-2xl font-black text-gray-300">“</span>
                        {t.quote}
                        <span className="text-2xl font-black text-gray-300">”</span>
                      </p>

                      <Stars count={t.stars} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows (big + yellow hover) */}
            {TESTIMONIALS.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className={[
                    "absolute left-3 top-1/2 -translate-y-1/2",
                    "h-12 w-12 sm:h-14 sm:w-14",
                    "rounded-full flex items-center justify-center",
                    "bg-gray-900 text-white text-2xl font-black",
                    "shadow-lg ring-2 ring-white/60",
                    "transition-all duration-200",
                    "hover:bg-yellow-400 hover:text-gray-900 hover:scale-105",
                    "active:scale-95",
                    "focus:outline-none focus:ring-4 focus:ring-yellow-200",
                  ].join(" ")}
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className={[
                    "absolute right-3 top-1/2 -translate-y-1/2",
                    "h-12 w-12 sm:h-14 sm:w-14",
                    "rounded-full flex items-center justify-center",
                    "bg-gray-900 text-white text-2xl font-black",
                    "shadow-lg ring-2 ring-white/60",
                    "transition-all duration-200",
                    "hover:bg-yellow-400 hover:text-gray-900 hover:scale-105",
                    "active:scale-95",
                    "focus:outline-none focus:ring-4 focus:ring-yellow-200",
                  ].join(" ")}
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          {TESTIMONIALS.length > 1 && (
            <div className="mt-5 flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition",
                    i === index ? "bg-gray-900" : "bg-gray-300 hover:bg-yellow-400",
                  ].join(" ")}
                />
              ))}
            </div>
          )}

          {/* hint */}
          {TESTIMONIALS.length > 1 && (
            <p className="mt-4 text-center text-xs text-gray-500">
              Hover to pause • Use arrows or dots to navigate
            </p>
          )}
        </div>
      </div>
    </section>
  );
}