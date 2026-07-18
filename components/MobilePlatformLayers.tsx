"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { platformLayers } from "@/lib/mobile-layers";

/* ============================================================================
   MobilePlatformLayers — the phone-sized product catalog.

   From the founder's mobile-first brief: "Accordions turn a huge desktop
   mega-menu into a compact, tappable index — the single biggest scroll-reducer
   on mobile." Two levels, everything collapsed by default:

     layer  → value-prop line + module rows (name + benefit hook)
     module → up to four "what you get" lines (+ link to the product page)

   Single-open at each level, so the page never balloons while browsing.
   Mobile only — desktop keeps the full narrative sections and mega-menu.
   ========================================================================== */

export function MobilePlatformLayers() {
  const [layer, setLayer] = useState<string | null>(null);
  const [mod, setMod] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {platformLayers.map((l) => {
        const open = layer === l.id;
        return (
          <div
            key={l.id}
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
              onClick={() => {
                setLayer(open ? null : l.id);
                setMod(null);
              }}
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
                  const mOpen = mod === key;
                  return (
                    <div key={m.name} className="border-b border-[var(--line)] last:border-b-0">
                      <button
                        type="button"
                        aria-expanded={mOpen}
                        aria-controls={`mod-${key}`}
                        onClick={() => setMod(mOpen ? null : key)}
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
                            {m.lines.map((line) => (
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
        );
      })}
    </div>
  );
}
