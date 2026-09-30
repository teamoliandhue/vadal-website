import type { IconName } from "./content";

/* ============================================================================
   Platform taxonomy — THE single source of truth for the product catalog.

   The product's own nine, in the product's own order, taken from its tour
   (`apps/product/src/lib/tour.ts`): Listen · Social · Amplify · iThrive ·
   Broadcast · iLearn · iCare · Managers · Flow — "nine HR products, one AI
   that acts". Each layer's lede and description are that pillar's own title
   and meaning, verbatim. Nudge is the assistant running through all of them;
   Platform is what IT and procurement ask about.

   Module names are the product's own names, so the website and the platform
   say the same words: a customer who sees "Kudos" here opens Kudos in the app.
   Onboard and Alumni sit under Managers, and SmartWork under Flow, because
   that is where the product's own navigation groups them.

   Everything that renders the catalog derives from this file — the desktop
   mega menu, the mobile module menu, /platform, the footer, the homepage
   accordion and search. Add a module HERE and every surface picks it up.

   Three exports:
   - `platformLayers`   the catalog: 6 layers / 16 modules → menus, grid, footer
   - `landingLayers`    the homepage accordion's IA
   - `platformModules`  every module flattened, with its layer and href

   Layer ids are used as /platform#<id> anchors, so they are stable strings.
   They are the pillar names now; the previous six (`workforce-experience`,
   `ai-engagement`, `digital-workplace`, `talent-intelligence`,
   `enterprise-platform`, `decision-intelligence`) no longer exist.
   ========================================================================== */

export type PlatformModule = {
  name: string;
  /** short, outcome-led benefit hook — menus */
  hook: string;
  /** fuller sentence — the /platform portfolio cards */
  blurb?: string;
  /** product page → /platform/<slug> */
  slug?: string;
  /** flagged NEW in the catalog */
  isNew?: boolean;
  /** the module's four capabilities, exactly as the platform names them */
  lines?: string[];
  /** part of the homepage accordion IA */
  landing?: boolean;
  /** glyph for the desktop mega's module rows */
  icon: IconName;
};

export type PlatformLayer = {
  id: string;
  name: string;
  /** the product's own plain descriptor for the pillar (tour.ts `short`) —
      what a visitor who has never heard "iThrive" reads to know what it is */
  short: string;
  /** the layer's value-prop line — menus */
  lede: string;
  /** fuller paragraph — the /platform portfolio sections */
  description?: string;
  icon: IconName;
  modules: PlatformModule[];
};

