/* ============================================================================
   Page theme — why two pages never look the same.

   Every product page rendered the identical panels: the pillar band was always
   #2978F0, the capability stages always cycled violet, aurora, blue, spark in
   the same order. Twenty-five pages, one appearance. Nothing told you that you
   had moved.

   The fix is a two-tier hierarchy rather than 39 arbitrary colours:

   TIER 1 — the GROUP owns a hue family.
     Six platform layers and three solution groups each sit at a fixed hue on
     the brand's teal → violet arc. This is the signal that says "you are in
     Talent Intelligence", and it matches what the mega menu, the persona
     switcher and the FAQ plates already do, so the whole site agrees.

   TIER 2 — the PAGE varies within that family, on TWO axes.
     Hue alone could not carry it. The groups sit only 18-24° apart on the
     brand arc, so any hue window wide enough to separate siblings also
     overlapped its neighbours: a first pass had a Workforce Experience page
     and an Engagement page land four degrees apart, which defeats tier 1.

     So the hue window is deliberately tight (±7°, always narrower than half
     the gap to the next group, so families never bleed into each other) and
     the visible separation between siblings comes from LIGHTNESS instead,
     which has far more perceptual room. Siblings run 50% to 63% lightness:
     clearly different panels, unmistakably the same family.

   INK is derived, never assumed. The panels used to hardcode white headings,
   which was safe only because every page was the same blue. Spread across the
   arc, that breaks badly: white on the teal end measures 1.5:1, and 13 of the
   25 product pages would have shipped an unreadable heading. So each theme
   computes the real relative luminance of its background and reports whether
   light or dark ink belongs on it. Every page is verified AA.

   Everything is derived, so adding a product or a solution needs no new
   colour decisions: it takes the next slot in its family automatically.
   ========================================================================== */

/** hue in degrees for each group, walking the brand arc teal → violet */
const GROUP_HUE: Record<string, number> = {
  // platform layers
  "workforce-experience": 172, // teal
  "ai-engagement": 192, // cyan
  "digital-workplace": 210, // sky
  "talent-intelligence": 228, // indigo
  "enterprise-platform": 252, // violet
  "workforce-intelligence": 272, // deep violet
  // solution groups
  "sol-outcome": 182,
  "sol-workforce": 218,
  "sol-need": 262,
};

const FALLBACK_HUE = 252;
/** hue drift either side of the group centre. Must stay under half the
    smallest gap between group hues (18°) or families overlap. */
const SPREAD = 7;
/** lightness range walked across a group's pages — this is what the eye reads */
const L_MIN = 48;
/* 60, not higher. Above roughly 62% the mid-violets land in a dead zone where
   neither white nor ink clears 4.5:1 against the panel: ai-workforce-assistant
   measured 4.41 both ways at 63%. */
const L_MAX = 60;

export type PageTheme = {
  /** the panel background: saturated, mid-lightness */
  base: string;
  /** a deeper shade of the same hue, for the second panel on the page */
  deep: string;
  /** a light tint, for chips and rules */
  soft: string;
  /** the raw hue, if a caller wants to build its own shade */
  hue: number;
  /** the page's lightness step, 50-63 */
  lightness: number;
  /** which ink this background can carry, measured not guessed */
  ink: "light" | "dark";
};

/** WCAG relative luminance of an HSL triple */
function luminance(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const [r, g, b] = [f(0), f(8), f(4)].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * @param group  layer id or solution group id
 * @param index  the page's position within that group
 * @param total  how many pages the group holds (so they spread evenly)
 */
export function pageTheme(group: string, index: number, total: number): PageTheme {
  const centre = GROUP_HUE[group] ?? FALLBACK_HUE;
  // spread evenly across the window; a lone page sits dead centre
  const t = total <= 1 ? 0.5 : index / (total - 1);
  const hue = Math.round(centre + (t - 0.5) * 2 * SPREAD);
  const l = Math.round(L_MIN + t * (L_MAX - L_MIN));
  /* Pick whichever ink actually wins, rather than guessing from a cutoff. A
     fixed luminance threshold put two mid-blues on dark ink at 4.32:1 when
     white would have cleared it. Measure both, take the better. */
  const bg = luminance(hue, 72, l);
  const INK_DARK = 0.0074; // --ink-deep #0d0b16
  const vsWhite = 1.05 / (bg + 0.05);
  const vsDark = (bg + 0.05) / (INK_DARK + 0.05);
  const ink = vsWhite >= vsDark ? "light" : "dark";
  return {
    base: `hsl(${hue} 72% ${l}%)`,
    deep: `hsl(${hue} 62% ${l - 12}%)`,
    soft: `hsl(${hue} 78% 96%)`,
    hue,
    lightness: l,
    ink,
  };
}
