import { T } from "./tokens.mjs";
export { T };
/* ============================================================================
   The Vadal.ai app shell and a block kit, in plain HTML/CSS.

   Every colour, radius, spacing step and type size here is the real value from
   the Figma file's variable collections (Primitives / Color / Spacing / Radius
   / Sizing / Type, Light mode), pulled with the Figma MCP rather than sampled
   off a screenshot. That is what makes a generated screen sit next to an
   exported one without looking like a different product.
   ========================================================================== */


const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* --------------------------------------------------------------- sidebar */
/* Matches the exported screens item for item, including the counters on
   Surveys and Manager hub and the Health score at the foot. */
const NAV = [
  { label: "MY SPACE", items: [["Home", "home"], ["Feed", "feed"]] },
  { label: "INTELLIGENCE", items: [["Pulse", "pulse"], ["Analytics", "analytics"]] },
  {
    label: "LISTEN",
    items: [["Surveys", "surveys", "3"], ["Sentiment", "sentiment"], ["Always-on listening", "listening"]],
  },
  { label: "ENGAGE", items: [["Recognition", "recognition"], ["Campaigns", "campaigns"]] },
  { label: "OPERATIONS", items: [["Manager hub", "managers", "5"], ["Cases", "cases"]] },
  { label: "KNOWLEDGE", items: [["Knowledge", "knowledge"]] },
];

const ICONS = {
  home: '<path d="M3 9.2 10 3.5l7 5.7V16a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 16V9.2Z"/>',
  feed: '<rect x="3" y="4" width="14" height="12" rx="1.6"/><path d="M6 8h8M6 11h5"/>',
  pulse: '<path d="M2.5 10h3l2-5 3.5 10 2.5-6.5 1.5 1.5h2.5"/>',
  analytics: '<path d="M3.5 16.5v-5M8 16.5v-9M12.5 16.5v-6M17 16.5v-11"/>',
  surveys: '<rect x="4" y="3" width="12" height="14" rx="1.6"/><path d="M7 7.5h6M7 10.5h6M7 13.5h3"/>',
  sentiment: '<circle cx="10" cy="10" r="7"/><path d="M7.2 11.6a3.4 3.4 0 0 0 5.6 0M7.6 8h.01M12.4 8h.01"/>',
  listening: '<circle cx="10" cy="10" r="2"/><path d="M6.5 6.5a5 5 0 0 0 0 7M13.5 6.5a5 5 0 0 1 0 7"/>',
  recognition: '<path d="M10 13.2 6.2 15.4l.9-4.3L4 8.1l4.3-.5L10 3.7l1.7 3.9 4.3.5-3.1 3 .9 4.3Z"/>',
  campaigns: '<path d="M4 8v4h3l5 3.5v-11L7 8H4Z"/><path d="M15 8.2a3 3 0 0 1 0 3.6"/>',
  managers: '<circle cx="7.5" cy="7.5" r="2.5"/><path d="M3 16.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/><circle cx="14" cy="8.5" r="2"/><path d="M13 12.8c2 .2 3.5 1.6 3.5 3.7"/>',
  cases: '<rect x="3" y="6" width="14" height="10" rx="1.6"/><path d="M7.5 6V4.8A1.3 1.3 0 0 1 8.8 3.5h2.4a1.3 1.3 0 0 1 1.3 1.3V6"/>',
  knowledge: '<path d="M4 4.5h5a2 2 0 0 1 2 2v9a1.6 1.6 0 0 0-1.6-1.6H4v-9.4Z"/><path d="M16 4.5h-5a2 2 0 0 0-2 2v9a1.6 1.6 0 0 1 1.6-1.6H16v-9.4Z"/>',
  settings:
    '<circle cx="10" cy="10" r="2.4"/><path d="M10 3.2v1.6M10 15.2v1.6M16.8 10h-1.6M4.8 10H3.2M14.8 5.2l-1.1 1.1M6.3 13.7l-1.1 1.1M14.8 14.8l-1.1-1.1M6.3 6.3 5.2 5.2"/>',
};

