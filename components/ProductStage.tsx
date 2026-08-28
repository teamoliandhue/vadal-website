import { platformLayers } from "@/lib/platform-nav";

/* ============================================================================
   ProductStage — the backdrop a product screenshot sits on.

   A screenshot dropped straight onto the page canvas reads as a document
   scan. Floating it over a photographic stage is what makes it read as a
   product: the backdrop supplies the depth, and the window supplies the edge.

   One photograph, tinted six ways. The tint comes from the platform layer the
   product belongs to, so a Listening page and an Analytics page are visibly
   different places while still obviously the same product — and because it is
   a CSS gradient over a single 12KB image, six moods cost one download rather
   than six.

   `product-stage` is the deep frame, for a lead shot that has room to breathe.
   `product-band` is the light one, used where a dark slab would be too heavy —
   behind the dense screen-by-screen grid, which is many small tiles rather
   than one hero.

   Provenance and licence: public/textures/README.md.
   ========================================================================== */

/* the aurora ramp, one stop per layer — same order as PlatformReveal */
const TINTS = ["#19c6b4", "#22b8dd", "#3b9eff", "#5c7cf9", "#7c5cf8", "#8f5cf0"];

/* product slug → its layer's stop on the ramp. Built from platform-nav, the
   same source the menus use, so a product moving layer moves its tint too. */
const SLUG_TINT: Record<string, string> = {};
platformLayers.forEach((layer, i) => {
  layer.modules.forEach((m) => {
    if (m.slug) SLUG_TINT[m.slug] = TINTS[i % TINTS.length];
  });
});

/** the tint for a product page, falling back to the ramp's middle */
export function productTint(slug?: string): string {
  return (slug && SLUG_TINT[slug]) || "#3b9eff";
}

export function ProductStage({
  tint = "#3b9eff",
  tone = "deep",
  className = "",
  padding = "p-5 sm:p-8 lg:p-10",
  children,
}: {
  tint?: string;
  tone?: "deep" | "light";
  className?: string;
  padding?: string;
  children: React.ReactNode;
}) {
  const deep = tone === "deep";
  return (
    <div className={`relative overflow-hidden rounded-[var(--r-xl)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a decorative
          backdrop that always fills its box; next/image adds a wrapper and a
          srcset for no benefit at a fixed 1800w */}
      <img
        src={deep ? "/textures/product-stage.webp" : "/textures/product-band.webp"}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* the layer's colour, and enough darkening that a light UI has an edge */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: deep
            ? `linear-gradient(155deg, ${tint}cc 0%, ${tint}66 42%, rgba(13,11,22,0.55) 100%)`
            : `linear-gradient(155deg, ${tint}3d 0%, ${tint}14 45%, rgba(255,255,255,0.30) 100%)`,
        }}
      />
      <div className={`relative ${padding}`}>{children}</div>
    </div>
  );
}
