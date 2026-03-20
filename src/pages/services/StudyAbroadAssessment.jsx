import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import universities from "../../data/universities";

/** Small in-view animation hook */
function useInView(threshold = 0.15) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Brand colors */
const BRAND = {
  primary: "#2F0D34",
  accent: "#BD9F75",
};

/** Banner colors */
const HERO = {
  paper: "#F7F1E6",
  banner: "#F6B100",
  blue: "#2563EB",
  ink: "#0B1220",
};

const INTAKES = ["Spring", "Summer", "Fall"];

const GENERAL_FACULTIES = [
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
      "Course & country guidance",
      "University shortlisting (budget + grades)",
      "Application support + document review",
      "Scholarship guidance (if available)",
    ],
  },
  {
    key: "postgrad",
    title: "Postgraduate",
    subtitle: "Master’s / PhD Programs",
    bullets: [
      "Course & country guidance",
      "University shortlisting (budget + grades)",
      "Application support + document review",
      "Scholarship guidance (if available)",
      "SOP / Motivation letter coaching",
      "CV polishing + submission guidance",
    ],
  },
];

/* ---------------- Upload helpers ---------------- */
const ACCEPTED_EXTS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
const ACCEPT_ATTR =
  "application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,image/jpeg,image/png,.jpg,.jpeg,.png";

const MAX_FILE_MB = 10; // per file
const MAX_TOTAL_MB = 25; // total

function bytesToMB(bytes) {
  return bytes / (1024 * 1024);
}

function prettySize(bytes) {
  const mb = bytesToMB(bytes);
  if (mb < 1) return `${Math.round(bytes / 1024)} KB`;
  return `${mb.toFixed(1)} MB`;
}