const ico = (n, size = 18, sw = 1.5) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[n] || ICONS.home}</svg>`;

function sidebar(active) {
  const groups = NAV.map(
    (g) => `
    <div class="nav-g">
      <div class="nav-l">${g.label}</div>
      ${g.items
        .map(
          ([label, key, badge]) => `
        <a class="nav-i${key === active ? " on" : ""}">
          <span class="nav-ic">${ico(key)}</span><span class="nav-t">${esc(label)}</span>
          ${badge ? `<span class="nav-b">${badge}</span>` : ""}
        </a>`,
        )
        .join("")}
    </div>`,
  ).join("");

  return `<aside class="sb">
    <div class="sb-top">
      <span class="org-av"></span>
      <span class="org-t"><b>oliandhue</b><i>12,480 people</i></span>
      <span class="chev">${chevron()}</span>
    </div>
    <div class="brief">
      <span class="brief-dot"></span>
      <span class="brief-t"><b>Today’s AI briefing</b><i>3 new insights</i></span>
      <span class="brief-ar">→</span>
    </div>
    <nav class="nav">${groups}</nav>
    <div class="sb-foot">
      <a class="nav-i health"><span class="nav-ic">${ico("pulse")}</span><span class="nav-t">Health</span>
        <span class="hv">82</span><span class="hd">▲4</span></a>
      <a class="nav-i"><span class="nav-ic">${ico("settings")}</span><span class="nav-t">Settings</span></a>
    </div>
  </aside>`;
}

const chevron = () =>
  `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="m6 8 4 4 4-4"/></svg>`;

function topbar(crumbs) {
  const [a, b] = crumbs;
  return `<header class="tb">
    <div class="crumb"><span>${esc(a)}</span><em>/</em><b>${esc(b)}</b></div>
    <div class="search">
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="9" r="5.5"/><path d="m13.5 13.5 3 3" stroke-linecap="round"/></svg>
      <span>Search people, teams, insights</span><kbd>⌘K</kbd>
    </div>
    <div class="tb-r">
      <span class="pill-i">✦ Intelligence</span>
      <span class="tb-ic">${ico("settings", 17)}</span>
      <span class="tb-ic bell">${ico("listening", 17)}<i>3</i></span>
      <span class="tb-av"></span>${chevron()}
    </div>
  </header>`;
}

/* ------------------------------------------------------------- page head */
export function head({ eyebrow, title, lede, action, meta }) {
  return `<section class="card ph">
    <div class="ph-r">
      <div>
        ${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ""}
        <h1>${esc(title)}</h1>
        ${lede ? `<p class="lede">${esc(lede)}</p>` : ""}
      </div>
      <div class="ph-a">
        ${meta ? `<span class="meta">${esc(meta)}</span>` : ""}
        ${action ? `<span class="btn">${esc(action)}</span>` : ""}
      </div>
    </div>
  </section>`;
}

/** the four-up KPI strip used across the product */
export function stats(items) {
  return `<div class="stats">${items
    .map(
      (s) => `<div class="stat">
        <div class="stat-l">${esc(s.l)}</div>
        <div class="stat-v">${esc(s.v)}${s.sub ? `<i>${esc(s.sub)}</i>` : ""}</div>
        ${s.d ? `<div class="stat-d ${s.dir || "up"}">${esc(s.d)}</div>` : ""}
      </div>`,
    )
    .join("")}</div>`;
}

export function card(inner, cls = "") {
  return `<section class="card ${cls}">${inner}</section>`;
}

export function cardHead(title, right) {
  return `<div class="ch"><div><div class="ch-e">${esc(title.e || "")}</div><h2>${esc(
    title.t || title,
  )}</h2></div>${right ? `<div class="ch-r">${right}</div>` : ""}</div>`;
}

export function tabs(items, active = 0) {
  return `<div class="tabs">${items
    .map((t, i) => `<span class="tab${i === active ? " on" : ""}">${esc(t)}</span>`)
    .join("")}</div>`;
}

export function seg(items, active = 0) {
  return `<div class="seg">${items
    .map((t, i) => `<span class="${i === active ? "on" : ""}">${esc(t)}</span>`)
    .join("")}</div>`;
}

export function badge(text, tone = "neutral") {
  return `<span class="bdg ${tone}">${esc(text)}</span>`;
}

export function table(cols, rows) {
  return `<table class="tbl"><thead><tr>${cols
    .map((c) => `<th${c.r ? ' class="r"' : ""}>${esc(c.t || c)}</th>`)
    .join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c, i) => `<td${cols[i]?.r ? ' class="r"' : ""}>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

/** horizontal meter — the shape used for drivers, participation, progress */
export function meter(pct, tone = "brand", w = 100) {
  return `<span class="mtr" style="width:${w}px"><i style="width:${pct}%;background:${
    { brand: T.brand, success: T.success, danger: T.danger, warning: T.warning, blue: T.blue }[tone] || T.brand
  }"></i></span>`;
}

