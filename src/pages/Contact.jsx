import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowRight } from "lucide-react";

/** Small in-view animation hook */
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

/** (Optional) services list for dropdown + quick links */
const SERVICES = [
  { label: "Study Abroad", to: "/services/study-abroad/university" },
  { label: "Visa Support", to: "/services/Visa" },
  { label: "Culture Exchange", to: "/services/Culture_exchange" },
  { label: "Air Ticketing", to: "/services/Air_ticket" },
  { label: "English Proficiency (Duolingo/IELTS)", to: "/services/english-tests" },
  { label: "Technical Support (Coding)", to: "/services/technical" },
  { label: "Internship Support", to: "/services/internship" },
  { label: "Career Guidance", to: "/services/Career" },
];

const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
  blue: "#2563EB",
  banner: "#F6B100",
};

export default function Contact() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0.18 });

  const [status, setStatus] = React.useState({ type: "", msg: "" });
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    service: "Study Abroad",
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setStatus({ type: "", msg: "" });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Contact Form:", form);

    setStatus({
      type: "success",
      msg: "✅ Message sent! We’ll reply as soon as possible.",
    });

    setForm((p) => ({ ...p, message: "" }));
  };

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMap = () => {
    document.getElementById("contact-map")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ✅ HERO (same style as Team/Partners/Request pages) */}
      <section className="relative overflow-hidden">
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

        <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 pt-2 sm:pt-4 pb-12 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">Contact Us</h1>

          <div className="mt-4 text-sm sm:text-base text-gray-700">
            <Link to="/" className="text-yellow-700 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Contact</span>
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-gray-700 leading-relaxed">
            Send us a message and tell us what you need. We’ll guide you clearly — from choosing the right
            service to the next actions.
          </p>
        </div>

        {/* ✅ Banner strip */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 -mt-6">
          <div className="relative overflow-hidden rounded-3xl shadow-md ring-1 ring-black/10">
            <div className="absolute inset-0" style={{ backgroundColor: BRAND.banner }} />

            {/* overlay must NOT block clicks */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.08), transparent 55%)" }}
            />

            <div className="relative z-10 flex items-stretch">
              {/* icon */}
              {/* <div className="hidden sm:flex items-center justify-center w-24">
                <div className="h-14 w-14 rounded-2xl bg-black/10 flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
              </div> */}

              {/* text + buttons */}
              <div className="flex-1 px-6 py-8 sm:py-10">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                  Need support? We’re ready to help you.
                </div>
                <div className="mt-2 text-sm sm:text-base text-gray-800">
                  Book a meeting, send a message, or visit us at Silverback Mall (Sonatube).
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                    style={{ backgroundColor: BRAND.blue }}
                  >
                    Send Message
                  </button>

                  <button
                    type="button"
                    onClick={scrollToMap}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white/20 hover:bg-white/25 transition active:scale-[0.98]"
                    style={{ borderColor: "rgba(0,0,0,0.18)", color: "#0B1220" }}
                  >
                    View Map ↓
                  </button>

                  <Link
                    to="/how-it-works/appointments"
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white/20 hover:bg-white/25 transition active:scale-[0.98]"
                    style={{ borderColor: "rgba(0,0,0,0.18)", color: "#0B1220" }}
                  >
                    Book Meeting →
                  </Link>
                </div>
              </div>

              {/* blue scroll bar */}
              <button
                type="button"
                onClick={scrollToForm}
                className="w-14 sm:w-20 flex items-center justify-center"
                style={{ backgroundColor: BRAND.blue }}
                aria-label="Scroll down to contact form"
              >
                <div className="rotate-90 text-white font-bold tracking-widest text-xs sm:text-sm">
                  Scroll Down
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ MAIN CONTENT */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* LEFT: Cards + Map + Quick links */}
          <div
            className={[
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            {/* Contact cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<Phone className="h-5 w-5" />} title="Call / WhatsApp" value="+250786876623" note="Fast support & follow up" />
              <InfoCard icon={<Mail className="h-5 w-5" />} title="Email" value="inter.mindsetpath@gmail.com" note="We reply quickly" />
              <InfoCard icon={<MapPin className="h-5 w-5" />} title="Office" value="Silverback Mall (Sonatube), 1st Floor" note="Available by appointment" />
              <InfoCard icon={<Clock className="h-5 w-5" />} title="Working Hours" value="Mon – Sat • 8:00 – 18:00" note="Flexible online meetings" />
            </div>

            {/* ✅ Google Map */}
            <div id="contact-map" className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold text-gray-900">Our Location</div>
                  <div className="mt-1 text-sm text-gray-600">
                    Silverback Mall (Sonatube), Kigali
                  </div>
                </div>

                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "rgba(37,99,235,0.10)", color: BRAND.blue }}
                >
                  <MapPin className="h-4 w-4" />
                  Map
                </span>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-black/10">
                <iframe
                  title="International Mindset PathWays - Silverback Mall Sonatube"
                  src="https://www.google.com/maps?q=Silverback%20Mall%20Sonatube%20Kigali&output=embed"
                  width="100%"
                  height="280"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Tip: If the map shows a nearby point, zoom and drag slightly to “Silverback Mall (Sonatube)”.
              </div>
            </div>

            {/* Quick links */}
            <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold text-gray-900">Quick service links</div>
                  <div className="mt-1 text-sm text-gray-600">Go directly to the service you want.</div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/how-it-works/appointments")}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Book Meeting <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {SERVICES.slice(0, 6).map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
                  >
                    <span>{s.label}</span>
                    <span className="text-gray-400 group-hover:text-gray-700">→</span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Need another service? You can still select it in the message form ➜
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div
            id="contact-form"
            className={[
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: "160ms" }}
          >
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold text-gray-900">Send us a message</div>
                  <div className="mt-1 text-sm text-gray-600">We’ll reply with next steps and requirements.</div>
                </div>

                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "rgba(189,159,117,0.16)", color: BRAND.primary }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Support
                </span>
              </div>

              <form onSubmit={submit} className="mt-6 grid gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700">Full Name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className={inputBase}
                      placeholder="you@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700">Phone / WhatsApp</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className={inputBase}
                      placeholder="+250 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Service</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={onChange}
                    className={`${inputBase} cursor-pointer`}
                  >
                    {SERVICES.map((s) => (
                      <option key={s.label} value={s.label}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    className={`${inputBase} min-h-[120px] resize-none`}
                    placeholder="Tell us your goal, preferred country, intake, and anything important..."
                    required
                  />
                </div>

                {status.msg ? (
                  <div
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-semibold",
                      status.type === "success"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700",
                    ].join(" ")}
                  >
                    {status.msg}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Send Message <Send className="h-4 w-4" />
                </button>

                <div className="text-xs text-gray-500">
                  By submitting, you agree we may contact you for follow-up about your request.
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-600">
          Prefer a meeting?{" "}
          <Link
            to="/how-it-works/appointments"
            className="font-semibold underline decoration-gray-300 hover:decoration-gray-600"
          >
            Book an appointment here
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, value, note }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-900">
          {icon}
        </div>
        <div>
          <div className="text-sm font-extrabold text-gray-900">{title}</div>
          <div className="mt-0.5 text-sm text-gray-700">{value}</div>
          <div className="mt-1 text-xs text-gray-500">{note}</div>
        </div>
      </div>
    </div>
  );
}
