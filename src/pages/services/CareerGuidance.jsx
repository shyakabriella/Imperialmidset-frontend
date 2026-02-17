import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveCareerRequest } from "../../utils/careerStorage";

const BRAND = { primary: "#2F0D34", accent: "#BD9F75" };

const HERO_BG =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80";

const PATHWAYS = [
  {
    key: "tech",
    label: "Tech & IT",
    roles: ["Frontend Developer", "Backend Developer", "Network Engineer", "Data Analyst"],
    skills: ["Portfolio projects", "Git & teamwork", "System design basics", "Soft skills"],
  },
  {
    key: "business",
    label: "Business",
    roles: ["Business Analyst", "Project Coordinator", "Sales & Marketing", "Operations Assistant"],
    skills: ["Professional communication", "Excel & reporting", "Presentation", "Customer skills"],
  },
  {
    key: "health",
    label: "Health",
    roles: ["Public Health", "Healthcare Admin", "Research Assistant", "Community Programs"],
    skills: ["Documentation", "Ethics", "Research writing", "Community engagement"],
  },
  {
    key: "aviation",
    label: "Aviation",
    roles: ["Aviation Management", "Airport Operations", "Cabin Crew Prep", "Piloting Pathway (Guide)"],
    skills: ["Discipline & standards", "Communication", "Planning", "Confidence & readiness"],
  },
];

function Pill({ children, tone = "soft" }) {
  const style =
    tone === "soft"
      ? { backgroundColor: "rgba(47,13,52,0.08)", color: BRAND.primary }
      : { backgroundColor: "rgba(189,159,117,0.22)", color: BRAND.primary };
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold" style={style}>
      {children}
    </span>
  );
}

