/* Nav link integrity.
 *
 * The brief has to be reflected "100% accurate", and the catalog is now big
 * enough (25 products, 14 solutions, 6 layer anchors) that a mistyped slug is
 * easy to miss by eye. This asserts every href the navigation renders resolves
 * to a real route or a real anchor id.
 *
 *   node scripts/check-nav-links.mjs
 *
 * Exits non-zero on the first broken link, so it can gate a build.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const read = (p) => readFileSync(p, "utf8");
const all = (re, s) => [...s.matchAll(re)].map((m) => m[1]);

/* ---------------------------------------------------------------- routes */
const productSlugs = new Set([
  ...all(/"slug":\s*"([a-z0-9-]+)"/g, read("lib/products.ts")),
  ...all(/slug:\s*"([a-z0-9-]+)"/g, read("lib/product-pages.ts")),
]);
const content = read("lib/content.ts");
const solutionsBlock = content.slice(
  content.indexOf("export const solutions:"),
  content.indexOf("export function getSolution"),
);
const solutionSlugs = new Set(all(/slug:\s*"([a-z0-9-]+)"/g, solutionsBlock));

const staticRoutes = new Set();
const walk = (dir, base = "") => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) {
      if (e.startsWith("[")) continue;
      walk(p, `${base}/${e}`);
    } else if (e === "page.tsx") staticRoutes.add(base || "/");
  }
};
walk("app");

/* --------------------------------------------------------------- anchors */
// id="foo" plus the dynamic id={l.id} / id={g.id} grids, whose ids are the layer ids
const anchors = new Set();
const layerIds = all(/^\s*id: "([a-z0-9-]+)",$/gm, read("lib/platform-nav.ts"));
for (const dir of ["app", "components"]) {
  const files = [];
  const w = (d) => {
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      if (statSync(p).isDirectory()) w(p);
      else if (e.endsWith(".tsx")) files.push(p);
    }
  };
  w(dir);
  for (const f of files) {
    const src = read(f);
    for (const id of all(/\bid="([a-zA-Z0-9-]+)"/g, src)) anchors.add(id);
    // Sections rendered from a data array — <div id={s.id}> fed by a local
    // SECTIONS/… const (e.g. /science) or by the layer list (e.g. /platform).
    if (/id=\{[a-z]\.id\}/.test(src)) {
      for (const id of all(/id:\s*"([a-zA-Z0-9-]+)"/g, src)) anchors.add(id);
      for (const id of layerIds) anchors.add(id);
    }
  }
}
// science/resources/about section ids come from data arrays
for (const id of all(/id:\s*"([a-z0-9-]+)"/g, content)) anchors.add(id);

/* ------------------------------------------------- collect the nav hrefs */
const navSources = {
  "platform-nav.ts (modules)": all(
    /slug: "([a-z0-9-]+)"/g,
    read("lib/platform-nav.ts"),
  ).map((s) => `/platform/${s}`),
  "platform-nav.ts (layers)": layerIds.map((id) => `/platform#${id}`),
  "content.ts (nav hrefs)": all(/href:\s*"([^"]+)"/g, content),
  "content.ts (solutionsNav)": all(/slug:\s*"([a-z0-9-]+)"/g, solutionsBlock).map(
    (s) => `/solutions/${s}`,
  ),
  "SiteHeader.tsx": all(/href=\{?"([^"{}]+)"/g, read("components/SiteHeader.tsx")),
  "SiteFooter.tsx": all(/href:\s*"([^"]+)"|href="([^"]+)"/g, read("components/SiteFooter.tsx")),
  "ProductV2.tsx": all(/href=\{?"([^"{}]+)"/g, read("components/ProductV2.tsx")),
  "MobileTabBar.tsx": all(/href="([^"]+)"/g, read("components/MobileTabBar.tsx")),
};

/* ------------------------------------------------------------- validate */
let broken = 0;
let checked = 0;
for (const [source, hrefs] of Object.entries(navSources)) {
  for (const href of new Set(hrefs.filter(Boolean))) {
    if (!href.startsWith("/")) continue; // external / mailto
    checked++;
    const [path, hash] = href.split("#");
    let ok;
    if (path === "" || path === "/") ok = true;
    else if (path.startsWith("/platform/")) ok = productSlugs.has(path.slice(10));
    else if (path.startsWith("/solutions/")) ok = solutionSlugs.has(path.slice(11));
    else ok = staticRoutes.has(path.replace(/\/$/, ""));

    if (ok && hash) ok = anchors.has(hash);
    if (!ok) {
      console.error(`  ✗ ${href}   (from ${source})`);
      broken++;
    }
  }
}

console.log(
  `\nchecked ${checked} nav links — ${productSlugs.size} product routes, ` +
    `${solutionSlugs.size} solution routes, ${staticRoutes.size} static routes, ${anchors.size} anchors`,
);
if (broken) {
  console.error(`\n${broken} broken nav link(s)\n`);
  process.exit(1);
}
console.log("all nav links resolve ✓\n");
