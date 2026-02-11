import React from "react";
import { Link, useLocation } from "react-router-dom";
import { loadRegistrations, clearRegistrations } from "../../utils/englishRegistrationStore";

const THEME = { primary: "#0B5FFF", soft: "rgba(11,95,255,0.10)" };

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const exportCSV = (rows) => {
  const header = [
    "id","createdAt","fullName","email","phone","country","test","plan","amountUSD","examDate","paymentMethod","paymentStatus","status"
  ];
  const lines = [header.join(",")];

  rows.forEach((r) => {
    const vals = header.map((k) => {
      const v = r?.[k] ?? "";
      const safe = String(v).replaceAll('"', '""');
      return `"${safe}"`;
    });
    lines.push(vals.join(","));
  });

  const csv = lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "english_test_registrations.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export default function EnglishTestsDashboard() {
  const q = useQuery();
  const role = (q.get("role") || "teacher").toLowerCase(); // teacher/admin

  const [search, setSearch] = React.useState("");
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setRows(loadRegistrations());
  }, []);

  const filtered = React.useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) =>
      [r.id, r.fullName, r.email, r.phone, r.country, r.test, r.plan].some((x) =>
        String(x || "").toLowerCase().includes(s)
      )
    );
  }, [rows, search]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-10">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">/</span>
          <Link to="/services/english-tests" className="hover:underline">English Proficiency</Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">
            {role === "admin" ? "Admin Dashboard" : "Teacher Dashboard"}
          </span>
        </div>

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold tracking-widest" style={{ color: THEME.primary }}>
                DASHBOARD
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                {role === "admin" ? "Admin" : "Teacher"} — Registered Students 
              </h1>
              <p className="mt-2 text-gray-600">
                Search and review registrations. Export CSV for reporting.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => exportCSV(filtered)}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow active:scale-[0.98]"
                style={{ backgroundColor: THEME.primary }}
              >
                Export CSV 📤
              </button>

              {role === "admin" ? (
                <button
                  onClick={() => {
                    if (confirm("Clear all registrations?")) {
                      clearRegistrations();
                      setRows([]);
                    }
                  }}
                  className="rounded-xl border bg-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 active:scale-[0.98]"
                  style={{ borderColor: "rgba(11,95,255,0.25)", color: THEME.primary }}
                >
                  Clear Data 🧹
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-xs font-bold text-gray-700">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, test, plan..."
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgba(11,95,255,0.20)]"
            />
          </div>

          <div className="mt-6 overflow-auto rounded-2xl border border-gray-200">
            <table className="min-w-[1000px] w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  {["ID","Student","Test","Plan","Exam Date","Payment","Status","Created"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{r.fullName}</div>
                      <div className="text-xs text-gray-500">{r.email} • {r.phone} • {r.country}</div>
                    </td>
                    <td className="px-4 py-3">{r.test}</td>
                    <td className="px-4 py-3">{r.plan} (${r.amountUSD})</td>
                    <td className="px-4 py-3">{r.examDate || "-"}</td>
                    <td className="px-4 py-3">
                      <div>{r.paymentMethod}</div>
                      <div className="text-xs text-gray-500">{r.paymentStatus}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-bold"
                        style={{ backgroundColor: THEME.soft, color: THEME.primary }}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
                    </td>
                  </tr>
                ))}

                {!filtered.length ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No registrations found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Note: This dashboard uses localStorage (front-end only). For real production, connect a backend database + auth.
          </div>
        </div>
      </div>
    </div>
  );
}
