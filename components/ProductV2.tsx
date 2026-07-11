import Link from "next/link";
import { Button, Container, Pill, Section, SectionHead, CheckItem } from "./ui";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { DashboardMock, PhoneMock, VoiceCard, BroadcastCard } from "./ProductMocks";
import { CrowdPanel, FeatureRow, IconChip, type PanelTone } from "./sections";
import { FaqAccordion } from "./FaqAccordion";
import { ProductShot, PRODUCT_SHOTS } from "./ProductShot";
import { portfolioGroups } from "@/lib/content";
import type { Product } from "@/lib/products";

/* ============================================================================
   ProductV2 — the 24-product page template from the founder's master doc:
   hero → business challenges → solution pillars (blue crowd) → capability
   cards (click-to-scroll, Apple-style) → capability deep-dives → AI inside →
   business outcomes → how-teams-use-it story (teal crowd) → integrations →
   FAQs → related → final CTA. Deliberately NO metrics anywhere — the doc
   forbids launching with placeholder figures.
   ========================================================================== */

export type RelatedMeta = { slug: string; name: string; icon: Product["icon"] };

function Mock({ kind, scale = false }: { kind: string; scale?: boolean }) {
  const inner =
    kind === "phone" ? (
      <PhoneMock />
    ) : kind === "voice" ? (
      <VoiceCard />
    ) : kind === "broadcast" ? (
      <BroadcastCard />
    ) : (
      <div className="w-full max-w-[460px]">
        <DashboardMock />
      </div>
    );
  return scale ? <div className="scale-95">{inner}</div> : inner;
}

const CAP_TONES: PanelTone[] = ["violet", "aurora", "blue", "spark"];

