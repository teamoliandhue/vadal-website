import Link from "next/link";
import { Logo, SparkMark } from "./Brand";
import { Button, Container } from "./ui";
import { Icon } from "./Icon";
import { solutionsByOutcome, solutionsByWorkforce, surveyTypes } from "@/lib/content";
import { platformLayers } from "@/lib/platform-nav";
import { FooterLink } from "./FooterLink";
import { LANDING_ONLY } from "@/lib/flags";

const columns = [
  {
    // The six canonical layers rather than a hand-picked shortlist of modules.
    // The shortlist only reached 10 of the 25 product pages, so on the other 15
    // the footer could never show you where you were — and it had already
    // drifted on labels once ("Continuous listening" vs the canonical
    // "Continuous Employee Listening"). Every product belongs to exactly one
    // layer, so this both stays in sync and always has something to highlight.
    title: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      ...platformLayers.map((l) => ({
        label: l.name,
        href: `/platform#${l.id}`,
        // you are "in" a layer whenever you're on one of its module pages
        activeFor: l.modules.filter((m) => m.slug).map((m) => `/platform/${m.slug}`),
      })),
    ],
  },
  {
    // the five survey types — CultureMonkey's footer gives surveys their own
    // column, and ours are otherwise only discoverable via the Engagement
    // Surveys page
    title: "Surveys",
    links: surveyTypes.map((t) => ({ label: t.name, href: t.href })),
  },
  {
    title: "Solutions",
    links: [...solutionsByOutcome, ...solutionsByWorkforce.filter((s) => s.name === "Enterprise")].map(
      (s) => ({ label: s.name, href: s.href })
    ),
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources#learn" },
      { label: "Guides & downloads", href: "/resources" },
      { label: "The science", href: "/science" },
      { label: "Benchmark reports", href: "/resources#proof" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "Careers", href: "/about#careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function Socials({ className = "" }: { className?: string }) {
  const base =
    "grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <a
        href="https://www.linkedin.com/company/vadal"
        aria-label="Vadal.ai on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.65h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.77 2.64 4.77 6.08V21h-4v-5.39c0-1.28-.03-2.94-1.79-2.94-1.8 0-2.07 1.4-2.07 2.85V21H9V9Z" />
        </svg>
      </a>
      <a
        href="https://x.com/vadal"
        aria-label="Vadal.ai on X"
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
      </a>
    </div>
  );
}


/* Badge marks for the trust strip. The official AICPA SOC badge and the ISO
   logo are licensed marks — usable only once certified — so these are drawn
   badge forms instead: a rosette seal, a shield with a check, and the EU
   twelve-star circle that universally signals GDPR. Swap in the licensed
   artwork once the certifications are confirmed. */
function SealISO() {
  // rosette: 12 scallops around a solid core with a check
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return `${10 + 8.1 * Math.cos(a)} ${10 + 8.1 * Math.sin(a)}`;
  });
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      {petals.map((c) => {
        const [x, y] = c.split(" ").map(Number);
        return <circle key={c} cx={x} cy={y} r="2.5" fill="#2f6fb7" />;
      })}
      <circle cx="10" cy="10" r="7" fill="#2f6fb7" />
      <path d="m6.8 10.2 2.1 2.1 4.3-4.4" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SealSOC() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#1d3c6e" />
      <path d="M10 4.2 15 6v4.1c0 3-2.1 5.1-5 6-2.9-.9-5-3-5-6V6l5-1.8Z" fill="#fff" opacity="0.16" />
      <path d="M10 5.4 14 6.9v3.3c0 2.4-1.7 4.1-4 4.9-2.3-.8-4-2.5-4-4.9V6.9l4-1.5Z" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="m8.2 10 1.4 1.4 2.6-2.7" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SealGDPR() {
  // the EU twelve-star circle — the de-facto GDPR mark
  const stars = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);
  const star = (cx: number, cy: number) => {
    const pts = Array.from({ length: 10 }, (_, k) => {
      const r = k % 2 === 0 ? 1.5 : 0.62;
      const a = (k * 36 - 90) * (Math.PI / 180);
      return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
    });
    return pts.join(" ");
  };
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#043c8f" />
      {stars.map((a, i) => (
        <polygon key={i} points={star(10 + 6.4 * Math.cos(a), 10 + 6.4 * Math.sin(a))} fill="#ffd617" />
      ))}
    </svg>
  );
}

const TRUST_BADGES = [
  { label: "ISO 27001 certified", Seal: SealISO },
  { label: "SOC 2", Seal: SealSOC },
  { label: "GDPR compliant", Seal: SealGDPR },
];

