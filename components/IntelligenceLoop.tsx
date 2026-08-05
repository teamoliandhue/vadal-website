"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import type { IconName } from "@/lib/content";

/* ============================================================================
   IntelligenceLoop — Score → Insight → Action → Impact, drawn.

   This is the site's stated wedge ("one connected loop rivals can't match",
   and /science: "a loop, not a report") and until now it existed only as a
   line of text in the footer and the page metadata. Here it is the argument
   itself: a ring that draws as you scroll, lighting each stage in turn and
   closing back on the first — the point being that the fourth step feeds the
   first, which is what a report can't do.

   Scroll drives two things: how much of the ring is drawn, and which stage is
   active. Under prefers-reduced-motion nothing is scroll-bound — the ring is
   drawn complete and all four stages are readable at once.
   ========================================================================== */

type Stage = {
  id: string;
  label: string;
  title: string;
  body: string;
  icon: IconName;
  links: { name: string; href: string }[];
};

const STAGES: Stage[] = [
  {
    id: "score",
    label: "Score",
    title: "Listen continuously, not annually",
    body: "Always-on listening and adaptive surveys reach every employee across email, chat and mobile, so the number reflects this week, not last quarter.",
    icon: "pulse",
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
    links: [
      { name: "Executive Reports", href: "/platform/executive-reports" },
      { name: "Benchmark Intelligence", href: "/platform/benchmark-intelligence" },
    ],
  },
];

const R = 132;
const C = 2 * Math.PI * R;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const nodeAt = (i: number) => {
  const rad = ((-90 + i * 90) * Math.PI) / 180;
  return { x: 180 + R * Math.cos(rad), y: 180 + R * Math.sin(rad) };
};

export function IntelligenceLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    let raf = 0;
    const onScroll = () => {
      if (mq.matches) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // the ring completes as the section travels the middle of the viewport
        const span = r.height + vh * 0.35;
        setProgress(clamp((vh * 0.78 - r.top) / span, 0, 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // a touch of lead-in/out so the first stage is lit before the ring moves and
  // the last one holds while the section leaves
  const drawn = still ? 1 : clamp((progress - 0.08) / 0.74, 0, 1);
  const auto = clamp(Math.floor(drawn * 4 + 0.15), 0, 3);
  const active = pinned ?? auto;
  const stage = STAGES[active];
  const head = nodeAt(0);
  const headRad = ((-90 + drawn * 360) * Math.PI) / 180;

  return (
    <div
      ref={ref}
      className={
        still
          ? // reduced motion: nothing is scroll-bound, so the ring sits above a
            // readable 2-up of all four stages rather than beside a tall column
            "flex flex-col items-center gap-12"
          : "grid items-center gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16"
      }
    >
      {/* ------------------------------------------------------------- ring */}
      <div className={`relative mx-auto w-full ${still ? "max-w-[300px]" : "max-w-[340px] lg:max-w-none"}`}>
        <svg viewBox="0 0 360 360" className="w-full" role="img" aria-label="The Vadal.ai loop: score, insight, action, impact, feeding back into score">
          <defs>
            <linearGradient id="loop-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#23d7be" />
              <stop offset="50%" stopColor="#3b9eff" />
              <stop offset="100%" stopColor="#7c5cf8" />
            </linearGradient>
          </defs>

          {/* the un-drawn track */}
          <circle cx="180" cy="180" r={R} fill="none" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />

          {/* the drawn loop */}
          <circle
            cx="180"
            cy="180"
            r={R}
            fill="none"
            stroke="url(#loop-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform="rotate(-90 180 180)"
            style={{
              strokeDasharray: C,
              strokeDashoffset: C * (1 - drawn),
              transition: still ? "none" : "stroke-dashoffset 160ms linear",
            }}
          />

          {/* the head of the draw, so the direction of travel reads */}
          {!still && drawn > 0.01 && drawn < 0.995 && (
            <circle cx={180 + R * Math.cos(headRad)} cy={180 + R * Math.sin(headRad)} r="6" fill="var(--brand)" />
          )}

          {/* "it closes" marker — a soft halo on the start node once round */}
          {drawn > 0.985 && <circle cx={head.x} cy={head.y} r="30" fill="var(--brand)" opacity="0.14" />}

          {STAGES.map((s, i) => {
            const { x, y } = nodeAt(i);
            const lit = i <= active;
            const isActive = i === active;
            return (
              <g
                key={s.id}
                onClick={() => setPinned(i)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Show ${s.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPinned(i);
                  }
                }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 34 : 28}
                  fill={lit ? "var(--card)" : "var(--surface)"}
                  stroke={isActive ? "var(--brand)" : lit ? "var(--line-strong)" : "var(--line)"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ transition: "all 260ms cubic-bezier(0.22,1,0.36,1)" }}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  className="select-none text-[14px] font-bold"
                  fill={isActive ? "var(--brand)" : lit ? "var(--foreground)" : "var(--muted-2)"}
                  style={{ transition: "fill 260ms" }}
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
          <div key={s.id} className={still ? "" : "min-h-[248px]"}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-tint)] px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--brand)]">
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
                  className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] px-3.5 py-2 text-[13.5px] font-bold text-[var(--foreground)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--brand)]"
                >
                  {l.name}
                  <Icon name="arrow" size={13} className="text-[var(--brand)] transition-transform group-hover:translate-x-0.5" />
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