export const platformLayers: PlatformLayer[] = [
  {
    id: "listen",
    name: "Listen",
    short: "Pulse surveys & sentiment",
    lede: "Hear how people really feel.",
    description:
      "Surveys, check-ins and comments become one health score \u2014 with every input shown.",
    icon: "pulse",
    modules: [
      {
        name: "Insight",
        icon: "chart",
        hook: "See risk early",
        slug: "insight",
        blurb:
          "Workforce analytics with attrition risk, succession readiness and recommendations, explained well enough to act on.",
        landing: true,
        lines: [
          "Workforce Analytics, engagement, attrition and productivity in one place.",
          "Risk Intelligence, the teams and people at risk, while there is time.",
          "Succession Intelligence, who is ready, who is nearly ready, where the gaps are.",
          "Recommendations, the next move, with the data behind it.",
        ],
      },
      {
        name: "Pulse",
        icon: "pulse",
        hook: "Ask, read, act",
        slug: "pulse",
        blurb:
          "Adaptive surveys on the channel each person answers on, results you can read by team, and follow-ups people hear back about.",
        landing: true,
        lines: [
          "Adaptive Surveys, people only get the questions their answers make worth asking.",
          "Omnichannel Surveys, app, email, WhatsApp, SMS and QR, in their language.",
          "Sentiment Analysis, the mix behind every score, and which way it is moving.",
          "Action Plans, a fix with an owner and a date, and a 'you said, we did' when it lands.",
        ],
      },
      {
        name: "Sentiment",
        icon: "pulse",
        hook: "What people mean, not just what they said",
        slug: "sentiment",
        blurb:
          "Themes that say whether they are getting better or worse, mood by team, and the fix in one step.",
        landing: true,
        lines: [
          "Theme Direction, whether a theme is improving or worsening, not just louder.",
          "The Split, every theme carries its mix of positive and negative, and how it is shifting.",
          "Mood By Team, a net score and its drivers, with small teams withheld rather than estimated.",
          "Theme To Fix, turn a theme into an action without leaving the page.",
        ],
      },
      {
        name: "Listen",
        icon: "bell",
        hook: "Hear it as it happens",
        slug: "listen",
        blurb:
          "Always-on listening across every channel and every stage, read as themes rather than as individuals.",
        landing: true,
        lines: [
          "Always-On Listening, employee voice captured continuously, not once a year.",
          "Lifecycle Listening, the right check-in from onboarding to exit.",
          "Real-Time Signals, emerging issues surface as they happen.",
          "Voice Analytics, themes, drivers and tone read from what people wrote.",
        ],
      },
      {
        name: "Explore",
        icon: "chart",
        hook: "Slice it any way you need",
        slug: "explore",
        blurb:
          "Driver-level analysis across team, tenure, site and manager, with the anonymity floor applied everywhere.",
        lines: [
          "Driver Heatmaps, engagement by team and tenure in one grid.",
          "Cohort Comparison, compare sites, functions and managers on the same scale.",
          "Trend Depth, six months of history behind every number.",
          "Safe By Default, no slice below five responses is ever shown.",
        ],
      },
    ],
  },
  {
    id: "social",
    name: "Social",
    short: "Feed & kudos",
    lede: "A feed where people share wins.",
    description:
      "Post, celebrate, recognise. Tied to your values, visible to everyone.",
    icon: "chat",
    modules: [
      {
        name: "Social",
        icon: "users",
        hook: "Everyone in the conversation",
        slug: "social",
        blurb:
          "One enterprise feed for news, wins and questions, with AI help to write the post and translation so everyone reads it in their own language.",
        landing: true,
        lines: [
          "Communication, company news that reaches the frontline, not just the inbox.",
          "Communities, spaces for teams, sites and interests to talk in their own words.",
          "Collaboration, posts, replies and polls that turn announcements into conversations.",
          "Knowledge Sharing, questions answered once, marked as the answer, findable after.",
        ],
      },
      {
        name: "Kudos",
        icon: "rocket",
        hook: "Make good work seen",
        slug: "kudos",
        blurb:
          "Peer recognition and rewards people care about, with the analytics that show whether praise is reaching everyone or the same few names.",
        landing: true,
        lines: [
          "Peer Recognition, everyone recognises, not only managers.",
          "Rewards, points and rewards employees actually want to redeem.",
          "Recognition Analytics, frequency, reach and impact in one view.",
          "Recognition Equity, see who is never recognised, and fix it.",
        ],
      },
    ],
  },
  {
    id: "amplify",
    name: "Amplify",
    short: "Employee advocacy",
    lede: "Your moments, shared outside.",
    description:
      "Vadal drafts your wins in your voice. You choose what goes out.",
    icon: "globe",
    modules: [
      {
        name: "Amplify",
        icon: "broadcast",
        hook: "Your people, your reach",
        slug: "amplify",
        blurb:
          "Employees share company news and their own wins in their own words \u2014 with a preview of the post, and reach, applications and hires traced back to the share.",
        landing: true,
        lines: [
          "Employee Advocacy, the company's news carried by the people who work here.",
          "Written As You, a draft in your own voice, yours to edit, never auto-posted.",
          "Referral Tracking, applications and hires traced to the person who shared.",
          "Reach Analytics, what each share reached beyond the company's own accounts.",
        ],
      },
    ],
  },
  {
    id: "ithrive",
    name: "iThrive",
    short: "Health & wealth",
    lede: "Health and wealth, side by side.",
    description:
      "A goal that fits your job, and money guidance right next to it.",
    icon: "heart",
    modules: [
      {
        name: "iThrive",
        icon: "heart",
        hook: "Spot burnout early",
        slug: "ithrive",
        blurb:
          "Continuous wellbeing signals, culture programmes that run at scale, and coaching for the managers who can actually change something.",
        landing: true,
        lines: [
          "Wellbeing, check-ins and support people will actually use.",
          "Burnout Detection, catch the risk while there is still time to act.",
          "Culture Programs, challenges and values delivered across every site.",
          "Manager Coaching, AI guidance for the teams that need support.",
        ],
      },
    ],
  },
  {
    id: "broadcast",
    name: "Broadcast",
    short: "Comms & policies",
    lede: "One channel everyone trusts.",
    description:
      "Announcements that get acknowledged, campaigns that report reach, and a policy library you can ask.",
    icon: "broadcast",
    modules: [
      {
        name: "Campaigns",
        icon: "broadcast",
        hook: "Interventions that move the number",
        slug: "campaigns",
        blurb:
          "Wellness weeks, 1:1 sprints and recognition pushes with a plan, a channel mix and an honest measure of lift.",
        landing: true,
        lines: [
          "Ready Plans, wellness weeks, 1:1 sprints, recognition pushes, burnout resets.",
          "Channel Mix, feed, Teams and WhatsApp, with a weekly send limit per team.",
          "Honest Lift, the campaign's own effect, separated from what moved anyway.",
          "Run It Again, what worked, what did not, and the version worth repeating.",
        ],
      },
      {
        name: "Knowledge",
        icon: "compass",
        hook: "Answers with their source",
        slug: "knowledge",
        blurb:
          "A policy library anyone can ask, answers that cite the document, and the gaps found from real questions.",
        landing: true,
        lines: [
          "Ask The Library, plain questions, answers grounded in your own documents.",
          "Cited Answers, the source shown every time, so an answer can be checked.",
          "Gap Detection, questions nobody could answer become the next article.",
          "Staleness Warnings, a policy past its review date says so before it is quoted.",
        ],
      },
    ],
  },
  {
    id: "ilearn",
    name: "iLearn",
    short: "Micro-learning",
    lede: "Learning in five minutes.",
    description:
      "Short lessons, quick quizzes, and reminders for what you keep missing.",
    icon: "graduation",
    modules: [
      {
        name: "iLearn",
        icon: "graduation",
        hook: "Learning that fits a shift",
        slug: "ilearn",
        blurb:
          "Microlearning and gamified paths built for a phone and a ten-minute break, recommended by AI and tracked for compliance.",
        landing: true,
        lines: [
          "Microlearning, short lessons that fit between tasks.",
          "Gamified Learning, streaks, points and teams that keep people coming back.",
          "AI Recommendations, the next lesson chosen for the role and the gap.",
          "Compliance Tracking, who has completed what, ready for an audit.",
        ],
      },
    ],
  },
  {
    id: "icare",
    name: "iCare",
    short: "Private support",
    lede: "A private door to support.",
    description:
      "Talk it through confidentially. A real person is always one tap away.",
    icon: "lifebuoy",
    modules: [
      {
        name: "iCare",
        icon: "heart",
        hook: "A private door to support",
        slug: "icare",
        blurb:
          "Talk it through confidentially with a companion that keeps nothing, and reach a real person in one tap.",
        landing: true,
        lines: [
          "Confidential Companion, talk it through; the conversation is deleted, nothing kept.",
          "One Tap To A Person, a real counsellor is always one tap away.",
          "For Someone Else, help a colleague you are worried about.",
          "What Tends To Help, short, practical steps for the moment you are in.",
        ],
      },
    ],
  },
  {
    id: "managers",
    name: "Managers",
    short: "Manager tools",
    lede: "Insight managers act on.",
    description:
      "Team health, what is driving it, and the one action to take this week.",
    icon: "users",
    modules: [
      {
        name: "Manager hub",
        icon: "users",
        hook: "The one action this week",
        slug: "manager-hub",
        blurb:
          "Team health, what is driving it, and a prioritised queue \u2014 never an individual's words with their name on them.",
        landing: true,
        lines: [
          "Team Health, the score and the drivers behind it, for your team only.",
          "Action Queue, what to do this week, in priority order.",
          "1:1 Prep, per-report context before the conversation.",
          "Aggregate Only, the team as a whole, never a person's words with their name.",
        ],
      },
      {
        name: "Onboard",
        icon: "rocket",
        hook: "Ready on day one",
        slug: "onboard",
        blurb:
          "Preboarding that starts before the first day, a personalised first 90 days, and the admin handled without anyone chasing it.",
        landing: true,
        lines: [
          "Preboarding, engaged from offer to first day.",
          "Personalized Onboarding, a first 90 days shaped by role and site.",
          "Automated Admin, documents, accounts and equipment without the chasing.",
          "Manager Visibility, managers see how their new joiner is settling in.",
        ],
      },
      {
        name: "Alumni",
        icon: "globe",
        hook: "Leavers stay reachable",
        slug: "alumni",
        blurb:
          "An alumni network that keeps good leavers close \u2014 exit documents in one place, boomerang hiring and referrals that keep paying back.",
        landing: true,
        lines: [
          "Alumni Network, a directory and feed that people stay in.",
          "Exit Documents, payslips, letters and certificates, self-serve.",
          "Boomerang Hiring, the people who already know you, back in the pipeline.",
          "Employee Referrals, referrals from alumni, tracked to the hire.",
        ],
      },
    ],
  },
  {
    id: "flow",
    name: "Flow",
    short: "Issue resolution",
    lede: "Nothing raised gets lost.",
    description:
      "Concerns become cases \u2014 owned, timed, and resolved.",
    icon: "checks",
    modules: [
      {
        name: "Flow",
        icon: "checks",
        hook: "Nothing falls through",
        slug: "flow",
        blurb:
          "Cases, tasks and approvals with an owner, automation for the repetitive parts, and SLAs you can actually report on.",
        landing: true,
        lines: [
          "Case Management, every request tracked from raised to resolved.",
          "Task Management, work assigned, visible and chased automatically.",
          "Workflow Automation, approvals and handovers that run themselves.",
          "SLA Analytics, response and resolution times by team and case type.",
        ],
      },
      {
        name: "SmartWork",
        icon: "chat",
        hook: "Answers, not tickets",
        slug: "smartwork",
        blurb:
          "HR questions answered from your own policies, resolved automatically where they can be and escalated to a person where they should be.",
        landing: true,
        lines: [
          "HR Queries, answered instantly, day or night, in any language.",
          "Automated Resolution, routine requests handled end to end.",
          "Smart Escalation, the cases that need a human reach one, with context.",
          "Policy Answers, grounded in your documents, with the source shown.",
        ],
      },
    ],
  },
  {
    id: "nudge",
    name: "Nudge",
    short: "The AI layer",
    lede: "One assistant. It can act.",
    description:
      "Ask, draft, launch a pulse, give kudos. It confirms before anything reaches a person.",
    icon: "spark",
    modules: [
      {
        name: "Nudge",
        icon: "spark",
        hook: "The next right thing",
        slug: "nudge",
        blurb:
          "The AI teammate: proactive alerts, manager guidance and the short list of what to do first today.",
        landing: true,
        lines: [
          "Proactive Alerts, what needs attention, before anyone goes looking.",
          "Manager Guidance, team-specific coaching prompts in plain words.",
          "Retention Nudges, act to keep the people you cannot afford to lose.",
          "Task Priorities, today's short list, ordered by what matters.",
        ],
      },
    ],
  },
  {
    id: "platform",
    name: "Platform",
    short: "Integrations, security, rollout",
    lede: "Connected, secure, live in weeks.",
    description:
      "The people record, the security posture and the rollout \u2014 the part IT and procurement ask about.",
    icon: "plug",
    modules: [
      {
        name: "Link",
        icon: "plug",
        hook: "One workforce record",
        slug: "link",
        blurb:
          "HR integrations, two-way sync and an open API, so every module reads the same data and nobody maintains a spreadsheet.",
        landing: true,
        lines: [
          "HR Integrations, your HRIS, payroll, identity and collaboration tools.",
          "Data Sync, people, teams and roles kept current both ways.",
          "Open API, build on the platform with documented endpoints and webhooks.",
          "Unified Data, one workforce record behind every module and report.",
        ],
      },
      {
        name: "Trust",
        icon: "lock",
        hook: "Safe to say anything",
        slug: "trust",
        blurb:
          "Security, privacy controls and responsible AI, including the anonymity floor that keeps small teams unidentifiable.",
        landing: true,
        lines: [
          "Data Security, encryption, single sign-on and role-based access.",
          "Privacy Controls, anonymity thresholds and regional data residency.",
          "Compliance, aligned to the frameworks your buyers ask about.",
          "Responsible AI, governed use of employee data, with the reasoning shown.",
        ],
      },
      {
        name: "Launch",
        icon: "rocket",
        hook: "Live, then proven",
        slug: "launch",
        blurb:
          "Guided implementation, change management that drives real adoption, a named success partner and ROI tracked from week one.",
        landing: true,
        lines: [
          "Guided Implementation, a clear path to go-live with dates.",
          "Change Management, launch and adoption support, not just deployment.",
          "Success Partner, one named partner accountable for your outcomes.",
          "ROI Tracking, the value measured against the baseline you started from.",
        ],
      },
    ],
  },
];

export const landingLayers: PlatformLayer[] = platformLayers.map((l) => ({
  ...l,
  modules: l.modules.filter((m) => m.landing),
}));

/** Every module that has its own page, flattened in layer order. */
export const platformModules: (PlatformModule & { layerId: string; layerName: string; href: string })[] =
  platformLayers.flatMap((l) =>
    l.modules
      .filter((m) => m.slug)
      .map((m) => ({ ...m, layerId: l.id, layerName: l.name, href: `/platform/${m.slug}` })),
  );
