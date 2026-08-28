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

const FEATURES: Feature[] = [
  /* ---------------------------------------------------------- 1. listening */
  {
    id: "listening",
    name: "Always-on listening",
    icon: "chat",
    accent: "#19c6b4",
    scene: (on) => (
      <div className="flex h-full flex-col gap-2.5">
        <Row on={on} i={0}>
          <p className={label}>Live signal stream</p>
        </Row>
        {[
          { t: "“Can we get clarity on the return-to-office policy?”", c: "Chat", w: "just now" },
          { t: "“Another weekend of on-call — we can't keep shipping like this.”", c: "Chat", w: "12m" },
          { t: "“Huge shout-out to Design for the onboarding revamp.”", c: "Feed", w: "28m" },
        ].map((s, i) => (
          <Row key={s.w} on={on} i={i + 1}>
            <div className="rounded-[12px] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5">
              <p className="line-clamp-2 text-[13.5px] leading-snug text-[var(--foreground)]">{s.t}</p>
              <p className="mt-1.5 text-[11.5px] text-[var(--muted-2)]">
                {s.c} · {s.w}
              </p>
            </div>
          </Row>
        ))}
      </div>
    ),
  },
  /* ------------------------------------------------------------ 2. surveys */
  {
    id: "surveys",
    name: "Adaptive surveys",
    icon: "pulse",
    accent: "#2bb0e6",
    scene: (on) => (
      <div className="flex h-full flex-col gap-3">
        <Row on={on} i={0}>
          <p className={label}>Pulse · 4 questions</p>
        </Row>
        <Row on={on} i={1}>
          <p className="text-[15px] font-semibold leading-snug text-[var(--foreground)]">
            My workload is sustainable
          </p>
        </Row>
        <Row on={on} i={2}>
          <div className="flex gap-2">
            {["😀", "🙂", "😐", "😕"].map((e, i) => (
              <span
                key={e}
                className="grid flex-1 place-items-center rounded-[12px] border py-2.5 text-[20px] transition-colors duration-500"
                style={{
                  borderColor: on && i === 2 ? "#2bb0e6" : "var(--line)",
                  background: on && i === 2 ? "#2bb0e614" : "var(--card)",
                  transitionDelay: on ? "700ms" : "0ms",
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </Row>
        <Row on={on} i={3} className="mt-auto">
          <div className="flex items-center gap-3">
            {bar(74, "#2bb0e6", on)}
            <span className="shrink-0 text-[12.5px] font-semibold tabular-nums text-[var(--muted)]">74%</span>
          </div>
          <p className="mt-2 text-[11.5px] text-[var(--muted-2)]">9,240 of 12,480 responded</p>
        </Row>
      </div>
    ),
  },
  /* ---------------------------------------------------------- 3. analytics */
  {
    id: "analytics",
    name: "People analytics",
    icon: "chart",
    accent: "#3b9eff",
    scene: (on) => (
      <div className="flex h-full flex-col gap-3">
        <Row on={on} i={0}>
          <div className="flex items-end justify-between">
            <div>
              <p className={label}>Engagement</p>
              <p className="mt-1 text-[34px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-[var(--foreground)]">
                82
              </p>
            </div>
            <span className="rounded-full bg-[#17a35e14] px-2.5 py-1 text-[12px] font-bold text-[#17a35e]">
              ▲ 4 this quarter
            </span>
          </div>
        </Row>
        <Row on={on} i={1}>
          <p className={label}>What is driving it</p>
        </Row>
        {[
          { t: "Recognition", v: 84, c: "#17a35e" },
          { t: "Workload", v: 52, c: "#e4622f" },
          { t: "Career growth", v: 61, c: "#3b9eff" },
        ].map((d, i) => (
          <Row key={d.t} on={on} i={i + 2}>
            <div className="flex items-center gap-3">
              <span className="w-[104px] shrink-0 text-[13px] font-semibold text-[var(--foreground)]">{d.t}</span>
              {bar(d.v, d.c, on)}
              <span className="w-7 shrink-0 text-right text-[12.5px] font-bold tabular-nums" style={{ color: d.c }}>
                {d.v}
              </span>
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
    icon: "heart",
    accent: "#5c7cf9",
    scene: (on) => (
      <div className="flex h-full flex-col gap-3">
        <Row on={on} i={0}>
          <p className={label}>Wall of fame</p>
        </Row>
        <Row on={on} i={1}>
          <div className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#5c7cf91f] text-[12px] font-bold text-[#5c7cf9]">
                RM
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-semibold text-[var(--foreground)]">Rohan Mehta</span>
                <span className="block text-[11.5px] text-[var(--muted-2)]">from Sara · Ownership</span>
              </span>
              <span className="ml-auto shrink-0 rounded-full bg-[#5c7cf91f] px-2.5 py-1 text-[11.5px] font-bold text-[#5c7cf9]">
                +250 pts
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-snug text-[var(--muted)]">
              “Carried the design-system refactor for two sprints and never made it someone else's problem.”
            </p>
          </div>
        </Row>
        <Row on={on} i={2} className="mt-auto">
          <div className="flex items-center gap-4 text-[12.5px] text-[var(--muted-2)]">
            <span>❤️ 312</span>
            <span>🎉 84</span>
            <span className="ml-auto font-semibold text-[#5c7cf9]">61% of the org recognised this month</span>
          </div>
        </Row>
      </div>
    ),
  },
  /* ------------------------------------------------------------- 5. action */
  {
    id: "action",
    name: "Action planning",
    icon: "checks",
    accent: "#7c5cf8",
    scene: (on) => (
      <div className="flex h-full flex-col gap-3">
        <Row on={on} i={0}>
          <p className={label}>Plans in flight</p>
        </Row>
        {[
          { t: "Rebalance sprint load", who: "MB", team: "Engineering", pct: 70, due: "30 Jun" },
          { t: "Monthly 1:1 cadence", who: "RP", team: "Logistics", pct: 40, due: "15 Jul" },
        ].map((p, i) => (
          <Row key={p.t} on={on} i={i + 1}>
            <div className="rounded-[12px] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#7c5cf81f] text-[10.5px] font-bold text-[#7c5cf8]">
                  {p.who}
                </span>
                <span className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-[var(--foreground)]">
                  {p.t}
                </span>
                <span className="shrink-0 text-[11.5px] text-[var(--muted-2)]">{p.due}</span>
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                {bar(p.pct, "#7c5cf8", on)}
                <span className="shrink-0 text-[11.5px] font-semibold tabular-nums text-[var(--muted)]">{p.pct}%</span>
              </div>
            </div>
          </Row>
        ))}
        <Row on={on} i={3} className="mt-auto">
          <div className="rounded-[12px] bg-[#e6f7ee] px-3.5 py-2.5 text-[12.5px] font-semibold text-[#17a35e]">
            ✓ Meeting-free Wednesdays closed — measured +5.2 pts
          </div>
        </Row>
      </div>
    ),
  },
  /* ------------------------------------------------------------ 6. copilot */
  {
    id: "copilot",
    name: "AI copilot",
    icon: "spark",
    accent: "#7c5cf8",
    scene: (on) => (
      <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-[14px] bg-[#141419] p-4">
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full opacity-45 blur-3xl"
          style={{ background: "var(--aurora)" }}
          aria-hidden="true"
        />
        <Row on={on} i={0}>
          <div className="relative flex items-center gap-2.5">
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white"
              style={{ background: "var(--aurora)" }}
            >
              <Icon name="spark" size={14} />
            </span>
            <span className="text-[14.5px] font-bold text-white">Ask Vadal</span>
            <span className="rounded-[8px] border border-white/15 px-1.5 py-[1px] text-[10.5px] text-[#d4d4d8]">AI</span>
          </div>
        </Row>
        <Row on={on} i={1}>
          <div className="relative ml-auto max-w-[86%] rounded-[14px] rounded-br-[4px] bg-[#7c5cf8] px-3.5 py-2.5 text-[13px] leading-snug text-white">
            Why is Engineering down this quarter?
          </div>
        </Row>
        <Row on={on} i={2}>
          <div className="relative rounded-[14px] rounded-bl-[4px] bg-white/[0.07] px-3.5 py-3">
            <p className="text-[13px] leading-relaxed text-[#e4e4e7]">
              Workload, not pay. It is 312 mentions this quarter, up 22%, and concentrated in the teams merged in March.
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-[8px] border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-[#a1a1aa]">
              📄 Open text · 4,120 comments
            </span>
          </div>
        </Row>
        <Row on={on} i={3} className="mt-auto">
          <div className="relative grid grid-cols-2 gap-2">
            {["Draft an action plan", "Show the teams"].map((q) => (
              <span
                key={q}
                className="truncate rounded-[12px] border border-white/[0.07] bg-white/[0.05] px-3 py-2.5 text-[12.5px] font-medium text-[#d4d4d8]"
              >
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
      className="hero-bento reveal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex flex-col overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lg)]">
        {/* ------------------------------------------------------- header */}
        <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-5 py-3.5">
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
            Sized to the tallest of them (the copilot, at 279px of content plus
            its own 32px of padding) rather than to the average — anything less
            and that one clips its quick actions. Padding lives on the scenes,
            which are inset-0 and so ignore any the stage sets. */}
        <div className="relative min-h-[324px] flex-1 sm:min-h-[344px]">
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
        <div className="border-t border-[var(--line)] px-3 pb-3 pt-2.5">
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
                  <Icon name={x.icon} size={16} />
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
