import type { IconName } from "./content";

/* ============================================================================
   Mobile platform layers — the compact product catalog for phones.

   Straight from the founder's "Mobile-First Website Brief": the desktop
   mega-menu is far too heavy for a phone, so the catalog becomes five
   accordion layers. Each layer carries a value-prop line and a list of
   collapsed modules with a short benefit hook; tapping a module reveals its
   four benefit lines. Everything is collapsed by default to minimise scroll.

   "Enterprise AI Platform is placed last and collapsed — it serves
   IT/procurement, not first-time visitors."
   ========================================================================== */

export type LayerModule = {
  name: string;
  /** short benefit hook shown on the collapsed row */
  hook: string;
  /** up to four "what customers get" lines */
  lines: string[];
  /** product page, when one exists */
  slug?: string;
  /** flagged NEW in the brief */
  isNew?: boolean;
};

export type PlatformLayer = {
  id: string;
  name: string;
  /** the layer's value-prop line */
  lede: string;
  icon: IconName;
  modules: LayerModule[];
};

export const platformLayers: PlatformLayer[] = [
  {
    id: "workforce-experience",
    name: "Workforce Experience",
    lede: "Connect, engage and retain your people.",
    icon: "heart",
    modules: [
      {
        name: "Employee Communication",
        hook: "Reach everyone, instantly",
        slug: "employee-communication",
        lines: [
          "Personalized Communication, right message, right person, right time.",
          "Two-Way Engagement, conversations and campaigns, not one-way broadcasts.",
          "Intelligent Collaboration, communities, directories and knowledge sharing.",
          "Communication Intelligence, see what was read, understood and acted on.",
        ],
      },
      {
        name: "Employee Experience",
        hook: "Every moment matters",
        slug: "employee-experience",
        lines: [
          "Personalized Journeys, experiences tailored to each employee, hire to retire.",
          "Moments That Matter, auto-recognize promotions, milestones and life events.",
          "Unified Employee Hub, one place for people, policies, tasks and resources.",
          "Experience Intelligence, measure and fix friction at every touchpoint.",
        ],
      },
      {
        name: "Employee Wellbeing & Culture",
        hook: "Spot burnout early",
        slug: "employee-wellbeing-culture",
        lines: [
          "Early Burnout Detection, catch risk before an employee resigns.",
          "Personalized Support, the right resource at the right moment.",
          "Culture Programs, wellbeing challenges and values, delivered at scale.",
          "Manager Coaching, AI guidance to support at-risk teams.",
        ],
      },
      {
        name: "Recognition & Rewards",
        hook: "Make people feel valued",
        slug: "recognition-rewards",
        lines: [
          "AI-Suggested Moments, never miss a win worth recognizing.",
          "Peer-to-Peer Recognition, everyone recognizes, not just managers.",
          "Personalized Rewards, redeem for rewards employees actually want.",
          "Recognition Intelligence, track frequency, equity and impact.",
        ],
      },
    ],
  },
  {
    id: "engagement-listening",
    name: "Employee Engagement & Listening",
    lede: "Listen daily. Act fast. Keep talent.",
    icon: "chat",
    modules: [
      {
        name: "Continuous Employee Listening",
        hook: "Listen every day",
        slug: "employee-listening",
        lines: [
          "Always-On Listening, capture employee voice continuously across channels.",
          "Lifecycle Listening, the right check-in at every stage, onboarding to exit.",
          "Real-Time Signals, emerging issues surface as they happen.",
          "Unified Voice, all feedback in one connected stream.",
        ],
      },
      {
        name: "Engagement Surveys",
        hook: "Sentiment matters",
        slug: "engagement-surveys",
        lines: [
          "Adaptive Surveys, AI personalizes timing, length and questions.",
          "Omnichannel Reach, email, SMS, WhatsApp, Teams, Slack and QR reach everyone.",
          "AI Feedback Analysis, themes and sentiment surfaced from open text.",
          "Connected Actions, feedback becomes assigned, tracked action plans.",
        ],
      },
    ],
  },
  {
    id: "digital-workplace",
    name: "Digital Workplace",
    lede: "Work, learn and grow, on the move.",
    icon: "spark",
    modules: [
      {
        name: "AI Employee Chat",
        hook: "Answers, 24/7",
        lines: [
          "Always-On Assistant, instant answers to HR and IT questions, any time.",
          "Automated Resolution, routine queries handled without a human.",
          "Smart Escalation, complex cases routed with full context.",
          "Grounded Answers, replies from your real policies, not guesswork.",
        ],
      },
      {
        name: "Mobile & E-Learning",
        hook: "Learn on the go",
        lines: [
          "Mobile-First Learning, bite-sized learning on any phone, anywhere.",
          "Microlearning & Gamification, short, engaging paths that get completed.",
          "AI Recommendations, learning matched to role and skill gaps.",
          "Progress & Compliance, real-time completion and readiness tracking.",
        ],
      },
      {
        name: "Case Management, Tasks & Workflow",
        hook: "Get work done in flow",
        lines: [
          "Case Management, log, route and resolve employee requests in one place.",
          "Task Assignment, assign and track work to individuals, teams or locations.",
          "Workflow Automation, automate approvals, checklists and routine processes.",
          "Manager Oversight, see what's done, pending or overdue at a glance.",
        ],
      },
    ],
  },
  {
    id: "talent-intelligence",
    name: "Talent Intelligence",
    lede: "Onboard, retain, develop and keep key talent.",
    icon: "rocket",
    modules: [
      {
        name: "Pre- & Onboarding",
        hook: "Productive from day one",
        slug: "pre-onboarding",
        lines: [
          "Pre-Boarding Engagement, keep new hires engaged before they start.",
          "Personalized Onboarding, journeys tailored by role, location and level.",
          "Automated Admin, documents and compliance handled without chasing.",
          "Manager Visibility, track onboarding health in real time.",
        ],
      },
      {
        name: "Alumni Management",
        hook: "Stay connected after goodbye",
        slug: "alumni-management",
        isNew: true,
        lines: [
          "Lifelong Portal Access, departing employees keep an account and exit documents.",
          "Exit & Document Hub, certificates, references and paperwork in one place.",
          "Employer Branding & Boomerang Hiring, post jobs and news, rehire proven alumni.",
          "Alumni Network & Revenue, a community that drives referrals and new revenue.",
        ],
      },
    ],
  },
  {
    // brief: placed last and collapsed — serves IT/procurement, not first-time visitors
    id: "enterprise-ai",
    name: "Enterprise AI Platform",
    lede: "Secure, connected, enterprise-ready AI.",
    icon: "shield",
    modules: [
      {
        name: "Enterprise Integrations",
        hook: "Connects to your stack",
        lines: [
          "Pre-Built Connectors, SSO, Workday, SAP, Teams, Slack and more, out of the box.",
          "Automatic Data Sync, employee data stays current with no manual work.",
          "Open API, extend to custom and niche systems.",
          "Low-Maintenance, managed, resilient integrations that don't burden IT.",
        ],
      },
      {
        name: "Security & Compliance",
        hook: "Enterprise-grade trust",
        lines: [
          "Enterprise Security, encryption, single sign-on and role-based access.",
          "Privacy & Data Residency, regional controls for global workforces.",
          "Compliance-Ready, aligned to major frameworks and regulations.",
          "Responsible AI, transparent, governed use of employee data.",
        ],
      },
      {
        name: "Implementation & Customer Success",
        hook: "Live faster, stay supported",
        lines: [
          "Guided Implementation, a structured, clear path to go-live.",
          "AI-Accelerated Setup, configuration and data mapping sped up by AI.",
          "Dedicated Success Partner, a named partner focused on your outcomes.",
          "Change Management, support to drive real adoption, not just deployment.",
        ],
      },
    ],
  },
];
