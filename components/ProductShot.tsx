/* ============================================================================
   ProductShot — real screenshots of the Vadal.ai product (vadal.vercel.app),
   captured from the live build and framed in the site's browser chrome.
   Each product page shows its actual screen; products whose module isn't
   built yet fall back to the hand-drawn JSX mocks.

   Regenerate with the Playwright script (scratchpad/shots/capture-shots.mjs):
   1440×900 @2x, reduced motion, 3.5s settle → sharp → 1600w webp.
   ========================================================================== */

export type ShotInfo = { file: string; label: string };

/** product slug → real screen from the app build */
export const PRODUCT_SHOTS: Record<string, ShotInfo> = {
  // Workforce Experience
  "employee-communication": { file: "campaigns", label: "Campaigns" },
  "employee-experience": { file: "feed", label: "Company feed" },
  "employee-wellbeing-culture": { file: "home", label: "Mood & wellbeing check-in" },
  "recognition-rewards": { file: "recognition", label: "Recognition" },
  // Workforce Intelligence
  "people-analytics": { file: "analytics", label: "Analytics" },
  "sentiment-intelligence": { file: "sentiment", label: "Sentiment" },
  "benchmark-intelligence": { file: "analytics", label: "Trend vs benchmark" },
  "executive-reports": { file: "analytics", label: "Analytics · Export" },
  // Talent Intelligence
  "leadership-intelligence": { file: "managers", label: "Manager hub" },
  // Engagement & Listening
  "engagement-surveys": { file: "surveys", label: "Surveys" },
  "employee-listening": { file: "listening", label: "Always-on listening" },
  "feedback-intelligence": { file: "cases", label: "Cases" },
  "action-planning": { file: "managers", label: "Manager hub · Actions" },
  // Digital Workplace
  "ai-employee-chat": { file: "knowledge", label: "Knowledge & Ask Vadal" },
  "tasks-workflow": { file: "cases", label: "Cases & workflows" },
  // Enterprise AI Platform
  "decision-intelligence-copilot": { file: "home", label: "AI briefing & Ask Vadal" },
  "ai-workforce-assistant": { file: "home", label: "Your day, with Vadal AI" },
  // Survey types (legacy template)
  "pulse-surveys": { file: "pulse", label: "Pulse" },
  "lifecycle-surveys": { file: "surveys", label: "Surveys" },
  "predictive-enps": { file: "analytics", label: "Analytics" },
  "confidential-feedback": { file: "listening", label: "Always-on listening" },
  "workforce-intelligence": { file: "analytics", label: "Analytics" },
};

export function ProductShot({
  shot,
  className = "",
  priority = false,
}: {
  shot: ShotInfo;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`w-full max-w-[620px] ${className}`}>
      <div className="overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lg)]">
        {/* browser chrome — matches the DashboardMock frame */}
        <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--surface)] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f66151]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f5c211]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#33d17a]" />
          </span>
          <span className="mx-auto flex items-center gap-1.5 rounded-full bg-[var(--card)] px-3.5 py-1 text-[11px] font-semibold text-[var(--muted)]">
            <svg width="9" height="10" viewBox="0 0 10 11" fill="none" aria-hidden="true">
              <rect x="1" y="4.5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M3 4.5V3a2 2 0 1 1 4 0v1.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            app.vadal.ai · {shot.label}
          </span>
        </div>
        <img
          src={`/product/${shot.file}.webp`}
          alt={`The ${shot.label} screen in the Vadal.ai product`}
          width={1600}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          className="block h-auto w-full"
        />
      </div>
    </figure>
  );
}
