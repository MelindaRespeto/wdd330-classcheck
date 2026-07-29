import { fetchRoster } from "./js/roster.mjs";
import "./style.css";

async function init() {
  const students = await fetchRoster();

  const app = document.querySelector("#app");
  app.innerHTML = `
    <h1>ClassCheck</h1>
    <h2>Class Roster</h2>
    <ul id="roster-list"></ul>
  `;

  const list = document.querySelector("#roster-list");

  students.forEach((student) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <img src="${student.photo}" alt="${student.name}" width="40" height="40" />
      ${student.name}
    `;
    list.appendChild(item);
  });
}

init();