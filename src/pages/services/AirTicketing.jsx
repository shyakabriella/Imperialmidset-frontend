import React from "react";
import { Link } from "react-router-dom";

const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
};

const AIRLINES = [
  { id: "rwandair", name: "RwandAir", logo: "/airlines/rwandair.png", region: "Africa", note: "Great regional connections" },
  { id: "ethiopian", name: "Ethiopian Airlines", logo: "/airlines/ethiopian.png", region: "Africa", note: "Wide global network" },
  { id: "kenya", name: "Kenya Airways", logo: "/airlines/kenya.png", region: "Africa", note: "Regional & international routes" },
  { id: "qatar", name: "Qatar Airways", logo: "/airlines/qatar.png", region: "Global", note: "Premium long-haul options" },
  { id: "emirates", name: "Emirates", logo: "/airlines/emirates.png", region: "Global", note: "Popular for international travel" },
  { id: "turkish", name: "Turkish Airlines", logo: "/airlines/turkish.png", region: "Global", note: "Many destinations worldwide" },
  { id: "klm", name: "KLM", logo: "/airlines/klm.png", region: "Europe", note: "Strong EU connections" },
  { id: "lufthansa", name: "Lufthansa", logo: "/airlines/lufthansa.png", region: "Europe", note: "Reliable European routes" },
];

// ⭐ Choose featured airlines by id
const FEATURED_IDS = ["rwandair", "ethiopian", "qatar", "emirates"];

/**
 * ✅ Replace with your real agent contacts
 * WhatsApp must be digits only (no spaces)
 * Email must be valid format
 */
const AGENT = {
  whatsappNumber: "250785876623",
  email: "inter.mindsetpath@gmail.com",
  phoneDisplay: "+250 785 876 623",
};

const FLIGHT_IMAGES = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1502920917128-1aa500764b16?auto=format&fit=crop&w=1400&q=80",
];

function Pill({ children, tone = "soft" }) {
  const styles =
    tone === "soft"
      ? { backgroundColor: "rgba(47,13,52,0.08)", color: BRAND.primary }
      : { backgroundColor: "rgba(189,159,117,0.20)", color: BRAND.primary };

  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold" style={styles}>
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, sub }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
        {kicker}
      </div>
      <h2 className="mt-3 text-3xl font-extrabold text-gray-900">{title}</h2>
      {sub ? <p className="mt-3 text-gray-600 leading-relaxed">{sub}</p> : null}
    </div>
  );
}

const buildBookingMessage = (airlineName, b) => {
  const lines = [
    `Hello 👋 I want to book an air ticket with ${airlineName}. Please guide me on the next steps.`,
    ``,
    `✈️ Trip Type: ${b.tripType}`,
    `📍 From: ${b.from || "-"}`,
    `📍 To: ${b.to || "-"}`,
    `📅 Departure: ${b.departDate || "-"}`,
    b.tripType === "Return" ? `📅 Return: ${b.returnDate || "-"}` : null,
    `👥 Passengers: ${b.passengers || 1}`,
    b.cabin ? `💺 Cabin: ${b.cabin}` : null,
    b.notes ? `📝 Notes: ${b.notes}` : null,
    ``,
    `If needed, I can send documents via email.`,
  ].filter(Boolean);

  return lines.join("\n");
};

const buildWhatsAppLinkFromMessage = (message) => {
  const msg = encodeURIComponent(message);
  return `https://wa.me/${AGENT.whatsappNumber}?text=${msg}`;
};

