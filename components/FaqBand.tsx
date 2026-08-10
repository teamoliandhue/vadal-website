import type { ReactNode } from "react";
import { Container, SectionHead } from "./ui";

/* ============================================================================
   FaqBand — the "Questions, answered" section, on a photographic plate.

   The homepage had one; every product, solution and pricing page had the same
   section on flat canvas. Rather than 40 unrelated images (or one repeated
   everywhere), the plate is chosen by GROUP: one per platform layer, one per
   solution category, one for pricing. Sibling pages share a look, which reads
   as a deliberate family rather than randomness.

   The plate itself is a CSS class (see globals.css) so it only loads from lg
   up. At phone width a 16:9 plate is cropped to an unrecognizable smear, and
   there is no reason to spend the bytes.
   ========================================================================== */

export function FaqBand({
  plate,
  title = "Questions, answered",
  eyebrow = "Good to know",
  lede,
  children,
}: {
  /** the group slug, e.g. "talent-intelligence" or "pricing" */
  plate: string;
  title?: string;
  eyebrow?: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`faq-plate-${plate} relative isolate overflow-hidden border-y border-[var(--line)] py-14 sm:py-20 lg:py-24`}
    >
      {/* scrim: lifts the heading and keeps the frosted cards readable over
          whatever the photograph is doing underneath */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(243,244,248,0.62) 0%, rgba(243,244,248,0.24) 40%, rgba(243,244,248,0.12) 100%)",
        }}
      />
      <Container>
        <div className="relative">
          <SectionHead eyebrow={eyebrow} title={title} lede={lede} />
          <div className="mx-auto mt-10 max-w-5xl">{children}</div>
        </div>
      </Container>
    </div>
  );
}
