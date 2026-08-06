import{a as e,n as t,r as n}from"./style-CXyhBbMl.js";var r=`https://date.nager.at/api/v3/PublicHolidays`;async function i(e){let t=e.split(`-`)[0];try{let n=(await(await fetch(`${r}/${t}/US`)).json()).find(t=>t.date===e);return n?n.localName:null}catch(e){return console.error(`Failed to check holidays:`,e),null}}var a=`/wdd330-classcheck/`;async function o(){let r=await e(),o=t(),s=n(o),c=await i(o),l=0,u=0,d=0;r.forEach(e=>{let t=s[e.id];t===`Present`&&l++,t===`Absent`&&u++,t===`Late`&&d++});let f=document.querySelector(`#app`);f.innerHTML=`
    <h1>ClassCheck</h1>
    <a href="${a}attendance.html">Take Attendance →</a>
    <p>${o}</p>
    ${c?`<p class="holiday-banner">No school today — ${c}</p>`:``}

    <div class="summary-cards">
      <div class="card"><h3>Present</h3><p>${l}</p></div>
      <div class="card"><h3>Absent</h3><p>${u}</p></div>
      <div class="card"><h3>Late</h3><p>${d}</p></div>
    </div>

    <h2>Class Roster</h2>
    <ul id="roster-list"></ul>
  `;let p=document.querySelector(`#roster-list`);r.forEach(e=>{let t=s[e.id]||`Not marked yet`,n=document.createElement(`li`);n.innerHTML=`
      <img src="${e.photo}" alt="${e.name}" width="40" height="40" />
      <a href="${a}student.html?id=${e.id}">${e.name}</a> — <strong>${t}</strong>
    `,p.appendChild(n)})}o();