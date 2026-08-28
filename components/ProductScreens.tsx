import { Container, Section, SectionHead } from "./ui";
import { PRODUCT_SHOTS } from "./ProductShot";
import { screenFile } from "@/lib/product-screens";
import { ProductStage, productTint } from "./ProductStage";

/* ============================================================================
   ProductScreens — §6 of the content spec.

   The spec names every screen a product page should show (112 across the 25
   pages). Until the designs existed this section was frames and captions with
   nothing in them.

   27 of those slots now hold the real screen, exported from the "All Pages"
   board in Figma. The mapping lives in lib/product-screens.ts and is generated
   by scripts/build-screen-manifest.mjs, which places a file only where its
   name matches a screen the spec already lists for that product. Slots without
   a design keep the placeholder frame — an empty frame is honest, a screenshot
   under someone else's caption is not.
   ========================================================================== */

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

/** Does one of our real captures actually depict this named screen?

   Deliberately an exact match, not a substring one. Our older capture labels
   are short ("Recognition", "Sentiment") and appear inside several different
   screen names — a substring rule put the single Recognition screenshot into
   five slots labelled five different things. */
function captureFor(slug: string, screen: string) {
  const shot = PRODUCT_SHOTS[slug];
  if (!shot) return null;
  return norm(shot.label) === norm(screen) ? shot : null;
}

function Frame({ label, slug }: { label: string; slug: string }) {
  /* the Figma design wins where it exists; the older app capture is the
     fallback, and only where it genuinely is this screen */
  const design = screenFile(slug, label);
  const shot = design ? null : captureFor(slug, label);
  const phone = /\bmobile\b|\bapp\b/i.test(label);

  return (
    <figure>
      <div className="overflow-hidden rounded-[var(--r-lg)] border border-white/40 bg-[var(--card)] shadow-[0_16px_36px_-14px_rgba(13,11,22,0.35)]">
        {/* window chrome, so an empty frame still reads as a product surface */}
        <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-3.5 py-2.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-2 w-2 rounded-full opacity-70" style={{ background: c }} />
          ))}
        </div>

        {design ? (
          /* contain, not cover. The exports come in two shapes — 1600x1000 and
             1600x864 — and cover cropped the wider ones side-on, slicing the
             app's left sidebar in half and cutting the right edge off. These
             are the designer's compositions; letterboxing the odd one by a few
             percent beats amputating it. */
          <div className="grid aspect-[16/10] place-items-center bg-[var(--surface)]">
            <img
              src={design}
              alt={`The ${label} screen in the Vadal.ai product`}
              width={1600}
              height={1000}
              loading="lazy"
              className="max-h-full w-full object-contain"
            />
          </div>
        ) : shot ? (
          // phone captures are portrait — contain them in the landscape tile
          // rather than cropping the screen down to a 16:10 sliver
          <div
            className={phone ? "grid aspect-[16/10] place-items-center p-3" : ""}
            style={phone ? { background: "var(--aurora-soft)" } : undefined}
          >
            <img
              src={`/product/${shot.file}.webp`}
              alt={label}
              loading="lazy"
              className={
                phone
                  ? "max-h-full w-auto rounded-[6px] shadow-[var(--shadow-sm)]"
                  : "aspect-[16/10] w-full object-cover object-left-top"
              }
            />
          </div>
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
      <figcaption className="mt-3 text-[14px] font-semibold text-[var(--foreground)] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
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

  /* The grid gets ONE stage behind all of its tiles, not a photograph behind
     each. A product page can carry eleven of these; eleven backdrops would be
     eleven competing pictures and a page-weight problem, and the tiles are
     small enough that a busy backing would swamp the screen inside. The light
     tone for the same reason — a deep slab under a dozen small cards reads as
     a hole in the page. */
  return (
    <Section tone="surface">
      <Container>
        <SectionHead eyebrow="Product screens" title={`${name}, screen by screen`} />
        <ProductStage
          tint={productTint(slug)}
          tone="light"
          className="mt-10"
          padding="p-5 sm:p-7 lg:p-9"
        >
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
            {screens.map((s) => (
              <Frame key={s} label={s} slug={slug} />
            ))}
          </div>
        </ProductStage>
      </Container>
    </Section>
  );
}
