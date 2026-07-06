import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { DashboardMock, PhoneMock } from "@/components/ProductMocks";
import { LogoMarquee, StatBand } from "@/components/sections";
import { homeStats, ILLUSTRATIVE, portfolioGroups, type IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The AI-powered workforce engagement & decision intelligence platform — surveys, continuous listening, people analytics and action planning, with the Vadal.ai copilot throughout.",
};

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
              AI-powered system — built on one idea: don&apos;t just measure your workforce,
              lead it with intelligence.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/demo" size="lg" icon>Book demo</Button>
              <Button href="#ai" variant="ghost" size="lg">Meet Vadal AI</Button>
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-4xl">
            <DashboardMock />
          </div>
        </Container>
      </section>

      {/* the spine */}
      <Section tone="surface">
        <Container>
          <SectionHead
            eyebrow="The spine"
            title={<>Score <span className="text-[var(--muted-2)]">→</span> Insight <span className="text-[var(--muted-2)]">→</span> Action <span className="text-[var(--muted-2)]">→</span> Impact</>}
            lede="Most tools stop at the score. Vadal carries you all the way to impact — and loops back."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Score", d: "Measure how engaged every team really is, continuously.", i: "pulse" },
              { t: "Insight", d: "Understand why — drivers, drill-downs and AI explanations.", i: "chart" },
              { t: "Action", d: "Give managers concrete plays: campaigns, recognition, nudges.", i: "checks" },
              { t: "Impact", d: "See it land — engagement moving the business, side by side.", i: "spark" },
            ].map((s, idx) => (
              <div key={s.t} className="relative rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6">
                <span className="text-[12px] font-bold text-[var(--muted-2)]">0{idx + 1}</span>
                <Icon name={s.i as IconName} size={24} className="mt-2 text-[var(--brand)]" />
                <h3 className="mt-3 text-[18px] font-bold">{s.t}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--muted)]">{s.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* portfolio — the six product families (Portfolio for Vadal.docx).
          Anchor ids are shared with the header mega-menu. */}
      <Section tone="surface" id="portfolio" className="scroll-mt-20">
        <Container>
          <SectionHead
            eyebrow="The full portfolio"
            title="Every capability, six product families"
            lede="From workforce experience to decision intelligence — the complete Vadal.ai portfolio, unified on one AI-powered platform."
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
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {g.items.map((it) => (
                    <div
                      key={it.name}
                      className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
                    >
                      <h4 className="text-[15px] font-bold">{it.name}</h4>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{it.blurb}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* AI */}
      <section id="ai" className="relative scroll-mt-20 overflow-hidden bg-[var(--background)] py-20 sm:py-28">
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
      <Section tone="surface" id="app" className="scroll-mt-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 flex justify-center lg:order-1"><PhoneMock /></div>
          <div className="order-1 lg:order-2">
            <Eyebrow>The branded app</Eyebrow>
            <h2 className="display-md mt-3 font-extrabold">The home screen of the workday</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-[var(--muted)]">
              A warm, human app your people open every day — greeting and mood check, what&apos;s
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
      <Section tone="base">
        <Container>
          <SectionHead eyebrow="Business results" title="What changes when everyone’s in" />
          <div className="mt-12"><StatBand stats={homeStats} note={ILLUSTRATIVE} /></div>
        </Container>
      </Section>

      <Section tone="surface" className="!py-16">
        <Container><LogoMarquee label="Trusted by HR, people and business leaders across industries" /></Container>
      </Section>
    </>
  );
}
