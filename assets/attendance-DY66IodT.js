import{a as e,i as t,n,r}from"./style-CXyhBbMl.js";var i=`/wdd330-classcheck/`,a=n(),o={};async function s(){let n=await e();o=r(a);let s=document.querySelector(`#app`);s.innerHTML=`
    <nav class="page-nav">
      <a href="${i}">Dashboard</a> |
      <a href="${i}src/student-detail/">Student Detail</a>
    </nav>
    <h1>Take Attendance</h1>
    <p>${a}</p>
    <ul id="attendance-list"></ul>
    <button id="save-btn">Save Attendance</button>
  `;let c=document.querySelector(`#attendance-list`);n.forEach(e=>{let t=document.createElement(`li`);t.innerHTML=`
      <img src="${e.photo}" alt="${e.name}" width="40" height="40" />
      ${e.name}
      <button data-id="${e.id}" data-status="Present">P</button>
      <button data-id="${e.id}" data-status="Absent">A</button>
      <button data-id="${e.id}" data-status="Late">L</button>
    `,c.appendChild(t);let n=o[e.id];if(n){let e=t.querySelector(`button[data-status="${n}"]`);e&&e.classList.add(`active`)}}),c.addEventListener(`click`,e=>{let t=e.target.closest(`button`);if(!t)return;let{id:n,status:r}=t.dataset;o[n]=r,t.closest(`li`).querySelectorAll(`button`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`)}),document.querySelector(`#save-btn`).addEventListener(`click`,()=>{t(a,o);let e=document.createElement(`div`);e.className=`save-confirmation`,e.textContent=`Attendance saved!`,document.querySelector(`#app`).appendChild(e),setTimeout(()=>e.remove(),2e3)})}s();