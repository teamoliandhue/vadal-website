import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* A production build and `next dev` both write to .next by default, so
     running one while the other is up wipes the chunks the browser is asking
     for: the dev server survives, but every open tab starts 500ing until it is
     restarted. Verification builds set NEXT_DIST_DIR so they land somewhere
     else and leave a running dev server completely alone. */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Pin the workspace root to this project (a stray lockfile exists in $HOME).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
