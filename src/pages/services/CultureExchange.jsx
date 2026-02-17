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

/** ✅ Local images (put them in: public/culture/) */
const IMAGES = {
  heroMain: "/culture/hero-main.jpg",
  hero1: "/culture/hero-3.jpg",
  hero2: "/culture/hero-2.jpg",
  hero3: "/culture/hero-1.jpg",
  strip: ["/culture/strip-1.jpg", "/culture/strip-2.jpg", "/culture/strip-3.jpg", "/culture/strip-4.jpg"],
  section: "/culture/section1.jpg",
  programs: ["/culture/hostfamily.jpg", "/culture/program-2.jpg", "/culture/section.jpg"],
  support: ["/culture/program-1.jpg", "/culture/etiqueting-1.jpg", "/culture/etiqueting-2.jpg", "/culture/etiqueting-3.jpg"],
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

const DESTINATIONS = [
  { name: "Canada", note: "Friendly, diverse, strong communities" },
  { name: "USA", note: "Fast-paced culture, many opportunities" },
  { name: "UK", note: "Formal etiquette, global environment" },
  { name: "Germany", note: "Structured systems, punctuality matters" },
  { name: "Australia", note: "Relaxed culture, open communication" },
  { name: "Poland", note: "Affordable, growing international student life" },
];

const CHECKLIST = [
  "Know basic local etiquette (greetings, time, dress)",
  "Understand culture shock stages and how to manage them",
  "Learn communication style (direct vs indirect)",
  "Prepare safe housing plan and emergency contacts",
  "Budget plan and lifestyle expectations",
  "Build confidence: networking, community, and self-care",
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

function SoftPill({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold"
      style={{ backgroundColor: "rgba(47,13,52,0.08)", color: BRAND.primary }}
    >
      {children}
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-bold tracking-widest text-gray-500">{label}</div>
      <div className="mt-2 text-xl font-extrabold text-gray-900">{value}</div>
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
  const dateStart = ev.dateStart || ev.date || "";
  const dateEnd = ev.dateEnd || ev.endDate || ev.date || "";
  const cover =
    ev.cover || ev.image || "/culture/event-default.jpg"; // optional local fallback

  return {
    id: ev.id,
    title: ev.title,
    audience: ev.audience || "Students",
    location: ev.location || "Kigali, Rwanda",
    dateStart,
    dateEnd,
    cover,
    summary: ev.summary || ev.overview || ev.desc || "Culture exchange experience and guided learning.",
    fee: ev.fee || "Free",
    seats: ev.seats ?? "Limited",
  };
}

export default function CultureExchange() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
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

  return (
    <div className="bg-white relative">
      {/* soft top background */}
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[560px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(189,159,117,0.12) 0%, rgba(47,13,52,0.06) 42%, transparent 100%)",
        }}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-700">Services</span> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Culture Exchange</span>
        </div>
      </div>

      {/* HERO */}
      <section ref={ref} className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left */}
          <div
            className={[
              "lg:col-span-6 transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <div className="flex flex-wrap gap-2">
              <SoftPill>Culture Exchange</SoftPill>
              <SoftPill>Preparation • Adaptation • Confidence</SoftPill>
              <SoftPill>Online Guidance</SoftPill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Adapt faster abroad and feel confident in a new culture
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We help you understand cultural expectations, communicate clearly, avoid common mistakes,
              and integrate smoothly in your new environment.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Request Guidance
              </button>

              <button
                type="button"
                onClick={goEvents}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: BRAND.accent, color: BRAND.primary }}
              >
                Browse Events
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Support" value="Step-by-step" />
              <Stat label="Style" value="Coaching" />
              <Stat label="Mode" value="Online" />
            </div>
          </div>

          {/* Right collage */}
          <div
            className={[
              "lg:col-span-6 transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="grid gap-4 sm:grid-cols-12">
              <div className="sm:col-span-7 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
                <img src={IMAGES.heroMain} alt="Culture exchange" className="h-[320px] w-full object-cover" />
              </div>

              <div className="sm:col-span-5 grid gap-4">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
                  <img src={IMAGES.hero1} alt="Students" className="h-[152px] w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
                  <img src={IMAGES.hero2} alt="Teamwork" className="h-[152px] w-full object-cover" />
                </div>
              </div>

              <div className="sm:col-span-12 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
                <img src={IMAGES.hero3} alt="Learning" className="h-[170px] w-full object-cover" />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">What you gain</div>
              <div className="mt-1 text-sm text-gray-600">
                Confidence • Communication • Social integration • Professional etiquette
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ EVENTS PREVIEW (links to events + apply) */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <Kicker>UPCOMING EVENTS</Kicker>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Apply to a culture event</h2>
            <p className="mt-2 text-gray-600">
              You can browse all events, or apply directly from here.
            </p>
          </div>

          <button
            type="button"
            onClick={goEvents}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow active:scale-[0.98]"
            style={{ backgroundColor: BRAND.primary }}
          >
            View all events
          </button>
        </div>

        {eventsPreview.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="text-lg font-extrabold text-gray-900">No events yet</div>
            <p className="mt-2 text-sm text-gray-600">We will publish upcoming events here soon.</p>
            <button
              type="button"
              onClick={goEvents}
              className="inline-flex mt-5 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition"
              style={{ backgroundColor: BRAND.primary }}
            >
              Go to Events page
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eventsPreview.map((e) => (
              <div
                key={e.id}
                className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-44">
                  <img src={e.cover} alt={e.title} className="absolute inset-0 h-full w-full object-cover" />
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

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => goApply(e)}
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                      style={{ backgroundColor: BRAND.primary }}
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={goEvents}
                      className="rounded-xl px-4 py-2.5 text-sm font-semibold border shadow-sm bg-white hover:bg-gray-50 transition"
                      style={{ borderColor: "rgba(47,13,52,0.25)", color: BRAND.primary }}
                    >
                      More events
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PHOTO STRIP */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Kicker>REAL LIFE EXPERIENCE</Kicker>
            <span className="text-xs font-bold text-gray-500">Culture • Community • Learning</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {IMAGES.strip.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-2xl ring-1 ring-black/10">
                <img
                  src={src}
                  alt={`Culture moment ${i + 1}`}
                  className="h-40 w-full object-cover hover:scale-[1.03] transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="text-center">
          <Kicker>PROGRAMS</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Who this is for</h2>
          <p className="mt-3 text-gray-600">Different journeys need different preparation.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, idx) => (
            <ImageCard key={p.title} title={p.title} desc={p.desc} img={IMAGES.programs[idx] || IMAGES.heroMain} />
          ))}
        </div>
      </section>

      {/* SUPPORT */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
                <img src={IMAGES.section} alt="Culture guidance" className="h-[420px] w-full object-cover" />
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
                  <ImageCard key={s.title} title={s.title} desc={s.desc} img={IMAGES.support[idx] || IMAGES.hero1} />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Start coaching
                </button>

                <button
                  type="button"
                  onClick={goEvents}
                  className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                  style={{ borderColor: BRAND.accent, color: BRAND.primary }}
                >
                  Browse Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MIDDLE */}
      <section id="middle" className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <Kicker>GUIDE</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Destinations, checklist and FAQ</h2>
          <p className="mt-3 text-gray-600">Key guidance placed early to help users decide quickly.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Destinations */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <Kicker>DESTINATIONS</Kicker>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgba(47,13,52,0.08)", color: BRAND.primary }}
              >
                Popular
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Where we guide you</h3>
            <p className="mt-2 text-sm text-gray-600">
              We guide you based on your destination culture and daily lifestyle expectations.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {DESTINATIONS.map((d) => (
                <div key={d.name} className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-sm font-extrabold text-gray-900">{d.name}</div>
                  <div className="mt-1 text-xs text-gray-600">{d.note}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={goEvents}
              className="mt-6 w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.primary }}
            >
              Browse Events
            </button>
          </div>

          {/* Checklist */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <Kicker>READINESS CHECKLIST</Kicker>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgba(189,159,117,0.18)", color: BRAND.primary }}
              >
                Preparation
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Be ready before you travel</h3>
            <p className="mt-2 text-sm text-gray-600">These small things reduce stress and culture shock a lot.</p>

            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              {CHECKLIST.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                  {c}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="mt-6 w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.primary }}
            >
              Get coaching support
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
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
                    <div className="overflow-hidden px-5 pb-4 text-sm text-gray-600 leading-relaxed">{f.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <Kicker>REQUEST GUIDANCE</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Tell us your plan</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Share your destination and program type. We will contact you with the best guidance.
              </p>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-extrabold text-gray-900">You will receive</div>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {[
                    "A simple preparation checklist",
                    "Culture and etiquette tips for your destination",
                    "Confidence and communication guidance",
                    "Community integration tips",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form ref={formRef} onSubmit={submit} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700">Full Name</label>
                  <input name="fullName" value={form.fullName} onChange={onChange} required className={inputBase} placeholder="Your name" />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Email</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required className={inputBase} placeholder="you@email.com" />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Phone / WhatsApp</label>
                  <input name="phone" value={form.phone} onChange={onChange} className={inputBase} placeholder="+250..." />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Destination (optional)</label>
                  <input name="destination" value={form.destination} onChange={onChange} className={inputBase} placeholder="Canada, UK, Germany..." />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Program Type (optional)</label>
                  <select name="programType" value={form.programType} onChange={onChange} className={`${inputBase} bg-white`}>
                    <option value="">Select type...</option>
                    <option value="Student Exchange">Student Exchange</option>
                    <option value="Work / Internship">Work / Internship</option>
                    <option value="Community / Networking">Community / Networking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Message (optional)</label>
                  <textarea name="message" value={form.message} onChange={onChange} rows={4} className={inputBase} placeholder="Tell us your concerns, timeline, and goals..." />
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