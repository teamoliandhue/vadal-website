import * as k from "./kit.mjs";
import { T } from "./tokens.mjs";
import * as a from "./archetypes.mjs";

const { card, cardHead, stats, head, table, meter, bars, line, donut, heat, aiNote, rows, seg, tabs, badge } = k;
const S = [];
const add = (slug, file, html) => S.push({ slug, file, html });
const P = a.person;
const num = (v) => `<b class="num">${v}</b>`;

/* ═════════════════════════════════════════════ employee-communication (4) */
add("employee-communication", "announcement-composer", () =>
  a.rail({
    crumbs: ["Engage", "Campaigns"], active: "campaigns",
    head: { eyebrow: "ENGAGE", title: "New announcement", lede: "Write once. Vadal adapts tone and channel per audience, then tells you who actually read it.", action: "Send", meta: "Draft saved" },
    rail: a.navList("Steps", [
      { t: "Audience", s: "All org · 12,480", ic: "1", on: true },
      { t: "Message", s: "Subject and body", ic: "2" },
      { t: "Channels", s: "Email, Slack, mobile", ic: "3" },
      { t: "Schedule", s: "Tue 9 Jun, 09:00", ic: "4" },
      { t: "Review", s: "Readability B+", ic: "5" },
    ]),
    canvas: card(
      cardHead({ e: "COMPOSE", t: "Return-to-office update" }, seg(["Write", "Preview"], 0)) +
      `<div class="fld"><label>Subject</label><div class="inp">Three days in office from July — what changes</div></div>
       <div class="fld"><label>Body</label><div class="inp tall">Team — from 1 July we are moving to three days in the office, with Wednesday as the anchor day for everyone. Nothing changes for our fully-remote roles.<br><br>We heard two things clearly in the last pulse: people want fewer meeting-heavy days and more notice on changes. This gives four weeks' notice, and Wednesdays will be kept meeting-light.</div></div>` +
      aiNote("Soften the second paragraph for Plant Ops", "Return-to-office is the fastest-rising negative theme in Plant Ops (154 mentions). A shorter, more concrete version tests better with shift-based teams.", "Rewrite for this audience"),
    ),
  }));

add("employee-communication", "communication-analytics", () =>
  a.dash({
    crumbs: ["Engage", "Campaigns"], active: "campaigns",
    head: { eyebrow: "ENGAGE · ANALYTICS", title: "Communication analytics", lede: "Who opened it, who acted on it, and which channel actually reached the frontline.", action: "Export", meta: "Last 30 days" },
    stats: [
      { l: "REACH", v: "10.4K", sub: "84%", d: "▲ 6 pts" },
      { l: "READ RATE", v: "71%", d: "▲ 4 pts" },
      { l: "ACTION TAKEN", v: "38%", d: "▲ 9 pts" },
      { l: "NO EMAIL REACHED", v: "2,140", d: "via SMS & WhatsApp", dir: "flat" },
    ],
    left: card(cardHead({ e: "BY CHANNEL", t: "Where it landed" }, seg(["30d", "90d"], 0)) +
      bars([
        { l: "Email", v: 71 }, { l: "Slack", v: 84, tone: T.blue }, { l: "Teams", v: 66, tone: T.blue },
        { l: "Mobile app", v: 78, tone: T.teal }, { l: "SMS", v: 92, tone: T.teal },
        { l: "WhatsApp", v: 88, tone: T.teal }, { l: "Digital signage", v: 41, tone: T.strong },
      ]) +
      `<div class="legend"><b><i style="background:${T.brand}"></i>Desk-based</b><b><i style="background:${T.teal}"></i>Frontline</b><b><i style="background:${T.strong}"></i>Passive</b></div>`),
    right: card(cardHead({ e: "TOP SENDS", t: "Recent announcements" }) + rows([
      { t: "Return-to-office update", s: "All org · 9 Jun", right: badge("71% read", "success") },
      { t: "Q3 all-hands invite", s: "All org · 2 Jun", right: badge("83% read", "success") },
      { t: "Night-shift roster change", s: "Plant Ops · 28 May", right: badge("44% read", "warning") },
      { t: "Benefits window opens", s: "All org · 21 May", right: badge("66% read", "success") },
      { t: "Safety refresher", s: "Logistics · 14 May", right: badge("38% read", "danger") },
    ])),
  }));

add("employee-communication", "ai-communication-copilot", () =>
  a.pair({
    crumbs: ["Engage", "Campaigns"], active: "campaigns",
    head: { eyebrow: "ENGAGE · COPILOT", title: "AI communication copilot", lede: "Drafts the message, picks the channel mix, and flags the audience most likely to miss it." },
    a: card(cardHead({ e: "CONVERSATION", t: "Ask the copilot" }) + a.chat([
      { me: true, t: "Draft a note about the new three-day office policy." },
      { t: "Here is a draft aimed at all 12,480 people, written at a grade-8 reading level. I have kept it to 140 words because open-through rates fall sharply past 200 on mobile.", src: "Comms tone guide · v4" },
      { me: true, t: "Will it reach the plant teams?" },
      { t: "Not on email alone — 2,140 people in Plant Ops and Logistics have no company inbox. I would add SMS and WhatsApp, which reached 92% and 88% of that group last month.", src: "Channel coverage · 30d" },
    ])),
    b: card(cardHead({ e: "SUGGESTED PLAN", t: "Before you send" }) + rows([
      { ic: "①", t: "Split by audience", s: "Desk-based and frontline read differently", right: badge("Recommended", "brand") },
      { ic: "②", t: "Add SMS + WhatsApp", s: "Reaches 2,140 with no company email", right: badge("Recommended", "brand") },
      { ic: "③", t: "Shorten to 140 words", s: "Currently 212 — mobile drop-off risk", right: badge("Applied", "success") },
      { ic: "④", t: "Move to Tuesday 09:00", s: "Best read window for this org", right: badge("Applied", "success") },
      { ic: "⑤", t: "Translate to 4 languages", s: "Hindi, Spanish, Polish, Tagalog", right: badge("Optional", "neutral") },
    ]) + aiNote("Predicted read rate 74%", "Six points above your 30-day average, driven mostly by the channel split rather than the copy.", "Apply all")),
  }));

add("employee-communication", "mobile-employee-app", () =>
  k.phone({
    title: { t: "Company feed", s: "Everything that matters today" },
    body:
      `<div class="card" style="background:${T.brandSoft};border-color:transparent">
        <div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.brandStrong}">✦ FOR YOU</div>
        <div style="font-size:15px;font-weight:700;margin-top:6px;line-height:1.3">Three days in office from July</div>
        <p style="font-size:12px;color:${T.muted};margin-top:5px;line-height:1.5">Wednesday is the anchor day. Nothing changes for remote roles.</p>
        <div style="margin-top:10px"><span class="btn sm">Read update</span></div>
      </div>` +
      k.card(`<div style="display:flex;align-items:center;gap:9px">
        <span class="av" style="background:#fde9e2;color:${T.brandStrong}">AR</span>
        <span class="rw-m"><b>Arjun Rao</b><i>3 years at oliandhue 🎉</i></span></div>
        <div style="display:flex;gap:14px;margin-top:11px;font-size:11.5px;color:${T.faint}">
        <span>❤️ 312</span><span>💬 41</span><span>↗ Share</span></div>`) +
      k.card(`<div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.faint}">THIS WEEK</div>
        <div style="font-size:13.5px;font-weight:600;margin-top:7px">Pulse survey · 4 questions</div>
        <p style="font-size:12px;color:${T.muted};margin-top:4px">Takes about 40 seconds. Confidential.</p>
        <div style="margin-top:10px"><span class="btn2 sm">Start</span></div>`),
  }));

/* ══════════════════════════════════════════════════ employee-experience (5) */
add("employee-experience", "employee-journey-map-dashboard", () =>
  a.dash({
    crumbs: ["My space", "Home"], active: "home",
    head: { eyebrow: "EXPERIENCE", title: "Employee journey map", lede: "Every stage from offer to alumni, scored on what people actually said at that moment.", action: "Configure", meta: "12,480 people" },
    stats: [
      { l: "STRONGEST STAGE", v: "Onboarding", sub: "86", d: "▲ 3 pts" },
      { l: "WEAKEST STAGE", v: "Year two", sub: "58", d: "▼ 5 pts", dir: "dn" },
      { l: "STAGES TRACKED", v: "9" },
      { l: "MOMENTS CAPTURED", v: "41.2K", d: "▲ 12%" },
    ],
    left: card(cardHead({ e: "LIFECYCLE", t: "Score at each stage" }) + bars([
      { l: "Offer", v: 82 }, { l: "Pre-board", v: 79 }, { l: "Day one", v: 88, tone: T.success },
      { l: "30 days", v: 86, tone: T.success }, { l: "90 days", v: 77 }, { l: "Year one", v: 71 },
      { l: "Year two", v: 58, tone: T.danger }, { l: "Promotion", v: 74 }, { l: "Exit", v: 66, tone: T.warning },
    ])),
    right: card(cardHead({ e: "NEEDS ATTENTION", t: "Year two" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">The steepest drop in the journey. Sentiment falls 13 points between month 14 and month 22, concentrated in Engineering and Support.</p>` +
      rows([
        { t: "Career path unclear", s: "142 mentions", right: badge("Rising", "danger") },
        { t: "No stretch work", s: "98 mentions", right: badge("Rising", "danger") },
        { t: "Pay band clarity", s: "76 mentions", right: badge("Flat", "neutral") },
      ]) + aiNote("Add a 18-month career conversation", "Teams that ran one saw year-two sentiment recover 9 points within a quarter.", "Draft the plan")),
  }));

add("employee-experience", "onboarding-portal", () =>
  a.rail({
    crumbs: ["My space", "Home"], active: "home",
    head: { eyebrow: "ONBOARDING", title: "Welcome, Priya", lede: "Your first 30 days, in one place. Nine of fourteen tasks done.", meta: "Day 6 of 30" },
    rail: card(cardHead({ e: "PROGRESS", t: "Your checklist" }) +
      `<div style="display:grid;place-items:center;padding:6px 0 14px">${donut(64, "64%", T.brand)}</div>` +
      rows([
        { t: "Paperwork", s: "4 of 4 done", right: badge("Done", "success") },
        { t: "Equipment", s: "Laptop collected", right: badge("Done", "success") },
        { t: "Intro meetings", s: "3 of 6 booked", right: badge("In progress", "warning") },
        { t: "Compliance", s: "2 of 3 modules", right: badge("In progress", "warning") },
      ])),
    canvas: card(cardHead({ e: "YOUR FIRST MONTH", t: "What happens when" }, seg(["Timeline", "List"], 0)) +
      a.timeline([
        { t: "Offer accepted", s: "12 May · paperwork returned same day", tag: "Done", tone: "success", state: "done" },
        { t: "Pre-boarding", s: "20 May · buddy assigned, kit shipped", tag: "Done", tone: "success", state: "done" },
        { t: "Day one", s: "3 Jun · welcome session, systems access", tag: "Done", tone: "success", state: "done" },
        { t: "Week one check-in", s: "9 Jun · with Sara Menon", tag: "Today", tone: "brand", state: "now" },
        { t: "30-day review", s: "3 Jul · goals set with your manager", tag: "Upcoming" },
        { t: "90-day review", s: "2 Sep · first full performance conversation", tag: "Upcoming" },
      ])),
  }));

add("employee-experience", "employee-hub-homepage", () =>
  a.dash({
    crumbs: ["My space", "Home"], active: "home",
    head: { eyebrow: "TUESDAY, 9 JUNE", title: "Good morning, Priya 👋", lede: "You have 4 things today, and you are on a 12-day streak.", action: "Ask Vadal" },
    stats: [
      { l: "YOUR PULSE", v: "78", d: "▲ 3 this month" },
      { l: "KUDOS GIVEN", v: "6", sub: "30d", d: "▲ 2" },
      { l: "OPEN TASKS", v: "4", d: "1 due today", dir: "flat" },
      { l: "NEXT 1:1", v: "Thu", sub: "13:00", d: "with Sara", dir: "flat" },
    ],
    left: card(cardHead({ e: "TODAY", t: "Your day" }) + rows([
      { ic: "📅", t: "Roadmap review", s: "13:00 · Product + Design" },
      { ic: "📝", t: "Pulse survey · 4 questions", s: "Closes Friday · about 40 seconds", right: badge("Due", "warning") },
      { ic: "🎓", t: "Security refresher", s: "Compliance · 12 minutes", right: badge("Due today", "danger") },
      { ic: "🤝", t: "1:1 with Sara Menon", s: "Thursday 13:00", right: badge("Prep ready", "brand") },
      { ic: "🎉", t: "Arjun Rao · 3 years", s: "Say something on the feed" },
    ])),
    right: card(cardHead({ e: "HOW ARE YOU FEELING?", t: "Takes 5 seconds" }) +
      `<div style="display:flex;justify-content:space-between;gap:8px;margin:4px 0 16px">
        ${["😀 Great", "🙂 Good", "😐 Okay", "😕 Struggling"].map((m, i) =>
          `<span style="flex:1;text-align:center;border:1px solid ${i === 1 ? T.brand : T.line};border-radius:12px;padding:12px 4px;font-size:11.5px;color:${T.muted};background:${i === 1 ? T.brandSoft : "#fff"}">
            <span style="display:block;font-size:22px;margin-bottom:5px">${m.split(" ")[0]}</span>${m.split(" ")[1]}</span>`).join("")}
      </div>
      <p class="faint" style="font-size:11.5px">Private to you. Tap a mood and Vadal will suggest one thing that might help.</p>` +
      aiNote("You have had no 1:1 in 3 weeks", "Your next one is Thursday. Vadal has drafted three things worth raising, based on your last two pulses.", "See the prep")),
  }));

add("employee-experience", "experience-analytics-dashboard", () =>
  a.dash({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "EXPERIENCE ANALYTICS", title: "Experience analytics", lede: "How the journey scores differ by team, tenure and location — and where the gap is widening.", action: "Export", meta: "Rolling 90 days" },
    stats: [
      { l: "EXPERIENCE INDEX", v: "76", d: "▲ 2 pts" },
      { l: "RESPONSES", v: "41.2K", d: "▲ 12%" },
      { l: "WIDEST GAP", v: "18 pts", sub: "Design vs Plant Ops", d: "▲ 3 pts", dir: "dn" },
      { l: "AT-RISK COHORTS", v: "3", d: "▲ 1", dir: "dn" },
    ],
    left: card(cardHead({ e: "TEAM × TENURE", t: "Experience index" }) + heat(
      ["< 1 yr", "1–2 yrs", "3–5 yrs", "5–10 yrs", "10+ yrs"],
      [
        { l: "Design", v: [88, 84, 86, 89, 87] },
        { l: "Product", v: [85, 79, 82, 84, 86] },
        { l: "Sales", v: [83, 81, 79, 82, 85] },
        { l: "Engineering", v: [80, 66, 71, 74, 78] },
        { l: "Support", v: [78, 68, 70, 73, 76] },
        { l: "Logistics", v: [71, 66, 64, 68, 70] },
        { l: "Plant Ops", v: [64, 58, 59, 61, 63] },
      ],
    )),
    right: card(cardHead({ e: "MOVERS", t: "Biggest changes" }) + rows([
      { t: "Design · 5–10 yrs", s: "Recognition programme", right: badge("▲ 7", "success") },
      { t: "Support · < 1 yr", s: "New onboarding path", right: badge("▲ 5", "success") },
      { t: "Engineering · 1–2 yrs", s: "Post-reorg workload", right: badge("▼ 9", "danger") },
      { t: "Plant Ops · 1–2 yrs", s: "Night-shift fatigue", right: badge("▼ 6", "danger") },
      { t: "Logistics · 3–5 yrs", s: "Pay band clarity", right: badge("▼ 4", "danger") },
    ])),
  }));

add("employee-experience", "mobile-employee-app", () =>
  k.phone({
    title: { t: "Your space", s: "Tuesday, 9 June" },
    body:
      k.card(`<div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.faint}">HOW ARE YOU FEELING?</div>
        <div style="display:flex;gap:7px;margin-top:11px">
        ${["😀", "🙂", "😐", "😕"].map((e, i) => `<span style="flex:1;text-align:center;font-size:23px;padding:9px 0;border:1px solid ${i === 1 ? T.brand : T.line};border-radius:12px;background:${i === 1 ? T.brandSoft : "#fff"}">${e}</span>`).join("")}
        </div>`) +
      `<div class="card" style="background:${T.brandSoft};border-color:transparent">
        <div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.brandStrong}">✦ VADAL</div>
        <div style="font-size:14px;font-weight:700;margin-top:6px;line-height:1.35">Your 1:1 with Sara is Thursday</div>
        <p style="font-size:12px;color:${T.muted};margin-top:5px;line-height:1.5">Three things worth raising, based on your last two pulses.</p>
        <div style="margin-top:10px"><span class="btn sm">See prep</span></div></div>` +
      k.card(`<div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.faint}">TODAY</div>
        <div style="margin-top:9px;font-size:13px;font-weight:600">Roadmap review · 13:00</div>
        <div style="margin-top:8px;font-size:13px;font-weight:600">Pulse survey · 4 questions</div>
        <div style="margin-top:3px;font-size:11.5px;color:${T.faint}">Closes Friday</div>`),
  }));

/* ═══════════════════════════════════════════ employee-wellbeing-culture (3) */
add("employee-wellbeing-culture", "wellbeing-risk-dashboard", () =>
  a.dash({
    crumbs: ["Listening", "Sentiment"], active: "sentiment",
    head: { eyebrow: "WELLBEING", title: "Wellbeing risk", lede: "Aggregate signals only. No individual is ever named, and thresholds are set by your HR and legal teams.", action: "Export", meta: "Confidential" },
    stats: [
      { l: "WELLBEING INDEX", v: "68", d: "▼ 3 pts", dir: "dn" },
      { l: "TEAMS AT RISK", v: "4", d: "▲ 1", dir: "dn" },
      { l: "WORKLOAD SIGNALS", v: "312", d: "▲ 22%", dir: "dn" },
      { l: "EAP AWARENESS", v: "61%", d: "▲ 8 pts" },
    ],
    left: card(cardHead({ e: "BY TEAM", t: "Where the load is landing" }) + table(
      [{ t: "TEAM" }, { t: "SIZE" }, { t: "WELLBEING" }, { t: "WORKLOAD SIGNALS" }, { t: "TREND", r: true }],
      [
        ["<b>Plant Ops</b><span class=\"sub\">Night + day shift</span>", "1,240", meter(48, "danger") + " " + num(48), "94", badge("▼ 7", "danger")],
        ["<b>Engineering</b><span class=\"sub\">Post-reorg</span>", "860", meter(56, "danger") + " " + num(56), "78", badge("▼ 6", "danger")],
        ["<b>Support</b>", "540", meter(62, "warning") + " " + num(62), "61", badge("▼ 2", "danger")],
        ["<b>Logistics</b>", "720", meter(65, "warning") + " " + num(65), "44", badge("→ 0", "neutral")],
        ["<b>Sales</b>", "610", meter(78, "success") + " " + num(78), "21", badge("▲ 3", "success")],
        ["<b>Design</b>", "180", meter(84, "success") + " " + num(84), "9", badge("▲ 2", "success")],
      ],
    )),
    right: card(cardHead({ e: "POLICY", t: "How this is handled" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">Wellbeing signals are reported at team level only, and a team must have at least 8 responses before it appears here. Whether managers see this view is a configuration your legal and HR teams control.</p>` +
      rows([
        { t: "Minimum group size", s: "8 responses", right: badge("Enforced", "success") },
        { t: "Individual identification", s: "Not possible", right: badge("Blocked", "success") },
        { t: "Manager visibility", s: "Team aggregate only", right: badge("Configurable", "brand") },
        { t: "Retention", s: "24 months, then purged", right: badge("Configurable", "brand") },
      ])),
  }));

add("employee-wellbeing-culture", "wellbeing-resource-hub", () =>
  a.full({
    crumbs: ["Knowledge", "Knowledge"], active: "knowledge",
    head: { eyebrow: "WELLBEING", title: "Resource hub", lede: "Support, confidentially. Nothing you open here is reported to your manager or recorded against you.", meta: "Private" },
    body: card(cardHead({ e: "BROWSE", t: "What do you need today?" }, seg(["All", "Mental health", "Financial", "Physical"], 0)) +
      a.tiles([
        { ic: "🧠", bg: "#e8e3fe", t: "Confidential counselling", s: "Six free sessions a year, booked directly. Your employer never sees who used it.", tag: "Confidential", tone: "brand" },
        { ic: "☎️", bg: "#e2f7ee", t: "24/7 support line", s: "Speak to someone now, any hour, in twelve languages.", tag: "Always open", tone: "success" },
        { ic: "💷", bg: "#fdf1dd", t: "Financial wellbeing", s: "Debt advice, savings guidance and a salary-advance option.", tag: "New", tone: "warning" },
        { ic: "🌙", bg: "#dff0ff", t: "Shift and sleep", s: "Practical guidance built for night and rotating shifts.", tag: "Popular", tone: "info" },
        { ic: "🧘", bg: "#e2f7ee", t: "Mental health days", s: "How to take one, and what to tell your team.", tag: "Policy", tone: "neutral" },
        { ic: "👶", bg: "#fde9e2", t: "Family and caring", s: "Parental leave, carer's leave and flexible-working requests.", tag: "Policy", tone: "neutral" },
      ], 3) +
      `<div style="margin-top:14px">${aiNote("Most opened this month: shift and sleep", "Opens are up 34% in Plant Ops since the roster change. That is a signal worth acting on, not just a resource being read.", "See the pattern")}</div>`),
  }));

