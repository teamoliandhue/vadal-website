# Product screens — design brief

Every screen the product pages need, which page it goes on, and where on that page it appears.
Generated from the site's own content data, so it cannot drift from what the pages render.

**117 screens across 25 pages.** 6 are phone screens; the rest are desktop.
None of them exist yet. The site holds 17 product captures already, but not one of them is a screen
named below, so every frame on every product page is currently an empty placeholder.

---

## Where these appear

Each product page has two places a screen shows up:

- **§6 “Product screens”** — a gallery near the bottom of the page. Every screen listed here appears in it.
- **§5 capability deep-dives** — four large alternating blocks higher up. Each block is captioned with one
  screen name; that screen does double duty and is the more prominent of the two placements.

The “Where it appears” column tells you which. Screens marked **§5 … only** are captioned on a capability
block but are missing from the §6 list in the source document — worth capturing regardless.

## Delivery spec

| | Desktop screens | Phone screens |
|---|---|---|
| Aspect | 16:10 | portrait, any ratio |
| Pixel size | **1600 × 1000** | ~1170 × 2532 (device native is fine) |
| Format | WebP | WebP |
| Target weight | under 150 KB | under 120 KB |

1600 × 1000 matches the 17 captures already in `public/product/`, so please keep it exact — the site sets
explicit width/height on these images and a different ratio will shift the layout.

**Chrome:** don't draw a browser window, title bar or phone bezel. The site wraps every screen in its own
frame. Deliver the viewport contents only.

**Content:** use realistic but non-identifying data. No real employee names, photos, or customer logos.
Numbers should be plausible rather than flattering — these sit next to copy that avoids unverified claims.

**Naming:** the “Deliver as” column gives the exact path, e.g. `employee-wellbeing-culture/wellbeing-risk-dashboard.webp`.
Folder per page slug, kebab-cased screen name. Getting this exact matters: a screen is wired to its frame by name.

## Priority

Suggested order, since 117 is a lot:

1. **The four §5 capability screens on each page** — the largest, highest-traffic placement.
2. **Phone screens** (6 total) — the only ones that prove the mobile product exists.
3. Everything else, page by page.

If you want to sequence by traffic rather than by layer, ask the team for analytics first — this brief is
generated from content data and has no visit numbers behind it.

---
## Workforce Experience

_4 pages · 24 screens_

### Employee Communication

