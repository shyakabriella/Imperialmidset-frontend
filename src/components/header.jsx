import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  ClipboardList,
  BookOpen,
  Building2,
  BookMarked,
  FileText,
  Globe,
  BadgeDollarSign,
  Award,
  MonitorCog,
  Users,
  Star,
  Info,
  Phone,
  Network,
  CreditCard,
  Search,
  HelpCircle,
} from "lucide-react";

/* ---------------- menu with icons ---------------- */
const MENU = [
  {
    label: "Services",
    icon: LayoutGrid,
    items: [
      { label: "Study Abroad (Undergraduate & Postgraduate)", to: "/services/study-abroad/university", icon: BookMarked },
      { label: "Visa Support", to: "/services/Visa", icon: FileText },
      { label: "Culture Exchange", to: "/services/Culture_exchange", icon: Globe },
      { label: "Air Ticketing", to: "/services/Air_ticket", icon: BadgeDollarSign },
      { label: "English Proficiency (Duolingo/IELTS)", to: "/services/english-tests", icon: Award },
      { label: "Technical Support (Coding)", to: "/services/technical", icon: MonitorCog },
      // { label: "Internship Support", to: "/services/internship", icon: Users },
      { label: "Career Guidance", to: "/services/Career", icon: Star },
    ],
  },
  {
    label: "How It Works",
    icon: ClipboardList,
    items: [
      { label: "Process Overview", to: "/how-it-works", icon: ClipboardList },
      { label: "Pricing & Quotation", to: "/how-it-works/quotation", icon: BadgeDollarSign },
      { label: "Payment & Invoice", to: "/how-it-works/payment", icon: CreditCard },
      { label: "Appointment & Meetings", to: "/how-it-works/appointments", icon: Phone },
      { label: "Track Progress", to: "/how-it-works/tracking", icon: Search },
    ],
  },
  {
    label: "Resources",
    icon: BookOpen,
    items: [
      { label: "Blog & Guides", to: "/resources/blog", icon: BookOpen },
      { label: "Scholarship Tips", to: "/resources/scholarships", icon: Award },
      { label: "Country Guides", to: "/resources/countries", icon: Globe },
      { label: "University Finder", to: "/resources/university-finder", icon: Search },
      { label: "FAQ", to: "/faq", icon: HelpCircle },
    ],
  },
  {
  label: "Company",
  icon: Building2,
  items: [
    { label: "About Us", to: "/about", icon: Info },            
    { label: "Our Team", to: "/companyTeam", icon: Users },    
    { label: "Partners", to: "/company/Partners", icon: Network }, 
    //  { label: "Partner With Us", to: "/company/partners/request", icon: Network },
    { label: "Testimonials", to: "/testimonials", icon: Star }, 
    { label: "Contact", to: "/contact", icon: Phone },         
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
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  // Desktop dropdown open state (by label)
  const [desktopOpen, setDesktopOpen] = React.useState(null);

  // Mobile submenu open state (by label)
  const [mobileSubOpen, setMobileSubOpen] = React.useState({});

  const navRef = React.useRef(null);
  const closeTimerRef = React.useRef(null);

  // ✅ show animation runs only once per tab (opacity only, no translate)
  React.useEffect(() => {
    const alreadyShown = sessionStorage.getItem("headerShown");
    if (alreadyShown) {
      setShow(true);
      return;
    }
    const t = setTimeout(() => setShow(true), 60);
    sessionStorage.setItem("headerShown", "1");
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
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDesktopOpen(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // ✅ Lock scroll ONLY when mobile menu is open (stable)
  React.useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = prev || "auto";
    };
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setDesktopOpen(null);
  };

  const openDesktopMenu = (label) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDesktopOpen(label);
  };

  const scheduleCloseDesktopMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setDesktopOpen(null), 120);
  };

  return (
    <>
      {/* ✅ Fixed header (solid background) */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={[
              "h-[84px] flex items-center justify-between rounded-2xl",
              "bg-white shadow-md ring-1 ring-black/10",
              "px-4",
              "transition-opacity duration-500",
              show ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {/* LOGO */}
            <Link to="/" className="flex items-center hover:opacity-90 transition" onClick={closeAll}>
              <div className="h-14 w-48 sm:w-56 overflow-hidden rounded-xl flex items-center">
                <img
                  src="/logoo.png"
                  alt="Logo"
                  className="h-full w-full object-cover scale-110 origin-left"
                />
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav ref={navRef} className="hidden lg:flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 text-sm font-semibold transition ${
                    isActive ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
                  }`
                }
                onClick={() => setDesktopOpen(null)}
              >
                <Home className="h-4 w-4" />
                Home
              </NavLink>

              {MENU.map((menu) => {
                const isOpen = desktopOpen === menu.label;
                const MenuIcon = menu.icon;

                return (
                  <div
                    key={menu.label}
                    className="relative"
                    onMouseEnter={() => openDesktopMenu(menu.label)}
                    onMouseLeave={scheduleCloseDesktopMenu}
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
                      <MenuIcon className="h-4 w-4" />
                      {menu.label} <Chevron open={isOpen} />
                    </button>

                    {/* hover bridge */}
                    <div
                      className={[
                        "absolute left-0 top-full pt-3",
                        isOpen ? "pointer-events-auto" : "pointer-events-none",
                      ].join(" ")}
                      onMouseEnter={() => openDesktopMenu(menu.label)}
                      onMouseLeave={scheduleCloseDesktopMenu}
                    >
                      <div
                        className={[
                          "w-80 overflow-hidden rounded-2xl",
                          "bg-white shadow-xl ring-1 ring-black/10",
                          "transition-all duration-150",
                          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
                        ].join(" ")}
                        role="menu"
                      >
                        <div className="p-2">
                          {menu.items.map((it) => {
                            const ItemIcon = it.icon;
                            return (
                              <NavLink
                                key={it.to}
                                to={it.to}
                                role="menuitem"
                                onClick={closeAll}
                                className={({ isActive }) =>
                                  [
                                    "flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition leading-snug",
                                    isActive
                                      ? "bg-gray-100 text-gray-900 font-semibold"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                                  ].join(" ")
                                }
                              >
                                <ItemIcon className="h-4 w-4 mt-0.5 shrink-0 opacity-80" />
                                <span className="block">{it.label}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* right actions (desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <NavLink to="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition">
                LOG IN
              </NavLink>

              <NavLink
                to="/register"
                className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-gray-800 active:scale-[0.98]"
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
            <div className="rounded-2xl bg-white shadow-md ring-1 ring-black/10 p-4">
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/"
                  onClick={closeAll}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <Home className="h-4 w-4" />
                  Home
                </NavLink>

                {MENU.map((menu) => {
                  const isSubOpen = !!mobileSubOpen[menu.label];
                  const MenuIcon = menu.icon;

                  return (
                    <div key={menu.label} className="rounded-2xl border border-gray-200/80 overflow-hidden">
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
                        <span className="inline-flex items-center gap-2">
                          <MenuIcon className="h-4 w-4" />
                          {menu.label}
                        </span>
                        <Chevron open={isSubOpen} />
                      </button>

                      <div
                        className={[
                          "grid transition-all duration-300 ease-out",
                          isSubOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <div className="p-2">
                            {menu.items.map((it) => {
                              const ItemIcon = it.icon;
                              return (
                                <NavLink
                                  key={it.to}
                                  to={it.to}
                                  onClick={closeAll}
                                  className={({ isActive }) =>
                                    [
                                      "flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition leading-snug",
                                      isActive
                                        ? "bg-gray-100 text-gray-900 font-semibold"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                                    ].join(" ")
                                  }
                                >
                                  <ItemIcon className="h-4 w-4 mt-0.5 shrink-0 opacity-80" />
                                  <span>{it.label}</span>
                                </NavLink>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-3 border-t border-gray-200 flex items-center gap-3">
                  <NavLink to="/login" onClick={closeAll} className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition">
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

      {/* MOBILE OVERLAY (behind header) */}
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