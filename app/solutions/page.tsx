import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { IconChip, LogoMarquee, SolutionGrid } from "@/components/sections";
import { solutionsByOutcome, solutionsByWorkforce } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "AI-powered solutions by outcome — retention, manager effectiveness, wellbeing, DEI, hybrid work — and by workforce: frontline & deskless, global & multilingual, enterprise.",
};

export default function SolutionsIndex() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <SectionHead
            eyebrow="Solutions"
            as="h1"
            title="Intelligence for every outcome, every workforce"
            lede="Vadal.ai goes horizontal where others go narrow — AI-powered workforce intelligence tuned to the outcomes you're accountable for and the workforce you run."
          />
        </Container>
      </section>

      {/* by outcome */}
      <Section tone="surface" className="!pt-10">
        <Container>
          <SectionHead eyebrow="By outcome" title="Start from the result you need" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionsByOutcome.map((s, i) => (
              <Link
                key={s.name}
                href={s.href}
                className="group flex flex-col rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
              >
                <IconChip icon={s.icon ?? "spark"} tint={i} />
                <h3 className="mt-4 text-[17px] font-bold">{s.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{s.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-[var(--brand)]">
                  Explore
                  <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* by workforce */}
      <Section tone="base">
        <Container>
          <SectionHead
            eyebrow="By workforce"
            title="Built for how your people actually work"
            lede="In-office, remote, hybrid or on the frontline — reach and understand every employee, in 150+ languages, at enterprise scale."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {solutionsByWorkforce.map((s, i) => (
              <Link
                key={s.name}
                href={s.href}
                className="group flex flex-col rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
              >
                <IconChip icon={s.icon ?? "globe"} tint={i + 1} />
                <h3 className="mt-4 text-[17px] font-bold">{s.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{s.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-[var(--brand)]">
                  Explore
                  <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
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
