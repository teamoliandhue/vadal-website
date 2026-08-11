#!/usr/bin/env node
/* ============================================================================
   Build lib/product-screens.ts from whatever is in public/product/screens.

   The screens come out of the "All Pages" board in Figma, exported one frame
   per named screen and filed as <slug>/<screen-name>.webp. This script is the
   only thing that decides which file fills which slot, and it refuses to guess:
   a file is placed only when its name matches one of the screen names the
   content spec already lists for that product. Anything else is reported and
   left out.

   That rule exists because the loose version of it has bitten this repo twice
   — a substring match once put a single Recognition screenshot into five slots
   under five different captions. An unmatched file is a naming question for
   the designer, not something to resolve by picking the closest string.

   Run: node scripts/build-screen-manifest.mjs
   ========================================================================== */
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "public/product/screens";
const OUT = "lib/product-screens.ts";

/* "&" and "and" are the same word. The designer writes
   "ai-governance-and-transparency-panel"; the spec writes
   "AI Governance & Transparency Panel". Everything else is dropped. */
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z]/g, "");

const { products } = await import("../lib/products.ts");

const manifest = {};
const unmatched = [];
let placed = 0;

for (const slug of readdirSync(ROOT).sort()) {
  if (!existsSync(join(ROOT, slug)) || !readdirSync(join(ROOT, slug)).length) continue;
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    unmatched.push(`${slug}/* — no product with this slug`);
    continue;
  }
  for (const file of readdirSync(join(ROOT, slug)).sort()) {
    if (!file.endsWith(".webp")) continue;
    const screen = file.replace(/\.webp$/, "");
    const slot = (product.screens ?? []).find((s) => norm(s) === norm(screen));
    if (!slot) {
      unmatched.push(`${slug}/${screen} — no screen of that name on this page`);
      continue;
    }
    (manifest[slug] ??= {})[slot] = screen;
    placed++;
  }
}

const totalSlots = products.reduce((a, p) => a + (p.screens?.length ?? 0), 0);

const body = `/* ============================================================================
   GENERATED — do not edit by hand.
   Run: node scripts/build-screen-manifest.mjs

   Product slug → screen name (exactly as the content spec words it) → the
   basename under public/product/screens/<slug>/. A slot appears here only when
   a real exported screen depicts it; every other slot keeps its placeholder.

   ${placed} of ${totalSlots} screen slots are filled.
   ========================================================================== */

export const PRODUCT_SCREENS: Record<string, Record<string, string>> = ${JSON.stringify(
  manifest,
  null,
  2,
)};

/** the file for a named screen on a product page, or null if we don't have it */
export function screenFile(slug: string, screen: string): string | null {
  const file = PRODUCT_SCREENS[slug]?.[screen];
  return file ? \`/product/screens/\${slug}/\${file}.webp\` : null;
}
`;

writeFileSync(OUT, body);

console.log(`placed ${placed}/${totalSlots} slots across ${Object.keys(manifest).length} products`);
for (const [slug, m] of Object.entries(manifest)) {
  const p = products.find((x) => x.slug === slug);
  console.log(`  ${slug}: ${Object.keys(m).length}/${p.screens.length}`);
}
if (unmatched.length) {
  console.log(`\nnot placed (${unmatched.length}) — needs a naming decision, not a guess:`);
  unmatched.forEach((u) => console.log("  " + u));
}
console.log(`\nwrote ${OUT}`);
