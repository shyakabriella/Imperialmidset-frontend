// src/pages/how-it-works/Appointments.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

/* ---------------- Small in-view animation hook ---------------- */
function useInView(options = { threshold: 0.15 }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/* ---------------- Brand ---------------- */
const BRAND = {
  primary: "#2F0D34", // purple
  accent: "#BD9F75", // gold
};

const CONTACT = {
  phone: "0786876623",
  email: "inter.mindsetpath@gmail.com",
};

/* ---------------- Helpers ---------------- */
function toISODate(d) {
  const date = new Date(d);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isWeekendISO(iso) {
  if (!iso) return false;
  const d = new Date(iso + "T00:00:00");
  const day = d.getDay(); // 0 Sun ... 6 Sat
  return day === 0 || day === 6;
}

function buildTimeSlots() {
  // 09:00 -> 17:00 every 30 mins (you can adjust)
  const slots = [];
  for (let h = 9; h <= 16; h++) {
    for (const m of [0, 30]) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  slots.push("17:00");
  return slots;
}

const TIME_SLOTS = buildTimeSlots();

const SERVICES = [
  { label: "Study Abroad", value: "study-abroad" },
  { label: "Visa Support", value: "visa-support" },
  { label: "Culture Exchange", value: "culture-exchange" },
  { label: "Air Ticketing", value: "air-ticketing" },
  { label: "English Proficiency (Duolingo/IELTS)", value: "english-tests" },
  { label: "Technical Coaching", value: "technical-coaching" },
  { label: "Internship Support", value: "internship-support" },
  { label: "Career Guidance", value: "career-guidance" },
];

export default function Appointments() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0.2 });

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    meetingType: "Online (Google Meet)",
    notes: "",
  });

  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState({ type: "", msg: "" });

  const inputBase =
    "mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setStatus({ type: "", msg: "" });
  };

  const validate = () => {
    const next = {};

    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    if (!form.service) next.service = "Please choose a service.";

    if (!form.date) next.date = "Please select a date (weekdays only).";
    if (form.date && isWeekendISO(form.date))
      next.date = "Weekends are not available. Please select a weekday.";

    if (!form.time) next.time = "Please select a time slot.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      createdAt: new Date().toISOString(),
      status: "pending-confirmation",
    };

    console.log("✅ Appointment request:", payload);

    setStatus({
      type: "success",
      msg: "✅ Appointment request sent! We’ll confirm by email/WhatsApp shortly.",
    });

    // Optional: reset minimal fields
    setForm((p) => ({
      ...p,
      notes: "",
    }));
  };

  return (
    <div className="bg-white">
      {/* Soft background */}
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(800px 260px at 15% 20%, rgba(47,13,52,0.12), transparent 60%), radial-gradient(800px 260px at 80% 10%, rgba(189,159,117,0.14), transparent 60%)",
        }}
      />

      {/* page spacing for fixed header */}
      <div className="mx-auto max-w-7xl px-4 pt-[110px] pb-14">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-700">How It Works</span>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Appointments</span>
        </div>

        {/* Back button */}
        <div className="mt-5 flex items-center justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-50 active:scale-[0.98]"
          >
            ← Back
          </button>
        </div>

        {/* Header */}
        <div
          ref={ref}
          className={[
            "mt-8 text-center transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <p
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
            style={{ color: BRAND.primary }}
          >
            Appointments
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Book a Consultation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
            Choose a service, pick a weekday, select a time, and we’ll confirm your session.
          </p>
        </div>

        {/* Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* FORM */}
          <div className="lg:col-span-2">
            <form
              onSubmit={submit}
              className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
            >
              {/* status */}
              {status.type === "success" ? (
                <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                  {status.msg}
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                {/* name */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Full Name *</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    className={`${inputBase} ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Your full name"
                  />
                  {errors.fullName ? (
                    <div className="mt-2 text-xs font-semibold text-red-600">{errors.fullName}</div>
                  ) : null}
                </div>

                {/* email */}
                <div>
                  <label className="text-xs font-bold text-gray-700">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className={`${inputBase} ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    placeholder="you@email.com"
                  />
                  {errors.email ? (
                    <div className="mt-2 text-xs font-semibold text-red-600">{errors.email}</div>
                  ) : null}
                </div>

                {/* phone */}
                <div>
                  <label className="text-xs font-bold text-gray-700">Phone / WhatsApp</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={`${inputBase} border-gray-300`}
                    placeholder="+250..."
                  />
                </div>

                {/* service */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Choose Service *</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={onChange}
                    className={`${inputBase} ${errors.service ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  {errors.service ? (
                    <div className="mt-2 text-xs font-semibold text-red-600">{errors.service}</div>
                  ) : null}
                </div>

                {/* date */}
                <div>
                  <label className="text-xs font-bold text-gray-700">Preferred Date (Weekdays only) *</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    min={toISODate(new Date())}
                    onChange={(e) => {
                      const iso = e.target.value;

                      if (isWeekendISO(iso)) {
                        setForm((p) => ({ ...p, date: "", time: "" }));
                        setErrors((p) => ({
                          ...p,
                          date: "Weekends (Saturday/Sunday) are not available. Please pick a weekday.",
                        }));
                        return;
                      }

                      setForm((p) => ({ ...p, date: iso, time: "" }));
                      setErrors((p) => ({ ...p, date: "" }));
                      setStatus({ type: "", msg: "" });
                    }}
                    className={`${inputBase} ${errors.date ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.date ? (
                    <div className="mt-2 text-xs font-semibold text-red-600">{errors.date}</div>
                  ) : (
                    <div className="mt-2 text-xs text-gray-500">
                       Weekdays only • Selected:{" "}
                      <span className="font-semibold text-gray-900">{form.date || "—"}</span>
                    </div>
                  )}
                </div>

                {/* time */}
                <div>
                  <label className="text-xs font-bold text-gray-700">Preferred Time *</label>
                  <select
                    name="time"
                    value={form.time}
                    onChange={onChange}
                    disabled={!form.date}
                    className={[
                      inputBase,
                      errors.time ? "border-red-500" : "border-gray-300",
                      !form.date ? "opacity-60 cursor-not-allowed" : "",
                    ].join(" ")}
                  >
                    <option value="">{form.date ? "Select time..." : "Select date first"}</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.time ? (
                    <div className="mt-2 text-xs font-semibold text-red-600">{errors.time}</div>
                  ) : null}
                </div>

                {/* meeting type */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Meeting Type</label>
                  <select
                    name="meetingType"
                    value={form.meetingType}
                    onChange={onChange}
                    className={`${inputBase} border-gray-300`}
                  >
                    <option>Online (Google Meet)</option>
                    <option>Phone Call</option>
                    <option>WhatsApp Call</option>
                    <option>In-person (Office)</option>
                  </select>
                </div>

                {/* notes */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    rows={4}
                    className={`${inputBase} border-gray-300`}
                    placeholder="Tell us your goals, country, intake, university target, or any special request…"
                  />
                </div>
              </div>

              {/* submit */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#250A28")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
                >
                  Book Appointment
                </button>

                <div className="text-xs text-gray-500">
                  By submitting, you agree we may contact you to confirm your booking.
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE INFO */}
          <div className="space-y-6">
            {/* Contact card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-bold tracking-widest text-gray-500">CONTACT</div>
              <div className="mt-3 text-sm font-extrabold text-gray-900">Need quick help?</div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-bold text-gray-500">Phone / WhatsApp</div>
                  <div className="mt-1 font-extrabold text-gray-900">{CONTACT.phone}</div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-bold text-gray-500">Email</div>
                  <div className="mt-1 font-extrabold text-gray-900">{CONTACT.email}</div>
                </div>
              </div>

              <div className="mt-5 text-xs text-gray-500 leading-relaxed">
                We’ll confirm your selected date/time. (Google Calendar invite will be added later.)
              </div>
            </div>

            {/* What happens next */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-bold tracking-widest text-gray-500">WHAT HAPPENS NEXT</div>

              <ol className="mt-4 space-y-3 text-sm text-gray-700">
                {[
                  "We review your request and confirm availability.",
                  "We contact you via email/WhatsApp with confirmation.",
                  "You attend the session and receive next steps.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-xl text-white text-xs font-extrabold shadow"
                      style={{ backgroundColor: BRAND.primary }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-5 rounded-2xl bg-yellow-50 p-4 ring-1 ring-yellow-200">
                <div className="text-xs font-bold text-yellow-900">Tip 💡</div>
                <div className="mt-1 text-xs text-yellow-900/80">
                  For faster help, write your preferred country + intake in the Notes.
                </div>
              </div>
            </div>

            {/* Link to contact page */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">Prefer the Contact page?</div>
              <p className="mt-2 text-sm text-gray-600">
                You can also reach us directly using the contact form.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-50 active:scale-[0.98]"
              >
                Go to Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}