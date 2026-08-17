import { StoryArt, archetypeFor, PLATE, type Archetype } from "./StoryArt";

/* ============================================================================
   ProductShot — the lead visual on a product page, and the preview in the
   desktop Platform mega menu.

   These were screenshots: first captures of the app build, then real Figma
   designs. The site no longer shows product UI, so each product now leads with
   the illustration for the kind of thing it is, framed in the same browser
   chrome so the section still reads as "here is the product".

   The label under the chrome is the capability, not a file name, and it is
   what decides the archetype.
   ========================================================================== */

export type ShotInfo = { label: string; archetype?: Archetype };

/** product slug → what its lead visual is called */
export const PRODUCT_SHOTS: Record<string, ShotInfo> = {
  "employee-communication": { label: "Campaigns" },
  "employee-experience": { label: "Moments that matter" },
  "employee-wellbeing-culture": { label: "Early-warning alerts" },
  "recognition-rewards": { label: "Wall of fame" },
  "people-analytics": { label: "Driver heatmap" },
  "sentiment-intelligence": { label: "Sentiment" },
  "benchmark-intelligence": { label: "Trend vs benchmark" },
  "executive-reports": { label: "Analytics · Export" },
  "leadership-intelligence": { label: "Manager hub" },
  "engagement-surveys": { label: "Surveys" },
  "employee-listening": { label: "Always-on listening" },
  "feedback-intelligence": { label: "Theme clusters" },
  "action-planning": { label: "Action impact" },
  "ai-employee-chat": { label: "Ask Vadal" },
  "tasks-workflow": { label: "Cases" },
  "decision-intelligence-copilot": { label: "Grounded answers" },
  "ai-workforce-assistant": { label: "Daily brief" },
  "pulse-surveys": { label: "Pulse" },
  "lifecycle-surveys": { label: "Surveys" },
  "predictive-enps": { label: "Analytics" },
  "confidential-feedback": { label: "Always-on listening" },
  "security-compliance": { label: "Roles & permissions" },
  "workforce-intelligence": { label: "Analytics" },
};

export function ProductShot({
  shot,
  className = "",
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
        <div className="aspect-[16/10]" style={{ background: PLATE }}>
          <StoryArt screen={shot.label} archetype={shot.archetype} />
        </div>
      </div>
    </figure>
  );
}
