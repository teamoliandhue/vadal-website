"use client";

import Link from "next/link";

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

   NO SCROLL MECHANIC. Two earlier versions moved by themselves: a 6s timer
   with tabs (a carousel — it moves whether or not anyone is looking), then a
   scroll-driven walkthrough, four 68vh blocks against a sticky illustration,
   with the live stage resolved by measuring which block crossed the viewport
   centre. The second read better but cost 3,314px — a quarter of the home
   page — and it took the scroll away from the reader to do it.

   Four rows now, each with its own picture, revealing like every other band.
   Same content, same scenes, no hijacked scroll, a third less page.
   ========================================================================== */

/* 16:10 on desktop and square on mobile is not an aesthetic choice — it makes
   both boxes 350px tall at their real widths (560 and 350), so ONE set of scene
   content fits both exactly. At 13:10 the desktop panel was 431px, 81px more
   than the scenes needed, and justify-between spread that slack into 30-43px
   gaps between rows inside a card, which reads as broken rather than airy.

   The illustration frame. No drop shadow: the scenes already sit on their own
   warm cream ground, and a lifted card under a flat-colour illustration reads
   as a screenshot pasted onto the page. Depth comes from the surface instead —
   a soft warm wash, and a hairline in the illustration's own ink rather than
   the site's cool grey line, so the frame belongs to the picture it holds.

   The border colour has to be an inline style, not a `border-[…]` utility:
   globals.css sets `* { border-color: var(--line) }` OUTSIDE @layer base, and
   an unlayered rule beats every layered utility in the cascade. */
/* No background here any more: the scene is a lit gradient stage that has to
   run edge to edge, so the frame is a rounded clip and a hairline, nothing
   else. A cream wash behind it just showed as a rim. */
const FRAME = "overflow-hidden rounded-[var(--r-xl)] border";
const FRAME_STYLE = { borderColor: "rgba(13,47,42,0.16)" };

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
      { name: "Pulse", href: "/platform/pulse" },
      { name: "Listen", href: "/platform/listen" },
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
      { name: "Insight", href: "/platform/insight" },
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
  return (
    <div>
      <h2 className="display-md mx-auto max-w-3xl text-center font-extrabold">
        Vadal listens, explains, acts —{" "}
        <span className="aurora-text">and proves it worked.</span>
      </h2>

      {/* Was a scroll-driven walkthrough: four 68vh blocks against a sticky
          illustration, 3,314px of page to read four paragraphs — a quarter of
          the home page, and it took the scroll away from the reader to do it.
          The four stages are four rows now. Same content, same pictures, no
          hijacked scroll, and it costs about a third of the height. */}
      <div className="mt-10 lg:mt-14">
        {STAGES.map((x, i) => (
          <div
            key={x.id}
            className="grid items-center gap-7 border-t border-[var(--line)] py-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-10"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full"
                  style={{ background: x.accent }}
                >
                  <Icon name={x.icon} size={14} style={{ color: "#fff" }} />
                </span>
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
                  Step {i + 1} · {x.tab}
                </span>
              </div>

              <h3 className="mt-4 text-[clamp(1.4rem,1.1rem+1.2vw,1.95rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--foreground)]">
                {x.title}
              </h3>
              <p className="mt-3.5 max-w-md text-[16px] leading-relaxed text-[var(--muted)] sm:text-[16.5px]">
                {x.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
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
            </div>

            {/* square on mobile, 16:10 where there is room — the scenes need
                ~326px and a 13:10 box at 350px wide only gives 269px */}
            <div className={`aspect-square lg:aspect-[16/10] ${FRAME}`} style={FRAME_STYLE}>
              {LOOP_SCENES[x.id]()}
            </div>
          </div>
        ))}
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
