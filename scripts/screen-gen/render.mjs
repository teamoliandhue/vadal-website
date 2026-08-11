/* Render screen definitions to 1600x1000 PNGs with headless Chrome, then webp.
   --force-device-scale-factor=2 gives a 3200x2000 capture that cwebp resamples
   down to 1600 — the same delivery size as the Figma exports. */
import { writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { SCREENS } from "./screens.mjs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const HERE = dirname(new URL(import.meta.url).pathname);
const TMP = join(HERE, "html");
const OUT = process.argv[2] || join(HERE, "out");
const only = process.argv[3];

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

const list = SCREENS.filter((s) => !only || `${s.slug}/${s.file}`.includes(only));
console.log(`rendering ${list.length} screen(s)`);

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
