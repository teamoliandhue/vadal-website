import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { SectionHead } from "./ui";
import type { IconName } from "@/lib/content";

/* ============================================================================
   AudienceShowcase — "two sides, one platform". A shared heading on top, then
   two compact deep-Aurora cards: one for people leaders, one for the frontline.
   Each carries a small live product chip. ILLUSTRATIVE product moments.
   ========================================================================== */

const PANEL =
  "linear-gradient(150deg, #140f2e 0%, #221a4d 52%, #3a2885 100%)";

type Card = {
  tag: string;
  icon: IconName;
  title: string;
  body: string;
  points: string[];
  cta: { label: string; href: string };
  chip: ReactNode;
};

const CARDS: Card[] = [
  {
    tag: "For people leaders",
    icon: "chart",
    title: "Stop guessing. Start knowing.",
    body: "Replace a stack of point tools with one platform — and finally see the line from engagement to performance, site by site.",
    points: [
      "Live dashboards, heatmaps & drill-downs",
      "Manager action plans that close the loop",
      "Benchmarks and AI-surfaced risks",
    ],
    cta: { label: "See the platform", href: "/platform" },
    chip: (
      <div className="rounded-[13px] bg-white px-3.5 py-2 shadow-[0_18px_40px_-16px_rgba(8,5,30,0.7)]">
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
          Engagement
        </p>
        <div className="flex items-end gap-1.5">
          <span className="text-[22px] font-extrabold leading-none text-[var(--ink-deep)]">82</span>
          <span className="mb-0.5 text-[10px] font-bold text-[#0a9c5b]">▲ 4</span>
        </div>
      </div>
    ),
  },
  {
    tag: "For every employee",
    icon: "phone",
    title: "One app they actually open.",
    body: "A warm, branded home for the workday — news, recognition, training, chat and a voice that gets heard. Human pulse, daily ritual.",
    points: [
      "Personalised feed & instant chat",
      "Recognition, polls & communities",
      "Training that fits in a coffee break",
    ],
    cta: { label: "Meet the app", href: "/solutions/employee-experience" },
    chip: (
      <div className="flex items-center gap-2 rounded-[13px] bg-white px-3 py-2 shadow-[0_18px_40px_-16px_rgba(8,5,30,0.7)]">
        <span className="text-[18px] leading-none">🎉</span>
        <div className="leading-tight">
          <p className="text-[11px] font-bold text-[var(--ink-deep)]">Recognised</p>
          <p className="text-[10px] font-semibold text-[var(--brand)]">Team Player</p>
        </div>
      </div>
    ),
  },
];

export function AudienceShowcase() {
  return (
    <div>
      <SectionHead
        eyebrow="Two sides, one platform"
        title="Loved by leaders. Lived in by everyone."
        lede="The rare platform that a CHRO and a shop-floor colleague both genuinely want to use."
      />

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2" data-reveal-stagger>
        {CARDS.map((c) => (
          <div
            key={c.tag}
            className="relative isolate flex flex-col overflow-hidden rounded-[var(--r-2xl)] p-7 sm:p-9"
            style={{ background: PANEL }}
          >
            {/* aurora glow + halftone field */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,92,248,0.7), transparent 70%)" }} aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1.2px, transparent 1.5px)",
                backgroundSize: "16px 16px",
                maskImage: "linear-gradient(115deg, transparent 45%, #000 100%)",
                WebkitMaskImage: "linear-gradient(115deg, transparent 45%, #000 100%)",
              }}
            />

            {/* top row: tag + live chip */}
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white/12 text-white backdrop-blur">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/85 backdrop-blur">
                  {c.tag}
                </span>
              </div>
              {c.chip}
            </div>

            <h3 className="relative mt-6 text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-white">
              {c.title}
            </h3>
            <p className="relative mt-3 max-w-md text-[15px] leading-relaxed text-white/65">
              {c.body}
            </p>

            <ul className="relative mt-5 space-y-2.5">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] text-white/90">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/15 text-white">
                    <Icon name="check" size={12} strokeWidth={2.6} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="relative mt-auto pt-8">
              <Link
                href={c.cta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-[var(--ink-deep)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
              >
                {c.cta.label}
                <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
