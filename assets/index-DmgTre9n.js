(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://randomuser.me/api/?results=15`,t=`classcheck-roster`,n=class{constructor(e,t,n){this.id=e,this.name=t,this.photo=n}};async function r(){let r=localStorage.getItem(t);if(r)return JSON.parse(r);try{let r=(await(await fetch(e)).json()).results.map((e,t)=>new n(`s${t+1}`,`${e.name.first} ${e.name.last}`,e.picture.thumbnail));return localStorage.setItem(t,JSON.stringify(r)),r}catch(e){return console.error(`Failed to fetch roster:`,e),[]}}var i=`classcheck-attendance-`;function a(e){return`${i}${e}`}function o(e){let t=a(e),n=localStorage.getItem(t);return n?JSON.parse(n):{}}function s(){return new Date().toISOString().split(`T`)[0]}var c=`https://date.nager.at/api/v3/PublicHolidays`;async function l(e){let t=e.split(`-`)[0];try{let n=(await(await fetch(`${c}/${t}/US`)).json()).find(t=>t.date===e);return n?n.localName:null}catch(e){return console.error(`Failed to check holidays:`,e),null}}var u=`/wdd330-classcheck/`;async function d(){let e=await r(),t=s(),n=o(t),i=await l(t),a=0,c=0,d=0;e.forEach(e=>{let t=n[e.id];t===`Present`&&a++,t===`Absent`&&c++,t===`Late`&&d++});let f=document.querySelector(`#app`);f.innerHTML=`
    <h1>ClassCheck</h1>
    <a href="${u}attendance.html">Take Attendance →</a>
    <p>${t}</p>
    ${i?`<p class="holiday-banner">No school today — ${i}</p>`:``}

    <div class="summary-cards">
      <div class="card"><h3>Present</h3><p>${a}</p></div>
      <div class="card"><h3>Absent</h3><p>${c}</p></div>
      <div class="card"><h3>Late</h3><p>${d}</p></div>
    </div>

    <h2>Class Roster</h2>
    <ul id="roster-list"></ul>
  `;let p=document.querySelector(`#roster-list`);e.forEach(e=>{let t=n[e.id]||`Not marked yet`,r=document.createElement(`li`);r.innerHTML=`
      <img src="${e.photo}" alt="${e.name}" width="40" height="40" />
      <a href="${u}student.html?id=${e.id}">${e.name}</a> — <strong>${t}</strong>
    `,p.appendChild(r)})}d();