const STORAGE_PREFIX = "classcheck-attendance-";

function getKey(date) {
    return `${STORAGE_PREFIX}${date}`;
}

export function saveAttendance(date, attendanceState) {
    const key = getKey(date);
    localStorage.setItem(key, JSON.stringify(attendanceState));
}

export function loadAttendance(date) {
    const key = getKey(date);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
}

export function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // e.g. "2026-07-29"
}