import "../style.css";
import { fetchRoster } from "../js/roster.mjs";

const attendanceState = {}; // { studentId: status }

async function init() {
  const students = await fetchRoster();

  const app = document.querySelector("#app");
  app.innerHTML = `
    <h1>Take Attendance</h1>
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
  });

  // Handle clicks on any P/A/L button
  list.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;

    const { id, status } = btn.dataset;
    attendanceState[id] = status;

    // Reset all buttons in this row, then highlight the clicked one
    const row = btn.closest("li");
    row.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });

  document.querySelector("#save-btn").addEventListener("click", () => {
    console.log("Attendance to save:", attendanceState);
    alert("Attendance recorded (check console for now)");
  });
}

init();