function genRef() {
  return `CG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export default function CareerGuidance() {
  const navigate = useNavigate();

  const [pathKey, setPathKey] = React.useState("tech");
  const activePath = PATHWAYS.find((p) => p.key === pathKey);

  const [submittedRef, setSubmittedRef] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    currentStatus: "",
    field: "",
    targetRole: "",
    timeline: "",
    meetingType: "Online",
    notes: "",
  });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.currentStatus.trim()) e.currentStatus = "Current status is required.";
    if (!form.field.trim()) e.field = "Field/Background is required.";
    if (!form.targetRole.trim()) e.targetRole = "Target role is required.";
    if (!form.timeline.trim()) e.timeline = "Timeline is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const ref = genRef();

    const record = {
      id: ref,
      createdAt: new Date().toISOString(),
      status: "New", // ✅ default status
      ...form,
      pathway: pathKey,
    };

    saveCareerRequest(record);

    setSubmittedRef(ref);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  return (
    <div className="bg-white relative">
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[680px]"
        style={{
          background:
            "radial-gradient(900px 380px at 15% 5%, rgba(189,159,117,0.22) 0%, transparent 60%), radial-gradient(900px 380px at 85% 0%, rgba(47,13,52,0.10) 0%, transparent 55%)",
        }}
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-700">Services</span> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Career Guidance</span>
        </div>
      </div>

      {/* Success */}
      {submittedRef ? (
        <div className="mx-auto max-w-7xl px-4 mt-6">
          <div className="rounded-3xl border border-green-200 bg-green-50 p-5">
            <div className="text-sm font-extrabold text-green-900">✅ Request received!</div>
            <div className="mt-1 text-sm text-green-900/80">
              Reference ID: <span className="font-bold">{submittedRef}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  navigate(`/services/Career/book-meeting?ref=${encodeURIComponent(submittedRef)}`)
                }
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Book a Meeting Now 
              </button>

              <button
                onClick={() => document.getElementById("assessment")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50 transition"
                style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
              >
                Edit / Submit Another
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-2">
              <Pill>Career Guidance</Pill>
              <Pill tone="gold">Professional CV</Pill>
              <Pill>Interview Coaching</Pill>
              <Pill tone="gold">Job Strategy</Pill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Build a clear career path — and move with confidence 
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We help students and professionals choose the right direction, prepare strong documents,
              practice interviews, and apply strategically — step by step.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("assessment")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Get Free Assessment 
              </button>

              <button
                onClick={() => navigate(`/services/Career/book-meeting`)}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50 transition"
                style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
              >
                Book a Meeting 
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <img src={HERO_BG} alt="Career guidance" className="h-[420px] w-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.25) 90%)" }} />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur p-4 shadow ring-1 ring-black/5">
                <div className="text-sm font-extrabold text-gray-900">What we improve </div>
                <div className="mt-1 text-xs text-gray-600">
                  CV • LinkedIn • Interview skills • Career direction • Job applications
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
              CAREER PATHWAYS
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Pick a direction </h2>
            <p className="mt-3 text-gray-600">This helps us recommend roles and skills faster.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                {PATHWAYS.map((p) => {
                  const active = p.key === pathKey;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setPathKey(p.key)}
                      className="w-full text-left rounded-2xl px-4 py-3 transition"
                      style={{ backgroundColor: active ? "rgba(47,13,52,0.08)" : "transparent" }}
                    >
                      <div className="font-extrabold text-gray-900">{p.label}</div>
                      <div className="text-xs text-gray-500">Roles + skills roadmap</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
                  SELECTED PATHWAY
                </div>
                <h3 className="mt-2 text-2xl font-extrabold text-gray-900">{activePath?.label}</h3>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <div className="text-sm font-extrabold text-gray-900">Recommended roles</div>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      {(activePath?.roles || []).map((r) => (
                        <li key={r} className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">
                    <div className="text-sm font-extrabold text-gray-900">Key skills we build</div>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      {(activePath?.skills || []).map((r) => (
                        <li key={r} className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.primary }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById("assessment")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-6 w-full rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Start my career plan 
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="assessment" className="py-14" style={{ backgroundColor: "rgba(189,159,117,0.10)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="text-xs font-bold tracking-widest" style={{ color: BRAND.primary }}>
                FREE CAREER ASSESSMENT
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Tell us your goal </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Submit your details and we’ll guide your next steps (direction, CV, skills, interviews, job strategy).
              </p>
            </div>

            <form onSubmit={submit} className="lg:col-span-7 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Full Name *</label>
                  <input name="fullName" value={form.fullName} onChange={onChange} className={inputBase} />
                  {errors.fullName ? <div className="mt-1 text-xs text-red-600">{errors.fullName}</div> : null}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} className={inputBase} />
                  {errors.email ? <div className="mt-1 text-xs text-red-600">{errors.email}</div> : null}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Phone / WhatsApp *</label>
                  <input name="phone" value={form.phone} onChange={onChange} className={inputBase} />
                  {errors.phone ? <div className="mt-1 text-xs text-red-600">{errors.phone}</div> : null}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Current Status *</label>
                  <select name="currentStatus" value={form.currentStatus} onChange={onChange} className={`${inputBase} bg-white`}>
                    <option value="">Select...</option>
                    <option value="Student">Student</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Professional">Professional</option>
                    <option value="Career Switcher">Career Switcher</option>
                  </select>
                  {errors.currentStatus ? <div className="mt-1 text-xs text-red-600">{errors.currentStatus}</div> : null}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Field / Background *</label>
                  <input name="field" value={form.field} onChange={onChange} className={inputBase} />
                  {errors.field ? <div className="mt-1 text-xs text-red-600">{errors.field}</div> : null}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Target Role / Goal *</label>
                  <input name="targetRole" value={form.targetRole} onChange={onChange} className={inputBase} />
                  {errors.targetRole ? <div className="mt-1 text-xs text-red-600">{errors.targetRole}</div> : null}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Timeline *</label>
                  <select name="timeline" value={form.timeline} onChange={onChange} className={`${inputBase} bg-white`}>
                    <option value="">Select...</option>
                    <option value="Urgent (1–2 weeks)">Urgent (1–2 weeks)</option>
                    <option value="1 month">1 month</option>
                    <option value="2–3 months">2–3 months</option>
                    <option value="3–6 months">3–6 months</option>
                  </select>
                  {errors.timeline ? <div className="mt-1 text-xs text-red-600">{errors.timeline}</div> : null}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Preferred Meeting</label>
                  <select name="meetingType" value={form.meetingType} onChange={onChange} className={`${inputBase} bg-white`}>
                    <option value="Online">Online</option>
                    <option value="In-person">In-person</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700">Notes (optional)</label>
                  <textarea name="notes" rows={4} value={form.notes} onChange={onChange} className={inputBase} />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Submit Assessment 
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