export function bars(data, { h = 132, tone = T.brand } = {}) {
  const max = Math.max(...data.map((d) => d.v));
  return `<div class="bars" style="height:${h}px">${data
    .map(
      (d) =>
        `<span class="bar"><i style="height:${Math.round((d.v / max) * 100)}%;background:${
          d.tone || tone
        }"></i><em>${esc(d.l)}</em></span>`,
    )
    .join("")}</div>`;
}

/** sparkline / trend line as an inline SVG path */
export function line(series, { w = 640, h = 150, tone = T.success, fill = true } = {}) {
  const max = Math.max(...series) * 1.12;
  const min = Math.min(...series) * 0.9;
  const pts = series.map((v, i) => [
    (i / (series.length - 1)) * w,
    h - ((v - min) / (max - min || 1)) * h,
  ]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${d} L${w} ${h} L0 ${h} Z`;
  return `<svg class="ln" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    ${fill ? `<path d="${area}" fill="${tone}" opacity=".10"/>` : ""}
    <path d="${d}" fill="none" stroke="${tone}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

export function donut(pct, label, tone = T.brand) {
  const r = 46, c = 2 * Math.PI * r;
  return `<div class="dn"><svg viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="${T.track}" stroke-width="13"/>
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="${tone}" stroke-width="13" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}" transform="rotate(-90 60 60)"/>
  </svg><b>${esc(label)}</b></div>`;
}

/** the team × tenure style grid */
export function heat(colLabels, rows) {
  const cell = (v) => {
    const t = v >= 80 ? T.successSoft : v >= 70 ? "#eaf7f0" : v >= 62 ? T.warningSoft : T.dangerSoft;
    const ink = v >= 80 ? T.success : v >= 70 ? T.success : v >= 62 ? T.warning : T.danger;
    return `<td><span class="hc" style="background:${t};color:${ink}">${v}</span></td>`;
  };
  return `<table class="hm"><thead><tr><th></th>${colLabels
    .map((c) => `<th>${esc(c)}</th>`)
    .join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr><th>${esc(r.l)}</th>${r.v.map(cell).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

export function aiNote(title, body, cta = "Ask Vadal") {
  return `<div class="ai">
    <div class="ai-e">✦ VADAL SUGGESTS</div>
    <div class="ai-t">${esc(title)}</div>
    <p>${esc(body)}</p>
    <div class="ai-b"><span class="btn sm">${esc(cta)}</span><span class="btn2 sm">Why this?</span></div>
  </div>`;
}

export function rows(list) {
  return `<div class="rws">${list
    .map(
      (r) => `<div class="rw">
      ${r.av ? `<span class="av" style="background:${r.avc || T.brandSoft};color:${T.brandStrong}">${esc(r.av)}</span>` : ""}
      ${r.ic ? `<span class="rw-ic">${r.ic}</span>` : ""}
      <span class="rw-m"><b>${esc(r.t)}</b>${r.s ? `<i>${esc(r.s)}</i>` : ""}</span>
      ${r.right || ""}
    </div>`,
    )
    .join("")}</div>`;
}

/* --------------------------------------------------------------- page CSS */
import { EXTRA_CSS } from "./archetypes.mjs";

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1600px;height:1000px;overflow:hidden}
body{font:400 14px/1.45 Inter,system-ui,sans-serif;color:${T.ink};background:${T.canvas};
  -webkit-font-smoothing:antialiased;display:flex}
svg{display:block}

/* sidebar */
.sb{width:293px;flex:0 0 293px;height:1000px;background:${T.white};border-right:1px solid ${T.line};
  display:flex;flex-direction:column;padding:16px 14px 14px}
.sb-top{display:flex;align-items:center;gap:9px;padding:7px 8px;border:1px solid ${T.line};border-radius:12px}
.org-av{width:28px;height:28px;border-radius:50%;flex:0 0 28px;
  background:conic-gradient(from 200deg,${T.coral},${T.brand},${T.blue},${T.teal},${T.coral})}
.org-t{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.25}
.org-t b{font-weight:600;font-size:13px}
.org-t i{font-style:normal;font-size:11px;color:${T.faint}}
.chev{color:${T.faint};display:flex}
.brief{display:flex;align-items:center;gap:9px;margin-top:10px;padding:8px 10px;border-radius:12px;background:${T.brandSoft}}
.brief-dot{width:22px;height:22px;border-radius:50%;flex:0 0 22px;
  background:conic-gradient(from 160deg,${T.teal},${T.blue},${T.brand},${T.teal})}
.brief-t{flex:1;display:flex;flex-direction:column;line-height:1.25}
.brief-t b{font-weight:600;font-size:12.5px;color:${T.brandStrong}}
.brief-t i{font-style:normal;font-size:11px;color:${T.brandStrong};opacity:.7}
.brief-ar{color:${T.brandStrong};font-size:13px}
.nav{margin-top:14px;flex:1;overflow:hidden}
.nav-g{margin-bottom:13px}
.nav-l{font-size:10.5px;font-weight:600;letter-spacing:.1em;color:${T.faint};padding:0 10px 6px}
.nav-i{display:flex;align-items:center;gap:11px;padding:8px 10px;border-radius:10px;color:${T.muted};font-size:13.5px}
.nav-i.on{background:${T.soft};color:${T.ink};font-weight:600}
.nav-ic{display:flex;color:currentColor;opacity:.85}
.nav-t{flex:1}
.nav-b{font-size:10.5px;color:${T.faint}}
.sb-foot{border-top:1px solid ${T.line};padding-top:9px}
.nav-i.health{border:1px solid ${T.line};border-radius:12px;padding:9px 10px;margin-bottom:6px}
.nav-i.health .nav-ic{background:${T.successSoft};color:${T.success};width:26px;height:26px;border-radius:8px;display:grid;place-items:center}
.health .hv{font-weight:700;font-size:12.5px;color:${T.ink}}
.health .hd{font-size:10.5px;color:${T.success};margin-left:4px}

/* topbar + canvas */
.main{flex:1;min-width:0;height:1000px;display:flex;flex-direction:column;background:${T.canvas}}
.tb{height:71px;flex:0 0 71px;display:flex;align-items:center;gap:18px;padding:0 22px;
  border-bottom:1px solid ${T.line};background:${T.white}}
.crumb{font-size:13px;color:${T.faint};display:flex;gap:7px;align-items:center}
.crumb b{color:${T.ink};font-weight:600}
.crumb em{font-style:normal;opacity:.6}
.search{margin-left:auto;display:flex;align-items:center;gap:9px;width:430px;height:38px;padding:0 12px;
  border:1px solid ${T.line};border-radius:999px;color:${T.faint};font-size:12.5px;background:${T.canvas}}
.search span{flex:1}
.search kbd{font:inherit;font-size:11px;color:${T.faint}}
.tb-r{display:flex;align-items:center;gap:12px;color:${T.faint}}
.pill-i{font-size:12.5px;font-weight:600;color:${T.ink};background:${T.white};border:1px solid ${T.line};
  padding:7px 14px;border-radius:999px}
.tb-ic{display:flex;position:relative}
.tb-ic i{position:absolute;top:-4px;right:-5px;background:${T.signal};color:#fff;font-style:normal;
  font-size:9px;font-weight:700;min-width:14px;height:14px;border-radius:999px;display:grid;place-items:center;padding:0 3px}
.tb-av{width:28px;height:28px;border-radius:50%;
  background:conic-gradient(from 40deg,${T.blue},${T.brand},${T.coral},${T.blue})}

.body{flex:1;padding:22px;overflow:hidden;display:flex;flex-direction:column;gap:14px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;min-height:0}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;min-height:0}
.g-21{display:grid;grid-template-columns:1.55fr 1fr;gap:14px;min-height:0}
.g-12{display:grid;grid-template-columns:1fr 1.55fr;gap:14px;min-height:0}
.flex1{flex:1;min-height:0}
/* cards inside a stretched row must fill it, or a short chart leaves a band of
   dead canvas at the foot of the screen that the real exports never have */
