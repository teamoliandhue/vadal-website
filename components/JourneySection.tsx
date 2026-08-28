"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { LOOP_SCENES } from "./LoopScene";
import type { IconName } from "@/lib/content";

/* ============================================================================
   JourneySection — the product across the journey, in four stages.

   Modelled on the section granola.ai runs directly under its hero: a single
   plain-spoken statement, then one stage at a time showing what the product
   does at that moment — copy on one side, the picture on the other. It works
   because it answers "what is this actually like to use" before asking for
   anything, and because each stage is a moment the reader recognises rather
   than a feature name.

   THE STAGE ADVANCE IS THE SCROLL. The first version ran a 6s timer and gave
   the reader tabs; that reads as a carousel and it moves whether or not anyone
   is looking. Here the four stages are four tall blocks in the left column and
   the illustration is sticky beside them, so scrolling *is* the walkthrough:
   whichever block is crossing the middle of the viewport is the live stage.

   Which block that is gets resolved by measuring — the block whose centre is
   nearest the viewport centre wins — rather than by an IntersectionObserver
   band. A band has to be either zero-height (which some engines never report
   as intersecting) or tall enough that two blocks match at once, and then the
   answer depends on callback order. Four getBoundingClientRect calls per
   scroll frame is cheap and it is never ambiguous.

   Below lg there is no sticky column: each block carries its own illustration
   inline and the page simply reads top to bottom.
   ========================================================================== */

/* The illustration frame. No drop shadow: the scenes already sit on their own
   warm cream ground, and a lifted card under a flat-colour illustration reads
   as a screenshot pasted onto the page. Depth comes from the surface instead —
   a soft warm wash, and a hairline in the illustration's own ink rather than
   the site's cool grey line, so the frame belongs to the picture it holds.

   The border colour has to be an inline style, not a `border-[…]` utility:
   globals.css sets `* { border-color: var(--line) }` OUTSIDE @layer base, and
   an unlayered rule beats every layered utility in the cascade. */
const FRAME =
  "overflow-hidden rounded-[var(--r-xl)] border " +
  "bg-[radial-gradient(120%_100%_at_50%_0%,#fffdf8_0%,#fbf7f1_45%,#f6eee2_100%)]";
const FRAME_STYLE = { borderColor: "rgba(51,71,91,0.13)" };

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
    body: "Recommendations become plans with an owner, a deadline and visible progress, sitting with the manager who can actually move them.",
    links: [
      { name: "Action Planning", href: "/platform/action-planning" },
      { name: "Manager Effectiveness", href: "/platform/manager-effectiveness" },
    ],
  },
  {
    id: "impact",
    tab: "Prove",
    icon: "chart",
    accent: "#7c5cf8",
    title: "Prove what actually changed",
    body: "Every action is measured against its own baseline and benchmarked against peers, so the lift is a number you can take to the board.",
    links: [
      { name: "Executive Reports", href: "/platform/executive-reports" },
      { name: "Benchmark Intelligence", href: "/platform/benchmark-intelligence" },
    ],
  },
];

export function JourneySection() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  /* the live stage is whichever block sits nearest the middle of the viewport */
  useEffect(() => {
    let queued = false;
    const pick = () => {
      queued = false;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestD = Infinity;
      blocks.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      /* rAF so a fast scroll coalesces to one measurement per frame */
      requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* the rail jumps to a stage by scrolling its block to the same middle line
     the observer reads from, so the click and the scroll agree */
  const goTo = useCallback((i: number) => {
    const el = blocks.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const top = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
    /* hand the jump to Lenis when it is running — a native scrollTo fights its
       rAF loop for the scroll position and lands jumpy. Lenis is absent under
       reduced motion, and an explicit behavior:"smooth" would animate anyway
       past the global scroll-behavior:auto, so ask for that case directly. */
    if (window.__lenis) {
      window.__lenis.scrollTo(top, { duration: 0.9 });
      return;
    }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: still ? "auto" : "smooth" });
  }, []);

  return (
    <div>
      <h2 className="display-lg max-w-3xl font-semibold tracking-[-0.02em]">
        Vadal listens, explains, acts —{" "}
        <span className="aurora-text">and proves it worked.</span>
      </h2>

      <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        {/* --------------------------------------------- the column that scrolls */}
        <div>
          {STAGES.map((x, i) => {
            const on = i === active;
            return (
              <div
                key={x.id}
                ref={(el) => {
                  blocks.current[i] = el;
                }}
                className={`border-t border-[var(--line)] py-11 first:border-t-0 first:pt-0 transition-opacity duration-500 lg:flex lg:min-h-[68vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0 ${
                  on ? "lg:opacity-100" : "lg:opacity-35"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors duration-500"
                    style={{ background: on ? x.accent : "var(--line)" }}
                  >
                    <Icon
                      name={x.icon}
                      size={14}
                      style={{ color: on ? "#fff" : "var(--muted-2)" }}
                    />
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
                    Step {i + 1} · {x.tab}
                  </span>
                </div>

                <h3 className="mt-4 text-[clamp(1.5rem,1.1rem+1.5vw,2.1rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--foreground)]">
                  {x.title}
                </h3>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[var(--muted)] sm:text-[17px]">
                  {x.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {x.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center gap-1.5 rounded-full border bg-[var(--card)] px-4 py-2 text-[13.5px] font-bold text-[var(--foreground)] transition-colors hover:border-[var(--line-strong)]"
                      style={{ borderColor: `${x.accent}55` }}
                    >
                      {l.name}
                      <Icon name="arrow" size={13} style={{ color: x.accent }} />
                    </Link>
                  ))}
                </div>

                {/* below lg there is no sticky column, so the picture rides
                    with its own copy */}
                <div className={`mt-7 aspect-[13/10] lg:hidden ${FRAME}`} style={FRAME_STYLE}>
                  {LOOP_SCENES[x.id]()}
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------- the column that stays */}
        <div className="hidden lg:block">
          <div className="sticky top-[13vh] flex h-[74vh] flex-col justify-center">
            <div
              className={`relative mx-auto aspect-[13/10] w-full max-w-[560px] ${FRAME}`}
              style={FRAME_STYLE}
            >
              {/* all four are mounted and crossfade in place — remounting on
                  every change made the picture flash rather than change */}
              {STAGES.map((x, i) => (
                <div
                  key={x.id}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "none" : "scale(0.97)",
                    pointerEvents: i === active ? undefined : "none",
                  }}
                >
                  {LOOP_SCENES[x.id]()}
                </div>
              ))}
            </div>

            {/* the rail is progress first, navigation second */}
            <ol className="mx-auto mt-7 flex w-full max-w-[560px] gap-2.5">
              {STAGES.map((x, i) => {
                const on = i === active;
                return (
                  <li key={x.id} className="flex-1">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={on ? "step" : undefined}
                      aria-label={`Go to step ${i + 1}, ${x.tab}`}
                      className="block w-full text-left"
                    >
                      <span className="block h-[3px] overflow-hidden rounded-full bg-[var(--line)]">
                        <span
                          className="block h-full rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{ width: i <= active ? "100%" : "0%", background: x.accent }}
                        />
                      </span>
                      <span
                        className="mt-2 flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors duration-300"
                        style={{ color: on ? "var(--foreground)" : "var(--muted-2)" }}
                      >
                        <Icon
                          name={x.icon}
                          size={13}
                          style={{ color: on ? x.accent : "currentColor" }}
                        />
                        {x.tab}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* the loop, as the thing the four stages add up to */}
      <div className="mt-14 flex justify-center">
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
