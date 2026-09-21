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

  /* The 16 modules took the platform's own names (Sep 2026). Old URLs keep
     working so nothing already shared or indexed breaks. */
  async redirects() {
    return [
    { source: "/platform/employee-experience", destination: "/platform/journey", permanent: true },
    { source: "/platform/employee-wellbeing-culture", destination: "/platform/ithrive", permanent: true },
    { source: "/platform/recognition-rewards", destination: "/platform/kudos", permanent: true },
    { source: "/platform/employee-listening", destination: "/platform/listen", permanent: true },
    { source: "/platform/engagement-surveys", destination: "/platform/pulse", permanent: true },
    { source: "/platform/ai-employee-chat", destination: "/platform/smartwork", permanent: true },
    { source: "/platform/mobile-e-learning", destination: "/platform/ilearn", permanent: true },
    { source: "/platform/tasks-workflow", destination: "/platform/flow", permanent: true },
    { source: "/platform/pre-onboarding", destination: "/platform/onboard", permanent: true },
    { source: "/platform/alumni-management", destination: "/platform/alumni", permanent: true },
    { source: "/platform/enterprise-integrations", destination: "/platform/link", permanent: true },
    { source: "/platform/security-compliance", destination: "/platform/trust", permanent: true },
    { source: "/platform/implementation", destination: "/platform/launch", permanent: true },
    { source: "/platform/people-analytics", destination: "/platform/insight", permanent: true },
    { source: "/platform/ai-workforce-assistant", destination: "/platform/nudge", permanent: true },
    ];
  },
};

export default nextConfig;
