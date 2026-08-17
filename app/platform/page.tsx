import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { DashboardMock, PhoneMock } from "@/components/ProductMocks";
import { ProductShot } from "@/components/ProductShot";
import { LogoMarquee, StatBand } from "@/components/sections";
import { homeStats, ILLUSTRATIVE, type IconName } from "@/lib/content";
import { platformLayers } from "@/lib/platform-nav";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The AI-powered workforce engagement & decision intelligence platform, surveys, continuous listening, people analytics and action planning, with the Vadal.ai copilot throughout.",
};

// The spine's four stages each carry a stop of the Aurora gradient — teal and
// blue (the "signal" stages), violet (Action — the brand's own "user acts"
// color, a deliberate callback to the golden rule), and spark apricot
// (Impact — the AI-driven payoff). Same tokens as globals.css, no new colors.
const SPINE_STEPS: { t: string; d: string; i: IconName; color: string }[] = [
  { t: "Score", d: "Measure how engaged every team is, continuously — not once a year.", i: "pulse", color: "#23D7BE" },
  { t: "Insight", d: "Understand why: the drivers behind the number, drill-downs and AI explanations.", i: "chart", color: "#3B9EFF" },
  { t: "Action", d: "Give managers concrete plays — campaigns, recognition and nudges with an owner.", i: "checks", color: "#7C5CF8" },
  { t: "Impact", d: "See it land, measured against each team's own baseline rather than an average.", i: "spark", color: "#FF8A5B" },
];

/* A small piece of the product per stage, so the four cards are not four
   identical boxes distinguished only by an icon colour. Each is a few divs —
   nothing to download, and it restyles with the tokens. */
function SpineArt({ index, color }: { index: number; color: string }) {
  if (index === 0)
    return (
      <span className="flex h-9 w-full items-end gap-[3px]">
        {[38, 52, 44, 61, 55, 72, 68, 82].map((h, i) => (
          <span key={i} className="flex-1 rounded-[2px]" style={{ height: `${h}%`, background: color, opacity: 0.3 + (i / 8) * 0.7 }} />
        ))}
      </span>
    );
  if (index === 1)
    return (
      <span className="flex h-9 w-full flex-col justify-center gap-[7px]">
        {[84, 52, 68].map((w, i) => (
          <span key={i} className="block h-[5px] rounded-full bg-[var(--surface-2)]">
            <span className="block h-full rounded-full" style={{ width: `${w}%`, background: color }} />
          </span>
        ))}
      </span>
    );
  if (index === 2)
    return (
      <span className="flex h-9 w-full flex-col justify-center gap-[7px]">
        {[100, 62].map((w, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full text-[9px] font-bold text-white" style={{ background: color, opacity: i ? 0.45 : 1 }}>✓</span>
            <span className="block h-[5px] flex-1 rounded-full bg-[var(--surface-2)]">
              <span className="block h-full rounded-full" style={{ width: `${w}%`, background: color, opacity: i ? 0.45 : 1 }} />
            </span>
          </span>
        ))}
      </span>
    );
  return (
    <span className="flex h-9 w-[92px] items-end gap-2">
      {[{ h: 44, o: 0.28 }, { h: 82, o: 1 }].map((b, i) => (
        <span key={i} className="flex flex-1 flex-col items-center gap-1">
          <span className="flex h-7 w-full items-end">
            <span className="w-full rounded-t-[3px]" style={{ height: `${b.h}%`, background: color, opacity: b.o }} />
          </span>
          <span className="text-[9px] font-semibold text-[var(--muted-2)]">{i ? "After" : "Before"}</span>
        </span>
      ))}
    </span>
  );
}