**Page:** `/platform/employee-communication` · **6 screens** · an existing capture (“Campaigns”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 1 | **Campaign Dashboard** | §6 gallery + §5 “Continuous Employee Engagement” | 16:10 | `employee-communication/campaign-dashboard.webp` |
| 2 | **News Feed** | §6 gallery + §5 “Intelligent Collaboration” | 16:10 | `employee-communication/news-feed.webp` |
| 3 | **Announcement Composer** | §6 gallery + §5 “Personalized Communication” | 16:10 | `employee-communication/announcement-composer.webp` |
| 4 | **Communication Analytics** | §6 gallery + §5 “Communication Intelligence” | 16:10 | `employee-communication/communication-analytics.webp` |
| 5 | **AI Communication Copilot** | §6 gallery | 16:10 | `employee-communication/ai-communication-copilot.webp` |
| 6 | **Mobile Employee App** | §6 gallery | Portrait | `employee-communication/mobile-employee-app.webp` |

### Employee Experience

**Page:** `/platform/employee-experience` · **6 screens** · an existing capture (“Company feed”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 7 | **Employee Journey Map Dashboard** | §6 gallery + §5 “Personalized Employee Journeys” | 16:10 | `employee-experience/employee-journey-map-dashboard.webp` |
| 8 | **Onboarding Portal** | §6 gallery | 16:10 | `employee-experience/onboarding-portal.webp` |
| 9 | **Employee Hub / Homepage** | §6 gallery + §5 “Unified Employee Hub” | 16:10 | `employee-experience/employee-hub-homepage.webp` |
| 10 | **Moments That Matter Feed** | §6 gallery + §5 “Moments That Matter” | 16:10 | `employee-experience/moments-that-matter-feed.webp` |
| 11 | **Experience Analytics Dashboard** | §6 gallery + §5 “Experience Intelligence” | 16:10 | `employee-experience/experience-analytics-dashboard.webp` |
| 12 | **Mobile Employee App** | §6 gallery | Portrait | `employee-experience/mobile-employee-app.webp` |

### Employee Wellbeing & Culture

**Page:** `/platform/employee-wellbeing-culture` · **6 screens** · an existing capture (“Mood & wellbeing check-in”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 13 | **Wellbeing Risk Dashboard** | §6 gallery | 16:10 | `employee-wellbeing-culture/wellbeing-risk-dashboard.webp` |
| 14 | **Burnout Early-Warning Alerts** | §6 gallery + §5 “Early Burnout Detection” | 16:10 | `employee-wellbeing-culture/burnout-early-warning-alerts.webp` |
| 15 | **Culture Pulse Survey Interface** | §6 gallery + §5 “Culture Pulse & Programs” | 16:10 | `employee-wellbeing-culture/culture-pulse-survey-interface.webp` |
| 16 | **Wellbeing Resource Hub** | §6 gallery + §5 “Personalized Wellbeing Journeys” | 16:10 | `employee-wellbeing-culture/wellbeing-resource-hub.webp` |
| 17 | **Manager Coaching Panel** | §6 gallery + §5 “Manager Wellbeing Coaching” | 16:10 | `employee-wellbeing-culture/manager-coaching-panel.webp` |
| 18 | **Mobile Wellbeing Check-in** | §6 gallery | Portrait | `employee-wellbeing-culture/mobile-wellbeing-check-in.webp` |

### Recognition & Rewards

**Page:** `/platform/recognition-rewards` · **6 screens** · an existing capture (“Recognition”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 19 | **Recognition Feed / Wall of Fame** | §6 gallery + §5 “Peer-to-Peer Recognition” | 16:10 | `recognition-rewards/recognition-feed-wall-of-fame.webp` |
| 20 | **Give Recognition Interface** | §6 gallery | 16:10 | `recognition-rewards/give-recognition-interface.webp` |
| 21 | **Rewards Catalog & Redemption** | §6 gallery + §5 “Personalized Rewards Catalog” | 16:10 | `recognition-rewards/rewards-catalog-and-redemption.webp` |
| 22 | **Manager Recognition Dashboard** | §6 gallery + §5 “AI-Suggested Recognition Moments” | 16:10 | `recognition-rewards/manager-recognition-dashboard.webp` |
| 23 | **Recognition Analytics & Equity Report** | §6 gallery + §5 “Recognition Intelligence” | 16:10 | `recognition-rewards/recognition-analytics-and-equity-report.webp` |
| 24 | **Mobile Recognition App** | §6 gallery | Portrait | `recognition-rewards/mobile-recognition-app.webp` |


## Employee Engagement & Listening

_4 pages · 18 screens_

### Engagement Surveys

**Page:** `/platform/engagement-surveys` · **6 screens** · an existing capture (“Surveys”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 25 | **Survey Builder & Template Library** | §6 gallery + §5 “Adaptive Survey Design” | 16:10 | `engagement-surveys/survey-builder-and-template-library.webp` |
| 26 | **Omnichannel Distribution Panel** | §6 gallery + §5 “Omnichannel Distribution” | 16:10 | `engagement-surveys/omnichannel-distribution-panel.webp` |
| 27 | **Omnichannel reach: email, SMS, WhatsApp, Microsoft Teams, Slack and QR, no company email required. [ADDED]** | §6 gallery | 16:10 | `engagement-surveys/omnichannel-reach-email-sms-whatsapp-microsoft-teams-slack-and-qr-no-company-email-required-added.webp` |
| 28 | **Real-Time Response Dashboard** | §6 gallery | 16:10 | `engagement-surveys/real-time-response-dashboard.webp` |
| 29 | **AI Feedback Theme Analysis** | §6 gallery + §5 “AI-Powered Feedback Analysis” | 16:10 | `engagement-surveys/ai-feedback-theme-analysis.webp` |
| 30 | **Action Plan Tracker** | §6 gallery + §5 “Connected Action Planning” | 16:10 | `engagement-surveys/action-plan-tracker.webp` |

### Continuous Employee Listening

**Page:** `/platform/employee-listening` · **4 screens** · an existing capture (“Always-on listening”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 31 | **Continuous Listening Dashboard** | §6 gallery + §5 “Unified Voice Stream” | 16:10 | `employee-listening/continuous-listening-dashboard.webp` |
| 32 | **Lifecycle Listening Timeline** | §6 gallery + §5 “Lifecycle Listening” | 16:10 | `employee-listening/lifecycle-listening-timeline.webp` |
| 33 | **Real-Time Signal Feed** | §6 gallery + §5 “Real-Time Signal Detection” | 16:10 | `employee-listening/real-time-signal-feed.webp` |
| 34 | **Channel Coverage View** | §6 gallery + §5 “Always-On Listening Channels” | 16:10 | `employee-listening/channel-coverage-view.webp` |

### Feedback Intelligence

**Page:** `/platform/feedback-intelligence` · **4 screens** · an existing capture (“Cases”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 35 | **Theme Cluster Dashboard** | §6 gallery + §5 “Automatic Theme Clustering” | 16:10 | `feedback-intelligence/theme-cluster-dashboard.webp` |
| 36 | **Sentiment Intensity Heatmap** | §6 gallery + §5 “Sentiment & Emotion Analysis” | 16:10 | `feedback-intelligence/sentiment-intensity-heatmap.webp` |
| 37 | **Priority Themes Panel** | §6 gallery + §5 “Priority Ranking” | 16:10 | `feedback-intelligence/priority-themes-panel.webp` |
| 38 | **Theme Trend-Over-Time View** | §6 gallery + §5 “Multilingual Analysis” | 16:10 | `feedback-intelligence/theme-trend-over-time-view.webp` |

### Action Planning

**Page:** `/platform/action-planning` · **4 screens** · an existing capture (“Manager hub · Actions”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 39 | **Action Plan Board (drag-and-drop)** | §6 gallery + §5 “Assigned, Trackable Action Plans” | 16:10 | `action-planning/action-plan-board-drag-and-drop.webp` |
| 40 | **AI Action Recommendation Panel** | §6 gallery + §5 “AI-Recommended Action Steps” | 16:10 | `action-planning/ai-action-recommendation-panel.webp` |
| 41 | **Manager Accountability Dashboard** | §6 gallery + §5 “Manager Accountability Loop” | 16:10 | `action-planning/manager-accountability-dashboard.webp` |
| 42 | **Action Impact Tracker** | §6 gallery + §5 “Impact Measurement” | 16:10 | `action-planning/action-impact-tracker.webp` |


## Digital Workplace

_3 pages · 12 screens_

### AI Employee Chat

**Page:** `/platform/ai-employee-chat` · **4 screens** · an existing capture (“Knowledge & Ask Vadal”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 43 | **Employee Chat Interface** | §6 gallery + §5 “Always-On Employee Assistant” | 16:10 | `ai-employee-chat/employee-chat-interface.webp` |
| 44 | **Query Resolution Dashboard** | §6 gallery + §5 “Automated Query Resolution” | 16:10 | `ai-employee-chat/query-resolution-dashboard.webp` |
| 45 | **Escalation & Ticketing View** | §6 gallery + §5 “Intelligent Escalation & Ticketing” | 16:10 | `ai-employee-chat/escalation-and-ticketing-view.webp` |
| 46 | **Knowledge Source Management** | §6 gallery + §5 “Grounded Knowledge” | 16:10 | `ai-employee-chat/knowledge-source-management.webp` |

### Case Management, Tasks & Workflow

**Page:** `/platform/tasks-workflow` · **5 screens** · an existing capture (“Cases & workflows”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 47 | **Task Dashboard** | §6 gallery + §5 “Task Assignment & Tracking” | 16:10 | `tasks-workflow/task-dashboard.webp` |
| 48 | **Workflow Builder** | §6 gallery + §5 “Workflow Automation” | 16:10 | `tasks-workflow/workflow-builder.webp` |
| 49 | **Mobile Task View** | §6 gallery + §5 “Mobile-First Task Completion” | Portrait | `tasks-workflow/mobile-task-view.webp` |
| 50 | **Manager Oversight Panel** | §6 gallery + §5 “Manager Oversight” | 16:10 | `tasks-workflow/manager-oversight-panel.webp` |
| 51 | **Case Inbox** | §5 “Case Management” only | 16:10 | `tasks-workflow/case-inbox.webp` |

### Mobile & E-Learning

**Page:** `/platform/mobile-e-learning` · **4 screens** · no existing capture

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 52 | **Mobile Learning Home** | §6 gallery + §5 “Mobile-First Learning Delivery” | Portrait | `mobile-e-learning/mobile-learning-home.webp` |
| 53 | **Learning Path Builder** | §6 gallery + §5 “Microlearning & Gamification” | 16:10 | `mobile-e-learning/learning-path-builder.webp` |
| 54 | **Learning Recommendation Feed** | §6 gallery + §5 “AI Learning Recommendations” | 16:10 | `mobile-e-learning/learning-recommendation-feed.webp` |
| 55 | **Training Progress & Compliance Dashboard** | §6 gallery + §5 “Progress & Compliance Tracking” | 16:10 | `mobile-e-learning/training-progress-and-compliance-dashboard.webp` |


## Talent Intelligence

_5 pages · 22 screens_

### Pre- & Onboarding

**Page:** `/platform/pre-onboarding` · **4 screens** · no existing capture

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 56 | **Pre-Boarding Candidate Portal** | §6 gallery + §5 “Pre-Boarding Engagement” | 16:10 | `pre-onboarding/pre-boarding-candidate-portal.webp` |
| 57 | **Onboarding Journey Timeline** | §6 gallery + §5 “Personalized Onboarding Journeys” | 16:10 | `pre-onboarding/onboarding-journey-timeline.webp` |
| 58 | **Document Collection Workflow** | §6 gallery + §5 “Automated Document & Compliance Collection” | 16:10 | `pre-onboarding/document-collection-workflow.webp` |
| 59 | **Manager Onboarding Dashboard** | §6 gallery + §5 “Manager Onboarding Dashboard” | 16:10 | `pre-onboarding/manager-onboarding-dashboard.webp` |

### Skills Intelligence

**Page:** `/platform/skills-intelligence` · **4 screens** · no existing capture

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 60 | **Organization Skills Map** | §6 gallery + §5 “AI-Powered Skills Mapping” | 16:10 | `skills-intelligence/organization-skills-map.webp` |
| 61 | **Capability Gap Dashboard** | §6 gallery + §5 “Capability Gap Analysis” | 16:10 | `skills-intelligence/capability-gap-dashboard.webp` |
| 62 | **Individual Development Path View** | §6 gallery + §5 “Personalized Development Recommendations” | 16:10 | `skills-intelligence/individual-development-path-view.webp` |
| 63 | **Skills-by-Team Heatmap** | §6 gallery + §5 “Skills Visibility Dashboard” | 16:10 | `skills-intelligence/skills-by-team-heatmap.webp` |

### Leadership Intelligence

**Page:** `/platform/leadership-intelligence` · **4 screens** · an existing capture (“Manager hub”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 64 | **Leadership Impact Dashboard** | §6 gallery + §5 “Leadership Impact Scoring” | 16:10 | `leadership-intelligence/leadership-impact-dashboard.webp` |
| 65 | **Continuous 360 Feedback Interface** | §6 gallery + §5 “Continuous 360 Feedback” | 16:10 | `leadership-intelligence/continuous-360-feedback-interface.webp` |
| 66 | **Individual Leader Development Plan** | §6 gallery + §5 “AI-Recommended Development Plans” | 16:10 | `leadership-intelligence/individual-leader-development-plan.webp` |
| 67 | **High-Potential Talent View** | §6 gallery + §5 “High-Potential Identification” | 16:10 | `leadership-intelligence/high-potential-talent-view.webp` |

### Workforce Planning

**Page:** `/platform/workforce-planning` · **4 screens** · no existing capture

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 68 | **Scenario Modeling Dashboard** | §6 gallery + §5 “Scenario Modeling” | 16:10 | `workforce-planning/scenario-modeling-dashboard.webp` |
| 69 | **Skills-Aware Headcount Plan** | §6 gallery + §5 “Skills-Aware Workforce Plans” | 16:10 | `workforce-planning/skills-aware-headcount-plan.webp` |
| 70 | **Real-Time Plan Tracking View** | §6 gallery + §5 “Living Workforce Plans” | 16:10 | `workforce-planning/real-time-plan-tracking-view.webp` |
| 71 | **HR-Finance Shared Planning Interface** | §6 gallery + §5 “HR-Finance Alignment View” | 16:10 | `workforce-planning/hr-finance-shared-planning-interface.webp` |

### Alumni Management

**Page:** `/platform/alumni-management` · **9 screens** · no existing capture

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 72 | **Alumni Portal Home** | §6 gallery | 16:10 | `alumni-management/alumni-portal-home.webp` |
| 73 | **Exit & Document Hub** | §6 gallery + §5 “Exit & Document Hub” | 16:10 | `alumni-management/exit-and-document-hub.webp` |
| 74 | **Job & News Feed for Alumni** | §6 gallery | 16:10 | `alumni-management/job-and-news-feed-for-alumni.webp` |
| 75 | **Boomerang Candidate Pipeline** | §6 gallery | 16:10 | `alumni-management/boomerang-candidate-pipeline.webp` |
| 76 | **Alumni Network Directory** | §6 gallery | 16:10 | `alumni-management/alumni-network-directory.webp` |
| 77 | **Alumni Engagement & Revenue Dashboard** | §6 gallery | 16:10 | `alumni-management/alumni-engagement-and-revenue-dashboard.webp` |
| 78 | **Alumni Portal** | §5 “Lifelong Portal Access” only | 16:10 | `alumni-management/alumni-portal.webp` |
| 79 | **Boomerang Talent Pool** | §5 “Employer Branding & Boomerang Hiring” only | 16:10 | `alumni-management/boomerang-talent-pool.webp` |
| 80 | **Alumni Network Analytics** | §5 “Alumni Network & Revenue” only | 16:10 | `alumni-management/alumni-network-analytics.webp` |


## Enterprise AI Platform

_5 pages · 20 screens_

### Enterprise Integrations

**Page:** `/platform/enterprise-integrations` · **5 screens** · no existing capture

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 81 | **Integration Directory** | §6 gallery + §5 “Pre-Built Connectors” | 16:10 | `enterprise-integrations/integration-directory.webp` |
| 82 | **Connector Configuration Panel** | §6 gallery + §5 “Low-Maintenance Architecture” | 16:10 | `enterprise-integrations/connector-configuration-panel.webp` |
| 83 | **Data Sync Status Dashboard** | §6 gallery + §5 “Automatic Data Synchronization” | 16:10 | `enterprise-integrations/data-sync-status-dashboard.webp` |
| 84 | **API & Webhook Management** | §6 gallery + §5 “Open API & Webhooks” | 16:10 | `enterprise-integrations/api-and-webhook-management.webp` |
| 85 | **SSO & Access Settings** | §5 “Single Sign-On (SSO)” only | 16:10 | `enterprise-integrations/sso-and-access-settings.webp` |

### Security & Compliance

**Page:** `/platform/security-compliance` · **4 screens** · no existing capture

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 86 | **Security Controls Dashboard** | §6 gallery + §5 “Privacy & Data Residency” | 16:10 | `security-compliance/security-controls-dashboard.webp` |
| 87 | **Role-Based Access Management** | §6 gallery + §5 “Enterprise Security” | 16:10 | `security-compliance/role-based-access-management.webp` |
| 88 | **Audit Log Viewer** | §6 gallery + §5 “Compliance Alignment” | 16:10 | `security-compliance/audit-log-viewer.webp` |
| 89 | **AI Governance & Transparency Panel** | §6 gallery + §5 “Responsible AI Governance” | 16:10 | `security-compliance/ai-governance-and-transparency-panel.webp` |

### Implementation & Customer Success

**Page:** `/platform/implementation` · **4 screens** · no existing capture

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 90 | **Implementation Roadmap View** | §6 gallery + §5 “Guided Implementation” | 16:10 | `implementation/implementation-roadmap-view.webp` |
| 91 | **Configuration & Template Library** | §6 gallery + §5 “AI-Accelerated Setup” | 16:10 | `implementation/configuration-and-template-library.webp` |
| 92 | **Adoption Dashboard** | §6 gallery + §5 “Change Management Support” | 16:10 | `implementation/adoption-dashboard.webp` |
| 93 | **Customer Success Portal** | §6 gallery + §5 “Dedicated Customer Success” | 16:10 | `implementation/customer-success-portal.webp` |

### Decision Intelligence Copilot

**Page:** `/platform/decision-intelligence-copilot` · **4 screens** · an existing capture (“AI briefing & Ask Vadal”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 94 | **Copilot Conversation Interface** | §6 gallery + §5 “Ask-Anything Interface” | 16:10 | `decision-intelligence-copilot/copilot-conversation-interface.webp` |
| 95 | **Data-Grounded Answer View** | §6 gallery + §5 “Explainable, Grounded Responses” | 16:10 | `decision-intelligence-copilot/data-grounded-answer-view.webp` |
| 96 | **Recommendation Panel** | §6 gallery + §5 “Recommended Next Steps” | 16:10 | `decision-intelligence-copilot/recommendation-panel.webp` |
| 97 | **Insight Drill-Down** | §6 gallery + §5 “Cross-Platform Intelligence” | 16:10 | `decision-intelligence-copilot/insight-drill-down.webp` |

### AI Workforce Assistant

**Page:** `/platform/ai-workforce-assistant` · **4 screens** · an existing capture (“Your day, with Vadal AI”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 98 | **Assistant Home / Daily Brief** | §6 gallery + §5 “Cross-Product Awareness” | 16:10 | `ai-workforce-assistant/assistant-home-daily-brief.webp` |
| 99 | **Proactive Nudge Feed** | §6 gallery + §5 “Proactive Nudges” | 16:10 | `ai-workforce-assistant/proactive-nudge-feed.webp` |
| 100 | **Manager Guidance Panel** | §6 gallery + §5 “Manager Enablement” | 16:10 | `ai-workforce-assistant/manager-guidance-panel.webp` |
| 101 | **Personalized Task & Info View** | §6 gallery + §5 “Personalized Employee Guidance” | 16:10 | `ai-workforce-assistant/personalized-task-and-info-view.webp` |


## Workforce Intelligence

_4 pages · 16 screens_

### People Analytics

**Page:** `/platform/people-analytics` · **4 screens** · an existing capture (“Analytics”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 102 | **Workforce Health Dashboard** | §6 gallery + §5 “Unified Workforce Dashboard” | 16:10 | `people-analytics/workforce-health-dashboard.webp` |
| 103 | **Driver-Level Heatmap** | §6 gallery + §5 “Driver-Level Analysis” | 16:10 | `people-analytics/driver-level-heatmap.webp` |
| 104 | **Manager Team View** | §6 gallery + §5 “Manager-Ready Views” | 16:10 | `people-analytics/manager-team-view.webp` |
| 105 | **AI Insight Summary Panel** | §6 gallery + §5 “AI-Generated Insight Summaries” | 16:10 | `people-analytics/ai-insight-summary-panel.webp` |

### Sentiment Intelligence

**Page:** `/platform/sentiment-intelligence` · **4 screens** · an existing capture (“Sentiment”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 106 | **Sentiment Trend Dashboard** | §6 gallery + §5 “Always-On Sentiment Tracking” | 16:10 | `sentiment-intelligence/sentiment-trend-dashboard.webp` |
| 107 | **Theme & Emotion Cluster View** | §6 gallery + §5 “AI Theme & Emotion Analysis” | 16:10 | `sentiment-intelligence/theme-and-emotion-cluster-view.webp` |
| 108 | **Attrition Risk Alert Panel** | §6 gallery + §5 “Attrition Risk Signals” | 16:10 | `sentiment-intelligence/attrition-risk-alert-panel.webp` |
| 109 | **Team-Level Sentiment Heatmap** | §6 gallery + §5 “Proactive Manager Alerts” | 16:10 | `sentiment-intelligence/team-level-sentiment-heatmap.webp` |

### Benchmark Intelligence

**Page:** `/platform/benchmark-intelligence` · **4 screens** · an existing capture (“Trend vs benchmark”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 110 | **Benchmark Comparison Dashboard** | §6 gallery + §5 “Industry & Regional Benchmarks” | 16:10 | `benchmark-intelligence/benchmark-comparison-dashboard.webp` |
| 111 | **Driver-Level Peer Gap View** | §6 gallery + §5 “Driver-Level Benchmarking” | 16:10 | `benchmark-intelligence/driver-level-peer-gap-view.webp` |
| 112 | **Industry & Region Filter Panel** | §6 gallery + §5 “Peer Gap Analysis” | 16:10 | `benchmark-intelligence/industry-and-region-filter-panel.webp` |
| 113 | **Board-Ready Benchmark Report** | §6 gallery + §5 “Board-Ready Comparisons” | 16:10 | `benchmark-intelligence/board-ready-benchmark-report.webp` |

### Executive Reports

**Page:** `/platform/executive-reports` · **4 screens** · an existing capture (“Analytics · Export”) is on this page but matches none of the names below

| # | Screen name | Where it appears | Frame | Deliver as |
|---|---|---|---|---|
| 114 | **Executive Report Builder** | §6 gallery + §5 “One-Click Executive Reports” | 16:10 | `executive-reports/executive-report-builder.webp` |
| 115 | **Board-Ready Report Template** | §6 gallery + §5 “Audience-Tailored Views” | 16:10 | `executive-reports/board-ready-report-template.webp` |
| 116 | **AI-Generated Summary Panel** | §6 gallery + §5 “AI-Written Summaries” | 16:10 | `executive-reports/ai-generated-summary-panel.webp` |
| 117 | **Report Scheduling & Distribution View** | §6 gallery + §5 “Always Up to Date” | 16:10 | `executive-reports/report-scheduling-and-distribution-view.webp` |

