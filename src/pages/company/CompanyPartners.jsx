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
};

/** local fallback logo */
const FALLBACK_LOGO =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="500">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stop-color="#2F0D34"/>
        <stop offset="1" stop-color="#BD9F75"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="28" ry="28" fill="url(#g)"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial" font-size="28" fill="white" opacity="0.95">
      Partner Logo
    </text>
  </svg>
`);

/**
 * ✅ Update these with your real partners.
 * Logos should be in /public/partners/...
 */
const PARTNER_GROUPS = [
  {
    key: "universities",
    title: "University Partners",
    desc: "Trusted institutions that support admissions and offer programs abroad.",
    items: [
      { name: "University Partner 1", logo: "/partners/university-1.png", to: "/services/study-abroad/university" },
      { name: "University Partner 2", logo: "/partners/university-2.png", to: "/services/study-abroad/university" },
      { name: "University Partner 3", logo: "/partners/university-3.png", to: "/services/study-abroad/university" },
      { name: "University Partner 4", logo: "/partners/university-4.png", to: "/services/study-abroad/university" },
    ],
  },
  {
    key: "loans",
    title: "Academic Loan & Financing",
    desc: "Organizations that support education financing and loan guidance.",
    items: [
      { name: "Loan Partner 1", logo: "/partners/bank-1.png" },
      { name: "Loan Partner 2", logo: "/partners/bank-2.png" },
      { name: "Loan Partner 3", logo: "/partners/bank-3.png" },
    ],
  },
  {
    key: "community",
    title: "Community & Exchange Partners",
    desc: "Groups supporting cultural integration, exchange programs, and student life.",
    items: [
      { name: "Community Partner 1", logo: "/partners/ngo-1.png", to: "/services/Culture_exchange" },
      { name: "Community Partner 2", logo: "/partners/ngo-2.png", to: "/services/Culture_exchange" },
      { name: "Community Partner 3", logo: "/partners/ngo-3.png", to: "/services/Culture_exchange/events" },
    ],
  },
];

function Kicker({ children }) {
  return (
    <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
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

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-bold tracking-widest text-gray-500">{label}</div>
      <div className="mt-2 text-xl font-extrabold text-gray-900">{value}</div>
    </div>
  );
}

function PartnerCard({ name, logo, to }) {
  return (
    <Link
      to={to || "/contact"}
      className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition flex items-center gap-4"
      aria-label={`Go to ${name}`}
    >
      <div className="h-14 w-14 rounded-2xl ring-1 ring-black/10 bg-white overflow-hidden flex items-center justify-center">
        <img
          src={logo}
          alt={name}
          onError={(e) => (e.currentTarget.src = FALLBACK_LOGO)}
          className="h-full w-full object-contain p-2"
        />
      </div>

      <div className="min-w-0">
        <div className="text-sm font-extrabold text-gray-900 truncate">{name}</div>
        {/* ✅ REMOVED: "View partnership details →" */}
      </div>
    </Link>
  );
}

export default function CompanyPartners() {
  const hero = useInView();
  const section1 = useInView();
  const section2 = useInView();

  return (
    <div className="bg-white relative overflow-x-hidden">
      {/* Soft top background */}
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
          <span className="text-gray-900 font-semibold">Partners</span>
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
              <Pill>Partners</Pill>
              <Pill>Trusted Collaboration</Pill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Partnerships that open global opportunities
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
              We collaborate with universities, financing partners, and community organizations to help students
              access admissions, visas, culture exchange, and global readiness support.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {/* ✅ Now goes to the request form page */}
              <Link
                to="/company/partners/request"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Become a Partner
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: BRAND.accent, color: BRAND.primary }}
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Focus" value="Trust" />
              <StatCard label="Goal" value="Student Success" />
              <StatCard label="Style" value="Win-win" />
            </div>
          </div>

          {/* Right info box */}
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
                <div className="text-sm font-extrabold text-gray-900">Partnership benefits</div>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  Visibility • Student referrals • Shared events • Local community impact • Faster support
                </p>
              </div>

              <div className="p-6">
                <div className="grid gap-3">
                  {[
                    "Transparent collaboration",
                    "Clear communication and reporting",
                    "Student-first ethics",
                    "Long-term partnership growth",
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
                    We prioritize quality partners that match student needs and build real results.
                  </div>
                </div>

                {/* ✅ Extra CTA to the request page */}
                <Link
                  to="/company/partners/request"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Request Partnership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER GROUPS */}
      <section ref={section1.ref} className="mx-auto max-w-7xl px-4 pb-14">
        <div
          className={[
            "text-center transition-all duration-700 ease-out",
            section1.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <Kicker>OUR PARTNERS</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Organizations we work with</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Partnership categories — click any card to view related services.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {PARTNER_GROUPS.map((g, gIdx) => (
            <div
              key={g.key}
              className={[
                "rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-700 ease-out",
                section1.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{ transitionDelay: `${gIdx * 120}ms` }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-lg font-extrabold text-gray-900">{g.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{g.desc}</div>
                </div>

                {/* ✅ Partner with us button now links to the request form PAGE */}
                <Link
                  to="/company/partners/request"
                  className="rounded-xl border bg-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
                >
                  Partner with us →
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((p) => (
                  <PartnerCard key={p.name} name={p.name} logo={p.logo} to={p.to} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PARTNER */}
      <section ref={section2.ref} className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={[
              "text-center transition-all duration-700 ease-out",
              section2.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <Kicker>WHY PARTNER WITH US</Kicker>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">A partnership built on trust</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              We focus on students’ outcomes, high-quality guidance, and transparent collaboration.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Student-first impact", desc: "We prioritize accurate guidance and real results — not empty promises." },
              { title: "Clear reporting", desc: "We can share feedback, outcomes, and insights from student support journeys." },
              { title: "Visibility & growth", desc: "Partners benefit from visibility through sessions, events, and referrals." },
            ].map((b, idx) => (
              <div
                key={b.title}
                className={[
                  "rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-700 ease-out",
                  section2.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="text-sm font-extrabold text-gray-900">{b.title}</div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <Pill>Quality</Pill>
                  <Pill>Collaboration</Pill>
                  <Pill>Growth</Pill>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/company/partners/request"
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.primary }}
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}