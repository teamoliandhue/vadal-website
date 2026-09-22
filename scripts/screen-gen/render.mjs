/* Render screen definitions to 1600x1000 PNGs with headless Chrome, then webp.
   --force-device-scale-factor=2 gives a 3200x2000 capture that cwebp resamples
   down to 1600 — the same delivery size as the Figma exports. */
import { writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SCREENS } from "./screens.mjs";
import { SHOTS } from "../capture-product/shots.mjs";

/* Screens that now exist for real are captured from the running product by
   scripts/capture-product. A mock must never overwrite one of those, so this
   generator skips anything that list owns. */
const REAL = new Set(SHOTS.map((s) => `${s.slug}/${s.file}`));

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
/* fileURLToPath, not .pathname: this repo lives under "Claude Code", and a
   raw pathname keeps the %20 — the HTML was written to a literal "Claude%20Code"
   folder while Chrome loaded the real path and screenshotted a blank page. */
const HERE = dirname(fileURLToPath(import.meta.url));
const TMP = join(HERE, "html");
const OUT = process.argv[2] || join(HERE, "out");
const only = process.argv[3];

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

const wanted = SCREENS.filter((s) => !only || `${s.slug}/${s.file}`.includes(only));
const skipped = wanted.filter((s) => REAL.has(`${s.slug}/${s.file}`));
const list = wanted.filter((s) => !REAL.has(`${s.slug}/${s.file}`));
console.log(`rendering ${list.length} screen(s)`);
if (skipped.length) console.log(`skipping ${skipped.length} captured from the real product: ${skipped.map((s) => `${s.slug}/${s.file}`).join(", ")}`);

let ok = 0;
const failed = [];
for (const s of list) {
  const name = `${s.slug}__${s.file}`;
  const htmlPath = join(TMP, name + ".html");
  writeFileSync(htmlPath, s.html());

  const png = join(TMP, name + ".png");
  if (existsSync(png)) rmSync(png);
  try {
    execFileSync(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-sandbox",
        "--force-device-scale-factor=2",
        "--default-background-color=00000000",
        "--virtual-time-budget=4000",
        `--window-size=1600,1000`,
        `--screenshot=${png}`,
        "file://" + htmlPath,
      ],
      { stdio: "pipe", timeout: 60000 },
    );
  } catch (e) {
    /* Chrome exits non-zero on some builds even after writing the file */
  }
  if (!existsSync(png)) {
    failed.push(name);
    continue;
  }
  const dir = join(OUT, s.slug);
  mkdirSync(dir, { recursive: true });
  execFileSync("cwebp", ["-quiet", "-q", "82", "-resize", "1600", "0", png, "-o", join(dir, s.file + ".webp")]);
  ok++;
  if (ok % 10 === 0) console.log(`  ${ok}/${list.length}`);
}

console.log(`rendered ${ok}/${list.length}`);
if (failed.length) console.log("FAILED:\n  " + failed.join("\n  "));
