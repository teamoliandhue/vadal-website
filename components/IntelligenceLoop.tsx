"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import type { IconName } from "@/lib/content";

/* ============================================================================
   IntelligenceLoop — Score → Insight → Action → Impact, drawn.

   This is the site's stated wedge ("a loop, not a report"), so the graphic has
   to carry the argument: the fourth step feeds the first, which is what a
   report can't do.

   Rebuilt, because the previous version tied both the drawing AND the active
   stage to scroll position. That read badly: you had to scroll at exactly the
   right rate to finish a sentence, scrolling back rewound the stage you were
   reading, and any stage you hadn't "reached" was greyed almost to invisible —
   which looked broken rather than pending.

   Now the ring draws once when it comes into view, then the four stages cycle
   on their own. The active node's rim is the clock: it fills, and when it
   completes the loop moves on. Hovering holds it, clicking a node pins it and
   stops the cycle for good.

   Each stage owns a stop on the brand ramp, teal → violet, matching the
   persona switcher, so the colour tracks progress around the ring. Every node
   stays legible whether or not it's active.

   Auto-advance is gated in JS on prefers-reduced-motion: the global reduce
   rule clamps animations to 0.001ms, so a CSS-driven cycle would fire
   animationend instantly and strobe all four.
   ========================================================================== */

type Stage = {
  id: string;
  label: string;
  title: string;
  body: string;
  icon: IconName;
  accent: string;
  links: { name: string; href: string }[];
};

const STAGES: Stage[] = [
  {
    id: "score",
    label: "Score",
    title: "Listen continuously, not annually",
    body: "Always-on listening and adaptive surveys reach every employee across email, chat and mobile, so the number reflects this week, not last quarter.",
    icon: "pulse",
    accent: "#19c6b4",
    links: [
      { name: "Engagement Surveys", href: "/platform/engagement-surveys" },
      { name: "Continuous Listening", href: "/platform/employee-listening" },
    ],
  },
  {
    id: "insight",
    label: "Insight",
    title: "Understand what is driving it",
    body: "AI reads the open text, surfaces the themes and sentiment behind the score, and shows which drivers actually move it and where risk is building.",
    icon: "spark",
    accent: "#2bb0e6",
    links: [
      { name: "Feedback Intelligence", href: "/platform/feedback-intelligence" },
      { name: "People Analytics", href: "/platform/people-analytics" },
    ],
  },
  {
    id: "action",
    label: "Action",
    title: "Turn insight into owned work",
    body: "Recommendations become action plans with an owner, a deadline and visible progress, so improvement is tracked work rather than a slide nobody reopens.",
    icon: "checks",
    accent: "#4a8bfb",
    links: [
      { name: "Action Planning", href: "/platform/action-planning" },
      { name: "Leadership Intelligence", href: "/platform/leadership-intelligence" },
    ],
  },
  {
    id: "impact",
    label: "Impact",
    title: "Prove what actually changed",
    body: "Every action is measured against its own baseline and benchmarked against peers. That evidence becomes the next score, and the loop starts again.",
    icon: "chart",
    accent: "#7c5cf8",
    links: [
      { name: "Executive Reports", href: "/platform/executive-reports" },
      { name: "Benchmark Intelligence", href: "/platform/benchmark-intelligence" },
    ],
  },
];

const CYCLE_MS = 5200;

/* --- ring geometry ------------------------------------------------------- */
const CX = 200;
const CY = 200;
const R = 148; // node orbit
const NODE = 46; // node radius
const RIM = NODE + 7; // progress rim radius
const RIM_C = 2 * Math.PI * RIM;
const TRACK_C = 2 * Math.PI * R;

const rad = (deg: number) => (deg * Math.PI) / 180;
const degOf = (i: number) => -90 + i * 90;
const pt = (deg: number) => ({ x: CX + R * Math.cos(rad(deg)), y: CY + R * Math.sin(rad(deg)) });

/** the quarter arc that arrives at node i, swept clockwise */
function arcInto(i: number) {
  const a = pt(degOf(i) - 90);
  const b = pt(degOf(i));
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
}

/** arrowhead sitting mid-arc, turned to the direction of travel */
function midArrow(i: number) {
  const d = degOf(i) - 45;
  const p = pt(d);
  return `translate(${p.x} ${p.y}) rotate(${d + 90})`;
}

