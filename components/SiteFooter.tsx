import Link from "next/link";
import { Logo, SparkMark } from "./Brand";
import { Button, Container } from "./ui";
import { Icon } from "./Icon";
import { solutionsNav } from "@/lib/content";
import { LANDING_ONLY } from "@/lib/flags";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "Engagement surveys", href: "/#surveys" },
      { label: "Analytics & insights", href: "/#analytics" },
      { label: "AI Copilot", href: "/platform#ai" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Solutions",
    links: solutionsNav.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/about#careers" },
      { label: "Contact", href: "/contact" },
    ],
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
];

function Socials({ className = "" }: { className?: string }) {
  const base =
    "grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <a
        href="https://www.linkedin.com/company/vadal"
        aria-label="Vadal on LinkedIn"
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
        aria-label="Vadal on X"
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

export function SiteFooter() {
  return (
    <footer className="bg-white">
      {/* closing CTA — misty image panel floating on a clean white surround */}
      <Container className="py-16 sm:py-24">
        <div
          className="relative isolate overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line-strong)] px-6 py-16 text-center shadow-[var(--shadow-lg)] sm:px-12 sm:py-28"
          style={{
            backgroundImage: "url('/textures/cta-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 38%",
          }}
        >
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
              Keep your company human, at any scale.
            </h2>
            <p className="text-[17px] leading-relaxed text-[var(--foreground)]">
              See your whole workforce in one place — and give every employee an app they
              actually want to open. Book a personalised demo and we&apos;ll tailor it to your
              industry.
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
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            {/* brand */}
            <div className="max-w-sm">
              <Logo size={32} />
              <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)]">
                The AI-powered workforce engagement &amp; decision intelligence platform —
                for every leader, every employee, every decision.
              </p>
              <p className="mt-5 flex items-center gap-2 text-[13px] text-[var(--muted)]">
                <Icon name="globe" size={15} />
                Bengaluru · Mumbai · London
                <span className="opacity-60">(sample)</span>
              </p>
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
              <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4">
                {columns.map((col) => (
                  <div key={col.title}>
                    <h3 className="text-[14px] font-medium text-[var(--muted-2)]">{col.title}</h3>
                    <ul className="mt-5 space-y-3.5">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="text-[15px] text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
                          >
                            {l.label}
                          </Link>
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

      {/* baseline — copyright · legal · trust */}
      <div className="border-t border-[var(--line)]">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="order-3 text-[13px] text-[var(--muted)] sm:order-1">
            © {new Date().getFullYear()} Vadal Inc. · Keeping companies human at scale.
          </p>
          <div className="order-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[var(--muted)] sm:order-2">
            <Link href="/terms" className="transition-colors hover:text-[var(--foreground)]">Terms of use</Link>
            <Link href="/privacy" className="transition-colors hover:text-[var(--foreground)]">Privacy policy</Link>
            <Link href="/gdpr" className="transition-colors hover:text-[var(--foreground)]">Your privacy choices</Link>
          </div>
          <div className="order-2 flex items-center gap-3 sm:order-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--muted)]">
              <Icon name="shield" size={13} /> SOC 2 Certified
              <span className="opacity-60">(sample)</span>
            </span>
            {!LANDING_ONLY && <Socials />}
          </div>
        </Container>
      </div>
    </footer>
  );
}
