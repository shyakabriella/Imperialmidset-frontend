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

const EVENTS = [
  {
    title: "Study Abroad Info Session: Programs & Requirements",
    desc:
      "Learn how to choose the right university abroad, understand requirements, and avoid common mistakes.",
    cta: "REGISTER FOR FREE",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Application Workshop: SOP, CV & Documents",
    desc:
      "A practical session to help you write a strong SOP, prepare your CV, and organize your documents correctly.",
    cta: "REGISTER FOR FREE",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Scholarships & Funding: How to Improve Your Chances",
    desc:
      "We share scholarship strategies, how to search the right funding, and how to write strong applications.",
    cta: "GET TICKET",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Visa & Pre-Departure: What You Must Prepare",
    desc:
      "Understand visa steps, interview preparation, and what to do after you receive an acceptance letter.",
    cta: "GET TICKET",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function UpcomingEvents() {
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
            Upcoming Events
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed">
            Join our live sessions designed to guide students worldwide on how to
            apply and join schools & universities abroad.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map((e, idx) => (
            <article
              key={e.title}
              className={[
                "rounded-2xl bg-white shadow-md ring-1 ring-black/5 overflow-hidden",
                "transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Image */}
              <div className="relative h-40">
                <img
                  src={e.img}
                  alt={e.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-extrabold text-gray-900 leading-snug">
                  {e.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {e.desc}
                </p>

                <button className="mt-5 inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-gray-800 active:scale-[0.98]">
                  {e.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
