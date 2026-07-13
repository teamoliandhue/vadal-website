import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { StatBand, TestimonialCard } from "@/components/sections";
import { homeStats, ILLUSTRATIVE, testimonials, type IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "How HR, people and business leaders use Vadal.ai to understand, predict and improve their workforce — across retail, facilities, logistics, hospitality, finance and manufacturing.",
};

type Story = {
  company: string;
  industry: string;
  icon: IconName;
  headline: string;
  metric: string;
  metricLabel: string;
};

const stories: Story[] = [
  { company: "Northwind Retail", industry: "Retail · 6,000 staff", icon: "broadcast", headline: "One voice across 240 stores — and a way for the floor to talk back.", metric: "94%", metricLabel: "weekly active reach" },
  { company: "Meridian Facilities", industry: "Facilities · 9,000 staff", icon: "rocket", headline: "Onboarding that starts the moment a cleaner signs, not on day one.", metric: "2×", metricLabel: "faster time-to-productivity" },
  { company: "Rivermark Logistics", industry: "Logistics · 4,200 staff", icon: "chart", headline: "Depot-by-depot insight leadership never had before.", metric: "28%", metricLabel: "lower first-year attrition" },
  { company: "Verdant Hospitality", industry: "Hospitality · 3,500 staff", icon: "graduation", headline: "Micro-learning that seasonal joiners actually finish.", metric: "55%", metricLabel: "higher guest satisfaction" },
  { company: "Forge Industries", industry: "Manufacturing · 7,800 staff", icon: "checks", headline: "Safety checks and daily tasks, with a full audit trail.", metric: "37%", metricLabel: "less operational downtime" },
  { company: "Summit Health", industry: "Healthcare · 5,100 staff", icon: "heart", headline: "Connection and recognition for teams who rarely meet.", metric: "+22", metricLabel: "eNPS in year one" },
];

export default function CustomersPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <SectionHead
            eyebrow="Customer stories"
            as="h1"
            title="Intelligence people can feel"
            lede="From the retail floor to the boardroom — see how teams put Vadal.ai to work. Every story below is an illustrative sample pending verified case studies."
          />
        </Container>
      </section>

      {/* hero photo band */}
      <Container className="pb-6">
        <figure className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line)] shadow-[var(--shadow-lg)]">
          <img
            src="/people/customers-celebrate.webp"
            alt="A customer team celebrating a win together"
            className="aspect-[16/10] w-full object-cover sm:aspect-[2.6/1]"
            loading="lazy"
          />
        </figure>
      </Container>

      {/* featured */}
      <Section tone="surface" className="!pt-10">
        <Container>
          <div className="grid items-stretch gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="flex h-full flex-col justify-between gap-8 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-8 shadow-[var(--shadow-md)] sm:p-10">
                <div>
                  <Pill><Icon name="broadcast" size={14} className="text-[var(--brand)]" /> Featured · Retail</Pill>
                  <h2 className="display-md mt-5 font-extrabold">
                    How Northwind Retail gave 6,000 colleagues one place to be heard
                  </h2>
                  <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[var(--muted)]">
                    Posters and email never reached the shop floor. With Vadal, store teams get
                    news on their phones, reply in a tap, and leadership finally sees what lands.
                  </p>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div className="flex gap-10">
                    <div>
                      <div className="aurora-text text-[34px] font-extrabold leading-none">94%</div>
                      <p className="mt-1 text-[13px] text-[var(--muted)]">weekly active reach</p>
                    </div>
                    <div>
                      <div className="aurora-text text-[34px] font-extrabold leading-none">3.1×</div>
                      <p className="mt-1 text-[13px] text-[var(--muted)]">read-through vs. email</p>
                    </div>
                  </div>
                  <Button href="/demo" variant="secondary" icon>Book a demo</Button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <TestimonialCard t={testimonials[0]} featured />
            </div>
          </div>
        </Container>
      </Section>

      {/* grid */}
      <Section tone="base">
        <Container>
          <SectionHead eyebrow="More stories" title="Across every kind of workforce" align="left" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <Link
                key={s.company}
                href="/demo"
                className="group flex flex-col gap-4 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)]">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="text-[12px] font-semibold text-[var(--muted-2)]">{s.industry}</span>
                </div>
                <p className="text-[15px] font-bold leading-snug text-[var(--foreground)]">{s.headline}</p>
                <div className="mt-auto flex items-end justify-between border-t border-[var(--line)] pt-4">
                  <div>
                    <div className="aurora-text text-[24px] font-extrabold leading-none">{s.metric}</div>
                    <p className="mt-1 text-[12px] text-[var(--muted)]">{s.metricLabel}</p>
                  </div>
                  <span className="text-[13px] font-bold text-[var(--brand)]">{s.company}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHead eyebrow="In aggregate" title="The pattern we see again and again" />
          <div className="mt-12"><StatBand stats={homeStats} note={ILLUSTRATIVE} /></div>
        </Container>
      </Section>

      <Section tone="base">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} featured={i === 1} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
