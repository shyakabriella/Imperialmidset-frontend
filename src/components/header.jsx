import React from "react";
import { Link, NavLink } from "react-router-dom";

const MENU = [
  {
    label: "Services",
    items: [
      { label: "Study Abroad (Undergraduate & Postgraduate)", to: "/services/study-abroad/university" },
      { label: "Visa Support", to: "/services/Visa" },
      { label: "Culture Exchange", to: "/services/Culture_exchange" },
      { label: "Air Ticketing", to: "/services/Air_ticket" },
      { label: "English Proficiency (Duolingo/IELTS)", to: "/services/english-tests" },
      { label: "Technical Support (Coding)", to: "/services/technical" },
      { label: "Internship Support", to: "/services/internship" },
      { label: "Career Guidance", to: "/services/Career" },
    ],
  },
  {
    label: "How It Works",
    items: [
      { label: "Process Overview", to: "/how-it-works" },
      { label: "Pricing & Quotation", to: "/how-it-works/quotation" },
      { label: "Payment & Invoice", to: "/how-it-works/payment" },
      { label: "Appointment & Meetings", to: "/how-it-works/appointments" },
      { label: "Track Progress", to: "/how-it-works/tracking" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog & Guides", to: "/resources/blog" },
      { label: "Scholarship Tips", to: "/resources/scholarships" },
      { label: "Country Guides", to: "/resources/countries" },
      { label: "University Finder", to: "/resources/university-finder" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Us", to: "/company/about" },
      { label: "Our Team", to: "/company/team" },
      { label: "Partners", to: "/company/partners" },
      { label: "Testimonials", to: "/company/testimonials" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

function Chevron({ open }) {
  return (
    <span
      className={[
        "inline-block transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      ].join(" ")}
      aria-hidden="true"
    >
      ▾
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = React.useState(false); // mobile menu open/close
  const [show, setShow] = React.useState(false);

  // Desktop dropdown open state (by label)
  const [desktopOpen, setDesktopOpen] = React.useState(null);

  // Mobile submenu open state (by label)
  const [mobileSubOpen, setMobileSubOpen] = React.useState({});

  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  // ✅ Close mobile menu on desktop resize
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ ESC closes menus
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDesktopOpen(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ✅ Close desktop dropdown on outside click
  React.useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopOpen(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // ✅ IMPORTANT: Lock body scroll when mobile menu is open (prevents shaking)
  React.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    if (open) {
      // prevent background scroll
      document.body.style.overflow = "hidden";

      // optional: avoid tiny width jump when scrollbar disappears
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
    }

    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
    };
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setDesktopOpen(null);
  };

  return (
    <>
      <header className="sticky top-4 z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={[
              "flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-md shadow-md ring-1 ring-black/5",
              "px-4 py-2",
              "min-h-[84px]",
              "transform transition duration-700 ease-out",
              show ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
            ].join(" ")}
          >
            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center hover:opacity-90 transition"
              onClick={closeAll}
            >
              <div className="h-16 w-48 sm:w-56 overflow-hidden rounded-xl flex items-center">
                <img
                  src="/logoo.png"
                  alt="Logo"
                  className="h-full w-full object-cover scale-110 origin-left"
                />
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
                  }`
                }
                onClick={() => setDesktopOpen(null)}
              >
                Home
              </NavLink>

              {MENU.map((menu) => {
                const isOpen = desktopOpen === menu.label;

                return (
                  <div
                    key={menu.label}
                    className="relative"
                    onMouseEnter={() => setDesktopOpen(menu.label)}
                    onMouseLeave={() => setDesktopOpen(null)}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setDesktopOpen((prev) => (prev === menu.label ? null : menu.label))
                      }
                    >
                      {menu.label} <Chevron open={isOpen} />
                    </button>

                    <div
                      className={[
                        "absolute left-0 top-full mt-3 w-72 overflow-hidden rounded-2xl",
                        "bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/10",
                        "transition-all duration-200",
                        isOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none",
                      ].join(" ")}
                      role="menu"
                    >
                      <div className="p-2">
                        {menu.items.map((it) => (
                          <NavLink
                            key={it.to}
                            to={it.to}
                            role="menuitem"
                            onClick={closeAll}
                            className={({ isActive }) =>
                              [
                                "block rounded-xl px-3 py-2 text-sm transition",
                                isActive
                                  ? "bg-gray-100 text-gray-900 font-semibold"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                              ].join(" ")
                            }
                          >
                            {it.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* right actions (desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <NavLink
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition"
              >
                LOG IN
              </NavLink>

              <NavLink
                to="/register"
                className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-gray-800 hover:-translate-y-0.5 active:translate-y-0"
              >
                GET STARTED
              </NavLink>
            </div>

            {/* mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 transition active:scale-95"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="text-xl">{open ? "✕" : "☰"}</span>
            </button>
          </div>

          {/* MOBILE MENU */}
          <div
            className={[
              "lg:hidden overflow-hidden transition-all duration-300 ease-out",
              open ? "max-h-[80vh] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0",
            ].join(" ")}
          >
            <div className="rounded-2xl bg-white/90 backdrop-blur-md shadow-md ring-1 ring-black/5 p-4">
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/"
                  onClick={closeAll}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  Home
                </NavLink>

                {MENU.map((menu) => {
                  const isSubOpen = !!mobileSubOpen[menu.label];
                  return (
                    <div
                      key={menu.label}
                      className="rounded-2xl border border-gray-200/80 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubOpen((prev) => ({
                            ...prev,
                            [menu.label]: !prev[menu.label],
                          }))
                        }
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                        aria-expanded={isSubOpen}
                      >
                        <span>{menu.label}</span>
                        <Chevron open={isSubOpen} />
                      </button>

                      <div
                        className={[
                          "grid transition-all duration-300 ease-out",
                          isSubOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <div className="p-2">
                            {menu.items.map((it) => (
                              <NavLink
                                key={it.to}
                                to={it.to}
                                onClick={closeAll}
                                className={({ isActive }) =>
                                  [
                                    "block rounded-xl px-3 py-2 text-sm transition",
                                    isActive
                                      ? "bg-gray-100 text-gray-900 font-semibold"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                                  ].join(" ")
                                }
                              >
                                {it.label}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-3 border-t border-gray-200 flex items-center gap-3">
                  <NavLink
                    to="/login"
                    onClick={closeAll}
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition"
                  >
                    LOG IN
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={closeAll}
                    className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-gray-800 active:scale-[0.98]"
                  >
                    GET STARTED
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ MOBILE OVERLAY (OUTSIDE CONTAINER) */}
      <div
        className={[
          "lg:hidden fixed inset-0 z-40 transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