add("employee-wellbeing-culture", "mobile-wellbeing-check-in", () =>
  k.phone({
    title: { t: "Check in", s: "Private to you — always" },
    body:
      k.card(`<div style="font-size:13px;color:${T.muted}">How has this week been?</div>
        <div style="display:flex;gap:7px;margin-top:12px">
        ${["😀", "🙂", "😐", "😕", "😞"].map((e, i) => `<span style="flex:1;text-align:center;font-size:21px;padding:10px 0;border:1px solid ${i === 3 ? T.brand : T.line};border-radius:12px;background:${i === 3 ? T.brandSoft : "#fff"}">${e}</span>`).join("")}
        </div>
        <p style="font-size:11.5px;color:${T.faint};margin-top:12px;line-height:1.5">Your answer is never shown to your manager. It joins a team total only once at least eight people have answered.</p>`) +
      `<div class="card" style="background:${T.brandSoft};border-color:transparent">
        <div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.brandStrong}">✦ SOMETHING THAT MIGHT HELP</div>
        <div style="font-size:14px;font-weight:700;margin-top:6px;line-height:1.35">Shift and sleep guide</div>
        <p style="font-size:12px;color:${T.muted};margin-top:5px;line-height:1.5">Eight minutes, written for rotating shifts. No one is told you opened it.</p>
        <div style="margin-top:10px"><span class="btn sm">Open guide</span></div></div>` +
      k.card(`<div style="font-size:13px;font-weight:600">Talk to someone</div>
        <p style="font-size:12px;color:${T.muted};margin-top:4px;line-height:1.5">24/7 confidential line, twelve languages.</p>
        <div style="margin-top:10px"><span class="btn2 sm">Call now</span></div>`),
  }));


/* ═══════════════════════════════════════════════ recognition-rewards (4) */
add("recognition-rewards", "rewards-catalog-and-redemption", () =>
  a.full({
    crumbs: ["Engage", "Recognition"], active: "recognition",
    head: { eyebrow: "REWARDS", title: "Rewards catalogue", lede: "Points convert to things people actually want, in their own currency and country.", action: "Redeem", meta: "You have 4,250 points" },
    stats: [
      { l: "YOUR BALANCE", v: "4,250", sub: "pts", d: "▲ 600 this month" },
      { l: "REDEEMED · ORG", v: "£182K", sub: "YTD", d: "▲ 14%" },
      { l: "REDEMPTION RATE", v: "68%", d: "▲ 5 pts" },
      { l: "COUNTRIES", v: "34", d: "local catalogues", dir: "flat" },
    ],
    body: card(cardHead({ e: "CATALOGUE", t: "Browse rewards" }, seg(["All", "Vouchers", "Experiences", "Charity", "Time off"], 0)) +
      a.tiles([
        { ic: "🎁", bg: "#e8e3fe", t: "Gift vouchers", s: "180 retailers across 34 countries, delivered instantly.", tag: "From 500 pts", tone: "brand" },
        { ic: "🌍", bg: "#e2f7ee", t: "Give to charity", s: "Convert points to a donation, matched by the company.", tag: "Matched 1:1", tone: "success" },
        { ic: "☕", bg: "#fdf1dd", t: "Team lunch", s: "Book a meal for the whole team on the company.", tag: "From 2,000 pts", tone: "warning" },
        { ic: "🏖️", bg: "#dff0ff", t: "Extra day off", s: "Trade points for a paid day, approved in one click.", tag: "5,000 pts", tone: "info" },
        { ic: "🎧", bg: "#fde9e2", t: "Tech and kit", s: "Headphones, keyboards and desk gear from the store.", tag: "From 3,000 pts", tone: "neutral" },
        { ic: "🎓", bg: "#e9f2ff", t: "Learning credit", s: "Put points toward a course, book or conference.", tag: "From 1,500 pts", tone: "neutral" },
      ], 3)),
  }));

add("recognition-rewards", "manager-recognition-dashboard", () =>
  a.dash({
    crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "MANAGER HUB", title: "Recognition in your team", lede: "Who is being seen, who is being missed, and how your coverage compares with the org.", action: "Give recognition", meta: "Design pod · 6" },
    stats: [
      { l: "YOUR COVERAGE", v: "58%", d: "▼ 3 pts vs org 61%", dir: "dn" },
      { l: "KUDOS GIVEN", v: "14", sub: "30d", d: "▲ 4" },
      { l: "NOT RECOGNISED", v: "2", sub: "in 30d", d: "needs action", dir: "dn" },
      { l: "TEAM SENTIMENT", v: "74", d: "▲ 2 pts" },
    ],
    left: card(cardHead({ e: "YOUR TEAM · 6", t: "Who has been recognised" }) + table(
      [{ t: "PERSON" }, { t: "KUDOS · 30D" }, { t: "LAST RECEIVED" }, { t: "SENTIMENT", r: true }],
      [
        ["<b>Neha Rao</b><span class=\"sub\">Product Designer</span>", "5", "4 days ago", badge("88", "success")],
        ["<b>Kabir Rao</b><span class=\"sub\">UX Researcher</span>", "3", "9 days ago", badge("80", "success")],
        ["<b>Dev Patel</b><span class=\"sub\">Junior Designer</span>", "2", "12 days ago", badge("76", "success")],
        ["<b>Aisha Khan</b><span class=\"sub\">Content Designer</span>", "1", "26 days ago", badge("66", "warning")],
        ["<b>Rohan Mehta</b><span class=\"sub\">Senior Designer</span>", "0", "None in 30 days", badge("58", "danger")],
        ["<b>Sara Menon</b><span class=\"sub\">Designer</span>", "0", "None in 30 days", badge("71", "warning")],
      ],
    )),
    right: card(cardHead({ e: "VADAL COACHING", t: "Close the gap" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">Rohan and Sara have had no recognition in 30 days. Both shipped work that closed a sprint. Two shout-outs would put your coverage above the org average.</p>` +
      rows([
        { t: "Recognise Rohan Mehta", s: "Design-system refactor", right: badge("Suggested", "brand") },
        { t: "Recognise Sara Menon", s: "Onboarding flow rework", right: badge("Suggested", "brand") },
      ]) + aiNote("Recognition predicts retention here", "In your org, people with no recognition for 60 days are 2.4× more likely to leave within two quarters.", "See the evidence")),
  }));

add("recognition-rewards", "recognition-analytics-and-equity-report", () =>
  a.dash({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "RECOGNITION · EQUITY", title: "Recognition equity", lede: "Whether praise is spread fairly — by team, gender, shift and tenure — not just whether there is a lot of it.", action: "Export", meta: "Rolling 12 months" },
    stats: [
      { l: "COVERAGE", v: "61%", d: "▲ 4 pts" },
      { l: "EQUITY INDEX", v: "0.78", sub: "/1.0", d: "▲ 0.05" },
      { l: "WIDEST GAP", v: "22 pts", sub: "Day vs night shift", d: "▼ 3 pts", dir: "up" },
      { l: "NEVER RECOGNISED", v: "1,840", sub: "12m", d: "▼ 260", dir: "up" },
    ],
    left: card(cardHead({ e: "COVERAGE BY GROUP", t: "Who gets recognised" }) + table(
      [{ t: "GROUP" }, { t: "PEOPLE" }, { t: "COVERAGE" }, { t: "VS ORG", r: true }],
      [
        ["<b>Day shift</b>", "8,240", meter(69, "success") + " " + num("69%"), badge("▲ 8", "success")],
        ["<b>Night shift</b>", "1,910", meter(47, "danger") + " " + num("47%"), badge("▼ 14", "danger")],
        ["<b>Office-based</b>", "6,120", meter(72, "success") + " " + num("72%"), badge("▲ 11", "success")],
        ["<b>Frontline</b>", "4,240", meter(52, "warning") + " " + num("52%"), badge("▼ 9", "danger")],
        ["<b>0–2 years tenure</b>", "3,880", meter(58, "warning") + " " + num("58%"), badge("▼ 3", "danger")],
        ["<b>10+ years tenure</b>", "1,460", meter(66, "success") + " " + num("66%"), badge("▲ 5", "success")],
      ],
    )),
    right: card(cardHead({ e: "THE PATTERN", t: "Night shift" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">Night-shift teams receive less than half the recognition of day shift, and the gap has held for four quarters. Most kudos are given between 10:00 and 16:00, when night staff are off.</p>` +
      bars([{ l: "00", v: 6, tone: T.strong }, { l: "04", v: 4, tone: T.strong }, { l: "08", v: 38 }, { l: "12", v: 92 }, { l: "16", v: 74 }, { l: "20", v: 18, tone: T.strong }]) +
      aiNote("Prompt managers at shift handover", "A nudge at 06:00 and 22:00 lifted night-shift coverage 16 points in the pilot.", "Set it up")),
  }));

add("recognition-rewards", "mobile-recognition-app", () =>
  k.phone({
    title: { t: "Give kudos", s: "Catch someone doing it right" },
    body:
      k.card(`<div style="font-size:11px;font-weight:600;letter-spacing:.06em;color:${T.faint}">TO</div>
        <div class="inp" style="margin-top:7px;display:flex;align-items:center;gap:9px;padding:9px 11px">
          <span class="av" style="background:#dff0ff;color:${T.brandStrong};width:26px;height:26px;flex:0 0 26px;font-size:10px">RM</span>
          <span style="font-size:13px;font-weight:600">Rohan Mehta</span></div>
        <div style="font-size:11px;font-weight:600;letter-spacing:.06em;color:${T.faint};margin-top:14px">FOR LIVING A VALUE</div>
        <div class="pill-row" style="margin-top:8px">
          <span class="chip on">🏆 Ownership</span><span class="chip">🤝 Collaboration</span><span class="chip">💡 Innovation</span></div>`) +
      k.card(`<div class="inp tall" style="min-height:88px;font-size:12.5px">Carried the design-system refactor on his own for two sprints and never once made it someone else's problem. The whole team is faster for it.</div>
        <div style="display:flex;gap:8px;margin-top:11px"><span class="btn sm">Post to feed</span><span class="btn2 sm">+250 pts</span></div>`),
  }));

/* ═══════════════════════════════════════════════════ people-analytics (1) */
add("people-analytics", "ai-insight-summary-panel", () =>
  a.pair({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "PEOPLE INTELLIGENCE", title: "AI insight summary", lede: "The quarter in five findings, each traced back to the data behind it.", action: "Export", meta: "Generated 9 Jun" },
    a: card(cardHead({ e: "THIS QUARTER", t: "What Vadal found" }) + rows([
      { ic: "①", t: "Engineering is the story", s: "Down 9 pts since the reorg — 312 workload mentions", right: badge("High", "danger") },
      { ic: "②", t: "Recognition is working", s: "Up 7 pts where the new programme ran", right: badge("Positive", "success") },
      { ic: "③", t: "Night shift is drifting", s: "22-pt recognition gap, four quarters running", right: badge("High", "danger") },
      { ic: "④", t: "Year two is the weak point", s: "13-pt fall between month 14 and 22", right: badge("Medium", "warning") },
      { ic: "⑤", t: "Managers are the lever", s: "Teams with weekly 1:1s score 11 pts higher", right: badge("Positive", "success") },
    ])),
    b: card(cardHead({ e: "DRILL IN", t: "Engineering, post-reorg" }) +
      `<div class="big" style="color:${T.danger}">−9</div>
       <p class="muted" style="font-size:13px;line-height:1.6;margin-top:8px">Points lost since March. The fall is concentrated in the 1–2 year cohort and tracks almost exactly with the sprint-load increase after the team merge.</p>` +
      line([79, 78, 77, 74, 71, 70, 70], { tone: T.danger }) +
      `<div class="kv"><span class="muted">Workload &amp; burnout mentions</span><b>312 ▲ 22%</b></div>
       <div class="kv"><span class="muted">1:1 completion</span><b>52% ▼ 14 pts</b></div>
       <div class="kv"><span class="muted">Predicted attrition</span><b>7.1% ▲ 2.3 pts</b></div>`),
  }));

/* ══════════════════════════════════════════════ sentiment-intelligence (4) */
add("sentiment-intelligence", "sentiment-trend-dashboard", () =>
  a.dash({
    crumbs: ["Listening", "Sentiment"], active: "sentiment",
    head: { eyebrow: "LISTEN", title: "Sentiment", lede: "Net sentiment across every channel, tracked continuously rather than twice a year.", action: "Export", meta: "4,120 responses" },
    stats: [
      { l: "NET SENTIMENT", v: "52", d: "▲ 4 vs last period" },
      { l: "POSITIVE", v: "64%", d: "▲ 3 pts" },
      { l: "NEGATIVE", v: "12%", d: "▼ 1 pt", dir: "up" },
      { l: "RESPONSES", v: "4,120", d: "▲ 18%" },
    ],
    left: card(cardHead({ e: "OVER TIME · 6 MONTHS", t: "Positive vs negative" }, seg(["3m", "6m", "12m"], 1)) +
      line([44, 46, 45, 48, 50, 52], { tone: T.success })),
    right: card(cardHead({ e: "HOW PEOPLE FEEL", t: "Mix" }) +
      `<div style="display:grid;place-items:center;padding:8px 0 14px">${donut(64, "52", T.success)}</div>` +
      `<div class="kv"><span style="display:flex;align-items:center;gap:8px"><i style="width:9px;height:9px;border-radius:3px;background:${T.success};display:block"></i>Positive</span><b>64%</b></div>
       <div class="kv"><span style="display:flex;align-items:center;gap:8px"><i style="width:9px;height:9px;border-radius:3px;background:${T.strong};display:block"></i>Neutral</span><b>24%</b></div>
       <div class="kv"><span style="display:flex;align-items:center;gap:8px"><i style="width:9px;height:9px;border-radius:3px;background:${T.danger};display:block"></i>Negative</span><b>12%</b></div>`),
  }));

add("sentiment-intelligence", "theme-and-emotion-cluster-view", () =>
  a.dash({
    crumbs: ["Listening", "Sentiment"], active: "sentiment",
    head: { eyebrow: "LISTEN · THEMES", title: "Themes and emotions", lede: "What people are talking about, and the feeling underneath it.", action: "Ask Vadal", meta: "Open text · 90 days" },
    left: card(cardHead({ e: "BY THEME · TAP TO DRILL IN", t: "What's driving it" }, seg(["All", "Positive", "Negative", "Rising"], 0)) + table(
      [{ t: "THEME" }, { t: "EMOTION" }, { t: "MENTIONS" }, { t: "SENTIMENT" }, { t: "TREND", r: true }],
      [
        ["<b>Recognition</b>", badge("Pride", "success"), "268", meter(84, "success"), badge("▲ 12", "success")],
        ["<b>Team &amp; belonging</b>", badge("Warmth", "success"), "214", meter(79, "success"), badge("▲ 8", "success")],
        ["<b>Workload &amp; burnout</b>", badge("Exhaustion", "danger"), "312", meter(38, "danger"), badge("▲ 22", "danger")],
        ["<b>Pay &amp; growth</b>", badge("Frustration", "danger"), "176", meter(46, "danger"), badge("▲ 6", "danger")],
        ["<b>Tooling &amp; process</b>", badge("Irritation", "warning"), "142", meter(58, "warning"), badge("▼ 4", "success")],
        ["<b>Leadership clarity</b>", badge("Uncertainty", "warning"), "98", meter(62, "warning"), badge("▲ 3", "danger")],
      ],
    )),
    right: card(cardHead({ e: "EMOTION MIX", t: "Across all text" }) +
      bars([
        { l: "Pride", v: 68, tone: T.success }, { l: "Warmth", v: 54, tone: T.success },
        { l: "Uncertain", v: 41, tone: T.warning }, { l: "Frustrat.", v: 47, tone: T.danger },
        { l: "Exhaust.", v: 62, tone: T.danger },
      ]) +
      aiNote("Exhaustion is the fastest riser", "Up 22% this quarter and almost entirely inside Engineering and Plant Ops, not spread across the org.", "See the teams")),
  }));

add("sentiment-intelligence", "attrition-risk-alert-panel", () =>
  a.dash({
    crumbs: ["Intelligence", "Pulse"], active: "pulse",
    head: { eyebrow: "PULSE · ATTRITION", title: "Attrition risk", lede: "Predicted, explained and actionable — never a score without a reason.", action: "Create cases", meta: "Model confidence 92%" },
    stats: [
      { l: "PREDICTED ATTRITION", v: "4.8%", sub: "12m", d: "▼ 0.4 pts", dir: "up" },
      { l: "HIGH RISK", v: "38", sub: "people", d: "▲ 6", dir: "dn" },
      { l: "REGRETTED", v: "62%", sub: "of predicted", d: "▲ 4 pts", dir: "dn" },
      { l: "SAVED · YTD", v: "24", sub: "after action", d: "▲ 9" },
    ],
    left: card(cardHead({ e: "WHO MIGHT LEAVE", t: "Flagged this week" }) + table(
      [{ t: "PERSON" }, { t: "TEAM" }, { t: "RISK" }, { t: "PRIMARY DRIVER" }, { t: "", r: true }],
      [
        ["<b>A. Mehta</b>", "Sales · West", badge("High", "danger"), "No 1:1 in 6 weeks", '<span class="btn2 sm">Open</span>'],
        ["<b>R. Iyer</b>", "Engineering", badge("High", "danger"), "Workload, 3 quarters", '<span class="btn2 sm">Open</span>'],
        ["<b>S. Khan</b>", "Support", badge("Med", "warning"), "Pay band clarity", '<span class="btn2 sm">Open</span>'],
        ["<b>P. Nair</b>", "Plant Ops", badge("Med", "warning"), "Night-shift fatigue", '<span class="btn2 sm">Open</span>'],
        ["<b>D. Kaur</b>", "Logistics", badge("Med", "warning"), "No recognition, 90d", '<span class="btn2 sm">Open</span>'],
      ],
    )),
    right: card(cardHead({ e: "TOP DRIVERS", t: "What the model weighs" }) + rows([
      { t: "Manager relationship", s: "1:1 frequency and recency", right: meter(31, "brand") + " " + num("31%") },
      { t: "Workload & burnout", s: "Sustained overload signals", right: meter(27, "brand") + " " + num("27%") },
      { t: "Pay & growth", s: "Band clarity, time since move", right: meter(21, "brand") + " " + num("21%") },
      { t: "Role clarity", s: "Goal and scope stability", right: meter(13, "brand") + " " + num("13%") },
      { t: "Recognition", s: "Days since last kudos", right: meter(8, "brand") + " " + num("8%") },
    ]) + `<p class="faint" style="font-size:11.5px;line-height:1.5;margin-top:12px">Every flag shows its drivers. The model never returns a score on its own.</p>`),
  }));

add("sentiment-intelligence", "team-level-sentiment-heatmap", () =>
  a.full({
    crumbs: ["Listening", "Sentiment"], active: "sentiment",
    head: { eyebrow: "SENTIMENT · TEAM × MONTH", title: "Team sentiment heatmap", lede: "Six months across every team, so a slow slide is as visible as a sudden drop.", action: "Spot hotspots", meta: "Min. group size 8" },
    body: card(heat(
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      [
        { l: "Design", v: [84, 85, 86, 87, 88, 88] },
        { l: "Sales", v: [80, 81, 79, 82, 83, 84] },
        { l: "Marketing", v: [78, 79, 80, 80, 81, 81] },
        { l: "Product", v: [82, 81, 80, 79, 80, 82] },
        { l: "Support", v: [74, 73, 71, 70, 72, 73] },
        { l: "Finance", v: [76, 75, 74, 72, 71, 71] },
        { l: "Engineering", v: [79, 77, 74, 71, 70, 70] },
        { l: "Logistics", v: [70, 69, 68, 68, 67, 68] },
        { l: "Plant Ops", v: [66, 64, 62, 60, 59, 59] },
        { l: "Night shift", v: [62, 61, 60, 58, 58, 58] },
      ],
    ) + `<div class="legend"><b><i style="background:${T.successSoft}"></i>Strong</b><b><i style="background:${T.warningSoft}"></i>Watch</b><b><i style="background:${T.dangerSoft}"></i>Weak</b></div>`),
  }));