.flex1>.card,.grid2>.card,.grid3>.card,.g-21>.card,.g-12>.card{display:flex;flex-direction:column}
.flex1>.card>.ln,.g-21>.card>.ln,.g-12>.card>.ln,.grid2>.card>.ln{flex:1;height:auto;min-height:0}
.flex1>.card>.rws,.g-21>.card>.rws,.g-12>.card>.rws,.grid2>.card>.rws,.grid3>.card>.rws{flex:1;min-height:0}
.flex1>.card>.tbl,.g-21>.card>.tbl,.g-12>.card>.tbl{flex:0 0 auto}
.flex1>.card>.bars,.g-21>.card>.bars,.g-12>.card>.bars{flex:1;height:auto!important;min-height:0}
.grow{flex:1;min-height:0}
.spread{display:flex;flex-direction:column;justify-content:space-between;flex:1;min-height:0}
.rws.even .rw{flex:1}
${EXTRA_CSS}

/* card */
.card{background:${T.white};border:1px solid ${T.line};border-radius:20px;padding:22px 26px;overflow:hidden}
.ph h1{font-size:29px;font-weight:700;letter-spacing:-.02em;line-height:1.15}
.ph .lede{color:${T.muted};font-size:13.5px;margin-top:6px;max-width:660px}
.ph-r{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}
.ph-a{display:flex;align-items:center;gap:10px;flex:0 0 auto}
.eyebrow{font-size:10.5px;font-weight:600;letter-spacing:.1em;color:${T.faint};margin-bottom:7px}
.meta{font-size:12px;color:${T.faint}}
.btn{background:${T.brand};color:#fff;font-size:12.5px;font-weight:600;padding:8px 14px;border-radius:9px;white-space:nowrap}
.btn.sm{padding:6px 11px;font-size:12px}
.btn2{background:${T.white};border:1px solid ${T.line};color:${T.ink};font-size:12.5px;font-weight:600;
  padding:8px 13px;border-radius:9px;white-space:nowrap}
.btn2.sm{padding:5px 10px;font-size:12px}
.ch{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:14px}
.ch-e{font-size:10.5px;font-weight:600;letter-spacing:.1em;color:${T.faint};margin-bottom:5px}
.ch h2{font-size:16px;font-weight:700;letter-spacing:-.01em}
.ch-r{display:flex;align-items:center;gap:8px;flex:0 0 auto}

/* stats */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:${T.white};
  border:1px solid ${T.line};border-radius:20px;padding:20px 26px}
