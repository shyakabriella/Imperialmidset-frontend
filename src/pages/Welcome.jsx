import React from "react";

const WORDS = [
  "Study Abroad",
  "Visa Support",
  "Culture Exchange",
  "Air ticketing",
  "English Proficiency",
  "Technical Coaching",
  "Internship Support",
  "Career Guidance",
];

// ✅ Always reserve space using the longest word (auto, future-proof)
const LONGEST_WORD = WORDS.reduce((a, b) => (a.length >= b.length ? a : b), "");

function useTypewriter(words, options = {}) {
  const {
    typeSpeed = 70,
    deleteSpeed = 45,
    pauseBeforeDelete = 900,
    pauseBeforeNext = 250,
  } = options;

  const [wordIndex, setWordIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState("typing");

  React.useEffect(() => {
    const currentWord = words[wordIndex];

    if (mode === "typing") {
      if (text.length < currentWord.length) {
        const t = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typeSpeed);
        return () => clearTimeout(t);
      }
      setMode("pausing");
      return;
    }

    if (mode === "pausing") {
      const t = setTimeout(() => setMode("deleting"), pauseBeforeDelete);
      return () => clearTimeout(t);
    }

    if (mode === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deleteSpeed);
        return () => clearTimeout(t);
      }

      const t = setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setMode("typing");
      }, pauseBeforeNext);

      return () => clearTimeout(t);
    }
  }, [text, mode, wordIndex, words, typeSpeed, deleteSpeed, pauseBeforeDelete, pauseBeforeNext]);

  return { text };
}

export default function Welcome() {
  const [show, setShow] = React.useState(false);

  const { text } = useTypewriter(WORDS, {
    typeSpeed: 70,
    deleteSpeed: 45,
    pauseBeforeDelete: 900,
    pauseBeforeNext: 250,
  });

  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-120px)] overflow-hidden">
      {/* BACKGROUND SPLIT (desktop only) */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="grid h-full grid-cols-2">
          <div className="bg-white" />
          <div className="bg-slate-900" />
        </div>
      </div>

      {/* BACKGROUND (mobile/tablet) */}
      <div className="absolute inset-0 lg:hidden bg-slate-900" />

      {/* CONTENT */}
      <div className="relative mx-auto max-w-7xl px-4 py-10">
        <div className="relative grid items-stretch gap-6 lg:grid-cols-2">
          {/* IMAGE (mobile: top, desktop: right) */}
          <div
            className={[
              "relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/10",
              "min-h-[320px] sm:min-h-[380px] lg:min-h-[560px]",
              "order-1 lg:order-2",
              "transform transition duration-700 ease-out",
              show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            ].join(" ")}
          >
            <img
              src="/well.png"
              alt="Global education"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* little glow */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          {/* CARD */}
          <div
            className={[
              "relative z-10",
              "order-2 lg:order-1",
              "lg:-mr-24 xl:-mr-32",
              "transform transition duration-700 ease-out",
              show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            ].join(" ")}
          >
            <div className="rounded-3xl bg-white/75 backdrop-blur-lg p-7 sm:p-10 shadow-xl ring-1 ring-black/5">
              {/* TITLE */}
              <h1
                className={[
                  "mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.05]",
                  "transform transition duration-700",
                  show ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
                ].join(" ")}
              >
                Build a Global Mindset{" "}
                <span className="hidden sm:inline">
                  <br />
                </span>
                and Unlock{" "}
                <span className="relative inline-flex items-baseline">
                  {/* ✅ FIX: typewriter pill reserves width using invisible longest word */}
                  <span className="ml-2 inline-flex items-baseline rounded-xl bg-gray-900 px-3 py-1 text-white shadow whitespace-nowrap leading-none">
                    <span className="relative inline-block align-baseline">
                      {/* reserve width (never wraps) */}
                      <span className="invisible whitespace-nowrap">{LONGEST_WORD}</span>

                      {/* actual typing text overlays, no layout shift */}
                      <span className="absolute left-0 top-0 whitespace-nowrap">
                        {text}
                      </span>
                    </span>

                    {/* cursor */}
                    <span className="ml-0.5 inline-block w-[2px] h-[1.1em] bg-white animate-pulse" />
                  </span>
                </span>
              </h1>

              {/* SUBTITLE */}
              <p
                className={[
                  "mt-5 sm:mt-6 max-w-xl text-base leading-relaxed text-gray-700",
                  "transform transition duration-700 delay-100",
                  show ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
                ].join(" ")}
              >
                We help students and professionals connect with the right universities,
                and global opportunities. We provide Study Abroad guidance, Visa Support, and Culture Exchange
                support, plus Air Ticketing to help you travel smoothly. We also offer English Proficiency preparation,
                Technical Coaching, Internship Support, and Career Guidance, step by step.
              </p>

              {/* QUICK STEPS */}
              <div
                className={[
                  "mt-6 grid gap-3 sm:grid-cols-3",
                  "transform transition duration-700 delay-150",
                  show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                ].join(" ")}
              >
                <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-bold text-gray-900">1) Register</div>
                  <div className="mt-1 text-xs text-gray-600">Create profile & goals</div>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-bold text-gray-900">2) Choose Service</div>
                  <div className="mt-1 text-xs text-gray-600">See price & requirements</div>
                </div>
                <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-black/5">
                  <div className="text-xs font-bold text-gray-900">3) Get Results</div>
                  <div className="mt-1 text-xs text-gray-600">Pay, meet, track progress</div>
                </div>
              </div>

              {/* Buttons */}
              <div
                className={[
                  "mt-7 sm:mt-8 flex flex-wrap gap-4",
                  "transform transition duration-700 delay-200",
                  show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                ].join(" ")}
              >
                <button className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98] hover:bg-gray-800 hover:-translate-y-0.5">
                  GET STARTED
                </button>

                <button className="rounded-xl border border-gray-300 bg-white/70 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition active:scale-[0.98] hover:bg-white hover:-translate-y-0.5">
                  BOOK A CONSULTATION
                </button>
              </div>

              {/* TRUST STRIP */}
              <div
                className={[
                  "mt-9 sm:mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-gray-600",
                  "transform transition duration-700 delay-300",
                  show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                ].join(" ")}
              >
                <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  Support for:
                </span>
                <span className="text-sm font-semibold">Undergraduate</span>
                <span className="text-sm font-semibold">Postgraduate</span>
                <span className="text-sm font-semibold">Visa</span>
                <span className="text-sm font-semibold">Air_ticket</span>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Get quotation by email • Transparent pricing • Appointment scheduling
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}