import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { DashboardMock, PhoneMock } from "@/components/ProductMocks";
import { ProductShot } from "@/components/ProductShot";
import { LogoMarquee, StatBand } from "@/components/sections";
import { homeStats, ILLUSTRATIVE, portfolioGroups, type IconName } from "@/lib/content";

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
  { t: "Score", d: "Measure how engaged every team really is, continuously.", i: "pulse", color: "#23D7BE" },
  { t: "Insight", d: "Understand why, drivers, drill-downs and AI explanations.", i: "chart", color: "#3B9EFF" },
  { t: "Action", d: "Give managers concrete plays: campaigns, recognition, nudges.", i: "checks", color: "#7C5CF8" },
  { t: "Impact", d: "See it land, engagement moving the business, side by side.", i: "spark", color: "#FF8A5B" },
];

function SpineCard({ step: s, index }: { step: (typeof SPINE_STEPS)[number]; index: number }) {
  return (
    <div className="card-lift group relative flex flex-col overflow-hidden rounded-[var(--r-lg)] p-6">
      {/* ghost numeral — a large, barely-there background numeral (editorial device) */}
      <span
        className="pointer-events-none absolute -top-3 right-3 select-none text-[76px] font-black leading-none text-[var(--line)] transition-colors duration-300 group-hover:text-[var(--surface-2)]"
        aria-hidden="true"
      >
        0{index + 1}
      </span>
      <span
        className="relative grid h-12 w-12 place-items-center rounded-[14px] text-white shadow-[0_8px_20px_-8px_rgba(13,11,22,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ background: s.color, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 18px -8px ${s.color}80` }}
      >
        <Icon name={s.i} size={24} />
      </span>
      <h3 className="relative mt-4 text-[18px] font-bold">{s.t}</h3>
      <p className="relative mt-1.5 text-[14px] leading-relaxed text-[var(--muted)]">{s.d}</p>
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
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1.5 sm:gap-x-3.5">
                {SPINE_STEPS.map((s, i) => (
                  <span key={s.t} className="inline-flex items-baseline gap-2.5 sm:gap-3.5">
                    {i > 0 && (
                      <span className="text-[var(--muted-2)]" aria-hidden="true">
                        →
                      </span>
                    )}
                    <span style={{ color: s.color }}>{s.t}</span>
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
                        style={{ background: `${s.color}17` }}
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

          {/* the loop, made explicit */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-dashed border-[var(--line-strong)] bg-[var(--card)] py-2 pl-2 pr-4 shadow-[var(--shadow-sm)]">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: "var(--aurora)" }}>
                <Icon name="refresh" size={13} className="text-white" />
              </span>
              <span className="text-[13px] font-semibold text-[var(--foreground)]">
                Then Impact becomes tomorrow&apos;s Score, a loop, not a report.
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
            {portfolioGroups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--brand-tint)] text-[var(--brand)]">
                    <Icon name={g.icon} size={20} />
                  </span>
                  <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{g.name}</h3>
                </div>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
                  {g.description}
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {g.items.map((it) =>
                    it.slug ? (
                      <Link
                        key={it.name}
                        href={`/platform/${it.slug}`}
                        className="group flex flex-col rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
                      >
                        <h4 className="text-[15px] font-bold">{it.name}</h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{it.blurb}</p>
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
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{it.blurb}</p>
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
