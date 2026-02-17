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

/** Brand colors */
const BRAND = {
  primary: "#2F0D34", // purple
  accent: "#BD9F75", // gold
};

const HERO_IMG_LOCAL = "/images/visa-hero.jpg";

const VISA_TYPES = [
  "Student Visa",
  "Tourist / Visit Visa",
  "Work Visa",
  "Business Visa",
  "Family / Dependant Visa",
  "Other",
];

const COUNTRIES = ["Canada", "USA", "UK", "Germany", "Australia", "Poland", "Other"];

const WHAT_WE_HELP_WITH = [
  {
    title: "Document Checklist & Review",
    desc: "We review your documents and help you prepare a strong, complete file.",
  },
  {
    title: "Application Form Assistance",
    desc: "We guide you step-by-step on online forms and help you avoid mistakes.",
  },
  {
    title: "Cover Letter / Statement Support",
    desc: "We help you write clear and convincing letters for visa officers.",
  },
  {
    title: "Financial Documents Guidance",
    desc: "We show you how to present your bank statement and sponsor documents properly.",
  },
  {
    title: "Appointment & Biometrics Guidance",
    desc: "We help you book appointments and prepare what to bring for biometrics.",
  },
  {
    title: "Interview Preparation",
    desc: "If an interview is required, we practice common questions and strong answers.",
  },
];

const PROCESS = [
  {
    title: "Free Initial Check",
    desc: "We understand your purpose, destination, and timeline, then advise the best approach.",
  },
  {
    title: "Checklist & Planning",
    desc: "We give you a checklist and a simple plan for preparing everything correctly.",
  },
  {
    title: "Document Review",
    desc: "We review your documents and tell you what to improve before submission.",
  },
  {
    title: "Application Support",
    desc: "We guide you through the application steps and make sure details are correct.",
  },
  {
    title: "Interview / Biometrics Prep",
    desc: "We prepare you for questions and show you what to bring to appointments.",
  },
  {
    title: "Submission & Follow-up",
    desc: "We help you stay organized and follow the next steps after submission.",
  },
];

const DOCS = [
  "Valid passport",
  "Passport photo(s) (as required)",
  "Proof of purpose (admission letter, invitation, itinerary, etc.)",
  "Proof of funds (bank statement / sponsor documents)",
  "Accommodation details (if required)",
  "Travel history (if available)",
  "Employment / study proof (letter, ID, transcripts if needed)",
];

