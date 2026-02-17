import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
  primary: "#2F0D34",
  accent: "#BD9F75",
};

/** Local images (optional). Put in public/tech/ */
const IMAGES = {
  hero: "/tech/hero..jpg",
  section: "/tech/cyber-2.jpg",
  training: "/tech/training-4.jpg",
  services: "/tech/cyber-2.jpg",
};

const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stop-color="#0f172a"/>
        <stop offset="1" stop-color="#111827"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial" font-size="34" fill="#e5e7eb">
      Technical Support
    </text>
  </svg>
`);

const TECH_SUPPORT_SERVICES = [
  {
    title: "Website Development (React / Next.js)",
    desc: "Build pages, fix layouts, make mobile responsive, improve UI, and connect components to routes.",
    tags: ["React", "Next.js", "Tailwind", "Routing", "UI Fixes"],
  },
  {
    title: "Bug Fixing & Debugging",
    desc: "We fix errors, crashes, blank screens, broken builds, and unexpected behavior in your project.",
    tags: ["Debug", "Console Errors", "Build Fix", "Refactor"],
  },
  {
    title: "Backend & API Support",
    desc: "Create or fix APIs, authentication flows, forms, validations, and database connections.",
    tags: ["Node", "Laravel", "REST API", "Auth", "Validation"],
  },
  {
    title: "Database & Server Setup",
    desc: "Help with MySQL setup, migrations, foreign key errors, server issues, and database structure.",
    tags: ["MySQL", "Migrations", "Foreign Keys", "Optimization"],
  },
  {
    title: "Deployment & DevOps",
    desc: "Deploy to VPS, fix Nginx issues, SSL setup, domain setup, and performance tuning.",
    tags: ["VPS", "Nginx", "SSL", "Linux", "Performance"],
  },
  {
    title: "Technical Coaching (Project Support)",
    desc: "Mentorship for projects, portfolio building, Git/GitHub workflow, and interview preparation.",
    tags: ["Mentorship", "GitHub", "Portfolio", "Best Practices"],
  },
];

const CODING_TRAINING = [
  {
    title: "Frontend Training (HTML • CSS • JS • React)",
    desc: "Build real responsive UIs, learn components, state, routing, and best practices.",
    topics: ["HTML/CSS", "JavaScript", "React", "Routing", "Tailwind"],
  },
  {
    title: "Backend Training (APIs • Auth • Databases)",
    desc: "Learn how backend works: APIs, authentication, validation, and database CRUD.",
    topics: ["REST APIs", "Auth", "Validation", "MySQL", "Laravel/Node"],
  },
  {
    title: "Full-Stack Training (Build complete apps)",
    desc: "Combine frontend + backend, connect forms, dashboards, and deploy your app online.",
    topics: ["Full-stack app", "Forms", "Dashboards", "Deployment", "Testing"],
  },
  {
    title: "DevOps Basics (Deploy & maintain)",
    desc: "Learn how to deploy projects on VPS, configure Nginx, SSL, and basic monitoring.",
    topics: ["Linux", "Nginx", "SSL", "Domains", "Monitoring"],
  },
];

const TOP_IT_SERVICES_TO_SELL = [
  {
    title: "Managed Services (MSP)",
    desc: "Proactive support with help desk, 24/7 monitoring, updates, and maintenance.",
    includes: ["Help Desk", "24/7 Monitoring", "Patch Updates", "Device Management", "Reporting"],
  },
  {
    title: "Cybersecurity Solutions",
    desc: "Protect business data with threat detection, security consulting, and best practices.",
    includes: ["Risk Assessment", "Threat Detection", "Security Policies", "Backup Strategy", "Training"],
  },
  {
    title: "Cloud & Infrastructure",
    desc: "Cloud migration, setup, and management, plus modern infrastructure for reliability.",
    includes: ["Cloud Migration", "Server Setup", "Email/Domain", "Networking", "Infrastructure Support"],
  },
  {
    title: "AI & Data Services",
    desc: "Implement AI-native platforms, data processing pipelines, and business analytics.",
    includes: ["AI Integration", "Dashboards", "Data Cleaning", "Automation", "Insights/Reports"],
  },
  {
    title: "Software & Web Development",
    desc: "Custom applications, websites, eCommerce solutions, and internal business systems.",
    includes: ["Web Apps", "Mobile-ready UI", "eCommerce", "APIs", "Admin Dashboards"],
  },
  {
    title: "Consulting & Staffing",
    desc: "IT project management, network consulting, and temporary staffing for fast delivery.",
    includes: ["IT Consulting", "Project Mgmt", "Network Setup", "Short-term Staffing", "Support Plans"],
  },
];

const PROCESS = [
  {
    title: "Share your issue or goal",
    desc: "Tell us what you want to build or what is failing. Upload screenshots/logs if you have them.",
  },
  {
    title: "Quick review & plan",
    desc: "We review your request and propose the best approach + estimated effort.",
  },
  {
    title: "Implementation / Fix / Training",
    desc: "We solve the issue or train you step-by-step with real tasks and best practices.",
  },
  {
    title: "Testing & handover",
    desc: "We test with you, explain what was done, and share clear next steps.",
  },
  {
    title: "Support after delivery",
    desc: "We can continue with improvements, deployment, or follow-up coaching.",
  },
];

const FAQS = [
  {
    q: "Do you provide both support and training?",
    a: "Yes. We can fix your project quickly OR coach you so you learn how to fix and build confidently.",
  },
  {
    q: "Can you help with React + routing + UI fixes?",
    a: "Yes. We handle responsive UI, dropdown routing, linking sections to pages, and page creation.",
  },
  {
    q: "Do you work on VPS/Nginx/SSL issues?",
    a: "Yes. We support deployment, Nginx config, SSL installation, and common server errors.",
  },
  {
    q: "Do you offer business IT services (MSP, cybersecurity, cloud)?",
    a: "Yes. We provide ongoing managed services, security support, cloud setup, and consulting.",
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

function TagPill({ children }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[11px] font-bold"
      style={{ backgroundColor: "rgba(189,159,117,0.18)", color: BRAND.primary }}
    >
      {children}
    </span>
  );
}

function Card({ title, desc, children }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-base font-extrabold text-gray-900">{title}</div>
      {desc ? <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p> : null}
      {children}
    </div>
  );
}

function Step({ idx, title, desc }) {
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

export default function TechnicalSupport() {
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const techRef = React.useRef(null);
  const trainingRef = React.useRef(null);
  const itServicesRef = React.useRef(null);
  const formRef = React.useRef(null);

  const [faqOpen, setFaqOpen] = React.useState(0);

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    techStack: "",
    urgency: "Normal",
    message: "",
  });

  const [files, setFiles] = React.useState([]);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onFiles = (e) => setFiles(Array.from(e.target.files || []));

  const scrollTo = (r) => setTimeout(() => r?.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    };

    console.log("Technical Support Request:", payload);
    alert("✅ Thanks! We received your request. We will contact you soon.");
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(47,13,52,0.18)]";

  return (
    <div className="bg-white relative">
      {/* soft top background */}
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
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <span className="text-gray-700">Services</span> <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">Technical Support</span>
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
              <SoftPill>Technical Support</SoftPill>
              <SoftPill>Coding Training</SoftPill>
              <SoftPill>IT Services</SoftPill>
              <SoftPill>Online Help</SoftPill>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Support + Training + Business IT Services 
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
              We fix your software issues, train you to code confidently, and deliver top IT services
              businesses can buy: Managed Services, Cybersecurity, Cloud, AI/Data, Software Development, and Consulting.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo(formRef)}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Request Support / Training
              </button>

              <button
                type="button"
                onClick={() => scrollTo(techRef)}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: BRAND.accent, color: BRAND.primary }}
              >
                Technical Support Services
              </button>

              <button
                type="button"
                onClick={() => scrollTo(trainingRef)}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
              >
                Coding Training
              </button>

              <button
                type="button"
                onClick={() => scrollTo(itServicesRef)}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
              >
                Business IT Services
              </button>

              <button
                type="button"
                onClick={() => navigate("/how-it-works/appointments")}
                className="rounded-xl border bg-white px-6 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98]"
                style={{ borderColor: "rgba(47,13,52,0.22)", color: BRAND.primary }}
              >
                Book Appointment
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: "Support", v: "Fix fast" },
                { k: "Training", v: "Learn deeply" },
                { k: "IT Services", v: "Sell & deliver" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold tracking-widest text-gray-500">{x.k}</div>
                  <div className="mt-2 text-xl font-extrabold text-gray-900">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div
            className={[
              "lg:col-span-5 transition-all duration-700 ease-out",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
              <img
                src={IMAGES.hero}
                alt="Technical Support"
                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                className="h-[360px] w-full object-cover"
              />
            </div>

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">We cover</div>
              <div className="mt-1 text-sm text-gray-600">
                Web Dev • Debugging • APIs • Databases • Deployment • Coding Training • IT Services
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH SUPPORT SERVICES */}
      <section ref={techRef} className="mx-auto max-w-7xl px-4 pb-14">
        <div className="text-center">
          <Kicker>TECHNICAL SUPPORT</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Technical support services</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            From quick fixes to full builds — we support your project and help you ship.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_SUPPORT_SERVICES.map((s) => (
            <Card key={s.title} title={s.title} desc={s.desc}>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollTo(formRef)}
                className="mt-5 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-900 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
              >
                Request Support
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* CODING TRAINING */}
      <section ref={trainingRef} className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
                <img
                  src={IMAGES.training}
                  alt="Coding Training"
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <Kicker>CODING TRAINING</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Coding training (hands-on)</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Training is practical. You will build real features (forms, routing, dashboards, auth, deployment).
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {CODING_TRAINING.map((t) => (
                  <Card key={t.title} title={t.title} desc={t.desc}>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.topics.map((x) => (
                        <TagPill key={x}>{x}</TagPill>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollTo(formRef)}
                      className="mt-5 inline-flex items-center rounded-xl px-4 py-2 text-xs font-bold text-white shadow transition active:scale-[0.98]"
                      style={{ backgroundColor: BRAND.primary }}
                    >
                      Join Training
                    </button>
                  </Card>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-extrabold text-gray-900">Training style</div>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {[
                    "Weekly plan + real tasks",
                    "Code review & best practices",
                    "Build portfolio projects",
                    "Help you deploy and present your work",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => navigate("/how-it-works/appointments")}
                className="mt-6 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Book Training Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TOP IT SERVICES TO SELL */}
      <section ref={itServicesRef} className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <Kicker>BUSINESS IT SERVICES</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Top IT Services to Sell</h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            These are high-demand services businesses buy. You can offer them as monthly packages or project-based.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOP_IT_SERVICES_TO_SELL.map((s) => (
            <Card key={s.title} title={s.title} desc={s.desc}>
              <div className="mt-4 text-xs font-bold tracking-widest text-gray-500">WHAT IT INCLUDES</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => scrollTo(formRef)}
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  Request Quote
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/how-it-works/appointments")}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(47,13,52,0.25)", color: BRAND.primary }}
                >
                  Talk to Us
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10">
                <img
                  src={IMAGES.section}
                  alt="Process"
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <Kicker>PROCESS</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">How it works</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Simple workflow so you always know what happens next.
              </p>

              <div className="mt-8 grid gap-5">
                {PROCESS.map((p, idx) => (
                  <Step key={p.title} idx={idx + 1} title={p.title} desc={p.desc} />
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollTo(formRef)}
                className="mt-8 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.primary }}
              >
                Start Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <Kicker>FAQ</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Common questions</h2>
        </div>

        <div className="mt-8 mx-auto max-w-3xl space-y-3">
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
      </section>

      {/* FORM */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left note */}
            <div>
              <Kicker>REQUEST</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Tell us what you need</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Choose support, training, or IT services. Upload screenshots/logs or documents if needed.
              </p>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-extrabold text-gray-900">You can upload</div>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {["Screenshots of errors", "Console logs (text file)", "PDF requirements", "Zip file (small)"].map(
                    (t) => (
                      <li key={t} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.accent }} />
                        {t}
                      </li>
                    )
                  )}
                </ul>

                <div className="mt-4 text-xs text-gray-500">
                  Note: This UI collects files in the browser. To store files on your server, connect to a backend API.
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
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700">Service Type</label>
                    <select
                      name="serviceType"
                      value={form.serviceType}
                      onChange={onChange}
                      className={`${inputBase} bg-white`}
                      required
                    >
                      <option value="">Select...</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Coding Training">Coding Training</option>

                      <option value="Managed Services (MSP)">Managed Services (MSP)</option>
                      <option value="Cybersecurity Solutions">Cybersecurity Solutions</option>
                      <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                      <option value="AI & Data Services">AI & Data Services</option>
                      <option value="Software & Web Development">Software & Web Development</option>
                      <option value="Consulting & Staffing">Consulting & Staffing</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700">Urgency</label>
                    <select
                      name="urgency"
                      value={form.urgency}
                      onChange={onChange}
                      className={`${inputBase} bg-white`}
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Tech Stack (optional)</label>
                  <input
                    name="techStack"
                    value={form.techStack}
                    onChange={onChange}
                    className={inputBase}
                    placeholder="React, Next.js, Laravel, MySQL, Tailwind..."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Describe your request</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={4}
                    className={inputBase}
                    placeholder="Explain what is broken OR what you want to learn/build..."
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Upload files (optional)</label>
                  <input
                    type="file"
                    multiple
                    onChange={onFiles}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
                    accept=".png,.jpg,.jpeg,.pdf,.txt,.zip"
                  />

                  {files.length > 0 ? (
                    <div className="mt-3 rounded-2xl bg-gray-50 p-4 text-xs text-gray-700">
                      <div className="font-bold text-gray-800">Selected files:</div>
                      <ul className="mt-2 space-y-1">
                        {files.map((f) => (
                          <li key={f.name} className="flex justify-between gap-3">
                            <span className="truncate">{f.name}</span>
                            <span className="shrink-0 text-gray-500">{(f.size / 1024).toFixed(0)} KB</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
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
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}