export function SiteFooter() {
  return (
    <footer className="bg-white">
      {/* closing CTA — a team at the glass looking out over a bright skyline;
          the luminous centre of the plate is where the headline sits */}
      <Container className="py-12 sm:py-16">
        <div className="photo-band-cta relative isolate overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line-strong)] px-6 py-16 text-center shadow-[var(--shadow-lg)] sm:px-12 sm:py-28">
          {/* feather scrim — only a soft lift behind the text column; towers stay crisp at the edges */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(80% 68% at 50% 40%, rgba(243,244,248,0.5) 0%, rgba(243,244,248,0.16) 48%, rgba(243,244,248,0) 78%)",
            }}
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white/75 px-3 py-1 text-[12px] font-semibold text-[var(--muted)] backdrop-blur">
              <SparkMark size={15} /> Score → Insight → Action → Impact
            </span>
            <h2 className="display-md font-extrabold text-[var(--ink-deep)]">
              Go beyond engagement. Lead with intelligence.
            </h2>
            <p className="text-[17px] leading-relaxed text-[var(--foreground)]">
              See your workforce clearly, predict what&apos;s coming and act with confidence,
              on one AI-powered platform. Book a personalised demo and we&apos;ll tailor it to
              your industry.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/demo" size="lg" icon>
                Book a free demo
              </Button>
              <Button href="/platform" variant="ghost" size="lg">
                Explore the platform
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* footer body — brand left, contact (or link columns) right */}
      <div className="border-t border-[var(--line)]">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            {/* brand */}
            <div className="max-w-xs lg:max-w-[280px]">
              <Logo size={32} />
              <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--muted)]">
                The AI-powered workforce engagement &amp; decision intelligence platform,
                for every leader, every employee, every decision.
              </p>
              <a
                href="mailto:hello@vadal.ai"
                className="mt-5 inline-block text-[15px] font-bold text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
              >
                hello@vadal.ai
              </a>
              <p className="mt-2 flex items-center gap-2 text-[13px] text-[var(--muted)]">
                <Icon name="globe" size={15} />
                Bengaluru · Mumbai · London
                <span className="opacity-60">(sample)</span>
              </p>
              {!LANDING_ONLY && <Socials className="mt-6" />}
            </div>

            {/* right side: contact cluster in landing-only, link columns on the full site */}
            {LANDING_ONLY ? (
              <div className="flex flex-col gap-5 lg:items-end lg:text-right">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--muted-2)]">
                  Get in touch
                </p>
                <a
                  href="mailto:hello@vadal.ai"
                  className="text-[20px] font-extrabold tracking-[-0.01em] text-[var(--ink-deep)] transition-colors hover:text-[var(--brand)]"
                >
                  hello@vadal.ai
                </a>
                <p className="max-w-xs text-[14px] leading-relaxed text-[var(--muted)] lg:text-right">
                  We&apos;re in early access. Tell us about your frontline and we&apos;ll be in touch.
                </p>
                <Socials className="mt-1 lg:justify-end" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                {columns.map((col) => (
                  <div key={col.title}>
                    <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-[var(--foreground)]">
                      {col.title}
                      <span className="mt-2 block h-[2px] w-6 rounded-full" style={{ background: "var(--aurora)" }} />
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <FooterLink
                            href={l.href}
                            label={l.label}
                            activeFor={"activeFor" in l ? l.activeFor : undefined}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* trust strip — the three badges buyers scan for. Marked (sample) until
          the certifications are verified: asserting one we don't hold is a
          legal problem, not a design choice. */}
      <div className="border-t border-[var(--line)] bg-[var(--surface)]/60">
        <Container className="flex flex-wrap items-center justify-center gap-2.5 py-5 sm:gap-4">
          {TRUST_BADGES.map(({ label, Seal }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] py-1.5 pl-2 pr-3.5 text-[12.5px] font-semibold text-[var(--muted)]"
            >
              <Seal /> {label}
              <span className="opacity-60">(sample)</span>
            </span>
          ))}
        </Container>
      </div>

      {/* baseline — copyright · legal */}
      <div className="border-t border-[var(--line)]">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="order-3 text-[13px] text-[var(--muted)] sm:order-1">
            © {new Date().getFullYear()} Vadal.ai · Go beyond engagement. Lead with intelligence.
          </p>
          <div className="order-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[var(--muted)] sm:order-2">
            <Link href="/terms" className="transition-colors hover:text-[var(--foreground)]">Terms of use</Link>
            <Link href="/privacy" className="transition-colors hover:text-[var(--foreground)]">Privacy policy</Link>
            <Link href="/gdpr" className="transition-colors hover:text-[var(--foreground)]">Your privacy choices</Link>
          </div>
          {LANDING_ONLY && (
            <div className="order-2 sm:order-3">
              <Socials />
            </div>
          )}
        </Container>
      </div>
    </footer>
  );
}
