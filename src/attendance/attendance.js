import { fetchRoster } from "../js/roster.mjs";
import { saveAttendance, loadAttendance, getTodayDateString } from "../js/attendanceStorage.mjs";
import "../style.css";

const BASE = import.meta.env.BASE_URL;
const today = getTodayDateString();
let attendanceState = {};

async function init() {
  const students = await fetchRoster();
  attendanceState = loadAttendance(today);

  const app = document.querySelector("#app");
  app.innerHTML = `
    <a href="${BASE}">← Back to Dashboard</a>
    <h1>Take Attendance</h1>
    <p>${today}</p>
    <ul id="attendance-list"></ul>
    <button id="save-btn">Save Attendance</button>
  `;

  const list = document.querySelector("#attendance-list");

  students.forEach((student) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <img src="${student.photo}" alt="${student.name}" width="40" height="40" />
      ${student.name}
      <button data-id="${student.id}" data-status="Present">P</button>
      <button data-id="${student.id}" data-status="Absent">A</button>
      <button data-id="${student.id}" data-status="Late">L</button>
    `;
    list.appendChild(item);

    const savedStatus = attendanceState[student.id];
    if (savedStatus) {
      const btn = item.querySelector(`button[data-status="${savedStatus}"]`);
      if (btn) btn.classList.add("active");
    }
  });

  list.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;

    const { id, status } = btn.dataset;
    attendanceState[id] = status;

    const row = btn.closest("li");
    row.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });

  document.querySelector("#save-btn").addEventListener("click", () => {
    saveAttendance(today, attendanceState);
    alert("Attendance saved!");
  });
}

init();