/* ═════════════════════════════════════════════ benchmark-intelligence (4) */
add("benchmark-intelligence", "benchmark-comparison-dashboard", () =>
  a.dash({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "BENCHMARK", title: "How you compare", lede: "Against your industry, your size band and your region — not a single global average.", action: "Export", meta: "Peer set · 412 companies" },
    stats: [
      { l: "YOUR SCORE", v: "82", d: "▲ 4 pts" },
      { l: "PEER MEDIAN", v: "74", sub: "SaaS · 5–15K", d: "flat", dir: "flat" },
      { l: "YOUR PERCENTILE", v: "78th", d: "▲ 9" },
      { l: "TOP QUARTILE AT", v: "86", d: "4 pts away", dir: "flat" },
    ],
    left: card(cardHead({ e: "VS PEER SET", t: "Driver by driver" }) + table(
      [{ t: "DRIVER" }, { t: "YOU" }, { t: "PEERS" }, { t: "GAP", r: true }],
      [
        ["<b>Recognition</b>", num(84), "71", badge("▲ 13", "success")],
        ["<b>Team &amp; belonging</b>", num(79), "73", badge("▲ 6", "success")],
        ["<b>Manager quality</b>", num(76), "72", badge("▲ 4", "success")],
        ["<b>Leadership clarity</b>", num(74), "70", badge("▲ 4", "success")],
        ["<b>Pay &amp; growth</b>", num(61), "68", badge("▼ 7", "danger")],
        ["<b>Workload</b>", num(52), "66", badge("▼ 14", "danger")],
      ],
    )),
    right: card(cardHead({ e: "DISTRIBUTION", t: "Where you sit" }) +
      bars([
        { l: "P10", v: 58, tone: T.strong }, { l: "P25", v: 66, tone: T.strong }, { l: "P50", v: 74, tone: T.strong },
        { l: "You", v: 82, tone: T.brand }, { l: "P75", v: 86, tone: T.strong }, { l: "P90", v: 91, tone: T.strong },
      ]) +
      aiNote("Workload is your one real gap", "Fourteen points behind peers, and the only driver where you sit below the median. Everything else is at or above.", "See the plan")),
  }));

add("benchmark-intelligence", "driver-level-peer-gap-view", () =>
  a.pair({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "BENCHMARK · GAPS", title: "Peer gap by driver", lede: "The four places you lead, the two where you trail, and what each is worth in retention.", action: "Export" },
    a: card(cardHead({ e: "AHEAD", t: "Where you lead" }) + rows([
      { t: "Recognition", s: "84 vs 71 peer median", right: badge("▲ 13", "success") },
      { t: "Team & belonging", s: "79 vs 73", right: badge("▲ 6", "success") },
      { t: "Manager quality", s: "76 vs 72", right: badge("▲ 4", "success") },
      { t: "Leadership clarity", s: "74 vs 70", right: badge("▲ 4", "success") },
    ]) + `<div style="margin-top:14px">${aiNote("Recognition is your moat", "Thirteen points clear of peers. In your data it is also the strongest single predictor of staying past year two.", "See the evidence")}</div>`),
    b: card(cardHead({ e: "BEHIND", t: "Where you trail" }) + rows([
      { t: "Workload", s: "52 vs 66 peer median", right: badge("▼ 14", "danger") },
      { t: "Pay & growth", s: "61 vs 68", right: badge("▼ 7", "danger") },
    ]) +
      `<div style="margin-top:16px"><div class="ch-e">MODELLED IMPACT</div>
       <div class="kv"><span class="muted">Close workload to peer median</span><b style="color:${T.success}">−1.9 pts attrition</b></div>
       <div class="kv"><span class="muted">Close pay clarity to peer median</span><b style="color:${T.success}">−0.8 pts attrition</b></div>
       <div class="kv"><span class="muted">Combined, over 12 months</span><b style="color:${T.success}">≈ 210 people retained</b></div></div>`),
  }));

add("benchmark-intelligence", "industry-and-region-filter-panel", () =>
  a.rail({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "BENCHMARK", title: "Choose your peer set", lede: "A benchmark is only useful if the companies in it look like yours.", action: "Apply", meta: "412 companies match" },
    rail: card(cardHead({ e: "FILTERS", t: "Peer set" }) +
      `<div class="fld"><label>INDUSTRY</label><div class="pill-row">
        <span class="chip on">SaaS</span><span class="chip">Fintech</span><span class="chip">Retail</span><span class="chip">Manufacturing</span><span class="chip">Healthcare</span></div></div>
      <div class="fld"><label>HEADCOUNT</label><div class="pill-row">
        <span class="chip">&lt;1K</span><span class="chip">1–5K</span><span class="chip on">5–15K</span><span class="chip">15K+</span></div></div>
      <div class="fld"><label>REGION</label><div class="pill-row">
        <span class="chip on">UK &amp; Ireland</span><span class="chip on">EU</span><span class="chip">North America</span><span class="chip">APAC</span></div></div>
      <div class="fld"><label>WORKFORCE MIX</label><div class="pill-row">
        <span class="chip on">Mixed desk + frontline</span><span class="chip">Desk only</span></div></div>`),
    canvas: card(cardHead({ e: "RESULT", t: "412 companies in your peer set" }, seg(["Summary", "List"], 0)) +
      stats([
        { l: "COMPANIES", v: "412" },
        { l: "PEOPLE COVERED", v: "3.1M" },
        { l: "MEDIAN SCORE", v: "74" },
        { l: "DATA FRESHNESS", v: "90d", sub: "rolling" },
      ]) +
      `<div style="margin-top:16px">${table(
        [{ t: "SEGMENT" }, { t: "COMPANIES" }, { t: "MEDIAN" }, { t: "YOUR RANK", r: true }],
        [
          ["<b>SaaS · 5–15K · UK &amp; EU</b><span class=\"sub\">Your selection</span>", "412", "74", badge("78th pct", "success")],
          ["<b>SaaS · all sizes · global</b>", "2,140", "72", badge("81st pct", "success")],
          ["<b>All industries · 5–15K · UK &amp; EU</b>", "1,860", "70", badge("84th pct", "success")],
          ["<b>Mixed desk + frontline · UK &amp; EU</b>", "980", "68", badge("86th pct", "success")],
        ],
      )}</div>`),
  }));

add("benchmark-intelligence", "board-ready-benchmark-report", () =>
  a.pair({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "BOARD PACK", title: "Benchmark report", lede: "Six pages, generated from live data, with every figure traceable to its source.", action: "Download PDF", meta: "Q2 · June 2026" },
    a: card(cardHead({ e: "PREVIEW", t: "Page 1 — Executive summary" }) +
      `<div style="border:1px solid ${T.line};border-radius:12px;padding:22px;background:${T.canvas};flex:1">
        <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:${T.faint}">OLIANDHUE · Q2 2026</div>
        <div style="font-size:22px;font-weight:700;letter-spacing:-.02em;margin-top:9px">Workforce health vs peers</div>
        <div class="split2" style="margin-top:20px">
          <div><div class="ch-e">YOUR SCORE</div><div class="big">82</div><div style="font-size:12px;color:${T.success};font-weight:600;margin-top:5px">▲ 4 vs Q1</div></div>
          <div><div class="ch-e">PEER MEDIAN</div><div class="big" style="color:${T.faint}">74</div><div style="font-size:12px;color:${T.faint};margin-top:5px">412 companies</div></div>
        </div>
        <div style="margin-top:20px">${line([70, 71, 73, 74, 78, 82], { tone: T.brand, h: 90 })}</div>
      </div>`),
    b: card(cardHead({ e: "CONTENTS", t: "What the board gets" }) + rows([
      { ic: "1", t: "Executive summary", s: "Score, peer position, the one thing to fix" },
      { ic: "2", t: "Driver breakdown", s: "Six drivers vs peer median" },
      { ic: "3", t: "Segment view", s: "By function, region and shift" },
      { ic: "4", t: "Attrition modelling", s: "Predicted cost of the workload gap" },
      { ic: "5", t: "Actions in flight", s: "Owner, deadline, measured lift" },
      { ic: "6", t: "Method and sources", s: "Peer set definition, sample sizes, dates" },
    ]) + `<div style="margin-top:14px">${aiNote("Every number is traceable", "Each figure links back to the responses behind it, so a board question never needs a follow-up email.", "See sources")}</div>`),
  }));

/* ═════════════════════════════════════════════════ executive-reports (4) */
add("executive-reports", "executive-report-builder", () =>
  a.rail({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "REPORTS", title: "Report builder", lede: "Pick the audience and Vadal picks the sections, the depth and the language.", action: "Generate", meta: "Draft" },
    rail: a.navList("Sections", [
      { t: "Audience", s: "Board · quarterly", ic: "1", on: true },
      { t: "Period", s: "Q2 2026", ic: "2" },
      { t: "Sections", s: "6 selected", ic: "3" },
      { t: "Segments", s: "Function, region, shift", ic: "4" },
      { t: "Narrative", s: "AI summary on", ic: "5" },
      { t: "Delivery", s: "PDF + live link", ic: "6" },
    ]),
    canvas: card(cardHead({ e: "SECTIONS", t: "What goes in" }, seg(["Board", "Exec team", "Managers"], 0)) +
      a.toggles([
        { t: "Executive summary", s: "One page, AI-written, figures traced to source" },
        { t: "Driver breakdown", s: "Six engagement drivers with peer comparison" },
        { t: "Attrition modelling", s: "Predicted 12-month attrition and cost" },
        { t: "Segment deep-dive", s: "Function, region, shift and tenure" },
        { t: "Actions in flight", s: "Owner, deadline and measured lift", on: true },
        { t: "Raw comment sample", s: "Anonymised open text", on: false },
        { t: "Method and sources", s: "Sample sizes, dates, peer set definition" },
      ])),
  }));

add("executive-reports", "board-ready-report-template", () =>
  a.pair({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "TEMPLATES", title: "Board-ready template", lede: "The format your board already reads, filled from live data each quarter.", action: "Use template", meta: "Used by 8 teams" },
    a: card(cardHead({ e: "PREVIEW", t: "Quarterly people review" }) +
      `<div style="border:1px solid ${T.line};border-radius:12px;padding:22px;background:${T.canvas};flex:1">
        <div style="font-size:10px;font-weight:700;letter-spacing:.14em;color:${T.faint}">BOARD PACK · SECTION 4</div>
        <div style="font-size:20px;font-weight:700;margin-top:8px;letter-spacing:-.02em">People and culture</div>
        <p style="font-size:12.5px;color:${T.muted};margin-top:10px;line-height:1.6">Engagement rose 4 points to 82, holding us in the 78th percentile of our peer set. Workload remains the single weak driver at 52, fourteen points behind peers, concentrated in Engineering and Plant Ops.</p>
        <div style="display:flex;gap:26px;margin-top:18px">
          <div><div class="ch-e">ENGAGEMENT</div><div style="font-size:26px;font-weight:700">82</div></div>
          <div><div class="ch-e">ATTRITION</div><div style="font-size:26px;font-weight:700">4.8%</div></div>
          <div><div class="ch-e">PARTICIPATION</div><div style="font-size:26px;font-weight:700">74%</div></div>
        </div>
      </div>`),
    b: card(cardHead({ e: "TEMPLATE LIBRARY", t: "Start from one of these" }) + rows([
      { ic: "📊", t: "Quarterly people review", s: "6 pages · board", right: badge("Most used", "brand") },
      { ic: "📈", t: "Monthly exec dashboard", s: "2 pages · exec team" },
      { ic: "🎯", t: "Post-survey readout", s: "4 pages · all managers" },
      { ic: "⚠️", t: "Attrition risk briefing", s: "3 pages · HRBP + exec" },
      { ic: "🌍", t: "Regional comparison", s: "5 pages · country leads" },
      { ic: "📋", t: "Annual culture report", s: "12 pages · board + public" },
    ])),
  }));

add("executive-reports", "ai-generated-summary-panel", () =>
  a.pair({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "REPORTS", title: "AI-generated summary", lede: "Written from the data, with every claim linked to the responses behind it.", action: "Accept", meta: "Regenerated 9 Jun" },
    a: card(cardHead({ e: "DRAFT", t: "Executive summary · Q2 2026" }) +
      `<div style="font-size:13.5px;line-height:1.75;color:${T.ink};flex:1">
        <p>Engagement rose four points to <b>82</b>, keeping oliandhue in the <b>78th percentile</b> of its peer set of 412 comparable companies.</p>
        <p style="margin-top:13px">The gain is driven almost entirely by <b>recognition</b>, now 84 and thirteen points clear of peers, following the programme rolled out in March.</p>
        <p style="margin-top:13px">One driver moved against us. <b>Workload</b> fell to 52, fourteen points behind the peer median, with 312 mentions this quarter — up 22%. It is concentrated in Engineering after the March reorg and in Plant Ops after the roster change, rather than spread across the organisation.</p>
        <p style="margin-top:13px">Modelling suggests closing the workload gap to the peer median would reduce predicted twelve-month attrition by <b>1.9 points</b>, or roughly 210 people.</p>
      </div>`),
    b: card(cardHead({ e: "SOURCES", t: "Where each claim comes from" }) + rows([
      { ic: "📄", t: "“rose four points to 82”", s: "Q2 pulse · 4,120 responses", right: badge("Verified", "success") },
      { ic: "📄", t: "“78th percentile”", s: "Peer set · 412 companies · 90d", right: badge("Verified", "success") },
      { ic: "📄", t: "“recognition now 84”", s: "Driver model · Q2", right: badge("Verified", "success") },
      { ic: "📄", t: "“312 mentions, up 22%”", s: "Open text · theme cluster", right: badge("Verified", "success") },
      { ic: "📄", t: "“1.9 points attrition”", s: "Attrition model · 92% conf.", right: badge("Modelled", "warning") },
    ]) + `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Modelled figures are labelled separately from measured ones, so nothing predicted is read as something observed.</p>`),
  }));

add("executive-reports", "report-scheduling-and-distribution-view", () =>
  a.dash({
    crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "REPORTS", title: "Scheduling and distribution", lede: "Who gets which report, when, and what they are allowed to see in it.", action: "New schedule", meta: "6 active" },
    stats: [
      { l: "ACTIVE SCHEDULES", v: "6" },
      { l: "RECIPIENTS", v: "142" },
      { l: "SENT · 30D", v: "38" },
      { l: "OPEN RATE", v: "91%", d: "▲ 4 pts" },
    ],
    left: card(cardHead({ e: "SCHEDULES", t: "What goes out" }) + table(
      [{ t: "REPORT" }, { t: "AUDIENCE" }, { t: "CADENCE" }, { t: "NEXT" }, { t: "", r: true }],
      [
        ["<b>Quarterly people review</b>", "Board · 9", "Quarterly", "1 Jul", badge("Active", "success")],
        ["<b>Monthly exec dashboard</b>", "Exec team · 14", "Monthly", "1 Jul", badge("Active", "success")],
        ["<b>Manager readout</b>", "Managers · 96", "Monthly", "5 Jul", badge("Active", "success")],
        ["<b>Attrition briefing</b>", "HRBP · 12", "Fortnightly", "16 Jun", badge("Active", "success")],
        ["<b>Regional comparison</b>", "Country leads · 8", "Quarterly", "1 Jul", badge("Active", "success")],
        ["<b>Annual culture report</b>", "Board + public", "Annual", "12 Jan", badge("Scheduled", "neutral")],
      ],
    )),
    right: card(cardHead({ e: "WHAT THEY SEE", t: "Scoped by role" }) + rows([
      { t: "Board", s: "Org-wide only, no team detail", right: badge("Aggregate", "brand") },
      { t: "Exec team", s: "Down to function level", right: badge("Function", "brand") },
      { t: "HRBP", s: "Their business units, named cases", right: badge("Unit", "brand") },
      { t: "Managers", s: "Own team, min. 8 responses", right: badge("Team", "brand") },
    ]) + `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">A manager whose team has fewer than eight responses receives the org view instead, never a group small enough to identify.</p>`),
  }));
/* ═══════════════════════════════════════════════════ pre-onboarding (4) */
add("pre-onboarding", "pre-boarding-candidate-portal", () =>
  a.rail({
    crumbs: ["My space", "Home"], active: "home",
    head: { eyebrow: "PRE-BOARDING", title: "Welcome, Aditya", lede: "Everything before day one, in one place — so your first morning is not paperwork.", meta: "Starts 1 July · 22 days" },
    rail: card(cardHead({ e: "READY FOR DAY ONE", t: "Your progress" }) +
      `<div style="display:grid;place-items:center;padding:6px 0 14px">${donut(72, "72%", T.brand)}</div>` +
      rows([
        { t: "Contract signed", s: "12 May", right: badge("Done", "success") },
        { t: "Right to work", s: "Verified 14 May", right: badge("Done", "success") },
        { t: "Bank & tax", s: "Submitted", right: badge("Done", "success") },
        { t: "Equipment choice", s: "Awaiting your pick", right: badge("Action", "warning") },
      ])),
    canvas: card(cardHead({ e: "BEFORE YOU START", t: "What's left" }, seg(["To do", "Done"], 0)) + rows([
      { ic: "💻", t: "Choose your equipment", s: "MacBook Pro 14 or 16 — ships to your address", right: '<span class="btn sm">Choose</span>' },
      { ic: "👋", t: "Meet your buddy", s: "Neha Rao, Product Designer · 20 min video call", right: '<span class="btn2 sm">Book</span>' },
      { ic: "📚", t: "Read the team handbook", s: "12 minutes · how we work, decide and disagree", right: '<span class="btn2 sm">Open</span>' },
      { ic: "🏢", t: "Confirm first-day details", s: "3 June, 09:30, London office, ask for Sara", right: badge("Confirmed", "success") },
      { ic: "🎯", t: "Set a 30-day goal", s: "Draft with your manager before you start", right: '<span class="btn2 sm">Draft</span>' },
    ]) + `<div style="margin-top:14px">${aiNote("Most new joiners choose the 14-inch", "Order in the next four days and it arrives before your start date.", "Choose now")}</div>`),
  }));

add("pre-onboarding", "onboarding-journey-timeline", () =>
  a.dash({
    crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "ONBOARDING", title: "Journey timeline", lede: "The same path for every joiner, so nothing depends on which manager they got.", action: "Edit journey", meta: "Design · 4 joiners" },
    stats: [
      { l: "IN FLIGHT", v: "4", sub: "joiners" },
      { l: "ON TRACK", v: "3", d: "1 slipping", dir: "flat" },
      { l: "AVG TIME TO READY", v: "18d", d: "▼ 4 days" },
      { l: "90-DAY RETENTION", v: "97%", d: "▲ 2 pts" },
    ],
    left: card(cardHead({ e: "STANDARD JOURNEY", t: "Offer to fully ramped" }) + a.timeline([
      { t: "Offer accepted", s: "Day −45 · contract, right to work, bank details", tag: "Automated", tone: "success", state: "done" },
      { t: "Pre-boarding opens", s: "Day −21 · portal, buddy, equipment, handbook", tag: "Automated", tone: "success", state: "done" },
      { t: "Day one", s: "Systems access, welcome session, team lunch", tag: "Manager", tone: "brand", state: "now" },
      { t: "Week one check-in", s: "Buddy call and first manager 1:1", tag: "Manager" },
      { t: "30-day review", s: "Goals agreed, first pulse survey", tag: "Manager" },
      { t: "90-day review", s: "Full performance conversation, ramp assessed", tag: "Manager" },
    ])),
    right: card(cardHead({ e: "JOINERS", t: "Where each one is" }) + rows([
      P("Aditya Sharma", "Starts 1 Jul · pre-boarding", badge("72%", "success"), 0),
      P("Meera Iyer", "Starts 1 Jul · pre-boarding", badge("54%", "warning"), 1),
      P("Tom Fletcher", "Day 6 · week-one check-in due", badge("On track", "success"), 2),
      P("Lena Novak", "Day 34 · 30-day review overdue", badge("Slipping", "danger"), 3),
    ])),
  }));

add("pre-onboarding", "document-collection-workflow", () =>
  a.dash({
    crumbs: ["Operations", "Cases"], active: "cases",
    head: { eyebrow: "COMPLIANCE", title: "Document collection", lede: "Chased automatically, verified once, stored against the right retention rule.", action: "Send reminders", meta: "4 joiners" },
    stats: [
      { l: "COMPLETE", v: "82%", d: "▲ 9 pts" },
      { l: "OUTSTANDING", v: "5", sub: "documents", d: "2 overdue", dir: "dn" },
      { l: "AVG TURNAROUND", v: "2.4d", d: "▼ 1.1 days" },
      { l: "AUTO-VERIFIED", v: "68%", d: "▲ 14 pts" },
    ],
    left: card(cardHead({ e: "STATUS", t: "Who owes what" }) + table(
      [{ t: "JOINER" }, { t: "DOCUMENT" }, { t: "REQUESTED" }, { t: "STATUS", r: true }],
      [
        ["<b>Aditya Sharma</b>", "Right to work", "12 May", badge("Verified", "success")],
        ["<b>Aditya Sharma</b>", "Bank details", "12 May", badge("Verified", "success")],
        ["<b>Meera Iyer</b>", "Right to work", "14 May", badge("In review", "warning")],
        ["<b>Meera Iyer</b>", "Proof of address", "14 May", badge("Overdue", "danger")],
        ["<b>Tom Fletcher</b>", "Qualification cert.", "2 Jun", badge("Requested", "neutral")],
        ["<b>Lena Novak</b>", "Visa documentation", "20 May", badge("Overdue", "danger")],
      ],
    )),
    right: card(cardHead({ e: "HANDLING", t: "How documents are treated" }) + rows([
      { t: "Encrypted at rest", s: "AES-256, per-tenant keys", right: badge("Always", "success") },
      { t: "Access", s: "HR ops and the named recruiter only", right: badge("Scoped", "brand") },
      { t: "Retention", s: "Purged 6 years after leaving", right: badge("Configurable", "brand") },
      { t: "Auto-verification", s: "Right to work and ID via provider", right: badge("On", "success") },
    ]) + `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Managers never see a joiner's identity documents — only whether the check has cleared.</p>`),
  }));

