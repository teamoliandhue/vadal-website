/* Layout archetypes. Every generated screen is one of these filled with its own
   content, which is what keeps 84 screens looking like one product rather than
   84 separate inventions. */
import * as k from "./kit.mjs";
import { T } from "./tokens.mjs";

export const av = (n, c) => ({ av: n, avc: c });
export const AVC = ["#e8e3fe", "#dff0ff", "#e2f7ee", "#fde9e2", "#fdf1dd", "#e9f2ff"];
export const ini = (name) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

export function person(name, role, right, i = 0) {
  return { av: ini(name), avc: AVC[i % AVC.length], t: name, s: role, right };
}

/** head + KPI strip + a wide-left / narrow-right pair */
export function dash({ crumbs, active, head, stats, left, right }) {
  return k.page({
    crumbs,
    active,
    body: `${k.head(head)}${stats ? k.stats(stats) : ""}
      <div class="g-21 flex1">${left}${right}</div>`,
  });
}

/** head + a single full-bleed working surface */
export function full({ crumbs, active, head, body, stats }) {
  return k.page({
    crumbs,
    active,
    body: `${k.head(head)}${stats ? k.stats(stats) : ""}<div class="flex1">${body}</div>`,
  });
}

/** head + two equal panels */
export function pair({ crumbs, active, head, a, b, stats }) {
  return k.page({
    crumbs,
    active,
    body: `${k.head(head)}${stats ? k.stats(stats) : ""}<div class="grid2 flex1">${a}${b}</div>`,
  });
}

/** narrow left rail + wide canvas — builders, config, settings */
export function rail({ crumbs, active, head, rail: r, canvas, stats }) {
  return k.page({
    crumbs,
    active,
    body: `${k.head(head)}${stats ? k.stats(stats) : ""}
      <div class="g-12 flex1">${r}${canvas}</div>`,
  });
}

/* --------------------------------------------------------------- blocks */

/** the left-hand list of steps/sections used by builders and settings */
export function navList(title, items) {
  return k.card(
    `<div class="ch"><div><h2>${title}</h2></div></div>
     <div class="rws">${items
       .map(
         (it, i) =>
           `<div class="rw" style="${
             it.on ? `background:${T.brandSoft};border-radius:10px;padding-left:10px;padding-right:10px;border-bottom:0` : ""
           }">
        <span class="rw-ic" style="background:${it.on ? "#fff" : T.soft}">${it.ic || i + 1}</span>
        <span class="rw-m"><b>${it.t}</b>${it.s ? `<i>${it.s}</i>` : ""}</span>
        ${it.right || ""}</div>`,
       )
       .join("")}</div>`,
  );
}

/** toggle rows — guardrails, notifications, connector options */
export function toggles(items) {
  return `<div class="rws even">${items
    .map(
      (t) => `<div class="rw">
      <span class="rw-m"><b>${t.t}</b><i>${t.s}</i></span>
      <span class="sw ${t.on === false ? "off" : "on"}"><i></i></span>
    </div>`,
    )
    .join("")}</div>`;
}

/** kanban columns */
export function board(cols) {
  return `<div class="kb">${cols
    .map(
      (c) => `<div class="kb-c">
      <div class="kb-h">${c.t}<span>${c.items.length}</span></div>
      ${c.items
        .map(
          (i) => `<div class="kb-i">
          <div class="kb-t">${i.t}</div>
          <div class="kb-m">${i.b || ""}<span class="av sm" style="background:${
            AVC[(i.n || 0) % AVC.length]
          };color:${T.brandStrong}">${i.who || "PR"}</span></div>
        </div>`,
        )
        .join("")}
    </div>`,
    )
    .join("")}</div>`;
}

/** a stepped timeline — journeys, roadmaps, lifecycle */
export function timeline(items) {
  return `<div class="tl">${items
    .map(
      (i) => `<div class="tl-i ${i.state || ""}">
      <span class="tl-d"></span>
      <div class="tl-c">
        <div class="tl-t">${i.t}<span class="bdg ${i.tone || "neutral"}">${i.tag || ""}</span></div>
        <div class="tl-s">${i.s}</div>
      </div>
    </div>`,
    )
    .join("")}</div>`;
}

/** a chat thread */
export function chat(msgs) {
  return `<div class="ct">${msgs
    .map(
      (m) =>
        m.me
          ? `<div class="ct-m me">${m.t}</div>`
          : `<div class="ct-m ai"><span class="ct-av">✦</span><div><b>Vadal</b>${m.t}${
              m.src ? `<span class="ct-src">📄 ${m.src}</span>` : ""
            }</div></div>`,
    )
    .join("")}<div class="ct-in">Ask anything…<span class="ct-go">↑</span></div></div>`;
}

/** directory / catalogue tiles */
export function tiles(items, cols = 3) {
  return `<div class="tg" style="grid-template-columns:repeat(${cols},1fr)">${items
    .map(
      (i) => `<div class="tg-i">
      <span class="tg-ic" style="background:${i.bg || T.soft}">${i.ic || "◆"}</span>
      <b>${i.t}</b><i>${i.s}</i>
      ${i.tag ? `<span class="bdg ${i.tone || "neutral"}">${i.tag}</span>` : ""}
    </div>`,
    )
    .join("")}</div>`;
}

