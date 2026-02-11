import React from "react";
import { Link } from "react-router-dom";

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

/** Brand colors (logo style) */
const BRAND = {
  primary: "#2F0D34", // purple
  accent: "#BD9F75", // gold
};

/**
 * ✅ Images:
 * Option A (Recommended): Put your own images in /public and use paths like "/images/culture-1.jpg"
 * Option B: Keep these remote images (already working). You can replace later.
 */
const IMAGES = {
  heroMain:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80",
  hero1:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  hero2:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  hero3:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  strip: [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  ],
  section:
    "https://images.unsplash.com/photo-1520975693416-35a01f4b66aa?auto=format&fit=crop&w=1400&q=80",
};

const PROGRAMS = [
  {
    title: "Student Culture Exchange",
    desc: "Support for students joining cultural exchange programs, host families, and community integration.",
    icon: "🎓",
  },
  {
    title: "Work / Internship Exchange",
    desc: "Guidance for adapting to workplace culture, communication style, and professional etiquette.",
    icon: "💼",
  },
  {
    title: "Community & Networking",
    desc: "We connect you with communities, events, and safe social circles to reduce isolation abroad.",
    icon: "🤝",
  },
];

const SUPPORT = [
  {
    title: "Pre-departure Orientation",
    desc: "Culture shock, expectations, rules, safety tips, budgeting, and simple planning.",
    icon: "🧭",
  },
  {
    title: "Communication & Etiquette",
    desc: "How to speak professionally, how to behave respectfully, and how to avoid misunderstandings.",
    icon: "🗣️",
  },
  {
    title: "Settling-in Support",
    desc: "Accommodation guidance, transportation tips, and adapting to the daily lifestyle.",
    icon: "🏡",
  },
  {
    title: "Cultural Confidence Coaching",
    desc: "Confidence-building and mindset coaching so you can adapt and succeed abroad.",
    icon: "✨",
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
    a: "It is guidance that helps you adapt to the new culture — communication, etiquette, lifestyle, safety, and integration with people.",
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

function Card({ icon, title, desc }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div
          className="h-11 w-11 rounded-2xl flex items-center justify-center text-lg"
          style={{ backgroundColor: "rgba(189,159,117,0.18)" }}
        >
          {icon}
        </div>
        <div className="text-sm font-extrabold text-gray-900">{title}</div>
      </div>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function CultureExchange() {
  const { ref, inView } = useInView();

  const formRef = React.useRef(null);
  const [faqOpen, setFaqOpen] = React.useState(0);

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
    alert("✅ Thanks! We received your request. We will contact you soon.");
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

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

      {/* HERO with image collage (unique style) */}
      <section ref={ref} className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left text */}
          <div
            className={[
              "lg:col-span-6 transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <div className="flex flex-wrap gap-2">
              <SoftPill>🌍 Culture Exchange</SoftPill>
              <SoftPill>Preparation • Adaptation • Confidence</SoftPill>
              <SoftPill>Online Guidance</SoftPill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Adapt faster abroad — feel confident in a new culture 
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We help you understand cultural expectations, communicate clearly, avoid common mistakes,
              and integrate smoothly in your new environment.
            </p>

            {/* ✅ Hero buttons (includes Upcoming Events link) */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Request Guidance 📩
              </button>

              <button
                type="button"
                onClick={() => document.getElementById("middle")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: BRAND.accent, color: BRAND.primary }}
              >
                See Destinations & FAQ 👇
              </button>

              <Link
                to="/services/Culture_exchange/events"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                View Upcoming Events 
              </Link>
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
                <img
                  src={IMAGES.heroMain}
                  alt="Culture exchange"
                  className="h-[320px] w-full object-cover"
                />
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
              <div className="text-sm font-extrabold text-gray-900">What you gain </div>
              <div className="mt-1 text-sm text-gray-600">
                Confidence • Communication • Social integration • Professional etiquette
              </div>
            </div>
          </div>
        </div>
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
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Who this is for 🎯</h2>
          <p className="mt-3 text-gray-600">Different journeys need different preparation.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <Card key={p.title} icon={p.icon} title={p.title} desc={p.desc} />
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
                {SUPPORT.map((s) => (
                  <div key={s.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(189,159,117,0.18)" }}
                      >
                        {s.icon}
                      </div>
                      <div className="text-sm font-extrabold text-gray-900">{s.title}</div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="mt-8 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Start my culture coaching 
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MIDDLE (Destinations + Checklist + FAQ) */}
      <section id="middle" className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <Kicker>MIDDLE GUIDE</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Destinations, checklist & FAQ </h2>
          <p className="mt-3 text-gray-600">We put the key guidance in the middle so users see it early.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
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

            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Where we guide you 🌍</h3>
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
          </div>

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

            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Be ready before you travel ✅</h3>
            <p className="mt-2 text-sm text-gray-600">
              These small things reduce stress and culture shock a lot.
            </p>

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
              Get coaching support 📩
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <Kicker>FAQ</Kicker>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Common questions ❓</h3>
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

      {/* FORM */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <Kicker>REQUEST GUIDANCE</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Tell us your plan 👇</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Share your destination and program type. We will contact you with the best guidance.
              </p>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-extrabold text-gray-900">You will receive </div>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {[
                    "A simple preparation checklist",
                    "Culture & etiquette tips for your destination",
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
