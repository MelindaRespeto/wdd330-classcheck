import { fetchRoster } from "./js/roster.mjs";
import { loadAttendance, getTodayDateString } from "./js/attendanceStorage.mjs";
import "./style.css";

async function init() {
  const students = await fetchRoster();
  const today = getTodayDateString();
  const attendanceState = loadAttendance(today);

  let presentCount = 0;
  let absentCount = 0;
  let lateCount = 0;

  students.forEach((student) => {
    const status = attendanceState[student.id];
    if (status === "Present") presentCount++;
    if (status === "Absent") absentCount++;
    if (status === "Late") lateCount++;
  });

  const app = document.querySelector("#app");
  app.innerHTML = `
    <h1>ClassCheck</h1>
    <p>${today}</p>

    <div class="summary-cards">
      <div class="card"><h3>Present</h3><p>${presentCount}</p></div>
      <div class="card"><h3>Absent</h3><p>${absentCount}</p></div>
      <div class="card"><h3>Late</h3><p>${lateCount}</p></div>
    </div>

    <h2>Class Roster</h2>
    <ul id="roster-list"></ul>
  `;

  const list = document.querySelector("#roster-list");

  students.forEach((student) => {
    const status = attendanceState[student.id] || "Not marked yet";
    const item = document.createElement("li");
    item.innerHTML = `
      <img src="${student.photo}" alt="${student.name}" width="40" height="40" />
  <a href="./src/student-detail/index.html?id=${student.id}">${student.name}</a> — <strong>${status}</strong>
    `;
    list.appendChild(item);
  });
}

init();