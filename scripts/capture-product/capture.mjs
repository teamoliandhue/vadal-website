#!/usr/bin/env node
/* ============================================================================
   Capture real product screens for the marketing site.

   The 84 screens under public/product/screens that came out of screen-gen are
   faithful mocks of a product that now exists. This script replaces them, for
   the modules that are built, with the actual running app — same delivery size
   (1600 wide webp), same light theme, so a module page shows the screen a buyer
   will meet rather than a drawing of it.

   It drives the product at http://localhost:3005 with puppeteer-core and the
   system Chrome: seeds a demo session in localStorage, opens the route, clicks
   the named tab if there is one, hides the floating AI dock and any toast (they
   are live UI, not part of the screen), then shoots the viewport at 2x and lets
   cwebp resample to 1600.

   Run the product first:
     cd ../Vadal.ai/apps/product && npm run build && npx next start -p 3005
   Then:
     node scripts/capture-product/capture.mjs [name-filter]
   ========================================================================== */
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { SHOTS } from "./shots.mjs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.PRODUCT_URL ?? "http://localhost:3005";
/* fileURLToPath, not .pathname — this repo lives under "Claude Code" and the
   %20 in a raw pathname writes files to a literal "Claude%20Code" folder. */
const HERE = dirname(fileURLToPath(import.meta.url));
const TMP = join(HERE, "png");
const OUT = join(HERE, "..", "..", "public", "product", "screens");

/** The demo tenant's admin. Sessions in this product are client-side by design. */
const SESSION = {
  email: "priya@oliandhue.com", name: "Priya Sharma", role: "admin", tenant: "oliandhue",
  img: "/avatars/user-8.svg", team: "People", title: "People Partner",
  profile: "desk", onboarded: true, method: "sso",
};

/* Live UI that is not part of the screen: the AI dock, its proactive card, and
   any toast still on screen from a previous step. */
const HIDE_CSS = `
  [aria-label="Ask Nudge"], .ai-glow-border, [role="status"],
  .fixed.bottom-5.right-6, .fixed.bottom-\\[92px\\], .fixed.bottom-24 { display: none !important; }
`;

const only = process.argv[2];
const list = SHOTS.filter((s) => !only || `${s.slug}/${s.file}`.includes(only));

mkdirSync(TMP, { recursive: true });
console.log(`capturing ${list.length} screen(s) from ${BASE}`);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 },
  args: ["--hide-scrollbars", "--no-sandbox", "--force-color-profile=srgb"],
});

const page = await browser.newPage();

/* Seed the session once, on the product's own origin. */
await page.goto(`${BASE}/auth`, { waitUntil: "domcontentloaded" });
await page.evaluate((session) => {
  localStorage.setItem("vadal:session", JSON.stringify(session));
  localStorage.setItem("vadal:view-as", JSON.stringify("admin"));
  localStorage.setItem("vadal:theme", "light");
  localStorage.setItem("vadal:tour-done", "1");
}, SESSION);

const failed = [];
let ok = 0;

for (const shot of list) {
  const name = `${shot.slug}__${shot.file}`;
  try {
    if (shot.seed) {
      await page.evaluate((entries) => {
        for (const [k, v] of Object.entries(entries)) localStorage.setItem(k, JSON.stringify(v));
      }, shot.seed);
    }

    await page.goto(`${BASE}${shot.route}`, { waitUntil: "networkidle2", timeout: 45_000 });
    await page.evaluate((css) => {
      document.documentElement.classList.remove("dark");
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    }, HIDE_CSS);

    /* Tabs are React state, so the only honest way in is the way a person takes. */
    if (shot.tab) {
      const clicked = await page.evaluate((label) => {
        const all = [...document.querySelectorAll('nav button, [role="tab"], button')];
        /* A tab can carry a live count — "My requests · 2" — so an exact match
           first, then the same label with something appended. */
        const btn = all.find((b) => b.textContent.trim() === label)
          ?? all.find((b) => b.textContent.trim().startsWith(label));
        if (!btn) return false;
        btn.click();
        return true;
      }, shot.tab);
      if (!clicked) throw new Error(`tab "${shot.tab}" not found`);
      await new Promise((r) => setTimeout(r, 600));
    }

    /* Let the shell's entry animations settle. */
    await new Promise((r) => setTimeout(r, shot.wait ?? 900));

    const png = join(TMP, `${name}.png`);
    if (existsSync(png)) rmSync(png);
    await page.screenshot({ path: png });

    const dir = join(OUT, shot.slug);
    mkdirSync(dir, { recursive: true });
    execFileSync("cwebp", ["-quiet", "-q", "82", "-resize", "1600", "0", png, "-o", join(dir, `${shot.file}.webp`)]);
    ok += 1;
    console.log(`  ✓ ${shot.slug}/${shot.file}`);
  } catch (e) {
    failed.push(`${name}: ${e.message}`);
    console.log(`  ✗ ${shot.slug}/${shot.file} — ${e.message}`);
  }
}

await browser.close();
console.log(`\n${ok} captured, ${failed.length} failed`);
if (failed.length) {
  for (const f of failed) console.log(`  ${f}`);
  process.exit(1);
}