export const EXTRA_CSS = `
.fld{margin-bottom:14px}
.fld label{display:block;font-size:11px;font-weight:600;letter-spacing:.06em;color:${T.faint};margin-bottom:6px}
.inp{border:1px solid ${T.line};border-radius:11px;padding:12px 14px;font-size:13px;color:${T.ink};background:#fff}
.inp.tall{min-height:132px;line-height:1.6;color:${T.muted}}
.pill-row{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:1px solid ${T.line};border-radius:999px;padding:6px 13px;font-size:12px;color:${T.muted}}
.chip.on{background:${T.brandSoft};border-color:transparent;color:${T.brandStrong};font-weight:600}
.kv{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid ${T.line};font-size:13px}
.kv:last-child{border-bottom:0}
.kv b{font-weight:600}
.big{font-size:44px;font-weight:700;letter-spacing:-.03em;line-height:1}
.split2{display:grid;grid-template-columns:1fr 1fr;gap:22px}

.sw{width:36px;height:21px;border-radius:999px;flex:0 0 36px;position:relative;background:${T.strong}}
.sw.on{background:${T.brand}}
.sw i{position:absolute;top:2.5px;left:2.5px;width:16px;height:16px;border-radius:50%;background:#fff}
.sw.on i{left:17.5px}
.kb{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;height:100%}
.kb-c{background:${T.soft};border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:9px;min-height:0}
.kb-h{font-size:11.5px;font-weight:700;letter-spacing:.05em;color:${T.muted};display:flex;justify-content:space-between}
.kb-h span{color:${T.faint};font-weight:600}
.kb-i{background:#fff;border:1px solid ${T.line};border-radius:11px;padding:11px}
.kb-t{font-size:12.5px;font-weight:600;line-height:1.35}
.kb-m{display:flex;align-items:center;justify-content:space-between;margin-top:9px;font-size:11px;color:${T.faint}}
.av.sm{width:23px;height:23px;flex:0 0 23px;font-size:9.5px}
.tl{position:relative;padding-left:26px;flex:1;display:flex;flex-direction:column;justify-content:space-between}
.tl:before{content:"";position:absolute;left:7px;top:6px;bottom:6px;width:2px;background:${T.track}}
.tl-i{position:relative;padding:3px 0}
.tl-d{position:absolute;left:-24px;top:7px;width:14px;height:14px;border-radius:50%;background:#fff;
  border:2.5px solid ${T.strong}}
.tl-i.done .tl-d{background:${T.success};border-color:${T.success}}
.tl-i.now .tl-d{border-color:${T.brand};box-shadow:0 0 0 4px ${T.brandSoft}}
.tl-t{font-size:13.5px;font-weight:600;display:flex;align-items:center;gap:9px}
.tl-s{font-size:12px;color:${T.faint};margin-top:2px}
.ct{display:flex;flex-direction:column;gap:12px;flex:1;min-height:0}
.ct-m{max-width:78%;font-size:13px;line-height:1.55}
.ct-m.me{align-self:flex-end;background:${T.brand};color:#fff;padding:11px 15px;border-radius:16px 16px 4px 16px}
.ct-m.ai{display:flex;gap:11px}
.ct-m.ai>div{background:${T.soft};padding:12px 15px;border-radius:16px 16px 16px 4px;flex:1}
.ct-m.ai b{display:block;font-size:11.5px;color:${T.brandStrong};margin-bottom:4px}
.ct-av{width:28px;height:28px;border-radius:50%;flex:0 0 28px;display:grid;place-items:center;color:#fff;
  font-size:13px;background:linear-gradient(135deg,${T.teal},${T.brand})}
.ct-src{display:inline-block;margin-top:9px;font-size:11.5px;color:${T.muted};background:#fff;
  border:1px solid ${T.line};border-radius:7px;padding:4px 9px}
.ct-in{margin-top:auto;border:1px solid ${T.line};border-radius:12px;padding:12px 14px;color:${T.faint};
  font-size:13px;display:flex;align-items:center}
.ct-go{margin-left:auto;width:26px;height:26px;border-radius:50%;background:${T.brand};color:#fff;
  display:grid;place-items:center;font-size:13px}
.tg{display:grid;gap:12px}
.tg-i{border:1px solid ${T.line};border-radius:14px;padding:15px;display:flex;flex-direction:column;gap:4px}
.tg-ic{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font-size:16px;margin-bottom:6px}
.tg-i b{font-size:13.5px;font-weight:600}
.tg-i i{font-style:normal;font-size:11.5px;color:${T.faint};line-height:1.45}
.tg-i .bdg{align-self:flex-start;margin-top:7px}
.legend{display:flex;gap:16px;font-size:11.5px;color:${T.faint};margin-top:12px}
.legend b{font-weight:500;display:flex;align-items:center;gap:6px}
.legend i{width:9px;height:9px;border-radius:3px;display:block}
`;
