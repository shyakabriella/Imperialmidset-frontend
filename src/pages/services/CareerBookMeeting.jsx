import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCareerRequestById } from "../../utils/careerStorage";

const BRAND = { primary: "#2F0D34", accent: "#BD9F75" };

// ✅ Put your real agent info (you can update later)
const AGENT = {
  whatsapp: "250785876623",
  email: "inter.mindsetpath@gmail.com",
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function CareerBookMeeting() {
  const navigate = useNavigate();
  const q = useQuery();
  const ref = q.get("ref") || "";

  const request = ref ? getCareerRequestById(ref) : null;

  const [form, setForm] = React.useState({
    meetingType: request?.meetingType || "Online",
    date: "",
    time: "",
    topic: request?.targetRole || "",
    note: "",
  });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const msg = React.useMemo(() => {
    const name = request?.fullName || "";
    const phone = request?.phone || "";
    const email = request?.email || "";
    const goal = request?.targetRole || form.topic || "";
    return encodeURIComponent(
      `Hello 👋 I want to book a Career Guidance meeting.\n\n` +
        `Reference: ${ref || "N/A"}\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Goal: ${goal}\n\n` +
        `Meeting Type: ${form.meetingType}\n` +
        `Preferred Date: ${form.date}\n` +
        `Preferred Time: ${form.time}\n\n` +
        `Notes: ${form.note || "-"}`
    );
  }, [ref, request, form]);

  const whatsappLink = `https://wa.me/${AGENT.whatsapp}?text=${msg}`;
  const mailtoLink = `mailto:${AGENT.email}?subject=${encodeURIComponent(
    "Career Guidance Meeting Request"
  )}&body=${msg}`;

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  return (
    <div className="bg-white">
      {/* Breadcrumb + Back */}
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="text-xs text-gray-500">
            <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
            <span className="text-gray-700">Career</span> <span className="mx-1">/</span>
            <span className="text-gray-900 font-semibold">Book Meeting</span>
          </div>

          {/* ✅ Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50 transition active:scale-[0.98]"
            style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
          >
            ← Back
          </button>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
              BOOK MEETING
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
              Choose a date and time 
            </h1>
            <p className="mt-3 text-gray-600 leading-relaxed">
              After you submit, you can contact the agent through WhatsApp or Email.
              If you came from Career Guidance, your details are already loaded.
            </p>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">Loaded details</div>
              <div className="mt-2 text-sm text-gray-700">
                Reference: <span className="font-semibold">{ref || "Not provided"}</span>
              </div>
              <div className="mt-1 text-sm text-gray-700">
                Name: <span className="font-semibold">{request?.fullName || "-"}</span>
              </div>
              <div className="mt-1 text-sm text-gray-700">
                Goal: <span className="font-semibold">{request?.targetRole || "-"}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-gray-700">Meeting Type</label>
                  <select
                    name="meetingType"
                    value={form.meetingType}
                    onChange={onChange}
                    className={`${inputBase} bg-white`}
                  >
                    <option value="Online">Online</option>
                    <option value="In-person">In-person</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Topic</label>
                  <input
                    name="topic"
                    value={form.topic}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="Example: CV review / Interview prep"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={onChange}
                    className={inputBase}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Preferred Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={onChange}
                    className={inputBase}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Extra Notes (optional)</label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={onChange}
                    rows={4}
                    className={inputBase}
                    placeholder="Anything the agent should know..."
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Send on WhatsApp 💬
                </a>

                <a
                  href={mailtoLink}
                  className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
                >
                  Send by Email ✉️
                </a>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Tip: If WhatsApp/email does not open, you can copy the message and send manually.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
