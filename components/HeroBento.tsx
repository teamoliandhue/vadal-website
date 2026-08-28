"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "@/lib/content";

/* ============================================================================
   Hero bento — the product, one capability at a time.

   This was a static mosaic: a photo, a channel list and an Ask Vadal panel,
   all visible at once. It looked fine and said little — three fragments of an
   interface with no order to read them in, and no sense of what the platform
   actually does beyond "there is a product".

   Now it is a stage that walks through the six things Vadal does, in the order
   they happen: listen, ask, understand, recognise, act, and ask the copilot.
   Each gets a small, specific product moment rather than a caption, so the
   capability is shown rather than named. The rail underneath holds all six at
   once, so the breadth is visible before the cycle reaches any of them, and a
   visitor who wants a particular one can click straight to it.

   Motion is the point here, so it is built to be smooth rather than busy:

   - All six scenes stay mounted and stack absolutely, and only opacity and
     transform change. That means the crossfade is compositor-only, and the
     card never reflows or jumps as content of different heights swaps in.
   - Rows inside a scene carry a transition-delay, so when a scene becomes
     active its contents arrive in sequence rather than all at once. It costs
     nothing — the same properties are already transitioning.
   - Advancement is a timer, not an animationend. The global reduce-motion rule
     clamps animations to 0.001ms rather than removing them, so a cycle driven
     off animationend would fire instantly and strobe all six.

   It pauses on hover and when scrolled out of view, and under
   prefers-reduced-motion it holds on the first capability and never advances.
   ========================================================================== */

const DWELL = 4200;

type Feature = {
  id: string;
  name: string;
  /** one word for the rail — the icons alone do not say what is cycling */
  tab: string;
  icon: IconName;
  accent: string;
  scene: (on: boolean) => ReactNode;
};

/* stagger helper: a row that arrives in sequence once its scene is active */
function Row({ on, i, className = "", children }: { on: boolean; i: number; className?: string; children: ReactNode }) {
  return (
    <div
      className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${className}`}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(10px)",
        transitionDelay: on ? `${140 + i * 80}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

const label = "text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]";
const bar = (pct: number, colour: string, on: boolean) => (
  <span className="block h-[6px] flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
    <span
      className="block h-full rounded-full transition-[width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      style={{ width: on ? `${pct}%` : "0%", background: colour, transitionDelay: on ? "320ms" : "0ms" }}
    />
  </span>
);


/* ---------------------------------------------------------------- charts */
/* Small, deterministic visualisations. They exist to fill the scenes with
   something to read rather than to decorate: every one of them is the shape of
   the claim its scene is making. All draw from a normalised series so the same
   two components cover a trend, a volume and a comparison. */

/** an area + line chart that draws itself in when its scene becomes active */
function Area({ data, colour, on, h = 58 }: { data: number[]; colour: string; on: boolean; h?: number }) {
  const W = 260;
  const max = Math.max(...data) * 1.1;
  const min = Math.min(...data) * 0.85;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    h - ((v - min) / (max - min || 1)) * h,
  ]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`ar-${colour.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colour} stopOpacity="0.28" />
          <stop offset="100%" stopColor={colour} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${line} L${W} ${h} L0 ${h} Z`}
        fill={`url(#ar-${colour.slice(1)})`}
        className="transition-opacity duration-700 motion-reduce:transition-none"
        style={{ opacity: on ? 1 : 0, transitionDelay: on ? "420ms" : "0ms" }}
      />
      <path
        d={line}
        fill="none"
        stroke={colour}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray={100}
        className="transition-[stroke-dashoffset] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ strokeDashoffset: on ? 0 : 100, transitionDelay: on ? "260ms" : "0ms" }}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={last[0]}
        cy={last[1]}
        r="3.5"
        fill={colour}
        className="transition-opacity duration-500 motion-reduce:transition-none"
        style={{ opacity: on ? 1 : 0, transitionDelay: on ? "1000ms" : "0ms" }}
      />
    </svg>
  );
}

/** a column chart — volume by day, recognition per week, before vs after */
function Cols({ data, colour, on, hi }: { data: { l: string; v: number }[]; colour: string; on: boolean; hi?: number }) {
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div className="flex h-full items-end gap-[5px]">
      {data.map((d, i) => (
        <span key={i} className="flex h-full flex-1 flex-col justify-end gap-1.5">
          <span
            className="block w-full rounded-[3px] transition-[height] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              height: on ? `${Math.max(8, (d.v / max) * 100)}%` : "0%",
              background: colour,
              opacity: hi === undefined || hi === i ? 1 : 0.32,
              transitionDelay: on ? `${300 + i * 55}ms` : "0ms",
            }}
          />
          <span className="text-center text-[9.5px] font-medium text-[var(--muted-2)]">{d.l}</span>
        </span>
      ))}
    </div>
  );
}

