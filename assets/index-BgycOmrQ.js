(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://randomuser.me/api/?results=15`;async function t(){try{return(await(await fetch(e)).json()).results.map((e,t)=>({id:`s${t+1}`,name:`${e.name.first} ${e.name.last}`,photo:e.picture.thumbnail}))}catch(e){return console.error(`Failed to fetch roster:`,e),[]}}async function n(){let e=await t(),n=document.querySelector(`#app`);n.innerHTML=`
    <h1>ClassCheck</h1>
    <h2>Class Roster</h2>
    <ul id="roster-list"></ul>
  `;let r=document.querySelector(`#roster-list`);e.forEach(e=>{let t=document.createElement(`li`);t.innerHTML=`
      <img src="${e.photo}" alt="${e.name}" width="40" height="40" />
      ${e.name}
    `,r.appendChild(t)})}n();