function SpineCard({ step: s, index }: { step: (typeof SPINE_STEPS)[number]; index: number }) {
  return (
    <div className="card-lift group relative flex h-full flex-col rounded-[var(--r-lg)] p-6">
      {/* the step number belongs with the label, not behind it at 76px where it
          outranks the word it is numbering */}
      <div className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] text-white transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{ background: s.color, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 18px -8px ${s.color}80` }}
        >
          <Icon name={s.i} size={22} />
        </span>
        <span className="text-[11px] font-bold tabular-nums tracking-[0.14em]" style={{ color: s.color }}>
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-4 text-[18px] font-bold leading-snug">{s.t}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--muted)]">{s.d}</p>
      <div className="mt-5 flex flex-1 items-end [&>span]:shrink-0">
        <SpineArt index={index} color={s.color} />
      </div>
    </div>
  );
}

export default function PlatformPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="aurora-wash animate-aurora pointer-events-none absolute inset-0 -z-10" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <Pill aurora>
              <SparkMark size={14} /> The workforce intelligence platform
            </Pill>
            <h1 className="display-xl font-extrabold">
              Every workforce decision,
              <br /> on <span className="aurora-text">one platform</span>
            </h1>
            <p className="max-w-xl text-[18px] leading-relaxed text-[var(--muted)]">
              Surveys, continuous listening, people analytics and action planning in one
              AI-powered system, built on one idea: don&apos;t just measure your workforce,
              lead it with intelligence.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/demo" size="lg" icon>Book demo</Button>
              <Button href="#ai" variant="ghost" size="lg">Meet Vadal AI</Button>
            </div>
          </div>
          <div className="mx-auto mt-14 flex max-w-4xl justify-center">
            {/* the real product home — AI briefing, team health, Ask Vadal */}
            <ProductShot shot={{ file: "home", label: "Home" }} priority className="!max-w-[880px]" />
          </div>
        </Container>
      </section>

      {/* the spine — Vadal's core loop, given its own signature visual system:
          each stage carries a stop of the Aurora gradient (teal→blue→violet,
          + spark for Impact), connected by a colored rail on desktop, closing
          with an explicit "loops back" beat so the cycle — not a funnel —
          reads at a glance. */}
      <Section tone="surface" glow="top">
        <Container>
          <SectionHead
            eyebrow="The spine"
            title={
              <span className="flex flex-col items-center gap-y-1">
                {[SPINE_STEPS.slice(0, 2), SPINE_STEPS.slice(2)].map((row, r) => (
                  <span key={r} className="inline-flex items-baseline gap-x-2.5 sm:gap-x-3.5">
                    {row.map((s2, i) => (
                      <span key={s2.t} className="inline-flex items-baseline gap-x-2.5 sm:gap-x-3.5">
                        {i > 0 && (
                          <span className="text-[var(--muted-2)]" aria-hidden="true">
                            →
                          </span>
                        )}
                        <span style={{ color: s2.color }}>{s2.t}</span>
                      </span>
                    ))}
                    {r === 0 && (
                      <span className="text-[var(--muted-2)]" aria-hidden="true">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </span>
            }
            lede="Most tools stop at the score. Vadal carries you all the way to impact, and loops back."
          />

          <div className="relative mt-16">
            {/* desktop: connected rail, colored per stage, chevrons between */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-3">
              {SPINE_STEPS.map((s, i) => (
                <div key={s.t} className="contents">
                  {i > 0 && (
                    <div className="flex items-center justify-center pt-9" aria-hidden="true">
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
                        style={{ background: `${s.color}1f`, boxShadow: `0 0 0 4px var(--background)` }}
                      >
                        <Icon name="arrow" size={15} style={{ color: s.color }} />
                      </span>
                    </div>
                  )}
                  <SpineCard step={s} index={i} />
                </div>
              ))}
            </div>

            {/* mobile / tablet: simple stacked cards, same visual language */}
            <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
              {SPINE_STEPS.map((s, i) => (
                <SpineCard key={s.t} step={s} index={i} />
              ))}
            </div>
          </div>

          {/* The loop, drawn rather than claimed.

              This was a dashed pill under the row saying the fourth step feeds
              the first. The section is named for that loop and the headline
              ends on it, so having it be the quietest thing on screen was
              backwards. Now a return path runs back from Impact to Score with
              the sentence sitting on it — CSS borders rather than an SVG, so
              the corner radii stay true at every width instead of shearing the
              way a stretched viewBox would. */}
          <div className="relative mt-1 hidden lg:block" aria-hidden="true">
            <div
              className="mx-[7%] h-16 rounded-b-[26px] border-b-2 border-l-2 border-r-2 border-dashed"
              style={{ borderColor: "var(--strong, #c9c9d4)", opacity: 0.55 }}
            />
            {/* arrowhead where the path re-enters Score */}
            <span
              className="absolute -top-[7px] left-[7%] grid h-[18px] w-[18px] -translate-x-1/2 place-items-center rounded-full text-[9px] font-bold text-white"
              style={{ background: "#23D7BE", boxShadow: "0 0 0 4px var(--background)" }}
            >
              ▲
            </span>
          </div>

          <div className="relative z-10 -mt-[38px] flex justify-center max-lg:mt-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] py-2 pl-2 pr-4 shadow-[var(--shadow-sm)]">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: "var(--aurora)" }}>
                <Icon name="refresh" size={13} className="text-white" />
              </span>
              <span className="text-[13px] font-semibold text-[var(--foreground)]">
                Impact becomes tomorrow&apos;s Score — a loop, not a report.
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* portfolio — the six product families (Portfolio for Vadal.docx).
          Anchor ids are shared with the header mega-menu. */}
      <Section tone="base" id="portfolio" className="scroll-mt-20">
        <Container>
          <SectionHead
            eyebrow="The full portfolio"
            title="Every capability, six product families"
            lede="From workforce experience to decision intelligence, the complete Vadal.ai portfolio, unified on one AI-powered platform."
          />
          <div className="mt-14 space-y-14">
            {platformLayers.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--brand-tint)] text-[var(--brand)]">
                    <Icon name={g.icon} size={20} />
                  </span>
                  <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{g.name}</h3>
                </div>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
                  {g.description ?? g.lede}
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {g.modules.map((it) =>
                    it.slug ? (
                      <Link
                        key={it.name}
                        href={`/platform/${it.slug}`}
                        className="group flex flex-col rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
                      >
                        <h4 className="text-[15px] font-bold">{it.name}</h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">
                          {it.blurb ?? it.hook}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold text-[var(--brand)]">
                          Explore
                          <Icon name="arrow" size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    ) : (
                      <div
                        key={it.name}
                        className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5"
                      >
                        <h4 className="text-[15px] font-bold">{it.name}</h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">
                          {it.blurb ?? it.hook}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* AI */}
      <section id="ai" className="relative scroll-mt-20 overflow-hidden bg-[var(--background)] py-12 sm:py-16">
        <div className="aurora-wash pointer-events-none absolute inset-0 opacity-90" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Pill aurora><SparkMark size={14} animate /> Vadal AI · Aurora</Pill>
            <h2 className="display-lg mt-5 font-extrabold">
              Intelligence for <span className="aurora-text">everyone</span>
            </h2>
            <p className="mt-5 max-w-lg text-[18px] leading-relaxed text-[var(--muted)]">
              An AI co-pilot for managers and employees alike. Ask in plain language, get
              answers from across your workforce, and let proactive nudges surface what needs
              attention before it becomes a problem.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Ask Vadal command bar", "Streaming AI briefings", "Select-text-to-ask", "“Explain this” on charts", "Contextual follow-ups", "Attrition-risk signals"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[15px]"><SparkMark size={16} /> {f}</li>
              ))}
            </ul>
            <div className="mt-8"><Button href="/demo" variant="ai" size="lg" icon>See it on your data</Button></div>
          </div>
          <DashboardMock />
        </Container>
      </section>

      {/* App */}
      <Section tone="base" id="app" className="scroll-mt-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 flex justify-center lg:order-1"><PhoneMock /></div>
          <div className="order-1 lg:order-2">
            <Eyebrow>The branded app</Eyebrow>
            <h2 className="display-md mt-3 font-extrabold">The home screen of the workday</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-[var(--muted)]">
              A warm, human app your people open every day, greeting and mood check, what&apos;s
              up next, a quick poll, recognition, communities and an Ask Vadal card. Every
              interaction feeds the intelligence; every insight makes the day better.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["SSO & SCIM", "HRMS sync", "Your brand", "150+ languages", "Offline-friendly"].map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
            <div className="mt-8"><Button href="/security" variant="ghost" icon>How we keep it secure</Button></div>
          </div>
        </Container>
      </Section>

      {/* results */}
      <Section tone="surface">
        <Container>
          <SectionHead eyebrow="Business results" title="What changes when everyone’s in" />
          <div className="mt-12"><StatBand stats={homeStats} note={ILLUSTRATIVE} /></div>
        </Container>
      </Section>

      <Section tone="base" className="!py-16">
        <Container><LogoMarquee label="Trusted by HR, people and business leaders across industries" /></Container>
      </Section>
    </>
  );
}