const buildMailtoLink = (subject, body) => {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${AGENT.email}?subject=${s}&body=${b}`;
};

const downloadText = (filename, text) => {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export default function AirTicketing() {
  const [selected, setSelected] = React.useState(null);

  // search/filter
  const [region, setRegion] = React.useState("All");
  const [q, setQ] = React.useState("");

  // toast copied
  const [copied, setCopied] = React.useState("");
  const toastTimer = React.useRef(null);

  // booking form
  const [booking, setBooking] = React.useState({
    airlineId: "",
    tripType: "Return",
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    cabin: "Economy",
    notes: "",
  });

  const [files, setFiles] = React.useState([]);

  const close = () => setSelected(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showToast = (type) => {
    setCopied(type);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setCopied(""), 1600);
  };

  const copyText = async (text, type) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showToast(type);
    } catch {
      alert("❌ Copy failed. Please copy manually.");
    }
  };

  const featured = React.useMemo(
    () => AIRLINES.filter((a) => FEATURED_IDS.includes(a.id)),
    []
  );

  const filteredAirlines = React.useMemo(() => {
    const qq = q.trim().toLowerCase();
    return AIRLINES.filter((a) => {
      const regionOk = region === "All" ? true : a.region === region;
      const qOk = qq ? a.name.toLowerCase().includes(qq) : true;
      return regionOk && qOk;
    });
  }, [region, q]);

  const selectedForBooking = React.useMemo(() => {
    return AIRLINES.find((a) => a.id === booking.airlineId) || null;
  }, [booking.airlineId]);

  const bookingAirlineName = selectedForBooking ? selectedForBooking.name : "any airline";

  const bookingMessage = React.useMemo(() => {
    return buildBookingMessage(bookingAirlineName, booking);
  }, [bookingAirlineName, booking]);

  const canGenerate =
    booking.from.trim() &&
    booking.to.trim() &&
    booking.departDate &&
    (booking.tripType === "One-way" || (booking.tripType === "Return" && booking.returnDate)) &&
    Number(booking.passengers) >= 1;

  const onGenerateWhatsApp = () => {
    if (!canGenerate) {
      alert("⚠️ Please fill From, To, Departure, Passengers (and Return date for Return trip).");
      return;
    }
    window.open(buildWhatsAppLinkFromMessage(bookingMessage), "_blank", "noreferrer");
  };

  const onEmailDetails = () => {
    if (!canGenerate) {
      alert("⚠️ Please fill From, To, Departure, Passengers (and Return date for Return trip).");
      return;
    }
    // note: user must attach files manually
    const bodyWithFiles = [
      bookingMessage,
      "",
      files?.length ? `📎 Selected documents (attach manually): ${files.map((f) => f.name).join(", ")}` : "📎 Documents: (attach if needed)",
    ].join("\n");

    window.location.href = buildMailtoLink("Air Ticket Booking Request", bodyWithFiles);
  };

  const onDownloadSummary = () => {
    if (!canGenerate) {
      alert("⚠️ Please complete booking details first.");
      return;
    }
    const summary = [
      "AIR TICKET BOOKING REQUEST",
      "==========================",
      "",
      bookingMessage,
      "",
      files?.length ? `Selected documents: ${files.map((f) => f.name).join(", ")}` : "Selected documents: none",
      "",
      `Agent WhatsApp: ${AGENT.phoneDisplay}`,
      `Agent Email: ${AGENT.email}`,
    ].join("\n");

    const nameSafe = bookingAirlineName.replace(/\s+/g, "_");
    downloadText(`Booking_Request_${nameSafe}.txt`, summary);
  };

  const regionBtn = (label) => {
    const active = region === label;
    return (
      <button
        type="button"
        onClick={() => setRegion(label)}
        className={[
          "rounded-xl px-4 py-2 text-sm font-semibold transition border",
          active ? "shadow-sm" : "hover:bg-gray-50",
        ].join(" ")}
        style={{
          borderColor: active ? "transparent" : "rgba(47,13,52,0.18)",
          backgroundColor: active ? BRAND.primary : "white",
          color: active ? "white" : BRAND.primary,
        }}
      >
        {label}
      </button>
    );
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  return (
    <div className="bg-white relative">
      {/* soft background */}
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[600px]"
        style={{
          background:
            "radial-gradient(900px 360px at 20% 10%, rgba(189,159,117,0.20) 0%, transparent 65%), radial-gradient(900px 360px at 80% 0%, rgba(47,13,52,0.10) 0%, transparent 60%)",
        }}
      />

      {/* toast */}
      {copied ? (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]">
          <div
            className="rounded-2xl px-4 py-2 text-sm font-semibold shadow-lg border bg-white"
            style={{ borderColor: "rgba(47,13,52,0.18)", color: BRAND.primary }}
          >
            ✅ Copied {copied === "email" ? "email" : "phone number"}!
          </div>
        </div>
      ) : null}

      {/* breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-700">Services</span> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Air Ticketing</span>
        </div>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-2">
              <Pill>✈️ Air Ticketing</Pill>
              <Pill tone="gold">Trusted Support</Pill>
              <Pill>IATA-aligned process</Pill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Book flights easily — with professional agent support 
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Choose an airline, send details, and we guide you step-by-step: options, pricing, required info, and confirmation.
              We work professionally to satisfy customers and support you until ticket issuing.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLinkFromMessage(buildBookingMessage("any airline", {
                  tripType: "Return",
                  from: "",
                  to: "",
                  departDate: "",
                  returnDate: "",
                  passengers: 1,
                  cabin: "Economy",
                  notes: "",
                }))}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                WhatsApp Agent 💬
              </a>

              <a
                href={buildMailtoLink("Air Ticket Booking Request", "Hello, I want to book an air ticket. Please guide me.")}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
              >
                Email Us ✉️
              </a>
            </div>

            {/* copy buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => copyText(AGENT.email, "email")}
                className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition active:scale-[0.98] hover:bg-gray-50"
                style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
              >
                Copy Email 📋
              </button>

              <button
                type="button"
                onClick={() => copyText(AGENT.phoneDisplay, "phone")}
                className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition active:scale-[0.98] hover:bg-gray-50"
                style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
              >
                Copy Phone 📋
              </button>
            </div>

            {/* trust cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-bold tracking-widest text-gray-500">STANDARD</div>
                <div className="mt-2 text-lg font-extrabold text-gray-900">IATA-aligned</div>
                <div className="mt-1 text-xs text-gray-600">Professional ticketing standards</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-bold tracking-widest text-gray-500">TRUST</div>
                <div className="mt-2 text-lg font-extrabold text-gray-900">Reliable</div>
                <div className="mt-1 text-xs text-gray-600">Clear guidance & transparency</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-bold tracking-widest text-gray-500">SUPPORT</div>
                <div className="mt-2 text-lg font-extrabold text-gray-900">Step-by-step</div>
                <div className="mt-1 text-xs text-gray-600">We support you to completion</div>
              </div>
            </div>
          </div>

          {/* right hero image */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <img src={FLIGHT_IMAGES[0]} alt="Air ticketing" className="h-[390px] w-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.20) 75%)" }} />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur p-4 shadow ring-1 ring-black/5">
                <div className="text-sm font-extrabold text-gray-900">How booking works </div>
                <div className="mt-1 text-xs text-gray-600">
                  Pick airline → send details → receive options → confirm → ticket issued
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ FEATURED AIRLINES */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
              FEATURED AIRLINES
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Popular choices customers use most 
            </h2>
            <p className="mt-2 text-gray-600">
              Click any featured airline to start booking quickly.
            </p>
          </div>

          <div className="flex gap-2">
            <Pill>Fast booking</Pill>
            <Pill tone="gold">Agent support</Pill>
          </div>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {featured.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className="min-w-[280px] sm:min-w-[320px] text-left rounded-3xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={a.logo}
                    alt={a.name}
                    className="h-full w-full object-contain p-2"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-extrabold text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-500">{a.region}</div>
                  <div className="mt-2 text-sm text-gray-600">{a.note}</div>
                </div>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(189,159,117,0.20)", color: BRAND.primary }}
                >
                  Book
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* booking form */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <SectionTitle
          kicker="BOOKING DETAILS"
          title="Fill details to generate WhatsApp message 🧾"
          sub="This helps the agent reply faster with accurate options."
        />

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-4">
              <label className="text-xs font-bold text-gray-700">Preferred Airline (optional)</label>
              <select
                className={`${inputBase} bg-white`}
                value={booking.airlineId}
                onChange={(e) => setBooking((p) => ({ ...p, airlineId: e.target.value }))}
              >
                <option value="">Any airline</option>
                {AIRLINES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.region}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="text-xs font-bold text-gray-700">Trip Type</label>
              <select
                className={`${inputBase} bg-white`}
                value={booking.tripType}
                onChange={(e) => setBooking((p) => ({ ...p, tripType: e.target.value }))}
              >
                <option value="Return">Return</option>
                <option value="One-way">One-way</option>
              </select>
            </div>

            <div className="lg:col-span-3">
              <label className="text-xs font-bold text-gray-700">From (Required)</label>
              <input
                className={inputBase}
                value={booking.from}
                onChange={(e) => setBooking((p) => ({ ...p, from: e.target.value }))}
                placeholder="Kigali (KGL)"
              />
            </div>

            <div className="lg:col-span-3">
              <label className="text-xs font-bold text-gray-700">To (Required)</label>
              <input
                className={inputBase}
                value={booking.to}
                onChange={(e) => setBooking((p) => ({ ...p, to: e.target.value }))}
                placeholder="Dubai (DXB)"
              />
            </div>

            <div className="lg:col-span-3">
              <label className="text-xs font-bold text-gray-700">Departure Date (Required)</label>
              <input
                type="date"
                className={inputBase}
                value={booking.departDate}
                onChange={(e) => setBooking((p) => ({ ...p, departDate: e.target.value }))}
              />
            </div>

            <div className="lg:col-span-3">
              <label className="text-xs font-bold text-gray-700">
                Return Date {booking.tripType === "Return" ? "(Required)" : "(Optional)"}
              </label>
              <input
                type="date"
                className={inputBase}
                value={booking.returnDate}
                onChange={(e) => setBooking((p) => ({ ...p, returnDate: e.target.value }))}
                disabled={booking.tripType === "One-way"}
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-xs font-bold text-gray-700">Passengers (Required)</label>
              <input
                type="number"
                min={1}
                className={inputBase}
                value={booking.passengers}
                onChange={(e) => setBooking((p) => ({ ...p, passengers: e.target.value }))}
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-xs font-bold text-gray-700">Cabin (Optional)</label>
              <select
                className={`${inputBase} bg-white`}
                value={booking.cabin}
                onChange={(e) => setBooking((p) => ({ ...p, cabin: e.target.value }))}
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>

            <div className="lg:col-span-12">
              <label className="text-xs font-bold text-gray-700">Notes (Optional)</label>
              <textarea
                rows={3}
                className={inputBase}
                value={booking.notes}
                onChange={(e) => setBooking((p) => ({ ...p, notes: e.target.value }))}
                placeholder="Example: flexible dates, preferred time, baggage needs, budget..."
              />
            </div>

            {/* Documents */}
            <div className="lg:col-span-12">
              <label className="text-xs font-bold text-gray-700">Upload Documents (Optional)</label>
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
              <div className="mt-2 text-xs text-gray-500">
                Note: WhatsApp/mailto cannot attach automatically. Use <b>Download Summary</b> and attach files manually by email.
              </div>

              {files?.length ? (
                <div className="mt-2 text-xs text-gray-700">
                  Selected: <span className="font-semibold">{files.map((f) => f.name).join(", ")}</span>
                </div>
              ) : null}
            </div>

            {/* Actions */}
            <div className="lg:col-span-12 flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={onGenerateWhatsApp}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary, opacity: canGenerate ? 1 : 0.7 }}
              >
                Generate WhatsApp Message 💬
              </button>

              <button
                type="button"
                onClick={onEmailDetails}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary, opacity: canGenerate ? 1 : 0.7 }}
              >
                Email Agent (Attach docs) ✉️
              </button>

              <button
                type="button"
                onClick={onDownloadSummary}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary, opacity: canGenerate ? 1 : 0.7 }}
              >
                Download Summary 📄
              </button>

              <button
                type="button"
                onClick={() => copyText(bookingMessage, "message")}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98] hover:bg-gray-50"
                style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
              >
                Copy Message 📋
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* flight images */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLIGHT_IMAGES.slice(1).map((src) => (
            <div key={src} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <img src={src} alt="Airport" className="h-56 w-full object-cover hover:scale-[1.03] transition duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* airlines list */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <SectionTitle
          kicker="AIRLINES"
          title="Browse all airlines 🧳"
          sub="Search by name or filter by region."
        />

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <label className="text-xs font-bold text-gray-700">Search airline</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Type: RwandAir, Qatar, Emirates..."
                className={inputBase}
              />
            </div>

            <div className="lg:col-span-6">
              <div className="text-xs font-bold text-gray-700">Filter by region</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {regionBtn("All")}
                {regionBtn("Africa")}
                {regionBtn("Europe")}
                {regionBtn("Global")}
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredAirlines.length}</span> airline(s)
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAirlines.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className="text-left rounded-3xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={a.logo}
                      alt={a.name}
                      className="h-full w-full object-contain p-2"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>

                  <div>
                    <div className="text-sm font-extrabold text-gray-900">{a.name}</div>
                    <div className="text-xs text-gray-500">{a.region}</div>
                  </div>
                </div>

                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(189,159,117,0.20)", color: BRAND.primary }}
                >
                  Select
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-600">{a.note}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Agent Support</Pill>
                <Pill tone="gold">Secure Process</Pill>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* modal */}
      {selected ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={close} aria-hidden="true" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={selected.logo}
                        alt={selected.name}
                        className="h-full w-full object-contain p-2"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-gray-900">{selected.name}</div>
                      <div className="text-xs text-gray-500">{selected.region}</div>
                    </div>
                  </div>

                  <button
                    onClick={close}
                    className="rounded-xl px-3 py-2 text-sm font-bold hover:bg-gray-100 transition"
                    aria-label="Close"
                    style={{ color: BRAND.primary }}
                  >
                    ✕
                  </button>
                </div>

                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  To book with <span className="font-semibold">{selected.name}</span>, contact our agent.
                  Send your route, dates, passengers, and passport spelling — we will guide the next steps.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Pill>Trusted Service</Pill>
                  <Pill tone="gold">IATA-aligned Process</Pill>
                </div>

                <div className="mt-6 grid gap-3">
                  <a
                    href={buildWhatsAppLinkFromMessage(buildBookingMessage(selected.name, booking))}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98] text-center"
                    style={{ backgroundColor: BRAND.primary }}
                  >
                    WhatsApp Agent 💬
                  </a>

                  <a
                    href={buildMailtoLink(`Booking Request - ${selected.name}`, buildBookingMessage(selected.name, booking))}
                    className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98] text-center"
                    style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
                  >
                    Email Agent ✉️
                  </a>

                  <a
                    href={`tel:${AGENT.phoneDisplay.replace(/\s+/g, "")}`}
                    className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98] text-center"
                    style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
                  >
                    Call Agent 📞 {AGENT.phoneDisplay}
                  </a>

                  <div className="grid gap-2 sm:grid-cols-2 mt-2">
                    <button
                      type="button"
                      onClick={() => copyText(AGENT.email, "email")}
                      className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition active:scale-[0.98] hover:bg-gray-50"
                      style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
                    >
                      Copy Email 📋
                    </button>

                    <button
                      type="button"
                      onClick={() => copyText(AGENT.phoneDisplay, "phone")}
                      className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition active:scale-[0.98] hover:bg-gray-50"
                      style={{ borderColor: "rgba(47,13,52,0.20)", color: BRAND.primary }}
                    >
                      Copy Phone 📋
                    </button>
                  </div>
                </div>

                <div className="mt-5 text-xs text-gray-500">
                  Tip: Names must match passport spelling exactly.
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
