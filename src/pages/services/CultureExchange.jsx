import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CULTURE_EVENTS } from "../../data/cultureEvents";

/** In-view animation hook */
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

/** Brand colors */
const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
};

/** Hero banner colors */
const HERO = {
  paper: "#F7F1E6",
  banner: "#F6B100",
  blue: "#2563EB",
  ink: "#0B1220",
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
      Image
    </text>
  </svg>
`);

/** ✅ Local images (put them in: public/culture/) */
const IMAGES = {
  section: "/culture/section1.jpg",
  programs: ["/culture/hostfamily.jpg", "/culture/program-2.jpg", "/culture/section.jpg"],
  support: [
    "/culture/program-1.jpg",
    "/culture/etiqueting-1.jpg",
    "/culture/etiqueting-2.jpg",
    "/culture/etiqueting-3.jpg",
  ],
};

const PROGRAMS = [
  {
    title: "Student Culture Exchange",
    desc: "Support for students joining exchange programs, host families, and community integration.",
  },
  {
    title: "Work / Internship Exchange",
    desc: "Guidance for workplace culture, communication style, and professional etiquette.",
  },
  {
    title: "Community & Networking",
    desc: "We guide you to find safe communities, events, and networks to reduce isolation abroad.",
  },
];

const SUPPORT = [
  {
    title: "Pre-departure Orientation",
    desc: "Culture shock, expectations, rules, safety tips, budgeting, and simple planning.",
  },
  {
    title: "Communication & Etiquette",
    desc: "How to speak professionally, behave respectfully, and avoid misunderstandings.",
  },
  {
    title: "Settling-in Support",
    desc: "Accommodation guidance, transportation tips, and adapting to daily lifestyle.",
  },
  {
    title: "Cultural Confidence Coaching",
    desc: "Confidence coaching so you adapt faster, connect better, and succeed abroad.",
  },
];

const FAQS = [
  {
    q: "What is culture exchange support?",
    a: "It is guidance that helps you adapt to a new culture: communication, etiquette, lifestyle, safety, and integration with people.",
  },
  {
    q: "Is it only for students?",
    a: "No. We support students, interns, workers, and anyone moving abroad who wants to integrate smoothly.",
  },
  {
    q: "Can you support me online?",
    a: "Yes. Everything can be done online: coaching, checklists, preparation sessions, and follow-ups.",
  },
  {
    q: "Do you help with community connections?",
    a: "Yes. We guide you on how to find safe communities, student groups, events, and professional networks.",
  },
];

function Kicker({ children }) {
  return (
    <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
      {children}
    </div>
  );
}

function ImageCard({ title, desc, img }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          className="h-full w-full object-cover hover:scale-[1.04] transition duration-500"
        />
      </div>
      <div className="p-6">
        <div className="text-sm font-extrabold text-gray-900">{title}</div>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function normalizeEvent(ev) {
  const cover = ev.cover || ev.image || "/culture/event-default.jpg";

  return {
    id: ev.id,
    title: ev.title,
    audience: ev.audience || "Students",
    cover,
    summary: ev.summary || ev.overview || ev.desc || "Culture exchange experience and guided learning.",
    fee: ev.fee || "Free",
  };
}

export default function CultureExchange() {
  const navigate = useNavigate();
  const hero = useInView({ threshold: 0.18 });
  const formRef = React.useRef(null);

  const [faqOpen, setFaqOpen] = React.useState(0);

  // Preview first 3 events (if any)
  const eventsPreview = (Array.isArray(CULTURE_EVENTS) ? CULTURE_EVENTS : [])
    .slice(0, 3)
    .map(normalizeEvent);

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    programType: "",
    message: "",
  });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    console.log("Culture Exchange Inquiry:", form);
    alert("Thanks! We received your request. We will contact you soon.");
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  const goEvents = () => navigate("/services/Culture_exchange/events");

  const goApply = (event) => {
    navigate(`/services/Culture_exchange/events/${event.id}/apply`, { state: { event } });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ✅ HERO + EDGE-TO-EDGE BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20" style={{ backgroundColor: HERO.paper }} />

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

        <div ref={hero.ref} className="relative z-10 mx-auto max-w-7xl px-4 pt-[120px] pb-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">Culture Exchange</h1>

          <div className="mt-4 text-sm sm:text-base text-gray-700">
            <Link to="/" className="text-yellow-700 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">Services</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Culture Exchange</span>
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-gray-700 leading-relaxed">
            We help you adapt faster abroad: cultural expectations, communication, etiquette, confidence, safety,
            and community integration.
          </p>
        </div>

        {/* ✅ FULL WIDTH BANNER */}
        <div className="relative z-10 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: HERO.banner }} />

          {/* overlay must NOT block clicks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.08), transparent 55%)" }}
          />

          <div className="relative mx-auto max-w-7xl px-4">
            <div className="py-8 pr-[72px] sm:pr-[96px]">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                    Ready to prepare for your destination?
                  </div>
                  <div className="mt-1 text-sm sm:text-base text-gray-800">
                    Request guidance or browse culture exchange events.
                  </div>
                </div>
              </div>

              {/* ✅ CLEAN: ONLY 2 buttons here */}
              <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: HERO.blue }}
                >
                  Request Guidance
                </button>

                <button
                  type="button"
                  onClick={goEvents}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white/20 hover:bg-white/25 transition active:scale-[0.98]"
                  style={{ borderColor: "rgba(0,0,0,0.18)", color: HERO.ink }}
                >
                  Browse Events →
                </button>
              </div>
            </div>
          </div>

          {/* blue scroll bar */}
          <button
            type="button"
            onClick={scrollToForm}
            className="absolute right-0 top-0 h-full w-14 sm:w-20 flex items-center justify-center"
            style={{ backgroundColor: HERO.blue }}
            aria-label="Scroll down to request form"
          >
            <div className="rotate-90 text-white font-bold tracking-widest text-xs sm:text-sm">
              Scroll Down
            </div>
          </button>
        </div>

        <div className="h-10" />
      </section>

      {/* ✅ EVENTS PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="text-center">
          <Kicker>UPCOMING EVENTS</Kicker>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Apply to a culture event</h2>
          <p className="mt-2 text-gray-600">
            If you don’t see events yet, check again soon — we keep updating them.
          </p>
        </div>

        {eventsPreview.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="text-lg font-extrabold text-gray-900">No events yet</div>
            <p className="mt-2 text-sm text-gray-600">We will publish upcoming events here soon.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eventsPreview.map((e) => (
              <div
                key={e.id}
                className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-44">
                  <img
                    src={e.cover}
                    alt={e.title}
                    onError={(ev) => (ev.currentTarget.src = FALLBACK_IMG)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-gray-900">
                      {e.audience}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold"
                      style={{ backgroundColor: "rgba(189,159,117,0.92)", color: BRAND.primary }}
                    >
                      {e.fee}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-lg font-extrabold text-gray-900">{e.title}</div>
                  <div className="mt-2 text-sm text-gray-600 leading-relaxed">{e.summary}</div>

                  {/* ✅ CLEAN: ONLY Apply button */}
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => goApply(e)}
                      className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                      style={{ backgroundColor: BRAND.primary }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ PROGRAMS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="text-center">
          <Kicker>PROGRAMS</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Who this is for</h2>
          <p className="mt-3 text-gray-600">Different journeys need different preparation.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, idx) => (
            <ImageCard
              key={p.title}
              title={p.title}
              desc={p.desc}
              img={IMAGES.programs[idx] || IMAGES.section}
            />
          ))}
        </div>
      </section>

      {/* ✅ SUPPORT */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
                <img
                  src={IMAGES.section}
                  alt="Culture guidance"
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <Kicker>WHAT WE SUPPORT</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
                Practical guidance you can use immediately
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We focus on real-life situations: communication, etiquette, confidence, safety, and community.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {SUPPORT.map((s, idx) => (
                  <ImageCard
                    key={s.title}
                    title={s.title}
                    desc={s.desc}
                    img={IMAGES.support[idx] || IMAGES.section}
                  />
                ))}
              </div>

              {/* ✅ REMOVED: extra buttons here (duplicates) */}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <Kicker>FAQ</Kicker>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Common questions</h3>
          </div>

          <div className="mt-6 mx-auto max-w-3xl space-y-3">
            {FAQS.map((f, idx) => {
              const open = faqOpen === idx;
              return (
                <div key={f.q} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setFaqOpen((p) => (p === idx ? -1 : idx))}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                    aria-expanded={open}
                  >
                    <div className="text-sm font-extrabold text-gray-900">{f.q}</div>
                    <span className="text-lg font-bold" style={{ color: BRAND.primary }}>
                      {open ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={[
                      "grid transition-all duration-300 ease-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                      {f.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ✅ FORM */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <Kicker>REQUEST GUIDANCE</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Tell us your plan</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Share your destination and program type. We will contact you with the best guidance.
              </p>
            </div>

            <form
              ref={formRef}
              onSubmit={submit}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="grid gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700">Full Name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    required
                    className={inputBase}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    className={inputBase}
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Phone / WhatsApp</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="+250..."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Destination (optional)</label>
                  <input
                    name="destination"
                    value={form.destination}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="Canada, UK, Germany..."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Program Type (optional)</label>
                  <select
                    name="programType"
                    value={form.programType}
                    onChange={onChange}
                    className={`${inputBase} bg-white`}
                  >
                    <option value="">Select type...</option>
                    <option value="Student Exchange">Student Exchange</option>
                    <option value="Work / Internship">Work / Internship</option>
                    <option value="Community / Networking">Community / Networking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Message (optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={4}
                    className={inputBase}
                    placeholder="Tell us your concerns, timeline, and goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Submit Request
                </button>

                <div className="text-xs text-gray-500">
                  By submitting, you agree we may contact you for follow-up about your request.
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
