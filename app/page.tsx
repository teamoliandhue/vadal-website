import Link from "next/link";
import { Button, Container, Section, SectionHead } from "@/components/ui";
import { BroadcastCard, DashboardMock, PhoneMock, VoiceCard } from "@/components/ProductMocks";
import { AudienceShowcase } from "@/components/AudienceShowcase";
import { ScrollHero } from "@/components/ScrollHero";
import { StickyShowcase } from "@/components/StickyShowcase";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import {
  EnterprisePanel,
  FeatureRow,
  LogoMarquee,
  ResultCards,
  SolutionsPanel,
} from "@/components/sections";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  enterpriseServices,
  ILLUSTRATIVE,
  resultsStats,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* =========================================== HERO (scroll transform) */}
      <ScrollHero />

      {/* ===================================================== LOGO MARQUEE */}
      <Section tone="base" className="!py-16">
        <Container>
          <LogoMarquee label="Built for retail, facilities, finance, hospitality, manufacturing & logistics" />
        </Container>
      </Section>

      {/* ======================================================= SOLUTIONS */}
      <Section tone="base" id="solutions" reveal>
        <SolutionsPanel />
      </Section>

      {/* ===================== FEATURES — pinned "stop-scroll" showcase */}
      <section className="relative bg-[var(--background)]">
        <div className="py-20 lg:py-16">
          <StickyShowcase
            eyebrow="Why teams choose Vadal"
            note={ILLUSTRATIVE}
            steps={[
              {
                heading: "Reach every employee in seconds",
                body: "Publish once and it lands on every phone — frontline included. Targeted, two-way, and impossible to miss. Finally, comms people actually read.",
                stat: "94%",
                statLabel: "active reach in the first week of rollout",
                bg: "/textures/stage-blue.webp",
                visual: <BroadcastCard />,
              },
              {
                heading: "Mobile learning, built for thumbs",
                body: "Turn training, guides and onboarding into bite-size micro-learning your teams finish on shift — any time, any place. Built for phones, not desks.",
                stat: "87%",
                statLabel: "course completion rate on mobile",
                bg: "/textures/stage-teal.webp",
                visual: (
                  <div className="scale-90">
                    <PhoneMock />
                  </div>
                ),
              },
              {
                heading: "Make people feel genuinely heard",
                body: "Pulse surveys, recognition and a social wall that bring your values to life — so every colleague has a voice, and a reason to stay.",
                stat: "28%",
                statLabel: "lower first-year frontline attrition",
                bg: "/textures/stage-yellow.webp",
                visual: <VoiceCard />,
              },
              {
                heading: "Stop guessing, start knowing",
                body: "Ask in plain language and Vadal AI reads the signal across your whole workforce — turning every score into insight, action and impact.",
                stat: "3×",
                statLabel: "faster from signal to action",
                bg: "/textures/stage-violet.webp",
                visual: <div className="w-full max-w-[440px]"><DashboardMock /></div>,
              },
            ]}
          />
        </div>
      </section>

      {/* ========================================================= RESULTS */}
      <Section tone="base" reveal>
        <Container>
          <SectionHead
            eyebrow="Business results"
            title="Measurable results, powered by Vadal"
            lede="When people feel heard and informed, the business feels it too."
          />
          <div className="mt-14">
            <ResultCards stats={resultsStats} note={ILLUSTRATIVE} />
          </div>
        </Container>
      </Section>

      {/* =================================================== AUDIENCE SHOWCASE */}
      <Section tone="base" reveal>
        <Container>
          <AudienceShowcase />
        </Container>
      </Section>

      {/* ===================================================== TESTIMONIALS */}
      <Section tone="base" reveal>
        <Container>
          <SectionHead
            eyebrow="Customer stories"
            title="Take two minutes to see why teams love Vadal"
            lede="From the retail floor to the loading bay — engagement people can feel."
          />
          <div className="mt-14">
            <TestimonialCarousel />
          </div>
          <div className="mt-12 text-center">
            <Button href="/customers" variant="ghost" icon>
              Read customer stories
            </Button>
          </div>
        </Container>
      </Section>

      {/* ================================================ ENTERPRISE SERVICES */}
      <Section tone="base" reveal>
        <EnterprisePanel items={enterpriseServices} />
      </Section>

      {/* ============================================================= FAQ */}
      {/* full-bleed watercolor-sky band — sky spans the whole viewport width,
          content stays centred in a Container */}
      <Section tone="base" reveal className="!py-0">
        <div
          className="relative isolate overflow-hidden border-y border-[var(--line)] py-14 sm:py-20 lg:py-28"
          style={{
            backgroundImage: "url('/textures/faq-sky.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* soft scrim — lift the heading while keeping the watercolor sky vivid */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(180deg, rgba(243,244,248,0.5) 0%, rgba(243,244,248,0.14) 38%, rgba(243,244,248,0.08) 100%)",
            }}
          />
          <Container>
            <div className="relative">
              <SectionHead
                eyebrow="Good to know"
                title="Questions, answered"
                lede="Everything teams ask before they bring Vadal to the frontline."
              />
              <div className="mx-auto mt-10 max-w-3xl">
                <FaqAccordion faqs={HOME_FAQS} variant="glass" />
              </div>
              <p className="mt-8 text-center text-[15px] text-[var(--foreground)]/80">
                Still curious?{" "}
                <Link
                  href="/demo"
                  className="font-bold text-[var(--brand)] underline-offset-4 hover:underline"
                >
                  Talk to our team →
                </Link>
              </p>
            </div>
          </Container>
        </div>
      </Section>
    </>
  );
}

const HOME_FAQS = [
  {
    q: "How is Vadal different from email or an intranet?",
    a: "Vadal is built for the non-desk workforce. Instead of assuming a corporate inbox people rarely open, it lives on the phone everyone already carries — two-way, instant, and measurable. Comms, training, recognition, tasks and analytics sit in one app, so it replaces a stack of disconnected tools rather than adding another.",
  },
  {
    q: "Who is Vadal for?",
    a: "Medium-to-large organisations (roughly 1,000–50,000 employees) with a meaningful frontline — retail, facilities management, finance, hospitality, manufacturing and logistics — where HR, internal comms, L&D and operations leaders need to reach and engage everyone, not just head office.",
  },
  {
    q: "What makes the analytics and AI different?",
    a: "Most tools stop at measuring. Vadal turns Score → Insight → Action → Impact: dashboards and heatmaps show what's happening, Vadal AI explains why in plain language, and manager action plans close the loop — so engagement is something you drive, not just track.",
  },
  {
    q: "Does it integrate with our HR systems?",
    a: "Yes. Sync your HRMS, payroll and identity provider with SSO and SCIM so people data flows in automatically and your app stays current without manual upkeep.",
  },
];
