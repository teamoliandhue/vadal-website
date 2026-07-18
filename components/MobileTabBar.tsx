"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";

/* ============================================================================
   MobileTabBar — a floating glass "island" nav for phones.

   Hypelist-style: the bar doesn't span the screen edge-to-edge, it floats as a
   rounded pill inset from all three edges, frosted so the page reads through
   it. Nothing is elevated above the bar — the demo action is made special by
   being the one solid, brand-filled pill inside it, the way the reference's
   "+" is the one solid dark pill.

       ( ⌂ )   ⌸    [ ▣ demo ]    $    ≡

   The island auto-hides on scroll-down and returns the instant you scroll up,
   so it never sits on top of what you're reading, and it rides above the
   home indicator via env(safe-area-inset-bottom).
   ========================================================================== */

type Props = {
  moreOpen: boolean;
  onMoreToggle: () => void;
  moreBtnRef?: RefObject<HTMLButtonElement | null>;
};

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
function DemoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.8h17M8.5 3.5V6m7-2.5V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m9.4 14.6 1.9 1.9 3.5-3.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MobileTabBar({ moreOpen, onMoreToggle, moreBtnRef }: Props) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // hide going down, reveal going up — never while the More sheet is open
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        setHidden(y > 240 && dy > 0);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const on = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const active = (isOn: boolean) => isOn && !moreOpen;

  // each tab is a circle that fills with a soft tint when it's the current page
  const tab = (isOn: boolean) =>
    `grid h-11 w-11 place-items-center rounded-full transition-colors duration-200 ${
      active(isOn)
        ? "bg-[rgba(13,11,22,0.06)] text-[var(--foreground)]"
        : "text-[var(--muted)] active:bg-[rgba(13,11,22,0.04)]"
    }`;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 transition-all duration-300 ease-out lg:hidden ${
        hidden && !moreOpen ? "translate-y-[130%] opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 14px)" }}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex w-full max-w-[380px] items-center justify-between gap-1 rounded-full border border-white/70 bg-[rgba(255,255,255,0.72)] p-1.5 shadow-[0_10px_36px_-10px_rgba(13,11,22,0.28),0_2px_10px_-3px_rgba(13,11,22,0.12)] backdrop-blur-2xl backdrop-saturate-150"
      >
        <Link href="/" aria-label="Home" aria-current={on("/") ? "page" : undefined} className={tab(on("/"))}>
          <HomeIcon />
        </Link>
        <Link
          href="/platform"
          aria-label="Platform"
          aria-current={on("/platform") ? "page" : undefined}
          className={tab(on("/platform"))}
        >
          <LayersIcon />
        </Link>

        {/* the one solid pill — special without being elevated */}
        <Link
          href="/demo"
          aria-label="Book a demo"
          className="flex h-11 items-center gap-1.5 rounded-full bg-[var(--brand)] px-4 text-white shadow-[0_6px_16px_-6px_rgba(124,92,248,0.9)] transition-transform duration-200 active:scale-95"
        >
          <DemoIcon />
          <span className="text-[13.5px] font-bold tracking-[-0.01em]">Demo</span>
        </Link>

        <Link
          href="/pricing"
          aria-label="Pricing"
          aria-current={on("/pricing") ? "page" : undefined}
          className={tab(on("/pricing"))}
        >
          <PriceIcon />
        </Link>
        <button
          ref={moreBtnRef}
          type="button"
          onClick={onMoreToggle}
          aria-label="More"
          aria-expanded={moreOpen}
          aria-controls={moreOpen ? "mobile-menu" : undefined}
          className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-200 ${
            moreOpen
              ? "bg-[rgba(13,11,22,0.06)] text-[var(--foreground)]"
              : "text-[var(--muted)] active:bg-[rgba(13,11,22,0.04)]"
          }`}
        >
          <MoreIcon />
        </button>
      </nav>
    </div>
  );
}