add("pre-onboarding", "manager-onboarding-dashboard", () =>
  a.dash({
    crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "MANAGER HUB", title: "Your new joiners", lede: "The four things only you can do, and when each one is due.", action: "Mark done", meta: "Design pod" },
    stats: [
      { l: "JOINERS", v: "4" },
      { l: "YOUR TASKS DUE", v: "3", d: "1 overdue", dir: "dn" },
      { l: "TEAM 90-DAY RETENTION", v: "97%", d: "▲ 2 pts" },
      { l: "AVG RAMP", v: "42d", d: "▼ 6 days" },
    ],
    left: card(cardHead({ e: "YOUR ACTIONS", t: "What needs you" }) + rows([
      { ic: "⚠️", t: "Lena Novak · 30-day review", s: "Overdue by 4 days", right: badge("Overdue", "danger") },
      { ic: "📅", t: "Tom Fletcher · week-one 1:1", s: "Due Thursday", right: badge("Due", "warning") },
      { ic: "🎯", t: "Aditya Sharma · draft 30-day goal", s: "Before 1 July", right: badge("Upcoming", "neutral") },
      { ic: "👋", t: "Meera Iyer · assign a buddy", s: "Before 1 July", right: badge("Upcoming", "neutral") },
    ])),
    right: card(cardHead({ e: "VADAL COACHING", t: "Ramp risk" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">Lena's 30-day review is four days overdue and her first pulse came in at 61, eleven points below your team average. In your org, a missed 30-day review roughly doubles 90-day attrition risk.</p>` +
      rows([
        { t: "Book the review today", s: "20 minutes is enough", right: badge("Suggested", "brand") },
        { t: "Ask about tooling access", s: "Two of her comments mention it", right: badge("Suggested", "brand") },
      ])),
  }));

/* ═════════════════════════════════════════════════ skills-intelligence (4) */
add("skills-intelligence", "organization-skills-map", () =>
  a.dash({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "SKILLS", title: "Organisation skills map", lede: "What the company can actually do today, inferred from work rather than self-reported once a year.", action: "Export", meta: "12,480 people · 1,240 skills" },
    stats: [
      { l: "SKILLS MAPPED", v: "1,240", d: "▲ 180" },
      { l: "COVERAGE", v: "91%", sub: "of people", d: "▲ 7 pts" },
      { l: "CRITICAL SKILLS", v: "48", d: "12 at risk", dir: "dn" },
      { l: "CONFIDENCE", v: "88%", d: "▲ 3 pts" },
    ],
    left: card(cardHead({ e: "BY FAMILY", t: "Where capability sits" }) + table(
      [{ t: "SKILL FAMILY" }, { t: "PEOPLE" }, { t: "DEPTH" }, { t: "12M TREND", r: true }],
      [
        ["<b>Software engineering</b><span class=\"sub\">312 distinct skills</span>", "1,840", meter(82, "success") + " " + num("82"), badge("▲ 6", "success")],
        ["<b>Data &amp; analytics</b><span class=\"sub\">148 skills</span>", "620", meter(74, "success") + " " + num("74"), badge("▲ 11", "success")],
        ["<b>Design &amp; research</b><span class=\"sub\">96 skills</span>", "280", meter(79, "success") + " " + num("79"), badge("▲ 4", "success")],
        ["<b>Operations &amp; supply</b><span class=\"sub\">204 skills</span>", "2,140", meter(68, "warning") + " " + num("68"), badge("→ 0", "neutral")],
        ["<b>AI &amp; machine learning</b><span class=\"sub\">88 skills</span>", "94", meter(41, "danger") + " " + num("41"), badge("▲ 22", "success")],
        ["<b>Regulatory &amp; compliance</b><span class=\"sub\">72 skills</span>", "180", meter(56, "warning") + " " + num("56"), badge("▼ 3", "danger")],
      ],
    )),
    right: card(cardHead({ e: "AT RISK", t: "Thin cover" }) + rows([
      { t: "Kubernetes at scale", s: "6 people · 2 near retirement", right: badge("Critical", "danger") },
      { t: "COBOL maintenance", s: "4 people · avg tenure 19 yrs", right: badge("Critical", "danger") },
      { t: "Pharmacovigilance", s: "9 people · single site", right: badge("High", "warning") },
      { t: "ML deployment", s: "11 people · demand up 3×", right: badge("High", "warning") },
      { t: "Welding certification", s: "22 people · 8 expire this year", right: badge("Medium", "warning") },
    ])),
  }));

add("skills-intelligence", "capability-gap-dashboard", () =>
  a.dash({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "SKILLS · GAPS", title: "Capability gaps", lede: "What the plan needs versus what the organisation has, eighteen months out.", action: "Build plan", meta: "vs 2027 plan" },
    stats: [
      { l: "GAPS IDENTIFIED", v: "12", d: "▲ 3", dir: "dn" },
      { l: "LARGEST GAP", v: "148", sub: "people", d: "AI & ML", dir: "flat" },
      { l: "BUILDABLE INTERNALLY", v: "62%", d: "▲ 8 pts" },
      { l: "TIME TO CLOSE", v: "14m", d: "▼ 3 months" },
    ],
    left: card(cardHead({ e: "HAVE VS NEED", t: "By skill family" }) + bars([
      { l: "AI & ML", v: 94, tone: T.danger }, { l: "Data eng.", v: 62, tone: T.warning },
      { l: "Cloud", v: 41, tone: T.warning }, { l: "Cyber", v: 38, tone: T.warning },
      { l: "Design", v: 12, tone: T.success }, { l: "Product", v: 8, tone: T.success },
      { l: "Ops", v: 6, tone: T.success },
    ]) + `<div class="legend"><b><i style="background:${T.danger}"></i>Severe gap</b><b><i style="background:${T.warning}"></i>Moderate</b><b><i style="background:${T.success}"></i>Covered</b></div>`),
    right: card(cardHead({ e: "HOW TO CLOSE IT", t: "Build, buy or borrow" }) + rows([
      { t: "AI & ML · 148 needed", s: "94 buildable from data eng.", right: badge("Build", "brand") },
      { t: "Cloud · 62 needed", s: "Certification path exists", right: badge("Build", "brand") },
      { t: "Cyber · 38 needed", s: "No internal adjacency", right: badge("Buy", "warning") },
      { t: "Data eng. · 41 needed", s: "Partly from analytics", right: badge("Mixed", "info") },
    ]) + `<div style="margin-top:12px">${aiNote("Build is cheaper here than buy", "94 data engineers sit one certification away from the ML gap. Internal moves cost roughly a third of external hires at this level.", "Model both")}</div>`),
  }));

add("skills-intelligence", "individual-development-path-view", () =>
  a.rail({
    crumbs: ["My space", "Home"], active: "home",
    head: { eyebrow: "YOUR GROWTH", title: "Development path", lede: "Where you are, where the roles are opening, and the shortest honest route between them.", action: "Start path", meta: "Updated weekly" },
    rail: card(cardHead({ e: "YOU TODAY", t: "Priya Sharma" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">Senior Data Analyst · 3 yrs 4 mths</p>` +
      `<div style="margin-top:14px"><div class="ch-e">YOUR STRONGEST SKILLS</div>${rows([
        { t: "SQL & modelling", s: "Expert", right: meter(92, "success") },
        { t: "Python", s: "Advanced", right: meter(78, "success") },
        { t: "Stakeholder comms", s: "Advanced", right: meter(74, "success") },
        { t: "ML fundamentals", s: "Working", right: meter(46, "warning") },
        { t: "MLOps", s: "Foundational", right: meter(22, "danger") },
      ])}</div>`),
    canvas: card(cardHead({ e: "TARGET ROLE", t: "Machine Learning Engineer" }, badge("14 open roles", "brand")) +
      a.timeline([
        { t: "ML fundamentals — finish", s: "6 weeks · you are 46% through", tag: "In progress", tone: "brand", state: "now" },
        { t: "Applied ML certification", s: "3 months · company-funded", tag: "Next" },
        { t: "Shadow an ML team", s: "1 day a week for a quarter", tag: "Next" },
        { t: "MLOps foundations", s: "2 months · deployment and monitoring", tag: "Then" },
        { t: "Internal move", s: "14 roles open now, 22 forecast by Q4", tag: "Goal", tone: "success" },
      ]) +
      `<div style="margin-top:14px">${aiNote("Nine people made this exact move last year", "Median time 11 months. Every one of them started from the same ML fundamentals course.", "See their paths")}</div>`),
  }));

add("skills-intelligence", "skills-by-team-heatmap", () =>
  a.full({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "SKILLS · TEAM × FAMILY", title: "Skills by team", lede: "Depth of capability in every team, so a single point of failure is visible before it fails.", action: "Spot gaps", meta: "1,240 skills mapped" },
    body: card(heat(
      ["Eng.", "Data", "Design", "Product", "Ops", "Cyber", "AI/ML"],
      [
        { l: "Platform", v: [88, 74, 62, 68, 71, 66, 48] },
        { l: "Product eng.", v: [86, 68, 79, 84, 64, 58, 41] },
        { l: "Data", v: [72, 91, 58, 71, 62, 61, 64] },
        { l: "Design", v: [59, 61, 92, 81, 58, 52, 38] },
        { l: "Support", v: [64, 62, 60, 66, 79, 58, 36] },
        { l: "Logistics", v: [58, 59, 56, 61, 84, 54, 32] },
        { l: "Plant Ops", v: [56, 58, 54, 59, 88, 51, 28] },
        { l: "Security", v: [71, 66, 55, 62, 68, 89, 44] },
      ],
    ) + `<div class="legend"><b><i style="background:${T.successSoft}"></i>Deep</b><b><i style="background:${T.warningSoft}"></i>Workable</b><b><i style="background:${T.dangerSoft}"></i>Thin</b></div>`),
  }));

/* ══════════════════════════════════════════════ leadership-intelligence (4) */
add("leadership-intelligence", "leadership-impact-dashboard", () =>
  a.dash({
    crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "LEADERSHIP", title: "Leadership impact", lede: "Which managers lift their teams, measured on outcomes rather than on a survey about themselves.", action: "Export", meta: "412 managers" },
    stats: [
      { l: "MANAGER INDEX", v: "76", d: "▲ 3 pts" },
      { l: "TOP QUARTILE", v: "103", sub: "managers", d: "▲ 11" },
      { l: "NEEDS SUPPORT", v: "38", d: "▼ 6", dir: "up" },
      { l: "TEAM LIFT · TOP Q", v: "+11", sub: "pts", d: "vs org avg", dir: "flat" },
    ],
    left: card(cardHead({ e: "BY MANAGER", t: "Team outcomes" }) + table(
      [{ t: "MANAGER" }, { t: "TEAM" }, { t: "ENGAGEMENT" }, { t: "ATTRITION" }, { t: "1:1s", r: true }],
      [
        ["<b>Sara Menon</b>", "Design · 6", meter(88, "success") + " " + num(88), "0%", badge("100%", "success")],
        ["<b>Vikram Shah</b>", "Platform · 11", meter(84, "success") + " " + num(84), "2.1%", badge("92%", "success")],
        ["<b>Elena Duarte</b>", "Support · 14", meter(79, "success") + " " + num(79), "3.4%", badge("86%", "success")],
        ["<b>Marcus Bell</b>", "Product eng. · 9", meter(71, "warning") + " " + num(71), "5.8%", badge("64%", "warning")],
        ["<b>Rina Patel</b>", "Logistics · 22", meter(64, "warning") + " " + num(64), "7.2%", badge("48%", "danger")],
        ["<b>Owen Clarke</b>", "Plant Ops · 31", meter(58, "danger") + " " + num(58), "9.1%", badge("31%", "danger")],
      ],
    )),
    right: card(cardHead({ e: "WHAT SEPARATES THEM", t: "Top vs bottom quartile" }) + rows([
      { t: "1:1 completion", s: "94% vs 41%", right: badge("▲ 53 pts", "success") },
      { t: "Recognition given", s: "8.2 vs 1.4 per month", right: badge("▲ 6×", "success") },
      { t: "Action plans closed", s: "78% vs 22%", right: badge("▲ 56 pts", "success") },
      { t: "Team engagement", s: "84 vs 61", right: badge("▲ 23 pts", "success") },
      { t: "Regretted attrition", s: "1.8% vs 8.4%", right: badge("▼ 6.6 pts", "success") },
    ]) + `<div style="margin-top:12px">${aiNote("1:1 frequency is the strongest single signal", "It predicts team engagement better than tenure, team size or function in your data.", "See the model")}</div>`),
  }));

add("leadership-intelligence", "continuous-360-feedback-interface", () =>
  a.pair({
    crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "360 FEEDBACK", title: "Continuous 360", lede: "A few questions at a time, all year — not ninety questions once, remembered badly.", action: "Request feedback", meta: "Confidential · min. 5 responses" },
    a: card(cardHead({ e: "THIS QUARTER", t: "How your team experiences you" }) + rows([
      { t: "Gives me useful feedback", s: "11 responses", right: meter(84, "success") + " " + num("84") },
      { t: "Removes blockers", s: "11 responses", right: meter(79, "success") + " " + num("79") },
      { t: "Sets clear direction", s: "11 responses", right: meter(72, "warning") + " " + num("72") },
      { t: "Recognises good work", s: "11 responses", right: meter(58, "danger") + " " + num("58") },
      { t: "Protects the team's time", s: "11 responses", right: meter(54, "danger") + " " + num("54") },
    ]) + `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Individual answers are never shown. Scores appear only once five people have responded.</p>`),
    b: card(cardHead({ e: "IN THEIR WORDS", t: "Anonymised comments" }) + rows([
      { ic: "💬", t: "“Always makes time when I'm stuck.”", s: "Direct report · this month" },
      { ic: "💬", t: "“I'd like to know more about where the team is heading next quarter.”", s: "Direct report · this month" },
      { ic: "💬", t: "“Good work tends to pass without comment.”", s: "Direct report · last month" },
      { ic: "💬", t: "“Shields us from a lot, maybe too much sometimes.”", s: "Peer · last month" },
    ]) + `<div style="margin-top:12px">${aiNote("Recognition is your development edge", "Your lowest-scoring theme two quarters running, and the one your team mentions most in open text.", "Draft a plan")}</div>`),
  }));

add("leadership-intelligence", "individual-leader-development-plan", () =>
  a.rail({
    crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "DEVELOPMENT", title: "Your leadership plan", lede: "Two things to work on this quarter, chosen from what your team actually said.", action: "Share with your manager", meta: "Q2 2026" },
    rail: card(cardHead({ e: "YOUR PROFILE", t: "Sara Menon" }) +
      `<p class="muted" style="font-size:13px">Design pod · 6 reports · manager 2 yrs</p>
       <div style="margin-top:16px">${donut(76, "76", T.brand)}</div>
       <div style="margin-top:14px"><div class="ch-e">STRENGTHS</div>
       <div class="pill-row" style="margin-top:8px"><span class="chip on">Feedback</span><span class="chip on">Unblocking</span><span class="chip on">Trust</span></div>
       <div class="ch-e" style="margin-top:14px">TO DEVELOP</div>
       <div class="pill-row" style="margin-top:8px"><span class="chip">Recognition</span><span class="chip">Direction-setting</span></div></div>`),
    canvas: card(cardHead({ e: "THIS QUARTER", t: "Two things, done properly" }) + a.timeline([
      { t: "Recognise two people a week", s: "Your coverage is 58% against an org average of 61%", tag: "In progress", tone: "brand", state: "now" },
      { t: "Run a quarterly direction session", s: "“Where the team is heading” came up in 4 of 11 responses", tag: "Booked 24 Jun", tone: "brand", state: "now" },
      { t: "Re-measure", s: "Next 360 cycle closes 30 September", tag: "Q3" },
    ]) + `<div style="margin-top:16px"><div class="ch-e">SUPPORT AVAILABLE</div>${rows([
      { ic: "🎓", t: "Recognition that lands", s: "40-minute module · 1,240 managers completed" },
      { ic: "🤝", t: "Peer group", s: "Six managers working on the same theme" },
      { ic: "✦", t: "Weekly nudge from Vadal", s: "A name and a reason, every Monday" },
    ])}</div>`),
  }));

add("leadership-intelligence", "high-potential-talent-view", () =>
  a.dash({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "TALENT", title: "High potential", lede: "Identified from contribution, growth rate and peer signal — not from who is most visible.", action: "Export", meta: "Confidential · 84 people" },
    stats: [
      { l: "IDENTIFIED", v: "84", d: "▲ 12" },
      { l: "FROM UNDER-REPRESENTED", v: "41%", d: "▲ 9 pts" },
      { l: "FLIGHT RISK", v: "11", sub: "of 84", d: "needs action", dir: "dn" },
      { l: "PROMOTED · 12M", v: "38", d: "▲ 6" },
    ],
    left: card(cardHead({ e: "SHORTLIST", t: "Highest signal" }) + table(
      [{ t: "PERSON" }, { t: "TEAM" }, { t: "GROWTH" }, { t: "PEER SIGNAL" }, { t: "RISK", r: true }],
      [
        ["<b>Neha Rao</b><span class=\"sub\">Product Designer · 2 yrs</span>", "Design", meter(92, "success"), "Top 5%", badge("Low", "success")],
        ["<b>Dev Patel</b><span class=\"sub\">Junior Designer · 1 yr</span>", "Design", meter(88, "success"), "Top 10%", badge("Low", "success")],
        ["<b>Amara Osei</b><span class=\"sub\">Data Analyst · 3 yrs</span>", "Data", meter(86, "success"), "Top 5%", badge("High", "danger")],
        ["<b>Kabir Rao</b><span class=\"sub\">UX Researcher · 2 yrs</span>", "Design", meter(81, "success"), "Top 15%", badge("Low", "success")],
        ["<b>Luis Ortega</b><span class=\"sub\">Support Lead · 4 yrs</span>", "Support", meter(79, "success"), "Top 10%", badge("Med", "warning")],
      ],
    )),
    right: card(cardHead({ e: "ACT NOW", t: "High potential, high risk" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">Eleven of the 84 are also flagged as flight risks. Amara Osei is the clearest case: top-5% peer signal, no promotion conversation in 14 months, and pay-band clarity raised twice in open text.</p>` +
      rows([
        { t: "Book a career conversation", s: "Within two weeks", right: badge("Suggested", "brand") },
        { t: "Review pay band", s: "Against market and internal peers", right: badge("Suggested", "brand") },
        { t: "Offer the ML path", s: "Matches her stated interest", right: badge("Suggested", "brand") },
      ])),
  }));

/* ═══════════════════════════════════════════════════ workforce-planning (4) */
add("workforce-planning", "scenario-modeling-dashboard", () =>
  a.dash({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "PLANNING", title: "Scenario modelling", lede: "Three plans, side by side, with the attrition and skills consequences of each.", action: "Compare", meta: "FY27 planning" },
    stats: [
      { l: "BASE HEADCOUNT", v: "12,480" },
      { l: "PLAN A · GROWTH", v: "14,200", d: "▲ 1,720", dir: "flat" },
      { l: "PLAN B · HOLD", v: "12,600", d: "▲ 120", dir: "flat" },
      { l: "PLAN C · CONSOLIDATE", v: "11,400", d: "▼ 1,080", dir: "flat" },
    ],
    left: card(cardHead({ e: "HEADCOUNT PATH", t: "Three scenarios to FY27" }, seg(["A", "B", "C", "All"], 3)) +
      line([12480, 12700, 13100, 13500, 13900, 14200], { tone: T.brand })),
    right: card(cardHead({ e: "CONSEQUENCES", t: "What each plan costs" }) + table(
      [{ t: "" }, { t: "A" }, { t: "B" }, { t: "C", r: true }],
      [
        ["<b>Cost</b>", "£142M", "£126M", "£114M"],
        ["<b>Skills gap closed</b>", "82%", "54%", "31%"],
        ["<b>Predicted attrition</b>", "4.4%", "4.8%", "7.9%"],
        ["<b>Time to fill</b>", "58d", "44d", "—"],
        ["<b>Engagement impact</b>", "▲ 2", "→ 0", "▼ 9"],
      ],
    ) + `<div style="margin-top:12px">${aiNote("Plan C looks cheapest and is not", "A nine-point engagement fall drives predicted attrition to 7.9%, and replacing that volume costs more than Plan B saves.", "See the working")}</div>`),
  }));

