import React from "react";
import { Link, useNavigate } from "react-router-dom";

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

/** Brand colors (logo style) */
const BRAND = {
  primary: "#2F0D34", // purple
  accent: "#BD9F75", // gold
};

const INTAKES = ["Spring", "Summer", "Fall"];

const FACULTIES = [
  "Engineering / IT",
  "Computer Science",
  "Piloting",
  "Aviation Management",
  "Business & Management",
  "Medicine & Health Sciences",
  "Law",
  "Education",
  "Arts & Humanities",
  "Social Sciences",
  "Science",
  "Architecture / Design",
  "Agriculture / Environmental Studies",
  "Other",
];

const LEVELS = [
  {
    key: "undergrad",
    title: "Undergraduate",
    subtitle: "Bachelor’s / Diploma Programs",
    bullets: [
      "Help choosing the best course and country",
      "University shortlisting based on budget + grades",
      "Application support + documents review",
      "Scholarship guidance where available",
    ],
  },
  {
    key: "postgrad",
    title: "Postgraduate",
    subtitle: "Master’s / PhD Programs",
    bullets: [
      "Help choosing the best course and country",
      "University shortlisting based on budget + grades",
      "Application support + documents review",
      "Scholarship guidance where available",
      "Program & supervisor matching (where needed)",
      "SOP / Motivation letter coaching",
      "Research proposal guidance (if required)",
      "Strong CV polishing + application submission",
    ],
  },
];

const PROCESS = [
  {
    title: "Free Profile Assessment",
    desc: "We review your education background, budget, preferred country, and goals.",
  },
  {
    title: "University & Program Matching",
    desc: "We shortlist universities that match your profile and help you choose the best option.",
  },
  {
    title: "Document Preparation",
    desc: "We guide you on SOP, CV, recommendations, transcripts, and any required forms.",
  },
  {
    title: "Application Submission",
    desc: "We submit your applications and follow up with the university when needed.",
  },
  {
    title: "Offer Letter & Next Steps",
    desc: "We guide you on acceptance, deposit, and timelines after you receive the offer.",
  },
  {
    title: "Visa & Travel Support",
    desc: "We support visa steps, accommodation guidance, and air ticketing.",
  },
];

const DOCS = [
  "Passport (valid)",
  "Academic transcripts & certificates",
  "CV / Resume",
  "Statement of Purpose (SOP) / Motivation letter",
  "Recommendation letters (if needed)",
  "English test results (Duolingo/IELTS) if required",
  "Bank statement / proof of funds (for visa stage)",
];

const DESTINATIONS = [
  { name: "Canada", note: "Strong education + work opportunities" },
  { name: "USA", note: "Top universities + wide program choices" },
  { name: "UK", note: "Shorter programs + global recognition" },
  { name: "Germany", note: "Affordable options in many cases" },
  { name: "Australia", note: "Good student life + work options" },
  { name: "Poland", note: "Growing destination + affordable tuition" },
];

const FAQS = [
  {
    q: "Do I need IELTS to apply?",
    a: "Not always. Some universities accept Duolingo or waive English tests depending on your background. We check requirements for each university.",
  },
  {
    q: "How long does the process take?",
    a: "Usually 2–8 weeks for applications (depends on the university). Visa time depends on the country. We guide you with a clear timeline.",
  },
  {
    q: "Can you help me get scholarships?",
    a: "Yes. We help you identify scholarship opportunities and strengthen SOP/CV to improve your chances.",
  },
  {
    q: "Do you only work with students from Rwanda?",
    a: "No. We support students and professionals from different countries. Everything can be done online.",
  },
];

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-bold tracking-widest text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-extrabold text-gray-900">{value}</div>
    </div>
  );
}

function SectionTitle({ kicker, title, desc }) {
  return (
    <div className="text-center">
      <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
        {kicker}
      </div>
      <h2 className="mt-3 text-3xl font-extrabold text-gray-900">{title}</h2>
      {desc ? <p className="mt-3 text-gray-600">{desc}</p> : null}
    </div>
  );
}

