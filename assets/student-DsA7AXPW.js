import{a as e,t}from"./style-CXyhBbMl.js";var n=`/wdd330-classcheck/`;async function r(){let r=new URLSearchParams(window.location.search).get(`id`),i=(await e()).find(e=>e.id===r),a=document.querySelector(`#app`),o=`
    <nav class="page-nav">
      <a href="${n}">Dashboard</a> |
      <a href="${n}src/attendance/">Take Attendance</a>
    </nav>
  `;if(!i){a.innerHTML=`${o}<p>Student not found.</p>`;return}let s=t(r),c=s.filter(e=>e.status===`Present`).length,l=s.length?Math.round(c/s.length*100):0;a.innerHTML=`
    ${o}
    <h1>${i.name}</h1>
    <img src="${i.photo}" width="80" height="80" alt="${i.name}" />
    <p><strong>Attendance rate:</strong> ${l}%</p>
    <h2>History</h2>
    <ul id="history-list"></ul>
  `;let u=document.querySelector(`#history-list`);s.length===0?u.innerHTML=`<li>No attendance recorded yet.</li>`:s.forEach(e=>{let t=document.createElement(`li`);t.textContent=`${e.date}: ${e.status}`,u.appendChild(t)})}r();