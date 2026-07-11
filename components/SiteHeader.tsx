"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo, SparkMark } from "./Brand";
import { Icon } from "./Icon";
import { Button, Container } from "./ui";
import {
  headerNav,
  portfolioGroups,
  resourcesMenu,
  scienceMenu,
  solutionsByOutcome,
  solutionsByWorkforce,
  surveyTypes,
  type MenuItem,
} from "@/lib/content";
import { LANDING_ONLY } from "@/lib/flags";

type MegaId = "platform" | "solutions" | "resources" | "science";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<MegaId | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // If the viewport grows past the lg breakpoint while the mobile menu is
  // open, close it — otherwise the body scroll-lock survives with the menu
  // (and its toggle) display:none'd, freezing the page. Listens on both the
  // media query and window resize for robustness.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  // Escape closes whichever overlay is open, returning focus to its trigger
  useEffect(() => {
    if (!mobileOpen && !megaOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchOpen) searchBtnRef.current?.focus();
        if (mobileOpen) mobileBtnRef.current?.focus();
        setMobileOpen(false);
        setMegaOpen(null);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, megaOpen, searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    searchBtnRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled || megaOpen || searchOpen
            ? "border-b border-[var(--line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-[68px] items-center justify-between gap-4">
          <Logo size={29} />

          {/* desktop nav — hidden in landing-only (beginning) stage */}
          {/* nav is the positioning context — mega panels center under the
              whole nav, not the item, so wide panels never clip offscreen */}
          {!LANDING_ONLY && (
            <nav className="relative hidden items-center gap-0.5 lg:flex" aria-label="Main">
              {headerNav.map((item) =>
                item.mega ? (
                  <div
                    key={item.label}
                    onMouseEnter={() => setMegaOpen(item.mega as MegaId)}
                    onMouseLeave={() => setMegaOpen(null)}
                    onFocus={() => setMegaOpen(item.mega as MegaId)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(null);
                    }}
                  >
                    <Link
                      href={item.href}
                      className="nav-underline flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
                      aria-expanded={megaOpen === item.mega}
                    >
                      {item.label}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        className={`transition-transform ${megaOpen === item.mega ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    {megaOpen === item.mega && (
                      <MegaPanel id={item.mega as MegaId} onNavigate={() => setMegaOpen(null)} />
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="nav-underline rounded-full px-3.5 py-2 text-[14px] font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          )}

          {/* right actions */}
          <div className="flex items-center gap-1.5">
            {!LANDING_ONLY && (
              <button
                ref={searchBtnRef}
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                aria-expanded={searchOpen}
                className="hidden h-10 w-10 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)] lg:grid"
              >
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="6.2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m13.8 13.8 3.4 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {!LANDING_ONLY && (
              <Link
                href="/login"
                className="hidden rounded-full px-3.5 py-2 text-[14px] font-semibold text-[var(--muted)] transition-colors hover:text-[var(--foreground)] lg:block"
              >
                Login
              </Link>
            )}
            <Button href="/demo" size="md">
              Book a demo
            </Button>
          </div>

          {/* mobile toggle — hidden in landing-only stage (no nav to open) */}
          {!LANDING_ONLY && (
            <button
              ref={mobileBtnRef}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls={mobileOpen ? "mobile-menu" : undefined}
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`h-[1.6px] w-4 bg-[var(--foreground)] transition-all ${mobileOpen ? "translate-y-[6.6px] rotate-45" : ""}`} />
                <span className={`h-[1.6px] w-4 bg-[var(--foreground)] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`h-[1.6px] w-4 bg-[var(--foreground)] transition-all ${mobileOpen ? "-translate-y-[6.6px] -rotate-45" : ""}`} />
              </div>
            </button>
          )}
        </Container>
      </div>

      {!LANDING_ONLY && searchOpen && <SearchPanel onClose={closeSearch} />}
      {!LANDING_ONLY && mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

/* ------------------------------------------------------------ shared bits */

/* ---------- Maze-style editorial menu building blocks ----------
   The look: one color-tinted featured card with an illustration, then clean
   grouped text-link columns — no per-link icons or bullets, generous rhythm. */

/* aurora "halftone globe" — a gradient sphere with a dot texture + inner shade */
function AuroraOrb({ size = 104 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <div className="absolute inset-0 rounded-full" style={{ background: "var(--aurora)" }} />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.5px)",
          backgroundSize: "7px 7px",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 58%, transparent 72%)",
          maskImage: "radial-gradient(circle at 50% 50%, #000 58%, transparent 72%)",
          opacity: 0.85,
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "inset 0 -10px 22px rgba(13,11,22,0.22), inset 0 8px 16px rgba(255,255,255,0.45)" }}
      />
    </div>
  );
}

function MenuFeatureCard({
  title,
  href,
  desc,
  onNavigate,
}: {
  title: string;
  href: string;
  desc: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[var(--r-lg)] p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
      style={{ background: "var(--aurora-soft)" }}
    >
      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[15.5px] font-extrabold text-[var(--ink-deep)]">
          {title}
          <Icon name="arrow" size={16} className="text-[var(--brand)] transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="-mr-1.5 -mt-1.5">
          <AuroraOrb />
        </span>
      </div>
      <p className="relative max-w-[15rem] text-[13px] leading-relaxed text-[var(--foreground)]/75">
        {desc}
      </p>
    </Link>
  );
}

function MenuGroup({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted-2)]">{label}</p>
      <div>{children}</div>
    </div>
  );
}

