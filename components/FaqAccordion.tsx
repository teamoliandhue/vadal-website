"use client";

import { useState } from "react";

/* ============================================================================
   FaqAccordion — an animated, single-open disclosure list.

   Replaces the native <details> list with a controlled accordion so we get a
   smooth height transition (the 0fr→1fr grid-rows trick), a + → × icon, and
   one-open-at-a-time behaviour. Fully keyboard/AT accessible via real <button>s
   with aria-expanded/aria-controls. Honours prefers-reduced-motion (the
   transition simply collapses to an instant toggle).

   Two skins:
   • "glass" — frosted cards for the watercolor-sky panel (home).
   • "plain" — solid cards on the canvas (solution pages).
   ========================================================================== */

type Faq = { q: string; a: string };

export function FaqAccordion({
  faqs,
  variant = "plain",
  defaultOpen = 0,
}: {
  faqs: Faq[];
  variant?: "glass" | "plain";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const glass = variant === "glass";

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={[
              "overflow-hidden rounded-[var(--r-lg)] border transition-all duration-300",
              glass
                ? isOpen
                  ? "border-[var(--brand)]/40 bg-white/90 shadow-[var(--shadow-md)] backdrop-blur-md"
                  : "border-white/55 bg-white/65 backdrop-blur-md hover:bg-white/80"
                : isOpen
                  ? "border-[var(--brand)]/45 bg-[var(--card)] shadow-[var(--shadow-md)]"
                  : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--line-strong)]",
            ].join(" ")}
          >
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span
                  className={`text-[16px] font-bold leading-snug transition-colors duration-200 ${
                    isOpen ? "text-[var(--brand)]" : "text-[var(--ink-deep)]"
                  }`}
                >
                  {f.q}
                </span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 motion-reduce:transition-none ${
                    isOpen
                      ? "rotate-45 border-[var(--brand)] bg-[var(--brand)] text-white"
                      : "border-[var(--line-strong)] text-[var(--muted)]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={`faq-panel-${i}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-[var(--muted)]">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
