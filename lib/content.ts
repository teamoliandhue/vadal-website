// ============================================================================
// Vadal — site content (source of truth for crafted copy)
//
// NOTE ON PROOF DATA: The requirement spreadsheets were templated from Actimo's
// live site, so their customers, metrics, addresses and legal text are Actimo's.
// Per vadal.md §3 those are placeholders. Everything below is rewritten in
// Vadal's voice; all customers, numbers and locations are *illustrative sample
// data* (see `ILLUSTRATIVE`) to be swapped for Vadal's real proof before launch.
// ============================================================================

export const ILLUSTRATIVE =
  "Illustrative sample data, to be replaced with Vadal's verified proof before launch.";

export const site = {
  name: "Vadal.ai",
  domain: "vadal.ai",
  tagline: "The AI-powered workforce engagement & decision intelligence platform.",
  trustLine: "Trusted by HR, people and business leaders across industries",
  demoUrl: "/demo",
};

// ---------------------------------------------------------------- navigation
export type NavSolution = {
  slug: string;
  name: string;
  blurb: string; // short — used in the nav mega-menu
  detail: string; // fuller — used on the solutions panel cards
  icon: IconName;
};

export const solutionsNav: NavSolution[] = [
  {
    slug: "communication",
    name: "Employee Communication",
    blurb: "Reach every worker in seconds, comms they actually read.",
    detail:
      "Targeted news, SMS and push that land on every phone in seconds, two-way, measurable, and impossible to scroll past.",
    icon: "broadcast",
  },
  {
    slug: "mobile-learning",
    name: "Mobile & E-learning",
    blurb: "Micro-learning and training, ready any time, any place.",
    detail:
      "Bite-size training, guides and gamified courses your teams actually finish, on shift, on their own phone, any time.",
    icon: "graduation",
  },
  {
    slug: "culture-wellbeing",
    name: "Culture & Wellbeing",
    blurb: "Bring values to life and hear your people out.",
    detail:
      "Pulse surveys, recognition and a social wall that bring your values to life and give every colleague a voice that's heard.",
    icon: "heart",
  },
  {
    slug: "onboarding",
    name: "Pre- & Onboarding",
    blurb: "Get new hires performing, right from the start.",
    detail:
      "A warm welcome before day one, checklists, faces and culture, so new hires feel part of the team and perform from shift one.",
    icon: "rocket",
  },
  {
    slug: "employee-experience",
    name: "Employee Experience",
    blurb: "One 360° journey, from pre-board to offboard.",
    detail:
      "One connected journey from pre-board to offboard, every moment that matters, measured and improved across the lifecycle.",
    icon: "compass",
  },
  {
    slug: "tasks",
    name: "Productivity & Tasks",
    blurb: "From task to done, with accountability built in.",
    detail:
      "Assign, track and close tasks across every site, with reminders, ownership and proof-of-completion built right in.",
    icon: "checks",
  },
];

// v2 nav — CultureMonkey-style IA per "Header Hovering content" doc:
// Platform · Solutions · Resources · Science · Pricing (+ Login · Book a demo · search)
export const headerNav = [
  { label: "Platform", href: "/platform", mega: "platform" as const },
  { label: "Solutions", href: "/solutions", mega: "solutions" as const },
  { label: "Resources", href: "/resources", mega: "resources" as const },
  { label: "Science", href: "/science", mega: "science" as const },
  { label: "Pricing", href: "/pricing" },
];

// ------------------------------------------------------------ sample logos
// Rendered as monochrome wordmark chips, not real brand assets. ILLUSTRATIVE.
export const sampleCustomers = [
  "Northwind Retail",
  "Meridian Facilities",
  "Cobalt Finance",
  "Harbor & Co.",
  "Forge Industries",
  "Rivermark Logistics",
  "Verdant Hospitality",
  "Summit Health",
];

// ---------------------------------------------------------------- homepage
export const homeStats = [
  { value: "94%", label: "active reach in the first week of rollout" },
  { value: "3×", label: "more two-way conversations between teams" },
  { value: "28%", label: "lower first-year frontline attrition" },
  { value: "4.6/5", label: "average employee rating of their app" },
];

// (v1 `resultsStats` and `enterpriseServices` removed 2026-07-06 — their
// consumers, ResultCards and the homepage EnterprisePanel usage, were replaced
// by the v2 sections below.)

// ------------------------------------------------------------ testimonials
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  photo?: string; // real portrait
  tex?: string; // textured backdrop behind the portrait
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Vadal gave 6,000 store colleagues one place to hear from us, and a voice back. Open rates went from hoping-they-saw-the-poster to numbers we can actually plan around.",
    name: "Claire Donovan",
    role: "Director, Internal Communications",
    company: "Northwind Retail",
    initials: "CD",
    photo: "/people/t1.webp",
    tex: "/textures/stage-blue.webp",
  },
  {
    quote:
      "Onboarding used to start on day one. Now it starts the moment someone signs, a welcome, a face, a checklist on their phone. New cleaners feel part of the team before their first shift.",
    name: "Marcus Bennett",
    role: "Head of People Operations",
    company: "Meridian Facilities",
    initials: "MB",
    photo: "/people/t2.webp",
    tex: "/textures/stage-teal.webp",
  },
  {
    quote:
      "The analytics are the part leadership didn't know they were missing. We can see which depots are thriving and which need a manager conversation this week, not next quarter.",
    name: "Sarah Whitfield",
    role: "VP People & Culture",
    company: "Rivermark Logistics",
    initials: "SW",
    photo: "/people/t3.webp",
    tex: "/textures/stage-yellow.webp",
  },
  {
    quote:
      "Tasks used to live on a clipboard no one read. Now every site sees what's due, who owns it and what's done, by lunch, not by month-end. Accountability you can actually see.",
    name: "Arjun Patel",
    role: "Operations Director",
    company: "Forge Industries",
    initials: "AP",
    photo: "/people/t4.webp",
    tex: "/textures/stage-violet.webp",
  },
];

// ----------------------------------------------------------------- icons
export type IconName =
  | "broadcast"
  | "graduation"
  | "heart"
  | "rocket"
  | "compass"
  | "checks"
  | "shield"
  | "lifebuoy"
  | "palette"
  | "plug"
  | "spark"
  | "chart"
  | "chat"
  | "bell"
  | "users"
  | "pulse"
  | "play"
  | "arrow"
  | "check"
  | "globe"
  | "lock"
  | "phone"
  | "refresh";

