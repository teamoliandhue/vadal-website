import Link from "next/link";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { Button, CheckItem, Container, Eyebrow, Pill, SectionHead } from "./ui";
import { HeroEmailForm } from "./HeroEmailForm";
import { DashboardMock } from "./ProductMocks";
import { PanelStage } from "./sections";
import {
  actionSection,
  analyticsSection,
  feedbackSection,
  heroV2,
  implementationSection,
  integrationsSection,
  privacySection,
  surveysSection,
} from "@/lib/content";

/* ============================================================================
   Home v2 sections — the "AI-Powered Workforce Engagement & Decision
   Intelligence" repositioning (Home page content (1).docx, 2026-07-06).
   All server components; interactivity lives in HeroEmailForm / PersonaTabs.
   ========================================================================== */

/* ------------------------------------------------------------------- hero */
export function HeroV2() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora-wash animate-aurora pointer-events-none absolute inset-0 -z-10" />
      <Container className="grid w-full items-center gap-12 pb-16 pt-14 lg:grid-cols-[55%_45%] lg:gap-10 sm:pt-20">
        <div className="flex flex-col items-start gap-6">
          <Pill aurora>
            <SparkMark size={14} animate /> {heroV2.pill}
          </Pill>
          <h1 className="hero-display text-[var(--foreground)]">
            {heroV2.titleA}
            <br />
            <span className="aurora-text">{heroV2.titleB}</span>
          </h1>
          <p className="max-w-xl text-[18px] font-normal leading-relaxed text-[var(--muted)] text-pretty">
            {heroV2.lede}
          </p>
          <HeroEmailForm />
          <Button href="/platform" variant="ghost" size="lg">
            <Icon name="play" size={15} className="text-[var(--brand)]" />
            {heroV2.secondaryCta}
          </Button>
        </div>
        <div className="relative hidden lg:block">
          <div className="aurora-wash pointer-events-none absolute -inset-8 -z-10 rounded-[var(--r-2xl)] opacity-80" />
          <DashboardMock />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------- feature card grid */
function FeatureCard({
  title,
  body,
  icon,
  className = "",
}: {
  title: string;
  body: string;
  icon: Parameters<typeof Icon>[0]["name"];
  className?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--brand-tint)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
        <Icon name={icon} size={22} />
      </span>
      <h3 className="relative text-[17px] font-bold leading-snug">{title}</h3>
      <p className="relative text-[14px] leading-relaxed text-[var(--muted)]">{body}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- surveys */
export function SurveysSection() {
  return (
    <Container>
      <SectionHead
        eyebrow={surveysSection.eyebrow}
        title={surveysSection.title}
        lede={surveysSection.lede}
        aurora
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2" data-reveal-stagger>
        {surveysSection.features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </Container>
  );
}

/* -------------------------------------------------------------- analytics */
export function AnalyticsSection() {
  const [first, second, ...rest] = analyticsSection.features;
  return (
    <Container>
      <SectionHead
        eyebrow={analyticsSection.eyebrow}
        title={analyticsSection.title}
        lede={analyticsSection.lede}
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-6" data-reveal-stagger>
        <FeatureCard {...first} className="lg:col-span-3" />
        <FeatureCard {...second} className="lg:col-span-3" />
        {rest.map((f) => (
          <FeatureCard key={f.title} {...f} className="lg:col-span-2" />
        ))}
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
    </Container>
  );
}

/* --------------------------------------------------------------- feedback */
export function FeedbackSection() {
  return (
    <Container>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
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
        </div>
        <div className="grid gap-4 sm:grid-cols-2" data-reveal-stagger>
          {feedbackSection.cards.map((c) => (
            <FeatureCard key={c.title} {...c} />
          ))}
        </div>
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
              href="/platform#ai-engagement"
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
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------ integrations */
export function IntegrationsSection() {
  return (
    <Container>
      <SectionHead
        eyebrow={integrationsSection.eyebrow}
        title={integrationsSection.title}
        lede={integrationsSection.lede}
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" data-reveal-stagger>
        {integrationsSection.categories.map((c) => (
          <div
            key={c.name}
            className="group rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
              <Icon name={c.icon} size={18} />
            </span>
            <h3 className="mt-3 text-[14.5px] font-bold">{c.name}</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--muted)]">{c.vendors}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-[14px] text-[var(--muted)]">
        …and anything with a REST API.{" "}
        <Link href="/contact" className="font-bold text-[var(--brand)] underline-offset-4 hover:underline">
          Ask us about your stack →
        </Link>
      </p>
    </Container>
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

        {/* the 5-week stepper */}
        <div className="rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[var(--shadow-sm)] sm:p-9">
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
      </div>
    </Container>
  );
}
