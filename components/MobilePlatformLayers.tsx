"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { landingLayers } from "@/lib/platform-nav";

/* ============================================================================
   MobilePlatformLayers — the phone-sized product catalog.

   From the founder's mobile-first brief: "Accordions turn a huge desktop
   mega-menu into a compact, tappable index — the single biggest scroll-reducer
   on mobile."

   Default state follows the brief's dev notes exactly:
     "Always visible: layer name, layer value-prop line, and each module's
      label + hook. Collapsed (tap to reveal): the four benefit lines under
      each module. Whole layer collapsed by default: Enterprise AI Platform
      only."
   So every layer starts open showing its module rows, and only Enterprise AI
   Platform starts closed — it serves IT/procurement, not first-time visitors.

   "Accordion behaviour: one module open at a time per layer" — hence the
   open-module map is keyed by layer rather than a single global value.

   Mobile only; desktop keeps the full narrative sections and the mega-menu.
   ========================================================================== */

const COLLAPSED_BY_DEFAULT = "enterprise-platform";

export function MobilePlatformLayers() {
  const [closed, setClosed] = useState<Set<string>>(() => new Set([COLLAPSED_BY_DEFAULT]));
  const [openMod, setOpenMod] = useState<Record<string, string | null>>({});

  const toggleLayer = (id: string) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="flex flex-col gap-3">
      {landingLayers.map((l, li) => {
        const open = !closed.has(l.id);
        const mod = openMod[l.id] ?? null;
        return (
          <Fragment key={l.id}>
          <div
            className={`overflow-hidden rounded-[var(--r-lg)] border transition-colors ${
              open
                ? "border-[var(--line-strong)] bg-[var(--card)] shadow-[var(--shadow-md)]"
                : "border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-sm)]"
            }`}
          >
            {/* ---------------------------------------------------- layer row */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`layer-${l.id}`}
              onClick={() => toggleLayer(l.id)}
              className="flex w-full items-center gap-3.5 p-4 text-left"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[var(--brand-tint)] text-[var(--brand)]">
                <Icon name={l.icon} size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15.5px] font-bold leading-tight text-[var(--foreground)]">
                  {l.name}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-[var(--muted)]">
                  {l.lede}
                </span>
              </span>
              <Icon
                name="arrow"
                size={16}
                className={`shrink-0 text-[var(--muted-2)] transition-transform duration-300 ${
                  open ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>

            {/* ------------------------------------------------ module rows */}
            {open && (
              <div id={`layer-${l.id}`} className="border-t border-[var(--line)]">
                {l.modules.map((m) => {
                  const key = `${l.id}:${m.name}`;
                  const mOpen = mod === m.name;
                  return (
                    <div key={m.name} className="border-b border-[var(--line)] last:border-b-0">
                      <button
                        type="button"
                        aria-expanded={mOpen}
                        aria-controls={`mod-${key}`}
                        onClick={() =>
                          setOpenMod((prev) => ({ ...prev, [l.id]: mOpen ? null : m.name }))
                        }
                        className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="text-[14.5px] font-semibold leading-tight text-[var(--foreground)]">
                              {m.name}
                            </span>
                            {m.isNew && (
                              <span className="rounded-full bg-[var(--brand-tint)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--brand)]">
                                New
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-[var(--muted)]">
                            {m.hook}
                          </span>
                        </span>
                        <Icon
                          name="arrow"
                          size={14}
                          className={`mt-1 shrink-0 text-[var(--muted-2)] transition-transform duration-300 ${
                            mOpen ? "-rotate-90" : "rotate-90"
                          }`}
                        />
                      </button>

                      {/* --------------------------------- the four benefits */}
                      {mOpen && (
                        <div id={`mod-${key}`} className="px-4 pb-4">
                          <ul className="flex flex-col gap-2.5 border-l-2 border-[var(--brand-tint-2)] pl-3.5">
                            {(m.lines ?? []).map((line) => (
                              <li
                                key={line}
                                className="text-[13.5px] leading-relaxed text-[var(--muted)]"
                              >
                                {line}
                              </li>
                            ))}
                          </ul>
                          {m.slug && (
                            <Link
                              href={`/platform/${m.slug}`}
                              className="mt-3.5 inline-flex items-center gap-1.5 pl-3.5 text-[13.5px] font-bold text-[var(--brand)]"
                            >
                              Explore {m.name}
                              <Icon name="arrow" size={14} />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {li === 2 && <MidCatalogCta />}
          </Fragment>
        );
      })}
    </div>
  );
}

/* The brief: "Demo CTA repeats: hero, after the third layer, and in the
   footer." This is the mid-catalog one — it sits after Digital Workplace,
   where a visitor has seen enough to be interested but still has two layers
   of scrolling ahead of them. */
function MidCatalogCta() {
  return (
    <div className="my-1 rounded-[var(--r-lg)] border border-[var(--line)] bg-[image:var(--section-alt)] p-5 text-center">
      <p className="text-[15.5px] font-bold leading-snug text-[var(--foreground)]">
        Want to see it on your own workforce?
      </p>
      <Link
        href="/demo"
        className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[var(--brand)] px-5 py-3 text-[14.5px] font-bold text-white shadow-[0_6px_16px_-6px_rgba(124,92,248,0.7)]"
      >
        Book a demo
        <Icon name="arrow" size={15} />
      </Link>
    </div>
  );
}