export function IntelligenceLoop() {
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(false);
  const [auto, setAuto] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const paused = hovered || !onScreen;
  const stage = STAGES[active];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMotion(!mq.matches);
      setAuto(!mq.matches);
      if (mq.matches) setDrawn(true); // no draw-on-entry; just show it complete
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // draw the ring once, the first time it's actually looked at
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setOnScreen(e.isIntersecting);
        if (e.isIntersecting) setDrawn(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pin = (i: number) => {
    setActive(i);
    setAuto(false); // they've chosen; stop moving it for them
  };

  const still = !motion;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className={
        still
          ? "flex flex-col items-center gap-12"
          : "grid items-center gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16"
      }
    >
      {/* ------------------------------------------------------------- ring */}
      <div className={`relative mx-auto w-full ${still ? "max-w-[320px]" : "max-w-[380px] lg:max-w-none"}`}>
        <svg
          viewBox="0 0 400 400"
          className="w-full overflow-visible"
          role="img"
          aria-label="The Vadal.ai loop: score, insight, action, impact, feeding back into score"
        >
          <defs>
            <linearGradient id="loop-track" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#19c6b4" />
              <stop offset="50%" stopColor="#3b9eff" />
              <stop offset="100%" stopColor="#7c5cf8" />
            </linearGradient>
            <filter id="loop-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* the closed loop, always whole — it's the whole point of the graphic */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="url(#loop-track)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.28"
            transform={`rotate(-90 ${CX} ${CY})`}
            style={{
              strokeDasharray: TRACK_C,
              strokeDashoffset: drawn ? 0 : TRACK_C,
              transition: still ? "none" : "stroke-dashoffset 1400ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* the quarter arriving at the active stage, in that stage's colour */}
          {!still && drawn && (
            <>
              <path
                key={`arc-${active}`}
                d={arcInto(active)}
                fill="none"
                stroke={stage.accent}
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#loop-glow)"
                style={{ animation: "loop-arc 700ms cubic-bezier(0.22,1,0.36,1) both" }}
              />
              <g transform={midArrow(active)} fill={stage.accent}>
                <path d="M0 -7 L6 4 L-6 4 Z" />
              </g>
            </>
          )}

          {/* centre: which step of four, so the ring has a focal point */}
          <g textAnchor="middle" pointerEvents="none">
            <g transform={`translate(${CX} ${CY - 34})`} opacity="0.85">
              <SparkMark size={20} />
            </g>
            <text
              x={CX}
              y={CY + 14}
              className="select-none text-[34px] font-extrabold tabular-nums"
              fill={stage.accent}
              style={{ transition: still ? "none" : "fill 400ms" }}
            >
              0{active + 1}
            </text>
            <text x={CX} y={CY + 36} className="select-none text-[12px] font-semibold" fill="var(--muted-2)">
              of four
            </text>
          </g>

          {/* nodes */}
          {STAGES.map((s, i) => {
            const { x, y } = pt(degOf(i));
            const on = i === active;
            return (
              <g
                key={s.id}
                onClick={() => pin(i)}
                role="button"
                tabIndex={0}
                aria-label={`Show ${s.label}`}
                aria-pressed={on}
                className="cursor-pointer focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pin(i);
                  }
                }}
              >
                {/* soft halo behind the active node */}
                {on && <circle cx={x} cy={y} r={NODE + 16} fill={s.accent} opacity="0.12" />}

                <circle
                  cx={x}
                  cy={y}
                  r={NODE}
                  fill={on ? s.accent : "var(--card)"}
                  stroke={on ? s.accent : "var(--line-strong)"}
                  strokeWidth={on ? 0 : 1.5}
                  style={{
                    transition: still ? "none" : "fill 380ms, stroke 380ms",
                    filter: on ? `drop-shadow(0 8px 18px ${s.accent}66)` : "none",
                  }}
                />

                {/* the rim doubles as the clock: full circle = time to advance */}
                {on && auto && (
                  <circle
                    key={`rim-${active}`}
                    cx={x}
                    cy={y}
                    r={RIM}
                    fill="none"
                    stroke={s.accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform={`rotate(-90 ${x} ${y})`}
                    onAnimationEnd={() => setActive((a) => (a + 1) % STAGES.length)}
                    style={
                      {
                        strokeDasharray: RIM_C,
                        animation: `ring-progress ${CYCLE_MS}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                        ["--c" as string]: `${RIM_C}`,
                      } as React.CSSProperties
                    }
                  />
                )}

                <g transform={`translate(${x - 9} ${y - 22})`} pointerEvents="none">
                  <Icon name={s.icon} size={18} style={{ color: on ? "#fff" : s.accent }} />
                </g>
                <text
                  x={x}
                  y={y + 19}
                  textAnchor="middle"
                  className="select-none text-[14px] font-bold"
                  fill={on ? "#fff" : "var(--foreground)"}
                  style={{ transition: still ? "none" : "fill 380ms" }}
                  pointerEvents="none"
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ------------------------------------------------------- stage panel */}
      <div className={still ? "w-full" : ""}>
        <div className={still ? "grid gap-x-10 gap-y-9 sm:grid-cols-2" : ""}>
          {(still ? STAGES : [stage]).map((s) => (
            <div
              key={still ? s.id : `stage-${active}`}
              className={still ? "" : "min-h-[264px]"}
              style={
                still ? undefined : { animation: "persona-in 500ms cubic-bezier(0.22,1,0.36,1) both" }
              }
            >
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em]"
                style={{ background: `${s.accent}1f`, color: s.accent }}
              >
                <Icon name={s.icon} size={14} />
                {s.label}
              </span>
              <h3 className="mt-4 text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] font-extrabold leading-tight tracking-[-0.02em] text-balance">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[var(--muted)]">{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {s.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] px-3.5 py-2 text-[13.5px] font-bold text-[var(--foreground)] transition-colors duration-200"
                    style={{ borderColor: `${s.accent}59` }}
                  >
                    {l.name}
                    <Icon
                      name="arrow"
                      size={13}
                      style={{ color: s.accent }}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* the payoff line — why the shape matters */}
        <p className="mt-8 flex items-start gap-2.5 border-t border-[var(--line)] pt-6 text-[15px] leading-relaxed text-[var(--muted)]">
          <SparkMark size={16} className="mt-0.5 shrink-0" />
          <span>
            Most tools stop at the score. Because impact feeds the next measurement,{" "}
            <b className="font-bold text-[var(--foreground)]">every cycle starts better informed than the last</b>.
          </span>
        </p>
      </div>
    </div>
  );
}
