import { Container, Section, SectionHead } from "./ui";
import { PRODUCT_SHOTS } from "./ProductShot";

/* ============================================================================
   ProductScreens — §6 of the content spec.

   The spec names every screen a product page should show (112 across the 25
   pages) and the site had no section for them at all: 97 of those names lived
   only as a caption pill under a drawn mock, and 15 existed nowhere.

   The frames are placeholders on purpose. We hold 17 real captures and none of
   them is one of the 112 named screens — dropping a capture into a slot
   labelled something else would caption the wrong screen. A capture is used
   only where it genuinely IS that screen, which today is nowhere; everything
   else is an empty frame waiting for the real thing.
   ========================================================================== */

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

/** Does one of our real captures actually depict this named screen?

   Deliberately an exact match, not a substring one. Our capture labels are
   short ("Recognition", "Sentiment") and appear inside several different
   screen names — a substring rule put the single Recognition screenshot into
   five slots labelled five different things. Today nothing matches, so every
   frame is a placeholder; register a capture under the exact screen name and
   its frame fills in on its own. */
function captureFor(slug: string, screen: string) {
  const shot = PRODUCT_SHOTS[slug];
  if (!shot) return null;
  return norm(shot.label) === norm(screen) ? shot : null;
}

function Frame({ label, slug }: { label: string; slug: string }) {
  const shot = captureFor(slug, label);
  const phone = /\bmobile\b|\bapp\b/i.test(label);

  return (
    <figure>
      <div className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
        {/* window chrome, so an empty frame still reads as a product surface */}
        <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-3.5 py-2.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-2 w-2 rounded-full opacity-70" style={{ background: c }} />
          ))}
        </div>

        {shot ? (
          <img
            src={`/product/${shot.file}.webp`}
            alt={label}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-left-top"
          />
        ) : (
          <div
            className="grid aspect-[16/10] place-items-center"
            style={{ background: "var(--aurora-soft)" }}
          >
            {phone ? (
              <span className="h-[62%] w-[30%] rounded-[10px] border-2 border-dashed border-[var(--line-strong)] bg-[var(--card)]/50" />
            ) : (
              <span className="h-[58%] w-[62%] rounded-[8px] border-2 border-dashed border-[var(--line-strong)] bg-[var(--card)]/50" />
            )}
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-[14px] font-semibold text-[var(--foreground)]">
        {label}
      </figcaption>
    </figure>
  );
}

export function ProductScreens({
  screens,
  slug,
  name,
}: {
  screens: string[];
  slug: string;
  name: string;
}) {
  if (!screens.length) return null;

  return (
    <Section tone="surface">
      <Container>
        <SectionHead eyebrow="Product screens" title={`${name}, screen by screen`} />
        <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
          {screens.map((s) => (
            <Frame key={s} label={s} slug={slug} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
