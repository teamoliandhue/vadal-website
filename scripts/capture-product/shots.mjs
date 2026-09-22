/* What to capture, and from where.

   `file` is the kebab-case of the screen name the content spec lists for that
   product in lib/products.ts — build-screen-manifest.mjs will only place a file
   whose name matches a listed screen, and that rule is the reason this list
   reads like the spec rather than like the app's routes.

   `tab` is the tab's visible label, clicked the way a person would. Where the
   product's own label differs from the spec's screen name, the spec was wrong
   and has been renamed to what the product actually shows. */

export const SHOTS = [
  /* ── Decision intelligence ─────────────────────────────────────── */
  { slug: "insight", file: "workforce-health-dashboard", route: "/product" },
  { slug: "insight", file: "where-the-risk-is", route: "/product", tab: "Risk" },
  { slug: "insight", file: "succession-intelligence", route: "/product", tab: "Succession" },
  { slug: "insight", file: "ai-insight-summary-panel", route: "/product", tab: "Recommendations" },
  { slug: "insight", file: "manager-team-view", route: "/product", tab: "Managers" },
  { slug: "insight", file: "driver-level-heatmap", route: "/product/analytics" },

  { slug: "nudge", file: "assistant-home-daily-brief", route: "/product/for-you" },

  /* ── Engagement & listening ────────────────────────────────────── */
  { slug: "pulse", file: "real-time-response-dashboard", route: "/product/pulse" },
  { slug: "pulse", file: "survey-builder-and-template-library", route: "/product/pulse", tab: "Surveys" },
  { slug: "pulse", file: "ai-feedback-theme-analysis", route: "/product/pulse", tab: "Results" },

  { slug: "listen", file: "continuous-listening-dashboard", route: "/product/listen" },
  { slug: "listen", file: "channel-coverage-view", route: "/product/listen", tab: "Coverage" },
  { slug: "listen", file: "real-time-signal-feed", route: "/product/listen", tab: "Voice" },

  { slug: "sentiment-intelligence", file: "sentiment-trend-dashboard", route: "/product/sentiment" },

  /* ── Workforce experience ──────────────────────────────────────── */
  { slug: "social", file: "the-feed", route: "/product/social" },
  { slug: "social", file: "communities", route: "/product/social/groups" },
  { slug: "amplify", file: "share-studio", route: "/product/amplify" },
  { slug: "kudos", file: "recognition-feed-wall-of-fame", route: "/product/kudos" },
  { slug: "ithrive", file: "wellbeing-risk-dashboard", route: "/product/ithrive" },

  /* ── Digital workplace ─────────────────────────────────────────── */
  { slug: "smartwork", file: "employee-chat-interface", route: "/product/smartwork" },
  { slug: "smartwork", file: "escalation-and-ticketing-view", route: "/product/smartwork", tab: "My requests" },
  { slug: "smartwork", file: "query-resolution-dashboard", route: "/product/smartwork", tab: "Desk" },

  { slug: "ilearn", file: "training-progress-and-compliance-dashboard", route: "/product/ilearn" },

  { slug: "flow", file: "case-inbox", route: "/product/flow", tab: "Cases" },
  { slug: "flow", file: "task-dashboard", route: "/product/flow", tab: "Tasks" },
  { slug: "flow", file: "automations-and-rules", route: "/product/flow", tab: "Automations" },
  { slug: "flow", file: "manager-oversight-panel", route: "/product/flow", tab: "SLA" },

  /* ── Talent intelligence ───────────────────────────────────────── */
  { slug: "onboard", file: "pre-boarding-candidate-portal", route: "/product/onboard" },
  { slug: "onboard", file: "onboarding-journey-timeline", route: "/product/onboard", tab: "First 90 days" },
  { slug: "onboard", file: "document-collection-workflow", route: "/product/onboard", tab: "Admin" },

  { slug: "alumni", file: "alumni-network-directory", route: "/product/alumni" },
  { slug: "alumni", file: "exit-and-document-hub", route: "/product/alumni", tab: "Exit documents" },
  { slug: "alumni", file: "boomerang-candidate-pipeline", route: "/product/alumni", tab: "Coming back" },

  /* ── Enterprise AI platform ────────────────────────────────────── */
  { slug: "link", file: "integration-directory", route: "/product/link" },
  { slug: "link", file: "data-sync-status-dashboard", route: "/product/link", tab: "Sync" },
  { slug: "link", file: "the-workforce-record", route: "/product/link", tab: "The record" },
  { slug: "link", file: "api-and-webhook-management", route: "/product/link", tab: "API" },

  { slug: "trust", file: "security-controls-dashboard", route: "/product/trust" },
  { slug: "trust", file: "privacy-controls-panel", route: "/product/trust", tab: "Privacy" },
  { slug: "trust", file: "ai-governance-and-transparency-panel", route: "/product/trust", tab: "Responsible AI" },
  { slug: "trust", file: "role-based-access-management", route: "/product/trust", tab: "The record" },

  { slug: "launch", file: "implementation-roadmap-view", route: "/product/launch" },
  { slug: "launch", file: "adoption-dashboard", route: "/product/launch", tab: "Adoption" },
  { slug: "launch", file: "value-against-the-baseline", route: "/product/launch", tab: "Value" },
];
