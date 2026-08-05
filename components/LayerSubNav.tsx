"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Container } from "./ui";
import type { PlatformLayer } from "@/lib/platform-nav";

/* ============================================================================
   LayerSubNav — the sibling switcher, made permanent.

   A product page used to carry a one-off strip under the hero. It scrolled away
   after a screen and never came back, so the only route to a neighbouring
   module was back up to the header, open the mega, hover the layer, click —
   four moves to travel sideways between two pages of the same layer.

   It also includes the CURRENT module rather than filtering it out: the old
   strip could move you but never told you where you were.

   Two placements, because the two viewports have different furniture:
   - "top"    phones. Docks under the header. The bottom is already taken by
              the floating tab-bar island, so it can't go there.
   - "bottom" desktop. Rides the bottom of the viewport and parks itself just
              above the footer, which `sticky bottom-0` gives us for free as
              long as this is the last child of <main>.
   ========================================================================== */

export function LayerSubNav({
  layer,
  slug,
  placement,
}: {
  layer: PlatformLayer;
  slug: string;
  placement: "top" | "bottom";
}) {
  const modules = layer.modules.filter((m) => m.slug);
  const scroller = useRef<HTMLDivElement>(null);
  const activeChip = useRef<HTMLAnchorElement>(null);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastY = useRef(0);
  const atTop = placement === "top";

  // Mirrors SiteHeader's own retract rule. On phones the header bar slides away
  // going down but still reserves its 52px, so without this the strip would
  // hang below a transparent band with the page scrolling through it.
  useEffect(() => {
    if (!atTop) return;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        setHeaderHidden(y > 240 && dy > 0);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [atTop]);

  // The active module is rarely the first one, so on a phone it can start off
  // screen. Set scrollLeft directly — scrollIntoView would move the page too.
  useEffect(() => {
    const chip = activeChip.current;
    const box = scroller.current;
    if (!chip || !box) return;
    box.scrollLeft = chip.offsetLeft - (box.clientWidth - chip.offsetWidth) / 2;
  }, [slug]);

  if (modules.length < 2) return null;

  return (
    <div
      className={
        atTop
          ? `sticky top-[52px] z-30 border-y border-[var(--line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl backdrop-saturate-150 transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
              headerHidden ? "-translate-y-[52px]" : ""
            }`
          : "sticky bottom-0 z-30 hidden border-t border-[var(--line)] bg-[rgba(255,255,255,0.9)] shadow-[0_-8px_28px_-14px_rgba(13,11,22,0.28)] backdrop-blur-xl backdrop-saturate-150 lg:block"
      }
    >
      <Container>
        <div className="flex items-center gap-3 py-2.5">
          <Link
            href={`/platform#${layer.id}`}
            className="hidden shrink-0 items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--muted-2)] transition-colors hover:text-[var(--brand)] sm:flex"
          >
            <Icon name={layer.icon} size={14} />
            {layer.name}
          </Link>
          <span className="hidden h-4 w-px shrink-0 bg-[var(--line)] sm:block" />

          <div
            ref={scroller}
            className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {modules.map((m) => {
              const on = m.slug === slug;
              return (
                <Link
                  key={m.slug}
                  ref={on ? activeChip : undefined}
                  href={`/platform/${m.slug}`}
                  aria-current={on ? "page" : undefined}
                  // Switching module should start you at the new hero, not drop
                  // you into the middle of a page you haven't read.
                  onClick={() => {
                    if (!on) window.scrollTo({ top: 0, behavior: "auto" });
                  }}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors ${
                    on
                      ? "bg-[var(--brand)] text-white"
                      : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon name={m.icon} size={14} className={on ? "" : "text-[var(--brand)]"} />
                  {m.name}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
