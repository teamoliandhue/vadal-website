"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import type { IconName } from "@/lib/content";

/* ============================================================================
   IntelligenceLoop — Score → Insight → Action → Impact, as an orbit.

   The site's stated wedge is "a loop, not a report", so the graphic has to
   carry the argument: the fourth step feeds the first, which is what a report
   can't do.

   Rebuilt again. The flat ring read as a static diagram, its direction arrow
   looked like a rendering glitch, and the progress rim floated outside the
   node it belonged to. This version is a tilted orbit instead: the ellipse
   gives it depth, a pulse of light runs the path continuously so the loop is
   visibly RUNNING, and the active stage is a lifted, glowing node with its
   colour bled into the orbit behind it.

   Scroll drives the ENTRANCE, not the stage. That distinction matters: an
   earlier version tied stage selection to scroll position, which meant you had
   to scroll at exactly the right rate to finish a sentence and scrolling back
   rewound what you were reading. Now scrolling in draws the orbit, staggers
   the nodes and settles the centre, then the deck cycles on its own for
   reading. Scrolling out and back replays the entrance.

   Each stage owns a stop on the brand ramp, teal → violet, matching the
   persona switcher.

   Under prefers-reduced-motion the orbit renders complete and still, with all
   four stages listed at once and no cycling. Auto-advance is gated in JS
   because the global reduce rule clamps animations to 0.001ms, so a
   CSS-driven cycle would strobe all four instantly.
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

/* --- orbit geometry -------------------------------------------------------
   An ellipse rather than a circle: the vertical squash reads as perspective,
   so the loop looks like an orbit seen at an angle instead of a flat diagram. */
const CX = 210;
const CY = 205;
const RX = 152;
const RY = 134; // ~0.88 of RX — enough tilt to feel dimensional, not distorted
const NODE = 44;

const rad = (d: number) => (d * Math.PI) / 180;
const degOf = (i: number) => -90 + i * 90;
/** point on the orbit at a given angle */
const pt = (deg: number) => ({ x: CX + RX * Math.cos(rad(deg)), y: CY + RY * Math.sin(rad(deg)) });