// =========================================================================
// SOLUTIONS — full page content (Actimo proof replaced; Vadal voice)
// =========================================================================
export type SolutionSection = {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type Solution = {
  slug: string;
  name: string;
  icon: IconName;
  navBlurb: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  heroChecks: string[];
  pillars: string;
  sections: SolutionSection[];
  metrics: { value: string; label: string }[];
  testimonial: Testimonial;
  faqs: { q: string; a: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "communication",
    name: "Employee Communication",
    icon: "broadcast",
    navBlurb: "Reach every worker in seconds, comms they actually read.",
    heroEyebrow: "Employee Communication",
    heroTitle: "Communication your people actually read",
    heroLede:
      "Reach deskless and desk-based teams in seconds, let them reply, and finally know what landed. Two-way communication that keeps your whole workforce in the loop, and in the conversation.",
    heroChecks: [
      "Personalised news feed per employee",
      "SMS + mobile push for instant reach",
      "A Social Wall that unites every team",
      "Real-time open rates and read receipts",
    ],
    pillars: "Communication & Campaigns",
    sections: [
      {
        eyebrow: "Two-way by design",
        title: "Stop broadcasting. Start a conversation.",
        body:
          "Email assumes a desk and an inbox people check. Your frontline has neither. Vadal meets them on the device they always have, with snackable updates, smart reminders for what they've missed, and a tap to react, comment or send feedback straight back to leadership.",
        bullets: [
          "Target the whole org or a slice, by role, site, team or shift",
          "Snackable posts that are easy to understand and retain",
          "Peer-to-peer interaction inside social groups",
        ],
      },
      {
        eyebrow: "Insight, not guesswork",
        title: "Know what landed",
        body:
          "Every post comes with accurate, real-time open rates and engagement insight. Follow up with the people who haven't seen the safety notice yet, see which content earns attention, and get a clean overview of the feedback coming back.",
        bullets: [
          "Follow-up nudges to anyone who hasn't read a must-know update",
          "Track how content is used and engaged with across the org",
          "A seamless overview of employee feedback in one place",
        ],
      },
    ],
    metrics: [
      { value: "100%", label: "reach to every employee, desk or not" },
      { value: "3.1×", label: "higher read-through vs. email" },
      { value: "70%", label: "fewer printed notices on the floor" },
    ],
    testimonial: testimonials[0],
    faqs: [
      {
        q: "How is Vadal better than email?",
        a: "Email assumes a corporate inbox your frontline rarely opens. Vadal is built for the non-desk workforce: faster, more open, two-way communication on the phone people already carry. Leaders create engaging updates, send securely across every level, and track real-time engagement, and SMS + push reach the whole organisation within seconds.",
      },
      {
        q: "Can Vadal track and increase communication engagement?",
        a: "Yes. Vadal gives you accurate, real-time open rates and engagement insight into how every piece of internal communication is delivered and consumed, so you can prove reach and act on what isn't landing.",
      },
      {
        q: "We have many teams and locations. Can we target the right people?",
        a: "For any update you can send to the entire organisation or to specific groups based on role, seniority, team, location and more. And every employee gets a personalised news feed that only surfaces what's relevant to them.",
      },
      {
        q: "What is the Social Wall?",
        a: "The Social Wall is a single place to share messages, images, video and more with colleagues. It can unite the whole organisation, or run for a specific location, department or team, the social heartbeat of the app.",
      },
    ],
  },
  {
    slug: "mobile-learning",
    name: "Mobile & E-learning",
    icon: "graduation",
    navBlurb: "Micro-learning and training, ready any time, any place.",
    heroEyebrow: "Mobile & E-learning",
    heroTitle: "Corporate learning, made mobile-first",
    heroLede:
      "Deskless teams are on their feet, not at a screen. Build training, guides and onboarding flows from micro-learning that's ready to perform, any time, any place. And actually measure whether it worked.",
    heroChecks: [
      "Micro-learning, blended learning and gamification",
      "A simple but powerful LMS",
      "Real-time compliance and progress tracking",
      "Build a full programme in minutes",
    ],
    pillars: "Mobile & Platform Experience",
    sections: [
      {
        eyebrow: "It's mobile-first",
        title: "Training that fits the way people work",
        body:
          "To develop today's modern workforce, flexibility and accessibility are everything. Vadal turns long courses into bite-sized lessons, video, images, text, quizzes, that people can complete between shifts, on the floor, on the move.",
        bullets: [
          "Easy-to-follow learning journeys to completion",
          "Gamification and short micro-videos that get finished",
          "Onboard, upskill or reskill on any topic",
        ],
      },
      {
        eyebrow: "It's measurable",
        title: "Empower managers with oversight",
        body:
          "Real-time insight into training compliance and progress is easy to get with the right platform. Managers see their team's readiness at a glance; every employee can see their own progress and what's next.",
        bullets: [
          "Track activity to ensure readiness-to-perform",
          "Give managers visibility of team learning performance",
          "Give every employee oversight of their own journey",
        ],
      },
    ],
    metrics: [
      { value: "25%", label: "improvement in sales performance" },
      { value: "55%", label: "increase in customer satisfaction" },
      { value: "50%", label: "fewer internal support requests" },
    ],
    testimonial: {
      quote:
        "We built a huge library into Vadal, blended learning, gamification, short micro-videos, for sales, leadership and systems training. People actually finish it because it lives in their pocket.",
      name: "Thomas Larsson",
      role: "Head of Learning & Development",
      company: "Verdant Hospitality",
      initials: "TL",
    },
    faqs: [
      {
        q: "Can I track employee training and development progress?",
        a: "Yes. Managers can see their team's learning performance and compliance, and every employee can see their own progress and journey through to completion, all in real time.",
      },
      {
        q: "What kind of training can I build?",
        a: "Anything. Onboard, upskill or reskill on any topic. Mobile training is created from your own content in any structure, a skill, company values, a new process, onboarding and more, with micro-learning, video, images, text and gamification.",
      },
    ],
  },
  {
    slug: "culture-wellbeing",
    name: "Culture & Wellbeing",
    icon: "heart",
    navBlurb: "Bring values to life and hear your people out.",
    heroEyebrow: "Culture & Employee Wellbeing",
    heroTitle: "Create a culture people want to be part of",
    heroLede:
      "Culture isn't a poster in the break room. Cultivate an environment that motivates your people to perform, run initiatives, bring values to life, spark community, and genuinely hear your employees out.",
    heroChecks: [
      "Run initiatives that motivate",
      "Bring company values to life",
      "Spark community across locations",
      "Hear your employees out with pulse + eNPS",
    ],
    pillars: "Listening & Feedback · Engagement & Recognition",
    sections: [
      {
        eyebrow: "Culture affects results",
        title: "It's not a myth, workers feel it",
        body:
          "A positive work environment that breeds engagement and happiness shows up on the bottom line. But an organic culture of wellbeing takes proactivity, especially when people are spread across sites. Drive continuous, digital effort to bring people together, it pays off.",
        bullets: [
          "Listen continuously with pulse surveys and eNPS",
          "Bring dispersed teams closer, wherever they are",
          "Turn sentiment into action managers can take",
        ],
      },
      {
        eyebrow: "Make it visible",
        title: "Bring company values to life",
        body:
          "Highlight culture and values consistently across the whole employee experience, not just at the all-hands. Launch value campaigns, keep comms and training on-brand, and check whether people actually feel the alignment.",
        bullets: [
          "Friendly competition and campaigns across locations",
          "Health and sustainability initiatives, like a step challenge",
          "Survey feedback on how lived your values really are",
        ],
      },
    ],
    metrics: [
      { value: "+22", label: "average eNPS lift in the first year" },
      { value: "2.4×", label: "more recognition shared between peers" },
      { value: "89%", label: "of staff say they feel heard" },
    ],
    testimonial: {
      quote:
        "When everyone's on a different shift or a different site, connection is hard. With Vadal you can still have it, people share, celebrate and check in on each other. It's really lovely to watch.",
      name: "Rebecca Stone",
      role: "Internal Communications Coordinator",
      company: "Summit Health",
      initials: "RS",
    },
    faqs: [
      {
        q: "How does Vadal help wellbeing for a dispersed workforce?",
        a: "By making listening continuous and connection digital. Pulse surveys and eNPS surface how people really feel, communities give scattered teams a place to belong, and managers get the insight to act before small problems grow.",
      },
    ],
  },
  {
    slug: "onboarding",
    name: "Pre- & Onboarding",
    icon: "rocket",
    navBlurb: "Get new hires performing, right from the start.",
    heroEyebrow: "Pre- & Onboarding",
    heroTitle: "Onboarding that starts before day one",
    heroLede:
      "It's pre- and onboarding for new hires, made easy and engaging. Welcome people the moment they sign, get them ready to perform faster, and make the whole thing run itself.",
    heroChecks: [
      "Set up for success",
      "Make it automatic",
      "Include your team",
      "Sync to perfection",
    ],
    pillars: "Mobile & Platform Experience · Communication",
    sections: [
      {
        eyebrow: "Customizable",
        title: "An onboarding that fits your company",
        body:
          "There's no one-size-fits-all way to bring someone into a company. Tailor flows to help new hires adapt to your culture and even their specific role. Content and structure are easy to tweak, so the programme stays genuinely helpful for your business and your people.",
        bullets: [
          "Welcome staff with custom, engaging onboarding flows",
          "Prep employees with quick training before their first day",
          "Build pre-, on- or offboarding journeys for any role",
        ],
      },
      {
        eyebrow: "Make it automatic",
        title: "Set it up once, let it run",
        body:
          "Auto-run seamless onboarding from a one-time setup, and still make it feel personal. Trigger flows from start dates, keep managers and staff updated, and watch progress in real time without chasing anyone.",
        bullets: [
          "Auto-start programmes from each employee's start date",
          "Schedule a flow in minutes, completed on-the-go",
          "Measure training progress in real time",
        ],
      },
    ],
    metrics: [
      { value: "2×", label: "faster time-to-productivity" },
      { value: "25%", label: "lift in early sales performance" },
      { value: "40%", label: "higher first-year retention" },
    ],
    testimonial: {
      quote:
        "When you join us you get an invitation, a welcome message, and then Vadal guides you through the whole onboarding journey on your phone. People arrive on day one already feeling part of it.",
      name: "Thomas Byfield",
      role: "HR Business Partner",
      company: "Harbor & Co.",
      initials: "TB",
    },
    faqs: [
      {
        q: "Do you have an onboarding template we can start from?",
        a: "Yes. We're happy to share a pre-boarding template you can customise and send to new staff, an intro to the company, the team, your values and mission, plus the practical info someone needs to be ready on day one. You can also design your own flow from scratch.",
      },
    ],
  },
  {
    slug: "employee-experience",
    name: "Employee Experience",
    icon: "compass",
    navBlurb: "One 360° journey, from pre-board to offboard.",
    heroEyebrow: "Employee Experience & Journey",
    heroTitle: "One app for the whole employee journey",
    heroLede:
      "Elevate engagement and redesign the journey people take with your organisation, pre-board to offboard, in a single, on-brand, 360° platform. Fewer systems for them, far more signal for you.",
    heroChecks: [
      "Engage every step of the way",
      "Understand your people",
      "Fuel growth",
      "Your workplace, customized",
    ],
    pillars: "All seven pillars, in one experience",
    sections: [
      {
        eyebrow: "It's continuous · It's all-in-one",
        title: "Digitize the workplace people carry in their pocket",
        body:
          "Give employees easy, secure, mobile access to your company and its people, customised to the needs of a modern, dispersed organisation. One place replaces the scatter of tools nobody wanted to learn.",
        bullets: [
          "A mobile-friendly, secure home for everything that matters",
          "Customised to varying needs across teams and regions",
          "On-brand from the splash screen to the smallest label",
        ],
      },
      {
        eyebrow: "Your workplace, customized",
        title: "A journey co-piloted by your data",
        body:
          "Embark on an impactful journey co-piloted by a tailored 360° engagement platform. Drive remote culture, put benefits and information in one place, and enable both employee development and business success.",
        bullets: [
          "Drive remote culture and bring co-workers together",
          "Share employee benefits and information, all in one place",
          "Enable employee development and measurable business success",
        ],
      },
    ],
    metrics: [
      { value: "1", label: "app instead of five disconnected tools" },
      { value: "360°", label: "view of the journey, pre-board to offboard" },
      { value: "31%", label: "more employees engaged month over month" },
    ],
    testimonial: {
      quote:
        "It's important that we deliver from day one, and Vadal helps us do that. Staff are more engaged and they know more when they start, even a seasonal joiner feels part of one team. Part of one flock.",
      name: "Glen Anderson",
      role: "Director of Guest Experience",
      company: "Verdant Hospitality",
      initials: "GA",
    },
    faqs: [
      {
        q: "Our employees have too many systems, can your app simplify that?",
        a: "Yes. Vadal is a 360° employee app designed as an all-in-one home for communication, training and leadership across medium-to-large organisations. It's a one-stop-shop your people use to find information, engage with peers and give two-way feedback, so it can replace, integrate with, or link to many of the systems you run today.",
      },
      {
        q: "Does Vadal integrate with HR systems?",
        a: "Yes. Sync your HRMS, payroll and identity provider so people data flows in automatically and engagement insight flows back out, no spreadsheets, no manual upkeep.",
      },
    ],
  },
  {
    slug: "tasks",
    name: "Productivity & Tasks",
    icon: "checks",
    navBlurb: "From task to done, with accountability built in.",
    heroEyebrow: "Productivity & Operations",
    heroTitle: "Enhance productivity, one task at a time",
    heroLede:
      "Track work from creation to completion, keep teams accountable, and run operations from one secure, company-approved place, with the analytics to make data-driven decisions on the floor.",
    heroChecks: [
      "Track tasks from creation to completion",
      "Recurring tasks and clear ownership",
      "Digitised health & safety procedures",
      "Analytics for data-driven decisions",
    ],
    pillars: "Manager Enablement · Case Management",
    sections: [
      {
        eyebrow: "Creation to completion",
        title: "Keep every team organized and accountable",
        body:
          "Easily track progress and maintain accountability inside a secure, company-approved environment. Decrease downtime with assigned tasks for effective maintenance, stay compliant with analytics, and make sure nobody misses a deadline.",
        bullets: [
          "Assign tasks to an individual or a whole group",
          "Add descriptions and media to set clear expectations",
          "Set frequency to create recurring tasks automatically",
        ],
      },
      {
        eyebrow: "Operational excellence",
        title: "Streamline procedures, maximize efficiency",
        body:
          "Consolidate task-related activity into one platform so teams focus on high-priority work and time and resources are better spent. Digitise health and safety procedures, keep people informed with SMS and push, and manage everything past, present and upcoming in one place.",
        bullets: [
          "Digitise health & safety procedures and assign them out",
          "Notify teams of new tasks via SMS and push",
          "Manage past, completed and upcoming tasks centrally",
        ],
      },
    ],
    metrics: [
      { value: "37%", label: "less operational downtime" },
      { value: "100%", label: "audit trail on safety-critical tasks" },
      { value: "2.5h", label: "saved per manager, per week" },
    ],
    testimonial: {
      quote:
        "Maintenance, safety checks, daily opens, it's all in Vadal now. Nothing slips, every site is on the same page, and when an auditor asks for proof, it's two taps away.",
      name: "Daniel Okoro",
      role: "Operations Director",
      company: "Forge Industries",
      initials: "DO",
    },
    faqs: [
      {
        q: "Can tasks recur automatically?",
        a: "Yes. Adjust the frequency settings to create recurring tasks, daily opening checklists, weekly safety rounds, monthly audits, so the right work appears for the right people without anyone setting it up each time.",
      },
    ],
  },

  // ==========================================================================
  // V2 SOLUTIONS — by outcome (5) and by workforce (3), per the Solutions
  // mega-menu in Header Hovering content.docx. Same template as above.
  // ==========================================================================
  {
    slug: "employee-retention",
    name: "Employee Retention",
    icon: "heart",
    navBlurb: "Identify attrition risk early and retain top talent with data-backed actions.",
    heroEyebrow: "Solutions · Employee Retention",
    heroTitle: "Keep the people you can't afford to lose",
    heroLede:
      "Identify attrition risk early with AI-driven predictive analytics, understand exactly what's driving people out, and retain top talent with data-backed actions that land before the resignation letter does.",
    heroChecks: [
      "AI attrition-risk prediction per team",
      "Driver analysis behind every risk flag",
      "Retention playbooks for managers",
      "Regrettable-loss tracking over time",
    ],
    pillars: "Workforce Intelligence · Predictive Analytics · Action Planning",
    sections: [
      {
        eyebrow: "See it coming",
        title: "Attrition warns you, if you're listening",
        body:
          "Resignations look sudden but rarely are. Vadal.ai reads engagement trends, sentiment shifts, lifecycle signals and workload patterns to flag at-risk teams and segments weeks before the exit interview, with the contributing factors spelled out.",
        bullets: [
          "Risk flags with explainable contributing factors",
          "Team and segment heatmaps, updated continuously",
          "Early-warning alerts routed to the right manager",
        ],
      },
      {
        eyebrow: "Act on it",
        title: "From risk flag to retention play",
        body:
          "A prediction without a plan is just anxiety. Every risk flag arrives with recommended interventions, from workload rebalancing to growth conversations, assigned, tracked and re-measured so you know what actually kept people.",
        bullets: [
          "AI-recommended retention actions per driver",
          "Stay-conversation guides for managers",
          "Impact tracking against regretted attrition",
        ],
      },
    ],
    metrics: [
      { value: "6 wks", label: "average early warning before regretted exits" },
      { value: "28%", label: "lower first-year attrition" },
      { value: "22%", label: "reduction in regretted attrition overall" },
    ],
    testimonial: {
      quote:
        "We used to find out why people left in exit interviews. Now we find out six weeks earlier, while there's still time to do something. Regretted attrition is down by a fifth.",
      name: "Priya Raman",
      role: "Head of People Analytics",
      company: "Cobalt Finance",
      initials: "PR",
    },
    faqs: [
      {
        q: "How does attrition prediction work?",
        a: "AI models read patterns across engagement scores, sentiment, lifecycle feedback and behavioral signals that historically precede exits in your organization. Flags come with contributing factors and confidence levels, never a black-box score, and anonymity thresholds still apply to everything underneath.",
      },
      {
        q: "Does it predict individuals or teams?",
        a: "Risk is surfaced at team and segment level to protect privacy while still being actionable. Managers see where risk is concentrated and why, enough to have the right conversations without surveillance.",
      },
    ],
  },
  {
    slug: "manager-effectiveness",
    name: "Manager Effectiveness",
    icon: "users",
    navBlurb: "AI-powered insights and coaching recommendations for high-performing teams.",
    heroEyebrow: "Solutions · Manager Effectiveness",
    heroTitle: "Great teams are built by well-equipped managers",
    heroLede:
      "Managers drive 70% of the variance in engagement, yet most get a dashboard and a deadline. Vadal.ai gives every manager AI-powered insights, coaching recommendations and ready-to-run plays to build engaged, high-performing teams.",
    heroChecks: [
      "Team health dashboard per manager",
      "AI coaching nudges, not homework",
      "Action plans with progress tracking",
      "Manager-effectiveness scoring for HR",
    ],
    pillars: "Manager Intelligence · Coaching · Team Analytics",
    sections: [
      {
        eyebrow: "Insight for every manager",
        title: "The team, understood at a glance",
        body:
          "Each manager gets a live view of their team's engagement, sentiment and risks, translated into plain language. No analytics training required: the AI explains what changed, why it matters and what to try.",
        bullets: [
          "Team dashboards written in plain language",
          "Alerts when a trend needs attention this week",
          "Recognition prompts for wins worth celebrating",
        ],
      },
      {
        eyebrow: "Coaching at scale",
        title: "Every manager gets a copilot",
        body:
          "AI-powered recommendations turn insight into habit: 1:1 conversation guides, team plays matched to each driver, and gentle nudges that build managerial muscle over time, like having a coach on every manager's shoulder.",
        bullets: [
          "1:1 prep guides built from team signals",
          "Plays matched to each team's engagement drivers",
          "HR-level visibility of manager effectiveness",
        ],
      },
    ],
    metrics: [
      { value: "5 hrs", label: "saved per manager, every week" },
      { value: "78%", label: "of manager action plans completed" },
      { value: "+14", label: "team engagement lift under coached managers" },
    ],
    testimonial: {
      quote:
        "Our best managers were already doing this instinctively. Vadal.ai made it teachable, now every manager preps 1:1s from real signals, and team scores show it.",
      name: "Daniel Okoro",
      role: "Operations Director",
      company: "Forge Industries",
      initials: "DO",
    },
    faqs: [
      {
        q: "Will managers actually use this?",
        a: "Adoption is the design goal: insights arrive in plain language, in the flow of work, sized to five minutes. Managers don't analyze data, they get one clear signal and one suggested action at a time.",
      },
      {
        q: "Can HR see which managers need support?",
        a: "Yes. Manager-effectiveness scoring shows where teams are thriving and where a manager needs coaching or backup, so HR invests support where it changes outcomes.",
      },
    ],
  },
  {
    slug: "employee-wellbeing",
    name: "Employee Wellbeing",
    icon: "pulse",
    navBlurb: "Measure and enhance wellbeing with intelligent listening and proactive nudges.",
    heroEyebrow: "Solutions · Employee Wellbeing",
    heroTitle: "Wellbeing you can measure, improve and prove",
    heroLede:
      "Measure and enhance workplace wellbeing through intelligent listening, wellbeing assessments and proactive AI recommendations, because burnout you find in the annual survey is burnout you found too late.",
    heroChecks: [
      "Validated wellbeing assessments",
      "Burnout-risk early detection",
      "Proactive manager recommendations",
      "Wellbeing trends by team and site",
    ],
    pillars: "Continuous Listening · Wellbeing Analytics · Action Planning",
    sections: [
      {
        eyebrow: "Listen for it",
        title: "Burnout whispers before it shouts",
        body:
          "Workload spikes, sentiment dips, quiet withdrawal, the signals are there early. Vadal.ai combines wellbeing pulses with sentiment intelligence to spot rising strain at team level while it's still recoverable.",
        bullets: [
          "Wellbeing pulses on validated scales",
          "Burnout-risk flags at team level",
          "Anonymity protection that keeps answers honest",
        ],
      },
      {
        eyebrow: "Do something about it",
        title: "From wellbeing score to workplace change",
        body:
          "Wellbeing programs fail when they're generic. Vadal.ai recommends interventions matched to what's actually driving strain in each team, workload, clarity, recognition, connection, and tracks whether they help.",
        bullets: [
          "Driver-matched wellbeing interventions",
          "Recognition and connection prompts for managers",
          "Program impact measured against the baseline",
        ],
      },
    ],
    metrics: [
      { value: "-26%", label: "burnout-risk flags after six months" },
      { value: "89%", label: "of staff say they feel heard" },
      { value: "18%", label: "drop in wellbeing-related absence" },
    ],
    testimonial: {
      quote:
        "The wellbeing data finally made the case leadership needed. Two rota changes and a recognition push later, burnout flags dropped by a quarter, and absence followed.",
      name: "Rebecca Stone",
      role: "Internal Communications Coordinator",
      company: "Summit Health",
      initials: "RS",
    },
    faqs: [
      {
        q: "Is wellbeing data private?",
        a: "Strictly. Wellbeing responses carry the platform's strongest anonymity protections, thresholds, aggregation and PII masking, so individuals are never exposed. Leaders see team patterns, never personal answers.",
      },
      {
        q: "Which wellbeing dimensions do you measure?",
        a: "Validated scales covering energy and burnout risk, workload, psychological safety, connection and work-life sustainability, customizable to your organization's wellbeing framework.",
      },
    ],
  },
  {
    slug: "diversity-inclusion",
    name: "Diversity & Inclusion",
    icon: "globe",
    navBlurb: "Build an equitable culture with AI-powered DEI insights and feedback loops.",
    heroEyebrow: "Solutions · Diversity & Inclusion",
    heroTitle: "Inclusion you can hear, equity you can see",
    heroLede:
      "Build an inclusive, equitable culture with AI-powered DEI insights and continuous feedback loops, measuring belonging across every group, surfacing gaps honestly, and turning commitments into tracked, visible action.",
    heroChecks: [
      "Belonging & inclusion measurement",
      "Demographic gap analysis, privacy-safe",
      "DEI survey templates, expert-designed",
      "Action tracking on every commitment",
    ],
    pillars: "DEI Analytics · Continuous Listening · Action Planning",
    sections: [
      {
        eyebrow: "Measure honestly",
        title: "Belonging, by the numbers that matter",
        body:
          "Averages hide inequity. Vadal.ai analyzes engagement, belonging and advancement sentiment across demographic groups, with privacy thresholds that make honest answers safe, so you see the experience gaps averages smooth over.",
        bullets: [
          "Inclusion and belonging indices by group",
          "Experience-gap analysis with privacy protection",
          "Intersectional views where sample sizes allow",
        ],
      },
      {
        eyebrow: "Close the gaps",
        title: "From DEI report to lived change",
        body:
          "The credibility of DEI work lives in follow-through. Turn findings into owned commitments with deadlines and public progress, and keep listening so you know whether experience is actually changing.",
        bullets: [
          "Commitments with owners and visible progress",
          "Continuous listening on inclusion moments",
          "Year-over-year equity trend reporting",
        ],
      },
    ],
    metrics: [
      { value: "+16", label: "belonging-score lift in underrepresented groups" },
      { value: "2.1×", label: "more DEI feedback via safe channels" },
      { value: "94%", label: "of DEI commitments tracked to completion" },
    ],
    testimonial: {
      quote:
        "The gap analysis showed us belonging scores eleven points lower in one group, invisible in our averages. A year of tracked commitments later, that gap has closed to two.",
      name: "Elena Vasquez",
      role: "VP Employee Experience",
      company: "Verdant Hospitality",
      initials: "EV",
    },
    faqs: [
      {
        q: "How do you protect privacy in demographic analysis?",
        a: "Group-level views only render above configurable minimum sample sizes, intersectional cuts enforce the same thresholds, and no individual response is ever attributable. Employees can also opt out of demographic tagging entirely.",
      },
      {
        q: "Can we use our own DEI framework?",
        a: "Yes. Start from expert-designed DEI templates or bring your organization's framework, dimensions, language and reporting adapt to it.",
      },
    ],
  },
  {
    slug: "remote-hybrid",
    name: "Remote & Hybrid Work",
    icon: "compass",
    navBlurb: "Keep distributed teams connected with analytics tuned for hybrid work.",
    heroEyebrow: "Solutions · Remote & Hybrid Work",
    heroTitle: "Distance is real. Disconnection is optional.",
    heroLede:
      "Keep distributed teams connected and engaged with intelligent analytics tailored for hybrid environments, measuring connection, collaboration and belonging wherever work happens, and catching remote drift early.",
    heroChecks: [
      "Connection & belonging measurement",
      "Remote vs. office experience comparison",
      "Async-friendly listening channels",
      "Hybrid-effectiveness insights per team",
    ],
    pillars: "Hybrid Analytics · Continuous Listening · Manager Intelligence",
    sections: [
      {
        eyebrow: "See the seams",
        title: "Hybrid works, when you can see where it doesn't",
        body:
          "Proximity bias, meeting overload, quiet disconnection: hybrid's failure modes are invisible in office hallways. Vadal.ai compares experience across remote, hybrid and on-site segments so you manage the reality, not the assumption.",
        bullets: [
          "Experience comparison across work modes",
          "Connection and isolation early-warning signals",
          "Meeting-load and collaboration sentiment",
        ],
      },
      {
        eyebrow: "Design it deliberately",
        title: "From accidental hybrid to intentional",
        body:
          "The best hybrid setups are designed, not inherited. Use per-team insights to shape rituals, cadences and in-person moments that actually move connection, and verify the effect in the next pulse.",
        bullets: [
          "Team-level hybrid effectiveness insights",
          "Ritual and cadence recommendations",
          "Before/after measurement on every change",
        ],
      },
    ],
    metrics: [
      { value: "+21", label: "connection-score lift in remote teams" },
      { value: "31%", label: "less 'invisible to leadership' sentiment" },
      { value: "2.6×", label: "participation via async channels" },
    ],
    testimonial: {
      quote:
        "Remote engineers scored 18 points lower on connection, we had no idea. Deliberate rituals and manager nudges closed most of that gap in two quarters.",
      name: "Thomas Larsson",
      role: "Head of Learning & Development",
      company: "Verdant Hospitality",
      initials: "TL",
    },
    faqs: [
      {
        q: "Does this require calendar or activity surveillance?",
        a: "No. Insights come from what employees tell you, surveys, pulses and feedback, analyzed with AI. No calendar mining, no activity tracking, no screenshots. Trust is the point, not the casualty.",
      },
      {
        q: "Can we compare sites, countries and work modes?",
        a: "Yes, segment analysis covers work mode, site, country, team and tenure, all protected by the same anonymity thresholds as every other view.",
      },
    ],
  },
  {
    slug: "frontline-deskless",
    name: "Frontline & Deskless",
    icon: "phone",
    navBlurb: "Engage frontline teams via SMS, WhatsApp, QR and more, no email required.",
    heroEyebrow: "Solutions · Frontline & Deskless",
    heroTitle: "Engagement for the 80% who don't sit at a desk",
    heroLede:
      "Engage frontline teams with AI-powered insights accessible across SMS, WhatsApp, QR codes and kiosk, no email address, no corporate laptop, no app-store friction required. Every employee, actually reachable.",
    heroChecks: [
      "SMS, WhatsApp, QR & kiosk delivery",
      "No email or corporate device needed",
      "60-second mobile-first surveys",
      "150+ languages, auto-detected",
    ],
    pillars: "Multi-Channel Reach · Mobile Experience · Frontline Analytics",
    sections: [
      {
        eyebrow: "Reach them where they are",
        title: "The channel is the strategy",
        body:
          "Frontline workers don't check email, so email-first platforms measure the head office and call it the company. Vadal.ai delivers surveys and comms over SMS, WhatsApp and QR posters in the break room, meeting people on the phone already in their pocket.",
        bullets: [
          "One-tap access from SMS or WhatsApp",
          "QR posters for shared and offline workplaces",
          "Kiosk mode for shift changeovers",
        ],
      },
      {
        eyebrow: "Respect the shift",
        title: "Built for pockets, not desks",
        body:
          "Sixty-second surveys designed for standing up, auto-translated into each person's language, working on any device. Participation stops being a head-office phenomenon, and your data finally represents your workforce.",
        bullets: [
          "60-second, thumb-friendly survey design",
          "Automatic language detection per employee",
          "Voice-of-the-frontline insights for operations",
        ],
      },
    ],
    metrics: [
      { value: "86%", label: "frontline participation without email" },
      { value: "100%", label: "of the workforce reachable" },
      { value: "3.4×", label: "more frontline feedback than email-based tools" },
    ],
    testimonial: {
      quote:
        "6,000 store colleagues, no email addresses, 86% participation. The QR poster by the rota board did more for listening than five years of asking managers to cascade a link.",
      name: "Claire Donovan",
      role: "Director, Internal Communications",
      company: "Northwind Retail",
      initials: "CD",
      photo: "/people/t1.webp",
      tex: "/textures/stage-blue.webp",
    },
    faqs: [
      {
        q: "Do employees need to install an app?",
        a: "No. Surveys and feedback open instantly from an SMS link, WhatsApp message or QR scan in any mobile browser. The full employee app is there for organizations that want it, but participation never depends on it.",
      },
      {
        q: "What about employees who share devices or have none?",
        a: "QR posters and kiosk mode cover shared-device and no-device environments, a break-room tablet or a poster by the clock-in point keeps every shift included.",
      },
    ],
  },
  {
    slug: "global-multilingual",
    name: "Global & Multilingual",
    icon: "globe",
    navBlurb: "AI-powered surveys and analytics across 150+ languages and regions.",
    heroEyebrow: "Solutions · Global & Multilingual",
    heroTitle: "One listening strategy. Every language. Every region.",
    heroLede:
      "Deliver workforce insights with AI-powered surveys and analytics across 150+ languages and global regions, with culturally-aware sentiment analysis and region-ready compliance, so headquarters hears every voice equally.",
    heroChecks: [
      "150+ languages, human-quality translation",
      "Culturally-aware sentiment analysis",
      "Regional benchmarks and comparisons",
      "GDPR-ready, region-aware compliance",
    ],
    pillars: "Global Delivery · Multilingual AI · Regional Analytics",
    sections: [
      {
        eyebrow: "Every voice, native",
        title: "People are only honest in their own language",
        body:
          "Forcing feedback through English filters out nuance, and people. Vadal.ai delivers every survey in each employee's language and reads open-text responses natively, so a comment in Tamil carries the same weight as one in English.",
        bullets: [
          "Auto-translated surveys, reviewed for quality",
          "Native-language open-text analysis",
          "Cultural context in sentiment scoring",
        ],
      },
      {
        eyebrow: "Global picture, local truth",
        title: "Compare regions without flattening them",
        body:
          "Response norms differ across cultures, a 4/5 in Osaka isn't a 4/5 in Ohio. Regional benchmarks and culturally-adjusted comparisons let global leaders see real differences instead of cultural artifacts.",
        bullets: [
          "Culturally-adjusted regional benchmarks",
          "Country and region drill-downs",
          "Localized action recommendations",
        ],
      },
    ],
    metrics: [
      { value: "150+", label: "languages supported out of the box" },
      { value: "+37%", label: "participation lift outside HQ countries" },
      { value: "1", label: "listening strategy across every region" },
    ],
    testimonial: {
      quote:
        "Participation outside our HQ country jumped by a third once people could answer in their own language. The themes we found in native-language comments changed our EMEA plan entirely.",
      name: "Glen Anderson",
      role: "Director of Guest Experience",
      company: "Verdant Hospitality",
      initials: "GA",
    },
    faqs: [
      {
        q: "How good are the translations?",
        a: "Survey templates ship professionally translated; custom questions are AI-translated with an optional human review workflow for your people team. Open-text responses are analyzed in their original language, not translated first, preserving nuance.",
      },
      {
        q: "Can different regions have different compliance settings?",
        a: "Yes. Data residency options, retention policies and anonymity thresholds can be configured per region to match local regulation and works-council agreements.",
      },
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    icon: "shield",
    navBlurb: "Scale securely with enterprise-grade AI, compliance and governance.",
    heroEyebrow: "Solutions · Enterprise",
    heroTitle: "Workforce intelligence at enterprise scale",
    heroLede:
      "Scale securely across divisions, geographies and tens of thousands of employees, with enterprise-grade AI, compliance, governance and the organizational hierarchy handled properly, not approximately.",
    heroChecks: [
      "SSO, SCIM & role-based access",
      "Org hierarchies of any depth",
      "SOC 2 / ISO 27001-aligned, GDPR-ready",
      "Responsible AI governance built in",
    ],
    pillars: "Enterprise Platform · Security & Compliance · AI Governance",
    sections: [
      {
        eyebrow: "Built for org charts that breathe",
        title: "Your structure, mirrored and current",
        body:
          "Divisions, brands, matrix reporting, reorganizations mid-cycle, Vadal.ai syncs your real hierarchy from your HRIS and keeps every dashboard, permission and benchmark aligned to it automatically.",
        bullets: [
          "HRIS-synced hierarchy, reorg-safe",
          "Permissions that follow the org structure",
          "Roll-ups from team to division to enterprise",
        ],
      },
      {
        eyebrow: "Security leaders sign off on",
        title: "Enterprise-grade, provably",
        body:
          "End-to-end encryption, SSO/MFA, RBAC, audit logs, data residency options and responsible AI governance with explainable models, the checklist your CISO brings, answered before the meeting.",
        bullets: [
          "SOC 2 & ISO 27001-aligned practices, GDPR-ready",
          "Explainable AI with governance controls",
          "Dedicated CSM and 5-week guided implementation",
        ],
      },
    ],
    metrics: [
      { value: "50k+", label: "employees supported on one instance" },
      { value: "5 wks", label: "structured enterprise implementation" },
      { value: "99.9%", label: "platform availability commitment" },
    ],
    testimonial: {
      quote:
        "Security review took nine days including pen-test questions, fastest of any vendor that year. Twelve brands, four continents, one platform, and the org chart just works.",
      name: "Marcus Bennett",
      role: "Head of People Operations",
      company: "Meridian Facilities",
      initials: "MB",
      photo: "/people/t2.webp",
      tex: "/textures/stage-teal.webp",
    },
    faqs: [
      {
        q: "How does implementation work at enterprise scale?",
        a: "A structured 5-week implementation with data migration at no extra cost: kickoff and migration, HRIS and identity integration, configuration and branding, AI calibration and dashboards, then launch and enablement, led by a dedicated customer success manager who stays with you after go-live.",
      },
      {
        q: "Can different divisions run different programs?",
        a: "Yes. Divisions can run their own surveys, cadences and languages under shared governance, with enterprise-level roll-ups so leadership still sees one coherent picture.",
      },
      {
        q: "What does responsible AI governance mean in practice?",
        a: "Explainable recommendations, human-in-the-loop controls, configurable model boundaries, audit trails on AI-driven decisions and documentation your risk team can actually review.",
      },
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

// ============================================================================
// V2 — "AI-Powered Workforce Engagement & Decision Intelligence" repositioning
// Source of truth: Home page content (1).docx, Header Hovering content.docx,
// Portfolio for Vadal.docx (received 2026-07-06). Structure benchmarked against
// culturemonkey.io; copy lightly edited for grammar/consistency, not meaning.
// ============================================================================

export const heroV2 = {
  pill: "AI-Powered Workforce Engagement & Decision Intelligence",
  // H1 renders as two lines with an aurora accent on the second
  titleA: "Transform workforce experiences",
  titleB: "across the employee lifecycle",
  lede:
    "Go beyond engagement, lead with intelligence. Vadal.ai unifies workforce, talent, leadership and organizational data into AI-powered decision intelligence, so CEOs, CHROs and business leaders can predict risks, uncover opportunities and make faster, smarter decisions.",
  emailCta: "Book a Demo",
  emailCaption: "Book a free product demo call with our experts.",
  secondaryCta: "Watch product tour",
};

// ------------------------------------------------------------- persona tabs
export type PersonaTab = {
  id: string;
  tab: string;
  /** one-word chip label on the tab, e.g. "Employees" */
  short: string;
  title: string;
  /** short lede — the single lead sentence shown in the redesigned card */
  lede: string;
  body: string[];
  /** three faithful benefit highlights with icons */
  benefits: { icon: IconName; label: string }[];
  /** hero photo for the persona card */
  photo: string;
  links: { label: string; href: string }[];
  icon: IconName;
  stat: { value: string; label: string };
};

export const platformOverview = {
  eyebrow: "One intelligent platform",
  title: "The enterprise workforce engagement and decision intelligence platform",
  lede:
    "Vadal.ai unifies workforce engagement, talent, leadership and organizational intelligence into one AI-powered platform, enabling CEOs, CHROs, managers and business leaders to anticipate change, optimize performance and make confident decisions that drive lasting business impact.",
};

export const personaTabs: PersonaTab[] = [
  {
    id: "employees",
    tab: "For Employees",
    short: "Employees",
    title: "Create a workplace where every employee feels heard, valued and engaged",
    lede: "A safe, intelligent place to share feedback, celebrate wins and grow, where AI turns what you say into real change.",
    body: [
      "Employee engagement starts with trust, transparency and meaningful conversations. Vadal.ai empowers employees with a safe, intelligent platform to share feedback, celebrate achievements, access personalized growth opportunities and actively contribute to a culture of continuous improvement.",
      "Powered by AI, Vadal.ai transforms employee feedback into meaningful actions, strengthening engagement, improving wellbeing and creating exceptional employee experiences where every individual can grow and succeed.",
    ],
    benefits: [
      { icon: "chat", label: "Share feedback safely" },
      { icon: "bell", label: "Celebrate achievements" },
      { icon: "rocket", label: "Personalized growth" },
    ],
    photo: "/people/persona-employees.webp",
    links: [
      { label: "Employee Engagement & Experience", href: "/solutions/employee-experience" },
      { label: "Continuous Listening & Feedback", href: "/platform#ai-engagement" },
    ],
    icon: "heart",
    stat: { value: "89%", label: "of employees say they feel heard" },
  },
  {
    id: "managers",
    tab: "For Managers",
    short: "Managers",
    title: "Empower managers to build engaged teams and deliver exceptional performance",
    lede: "Real-time team sentiment, retention-risk signals and AI recommendations, so you can act before it's too late.",
    body: [
      "Every team has unique goals, challenges and engagement drivers. Vadal.ai equips managers with real-time engagement insights, workforce intelligence and AI-powered recommendations to understand team sentiment, recognize achievements, identify performance and retention risks, and take timely action.",
      "Transform everyday people decisions into measurable outcomes with one intelligent platform.",
    ],
    benefits: [
      { icon: "pulse", label: "Real-time team sentiment" },
      { icon: "shield", label: "Spot retention risks" },
      { icon: "spark", label: "AI recommendations" },
    ],
    photo: "/people/persona-managers.webp",
    links: [
      { label: "Manager Intelligence", href: "/platform#workforce-intelligence" },
      { label: "Engagement & Performance", href: "/solutions" },
    ],
    icon: "users",
    stat: { value: "5 hrs", label: "saved per manager, every week" },
  },
  {
    id: "hrs",
    tab: "For HRs",
    short: "HRs",
    title: "AI-powered intelligence for modern HR teams",
    lede: "Predictive workforce analytics and talent intelligence that turn HR from a support function into a strategic partner.",
    body: [
      "Transform HR from a support function into a strategic business partner. Vadal.ai gives HR leaders predictive workforce analytics, talent intelligence, leadership insights and AI-powered recommendations to improve workforce planning, employee experience, succession readiness and organizational effectiveness.",
      "Monitor workforce health, anticipate future talent needs and make confident decisions backed by real-time intelligence.",
    ],
    benefits: [
      { icon: "chart", label: "Predictive analytics" },
      { icon: "rocket", label: "Talent & succession" },
      { icon: "checks", label: "Plan with confidence" },
    ],
    photo: "/people/persona-hrs.webp",
    links: [
      { label: "Explore HR Intelligence", href: "/platform" },
      { label: "Experience the AI Copilot", href: "/platform#ai" },
    ],
    icon: "pulse",
    stat: { value: "3×", label: "faster from signal to action" },
  },
  {
    id: "chros",
    tab: "For CHROs",
    short: "CHROs",
    title: "Empower HR to drive business impact",
    lede: "Workforce, talent and leadership insight in one platform, so people decisions align with business goals.",
    body: [
      "Today's HR leaders need more than surveys and dashboards, they need intelligence that enables better decisions. Vadal.ai brings workforce, talent, leadership and organizational insights into one AI-powered platform.",
      "Predict workforce risks, optimize talent strategies, strengthen leadership and align people decisions with business goals.",
    ],
    benefits: [
      { icon: "pulse", label: "Predict workforce risks" },
      { icon: "rocket", label: "Strengthen leadership" },
      { icon: "globe", label: "Align to business goals" },
    ],
    photo: "/people/persona-chros.webp",
    links: [
      { label: "Workforce Intelligence", href: "/platform#workforce-intelligence" },
      { label: "Talent Intelligence", href: "/platform#talent-intelligence" },
    ],
    icon: "chart",
    stat: { value: "+62", label: "employee NPS after six months" },
  },
  {
    id: "company",
    tab: "For Company",
    short: "Company",
    title: "Transform employee engagement into enterprise performance",
    lede: "Engagement, workforce, talent and org analytics unified, turning people data into enterprise performance.",
    body: [
      "Employee engagement is more than a metric, it is a driver of innovation, productivity and sustainable business success. Vadal.ai unifies engagement, workforce intelligence, talent insights and organizational analytics into one intelligent platform.",
      "Measure workforce health, predict future challenges and align people strategies with business priorities, with AI-driven recommendations for every leader.",
    ],
    benefits: [
      { icon: "globe", label: "Unified people data" },
      { icon: "chart", label: "Predict challenges" },
      { icon: "spark", label: "Every leader, AI-guided" },
    ],
    photo: "/people/persona-company.webp",
    links: [
      { label: "Workforce Intelligence Platform", href: "/platform" },
      { label: "Organizational Analytics", href: "/platform#workforce-intelligence" },
    ],
    icon: "globe",
    stat: { value: "18%", label: "uplift in customer satisfaction" },
  },
];

// ------------------------------------------------------------ surveys section
export const surveysSection = {
  eyebrow: "AI-powered surveys",
  title: "AI-powered workforce intelligence surveys",
  lede: "Transform employee feedback into smarter business decisions, through AI-powered engagement, pulse, lifecycle and organizational surveys.",
  features: [
    {
      title: "Create intelligent employee engagement programs",
      body: "Design AI-powered engagement, pulse and lifecycle surveys tailored to your organization's unique culture and business priorities, and transform meaningful feedback into actionable workforce intelligence.",
      icon: "pulse" as IconName,
    },
    {
      title: "Launch research-backed survey templates",
      body: "Accelerate employee listening with a library of expert-designed templates covering engagement, wellbeing, onboarding, leadership, DEI, culture, learning and lifecycle events, customizable to your goals.",
      icon: "checks" as IconName,
    },
    {
      title: "Automate continuous listening with AI",
      body: "Move beyond scheduled surveys. Automatically trigger personalized pulse surveys on milestones, lifecycle events or organizational changes, while AI analyzes responses and recommends timely actions.",
      icon: "spark" as IconName,
    },
    {
      title: "Predict engagement risks with pulse intelligence",
      body: "Monitor engagement in real time with intelligent pulse surveys and predictive analytics. Spot disengagement, attrition risk and emerging challenges early, before they impact business performance.",
      icon: "chart" as IconName,
    },
  ],
};

// ---------------------------------------------------------- analytics section
export const analyticsSection = {
  eyebrow: "Workforce intelligence & analytics",
  title: "Measure what matters. Predict what comes next. Act with confidence.",
  lede: "Vadal.ai transforms engagement, workforce, talent and organizational data into actionable intelligence, real-time visibility, predictive insights and personalized recommendations for every leader.",
  features: [
    {
      title: "Employee Engagement Score (eNPS)",
      body: "Go beyond traditional eNPS by combining engagement, recognition, feedback and workforce intelligence to uncover what drives loyalty and retention. Track trends, benchmark teams and get AI-driven recommendations.",
      icon: "pulse" as IconName,
    },
    {
      title: "AI Sentiment Intelligence",
      body: "Advanced AI and NLP analyze surveys, feedback, recognition and conversations to identify emotions, emerging concerns and engagement drivers, so leaders act before issues hit morale or retention.",
      icon: "chat" as IconName,
    },
    {
      title: "Workforce Benchmark Intelligence",
      body: "Measure performance against business units, locations, functions and industry benchmarks, across engagement, workforce health, leadership effectiveness and organizational performance.",
      icon: "globe" as IconName,
    },
    {
      title: "Executive Reports & AI Insights",
      body: "Presentation-ready dashboards and AI-powered insights covering engagement, workforce analytics, leadership and talent trends, customized for CEOs, CHROs, managers and business leaders.",
      icon: "chart" as IconName,
    },
    {
      title: "Enterprise Data Export & Integration",
      body: "Export surveys, analytics, sentiment and benchmark reports to Excel, CSV or PDF, or integrate with Workday, SAP SuccessFactors, Oracle HCM, Power BI and Tableau for advanced reporting.",
      icon: "plug" as IconName,
    },
  ],
  chips: [
    "Employee Engagement Score",
    "Attrition Risk Prediction",
    "Workforce Health Index",
    "Leadership Effectiveness Score",
    "Organizational Intelligence",
    "AI Decision Copilot",
  ],
};

// ----------------------------------------------------------- feedback section
export const feedbackSection = {
  eyebrow: "Employee feedback intelligence",
  title: "Transform employee feedback into workforce intelligence",
  body: "Vadal.ai continuously captures employee feedback, measures engagement and understands workforce sentiment through AI-powered listening, helping leaders identify emerging risks, prioritize actions and create exceptional employee experiences that drive measurable business outcomes.",
  bullets: [
    "Capture employee feedback through multiple listening channels",
    "Measure engagement and workforce sentiment in real time",
    "Prioritize feedback with AI-powered insights and predictive analytics",
    "Give managers and HR personalized action recommendations",
    "Strengthen communication, trust and collaboration",
    "Turn employee feedback into measurable business outcomes",
  ],
  cards: [
    {
      title: "AI-Powered Workforce Insights",
      body: "Instant summaries of employee feedback, engagement and workforce trends, with actionable AI-generated insights.",
      icon: "spark" as IconName,
    },
    {
      title: "Intelligent Filtering & Prioritization",
      body: "Analyze workforce data across teams, locations and employee segments to identify priorities faster.",
      icon: "checks" as IconName,
    },
    {
      title: "AI-Driven Action Planning",
      body: "Convert feedback into personalized action plans, assign ownership and measure business impact.",
      icon: "rocket" as IconName,
    },
    {
      title: "Predictive Workforce Intelligence",
      body: "Discover hidden trends, engagement drivers and organizational risks through AI-powered analytics.",
      icon: "chart" as IconName,
    },
  ],
};

// ------------------------------------------------------------- action section
export const actionSection = {
  eyebrow: "Employee action intelligence",
  title: "From employee feedback to meaningful action",
  body: "Vadal.ai transforms feedback, engagement insights and workforce intelligence into AI-powered action plans, with clear ownership, real-time progress tracking and measurable outcomes, so every leader is accountable for building a more engaged, high-performing workplace.",
};

// ------------------------------------------------------------ privacy section
export const privacySection = {
  eyebrow: "Employee privacy & trust",
  title: "Build a culture where every voice is heard, protected and valued",
  body: "Trust is the foundation of meaningful engagement. Vadal.ai lets employees confidently share feedback, ideas and concerns through AI-powered listening channels, with the highest standards of privacy, confidentiality and data protection.",
  features: [
    {
      title: "Enterprise-grade privacy & global compliance",
      body: "GDPR-ready privacy controls, role-based access, enterprise security and compliance standards that safeguard employee data and organizational trust.",
      icon: "shield" as IconName,
    },
    {
      title: "Anonymous & confidential listening",
      body: "Secure, anonymous surveys, pulse checks and continuous listening channels that encourage honest, open communication.",
      icon: "lock" as IconName,
    },
    {
      title: "AI-powered privacy-first reporting",
      body: "Intelligent aggregation, privacy thresholds and role-based analytics protect individual identities while leaders still get actionable insight.",
      icon: "chart" as IconName,
    },
    {
      title: "Secure two-way anonymous conversations",
      body: "Confidential, AI-assisted conversations between employees and HR or managers, acknowledge concerns and resolve issues while preserving anonymity.",
      icon: "chat" as IconName,
    },
  ],
  capabilities: [
    "End-to-end data encryption",
    "Role-based access control (RBAC)",
    "SSO & Multi-Factor Authentication",
    "GDPR, SOC 2 & ISO 27001-aligned",
    "Configurable anonymity thresholds",
    "AI-powered PII detection & masking",
    "Audit logs & compliance reporting",
    "Secure enterprise integrations",
  ],
};

// -------------------------------------------------------------- integrations
export const integrationsSection = {
  eyebrow: "Enterprise integrations",
  title: "Seamlessly connect your enterprise. Empower every workforce decision.",
  lede: "Vadal.ai integrates with your HR, finance, ERP, collaboration, identity and analytics stack, creating one unified, AI-powered workforce intelligence ecosystem.",
  categories: [
    { name: "HRIS & HCM", vendors: "Workday, SAP SuccessFactors, Oracle HCM, Darwinbox, UKG", icon: "users" as IconName },
    { name: "ERP & Finance", vendors: "SAP, Oracle ERP, Microsoft Dynamics 365", icon: "chart" as IconName },
    { name: "Payroll", vendors: "ADP, Ramco, SAP Payroll", icon: "checks" as IconName },
    { name: "ATS & Recruitment", vendors: "Greenhouse, Lever, iCIMS, SmartRecruiters", icon: "rocket" as IconName },
    { name: "Learning", vendors: "Cornerstone, Moodle, Docebo", icon: "graduation" as IconName },
    { name: "Collaboration", vendors: "Microsoft Teams, Slack, Google Workspace", icon: "chat" as IconName },
    { name: "Identity & Security", vendors: "Microsoft Entra ID, Okta, OneLogin", icon: "lock" as IconName },
    { name: "Analytics", vendors: "Power BI, Tableau, Looker", icon: "pulse" as IconName },
    { name: "CRM", vendors: "Salesforce, HubSpot", icon: "heart" as IconName },
    { name: "API & Automation", vendors: "REST APIs, Webhooks, Zapier, Power Automate", icon: "plug" as IconName },
  ],
};

// --------------------------------------------------------- security & trust
export const securitySection = {
  title: "Enterprise-grade security for workforce intelligence",
  lede: "Security, privacy and compliance at the core, every interaction protected by enterprise-grade controls, robust governance and global compliance standards.",
  cards: [
    {
      title: "Enterprise-Grade Security",
      body: "Protect workforce and organizational data with encryption, role-based access controls and continuous security monitoring.",
    },
    {
      title: "Global Privacy & Compliance",
      body: "GDPR, SOC 2, ISO 27001 and other enterprise compliance requirements, with privacy-first data management and governance.",
    },
    {
      title: "Responsible AI Governance",
      body: "Transparency, accountability and ethical AI with explainable insights, controlled access and governance frameworks.",
    },
    {
      title: "Identity & Access Management",
      body: "SSO, Multi-Factor Authentication and seamless integration with Microsoft Entra ID, Okta and other identity providers.",
    },
  ],
};

// -------------------------------------------------------------- implementation
export const implementationSection = {
  eyebrow: "Implementation & onboarding",
  title: "Seamless implementation & AI-driven onboarding",
  body: "A smooth, guided implementation designed for enterprise success. In a structured 5-week implementation, Vadal.ai sets up AI-powered workforce intelligence, tailored insights and your personalized decision dashboards, with a dedicated customer success manager who partners with you for life.",
  checks: [
    "Onboarding and data migration at no extra cost",
    "Integrates with all major HRIS & HCM platforms",
    "Dedicated customer success manager, for life",
    "Comprehensive knowledge base & strategic reviews",
  ],
  weeks: [
    { week: "Week 1", title: "Kickoff & data migration" },
    { week: "Week 2", title: "HRIS & identity integrations" },
    { week: "Week 3", title: "Configuration & branding" },
    { week: "Week 4", title: "AI calibration & dashboards" },
    { week: "Week 5", title: "Launch & enablement" },
  ],
};

// ============================================================== nav mega-menus
export type MenuItem = { name: string; blurb?: string; href: string; icon?: IconName };
export type MenuGroup = { label: string; items: MenuItem[] };

// -- Platform mega
export const platformPillars: MenuItem[] = [
  {
    name: "Intelligent Workforce Engagement Surveys",
    blurb: "Design, deploy and measure AI-powered surveys that deliver actionable workforce insights.",
    href: "/platform/engagement-surveys",
    icon: "pulse",
  },
  {
    name: "Continuous Employee Listening",
    blurb: "Gather feedback continuously across channels, from surveys to real-time interactions.",
    href: "/platform/employee-listening",
    icon: "chat",
  },
  {
    name: "Actionable Workforce Intelligence",
    blurb: "Turn feedback into AI-driven recommendations that improve engagement and performance.",
    href: "/platform/workforce-intelligence",
    icon: "spark",
  },
  {
    name: "AI-Driven People Analytics",
    blurb: "Align workforce strategies with business outcomes, leadership decisions, data-informed.",
    href: "/platform/people-analytics",
    icon: "chart",
  },
];

export const surveyTypes: MenuItem[] = [
  { name: "Engagement Surveys", blurb: "Annual intelligence surveys for culture and performance.", href: "/platform/engagement-surveys" },
  { name: "Pulse Surveys", blurb: "Frequent, intelligent pulse checks that predict trends.", href: "/platform/pulse-surveys" },
  { name: "Lifecycle Surveys", blurb: "Feedback at key milestones, onboarding to offboarding.", href: "/platform/lifecycle-surveys" },
  { name: "Predictive eNPS", blurb: "Track loyalty and the AI-explained drivers behind it.", href: "/platform/predictive-enps" },
  { name: "Confidential Feedback", blurb: "Anonymous, secure channels for honest feedback.", href: "/platform/confidential-feedback" },
];

export const platformFeatured: MenuItem[] = [
  { name: "Enterprise Workforce Intelligence", blurb: "AI-driven surveys and analytics at enterprise scale, security and compliance.", href: "/solutions/enterprise", icon: "shield" },
  { name: "AI-Powered People Intelligence", blurb: "Workforce data, AI insights and people science, better decisions, lasting trust.", href: "/science", icon: "spark" },
  { name: "Frontline & Deskless Engagement", blurb: "Reach every employee via SMS, WhatsApp or QR, no email required.", href: "/solutions/frontline-deskless", icon: "phone" },
];

// -- Portfolio (Portfolio for Vadal.docx + "All Product Pages" master doc) —
//    the six platform clouds. Group ids double as /platform#<id> anchors; items
//    with a `slug` are real products with dedicated pages at /platform/<slug>.
export type PortfolioGroup = {
  id: string;
  name: string;
  icon: IconName;
  description: string;
  items: { name: string; blurb: string; slug?: string }[];
};

/* The mobile menu's product index — a flat, deliberately ordered list rather
   than the six families, so phones get one tap to the thing they came for.
   Order is the founder's and is intentional: do not re-sort alphabetically or
   regroup by family. Ten resolve to product pages; Enterprise AI Platform is a
   family, so it targets its section anchor on /platform. */
export const mobileProductNav: MenuItem[] = [
  { name: "AI Chatbot", href: "/platform/ai-employee-chat", icon: "chat" },
  { name: "Employee Experience", href: "/platform/employee-experience", icon: "compass" },
  { name: "Employee Communication", href: "/platform/employee-communication", icon: "broadcast" },
  { name: "Continuous Employee Listening", href: "/platform/employee-listening", icon: "pulse" },
  { name: "Engagement Surveys", href: "/platform/engagement-surveys", icon: "checks" },
  { name: "Employee Wellbeing & Culture", href: "/platform/employee-wellbeing-culture", icon: "heart" },
  { name: "Mobile & E-Learning", href: "/platform/mobile-e-learning", icon: "phone" },
  { name: "Recognition & Rewards", href: "/platform/recognition-rewards", icon: "bell" },
  { name: "Feedback Intelligence", href: "/platform/feedback-intelligence", icon: "spark" },
  { name: "AI-powered Action Planning", href: "/platform/action-planning", icon: "rocket" },
  { name: "Enterprise AI Platform", href: "/platform#enterprise-platform", icon: "shield" },
];

export const portfolioGroups: PortfolioGroup[] = [
  {
    id: "workforce-experience",
    name: "Workforce Experience",
    icon: "heart",
    description:
      "Create exceptional employee experiences by connecting communication, engagement, wellbeing and recognition to improve productivity, collaboration and organizational culture.",
    items: [
      { name: "Employee Communication", slug: "employee-communication", blurb: "AI-powered announcements, targeted campaigns, digital noticeboards and multi-channel messaging." },
      { name: "Employee Experience", slug: "employee-experience", blurb: "Measure and improve every stage of the lifecycle with AI-powered listening and journey analytics." },
      { name: "Employee Wellbeing & Culture", slug: "employee-wellbeing-culture", blurb: "Continuous listening, wellbeing assessments and recognition that foster a healthy workplace." },
      { name: "Recognition & Rewards", slug: "recognition-rewards", blurb: "AI-enabled peer recognition, milestone celebrations and performance-based rewards." },
    ],
  },
  {
    id: "talent-intelligence",
    name: "Talent Intelligence",
    icon: "rocket",
    description:
      "Attract, develop and retain future-ready talent through intelligent onboarding, skills development, leadership growth and strategic workforce planning.",
    items: [
      { name: "Pre- & Onboarding", slug: "pre-onboarding", blurb: "Personalized journeys, digital documentation and AI-guided onboarding." },
      { name: "Skills Intelligence", slug: "skills-intelligence", blurb: "Map capabilities, spot skill gaps and recommend personalized learning paths." },
      { name: "Leadership Intelligence", slug: "leadership-intelligence", blurb: "Assess leadership effectiveness, strengthen succession and coach future leaders." },
      { name: "Workforce Planning", slug: "workforce-planning", blurb: "Optimize capacity, hiring plans and org design with predictive analytics." },
      { name: "Alumni Management", slug: "alumni-management", blurb: "Lifelong portal access, exit documents and a boomerang pipeline of proven talent." },
    ],
  },
  {
    id: "ai-engagement",
    name: "Employee Engagement & Listening",
    icon: "pulse",
    description:
      "Continuously listen, engage and act on employee feedback using AI-powered surveys, predictive insights and personalized action planning.",
    items: [
      { name: "Engagement Surveys", slug: "engagement-surveys", blurb: "AI-powered engagement, pulse and lifecycle surveys that capture meaningful feedback." },
      { name: "Continuous Employee Listening", slug: "employee-listening", blurb: "Multi-channel listening, surveys, portals, recognition and AI conversations." },
      { name: "Feedback Intelligence", slug: "feedback-intelligence", blurb: "AI that organizes and prioritizes feedback into recurring themes and actions." },
      { name: "Action Planning", slug: "action-planning", blurb: "AI-generated action plans with ownership tracking and progress monitoring." },
    ],
  },
  {
    id: "digital-workplace",
    name: "Digital Workplace",
    icon: "phone",
    description:
      "Empower employees with an intelligent digital workplace that simplifies communication, collaboration, learning and everyday work through AI-powered experiences.",
    items: [
      { name: "AI Employee Chat", slug: "ai-employee-chat", blurb: "An intelligent assistant for HR support, policy guidance and knowledge discovery." },
      { name: "Tasks & Workflow", slug: "tasks-workflow", blurb: "Digitize, assign and monitor tasks with intelligent workflow automation." },
      { name: "Mobile & E-Learning", slug: "mobile-e-learning", blurb: "Mobile-first learning journeys, microlearning and AI content recommendations." },
      { name: "Employee Productivity", blurb: "Intelligent task prioritization, automated workflows and performance insights." },
    ],
  },
  {
    id: "enterprise-platform",
    name: "Enterprise AI Platform",
    icon: "shield",
    description:
      "Deliver a secure, scalable and enterprise-ready AI platform that integrates seamlessly with existing systems while enabling intelligent automation and workforce decision-making.",
    items: [
      { name: "Enterprise Integrations", slug: "enterprise-integrations", blurb: "Connect HRIS, HCM, ERP, ATS, payroll, collaboration and analytics platforms." },
      { name: "Security & Compliance", slug: "security-compliance", blurb: "Enterprise-grade security, GDPR-ready privacy and responsible AI governance." },
      { name: "Implementation & Customer Success", slug: "implementation", blurb: "Structured implementation, free data migration and dedicated customer success." },
      { name: "Decision Intelligence Copilot", slug: "decision-intelligence-copilot", blurb: "Ask workforce questions in natural language, get AI-powered predictive guidance." },
      { name: "AI Workforce Assistant", slug: "ai-workforce-assistant", blurb: "A proactive AI teammate that surfaces what needs attention before anyone asks." },
    ],
  },
  {
    id: "workforce-intelligence",
    name: "Workforce Intelligence",
    icon: "chart",
    description:
      "Transform workforce data into AI-powered insights that help leaders measure organizational health, predict risks and make informed business decisions.",
    items: [
      { name: "People Analytics", slug: "people-analytics", blurb: "Predictive analytics, AI dashboards and BI to uncover trends and identify risks." },
      { name: "Sentiment Intelligence", slug: "sentiment-intelligence", blurb: "NLP-driven analysis of emotions, workplace trends and engagement drivers." },
      { name: "Benchmark Intelligence", slug: "benchmark-intelligence", blurb: "Compare engagement and performance across units, locations and industry benchmarks." },
      { name: "Executive Reports", slug: "executive-reports", blurb: "Executive-ready dashboards, board reports and AI-powered workforce summaries." },
      { name: "Attrition Prediction", blurb: "AI models that flag employees at risk of leaving, so you can retain top talent." },
      { name: "Manager Intelligence", blurb: "AI coaching, team health dashboards and recommendations for every manager." },
    ],
  },
];

// -- Solutions mega
export const solutionsByOutcome: MenuItem[] = [
  { name: "Employee Retention", blurb: "Identify attrition risk early and retain top talent with data-backed actions.", href: "/solutions/employee-retention", icon: "heart" },
  { name: "Manager Effectiveness", blurb: "AI-powered insights and coaching recommendations for high-performing teams.", href: "/solutions/manager-effectiveness", icon: "users" },
  { name: "Employee Wellbeing", blurb: "Measure and enhance wellbeing with intelligent listening and proactive nudges.", href: "/solutions/employee-wellbeing", icon: "pulse" },
  { name: "Diversity & Inclusion", blurb: "Build an equitable culture with AI-powered DEI insights and feedback loops.", href: "/solutions/diversity-inclusion", icon: "globe" },
  { name: "Remote & Hybrid Work", blurb: "Keep distributed teams connected with analytics tuned for hybrid work.", href: "/solutions/remote-hybrid", icon: "compass" },
];

export const solutionsByWorkforce: MenuItem[] = [
  { name: "Frontline & Deskless", blurb: "Engage frontline teams via SMS, WhatsApp, QR and more, no email required.", href: "/solutions/frontline-deskless", icon: "phone" },
  { name: "Global & Multilingual", blurb: "AI-powered surveys and analytics across 150+ languages and regions.", href: "/solutions/global-multilingual", icon: "globe" },
  { name: "Enterprise", blurb: "Scale securely with enterprise-grade AI, compliance and governance.", href: "/solutions/enterprise", icon: "shield" },
];

// -- Resources mega
export const resourcesMenu: MenuGroup[] = [
  {
    label: "Learn",
    items: [
      { name: "Thought Leadership Blog", blurb: "AI-driven workforce intelligence, talent strategy and leadership decisions.", href: "/resources#learn", icon: "spark" },
      { name: "Guides & Deep Dives", blurb: "In-depth explorations of workforce analytics and AI-driven HR strategy.", href: "/resources#learn", icon: "graduation" },
      { name: "Workforce Intelligence Glossary", blurb: "Key terms in AI, workforce analytics and talent intelligence, defined.", href: "/resources#learn", icon: "checks" },
    ],
  },
  {
    label: "Proof & Community",
    items: [
      { name: "Transformation Stories", blurb: "Real-world cases where workforce intelligence drove measurable impact.", href: "/customers", icon: "heart" },
      { name: "Benchmark Reports", blurb: "Industry-wide workforce analytics and talent benchmarks.", href: "/resources#proof", icon: "chart" },
      { name: "Vadal.ai Community", blurb: "A global network of HR leaders sharing AI-powered workforce strategies.", href: "/resources#proof", icon: "users" },
    ],
  },
  {
    label: "Start Here",
    items: [
      { name: "What is Workforce Intelligence?", blurb: "The definitive guide to AI-powered workforce decision-making.", href: "/resources#start", icon: "compass" },
      { name: "Key Workforce Survey Questions", blurb: "What to ask in intelligent surveys to drive actionable insights.", href: "/resources#start", icon: "pulse" },
      { name: "Understanding Pulse Intelligence", blurb: "How AI-powered pulse surveys predict workforce trends.", href: "/resources#start", icon: "bell" },
    ],
  },
];

// -- Science mega
export const scienceMenu = {
  heading: "Feedback grounded in AI-powered intelligence",
  items: [
    { name: "People Science & AI", blurb: "How people science and AI combine for smarter, predictive workforce decisions.", href: "/science#people-science", icon: "users" },
    { name: "AI-Driven Methodology", blurb: "The intelligent framework behind our insights, predictive models to actions.", href: "/science#methodology", icon: "checks" },
    { name: "Workforce Intelligence", blurb: "How AI turns feedback and performance data into predictive insights.", href: "/science#workforce-intelligence", icon: "chart" },
    { name: "AI Technology Platform", blurb: "The unified platform for workforce data, AI analytics and decision intelligence.", href: "/science#platform", icon: "spark" },
    { name: "Predictive Industry Benchmarks", blurb: "Dynamic, AI-built benchmarks that guide strategic workforce planning.", href: "/science#benchmarks", icon: "globe" },
  ] as MenuItem[],
};

// ---------------------------------------------------------------- home FAQs
// Master FAQ set from the founder's content doc (Jul 2026) — the questions he
// flagged "can be kept in the first home page", plus the core identity Qs.
export const homeFaqsV2 = [
  {
    q: "What is Vadal.ai?",
    a: "Vadal.ai is an AI-powered Workforce Decision Intelligence Platform that helps organizations improve employee engagement, workforce communication, talent management and organizational performance. By combining employee feedback, workforce analytics, AI-powered recommendations and intelligent automation, Vadal.ai enables leaders to make faster, smarter and more informed workforce decisions.",
  },
  {
    q: "What is Workforce Decision Intelligence?",
    a: "The ability to transform workforce, talent, leadership and organizational data into actionable business decisions using AI, predictive analytics and automation. Vadal.ai combines engagement, continuous listening, workforce analytics and AI-powered recommendations to help organizations anticipate risks, identify opportunities and make faster, data-driven decisions across the employee lifecycle.",
  },
  {
    q: "How is Vadal.ai different from traditional engagement platforms or HRIS?",
    a: "HRIS platforms manage employee records; engagement platforms primarily collect feedback. Vadal.ai bridges both, combining employee engagement, communication, workforce intelligence, predictive analytics, AI automation and executive decision support in a single platform. You see not just what is happening across your workforce, but why, and what to do next.",
  },
  {
    q: "Can Vadal.ai predict employee attrition and engagement risks?",
    a: "Yes. Vadal.ai uses predictive analytics and AI models to identify early indicators of disengagement, burnout and attrition. By analyzing engagement, feedback, communication patterns and workforce trends, the platform lets HR and business leaders address risks proactively, before they impact productivity, retention or performance.",
  },
  {
    q: "How does Vadal.ai use Generative AI responsibly?",
    a: "Generative AI summarizes workforce insights, generates recommendations, automates communication and assists managers, while maintaining strict security and governance standards. Our AI augments human decision-making, never replaces it: every AI-generated recommendation is explainable, transparent and backed by enterprise-grade privacy controls and responsible AI governance.",
  },
  {
    q: "Is employee feedback anonymous and secure?",
    a: "Yes. Vadal.ai is built with enterprise-grade security and privacy controls, anonymous surveys, confidential feedback channels, role-based access, configurable anonymity thresholds and AI-powered privacy safeguards, in line with global data protection and governance standards such as GDPR.",
  },
  {
    q: "Does Vadal.ai integrate with our existing systems?",
    a: "Yes. Vadal.ai integrates seamlessly with leading enterprise platforms including Workday, SAP SuccessFactors, Oracle HCM, Darwinbox, Microsoft Teams, Slack, Microsoft 365, Google Workspace, Power BI and Tableau, plus REST APIs and webhooks for anything custom.",
  },
  {
    q: "Can Vadal.ai be deployed for frontline and deskless employees?",
    a: "Yes. Vadal.ai is designed for every employee, frontline, deskless, remote and hybrid. People can securely access the platform through mobile, web, QR codes, SMS, WhatsApp and collaboration tools, so everyone stays connected and informed regardless of where they work.",
  },
  {
    q: "Is Vadal.ai suitable for Global Capability Centres (GCCs)?",
    a: "Yes. Vadal.ai includes dedicated capabilities for GCCs, workforce planning, talent intelligence, leadership insights, engagement, productivity analytics and GCC-specific dashboards that help global organizations scale efficiently.",
  },
  {
    q: "Who uses Vadal.ai?",
    a: "Every stakeholder across the enterprise: CEOs, CHROs, CXOs, GCC leaders, HR business partners, managers, talent acquisition teams, learning & development teams, HR operations and employees. Each role receives personalized dashboards, AI-powered insights and recommendations relevant to their responsibilities.",
  },
  {
    q: "How long does it take to implement Vadal.ai?",
    a: "Most organizations are onboarded within 4–6 weeks on our structured implementation plan, with data migration at no extra cost. Our team manages enterprise integrations, platform configuration, user training and AI model setup, with a dedicated customer success manager throughout.",
  },
];
