import Link from "next/link";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import type { IconName } from "@/lib/content";
import { LOOP_ART } from "./LoopArt";

/* ============================================================================
   LoopBento — Score → Insight → Action → Impact, as a bento of five.

   Replaces the scroll-pinned orbit. That version had a real flaw: at the top
   of its pinned track the orbit had not drawn yet, so the first thing you saw
   was a heading over an empty column with a single stray dot. It also asked
   for 3.4 screens of scrolling before you could read all four stages.

   This says the same thing statically. Four cards for the four steps, each
   with a small illustration of what that step actually looks like in product,
   and a fifth card that closes the argument: impact feeds the next score,
   which is the bit a report cannot do.

   The five illustrations live in LoopArt.tsx. They began as small replicas of
   product UI, which earned nothing here — the real product is further down the
   page, so a shrunken copy of it was the least interesting thing a card could
   hold. They are isometric line scenes now: the idea rather than the interface.
   ========================================================================== */

type Card = {
  id: string;
  step: string;
  title: string;
  body: string;
  icon: IconName;
  accent: string;
  links?: { name: string; href: string }[];
};

const CARDS: Card[] = [
  {
    id: "score",
    step: "Score",
    title: "Listen continuously, not annually",
    body: "Always-on listening and adaptive surveys reach every employee across email, chat and mobile, so the number reflects this week.",
    icon: "pulse",
    accent: "#19c6b4",
    links: [
      { name: "Engagement Surveys", href: "/platform/engagement-surveys" },
      { name: "Continuous Listening", href: "/platform/employee-listening" },
    ],
  },
  {
    id: "insight",
    step: "Insight",
    title: "Understand what is driving it",
    body: "AI reads the open text and surfaces the themes behind the score, showing which drivers actually move it and where risk is building.",
    icon: "spark",
    accent: "#2bb0e6",
    links: [
      { name: "Feedback Intelligence", href: "/platform/feedback-intelligence" },
      { name: "People Analytics", href: "/platform/people-analytics" },
    ],
  },
  {
    id: "action",
    step: "Action",
    title: "Turn insight into owned work",
    body: "Recommendations become plans with an owner, a deadline and visible progress.",
    icon: "checks",
    accent: "#4a8bfb",
    links: [{ name: "Action Planning", href: "/platform/action-planning" }],
  },
  {
    id: "impact",
    step: "Impact",
    title: "Prove what actually changed",
    body: "Every action is measured against its own baseline and benchmarked against peers.",
    icon: "chart",
    accent: "#7c5cf8",
    links: [{ name: "Executive Reports", href: "/platform/executive-reports" }],
  },
];

export function LoopBento() {
  const [score, insight, action, impact] = CARDS;

  const shell =
    "group flex flex-col rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] sm:p-7";

  const head = (c: Card) => (
    <>
      <span
        className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em]"
        style={{ background: `${c.accent}1f`, color: c.accent }}
      >
        <Icon name={c.icon} size={13} />
        {c.step}
      </span>
      <h3 className="mt-4 text-[19px] font-extrabold leading-snug tracking-[-0.01em] text-[var(--foreground)]">
        {c.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{c.body}</p>
    </>
  );

  const links = (c: Card) =>
    c.links && (
      <div className="mt-4 flex flex-wrap gap-2">
        {c.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex items-center gap-1.5 rounded-full border bg-transparent px-3 py-1.5 text-[12.5px] font-bold text-[var(--foreground)] transition-colors"
            style={{ borderColor: `${c.accent}55` }}
          >
            {l.name}
            <Icon name="arrow" size={12} style={{ color: c.accent }} />
          </Link>
        ))}
      </div>
    );

  const card = (c: Card, span: string) => {
    const Art = LOOP_ART[c.id];
    return (
      <div className={`${shell} ${span}`}>
        {head(c)}
        {links(c)}
        {/* the scene sits on its own tinted plate, the way the reference set
            frames each illustration on a soft panel rather than loose on the card */}
        <div
          className="mt-6 flex min-h-[190px] flex-1 items-center justify-center overflow-hidden rounded-[var(--r-lg)]"
          style={{ background: `${c.accent}12` }}
        >
          <Art />
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-6">
      {card(score, "lg:col-span-3")}
      {card(insight, "lg:col-span-3")}
      {card(action, "lg:col-span-2")}
      {card(impact, "lg:col-span-2")}

      {/* the closing argument */}
      <div className={`${shell} lg:col-span-2`} style={{ background: "var(--aurora-soft)" }}>
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--card)]/80 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#0d0b16]">
          <SparkMark size={13} />
          The loop
        </span>
        <h3 className="mt-4 text-[19px] font-extrabold leading-snug tracking-[-0.01em] text-[#0d0b16]">
          Impact feeds the next score
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#0d0b16]/75">
          Most tools stop at the number. Here the fourth step starts the first, so every cycle
          begins better informed than the last.
        </p>
        <div className="mt-6 flex min-h-[190px] flex-1 items-center justify-center overflow-hidden rounded-[var(--r-lg)]">
          {LOOP_ART.loop()}
        </div>
      </div>
    </div>
  );
}