add("workforce-planning", "skills-aware-headcount-plan", () =>
  a.full({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "PLANNING", title: "Skills-aware headcount plan", lede: "Roles planned against the capability you will actually need, not last year's org chart.", action: "Submit to finance", meta: "FY27 · draft 3" },
    stats: [
      { l: "ROLES PLANNED", v: "1,720", d: "▲ 240 vs draft 2", dir: "flat" },
      { l: "FILLED INTERNALLY", v: "62%", d: "▲ 8 pts" },
      { l: "BUDGET", v: "£142M", d: "within envelope" },
      { l: "SKILLS GAP CLOSED", v: "82%", d: "▲ 21 pts" },
    ],
    body: card(cardHead({ e: "BY FUNCTION", t: "Where the roles go" }, seg(["Function", "Region", "Skill"], 0)) + table(
      [{ t: "FUNCTION" }, { t: "TODAY" }, { t: "FY27" }, { t: "NET" }, { t: "INTERNAL FILL" }, { t: "CRITICAL SKILL", r: true }],
      [
        ["<b>Engineering</b>", "1,840", "2,280", badge("▲ 440", "success"), meter(71, "brand") + " 71%", "AI &amp; ML"],
        ["<b>Data &amp; analytics</b>", "620", "980", badge("▲ 360", "success"), meter(64, "brand") + " 64%", "ML deployment"],
        ["<b>Operations</b>", "2,140", "2,240", badge("▲ 100", "success"), meter(88, "brand") + " 88%", "Automation"],
        ["<b>Support</b>", "540", "620", badge("▲ 80", "success"), meter(79, "brand") + " 79%", "AI triage"],
        ["<b>Design</b>", "280", "340", badge("▲ 60", "success"), meter(58, "brand") + " 58%", "Systems design"],
        ["<b>Corporate</b>", "460", "420", badge("▼ 40", "danger"), meter(92, "brand") + " 92%", "—"],
      ],
    )),
  }));

add("workforce-planning", "real-time-plan-tracking-view", () =>
  a.dash({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "PLANNING", title: "Plan tracking", lede: "Plan versus actual, refreshed nightly from the ATS and HRIS rather than assembled by hand each month.", action: "Export", meta: "As of 9 June" },
    stats: [
      { l: "PLAN · YTD", v: "720", sub: "roles" },
      { l: "ACTUAL", v: "648", d: "▼ 72 behind", dir: "dn" },
      { l: "TIME TO FILL", v: "58d", d: "▲ 6 days", dir: "dn" },
      { l: "BUDGET USED", v: "61%", d: "on track" },
    ],
    left: card(cardHead({ e: "PLAN VS ACTUAL", t: "Cumulative hires" }) + bars([
      { l: "Jan", v: 92 }, { l: "Feb", v: 88 }, { l: "Mar", v: 94 }, { l: "Apr", v: 78, tone: T.warning },
      { l: "May", v: 71, tone: T.danger }, { l: "Jun", v: 64, tone: T.danger },
    ]) + `<div class="legend"><b><i style="background:${T.success}"></i>At or above plan</b><b><i style="background:${T.warning}"></i>Slipping</b><b><i style="background:${T.danger}"></i>Behind</b></div>`),
    right: card(cardHead({ e: "WHERE IT IS SLIPPING", t: "By function" }) + rows([
      { t: "Data & analytics", s: "Plan 120 · actual 74", right: badge("▼ 46", "danger") },
      { t: "Engineering", s: "Plan 280 · actual 258", right: badge("▼ 22", "warning") },
      { t: "Design", s: "Plan 40 · actual 36", right: badge("▼ 4", "warning") },
      { t: "Operations", s: "Plan 220 · actual 220", right: badge("On plan", "success") },
      { t: "Support", s: "Plan 60 · actual 60", right: badge("On plan", "success") },
    ]) + `<div style="margin-top:12px">${aiNote("Data hiring is the constraint", "Forty-six roles behind, and time-to-fill has gone from 44 to 71 days since March. Internal moves would close 28 of them.", "See internal matches")}</div>`),
  }));

add("workforce-planning", "hr-finance-shared-planning-interface", () =>
  a.pair({
    crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "SHARED PLANNING", title: "HR and finance, one view", lede: "The same numbers for both teams, so the plan stops being reconciled in a spreadsheet each month.", action: "Approve", meta: "Awaiting finance sign-off" },
    a: card(cardHead({ e: "HEADCOUNT VIEW", t: "HR" }) + table(
      [{ t: "FUNCTION" }, { t: "ROLES" }, { t: "STATUS", r: true }],
      [
        ["<b>Engineering</b>", "440", badge("Approved", "success")],
        ["<b>Data &amp; analytics</b>", "360", badge("Approved", "success")],
        ["<b>Operations</b>", "100", badge("Approved", "success")],
        ["<b>Support</b>", "80", badge("In review", "warning")],
        ["<b>Design</b>", "60", badge("In review", "warning")],
        ["<b>Corporate</b>", "−40", badge("Approved", "success")],
      ],
    ) + `<div style="margin-top:14px"><div class="kv"><span class="muted">Total net</span><b>+1,000 roles</b></div>
        <div class="kv"><span class="muted">Internal fill assumption</span><b>62%</b></div></div>`),
    b: card(cardHead({ e: "COST VIEW", t: "Finance" }) + table(
      [{ t: "FUNCTION" }, { t: "COST" }, { t: "VS BUDGET", r: true }],
      [
        ["<b>Engineering</b>", "£58.2M", badge("▼ £1.4M", "success")],
        ["<b>Data &amp; analytics</b>", "£41.8M", badge("▲ £2.1M", "danger")],
        ["<b>Operations</b>", "£18.4M", badge("On budget", "success")],
        ["<b>Support</b>", "£9.2M", badge("On budget", "success")],
        ["<b>Design</b>", "£8.1M", badge("▼ £0.3M", "success")],
        ["<b>Corporate</b>", "−£3.6M", badge("▼ £3.6M", "success")],
      ],
    ) + `<div style="margin-top:14px"><div class="kv"><span class="muted">Total</span><b>£132.1M</b></div>
        <div class="kv"><span class="muted">Envelope</span><b>£142.0M</b></div>
        <div class="kv"><span class="muted">Headroom</span><b style="color:${T.success}">£9.9M</b></div></div>`),
  }));
/* ═══════════════════════════════════════════════════ alumni-management (6) */
add("alumni-management", "alumni-portal-home", () =>
  a.dash({ crumbs: ["My space", "Home"], active: "home",
    head: { eyebrow: "ALUMNI", title: "Welcome back, Marcus", lede: "Your record, your documents and what the company is up to — for as long as you want it.", meta: "Alumni since Mar 2024" },
    stats: [{ l: "YEARS HERE", v: "6" }, { l: "NETWORK", v: "4,120", sub: "alumni" }, { l: "OPEN ROLES", v: "38", d: "6 match you", dir: "flat" }, { l: "REFERRALS", v: "3", d: "1 hired" }],
    left: card(cardHead({ e: "FOR YOU", t: "Since you left" }) + rows([
      { ic: "💼", t: "6 roles match your background", s: "Product engineering · London and remote", right: '<span class="btn2 sm">View</span>' },
      { ic: "📰", t: "oliandhue acquires Northwind", s: "Announced 2 June" },
      { ic: "🎉", t: "Your old team shipped v4", s: "Design pod · 12 May" },
      { ic: "📄", t: "Your P60 is ready", s: "Tax year 2025/26", right: '<span class="btn2 sm">Download</span>' },
    ])),
    right: card(cardHead({ e: "YOUR RECORD", t: "Still yours" }) + rows([
      { t: "Employment dates", s: "Mar 2018 – Mar 2024", right: badge("Verified", "success") },
      { t: "Reference letter", s: "Generated on request", right: '<span class="btn2 sm">Request</span>' },
      { t: "Payslips & P60s", s: "6 years retained", right: '<span class="btn2 sm">Open</span>' },
      { t: "Pension provider", s: "Contact details on file", right: '<span class="btn2 sm">Open</span>' },
    ])) }));

add("alumni-management", "exit-and-document-hub", () =>
  a.rail({ crumbs: ["Operations", "Cases"], active: "cases",
    head: { eyebrow: "OFFBOARDING", title: "Exit and documents", lede: "Everything owed in both directions, tracked to completion rather than remembered.", action: "Complete exit", meta: "Last day 30 June" },
    rail: card(cardHead({ e: "PROGRESS", t: "Exit checklist" }) +
      `<div style="display:grid;place-items:center;padding:6px 0 14px">${donut(58, "58%", T.brand)}</div>` +
      rows([{ t: "Exit interview", s: "Booked 26 Jun", right: badge("Booked", "success") },
        { t: "Equipment return", s: "Laptop, badge, phone", right: badge("Pending", "warning") },
        { t: "Access revocation", s: "Scheduled 30 Jun 18:00", right: badge("Scheduled", "brand") },
        { t: "Final pay", s: "Calculated", right: badge("Ready", "success") }])),
    canvas: card(cardHead({ e: "DOCUMENTS", t: "What they receive" }, seg(["Owed to them", "Owed to us"], 0)) + table(
      [{ t: "DOCUMENT" }, { t: "AVAILABLE" }, { t: "RETENTION" }, { t: "STATUS", r: true }],
      [["<b>Final payslip</b>", "5 July", "6 years", badge("Scheduled", "brand")],
       ["<b>P45</b>", "5 July", "6 years", badge("Scheduled", "brand")],
       ["<b>Reference letter</b>", "On request", "Indefinite", badge("Available", "success")],
       ["<b>Pension summary</b>", "Now", "Held by provider", badge("Available", "success")],
       ["<b>Employment record</b>", "Now", "6 years", badge("Available", "success")],
       ["<b>Alumni portal access</b>", "1 July", "Until revoked", badge("Scheduled", "brand")]]) +
      `<div style="margin-top:14px">${aiNote("Exit interview themes feed the loop", "Marcus is the third leaver from Product Engineering this quarter to cite workload. That pattern is already flagged on the attrition model.", "See the theme")}</div>`) }));

add("alumni-management", "job-and-news-feed-for-alumni", () =>
  a.dash({ crumbs: ["My space", "Feed"], active: "feed",
    head: { eyebrow: "ALUMNI FEED", title: "Roles and news", lede: "Openings matched to what you actually did here, and news worth knowing.", action: "Refer someone", meta: "6 new this week" },
    left: card(cardHead({ e: "MATCHED TO YOU", t: "Open roles" }) + rows([
      { ic: "💼", t: "Staff Product Engineer", s: "London · hybrid · posted 3 days ago", right: badge("94% match", "success") },
      { ic: "💼", t: "Engineering Manager, Platform", s: "Remote UK · posted 6 days ago", right: badge("88% match", "success") },
      { ic: "💼", t: "Principal Engineer, Data", s: "London · posted 9 days ago", right: badge("81% match", "success") },
      { ic: "💼", t: "Senior Backend Engineer", s: "Manchester · posted 12 days ago", right: badge("76% match", "warning") },
      { ic: "💼", t: "Solutions Architect", s: "Remote EU · posted 14 days ago", right: badge("71% match", "warning") },
    ])),
    right: card(cardHead({ e: "COMPANY NEWS", t: "What's happened" }) + rows([
      { ic: "📰", t: "oliandhue acquires Northwind", s: "2 June · 340 people joining" },
      { ic: "🏆", t: "Best places to work 2026", s: "24 May · 14th, up from 31st" },
      { ic: "🚀", t: "Platform v4 shipped", s: "12 May · your old team" },
      { ic: "🌍", t: "New Dublin office", s: "28 April · 120 roles opening" },
    ])) }));

add("alumni-management", "boomerang-candidate-pipeline", () =>
  a.dash({ crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "TALENT", title: "Boomerang pipeline", lede: "Former colleagues worth a call — ranked on fit, and on how they actually left.", action: "Start outreach", meta: "4,120 alumni" },
    stats: [{ l: "IN PIPELINE", v: "142" }, { l: "CONTACTED · 90D", v: "38" }, { l: "REHIRED · 12M", v: "24", d: "▲ 9" }, { l: "AVG RAMP", v: "21d", sub: "vs 42d", d: "half the time" }],
    left: card(cardHead({ e: "SHORTLIST", t: "Best fit for open roles" }) + table(
      [{ t: "PERSON" }, { t: "LEFT" }, { t: "MATCHED ROLE" }, { t: "EXIT" }, { t: "FIT", r: true }],
      [["<b>Marcus Bell</b><span class=\"sub\">6 yrs · Product eng.</span>", "Mar 2024", "Staff Product Engineer", badge("Good terms", "success"), num("94%")],
       ["<b>Priya Raman</b><span class=\"sub\">4 yrs · Data</span>", "Aug 2024", "Principal Engineer, Data", badge("Good terms", "success"), num("91%")],
       ["<b>James Okoro</b><span class=\"sub\">7 yrs · Platform</span>", "Jan 2025", "Engineering Manager", badge("Good terms", "success"), num("88%")],
       ["<b>Sofia Lind</b><span class=\"sub\">3 yrs · Design</span>", "Nov 2023", "Senior Product Designer", badge("Good terms", "success"), num("84%")],
       ["<b>Tom Ashby</b><span class=\"sub\">5 yrs · Support</span>", "Jun 2024", "Support Lead", badge("Neutral", "neutral"), num("72%")]])),
    right: card(cardHead({ e: "WHY IT WORKS", t: "Rehires vs external" }) +
      `<div class="kv"><span class="muted">Time to full productivity</span><b>21d vs 42d</b></div>
       <div class="kv"><span class="muted">12-month retention</span><b>94% vs 81%</b></div>
       <div class="kv"><span class="muted">Cost per hire</span><b>£4.2K vs £11.8K</b></div>
       <div class="kv"><span class="muted">First-year performance</span><b>▲ 18%</b></div>` +
      `<div style="margin-top:14px">${aiNote("Only good-terms leavers are surfaced", "Exit conduct and rehire eligibility are checked before anyone appears here. That flag is set by HR, never by the model.", "See the rule")}</div>`) }));

add("alumni-management", "alumni-network-directory", () =>
  a.full({ crumbs: ["My space", "Feed"], active: "feed",
    head: { eyebrow: "NETWORK", title: "Alumni directory", lede: "Four thousand former colleagues, searchable — for those who opted in.", action: "Edit your profile", meta: "4,120 members · opt-in" },
    stats: [{ l: "MEMBERS", v: "4,120", d: "▲ 180" }, { l: "OPTED IN", v: "68%", d: "▲ 6 pts" }, { l: "COUNTRIES", v: "34" }, { l: "INTROS MADE", v: "412", sub: "12m", d: "▲ 22%" }],
    body: card(cardHead({ e: "BROWSE", t: "Find someone" }, seg(["All", "By team", "By city", "Hiring"], 0)) +
      a.tiles([
        { ic: "MB", bg: "#e8e3fe", t: "Marcus Bell", s: "Product Engineering · 2018–2024 · now at Northwind, London" },
        { ic: "PR", bg: "#dff0ff", t: "Priya Raman", s: "Data · 2020–2024 · now Head of Data, Berlin" },
        { ic: "JO", bg: "#e2f7ee", t: "James Okoro", s: "Platform · 2018–2025 · now VP Engineering, remote" },
        { ic: "SL", bg: "#fde9e2", t: "Sofia Lind", s: "Design · 2020–2023 · now founding designer, Stockholm" },
        { ic: "TA", bg: "#fdf1dd", t: "Tom Ashby", s: "Support · 2019–2024 · now CX Lead, Manchester" },
        { ic: "AK", bg: "#e9f2ff", t: "Ayesha Karim", s: "Marketing · 2017–2022 · now CMO, Dubai" },
      ], 3) +
      `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:14px">Only people who opted in appear here, and each of them chooses which fields are visible. Contact details are never shown without consent.</p>`) }));

add("alumni-management", "alumni-engagement-and-revenue-dashboard", () =>
  a.dash({ crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "ALUMNI", title: "Engagement and value", lede: "What the alumni network returns — in referrals, rehires and business introduced.", action: "Export", meta: "Rolling 12 months" },
    stats: [{ l: "ACTIVE ALUMNI", v: "2,810", sub: "68%", d: "▲ 6 pts" }, { l: "REFERRALS", v: "412", d: "▲ 22%" }, { l: "REHIRES", v: "24", d: "▲ 9" }, { l: "PIPELINE INFLUENCED", v: "£4.2M", d: "▲ 31%" }],
    left: card(cardHead({ e: "OVER TIME", t: "Network activity" }) + line([1840, 1980, 2140, 2310, 2480, 2620, 2710, 2760, 2790, 2800, 2806, 2810], { tone: T.brand })),
    right: card(cardHead({ e: "WHERE THE VALUE COMES FROM", t: "Twelve months" }) +
      `<div class="kv"><span class="muted">Referral hires</span><b>96 · £1.1M saved</b></div>
       <div class="kv"><span class="muted">Boomerang rehires</span><b>24 · £182K saved</b></div>
       <div class="kv"><span class="muted">Customer introductions</span><b>38 · £4.2M pipeline</b></div>
       <div class="kv"><span class="muted">Brand advocacy</span><b>2.4M impressions</b></div>` +
      `<div style="margin-top:14px">${aiNote("Referrals are the strongest return", "Alumni-referred hires stay 13 points longer at twelve months than agency hires, and cost a third as much.", "See the breakdown")}</div>`) }));

/* ═══════════════════════════════════════════════════ engagement-surveys (5) */
add("engagement-surveys", "survey-builder-and-template-library", () =>
  a.rail({ crumbs: ["Listening", "Surveys"], active: "surveys",
    head: { eyebrow: "SURVEYS", title: "Survey builder", lede: "Start from a validated template or build your own — the science is already in the question bank.", action: "Launch", meta: "Draft · 12 questions" },
    rail: a.navList("Templates", [
      { t: "Quarterly engagement", s: "12 questions · validated", ic: "★", on: true },
      { t: "Onboarding · 30 day", s: "8 questions", ic: "◆" },
      { t: "Pulse · weekly", s: "4 questions", ic: "◆" },
      { t: "Manager effectiveness", s: "10 questions", ic: "◆" },
      { t: "Wellbeing check", s: "6 questions · confidential", ic: "◆" },
      { t: "Exit interview", s: "14 questions", ic: "◆" },
    ]),
    canvas: card(cardHead({ e: "QUESTIONS", t: "Quarterly engagement" }, seg(["Build", "Preview", "Logic"], 0)) + rows([
      { ic: "1", t: "I would recommend this as a place to work", s: "eNPS · 0–10 scale", right: badge("Validated", "success") },
      { ic: "2", t: "My work gives me a sense of accomplishment", s: "Agreement · 1–5", right: badge("Validated", "success") },
      { ic: "3", t: "My manager gives me useful feedback", s: "Agreement · 1–5", right: badge("Validated", "success") },
      { ic: "4", t: "My workload is sustainable", s: "Agreement · 1–5", right: badge("Validated", "success") },
      { ic: "5", t: "What is one thing we should change?", s: "Open text · AI themed", right: badge("Open", "brand") },
    ]) + `<div style="margin-top:14px">${aiNote("Twelve questions is the sweet spot here", "Completion falls 18% past fifteen questions in your org, and past twenty the open-text quality drops sharply.", "Keep at 12")}</div>`) }));

add("engagement-surveys", "omnichannel-distribution-panel", () =>
  a.dash({ crumbs: ["Listening", "Surveys"], active: "surveys",
    head: { eyebrow: "SURVEYS", title: "Distribution", lede: "Reach everyone — including the 2,140 people with no company email address.", action: "Send now", meta: "12,480 recipients" },
    stats: [{ l: "REACHABLE", v: "100%", sub: "12,480", d: "▲ 17 pts" }, { l: "NO COMPANY EMAIL", v: "2,140", d: "covered by SMS/WhatsApp", dir: "flat" }, { l: "CHANNELS ON", v: "6" }, { l: "LANGUAGES", v: "12" }],
    left: card(cardHead({ e: "CHANNELS", t: "How it goes out" }) + a.toggles([
      { t: "Email", s: "10,340 addressable · best for desk-based" },
      { t: "SMS", s: "2,140 with no company inbox · 92% reach last cycle" },
      { t: "WhatsApp", s: "1,880 opted in · 88% reach last cycle" },
      { t: "Microsoft Teams", s: "8,120 active · in-client survey card" },
      { t: "Slack", s: "3,240 active · in-client survey card" },
      { t: "QR code on site", s: "Posters at 14 sites · no login required" },
      { t: "Kiosk mode", s: "Shared shop-floor terminals", on: false },
    ])),
    right: card(cardHead({ e: "PREDICTED REACH", t: "By workforce group" }) + rows([
      { t: "Desk-based", s: "Email + Teams + Slack", right: meter(94, "success") + " " + num("94%") },
      { t: "Frontline · day", s: "SMS + WhatsApp + QR", right: meter(88, "success") + " " + num("88%") },
      { t: "Frontline · night", s: "SMS + QR + kiosk", right: meter(74, "warning") + " " + num("74%") },
      { t: "Field & remote", s: "SMS + WhatsApp", right: meter(86, "success") + " " + num("86%") },
    ]) + `<div style="margin-top:12px">${aiNote("Turn on kiosk mode for night shift", "Night-shift reach is 74% against 88% for day. Shop-floor terminals closed most of that gap at the two sites that piloted it.", "Enable kiosks")}</div>`) }));

