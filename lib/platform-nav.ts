import type { IconName } from "./content";

/* ============================================================================
   Platform taxonomy — THE single source of truth for the product catalog.

   Six layers, sixteen modules, four capabilities each — exactly the structure
   the founders signed off (21 Sep). Module names are the product's own names,
   so the website and the platform say the same words: a customer who sees
   "Kudos" here opens Kudos in the app.

   Everything that renders the catalog derives from this file — the desktop
   mega menu, the mobile module menu, /platform, the footer, the homepage
   accordion and search. Add a module HERE and every surface picks it up.

   Three exports:
   - `platformLayers`   the catalog: 6 layers / 16 modules → menus, grid, footer
   - `landingLayers`    the homepage accordion's IA
   - `platformModules`  every module flattened, with its layer and href

   Layer ids are used as /platform#<id> anchors, so they are stable strings —
   `decision-intelligence` replaced `workforce-intelligence` when that layer
   was renamed.
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
  /** the layer's value-prop line — menus */
  lede: string;
  /** fuller paragraph — the /platform portfolio sections */
  description?: string;
  icon: IconName;
  modules: PlatformModule[];
};

export const platformLayers: PlatformLayer[] = [
  {
    id: "workforce-experience",
    name: "Workforce Experience",
    lede: "Connect, engage and retain your people.",
    description:
      "The day-to-day experience of working here: the feed people actually open, the journey from first day to last, the wellbeing signals that arrive early, and recognition that reaches everyone.",
    icon: "heart",
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
        name: "Amplify",
        icon: "broadcast",
        hook: "Your people, your reach",
        slug: "amplify",
        blurb:
          "Employees share company news and their own wins in their own words — with a preview of the post, and reach, applications and hires traced back to the share.",
        landing: true,
        lines: [
          "Employee Advocacy, the company's news carried by the people who work here.",
          "Written As You, a draft in your own voice, yours to edit, never auto-posted.",
          "Referral Tracking, applications and hires traced to the person who shared.",
          "Reach Analytics, what each share reached beyond the company's own accounts.",
        ],
      },
      {
        name: "Journey",
        icon: "compass",
        hook: "Every moment matters",
        slug: "journey",
        blurb:
          "One hub for people, policies and tasks, with an experience tailored to where each person is in their time with you.",
        landing: true,
        lines: [
          "Employee Hub, one place for people, policies, tasks and resources.",
          "Moments That Matter, promotions, milestones and life events recognised automatically.",
          "Personalized Journeys, the right step at the right stage, hire to retire.",
          "Experience Analytics, measure and fix friction at every touchpoint.",
        ],
      },
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
    id: "ai-engagement",
    name: "Employee Engagement & Listening",
    lede: "Listen daily. Act fast. Keep talent.",
    description:
      "Hear what people are saying between surveys, ask the right question at the right moment, and finish the loop by telling them what changed.",
    icon: "chat",
    modules: [
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
    ],
  },
  {
    id: "digital-workplace",
    name: "Digital Workplace",
    lede: "Answers, learning and work that flows.",
    description:
      "The everyday machinery: HR questions answered from your own policies, learning that fits a shift, and cases and tasks that never fall through.",
    icon: "rocket",
    modules: [
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
    ],
  },
  {
    id: "talent-intelligence",
    name: "Talent Intelligence",
    lede: "From first day to alumni.",
    description:
      "Start people well and keep the relationship after they leave — the two ends of the lifecycle that most systems ignore.",
    icon: "compass",
    modules: [
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
          "An alumni network that keeps good leavers close — exit documents in one place, boomerang hiring and referrals that keep paying back.",
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
    id: "enterprise-platform",
    name: "Enterprise AI Platform",
    lede: "Connected, secure, live in weeks.",
    description:
      "The foundation every module sits on: one workforce record, security and privacy people can trust, and an implementation that reaches go-live.",
    icon: "shield",
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
        icon: "lifebuoy",
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
  {
    id: "decision-intelligence",
    name: "Decision Intelligence",
    lede: "Know what is coming, and what to do.",
    description:
      "Where the whole platform adds up: analytics that show risk early, and an assistant that tells each person the next right thing to do.",
    icon: "chart",
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
        name: "Nudge",
        icon: "spark",
        hook: "The next right thing",
        slug: "nudge",
        blurb:
          "The AI teammate: proactive alerts, manager guidance and the short list of what to do first today.",
        isNew: true,
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
];

/* The homepage accordion renders the same catalog, layer by layer. */
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
