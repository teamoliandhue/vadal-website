"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";

/* ============================================================================
   MobileTabBar — app-shell bottom navigation for phones.

   The founders wanted mobile to feel like an app rather than a shrunken
   desktop site, which is on-brand here: Vadal itself is a mobile-first
   employee app, so the marketing site previews the product's own shell.

   Five slots, with the highest-value action raised in the centre:

       Home · Platform · ( Book a demo ) · Pricing · More

   The centre action is the demo — deliberately NOT an "Ask AI" button: a
   marketing site can't answer workforce questions, so that would promise
   something we don't deliver. "Book a demo" is the honest, highest-intent tap,
   and it satisfies the mobile-first brief's "make the demo CTA sticky".

   "More" opens the existing mobile menu (Solutions, Resources, Science,
   Pricing, Login, legal) — the brief moves those to a menu rather than the
   primary scroll. It replaces the header hamburger, which is hidden on mobile.
   ========================================================================== */

type Props = {
  moreOpen: boolean;
  onMoreToggle: () => void;
  moreBtnRef?: RefObject<HTMLButtonElement | null>;
};

const tabCls =
  "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10.5px] font-semibold transition-colors";

function HomeIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10.2 12 4l8 6.2V19a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1v-8.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6 12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m4 12.4 8 4.3 8-4.3M4 16.9l8 4.3 8-4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PriceIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5v17M8.2 7.6h6a2.6 2.6 0 0 1 0 5.2H9.6a2.6 2.6 0 0 0 0 5.2h6.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function MoreIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MobileTabBar({ moreOpen, onMoreToggle, moreBtnRef }: Props) {
  const pathname = usePathname();
  const on = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // while the More sheet is open it owns the highlight, so route tabs go quiet
  const tint = (active: boolean) =>
    active && !moreOpen ? "text-[var(--brand)]" : "text-[var(--muted)]";

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[rgba(255,255,255,0.94)] backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-lg items-end px-1">
        <Link href="/" aria-current={on("/") ? "page" : undefined} className={`${tabCls} ${tint(on("/"))}`}>
          <HomeIcon />
          Home
        </Link>
        <Link
          href="/platform"
          aria-current={on("/platform") ? "page" : undefined}
          className={`${tabCls} ${tint(on("/platform"))}`}
        >
          <LayersIcon />
          Platform
        </Link>

        {/* raised centre action — the highest-intent tap on the whole site */}
        <div className="flex w-[74px] shrink-0 flex-col items-center">
          <Link
            href="/demo"
            aria-label="Book a demo"
            className="-mt-6 grid h-14 w-14 place-items-center rounded-full bg-[var(--brand)] text-white shadow-[0_10px_24px_-8px_rgba(124,92,248,0.75)] transition-transform active:scale-95"
          >
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="currentColor" strokeWidth="1.7" />
              <path d="M3.5 9.8h17M8.5 3.5V6m7-2.5V6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="m9.4 14.6 1.9 1.9 3.5-3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="pb-2 pt-1 text-[10.5px] font-bold text-[var(--brand)]">Demo</span>
        </div>

        <Link
          href="/pricing"
          aria-current={on("/pricing") ? "page" : undefined}
          className={`${tabCls} ${tint(on("/pricing"))}`}
        >
          <PriceIcon />
          Pricing
        </Link>
        <button
          ref={moreBtnRef}
          type="button"
          onClick={onMoreToggle}
          aria-expanded={moreOpen}
          aria-controls={moreOpen ? "mobile-menu" : undefined}
          className={`${tabCls} ${moreOpen ? "text-[var(--brand)]" : "text-[var(--muted)]"}`}
        >
          <MoreIcon />
          More
        </button>
      </div>
    </nav>
  );
}