/** the orbit as a closed path, so pathLength can drive the draw-in */
const ORBIT = `M ${CX} ${CY - RY} A ${RX} ${RY} 0 1 1 ${CX - 0.01} ${CY - RY} Z`;

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function IntelligenceLoop() {
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(false);
  const [auto, setAuto] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  /** 0 → 1 as the section scrolls into view; drives the entrance only */
  const [enter, setEnter] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const paused = hovered || !onScreen;
  const stage = STAGES[active];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMotion(!mq.matches);
      setAuto(!mq.matches);
      if (mq.matches) setEnter(1); // no entrance; render it complete
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Scroll drives the ENTRANCE, never the stage. `enter` runs 0 → 1 as the
     graphic travels the lower two thirds of the viewport, so the orbit draws
     itself, the nodes stagger in and the centre settles as you arrive. Once
     you're reading, the deck cycles on its own and scroll position no longer
     touches it. */
  useEffect(() => {
    if (!motion) {
      setEnter(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // fully drawn by the time the graphic's middle reaches mid-viewport
        setEnter(clamp01((vh * 0.92 - r.top) / (r.height * 0.55 + vh * 0.28)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [motion]);

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
      {/* ------------------------------------------------------------ orbit */}
      <div className={`relative mx-auto w-full ${still ? "max-w-[330px]" : "max-w-[400px] lg:max-w-none"}`}>
        <svg
          viewBox="0 0 420 410"
          className="w-full overflow-visible"
          role="img"
          aria-label="The Vadal.ai loop: score, insight, action, impact, feeding back into score"
        >
          <defs>
            <linearGradient id="orbit-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#19c6b4" />
              <stop offset="38%" stopColor="#2bb0e6" />
              <stop offset="70%" stopColor="#4a8bfb" />
              <stop offset="100%" stopColor="#7c5cf8" />
            </linearGradient>
            <filter id="orbit-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
            <radialGradient id="orbit-core">
              <stop offset="0%" stopColor={stage.accent} stopOpacity="0.20" />
              <stop offset="100%" stopColor={stage.accent} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* the active stage's colour bleeding into the middle of the orbit */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={RX * 0.92}
            ry={RY * 0.92}
            fill="url(#orbit-core)"
            style={{ transition: still ? "none" : "opacity 600ms", opacity: enter }}
          />

          {/* faint full orbit, so the loop reads as closed even mid-entrance */}
          <path d={ORBIT} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" opacity={0.5 * enter} />

          {/* the drawn orbit — pathLength normalises the ellipse to 1, so the
              dash offset is just the entrance progress */}
          <path
            d={ORBIT}
            fill="none"
            stroke="url(#orbit-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - ease(enter)}
          />

          {/* a pulse of light running the path: the loop is always RUNNING,
              and it shows direction without an arrowhead that reads as a glitch */}
          {!still && enter > 0.98 && (
            <>
              <circle r="7" fill={stage.accent} filter="url(#orbit-soft)" opacity="0.9">
                <animateMotion dur="7s" repeatCount="indefinite" path={ORBIT} />
              </circle>
              <circle r="3.5" fill="#fff">
                <animateMotion dur="7s" repeatCount="indefinite" path={ORBIT} />
              </circle>
            </>
          )}

          {/* ------------------------------------------------------- centre */}
          <g
            textAnchor="middle"
            pointerEvents="none"
            style={{ opacity: clamp01((enter - 0.45) / 0.4), transition: still ? "none" : "opacity 300ms" }}
          >
            <text
              x={CX}
              y={CY - 6}
              className="select-none text-[40px] font-extrabold tabular-nums"
              fill={stage.accent}
              style={{ transition: still ? "none" : "fill 420ms" }}
            >
              0{active + 1}
            </text>
            <text x={CX} y={CY + 20} className="select-none text-[12.5px] font-bold uppercase tracking-[0.16em]" fill="var(--muted-2)">
              of four
            </text>
          </g>

          {/* -------------------------------------------------------- nodes */}
          {STAGES.map((s2, i) => {
            const { x, y } = pt(degOf(i));
            const on = i === active;
            /* each node arrives in turn as the orbit draws past it. The
               windows must all CLOSE before enter reaches 1, or the last node
               settles short of full opacity and never recovers: the first
               version ended at 0.9 and looked permanently faded. */
            const n = clamp01((enter - (0.3 + i * 0.14)) / 0.16);
            return (
              <g
                key={s2.id}
                onClick={() => pin(i)}
                role="button"
                tabIndex={0}
                aria-label={`Show ${s2.label}`}
                aria-pressed={on}
                className="cursor-pointer focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pin(i);
                  }
                }}
                style={{ opacity: n }}
              >
                {on && <circle cx={x} cy={y} r={NODE + 20} fill={s2.accent} opacity="0.16" filter="url(#orbit-soft)" />}
                <circle
                  cx={x}
                  cy={y}
                  r={NODE * (0.82 + 0.18 * n) * (on ? 1.1 : 1)}
                  fill={on ? s2.accent : "var(--card)"}
                  stroke={on ? s2.accent : "var(--line)"}
                  strokeWidth={on ? 0 : 1.5}
                  style={{
                    transition: still ? "none" : "r 420ms cubic-bezier(0.22,1,0.36,1), fill 420ms, stroke 420ms",
                    filter: on ? `drop-shadow(0 10px 22px ${s2.accent}55)` : "drop-shadow(0 4px 12px rgba(13,11,22,0.07))",
                  }}
                />
                <g transform={`translate(${x - 9} ${y - 23})`} pointerEvents="none">
                  <Icon name={s2.icon} size={18} style={{ color: on ? "#fff" : s2.accent }} />
                </g>
                <text
                  x={x}
                  y={y + 19}
                  textAnchor="middle"
                  className="select-none text-[14px] font-bold"
                  fill={on ? "#fff" : "var(--foreground)"}
                  style={{ transition: still ? "none" : "fill 420ms" }}
                  pointerEvents="none"
                >
                  {s2.label}
                </text>

                {/* the clock, drawn ON the node's own edge rather than floating
                    outside it as a stray arc */}
                {on && auto && (
                  <circle
                    key={`clock-${active}`}
                    cx={x}
                    cy={y}
                    r={NODE * 1.1}
                    fill="none"
                    stroke="#fff"
                    strokeOpacity="0.55"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform={`rotate(-90 ${x} ${y})`}
                    onAnimationEnd={() => setActive((a) => (a + 1) % STAGES.length)}
                    style={
                      {
                        strokeDasharray: 2 * Math.PI * NODE * 1.1,
                        animation: `ring-progress ${CYCLE_MS}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                        ["--c" as string]: `${2 * Math.PI * NODE * 1.1}`,
                      } as React.CSSProperties
                    }
                  />
                )}
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
