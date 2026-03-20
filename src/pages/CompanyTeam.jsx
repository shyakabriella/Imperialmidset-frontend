import React from "react";
import { Link } from "react-router-dom";

/** In-view animation hook */
function useInView(options = { threshold: 0.12 }) {
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

/** Brand colors */
const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
  blue: "#2563EB", // ✅ blue for "scroll down"
  banner: "#F6B100", // warm yellow/orange like screenshot
};

/** Local fallback image */
const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stop-color="#2F0D34"/>
        <stop offset="1" stop-color="#BD9F75"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial" font-size="34" fill="white" opacity="0.95">
      Team Photo
    </text>
  </svg>
`);

const LEADERSHIP = [
  {
    name: "Guillaume Karangwa",
    role: "Founder • Study Abroad Advisor",
    photo: "/team/team-1.jpg",
    bio: "Guides students step-by-step: university selection, applications, SOP/CV, and global readiness.",
    focus: ["Admissions Strategy", "Profile Review", "Student Success"],
    isFounder: true, // ✅ founder bigger
  },
  {
    name: "TUYISHIME Elvis",
    role: "Visa Support Specialist",
    photo: "/team/team-2.jpg",
    bio: "Helps students prepare strong visa files: checklist, financial presentation, and interview guidance.",
    focus: ["Visa Checklist", "Document Review", "Interview Prep"],
  },
  {
    name: "Team Member",
    role: "Career & Mentorship Lead",
    photo: "/team/team-3.jpg",
    bio: "Supports career planning, scholarship strategy, and confidence coaching for international growth.",
    focus: ["Career Guidance", "Scholarships", "Mentorship"],
  },
];

function Kicker({ children }) {
  return (
    <div
      className="text-xs font-bold tracking-widest"
      style={{ color: BRAND.primary }}
    >
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold"
      style={{ backgroundColor: "rgba(47,13,52,0.08)", color: BRAND.primary }}
    >
      {children}
    </span>
  );
}

function MemberCard({ name, role, bio, photo, focus, isFounder }) {
  return (
    <div className="group rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      {/* ✅ Bigger founder image and better face visibility */}
      <div
        className={[
          "relative overflow-hidden",
          isFounder ? "h-72 sm:h-80" : "h-56",
        ].join(" ")}
      >
        <img
          src={photo}
          alt={name}
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          className={[
            "h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]",
            isFounder ? "object-top" : "object-center",
          ].join(" ")}
        />

        {/* ✅ overlay */
        }
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ backgroundColor: "rgba(189,159,117,0.92)", color: BRAND.primary }}
          >
            Leadership
          </span>

          {isFounder && (
            <span
              className="rounded-full px-3 py-1 text-[11px] font-bold"
              style={{ backgroundColor: "rgba(37,99,235,0.92)", color: "white" }}
            >
              Founder
            </span>
          )}
        </div>
      </div>

      <div className={isFounder ? "p-7" : "p-6"}>
        <div className={isFounder ? "text-xl font-extrabold text-gray-900" : "text-lg font-extrabold text-gray-900"}>
          {name}
        </div>

        <div className="mt-1 text-sm font-semibold" style={{ color: BRAND.primary }}>
          {role}
        </div>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{bio}</p>

        {Array.isArray(focus) && focus.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {focus.map((t) => (
              <span
                key={t}
                className="rounded-full border px-3 py-1 text-[11px] font-bold"
                style={{ borderColor: "rgba(47,13,52,0.18)", color: BRAND.primary }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ✅ Optional founder CTA */}
        {isFounder && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/how-it-works/appointments"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.primary }}
            >
              Book Appointment
            </Link>

            <Link
              to="/contact"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white hover:bg-gray-50 transition active:scale-[0.98]"
              style={{ borderColor: "rgba(0,0,0,0.15)", color: BRAND.primary }}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CompanyTeam() {
  const hero = useInView();
  const leadership = useInView();

  const scrollToLeadership = () => {
    document.getElementById("leadership")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ✅ HERO like your screenshot */}
      <section ref={hero.ref} className="relative overflow-hidden">
        {/* base */}
        <div className="absolute inset-0 -z-20" style={{ backgroundColor: "#F7F1E6" }} />

        {/* texture (must NOT block clicks) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), radial-gradient(rgba(15,23,42,0.04) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            backgroundPosition: "0 0, 17px 17px",
          }}
        />

        {/* content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:py-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">
            Our Team
          </h1>

          <div className="mt-4 text-sm sm:text-base text-gray-700">
            <Link to="/" className="text-yellow-700 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-yellow-700">Company</span>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Our Team</span>
          </div>
        </div>

        {/* ✅ Banner strip (no youtube, green->blue) */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 -mt-8">
          <div className="relative overflow-hidden rounded-3xl shadow-md ring-1 ring-black/10">
            {/* background */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: BRAND.banner }}
            />
            {/* subtle overlay - must NOT block clicks */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,0,0,0.08), transparent 55%)",
              }}
            />

            <div className="relative z-10 flex items-stretch">
              {/* left icon block */}
              {/* <div className="hidden sm:flex items-center justify-center w-24">
                <div className="h-14 w-14 rounded-2xl bg-black/10 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div> */}

              {/* text + buttons */}
              <div className="flex-1 px-6 py-8 sm:py-10">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                  Together, we help you build your international future.
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/how-it-works/appointments"
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                    style={{ backgroundColor: BRAND.primary }}
                  >
                    Book Consultation
                  </Link>

                  <Link
                    to="/services/study-abroad/university"
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white/30 hover:bg-white/40 transition active:scale-[0.98]"
                    style={{ borderColor: "rgba(0,0,0,0.18)", color: "#0B1220" }}
                  >
                    Explore Services
                  </Link>
                </div>
              </div>

              {/* right scroll bar (blue) */}
              <button
                type="button"
                onClick={scrollToLeadership}
                className="w-14 sm:w-20 flex items-center justify-center"
                style={{ backgroundColor: BRAND.blue }}
                aria-label="Scroll down to leadership"
              >
                <div className="rotate-90 text-white font-bold tracking-widest text-xs sm:text-sm">
                  Scroll Down
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ LEADERSHIP (directly after banner) */}
      <section
        id="leadership"
        ref={leadership.ref}
        className="mx-auto max-w-7xl px-4 pb-14"
      >
        <div
          className={[
            "text-center transition-all duration-700 ease-out",
            leadership.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <Kicker>LEADERSHIP</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            The team leading your success
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Clear guidance, strong document review, and honest coaching — built around your goals.
          </p>
        </div>

        {/* ✅ Founder bigger than others */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {LEADERSHIP.map((m, idx) => (
            <div
              key={m.name}
              className={[
                "transition-all duration-700 ease-out",
                leadership.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                m.isFounder ? "lg:col-span-2" : "",
              ].join(" ")}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <MemberCard {...m} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <Kicker>READY TO START?</Kicker>
            <div className="mt-2 text-2xl font-extrabold text-gray-900">
              Let’s plan your next step together
            </div>
            <div className="mt-2 text-gray-600">
              Book an appointment and we will guide you based on your destination, budget, and timeline.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/how-it-works/appointments"
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.primary }}
            >
              Book Appointment
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
              style={{ borderColor: BRAND.accent, color: BRAND.primary }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
