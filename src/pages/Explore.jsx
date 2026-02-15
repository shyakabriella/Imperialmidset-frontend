import React from "react";

/* ---------------- InView Hook (re-runs) ---------------- */
function useInView(options = { threshold: 0.25 }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      // ✅ toggles true/false based on visibility
      setInView(entry.isIntersecting);
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/* ---------------- CountUp Hook (re-runs) ----------------
   - counts from 1 -> target each time start becomes true
   - resets when start becomes false (so it can replay)
-------------------------------------------------- */
function useCountUp({ start, target = 0, duration = 1200 }) {
  const [value, setValue] = React.useState(1);

  React.useEffect(() => {
    // ✅ reset when leaving view (prepares for replay)
    if (!start) {
      setValue(1);
      return;
    }

    const to = Number.isFinite(target) ? target : 0;
    if (to <= 1) {
      setValue(to);
      return;
    }

    let rafId = 0;
    const startTs = performance.now();
    const from = 1;

    const tick = (now) => {
      const progress = Math.min((now - startTs) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + (to - from) * eased);
      setValue(next);

      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return value;
}

/* ---------------- Helpers ---------------- */
function parseStatValue(raw) {
  const str = String(raw).trim();

  // If contains "/" or any letters, treat as static (ex: 24/7)
  if (/[a-zA-Z/]/.test(str)) {
    return { type: "static", display: str };
  }

  const suffixMatch = str.match(/([+%])$/);
  const suffix = suffixMatch ? suffixMatch[1] : "";
  const numericPart = str.replace(/[,+%]/g, "").replace(/\+$/, "");

  const n = Number(numericPart);
  if (!Number.isFinite(n)) return { type: "static", display: str };

  return { type: "count", number: n, suffix, display: str };
}

function formatNumber(n) {
  return new Intl.NumberFormat().format(n);
}

/* ---------------- Data ---------------- */
const STATS = [
  {
    value: "160+",
    label: "Students Supported",
    desc: "Guided through admissions, visas, and preparation.",
  },
  {
    value: "50+",
    label: "Expert Mentors",
    desc: "Coaches and advisors across key programs.",
  },
  {
    value: "10+",
    label: "Programs & Services",
    desc: "Study abroad, tests, internships, and more.",
  },
  {
    value: "24/7",
    label: "Support",
    desc: "Fast help through every step of your journey.",
  },
];

export default function Explore() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative bg-white py-16 sm:py-20">
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div
          className={[
            "text-center transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-blue-700/80">
            By the numbers
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Explore Our Impact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
            We measure success by outcomes: students supported, mentors involved,
            and consistent help across the full journey.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, idx) => (
            <StatCard key={s.label} stat={s} start={inView} delayMs={idx * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card Component ---------------- */
function StatCard({ stat, start, delayMs = 0 }) {
  const parsed = React.useMemo(() => parseStatValue(stat.value), [stat.value]);

  const count = useCountUp({
    start,
    target: parsed.type === "count" ? parsed.number : 0,
    duration: 1200,
  });

  const displayValue =
    parsed.type === "count"
      ? `${formatNumber(count)}${parsed.suffix}`
      : parsed.display;

  return (
    <div
      className={[
        "rounded-3xl border border-gray-200/70 bg-white",
        "shadow-sm hover:shadow-md transition",
        "p-6 sm:p-7",
        "transform-gpu transition-all duration-700 ease-out",
        start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="flex items-center justify-end">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Live
        </span>
      </div>

      <div className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 tabular-nums">
        {displayValue}
      </div>

      <div className="mt-2 text-sm sm:text-base font-semibold text-gray-900">
        {stat.label}
      </div>

      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {stat.desc}
      </p>
    </div>
  );
}