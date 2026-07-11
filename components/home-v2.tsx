import Link from "next/link";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { Button, CheckItem, Container, Eyebrow, Pill, SectionHead } from "./ui";
import { CrowdPanel, IconChip, PanelStage } from "./sections";
import { DashboardMock, VoiceCard } from "./ProductMocks";
import {
  actionSection,
  analyticsSection,
  feedbackSection,
  implementationSection,
  integrationsSection,
  privacySection,
  surveysSection,
} from "@/lib/content";

/* ============================================================================
   Home v2 sections — the "AI-Powered Workforce Engagement & Decision
   Intelligence" repositioning, dressed in the site's original Maze-style
   design language: colored crowd-texture panels, halftone stages, product UI
   floating in cards, and multi-tint icon chips. Interactivity lives in
   PersonaTabs; the hero is ScrollHero.
   ========================================================================== */

/* ------------------------------------------------------- feature card grid */
function FeatureCard({
  title,
  body,
  icon,
  tint = 0,
  className = "",
}: {
  title: string;
  body: string;
  icon: Parameters<typeof Icon>[0]["name"];
  tint?: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--brand-tint)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <IconChip icon={icon} tint={tint} className="relative" />
      <h3 className="relative text-[17px] font-bold leading-snug">{title}</h3>
      <p className="relative text-[14px] leading-relaxed text-[var(--muted)]">{body}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- surveys */
/* Maze-signature blue crowd panel — white cards floating on the halftone. */
export function SurveysSection() {
  return (
    <CrowdPanel
      tone="blue"
      eyebrow={surveysSection.eyebrow}
      title={surveysSection.title}
      lede={surveysSection.lede}
      ctaLabel="Explore engagement surveys"
      ctaHref="/platform/engagement-surveys"
    >
      <div className="grid gap-3 sm:grid-cols-2" data-reveal-stagger>
        {surveysSection.features.map((f, i) => (
          <div
            key={f.title}
            className="group flex flex-col gap-3 rounded-[var(--r-lg)] bg-[var(--card)] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
          >
            <div className="flex items-center gap-3">
              <IconChip icon={f.icon} tint={i} size="sm" />
              <span className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--foreground)]">
                <span className="h-2 w-2 rounded-[2px]" style={{ background: "#FF8A5B" }} />
                0{i + 1}
              </span>
            </div>
            <h3 className="text-[17px] font-bold leading-snug">{f.title}</h3>
            <p className="text-[14px] leading-relaxed text-[var(--muted)]">{f.body}</p>
          </div>
        ))}
      </div>
    </CrowdPanel>
  );
}

