import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CULTURE_EVENTS } from "../../data/cultureEvents";

const BRAND = {
  primary: "#2F0D34", // purple
  accent: "#BD9F75", // gold
};

function formatRange(start, end) {
  const opts = { year: "numeric", month: "short", day: "numeric" };
  const s = start ? new Date(start).toLocaleDateString("en-US", opts) : "TBA";
  const e = end ? new Date(end).toLocaleDateString("en-US", opts) : "TBA";
  return !start || start === end ? s : `${s} — ${e}`;
}

function Tag({ children }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[11px] font-bold"
      style={{ backgroundColor: "rgba(47,13,52,0.08)", color: BRAND.primary }}
    >
      {children}
    </span>
  );
}

function Badge({ children }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[11px] font-bold"
      style={{ backgroundColor: "rgba(189,159,117,0.18)", color: BRAND.primary }}
    >
      {children}
    </span>
  );
}

export default function CultureExchangeEvents() {
  const navigate = useNavigate();

  // ✅ Make sure we always have an array (prevents .map crash)
  const rawEvents = Array.isArray(CULTURE_EVENTS) ? CULTURE_EVENTS : [];

  // ✅ Normalize data so UI always has expected fields
  const events = rawEvents.map((ev) => {
    const dateStart = ev.dateStart || ev.date || "";
    const dateEnd = ev.dateEnd || ev.endDate || ev.date || "";
    const cover =
      ev.cover ||
      ev.image ||
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80";

    const tags =
      Array.isArray(ev.tags)
        ? ev.tags
        : Array.isArray(ev.highlights)
        ? ev.highlights.slice(0, 6)
        : ev.theme
        ? [ev.theme]
        : [];

    const summary =
      ev.summary ||
      ev.overview ||
      ev.desc ||
      "Cultural exchange experience and guided learning.";

    const fee = ev.fee || "Free";
    const seats = ev.seats ?? "Limited";

    return {
      id: ev.id,
      title: ev.title,
      audience: ev.audience || "Students",
      location: ev.location || "Kigali, Rwanda",
      dateStart,
      dateEnd,
      cover,
      tags,
      summary,
      fee,
      seats,
      original: ev,
    };
  });

  const goApply = (event) => {
    navigate(`/services/Culture_exchange/events/${event.id}/apply`, {
      state: { event },
    });
  };

  return (
    <div className="bg-white">
      {/* HERO with background image */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(47,13,52,0.72) 0%, rgba(47,13,52,0.52) 45%, rgba(47,13,52,0.22) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-14">
          {/* Breadcrumb + Back Button */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="text-xs text-white/80">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              <span className="mx-1">/</span>
              <span className="text-white/90">Services</span>{" "}
              <span className="mx-1">/</span>
              <span className="font-semibold text-white">
                Culture Exchange Events
              </span>
            </div>

            {/* ✅ BACK BUTTON */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border px-4 py-2 text-sm font-semibold bg-white/10 text-white hover:bg-white/15 transition active:scale-[0.98]"
              style={{ borderColor: "rgba(255,255,255,0.28)" }}
            >
              ← Back
            </button>
          </div>

          <div className="mt-8 max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <Badge>🌍 Culture Exchange</Badge>
              <Badge>🎓 Students</Badge>
              <Badge>🤝 Unity & Reconciliation</Badge>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Upcoming Culture Exchange Events in Rwanda & Abroad
            </h1>

            <p className="mt-4 text-white/90 leading-relaxed">
              We connect Rwandan students to international opportunities and
              welcome international students to learn Rwandan culture, unity, and
              reconciliation after the 1994 Genocide against the Tutsi — through
              respectful learning sessions and curated events.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  document
                    .getElementById("events")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                style={{ backgroundColor: BRAND.accent }}
              >
                View Events 👇
              </button>

              <Link
                to="/services/Culture_exchange"
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white/95 border border-white/30 bg-white/10 hover:bg-white/15 transition"
              >
                About Culture Exchange
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro small section */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div
              className="text-xs font-bold tracking-widest"
              style={{ color: BRAND.primary }}
            >
              WHAT STUDENTS WILL GAIN
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Learning, culture, leadership & real connection
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Our events are designed to build understanding, respect, and
              practical life skills: culture adaptation, communication, community
              engagement, and professional growth.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Cultural Immersion",
                "Community Visits",
                "Leadership Sessions",
                "Networking",
                "Guided Learning",
              ].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-extrabold text-gray-900">
                Quick Note 📝
              </div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                You can apply to any event below. Each event has its own
                application form with your passport number, full name, country,
                phone number, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS LIST */}
      <section id="events" className="mx-auto max-w-7xl px-4 pb-14">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div
              className="text-xs font-bold tracking-widest"
              style={{ color: BRAND.primary }}
            >
              UPCOMING EVENTS
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Choose an event and apply
            </h2>
            <p className="mt-2 text-gray-600">
              Click <span className="font-semibold">Apply</span> to open the form
              for that specific event.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
            Events: <span className="font-bold">{events.length}</span>
          </div>
        </div>

        {/* ✅ Empty state */}
        {events.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="text-lg font-extrabold text-gray-900">
              No events posted yet
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Please check again soon. We will publish upcoming events here.
            </p>
            <Link
              to="/services/Culture_exchange"
              className="inline-flex mt-5 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition"
              style={{ backgroundColor: BRAND.primary }}
            >
              Back to Culture Exchange
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <div
                key={e.id}
                className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-44">
                  <img
                    src={e.cover}
                    alt={e.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-gray-900">
                      {e.audience}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold"
                      style={{
                        backgroundColor: "rgba(189,159,117,0.92)",
                        color: "#2F0D34",
                      }}
                    >
                      {e.fee}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div
                    className="text-xs font-bold tracking-widest"
                    style={{ color: BRAND.primary }}
                  >
                    {formatRange(e.dateStart, e.dateEnd)}
                  </div>

                  <div className="mt-2 text-lg font-extrabold text-gray-900">
                    {e.title}
                  </div>

                  <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {e.summary}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(e.tags || []).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-gray-600">
                    <span>📍 {e.location}</span>
                    <span className="font-semibold text-gray-800">
                      {String(e.seats)} seats
                    </span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => goApply(e)}
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
                      style={{ backgroundColor: BRAND.primary }}
                    >
                      Apply ✅
                    </button>

                    <button
                      onClick={() => goApply(e)}
                      className="rounded-xl px-4 py-2.5 text-sm font-semibold border shadow-sm bg-white hover:bg-gray-50 transition"
                      style={{
                        borderColor: "rgba(47,13,52,0.25)",
                        color: BRAND.primary,
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="py-14" style={{ backgroundColor: "rgba(47,13,52,0.03)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div
                className="text-xs font-bold tracking-widest"
                style={{ color: BRAND.primary }}
              >
                READY TO JOIN?
              </div>
              <div className="mt-2 text-2xl font-extrabold text-gray-900">
                Apply to an event and we will guide you step-by-step 
              </div>
              <div className="mt-2 text-gray-600">
                Choose an event above and click{" "}
                <span className="font-semibold">Apply</span>.
              </div>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("events")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition active:scale-[0.98]"
              style={{ backgroundColor: BRAND.accent }}
            >
              Browse Events 
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
