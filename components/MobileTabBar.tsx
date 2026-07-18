"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

/* ============================================================================
   MobileTabBar — a floating glass "island" nav for phones.

   Hypelist-style: a rounded pill inset from all three edges, frosted so the
   page reads through it. Nothing is elevated — the demo action is special by
   being the one solid, brand-filled pill inside the island.

   Refinements:
   - the ACTIVE tab expands to reveal its label, so nobody has to guess what
     the layers or currency glyph means; inactive tabs stay icon-only
   - tapping Home while already home scrolls back to the top (app convention,
     and the mobile home page is ~8,500px tall)
   - the island retracts on scroll-down and returns on scroll-up, but never
     when the visitor has asked for reduced motion
   - below 360px the labels stay collapsed — the row fits its width exactly at
     320px, so an expanding label would overflow
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

/* the label only occupies space while its tab is active — animating max-width
   lets the pill grow smoothly instead of snapping */
function TabLabel({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <span
      className={`overflow-hidden whitespace-nowrap text-[12.5px] font-bold tracking-[-0.01em] transition-[max-width,opacity,margin] duration-300 ease-out ${
        show ? "ml-1.5 max-w-[80px] opacity-100" : "ml-0 max-w-0 opacity-0"
      }`}
    >
      {children}
    </span>
  );
}

export function MobileTabBar({ moreOpen, onMoreToggle, moreBtnRef }: Props) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  // the row fits its container exactly at 320px, so an expanding label would
  // overflow — keep labels collapsed on the narrowest phones
  const [narrow, setNarrow] = useState(false);
  const lastY = useRef(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const nq = window.matchMedia("(max-width: 359px)");
    const syncNarrow = () => setNarrow(nq.matches);
    syncNarrow();
    nq.addEventListener("change", syncNarrow);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotion.current = mq.matches;
      if (mq.matches) setHidden(false); // never retract for reduced-motion users
    };
    sync();
    mq.addEventListener("change", sync);

    const onScroll = () => {
      if (reduceMotion.current) return;
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        setHidden(y > 240 && dy > 0);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      nq.removeEventListener("change", syncNarrow);
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const on = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isActive = (href: string) => on(href) && !moreOpen;
  const showLabel = (active: boolean) => active && !narrow;

  const tab = (active: boolean) =>
    `flex h-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
      narrow ? "px-2" : "px-3"
    } ${
      active
        ? "bg-[rgba(13,11,22,0.06)] text-[var(--foreground)]"
        : "text-[var(--muted)] active:bg-[rgba(13,11,22,0.04)]"
    }`;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 transition-all duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        hidden && !moreOpen ? "translate-y-[130%] opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 14px)" }}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex w-full max-w-[380px] items-center justify-between gap-1 rounded-full border border-white/70 bg-[rgba(255,255,255,0.72)] p-1.5 shadow-[0_10px_36px_-10px_rgba(13,11,22,0.28),0_2px_10px_-3px_rgba(13,11,22,0.12)] backdrop-blur-2xl backdrop-saturate-150"
      >
        <Link
          href="/"
          aria-label="Home"
          aria-current={on("/") ? "page" : undefined}
          onClick={(e) => {
            // already home → send them back to the top instead of a no-op nav
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: reduceMotion.current ? "auto" : "smooth" });
            }
          }}
          className={tab(isActive("/"))}
        >
          <HomeIcon />
          <TabLabel show={showLabel(isActive("/"))}>Home</TabLabel>
        </Link>

        <Link
          href="/platform"
          aria-label="Platform"
          aria-current={on("/platform") ? "page" : undefined}
          className={tab(isActive("/platform"))}
        >
          <LayersIcon />
          <TabLabel show={showLabel(isActive("/platform"))}>Platform</TabLabel>
        </Link>

        {/* the one solid pill — special without being elevated */}
        <Link
          href="/demo"
          aria-label="Book a demo"
          className={`flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-[var(--brand)] text-white shadow-[0_6px_16px_-6px_rgba(124,92,248,0.9)] transition-transform duration-200 active:scale-95 motion-reduce:transition-none ${
            narrow ? "px-3" : "px-4"
          }`}
        >
          <DemoIcon />
          <span className="text-[13.5px] font-bold tracking-[-0.01em]">Demo</span>
        </Link>

        <Link
          href="/pricing"
          aria-label="Pricing"
          aria-current={on("/pricing") ? "page" : undefined}
          className={tab(isActive("/pricing"))}
        >
          <PriceIcon />
          <TabLabel show={showLabel(isActive("/pricing"))}>Pricing</TabLabel>
        </Link>

        <button
          ref={moreBtnRef}
          type="button"
          onClick={onMoreToggle}
          aria-label="More"
          aria-expanded={moreOpen}
          aria-controls={moreOpen ? "mobile-menu" : undefined}
          className={tab(moreOpen)}
        >
          <MoreIcon />
          <TabLabel show={showLabel(moreOpen)}>More</TabLabel>
        </button>
      </nav>
    </div>
  );
}