const FAQS = [
  {
    q: "Do you guarantee visa approval?",
    a: "No one can guarantee approval. But we help you submit a strong and complete application and avoid mistakes that cause refusals.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the country and visa type. We help you plan early and follow official timelines.",
  },
  {
    q: "Can I apply without a sponsor?",
    a: "Sometimes yes. It depends on your visa type and financial proof. We advise the best option for your case.",
  },
  {
    q: "Can everything be done online?",
    a: "Yes. Most steps can be handled online. For biometrics/interview, you may need to attend in person depending on the country.",
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

function InfoCard({ title, desc }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-sm font-extrabold text-gray-900">{title}</div>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineStep({ idx, title, desc }) {
  return (
    <div className="relative pl-10">
      <div
        className="absolute left-0 top-0 h-8 w-8 rounded-2xl flex items-center justify-center text-white font-extrabold shadow"
        style={{ backgroundColor: BRAND.primary }}
      >
        {idx}
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-extrabold text-gray-900">{title}</div>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
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

export default function VisaSupport() {
  const { ref, inView } = useInView();

  const midRef = React.useRef(null);
  const formRef = React.useRef(null);

  const fileInputRef = React.useRef(null);
  const [dragOver, setDragOver] = React.useState(false);

  const [faqOpen, setFaqOpen] = React.useState(0);

  const [uploads, setUploads] = React.useState([]); // {id, file}

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

    if (name === "country" || name === "otherCountry") setErrors((p) => ({ ...p, country: "" }));
    if (name === "visaType" || name === "otherVisaType") setErrors((p) => ({ ...p, visaType: "" }));
  };

  const countryFinal = form.country === "Other" ? form.otherCountry.trim() : form.country;
  const visaTypeFinal = form.visaType === "Other" ? form.otherVisaType.trim() : form.visaType;

  const scrollTo = (el) =>
    setTimeout(() => el?.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);

  const validate = () => {
    const next = { country: "", visaType: "" };

    if (!form.country) next.country = "Please select a destination country.";
    if (form.country === "Other" && !form.otherCountry.trim())
      next.country = "Please specify your destination country.";

    if (!form.visaType) next.visaType = "Please select a visa type.";
    if (form.visaType === "Other" && !form.otherVisaType.trim())
      next.visaType = "Please specify your visa type.";

    setErrors(next);

    if (next.country || next.visaType) {
      scrollTo(formRef);
      return false;
    }
    return true;
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    // basic constraints (client-only)
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
      const existingKey = new Set(prev.map((x) => `${x.file.name}-${x.file.size}`));
      const next = [...prev];
      cleaned.forEach((f) => {
        const key = `${f.name}-${f.size}`;
        if (!existingKey.has(key)) {
          next.push({ id: `${Date.now()}-${Math.random()}`, file: f });
          existingKey.add(key);
        }
      });
      return next;
    });
  };

  const onPickFiles = (e) => addFiles(e.target.files);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (id) => setUploads((prev) => prev.filter((x) => x.id !== id));

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
      "✅ Thanks! We received your visa support request. We will contact you soon.\n\n(Your uploaded files are saved on your device only. Backend upload can be added next.)"
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";
  const errorText = "mt-2 text-xs font-semibold text-red-600";

  return (
    <div className="bg-white relative">
      {/* Top background */}
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[560px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(47,13,52,0.06) 0%, rgba(189,159,117,0.10) 40%, transparent 100%)",
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
          <span className="text-gray-900 font-semibold">Visa Support</span>
        </div>
      </div>

      {/* HERO */}
      <section ref={ref} className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left */}
          <div
            className={[
              "lg:col-span-7 transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <div className="flex flex-wrap gap-2">
              <SoftPill>Visa Support</SoftPill>
              <SoftPill>Student • Visit • Work • Business</SoftPill>
              <SoftPill>Online Support</SoftPill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Submit your visa application with clarity and confidence
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
              We help you prepare a complete file, write strong letters, present finances correctly,
              and avoid common mistakes that lead to refusals.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo(formRef)}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Request Support
              </button>

              <button
                type="button"
                onClick={() => scrollTo(midRef)}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: BRAND.accent, color: BRAND.primary }}
              >
                View Documents & FAQ
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: "Focus", v: "Completeness" },
                { k: "Support", v: "Step-by-step" },
                { k: "Goal", v: "Fewer mistakes" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold tracking-widest text-gray-500">{x.k}</div>
                  <div className="mt-2 text-xl font-extrabold text-gray-900">{x.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-700">
              Need quick help?{" "}
              <a className="font-semibold hover:underline" href="mailto:inter.mindsetpath@gmail.com">
                inter.mindsetpath@gmail.com
              </a>{" "}
              •{" "}
              <a className="font-semibold hover:underline" href="tel:0786876623">
                0786876623
              </a>
            </div>
          </div>

          {/* Right hero image */}
          <div
            className={[
              "lg:col-span-5 transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <img
                src={HERO_IMG_LOCAL}
                alt="Visa support"
                className="h-[420px] w-full object-cover"
                onError={(e) => {
                  // fallback: show plain background if file missing
                  e.currentTarget.style.display = "none";
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(47,13,52,0.06) 0%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0.22) 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur p-4 shadow ring-1 ring-black/5">
                <div className="text-sm font-extrabold text-gray-900">What we cover</div>
                <div className="mt-1 text-xs text-gray-600">
                  Checklist • Forms • Letters • Finances • Biometrics • Interview preparation
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-bold tracking-widest text-gray-500">NOTE</div>
              <div className="mt-2 text-sm text-gray-700">
                We don’t guarantee approvals, but we help you submit a stronger and complete application.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="text-center">
          <Kicker>WHAT WE DO</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Visa support services (clear and professional)
          </h2>
          <p className="mt-3 text-gray-600">
            Simple steps, clear guidance, and document review so you avoid refusals caused by missing information.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_HELP_WITH.map((it) => (
            <InfoCard key={it.title} title={it.title} desc={it.desc} />
          ))}
        </div>
      </section>

      {/* MIDDLE HUB */}
      <section ref={midRef} className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <Kicker>MIDDLE GUIDE</Kicker>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Documents and destinations</h2>
            <p className="mt-3 text-gray-600">Common requirements and quick guidance for popular destinations.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Documents */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <Kicker>COMMON DOCUMENTS</Kicker>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(189,159,117,0.18)", color: BRAND.primary }}
                >
                  Checklist
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-extrabold text-gray-900">What to prepare</h3>
              <p className="mt-2 text-sm text-gray-600">
                Requirements vary by country, but these are common in many visa applications.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {DOCS.map((d) => (
                  <div key={d} className="rounded-2xl bg-gray-50 p-4">
                    <div className="text-sm text-gray-700">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <Kicker>DESTINATIONS</Kicker>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(47,13,52,0.08)", color: BRAND.primary }}
                >
                  Popular
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-extrabold text-gray-900">Where we support you</h3>
              <p className="mt-2 text-sm text-gray-600">
                We guide students and professionals based on your destination and visa type.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {COUNTRIES.filter((c) => c !== "Other").map((c) => (
                  <span
                    key={c}
                    className="rounded-full border px-4 py-2 text-sm font-semibold"
                    style={{
                      borderColor: "rgba(47,13,52,0.15)",
                      color: BRAND.primary,
                      background: "white",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollTo(formRef)}
                className="mt-6 w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Start my visa request
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
                      <div className="overflow-hidden px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                        {f.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => scrollTo(formRef)}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: BRAND.accent, color: BRAND.primary }}
              >
                Request support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <Kicker>PROCESS</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">How it works</h2>
          <p className="mt-3 text-gray-600">Simple steps so you know what happens next.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {PROCESS.map((s, idx) => (
            <TimelineStep key={s.title} idx={idx + 1} title={s.title} desc={s.desc} />
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left note */}
            <div>
              <Kicker>REQUEST SUPPORT</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
                Tell us your destination and visa type
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We will respond with next steps and a clear checklist based on your case.
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

                {/* Destination REQUIRED */}
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

                {/* Visa type REQUIRED */}
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

                {/* Upload documents */}
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
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    className={[
                      "mt-2 rounded-2xl border-2 border-dashed p-4 transition",
                      dragOver ? "bg-gray-50" : "bg-white",
                    ].join(" ")}
                    style={{
                      borderColor: dragOver ? BRAND.accent : "rgba(0,0,0,0.15)",
                    }}
                  >
                    <div className="text-sm font-semibold text-gray-900">
                      Drag and drop files here
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      Accepted: PDF, JPG, PNG, DOC, DOCX • Max ~10MB each (client check)
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Note: Files are only stored in your browser for now. Real upload will be added with backend.
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
                              <div className="text-xs text-gray-600">
                                {humanSize(u.file.size)}
                              </div>
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