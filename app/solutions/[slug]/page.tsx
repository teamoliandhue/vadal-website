import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button, Container, Eyebrow, Section, SectionHead, CheckItem } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { DashboardMock, PhoneMock } from "@/components/ProductMocks";
import { FeatureRow, StatBand, TestimonialCard } from "@/components/sections";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getSolution, solutions, ILLUSTRATIVE } from "@/lib/content";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.heroLede,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  // related = the next three entries in the array (wrapping), so outcome pages
  // suggest outcome pages and workforce pages suggest their neighbours, rather
  // than every page suggesting the same first three solutions.
  const idx = solutions.findIndex((x) => x.slug === s.slug);
  const others = Array.from({ length: 3 }, (_, i) => solutions[(idx + 1 + i) % solutions.length]);

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="grid items-center gap-12 pt-14 pb-12 sm:pt-20 lg:grid-cols-2">
          <div className="reveal">
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[12px] font-bold text-[var(--brand)]"
            >
              <Icon name={s.icon} size={14} />
              {s.heroEyebrow}
            </Link>
            <h1 className="display-lg mt-5 font-extrabold">{s.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-[var(--muted)]">
              {s.heroLede}
            </p>
            <ul className="mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
              {s.heroChecks.map((c) => (
                <CheckItem key={c}>{c}</CheckItem>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/demo" size="lg" icon>
                Book a demo
              </Button>
              <Button href="/platform" variant="ghost" size="lg">
                See the platform
              </Button>
            </div>
          </div>
          <div className="reveal relative flex justify-center" style={{ animationDelay: "0.12s" }}>
            {s.icon === "broadcast" || s.icon === "checks" || s.icon === "compass" ? (
              <DashboardMock />
            ) : (
              <PhoneMock />
            )}
          </div>
        </Container>
      </section>

      {/* pillars strip */}
      <div className="border-y border-[var(--line)] bg-[var(--surface)]">
        <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-4 text-center text-[13px] text-[var(--muted)]">
          <SparkMark size={15} />
          <span className="font-semibold text-[var(--foreground)]">Product pillars:</span>
          {s.pillars}
        </Container>
      </div>

      {/* feature sections (alternating) */}
      <Section tone="base">
        <Container className="space-y-24">
          {s.sections.map((sec, i) => (
            <FeatureRow
              key={sec.title}
              reverse={i % 2 === 1}
              eyebrow={sec.eyebrow || s.name}
              title={sec.title}
              body={sec.body}
              bullets={sec.bullets}
              panelTone={i % 2 === 0 ? "violet" : "blue"}
              visual={i % 2 === 0 ? <DashboardMock /> : <PhoneMock />}
            />
          ))}
        </Container>
      </Section>

      {/* metrics */}
      <Section tone="surface">
        <Container>
          <SectionHead
            eyebrow="The impact"
            title={`What good looks like with ${s.name}`}
          />
          <div className="mt-12">
            <StatBand stats={s.metrics} note={ILLUSTRATIVE} />
          </div>
        </Container>
      </Section>

      {/* testimonial */}
      <Section tone="base">
        <Container size="narrow">
          <TestimonialCard t={s.testimonial} featured />
        </Container>
      </Section>

      {/* faqs */}
      {s.faqs.length > 0 && (
        <Section tone="surface">
          <Container>
            <SectionHead eyebrow="FAQs" title="Questions, answered" />
            <div className="mx-auto mt-10 max-w-3xl">
              <FaqAccordion faqs={s.faqs} />
            </div>
          </Container>
        </Section>
      )}

      {/* related */}
      <Section tone="base">
        <Container>
          <Eyebrow className="text-center">Keep exploring</Eyebrow>
          <h2 className="display-md mt-3 text-center font-extrabold">Explore other solutions</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/solutions/${o.slug}`}
                className="group flex items-center gap-4 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors group-hover:bg-[var(--brand)] group-hover:text-white">
                  <Icon name={o.icon} size={22} />
                </span>
                <span>
                  <span className="block text-[15px] font-bold">{o.name}</span>
                  <span className="mt-0.5 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand)]">
                    Explore <Icon name="arrow" size={13} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
