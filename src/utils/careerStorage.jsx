const KEY = "imp_career_guidance_requests_v1";

export function getCareerRequests() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = JSON.parse(raw || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveCareerRequest(record) {
  const prev = getCareerRequests();
  localStorage.setItem(KEY, JSON.stringify([record, ...prev]));
}

export function updateCareerStatus(id, status) {
  const prev = getCareerRequests();
  const next = prev.map((r) => (r.id === id ? { ...r, status } : r));
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function getCareerRequestById(id) {
  const arr = getCareerRequests();
  return arr.find((r) => r.id === id) || null;
}

export function exportCareerCSV(rows, filename = "career-guidance.csv") {
  const headers = [
    "id",
    "createdAt",
    "status",
    "fullName",
    "email",
    "phone",
    "currentStatus",
    "field",
    "targetRole",
    "timeline",
    "meetingType",
    "notes",
    "pathway",
  ];

  const escape = (v) => {
    const s = String(v ?? "");
    // wrap in quotes + escape quotes
    return `"${s.replace(/"/g, '""')}"`;
  };

  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