.stats .stat+.stat{border-left:1px solid ${T.line};padding-left:20px}
.stat-l{font-size:10.5px;font-weight:600;letter-spacing:.09em;color:${T.faint}}
.stat-v{font-size:31px;font-weight:700;letter-spacing:-.02em;margin-top:5px;line-height:1}
.stat-v i{font-style:normal;font-size:12px;color:${T.faint};font-weight:500;margin-left:4px}
.stat-d{font-size:11.5px;font-weight:600;margin-top:5px}
.stat-d.up{color:${T.success}} .stat-d.dn{color:${T.danger}} .stat-d.flat{color:${T.faint}}

/* tabs / segmented */
.tabs{display:flex;gap:20px;border-bottom:1px solid ${T.line};margin-bottom:14px}
.tab{font-size:13px;color:${T.muted};padding-bottom:9px}
.tab.on{color:${T.ink};font-weight:600;box-shadow:inset 0 -2px 0 ${T.ink}}
.seg{display:inline-flex;background:${T.soft};border-radius:9px;padding:3px}
.seg span{font-size:12px;padding:5px 11px;border-radius:7px;color:${T.muted}}
.seg span.on{background:${T.white};color:${T.ink};font-weight:600;box-shadow:0 1px 2px rgba(10,10,12,.06)}

/* badge */
.bdg{display:inline-block;font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px;white-space:nowrap}
.bdg.neutral{background:${T.soft};color:${T.muted}}
.bdg.brand{background:${T.brandSoft};color:${T.brandStrong}}
.bdg.success{background:${T.successSoft};color:${T.success}}
.bdg.danger{background:${T.dangerSoft};color:${T.danger}}
.bdg.warning{background:${T.warningSoft};color:${T.warning}}
.bdg.info{background:${T.infoSoft};color:${T.info}}

/* table */
.tbl{width:100%;border-collapse:collapse;font-size:13px}
.tbl th{font-size:10.5px;font-weight:600;letter-spacing:.08em;color:${T.faint};text-align:left;
  padding:0 0 9px;border-bottom:1px solid ${T.line}}
.tbl td{padding:11px 0;border-bottom:1px solid ${T.line};vertical-align:middle}
.tbl tr:last-child td{border-bottom:0}
.tbl .r{text-align:right}
.tbl b{font-weight:600}
.sub{display:block;font-size:11.5px;color:${T.faint};margin-top:2px}

/* meter + charts */
.mtr{display:inline-block;height:6px;border-radius:999px;background:${T.track};overflow:hidden;vertical-align:middle}
.mtr i{display:block;height:100%;border-radius:999px}
.bars{display:flex;align-items:flex-end;gap:10px}
.bar{flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%;gap:7px}
.bar i{display:block;width:100%;border-radius:5px 5px 3px 3px;min-height:3px}
.bar em{font-style:normal;font-size:10.5px;color:${T.faint};text-align:center}
.ln{width:100%;height:150px}
.dn{position:relative;width:120px;height:120px}
.dn svg{width:120px;height:120px}
.dn b{position:absolute;inset:0;display:grid;place-items:center;font-size:22px;font-weight:700}

