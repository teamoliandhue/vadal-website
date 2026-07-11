import type { IconName } from "./content";

// ============================================================================
// Products v2 — the 24 products across the six platform clouds, from the
// founder's "Vadal.ai - All Product Pages" master doc (Jul 2026). Generated
// from the doc's per-product specs; customer stories carry NO metrics per the
// doc's explicit instruction ("do not launch with placeholder figures live").
//  cloud: matches a portfolioGroups id in lib/content.ts.
// ============================================================================

export type ProductCapability = {
  title: string;
  body: string;
  bullets: string[];
  screen: string; // named product screen shown with this capability
};

export type Product = {
  slug: string;
  name: string;
  cloud: string;
  icon: IconName;
  mock: "dashboard" | "phone" | "voice" | "broadcast";
  heroTitle: string;
  heroLede: string;
  challengesTitle: string | null;
  challenges: string[];
  pillars: string[];
  capabilities: ProductCapability[];
  aiCapabilities: string[];
  outcomes: string[];
  story: { challenge: string; solution: string; outcomes: string };
  integrations: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  footerCta: string;
};

export const products: Product[] = [
  {
    "slug": "employee-communication",
    "name": "Employee Communication",
    "cloud": "workforce-experience",
    "icon": "broadcast",
    "mock": "broadcast",
    "heroTitle": "Intelligent Employee Communication Powered by AI",
    "heroLede": "Deliver personalized communication, strengthen employee engagement, and transform every interaction into actionable workforce intelligence — reaching every employee, desk-based or frontline, wherever they are.",
    "challengesTitle": "Why Modern Employee Communication Needs AI",
    "challenges": [
      "Employees miss critical announcements buried in email or scattered across tools.",
      "Communication is one-way, with no room for employees to respond or be heard.",
      "Frontline and deskless employees remain disconnected from the organization.",
      "Managers lack visibility into whether messages are actually landing.",
      "There's no reliable measurement of communication effectiveness.",
      "Information is scattered across too many disconnected systems.",
      "Knowledge is lost instead of captured and shared.",
      "Employee feedback is collected but rarely acted upon."
    ],
    "pillars": [
      "AI-Powered Communication",
      "Continuous Listening",
      "Personalized Experiences",
      "Workforce Intelligence"
    ],
    "capabilities": [
      {
        "title": "Personalized Communication",
        "body": "Deliver the right communication to the right employee at the right time using AI-powered audience segmentation and intelligent targeting — no more one-size-fits-all broadcasts.",
        "bullets": [
          "Reach every employee with messages relevant to their role and location",
          "Let AI recommend the best audience for each announcement",
          "Replace mass broadcasts with precise, well-timed targeting"
        ],
        "screen": "Announcement Composer"
      },
      {
        "title": "Continuous Employee Engagement",
        "body": "Keep employees connected through personalized campaigns, surveys, recognition and two-way conversations that strengthen engagement, not just push information out.",
        "bullets": [
          "Turn one-way announcements into two-way conversations",
          "Run campaigns, surveys and recognition from a single place",
          "Keep engagement continuous instead of occasional"
        ],
        "screen": "Campaign Dashboard"
      },
      {
        "title": "Intelligent Collaboration",
        "body": "Create connected teams with communities, knowledge sharing, employee directories and AI-powered collaboration tools that reach desk and frontline workers alike.",
        "bullets": [
          "Connect desk and frontline workers in shared communities",
          "Capture knowledge instead of losing it in scattered tools",
          "Help employees find people and expertise instantly"
        ],
        "screen": "News Feed"
      },
      {
        "title": "Communication Intelligence",
        "body": "Measure communication effectiveness, employee participation, workforce sentiment and business impact through AI-powered analytics that close the loop between publishing and understanding.",
        "bullets": [
          "See who actually read and engaged with every message",
          "Track workforce sentiment alongside communication reach",
          "Prove communication impact with real-time analytics"
        ],
        "screen": "Communication Analytics"
      }
    ],
    "aiCapabilities": [
      "AI Writing Assistant",
      "AI Campaign Generator",
      "AI Audience Recommendation",
      "AI Communication Summary",
      "AI Translation",
      "AI Tone Optimizer",
      "AI Auto-Scheduling",
      "AI Communication Analytics",
      "AI Sentiment Analysis"
    ],
    "outcomes": [
      "Increase Communication Reach",
      "Improve Employee Engagement",
      "Reduce Information Gaps",
      "Improve Manager Effectiveness",
      "Accelerate Change Adoption",
      "Increase Productivity",
      "Strengthen Culture"
    ],
    "story": {
      "challenge": "A large retailer with a frontline workforce spread across many locations struggled to reach non-desk employees who had no company email, and had no way to measure whether critical messages were landing.",
      "solution": "Deployed Vadal.ai's Employee Communication product to reach every employee via mobile, SMS and push, with AI-powered targeting and two-way feedback channels.",
      "outcomes": "Higher message reach across frontline teams, faster feedback loops between staff and leadership, and measurable communication effectiveness for the first time."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "Outlook",
      "Google Workspace",
      "SharePoint",
      "WhatsApp",
      "SMS",
      "Power BI",
      "Tableau"
    ],
    "faqs": [
      {
        "q": "How does Vadal.ai reach frontline employees who don't have a company email?",
        "a": "Communication can be delivered via mobile app, SMS, WhatsApp and push notifications, so frontline and deskless workers are reached in seconds without needing a corporate inbox — the same way modern consumer apps reach people on their phones."
      },
      {
        "q": "How is this different from just sending company-wide emails?",
        "a": "Email is one-way and easily missed. Vadal.ai delivers targeted, two-way communication with AI-powered audience segmentation, read/engagement tracking, and built-in feedback channels — so you know who saw what, and employees can respond rather than just receive."
      },
      {
        "q": "Can we measure whether communication is actually working?",
        "a": "Yes. Real-time open rates, engagement metrics and sentiment analysis show whether messages are being read and understood — not just sent — closing the loop between publishing content and confirming the workforce is informed."
      },
      {
        "q": "What does the AI Writing Assistant actually do?",
        "a": "It helps communicators draft, refine and optimize messages — improving tone, suggesting clearer phrasing, generating campaign variations, and translating content — so even non-specialist managers can produce clear, on-brand communication quickly."
      },
      {
        "q": "Can we target messages to specific teams, locations or roles?",
        "a": "Yes. Messages can go to the entire organization or be narrowed to specific teams, departments, locations or roles, with AI recommending the most relevant audience for each message."
      },
      {
        "q": "Does communication data connect to the rest of the platform?",
        "a": "Yes — communication engagement and sentiment feed into Vadal.ai's shared intelligence layer, so what you learn from communication informs analytics, listening and the wider workforce picture, rather than living in a silo."
      }
    ],
    "related": [
      "employee-experience",
      "employee-wellbeing-culture",
      "recognition-rewards",
      "employee-listening",
      "engagement-surveys",
      "people-analytics"
    ],
    "footerCta": "Ready to transform employee communication into workforce intelligence?"
  },
  {
    "slug": "employee-experience",
    "name": "Employee Experience",
    "cloud": "workforce-experience",
    "icon": "compass",
    "mock": "phone",
    "heroTitle": "Reimagine Every Employee Moment with AI",
    "heroLede": "Design personalized employee journeys, act on the moments that matter, and turn every interaction into a connected, measurable experience — from hire to retire.",
    "challengesTitle": "Why Modern Employee Experience Needs AI",
    "challenges": [
      "Employee journeys are fragmented across disconnected systems and tools.",
      "Onboarding feels generic instead of personal to the role, team or location.",
      "Employees don't know where to find people, policies or resources.",
      "Key life-cycle moments — promotions, anniversaries, transfers — go unnoticed.",
      "Managers have no visibility into how an employee's journey is actually going.",
      "Experience quality varies wildly by geography, role and manager.",
      "HR teams spend more time administering processes than designing experiences.",
      "There's no reliable way to measure whether employee experience is improving."
    ],
    "pillars": [
      "AI Journey Orchestration",
      "Moments That Matter",
      "Unified Employee Hub",
      "Experience Intelligence"
    ],
    "capabilities": [
      {
        "title": "Personalized Employee Journeys",
        "body": "Automatically tailor onboarding, transitions, promotions and offboarding to each employee's role, location and life-cycle stage using AI-driven journey orchestration.",
        "bullets": [
          "Give every new hire a journey built for their role",
          "Automate transitions, promotions and offboarding end to end",
          "Replace generic checklists with AI-orchestrated journeys"
        ],
        "screen": "Employee Journey Map Dashboard"
      },
      {
        "title": "Moments That Matter",
        "body": "Recognize and act on key life-cycle events — anniversaries, promotions, relocations, life events — with automated, personalized touchpoints that make employees feel seen.",
        "bullets": [
          "Never let anniversaries, promotions or milestones go unnoticed",
          "Trigger personalized touchpoints automatically at key moments",
          "Make employees feel seen without adding HR workload"
        ],
        "screen": "Moments That Matter Feed"
      },
      {
        "title": "Unified Employee Hub",
        "body": "Give every employee a single place to find people, policies, tasks and resources, powered by an AI assistant that understands their role and context.",
        "bullets": [
          "One place for people, policies, tasks and resources",
          "An AI assistant that answers questions in role context",
          "Less time searching, more time doing meaningful work"
        ],
        "screen": "Employee Hub / Homepage"
      },
      {
        "title": "Experience Intelligence",
        "body": "Measure experience quality at every touchpoint, surface friction points, and quantify the impact on retention, productivity and engagement through AI-powered analytics.",
        "bullets": [
          "Measure experience quality at every journey touchpoint",
          "Surface friction points before they drive attrition",
          "Connect experience directly to retention and productivity"
        ],
        "screen": "Experience Analytics Dashboard"
      }
    ],
    "aiCapabilities": [
      "AI Journey Orchestrator",
      "AI Onboarding Assistant",
      "AI Moments Detector",
      "AI Employee Copilot (self-service Q&A)",
      "AI Experience Scoring",
      "AI Friction Point Detection",
      "AI Content Personalization",
      "AI Retention Risk Signals"
    ],
    "outcomes": [
      "Improve Employee Retention",
      "Accelerate Time-to-Productivity",
      "Increase Onboarding Completion Rates",
      "Strengthen Manager-Employee Connection",
      "Elevate Employer Brand",
      "Reduce HR Administrative Load",
      "Increase Employee Lifetime Engagement"
    ],
    "story": {
      "challenge": "A global enterprise struggled with fragmented onboarding across regions, leading to slow ramp-up and early attrition.",
      "solution": "Deployed Vadal.ai's Employee Experience product to orchestrate personalized onboarding journeys and surface key life-cycle moments automatically.",
      "outcomes": "Faster time-to-productivity, higher onboarding completion, and improved new-hire retention."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "Microsoft Teams",
      "Slack",
      "Outlook",
      "Google Workspace",
      "SharePoint",
      "ServiceNow",
      "ADP",
      "ATS platforms (Greenhouse, Lever)"
    ],
    "faqs": [
      {
        "q": "How is Employee Experience different from Employee Communication?",
        "a": "Employee Communication focuses on delivering and measuring messages — news, updates, campaigns. Employee Experience is broader: it orchestrates the entire employee journey (onboarding, milestones, transitions, offboarding) and gives employees a single hub for people, policies and resources. Communication is one input into the experience; Experience is the end-to-end journey itself."
      },
      {
        "q": "Can journeys be customized per department, region or role?",
        "a": "Yes. Journeys can be configured by role, department, location, seniority level or any custom employee attribute, so a frontline retail hire and a corporate new manager each get a journey tailored to their context — not a single generic onboarding flow."
      },
      {
        "q": "Does this integrate with our existing HRIS?",
        "a": "Yes. The platform integrates with major HRIS and HCM systems (e.g. Workday, SAP SuccessFactors, Oracle HCM) to pull employee data — role, start date, location, reporting line — that powers journey personalization and moment triggers automatically."
      },
      {
        "q": "How does the AI detect \"moments that matter\"?",
        "a": "The AI cross-references HRIS data (tenure, role changes, promotions) with configurable rules and behavioral signals to identify life-cycle events worth acting on, then automatically triggers a personalized touchpoint — without HR needing to manually track dates or milestones."
      },
      {
        "q": "Is employee data used for personalization kept secure and compliant?",
        "a": "Yes — data used for journey personalization is handled under enterprise-grade security and compliance controls, including role-based access, encryption, and regional data residency where required."
      },
      {
        "q": "Can managers see their team's journey health?",
        "a": "Yes. Managers get a dashboard view of where each team member sits in their journey and any flagged friction points, so they can step in proactively rather than finding out about problems after the fact."
      }
    ],
    "related": [
      "employee-communication",
      "employee-wellbeing-culture",
      "recognition-rewards",
      "employee-listening",
      "pre-onboarding",
      "people-analytics"
    ],
    "footerCta": "Ready to turn every employee moment into a meaningful experience?"
  },
  {
    "slug": "employee-wellbeing-culture",
    "name": "Employee Wellbeing & Culture",
    "cloud": "workforce-experience",
    "icon": "heart",
    "mock": "voice",
    "heroTitle": "Build a Culture of Wellbeing with AI",
    "heroLede": "Detect burnout before it happens, strengthen culture at scale, and give every employee the support they need — powered by continuous listening and AI-driven insight.",
    "challengesTitle": "Why Modern Wellbeing & Culture Needs AI",
    "challenges": [
      "Burnout is discovered only after an employee resigns or disengages.",
      "Wellbeing initiatives are generic, one-size-fits-all campaigns.",
      "Culture varies wildly across teams, managers and locations.",
      "Managers don't know which of their people are struggling.",
      "Wellbeing surveys measure sentiment but rarely lead to real action.",
      "Support programs (EAP, mental health, benefits) go underused because employees don't know they exist.",
      "Leaders can't quantify the ROI of culture and wellbeing investment.",
      "Frontline and remote employees are the hardest to reach and support."
    ],
    "pillars": [
      "AI Burnout Detection",
      "Personalized Wellbeing Support",
      "Culture Intelligence",
      "Manager Enablement"
    ],
    "capabilities": [
      {
        "title": "Early Burnout Detection",
        "body": "Continuously analyze sentiment, workload signals and engagement patterns to flag burnout and disengagement risk before it escalates.",
        "bullets": [
          "Spot burnout risk before it turns into resignation",
          "Monitor sentiment and workload signals continuously, not annually",
          "Give HR and managers early warning to intervene"
        ],
        "screen": "Burnout Early-Warning Alerts"
      },
      {
        "title": "Personalized Wellbeing Journeys",
        "body": "Surface the right benefit, resource or check-in to the right employee at the right moment — from mental health support to flexible work options.",
        "bullets": [
          "Match employees to the support they actually need",
          "Boost usage of benefits employees didn't know existed",
          "Deliver check-ins and resources at the right moment"
        ],
        "screen": "Wellbeing Resource Hub"
      },
      {
        "title": "Culture Pulse & Programs",
        "body": "Run culture-building campaigns, wellbeing challenges and values-based recognition moments that scale consistently across teams and locations.",
        "bullets": [
          "Scale culture programs consistently across every location",
          "Run wellbeing challenges that employees actually join",
          "Reinforce company values through everyday recognition moments"
        ],
        "screen": "Culture Pulse Survey Interface"
      },
      {
        "title": "Manager Wellbeing Coaching",
        "body": "Equip managers with AI-generated, team-specific guidance on how to support at-risk employees and strengthen team culture.",
        "bullets": [
          "Give managers concrete guidance, not just alerts",
          "Tailor coaching to each team's specific situation",
          "Build manager confidence in supporting struggling employees"
        ],
        "screen": "Manager Coaching Panel"
      }
    ],
    "aiCapabilities": [
      "AI Burnout Risk Scoring",
      "AI Sentiment & Emotion Detection",
      "AI Wellbeing Resource Matching",
      "AI Manager Coaching Recommendations",
      "AI Culture Health Index",
      "AI Early-Warning Alerts",
      "AI Campaign Personalization"
    ],
    "outcomes": [
      "Reduce Burnout-Driven Attrition",
      "Improve Employee Wellbeing Scores",
      "Increase Benefits & Resource Utilization",
      "Strengthen Manager Support Capability",
      "Improve Culture Consistency Across Locations",
      "Reduce Absenteeism",
      "Increase Overall Engagement"
    ],
    "story": {
      "challenge": "A fast-growing technology company saw rising attrition among high performers with no early warning signal.",
      "solution": "Deployed Vadal.ai's Wellbeing & Culture module to detect burnout risk and equip managers with proactive coaching guidance.",
      "outcomes": "Earlier intervention, reduced regrettable attrition, and higher manager confidence in supporting teams."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "Microsoft Teams",
      "Slack",
      "Outlook",
      "Google Workspace",
      "EAP & benefits providers",
      "WhatsApp",
      "SMS"
    ],
    "faqs": [
      {
        "q": "How does the AI detect burnout risk without invading employee privacy?",
        "a": "The model looks at aggregated behavioral and sentiment signals (survey responses, participation patterns, workload indicators) rather than reading private communications. Individual flags are generated from patterns, not surveillance of personal messages or activity outside the platform."
      },
      {
        "q": "Is individual-level wellbeing data visible to managers, or only aggregated?",
        "a": "By default, managers see aggregated, team-level trends rather than individual scores, to protect psychological safety and encourage honest participation. Named-individual alerts, where enabled, should be scoped narrowly and disclosed clearly to employees — this is a configuration and policy decision your legal and HR teams should set deliberately."
      },
      {
        "q": "Can we plug in our existing EAP or benefits provider?",
        "a": "Yes, the platform is designed to integrate with existing EAP and benefits providers so relevant support can be surfaced directly to employees rather than requiring a separate system."
      },
      {
        "q": "How is this different from a standard engagement survey?",
        "a": "A standard survey measures sentiment at a point in time. This module continuously monitors signals between surveys, flags risk earlier, and recommends specific next steps to managers and HR — turning measurement into an ongoing action loop rather than a periodic report."
      },
      {
        "q": "What actions can a manager take directly from an alert?",
        "a": "Managers can access AI-suggested coaching guidance (e.g. conversation starters, workload adjustments, relevant resources to share) directly from a flagged alert, rather than being left to figure out next steps on their own."
      },
      {
        "q": "Is participation in wellbeing check-ins anonymous?",
        "a": "Check-ins can be configured as anonymous, confidential (visible only in aggregate), or identified, depending on your organization's culture and legal requirements. We recommend defaulting to anonymous or aggregated views to maximize honest participation."
      }
    ],
    "related": [
      "employee-experience",
      "employee-communication",
      "recognition-rewards",
      "employee-listening",
      "people-analytics"
    ],
    "footerCta": "Ready to build a workplace that truly supports its people?"
  },
  {
    "slug": "recognition-rewards",
    "name": "Recognition & Rewards",
    "cloud": "workforce-experience",
    "icon": "bell",
    "mock": "phone",
    "heroTitle": "Make Every Employee Feel Valued with AI-Powered Recognition",
    "heroLede": "Turn everyday moments into meaningful recognition — powered by AI-driven suggestions, peer-to-peer appreciation, and rewards that actually motivate.",
    "challengesTitle": "Why Modern Recognition Needs AI",
    "challenges": [
      "Recognition happens inconsistently — often only top-down, rarely peer-to-peer.",
      "Great work goes unnoticed because managers don't have time to track it.",
      "Recognition programs feel like a checkbox, not a genuine culture practice.",
      "Rewards catalogs are generic and don't reflect what employees actually value.",
      "No visibility into whether recognition is actually improving engagement or retention.",
      "Frontline and remote employees are recognized far less than office-based staff.",
      "HR can't tell which teams or managers under-recognize their people.",
      "Recognition and performance data live in separate systems, disconnected from insight."
    ],
    "pillars": [
      "AI-Powered Recognition",
      "Peer-to-Peer Appreciation",
      "Personalized Rewards",
      "Recognition Intelligence"
    ],
    "capabilities": [
      {
        "title": "AI-Suggested Recognition Moments",
        "body": "Automatically surface milestones, achievements and everyday wins worth recognizing — so nothing meaningful goes unnoticed.",
        "bullets": [
          "Surface wins and milestones managers would otherwise miss",
          "Nudge managers when recognition is overdue",
          "Make recognition a consistent habit, not an afterthought"
        ],
        "screen": "Manager Recognition Dashboard"
      },
      {
        "title": "Peer-to-Peer Recognition",
        "body": "Enable every employee, not just managers, to give and receive recognition through shout-outs, values-based badges and public appreciation feeds.",
        "bullets": [
          "Let any employee recognize any colleague, anytime",
          "Celebrate wins publicly on a shared appreciation feed",
          "Tie badges to company values, not just tasks"
        ],
        "screen": "Recognition Feed / Wall of Fame"
      },
      {
        "title": "Personalized Rewards Catalog",
        "body": "Let employees redeem points for rewards that matter to them — from gift cards to experiences to time off, tailored by role, location and preference.",
        "bullets": [
          "Offer rewards employees genuinely want, not generic swag",
          "Personalize the catalog by role, location and preference",
          "Keep budgets controlled with limits and approval workflows"
        ],
        "screen": "Rewards Catalog & Redemption"
      },
      {
        "title": "Recognition Intelligence",
        "body": "Measure recognition frequency, equity and impact across teams, and connect it directly to engagement and retention outcomes.",
        "bullets": [
          "See which teams and groups are under-recognized",
          "Track recognition equity across roles and locations",
          "Connect recognition directly to engagement and retention"
        ],
        "screen": "Recognition Analytics & Equity Report"
      }
    ],
    "aiCapabilities": [
      "AI Recognition Moment Detector",
      "AI Personalized Reward Recommendations",
      "AI Recognition Equity Analysis (who's over/under-recognized)",
      "AI Values-Alignment Tagging",
      "AI Manager Nudges (\"You haven't recognized anyone on your team this month\")",
      "AI Recognition Impact Scoring"
    ],
    "outcomes": [
      "Increase Recognition Frequency",
      "Improve Recognition Equity Across Teams",
      "Strengthen Peer-to-Peer Culture",
      "Increase Employee Retention",
      "Improve Manager Recognition Habits",
      "Boost Morale and Motivation",
      "Connect Recognition to Measurable Engagement Impact"
    ],
    "story": {
      "challenge": "A large hospitality group had a top-down recognition culture with inconsistent manager participation and low frontline visibility.",
      "solution": "Deployed Vadal.ai's Recognition & Rewards module to enable peer-to-peer recognition and AI-nudged manager participation.",
      "outcomes": "More frequent and equitable recognition, stronger frontline engagement, and improved retention among recognized employees."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "WhatsApp",
      "SMS",
      "Rewards & gift card providers",
      "Power BI",
      "Tableau"
    ],
    "faqs": [
      {
        "q": "Can employees recognize each other, not just managers recognizing employees?",
        "a": "Yes. Peer-to-peer recognition is core to the module — any employee can give recognition to any colleague, not just top-down from managers, through shout-outs and values-based badges visible on a shared feed."
      },
      {
        "q": "How does the rewards catalog get personalized per employee?",
        "a": "The AI recommends rewards based on an employee's role, location, past redemption behavior and stated preferences, so the catalog surfaces options actually relevant to them rather than a flat, generic list for everyone."
      },
      {
        "q": "Can we set budgets and approval workflows for point-based rewards?",
        "a": "Yes. Admins can configure point budgets per team or manager, set redemption limits, and add approval workflows for higher-value rewards, so recognition stays generous but controlled."
      },
      {
        "q": "How is recognition equity measured across teams?",
        "a": "The platform tracks recognition frequency and distribution across teams, roles, locations and demographics, surfacing which groups or individuals are under-recognized so HR and leaders can address gaps rather than relying on anecdotal impressions."
      },
      {
        "q": "Does this integrate with our existing HRIS and comms tools?",
        "a": "Yes — the module integrates with major HRIS platforms (Workday, SAP SuccessFactors, Oracle HCM) and communication tools (Microsoft Teams, Slack) so recognition can happen in the tools employees already use daily."
      },
      {
        "q": "Can recognition be tied to specific company values?",
        "a": "Yes. Recognition can be tagged to specific company values or behaviors, letting leadership see not just how much recognition is happening, but whether it's reinforcing the culture and behaviors that matter most to the organization."
      }
    ],
    "related": [
      "employee-experience",
      "employee-communication",
      "employee-wellbeing-culture",
      "employee-listening",
      "people-analytics"
    ],
    "footerCta": "Ready to make recognition a daily habit, not an afterthought?"
  },
  {
    "slug": "people-analytics",
    "name": "People Analytics",
    "cloud": "workforce-intelligence",
    "icon": "chart",
    "mock": "dashboard",
    "heroTitle": "Understand Your Workforce with AI-Powered People Analytics",
    "heroLede": "Turn scattered HR data into a single, real-time view of organizational health — segmented by team, location, role and demographic, and ready for action.",
    "challengesTitle": null,
    "challenges": [
      "Workforce data lives in silos across HRIS, survey tools and spreadsheets.",
      "Leaders see lagging indicators, not real-time signals.",
      "Analytics tools require a data team to interpret.",
      "No single source of truth for engagement, performance and attrition data together.",
      "Insights don't reach the managers who can actually act on them.",
      "Reporting takes days or weeks to produce."
    ],
    "pillars": [
      "Unified Data Layer",
      "Real-Time Dashboards",
      "AI-Generated Insights",
      "Manager-Level Distribution"
    ],
    "capabilities": [
      {
        "title": "Unified Workforce Dashboard",
        "body": "Bring engagement, performance, attrition and demographic data into one live view, filterable by team, location, tenure and role.",
        "bullets": [
          "One live source of truth across every workforce data silo",
          "Filter instantly by team, location, tenure and role",
          "No more stitching spreadsheets together for a full picture"
        ],
        "screen": "Workforce Health Dashboard"
      },
      {
        "title": "AI-Generated Insight Summaries",
        "body": "Automatically surface what matters (“Recognition is your biggest retention risk this quarter”) instead of requiring manual analysis.",
        "bullets": [
          "Plain-language insights delivered automatically, no analyst required",
          "The biggest risks and opportunities surfaced first",
          "Leaders act on findings instead of interpreting charts"
        ],
        "screen": "AI Insight Summary Panel"
      },
      {
        "title": "Driver-Level Analysis",
        "body": "Break down engagement into specific drivers (leadership, growth, wellbeing, recognition) to pinpoint exactly what to fix.",
        "bullets": [
          "See exactly which drivers move engagement up or down",
          "Pinpoint what to fix instead of guessing from one score",
          "Compare drivers across teams to target interventions"
        ],
        "screen": "Driver-Level Heatmap"
      },
      {
        "title": "Manager-Ready Views",
        "body": "Give every manager a personalized view of their own team's health, not just an HR-only dashboard.",
        "bullets": [
          "Every manager sees their own team's health at a glance",
          "Insights reach the people who can actually act",
          "Role-based access keeps sensitive data protected"
        ],
        "screen": "Manager Team View"
      }
    ],
    "aiCapabilities": [
      "AI Insight Generator",
      "AI Driver Analysis",
      "AI Risk Flagging",
      "AI Trend Detection",
      "AI Natural-Language Query (“Ask your workforce data a question”)"
    ],
    "outcomes": [
      "Faster, More Confident People Decisions",
      "Reduced Time-to-Insight",
      "Improved Manager Accountability",
      "Better Alignment Between HR and Business Leaders",
      "Earlier Detection of Workforce Risk"
    ],
    "story": {
      "challenge": "A large enterprise had engagement, performance and attrition data spread across five disconnected systems.",
      "solution": "Deployed Vadal.ai's People Analytics product to unify data into a single live dashboard with AI-generated insights.",
      "outcomes": "Faster reporting cycles, earlier risk detection, higher manager engagement with data."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "BambooHR",
      "ADP",
      "Power BI",
      "Tableau",
      "Microsoft Teams",
      "Slack"
    ],
    "faqs": [
      {
        "q": "How is this different from a standard HR dashboard?",
        "a": "Most HR dashboards show static numbers. People Analytics uses AI to generate plain-language insights and prioritized recommendations automatically, so leaders don't have to interpret charts themselves."
      },
      {
        "q": "Can managers see only their own team's data?",
        "a": "Yes. Role-based access ensures managers see their own team's analytics, while HR and executives see organization-wide views — protecting confidentiality while still enabling action at every level."
      },
      {
        "q": "Does this require a data science team to set up?",
        "a": "No. Dashboards and AI insights are pre-built and configure to your org structure automatically once connected to your HRIS — no custom data modeling required to get started."
      },
      {
        "q": "Can we combine engagement, performance and attrition data in one view?",
        "a": "Yes — this cross-data view is a core differentiator. Most engagement tools only show survey data; this product connects it to performance and attrition signals for a fuller picture."
      }
    ],
    "related": [
      "sentiment-intelligence",
      "benchmark-intelligence",
      "executive-reports",
      "engagement-surveys"
    ],
    "footerCta": "Ready to see your entire workforce clearly, in real time?"
  },
  {
    "slug": "sentiment-intelligence",
    "name": "Sentiment Intelligence",
    "cloud": "workforce-intelligence",
    "icon": "pulse",
    "mock": "voice",
    "heroTitle": "Know How Your Workforce Really Feels, in Real Time",
    "heroLede": "Continuously analyze sentiment from surveys, conversations and feedback to detect disengagement and risk before it shows up in your attrition numbers.",
    "challengesTitle": null,
    "challenges": [
      "Sentiment is only measured once or twice a year via formal surveys.",
      "Open-text feedback is too time-consuming to read and categorize manually.",
      "Warning signs of disengagement appear only after someone resigns.",
      "No way to track sentiment trends by team, manager or location over time.",
      "Leaders don't know if morale is improving or declining until it's too late."
    ],
    "pillars": [
      "Continuous Sentiment Capture",
      "AI Emotion & Theme Detection",
      "Predictive Risk Signals",
      "Manager-Level Alerts"
    ],
    "capabilities": [
      {
        "title": "Always-On Sentiment Tracking",
        "body": "Capture sentiment continuously through conversations, pulse checks and feedback channels, not just annual surveys.",
        "bullets": [
          "Continuous signal instead of one or two survey snapshots yearly",
          "Sentiment captured wherever employees already give feedback",
          "Track morale trends by team, manager and location over time"
        ],
        "screen": "Sentiment Trend Dashboard"
      },
      {
        "title": "AI Theme & Emotion Analysis",
        "body": "Automatically cluster open-text feedback into themes and emotional tone, surfacing what employees are really saying at scale.",
        "bullets": [
          "Thousands of open-text comments analyzed automatically",
          "Themes and emotional tone surfaced without manual reading",
          "Understand what employees are really saying, at scale"
        ],
        "screen": "Theme & Emotion Cluster View"
      },
      {
        "title": "Attrition Risk Signals",
        "body": "Identify early indicators of disengagement or flight risk based on sentiment patterns over time.",
        "bullets": [
          "Spot disengagement patterns before resignations arrive",
          "Directional risk signals prompt timely conversations",
          "Focus retention effort where sentiment is trending down"
        ],
        "screen": "Attrition Risk Alert Panel"
      },
      {
        "title": "Proactive Manager Alerts",
        "body": "Notify managers when sentiment shifts meaningfully for their team, with suggested next steps.",
        "bullets": [
          "Managers alerted the moment team sentiment shifts meaningfully",
          "Every alert comes with suggested next steps",
          "Faster, more consistent manager response to morale changes"
        ],
        "screen": "Team-Level Sentiment Heatmap"
      }
    ],
    "aiCapabilities": [
      "AI Sentiment Scoring",
      "AI Theme Clustering",
      "AI Attrition Risk Prediction",
      "AI Emotion Detection",
      "AI Early-Warning Alerts"
    ],
    "outcomes": [
      "Earlier Detection of Disengagement",
      "Reduced Regrettable Attrition",
      "Faster Response to Morale Shifts",
      "Improved Manager Awareness",
      "More Honest, Continuous Feedback Culture"
    ],
    "story": {
      "challenge": "A global technology company only discovered team disengagement after high performers began resigning.",
      "solution": "Deployed Vadal.ai's Sentiment Intelligence to track sentiment continuously and flag risk early.",
      "outcomes": "Earlier interventions, reduced regrettable attrition, improved manager response time."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "WhatsApp",
      "SMS",
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM"
    ],
    "faqs": [
      {
        "q": "How does sentiment analysis work without reading private messages?",
        "a": "The AI analyzes sentiment from feedback explicitly submitted through surveys, pulse checks, and opt-in conversational channels — not private personal communications outside the platform."
      },
      {
        "q": "Is sentiment data reported at the individual or aggregate level?",
        "a": "By default, sentiment trends are shown in aggregate at the team level to protect psychological safety; individual-level flags, where used, should be a deliberate, disclosed configuration decision."
      },
      {
        "q": "How accurate is attrition risk prediction?",
        "a": "Prediction accuracy improves with more historical data and should be treated as a directional risk signal to prompt conversation, not a certainty."
      },
      {
        "q": "Can this replace our annual engagement survey?",
        "a": "It's designed to complement, not replace, formal surveys — continuous sentiment tracking catches shifts between survey cycles, while structured surveys still provide statistically robust benchmarking."
      }
    ],
    "related": [
      "people-analytics",
      "engagement-surveys",
      "employee-listening",
      "executive-reports"
    ],
    "footerCta": "Ready to know how your people really feel — before it's too late?"
  },
  {
    "slug": "benchmark-intelligence",
    "name": "Benchmark Intelligence",
    "cloud": "workforce-intelligence",
    "icon": "globe",
    "mock": "dashboard",
    "heroTitle": "See How Your Workforce Compares — and What to Do About It",
    "heroLede": "Compare engagement, culture and performance metrics against industry, region and company-size benchmarks to know where you truly stand.",
    "challengesTitle": null,
    "challenges": [
      "Leaders don't know if their engagement scores are actually good or bad.",
      "Internal-only metrics lack external context.",
      "Benchmark data is often outdated or too broad to be useful.",
      "No visibility into how specific drivers (leadership, recognition, wellbeing) compare to peers.",
      "Board and executive reporting lacks credible external reference points."
    ],
    "pillars": [
      "Industry & Peer Benchmarking",
      "Driver-Level Comparison",
      "Continuously Updated Data",
      "Segment-Specific Benchmarks"
    ],
    "capabilities": [
      {
        "title": "Industry & Regional Benchmarks",
        "body": "Compare your scores against organizations of similar size, industry and region, refreshed continuously as new data comes in.",
        "bullets": [
          "Compare against genuinely similar organizations, not global averages",
          "Benchmarks refresh continuously as new data arrives",
          "Know whether your scores are actually good or bad"
        ],
        "screen": "Benchmark Comparison Dashboard"
      },
      {
        "title": "Driver-Level Benchmarking",
        "body": "See how you compare specifically on leadership, recognition, growth, wellbeing and other individual drivers, not just an overall score.",
        "bullets": [
          "Go beyond a single overall score",
          "Compare leadership, recognition, growth and wellbeing individually",
          "See exactly which drivers lag your peers"
        ],
        "screen": "Driver-Level Peer Gap View"
      },
      {
        "title": "Peer Gap Analysis",
        "body": "Instantly identify which areas are ahead of, at par with, or behind industry peers.",
        "bullets": [
          "Instantly see where you lead, match or trail peers",
          "Turn gaps into a clear improvement priority list",
          "Focus investment where it closes the biggest gaps"
        ],
        "screen": "Industry & Region Filter Panel"
      },
      {
        "title": "Board-Ready Comparisons",
        "body": "Package benchmark comparisons into clear visuals suitable for executive and board reporting.",
        "bullets": [
          "Clear visuals built for executive and board audiences",
          "Credible external context behind every internal metric",
          "No manual slide-building before board meetings"
        ],
        "screen": "Board-Ready Benchmark Report"
      }
    ],
    "aiCapabilities": [
      "AI Benchmark Matching (finds most relevant peer set)",
      "AI Gap Analysis",
      "AI Trend Alignment",
      "AI Statistical Significance Scoring"
    ],
    "outcomes": [
      "Credible External Context for Internal Metrics",
      "Clearer Prioritization of Improvement Areas",
      "Stronger Board and Executive Reporting",
      "Improved Confidence in People Strategy Decisions"
    ],
    "story": {
      "challenge": "A global retailer's leadership couldn't tell whether their engagement scores reflected a real problem or normal industry variation.",
      "solution": "Deployed Vadal.ai's Benchmark Intelligence to compare scores against relevant industry peers, driver by driver.",
      "outcomes": "Clearer prioritization, stronger board confidence in the people strategy."
    },
    "integrations": [
      "Power BI",
      "Tableau",
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM"
    ],
    "faqs": [
      {
        "q": "Where does the benchmark data come from?",
        "a": "Benchmark data is aggregated from anonymized data across the platform's customer base, segmented by industry, region and company size."
      },
      {
        "q": "How often are benchmarks updated?",
        "a": "Benchmarks are updated on a rolling basis as new data comes in, so comparisons stay current with the market rather than reflecting old data."
      },
      {
        "q": "Can we compare against a specific industry or region only?",
        "a": "Yes — comparisons can be filtered to specific industry, region, or company-size segments so you're compared against genuinely relevant peers, not a generic global average."
      },
      {
        "q": "Is our data included in benchmarks shown to other companies?",
        "a": "Yes, in anonymized and aggregated form only — no company-identifiable data is ever shared in benchmark comparisons shown to other customers."
      }
    ],
    "related": [
      "people-analytics",
      "executive-reports",
      "engagement-surveys",
      "sentiment-intelligence"
    ],
    "footerCta": "Ready to see exactly where you stand — and what to fix first?"
  },
  {
    "slug": "executive-reports",
    "name": "Executive Reports",
    "cloud": "workforce-intelligence",
    "icon": "checks",
    "mock": "dashboard",
    "heroTitle": "Turn Workforce Data Into Board-Ready Insight, Instantly",
    "heroLede": "Give executives and boards a clear, automated view of workforce health — without HR teams spending days building slides.",
    "challengesTitle": null,
    "challenges": [
      "Building executive reports manually takes days each cycle.",
      "Reports are static snapshots, not connected to live data.",
      "Executives get too much data and not enough clear recommendation.",
      "Different stakeholders (board, CHRO, business unit leads) need different views, but HR only has time to build one.",
      "No consistent reporting cadence across the organization."
    ],
    "pillars": [
      "Automated Report Generation",
      "Audience-Specific Views",
      "AI-Written Executive Summaries",
      "Always-Current Data"
    ],
    "capabilities": [
      {
        "title": "One-Click Executive Reports",
        "body": "Generate polished, presentation-ready reports automatically, on demand or on a set cadence.",
        "bullets": [
          "Polished, presentation-ready reports generated automatically",
          "Run on demand or on a recurring cadence",
          "Days of manual slide-building eliminated each cycle"
        ],
        "screen": "Executive Report Builder"
      },
      {
        "title": "Audience-Tailored Views",
        "body": "Produce different report formats for the board, CHRO, and business unit leaders from the same underlying data.",
        "bullets": [
          "Board, CHRO and business-unit views from one dataset",
          "Each audience sees what matters to them",
          "One build effort serves every stakeholder"
        ],
        "screen": "Board-Ready Report Template"
      },
      {
        "title": "AI-Written Summaries",
        "body": "Get a plain-language executive summary automatically generated alongside every report, highlighting what matters most.",
        "bullets": [
          "Plain-language summary attached to every report",
          "Key priorities highlighted automatically",
          "Executives get recommendations, not just data"
        ],
        "screen": "AI-Generated Summary Panel"
      },
      {
        "title": "Always Up to Date",
        "body": "Reports pull from live data, so there's no gap between what's reported and what's actually happening.",
        "bullets": [
          "Every report reflects live workforce data",
          "No lag between the numbers and reality",
          "Consistent reporting cadence without extra HR effort"
        ],
        "screen": "Report Scheduling & Distribution View"
      }
    ],
    "aiCapabilities": [
      "AI Report Generation",
      "AI Executive Summary Writer",
      "AI Key-Insight Prioritization",
      "AI Audience-Specific Formatting"
    ],
    "outcomes": [
      "Dramatically Reduced Reporting Time",
      "More Consistent Executive Visibility",
      "Better-Informed Board Decisions",
      "Improved HR Credibility with Leadership"
    ],
    "story": {
      "challenge": "A multinational enterprise's HR team spent the better part of a week each quarter manually building board reports from multiple data sources.",
      "solution": "Deployed Vadal.ai's Executive Reports to auto-generate board-ready reports directly from live workforce data.",
      "outcomes": "Reporting time cut dramatically, more consistent executive visibility into workforce health."
    },
    "integrations": [
      "Power BI",
      "Tableau",
      "Microsoft Teams",
      "Outlook",
      "Google Workspace",
      "SharePoint"
    ],
    "faqs": [
      {
        "q": "Can reports be customized for different audiences?",
        "a": "Yes — the same underlying data can generate a board-level summary, a CHRO-level deep dive, or a business-unit-specific report, each tailored to what that audience needs to see."
      },
      {
        "q": "How current is the data in each report?",
        "a": "Reports pull directly from live platform data at the time of generation, rather than a manually assembled snapshot, so there's no lag between the numbers and reality."
      },
      {
        "q": "Can reports be scheduled to generate automatically?",
        "a": "Yes — reports can be scheduled on a recurring cadence (weekly, monthly, quarterly) and distributed automatically to designated stakeholders."
      },
      {
        "q": "Does the AI summary replace the need for HR to interpret the data?",
        "a": "No — the AI summary is designed to accelerate interpretation and highlight priorities, not replace HR judgment on strategic decisions. It's a starting point for the conversation, not the final word."
      }
    ],
    "related": [
      "benchmark-intelligence",
      "people-analytics",
      "sentiment-intelligence"
    ],
    "footerCta": "Ready to stop building reports and start using them?"
  },
  {
    "slug": "pre-onboarding",
    "name": "Pre- & Onboarding",
    "cloud": "talent-intelligence",
    "icon": "rocket",
    "mock": "phone",
    "heroTitle": "Turn New Hires Into Productive Team Members, Faster",
    "heroLede": "Deliver personalized, AI-guided onboarding journeys from offer acceptance through the first 90 days — reducing early attrition and accelerating time-to-productivity.",
    "challengesTitle": null,
    "challenges": [
      "Candidates go quiet or drop off between offer and start date.",
      "Onboarding is generic, not tailored to role or location.",
      "New hires don't know who to ask for help or where to find information.",
      "Early attrition is high because the first weeks feel disorganized.",
      "Managers don't have visibility into how onboarding is actually going.",
      "Document collection and compliance tasks slow down day-one readiness."
    ],
    "pillars": [
      "Candidate Engagement Pre-Start",
      "AI-Personalized Onboarding Journeys",
      "Automated Admin & Compliance",
      "Manager Visibility"
    ],
    "capabilities": [
      {
        "title": "Pre-Boarding Engagement",
        "body": "Keep candidates engaged and informed between offer acceptance and start date with automated check-ins, reducing no-shows and drop-offs.",
        "bullets": [
          "Automated check-ins keep candidates warm before day one",
          "Spot drop-off risk early, while there's still time to act",
          "Candidates arrive informed instead of anxious and silent"
        ],
        "screen": "Pre-Boarding Candidate Portal"
      },
      {
        "title": "Personalized Onboarding Journeys",
        "body": "Tailor the first 90 days to role, location and seniority, with AI adjusting the journey based on progress and engagement.",
        "bullets": [
          "Journeys tailored to role, location and seniority",
          "AI adapts the path as progress and engagement change",
          "Replaces one generic checklist with a relevant experience"
        ],
        "screen": "Onboarding Journey Timeline"
      },
      {
        "title": "Automated Document & Compliance Collection",
        "body": "Auto-collect required documents and guide new hires through policies and processes without manual chasing.",
        "bullets": [
          "Documents collected automatically, no manual chasing",
          "New hires are guided through policies step by step",
          "Faster day-one readiness with less HR workload"
        ],
        "screen": "Document Collection Workflow"
      },
      {
        "title": "Manager Onboarding Dashboard",
        "body": "Give managers real-time visibility into how their new hire's onboarding is progressing, with alerts if something's off track.",
        "bullets": [
          "Real-time view of every new hire's progress",
          "Alerts flag when onboarding goes off track",
          "Managers can step in early, before problems grow"
        ],
        "screen": "Manager Onboarding Dashboard"
      }
    ],
    "aiCapabilities": [
      "AI Candidate Risk Scoring (drop-off prediction)",
      "AI Onboarding Journey Personalization",
      "AI FAQ & Policy Assistant",
      "AI Document Collection Automation",
      "AI Onboarding Sentiment Tracking"
    ],
    "outcomes": [
      "Reduced Candidate Drop-Off",
      "Faster Time-to-Productivity",
      "Reduced Early (First-90-Days) Attrition",
      "Improved New-Hire Satisfaction",
      "Reduced Manual HR Onboarding Workload"
    ],
    "story": {
      "challenge": "A fast-growing enterprise saw a high rate of new-hire drop-off between offer acceptance and start date, plus inconsistent onboarding across regions.",
      "solution": "Deployed Vadal.ai's Pre- & Onboarding product to automate pre-start engagement and personalize the first 90 days.",
      "outcomes": "Reduced drop-off, faster ramp-up, improved new-hire retention."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "Greenhouse",
      "Lever",
      "Microsoft Teams",
      "Slack",
      "Outlook",
      "Google Workspace",
      "WhatsApp",
      "SMS"
    ],
    "faqs": [
      {
        "q": "Can onboarding journeys differ by role or location?",
        "a": "Yes — journeys are configured by role, department, location and seniority, so a frontline hire and a corporate new manager each get a relevant, tailored path rather than one generic checklist."
      },
      {
        "q": "Does this help before day one, or only after?",
        "a": "Both — the product engages candidates from offer acceptance through their first 90 days, addressing the critical pre-start period where drop-off risk is highest."
      },
      {
        "q": "Can managers see if a new hire is struggling?",
        "a": "Yes. Managers get real-time visibility into onboarding progress and engagement signals, with alerts if a new hire appears disengaged or behind, so they can step in early."
      },
      {
        "q": "Does it integrate with our ATS and HRIS?",
        "a": "Yes — it's designed to integrate with common applicant tracking systems (e.g. Greenhouse, Lever) and HRIS platforms (Workday, SAP SuccessFactors, Oracle HCM) to pull candidate and employee data automatically."
      }
    ],
    "related": [
      "employee-experience",
      "skills-intelligence",
      "employee-communication",
      "engagement-surveys"
    ],
    "footerCta": "Ready to make every new hire's first 90 days count?"
  },
  {
    "slug": "skills-intelligence",
    "name": "Skills Intelligence",
    "cloud": "talent-intelligence",
    "icon": "graduation",
    "mock": "dashboard",
    "heroTitle": "Know the Skills You Have — and the Skills You Need",
    "heroLede": "Map, track and develop workforce skills with AI, so you always know your organization's capability gaps before they become business risks.",
    "challengesTitle": null,
    "challenges": [
      "Organizations don't have an accurate, current picture of workforce skills.",
      "Skills data lives in outdated resumes or disconnected LMS systems.",
      "Leaders can't tell if they have the capability to execute strategic plans.",
      "Reskilling and upskilling investment is guesswork, not data-driven.",
      "Employees don't have visibility into their own skill gaps or growth paths.",
      "Critical skill gaps are discovered only when a project stalls."
    ],
    "pillars": [
      "AI Skills Mapping",
      "Gap Analysis Against Business Needs",
      "Personalized Development Paths",
      "Organization-Wide Skills Visibility"
    ],
    "capabilities": [
      {
        "title": "AI-Powered Skills Mapping",
        "body": "Automatically build and maintain a live skills inventory across the organization, drawing from role data, training history and self-assessment.",
        "bullets": [
          "A live skills inventory that stays current automatically",
          "Draws on role data, training history and assessments",
          "Replaces stale resumes with real capability data"
        ],
        "screen": "Organization Skills Map"
      },
      {
        "title": "Capability Gap Analysis",
        "body": "Compare current organizational skills against future business needs to identify where gaps put strategy at risk.",
        "bullets": [
          "See exactly where skills fall short of strategy",
          "Surface gaps before they stall key initiatives",
          "Prioritize reskilling where it protects the business most"
        ],
        "screen": "Capability Gap Dashboard"
      },
      {
        "title": "Personalized Development Recommendations",
        "body": "Suggest individualized upskilling or reskilling paths based on each employee's current skills and career goals.",
        "bullets": [
          "Every employee gets a tailored growth path",
          "Recommendations reflect current skills and career goals",
          "Turns skills data into action, not just reporting"
        ],
        "screen": "Individual Development Path View"
      },
      {
        "title": "Skills Visibility Dashboard",
        "body": "Give leaders a real-time view of organizational capability, by team, department or strategic initiative.",
        "bullets": [
          "Real-time capability view across the whole organization",
          "Slice by team, department or strategic initiative",
          "Leaders plan with evidence instead of assumptions"
        ],
        "screen": "Skills-by-Team Heatmap"
      }
    ],
    "aiCapabilities": [
      "AI Skills Extraction & Mapping",
      "AI Gap Analysis",
      "AI Development Path Recommendations",
      "AI Skills Trend Forecasting"
    ],
    "outcomes": [
      "Data-Driven Reskilling & Upskilling Investment",
      "Reduced Risk from Capability Gaps",
      "Improved Internal Mobility",
      "Stronger Alignment Between Skills and Strategy",
      "Increased Employee Growth Visibility"
    ],
    "story": {
      "challenge": "A large enterprise discovered a critical skills gap only after a key strategic project stalled.",
      "solution": "Deployed Vadal.ai's Skills Intelligence to map organizational capability and proactively flag gaps against future needs.",
      "outcomes": "Earlier gap detection, more targeted reskilling investment, improved internal mobility."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "LMS platforms",
      "Microsoft Teams",
      "Slack"
    ],
    "faqs": [
      {
        "q": "How does the AI know what skills employees actually have?",
        "a": "Skills data is built from a combination of role history, completed training/certifications, and structured self- and manager-assessments — not just inferred from a job title or resume."
      },
      {
        "q": "Can this tell us if we have the skills to execute a specific strategic initiative?",
        "a": "Yes — that's a core use case. You can define the capability requirements for an initiative and compare them against current organizational skills to surface exactly where the gaps are."
      },
      {
        "q": "Do employees see their own skills profile?",
        "a": "Yes — employees can see their own skills profile and recommended development paths, which helps drive engagement with growth opportunities rather than treating skills data as HR-only."
      },
      {
        "q": "How is this different from a standard LMS?",
        "a": "An LMS tracks what training was completed. Skills Intelligence goes further — mapping actual capability against business needs and recommending what to develop next, not just tracking course completion."
      }
    ],
    "related": [
      "leadership-intelligence",
      "workforce-planning",
      "pre-onboarding"
    ],
    "footerCta": "Ready to know your organization's real capability — and close the gaps that matter?"
  },
  {
    "slug": "leadership-intelligence",
    "name": "Leadership Intelligence",
    "cloud": "talent-intelligence",
    "icon": "users",
    "mock": "dashboard",
    "heroTitle": "Develop Leaders Who Actually Drive Engagement",
    "heroLede": "Use AI to identify leadership strengths and gaps, connect leadership behavior to team engagement outcomes, and guide targeted development.",
    "challengesTitle": null,
    "challenges": [
      "Leadership development programs aren't connected to actual team engagement data.",
      "Organizations can't tell which managers are effective versus which are struggling.",
      "360 feedback happens once a year and quickly goes stale.",
      "High-potential leaders aren't identified systematically.",
      "Leadership gaps are only discovered after a team's engagement collapses.",
      "Coaching and development budgets aren't targeted to where they'd have the most impact."
    ],
    "pillars": [
      "Leadership-to-Engagement Correlation",
      "Continuous 360 Feedback",
      "AI-Identified Development Needs",
      "High-Potential Identification"
    ],
    "capabilities": [
      {
        "title": "Leadership Impact Scoring",
        "body": "Connect individual manager behavior directly to their team's engagement and performance outcomes, not just self-reported competency.",
        "bullets": [
          "Ties each manager's behavior to real team outcomes",
          "Reveals which leaders lift engagement and which drag it",
          "Grounded in outcomes, not self-reported competency"
        ],
        "screen": "Leadership Impact Dashboard"
      },
      {
        "title": "Continuous 360 Feedback",
        "body": "Replace static annual reviews with lightweight, continuous peer and team feedback loops.",
        "bullets": [
          "Lightweight feedback loops instead of annual events",
          "Development plans stay current, never stale",
          "Peers and teams contribute without survey fatigue"
        ],
        "screen": "Continuous 360 Feedback Interface"
      },
      {
        "title": "AI-Recommended Development Plans",
        "body": "Get specific, data-driven coaching recommendations for each leader based on their actual impact patterns.",
        "bullets": [
          "Coaching recommendations specific to each leader",
          "Built from actual impact patterns, not generic curricula",
          "Directs development spend where it matters most"
        ],
        "screen": "Individual Leader Development Plan"
      },
      {
        "title": "High-Potential Identification",
        "body": "Surface emerging leaders based on real behavioral and outcome data, not just tenure or self-nomination.",
        "bullets": [
          "Emerging leaders surfaced from real behavioral data",
          "Removes tenure and self-nomination bias from the pipeline",
          "Strengthens succession planning with evidence"
        ],
        "screen": "High-Potential Talent View"
      }
    ],
    "aiCapabilities": [
      "AI Leadership Impact Scoring",
      "AI 360 Feedback Synthesis",
      "AI Development Plan Generator",
      "AI High-Potential Identification"
    ],
    "outcomes": [
      "Stronger Correlation Between Leadership Investment and Engagement",
      "More Targeted Coaching and Development Spend",
      "Earlier Identification of Struggling Managers",
      "Improved Leadership Pipeline Visibility",
      "Reduced Team-Level Attrition Driven by Poor Management"
    ],
    "story": {
      "challenge": "A global enterprise invested heavily in leadership training but couldn't demonstrate its impact on team engagement.",
      "solution": "Deployed Vadal.ai's Leadership Intelligence to connect manager behavior directly to team outcomes and target coaching accordingly.",
      "outcomes": "More targeted development investment, measurable engagement improvement in coached teams."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "Microsoft Teams",
      "Slack",
      "LMS platforms"
    ],
    "faqs": [
      {
        "q": "How is leadership impact measured?",
        "a": "By correlating each manager's team-level engagement, retention and performance trends with that manager specifically — over time, not from a single survey snapshot."
      },
      {
        "q": "Is this used for punitive performance management?",
        "a": "It's designed as a development tool to guide coaching and support, not as a standalone disciplinary mechanism — how it's used in performance decisions is a policy choice your organization should set deliberately."
      },
      {
        "q": "How often does 360 feedback happen?",
        "a": "Feedback is collected continuously in lightweight increments rather than as a single annual event, so development plans stay current rather than based on stale data."
      },
      {
        "q": "Can this help us identify future leaders?",
        "a": "Yes — high-potential identification draws on real engagement and impact data to surface emerging leaders who might otherwise be overlooked by tenure-based or self-nomination processes."
      }
    ],
    "related": [
      "skills-intelligence",
      "workforce-planning",
      "people-analytics"
    ],
    "footerCta": "Ready to know which leaders actually drive engagement — and develop the rest?"
  },
  {
    "slug": "workforce-planning",
    "name": "Workforce Planning",
    "cloud": "talent-intelligence",
    "icon": "compass",
    "mock": "dashboard",
    "heroTitle": "Plan Your Workforce with the Same Rigor as Your Budget",
    "heroLede": "Use AI-powered forecasting to align headcount, skills and org design with business strategy — before gaps become crises.",
    "challengesTitle": null,
    "challenges": [
      "Workforce planning happens in spreadsheets, disconnected from real skills or engagement data.",
      "Headcount decisions are reactive, not tied to strategic forecasting.",
      "Leaders can't model the impact of attrition, growth, or reorganization scenarios.",
      "Skills gaps aren't factored into hiring and planning decisions.",
      "Workforce plans go stale the moment they're finalized.",
      "HR and Finance often plan headcount independently, with misaligned assumptions."
    ],
    "pillars": [
      "AI-Powered Scenario Modeling",
      "Skills-Aware Planning",
      "Real-Time Plan Updates",
      "Cross-Functional Alignment"
    ],
    "capabilities": [
      {
        "title": "Scenario Modeling",
        "body": "Model the impact of growth, attrition, restructuring or new strategic initiatives on headcount and cost before committing.",
        "bullets": [
          "Compare growth, attrition and restructuring scenarios side by side",
          "See headcount and cost impact before committing",
          "Make workforce decisions with strategic foresight"
        ],
        "screen": "Scenario Modeling Dashboard"
      },
      {
        "title": "Skills-Aware Workforce Plans",
        "body": "Factor in current skills data and gaps directly into hiring and development planning, not just headcount numbers.",
        "bullets": [
          "Plans reflect real capability gaps, not just headcount",
          "Hiring priorities grounded in actual skills data",
          "Development and hiring planned together, not separately"
        ],
        "screen": "Skills-Aware Headcount Plan"
      },
      {
        "title": "Living Workforce Plans",
        "body": "Keep plans continuously updated with real attrition, hiring and business data, rather than static once-a-year documents.",
        "bullets": [
          "Plans update continuously with live attrition and hiring data",
          "No more stale once-a-year planning documents",
          "Variance from plan is visible as it happens"
        ],
        "screen": "Real-Time Plan Tracking View"
      },
      {
        "title": "HR-Finance Alignment View",
        "body": "Give HR and Finance a shared, common view of workforce plans and assumptions to reduce planning friction.",
        "bullets": [
          "One shared view of plans and assumptions",
          "Ends HR and Finance planning from different numbers",
          "Less friction, faster planning cycles"
        ],
        "screen": "HR-Finance Shared Planning Interface"
      }
    ],
    "aiCapabilities": [
      "AI Scenario Modeling",
      "AI Attrition Forecasting",
      "AI Skills-Gap-Aware Hiring Recommendations",
      "AI Plan Variance Alerts"
    ],
    "outcomes": [
      "More Strategic, Less Reactive Hiring",
      "Reduced Planning Cycle Time",
      "Better HR-Finance Alignment",
      "Improved Preparedness for Growth or Disruption",
      "Reduced Risk from Undetected Skills Gaps in Plans"
    ],
    "story": {
      "challenge": "A large enterprise planned headcount in spreadsheets disconnected from real skills and attrition data, leading to reactive, last-minute hiring.",
      "solution": "Deployed Vadal.ai's Workforce Planning to model scenarios and keep plans continuously updated with live data.",
      "outcomes": "More strategic hiring decisions, reduced planning cycle time, improved HR-Finance alignment."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "Power BI",
      "Tableau",
      "Microsoft Excel"
    ],
    "faqs": [
      {
        "q": "Can we model different growth or restructuring scenarios?",
        "a": "Yes — scenario modeling lets you compare the headcount, cost and skills impact of different strategic paths side by side before committing to one."
      },
      {
        "q": "Does this replace our Finance headcount planning process?",
        "a": "It's designed to complement Finance's process by giving HR and Finance a shared, data-grounded view of workforce assumptions — not to replace Finance's ownership of budget decisions."
      },
      {
        "q": "How does skills data factor into workforce plans?",
        "a": "Plans account for current skills gaps identified through Skills Intelligence, so hiring and development recommendations reflect actual capability needs, not just headcount targets."
      },
      {
        "q": "How often do workforce plans update?",
        "a": "Plans are designed to update continuously as real attrition, hiring and business data come in, rather than being fixed once and revisited only annually."
      }
    ],
    "related": [
      "skills-intelligence",
      "leadership-intelligence",
      "people-analytics",
      "executive-reports"
    ],
    "footerCta": "Ready to plan your workforce with real data, not guesswork?"
  },
  {
    "slug": "engagement-surveys",
    "name": "Engagement Surveys",
    "cloud": "ai-engagement",
    "icon": "pulse",
    "mock": "dashboard",
    "heroTitle": "Listen to Your Workforce, Continuously and Intelligently",
    "heroLede": "Run AI-powered engagement, pulse and lifecycle surveys that adapt to your organization and turn feedback into action — not just a report.",
    "challengesTitle": null,
    "challenges": [
      "Annual surveys are too infrequent to catch problems as they happen.",
      "Survey fatigue reduces participation and honesty over time.",
      "Open-text feedback is time-consuming to analyze manually.",
      "Frontline and deskless employees are hard to reach via email-based surveys.",
      "Survey results rarely translate into consistent, tracked action.",
      "Leaders don't know which questions actually predict engagement or attrition."
    ],
    "pillars": [
      "AI-Personalized Survey Design",
      "Multi-Channel Distribution",
      "AI-Powered Analysis",
      "Connected Action Planning"
    ],
    "capabilities": [
      {
        "title": "Adaptive Survey Design",
        "body": "Automatically personalize survey timing, length and questions based on employee lifecycle stage and past engagement, reducing fatigue.",
        "bullets": [
          "Surveys adapt to each employee's lifecycle stage automatically",
          "Shorter, better-timed surveys keep participation honest and high",
          "No more one-size-fits-all questionnaires on a fixed schedule"
        ],
        "screen": "Survey Builder & Template Library"
      },
      {
        "title": "Omnichannel Distribution",
        "body": "Reach every employee — desk-based or frontline — via email, SMS, WhatsApp, Teams, Slack, or QR code, no company email required.",
        "bullets": [
          "Include frontline and deskless workers without a corporate inbox",
          "Meet employees on the channels they already use daily",
          "One survey, distributed everywhere from a single panel"
        ],
        "screen": "Omnichannel Distribution Panel"
      },
      {
        "title": "AI-Powered Feedback Analysis",
        "body": "Automatically cluster open-text responses into themes and sentiment, surfacing what employees are really saying without manual review.",
        "bullets": [
          "Themes emerge automatically — no manual reading of comments",
          "Sentiment scoring shows how strongly employees feel",
          "Spot what matters most in minutes, not weeks"
        ],
        "screen": "AI Feedback Theme Analysis"
      },
      {
        "title": "Connected Action Planning",
        "body": "Turn survey insights directly into assigned, trackable action plans — closing the loop between feedback and follow-through.",
        "bullets": [
          "Every insight becomes an owned, trackable action item",
          "Employees see feedback lead to visible change",
          "Close the loop instead of ending at a report"
        ],
        "screen": "Action Plan Tracker"
      }
    ],
    "aiCapabilities": [
      "AI Survey Question Recommendation",
      "AI Open-Text Theme Clustering",
      "AI Sentiment Scoring",
      "AI Survey Fatigue Reduction (adaptive frequency/length)",
      "AI Action Plan Recommendations"
    ],
    "outcomes": [
      "Higher Survey Participation Rates",
      "Faster Time from Feedback to Action",
      "Reduced Survey Fatigue",
      "Improved Reach to Frontline and Deskless Employees",
      "More Statistically Reliable Engagement Data"
    ],
    "story": {
      "challenge": "A large enterprise struggled with declining survey participation and no consistent process for acting on results.",
      "solution": "Deployed Vadal.ai's Engagement Surveys with omnichannel distribution and connected action planning.",
      "outcomes": "Increased participation, faster action on feedback, improved frontline reach."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "WhatsApp",
      "SMS",
      "Outlook",
      "Google Workspace",
      "Workday",
      "SAP SuccessFactors",
      "Power BI",
      "Tableau"
    ],
    "faqs": [
      {
        "q": "Can surveys reach frontline employees without a company email address?",
        "a": "Yes — surveys can be distributed via SMS, WhatsApp, QR code or kiosk, in addition to email and workplace chat tools, so frontline and deskless employees are included without needing a corporate inbox."
      },
      {
        "q": "How does AI reduce survey fatigue?",
        "a": "The AI adapts survey length, frequency and question selection per employee or segment based on lifecycle stage and past engagement, rather than sending every employee the same lengthy survey on a fixed schedule."
      },
      {
        "q": "Does open-text feedback get analyzed automatically?",
        "a": "Yes — open-text responses are automatically clustered into themes and scored for sentiment, so HR doesn't need to manually read through thousands of comments to find patterns."
      },
      {
        "q": "What happens after a survey closes — does it just produce a report?",
        "a": "No — results feed directly into connected action planning, where specific action items can be assigned to owners and tracked, closing the loop between feedback and real follow-through rather than ending at a static report."
      },
      {
        "q": "Can we run different survey types (annual, pulse, lifecycle, eNPS) from the same platform?",
        "a": "Yes — annual engagement, pulse, lifecycle (onboarding-to-exit) and eNPS surveys all run from the same platform and template library, so you're not managing multiple disconnected survey tools."
      }
    ],
    "related": [
      "sentiment-intelligence",
      "employee-listening",
      "feedback-intelligence",
      "action-planning"
    ],
    "footerCta": "Ready to turn feedback into action, continuously?"
  },
  {
    "slug": "employee-listening",
    "name": "Continuous Employee Listening",
    "cloud": "ai-engagement",
    "icon": "chat",
    "mock": "voice",
    "heroTitle": "Actively Listen and Engage With Your Workforce Every Day, Not Once a Year",
    "heroLede": "Move beyond annual surveys to an always-on listening system that captures employee voice across every channel and moment of the lifecycle.",
    "challengesTitle": null,
    "challenges": [
      "Annual surveys create long blind spots between measurement points.",
      "Issues surface only after they've already damaged morale or driven attrition.",
      "Different lifecycle stages (onboarding, exit, post-promotion) aren't listened to distinctly.",
      "Employees feel surveyed at, not listened to.",
      "Feedback arrives through scattered, disconnected channels.",
      "There's no continuous signal to tell leaders whether things are improving."
    ],
    "pillars": [
      "Always-On Multi-Channel Listening",
      "Lifecycle-Based Listening",
      "Real-Time Signal Detection",
      "Unified Employee Voice"
    ],
    "capabilities": [
      {
        "title": "Always-On Listening Channels",
        "body": "Capture employee voice continuously through pulses, conversations, open feedback and lifecycle touchpoints — not just scheduled surveys.",
        "bullets": [
          "Employee voice flows in continuously, not on a survey calendar",
          "Pulses, conversations and open feedback all feed one system",
          "Employees feel heard rather than surveyed at"
        ],
        "screen": "Channel Coverage View"
      },
      {
        "title": "Lifecycle Listening",
        "body": "Automatically listen at key moments (onboarding, post-promotion, pre-exit) with stage-appropriate questions.",
        "bullets": [
          "Onboarding, promotion and pre-exit moments trigger listening automatically",
          "Questions fit where each employee actually is in their journey",
          "No lifecycle stage goes unheard"
        ],
        "screen": "Lifecycle Listening Timeline"
      },
      {
        "title": "Real-Time Signal Detection",
        "body": "Surface emerging issues as they happen rather than waiting for the next survey cycle.",
        "bullets": [
          "Catch problems before they damage morale or drive attrition",
          "Anomalies surface as alerts, not annual surprises",
          "Leaders see whether things are improving, continuously"
        ],
        "screen": "Real-Time Signal Feed"
      },
      {
        "title": "Unified Voice Stream",
        "body": "Bring feedback from every channel into one continuous, analyzable stream.",
        "bullets": [
          "Scattered channels merge into a single analyzable stream",
          "One place to understand what the whole workforce is saying",
          "Comparable insight across every source of feedback"
        ],
        "screen": "Continuous Listening Dashboard"
      }
    ],
    "aiCapabilities": [
      "AI Signal Detection",
      "AI Lifecycle Question Selection",
      "AI Anomaly Alerts",
      "AI Voice Stream Clustering"
    ],
    "outcomes": [
      "Earlier Issue Detection",
      "Reduced Blind Spots Between Surveys",
      "More Representative Employee Voice",
      "Improved Lifecycle Experience",
      "Continuous Rather Than Point-in-Time Insight"
    ],
    "story": {
      "challenge": "A global retailer relied on one annual survey and repeatedly discovered problems months too late.",
      "solution": "Deployed Vadal.ai's Continuous Employee Listening for always-on, lifecycle-based feedback.",
      "outcomes": "Faster issue detection, fewer surprises between cycles, richer employee voice."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "WhatsApp",
      "SMS",
      "Outlook",
      "Workday",
      "SAP SuccessFactors"
    ],
    "faqs": [
      {
        "q": "How is continuous listening different from just running more surveys?",
        "a": "It combines lightweight pulses, conversational feedback and lifecycle-triggered check-ins into one always-on stream, rather than repeatedly sending full-length surveys — which reduces fatigue while increasing signal."
      },
      {
        "q": "Won't listening this often overwhelm employees?",
        "a": "No — the system is designed to vary channel, length and frequency intelligently, so employees experience relevant, occasional touchpoints rather than constant survey requests."
      },
      {
        "q": "Does this replace the annual engagement survey?",
        "a": "It complements it. The annual survey still provides deep, statistically robust benchmarking; continuous listening fills the gaps between cycles."
      },
      {
        "q": "Can we listen differently at different lifecycle stages?",
        "a": "Yes — onboarding, post-promotion, and pre-exit moments each trigger stage-appropriate listening, so feedback reflects where each employee actually is in their journey."
      }
    ],
    "related": [
      "engagement-surveys",
      "feedback-intelligence",
      "action-planning",
      "sentiment-intelligence"
    ],
    "footerCta": "Ready to hear your workforce continuously, not just once a year?"
  },
  {
    "slug": "feedback-intelligence",
    "name": "Feedback Intelligence",
    "cloud": "ai-engagement",
    "icon": "spark",
    "mock": "voice",
    "heroTitle": "Turn Thousands of Comments Into Clear, Actionable Insight",
    "heroLede": "Let AI read, categorize and prioritize every piece of employee feedback so nothing important gets lost in the noise.",
    "challengesTitle": null,
    "challenges": [
      "Open-text feedback is too voluminous to read and analyze manually.",
      "Important signals get buried under routine comments.",
      "Manual categorization is slow, inconsistent and subjective.",
      "Leaders can't tell which themes are rising or fading over time.",
      "Multilingual feedback is especially hard to analyze consistently.",
      "The same issue gets described in many different ways."
    ],
    "pillars": [
      "AI Theme Clustering",
      "Sentiment & Emotion Scoring",
      "Priority Ranking",
      "Trend Tracking"
    ],
    "capabilities": [
      {
        "title": "Automatic Theme Clustering",
        "body": "Group thousands of open-text comments into coherent themes automatically, no manual tagging required.",
        "bullets": [
          "Differently-worded comments about the same issue cluster together",
          "No manual tagging, reading or spreadsheet coding",
          "Coherent themes instead of an unreadable comment pile"
        ],
        "screen": "Theme Cluster Dashboard"
      },
      {
        "title": "Sentiment & Emotion Analysis",
        "body": "Score each theme and comment for sentiment and emotional intensity to reveal not just what's said but how strongly it's felt.",
        "bullets": [
          "See how strongly employees feel, not just what they say",
          "Intense minority concerns aren't drowned out by routine volume",
          "Emotional intensity mapped across every theme"
        ],
        "screen": "Sentiment Intensity Heatmap"
      },
      {
        "title": "Priority Ranking",
        "body": "Surface the themes that matter most based on frequency, sentiment intensity and business impact.",
        "bullets": [
          "Know exactly which themes to fix first",
          "Ranking blends frequency, intensity and business impact",
          "Drill into any theme to see the underlying comments"
        ],
        "screen": "Priority Themes Panel"
      },
      {
        "title": "Multilingual Analysis",
        "body": "Analyze feedback consistently across languages, so global organizations get one comparable view.",
        "bullets": [
          "One comparable view across every language and region",
          "Consistent categorization for global organizations",
          "Track how themes rise or fade over time, everywhere"
        ],
        "screen": "Theme Trend-Over-Time View"
      }
    ],
    "aiCapabilities": [
      "AI Theme Clustering",
      "AI Sentiment & Emotion Scoring",
      "AI Priority Ranking",
      "AI Multilingual Analysis",
      "AI Semantic Relationship Mapping"
    ],
    "outcomes": [
      "Dramatically Faster Feedback Analysis",
      "More Consistent, Objective Categorization",
      "Earlier Detection of Emerging Themes",
      "Better Prioritization of What to Fix",
      "Consistent Global Feedback Understanding"
    ],
    "story": {
      "challenge": "A multinational enterprise collected thousands of open-text comments each cycle but had no way to analyze them at scale.",
      "solution": "Deployed Vadal.ai's Feedback Intelligence to auto-cluster, score and prioritize feedback themes.",
      "outcomes": "Faster analysis, clearer priorities, earlier detection of rising issues."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "Microsoft Teams",
      "Slack",
      "Power BI",
      "Tableau"
    ],
    "faqs": [
      {
        "q": "How does the AI categorize open-text feedback?",
        "a": "It uses natural-language processing to cluster comments by underlying theme and meaning — grouping differently-worded comments about the same issue together rather than relying on keyword matching or manual tags."
      },
      {
        "q": "Can it handle feedback in multiple languages?",
        "a": "Yes — feedback is analyzed consistently across languages so global organizations get one comparable view rather than separate, incomparable analyses per region."
      },
      {
        "q": "How does it decide which themes are most important?",
        "a": "Themes are ranked using a combination of how often they appear, how strong the sentiment is, and their likely business impact — so a small number of intense comments isn't drowned out by routine volume."
      },
      {
        "q": "Is the analysis a black box, or can we see why a theme was flagged?",
        "a": "You can drill into any theme to see the underlying comments that make it up, so the analysis is transparent and reviewable rather than an unexplained score."
      }
    ],
    "related": [
      "engagement-surveys",
      "employee-listening",
      "action-planning",
      "sentiment-intelligence"
    ],
    "footerCta": "Ready to understand every piece of feedback, at scale?"
  },
  {
    "slug": "action-planning",
    "name": "Action Planning",
    "cloud": "ai-engagement",
    "icon": "checks",
    "mock": "dashboard",
    "heroTitle": "Close the Loop From Feedback to Real Action",
    "heroLede": "Turn insights into assigned, tracked action plans with AI-recommended next steps, so feedback leads to change instead of another report.",
    "challengesTitle": null,
    "challenges": [
      "Surveys generate insight but rarely lead to consistent action.",
      "Managers don't know what to do with survey results.",
      "Action items get assigned but never tracked to completion.",
      "There's no accountability loop between feedback and follow-through.",
      "Employees stop responding when they see nothing changes (\"survey fatigue born of inaction\").",
      "HR can't see which teams are actually acting on feedback."
    ],
    "pillars": [
      "AI-Recommended Actions",
      "Assigned & Tracked Plans",
      "Manager Accountability",
      "Impact Measurement"
    ],
    "capabilities": [
      {
        "title": "AI-Recommended Action Steps",
        "body": "Automatically suggest contextually relevant actions based on each team's specific feedback, so managers aren't left guessing.",
        "bullets": [
          "Recommendations tailored to each team's specific feedback themes",
          "Drawn from a library of proven actions, not generic advice",
          "Managers know exactly where to start"
        ],
        "screen": "AI Action Recommendation Panel"
      },
      {
        "title": "Assigned, Trackable Action Plans",
        "body": "Turn recommendations into owned action items with due dates, tracked to completion.",
        "bullets": [
          "Every action has an owner and a due date",
          "Progress is visible on a shared, drag-and-drop board",
          "Nothing gets assigned and then forgotten"
        ],
        "screen": "Action Plan Board (drag-and-drop)"
      },
      {
        "title": "Manager Accountability Loop",
        "body": "Give HR visibility into which managers and teams are acting on feedback and which aren't.",
        "bullets": [
          "See which teams follow through and which need a nudge",
          "Accountability without HR chasing managers manually",
          "Builds a culture of responsiveness across the organization"
        ],
        "screen": "Manager Accountability Dashboard"
      },
      {
        "title": "Impact Measurement",
        "body": "Track whether completed actions actually moved engagement, closing the full loop.",
        "bullets": [
          "Learn which interventions genuinely move the needle",
          "Connect completed actions to subsequent engagement change",
          "Prove that feedback leads to real outcomes"
        ],
        "screen": "Action Impact Tracker"
      }
    ],
    "aiCapabilities": [
      "AI Action Recommendations",
      "AI Action Template Matching",
      "AI Priority Suggestions",
      "AI Impact Correlation"
    ],
    "outcomes": [
      "Higher Rate of Follow-Through on Feedback",
      "Improved Manager Ownership of Engagement",
      "Measurable Link Between Action and Outcomes",
      "Reduced Inaction-Driven Survey Fatigue",
      "Stronger Culture of Responsiveness"
    ],
    "story": {
      "challenge": "A large enterprise ran regular surveys but had no consistent process to act on results, and participation was declining as a result.",
      "solution": "Deployed Vadal.ai's Action Planning with AI-recommended actions and manager accountability tracking.",
      "outcomes": "Higher follow-through, improved manager ownership, recovering participation rates."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "Workday",
      "SAP SuccessFactors",
      "Outlook"
    ],
    "faqs": [
      {
        "q": "How does the AI know what actions to recommend?",
        "a": "Recommendations are generated from each team's specific feedback themes and drivers, drawing on a library of proven actions — so suggestions are contextual to that team, not generic advice."
      },
      {
        "q": "Can we assign actions to specific owners and track them?",
        "a": "Yes — actions become owned items with due dates, tracked to completion on a shared board, so accountability is clear and progress is visible."
      },
      {
        "q": "Can HR see which teams are acting on feedback?",
        "a": "Yes — an accountability view shows which managers and teams are following through and which need a nudge, without HR having to chase manually."
      },
      {
        "q": "Can we tell whether an action actually worked?",
        "a": "Yes — the product tracks whether completed actions correlate with subsequent engagement improvement, so you can learn which interventions genuinely move the needle."
      }
    ],
    "related": [
      "engagement-surveys",
      "feedback-intelligence",
      "employee-listening",
      "people-analytics"
    ],
    "footerCta": "Ready to make feedback lead to real change?"
  },
  {
    "slug": "ai-employee-chat",
    "name": "AI Employee Chat",
    "cloud": "digital-workplace",
    "icon": "chat",
    "mock": "phone",
    "heroTitle": "An AI Assistant That Answers Every Employee, Instantly",
    "heroLede": "Give every employee a 24/7 conversational AI that resolves HR and IT queries, guides them through processes, and escalates only when it should.",
    "challengesTitle": null,
    "challenges": [
      "HR and IT teams are overwhelmed with repetitive routine queries.",
      "Employees wait hours or days for answers to simple questions.",
      "Frontline and remote employees have no easy way to get help.",
      "Knowledge is scattered across policies, portals and people.",
      "After-hours questions go unanswered.",
      "HR spends time on tickets instead of strategic work."
    ],
    "pillars": [
      "24/7 Conversational AI",
      "Automated Query Resolution",
      "Intelligent Escalation",
      "Knowledge Grounding"
    ],
    "capabilities": [
      {
        "title": "Always-On Employee Assistant",
        "body": "Resolve HR, IT and policy questions instantly, any time, through a natural conversational interface.",
        "bullets": [
          "Instant answers to HR, IT and policy questions",
          "Available around the clock, including after hours",
          "Natural conversation instead of portal hunting"
        ],
        "screen": "Employee Chat Interface"
      },
      {
        "title": "Automated Query Resolution",
        "body": "Handle a large share of routine, repetitive queries without human intervention, freeing HR/IT for higher-value work.",
        "bullets": [
          "Routine queries resolved without human intervention",
          "HR and IT freed for higher-value work",
          "Lower cost-to-serve for employee support"
        ],
        "screen": "Query Resolution Dashboard"
      },
      {
        "title": "Intelligent Escalation & Ticketing",
        "body": "Recognize when a query needs a human and route it with full context to the right team.",
        "bullets": [
          "Knows when a human is needed",
          "Routes tickets with full conversation context",
          "Employees never have to repeat themselves"
        ],
        "screen": "Escalation & Ticketing View"
      },
      {
        "title": "Grounded Knowledge",
        "body": "Answer from your actual policies and documents, not generic guesses, with sources employees can trust.",
        "bullets": [
          "Answers grounded in your real policy documents",
          "Sources cited so employees can verify",
          "No generic or unsupported guesses"
        ],
        "screen": "Knowledge Source Management"
      }
    ],
    "aiCapabilities": [
      "AI Conversational Query Resolution",
      "AI Policy & Knowledge Grounding",
      "AI Smart Ticketing / Escalation",
      "AI Document Collection",
      "AI Multilingual Chat"
    ],
    "outcomes": [
      "Reduced HR/IT Query Load",
      "Faster Employee Answer Times",
      "Improved Frontline & Remote Support",
      "Lower Cost-to-Serve",
      "More HR Time for Strategic Work"
    ],
    "story": {
      "challenge": "A large enterprise's HR team spent the majority of its time answering the same routine questions repeatedly.",
      "solution": "Deployed Vadal.ai's AI Employee Chat to automate routine query resolution with intelligent escalation.",
      "outcomes": "Large reduction in routine ticket volume, faster answers, more HR capacity for strategic work."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "WhatsApp",
      "SharePoint",
      "Workday",
      "SAP SuccessFactors",
      "ServiceNow",
      "Outlook",
      "Google Workspace"
    ],
    "faqs": [
      {
        "q": "How much of our HR/IT query volume can it actually handle?",
        "a": "A significant share of routine, repetitive queries can be automated — the exact proportion depends on how well your knowledge base is set up."
      },
      {
        "q": "How does it avoid giving wrong answers?",
        "a": "It answers from your actual policy documents and knowledge sources (grounded responses) rather than generating unsupported answers, and it escalates to a human when it isn't confident."
      },
      {
        "q": "What happens when the AI can't resolve something?",
        "a": "It escalates to the right HR or IT team with full conversation context, so employees don't have to repeat themselves and nothing falls through the cracks."
      },
      {
        "q": "Can employees use it in their own language?",
        "a": "Yes — the chat supports multilingual interaction, which is especially valuable for global and frontline workforces."
      }
    ],
    "related": [
      "tasks-workflow",
      "mobile-e-learning",
      "ai-workforce-assistant",
      "employee-communication"
    ],
    "footerCta": "Ready to give every employee instant, always-on support?"
  },
  {
    "slug": "tasks-workflow",
    "name": "Tasks & Workflow",
    "cloud": "digital-workplace",
    "icon": "checks",
    "mock": "phone",
    "heroTitle": "Get Everyday Work Done, Right Inside the Flow of Work",
    "heroLede": "Assign, track and automate the tasks, approvals and workflows employees deal with daily — with AI handling the routine steps.",
    "challengesTitle": null,
    "challenges": [
      "Everyday tasks and approvals are scattered across email, chat and paper.",
      "Frontline employees have no structured way to receive and complete tasks.",
      "Managers can't see what's done and what's pending across their team.",
      "Routine workflows (requests, approvals, checklists) are manual and slow.",
      "Compliance tasks get missed without a system to enforce them.",
      "Work happens in silos disconnected from communication and learning."
    ],
    "pillars": [
      "Structured Task Assignment",
      "Workflow Automation",
      "Mobile-First Completion",
      "Manager Oversight"
    ],
    "capabilities": [
      {
        "title": "Task Assignment & Tracking",
        "body": "Assign tasks to individuals, teams or locations and track completion in real time.",
        "bullets": [
          "Assign work to individuals, teams or locations",
          "Track completion in real time",
          "One structured place for everyday tasks"
        ],
        "screen": "Task Dashboard"
      },
      {
        "title": "Workflow Automation",
        "body": "Automate routine multi-step workflows (requests, approvals, checklists) with an easy builder.",
        "bullets": [
          "Automate requests, approvals and checklists",
          "Easy builder, no custom development required",
          "Routine multi-step processes run themselves"
        ],
        "screen": "Workflow Builder"
      },
      {
        "title": "Mobile-First Task Completion",
        "body": "Let frontline and deskless employees receive and complete tasks from their phones.",
        "bullets": [
          "Frontline employees work straight from their phones",
          "No desk or computer required",
          "Tasks reach every deskless worker"
        ],
        "screen": "Mobile Task View"
      },
      {
        "title": "Manager Oversight",
        "body": "Give managers a clear view of what's complete, pending or overdue across their team.",
        "bullets": [
          "Complete, pending and overdue at a glance",
          "Team-wide visibility for every manager",
          "Nothing gets missed or forgotten"
        ],
        "screen": "Manager Oversight Panel"
      }
    ],
    "aiCapabilities": [
      "AI Workflow Automation",
      "AI Task Prioritization",
      "AI Reminder & Nudge Timing",
      "AI Form Pre-Fill"
    ],
    "outcomes": [
      "Higher Task Completion Rates",
      "Reduced Manual Workflow Overhead",
      "Better Frontline Task Execution",
      "Improved Compliance Task Adherence",
      "Greater Operational Visibility"
    ],
    "story": {
      "challenge": "A global retailer's frontline teams received tasks through scattered channels, leading to missed steps and no completion visibility.",
      "solution": "Deployed Vadal.ai's Tasks & Workflow for structured, mobile-first task assignment and automation.",
      "outcomes": "Higher completion rates, better compliance adherence, clearer operational visibility."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "Workday",
      "SAP SuccessFactors",
      "ServiceNow",
      "Outlook"
    ],
    "faqs": [
      {
        "q": "Can frontline employees use this without a desk or computer?",
        "a": "Yes — the product is mobile-first, so deskless and frontline employees can receive and complete tasks directly from their phones."
      },
      {
        "q": "Can we automate multi-step approval workflows?",
        "a": "Yes — a workflow builder lets you automate routine multi-step processes like requests, approvals and checklists without custom development."
      },
      {
        "q": "Can managers see what's overdue across their team?",
        "a": "Yes — a manager oversight view shows completed, pending and overdue tasks at a glance, so nothing gets missed."
      },
      {
        "q": "Does this connect to the rest of the platform?",
        "a": "Yes — tasks and workflows connect with communication, learning and the AI assistant, so work happens in the same environment rather than a disconnected silo."
      }
    ],
    "related": [
      "ai-employee-chat",
      "mobile-e-learning",
      "employee-communication",
      "employee-experience"
    ],
    "footerCta": "Ready to bring everyday work into one intelligent flow?"
  },
  {
    "slug": "mobile-e-learning",
    "name": "Mobile & E-Learning",
    "cloud": "digital-workplace",
    "icon": "phone",
    "mock": "phone",
    "heroTitle": "Learning That Fits Every Employee, on Any Device",
    "heroLede": "Deliver microlearning, onboarding and continuous development through a mobile-first experience built for desk and frontline workers alike.",
    "challengesTitle": null,
    "challenges": [
      "Frontline and deskless employees can't easily access traditional LMS platforms.",
      "Training content is long, dull and poorly completed.",
      "Onboarding and compliance training are inconsistent across locations.",
      "Managers can't track training progress or readiness in real time.",
      "Content creation requires specialist tools and skills.",
      "Learning is disconnected from the rest of the employee experience."
    ],
    "pillars": [
      "Mobile-First Learning",
      "Microlearning & Gamification",
      "AI Learning Recommendations",
      "Progress & Compliance Tracking"
    ],
    "capabilities": [
      {
        "title": "Mobile-First Learning Delivery",
        "body": "Deliver bite-sized, engaging learning to any employee on their phone, anytime, anywhere.",
        "bullets": [
          "Learning reaches every employee on their phone",
          "Bite-sized content that fits the workday",
          "Anytime, anywhere access for frontline workers"
        ],
        "screen": "Mobile Learning Home"
      },
      {
        "title": "Microlearning & Gamification",
        "body": "Use short, gamified learning paths with completion and achievement elements to drive engagement.",
        "bullets": [
          "Short, gamified paths employees actually finish",
          "Completion and achievement elements drive engagement",
          "Learning feels rewarding, not like a chore"
        ],
        "screen": "Learning Path Builder"
      },
      {
        "title": "AI Learning Recommendations",
        "body": "Suggest relevant learning to each employee based on role, skills gaps and career goals.",
        "bullets": [
          "Recommendations tailored to each employee's role",
          "Training targets real skills gaps",
          "Learning aligned with career goals"
        ],
        "screen": "Learning Recommendation Feed"
      },
      {
        "title": "Progress & Compliance Tracking",
        "body": "Give managers real-time visibility into training completion, compliance and readiness.",
        "bullets": [
          "Real-time view of training completion",
          "Compliance readiness tracked continuously",
          "Managers see team readiness at a glance"
        ],
        "screen": "Training Progress & Compliance Dashboard"
      }
    ],
    "aiCapabilities": [
      "AI Learning Recommendations",
      "AI Content Generation Assistance",
      "AI Skills-Gap-Based Learning Paths",
      "AI Learning Nudges"
    ],
    "outcomes": [
      "Higher Training Completion Rates",
      "Faster, More Consistent Onboarding",
      "Improved Compliance Readiness",
      "Better Frontline Learning Access",
      "Stronger Link Between Learning and Skills"
    ],
    "story": {
      "challenge": "A large hospitality group's frontline workforce had poor access to training, leading to inconsistent onboarding and compliance gaps.",
      "solution": "Deployed Vadal.ai's Mobile & E-Learning for mobile-first microlearning with progress tracking.",
      "outcomes": "Higher completion rates, more consistent onboarding, improved compliance readiness."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "LMS content providers",
      "Microsoft Teams",
      "Slack"
    ],
    "faqs": [
      {
        "q": "Can frontline employees access learning without a company computer?",
        "a": "Yes — learning is mobile-first, designed specifically so deskless and frontline workers can learn from their own phones."
      },
      {
        "q": "Do we need specialist tools to create content?",
        "a": "No — content can be built without coding or design expertise, with AI assistance to help create and structure learning material quickly."
      },
      {
        "q": "Can managers track training completion and compliance?",
        "a": "Yes — managers get real-time visibility into who has completed what, supporting both development and compliance readiness."
      },
      {
        "q": "How does learning connect to skills development?",
        "a": "Learning recommendations are tied to skills gaps identified through Skills Intelligence, so training targets real capability needs rather than generic courses."
      }
    ],
    "related": [
      "skills-intelligence",
      "pre-onboarding",
      "ai-employee-chat",
      "tasks-workflow"
    ],
    "footerCta": "Ready to make learning accessible to every employee?"
  },
  {
    "slug": "enterprise-integrations",
    "name": "Enterprise Integrations",
    "cloud": "enterprise-platform",
    "icon": "plug",
    "mock": "dashboard",
    "heroTitle": "Connect Vadal.ai to Everything Your Workforce Already Uses",
    "heroLede": "Integrate seamlessly with your HRIS, communication, analytics and productivity tools, so workforce data flows automatically across your stack.",
    "challengesTitle": null,
    "challenges": [
      "Workforce data is trapped in disconnected systems.",
      "Manual data syncing is slow, error-prone and stale.",
      "New tools create yet another silo instead of connecting existing ones.",
      "IT worries about integration complexity and maintenance.",
      "Employee data has to be manually reconciled across platforms.",
      "Point tools don't talk to each other, breaking workflows."
    ],
    "pillars": [
      "Pre-Built Connectors",
      "Automatic Data Sync",
      "Open API",
      "Low-Maintenance Integration"
    ],
    "capabilities": [
      {
        "title": "Pre-Built Connectors",
        "body": "Connect out of the box to major HRIS, communication, analytics and productivity platforms.",
        "bullets": [
          "Go live without custom integration projects",
          "Cover HRIS, comms, analytics and productivity in one place",
          "Browse and enable connectors from a single directory"
        ],
        "screen": "Integration Directory"
      },
      {
        "title": "Automatic Data Synchronization",
        "body": "Keep employee data, org structure and attributes in sync automatically, with no manual reconciliation.",
        "bullets": [
          "Employee records stay current across every system",
          "Org structure changes propagate automatically",
          "No more manual reconciliation between platforms"
        ],
        "screen": "Data Sync Status Dashboard"
      },
      {
        "title": "Open API & Webhooks",
        "body": "Extend and integrate with custom or niche systems through a documented API.",
        "bullets": [
          "Connect custom and niche systems beyond pre-built connectors",
          "Build on a documented, developer-friendly API",
          "Trigger workflows in other tools with webhooks"
        ],
        "screen": "API & Webhook Management"
      },
      {
        "title": "Low-Maintenance Architecture",
        "body": "Minimize ongoing IT burden with managed, resilient integrations.",
        "bullets": [
          "Managed connectors reduce ongoing IT workload",
          "Resilient sync keeps data flowing through changes",
          "Configure and monitor integrations from one panel"
        ],
        "screen": "Connector Configuration Panel"
      }
    ],
    "aiCapabilities": [
      "AI Data Mapping (auto-match fields across systems)",
      "AI Sync Error Detection",
      "AI Integration Health Monitoring"
    ],
    "outcomes": [
      "Eliminated Data Silos",
      "Reduced Manual Data Work",
      "Faster Time-to-Value",
      "Lower IT Maintenance Burden",
      "A Single Source of Workforce Truth"
    ],
    "story": {
      "challenge": "A global enterprise's workforce data was fragmented across HRIS, comms and analytics tools, requiring constant manual reconciliation.",
      "solution": "Deployed Vadal.ai's Enterprise Integrations to sync data automatically across the stack.",
      "outcomes": "Eliminated manual syncing, faster time-to-value, and a single source of workforce truth."
    },
    "integrations": [
      "Workday",
      "SAP SuccessFactors",
      "Oracle HCM",
      "BambooHR",
      "ADP",
      "Microsoft Teams",
      "Slack",
      "Outlook",
      "Google Workspace",
      "SharePoint",
      "ServiceNow",
      "Power BI",
      "Tableau",
      "WhatsApp",
      "SMS"
    ],
    "faqs": [
      {
        "q": "Which systems does Vadal.ai integrate with out of the box?",
        "a": "Major HRIS (Workday, SAP SuccessFactors, Oracle HCM), communication tools (Teams, Slack), productivity suites (Microsoft 365, Google Workspace) and analytics tools (Power BI, Tableau), among others."
      },
      {
        "q": "Can we connect systems that aren't pre-built connectors?",
        "a": "Yes — an open, documented API and webhooks allow integration with custom or niche systems beyond the pre-built connector list."
      },
      {
        "q": "How much IT effort does integration require?",
        "a": "Integrations are designed to be low-maintenance and managed, minimizing ongoing IT burden; initial setup scope is confirmed during implementation."
      },
      {
        "q": "Is data synced in real time or in batches?",
        "a": "Sync cadence varies by system and connector; whether a specific integration is real-time or scheduled is confirmed during scoping."
      }
    ],
    "related": [
      "security-compliance",
      "implementation",
      "people-analytics"
    ],
    "footerCta": "Ready to connect your entire workforce stack?"
  },
  {
    "slug": "security-compliance",
    "name": "Security & Compliance",
    "cloud": "enterprise-platform",
    "icon": "shield",
    "mock": "dashboard",
    "heroTitle": "Enterprise-Grade Security Your Workforce Data Deserves",
    "heroLede": "Protect sensitive employee data with robust security, privacy controls and compliance built for global enterprise requirements.",
    "challengesTitle": null,
    "challenges": [
      "Employee data is highly sensitive and a prime target.",
      "Global organizations face complex, varying data-privacy regulations.",
      "Security concerns block or delay HR technology adoption.",
      "Role-based access must balance insight with confidentiality.",
      "Audit and compliance reporting is burdensome.",
      "AI features raise new questions about responsible data use."
    ],
    "pillars": [
      "Enterprise-Grade Security",
      "Privacy & Data Controls",
      "Compliance Certifications",
      "Responsible AI Governance"
    ],
    "capabilities": [
      {
        "title": "Enterprise Security",
        "body": "Protect data with encryption, secure infrastructure, SSO and role-based access controls.",
        "bullets": [
          "Encryption and secure infrastructure protect sensitive employee data",
          "SSO integrates with your existing identity providers",
          "Role-based access keeps each view appropriate to its audience"
        ],
        "screen": "Role-Based Access Management"
      },
      {
        "title": "Privacy & Data Residency",
        "body": "Support regional data-residency and privacy requirements for global workforces.",
        "bullets": [
          "Meet regional data-residency requirements as you scale globally",
          "Privacy controls tailored to varying local regulations",
          "Deploy confidently across countries and jurisdictions"
        ],
        "screen": "Security Controls Dashboard"
      },
      {
        "title": "Compliance Alignment",
        "body": "Align with major frameworks and regulations relevant to workforce data.",
        "bullets": [
          "Align with major security and privacy frameworks",
          "Simplify audit preparation with accessible logs",
          "Speed up procurement and security reviews"
        ],
        "screen": "Audit Log Viewer"
      },
      {
        "title": "Responsible AI Governance",
        "body": "Govern how AI uses workforce data, with transparency and appropriate human oversight.",
        "bullets": [
          "Transparency into how AI uses workforce data",
          "Human oversight of AI-driven decisions",
          "Controls over what data feeds AI features"
        ],
        "screen": "AI Governance & Transparency Panel"
      }
    ],
    "aiCapabilities": [
      "AI Anomaly / Access Monitoring",
      "AI Audit Log Analysis",
      "AI Governance Controls"
    ],
    "outcomes": [
      "Faster Security Approval in Procurement",
      "Reduced Data-Privacy Risk",
      "Confident Global Deployment",
      "Stronger Employee Trust",
      "Simplified Audit & Compliance"
    ],
    "story": {
      "challenge": "A multinational enterprise's security and legal teams needed strong assurances before approving a workforce platform holding sensitive employee data.",
      "solution": "Adopted Vadal.ai with enterprise security, role-based access, data-residency support and responsible-AI governance.",
      "outcomes": "Faster security approval, confident global rollout, and stronger employee trust."
    },
    "integrations": [
      "SSO / Identity providers (Okta, Azure AD)",
      "SIEM tools",
      "Existing HRIS security frameworks"
    ],
    "faqs": [
      {
        "q": "What security certifications does Vadal.ai hold?",
        "a": "Vadal.ai is built to align with major frameworks such as SOC 2, ISO 27001 and GDPR; contact our team for the current, verified certification status."
      },
      {
        "q": "Can we control who sees what data?",
        "a": "Yes — role-based access controls ensure managers, HR and executives each see only the data appropriate to their role, protecting employee confidentiality."
      },
      {
        "q": "Does Vadal.ai support data residency for global operations?",
        "a": "Regional data-residency support is available; our team can confirm which regions are supported for your specific deployment."
      },
      {
        "q": "How does Vadal.ai govern its AI's use of employee data?",
        "a": "Through responsible-AI governance: transparency about how AI uses data, appropriate human oversight of AI-driven decisions, and controls over what data feeds AI features."
      }
    ],
    "related": [
      "enterprise-integrations",
      "implementation",
      "decision-intelligence-copilot"
    ],
    "footerCta": "Ready to see how we protect your workforce data?"
  },
  {
    "slug": "implementation",
    "name": "Implementation & Customer Success",
    "cloud": "enterprise-platform",
    "icon": "lifebuoy",
    "mock": "dashboard",
    "heroTitle": "From Kickoff to Value, With a Partner Beside You",
    "heroLede": "Get up and running fast with guided implementation, and keep driving value with a dedicated customer success partnership.",
    "challengesTitle": null,
    "challenges": [
      "Enterprise software rollouts are slow, complex and risky.",
      "Poor onboarding leads to low adoption and wasted investment.",
      "Teams don't know how to get value after go-live.",
      "Configuration to unique org needs is daunting.",
      "Success depends on change management, not just software.",
      "Vendors disappear after the sale."
    ],
    "pillars": [
      "Guided Implementation",
      "AI-Accelerated Setup",
      "Dedicated Customer Success",
      "Ongoing Value Realization"
    ],
    "capabilities": [
      {
        "title": "Guided Implementation",
        "body": "Structured onboarding with templates, configuration support and a clear go-live path.",
        "bullets": [
          "A structured roadmap from kickoff to go-live",
          "Proven templates reduce configuration guesswork",
          "Hands-on support at every implementation stage"
        ],
        "screen": "Implementation Roadmap View"
      },
      {
        "title": "AI-Accelerated Setup",
        "body": "Use AI to accelerate configuration, data mapping and initial content setup, shortening time-to-value.",
        "bullets": [
          "AI assists configuration and data mapping",
          "Initial content set up faster with less manual effort",
          "Shorter path from purchase to first value"
        ],
        "screen": "Configuration & Template Library"
      },
      {
        "title": "Dedicated Customer Success",
        "body": "A named partner focused on adoption, outcomes and ongoing value beyond go-live.",
        "bullets": [
          "A named partner who stays after go-live",
          "Focus on adoption and outcomes, not just deployment",
          "Ongoing guidance to keep driving value"
        ],
        "screen": "Customer Success Portal"
      },
      {
        "title": "Change Management Support",
        "body": "Guidance and resources to drive employee adoption, not just technical deployment.",
        "bullets": [
          "Change-management resources drive real employee adoption",
          "Track adoption so you can act on gaps",
          "Turn deployment into lasting organizational change"
        ],
        "screen": "Adoption Dashboard"
      }
    ],
    "aiCapabilities": [
      "AI-Powered Configuration",
      "AI Data Mapping",
      "AI Adoption Insights",
      "AI Onboarding Assistant"
    ],
    "outcomes": [
      "Faster Time-to-Value",
      "Higher Platform Adoption",
      "Reduced Rollout Risk",
      "Sustained Value Over Time",
      "Stronger Vendor Partnership"
    ],
    "story": {
      "challenge": "A large enterprise had been burned by a slow, poorly-supported rollout of a previous HR platform.",
      "solution": "Adopted Vadal.ai with guided, AI-accelerated implementation and a dedicated customer success partner.",
      "outcomes": "Faster go-live, higher adoption, and sustained value realization."
    },
    "integrations": [
      "Works alongside all Vadal.ai products and existing enterprise systems"
    ],
    "faqs": [
      {
        "q": "How long does implementation typically take?",
        "a": "Timelines vary by scope and the number of products deployed; our implementation team will confirm a realistic range for your deployment size."
      },
      {
        "q": "How does AI speed up setup?",
        "a": "AI assists with configuration, mapping data fields across systems and setting up initial content, reducing manual setup effort; the actual acceleration depends on your environment."
      },
      {
        "q": "Do we get a dedicated point of contact after go-live?",
        "a": "Yes — a dedicated customer success partner focuses on adoption and ongoing value, so support doesn't end at deployment."
      },
      {
        "q": "Do you help with employee adoption, not just technical setup?",
        "a": "Yes — change-management guidance and resources are part of the engagement, since adoption (not just deployment) determines whether the platform delivers value."
      }
    ],
    "related": [
      "enterprise-integrations",
      "security-compliance",
      "pre-onboarding"
    ],
    "footerCta": "Ready to roll out with a partner who stays?"
  },
  {
    "slug": "decision-intelligence-copilot",
    "name": "Decision Intelligence Copilot",
    "cloud": "enterprise-platform",
    "icon": "spark",
    "mock": "dashboard",
    "heroTitle": "Your AI Copilot for Every Workforce Decision",
    "heroLede": "Ask questions in plain language and get data-grounded answers, recommendations and next steps drawn from your entire workforce platform.",
    "challengesTitle": null,
    "challenges": [
      "Leaders have data but struggle to turn it into decisions.",
      "Insights are scattered across dashboards no one has time to read.",
      "Getting an answer requires knowing which report to open.",
      "Non-analysts can't easily interrogate workforce data.",
      "Decisions rely on gut feel because data is hard to access.",
      "The gap between “we have data” and “we know what to do” is wide."
    ],
    "pillars": [
      "Natural-Language Decision Support",
      "Cross-Platform Intelligence",
      "Recommended Actions",
      "Explainable Answers"
    ],
    "capabilities": [
      {
        "title": "Ask-Anything Interface",
        "body": "Query your entire workforce platform in plain language (“Which teams are at highest attrition risk and why?”) and get a clear answer.",
        "bullets": [
          "Ask workforce questions in plain language",
          "Get clear answers without hunting for the right report",
          "Any leader can query the platform directly"
        ],
        "screen": "Copilot Conversation Interface"
      },
      {
        "title": "Cross-Platform Intelligence",
        "body": "Draw on data across communication, engagement, skills, sentiment and performance in one unified answer.",
        "bullets": [
          "One answer synthesized across every data source",
          "Connect engagement, skills, sentiment and performance signals",
          "Drill down from summary to underlying detail"
        ],
        "screen": "Insight Drill-Down"
      },
      {
        "title": "Recommended Next Steps",
        "body": "Move beyond answers to specific, prioritized recommendations for what to do.",
        "bullets": [
          "Specific, prioritized recommendations, not just data",
          "Close the gap between insight and action",
          "Know what to do next, and why"
        ],
        "screen": "Recommendation Panel"
      },
      {
        "title": "Explainable, Grounded Responses",
        "body": "Show the data behind every answer, so leaders can trust and defend decisions.",
        "bullets": [
          "Every answer shows its underlying data",
          "Verify sources before acting on a recommendation",
          "Defend decisions with transparent evidence"
        ],
        "screen": "Data-Grounded Answer View"
      }
    ],
    "aiCapabilities": [
      "AI Natural-Language Querying",
      "AI Cross-Data Synthesis",
      "AI Recommendation Generation",
      "AI Explainability / Source Attribution"
    ],
    "outcomes": [
      "Faster, More Confident Decisions",
      "Data Access for Non-Analysts",
      "Reduced Dependence on Manual Reporting",
      "Better-Informed People Strategy",
      "Wider Data-Driven Culture"
    ],
    "story": {
      "challenge": "A large enterprise's executives had extensive dashboards but still struggled to get quick, clear answers to strategic workforce questions.",
      "solution": "Deployed Vadal.ai's Decision Intelligence Copilot for natural-language, data-grounded decision support.",
      "outcomes": "Faster decisions, broader data access for non-analysts, and a more confident people strategy."
    },
    "integrations": [
      "Draws on all Vadal.ai products",
      "Power BI",
      "Tableau",
      "Microsoft Teams",
      "Slack"
    ],
    "faqs": [
      {
        "q": "What kinds of questions can I ask the Copilot?",
        "a": "Plain-language questions about your workforce — attrition risk, engagement drivers, skills gaps, sentiment trends — and it draws on data across the platform to answer, rather than requiring you to know which report to open."
      },
      {
        "q": "Can I trust the answers, or is it a black box?",
        "a": "Answers are grounded in your actual platform data and show the underlying sources and figures, so you can verify and defend any decision rather than taking an unexplained output on faith."
      },
      {
        "q": "Do I need to be a data analyst to use it?",
        "a": "No — the whole point is to make workforce data accessible to any leader through natural conversation, without needing analyst skills or dashboard expertise."
      },
      {
        "q": "How is this different from People Analytics dashboards?",
        "a": "Dashboards show you data to interpret; the Copilot answers your specific question directly, synthesizes across multiple data sources, and recommends next steps — interpretation and recommendation, not just display."
      }
    ],
    "related": [
      "people-analytics",
      "executive-reports",
      "ai-workforce-assistant",
      "sentiment-intelligence"
    ],
    "footerCta": "Ready to ask your workforce data anything?"
  },
  {
    "slug": "ai-workforce-assistant",
    "name": "AI Workforce Assistant",
    "cloud": "enterprise-platform",
    "icon": "bell",
    "mock": "phone",
    "heroTitle": "An AI Teammate for Every Employee and Manager",
    "heroLede": "A proactive AI assistant that helps employees get work done and helps managers lead — surfacing what needs attention before they even ask.",
    "challengesTitle": null,
    "challenges": [
      "Employees and managers are overloaded and miss what matters.",
      "Important signals (a disengaged team member, an overdue task) go unnoticed.",
      "Managers lack time to analyze data and decide what to act on.",
      "Employees don't know what to prioritize day to day.",
      "Support and guidance aren't personalized or proactive.",
      "AI in most tools is reactive — it waits to be asked."
    ],
    "pillars": [
      "Proactive Assistance",
      "Personalized Guidance",
      "Manager Enablement",
      "Cross-Product Awareness"
    ],
    "capabilities": [
      {
        "title": "Proactive Nudges",
        "body": "Surface what needs attention — an at-risk team member, an overdue action, an unrecognized win — before the user has to look.",
        "bullets": [
          "Important signals surfaced before anyone has to look",
          "Catch at-risk team members and overdue actions early",
          "Wins worth recognizing never slip past unnoticed"
        ],
        "screen": "Proactive Nudge Feed"
      },
      {
        "title": "Personalized Employee Guidance",
        "body": "Help each employee prioritize tasks, find information and navigate their workday.",
        "bullets": [
          "Daily priorities tailored to each employee",
          "Find information without hunting across tools",
          "Navigate the workday with a personal guide"
        ],
        "screen": "Personalized Task & Info View"
      },
      {
        "title": "Manager Enablement",
        "body": "Give managers AI-generated, team-specific guidance on where to focus and how to act.",
        "bullets": [
          "Team-specific guidance on where to focus",
          "Coaching prompts on how to act, not just what's wrong",
          "Lead proactively without analyzing data yourself"
        ],
        "screen": "Manager Guidance Panel"
      },
      {
        "title": "Cross-Product Awareness",
        "body": "Draw on communication, tasks, learning, engagement and sentiment together for genuinely helpful assistance.",
        "bullets": [
          "Context drawn from across the whole platform",
          "Assistance that's genuinely helpful, not generic",
          "One daily brief connecting tasks, learning and engagement"
        ],
        "screen": "Assistant Home / Daily Brief"
      }
    ],
    "aiCapabilities": [
      "AI Proactive Nudging",
      "AI Personalized Prioritization",
      "AI Manager Coaching Prompts",
      "AI Cross-Product Context Awareness"
    ],
    "outcomes": [
      "Improved Manager Effectiveness",
      "Higher Employee Productivity",
      "Fewer Missed Signals and Tasks",
      "More Proactive People Management",
      "Better Everyday Employee Experience"
    ],
    "story": {
      "challenge": "A large enterprise's managers were overloaded and routinely missed early signs of team issues and pending actions.",
      "solution": "Deployed Vadal.ai's AI Workforce Assistant to proactively surface priorities and guidance.",
      "outcomes": "More proactive management, fewer missed signals, and improved everyday productivity."
    },
    "integrations": [
      "Microsoft Teams",
      "Slack",
      "Outlook",
      "Workday",
      "SAP SuccessFactors",
      "Draws on all Vadal.ai products"
    ],
    "faqs": [
      {
        "q": "How is this different from the AI Employee Chat?",
        "a": "AI Employee Chat is reactive — it answers questions when asked. The AI Workforce Assistant is proactive — it surfaces what needs attention and guides employees and managers before they ask."
      },
      {
        "q": "What does it actually do for a manager?",
        "a": "It highlights where to focus (an at-risk team member, an overdue action, a win worth recognizing) and offers specific guidance, saving managers from having to analyze data themselves to find what matters."
      },
      {
        "q": "Does it work for regular employees too, not just managers?",
        "a": "Yes — for employees it helps prioritize tasks, find information and navigate the workday; for managers it adds team-focused guidance and coaching prompts."
      },
      {
        "q": "Where does its awareness come from?",
        "a": "It draws on context across communication, tasks, learning, engagement and sentiment — the breadth of the platform — which is what lets it be genuinely helpful rather than generic."
      }
    ],
    "related": [
      "ai-employee-chat",
      "decision-intelligence-copilot",
      "tasks-workflow",
      "leadership-intelligence"
    ],
    "footerCta": "Ready to give every employee and manager an AI teammate?"
  }
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
