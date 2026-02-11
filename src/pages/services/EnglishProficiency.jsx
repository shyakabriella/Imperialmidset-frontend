import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ENGLISH_TEACHERS } from "../../data/englishTeachers";
import { addRegistration } from "../../utils/englishRegistrationStore";

const THEME = {
  primary: "#0B5FFF", // modern blue
  soft: "rgba(11,95,255,0.10)",
  dark: "#0B1B3A",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80";

const TESTS = [
  {
    key: "Duolingo",
    title: "Duolingo English Test (DET)",
    desc: "Fast, affordable, accepted by many universities. Best for online exam takers.",
    duration: "1–2 weeks prep",
    badge: "Online-first",
  },
  {
    key: "IELTS",
    title: "IELTS (Academic / General)",
    desc: "Worldwide recognized. Strong choice for visa, study, and work applications.",
    duration: "2–3 weeks prep",
    badge: "Global standard",
  },
];

const PLANS = [
  {
    key: "Standard",
    price: 300,
    bullets: ["Weekly study plan", "Practice materials", "2 mock tests"],
  },
  {
    key: "Premium",
    price: 300,
    bullets: ["Everything in Standard", "1:1 coaching", "More mock tests + feedback"],
  },
];

const PAYMENT_METHODS = [
  { key: "Mobile Money", note: "MTN MoMo / Airtel Money", icon: "📲" },
  { key: "Card", note: "Visa / MasterCard", icon: "💳" },
];

function Pill({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold"
      style={{ backgroundColor: THEME.soft, color: THEME.primary }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, sub }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs font-bold tracking-widest" style={{ color: THEME.primary }}>
        {kicker}
      </div>
      <h2 className="mt-3 text-3xl font-extrabold text-gray-900">{title}</h2>
      {sub ? <p className="mt-3 text-gray-600 leading-relaxed">{sub}</p> : null}
    </div>
  );
}

export default function EnglishProficiency() {
  const navigate = useNavigate();

  const [test, setTest] = React.useState("Duolingo");
  const [plan, setPlan] = React.useState("Standard");
  const [paymentMethod, setPaymentMethod] = React.useState("Mobile Money");

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    examDate: "",
    notes: "",
  });

  const [errors, setErrors] = React.useState({});
  const [submittedId, setSubmittedId] = React.useState("");

  const activePlan = PLANS.find((p) => p.key === plan);

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(11,95,255,0.20)]";

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.country.trim()) e.country = "Country is required.";
    if (!form.examDate) e.examDate = "Exam date is required.";
    if (!test) e.test = "Choose a test.";
    if (!plan) e.plan = "Choose a plan.";
    if (!paymentMethod) e.paymentMethod = "Choose a payment method.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const record = addRegistration({
      test,
      plan,
      amountUSD: activePlan?.price ?? 0,
      paymentMethod,
      ...form,
    });

    setSubmittedId(record.id);

    // After submit, you can send them to payment page later.
    // For now, keep it clear:
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDashboard = (role) => {
    // simple role param (teacher/admin)
    navigate(`/services/english-tests/dashboard?role=${role}`);
  };

  return (
    <div className="bg-white relative">
      {/* soft top background */}
      <div
        className="absolute left-0 right-0 top-0 -z-10 h-[620px]"
        style={{
          background:
            "radial-gradient(900px 360px at 20% 10%, rgba(11,95,255,0.16) 0%, transparent 60%), radial-gradient(900px 360px at 80% 0%, rgba(11,95,255,0.10) 0%, transparent 55%)",
        }}
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-700">Services</span> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">English Proficiency</span>
        </div>
      </div>

      {/* Success banner */}
      {submittedId ? (
        <div className="mx-auto max-w-7xl px-4 mt-6">
          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
            <div className="text-sm font-extrabold text-blue-900">✅ Registration received!</div>
            <div className="mt-1 text-sm text-blue-900/80">
              Your reference: <span className="font-bold">{submittedId}</span> • Status: <span className="font-semibold">Pending Payment</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                onClick={() => openDashboard("teacher")}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow active:scale-[0.98]"
                style={{ backgroundColor: THEME.primary }}
              >
                Teacher view 
              </button>
              <button
                onClick={() => openDashboard("admin")}
                className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 active:scale-[0.98]"
                style={{ borderColor: "rgba(11,95,255,0.25)", color: THEME.primary }}
              >
                Admin view 
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
              <Pill>English Proficiency</Pill>
              <Pill>Duolingo + IELTS</Pill>
              <Pill>Prep + Coaching</Pill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Prepare for international English tests with a clear plan 
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Register for test preparation, choose your exam date, and pay securely via Mobile Money or Card.
              Our teachers guide you step-by-step with practice, feedback, and mock tests.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow active:scale-[0.98]"
                style={{ backgroundColor: THEME.primary }}
              >
                Register Now ✍️
              </button>

              <button
                onClick={() => document.getElementById("teachers")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50 active:scale-[0.98]"
                style={{ borderColor: "rgba(11,95,255,0.25)", color: THEME.primary }}
              >
                Meet Teachers 
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Tests", value: "DET + IELTS" },
                { label: "Mode", value: "Online / In-person" },
                { label: "Support", value: "Mock + Feedback" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold tracking-widest text-gray-500">{s.label}</div>
                  <div className="mt-2 text-xl font-extrabold text-gray-900">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <img src={HERO_IMG} alt="English learning" className="h-[420px] w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.00) 10%, rgba(0,0,0,0.25) 90%)" }}
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur p-4 shadow ring-1 ring-black/5">
                <div className="text-sm font-extrabold text-gray-900">What you get </div>
                <div className="mt-1 text-xs text-gray-600">
                  Study plan • Mock tests • Speaking & writing feedback • Exam strategy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTS */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <SectionTitle
          kicker="CHOOSE TEST"
          title="Duolingo or IELTS — pick what your university accepts "
          sub="Select a test and we tailor your preparation content and practice sessions."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {TESTS.map((t) => {
            const active = test === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTest(t.key)}
                className="text-left rounded-3xl border bg-white p-6 shadow-sm hover:shadow-md transition"
                style={{
                  borderColor: active ? "rgba(11,95,255,0.45)" : "rgba(0,0,0,0.10)",
                  boxShadow: active ? "0 10px 30px rgba(11,95,255,0.10)" : undefined,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-lg font-extrabold text-gray-900">{t.title}</div>
                  <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ backgroundColor: THEME.soft, color: THEME.primary }}>
                    {t.badge}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">{t.desc}</div>
                <div className="mt-4 text-xs text-gray-500">Recommended: <span className="font-semibold">{t.duration}</span></div>
              </button>
            );
          })}
        </div>
      </section>

      {/* PLANS */}
      <section className="py-14" style={{ backgroundColor: "rgba(11,95,255,0.04)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            kicker="PREP PLANS"
            title="Choose a preparation plan"
            sub="Simple pricing and clear support. (You can change later.)"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PLANS.map((p) => {
              const active = plan === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setPlan(p.key)}
                  className="text-left rounded-3xl border bg-white p-6 shadow-sm hover:shadow-md transition"
                  style={{
                    borderColor: active ? "rgba(11,95,255,0.45)" : "rgba(0,0,0,0.10)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-extrabold text-gray-900">{p.key}</div>
                    <div className="text-2xl font-extrabold" style={{ color: THEME.primary }}>
                      ${p.price}
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: THEME.primary }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle
          kicker="TEACHERS"
          title="Meet your instructors"
          sub="Experienced coaches focused on results, practice, and confidence."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(ENGLISH_TEACHERS || []).map((t) => (
            <div key={t.id} className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-48 overflow-hidden">
                <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="text-lg font-extrabold text-gray-900">{t.name}</div>
                <div className="mt-1 text-sm text-gray-600">{t.title}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(t.languages || []).map((l) => (
                    <span key={l} className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ backgroundColor: THEME.soft, color: THEME.primary }}>
                      {l}
                    </span>
                  ))}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {(t.highlights || []).map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: THEME.primary }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTER FORM */}
      <section id="register" className="mx-auto max-w-7xl px-4 pb-14">
        <SectionTitle
          kicker="REGISTER"
          title="Register for test preparation "
          sub="Choose exam date + payment method. Teacher/Admin can view your registration."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* left info */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">Your selection ✅</div>
              <div className="mt-3 text-sm text-gray-700">
                Test: <span className="font-semibold">{test}</span>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                Plan: <span className="font-semibold">{plan}</span>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                Amount: <span className="font-semibold">${activePlan?.price ?? 0}</span>
              </div>

              <div className="mt-5 text-xs text-gray-500">
                Payment status will show as <b>Pending Payment</b> until you integrate real payment APIs.
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => openDashboard("teacher")}
                  className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 active:scale-[0.98]"
                  style={{ borderColor: "rgba(11,95,255,0.25)", color: THEME.primary }}
                >
                  Teacher dashboard 
                </button>
                <button
                  onClick={() => openDashboard("admin")}
                  className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 active:scale-[0.98]"
                  style={{ borderColor: "rgba(11,95,255,0.25)", color: THEME.primary }}
                >
                  Admin dashboard 
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">Payment methods 💳</div>
              <div className="mt-3 grid gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setPaymentMethod(m.key)}
                    className="text-left rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
                    style={{
                      borderColor: paymentMethod === m.key ? "rgba(11,95,255,0.45)" : "rgba(0,0,0,0.10)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-gray-900">{m.icon} {m.key}</div>
                      {paymentMethod === m.key ? (
                        <span className="text-xs font-bold" style={{ color: THEME.primary }}>Selected</span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">{m.note}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* form */}
          <form onSubmit={submit} className="lg:col-span-7 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-700">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={onChange} className={inputBase} placeholder="Your full name" />
                {errors.fullName ? <div className="mt-1 text-xs text-red-600">{errors.fullName}</div> : null}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Email *</label>
                <input type="email" name="email" value={form.email} onChange={onChange} className={inputBase} placeholder="you@email.com" />
                {errors.email ? <div className="mt-1 text-xs text-red-600">{errors.email}</div> : null}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Phone / WhatsApp *</label>
                <input name="phone" value={form.phone} onChange={onChange} className={inputBase} placeholder="+250 ..." />
                {errors.phone ? <div className="mt-1 text-xs text-red-600">{errors.phone}</div> : null}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Country *</label>
                <input name="country" value={form.country} onChange={onChange} className={inputBase} placeholder="Rwanda, Kenya, ..." />
                {errors.country ? <div className="mt-1 text-xs text-red-600">{errors.country}</div> : null}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Exam Date *</label>
                <input type="date" name="examDate" value={form.examDate} onChange={onChange} className={inputBase} />
                {errors.examDate ? <div className="mt-1 text-xs text-red-600">{errors.examDate}</div> : null}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-700">Notes (optional)</label>
                <textarea
                  rows={4}
                  name="notes"
                  value={form.notes}
                  onChange={onChange}
                  className={inputBase}
                  placeholder="Example: target score, timeline, weak areas (speaking/writing)..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-xl px-6 py-3 text-sm font-semibold text-white shadow active:scale-[0.98]"
              style={{ backgroundColor: THEME.primary }}
            >
              Register & Continue to Payment 
            </button>

            {/* <div className="mt-3 text-xs text-gray-500">
              After registration, you can connect real payment APIs (MoMo/Card) to mark payment status as <b>Paid</b>.
            </div> */}
          </form>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="text-xs font-bold tracking-widest" style={{ color: THEME.primary }}>
                READY TO IMPROVE?
              </div>
              <div className="mt-2 text-2xl font-extrabold text-gray-900">
                Start your English preparation today 
              </div>
              <div className="mt-2 text-gray-600">
                Register above and choose your test — our teachers will guide you to results.
              </div>
            </div>

            <button
              onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow active:scale-[0.98]"
              style={{ backgroundColor: THEME.primary }}
            >
              Go to Registration 
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
