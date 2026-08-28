import Link from "next/link";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { Button, CheckItem, Container, Eyebrow, Pill, SectionHead } from "./ui";
import { CrowdPanel, IconChip, PanelStage } from "./sections";
import { BRAND_MARKS } from "@/lib/brand-marks";
import type { IconName } from "@/lib/content";
import { DashboardMock, VoiceCard } from "./ProductMocks";
import { ProductStage } from "./ProductStage";
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
   PersonaTabs; the hero is Hero.
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
      className={`group relative flex flex-col gap-3 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[var(--shadow-sm)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--brand-tint)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <IconChip icon={icon} tint={tint} className="relative transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.06]" />
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
  // one stop of the brand ramp per feature — the same colour language as the
  // persona switcher and the loop
  const RAMP = ["#19c6b4", "#2bb0e6", "#3b9eff", "#5c7cf9", "#7c5cf8"];
  const rail = [enps, sentiment, benchmark, reports];

  return (
    <Container>
      <SectionHead
        eyebrow={analyticsSection.eyebrow}
        title={analyticsSection.title}
        lede={analyticsSection.lede}
        aurora
      />

      {/* ------------------------------------------------ intelligence stage */}
      {/* One photographic stage instead of a wall of white cards — the same
          treatment as the FAQ and closing-CTA bands, so the three read as a
          family. Real product screens anchor the left; the features ride the
          right as frosted glass rows over the plate. */}
      <div
        className="relative isolate mt-12 overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line-strong)] shadow-[var(--shadow-lg)]"
        style={{
          backgroundImage: "url('/textures/analytics-stage.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(105deg, rgba(243,244,248,0.55) 0%, rgba(243,244,248,0.22) 45%, rgba(243,244,248,0.05) 100%)",
          }}
        />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:p-10">
          {/* ------------------------------------ the product, front and centre */}
          <div className="group relative flex flex-col">
            <div className="flex items-center gap-2.5">
              <Pill aurora>
                <SparkMark size={13} animate /> Live product
              </Pill>
              <span className="rounded-full bg-white/80 px-3 py-1 text-[12px] font-semibold text-[var(--muted)] shadow-[var(--shadow-sm)] backdrop-blur">
                app.vadal.ai
              </span>
            </div>
            <div className="relative mt-8 flex flex-1 items-center">
              <ProductStage tint="#5c7cf9" className="w-full" padding="p-5 sm:p-7">
              <div className="relative w-full">
                {/* sentiment peeks from behind — measure AND predict */}
                <img
                  src="/product/screens/feedback-intelligence/theme-trend-over-time-view.webp"
                  alt="The Sentiment screen in the Vadal.ai product, positive versus negative sentiment over six months"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="absolute -top-7 right-0 w-[76%] rotate-[2deg] rounded-[10px] border border-[var(--line)] shadow-[var(--shadow-md)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-[2.8deg]"
                />
                <img
                  src="/product/screens/people-analytics/driver-level-heatmap.webp"
                  alt="The Analytics screen in the Vadal.ai product, an engagement heatmap by team and tenure"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="relative block h-auto w-[86%] rounded-[var(--r-lg)] border border-[var(--line)] shadow-[0_28px_60px_-24px_rgba(13,11,22,0.45)] transition-transform duration-500 group-hover:translate-y-1"
                />
              </div>
              </ProductStage>
            </div>
          </div>

          {/* --------------------------------------- the features, as a rail */}
          <div className="flex flex-col justify-center gap-3">
            {rail.map((f, i) => (
              <div
                key={f.title}
                className="group/row flex gap-4 rounded-[var(--r-lg)] border border-white/55 bg-white/70 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/85 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px]"
                    style={{ background: `${RAMP[i]}1c`, color: RAMP[i] }}
                  >
                    <Icon name={f.icon} size={19} />
                  </span>
                  <span className="text-[11.5px] font-bold tabular-nums" style={{ color: RAMP[i] }}>
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-[15.5px] font-bold leading-snug text-[var(--ink-deep)]">{f.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--foreground)]/75">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------- exports, as the stage's baseboard */}
        <div className="relative border-t border-white/55 bg-white/70 backdrop-blur-md">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-3 sm:flex-1">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px]"
                style={{ background: `${RAMP[4]}1c`, color: RAMP[4] }}
              >
                <Icon name={exports_.icon} size={17} />
              </span>
              <div>
                <h3 className="text-[14.5px] font-bold leading-snug">{exports_.title}</h3>
                <p className="text-[12.5px] text-[var(--muted)]">Excel, CSV, PDF, or straight into your BI stack.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {["Excel", "CSV", "PDF", "Power BI", "Tableau", "Looker"].map((f) => (
                <Pill key={f}>{f}</Pill>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* the intelligence indices, closing the composition */}
      <div className="mt-4 rounded-[var(--r-lg)] border border-[var(--line)] p-6" style={{ background: "var(--aurora-soft)" }}>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <SparkMark size={16} />
            <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--ink-deep)]">
              Intelligence indices
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {analyticsSection.chips.map((c, i) => (
              <span
                key={c}
                className="rounded-full border border-white/60 bg-white/80 px-3.5 py-1.5 text-[13px] font-semibold text-[var(--ink-deep)] backdrop-blur-sm"
                style={{ boxShadow: `inset 0 -2px 0 ${RAMP[i % RAMP.length]}55` }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
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
        <div className="mx-auto max-w-2xl py-10 sm:py-14">
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
/* Real brand marks where we legitimately have them (lib/brand-marks.ts), a
   monogram tile where we don't. simple-icons has dropped many corporate marks
   upstream after trademark requests, so Slack, Teams, Workday, Salesforce,
   Oracle, Tableau, Power BI and Outlook still need licensed press-kit assets.
   An approximated logo is worse than none, so those keep the monogram until a
   real file lands — add a brand to BRAND_MARKS and it takes over here. */
const LOGO_TINTS = ["#19c6b4", "#2bb0e6", "#3b9eff", "#5c7cf9", "#7c5cf8"];

/* Real vendor logos, downloaded from each vendor's own site or from Wikimedia
   Commons, which only hosts freely-licensed files. Every one was rendered and
   eyeballed before it landed here — automated matching is not trustworthy for
   logos. The searches variously returned Aeroports de Paris for "ADP", the
   pre-merger Kronos mark for UKG, an Ionicons glyph for Tableau and Exchange
   for Teams. Four wrong out of nineteen, all plausible-looking.

   These are trademarks of their owners, used to identify the products the
   platform connects to — the nominative use every integrations page relies on.

   Sub-products take the parent mark: SuccessFactors and SAP Payroll are SAP,
   Oracle HCM and Oracle ERP are Oracle. That is accurate, if repetitive.

   Six have no logo here. Darwinbox, Ramco and Lever publish only their
   customers' logos, not their own; Dynamics 365 and Tableau are absent from
   Commons and their own sites refuse automated requests. Those fall through
   to the monochrome glyph, then to a monogram. */
const LOGO_FILES: Record<string, string> = {
  Workday: "workday",
  "SAP SuccessFactors": "sap",
  "SAP Payroll": "sap",
  SAP: "sap",
  "Oracle HCM": "oracle",
  "Oracle ERP": "oracle",
  UKG: "ukg",
  PeopleStrong: "peoplestrong",
  "Microsoft Teams": "microsoft-teams",
  Slack: "slack",
  "Google Workspace": "google-workspace",
  Outlook: "outlook",
  WhatsApp: "whatsapp",
  ADP: "adp",
  Greenhouse: "greenhouse",
  iCIMS: "icims",
  SmartRecruiters: "smartrecruiters",
  Cornerstone: "cornerstone",
  Moodle: "moodle",
  Docebo: "docebo",
  "Microsoft Entra ID": "microsoft-entra-id",
  Okta: "okta",
  OneLogin: "onelogin",
  "Power BI": "power-bi",
  Salesforce: "salesforce",
  HubSpot: "hubspot",
};

/* Thirteen of the thirty-three platforms have no licensed mark anywhere in the
   toolchain — simple-icons carries none of them, and an approximated logo is
   worse than none. So the fallback has to look like a decision rather than a
   gap, and the generic initial rule did not:

     Workday → "W", Ramco → "R", OneLogin → "O", iCIMS → "I"

   Lone letters read as placeholder, and Darwinbox and Docebo both landed on
   "D" — the same tile twice with two different labels. These are set by hand,
   two characters each, taken from the name as it is actually written. */
const MONOGRAMS: Record<string, string> = {
  Workday: "WD",
  Darwinbox: "DB",
  PeopleStrong: "PS",
  Ramco: "RM",
  Lever: "LV",
  iCIMS: "iC",
  SmartRecruiters: "SR",
  Cornerstone: "CS",
  Docebo: "DO",
  // the product is Entra; "ME" read as a Microsoft monogram for the wrong thing
  "Microsoft Entra ID": "EN",
  OneLogin: "OL",
};

/* Optical size, not box size. Measured every mark's real glyph bounds in the
   browser: most fill the 24-unit box top to bottom, but the wide, short
   wordmarks do not — ADP fills 45% of the height and the three SAP tiles 49%,
   against 100% for Slack, Okta and Moodle. Drawn at one flat size they came
   out looking like half-loaded images sitting in an oversized plate.

   These scale the glyph up until its height reads level with the rest. They
   stay wide, which is correct — SAP's mark genuinely is a wide trapezoid — and
   the largest of them still clears the plate edge by 7px. Anything already at
   0.6 or above is left alone; Oracle and Salesforce need no help. */
const MARK_SCALE: Record<string, number> = {
  ADP: 1.35,
  SAP: 1.27,
  "SAP SuccessFactors": 1.27,
  "SAP Payroll": 1.27,
};

/* SMS is a channel, not a vendor. A monogram tile claims it is a brand whose
   logo we could not find, which is a different and untrue statement. */
const CHANNEL_ICONS: Record<string, IconName> = { SMS: "chat" };

function monogram(name: string) {
  const set = MONOGRAMS[name];
  if (set) return set;
  const words = name.split(/\s+/).filter(Boolean);
  if (words[0].length <= 3 && words.length === 1) return words[0].toUpperCase();
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* Derived from the name, not the loop index. The marquee renders each row
   twice to loop seamlessly, so an index-based tint gave the same brand two
   different colours — Workday teal in the first copy, blue in the second,
   swapping every time the seam came round. */
function tintFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return LOGO_TINTS[h % LOGO_TINTS.length];
}

/* Which of the real logos are symbols and which are wordmarks. Set by hand
   after looking at all twenty-three, not inferred from the aspect ratio — the
   ratio gets SAP and Workday wrong, both of which read as roughly 2:1 but are
   wordmarks with the company name in them. */
const SYMBOL_LOGOS = new Set([
  "microsoft-entra-id",
  "microsoft-teams",
  "outlook",
  "power-bi",
  "salesforce",
  "slack",
  "whatsapp",
  "oracle",
]);

/* Tiles whose logo belongs to the parent company, not to them. The wordmark
   layout drops the name text on the grounds that the wordmark already says it
   — true for Workday, false for SAP SuccessFactors, which would have shown the
   SAP wordmark over "HRIS & HCM" and been indistinguishable from the SAP tile
   with the sub-product name nowhere on it. These keep the chip and the name. */
const PARENT_MARK = new Set([
  "SAP SuccessFactors",
  "SAP Payroll",
  "Oracle HCM",
  "Oracle ERP",
]);

/* Two layouts, because the assets are two different things.

   A wordmark already says the company name, so printing "Workday" beside the
   Workday logo is the name twice. Worse, squeezing a 6:1 wordmark into the
   72px chip left it about 10px tall — Google Workspace and PeopleStrong were
   illegible, and the wider name text pushed "SAP SuccessFactors" onto two
   lines. So a wordmark gets the full width of the card and no name text; the
   name rides in the alt attribute for screen readers.

   A symbol identifies nothing on its own, so those keep the chip-and-name
   lockup, as do the brands with only a monochrome glyph or no mark at all. */
function PlatformCard({ p }: { p: (typeof integrationsSection.platforms)[number] }) {
  const logo = LOGO_FILES[p.name];
  const mark = BRAND_MARKS[p.name];
  const channel = CHANNEL_ICONS[p.name];
  const c = tintFor(p.name);
  const shell =
    "mx-2 flex h-[76px] w-[264px] shrink-0 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] px-4 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]";
  const group = (
    <span className="block text-[11.5px] font-semibold uppercase tracking-[0.07em] text-[var(--muted-2)]">
      {p.group}
    </span>
  );

  if (logo && !SYMBOL_LOGOS.has(logo) && !PARENT_MARK.has(p.name)) {
    return (
      <div className={`${shell} flex-col justify-center gap-2.5`}>
        <img
          src={`/logos/${logo}.svg`}
          alt={p.name}
          loading="lazy"
          className="block h-[26px] w-auto max-w-[168px] object-contain object-left"
        />
        {group}
      </div>
    );
  }

  return (
    <div className={`${shell} items-center gap-3.5`}>
      {logo ? (
        /* White chip, always: several of these are near-black or navy and
           would vanish against --card on the dark theme. */
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border border-[var(--line)] bg-white p-1.5">
          <img
            src={`/logos/${logo}.svg`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </span>
      ) : mark ? (
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]"
          style={{ background: `${mark.hex}14` }}
          aria-hidden="true"
        >
          <svg
            width={Math.round(22 * (MARK_SCALE[p.name] ?? 1))}
            height={Math.round(22 * (MARK_SCALE[p.name] ?? 1))}
            viewBox="0 0 24 24"
            fill={mark.hex}
            role="img"
          >
            <path d={mark.path} />
          </svg>
        </span>
      ) : channel ? (
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]"
          style={{ background: `${c}1f`, color: c }}
          aria-hidden="true"
        >
          <Icon name={channel} size={21} />
        </span>
      ) : (
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] text-[15px] font-extrabold leading-none tracking-[-0.03em]"
          style={{ background: `${c}1f`, color: c }}
          aria-hidden="true"
        >
          {monogram(p.name)}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[14.5px] font-bold leading-snug text-[var(--foreground)]">{p.name}</span>
        <span className="mt-0.5 block">{group}</span>
      </span>
    </div>
  );
}

export function IntegrationsSection() {
  /* Durations are derived, not eyeballed. The keyframe travels -50%, which with
     two copies is exactly one copy — that is what makes the loop seamless. But
     a copy is now 17 platform cards where it used to be 5 category cards, so
     reusing the old 46s/52s would have run the wall at ~153px/s instead of the
     ~48px/s it read at before. These durations hold the original pace. */
  const CARD = 264 + 16; // width + mx-2
  const PX_PER_S_A = 48.3;
  const PX_PER_S_B = 42.7;

  // split so each row carries a mix of groups rather than all the HR systems
  // scrolling past together
  const all = integrationsSection.platforms;
  const rowA = all.filter((_, i) => i % 2 === 0);
  const rowB = all.filter((_, i) => i % 2 === 1);
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
          <div className="marquee-track flex animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: `${Math.round((rowA.length * CARD) / PX_PER_S_A)}s` }}>
            {[...rowA, ...rowA].map((c, i) => (
              <PlatformCard key={`${c.name}-${i}`} p={c} />
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden" style={mask}>
          <div
            className="marquee-track flex animate-marquee hover:[animation-play-state:paused]"
            style={{
              animationDuration: `${Math.round((rowB.length * CARD) / PX_PER_S_B)}s`,
              animationDirection: "reverse",
            }}
          >
            {[...rowB, ...rowB].map((c, i) => (
              <PlatformCard key={`${c.name}-${i}`} p={c} />
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
