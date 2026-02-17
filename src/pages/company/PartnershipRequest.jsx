import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
};

function Kicker({ children }) {
  return (
    <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
      {children}
    </div>
  );
}

export default function PartnershipRequest() {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "University",
    message: "",
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
    if (!form.orgName.trim()) next.orgName = "Organization name is required.";
    if (!form.contactName.trim()) next.contactName = "Contact person is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.agree) next.agree = "Please agree so we can contact you.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Partnership Request:", form);
    alert("✅ Thanks! We received your partnership request. We will contact you soon.");
    navigate("/company/partners");
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  const err = (k) =>
    errors[k] ? <div className="mt-2 text-xs font-semibold text-red-600">{errors[k]}</div> : null;

  return (
    <div className="bg-white relative overflow-x-hidden">
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(47,13,52,0.07) 0%, rgba(189,159,117,0.10) 48%, transparent 100%)",
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
          <Link to="/company/partners" className="hover:underline text-gray-700">
            Partners
          </Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Partnership Request</span>
        </div>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-8">
          <Kicker>PARTNERSHIP REQUEST</Kicker>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Become a Partner 
          </h1>
          <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed">
            Share your organization details and partnership type. Our team will contact you for next steps.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 transition"
              style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
            >
              ← Back
            </button>

            <Link
              to="/company/partners"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.primary }}
            >
              View Partners
            </Link>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left info */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <div className="text-sm font-extrabold text-gray-900">Common partnership types</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {[
                  "University admissions collaboration",
                  "Scholarships / academic loan support",
                  "Culture exchange programs and events",
                  "Career mentorship and networking",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
                <div className="font-extrabold text-gray-900">Note</div>
                <div className="mt-2">
                  Please provide accurate contact details. We usually respond within a short time.
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
                YOUR DETAILS
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">
                    Organization Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="orgName"
                    value={form.orgName}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="e.g., ABC University"
                  />
                  {err("orgName")}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">
                    Contact Person <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="contactName"
                    value={form.contactName}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="Full name"
                  />
                  {err("contactName")}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="name@company.com"
                  />
                  {err("email")}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Phone (optional)</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="+250..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Partnership Type</label>
                  <select
                    name="partnershipType"
                    value={form.partnershipType}
                    onChange={onChange}
                    className={`${inputBase} bg-white`}
                  >
                    <option value="University">University</option>
                    <option value="Academic Loan / Financing">Academic Loan / Financing</option>
                    <option value="Culture Exchange / Community">Culture Exchange / Community</option>
                    <option value="Career / Mentorship">Career / Mentorship</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Message (optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={4}
                    className={inputBase}
                    placeholder="Tell us how you want to partner with us..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-gray-700">
                    <input type="checkbox" name="agree" checked={form.agree} onChange={onChange} className="mt-1" />
                    <span>
                      I agree that you may contact me about this partnership. <span className="text-red-600">*</span>
                    </span>
                  </label>
                  {err("agree")}
                </div>

                <div className="sm:col-span-2 flex gap-3 flex-wrap">
                  <button
                    type="submit"
                    className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                    style={{ backgroundColor: BRAND.primary }}
                  >
                    Submit Request
                  </button>

                  <Link
                    to="/contact"
                    className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
                  >
                    Contact Us Instead
                  </Link>
                </div>

                <div className="sm:col-span-2 text-xs text-gray-500">
                  By submitting, you confirm the details are correct. We will follow up by email or phone.
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}