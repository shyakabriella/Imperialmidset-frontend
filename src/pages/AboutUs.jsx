import React from "react";
import { useNavigate } from "react-router-dom";

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

export default function AboutUs() {
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT IMAGE */}
          <div
            className={[
              "relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10",
              "min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]",
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <img
              src="/gigi1.jpg"
              alt="Students abroad"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute left-5 top-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold text-gray-900 shadow ring-1 ring-black/5">
              International Mindset PathWays
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div
            className={[
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="text-xs font-bold tracking-widest text-blue-600">
              ABOUT US
            </div>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Who We Are
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-600">
              International Mindset PathWays is a global support platform helping
              students and professionals unlock international opportunities.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                University matching based on your profile, budget, and goals
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                Full application support: SOP, CV, documents & submission
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                Visa application support and air ticketing for your travel
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                Culture exchange guidance to help you adapt and succeed abroad
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                English test prep & technical coaching for global readiness
              </li>
            </ul>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-extrabold tracking-widest text-gray-900">
                  OUR MISSION
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  At International Mindset Path Way, our mission is to empower
                  individuals to thrive globally through mindset transformation,
                  education, and cross-cultural exchange. We equip people with tools,
                  insights, and personalized coaching to unlock their full potential
                  and succeed across borders.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="text-xs font-extrabold tracking-widest text-gray-900">
                  OUR VISION
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  We envision a world where every person, regardless of background,
                  has access to transformative coaching and opportunities that foster
                  success, resilience, and leadership in the global arena.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <img
                src="/guigyz.jpg"
                alt="Advisor"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow"
              />
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Your Support Team
                </div>
                <div className="text-xs text-gray-500">
                  Study Abroad Advisor • support@company.com
                </div>
              </div>
            </div>

            {/* ✅ CTA buttons that route */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/booking")}
                className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-gray-800 transition active:scale-[0.98]"
              >
                Book a Consultation
              </button>

              <button
                onClick={() => navigate("/services")}
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition active:scale-[0.98]"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
