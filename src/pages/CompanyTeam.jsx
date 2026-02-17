import React from "react";
import { Link } from "react-router-dom";

/** In-view animation hook (same style you use) */
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

/** Brand colors (match your site) */
const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
};

/** Local fallback image (no external link) */
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

const DEPARTMENTS = [
  {
    title: "Admissions & University Matching",
    desc: "We help students choose the right program, build strong applications, and meet deadlines.",
    points: ["University shortlist", "SOP/CV support", "Document preparation", "Application submission"],
  },
  {
    title: "Visa & Travel Support",
    desc: "We help you prepare a complete visa file and reduce mistakes that cause refusals.",
    points: ["Checklist planning", "Financial file guidance", "Appointment preparation", "Pre-departure support"],
  },
  {
    title: "Culture Exchange & Settling",
    desc: "We guide students to adapt faster abroad through communication and real-life cultural tips.",
    points: ["Culture readiness", "Etiquette coaching", "Confidence sessions", "Community integration"],
  },
];

function Kicker({ children }) {
  return (
    <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
      {children}
    </div>
  );
}

function Pill({ children, variant = "soft" }) {
  const style =
    variant === "solid"
      ? { backgroundColor: BRAND.primary, color: "white" }
      : { backgroundColor: "rgba(47,13,52,0.08)", color: BRAND.primary };

  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold" style={style}>
      {children}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-bold tracking-widest text-gray-500">{label}</div>
      <div className="mt-2 text-xl font-extrabold text-gray-900">{value}</div>
    </div>
  );
}

function MemberCard({ name, role, bio, photo, focus }) {
  return (
    <div className="group rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative h-52 overflow-hidden">
        <img
          src={photo}
          alt={name}
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute left-4 top-4">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ backgroundColor: "rgba(189,159,117,0.92)", color: BRAND.primary }}
          >
            Leadership
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="text-lg font-extrabold text-gray-900">{name}</div>
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
      </div>
    </div>
  );
}

export default function CompanyTeam() {
  const hero = useInView();
  const section1 = useInView();
  const section2 = useInView();
  const section3 = useInView();

  return (
    <div className="bg-white relative overflow-x-hidden">
      {/* Soft top gradient */}
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[520px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(47,13,52,0.06) 0%, rgba(189,159,117,0.10) 45%, transparent 100%)",
        }}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-700">Company</span> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Our Team</span>
        </div>
      </div>

      {/* HERO */}
      <section ref={hero.ref} className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left */}
          <div
            className={[
              "lg:col-span-7 transition-all duration-700 ease-out",
              hero.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <div className="flex flex-wrap gap-2">
              <Pill>Company</Pill>
              <Pill>Our Team</Pill>
              <Pill>Student Support</Pill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Meet the people behind your global journey
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
              We are a student-first team helping you with admissions, visa preparation, culture adaptation,
              and career guidance — with clarity, honesty, and step-by-step support.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/how-it-works/appointments"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Book an Appointment
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: BRAND.accent, color: BRAND.primary }}
              >
                Contact Our Team
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Focus" value="Student Success" />
              <StatCard label="Style" value="Step-by-step" />
              <StatCard label="Support" value="Online & Local" />
            </div>
          </div>

          {/* Right */}
          <div
            className={[
              "lg:col-span-5 transition-all duration-700 ease-out",
              hero.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div
                className="p-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(47,13,52,0.10), rgba(189,159,117,0.14))",
                }}
              >
                <div className="text-sm font-extrabold text-gray-900">What we do best</div>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  Admissions planning • SOP/CV support • Visa checklist • Pre-departure guidance • Culture coaching
                </p>
              </div>

              <div className="p-6">
                <div className="grid gap-3">
                  {[
                    "Clear guidance (no confusion)",
                    "Strong document review",
                    "Respectful coaching and honesty",
                    "Fast communication and follow-up",
                  ].map((t) => (
                    <div key={t} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                      <div className="text-sm text-gray-700">{t}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs font-bold tracking-widest text-gray-500">NOTE</div>
                  <div className="mt-2 text-sm text-gray-700">
                    We don’t promise “magic”. We promise strong preparation and support you can trust.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section ref={section1.ref} className="mx-auto max-w-7xl px-4 pb-14">
        <div
          className={[
            "text-center transition-all duration-700 ease-out",
            section1.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <Kicker>LEADERSHIP</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">The team leading your success</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Experienced guidance, practical coaching, and careful document review — built around your goals.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((m, idx) => (
            <div
              key={m.name}
              className={[
                "transition-all duration-700 ease-out",
                section1.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <MemberCard {...m} />
            </div>
          ))}
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section ref={section2.ref} className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={[
              "text-center transition-all duration-700 ease-out",
              section2.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <Kicker>HOW WE SUPPORT</Kicker>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Teams & departments</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Each department focuses on a clear area so you always know who is helping you.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {DEPARTMENTS.map((d, idx) => (
              <div
                key={d.title}
                className={[
                  "rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-700 ease-out",
                  section2.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="text-sm font-extrabold text-gray-900">{d.title}</div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{d.desc}</p>

                <div className="mt-4 space-y-2">
                  {d.points.map((p) => (
                    <div key={p} className="flex gap-3 text-sm text-gray-700">
                      <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>{idx === 0 ? "Admissions" : idx === 1 ? "Visa" : "Culture"}</Pill>
                  <Pill variant="solid">Support</Pill>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={section3.ref} className="mx-auto max-w-7xl px-4 py-14">
        <div
          className={[
            "rounded-3xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 transition-all duration-700 ease-out",
            section3.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
        >
          <div>
            <Kicker>READY TO START?</Kicker>
            <div className="mt-2 text-2xl font-extrabold text-gray-900">Let’s plan your next step together</div>
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
              to="/services/study-abroad/university"
              className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
              style={{ borderColor: BRAND.accent, color: BRAND.primary }}
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}