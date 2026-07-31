import { fetchRoster } from "../js/roster.mjs";
import { getAllAttendanceForStudent } from "../js/attendanceStorage.mjs";
import "../style.css";

const BASE = import.meta.env.BASE_URL;

async function init() {
    const params = new URLSearchParams(window.location.search);
    const studentId = params.get("id");

    const students = await fetchRoster();
    const student = students.find((s) => s.id === studentId);

    const app = document.querySelector("#app");

    const nav = `
    <nav class="page-nav">
      <a href="${BASE}">Dashboard</a> |
      <a href="${BASE}src/attendance/">Take Attendance</a>
    </nav>
  `;

    if (!student) {
        app.innerHTML = `${nav}<p>Student not found.</p>`;
        return;
    }

    const history = getAllAttendanceForStudent(studentId);
    const presentDays = history.filter((h) => h.status === "Present").length;
    const percentage = history.length
        ? Math.round((presentDays / history.length) * 100)
        : 0;

    app.innerHTML = `
    ${nav}
    <h1>${student.name}</h1>
    <img src="${student.photo}" width="80" height="80" alt="${student.name}" />
    <p><strong>Attendance rate:</strong> ${percentage}%</p>
    <h2>History</h2>
    <ul id="history-list"></ul>
  `;

    const list = document.querySelector("#history-list");
    if (history.length === 0) {
        list.innerHTML = "<li>No attendance recorded yet.</li>";
    } else {
        history.forEach((record) => {
            const item = document.createElement("li");
            item.textContent = `${record.date}: ${record.status}`;
            list.appendChild(item);
        });
    }
}

init();