/* -------------------------------------------------------------- analytics */
/* Bento with the live product front and centre — a Maze staple. */
export function AnalyticsSection() {
  const [enps, sentiment, benchmark, reports, exports_] = analyticsSection.features;
  return (
    <Container>
      <SectionHead
        eyebrow={analyticsSection.eyebrow}
        title={analyticsSection.title}
        lede={analyticsSection.lede}
        aurora
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-6" data-reveal-stagger>
        {/* live product card */}
        <div className="relative isolate flex min-h-[360px] flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] lg:col-span-3">
          <div className="aurora-wash pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
          <div className="relative flex items-center justify-between p-5 pb-0">
            <Pill aurora>
              <SparkMark size={13} animate /> Live product
            </Pill>
            <span className="rounded-full bg-[var(--card)] px-3 py-1 text-[12px] font-semibold text-[var(--muted)] shadow-[var(--shadow-sm)]">
              app.vadal.ai
            </span>
          </div>
          <div className="relative mt-4 flex flex-1 items-end justify-center px-5">
            <div className="w-full max-w-[520px] translate-y-4 transition-transform duration-500 hover:translate-y-1">
              {/* the real Analytics screen from the product build */}
              <img
                src="/product/analytics.webp"
                alt="The Analytics screen in the Vadal.ai product — engagement, participation and attrition-risk metrics with team breakdown"
                width={1600}
                height={1000}
                loading="lazy"
                className="block h-auto w-full rounded-t-[var(--r-lg)] border border-b-0 border-[var(--line)] shadow-[var(--shadow-lg)]"
              />
            </div>
          </div>
        </div>

        <FeatureCard {...enps} tint={0} className="lg:col-span-3" />
        <FeatureCard {...sentiment} tint={1} className="lg:col-span-2" />
        <FeatureCard {...benchmark} tint={2} className="lg:col-span-2" />
        <FeatureCard {...reports} tint={3} className="lg:col-span-2" />

        {/* wide exports strip */}
        <div className="group flex flex-col gap-5 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] sm:flex-row sm:items-center lg:col-span-6">
          <div className="flex items-start gap-4 sm:flex-1">
            <IconChip icon={exports_.icon} tint={1} />
            <div>
              <h3 className="text-[17px] font-bold leading-snug">{exports_.title}</h3>
              <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-[var(--muted)]">{exports_.body}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {["Excel", "CSV", "PDF", "Power BI", "Tableau", "Looker"].map((f) => (
              <Pill key={f}>{f}</Pill>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--muted-2)]">
          Additional insights
        </span>
        {analyticsSection.chips.map((c, i) => (
          <Pill key={c} aurora={i === analyticsSection.chips.length - 1}>
            {i === analyticsSection.chips.length - 1 && <SparkMark size={12} />}
            {c}
          </Pill>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button href="/platform/people-analytics" variant="ghost" icon>
          Explore people analytics
        </Button>
      </div>
    </Container>
  );
}

/* --------------------------------------------------------------- feedback */
export function FeedbackSection() {
  return (
    <Container>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow aurora>{feedbackSection.eyebrow}</Eyebrow>
          <h2 className="display-md mt-3 font-extrabold">{feedbackSection.title}</h2>
          <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-[var(--muted)]">
            {feedbackSection.body}
          </p>
          <ul className="mt-7 space-y-3">
            {feedbackSection.bullets.map((b) => (
              <CheckItem key={b}>{b}</CheckItem>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/platform/employee-listening" variant="secondary" icon>
              Explore continuous listening
            </Button>
          </div>
        </div>

        {/* the voice of the workforce, on a halftone stage */}
        <PanelStage tone="blue" className="lg:self-stretch">
          <div className="flex flex-col items-center gap-4 py-2">
            <VoiceCard />
            <div className="animate-float flex items-center gap-2 rounded-full bg-[var(--card)] px-4 py-2 shadow-[0_18px_40px_-16px_rgba(8,5,30,0.5)]">
              <SparkMark size={14} />
              <span className="text-[13px] font-bold text-[var(--foreground)]">
                Sentiment: <span className="text-[#0fa88f]">positive & rising</span>
              </span>
            </div>
          </div>
        </PanelStage>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
        {feedbackSection.cards.map((c, i) => (
          <FeatureCard key={c.title} {...c} tint={i} />
        ))}
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------ action band */
export function ActionBand() {
  return (
    <Container>
      <PanelStage tone="violet" className="text-center">
        <div className="mx-auto max-w-2xl py-6 sm:py-10">
          <p className="eyebrow text-white/80">{actionSection.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.2vw,2.9rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
            {actionSection.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/85">
            {actionSection.body}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/demo" variant="dark" size="lg" icon>
              Book a demo
            </Button>
            <Link
              href="/platform/workforce-intelligence"
              className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14.5px] font-bold text-white"
            >
              See action planning
              <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </PanelStage>
    </Container>
  );
}

/* ---------------------------------------------------------------- privacy */
const DARK_PANEL = "linear-gradient(150deg, #140f2e 0%, #221a4d 52%, #3a2885 100%)";

export function PrivacySection() {
  return (
    <Container>
      <div className="relative isolate overflow-hidden rounded-[32px] p-6 sm:p-10 lg:p-14" style={{ background: DARK_PANEL }}>
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(124,92,248,0.8), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1.2px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            maskImage: "linear-gradient(295deg, transparent 45%, #000 100%)",
            WebkitMaskImage: "linear-gradient(295deg, transparent 45%, #000 100%)",
          }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="eyebrow aurora-text">{privacySection.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.2vw,2.9rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
            {privacySection.title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/70">{privacySection.body}</p>
        </div>

        <div className="relative mt-10 grid gap-4 sm:grid-cols-2" data-reveal-stagger>
          {privacySection.features.map((f) => (
            <div key={f.title} className="rounded-[var(--r-lg)] bg-white/[0.07] p-6 backdrop-blur transition-colors duration-300 hover:bg-white/[0.11]">
              <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white/12 text-white">
                <Icon name={f.icon} size={20} />
              </span>
              <h3 className="mt-3.5 text-[16.5px] font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/65">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-8 flex flex-wrap justify-center gap-2">
          {privacySection.capabilities.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white/85"
            >
              <Icon name="check" size={12} strokeWidth={2.6} className="text-[#35d7be]" />
              {c}
            </span>
          ))}
        </div>
        <p className="relative mt-8 text-center">
          <Link
            href="/platform/confidential-feedback"
            className="group inline-flex items-center gap-1.5 text-[14.5px] font-bold text-white"
          >
            Explore confidential feedback
            <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------ integrations */
/* Two counter-scrolling rows of integration cards — motion sells the depth
   of the ecosystem better than a static grid. Pauses on hover. */
function IntegrationCard({ c, tint }: { c: (typeof integrationsSection.categories)[number]; tint: number }) {
  return (
    <div className="mx-2 w-[280px] shrink-0 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]">
      <div className="flex items-center gap-3">
        <IconChip icon={c.icon} tint={tint} size="sm" />
        <h3 className="text-[14.5px] font-bold">{c.name}</h3>
      </div>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-[var(--muted)]">{c.vendors}</p>
    </div>
  );
}

export function IntegrationsSection() {
  const rowA = integrationsSection.categories.slice(0, 5);
  const rowB = integrationsSection.categories.slice(5);
  const mask = {
    maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
    WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
  } as const;
  return (
    <div>
      <Container>
        <SectionHead
          eyebrow={integrationsSection.eyebrow}
          title={integrationsSection.title}
          lede={integrationsSection.lede}
        />
      </Container>
      <div className="mt-12 space-y-4">
        <div className="relative overflow-hidden" style={mask}>
          <div className="marquee-track flex animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: "46s" }}>
            {[...rowA, ...rowA, ...rowA].map((c, i) => (
              <IntegrationCard key={`${c.name}-${i}`} c={c} tint={i} />
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden" style={mask}>
          <div
            className="marquee-track flex animate-marquee hover:[animation-play-state:paused]"
            style={{ animationDuration: "52s", animationDirection: "reverse" }}
          >
            {[...rowB, ...rowB, ...rowB].map((c, i) => (
              <IntegrationCard key={`${c.name}-${i}`} c={c} tint={i + 1} />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-9 text-center text-[14px] text-[var(--muted)]">
        …and anything with a REST API.{" "}
        <Link href="/contact" className="font-bold text-[var(--brand)] underline-offset-4 hover:underline">
          Ask us about your stack →
        </Link>
      </p>
    </div>
  );
}

/* ----------------------------------------------------------- implementation */
export function ImplementationSection() {
  return (
    <Container>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>{implementationSection.eyebrow}</Eyebrow>
          <h2 className="display-md mt-3 font-extrabold">{implementationSection.title}</h2>
          <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-[var(--muted)]">
            {implementationSection.body}
          </p>
          <ul className="mt-7 space-y-3">
            {implementationSection.checks.map((c) => (
              <CheckItem key={c}>{c}</CheckItem>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/demo" variant="secondary" icon>
              Plan your rollout
            </Button>
          </div>
        </div>

        {/* the 5-week stepper, floating on a warm halftone stage */}
        <PanelStage tone="spark">
          <div className="w-full max-w-[440px] rounded-[var(--r-2xl)] bg-[var(--card)] p-7 shadow-[0_24px_60px_-20px_rgba(120,45,10,0.45)] sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
                Your first five weeks
              </p>
              <SparkMark size={16} />
            </div>
            <ol className="mt-6">
              {implementationSection.weeks.map((w, i) => (
                <li key={w.week} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < implementationSection.weeks.length - 1 && (
                    <span className="absolute left-[17px] top-9 bottom-0 w-px bg-[var(--line)]" aria-hidden="true" />
                  )}
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-extrabold ${
                      i === implementationSection.weeks.length - 1
                        ? "aurora-fill text-white"
                        : "bg-[var(--brand-tint)] text-[var(--brand)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--muted-2)]">{w.week}</p>
                    <p className="text-[15.5px] font-bold text-[var(--foreground)]">{w.title}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </PanelStage>
      </div>
    </Container>
  );
}
