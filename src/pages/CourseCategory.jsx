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
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

const CARDS = [
  {
    title: "Primary School",
    count: "Grades 1 - 6",
    icon: "📘",
    img: "https://images.unsplash.com/photo-1588072432836-7fb78b0b6f6f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Secondary School",
    count: "Grades 7 - 12",
    icon: "🏫",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "University Programs",
    count: "Bachelor & Master",
    icon: "🎓",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Short Courses & Training",
    count: "Certificates",
    icon: "🧾",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function CourseCategory() {
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
            School & University Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed">
            Explore a complete selection of education programs — from primary
            school to university and professional training.
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
            <div className="text-xs uppercase tracking-widest text-white/50">
              Admissions • Scholarships • Support
            </div>

            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold">
              Start Your Education Journey
            </h3>

            <p className="mt-4 text-sm sm:text-base text-white/70 max-w-sm">
              Find the right school or university program for you — and apply
              today with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-gray-900 shadow hover:bg-gray-100 transition active:scale-[0.98]">
                APPLY NOW
              </button>

              <button className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white shadow hover:bg-white/15 transition active:scale-[0.98]">
                VIEW PROGRAMS
              </button>
            </div>
          </div>

          {/* Right grid cards (2x2) */}
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {CARDS.map((c, idx) => (
              <div
                key={c.title}
                className={[
                  "group relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10",
                  "min-h-[180px] sm:min-h-[220px]",
                  "transition-all duration-700 ease-out",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: `${180 + idx * 120}ms` }}
              >
                {/* background image */}
                <img
                  src={c.img}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/45" />

                {/* icon bubble */}
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20">
                  <span className="text-lg">{c.icon}</span>
                </div>

                {/* text */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-lg font-extrabold text-white">
                    {c.title}
                  </h4>
                  <p className="mt-1 text-xs font-medium text-white/70">
                    {c.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
