import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button, Container, Pill, Section, SectionHead, CheckItem } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { DashboardMock, PhoneMock, VoiceCard } from "@/components/ProductMocks";
import { FeatureRow, StatBand, TestimonialCard } from "@/components/sections";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getProductPage, productPages } from "@/lib/product-pages";
import { ILLUSTRATIVE } from "@/lib/content";

export function generateStaticParams() {
  return productPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductPage(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.heroLede,
  };
}

function Mock({ kind, scale = false }: { kind: string; scale?: boolean }) {
  const inner =
    kind === "phone" ? (
      <PhoneMock />
    ) : kind === "voice" ? (
      <VoiceCard />
    ) : (
      <div className="w-full max-w-[460px]">
        <DashboardMock />
      </div>
    );
  return scale ? <div className="scale-95">{inner}</div> : inner;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProductPage(slug);
  if (!p) notFound();

  const related = p.related
    .map((r) => getProductPage(r))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  // second feature row varies its visual so the page never repeats itself
  const altMock = p.mock === "dashboard" ? "phone" : "dashboard";

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden">
        <div className="aurora-wash animate-aurora pointer-events-none absolute inset-0 -z-10" />
        <Container className="grid items-center gap-12 pt-14 pb-12 sm:pt-20 lg:grid-cols-2">
          <div className="reveal">
            <Pill aurora>
              <Icon name={p.icon} size={14} />
              {p.heroEyebrow}
            </Pill>
            <h1 className="display-lg mt-5 font-extrabold">{p.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-[var(--muted)]">
              {p.heroLede}
            </p>
            <ul className="mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
              {p.heroChecks.map((c) => (
                <CheckItem key={c}>{c}</CheckItem>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/demo" size="lg" icon>
                Book a demo
              </Button>
              <Button href="/platform" variant="ghost" size="lg">
                <Icon name="play" size={15} className="text-[var(--brand)]" />
                Watch product tour
              </Button>
            </div>
          </div>
          <div className="reveal relative flex justify-center" style={{ animationDelay: "0.12s" }}>
            <div className="aurora-wash pointer-events-none absolute -inset-6 -z-10 rounded-[var(--r-2xl)] opacity-70" />
            <Mock kind={p.mock} />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ how it works */}
      <Section tone="surface">
        <Container>
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                {p.steps.map((s, i) => (
                  <span key={s.title}>
                    {i > 0 && <span className="text-[var(--muted-2)]"> → </span>}
                    {s.title}
                  </span>
                ))}
              </>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {p.steps.map((s, idx) => (
              <div
                key={s.title}
                className="relative rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6"
              >
                <span className="text-[12px] font-bold text-[var(--muted-2)]">0{idx + 1}</span>
                <h3 className="mt-2 text-[18px] font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------- feature rows (alternating) */}
      <Section tone="base">
        <Container className="space-y-24">
          {p.features.map((f, i) => (
            <FeatureRow
              key={f.title}
              reverse={i % 2 === 1}
              eyebrow={f.eyebrow}
              title={f.title}
              body={f.body}
              bullets={f.bullets}
              panelTone={i % 2 === 0 ? "violet" : "aurora"}
              visual={<Mock kind={i === 0 ? p.mock : altMock} scale />}
            />
          ))}
        </Container>
      </Section>

      {/* ---------------------------------------------------------- metrics */}
      <Section tone="surface">
        <Container>
          <SectionHead eyebrow="The impact" title={`What good looks like with ${p.name}`} />
          <div className="mt-12">
            <StatBand stats={p.metrics} note={ILLUSTRATIVE} />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ testimonial */}
      <Section tone="base">
        <Container size="narrow">
          <TestimonialCard t={p.testimonial} featured />
        </Container>
      </Section>

      {/* ------------------------------------------------------------- FAQs */}
      <Section tone="surface">
        <Container>
          <SectionHead eyebrow="FAQs" title="Questions, answered" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion faqs={p.faqs} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- related */}
      <Section tone="base">
        <Container>
          <p className="eyebrow text-center">Keep exploring</p>
          <h2 className="display-md mt-3 text-center font-extrabold">
            More of the platform
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3" data-reveal-stagger>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/platform/${r.slug}`}
                className="group flex items-center gap-4 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors group-hover:bg-[var(--brand)] group-hover:text-white">
                  <Icon name={r.icon} size={22} />
                </span>
                <span>
                  <span className="block text-[15px] font-bold">{r.name}</span>
                  <span className="mt-0.5 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand)]">
                    Explore <Icon name="arrow" size={13} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center text-[14px] text-[var(--muted)]">
            <SparkMark size={14} className="mr-1.5 inline-block" />
            Or see{" "}
            <Link href="/platform" className="font-bold text-[var(--brand)] underline-offset-4 hover:underline">
              the whole platform →
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
