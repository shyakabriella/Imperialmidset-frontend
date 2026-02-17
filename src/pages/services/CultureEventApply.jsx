import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { CULTURE_EVENTS } from "../../data/cultureEvents";

const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
};

function formatRange(start, end) {
  const opts = { year: "numeric", month: "short", day: "numeric" };
  const s = new Date(start).toLocaleDateString("en-US", opts);
  const e = new Date(end).toLocaleDateString("en-US", opts);
  return start === end ? s : `${s} — ${e}`;
}

export default function CultureEventApply() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const eventFromState = location.state?.event;
  const event = eventFromState || CULTURE_EVENTS.find((e) => e.id === eventId);

  React.useEffect(() => {
    if (!event) {
      // If someone hits the URL directly and event not found
      navigate("/services/Culture_exchange/events");
    }
  }, [event, navigate]);

  const [form, setForm] = React.useState({
    passportNumber: "",
    fullName: "",
    country: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    currentLocation: "",
    emergencyContact: "",
    notes: "",
    agree: false,
  });

  const [errors, setErrors] = React.useState({});

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.passportNumber.trim()) next.passportNumber = "Passport number is required.";
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.country.trim()) next.country = "Country is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.agree) next.agree = "Please agree to be contacted.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      eventId: event.id,
      eventTitle: event.title,
      ...form,
    };

    console.log("Event Application:", payload);
    alert("✅ Application submitted! We will contact you soon.");
    navigate("/services/Culture_exchange/events");
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  const err = (k) => (errors[k] ? <div className="mt-2 text-xs font-semibold text-red-600">{errors[k]}</div> : null);

  if (!event) return null;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${event.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-12">
          <div className="text-xs text-white/80">
            <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
            <Link to="/services/Culture_exchange/events" className="hover:underline">Events</Link>{" "}
            <span className="mx-1">/</span>
            <span className="font-semibold text-white">Apply</span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white">
            Apply for: {event.title}
          </h1>
          <p className="mt-2 text-white/90">
            {formatRange(event.dateStart, event.dateEnd)} • {event.location} • {event.audience}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Event summary */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
                EVENT SUMMARY
              </div>
              <div className="mt-2 text-xl font-extrabold text-gray-900">{event.title}</div>
              <div className="mt-2 text-sm text-gray-600">{event.summary}</div>

              <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                <div><span className="font-semibold">Dates:</span> {formatRange(event.dateStart, event.dateEnd)}</div>
                <div className="mt-1"><span className="font-semibold">Location:</span> {event.location}</div>
                <div className="mt-1"><span className="font-semibold">Audience:</span> {event.audience}</div>
                <div className="mt-1"><span className="font-semibold">Seats:</span> {event.seats}</div>
                <div className="mt-1"><span className="font-semibold">Fee:</span> {event.fee}</div>
              </div>

              <div className="mt-5 text-sm text-gray-600 leading-relaxed">
                ⚠️ Please ensure your passport details and contact information are correct.
                Our team will contact you with next steps.
              </div>
            </div>
          </div>

          {/* Application form */}
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
                APPLICATION FORM
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">Your details </h2>
              <p className="mt-2 text-sm text-gray-600">
                Required fields: passport number, full name, country, phone, email.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">
                    Passport Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="passportNumber"
                    value={form.passportNumber}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="e.g., PC1234567"
                  />
                  {err("passportNumber")}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">
                    Full Name (as on passport) <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="Your full name"
                  />
                  {err("fullName")}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">
                    Country <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="country"
                    value={form.country}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="Rwanda, Canada, UK..."
                  />
                  {err("country")}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="+250..."
                  />
                  {err("phone")}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="you@email.com"
                  />
                  {err("email")}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Date of Birth (optional)</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={onChange}
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Gender (optional)</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={onChange}
                    className={`${inputBase} bg-white`}
                  >
                    <option value="">Select...</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Current Location (optional)</label>
                  <input
                    name="currentLocation"
                    value={form.currentLocation}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="City, Country"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Emergency Contact (optional)</label>
                  <input
                    name="emergencyContact"
                    value={form.emergencyContact}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="Name + Phone"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    rows={4}
                    className={inputBase}
                    placeholder="Anything we should know? (diet, medical needs, goals...)"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={onChange}
                      className="mt-1"
                    />
                    <span>
                      I agree that the company may contact me about this event. <span className="text-red-600">*</span>
                    </span>
                  </label>
                  {err("agree")}
                </div>

                <div className="sm:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                    style={{ backgroundColor: BRAND.primary }}
                  >
                    Submit Application 
                  </button>

                  <Link
                    to="/services/Culture_exchange/events"
                    className="rounded-xl px-6 py-3 text-sm font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(47,13,52,0.25)", color: BRAND.primary }}
                  >
                    Back to Events
                  </Link>
                </div>

                <div className="sm:col-span-2 text-xs text-gray-500">
                  By submitting, you confirm the information is correct and you can provide valid passport details.
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
