"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo, SparkMark } from "./Brand";
import { Icon } from "./Icon";
import { Button, Container } from "./ui";
import {
  headerNav,
  platformPillars,
  platformFeatured,
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

  // Escape closes whichever overlay is open
  useEffect(() => {
    if (!mobileOpen && !megaOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMegaOpen(null);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, megaOpen, searchOpen]);

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
                      aria-haspopup="true"
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
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
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

      {!LANDING_ONLY && searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
      {!LANDING_ONLY && mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

/* ------------------------------------------------------------ shared bits */

function MenuLink({ item, onNavigate, compact = false }: { item: MenuItem; onNavigate: () => void; compact?: boolean }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex items-start gap-3 rounded-[var(--r-md)] p-2.5 transition-colors hover:bg-[var(--surface)]"
    >
      {item.icon && (
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors group-hover:bg-[var(--brand)] group-hover:text-white">
          <Icon name={item.icon} size={16} />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[13.5px] font-bold leading-snug text-[var(--foreground)]">{item.name}</span>
        {!compact && item.blurb && (
          <span className="mt-0.5 block text-[12.5px] leading-snug text-[var(--muted)]">{item.blurb}</span>
        )}
      </span>
    </Link>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2.5 pb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
      {children}
    </p>
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
    <div className={`absolute left-1/2 top-full z-50 max-w-[calc(100vw-24px)] -translate-x-1/2 pt-3 ${width}`}>
      <div className="overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lg)]">
        {children}
        {footer}
      </div>
    </div>
  );
}

function PanelFooter({ links, onNavigate }: { links: { label: string; href: string; spark?: boolean }[]; onNavigate: () => void }) {
  return (
    <div className={`grid border-t border-[var(--line)] bg-[var(--surface)] ${links.length > 1 ? "grid-cols-2" : ""}`}>
      {links.map((l, i) => (
        <Link
          key={l.href + l.label}
          href={l.href}
          onClick={onNavigate}
          className={`flex items-center justify-between gap-2 px-5 py-3.5 text-[13px] font-semibold transition-colors hover:bg-[var(--surface-2)] ${
            i < links.length - 1 ? "border-r border-[var(--line)]" : ""
          }`}
        >
          <span className="inline-flex items-center gap-2">
            {l.spark && <SparkMark size={15} />}
            {l.label}
          </span>
          <Icon name="arrow" size={16} className="text-[var(--brand)]" />
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
  return (
    <PanelShell
      width="w-[min(960px,92vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[
            { label: "Explore the whole platform", href: "/platform", spark: true },
            { label: "Decision Intelligence Copilot", href: "/platform#enterprise-platform" },
          ]}
        />
      }
    >
      <div className="grid grid-cols-[1.5fr_1.1fr_1.1fr] gap-2 p-4">
        {/* pillars */}
        <div className="border-r border-[var(--line)] pr-3">
          <GroupLabel>Platform</GroupLabel>
          <div className="space-y-0.5">
            {platformPillars.map((p) => (
              <MenuLink key={p.name} item={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        {/* key offerings (portfolio families) + survey types */}
        <div className="border-r border-[var(--line)] pr-3">
          <GroupLabel>Key offerings</GroupLabel>
          <div className="space-y-0.5">
            {portfolioGroups.map((g) => (
              <MenuLink
                key={g.id}
                item={{ name: g.name, href: `/platform#${g.id}`, icon: g.icon }}
                onNavigate={onNavigate}
                compact
              />
            ))}
          </div>
        </div>
        <div>
          <GroupLabel>Survey types</GroupLabel>
          <div className="space-y-0.5">
            {surveyTypes.map((s) => (
              <MenuLink key={s.name} item={s} onNavigate={onNavigate} compact />
            ))}
          </div>
          <GroupLabel>
            <span className="mt-3 inline-block">Featured</span>
          </GroupLabel>
          <div className="space-y-0.5">
            {platformFeatured.map((f) => (
              <MenuLink key={f.name} item={{ ...f, blurb: undefined }} onNavigate={onNavigate} compact />
            ))}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function SolutionsMega({ onNavigate }: { onNavigate: () => void }) {
  return (
    <PanelShell
      width="w-[min(720px,92vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "View all solutions", href: "/solutions", spark: true }]}
        />
      }
    >
      <div className="grid grid-cols-[1.2fr_1fr] gap-2 p-4">
        <div className="border-r border-[var(--line)] pr-3">
          <GroupLabel>By outcome</GroupLabel>
          <div className="space-y-0.5">
            {solutionsByOutcome.map((s) => (
              <MenuLink key={s.name} item={s} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div>
          <GroupLabel>By workforce</GroupLabel>
          <div className="space-y-0.5">
            {solutionsByWorkforce.map((s) => (
              <MenuLink key={s.name} item={s} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function ResourcesMega({ onNavigate }: { onNavigate: () => void }) {
  return (
    <PanelShell
      width="w-[min(900px,92vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "Browse all resources", href: "/resources", spark: true }]}
        />
      }
    >
      <div className="grid grid-cols-3 gap-2 p-4">
        {resourcesMenu.map((group, gi) => (
          <div key={group.label} className={gi < resourcesMenu.length - 1 ? "border-r border-[var(--line)] pr-3" : ""}>
            <GroupLabel>{group.label}</GroupLabel>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <MenuLink key={item.name} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function ScienceMega({ onNavigate }: { onNavigate: () => void }) {
  return (
    <PanelShell
      width="w-[min(680px,92vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "Explore the science", href: "/science", spark: true }]}
        />
      }
    >
      <div className="p-4">
        <p className="px-2.5 pb-2 text-[13px] font-bold text-[var(--foreground)]">
          <span className="aurora-text">{scienceMenu.heading}</span>
        </p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
          {scienceMenu.items.map((item) => (
            <MenuLink key={item.name} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

/* ----------------------------------------------------------------- search */

type SearchEntry = { label: string; href: string; group: string };

function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const p of platformPillars) entries.push({ label: p.name, href: p.href, group: "Platform" });
  for (const g of portfolioGroups) {
    entries.push({ label: g.name, href: `/platform#${g.id}`, group: "Platform" });
    for (const it of g.items) entries.push({ label: it.name, href: `/platform#${g.id}`, group: g.name });
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
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>("a, button, summary")?.focus();
  }, []);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-[var(--background)] lg:hidden"
    >
      <Container className="flex flex-col py-4">
        <MobileGroup label="Platform" defaultOpen>
          {platformPillars.map((p) => (
            <MobileLink key={p.name} item={p} onClose={onClose} />
          ))}
          <p className="mt-2 px-2 pb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">Key offerings</p>
          {portfolioGroups.map((g) => (
            <MobileLink key={g.id} item={{ name: g.name, href: `/platform#${g.id}`, icon: g.icon }} onClose={onClose} />
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
    </div>
  );
}