function fileExt(name = "") {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

function isAllowedFile(file) {
  const ext = fileExt(file.name);
  return ACCEPTED_EXTS.includes(ext);
}

function normalizeText(value = "") {
  return String(value).trim().toLowerCase();
}

function guessLevelFromUniversity(university) {
  const text = normalizeText(university?.programSummary || "");

  const hasPostgrad =
    text.includes("master") || text.includes("phd") || text.includes("postgraduate");
  const hasUndergrad =
    text.includes("undergrad") ||
    text.includes("bachelor") ||
    text.includes("diploma");

  if (hasPostgrad && !hasUndergrad) return "postgrad";
  return "undergrad";
}

/* ------------------------------------------------ */

export default function StudyAbroadAssessment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hero = useInView(0.18);

  const selectedUniversityName = searchParams.get("university") || "";

  const selectedUniversity = React.useMemo(() => {
    if (!selectedUniversityName) return null;

    return (
      universities.find(
        (u) => normalizeText(u.name) === normalizeText(selectedUniversityName)
      ) || null
    );
  }, [selectedUniversityName]);

  const programOptions = React.useMemo(() => {
    if (
      selectedUniversity?.programsOffered &&
      Array.isArray(selectedUniversity.programsOffered) &&
      selectedUniversity.programsOffered.length > 0
    ) {
      const uniquePrograms = Array.from(new Set(selectedUniversity.programsOffered));
      return [...uniquePrograms, "Other"];
    }
    return GENERAL_FACULTIES;
  }, [selectedUniversity]);

  // refs to scroll to errors
  const levelRef = React.useRef(null);
  const intakeRef = React.useRef(null);
  const formRef = React.useRef(null);

  const [level, setLevel] = React.useState("undergrad");

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    faculty: "",
    otherFaculty: "",
    country: "",
    intake: "",
    notes: "",
  });

  const [errors, setErrors] = React.useState({
    level: "",
    intake: "",
    faculty: "",
    country: "",
  });

  React.useEffect(() => {
    if (selectedUniversity?.country) {
      setForm((prev) => ({
        ...prev,
        country: selectedUniversity.country,
      }));
    }
  }, [selectedUniversity]);

  React.useEffect(() => {
    if (selectedUniversity) {
      setLevel(guessLevelFromUniversity(selectedUniversity));
    }
  }, [selectedUniversity]);

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";
  const errorText = "mt-2 text-xs font-semibold text-red-600";

  const activeLevel = LEVELS.find((l) => l.key === level) || LEVELS[0];

  const facultyFinal =
    form.faculty === "Other" ? (form.otherFaculty || "").trim() : form.faculty;

  const scrollTo = (refEl) => {
    setTimeout(() => {
      refEl?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 40);
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "faculty" && value !== "Other") next.otherFaculty = "";
      return next;
    });

    if (name === "faculty" || name === "otherFaculty") {
      setErrors((p) => ({ ...p, faculty: "" }));
    }

    if (name === "country") {
      setErrors((p) => ({ ...p, country: "" }));
    }
  };

  const validateRequired = () => {
    const next = { level: "", intake: "", faculty: "", country: "" };

    if (!level) next.level = "Please choose a level.";
    if (!form.intake) next.intake = "Please select an intake.";

    if (!form.faculty) {
      next.faculty = selectedUniversity
        ? "Please choose a program for the selected university."
        : "Please select a faculty.";
    } else if (form.faculty === "Other" && !form.otherFaculty.trim()) {
      next.faculty = "Please specify your faculty/program because you selected Other.";
    }

    if (!form.country.trim()) next.country = "Please enter your preferred country.";

    setErrors(next);

    if (next.level) return scrollTo(levelRef), false;
    if (next.intake) return scrollTo(intakeRef), false;
    if (next.faculty || next.country) return scrollTo(formRef), false;

    return true;
  };

  /* ---------------- Document upload state ---------------- */
  const fileInputRef = React.useRef(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [docError, setDocError] = React.useState("");
  const [docs, setDocs] = React.useState([]); // File[]

  const totalBytes = React.useMemo(
    () => docs.reduce((sum, file) => sum + (file?.size || 0), 0),
    [docs]
  );

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (incoming.length === 0) return;

    setDocError("");

    const next = [];
    for (const f of incoming) {
      if (!isAllowedFile(f)) {
        setDocError(
          `Unsupported file "${f.name}". Allowed: PDF, DOC, DOCX, JPG, PNG.`
        );
        continue;
      }

      if (bytesToMB(f.size) > MAX_FILE_MB) {
        setDocError(`"${f.name}" is too large. Max ${MAX_FILE_MB}MB per file.`);
        continue;
      }

      const duplicate = docs.some(
        (x) =>
          x.name === f.name &&
          x.size === f.size &&
          x.lastModified === f.lastModified
      );

      if (!duplicate) next.push(f);
    }

    const newTotalBytes = totalBytes + next.reduce((sum, f) => sum + f.size, 0);
    if (bytesToMB(newTotalBytes) > MAX_TOTAL_MB) {
      setDocError(`Total upload is too large. Max ${MAX_TOTAL_MB}MB total.`);
      return;
    }

    if (next.length) setDocs((prev) => [...prev, ...next]);
  };

  const onPickFiles = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const removeFile = (idx) => {
    setDocs((prev) => prev.filter((_, i) => i !== idx));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateRequired()) return;

    const payload = {
      selectedUniversity: selectedUniversity?.name || selectedUniversityName || "",
      selectedUniversityCountry: selectedUniversity?.country || form.country,
      selectedUniversityState: selectedUniversity?.state || "",
      selectedUniversityCity: selectedUniversity?.city || "",
      level,
      ...form,
      faculty: facultyFinal,
      selectedProgramOrFaculty: facultyFinal,
    };

    const fd = new FormData();
    fd.append("payload", JSON.stringify(payload));
    docs.forEach((file) => fd.append("documents[]", file));

    console.log("Study Abroad Assessment:", payload);
    console.log("Documents:", docs);

    alert(
      `✅ Thanks! We received your assessment.${
        payload.selectedUniversity
          ? `\n\nSelected University: ${payload.selectedUniversity}`
          : ""
      }\nDocuments: ${docs.length} file(s)\nWe will contact you soon.`
    );

    // optional redirect:
    // navigate("/services/study-abroad/university");
  };

  const scrollToForm = () => {
    document
      .getElementById("assessment-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-20"
          style={{ backgroundColor: HERO.paper }}
        />

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

        <div
          ref={hero.ref}
          className="relative z-10 mx-auto max-w-7xl px-4 pt-[120px] pb-10 text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">
            Free Assessment
          </h1>

          <div className="mt-4 text-sm sm:text-base text-gray-700">
            <Link to="/" className="text-yellow-700 hover:underline">
              Home
            </Link>{" "}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">Services</span>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              to="/services/study-abroad/university"
              className="text-yellow-700 hover:underline"
            >
              Study Abroad
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Assessment</span>
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-gray-700 leading-relaxed">
            {selectedUniversity ? (
              <>
                You selected{" "}
                <span className="font-bold text-gray-900">
                  {selectedUniversity.name}
                </span>
                . Complete this assessment and we will guide you based on the
                university, location, programs, and document requirements.
              </>
            ) : (
              <>Share your level, intake, preferred faculty, and country. Upload documents if you have them (optional).</>
            )}
          </p>

          {selectedUniversity ? (
            <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur">
              <div className="text-sm font-bold text-gray-900">
                Selected University: {selectedUniversity.name}
              </div>
              <div className="mt-1 text-sm text-gray-700">
                {selectedUniversity.city ? `${selectedUniversity.city}, ` : ""}
                {selectedUniversity.state ? `${selectedUniversity.state}, ` : ""}
                {selectedUniversity.country}
              </div>
              {selectedUniversity.programSummary ? (
                <div className="mt-1 text-sm text-gray-600">
                  {selectedUniversity.programSummary}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* FULL WIDTH BANNER */}
        <div className="relative z-10 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: HERO.banner }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,0.08), transparent 55%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4">
            <div className="py-8 pr-[72px] sm:pr-[96px]">
              <div className="text-left flex items-center justify-center sm:justify-start">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                    {selectedUniversity
                      ? `Assessment for ${selectedUniversity.name}`
                      : "Ready to submit your assessment?"}
                  </div>
                  <div className="mt-1 text-sm sm:text-base text-gray-800">
                    {selectedUniversity
                      ? `We already picked the country for you: ${selectedUniversity.country}.`
                      : "Complete the form below — we’ll contact you with next steps."}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: HERO.blue }}
                >
                  Go to Form ↓
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm border bg-white/20 hover:bg-white/25 transition active:scale-[0.98]"
                  style={{
                    borderColor: "rgba(0,0,0,0.18)",
                    color: HERO.ink,
                  }}
                >
                  Contact Us →
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="absolute right-0 top-0 h-full w-14 sm:w-20 flex items-center justify-center"
            style={{ backgroundColor: HERO.blue }}
            aria-label="Scroll down to form"
          >
            <div className="rotate-90 text-white font-bold tracking-widest text-xs sm:text-sm">
              Scroll Down
            </div>
          </button>
        </div>

        <div className="h-10" />
      </section>

      {/* LEVEL + INTAKE + DETAILS */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Level */}
          <div
            ref={levelRef}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div
                className="text-xs font-bold tracking-widest"
                style={{ color: BRAND.primary }}
              >
                LEVEL (Required)
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                Choose your level
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                This helps us guide you with the right expectations.
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
                  border:
                    level === "undergrad"
                      ? "1px solid transparent"
                      : "1px solid #D1D5DB",
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
                  border:
                    level === "postgrad"
                      ? "1px solid transparent"
                      : "1px solid #D1D5DB",
                }}
              >
                Postgraduate
              </button>
            </div>
          </div>

          {errors.level ? <div className={errorText}>{errors.level}</div> : null}

          {/* Intake */}
          <div
            ref={intakeRef}
            className="mt-6 rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div
              className="text-xs font-bold tracking-widest"
              style={{ color: BRAND.primary }}
            >
              INTAKE (Required)
            </div>
            <h3 className="mt-2 text-lg font-extrabold text-gray-900">
              When do you want to start?
            </h3>

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
                      border: active
                        ? "1px solid transparent"
                        : "1px solid #D1D5DB",
                    }}
                  >
                    {it}
                  </button>
                );
              })}
            </div>

            {errors.intake ? <div className={errorText}>{errors.intake}</div> : null}
          </div>

          {/* Level details */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-5">
              <div className="text-sm font-extrabold text-gray-900">
                {activeLevel.title}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {activeLevel.subtitle}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {activeLevel.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span
                      className="mt-1 h-2 w-2 rounded-full"
                      style={{ backgroundColor: BRAND.accent }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-extrabold text-gray-900">Next</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {selectedUniversity
                  ? "Fill in your details and choose one of the university programs below."
                  : "Fill in your details and submit. Documents are optional."}
              </p>

              <button
                type="button"
                onClick={scrollToForm}
                className="mt-4 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Go to Form ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section
        id="assessment-form"
        className="py-14"
        style={{ backgroundColor: "rgba(47,13,52,0.04)" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left short info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div
                  className="text-xs font-bold tracking-widest"
                  style={{ color: BRAND.primary }}
                >
                  QUICK NOTE
                </div>

                <div className="mt-3 text-sm text-gray-700 leading-relaxed">
                  Make sure your email and phone are correct. We will contact you
                  with the next steps.
                </div>

                <div className="mt-6 rounded-2xl bg-gray-50 p-4">
                  <div className="text-sm font-extrabold text-gray-900">
                    Your selection
                  </div>

                  <div className="mt-2 text-sm text-gray-700">
                    🎓 Level:{" "}
                    <span className="font-semibold">{activeLevel.title}</span>
                  </div>

                  <div className="mt-2 text-sm text-gray-700">
                    🗓️ Intake:{" "}
                    <span className="font-semibold">
                      {form.intake || "Not selected"}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-gray-700">
                    📎 Documents:{" "}
                    <span className="font-semibold">
                      {docs.length ? `${docs.length} file(s)` : "None"}
                    </span>
                  </div>

                  {selectedUniversity ? (
                    <>
                      <div className="mt-2 text-sm text-gray-700">
                        🏫 University:{" "}
                        <span className="font-semibold">
                          {selectedUniversity.name}
                        </span>
                      </div>

                      <div className="mt-2 text-sm text-gray-700">
                        🌍 Country:{" "}
                        <span className="font-semibold">
                          {selectedUniversity.country}
                        </span>
                      </div>

                      {(selectedUniversity.state || selectedUniversity.city) && (
                        <div className="mt-2 text-sm text-gray-700">
                          📍 Location:{" "}
                          <span className="font-semibold">
                            {selectedUniversity.city
                              ? `${selectedUniversity.city}, `
                              : ""}
                            {selectedUniversity.state || ""}
                          </span>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>

              {selectedUniversity ? (
                <>
                  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div
                      className="text-xs font-bold tracking-widest"
                      style={{ color: BRAND.primary }}
                    >
                      PROGRAMS OFFERED
                    </div>

                    <div className="mt-4 space-y-2">
                      {selectedUniversity.programsOffered?.length ? (
                        selectedUniversity.programsOffered.map((program) => (
                          <div
                            key={program}
                            className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700"
                          >
                            {program}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">
                          No programs listed for this university yet.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div
                      className="text-xs font-bold tracking-widest"
                      style={{ color: BRAND.primary }}
                    >
                      REQUIRED DOCUMENTS
                    </div>

                    <div className="mt-4 space-y-3">
                      {selectedUniversity.requiredDocuments?.length ? (
                        selectedUniversity.requiredDocuments.map((doc) => (
                          <div
                            key={doc}
                            className="flex gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700"
                          >
                            <span
                              className="mt-1 h-2 w-2 rounded-full"
                              style={{ backgroundColor: BRAND.accent }}
                            />
                            <span>{doc}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">
                          No document list added yet.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            {/* Right actual form */}
            <div className="lg:col-span-7">
              <form
                ref={formRef}
                onSubmit={submit}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div
                  className="text-xs font-bold tracking-widest"
                  style={{ color: BRAND.primary }}
                >
                  YOUR DETAILS
                </div>

                <div className="mt-6 grid gap-4">
                  {selectedUniversity ? (
                    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
                      <div className="text-xs font-bold text-yellow-800 uppercase tracking-widest">
                        Selected University
                      </div>
                      <div className="mt-2 text-lg font-extrabold text-gray-900">
                        {selectedUniversity.name}
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        {selectedUniversity.country}
                        {selectedUniversity.state ? ` • ${selectedUniversity.state}` : ""}
                        {selectedUniversity.city ? ` • ${selectedUniversity.city}` : ""}
                      </div>
                    </div>
                  ) : null}

                  <div>
                    <label className="text-xs font-bold text-gray-700">
                      Full Name
                    </label>
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
                      <label className="text-xs font-bold text-gray-700">
                        Email
                      </label>
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
                      <label className="text-xs font-bold text-gray-700">
                        Phone / WhatsApp
                      </label>
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
                    <label className="text-xs font-bold text-gray-700">
                      {selectedUniversity
                        ? "Preferred Program"
                        : "Preferred Faculty"}{" "}
                      <span className="text-red-600">*</span>
                    </label>

                    <select
                      name="faculty"
                      value={form.faculty}
                      onChange={onChange}
                      className={`${inputBase} bg-white ${
                        errors.faculty ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    >
                      <option value="">
                        {selectedUniversity
                          ? "Select program..."
                          : "Select faculty..."}
                      </option>

                      {programOptions.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>

                    {errors.faculty ? (
                      <div className={errorText}>{errors.faculty}</div>
                    ) : null}
                  </div>

                  {form.faculty === "Other" && (
                    <div>
                      <label className="text-xs font-bold text-gray-700">
                        Specify your{" "}
                        {selectedUniversity ? "program" : "faculty"}{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        name="otherFaculty"
                        value={form.otherFaculty}
                        onChange={onChange}
                        className={`${inputBase} ${
                          errors.faculty ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={
                          selectedUniversity
                            ? "Enter your preferred program"
                            : "e.g. Nursing, Data Science..."
                        }
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-gray-700">
                      Preferred Country <span className="text-red-600">*</span>
                    </label>

                    <input
                      name="country"
                      value={form.country}
                      onChange={onChange}
                      className={`${inputBase} ${
                        errors.country ? "border-red-500" : "border-gray-300"
                      } ${selectedUniversity ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      placeholder="Canada, USA, UK..."
                      required
                      readOnly={!!selectedUniversity}
                    />

                    {selectedUniversity ? (
                      <div className="mt-2 text-xs text-gray-500">
                        This country is auto-filled from the selected university.
                      </div>
                    ) : null}

                    {errors.country ? (
                      <div className={errorText}>{errors.country}</div>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700">
                      Extra Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={onChange}
                      rows={3}
                      className={`${inputBase} resize-none`}
                      placeholder="Budget, city preference, scholarship need, deadlines..."
                    />
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div
                          className="text-xs font-bold tracking-widest"
                          style={{ color: BRAND.primary }}
                        >
                          DOCUMENTS (Optional)
                        </div>

                        <div className="mt-1 text-sm font-extrabold text-gray-900">
                          Upload documents
                        </div>

                        <div className="mt-1 text-xs text-gray-600">
                          PDF, DOC, DOCX, JPG, PNG • Max {MAX_FILE_MB}MB each • Max{" "}
                          {MAX_TOTAL_MB}MB total
                        </div>

                        {selectedUniversity?.requiredDocuments?.length ? (
                          <div className="mt-2 text-xs text-gray-500">
                            Suggested uploads:{" "}
                            {selectedUniversity.requiredDocuments.slice(0, 3).join(", ")}
                            {selectedUniversity.requiredDocuments.length > 3 ? "..." : ""}
                          </div>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="shrink-0 rounded-xl px-4 py-2 text-xs font-bold text-white shadow transition active:scale-[0.98]"
                        style={{ backgroundColor: BRAND.primary }}
                      >
                        Browse
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={ACCEPT_ATTR}
                        className="hidden"
                        onChange={onPickFiles}
                      />
                    </div>

                    <div
                      onDragEnter={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDragOver(true);
                      }}
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
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDragOver(false);
                        addFiles(e.dataTransfer.files);
                      }}
                      className={[
                        "mt-4 rounded-2xl border-2 border-dashed p-4 transition",
                        dragOver
                          ? "bg-gray-50 border-gray-400"
                          : "bg-white border-gray-200",
                      ].join(" ")}
                    >
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          Drag & drop files here
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Or click <span className="font-semibold">Browse</span>
                        </div>
                      </div>
                    </div>

                    {docError ? (
                      <div className="mt-3 text-xs font-semibold text-red-600">
                        {docError}
                      </div>
                    ) : null}

                    <div className="mt-4">
                      {docs.length === 0 ? (
                        <div className="text-xs text-gray-500">
                          No files selected.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>
                              Selected:{" "}
                              <span className="font-semibold text-gray-900">
                                {docs.length}
                              </span>
                            </span>
                            <span>
                              Total:{" "}
                              <span className="font-semibold text-gray-900">
                                {prettySize(totalBytes)}
                              </span>
                            </span>
                          </div>

                          <ul className="space-y-2">
                            {docs.map((f, idx) => (
                              <li
                                key={`${f.name}-${f.size}-${f.lastModified}`}
                                className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-3 py-2 ring-1 ring-black/5"
                              >
                                <div className="min-w-0">
                                  <div className="truncate text-xs font-bold text-gray-900">
                                    {f.name}
                                  </div>
                                  <div className="text-[11px] text-gray-600">
                                    {prettySize(f.size)}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="rounded-lg px-3 py-1 text-[11px] font-bold text-gray-900 bg-white ring-1 ring-black/10 hover:bg-gray-100 transition active:scale-95"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                    style={{ backgroundColor: BRAND.primary }}
                  >
                    Submit Assessment
                  </button>

                  <div className="text-xs text-gray-500">
                    By submitting, you agree we may contact you for follow-up.
                  </div>
                </div>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                Prefer to talk first?{" "}
                <Link
                  to="/contact"
                  className="font-semibold underline decoration-gray-300 hover:decoration-gray-600"
                >
                  Contact us
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}