export function ProductV2({ p, related }: { p: Product; related: RelatedMeta[] }) {
  const cloud = portfolioGroups.find((g) => g.id === p.cloud);
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
              Vadal.ai · {cloud?.name ?? "Platform"}
            </Pill>
            <h1 className="display-lg mt-5 font-extrabold text-balance">{p.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-[var(--muted)] sm:text-[18px]">
              {p.heroLede}
            </p>
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
            {/* the real product screen when this module exists in the build */}
            {PRODUCT_SHOTS[p.slug] ? (
              <ProductShot shot={PRODUCT_SHOTS[p.slug]} priority />
            ) : (
              <Mock kind={p.mock} />
            )}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------- business challenges */}
      <Section tone="surface">
        <Container>
          <SectionHead
            eyebrow="The problem"
            title={p.challengesTitle ?? `Why modern ${p.name.toLowerCase()} needs AI`}
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2" data-reveal-stagger>
            {p.challenges.map((c) => (
              <div
                key={c}
                className="flex items-start gap-3 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5"
              >
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: "#FF8A5B" }}
                  aria-hidden="true"
                />
                <p className="text-[14.5px] leading-relaxed text-[var(--foreground)]">{c}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------- solution pillars */}
      <Section tone="base">
        <CrowdPanel
          tone="blue"
          eyebrow="How Vadal.ai solves this"
          title={`${p.name}, reimagined`}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {p.pillars.map((pillar, idx) => (
              <div
                key={pillar}
                className="group flex flex-col rounded-[var(--r-lg)] bg-[var(--card)] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              >
                <span className="inline-flex items-center gap-2 self-start rounded-md border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-[2px]" style={{ background: "#FF8A5B" }} />
                  Pillar 0{idx + 1}
                </span>
                <h3 className="mt-3 text-[17px] font-bold leading-snug">{pillar}</h3>
              </div>
            ))}
          </div>
        </CrowdPanel>
      </Section>

      {/* ------------------------------------------- core capability cards */}
      <Section tone="base" className="!pt-0">
        <Container>
          <SectionHead eyebrow="Core capabilities" title={`Inside ${p.name}`} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2" data-reveal-stagger>
            {p.capabilities.map((c, i) => (
              <a
                key={c.title}
                href={`#capability-${i + 1}`}
                className="group flex flex-col gap-3 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
              >
                <IconChip icon={p.icon} tint={i} />
                <h3 className="text-[17px] font-bold leading-snug">{c.title}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--muted)]">{c.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[13px] font-semibold text-[var(--brand)]">
                  See it in detail
                  <Icon name="arrow" size={14} className="rotate-90 transition-transform group-hover:translate-y-0.5" />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------- capability deep-dives */}
      <Section tone="base" className="!pt-0">
        <Container className="space-y-24">
          {p.capabilities.map((c, i) => (
            <div key={c.title} id={`capability-${i + 1}`} className="scroll-mt-24">
              <FeatureRow
                reverse={i % 2 === 1}
                eyebrow={`Capability 0${i + 1}`}
                title={c.title}
                body={c.body}
                bullets={c.bullets}
                ctaLabel="Book a demo"
                ctaHref="/demo"
                panelTone={CAP_TONES[i % CAP_TONES.length]}
                visual={
                  <div className="flex flex-col items-center gap-3">
                    <Mock kind={i % 2 === 0 ? p.mock : altMock} scale />
                    <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold text-[var(--ink-deep)] shadow-[var(--shadow-sm)]">
                      {c.screen}
                    </span>
                  </div>
                }
              />
            </div>
          ))}
        </Container>
      </Section>

      {/* -------------------------------------------------------- AI inside */}
      <Section tone="surface" glow="top">
        <Container>
          <SectionHead
            eyebrow="AI inside"
            aurora
            title="The intelligence working under the hood"
          />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {p.aiCapabilities.map((a) => (
              <Pill key={a} aurora>
                <SparkMark size={12} />
                {a}
              </Pill>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------- business outcomes */}
      <Section tone="base">
        <Container>
          <SectionHead eyebrow="Business outcomes" title="What changes for the business" />
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {p.outcomes.map((o) => (
              <CheckItem key={o}>{o}</CheckItem>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------ how teams use it */}
      <Section tone="base">
        <CrowdPanel tone="teal" eyebrow="How teams use it" title="From challenge to outcome">
          <div className="grid gap-3 lg:grid-cols-3" data-reveal-stagger>
            {(
              [
                ["The challenge", p.story.challenge],
                ["The solution", p.story.solution],
                ["The outcome", p.story.outcomes],
              ] as const
            ).map(([label, body]) => (
              <div
                key={label}
                className="flex flex-col rounded-[var(--r-lg)] bg-[var(--card)] p-6 shadow-[var(--shadow-sm)]"
              >
                <span className="inline-flex items-center gap-2 self-start rounded-md border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-[2px]" style={{ background: "#FF8A5B" }} />
                  {label}
                </span>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[12.5px] text-[var(--ink-deep)]/60">
            Illustrative scenario — named customer stories coming soon.
          </p>
        </CrowdPanel>
      </Section>

      {/* ----------------------------------------------------- integrations */}
      <Section tone="surface">
        <Container>
          <SectionHead eyebrow="Integrations" title="Plays well with your stack" />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {p.integrations.map((v) => (
              <Pill key={v}>{v}</Pill>
            ))}
          </div>
          <p className="mt-8 text-center text-[14px] text-[var(--muted)]">
            <Link href="/#integrations" className="font-bold text-[var(--brand)] underline-offset-4 hover:underline">
              See the full integration ecosystem →
            </Link>
          </p>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- FAQs */}
      <Section tone="base">
        <Container>
          <SectionHead eyebrow="FAQs" title="Questions, answered" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion faqs={p.faqs} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- related */}
      <Section tone="surface">
        <Container>
          <p className="eyebrow text-center">Keep exploring</p>
          <h2 className="display-md mt-3 text-center font-extrabold">Related products</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
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
        </Container>
      </Section>

      {/* -------------------------------------------------------- final CTA */}
      <Section tone="base">
        <Container className="text-center">
          <SectionHead eyebrow="Get started" title={p.footerCta} />
          <div className="mt-8 flex justify-center">
            <Button href="/demo" size="lg" icon>
              Book a personalized demo
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
