import type { Metadata } from "next";
import { Button, Container, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { IconChip } from "@/components/sections";
import { FaqAccordion } from "@/components/FaqAccordion";
import { type IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pricing tailored to your organization's size and scope, every plan includes AI-powered surveys, analytics, action planning and enterprise-grade security. Talk to sales for a quote.",
};

// Enterprise-style pricing (category norm: quote-based, segmented by size)
const TIERS: { name: string; audience: string; icon: IconName; points: string[] }[] = [
  {
    name: "Growth",
    audience: "For organizations under 200 employees",
    icon: "rocket",
    points: [
      "AI-powered engagement & pulse surveys",
      "eNPS and workforce analytics dashboards",
      "Research-backed survey template library",
      "Slack, Teams & Google Workspace integrations",
    ],
  },
  {
    name: "Scale",
    audience: "For 200–999 employees",
    icon: "chart",
    points: [
      "Everything in Growth",
      "Lifecycle surveys & continuous listening",
      "AI sentiment intelligence & benchmarks",
      "HRIS integrations & role-based access",
    ],
  },
  {
    name: "Enterprise",
    audience: "For 1,000+ employees",
    icon: "shield",
    points: [
      "Everything in Scale",
      "Decision Intelligence Copilot & predictive analytics",
      "SSO/MFA, audit logs, AI governance",
      "Dedicated CSM & 5-week guided implementation",
    ],
  },
];

const INCLUDED = [
  "Unlimited surveys & responses",
  "Anonymity protection with configurable thresholds",
  "GDPR-ready privacy controls",
  "Onboarding & data migration at no extra cost",
  "150+ languages",
  "Mobile, email, SMS & QR distribution",
];

const PRICING_FAQS = [
  {
    q: "How is Vadal.ai priced?",
    a: "Per employee, per month, shaped by your organization's size, the modules you need and the depth of intelligence you want. Talk to sales for a quote tailored to your workforce; most teams have one within 48 hours.",
  },
  {
    q: "Is there a minimum contract?",
    a: "Plans are annual by default. Multi-year agreements unlock better rates, and we'll credit a proof-of-value pilot toward your first year.",
  },
  {
    q: "What does implementation cost?",
    a: "Nothing extra. Onboarding, data migration and HRIS integration are included in every plan, with a structured 5-week implementation and a dedicated customer success manager.",
  },
  {
    q: "Can we start small and expand?",
    a: "Yes. Many customers start with engagement surveys and analytics for one region or business unit, then expand modules and geographies as value lands.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <SectionHead
            eyebrow="Pricing"
            as="h1"
            title="Pricing that fits your workforce"
            lede="Every organization's workforce, and ambition, is different. Tell us yours and we'll shape a plan around it, with a quote in 48 hours."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/demo" size="lg" icon>
              Get a quote
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Talk to sales
            </Button>
          </div>
        </Container>
      </section>

      <Section tone="surface" className="!pt-10">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-[var(--r-2xl)] border bg-[var(--card)] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] ${
                  i === 2 ? "aurora-ring border-transparent shadow-[var(--shadow-md)]" : "border-[var(--line)]"
                }`}
              >
                {i === 2 && (
                  <span className="absolute -top-3 left-7">
                    <Pill aurora>Most popular</Pill>
                  </span>
                )}
                <IconChip icon={t.icon} tint={i} />
                <h2 className="mt-4 text-[22px] font-extrabold">{t.name}</h2>
                <p className="mt-1 text-[14px] font-semibold text-[var(--muted)]">{t.audience}</p>
                <ul className="mt-5 space-y-2.5">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[14px] text-[var(--foreground)]">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
                        <Icon name="check" size={12} strokeWidth={2.6} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <Button href="/demo" variant={i === 2 ? "primary" : "secondary"} className="w-full justify-center" icon>
                    Get a quote
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--card)] p-7 sm:p-9">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
              Included in every plan
            </p>
            <div className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDED.map((f) => (
                <span key={f} className="flex items-start gap-2.5 text-[14px] text-[var(--foreground)]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
                    <Icon name="check" size={12} strokeWidth={2.6} />
                  </span>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="base">
        <Container>
          <SectionHead eyebrow="Pricing FAQ" title="The questions everyone asks" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion faqs={PRICING_FAQS} />
          </div>
        </Container>
      </Section>
    </>
  );
}