add("engagement-surveys", "real-time-response-dashboard", () =>
  a.dash({ crumbs: ["Listening", "Surveys"], active: "surveys",
    head: { eyebrow: "SURVEYS · LIVE", title: "Response dashboard", lede: "Watch it come in, and nudge only the groups that are actually behind.", action: "Send nudge", meta: "Closes Friday 18:00" },
    stats: [{ l: "RESPONSES", v: "9,240", sub: "of 12,480", d: "▲ 1,120 today" }, { l: "PARTICIPATION", v: "74%", d: "▲ 6 pts vs last" }, { l: "MEDIAN TIME", v: "3m 12s", d: "▼ 24s" }, { l: "OPEN TEXT", v: "4,120", d: "44% left a comment" }],
    left: card(cardHead({ e: "LAST 7 DAYS", t: "Responses per day" }) + bars([
      { l: "Mon", v: 42 }, { l: "Tue", v: 78 }, { l: "Wed", v: 94, tone: T.success }, { l: "Thu", v: 61 },
      { l: "Fri", v: 38 }, { l: "Sat", v: 12, tone: T.strong }, { l: "Sun", v: 9, tone: T.strong },
    ])),
    right: card(cardHead({ e: "WHO IS BEHIND", t: "By team" }) + rows([
      { t: "Design", s: "6 of 6", right: badge("100%", "success") },
      { t: "Product", s: "142 of 160", right: badge("89%", "success") },
      { t: "Sales", s: "498 of 610", right: badge("82%", "success") },
      { t: "Engineering", s: "612 of 860", right: badge("71%", "warning") },
      { t: "Logistics", s: "418 of 720", right: badge("58%", "warning") },
      { t: "Plant Ops · night", s: "372 of 910", right: badge("41%", "danger") },
    ]) + `<div style="margin-top:12px">${aiNote("Nudge night shift at handover", "A 06:00 SMS lifted night-shift completion 22 points last cycle. Nothing else moved it.", "Schedule nudge")}</div>`) }));

add("engagement-surveys", "ai-feedback-theme-analysis", () =>
  a.dash({ crumbs: ["Listening", "Surveys"], active: "surveys",
    head: { eyebrow: "SURVEYS · AI", title: "Theme analysis", lede: "Four thousand comments, read and grouped in minutes rather than a fortnight of manual coding.", action: "Ask Vadal", meta: "4,120 comments" },
    stats: [{ l: "COMMENTS READ", v: "4,120", d: "100%" }, { l: "THEMES FOUND", v: "18", d: "6 rising", dir: "flat" }, { l: "TIME SAVED", v: "~14d", sub: "manual coding", d: "estimated", dir: "flat" }, { l: "CONFIDENCE", v: "91%", d: "▲ 3 pts" }],
    left: card(cardHead({ e: "THEMES", t: "What people wrote about" }) + table(
      [{ t: "THEME" }, { t: "MENTIONS" }, { t: "SENTIMENT" }, { t: "CHANGE", r: true }],
      [["<b>Workload &amp; burnout</b><span class=\"sub\">Engineering, Plant Ops</span>", "312", meter(38, "danger"), badge("▲ 22", "danger")],
       ["<b>Recognition</b><span class=\"sub\">Org-wide</span>", "268", meter(84, "success"), badge("▲ 12", "success")],
       ["<b>Team &amp; belonging</b>", "214", meter(79, "success"), badge("▲ 8", "success")],
       ["<b>Pay &amp; growth</b><span class=\"sub\">Support, Logistics</span>", "176", meter(46, "danger"), badge("▲ 6", "danger")],
       ["<b>Return to office</b><span class=\"sub\">Plant Ops</span>", "154", meter(41, "danger"), badge("▲ 31", "danger")],
       ["<b>Tooling &amp; process</b>", "142", meter(58, "warning"), badge("▼ 4", "success")]])),
    right: card(cardHead({ e: "AI COMMENT SUMMARY", t: "What people are saying" }) +
      `<div style="font-size:13px;line-height:1.7;color:${T.muted}">
        <p>• <b style="color:${T.ink}">Recognition and team belonging</b> are the strongest positive drivers, both rising for three straight months.</p>
        <p style="margin-top:11px">• <b style="color:${T.ink}">Workload after the reorg</b> is the dominant negative theme, concentrated in Engineering and Plant Ops rather than spread across the org.</p>
        <p style="margin-top:11px">• A new signal: <b style="color:${T.ink}">“appraisal timeline”</b> questions are spiking in Engineering ahead of the review cycle.</p>
      </div>` +
      `<div style="margin-top:14px"><span class="btn2 sm">Read sample comments</span></div>`) }));

add("engagement-surveys", "action-plan-tracker", () =>
  a.dash({ crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "ACTION", title: "Action plan tracker", lede: "Every commitment made after the survey, with an owner, a date and a measured result.", action: "New plan", meta: "38 plans live" },
    stats: [{ l: "PLANS LIVE", v: "38", d: "▲ 6" }, { l: "ON TRACK", v: "71%", d: "▲ 9 pts" }, { l: "CLOSED · 90D", v: "24", d: "▲ 11" }, { l: "MEASURED LIFT", v: "+4.1", sub: "pts", d: "avg" }],
    left: card(cardHead({ e: "IN FLIGHT", t: "What teams committed to" }) + table(
      [{ t: "ACTION" }, { t: "OWNER" }, { t: "DUE" }, { t: "PROGRESS" }, { t: "LIFT", r: true }],
      [["<b>Rebalance sprint load</b><span class=\"sub\">Engineering</span>", "M. Bell", "30 Jun", meter(70, "success"), badge("+3.8", "success")],
       ["<b>Monthly 1:1 cadence</b><span class=\"sub\">Logistics</span>", "R. Patel", "15 Jul", meter(40, "warning"), badge("Pending", "neutral")],
       ["<b>Night-shift recognition</b><span class=\"sub\">Plant Ops</span>", "O. Clarke", "31 Jul", meter(25, "danger"), badge("Pending", "neutral")],
       ["<b>Pay band publication</b><span class=\"sub\">Org-wide</span>", "HR", "30 Sep", meter(55, "warning"), badge("Pending", "neutral")],
       ["<b>Meeting-free Wednesdays</b><span class=\"sub\">Product</span>", "S. Menon", "Closed", meter(100, "success"), badge("+5.2", "success")]])),
    right: card(cardHead({ e: "PROVEN", t: "Closed with measured lift" }) + rows([
      { t: "Meeting-free Wednesdays", s: "Product · closed 12 May", right: badge("+5.2 pts", "success") },
      { t: "Onboarding buddy scheme", s: "Org-wide · closed 28 Apr", right: badge("+4.6 pts", "success") },
      { t: "Recognition programme", s: "Org-wide · closed 31 Mar", right: badge("+7.1 pts", "success") },
      { t: "Manager 1:1 training", s: "All managers · closed 14 Mar", right: badge("+3.4 pts", "success") },
    ]) + `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Lift is measured against each team's own baseline before the action started, not against the org average.</p>`) }));

