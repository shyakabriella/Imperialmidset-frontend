import React from "react";
import { Link } from "react-router-dom";

function useInView(options = { threshold: 0.1 }) {
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

export default function Footer() {
  const { ref, inView } = useInView();

  return (
    <footer
      ref={ref}
      className="bg-slate-950 text-slate-200 border-t border-white/10 overflow-x-hidden"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* TRUSTED BY */}
        <div
          className={[
            "py-12 text-center transition-all duration-700 ease-out transform-gpu",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Trusted by students worldwide
          </h3>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-white/60 px-2">
            <span className="text-lg font-semibold">University Partners</span>
            <span className="text-lg font-semibold">Academic Loan</span>
            <span className="text-lg font-semibold">Visa Guidance</span>
            <span className="text-lg font-semibold">Global Network</span>
            <span className="text-lg font-semibold">Student Community</span>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* MAIN FOOTER GRID */}
        <div
          className={[
            "py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ease-out transform-gpu",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          ].join(" ")}
          style={{ transitionDelay: "120ms" }}
        >
          {/* Company */}
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300 break-words">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition">
                  Partner Universities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white">Programs</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300 break-words">
              <li>
                <Link to="/programs/bachelor" className="hover:text-white transition">
                  Undergraduate
                </Link>
              </li>
              <li>
                <Link to="/programs/masters" className="hover:text-white transition">
                  Postgraduate / Masters, PhD
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-white transition">
                  Academic Loan
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white">Legal</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300 break-words">
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white">Subscribe</h4>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Get updates about new Academic Loans, application deadlines, and upcoming info sessions.
            </p>

            {/* ✅ FIXED: prevent flex overflow */}
            <div className="mt-5 flex items-center gap-3 min-w-0">
              <input
                type="email"
                placeholder="Your Email"
                className="min-w-0 flex-1 rounded-xl bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="shrink-0 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow hover:bg-slate-100 transition active:scale-[0.98]">
                SUBMIT
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              By subscribing, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-white transition">
                Terms & Conditions
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* BOTTOM */}
        <div className="py-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} International Mindset PathWays. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
