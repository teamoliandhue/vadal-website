import type { IconName } from "./content";

/* ============================================================================
   Platform taxonomy — THE single source of truth for the product catalog.

   Structure comes from the founder's "Mobile-First Website Brief": platform
   layers, each holding modules with a short benefit hook. Everything that
   renders the catalog derives from here — the desktop mega, the mobile module
   menu, the /platform grid, the footer, the homepage accordion and search.

   Before this file there were three overlapping lists (portfolioGroups,
   mobileProductNav, mobile-layers' platformLayers) that had drifted apart:
   different ids for the same layer, different labels for the same product,
   and six modules missing the slug that would link them to their own page.
   Add a product HERE and every surface picks it up.

   Two exports:
   - `platformLayers`  full catalog, 6 layers / 25 modules → menus, grid, footer
   - `landingLayers`   the brief's landing IA: its 5 layers and 16 modules that
                       carry benefit lines → the homepage mobile accordion

   Layer ids intentionally match the previous `portfolioGroups` ids, because
   /platform#<id> anchors are already live in persona-tab links and the footer.
   ========================================================================== */

export type PlatformModule = {
  name: string;
  /** short, outcome-led benefit hook — menus */
  hook: string;
  /** fuller sentence — the /platform portfolio cards */
  blurb?: string;
  /** product page, when one exists → /platform/<slug> */
  slug?: string;
  /** flagged NEW in the brief */
  isNew?: boolean;
  /** the brief's four "what customers get" lines; only its own 16 modules have them */
  lines?: string[];
  /** part of the brief's landing-page IA (drives `landingLayers`) */
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
      "Create exceptional employee experiences by connecting communication, engagement, wellbeing and recognition to improve productivity, collaboration and organizational culture.",
    icon: "heart",
    modules: [
      {
        /* Social was buried inside Employee Communication and is the module
           every employee touches daily, so it leads the layer. */
        name: "Social",
        icon: "users",
        hook: "One feed the whole company reads",
        slug: "social",
        blurb: "An enterprise feed with must-read confirmation, accepted answers, communities and translation.",
        landing: true,
        lines: [
          "Six ways to read, For you, Latest, Popular, Must read, Questions and Saved.",
          "Must-read posts, confirmed by the people who read them.",
          "Questions with an accepted answer, so nobody asks twice.",
          "Communities and translation, one conversation across teams and languages.",
        ],
      },
      {
        /* A shipped module that had no presence on the site at all. */
        name: "Amplify",
        icon: "rocket",
        hook: "Your people carry the message",
        slug: "amplify",
        blurb: "Employee advocacy in your people's own words, with reach traced through to applications and hires.",
        landing: true,
        lines: [
          "Their own words, a suggested angle rather than a mandated caption.",
          "Live preview, see the post exactly as the network will render it.",
          "Company news and personal wins, from the same place.",
          "Reach to hires, advocacy measured where it matters.",
        ],
      },
      {
        name: "Employee Communication",
        icon: "broadcast",
        hook: "Reach everyone, instantly",
        slug: "employee-communication",
        blurb: "AI-powered announcements, targeted campaigns, digital noticeboards and multi-channel messaging.",
        landing: true,
        lines: [
          "Personalized Communication, right message, right person, right time.",
          "Two-Way Engagement, conversations and campaigns, not one-way broadcasts.",
          "Intelligent Collaboration, communities, directories and knowledge sharing.",
          "Communication Intelligence, see what was read, understood and acted on.",
        ],
      },
      {
        name: "Employee Experience",
        icon: "compass",
        hook: "Every moment matters",
        slug: "employee-experience",
        blurb: "Measure and improve every stage of the lifecycle with AI-powered listening and journey analytics.",
        landing: true,
        lines: [
          "Personalized Journeys, experiences tailored to each employee, hire to retire.",
          "Moments That Matter, auto-recognize promotions, milestones and life events.",
          "Unified Employee Hub, one place for people, policies, tasks and resources.",
          "Experience Intelligence, measure and fix friction at every touchpoint.",
        ],
      },
      {
        name: "Employee Wellbeing & Culture",
        icon: "heart",
        hook: "Spot burnout early",
        slug: "employee-wellbeing-culture",
        blurb: "Continuous listening, wellbeing assessments and recognition that foster a healthy workplace.",
        landing: true,
        lines: [
          "Early Burnout Detection, catch risk before an employee resigns.",
          "Personalized Support, the right resource at the right moment.",
          "Culture Programs, wellbeing challenges and values, delivered at scale.",
          "Manager Coaching, AI guidance to support at-risk teams.",
        ],
      },
      {
        name: "Recognition & Rewards",
        icon: "users",
        hook: "Make people feel valued",
        slug: "recognition-rewards",
        blurb: "AI-enabled peer recognition, milestone celebrations and performance-based rewards.",
        landing: true,
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
    id: "ai-engagement",
    name: "Employee Engagement & Listening",
    lede: "Listen daily. Act fast. Keep talent.",
    description:
      "Continuously listen, engage and act on employee feedback using AI-powered surveys, predictive insights and personalized action planning.",
    icon: "chat",
    modules: [
      {
        name: "Continuous Employee Listening",
        icon: "bell",
        hook: "Listen every day",
        slug: "employee-listening",
        blurb: "Multi-channel listening, surveys, portals, recognition and AI conversations.",
        landing: true,
        lines: [
          "Always-On Listening, capture employee voice continuously across channels.",
          "Lifecycle Listening, the right check-in at every stage, onboarding to exit.",
          "Real-Time Signals, emerging issues surface as they happen.",
          "Unified Voice, all feedback in one connected stream.",
        ],
      },
      {
        name: "Engagement Surveys",
        icon: "pulse",
        hook: "Sentiment matters",
        slug: "engagement-surveys",
        blurb: "AI-powered engagement, pulse and lifecycle surveys that capture meaningful feedback.",
        landing: true,
        lines: [
          "Adaptive Surveys, AI personalizes timing, length and questions.",
          "Omnichannel Reach, email, SMS, WhatsApp, Teams, Slack and QR reach everyone.",
          "AI Feedback Analysis, themes and sentiment surfaced from open text.",
          "Connected Actions, feedback becomes assigned, tracked action plans.",
        ],
      },
      { name: "Feedback Intelligence",
 icon: "chat", hook: "See what feedback means", slug: "feedback-intelligence" , blurb: "AI that organizes and prioritizes feedback into recurring themes and actions." },
      { name: "Action Planning",
 icon: "checks", hook: "Feedback becomes action", slug: "action-planning" , blurb: "AI-generated action plans with ownership tracking and progress monitoring." },
    ],
  },
  {
    id: "digital-workplace",
    name: "Digital Workplace",
    lede: "Work, learn and grow, on the move.",
    description:
      "Empower employees with an intelligent digital workplace that simplifies communication, collaboration, learning and everyday work through AI-powered experiences.",
    icon: "spark",
    modules: [
      {
        name: "AI Employee Chat",
        icon: "spark",
        hook: "Answers, 24/7",
        slug: "ai-employee-chat",
        blurb: "An intelligent assistant for HR support, policy guidance and knowledge discovery.",
        landing: true,
        lines: [
          "Always-On Assistant, instant answers to HR and IT questions, any time.",
          "Automated Resolution, routine queries handled without a human.",
          "Smart Escalation, complex cases routed with full context.",
          "Grounded Answers, replies from your real policies, not guesswork.",
        ],
      },
      {
        name: "Mobile & E-Learning",
        icon: "graduation",
        hook: "Learn on the go",
        slug: "mobile-e-learning",
        blurb: "Mobile-first learning journeys, microlearning and AI content recommendations.",
        landing: true,
        lines: [
          "Mobile-First Learning, bite-sized learning on any phone, anywhere.",
          "Microlearning & Gamification, short, engaging paths that get completed.",
          "AI Recommendations, learning matched to role and skill gaps.",
          "Progress & Compliance, real-time completion and readiness tracking.",
        ],
      },
      {
        name: "Case Management, Tasks & Workflow",
        icon: "lifebuoy",
        hook: "Get work done in flow",
        slug: "tasks-workflow",
        blurb: "Log, route and resolve requests, and digitize tasks with intelligent workflow automation.",
        landing: true,
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
    description:
      "Attract, develop and retain future-ready talent through intelligent onboarding, skills development, leadership growth and strategic workforce planning.",
    icon: "rocket",
    modules: [
      {
        name: "Pre- & Onboarding",
        icon: "rocket",
        hook: "Productive from day one",
        slug: "pre-onboarding",
        blurb: "Personalized journeys, digital documentation and AI-guided onboarding.",
        landing: true,
        lines: [
          "Pre-Boarding Engagement, keep new hires engaged before they start.",
          "Personalized Onboarding, journeys tailored by role, location and level.",
          "Automated Admin, documents and compliance handled without chasing.",
          "Manager Visibility, track onboarding health in real time.",
        ],
      },
      {
        name: "Alumni Management",
        icon: "globe",
        hook: "Stay connected after goodbye",
        slug: "alumni-management",
        blurb: "Lifelong portal access, exit documents and a boomerang pipeline of proven talent.",
        isNew: true,
        landing: true,
        lines: [
          "Lifelong Portal Access, departing employees keep an account and exit documents.",
          "Exit & Document Hub, certificates, references and paperwork in one place.",
          "Employer Branding & Boomerang Hiring, post jobs and news, rehire proven alumni.",
          "Alumni Network & Revenue, a community that drives referrals and new revenue.",
        ],
      },
      { name: "Skills Intelligence",
 icon: "palette", hook: "Map skills and gaps", slug: "skills-intelligence" , blurb: "Map capabilities, spot skill gaps and recommend personalized learning paths." },
      { name: "Leadership Intelligence",
 icon: "compass", hook: "Coach better managers", slug: "leadership-intelligence" , blurb: "Assess leadership effectiveness, strengthen succession and coach future leaders." },
      { name: "Workforce Planning",
 icon: "refresh", hook: "Plan capacity ahead", slug: "workforce-planning" , blurb: "Optimize capacity, hiring plans and org design with predictive analytics." },
    ],
  },
  {
    // Not one of the brief's five landing layers: the brief treats these as
    // "associated intelligence" woven through every module. They are real,
    // live product pages though, so they keep a home in the menus, placed last.
    id: "workforce-intelligence",
    name: "Workforce Intelligence",
    lede: "Turn workforce data into decisions.",
    description:
      "Transform workforce data into AI-powered insights that help leaders measure organizational health, predict risks and make informed business decisions.",
    icon: "chart",
    modules: [
      { name: "People Analytics",
 icon: "chart", hook: "See the whole workforce", slug: "people-analytics" , blurb: "Predictive analytics, AI dashboards and BI to uncover trends and identify risks." },
      { name: "Sentiment Intelligence",
 icon: "pulse", hook: "Read the mood", slug: "sentiment-intelligence" , blurb: "NLP-driven analysis of emotions, workplace trends and engagement drivers." },
      { name: "Benchmark Intelligence",
 icon: "chart", hook: "Compare with peers", slug: "benchmark-intelligence" , blurb: "Compare engagement and performance across units, locations and industry benchmarks." },
      { name: "Executive Reports",
 icon: "shield", hook: "Board-ready in minutes", slug: "executive-reports" , blurb: "Executive-ready dashboards, board reports and AI-powered workforce summaries." },
    ],
  },
  {
    // brief: placed last of its five and collapsed, it serves IT/procurement
    id: "enterprise-platform",
    name: "Enterprise AI Platform",
    lede: "Secure, connected, enterprise-ready AI.",
    description:
      "Deliver a secure, scalable and enterprise-ready AI platform that integrates seamlessly with existing systems while enabling intelligent automation and workforce decision-making.",
    icon: "shield",
    modules: [
      {
        name: "Enterprise Integrations",
        icon: "plug",
        hook: "Connects to your stack",
        slug: "enterprise-integrations",
        blurb: "Connect HRIS, HCM, ERP, ATS, payroll, collaboration and analytics platforms.",
        landing: true,
        lines: [
          "Pre-Built Connectors, SSO, Workday, SAP, Teams, Slack and more, out of the box.",
          "Automatic Data Sync, employee data stays current with no manual work.",
          "Open API, extend to custom and niche systems.",
          "Low-Maintenance, managed, resilient integrations that don't burden IT.",
        ],
      },
      {
        name: "Security & Compliance",
        icon: "lock",
        hook: "Enterprise-grade trust",
        slug: "security-compliance",
        blurb: "Enterprise-grade security, GDPR-ready privacy and responsible AI governance.",
        landing: true,
        lines: [
          "Enterprise Security, encryption, single sign-on and role-based access.",
          "Privacy & Data Residency, regional controls for global workforces.",
          "Compliance-Ready, aligned to major frameworks and regulations.",
          "Responsible AI, transparent, governed use of employee data.",
        ],
      },
      {
        name: "Implementation & Customer Success",
        icon: "lifebuoy",
        hook: "Live faster, stay supported",
        slug: "implementation",
        blurb: "Structured implementation, free data migration and dedicated customer success.",
        landing: true,
        lines: [
          "Guided Implementation, a structured, clear path to go-live.",
          "AI-Accelerated Setup, configuration and data mapping sped up by AI.",
          "Dedicated Success Partner, a named partner focused on your outcomes.",
          "Change Management, support to drive real adoption, not just deployment.",
        ],
      },
      {
        name: "Decision Intelligence Copilot",
        icon: "spark",
        hook: "Ask your workforce anything",
        slug: "decision-intelligence-copilot",
        blurb: "Ask workforce questions in natural language, get AI-powered predictive guidance.",
        landing: true,
        lines: [
          "Ask Anything, query your workforce in plain language.",
          "Cross-Platform Intelligence, draws on data from every module at once.",
          "Recommended Next Steps, from answer to prioritized action.",
          "Explainable Answers, shows the data behind every recommendation.",
        ],
      },
      {
        name: "AI Workforce Assistant",
        icon: "chat",
        hook: "A proactive AI teammate",
        slug: "ai-workforce-assistant",
        blurb: "A proactive AI teammate that surfaces what needs attention before anyone asks.",
        isNew: true,
        landing: true,
        lines: [
          "Proactive Nudges, surfaces what needs attention before you look.",
          "Personalized Guidance, helps each employee navigate their day.",
          "Manager Enablement, team-specific coaching prompts for managers.",
          "Cross-Product Awareness, draws on comms, tasks, learning and sentiment together.",
        ],
      },
    ],
  },
];

/* The brief's landing-page IA: its five layers, and only the modules it spells
   out with four benefit lines. The homepage accordion renders this, so the
   landing page stays exactly as briefed while the menus carry the full catalog. */
export const landingLayers: PlatformLayer[] = platformLayers
  .filter((l) => l.id !== "workforce-intelligence")
  .map((l) => ({ ...l, modules: l.modules.filter((m) => m.landing) }));

/** Every module that has its own page, flattened in layer order. */
export const platformModules: (PlatformModule & { layerId: string; layerName: string; href: string })[] =
  platformLayers.flatMap((l) =>
    l.modules
      .filter((m) => m.slug)
      .map((m) => ({ ...m, layerId: l.id, layerName: l.name, href: `/platform/${m.slug}` })),
  );