/* ═══════════════════════════════════════════════════ employee-listening (2) */
add("employee-listening", "lifecycle-listening-timeline", () =>
  a.dash({ crumbs: ["Listening", "Always-on listening"], active: "listening",
    head: { eyebrow: "LISTEN", title: "Lifecycle listening", lede: "A question at each moment that matters, instead of one long survey twice a year.", action: "Edit moments", meta: "9 moments live" },
    stats: [{ l: "MOMENTS LIVE", v: "9" }, { l: "TRIGGERED · 30D", v: "1,840" }, { l: "RESPONSE RATE", v: "81%", d: "▲ 7 pts" }, { l: "AVG LENGTH", v: "48s", d: "▼ 12s" }],
    left: card(cardHead({ e: "THE JOURNEY", t: "When we ask" }) + a.timeline([
      { t: "Offer accepted", s: "Why did you choose us? · 3 questions", tag: "86", tone: "success", state: "done" },
      { t: "Day 7", s: "Do you have what you need? · 4 questions", tag: "88", tone: "success", state: "done" },
      { t: "Day 30", s: "Is the job what you expected? · 5 questions", tag: "86", tone: "success", state: "done" },
      { t: "Day 90", s: "How is it going now? · 5 questions", tag: "77", tone: "warning", state: "now" },
      { t: "Year one", s: "Would you recommend us? · 6 questions", tag: "71", tone: "warning" },
      { t: "Year two", s: "What would keep you here? · 6 questions", tag: "58", tone: "danger" },
      { t: "Exit", s: "What made you leave? · 8 questions", tag: "66", tone: "warning" },
    ])),
    right: card(cardHead({ e: "THE DROP", t: "Year two" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">The steepest fall in the lifecycle — thirteen points between month 14 and month 22. Career path and stretch work dominate the open text at this stage.</p>` +
      line([86, 88, 86, 77, 71, 58], { tone: T.danger }) +
      rows([{ t: "Career path unclear", s: "142 mentions", right: badge("Rising", "danger") },
        { t: "No stretch work", s: "98 mentions", right: badge("Rising", "danger") }])) }));

add("employee-listening", "real-time-signal-feed", () =>
  a.dash({ crumbs: ["Listening", "Always-on listening"], active: "listening",
    head: { eyebrow: "LISTEN · LIVE", title: "Signal feed", lede: "Every comment as it arrives, classified and routed to whoever can act on it.", action: "Route all", meta: "Live · 38 today" },
    stats: [{ l: "SIGNALS TODAY", v: "38", d: "▲ 12" }, { l: "AUTO-ROUTED", v: "84%", d: "▲ 9 pts" }, { l: "TOPICS RISING", v: "4", d: "▲ 1", dir: "dn" }, { l: "RISKS FLAGGED", v: "3", d: "needs action", dir: "dn" }],
    left: card(cardHead({ e: "AS IT HAPPENS", t: "Live signal stream" }, badge("Live", "success")) + rows([
      { ic: "💬", t: "“Can we get clarity on the return-to-office policy?”", s: "Chat · Return to office · just now", right: '<span class="btn2 sm">Route</span>' },
      { ic: "💬", t: "“Another weekend of on-call — we can't keep shipping like this.”", s: "Chat · Workload & burnout · 12m", right: '<span class="btn2 sm">Route</span>' },
      { ic: "📣", t: "“Huge shout-out to Design for the onboarding revamp.”", s: "Feed · Recognition · 28m", right: '<span class="btn2 sm">Route</span>' },
      { ic: "📝", t: "“When does the appraisal window actually open this cycle?”", s: "Survey · Appraisal timeline · 1h", right: '<span class="btn2 sm">Route</span>' },
      { ic: "💬", t: "“3 days in office is a lot with my commute.”", s: "Chat · Return to office · 2h", right: '<span class="btn2 sm">Route</span>' },
      { ic: "🗒️", t: "“Wants a clearer growth path to senior.”", s: "1:1 notes · Career growth · 3h", right: '<span class="btn2 sm">Route</span>' },
    ])),
    right: card(cardHead({ e: "TRENDING NOW", t: "Tracked topics" }) + rows([
      { t: "Workload & burnout", s: "312 signals · 30d", right: badge("▲ 22", "danger") },
      { t: "Return to office", s: "154 signals · 30d", right: badge("▲ 31", "danger") },
      { t: "Recognition", s: "268 signals · 30d", right: badge("▲ 12", "success") },
      { t: "Career growth", s: "142 signals · 30d", right: badge("→ 0", "neutral") },
      { t: "Appraisal timeline", s: "88 signals · 30d", right: badge("New", "warning") },
    ])) }));

/* ════════════════════════════════════════════════ feedback-intelligence (2) */
add("feedback-intelligence", "sentiment-intensity-heatmap", () =>
  a.full({ crumbs: ["Listening", "Sentiment"], active: "sentiment",
    head: { eyebrow: "INTENSITY", title: "Sentiment intensity", lede: "Not just whether a theme is negative, but how strongly people feel about it, team by team.", action: "Spot hotspots", meta: "4,120 comments" },
    body: card(heat(
      ["Recognition", "Belonging", "Workload", "Pay", "Tooling", "Leadership"],
      [{ l: "Design", v: [92, 88, 74, 68, 79, 81] },
       { l: "Product", v: [86, 84, 66, 64, 74, 78] },
       { l: "Sales", v: [84, 81, 71, 58, 72, 76] },
       { l: "Support", v: [74, 76, 52, 48, 61, 68] },
       { l: "Engineering", v: [79, 74, 34, 56, 58, 62] },
       { l: "Logistics", v: [66, 68, 48, 44, 62, 64] },
       { l: "Plant Ops", v: [52, 61, 28, 41, 58, 54] },
       { l: "Night shift", v: [44, 58, 24, 38, 56, 51] }])
      + `<div class="legend"><b><i style="background:${T.successSoft}"></i>Felt positively</b><b><i style="background:${T.warningSoft}"></i>Mixed</b><b><i style="background:${T.dangerSoft}"></i>Felt strongly against</b></div>`) }));

add("feedback-intelligence", "priority-themes-panel", () =>
  a.dash({ crumbs: ["Listening", "Sentiment"], active: "sentiment",
    head: { eyebrow: "PRIORITISE", title: "Priority themes", lede: "Ranked by how many people it touches, how strongly they feel and how much it moves retention.", action: "Create action plans", meta: "18 themes scored" },
    left: card(cardHead({ e: "RANKED", t: "Where to spend the quarter" }) + table(
      [{ t: "#" }, { t: "THEME" }, { t: "REACH" }, { t: "INTENSITY" }, { t: "RETENTION IMPACT" }, { t: "PRIORITY", r: true }],
      [["1", "<b>Workload &amp; burnout</b><span class=\"sub\">Engineering, Plant Ops</span>", "2,140", meter(88, "danger"), "−1.9 pts", badge("Critical", "danger")],
       ["2", "<b>Pay &amp; growth</b><span class=\"sub\">Support, Logistics</span>", "1,260", meter(72, "danger"), "−0.8 pts", badge("High", "danger")],
       ["3", "<b>Return to office</b><span class=\"sub\">Plant Ops</span>", "910", meter(69, "warning"), "−0.4 pts", badge("High", "warning")],
       ["4", "<b>Career growth</b><span class=\"sub\">Year-two cohort</span>", "880", meter(61, "warning"), "−0.6 pts", badge("Medium", "warning")],
       ["5", "<b>Appraisal timeline</b><span class=\"sub\">Engineering</span>", "420", meter(54, "warning"), "−0.1 pts", badge("Watch", "neutral")]])),
    right: card(cardHead({ e: "THE CASE", t: "Workload & burnout" }) +
      `<div class="big" style="color:${T.danger}">2,140</div>
       <p class="muted" style="font-size:13px;line-height:1.6;margin-top:8px">people in teams where workload is the dominant negative theme. It is the only theme that ranks top-three on all three measures.</p>` +
      `<div class="kv"><span class="muted">Mentions this quarter</span><b>312 ▲ 22%</b></div>
       <div class="kv"><span class="muted">Intensity</span><b>88 / 100</b></div>
       <div class="kv"><span class="muted">Modelled attrition impact</span><b>−1.9 pts</b></div>
       <div class="kv"><span class="muted">People at stake</span><b>≈ 210 over 12m</b></div>` +
      `<div style="margin-top:14px">${aiNote("Start with sprint load in Engineering", "The single biggest concentration, and the one with a named owner already in the action tracker.", "Open the plan")}</div>`) }));

/* ═════════════════════════════════════════════════════ action-planning (2) */
add("action-planning", "action-plan-board-drag-and-drop", () =>
  a.full({ crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "ACTION", title: "Action board", lede: "Drag a recommendation into the plan and it becomes work with an owner and a date.", action: "New action", meta: "Design pod · Q2" },
    body: card(a.board([
      { t: "SUGGESTED", items: [
        { t: "Recognise Rohan and Sara", b: "Recognition", who: "SM", n: 0 },
        { t: "Publish pay bands for the pod", b: "Pay & growth", who: "HR", n: 1 },
        { t: "Add an 18-month career chat", b: "Career growth", who: "SM", n: 0 }] },
      { t: "PLANNED", items: [
        { t: "Quarterly direction session", b: "Due 24 Jun", who: "SM", n: 0 },
        { t: "Rotate on-call fairly", b: "Due 30 Jun", who: "MB", n: 2 }] },
      { t: "IN PROGRESS", items: [
        { t: "Rebalance sprint load", b: "70% · due 30 Jun", who: "MB", n: 2 },
        { t: "Monthly 1:1 cadence", b: "40% · due 15 Jul", who: "RP", n: 3 }] },
      { t: "DONE · MEASURED", items: [
        { t: "Meeting-free Wednesdays", b: "+5.2 pts", who: "SM", n: 0 },
        { t: "Onboarding buddy scheme", b: "+4.6 pts", who: "HR", n: 1 },
        { t: "Recognition programme", b: "+7.1 pts", who: "HR", n: 1 }] },
    ])) }));

add("action-planning", "manager-accountability-dashboard", () =>
  a.dash({ crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "ACCOUNTABILITY", title: "Who is closing the loop", lede: "Not a league table — a list of who needs help finishing what their team asked for.", action: "Send reminders", meta: "412 managers" },
    stats: [{ l: "PLANS CLOSED", v: "71%", d: "▲ 9 pts" }, { l: "OVERDUE", v: "24", d: "▼ 8", dir: "up" }, { l: "NO PLAN YET", v: "38", sub: "managers", d: "▼ 12", dir: "up" }, { l: "AVG TIME TO CLOSE", v: "42d", d: "▼ 9 days" }],
    left: card(cardHead({ e: "BY MANAGER", t: "Follow-through" }) + table(
      [{ t: "MANAGER" }, { t: "TEAM" }, { t: "PLANS" }, { t: "CLOSED" }, { t: "STATUS", r: true }],
      [["<b>Sara Menon</b>", "Design · 6", "3", meter(100, "success") + " 3/3", badge("Complete", "success")],
       ["<b>Vikram Shah</b>", "Platform · 11", "4", meter(75, "success") + " 3/4", badge("On track", "success")],
       ["<b>Elena Duarte</b>", "Support · 14", "3", meter(67, "warning") + " 2/3", badge("On track", "success")],
       ["<b>Marcus Bell</b>", "Product eng. · 9", "4", meter(50, "warning") + " 2/4", badge("Slipping", "warning")],
       ["<b>Rina Patel</b>", "Logistics · 22", "2", meter(0, "danger") + " 0/2", badge("Overdue", "danger")],
       ["<b>Owen Clarke</b>", "Plant Ops · 31", "0", meter(0, "danger") + " —", badge("No plan", "danger")]])),
    right: card(cardHead({ e: "WHY IT MATTERS", t: "Closing the loop" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">Teams whose managers closed at least one action plan scored eleven points higher at the next survey. Teams where nothing was closed fell three.</p>` +
      bars([{ l: "Closed 2+", v: 88, tone: T.success }, { l: "Closed 1", v: 79, tone: T.success }, { l: "In progress", v: 71, tone: T.warning }, { l: "None", v: 58, tone: T.danger }]) +
      `<div style="margin-top:12px">${aiNote("Owen Clarke needs help, not a reminder", "Thirty-one reports and no plan yet. The largest span in the org — offer HRBP support rather than another nudge.", "Assign support")}</div>`) }));

/* ═══════════════════════════════════════════════════ ai-employee-chat (2) */
add("ai-employee-chat", "escalation-and-ticketing-view", () =>
  a.dash({ crumbs: ["Operations", "Cases"], active: "cases",
    head: { eyebrow: "OPERATIONS", title: "Escalations", lede: "What the assistant could not answer, handed to a person with the full thread attached.", action: "New case", meta: "6 open" },
    stats: [{ l: "AUTO-RESOLVED", v: "78%", d: "▲ 6 pts" }, { l: "ESCALATED", v: "6", sub: "open", d: "▼ 3", dir: "up" }, { l: "SLA BREACHED", v: "1", d: "needs action", dir: "dn" }, { l: "AVG RESOLUTION", v: "4.2d", d: "▼ 0.8d" }],
    left: card(cardHead({ e: "CASELOAD", t: "Escalated to a person" }, seg(["All", "Open", "In progress", "Escalated", "Resolved"], 0)) + table(
      [{ t: "CASE" }, { t: "CATEGORY" }, { t: "OWNER" }, { t: "SLA" }, { t: "STATUS", r: true }],
      [["<b>Flight-risk follow-up</b><span class=\"sub\">CASE-118</span>", badge("Flight risk", "danger"), "A. Mehta", "1d", badge("In progress", "warning")],
       ["<b>Burnout signal — sustained overload</b><span class=\"sub\">CASE-117</span>", badge("Burnout", "danger"), "R. Iyer", "3d", badge("Open", "info")],
       ["<b>Grievance — appraisal fairness</b><span class=\"sub\">CASE-114</span>", badge("Grievance", "warning"), "Confidential", "Breached", badge("Escalated", "danger")],
       ["<b>Pay &amp; growth concern</b><span class=\"sub\">CASE-112</span>", badge("Pay", "warning"), "S. Khan", "4d", badge("In progress", "warning")],
       ["<b>Visa documentation query</b><span class=\"sub\">CASE-109</span>", badge("Compliance", "info"), "HR ops", "6d", badge("In progress", "warning")]])),
    right: card(cardHead({ e: "WHY IT ESCALATED", t: "CASE-114" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">The assistant declined to answer and routed straight to a person. Grievance and anything involving a named colleague are never handled by AI.</p>` +
      rows([{ t: "Category", s: "Grievance", right: badge("Never AI", "danger") },
        { t: "Thread attached", s: "4 messages, full context", right: badge("Yes", "success") },
        { t: "Visible to", s: "ER team only", right: badge("Restricted", "brand") },
        { t: "Employee informed", s: "Automatically, at handoff", right: badge("Yes", "success") }])) }));

add("ai-employee-chat", "knowledge-source-management", () =>
  a.rail({ crumbs: ["Knowledge", "Knowledge"], active: "knowledge",
    head: { eyebrow: "KNOWLEDGE", title: "Sources", lede: "What the assistant is allowed to read, how fresh it is, and what it must never quote.", action: "Add source", meta: "14 sources" },
    rail: card(cardHead({ e: "HEALTH", t: "Source freshness" }) +
      `<div style="display:grid;place-items:center;padding:6px 0 12px">${donut(84, "84%", T.success)}</div>
       <div class="kv"><span class="muted">Fresh (&lt; 90 days)</span><b>11</b></div>
       <div class="kv"><span class="muted">Ageing</span><b>2</b></div>
       <div class="kv"><span class="muted">Stale (&gt; 1 yr)</span><b style="color:${T.danger}">1</b></div>`),
    canvas: card(cardHead({ e: "CONNECTED", t: "What the assistant reads" }) + table(
      [{ t: "SOURCE" }, { t: "ITEMS" }, { t: "UPDATED" }, { t: "SCOPE" }, { t: "STATUS", r: true }],
      [["<b>Leave &amp; time-off policy</b>", "18", "2 months ago", "All staff", badge("Fresh", "success")],
       ["<b>Payroll &amp; benefits</b>", "24", "3 months ago", "All staff", badge("Fresh", "success")],
       ["<b>IT &amp; tools handbook</b>", "41", "1 month ago", "All staff", badge("Fresh", "success")],
       ["<b>Onboarding guides</b>", "12", "2 weeks ago", "New joiners", badge("Fresh", "success")],
       ["<b>Wellbeing &amp; EAP</b>", "9", "1 month ago", "All staff", badge("Fresh", "success")],
       ["<b>Relocation policy</b>", "6", "14 months ago", "All staff", badge("Stale", "danger")],
       ["<b>Compensation bands</b>", "—", "—", "HR only", badge("Excluded", "neutral")]]) +
      `<div style="margin-top:14px">${aiNote("Relocation policy is 14 months old", "The assistant answered 41 relocation questions last month from a document nobody has reviewed since last April.", "Flag for review")}</div>`) }));

/* ═══════════════════════════════════════════════════ tasks-workflow (3) */
add("tasks-workflow", "task-dashboard", () =>
  a.dash({ crumbs: ["Operations", "Cases"], active: "cases",
    head: { eyebrow: "OPERATIONS", title: "Tasks", lede: "Everything owed by you and to you, with the SLA clock visible on each one.", action: "New task", meta: "12 open" },
    stats: [{ l: "OPEN", v: "12", d: "▼ 4", dir: "up" }, { l: "DUE TODAY", v: "3", d: "1 overdue", dir: "dn" }, { l: "AVG CLOSE", v: "2.1d", d: "▼ 0.4d" }, { l: "SLA MET", v: "94%", d: "▲ 3 pts" }],
    left: card(cardHead({ e: "YOUR QUEUE", t: "What needs you" }, seg(["Mine", "Team", "All"], 0)) + table(
      [{ t: "TASK" }, { t: "SOURCE" }, { t: "DUE" }, { t: "STATUS", r: true }],
      [["<b>30-day review — Lena Novak</b>", "Onboarding", "4 days ago", badge("Overdue", "danger")],
       ["<b>Approve leave — D. Patel</b>", "Leave request", "Today", badge("Due", "warning")],
       ["<b>Week-one 1:1 — Tom Fletcher</b>", "Onboarding", "Today", badge("Due", "warning")],
       ["<b>Close action: sprint load</b>", "Action plan", "30 Jun", badge("In progress", "info")],
       ["<b>Sign off pay review — pod</b>", "Compensation", "5 Jul", badge("Open", "neutral")],
       ["<b>Recognise Rohan Mehta</b>", "Vadal suggestion", "No date", badge("Suggested", "brand")]])),
    right: card(cardHead({ e: "BY SOURCE", t: "Where tasks come from" }) + bars([
      { l: "Onboard", v: 34 }, { l: "Leave", v: 28 }, { l: "Actions", v: 22 },
      { l: "Cases", v: 18 }, { l: "Vadal", v: 41, tone: T.brand }, { l: "Comp", v: 12 },
    ]) + `<div style="margin-top:12px">${aiNote("Most of your queue is generated, not typed", "Forty-one of the last hundred tasks came from Vadal spotting something, rather than someone raising it.", "See the rules")}</div>`) }));

add("tasks-workflow", "workflow-builder", () =>
  a.rail({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "WORKFLOW", title: "Workflow builder", lede: "When this happens, do that — without an integration project.", action: "Publish", meta: "Draft · 6 steps" },
    rail: a.navList("Workflows", [
      { t: "Flight-risk follow-up", s: "Live · 38 runs", ic: "▶", on: true },
      { t: "New joiner setup", s: "Live · 142 runs", ic: "▶" },
      { t: "Leave approval", s: "Live · 1,240 runs", ic: "▶" },
      { t: "Burnout escalation", s: "Live · 24 runs", ic: "▶" },
      { t: "Exit checklist", s: "Live · 86 runs", ic: "▶" },
      { t: "Pay review cycle", s: "Draft", ic: "◻" },
    ]),
    canvas: card(cardHead({ e: "FLIGHT-RISK FOLLOW-UP", t: "When this happens…" }) + a.timeline([
      { t: "Trigger — attrition risk turns High", s: "Model confidence above 85%", tag: "Trigger", tone: "brand", state: "now" },
      { t: "Check — has a 1:1 happened in 14 days?", s: "If yes, stop here", tag: "Condition", state: "done" },
      { t: "Create a case", s: "Owner: the person's manager · SLA 3 days", tag: "Action", tone: "success", state: "done" },
      { t: "Draft 1:1 prep", s: "Drivers, recent sentiment, three things to raise", tag: "Action", tone: "success", state: "done" },
      { t: "Notify HRBP", s: "Only if the case is still open after 5 days", tag: "Escalation", tone: "warning" },
      { t: "Measure", s: "Re-score risk after 30 days and record the outcome", tag: "Close the loop", tone: "success" },
    ])) }));

add("tasks-workflow", "mobile-task-view", () =>
  k.phone({ title: { t: "Your tasks", s: "3 due today" },
    body: `<div class="card" style="background:${T.dangerSoft};border-color:transparent">
        <div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.danger}">OVERDUE · 4 DAYS</div>
        <div style="font-size:14.5px;font-weight:700;margin-top:6px">30-day review — Lena Novak</div>
        <p style="font-size:12px;color:${T.muted};margin-top:5px;line-height:1.5">Twenty minutes is enough. Vadal has drafted the prep.</p>
        <div style="margin-top:10px"><span class="btn sm">Book now</span></div></div>` +
      k.card(`<div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.faint}">DUE TODAY</div>
        <div style="margin-top:10px;font-size:13px;font-weight:600">Approve leave — D. Patel</div>
        <div style="font-size:11.5px;color:${T.faint};margin-top:2px">5 days · 12–16 July</div>
        <div style="display:flex;gap:8px;margin-top:10px"><span class="btn sm">Approve</span><span class="btn2 sm">Decline</span></div>`) +
      k.card(`<div style="font-size:13px;font-weight:600">Week-one 1:1 — Tom Fletcher</div>
        <div style="font-size:11.5px;color:${T.faint};margin-top:2px">Today · not yet booked</div>
        <div style="margin-top:10px"><span class="btn2 sm">Find a slot</span></div>`) }));

/* ═══════════════════════════════════════════════════ mobile-e-learning (4) */
add("mobile-e-learning", "mobile-learning-home", () =>
  k.phone({ title: { t: "Learning", s: "12 minutes to finish this week" },
    body: `<div class="card" style="background:${T.brandSoft};border-color:transparent">
        <div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.brandStrong}">CONTINUE</div>
        <div style="font-size:15px;font-weight:700;margin-top:6px;line-height:1.3">Recognition that lands</div>
        <p style="font-size:12px;color:${T.muted};margin-top:5px">Module 3 of 5 · 8 minutes left</p>
        <span class="mtr" style="width:100%;margin-top:11px"><i style="width:62%;background:${T.brand}"></i></span>
        <div style="margin-top:11px"><span class="btn sm">Resume</span></div></div>` +
      k.card(`<div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.faint}">DUE THIS WEEK</div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:10px">
          <span class="rw-ic" style="background:${T.dangerSoft}">🔒</span>
          <span class="rw-m"><b>Security refresher</b><i>12 min · compliance</i></span>
          <span class="bdg danger">Due Fri</span></div>`) +
      k.card(`<div style="font-size:10px;font-weight:700;letter-spacing:.1em;color:${T.faint}">FOR YOU</div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:10px">
          <span class="rw-ic" style="background:${T.successSoft}">🎓</span>
          <span class="rw-m"><b>ML fundamentals</b><i>Matches your growth path</i></span></div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:12px">
          <span class="rw-ic" style="background:${T.infoSoft}">🌙</span>
          <span class="rw-m"><b>Shift and sleep</b><i>8 min · most opened this month</i></span></div>`) }));

add("mobile-e-learning", "learning-path-builder", () =>
  a.rail({ crumbs: ["Knowledge", "Knowledge"], active: "knowledge",
    head: { eyebrow: "LEARNING", title: "Path builder", lede: "Sequence the modules once, and everyone on the path gets them in the right order at the right time.", action: "Publish path", meta: "Draft · 6 modules" },
    rail: a.navList("Paths", [
      { t: "New manager", s: "Live · 412 enrolled", ic: "▶", on: true },
      { t: "Data to ML", s: "Live · 94 enrolled", ic: "▶" },
      { t: "Safety induction", s: "Live · 2,140 enrolled", ic: "▶" },
      { t: "Compliance annual", s: "Live · 12,480 enrolled", ic: "▶" },
      { t: "Senior leadership", s: "Draft", ic: "◻" },
    ]),
    canvas: card(cardHead({ e: "NEW MANAGER PATH", t: "Six modules, twelve weeks" }, seg(["Sequence", "Rules", "Results"], 0)) + a.timeline([
      { t: "Your first team", s: "Week 1 · 25 min · required", tag: "Required", tone: "brand", state: "done" },
      { t: "Running a useful 1:1", s: "Week 2 · 30 min · required", tag: "Required", tone: "brand", state: "done" },
      { t: "Recognition that lands", s: "Week 4 · 40 min · required", tag: "In progress", tone: "warning", state: "now" },
      { t: "Difficult conversations", s: "Week 6 · 45 min · required", tag: "Required" },
      { t: "Setting direction", s: "Week 9 · 35 min · optional", tag: "Optional" },
      { t: "Your first 360", s: "Week 12 · assessment", tag: "Assessment", tone: "success" },
    ])) }));

add("mobile-e-learning", "learning-recommendation-feed", () =>
  a.dash({ crumbs: ["Knowledge", "Knowledge"], active: "knowledge",
    head: { eyebrow: "LEARNING", title: "Recommendations", lede: "Suggested from the skills gap, the 360 result and what similar people did next.", action: "Enrol", meta: "Refreshed weekly" },
    stats: [{ l: "COMPLETION", v: "78%", d: "▲ 11 pts" }, { l: "AVG MODULE", v: "18m", d: "▼ 4m" }, { l: "FROM RECOMMENDATION", v: "64%", d: "▲ 19 pts" }, { l: "SKILLS CLOSED", v: "412", d: "▲ 88" }],
    left: card(cardHead({ e: "FOR PRIYA SHARMA", t: "Why these" }) + rows([
      { ic: "🎓", t: "ML fundamentals", s: "Closes the largest gap on your growth path", right: badge("Best match", "brand") },
      { ic: "🛠️", t: "MLOps foundations", s: "Next step after ML fundamentals", right: badge("Then", "neutral") },
      { ic: "📊", t: "Experiment design", s: "9 people who made your move took this", right: badge("Peers", "info") },
      { ic: "🗣️", t: "Explaining models to execs", s: "Your 360 flagged stakeholder comms", right: badge("From 360", "warning") },
      { ic: "🔒", t: "Security refresher", s: "Compliance · due Friday", right: badge("Required", "danger") },
    ])),
    right: card(cardHead({ e: "WHAT DRIVES A RECOMMENDATION", t: "The inputs" }) + rows([
      { t: "Skills gap vs target role", s: "From the skills map", right: meter(38, "brand") + " 38%" },
      { t: "Peer paths", s: "What similar people did next", right: meter(24, "brand") + " 24%" },
      { t: "360 development themes", s: "Your own feedback", right: meter(21, "brand") + " 21%" },
      { t: "Compliance requirements", s: "Non-negotiable", right: meter(17, "brand") + " 17%" },
    ]) + `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Recommendations never use performance ratings, and a manager cannot see what you chose to take.</p>`) }));

add("mobile-e-learning", "training-progress-and-compliance-dashboard", () =>
  a.dash({ crumbs: ["Knowledge", "Knowledge"], active: "knowledge",
    head: { eyebrow: "COMPLIANCE", title: "Training and compliance", lede: "Who is current, who is overdue, and which certificates expire before the audit.", action: "Export for audit", meta: "12,480 people" },
    stats: [{ l: "COMPLIANT", v: "94%", d: "▲ 3 pts" }, { l: "OVERDUE", v: "742", sub: "people", d: "▼ 210", dir: "up" }, { l: "EXPIRING · 90D", v: "1,180", d: "needs scheduling", dir: "dn" }, { l: "AUDIT READY", v: "Yes", d: "evidence attached" }],
    left: card(cardHead({ e: "BY COURSE", t: "Mandatory training" }) + table(
      [{ t: "COURSE" }, { t: "REQUIRED" }, { t: "COMPLETE" }, { t: "EXPIRING 90D" }, { t: "STATUS", r: true }],
      [["<b>Security awareness</b><span class=\"sub\">Annual</span>", "12,480", meter(96, "success") + " 96%", "410", badge("On track", "success")],
       ["<b>Data protection</b><span class=\"sub\">Annual</span>", "12,480", meter(94, "success") + " 94%", "380", badge("On track", "success")],
       ["<b>Health &amp; safety</b><span class=\"sub\">Annual · site</span>", "4,240", meter(88, "success") + " 88%", "260", badge("Watch", "warning")],
       ["<b>Anti-bribery</b><span class=\"sub\">Biennial</span>", "3,180", meter(91, "success") + " 91%", "90", badge("On track", "success")],
       ["<b>Welding certification</b><span class=\"sub\">3-yearly</span>", "220", meter(74, "warning") + " 74%", "40", badge("At risk", "danger")]])),
    right: card(cardHead({ e: "WHERE IT SLIPS", t: "By workforce group" }) + rows([
      { t: "Desk-based", s: "6,120 people", right: badge("98%", "success") },
      { t: "Frontline · day", s: "3,240 people", right: badge("93%", "success") },
      { t: "Frontline · night", s: "1,910 people", right: badge("81%", "warning") },
      { t: "Field & remote", s: "1,210 people", right: badge("89%", "success") },
    ]) + `<div style="margin-top:12px">${aiNote("Night shift is the whole gap", "Mobile completion rose 22 points after modules were cut to under 15 minutes and made available offline.", "Apply to all courses")}</div>`) }));

/* ═══════════════════════════════════════════════ enterprise-integrations (4) */
add("enterprise-integrations", "integration-directory", () =>
  a.full({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "INTEGRATIONS", title: "Integration directory", lede: "Connect the systems you already run. Anything with a REST API can be wired up.", action: "Request a connector", meta: "33 available · 9 connected" },
    stats: [{ l: "AVAILABLE", v: "33" }, { l: "CONNECTED", v: "9", d: "▲ 2" }, { l: "SYNC HEALTH", v: "100%", d: "all green" }, { l: "RECORDS SYNCED", v: "12.4M", sub: "30d" }],
    body: card(cardHead({ e: "BROWSE", t: "Available connectors" }, seg(["All", "HRIS", "Collaboration", "Identity", "Analytics"], 0)) + a.tiles([
      { ic: "🏢", bg: "#dff0ff", t: "Workday", s: "HRIS & HCM · people, org, job data", tag: "Connected", tone: "success" },
      { ic: "🔷", bg: "#e8e3fe", t: "SAP SuccessFactors", s: "HRIS & HCM · full employee record", tag: "Connected", tone: "success" },
      { ic: "💬", bg: "#e2f7ee", t: "Slack", s: "Collaboration · surveys and signals in-client", tag: "Connected", tone: "success" },
      { ic: "🟦", bg: "#e9f2ff", t: "Microsoft Teams", s: "Collaboration · survey cards and nudges", tag: "Connected", tone: "success" },
      { ic: "🔑", bg: "#fdf1dd", t: "Okta", s: "Identity · SSO and SCIM provisioning", tag: "Connected", tone: "success" },
      { ic: "📊", bg: "#fde9e2", t: "Power BI", s: "Analytics · push curated datasets", tag: "Available", tone: "neutral" },
    ], 3)) }));

add("enterprise-integrations", "connector-configuration-panel", () =>
  a.rail({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "INTEGRATIONS", title: "Workday connector", lede: "Field mapping, sync frequency and exactly what leaves your system.", action: "Save and sync", meta: "Connected 14 Mar" },
    rail: a.navList("Setup", [
      { t: "Connection", s: "OAuth · healthy", ic: "✓", on: true },
      { t: "Field mapping", s: "24 of 31 mapped", ic: "2" },
      { t: "Scope", s: "Read-only", ic: "3" },
      { t: "Schedule", s: "Nightly 02:00 UTC", ic: "4" },
      { t: "History", s: "88 runs · 0 failed", ic: "5" },
    ]),
    canvas: card(cardHead({ e: "FIELD MAPPING", t: "What we read" }) + table(
      [{ t: "WORKDAY FIELD" }, { t: "VADAL FIELD" }, { t: "USED FOR" }, { t: "", r: true }],
      [["<code>worker_id</code>", "Person ID", "Identity", badge("Required", "brand")],
       ["<code>legal_name</code>", "Name", "Display", badge("Required", "brand")],
       ["<code>work_email</code>", "Email", "Survey delivery", badge("Required", "brand")],
       ["<code>supervisory_org</code>", "Team", "Grouping and rollups", badge("Required", "brand")],
       ["<code>manager_id</code>", "Manager", "Manager views", badge("Required", "brand")],
       ["<code>hire_date</code>", "Start date", "Lifecycle triggers", badge("Mapped", "success")],
       ["<code>compensation</code>", "—", "Not read", badge("Excluded", "neutral")],
       ["<code>performance_rating</code>", "—", "Not read", badge("Excluded", "neutral")]]) +
      `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Pay and performance data are excluded by default and cannot be enabled from this screen — that change needs a signed data-processing amendment.</p>`) }));

add("enterprise-integrations", "data-sync-status-dashboard", () =>
  a.dash({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "INTEGRATIONS", title: "Sync status", lede: "Every connector, its last run and exactly what changed.", action: "Run all now", meta: "Last full sync 02:00 UTC" },
    stats: [{ l: "CONNECTORS", v: "9", d: "all healthy" }, { l: "RECORDS · 30D", v: "12.4M" }, { l: "FAILED RUNS", v: "0", d: "▼ 2", dir: "up" }, { l: "AVG RUN", v: "4m 12s", d: "▼ 38s" }],
    left: card(cardHead({ e: "CONNECTORS", t: "Last run" }) + table(
      [{ t: "SYSTEM" }, { t: "DIRECTION" }, { t: "LAST RUN" }, { t: "RECORDS" }, { t: "STATUS", r: true }],
      [["<b>Workday</b>", "Read", "02:00 today", "12,480", badge("Healthy", "success")],
       ["<b>SAP SuccessFactors</b>", "Read", "02:04 today", "8,120", badge("Healthy", "success")],
       ["<b>Okta</b>", "Read + SCIM", "Continuous", "12,480", badge("Healthy", "success")],
       ["<b>Slack</b>", "Read + write", "Continuous", "3,240", badge("Healthy", "success")],
       ["<b>Microsoft Teams</b>", "Read + write", "Continuous", "8,120", badge("Healthy", "success")],
       ["<b>ADP</b>", "Read", "02:12 today", "4,240", badge("Healthy", "success")]])),
    right: card(cardHead({ e: "LAST RUN", t: "What changed" }) +
      `<div class="kv"><span class="muted">New joiners</span><b>+14</b></div>
       <div class="kv"><span class="muted">Leavers</span><b>−9</b></div>
       <div class="kv"><span class="muted">Team moves</span><b>38</b></div>
       <div class="kv"><span class="muted">Manager changes</span><b>12</b></div>
       <div class="kv"><span class="muted">Records unchanged</span><b>12,407</b></div>` +
      `<div style="margin-top:14px">${aiNote("Nothing needs your attention", "Eighty-eight consecutive successful runs. Vadal alerts only when a run fails or a record count moves more than 5% in a night.", "Alert settings")}</div>`) }));

