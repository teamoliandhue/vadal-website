import type { Metadata } from "next";
import { Button, Container, Pill, Section, SectionHead } from "@/components/ui";
import { IconChip } from "@/components/sections";
import { SparkMark } from "@/components/Brand";
import { scienceMenu } from "@/lib/content";

export const metadata: Metadata = {
  title: "Science",
  description:
    "Feedback grounded in AI-powered intelligence — the people science, methodology, workforce intelligence, technology platform and predictive benchmarks behind Vadal.ai.",
};

// Fuller narratives behind each science pillar (anchors match the mega-menu)
const SECTIONS = [
  {
    id: "people-science",
    name: "People Science & AI",
    body: "Great workforce decisions start with rigorous people science — validated constructs, tested question design and organizational psychology. Vadal.ai pairs that foundation with modern AI, so the models don't just describe how your people feel today: they predict how engagement, wellbeing and performance will move, and what will move them.",
    icon: "users",
  },
  {
    id: "methodology",
    name: "AI-Driven Methodology",
    body: "Behind every insight is an intelligent framework: continuous listening feeds predictive models; models generate explainable recommendations; recommendations become owned, tracked actions. Score → Insight → Action → Impact — a loop, not a report.",
    icon: "checks",
  },
  {
    id: "workforce-intelligence",
    name: "Workforce Intelligence",
    body: "Employee feedback, performance data and organizational metrics are noisy on their own. Vadal.ai fuses them into clear, predictive workforce insights — engagement drivers, attrition risk, leadership effectiveness and team health — quantified, benchmarked and ranked by business impact.",
    icon: "chart",
  },
  {
    id: "platform",
    name: "AI Technology Platform",
    body: "One unified platform integrates workforce data, AI analytics and predictive decision intelligence — with enterprise-grade security, responsible AI governance and explainability built in. No black boxes: every recommendation can show its work.",
    icon: "spark",
  },
  {
    id: "benchmarks",
    name: "Predictive Industry Benchmarks",
    body: "Static annual benchmarks age fast. Vadal.ai builds dynamic, AI-powered benchmarks across industries, functions and regions — so you always know where you stand, where you're heading, and how the leaders in your category got there.",
    icon: "globe",
  },
] as const;

export default function SciencePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash animate-aurora pointer-events-none absolute inset-0 -z-10" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <Pill aurora>
              <SparkMark size={14} animate /> The science
            </Pill>
            <h1 className="display-xl font-extrabold">
              Feedback grounded in
              <br />
              <span className="aurora-text">AI-powered intelligence</span>
            </h1>
            <p className="max-w-xl text-[18px] leading-relaxed text-[var(--muted)]">
              {scienceMenu.items.map((i) => i.name).join(" · ")} — the thinking that turns
              employee feedback into confident business decisions.
            </p>
            <Button href="/demo" size="lg" icon>
              See it on your data
            </Button>
          </div>
        </Container>
      </section>

      <Section tone="surface" className="!pt-12">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {SECTIONS.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className="scroll-mt-24 rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[var(--shadow-sm)] sm:p-9"
              >
                <div className="flex items-center gap-3.5">
                  <IconChip icon={s.icon} tint={i} />
                  <div>
                    <span className="text-[12px] font-bold text-[var(--muted-2)]">0{i + 1}</span>
                    <h2 className="text-[20px] font-extrabold leading-tight tracking-[-0.02em]">{s.name}</h2>
                  </div>
                </div>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="base">
        <Container className="text-center">
          <SectionHead
            eyebrow="Put it to work"
            title="Science is only useful when it changes a decision"
            lede="Bring your questions — we'll show you the models, the methodology and what they'd say about your workforce."
          />
          <div className="mt-8 flex justify-center">
            <Button href="/demo" size="lg" icon>
              Book a demo
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
