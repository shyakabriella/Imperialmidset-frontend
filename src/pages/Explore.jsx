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

const STATS = [
  {
    icon: "📄",
    value: "10,200+",
    label: "Students",
  },
  {
    icon: "▶️",
    value: "50+",
    label: "Instructors",
  },
  {
    icon: "✍️",
    value: "10+",
    label: "Courses",
  },
  {
    icon: "📞",
    value: "24/7",
    label: "Support",
  },
];

export default function Explore() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div
          className={[
            "text-center transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Explore Our Impressive Stats
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed">
            We take pride in our commitment to excellence and our <br className="hidden sm:block" />
            dedication to your success.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-y-12 gap-x-6 lg:grid-cols-4">
          {STATS.map((s, idx) => (
            <div
              key={s.label}
              className={[
                "text-center transition-all duration-700 ease-out",
                // stagger animation
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">
                {s.icon}
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                {s.value}
              </div>

              <div className="mt-3 text-sm sm:text-base font-medium text-blue-700/80">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
