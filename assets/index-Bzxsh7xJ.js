(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://randomuser.me/api/?results=15`,t=`classcheck-roster`;async function n(){let n=localStorage.getItem(t);if(n)return JSON.parse(n);try{let n=(await(await fetch(e)).json()).results.map((e,t)=>({id:`s${t+1}`,name:`${e.name.first} ${e.name.last}`,photo:e.picture.thumbnail}));return localStorage.setItem(t,JSON.stringify(n)),n}catch(e){return console.error(`Failed to fetch roster:`,e),[]}}var r=`classcheck-attendance-`;function i(e){return`${r}${e}`}function a(e){let t=i(e),n=localStorage.getItem(t);return n?JSON.parse(n):{}}function o(){return new Date().toISOString().split(`T`)[0]}async function s(){let e=await n(),t=o(),r=a(t),i=0,s=0,c=0;e.forEach(e=>{let t=r[e.id];t===`Present`&&i++,t===`Absent`&&s++,t===`Late`&&c++});let l=document.querySelector(`#app`);l.innerHTML=`
    <h1>ClassCheck</h1>
    <p>${t}</p>

    <div class="summary-cards">
      <div class="card"><h3>Present</h3><p>${i}</p></div>
      <div class="card"><h3>Absent</h3><p>${s}</p></div>
      <div class="card"><h3>Late</h3><p>${c}</p></div>
    </div>

    <h2>Class Roster</h2>
    <ul id="roster-list"></ul>
  `;let u=document.querySelector(`#roster-list`);e.forEach(e=>{let t=r[e.id]||`Not marked yet`,n=document.createElement(`li`);n.innerHTML=`
      <img src="${e.photo}" alt="${e.name}" width="40" height="40" />
      ${e.name} — <strong>${t}</strong>
    `,u.appendChild(n)})}s();