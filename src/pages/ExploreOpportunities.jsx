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

const ITEMS = [
  {
    level: "Bachelor • Admissions Support",
    title: "Find the Right University Program",
    desc:
      "We help you choose schools that match your grades, budget, and career goals — then prepare a strong application.",
    meta: "Undergraduate • 100+ Partner Schools",
    price: "START HERE",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },
  {
    level: "Master’s • Scholarships Guidance",
    title: "Apply for Master’s Abroad",
    desc:
      "From program selection to SOP, CV, and documents — we guide you step-by-step and connect you with universities.",
    meta: "Master’s • Scholarship Opportunities",
    price: "APPLY NOW",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    level: "PhD • Research Matching",
    title: "PhD & Supervisor Connection",
    desc:
      "We help you match with supervisors, prepare research proposals, and submit applications for PhD positions abroad.",
    meta: "PhD • Research & Proposal Support",
    price: "GET MATCHED",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    level: "Documents • SOP • CV",
    title: "Application Documents Review",
    desc:
      "Polish your SOP, CV, recommendation letters, and portfolio to increase your chances of acceptance.",
    meta: "Editing • Review • Coaching",
    price: "BOOK REVIEW",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    level: "Visa • Travel • Settling",
    title: "Visa & Pre-Departure Support",
    desc:
      "We assist with visa checklists, interviews prep, accommodation tips, and what to do after arrival.",
    meta: "Visa • Housing • Arrival Help",
    price: "GET HELP",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80",
  },
  {
    level: "Partnership • Schools",
    title: "Connect With Trusted Institutions",
    desc:
      "We work with universities and schools worldwide to connect students to the right opportunities and programs.",
    meta: "Global Network • Verified Partners",
    price: "PARTNER",
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
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
            Explore Study Opportunities Abroad
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed">
            We help students worldwide apply to schools and universities abroad —
            Bachelor, Master’s, and PhD — and connect you with trusted institutions.
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
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
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
                  {c.price}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
