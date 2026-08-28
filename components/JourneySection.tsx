"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { LOOP_SCENES } from "./LoopScene";
import type { IconName } from "@/lib/content";

/* ============================================================================
   JourneySection — the product across the journey, in four stages.

   Modelled on the section granola.ai runs directly under its hero: a single
   plain-spoken statement, a row of stage labels, and then one stage at a time
   showing what the product does at that moment — copy on one side, the product
   on the other. It works because it answers "what is this actually like to
   use" before asking for anything, and because each stage is a moment the
   reader recognises rather than a feature name.

   Vadal's four stages already existed as "A loop, not a report" further down
   the page. Rather than add a fifth telling of the same story, that section is
   promoted here and restyled: same approved copy, same illustrations, the
   layout Granola uses. The loop itself — impact feeding the next score — is
   the closing line under the stages rather than a card of its own, because in
   this format it is the thing the four stages add up to.
   ========================================================================== */

const DWELL = 6000;

type Stage = {
  id: keyof typeof LOOP_SCENES;
  tab: string;
  icon: IconName;
  accent: string;
  title: string;
  body: string;
  links: { name: string; href: string }[];
};

const STAGES: Stage[] = [
  {
    id: "score",
    tab: "Listen",
    icon: "pulse",
    accent: "#19c6b4",
    title: "Listen continuously, not annually",
    body: "Always-on listening and adaptive surveys reach every employee across email, chat and mobile, so the number reflects this week.",
    links: [
      { name: "Engagement Surveys", href: "/platform/engagement-surveys" },
      { name: "Continuous Listening", href: "/platform/employee-listening" },
    ],
  },
  {
    id: "insight",
    tab: "Understand",
    icon: "spark",
    accent: "#2bb0e6",
    title: "Understand what is driving it",
    body: "AI reads the open text and surfaces the themes behind the score, showing which drivers actually move it and where risk is building.",
    links: [
      { name: "Feedback Intelligence", href: "/platform/feedback-intelligence" },
      { name: "People Analytics", href: "/platform/people-analytics" },
    ],
  },
  {
    id: "action",
    tab: "Act",
    icon: "checks",
    accent: "#4a8bfb",
    title: "Turn insight into owned work",
    body: "Recommendations become plans with an owner, a deadline and visible progress.",
    links: [{ name: "Action Planning", href: "/platform/action-planning" }],
  },
  {
    id: "impact",
    tab: "Prove",
    icon: "chart",
    accent: "#7c5cf8",
    title: "Prove what actually changed",
    body: "Every action is measured against its own baseline and benchmarked against peers.",
    links: [{ name: "Executive Reports", href: "/platform/executive-reports" }],
  },
];

export function JourneySection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  const [motion, setMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setMotion(!mq.matches);
    set();
    mq.addEventListener("change", set);
    const el = rootRef.current;
    /* only advance while the section is actually on screen */
    const io = el ? new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.3 }) : null;
    if (el && io) io.observe(el);
    return () => {
      mq.removeEventListener("change", set);
      io?.disconnect();
    };
  }, []);

  /* a timer, not an animationend: the global reduce-motion rule clamps
     animations to 0.001ms, so an animationend cycle would strobe all four */
  useEffect(() => {
    if (!motion || paused) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % STAGES.length), DWELL);
    return () => window.clearTimeout(t);
  }, [active, paused, motion]);

  useEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active];
      if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const s = STAGES[active];

  return (
    <div ref={rootRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h2 className="display-lg max-w-3xl font-semibold tracking-[-0.02em]">
        Vadal listens, explains, acts —{" "}
        <span className="aurora-text">and proves it worked.</span>
      </h2>

      {/* ------------------------------------------------------ stage rail */}
      <div
        role="tablist"
        aria-label="How Vadal works, stage by stage"
        className="relative mt-9 flex gap-0 overflow-x-auto border-b border-[var(--line)] sm:gap-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ind && (
          <span
            aria-hidden="true"
            className="absolute bottom-0 h-[2px] rounded-full transition-[transform,width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(${ind.x}px)`, width: ind.w, background: s.accent }}
          />
        )}
        {STAGES.map((x, i) => {
          const on = i === active;
          return (
            <button
              key={x.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className="relative flex flex-1 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap px-1.5 pb-3.5 pt-1 text-[14px] font-semibold transition-colors duration-300 sm:flex-none sm:justify-start sm:gap-2 sm:px-5 sm:text-[16px]"
              style={{ color: on ? "var(--foreground)" : "var(--muted-2)" }}
            >
              <Icon name={x.icon} size={16} style={{ color: on ? x.accent : "currentColor" }} />
              {x.tab}
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------- stage panel */}
      {/* Both halves are keyed on the stage so the copy and the illustration
          re-enter together on every change rather than one lagging the other. */}
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div key={`copy-${s.id}`} style={{ animation: "persona-in 620ms cubic-bezier(0.22,1,0.36,1) both" }}>
          <h3 className="text-[clamp(1.5rem,1.1rem+1.5vw,2.1rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--foreground)]">
            {s.title}
          </h3>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[var(--muted)] sm:text-[17px]">{s.body}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {s.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-full border bg-[var(--card)] px-4 py-2 text-[13.5px] font-bold text-[var(--foreground)] transition-colors hover:border-[var(--line-strong)]"
                style={{ borderColor: `${s.accent}55` }}
              >
                {l.name}
                <Icon name="arrow" size={13} style={{ color: s.accent }} />
              </Link>
            ))}
          </div>
        </div>

        <div
          key={`art-${s.id}`}
          className="aspect-[13/10] overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] shadow-[var(--shadow-lg)]"
          style={{ background: "#fbf7f1", animation: "persona-in 620ms cubic-bezier(0.22,1,0.36,1) both", animationDelay: "80ms" }}
        >
          {LOOP_SCENES[s.id]()}
        </div>
      </div>

      {/* the loop, as the thing the four stages add up to */}
      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] py-2 pl-2 pr-4 shadow-[var(--shadow-sm)]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: "var(--aurora)" }}>
            <Icon name="refresh" size={13} className="text-white" />
          </span>
          <span className="text-[13.5px] font-semibold text-[var(--foreground)]">
            Then impact becomes tomorrow&apos;s score — a loop, not a report.
          </span>
        </div>
      </div>
    </div>
  );
}
