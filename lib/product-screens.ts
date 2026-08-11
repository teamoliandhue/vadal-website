/* ============================================================================
   GENERATED — do not edit by hand.
   Run: node scripts/build-screen-manifest.mjs

   Product slug → screen name (exactly as the content spec words it) → the
   basename under public/product/screens/<slug>/. A slot appears here only when
   a real exported screen depicts it; every other slot keeps its placeholder.

   27 of 112 screen slots are filled.
   ========================================================================== */

export const PRODUCT_SCREENS: Record<string, Record<string, string>> = {
  "action-planning": {
    "Action Impact Tracker": "action-impact-tracker",
    "AI Action Recommendation Panel": "ai-action-recommendation-panel"
  },
  "ai-employee-chat": {
    "Employee Chat Interface": "employee-chat-interface",
    "Query Resolution Dashboard": "query-resolution-dashboard"
  },
  "ai-workforce-assistant": {
    "Assistant Home / Daily Brief": "assistant-home-daily-brief",
    "Personalized Task & Info View": "personalized-task-and-info-view",
    "Proactive Nudge Feed": "proactive-nudge-feed"
  },
  "decision-intelligence-copilot": {
    "Copilot Conversation Interface": "copilot-conversation-interface",
    "Data-Grounded Answer View": "data-grounded-answer-view",
    "Insight Drill-Down": "insight-drill-down"
  },
  "employee-communication": {
    "Campaign Dashboard": "campaign-dashboard",
    "News Feed": "news-feed"
  },
  "employee-experience": {
    "Moments That Matter Feed": "moments-that-matter-feed"
  },
  "employee-listening": {
    "Channel Coverage View": "channel-coverage-view",
    "Continuous Listening Dashboard": "continuous-listening-dashboard"
  },
  "employee-wellbeing-culture": {
    "Burnout Early-Warning Alerts": "burnout-early-warning-alerts",
    "Culture Pulse Survey Interface": "culture-pulse-survey-interface",
    "Manager Coaching Panel": "manager-coaching-panel"
  },
  "feedback-intelligence": {
    "Theme Cluster Dashboard": "theme-cluster-dashboard",
    "Theme Trend-Over-Time View": "theme-trend-over-time-view"
  },
  "people-analytics": {
    "Driver-Level Heatmap": "driver-level-heatmap",
    "Manager Team View": "manager-team-view"
  },
  "recognition-rewards": {
    "Give Recognition Interface": "give-recognition-interface",
    "Recognition Feed / Wall of Fame": "recognition-feed-wall-of-fame"
  },
  "security-compliance": {
    "AI Governance & Transparency Panel": "ai-governance-and-transparency-panel",
    "Role-Based Access Management": "role-based-access-management"
  },
  "tasks-workflow": {
    "Manager Oversight Panel": "manager-oversight-panel"
  }
};

/** the file for a named screen on a product page, or null if we don't have it */
export function screenFile(slug: string, screen: string): string | null {
  const file = PRODUCT_SCREENS[slug]?.[screen];
  return file ? `/product/screens/${slug}/${file}.webp` : null;
}