function MenuTextLink({
  name,
  href,
  tag,
  onNavigate,
}: {
  name: string;
  href: string;
  tag?: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex items-center gap-2 py-[7px] text-[14.5px] font-medium text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
    >
      <span>{name}</span>
      {tag && (
        <span className="rounded-[5px] bg-[var(--brand-tint)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--brand)]">
          {tag}
        </span>
      )}
      <Icon
        name="arrow"
        size={13}
        className="-translate-x-1 text-[var(--brand)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
      />
    </Link>
  );
}

function PanelShell({
  width,
  children,
  footer,
}: {
  width: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 max-w-[calc(100vw-24px)] -translate-x-1/2 pt-3 ${width}`}
      style={{ animation: "menu-in 0.22s cubic-bezier(0.22,1,0.36,1)" }}
    >
      <div className="menu-panel">
        {children}
        {footer}
      </div>
    </div>
  );
}

function PanelFooter({ links, onNavigate }: { links: { label: string; href: string; spark?: boolean }[]; onNavigate: () => void }) {
  return (
    <div className={`relative z-[1] grid border-t border-[var(--line)] bg-gradient-to-b from-[var(--surface)] to-[var(--card)] ${links.length > 1 ? "grid-cols-2" : ""}`}>
      {links.map((l, i) => (
        <Link
          key={l.href + l.label}
          href={l.href}
          onClick={onNavigate}
          className={`menu-row group flex items-center justify-between gap-2 px-5 py-3.5 text-[13px] font-semibold hover:bg-[var(--surface-2)] ${
            i < links.length - 1 ? "border-r border-[var(--line)]" : ""
          }`}
        >
          <span className="inline-flex items-center gap-2">
            {l.spark && <SparkMark size={15} />}
            {l.label}
          </span>
          <Icon name="arrow" size={16} className="text-[var(--brand)] transition-transform group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ mega panels */

function MegaPanel({ id, onNavigate }: { id: MegaId; onNavigate: () => void }) {
  if (id === "platform") return <PlatformMega onNavigate={onNavigate} />;
  if (id === "solutions") return <SolutionsMega onNavigate={onNavigate} />;
  if (id === "resources") return <ResourcesMega onNavigate={onNavigate} />;
  return <ScienceMega onNavigate={onNavigate} />;
}

function PlatformMega({ onNavigate }: { onNavigate: () => void }) {
  // Editorial layout: a featured card + survey types on the left, then the six
  // platform clouds as clean grouped text-link columns (two clouds per column).
  const columns: number[][] = [
    [0, 3], // Workforce Experience · Engagement & Listening
    [1, 2], // Workforce Intelligence · Talent Intelligence
    [4, 5], // Digital Workplace · Enterprise AI Platform
  ];
  const renderCloud = (i: number) => {
    const g = portfolioGroups[i];
    const mods = g.items.filter((it): it is typeof it & { slug: string } => Boolean(it.slug));
    return (
      <MenuGroup key={g.id} label={g.name}>
        {mods.map((it) => (
          <MenuTextLink
            key={it.slug}
            name={it.name}
            href={`/platform/${it.slug}`}
            tag={it.slug === "ai-workforce-assistant" ? "New" : undefined}
            onNavigate={onNavigate}
          />
        ))}
      </MenuGroup>
    );
  };

  return (
    <PanelShell
      width="w-[min(1060px,94vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[
            { label: "Explore the whole platform", href: "/platform", spark: true },
            { label: "Book a personalized demo", href: "/demo" },
          ]}
        />
      }
    >
      <div className="grid grid-cols-[248px_1fr_1fr_1fr] gap-6 p-5">
        <div className="flex flex-col gap-5">
          <MenuFeatureCard
            title="The Vadal Platform"
            href="/platform"
            desc="One AI-powered platform for engagement, intelligence and action across your whole workforce."
            onNavigate={onNavigate}
          />
          <MenuGroup label="Survey types">
            {surveyTypes.slice(1).map((s) => (
              <MenuTextLink key={s.name} name={s.name} href={s.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
        {columns.map((pair, ci) => (
          <div key={ci} className="flex flex-col gap-6 border-l border-[var(--line)] pl-6">
            {pair.map(renderCloud)}
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function SolutionsMega({ onNavigate }: { onNavigate: () => void }) {
  return (
    <PanelShell
      width="w-[min(780px,94vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "View all solutions", href: "/solutions", spark: true }]}
        />
      }
    >
      <div className="grid grid-cols-[248px_1fr_1fr] gap-6 p-5">
        <MenuFeatureCard
          title="Solutions"
          href="/solutions"
          desc="Workforce intelligence tuned to the outcomes you're accountable for and the workforce you run."
          onNavigate={onNavigate}
        />
        <div className="border-l border-[var(--line)] pl-6">
          <MenuGroup label="By outcome">
            {solutionsByOutcome.map((s) => (
              <MenuTextLink key={s.name} name={s.name} href={s.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
        <div className="border-l border-[var(--line)] pl-6">
          <MenuGroup label="By workforce">
            {solutionsByWorkforce.map((s) => (
              <MenuTextLink key={s.name} name={s.name} href={s.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
      </div>
    </PanelShell>
  );
}

function ResourcesMega({ onNavigate }: { onNavigate: () => void }) {
  return (
    <PanelShell
      width="w-[min(960px,94vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "Browse all resources", href: "/resources", spark: true }]}
        />
      }
    >
      <div className="grid grid-cols-[248px_1fr_1fr_1fr] gap-6 p-5">
        <MenuFeatureCard
          title="Resources"
          href="/resources"
          desc="Guides, benchmarks and community for leaders turning employee feedback into decisions."
          onNavigate={onNavigate}
        />
        {resourcesMenu.map((group) => (
          <div key={group.label} className="border-l border-[var(--line)] pl-6">
            <MenuGroup label={group.label}>
              {group.items.map((item) => (
                <MenuTextLink key={item.name} name={item.name} href={item.href} onNavigate={onNavigate} />
              ))}
            </MenuGroup>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function ScienceMega({ onNavigate }: { onNavigate: () => void }) {
  const first = scienceMenu.items.slice(0, 3);
  const second = scienceMenu.items.slice(3);
  return (
    <PanelShell
      width="w-[min(740px,94vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "Explore the science", href: "/science", spark: true }]}
        />
      }
    >
      <div className="grid grid-cols-[248px_1fr_1fr] gap-6 p-5">
        <MenuFeatureCard
          title="The Science"
          href="/science"
          desc={scienceMenu.heading}
          onNavigate={onNavigate}
        />
        <div className="border-l border-[var(--line)] pl-6">
          <MenuGroup label="People & method">
            {first.map((item) => (
              <MenuTextLink key={item.name} name={item.name} href={item.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
        <div className="border-l border-[var(--line)] pl-6">
          <MenuGroup label="Platform & benchmarks">
            {second.map((item) => (
              <MenuTextLink key={item.name} name={item.name} href={item.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
      </div>
    </PanelShell>
  );
}

/* ----------------------------------------------------------------- search */

type SearchEntry = { label: string; href: string; group: string };

function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const g of portfolioGroups) {
    entries.push({ label: g.name, href: `/platform#${g.id}`, group: "Platform" });
    for (const it of g.items)
      entries.push({
        label: it.name,
        href: it.slug ? `/platform/${it.slug}` : `/platform#${g.id}`,
        group: g.name,
      });
  }
  for (const s of surveyTypes) entries.push({ label: s.name, href: s.href, group: "Surveys" });
  for (const s of [...solutionsByOutcome, ...solutionsByWorkforce])
    entries.push({ label: s.name, href: s.href, group: "Solutions" });
  for (const g of resourcesMenu) for (const it of g.items) entries.push({ label: it.name, href: it.href, group: "Resources" });
  for (const it of scienceMenu.items) entries.push({ label: it.name, href: it.href, group: "Science" });
  entries.push(
    { label: "Pricing", href: "/pricing", group: "Company" },
    { label: "Book a demo", href: "/demo", group: "Company" },
    { label: "Customers", href: "/customers", group: "Company" },
    { label: "About", href: "/about", group: "Company" },
    { label: "Security", href: "/security", group: "Company" },
    { label: "Contact", href: "/contact", group: "Company" },
  );
  return entries;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildSearchIndex, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = q.trim()
    ? index.filter((e) => e.label.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8)
    : [];

  return (
    <div className="absolute inset-x-0 top-full hidden border-b border-[var(--line)] bg-[rgba(255,255,255,0.96)] shadow-[var(--shadow-lg)] backdrop-blur-xl lg:block">
      <Container className="py-4">
        <div className="mx-auto max-w-xl">
          <div className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--card)] px-5">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 text-[var(--muted)]">
              <circle cx="9" cy="9" r="6.2" stroke="currentColor" strokeWidth="1.8" />
              <path d="m13.8 13.8 3.4 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the platform, solutions, resources…"
              aria-label="Search"
              className="h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--muted-2)]"
            />
            <button onClick={onClose} aria-label="Close search" className="text-[13px] font-semibold text-[var(--muted)] hover:text-[var(--foreground)]">
              Esc
            </button>
          </div>
          {results.length > 0 && (
            <ul className="mt-2 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-md)]">
              {results.map((r) => (
                <li key={r.group + r.href + r.label}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-2.5 text-[14px] font-semibold transition-colors hover:bg-[var(--surface)]"
                  >
                    {r.label}
                    <span className="text-[12px] font-medium text-[var(--muted-2)]">{r.group}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {q.trim() && results.length === 0 && (
            <p className="mt-3 text-center text-[13px] text-[var(--muted)]">
              No matches — try the <Link href="/platform" onClick={onClose} className="font-semibold text-[var(--brand)]">platform overview</Link>.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------ mobile menu */

function MobileGroup({ label, children, defaultOpen = false }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-[var(--line)]" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-2 py-3.5 text-[16px] font-semibold [&::-webkit-details-marker]:hidden">
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-open:rotate-180" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}

function MobileLink({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="flex items-center gap-2.5 rounded-[var(--r-md)] px-2 py-2 text-[14.5px] font-semibold text-[var(--foreground)]"
    >
      {item.icon && (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-[var(--brand-tint)] text-[var(--brand)]">
          <Icon name={item.icon} size={14} />
        </span>
      )}
      {item.name}
    </Link>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>("a, button, summary")?.focus();
  }, []);

  // A full-screen disclosure, not a modal — the header above stays usable,
  // so no aria-modal/dialog role (there's no focus trap to back it up).
  return (
    <nav
      ref={panelRef}
      id="mobile-menu"
      aria-label="Mobile menu"
      className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-[var(--background)] lg:hidden"
    >
      <Container className="flex flex-col py-4">
        <MobileGroup label="Platform" defaultOpen>
          {portfolioGroups.map((g) => (
            <MobileLink key={g.id} item={{ name: g.name, href: `/platform#${g.id}`, icon: g.icon }} onClose={onClose} />
          ))}
          <p className="mt-2 px-2 pb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">Survey types</p>
          {surveyTypes.map((s) => (
            <MobileLink key={s.name} item={s} onClose={onClose} />
          ))}
        </MobileGroup>
        <MobileGroup label="Solutions">
          {[...solutionsByOutcome, ...solutionsByWorkforce].map((s) => (
            <MobileLink key={s.name} item={s} onClose={onClose} />
          ))}
        </MobileGroup>
        <MobileGroup label="Resources">
          {resourcesMenu.flatMap((g) => g.items).map((r) => (
            <MobileLink key={r.name} item={r} onClose={onClose} />
          ))}
        </MobileGroup>
        <MobileGroup label="Science">
          {scienceMenu.items.map((s) => (
            <MobileLink key={s.name} item={s} onClose={onClose} />
          ))}
        </MobileGroup>
        <Link href="/pricing" onClick={onClose} className="border-b border-[var(--line)] px-2 py-3.5 text-[16px] font-semibold">
          Pricing
        </Link>
        <Link href="/login" onClick={onClose} className="px-2 py-3.5 text-[16px] font-semibold text-[var(--muted)]">
          Login
        </Link>
        <Button href="/demo" size="lg" className="mt-3 w-full" icon>
          Book a demo
        </Button>
      </Container>
    </nav>
  );
}
