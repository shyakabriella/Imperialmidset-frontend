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

const TESTIMONIALS = [
  {
    name: "Jessica Davis",
    role: "Master’s Applicant • Canada",
    quote:
      "They guided me through every step — school selection, SOP, and documents. I got accepted and felt supported the whole time.",
    stars: 5,
    img: "https://i.pravatar.cc/120?img=5",
  },
  {
    name: "Linde Michel",
    role: "PhD Applicant • Europe",
    quote:
      "The team helped me match with a supervisor and refine my research proposal. The process became clear and professional.",
    stars: 5,
    img: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Misha Stam",
    role: "Bachelor Applicant • USA",
    quote:
      "I was confused about requirements and deadlines. They organized everything and connected me with the right university.",
    stars: 5,
    img: "https://i.pravatar.cc/120?img=20",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="mt-6 flex justify-center gap-1 text-amber-400">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
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
            What Our Students Are Saying
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed">
            Our mission is to help students worldwide join schools and universities
            abroad. Here’s what some of them say after working with us.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.name}
              className={[
                "text-center transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: `${idx * 140}ms` }}
            >
              <img
                src={t.img}
                alt={t.name}
                className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-white shadow"
              />

              <div className="mt-4 text-sm font-extrabold text-gray-900">
                {t.name}
              </div>
              <div className="mt-1 text-xs text-gray-500">{t.role}</div>

              <p className="mt-6 text-sm leading-relaxed text-gray-600 max-w-sm mx-auto">
                “{t.quote}”
              </p>

              <Stars count={t.stars} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
