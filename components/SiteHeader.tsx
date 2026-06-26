"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo, SparkMark } from "./Brand";
import { Icon } from "./Icon";
import { Button, Container } from "./ui";
import { headerNav, solutionsNav } from "@/lib/content";
import { LANDING_ONLY } from "@/lib/flags";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

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
    if (!mobileOpen && !megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMegaOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, megaOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--line)] bg-[rgba(255,255,255,0.82)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-[68px] items-center justify-between gap-4">
          <Logo size={29} />

          {/* desktop nav — hidden in landing-only (beginning) stage */}
          {!LANDING_ONLY && (
          <nav className="hidden items-center gap-1 lg:flex">
            {headerNav.map((item) =>
              item.mega ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  onFocus={() => setMegaOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(false);
                  }}
                >
                  <Link
                    href="/solutions"
                    className="nav-underline flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                  >
                    {item.label}
                    <svg width="11" height="11" viewBox="0 0 12 12" className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} aria-hidden="true">
                      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  {megaOpen && <MegaMenu onNavigate={() => setMegaOpen(false)} />}
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
          <div className="flex items-center gap-2">
            {!LANDING_ONLY && (
              <Link
                href="/login"
                className="hidden rounded-full px-3.5 py-2 text-[14px] font-semibold text-[var(--muted)] transition-colors hover:text-[var(--foreground)] lg:block"
              >
                Login
              </Link>
            )}
            <Button href="/demo" size="md">
              Book demo
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

      {!LANDING_ONLY && mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 pt-3">
      <div className="overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lg)]">
        <div className="grid grid-cols-2 gap-1 p-3">
          {solutionsNav.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              onClick={onNavigate}
              className="group flex items-start gap-3 rounded-[var(--r-md)] p-3 transition-colors hover:bg-[var(--surface)]"
            >
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors group-hover:bg-[var(--brand)] group-hover:text-white">
                <Icon name={s.icon} size={20} />
              </span>
              <span>
                <span className="block text-[14px] font-bold text-[var(--foreground)]">{s.name}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-[var(--muted)]">{s.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 border-t border-[var(--line)] bg-[var(--surface)]">
          <Link
            href="/solutions"
            onClick={onNavigate}
            className="flex items-center justify-between gap-2 border-r border-[var(--line)] px-5 py-3.5 text-[13px] font-semibold transition-colors hover:bg-[var(--surface-2)]"
          >
            <span>View all solutions</span>
            <Icon name="arrow" size={16} className="text-[var(--brand)]" />
          </Link>
          <Link
            href="/platform"
            onClick={onNavigate}
            className="flex items-center justify-between gap-2 px-5 py-3.5 text-[13px] font-semibold transition-colors hover:bg-[var(--surface-2)]"
          >
            <span className="inline-flex items-center gap-2">
              <SparkMark size={16} />
              The whole platform
            </span>
            <Icon name="arrow" size={16} className="text-[var(--brand)]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // move focus into the panel on open
  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
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
      <Container className="flex flex-col gap-1 py-6">
        <div className="flex items-center justify-between px-2 pb-2 pt-3">
          <p className="eyebrow">Solutions</p>
          <Link href="/solutions" onClick={onClose} className="text-[13px] font-semibold text-[var(--brand)]">
            View all →
          </Link>
        </div>
        {solutionsNav.map((s) => (
          <Link
            key={s.slug}
            href={`/solutions/${s.slug}`}
            onClick={onClose}
            className="flex items-center gap-3 rounded-[var(--r-md)] px-2 py-2.5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--brand-tint)] text-[var(--brand)]">
              <Icon name={s.icon} size={18} />
            </span>
            <span className="text-[15px] font-semibold">{s.name}</span>
          </Link>
        ))}
        <div className="my-2 h-px bg-[var(--line)]" />
        {headerNav
          .filter((i) => !i.mega)
          .map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="rounded-[var(--r-md)] px-2 py-2.5 text-[16px] font-semibold"
            >
              {item.label}
            </Link>
          ))}
        <Link href="/login" onClick={onClose} className="rounded-[var(--r-md)] px-2 py-2.5 text-[16px] font-semibold text-[var(--muted)]">
          Login
        </Link>
        <Button href="/demo" size="lg" className="mt-3 w-full" icon>
          Book demo
        </Button>
      </Container>
    </div>
  );
}