add("enterprise-integrations", "api-and-webhook-management", () =>
  a.dash({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "DEVELOPER", title: "API and webhooks", lede: "Anything the connectors do not cover, you can build. Keys are scoped and rotatable.", action: "New key", meta: "REST + webhooks" },
    stats: [{ l: "ACTIVE KEYS", v: "6" }, { l: "CALLS · 30D", v: "2.1M" }, { l: "WEBHOOKS", v: "12", d: "all delivering" }, { l: "P95 LATENCY", v: "84ms", d: "▼ 12ms" }],
    left: card(cardHead({ e: "API KEYS", t: "Who has access" }) + table(
      [{ t: "NAME" }, { t: "SCOPE" }, { t: "LAST USED" }, { t: "EXPIRES", r: true }],
      [["<b>Data warehouse export</b><span class=\"sub\">svc-warehouse</span>", badge("Read-only", "success"), "2 minutes ago", "90 days"],
       ["<b>HRIS reconciliation</b><span class=\"sub\">svc-hris</span>", badge("Read-only", "success"), "1 hour ago", "90 days"],
       ["<b>Intranet widget</b><span class=\"sub\">svc-intranet</span>", badge("Read-only", "success"), "4 hours ago", "30 days"],
       ["<b>Action sync</b><span class=\"sub\">svc-actions</span>", badge("Read + write", "warning"), "Yesterday", "30 days"],
       ["<b>Sandbox</b><span class=\"sub\">dev-sandbox</span>", badge("Sandbox", "neutral"), "12 days ago", "7 days"]])),
    right: card(cardHead({ e: "WEBHOOKS", t: "Events we push" }) + rows([
      { t: "survey.completed", s: "Delivered 12,480 · 30d", right: badge("Healthy", "success") },
      { t: "risk.flagged", s: "Delivered 38 · 30d", right: badge("Healthy", "success") },
      { t: "action.closed", s: "Delivered 24 · 30d", right: badge("Healthy", "success") },
      { t: "person.joined", s: "Delivered 142 · 30d", right: badge("Healthy", "success") },
      { t: "person.left", s: "Delivered 86 · 30d", right: badge("Healthy", "success") },
    ]) + `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Payloads are signed, retried with backoff for 24 hours, and never contain free-text comments.</p>`) }));

/* ═══════════════════════════════════════════════════ security-compliance (2) */
add("security-compliance", "security-controls-dashboard", () =>
  a.dash({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "SECURITY", title: "Security controls", lede: "What is enforced on this workspace, and what your team still has switched off.", action: "Download evidence", meta: "Last reviewed 1 Jun" },
    stats: [{ l: "CONTROLS ENFORCED", v: "38", sub: "of 41", d: "▲ 4" }, { l: "SSO COVERAGE", v: "100%", d: "enforced" }, { l: "OPEN FINDINGS", v: "3", d: "▼ 5", dir: "up" }, { l: "LAST PEN TEST", v: "Apr 26", d: "no criticals" }],
    left: card(cardHead({ e: "CONTROLS", t: "Access and data" }) + a.toggles([
      { t: "Single sign-on enforced", s: "SAML 2.0 via Okta · no password fallback" },
      { t: "SCIM provisioning", s: "Joiners and leavers applied within 5 minutes" },
      { t: "Multi-factor authentication", s: "Required for admin and super admin" },
      { t: "IP allow-list", s: "Admin console restricted to office ranges", on: false },
      { t: "Encryption at rest", s: "AES-256 with per-tenant keys" },
      { t: "Data residency", s: "EU · Ireland and Frankfurt" },
      { t: "Session timeout", s: "8 hours idle, 30 days absolute" },
    ])),
    right: card(cardHead({ e: "OPEN FINDINGS", t: "Three left" }) + rows([
      { ic: "⚠️", t: "IP allow-list not enabled", s: "Recommended for admin console", right: badge("Medium", "warning") },
      { ic: "⚠️", t: "2 admins without hardware key", s: "Software MFA only", right: badge("Medium", "warning") },
      { ic: "ℹ️", t: "Quarterly access review due", s: "Last completed 1 March", right: badge("Low", "info") },
    ]) + `<div style="margin-top:12px">${aiNote("Certifications are held by the platform", "ISO 27001, SOC 2 Type II and GDPR compliance are maintained centrally. Evidence packs are generated on request for your auditors.", "Request evidence")}</div>`) }));

add("security-compliance", "audit-log-viewer", () =>
  a.full({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "AUDIT", title: "Audit log", lede: "Every read, export and configuration change — immutable, and exportable to your SIEM.", action: "Export to SIEM", meta: "24 months retained" },
    stats: [{ l: "EVENTS · 30D", v: "1.2M" }, { l: "EXPORTS", v: "38", d: "all attributed" }, { l: "CONFIG CHANGES", v: "12" }, { l: "RETENTION", v: "24m", d: "immutable" }],
    body: card(cardHead({ e: "RECENT", t: "What happened" }, seg(["All", "Exports", "Config", "Access"], 0)) + table(
      [{ t: "TIME" }, { t: "ACTOR" }, { t: "ACTION" }, { t: "TARGET" }, { t: "IP" }, { t: "RESULT", r: true }],
      [["09:42:18", "<b>s.menon@</b>", "report.export", "Q2 people review · PDF", "82.14.x.x", badge("Allowed", "success")],
       ["09:41:02", "<b>s.menon@</b>", "dashboard.view", "Manager hub · Design pod", "82.14.x.x", badge("Allowed", "success")],
       ["09:12:44", "<b>svc-warehouse</b>", "api.read", "/v1/people · 12,480 records", "10.4.x.x", badge("Allowed", "success")],
       ["08:58:31", "<b>o.clarke@</b>", "dashboard.view", "Plant Ops · team aggregate", "94.22.x.x", badge("Allowed", "success")],
       ["08:57:09", "<b>o.clarke@</b>", "person.view", "Individual sentiment", "94.22.x.x", badge("Denied", "danger")],
       ["08:31:55", "<b>admin@</b>", "config.change", "Retention 18m → 24m", "82.14.x.x", badge("Allowed", "success")],
       ["07:02:00", "<b>svc-hris</b>", "sync.run", "Workday · 12,480 records", "10.4.x.x", badge("Allowed", "success")]]) +
      `<p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Denied events are retained with the same detail as allowed ones. The log cannot be edited or deleted by any role, including super admin.</p>`) }));

/* ═══════════════════════════════════════════════════════ implementation (4) */
add("implementation", "implementation-roadmap-view", () =>
  a.dash({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "IMPLEMENTATION", title: "Your roadmap", lede: "Six weeks from kickoff to first insight, with a named owner on every step.", action: "Book next session", meta: "Week 3 of 6" },
    stats: [{ l: "PHASE", v: "3", sub: "of 6", d: "on track" }, { l: "TASKS DONE", v: "24", sub: "of 38", d: "▲ 6 this week" }, { l: "GO-LIVE", v: "14 Jul", d: "on schedule" }, { l: "BLOCKERS", v: "1", d: "needs you", dir: "dn" }],
    left: card(cardHead({ e: "PLAN", t: "Kickoff to first insight" }) + a.timeline([
      { t: "Week 1 — Kickoff and scope", s: "Success criteria agreed, team named", tag: "Done", tone: "success", state: "done" },
      { t: "Week 2 — HRIS connection", s: "Workday connected, 12,480 records synced", tag: "Done", tone: "success", state: "done" },
      { t: "Week 3 — Identity and access", s: "SSO live, roles mapped, SCIM tested", tag: "In progress", tone: "brand", state: "now" },
      { t: "Week 4 — Survey design", s: "Question set agreed, channels configured", tag: "Next" },
      { t: "Week 5 — Pilot", s: "Two functions, 1,200 people", tag: "Next" },
      { t: "Week 6 — Go live", s: "Full rollout and manager enablement", tag: "14 Jul", tone: "success" },
    ])),
    right: card(cardHead({ e: "NEEDS YOU", t: "One blocker" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">SCIM provisioning is waiting on an Okta admin to approve the app assignment. Everything else in week three is done.</p>` +
      rows([{ t: "Okta app assignment", s: "Owner: your IT team · 2 days late", right: badge("Blocked", "danger") },
        { t: "Role mapping sign-off", s: "Owner: HR ops", right: badge("Done", "success") },
        { t: "SSO test with 20 users", s: "Owner: Vadal", right: badge("Done", "success") }]) +
      `<div style="margin-top:12px">${aiNote("This is the only thing between you and week four", "Median time to resolve is under a day once the right admin is in the room.", "Email your IT lead")}</div>`) }));

add("implementation", "configuration-and-template-library", () =>
  a.full({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "IMPLEMENTATION", title: "Configuration library", lede: "Start from a configuration that already works for a company like yours.", action: "Apply template", meta: "Mixed desk + frontline · 5–15K" },
    stats: [{ l: "TEMPLATES", v: "18" }, { l: "MATCHED TO YOU", v: "6" }, { l: "AVG SETUP SAVED", v: "9d" }, { l: "USED BY", v: "412", sub: "companies" }],
    body: card(cardHead({ e: "RECOMMENDED FOR YOU", t: "Based on your workforce mix" }, seg(["Recommended", "All", "Applied"], 0)) + a.tiles([
      { ic: "🏭", bg: "#e8e3fe", t: "Mixed workforce baseline", s: "Desk and frontline, six channels, kiosk mode on.", tag: "Best match", tone: "brand" },
      { ic: "📋", bg: "#dff0ff", t: "Quarterly + weekly pulse", s: "12-question quarterly with a 4-question weekly pulse.", tag: "Recommended", tone: "info" },
      { ic: "🔐", bg: "#e2f7ee", t: "EU data residency", s: "Ireland and Frankfurt, 24-month retention.", tag: "Recommended", tone: "success" },
      { ic: "👥", bg: "#fdf1dd", t: "Four-role permission model", s: "Employee, manager, admin, super admin.", tag: "Recommended", tone: "warning" },
      { ic: "🌍", bg: "#fde9e2", t: "Twelve-language pack", s: "Survey and app localisation for your sites.", tag: "Optional", tone: "neutral" },
      { ic: "📊", bg: "#e9f2ff", t: "Board reporting pack", s: "Quarterly people review plus monthly exec dashboard.", tag: "Optional", tone: "neutral" },
    ], 3)) }));

add("implementation", "adoption-dashboard", () =>
  a.dash({ crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "ADOPTION", title: "Adoption", lede: "Who is actually using it — because a rollout that nobody opens is not a rollout.", action: "Export", meta: "Since go-live" },
    stats: [{ l: "ACTIVATED", v: "91%", sub: "11,360", d: "▲ 7 pts" }, { l: "WEEKLY ACTIVE", v: "68%", d: "▲ 11 pts" }, { l: "MANAGERS ACTIVE", v: "84%", d: "▲ 9 pts" }, { l: "MOBILE SHARE", v: "54%", d: "▲ 18 pts" }],
    left: card(cardHead({ e: "SINCE GO-LIVE", t: "Weekly active users" }) + line([1200, 3400, 5800, 6900, 7400, 7900, 8200, 8400, 8480], { tone: T.brand })),
    right: card(cardHead({ e: "BY GROUP", t: "Where adoption lags" }) + rows([
      { t: "Desk-based", s: "6,120 people", right: meter(88, "success") + " " + num("88%") },
      { t: "Managers", s: "412 people", right: meter(84, "success") + " " + num("84%") },
      { t: "Frontline · day", s: "3,240 people", right: meter(71, "warning") + " " + num("71%") },
      { t: "Field & remote", s: "1,210 people", right: meter(66, "warning") + " " + num("66%") },
      { t: "Frontline · night", s: "1,910 people", right: meter(48, "danger") + " " + num("48%") },
    ]) + `<div style="margin-top:12px">${aiNote("Night shift needs the kiosk", "Adoption is 48% against 88% desk-based. Sites that added shop-floor terminals reached 74% within a month.", "Enable kiosks")}</div>`) }));

add("implementation", "customer-success-portal", () =>
  a.dash({ crumbs: ["Account", "Settings"], active: "settings",
    head: { eyebrow: "CUSTOMER SUCCESS", title: "Your success plan", lede: "Your named team, your goals, and the review cadence agreed at kickoff.", action: "Book a session", meta: "Next QBR 14 Jul" },
    stats: [{ l: "HEALTH SCORE", v: "92", d: "▲ 4" }, { l: "GOALS ON TRACK", v: "4", sub: "of 5", d: "1 at risk", dir: "flat" }, { l: "OPEN TICKETS", v: "2", d: "both low", dir: "flat" }, { l: "RESPONSE TIME", v: "1.2h", d: "vs 4h SLA" }],
    left: card(cardHead({ e: "AGREED AT KICKOFF", t: "Your goals" }) + table(
      [{ t: "GOAL" }, { t: "TARGET" }, { t: "NOW" }, { t: "STATUS", r: true }],
      [["<b>Survey participation</b>", "70%", "74%", badge("Achieved", "success")],
       ["<b>Manager adoption</b>", "80%", "84%", badge("Achieved", "success")],
       ["<b>Action plans closed</b>", "60%", "71%", badge("Achieved", "success")],
       ["<b>Frontline reach</b>", "85%", "88%", badge("Achieved", "success")],
       ["<b>Night-shift adoption</b>", "70%", "48%", badge("At risk", "danger")]])),
    right: card(cardHead({ e: "YOUR TEAM", t: "Who to call" }) + rows([
      P("Elena Duarte", "Customer Success Manager · weekly", '<span class="btn2 sm">Message</span>', 0),
      P("James Okoro", "Solutions Architect · as needed", '<span class="btn2 sm">Message</span>', 1),
      P("Priya Raman", "Support lead · 4h SLA", '<span class="btn2 sm">Message</span>', 2),
    ]) + `<div style="margin-top:14px"><div class="ch-e">CADENCE</div>
      <div class="kv"><span class="muted">Weekly check-in</span><b>Thursdays 15:00</b></div>
      <div class="kv"><span class="muted">Monthly review</span><b>First Tuesday</b></div>
      <div class="kv"><span class="muted">Quarterly business review</span><b>14 July</b></div></div>`) }));

/* ══════════════════════════════════════════ copilot / assistant (2) */
add("decision-intelligence-copilot", "recommendation-panel", () =>
  a.dash({ crumbs: ["Intelligence", "Pulse"], active: "pulse",
    head: { eyebrow: "COPILOT", title: "Recommendations", lede: "Ranked by modelled impact, each one showing the evidence and the expected lift before you commit.", action: "Create plans", meta: "Refreshed daily" },
    stats: [{ l: "LIVE RECOMMENDATIONS", v: "8", d: "▲ 2" }, { l: "ACCEPTED · 90D", v: "24", d: "▲ 9" }, { l: "AVG MEASURED LIFT", v: "+4.1", sub: "pts" }, { l: "ACCURACY", v: "82%", d: "predicted vs actual" }],
    left: card(cardHead({ e: "RANKED BY IMPACT", t: "What to do next" }) + table(
      [{ t: "RECOMMENDATION" }, { t: "WHERE" }, { t: "EVIDENCE" }, { t: "PREDICTED LIFT", r: true }],
      [["<b>Rebalance sprint load</b><span class=\"sub\">Cap on-call to 1 week in 4</span>", "Engineering", "312 workload mentions", badge("+3.8 pts", "success")],
       ["<b>Night-shift recognition nudge</b><span class=\"sub\">Prompt at 06:00 and 22:00</span>", "Plant Ops", "22-pt coverage gap", badge("+3.1 pts", "success")],
       ["<b>Publish pay bands</b><span class=\"sub\">Org-wide, with progression criteria</span>", "Org-wide", "176 pay mentions", badge("+2.4 pts", "success")],
       ["<b>18-month career conversation</b><span class=\"sub\">Add to the manager cadence</span>", "Year-two cohort", "13-pt lifecycle drop", badge("+2.2 pts", "success")],
       ["<b>Meeting-free Wednesdays</b><span class=\"sub\">Extend beyond Product</span>", "Engineering", "Proven +5.2 in Product", badge("+1.9 pts", "success")]])),
    right: card(cardHead({ e: "BEHIND THIS ONE", t: "Rebalance sprint load" }) +
      `<p class="muted" style="font-size:13px;line-height:1.6">Engineering has fallen nine points since the March reorg. Workload is the dominant theme at 312 mentions, up 22%, and on-call rotation is named in 148 of them.</p>` +
      `<div class="kv"><span class="muted">People affected</span><b>860</b></div>
       <div class="kv"><span class="muted">Predicted lift</span><b style="color:${T.success}">+3.8 pts</b></div>
       <div class="kv"><span class="muted">Confidence</span><b>88%</b></div>
       <div class="kv"><span class="muted">Comparable actions</span><b>14 across peer set</b></div>
       <div class="kv"><span class="muted">Time to measurable effect</span><b>~8 weeks</b></div>` +
      `<div style="margin-top:14px"><span class="btn sm">Create the plan</span> <span class="btn2 sm">Show the working</span></div>`) }));

add("ai-workforce-assistant", "manager-guidance-panel", () =>
  a.dash({ crumbs: ["Operations", "Manager hub"], active: "managers",
    head: { eyebrow: "ASSISTANT", title: "Manager guidance", lede: "What to do this week for each person, and why — drafted, not dictated.", action: "Accept all", meta: "Design pod · 6" },
    stats: [{ l: "SUGGESTIONS", v: "7", d: "3 urgent", dir: "flat" }, { l: "ACCEPTED · 30D", v: "18", d: "▲ 5" }, { l: "TEAM HEALTH", v: "74", d: "▲ 2" }, { l: "1:1 COMPLETION", v: "67%", d: "▼ 3 pts", dir: "dn" }],
    left: card(cardHead({ e: "THIS WEEK", t: "Per person" }) + rows([
      P("Rohan Mehta", "No 1:1 in 6 weeks · sentiment 58, falling", badge("Urgent", "danger"), 0),
      P("Sara Menon", "No recognition in 30 days despite shipping", badge("Urgent", "danger"), 1),
      P("Aisha Khan", "Raised workload twice in open text", badge("Urgent", "danger"), 2),
      P("Dev Patel", "Ready for a stretch project — top-10% growth", badge("Opportunity", "success"), 3),
      P("Neha Rao", "Highest sentiment · natural mentor for a joiner", badge("Opportunity", "success"), 4),
      P("Kabir Rao", "On track · nothing needed this week", badge("Steady", "neutral"), 5),
    ])),
    right: card(cardHead({ e: "AI PREP", t: "Your next 1:1 — Rohan" }) +
      `<div style="font-size:13px;line-height:1.7;color:${T.muted}">
        <p>• Open on workload — he has raised it twice and acknowledged it before you problem-solve.</p>
        <p style="margin-top:11px">• No recognition in 30 days despite shipping the design-system refactor. Call it out.</p>
        <p style="margin-top:11px">• Ask what would make the next quarter feel sustainable, not just deliverable.</p>
      </div>` +
      `<div style="display:flex;gap:8px;margin-top:14px"><span class="btn sm">Schedule 1:1</span><span class="btn2 sm">Give recognition</span></div>
       <p class="faint" style="font-size:11.5px;line-height:1.55;margin-top:12px">Drafted from his own pulse responses and recognition history. Rohan's individual answers are never shown to you.</p>`) }));
add("people-analytics", "workforce-health-dashboard", () =>
  a.dash({ crumbs: ["People intelligence", "Analytics"], active: "analytics",
    head: { eyebrow: "PEOPLE INTELLIGENCE", title: "Workforce health", lede: "One score for how the organisation is holding up, and the drivers moving it this quarter.", action: "Export", meta: "Updated 2h ago" },
    stats: [{ l: "HEALTH SCORE", v: "82", d: "▲ 4 vs last quarter" },
      { l: "PARTICIPATION", v: "74%", sub: "9,240", d: "▲ 6 pts" },
      { l: "ATTRITION RISK", v: "4.8%", d: "▼ 0.4 pts" },
      { l: "MANAGER 1:1s", v: "67%", d: "▼ 3 pts", dir: "dn" }],
    left: card(cardHead({ e: "TWELVE MONTHS", t: "Health over time" }, seg(["6m", "12m", "24m"], 1)) +
      line([71, 72, 70, 74, 76, 75, 78, 79, 78, 81, 80, 82], { tone: T.success })),
    right: card(cardHead({ e: "WHAT MOVES IT", t: "Top drivers" }) + rows([
      { t: "Recognition", s: "268 mentions", right: meter(84, "success") + " " + num(84) },
      { t: "Team & belonging", s: "214 mentions", right: meter(79, "success") + " " + num(79) },
      { t: "Workload & burnout", s: "312 mentions", right: meter(52, "danger") + " " + num(52) },
      { t: "Pay & growth", s: "176 mentions", right: meter(61, "warning") + " " + num(61) },
      { t: "Leadership clarity", s: "98 mentions", right: meter(74, "success") + " " + num(74) },
    ])) }));
export { S as SCREENS };
