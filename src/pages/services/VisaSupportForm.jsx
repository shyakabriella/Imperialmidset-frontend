import React from "react";
import { Link, useNavigate } from "react-router-dom";

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

const VISA_TYPES = [
  "Student Visa",
  "Tourist / Visit Visa",
  "Work Visa",
  "Business Visa",
  "Family / Dependant Visa",
  "Other",
];

const COUNTRIES = ["Canada", "USA", "UK", "Germany", "Australia", "Poland", "Other"];

function Kicker({ children }) {
  return (
    <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
      {children}
    </div>
  );
}

function humanSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  const thresh = 1024;
  if (Math.abs(bytes) < thresh) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let u = -1;
  let b = bytes;
  do {
    b /= thresh;
    ++u;
  } while (Math.abs(b) >= thresh && u < units.length - 1);
  return `${b.toFixed(1)} ${units[u]}`;
}

export default function VisaSupportForm() {
  const navigate = useNavigate();
  const formRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  const [dragOver, setDragOver] = React.useState(false);
  const [uploads, setUploads] = React.useState([]);
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    otherCountry: "",
    visaType: "",
    otherVisaType: "",
    travelDate: "",
    message: "",
  });

  const [errors, setErrors] = React.useState({
    country: "",
    visaType: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "country" && value !== "Other") next.otherCountry = "";
      if (name === "visaType" && value !== "Other") next.otherVisaType = "";
      return next;
    });

    if (name === "country" || name === "otherCountry") {
      setErrors((p) => ({ ...p, country: "" }));
    }
    if (name === "visaType" || name === "otherVisaType") {
      setErrors((p) => ({ ...p, visaType: "" }));
    }
  };

  const countryFinal = form.country === "Other" ? form.otherCountry.trim() : form.country;
  const visaTypeFinal = form.visaType === "Other" ? form.otherVisaType.trim() : form.visaType;

  const validate = () => {
    const next = { country: "", visaType: "" };

    if (!form.country) next.country = "Please select a destination country.";
    if (form.country === "Other" && !form.otherCountry.trim()) {
      next.country = "Please specify your destination country.";
    }

    if (!form.visaType) next.visaType = "Please select a visa type.";
    if (form.visaType === "Other" && !form.otherVisaType.trim()) {
      next.visaType = "Please specify your visa type.";
    }

    setErrors(next);

    if (next.country || next.visaType) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return false;
    }

    return true;
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    const MAX_MB = 10;
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const cleaned = [];
    for (const f of files) {
      const tooBig = f.size > MAX_MB * 1024 * 1024;
      const okType = allowed.includes(f.type) || f.name.toLowerCase().endsWith(".pdf");
      if (!tooBig && okType) cleaned.push(f);
    }

    setUploads((prev) => {
      const existing = new Set(prev.map((x) => `${x.file.name}-${x.file.size}`));
      const next = [...prev];

      cleaned.forEach((f) => {
        const key = `${f.name}-${f.size}`;
        if (!existing.has(key)) {
          next.push({ id: `${Date.now()}-${Math.random()}`, file: f });
          existing.add(key);
        }
      });

      return next;
    });
  };

  const onPickFiles = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (id) => {
    setUploads((prev) => prev.filter((x) => x.id !== id));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      country: countryFinal,
      visaType: visaTypeFinal,
      uploadedFiles: uploads.map((u) => ({
        name: u.file.name,
        size: u.file.size,
        type: u.file.type,
      })),
    };

    console.log("Visa Support Inquiry:", payload);

    alert(
      "✅ Thanks! We received your visa support request.\n\nWe will contact you soon."
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";
  const errorText = "mt-2 text-xs font-semibold text-red-600";

  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20" style={{ backgroundColor: HERO.paper }} />

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

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-[120px] pb-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">Visa Support Form</h1>

          <div className="mt-4 text-sm sm:text-base text-gray-700">
            <Link to="/" className="text-yellow-700 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">Services</span>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/services/visa-support" className="text-gray-700 hover:underline">
              Visa Support
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Request Form</span>
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-gray-700 leading-relaxed">
            Tell us your destination and visa type. We’ll review your case and contact you with the next steps.
          </p>
        </div>

        {/* Banner */}
        <div className="relative z-10 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: HERO.banner }} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.08), transparent 55%)" }}
          />

          <div className="relative mx-auto max-w-7xl px-4">
            <div className="py-8 pr-[72px] sm:pr-[96px]">
              <div className="text-left flex items-center justify-center sm:justify-start">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                    Complete your visa request
                  </div>
                  <div className="mt-1 text-sm sm:text-base text-gray-800">
                    Fill the form below and upload documents if available.
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: HERO.blue }}
                >
                  Go to Form
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/services/visa")}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white/20 hover:bg-white/25 transition active:scale-[0.98]"
                  style={{ borderColor: "rgba(0,0,0,0.18)", color: HERO.ink }}
                >
                  Back to Visa Support
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="absolute right-0 top-0 h-full w-14 sm:w-20 flex items-center justify-center"
            style={{ backgroundColor: HERO.blue }}
            aria-label="Scroll down to form"
          >
            <div className="rotate-90 text-white font-bold tracking-widest text-xs sm:text-sm">
              Scroll
            </div>
          </button>
        </div>

        <div className="h-10" />
      </section>

      {/* FORM SECTION */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left */}
            <div>
              <Kicker>REQUEST SUPPORT</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
                Tell us your destination and visa type
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Share a few details and we will guide you with the right checklist and next steps.
              </p>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
                <div className="text-sm font-extrabold text-gray-900">Important note</div>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  We do not guarantee approvals, but we help you submit a complete and consistent application.
                </p>
              </div>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-extrabold text-gray-900">Contact</div>
                <div className="mt-2 text-sm text-gray-700">
                  Email:{" "}
                  <a className="font-semibold hover:underline" href="mailto:inter.mindsetpath@gmail.com">
                    inter.mindsetpath@gmail.com
                  </a>
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  Phone / WhatsApp:{" "}
                  <a className="font-semibold hover:underline" href="tel:0786876623">
                    0786876623
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
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

                <div className="grid gap-4 sm:grid-cols-2">
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
                </div>

                {/* Country */}
                <div>
                  <label className="text-xs font-bold text-gray-700">
                    Destination Country <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={onChange}
                    required
                    className={`${inputBase} bg-white ${errors.country ? "border-red-500" : ""}`}
                  >
                    <option value="">Select country...</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.country ? <div className={errorText}>{errors.country}</div> : null}
                </div>

                {form.country === "Other" && (
                  <div>
                    <label className="text-xs font-bold text-gray-700">
                      Specify Country <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="otherCountry"
                      value={form.otherCountry}
                      onChange={onChange}
                      required
                      className={`${inputBase} ${errors.country ? "border-red-500" : ""}`}
                      placeholder="Type your destination country"
                    />
                  </div>
                )}

                {/* Visa Type */}
                <div>
                  <label className="text-xs font-bold text-gray-700">
                    Visa Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="visaType"
                    value={form.visaType}
                    onChange={onChange}
                    required
                    className={`${inputBase} bg-white ${errors.visaType ? "border-red-500" : ""}`}
                  >
                    <option value="">Select visa type...</option>
                    {VISA_TYPES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  {errors.visaType ? <div className={errorText}>{errors.visaType}</div> : null}
                </div>

                {form.visaType === "Other" && (
                  <div>
                    <label className="text-xs font-bold text-gray-700">
                      Specify Visa Type <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="otherVisaType"
                      value={form.otherVisaType}
                      onChange={onChange}
                      required
                      className={`${inputBase} ${errors.visaType ? "border-red-500" : ""}`}
                      placeholder="Type your visa type"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-700">Planned Travel Date (optional)</label>
                  <input
                    type="date"
                    name="travelDate"
                    value={form.travelDate}
                    onChange={onChange}
                    className={inputBase}
                  />
                </div>

                {/* Upload */}
                <div className="mt-2">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <label className="text-xs font-bold text-gray-700">Upload Documents (optional)</label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl border px-4 py-2 text-xs font-semibold bg-white hover:bg-gray-50 active:scale-[0.98]"
                      style={{ borderColor: "rgba(47,13,52,0.18)", color: BRAND.primary }}
                    >
                      Choose files
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={onPickFiles}
                  />

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragOver(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragOver(false);
                    }}
                    onDrop={onDrop}
                    className={[
                      "mt-2 rounded-2xl border-2 border-dashed p-4 transition",
                      dragOver ? "bg-gray-50" : "bg-white",
                    ].join(" ")}
                    style={{
                      borderColor: dragOver ? BRAND.accent : "rgba(0,0,0,0.15)",
                    }}
                  >
                    <div className="text-sm font-semibold text-gray-900">Drag and drop files here</div>
                    <div className="mt-1 text-xs text-gray-600">
                      Accepted: PDF, JPG, PNG, DOC, DOCX • Max ~10MB each (client check)
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Files stay in browser for now. Backend upload can be connected next.
                    </div>
                  </div>

                  {uploads.length > 0 ? (
                    <div className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <div className="text-xs font-bold tracking-widest text-gray-500">SELECTED FILES</div>
                      <div className="mt-3 space-y-2">
                        {uploads.map((u) => (
                          <div
                            key={u.id}
                            className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 border border-gray-200"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-gray-900 truncate">
                                {u.file.name}
                              </div>
                              <div className="text-xs text-gray-600">{humanSize(u.file.size)}</div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFile(u.id)}
                              className="rounded-xl border px-3 py-2 text-xs font-semibold bg-white hover:bg-gray-50 active:scale-[0.98]"
                              style={{ borderColor: "rgba(0,0,0,0.12)" }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Message (optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={4}
                    className={inputBase}
                    placeholder="Tell us details (purpose, sponsor, timeline...)"
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

                <div className="rounded-2xl bg-gray-50 p-4 text-xs text-gray-600">
                  <div className="font-bold text-gray-700">Preview:</div>
                  <div className="mt-2">
                    Country: <span className="font-semibold">{countryFinal || "—"}</span>
                  </div>
                  <div className="mt-1">
                    Visa Type: <span className="font-semibold">{visaTypeFinal || "—"}</span>
                  </div>
                  <div className="mt-1">
                    Travel Date: <span className="font-semibold">{form.travelDate || "—"}</span>
                  </div>
                  <div className="mt-1">
                    Files: <span className="font-semibold">{uploads.length || 0}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}