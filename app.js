"use strict";let edition=null,view="current",eventId=null,level=null;const $=s=>document.querySelector(s);const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));async function init(){const idx=await fetch("editions.json").then(x=>x.json());const select=$("#edition");for(const d of idx.editions){const opt=document.createElement("option");opt.value=d.file;opt.textContent=d.label;select.append(opt)}select.onchange=()=>load(select.value);await load(idx.editions[0].file);document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{view=b.dataset.view;eventId=null;level=null;draw()})}async function load(file){edition=await fetch(file).then(x=>x.json());view="current";eventId=null;level=null;draw()}function draw(){if(!edition)return;const visible=edition.events.filter(e=>view==="all"||(view==="archive"?e.archive:!e.archive));if(!visible.find(e=>e.event_id===eventId)){eventId=visible[0]?.event_id;level=null}const e=visible.find(e=>e.event_id===eventId);if(e&&!e.layers.find(l=>l.level===level))level=e.layers.find(l=>l.level==="L1")?.level||e.layers[0].level;document.querySelectorAll("[data-view]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.view===view)));$("#news").innerHTML=visible.map(e=>{let r=e.layers.find(l=>l.level==="L1")||e.layers[0];return '<button data-event="'+esc(e.event_id)+'"><b>'+esc(r.title)+'</b><small>'+esc(e.date)+' · '+esc(e.category)+' · '+e.layers.map(l=>l.level).join(" / ")+'</small></button>'}).join("")||"<p>此分區目前沒有內容。</p>";const r=e?.layers.find(l=>l.level===level);$("#article").innerHTML=r?'<div class="meta">'+esc(e.date)+' · '+esc(e.category)+' · '+esc(e.event_id)+'</div><div class="layers">'+e.layers.map(l=>'<button data-level="'+esc(l.level)+'" aria-pressed="'+(l.level===level)+'">'+esc(l.level)+'</button>').join("")+'</div><h2>'+esc(r.title)+'</h2><p>'+esc(r.body)+'</p><h3>讀者可以怎麼做</h3><p class="hint">'+esc(r.action)+'</p><h3>時效與限制</h3><p>'+esc(r.caveat)+'</p><div class="source"><a href="'+esc(r.source)+'" target="_blank" rel="noopener noreferrer">查看原始來源 ↗</a></div>':"<p>尚無內容。</p>";document.querySelectorAll("[data-event]").forEach(b=>b.onclick=()=>{eventId=b.dataset.event;level=null;draw()});document.querySelectorAll("[data-level]").forEach(b=>b.onclick=()=>{level=b.dataset.level;draw()})}init().catch(err=>{$("#article").textContent="載入失敗，請檢查網站檔案是否完整。";console.error(err)});
const GAS_URL = "https://script.google.com/macros/s/AKfycbyntD2JGZttHrc7r-sPdbtyul1dpOIWtqSlN3qDKhfXJ0DhfTW8VV3ieicmvjg8igQ_uA/exec";

function loadDailyFeed() {
  const callback = "LSI_feed_v1";
  const script = document.createElement("script");

  window[callback] = function (data) {
    script.remove();
    delete window[callback];

    if (!data || !Array.isArray(data.editions)) return;

    const select = document.querySelector("#edition");
    select.innerHTML = "";

    data.editions.forEach(function (item) {
      const option = document.createElement("option");
      option.value = item.date;
      option.textContent = item.label;
      select.appendChild(option);
    });

    select.onchange = function () {
      const selected = data.editions.find(
        item => item.date === select.value
      );
      if (!selected) return;

      edition = { events: selected.events };
      view = "current";
      eventId = null;
      level = null;
      draw();
    };

    if (data.editions.length > 0) {
      select.value = data.editions[0].date;
      select.onchange();
    }
  };

  script.src = GAS_URL +
    "?callback=" + callback +
    "&v=" + Date.now();

  document.head.appendChild(script);
}

// window.addEventListener("load", loadDailyFeed);
