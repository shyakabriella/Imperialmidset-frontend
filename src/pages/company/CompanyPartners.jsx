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
  blue: "#2563EB", // ✅ blue for scroll bar
  banner: "#F6B100", // warm yellow/orange
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

function PartnerCard({ name, logo, to }) {
  return (
    <Link
      to={to || "/contact"}
      className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition flex items-center gap-5"
      aria-label={`Go to ${name}`}
    >
      {/* ✅ Bigger logo */}
      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl ring-1 ring-black/10 bg-white overflow-hidden flex items-center justify-center">
        <img
          src={logo}
          alt={name}
          onError={(e) => (e.currentTarget.src = FALLBACK_LOGO)}
          className="h-full w-full object-contain p-3"
        />
      </div>

      <div className="min-w-0">
        <div className="text-base sm:text-lg font-extrabold text-gray-900 truncate">
          {name}
        </div>
      </div>
    </Link>
  );
}

export default function CompanyPartners() {
  const hero = useInView();
  const groups = useInView();

  const scrollToPartners = () => {
    document.getElementById("partners")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ✅ HERO like your screenshot */}
      <section ref={hero.ref} className="relative overflow-hidden">
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">
            Partners
          </h1>

          <div className="mt-4 text-sm sm:text-base text-gray-700">
            <Link to="/" className="text-yellow-700 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-yellow-700">Company</span>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Partners</span>
          </div>
        </div>

        {/* ✅ Banner strip (clickable buttons fixed) */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 -mt-8">
          <div className="relative overflow-hidden rounded-3xl shadow-md ring-1 ring-black/10">
            <div className="absolute inset-0" style={{ backgroundColor: BRAND.banner }} />

            {/* overlay must NOT block clicks */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,0,0,0.08), transparent 55%)",
              }}
            />

            <div className="relative z-10 flex items-stretch">
              {/* <div className="hidden sm:flex items-center justify-center w-24">
                <div className="h-14 w-14 rounded-2xl bg-black/10 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
              </div> */}

              <div className="flex-1 px-6 py-8 sm:py-10">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                  Partnerships that open global opportunities.
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/company/partners/request"
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                    style={{ backgroundColor: BRAND.blue }}
                  >
                    Request Partnership
                  </Link>

                  <button
                    type="button"
                    onClick={scrollToPartners}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white/20 hover:bg-white/25 transition active:scale-[0.98]"
                    style={{ borderColor: "rgba(0,0,0,0.18)", color: "#0B1220" }}
                  >
                    See Partners ↓
                  </button>
                </div>
              </div>

              {/* blue scroll bar */}
              <button
                type="button"
                onClick={scrollToPartners}
                className="w-14 sm:w-20 flex items-center justify-center"
                style={{ backgroundColor: BRAND.blue }}
                aria-label="Scroll down to partners"
              >
                <div className="rotate-90 text-white font-bold tracking-widest text-xs sm:text-sm">
                  Scroll Down
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ PARTNERS */}
      <section id="partners" ref={groups.ref} className="mx-auto max-w-7xl px-4 pb-14">
        <div
          className={[
            "text-center transition-all duration-700 ease-out",
            groups.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <Kicker>OUR PARTNERS</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Organizations we work with
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Partnership categories — click any card to view related services.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {PARTNER_GROUPS.map((g) => (
            <div
              key={g.key}
              className={[
                "rounded-3xl border border-gray-200 bg-white p-6 shadow-sm",
                "transition-all duration-700 ease-out",
                groups.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-lg font-extrabold text-gray-900">{g.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{g.desc}</div>
                </div>

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

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>Trust</Pill>
                <Pill>Collaboration</Pill>
                <Pill>Student Success</Pill>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/company/partners/request"
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
            style={{ backgroundColor: BRAND.primary }}
          >
            Become a Partner
          </Link>
        </div>
      </section>
    </div>
  );
}
