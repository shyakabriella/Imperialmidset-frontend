// src/utils/englishRegistrationStore.js
const KEY = "imp_english_registrations_v1";

export function loadRegistrations() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveRegistrations(list) {
  localStorage.setItem(KEY, JSON.stringify(Array.isArray(list) ? list : []));
}

export function addRegistration(payload) {
  const list = loadRegistrations();
  const id = `ENG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const record = {
    id,
    createdAt: new Date().toISOString(),
    status: "Pending Payment",
    paymentStatus: "Unpaid",
    ...payload,
  };
  list.unshift(record);
  saveRegistrations(list);
  return record;
}

export function updateRegistration(id, patch) {
  const list = loadRegistrations();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
  saveRegistrations(list);
  return list[idx];
}

export function clearRegistrations() {
  localStorage.removeItem(KEY);
}
