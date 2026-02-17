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

          {/* ✅ Link the “trusted by” items to related services */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-white/60 px-2">
            <Link
              to="/services/study-abroad/university"
              className="text-lg font-semibold hover:text-white transition"
            >
              University Partners
            </Link>

            {/* No loan route yet → send to contact */}
            <Link
              to="/contact"
              className="text-lg font-semibold hover:text-white transition"
            >
              Academic Loan
            </Link>

            <Link
              to="/services/Visa"
              className="text-lg font-semibold hover:text-white transition"
            >
              Visa Guidance
            </Link>

            {/* No networking route yet → send to contact */}
            <Link
              to="/contact"
              className="text-lg font-semibold hover:text-white transition"
            >
              Global Network
            </Link>

            <Link
              to="/services/Culture_exchange"
              className="text-lg font-semibold hover:text-white transition"
            >
              Student Community
            </Link>
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

              {/* You don’t have /services route in AppRoutes → use the real service page */}
              <li>
                <Link
                  to="/services/study-abroad/university"
                  className="hover:text-white transition"
                >
                  Services
                </Link>
              </li>

              {/* No /partners route yet → send to study-abroad page or contact */}
              <li>
                <Link
                  to="/services/study-abroad/university"
                  className="hover:text-white transition"
                >
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
              {/* No /programs/bachelor route → send to study abroad */}
              <li>
                <Link
                  to="/services/study-abroad/university"
                  className="hover:text-white transition"
                >
                  Undergraduate
                </Link>
              </li>

              {/* No /programs/masters route → send to study abroad */}
              <li>
                <Link
                  to="/services/study-abroad/university"
                  className="hover:text-white transition"
                >
                  Postgraduate / Masters, PhD
                </Link>
              </li>

              {/* No /scholarships route → send to contact */}
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Academic Loan
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white">Legal</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300 break-words">
              {/* No legal routes yet → send to contact for now */}
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white">Subscribe</h4>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Get updates about new Academic Loans, application deadlines, and
              upcoming info sessions.
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
              <Link to="/contact" className="underline hover:text-white transition">
                Terms & Conditions
              </Link>
              .
            </p>

            {/* ✅ Helpful quick links */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <Link
                to="/how-it-works/appointments"
                className="rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                Book Appointment
              </Link>
              <Link
                to="/services/Visa"
                className="rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                Visa Support
              </Link>
              <Link
                to="/services/english-tests"
                className="rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                English Tests
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* BOTTOM */}
        <div className="py-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} International Mindset PathWays. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}