/* heatmap */
.hm{width:100%;border-collapse:separate;border-spacing:5px}
.hm th{font-size:10.5px;font-weight:600;color:${T.faint};text-align:left;padding:0 2px}
.hm thead th{text-align:center}
.hm tbody th{width:96px}
.hc{display:block;text-align:center;font-size:12px;font-weight:600;padding:7px 0;border-radius:7px}

/* AI note */
.ai{background:${T.brandSoft};border-radius:14px;padding:15px 17px}
.ai-e{font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.brandStrong};margin-bottom:7px}
.ai-t{font-size:15px;font-weight:700;letter-spacing:-.01em}
.ai p{font-size:12.5px;color:${T.muted};margin-top:6px;line-height:1.5}
.ai-b{display:flex;gap:8px;margin-top:11px}

/* rows */
.rws{display:flex;flex-direction:column}
.rw{display:flex;align-items:center;gap:11px;padding:10px 0;border-bottom:1px solid ${T.line}}
.rw:last-child{border-bottom:0}
.rw-ic{width:30px;height:30px;border-radius:9px;background:${T.soft};display:grid;place-items:center;
  flex:0 0 30px;font-size:14px}
.av{width:30px;height:30px;border-radius:50%;flex:0 0 30px;display:grid;place-items:center;
  font-size:11px;font-weight:700}
.rw-m{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.3}
.rw-m b{font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rw-m i{font-style:normal;font-size:11.5px;color:${T.faint};margin-top:2px}
.muted{color:${T.muted}} .faint{color:${T.faint}}
.num{font-variant-numeric:tabular-nums}
`;

export function page({ crumbs, active, body }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="fonts/inter.css">
<style>${CSS}</style></head><body>
${sidebar(active)}
<div class="main">${topbar(crumbs)}<div class="body">${body}</div></div>
</body></html>`;
}

/* ---------------------------------------------------------------- mobile */
/* Portrait device frame for the six "Mobile ..." slots. Same tokens, and the
   §6 grid contains rather than crops it, so it reads as a phone on a plate. */
export function phone({ title, body }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="fonts/inter.css">
<style>${CSS}
html,body{width:1600px;height:1000px}
body{display:grid;place-items:center;background:linear-gradient(135deg,#d9f7f1,#dceaff 52%,#ece5ff)}
.dev{width:430px;height:880px;background:${T.white};border-radius:44px;padding:12px;
  box-shadow:0 40px 80px -30px rgba(10,10,12,.42),0 0 0 10px #101014,0 0 0 11px #2a2a32}
.scr{width:100%;height:100%;border-radius:33px;overflow:hidden;background:${T.canvas};
  display:flex;flex-direction:column}
.mst{height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 22px;
  font-size:12.5px;font-weight:600;flex:0 0 44px}
.mhd{padding:6px 18px 12px;flex:0 0 auto}
.mhd h1{font-size:22px;font-weight:700;letter-spacing:-.02em}
.mhd p{font-size:12.5px;color:${T.muted};margin-top:4px}
.mbd{flex:1;padding:0 14px 12px;display:flex;flex-direction:column;gap:10px;overflow:hidden}
.mbd .card{border-radius:14px;padding:14px}
.mtb{height:62px;flex:0 0 62px;border-top:1px solid ${T.line};display:flex;align-items:center;
  justify-content:space-around;background:${T.white};padding-bottom:6px}
.mtb span{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:9.5px;color:${T.faint}}
.mtb span.on{color:${T.brandStrong};font-weight:600}
</style></head><body>
<div class="dev"><div class="scr">
  <div class="mst"><span>9:41</span><span>▮▮▮ ᯤ ▉</span></div>
  <div class="mhd"><h1>${esc(title.t)}</h1><p>${esc(title.s)}</p></div>
  <div class="mbd">${body}</div>
  <div class="mtb">
    <span class="on">${ico("home", 20)}Home</span><span>${ico("feed", 20)}Feed</span>
    <span>${ico("surveys", 20)}Surveys</span><span>${ico("recognition", 20)}Praise</span>
    <span>${ico("managers", 20)}Me</span>
  </div>
</div></div></body></html>`;
}

export { esc, ico };
