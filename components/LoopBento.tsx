import Link from "next/link";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import type { IconName } from "@/lib/content";

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

   Every illustration is drawn in DOM and SVG rather than shipped as an image,
   so the cards stay sharp at any size, restyle with the tokens, and cost
   nothing to download.
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

/* --------------------------------------------------------- illustrations */

/** Score: the live number, its trend, and the channels it came from */
function ScoreArt({ c }: { c: string }) {
  const bars = [38, 52, 44, 61, 55, 72, 68, 81];
  return (
    <div className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
            Engagement
          </p>
          <p className="mt-1 text-[30px] font-extrabold leading-none tabular-nums" style={{ color: c }}>
            82
          </p>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-bold"
          style={{ background: `${c}1f`, color: c }}
        >
          +4 wk
        </span>
      </div>
      <div className="mt-3 flex h-10 items-end gap-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-[2px]"
            style={{ height: `${h}%`, background: c, opacity: 0.25 + (i / bars.length) * 0.75 }}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-1.5">
        {(["chat", "phone", "broadcast"] as IconName[]).map((n) => (
          <span
            key={n}
            className="grid h-6 w-6 place-items-center rounded-[7px]"
            style={{ background: `${c}14`, color: c }}
          >
            <Icon name={n} size={12} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Insight: the themes behind the number, with direction */
function InsightArt({ c }: { c: string }) {
  const themes = [
    { t: "Recognition", v: 74, up: true },
    { t: "Workload", v: 38, up: false },
    { t: "Career growth", v: 61, up: true },
  ];
  return (
    <div className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--surface)] p-4">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
        What is driving it
      </p>
      <div className="mt-3 space-y-2.5">
        {themes.map((t) => (
          <div key={t.t}>
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-[var(--foreground)]">{t.t}</span>
              <span className="font-bold tabular-nums" style={{ color: t.up ? c : "#e4622f" }}>
                {t.up ? "▲" : "▼"} {t.v}
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-[var(--line)]">
              <span
                className="block h-full rounded-full"
                style={{ width: `${t.v}%`, background: t.up ? c : "#e4622f" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Action: owned work with progress, not a slide */
function ActionArt({ c }: { c: string }) {
  const rows = [
    { t: "Rebalance sprint load", who: "PR", pct: 70 },
    { t: "Monthly 1:1 cadence", who: "SK", pct: 40 },
  ];
  return (
    <div className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.t} className="flex items-center gap-2.5">
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9.5px] font-bold text-white"
              style={{ background: c }}
            >
              {r.who}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold text-[var(--foreground)]">
                {r.t}
              </span>
              <span className="mt-1 block h-1.5 rounded-full bg-[var(--line)]">
                <span className="block h-full rounded-full" style={{ width: `${r.pct}%`, background: c }} />
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Impact: measured against its own baseline */
function ImpactArt({ c }: { c: string }) {
  return (
    <div className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="flex items-end gap-3">
        {[
          { l: "Before", h: 44, faded: true },
          { l: "After", h: 82, faded: false },
          { l: "Peers", h: 61, faded: true },
        ].map((b) => (
          <div key={b.l} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="flex h-[62px] w-full items-end">
              <span
                className="w-full rounded-t-[4px]"
                style={{ height: `${b.h}%`, background: c, opacity: b.faded ? 0.22 : 1 }}
              />
            </span>
            <span className="text-[10.5px] font-semibold text-[var(--muted-2)]">{b.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ART: Record<string, (p: { c: string }) => React.ReactElement> = {
  score: ScoreArt,
  insight: InsightArt,
  action: ActionArt,
  impact: ImpactArt,
};

/** the closing card: the fourth step feeds the first.

    A bare ring reads as decoration. The direction is the whole point here, so
    one lit segment chases the path — you can see which way it turns without
    having to be told. pathLength normalises the ellipse to 100 units so the
    dash maths is readable rather than derived from its circumference. */
function LoopArt() {
  const CX = 60, CY = 58, RX = 46, RY = 39.6;
  const pts = [0, 1, 2, 3].map((i) => {
    const a = ((-90 + i * 90) * Math.PI) / 180;
    return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
  });
  const COLS = ["#19c6b4", "#2bb0e6", "#4a8bfb", "#7c5cf8"];
  return (
    <svg viewBox="0 0 120 116" className="w-full max-w-[168px]" aria-hidden="true">
      <defs>
        <linearGradient id="bento-loop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#19c6b4" />
          <stop offset="100%" stopColor="#7c5cf8" />
        </linearGradient>
      </defs>
      <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="url(#bento-loop)" strokeWidth="2" opacity="0.32" />
      <ellipse
        className="loop-chase"
        cx={CX}
        cy={CY}
        rx={RX}
        ry={RY}
        fill="none"
        stroke="url(#bento-loop)"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="16 84"
      />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="8.5" fill={COLS[i]} opacity="0.16" />
          <circle cx={p.x} cy={p.y} r="5" fill={COLS[i]} />
        </g>
      ))}
    </svg>
  );
}

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
    const Art = ART[c.id];
    return (
      <div className={`${shell} ${span}`}>
        {head(c)}
        {links(c)}
        <div className="mt-6 flex-1">
          <Art c={c.accent} />
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
        <div className="mt-6 flex flex-1 items-center justify-center">
          <LoopArt />
        </div>
      </div>
    </div>
  );
}
