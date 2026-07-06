import type { Metadata } from "next";
import { Container, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { LogoMarquee, SolutionGrid } from "@/components/sections";
import { solutionsByOutcome, solutionsByWorkforce } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "AI-powered solutions by outcome — retention, manager effectiveness, wellbeing, DEI, hybrid work — and by workforce: frontline & deskless, global & multilingual, enterprise.",
};

// Per-outcome anchor ids used by the header mega-menu
const OUTCOME_IDS = ["retention", "managers", "wellbeing", "dei", "hybrid"];

export default function SolutionsIndex() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <SectionHead
            eyebrow="Solutions"
            title="Intelligence for every outcome, every workforce"
            lede="Vadal.ai goes horizontal where others go narrow — AI-powered workforce intelligence tuned to the outcomes you're accountable for and the workforce you run."
          />
        </Container>
      </section>

      {/* by outcome — anchors shared with the header mega-menu */}
      <Section tone="surface" id="outcomes" className="scroll-mt-20 !pt-10">
        <Container>
          <SectionHead eyebrow="By outcome" title="Start from the result you need" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionsByOutcome.map((s, i) => (
              <div
                key={s.name}
                id={OUTCOME_IDS[i]}
                className="group scroll-mt-24 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
                  <Icon name={s.icon ?? "spark"} size={22} />
                </span>
                <h3 className="mt-4 text-[17px] font-bold">{s.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{s.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* by workforce */}
      <Section tone="base" id="workforce" className="scroll-mt-20">
        <Container>
          <SectionHead
            eyebrow="By workforce"
            title="Built for how your people actually work"
            lede="In-office, remote, hybrid or on the frontline — reach and understand every employee, in 150+ languages, at enterprise scale."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {solutionsByWorkforce.map((s) => (
              <div
                key={s.name}
                className="group rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
                  <Icon name={s.icon ?? "globe"} size={22} />
                </span>
                <h3 className="mt-4 text-[17px] font-bold">{s.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{s.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* the six classic solution areas */}
      <Section tone="surface">
        <Container>
          <SectionHead eyebrow="Solution areas" title="Explore the solution areas" />
          <div className="mt-12">
            <SolutionGrid />
          </div>
        </Container>
      </Section>

      <Section tone="base" className="!py-16">
        <Container>
          <LogoMarquee label="Trusted by HR, people and business leaders across industries" />
        </Container>
      </Section>
    </>
  );
}
