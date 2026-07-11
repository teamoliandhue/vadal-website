import Link from "next/link";
import { Button, Container, Section, SectionHead } from "@/components/ui";
import { PersonaTabs } from "@/components/PersonaTabs";
import { ScrollHero } from "@/components/ScrollHero";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { EnterprisePanel, LogoMarquee } from "@/components/sections";
import {
  ActionBand,
  AnalyticsSection,
  FeedbackSection,
  ImplementationSection,
  IntegrationsSection,
  PrivacySection,
  SurveysSection,
} from "@/components/home-v2";
import { FaqAccordion } from "@/components/FaqAccordion";
import { homeFaqsV2, platformOverview, securitySection } from "@/lib/content";

/* ============================================================================
   Home — the AI-Powered Workforce Engagement & Decision Intelligence platform.
   Section order mirrors the content doc (and the category's proven flow):
   hero → trust → persona tabs → surveys → analytics → feedback → action →
   privacy → integrations → security → implementation → testimonials → FAQ.
   ========================================================================== */

export default function HomePage() {
  return (
    <>
      {/* ================================ HERO (scroll transform animation) */}
      {/* NOTE: never wrap in <Section reveal> — Reveal's transform breaks the
          sticky pinning the canvas animation depends on. */}
      <ScrollHero />

      {/* ==================================================== LOGO MARQUEE */}
      <Section tone="base" className="!py-14">
        <Container>
          <LogoMarquee label="Trusted by HR, people and business leaders across industries" />
        </Container>
      </Section>

      {/* ================================== PLATFORM OVERVIEW + PERSONA TABS */}
      <Section tone="base" id="platform" reveal glow="top">
        <Container>
          <SectionHead
            eyebrow={platformOverview.eyebrow}
            title={platformOverview.title}
            lede={platformOverview.lede}
          />
          <div className="mt-12">
            <PersonaTabs />
          </div>
        </Container>
      </Section>

      {/* ========================================================= SURVEYS */}
      <Section tone="base" id="surveys" reveal glow="right" className="scroll-mt-20">
        <SurveysSection />
      </Section>

      {/* ======================================================= ANALYTICS */}
      <Section tone="base" id="analytics" reveal glow="left" className="scroll-mt-20">
        <AnalyticsSection />
      </Section>

      {/* ======================================================== FEEDBACK */}
      <Section tone="base" id="feedback" reveal className="scroll-mt-20">
        <FeedbackSection />
      </Section>

      {/* ===================================================== ACTION BAND */}
      <Section tone="base" id="action" reveal className="scroll-mt-20 !pt-0">
        <ActionBand />
      </Section>

      {/* ========================================================= PRIVACY */}
      <Section tone="base" id="privacy" reveal className="scroll-mt-20">
        <PrivacySection />
      </Section>

      {/* ==================================================== INTEGRATIONS */}
      <Section tone="base" id="integrations" reveal glow="right" className="scroll-mt-20">
        <IntegrationsSection />
      </Section>

      {/* ============================================ SECURITY & COMPLIANCE */}
      <Section tone="base" id="security" reveal className="scroll-mt-20">
        <EnterprisePanel
          items={securitySection.cards}
          title={securitySection.title}
          lede={securitySection.lede}
          ctaLabel="See our security"
          ctaHref="/security"
        />
      </Section>

      {/* ================================================== IMPLEMENTATION */}
      <Section tone="base" id="implementation" reveal className="scroll-mt-20">
        <ImplementationSection />
      </Section>

      {/* ==================================================== TESTIMONIALS */}
      <Section tone="base" reveal>
        <Container>
          <SectionHead
            eyebrow="Customer stories"
            title="What our customers love about us"
            lede="From head office to the frontline — intelligence people can feel."
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
                lede="Everything leaders ask before they bring Vadal.ai to their workforce."
              />
              <div className="mx-auto mt-10 max-w-3xl">
                <FaqAccordion faqs={homeFaqsV2} variant="glass" />
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