const FEATURES: Feature[] = [
  /* ---------------------------------------------------------- 1. listening */
  {
    id: "listening",
    name: "Always-on listening",
    tab: "Listen",
    icon: "chat",
    accent: "#19c6b4",
    scene: (on) => (
      <div className="flex h-full flex-col gap-2.5">
        <Row on={on} i={0} className="flex items-center justify-between">
          <p className={label}>Live signal stream</p>
          <span className="rounded-full bg-[#19c6b41f] px-2 py-0.5 text-[11px] font-bold text-[#19c6b4]">38 today</span>
        </Row>
        <Row on={on} i={1} className="min-h-[52px] flex-1">
          <Area data={[18, 26, 22, 34, 30, 41, 38]} colour="#19c6b4" on={on} h={52} />
        </Row>
        {[
          { t: "“Can we get clarity on the return-to-office policy?”", c: "Chat", w: "just now" },
          { t: "“Another weekend of on-call — we can't keep shipping like this.”", c: "Chat", w: "12m" },
        ].map((x, i) => (
          <Row key={x.w} on={on} i={i + 2}>
            <div className="rounded-[11px] border border-[var(--line)] bg-[var(--card)] px-3 py-2">
              <p className="line-clamp-2 text-[13px] leading-snug text-[var(--foreground)]">{x.t}</p>
              <p className="mt-1 text-[11px] text-[var(--muted-2)]">{x.c} · {x.w}</p>
            </div>
          </Row>
        ))}
        <Row on={on} i={4} className="flex gap-1.5">
          {[["Chat", "1,640"], ["Feed", "412"], ["Survey", "620"], ["1:1s", "96"]].map(([n, v]) => (
            <span key={n} className="flex-1 rounded-[9px] border border-[var(--line)] bg-[var(--card)] px-2 py-1.5 text-center">
              <span className="block text-[12px] font-bold tabular-nums text-[var(--foreground)]">{v}</span>
              <span className="block text-[9.5px] text-[var(--muted-2)]">{n}</span>
            </span>
          ))}
        </Row>
      </div>
    ),
  },
  /* ------------------------------------------------------------ 2. surveys */
  {
    id: "surveys",
    name: "Adaptive surveys",
    tab: "Survey",
    icon: "pulse",
    accent: "#2bb0e6",
    scene: (on) => (
      <div className="flex h-full flex-col gap-2.5">
        <Row on={on} i={0} className="flex items-center justify-between">
          <p className={label}>Pulse · question 3 of 4</p>
          <span className="text-[11px] font-semibold text-[var(--muted-2)]">40 seconds</span>
        </Row>
        <Row on={on} i={1}>
          <p className="text-[15px] font-semibold leading-snug text-[var(--foreground)]">My workload is sustainable</p>
        </Row>
        <Row on={on} i={2}>
          <div className="flex gap-2">
            {["😀", "🙂", "😐", "😕"].map((e, i) => (
              <span
                key={e}
                className="grid flex-1 place-items-center rounded-[11px] border py-2 text-[19px] transition-colors duration-500"
                style={{
                  borderColor: on && i === 2 ? "#2bb0e6" : "var(--line)",
                  background: on && i === 2 ? "#2bb0e614" : "var(--card)",
                  transitionDelay: on ? "760ms" : "0ms",
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </Row>
        <Row on={on} i={3} className="min-h-[54px] flex-1">
          <Cols
            data={[{ l: "M", v: 42 }, { l: "T", v: 78 }, { l: "W", v: 94 }, { l: "T", v: 61 }, { l: "F", v: 38 }, { l: "S", v: 12 }, { l: "S", v: 9 }]}
            colour="#2bb0e6"
            on={on}
            hi={2}
          />
        </Row>
        <Row on={on} i={4}>
          <div className="flex items-center gap-3">
            {bar(74, "#2bb0e6", on)}
            <span className="shrink-0 text-[12px] font-bold tabular-nums text-[var(--foreground)]">74%</span>
          </div>
          <p className="mt-1.5 text-[11px] text-[var(--muted-2)]">9,240 of 12,480 responded · every channel</p>
        </Row>
      </div>
    ),
  },
  /* ---------------------------------------------------------- 3. analytics */
  {
    id: "analytics",
    name: "People analytics",
    tab: "Analyse",
    icon: "chart",
    accent: "#3b9eff",
    scene: (on) => (
      <div className="flex h-full flex-col gap-2.5">
        <Row on={on} i={0} className="flex items-end justify-between">
          <div>
            <p className={label}>Engagement</p>
            <p className="mt-0.5 text-[32px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-[var(--foreground)]">82</p>
          </div>
          <span className="rounded-full bg-[#17a35e14] px-2.5 py-1 text-[11.5px] font-bold text-[#17a35e]">▲ 4 this quarter</span>
        </Row>
        <Row on={on} i={1} className="min-h-[62px] flex-1">
          <Area data={[71, 72, 70, 74, 76, 75, 78, 79, 78, 81, 80, 82]} colour="#3b9eff" on={on} h={62} />
        </Row>
        <Row on={on} i={2}>
          <p className={label}>What is driving it</p>
        </Row>
        {[
          { t: "Recognition", v: 84, c: "#17a35e" },
          { t: "Workload", v: 52, c: "#e4622f" },
          { t: "Career growth", v: 61, c: "#3b9eff" },
        ].map((d, i) => (
          <Row key={d.t} on={on} i={i + 3}>
            <div className="flex items-center gap-3">
              <span className="w-[96px] shrink-0 text-[12.5px] font-semibold text-[var(--foreground)]">{d.t}</span>
              {bar(d.v, d.c, on)}
              <span className="w-6 shrink-0 text-right text-[12px] font-bold tabular-nums" style={{ color: d.c }}>{d.v}</span>
            </div>
          </Row>
        ))}
      </div>
    ),
  },
  /* -------------------------------------------------------- 4. recognition */
  {
    id: "recognition",
    name: "Recognition",
    tab: "Recognise",
    icon: "heart",
    accent: "#5c7cf9",
    scene: (on) => (
      <div className="flex h-full flex-col gap-2.5">
        <Row on={on} i={0} className="flex items-center justify-between">
          <p className={label}>Wall of fame</p>
          <span className="text-[11px] font-semibold text-[var(--muted-2)]">this month</span>
        </Row>
        <Row on={on} i={1}>
          <div className="rounded-[12px] border border-[var(--line)] bg-[var(--card)] p-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#5c7cf91f] text-[11px] font-bold text-[#5c7cf9]">RM</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-[var(--foreground)]">Rohan Mehta</span>
                <span className="block text-[11px] text-[var(--muted-2)]">from Sara · Ownership</span>
              </span>
              <span className="shrink-0 rounded-full bg-[#5c7cf91f] px-2 py-0.5 text-[11px] font-bold text-[#5c7cf9]">+250</span>
            </div>
            <p className="mt-2 line-clamp-2 text-[12.5px] leading-snug text-[var(--muted)]">
              “Carried the design-system refactor for two sprints and never made it someone else's problem.”
            </p>
          </div>
        </Row>
        <Row on={on} i={2} className="min-h-[56px] flex-1">
          <Cols
            data={[{ l: "W1", v: 34 }, { l: "W2", v: 48 }, { l: "W3", v: 41 }, { l: "W4", v: 62 }, { l: "W5", v: 71 }, { l: "W6", v: 88 }]}
            colour="#5c7cf9"
            on={on}
          />
        </Row>
        <Row on={on} i={3} className="flex items-center gap-3">
          <span className="flex-1">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[11.5px] font-semibold text-[var(--foreground)]">Coverage</span>
              <span className="text-[11.5px] font-bold tabular-nums text-[#5c7cf9]">61%</span>
            </span>
            {bar(61, "#5c7cf9", on)}
          </span>
          <span className="shrink-0 text-[11px] text-[var(--muted-2)]">❤️ 312 · 🎉 84</span>
        </Row>
      </div>
    ),
  },
  /* ------------------------------------------------------------- 5. action */
  {
    id: "action",
    name: "Action planning",
    tab: "Act",
    icon: "checks",
    accent: "#7c5cf8",
    scene: (on) => (
      <div className="flex h-full flex-col gap-2.5">
        <Row on={on} i={0} className="flex items-center justify-between">
          <p className={label}>Plans in flight</p>
          <span className="rounded-full bg-[#7c5cf81f] px-2 py-0.5 text-[11px] font-bold text-[#7c5cf8]">38 live</span>
        </Row>
        {[
          { t: "Rebalance sprint load", who: "MB", pct: 70, due: "30 Jun" },
          { t: "Monthly 1:1 cadence", who: "RP", pct: 40, due: "15 Jul" },
        ].map((x, i) => (
          <Row key={x.t} on={on} i={i + 1}>
            <div className="rounded-[11px] border border-[var(--line)] bg-[var(--card)] px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#7c5cf81f] text-[10px] font-bold text-[#7c5cf8]">{x.who}</span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[var(--foreground)]">{x.t}</span>
                <span className="shrink-0 text-[11px] text-[var(--muted-2)]">{x.due}</span>
              </div>
              <div className="mt-2 flex items-center gap-2.5">
                {bar(x.pct, "#7c5cf8", on)}
                <span className="shrink-0 text-[11px] font-bold tabular-nums text-[var(--muted)]">{x.pct}%</span>
              </div>
            </div>
          </Row>
        ))}
        <Row on={on} i={3} className="flex min-h-[58px] flex-1 items-end gap-3">
          <span className="h-full flex-1">
            <Cols data={[{ l: "Before", v: 44 }, { l: "After", v: 82 }]} colour="#7c5cf8" on={on} hi={1} />
          </span>
          <span className="flex-[1.6] pb-4">
            <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted-2)]">Measured lift</span>
            <span className="block text-[19px] font-extrabold leading-tight tabular-nums text-[#17a35e]">+5.2 pts</span>
          </span>
        </Row>
        <Row on={on} i={4}>
          <div className="rounded-[10px] bg-[#e6f7ee] px-3 py-2 text-[12px] font-semibold text-[#17a35e]">
            ✓ Meeting-free Wednesdays closed against its own baseline
          </div>
        </Row>
      </div>
    ),
  },
  /* ------------------------------------------------------------ 6. copilot */
  {
    id: "copilot",
    name: "AI copilot",
    tab: "Ask",
    icon: "spark",
    accent: "#7c5cf8",
    scene: (on) => (
      <div className="relative flex h-full flex-col gap-2.5 overflow-hidden rounded-[14px] bg-[#141419] p-3.5">
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full opacity-45 blur-3xl"
          style={{ background: "var(--aurora)" }}
          aria-hidden="true"
        />
        <Row on={on} i={0}>
          <div className="relative flex items-center gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: "var(--aurora)" }}>
              <Icon name="spark" size={12} />
            </span>
            <span className="text-[13.5px] font-bold text-white">Ask Vadal</span>
            <span className="rounded-[7px] border border-white/15 px-1.5 text-[10px] text-[#d4d4d8]">AI</span>
          </div>
        </Row>
        <Row on={on} i={1}>
          <div className="relative ml-auto max-w-[88%] rounded-[13px] rounded-br-[4px] bg-[#7c5cf8] px-3 py-2 text-[12.5px] leading-snug text-white">
            Why is Engineering down this quarter?
          </div>
        </Row>
        <Row on={on} i={2} className="flex-1">
          <div className="relative flex h-full flex-col rounded-[13px] rounded-bl-[4px] bg-white/[0.07] px-3 py-2.5">
            <p className="text-[12.5px] leading-relaxed text-[#e4e4e7]">
              Workload, not pay — 312 mentions this quarter, up 22%, concentrated in the teams merged in March.
            </p>
            <div className="mt-2 min-h-[46px] flex-1">
              <Area data={[180, 196, 205, 232, 258, 279, 312]} colour="#a78bfa" on={on} h={42} />
            </div>
          </div>
        </Row>
        <Row on={on} i={3}>
          <div className="relative grid grid-cols-2 gap-2">
            {["Draft an action plan", "Show the teams"].map((q) => (
              <span key={q} className="truncate rounded-[11px] border border-white/[0.07] bg-white/[0.05] px-2.5 py-2 text-[12px] font-medium text-[#d4d4d8]">
                {q}
              </span>
            ))}
          </div>
        </Row>
      </div>
    ),
  },
];

export function HeroBento() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);

  /* motion preference and visibility both gate the cycle — a hero that keeps
     ticking while it is scrolled past is just burning frames */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setMotion(!mq.matches);
    set();
    mq.addEventListener("change", set);
    const el = rootRef.current;
    const io = el
      ? new IntersectionObserver(([e]) => setPaused((p) => (e.isIntersecting ? false : true)), { threshold: 0.15 })
      : null;
    if (el && io) io.observe(el);
    return () => {
      mq.removeEventListener("change", set);
      io?.disconnect();
    };
  }, []);

  /* a timer, not an animationend — see the note at the top of this file */
  useEffect(() => {
    if (!motion || paused) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % FEATURES.length), DWELL);
    return () => window.clearTimeout(t);
  }, [active, paused, motion]);

  /* the rail's travelling pill */
  useEffect(() => {
    const measure = () => {
      const el = railRefs.current[active];
      if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const f = FEATURES[active];

  return (
    <div
      ref={rootRef}
      className="reveal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* The card sits on three stacked layers rather than flat white: a cool
          vertical wash, a dot grid for texture, and a bloom in the active
          capability's colour. Only the bloom changes between scenes, and it
          transitions over 700ms — so the whole card warms from teal through to
          violet as the cycle runs, which is the same aurora walk the rest of
          the site makes. An aurora hairline along the top edge ties it to the
          hero above it. */}
      <div
        className="relative flex flex-col overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] shadow-[var(--shadow-lg)]"
        style={{ background: "linear-gradient(178deg, #ffffff 0%, var(--surface) 100%)" }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px]"
          style={{ background: "var(--aurora)" }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--line-strong) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage: "radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 78%)",
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-[background] duration-700 ease-out"
          style={{ background: `radial-gradient(105% 70% at 88% 2%, ${f.accent}26 0%, transparent 62%)` }}
        />
        {/* ------------------------------------------------------- header */}
        <div className="relative z-[1] flex items-center gap-2.5 border-b border-[var(--line)] px-5 py-3.5">
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white transition-colors duration-500"
            style={{ background: f.accent }}
          >
            <Icon name={f.icon} size={14} />
          </span>
          <span className="text-[14.5px] font-bold tracking-[-0.01em] text-[var(--foreground)]">{f.name}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[var(--muted-2)]">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--danger)]" aria-hidden="true" />
            Live
          </span>
        </div>

        {/* -------------------------------------------------------- stage */}
        {/* Fixed height so six scenes of different lengths never reflow the card.
            Sized to the tallest scene at each width, measured rather than
            guessed. The narrow card wraps its copy further, so the mobile value
            is the LARGER of the two: at 375px the action scene needs 324px of
            content where the widest it ever gets on desktop is 312. Padding
            lives on the scenes, which are inset-0 and ignore any the stage
            sets — applying it in both places was what clipped the copilot. */}
        <div className="relative z-[1] min-h-[360px] flex-1 sm:min-h-[348px]">
          {FEATURES.map((x, i) => {
            const on = i === active;
            return (
              <div
                key={x.id}
                aria-hidden={!on}
                className="absolute inset-0 px-5 py-4 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "none" : "translateY(14px) scale(0.985)",
                  pointerEvents: on ? "auto" : "none",
                }}
              >
                {x.scene(on)}
              </div>
            );
          })}
        </div>

        {/* --------------------------------------------------------- rail */}
        <div className="relative z-[1] border-t border-[var(--line)] px-3 pb-3 pt-2.5">
          <div className="relative flex items-center gap-1">
            {ind && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 top-0 -z-0 rounded-[10px] transition-[transform,width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ transform: `translateX(${ind.x}px)`, width: ind.w, background: `${f.accent}1f` }}
              />
            )}
            {FEATURES.map((x, i) => {
              const on = i === active;
              return (
                <button
                  key={x.id}
                  ref={(el) => {
                    railRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={x.name}
                  aria-current={on}
                  className="relative z-10 flex flex-1 flex-col items-center gap-1.5 rounded-[10px] px-1 py-2 transition-colors duration-300"
                  style={{ color: on ? x.accent : "var(--muted-2)" }}
                >
                  <span className="flex items-center gap-1.5">
                    <Icon name={x.icon} size={15} />
                    {/* the rail was six unlabelled glyphs: you could see something
                        cycling but not what, nor what was coming next */}
                    <span className="hidden text-[12px] font-semibold tracking-[-0.01em] sm:inline">
                      {x.tab}
                    </span>
                  </span>
                  <span className="h-[3px] w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                    {on && motion && !paused && (
                      <span
                        key={active}
                        className="block h-full origin-left rounded-full"
                        style={{
                          background: x.accent,
                          animation: `persona-progress ${DWELL}ms linear forwards`,
                        }}
                      />
                    )}
                    {on && (!motion || paused) && (
                      <span className="block h-full rounded-full" style={{ background: x.accent }} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
