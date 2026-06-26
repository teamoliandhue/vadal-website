import type { Metadata } from "next";
import { Container, Section, SectionHead } from "@/components/ui";
import { LogoMarquee, SolutionGrid } from "@/components/sections";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Six solution areas, one engagement operating system — communication, mobile learning, culture & wellbeing, onboarding, employee experience and productivity.",
};

export default function SolutionsIndex() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <SectionHead
            eyebrow="Solutions"
            title="One platform, six ways to win"
            lede="Vadal goes horizontal where others go narrow — covering the whole engagement lifecycle so your people never feel the seams."
          />
        </Container>
      </section>
      <Section tone="surface" className="!pt-10">
        <Container>
          <SolutionGrid />
        </Container>
      </Section>
      <Section tone="base" className="!py-16">
        <Container>
          <LogoMarquee label="Trusted across the deskless economy" />
        </Container>
      </Section>
    </>
  );
}
