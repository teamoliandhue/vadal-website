#!/usr/bin/env node
/* Copy-length standard for vadal.ai.

   One cap for the whole site would be wrong: an FAQ answer is opened
   deliberately and read, a hero lede is taken in at a glance. So the caps are
   tiered by how the copy is CONSUMED, not by where it lives.

   Run: node scripts/check-copy-length.mjs
   Exits non-zero if anything is over, so it can gate a build.
*/
import { execSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";

export const LIMITS = {
  glance: 160, // hero + section ledes — read in one pass, above the fold
  card: 140, // feature/capability/benefit card bodies — scanned in a grid
  row: 180, // deep-dive prose paired with bullets — read, but still scannable
  micro: 40, // pillars, hooks, chips, labels
  disclosure: 320, // FAQ answers — deliberately opened
};

const TMP = "scripts/.copy-probe.mts";
writeFileSync(
  TMP,
  `
import { heroV2, solutions, personaTabs, analyticsSection, feedbackSection, integrationsSection, homeFaqsV2 } from "../lib/content";
import { products } from "../lib/products";
const out: any[] = [];
const push = (tier: string, where: string, vals: (string|undefined)[]) =>
  vals.filter(Boolean).forEach((v, i) => out.push({ tier, where: where + "[" + i + "]", len: (v as string).length, text: v }));

push("glance", "hero.lede", [heroV2.lede]);
push("glance", "home.analytics.lede", [analyticsSection.lede]);
push("glance", "home.feedback.body", [feedbackSection.body]);
push("glance", "home.integrations.lede", [integrationsSection.lede]);
push("glance", "persona.lede", personaTabs.map(p => p.lede));
products.forEach(p => push("glance", "product:" + p.slug + ".heroLede", [p.heroLede]));
solutions.forEach(s => push("row", "solution:" + s.slug + ".section.body", (s.sections ?? []).map((x: any) => x.body)));
products.forEach(p => push("card", "product:" + p.slug + ".capability.body", p.capabilities.map(c => c.body)));
products.forEach(p => push("card", "product:" + p.slug + ".challenge", p.challenges));
products.forEach(p => push("micro", "product:" + p.slug + ".pillar", p.pillars));
products.forEach(p => push("disclosure", "product:" + p.slug + ".faq.a", p.faqs.map(f => f.a)));
push("disclosure", "home.faq.a", homeFaqsV2.map(f => f.a));
console.log(JSON.stringify(out));
`,
);

let rows;
try {
  const raw = execSync(`npx tsx ${TMP}`, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  rows = JSON.parse(raw.trim().split("\n").pop());
} finally {
  try { unlinkSync(TMP); } catch {}
}

const over = rows.filter((r) => r.len > LIMITS[r.tier]);
const byTier = {};
for (const r of rows) {
  byTier[r.tier] ??= { n: 0, over: 0, max: 0 };
  byTier[r.tier].n++;
  byTier[r.tier].max = Math.max(byTier[r.tier].max, r.len);
  if (r.len > LIMITS[r.tier]) byTier[r.tier].over++;
}

console.log("tier".padEnd(12), "cap".padStart(4), "count".padStart(6), "longest".padStart(8), "over".padStart(5));
for (const [t, s] of Object.entries(byTier)) {
  console.log(t.padEnd(12), String(LIMITS[t]).padStart(4), String(s.n).padStart(6), String(s.max).padStart(8), String(s.over).padStart(5));
}

if (over.length) {
  console.log(`\n${over.length} over the cap:\n`);
  for (const r of over.sort((a, b) => b.len - a.len)) {
    console.log(`  ${r.where}  ${r.len}/${LIMITS[r.tier]}`);
    console.log(`    ${r.text.slice(0, 100)}…`);
  }
  process.exit(1);
}
console.log(`\nall ${rows.length} strings within the standard ✓`);