export default function StudyAbroadUniversity() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  // refs to scroll to errors
  const levelRef = React.useRef(null);
  const intakeRef = React.useRef(null);
  const assessmentRef = React.useRef(null);

  const [level, setLevel] = React.useState("undergrad");
  const [faqOpen, setFaqOpen] = React.useState(0);

  const [errors, setErrors] = React.useState({
    level: "",
    intake: "",
    faculty: "",
    country: "",
  });

  const activeLevel = LEVELS.find((l) => l.key === level);

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    faculty: "",
    otherFaculty: "",
    intake: "",
  });

  const facultyFinal =
    form.faculty === "Other" ? (form.otherFaculty || "").trim() : form.faculty;

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };

      // If faculty changes away from Other, clear otherFaculty
      if (name === "faculty" && value !== "Other") {
        next.otherFaculty = "";
      }

      return next;
    });

    // clear relevant error live
    if (name === "faculty" || name === "otherFaculty") {
      setErrors((p) => ({ ...p, faculty: "" }));
    }
    if (name === "country") {
      setErrors((p) => ({ ...p, country: "" }));
    }
  };

  const scrollTo = (refEl) => {
    setTimeout(() => {
      refEl?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const validateRequired = () => {
    const nextErrors = { level: "", intake: "", faculty: "", country: "" };

    // Level required (state default is undergrad, but we still validate)
    if (!level) nextErrors.level = "Please choose a level (Undergraduate or Postgraduate).";

    // Intake required
    if (!form.intake) nextErrors.intake = "Please select an intake (Spring, Summer, or Fall).";

    // Faculty required (and Other requires otherFaculty)
    if (!form.faculty) {
      nextErrors.faculty = "Please select a faculty.";
    } else if (form.faculty === "Other" && !form.otherFaculty.trim()) {
      nextErrors.faculty = "Please specify your faculty (because you selected Other).";
    }

    // Country required
    if (!form.country.trim()) nextErrors.country = "Please enter your preferred country.";

    // Set errors
    setErrors(nextErrors);

    // Scroll to first error in page order
    if (nextErrors.level) {
      scrollTo(levelRef);
      return false;
    }
    if (nextErrors.intake) {
      scrollTo(intakeRef);
      return false;
    }
    if (nextErrors.faculty || nextErrors.country) {
      scrollTo(assessmentRef);
      return false;
    }

    return true;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validateRequired()) return;

    const payload = {
      level,
      ...form,
      faculty: facultyFinal,
    };

    console.log("Study Abroad Inquiry:", payload);
    alert("✅ Thanks! We received your request. We will contact you soon.");
  };

  const scrollToAssessment = () => {
    document.getElementById("assessment")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputBase =
    "mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";
  const errorText = "mt-2 text-xs font-semibold text-red-600";

  return (
    <div className="bg-white">
      {/* Soft background */}
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[520px]"
        style={{
          background:
            "radial-gradient(800px 260px at 20% 20%, rgba(47,13,52,0.12), transparent 60%), radial-gradient(800px 260px at 80% 10%, rgba(189,159,117,0.14), transparent 60%)",
        }}
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-700">Services</span>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Study Abroad</span>
        </div>
      </div>

      {/* HERO */}
      <section ref={ref} className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div
            className={[
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-xs font-bold text-gray-700 ring-1 ring-black/5 shadow-sm">
              🎓 Study Abroad Support
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              Undergraduate & Postgraduate
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Get into the right university — with full support from start to finish
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We help you choose the best program, prepare strong documents, submit applications,
              and guide you through visa and travel steps — clearly and professionally.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToAssessment}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#250A28")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
              >
                Get Free Assessment
              </button>

              <button
                type="button"
                onClick={() => navigate("/company/about")}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: BRAND.accent, color: BRAND.primary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(189,159,117,0.10)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Learn About Us
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Support Type" value="Full" />
              <StatCard label="Levels" value="UG + PG" />
              <StatCard label="Response" value="Fast" />
            </div>
          </div>

          {/* Right image */}
          <div
            className={[
              "relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10",
              "min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]",
              "transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            <img
              src="/gigi.png"
              alt="Study abroad"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute left-5 top-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold text-gray-900 shadow ring-1 ring-black/5">
              International Mindset PathWays
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur p-4 shadow ring-1 ring-black/5">
              <div className="text-sm font-extrabold text-gray-900">What you get ✅</div>
              <div className="mt-1 text-xs text-gray-600">
                Matching • Documents • Application • Visa Guidance • Travel Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL SELECT + INTAKE */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Level */}
          <div ref={levelRef} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
                CHOOSE YOUR LEVEL (Required)
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                Undergraduate or Postgraduate?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Select your level so we show the right guidance and expectations.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setLevel("undergrad");
                  setErrors((p) => ({ ...p, level: "" }));
                }}
                className="rounded-xl px-4 py-2 text-sm font-semibold transition shadow-sm"
                style={{
                  backgroundColor: level === "undergrad" ? BRAND.primary : "white",
                  color: level === "undergrad" ? "white" : "#111827",
                  border: level === "undergrad" ? "1px solid transparent" : "1px solid #D1D5DB",
                }}
              >
                Undergraduate
              </button>

              <button
                type="button"
                onClick={() => {
                  setLevel("postgrad");
                  setErrors((p) => ({ ...p, level: "" }));
                }}
                className="rounded-xl px-4 py-2 text-sm font-semibold transition shadow-sm"
                style={{
                  backgroundColor: level === "postgrad" ? BRAND.primary : "white",
                  color: level === "postgrad" ? "white" : "#111827",
                  border: level === "postgrad" ? "1px solid transparent" : "1px solid #D1D5DB",
                }}
              >
                Postgraduate
              </button>
            </div>
          </div>

          {errors.level ? <div className={errorText}>{errors.level}</div> : null}

          {/* Intake */}
          <div ref={intakeRef} className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
              SELECT INTAKE (Required)
            </div>

            <h3 className="mt-2 text-lg font-extrabold text-gray-900">
              When do you want to start?
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Choose your preferred intake. We will recommend universities with matching deadlines.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {INTAKES.map((it) => {
                const active = form.intake === it;
                return (
                  <button
                    key={it}
                    type="button"
                    onClick={() => {
                      setForm((p) => ({ ...p, intake: it }));
                      setErrors((p) => ({ ...p, intake: "" }));
                    }}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                    style={{
                      backgroundColor: active ? BRAND.primary : "white",
                      color: active ? "white" : "#111827",
                      border: active ? "1px solid transparent" : "1px solid #D1D5DB",
                    }}
                  >
                    {it}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Selected intake:{" "}
              <span className="font-semibold text-gray-900">{form.intake || "—"}</span>
            </div>

            {errors.intake ? <div className={errorText}>{errors.intake}</div> : null}
          </div>

          {/* Level details */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-5">
              <div className="text-sm font-extrabold text-gray-900">{activeLevel.title}</div>
              <div className="text-xs text-gray-600 mt-1">{activeLevel.subtitle}</div>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {activeLevel.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-extrabold text-gray-900">Recommended next step</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Fill the free assessment form. We will review your profile and share a shortlist
                of universities/programs that match your goals.
              </p>

              <button
                type="button"
                onClick={scrollToAssessment}
                className="mt-4 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#250A28")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
              >
                Go to Assessment Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <SectionTitle
          kicker="HOW IT WORKS"
          title="Simple step-by-step process"
          desc="We keep everything clear, so you always know what happens next."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((s, idx) => (
            <div key={s.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-2xl text-white flex items-center justify-center font-extrabold shadow"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  {idx + 1}
                </div>
                <div className="text-sm font-extrabold text-gray-900">{s.title}</div>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCUMENTS + DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
              DOCUMENTS
            </div>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">What you should prepare 📄</h3>
            <p className="mt-2 text-sm text-gray-600">
              Don’t worry if you don’t have everything. We help you step by step.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              {DOCS.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
              DESTINATIONS
            </div>
            <h3 className="mt-2 text-2xl font-extrabold text-gray-900">
              Popular study destinations 
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              We guide you based on your budget, visa rules, and your goals.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {DESTINATIONS.map((c) => (
                <div key={c.name} className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-sm font-extrabold text-gray-900">{c.name}</div>
                  <div className="mt-1 text-xs text-gray-600">{c.note}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToAssessment}
              className="mt-5 w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#250A28")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
            >
              Ask us to recommend your best country
            </button>
          </div>
        </div>
      </section>

      {/* FREE ASSESSMENT FORM */}
      <section id="assessment" className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.04)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
                FREE ASSESSMENT
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Tell us about you 👇</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Share basic details and we’ll contact you with a shortlist of universities and next steps.
              </p>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-extrabold text-gray-900">Your selection:</div>
                <div className="mt-2 text-sm text-gray-700">
                  🎓 Level: <span className="font-semibold">{activeLevel.title}</span>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  🗓️ Intake: <span className="font-semibold">{form.intake || "Not selected"}</span>
                </div>
              </div>
            </div>

            <form
              ref={assessmentRef}
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
                    className={`${inputBase} border-gray-300`}
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
                    className={`${inputBase} border-gray-300`}
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Phone / WhatsApp</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={`${inputBase} border-gray-300`}
                    placeholder="+250 ..."
                  />
                </div>

                {/* Faculty required */}
                <div>
                  <label className="text-xs font-bold text-gray-700">
                    Preferred Faculty <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="faculty"
                    value={form.faculty}
                    onChange={onChange}
                    className={`${inputBase} bg-white ${errors.faculty ? "border-red-500" : "border-gray-300"}`}
                    required
                  >
                    <option value="">Select faculty...</option>
                    {FACULTIES.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  {errors.faculty ? <div className={errorText}>{errors.faculty}</div> : null}
                </div>

                {/* Other faculty required if "Other" */}
                {form.faculty === "Other" && (
                  <div>
                    <label className="text-xs font-bold text-gray-700">
                      Please specify your faculty <span className="text-red-600">*</span>
                    </label>
                    <input
                      name="otherFaculty"
                      value={form.otherFaculty}
                      onChange={onChange}
                      className={`${inputBase} ${errors.faculty ? "border-red-500" : "border-gray-300"}`}
                      placeholder="e.g. Nursing, Data Science, Aviation Engineering..."
                      required
                    />
                  </div>
                )}

                {/* Country required */}
                <div>
                  <label className="text-xs font-bold text-gray-700">
                    Preferred Country <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="country"
                    value={form.country}
                    onChange={onChange}
                    className={`${inputBase} ${errors.country ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Canada, USA, UK..."
                    required
                  />
                  {errors.country ? <div className={errorText}>{errors.country}</div> : null}
                </div>

                <button
                  type="submit"
                  className="mt-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#250A28")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
                >
                  Submit Assessment
                </button>

                <div className="text-xs text-gray-500">
                  By submitting, you agree we may contact you for follow-up about your request.
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle kicker="FAQ" title="Common questions" />

        <div className="mt-10 mx-auto max-w-3xl space-y-3">
          {FAQS.map((f, idx) => {
            const open = faqOpen === idx;
            return (
              <div key={f.q} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setFaqOpen((p) => (p === idx ? -1 : idx))}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <div className="text-sm font-extrabold text-gray-900">{f.q}</div>
                  <span className="text-lg" style={{ color: BRAND.primary }}>
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

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
            style={{ borderColor: BRAND.accent, color: BRAND.primary }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(189,159,117,0.10)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            Still have a question? Contact us 📩
          </button>
        </div>
      </section>
    </div>
  );
}
