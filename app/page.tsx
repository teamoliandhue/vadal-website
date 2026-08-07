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
import { MobilePlatformLayers } from "@/components/MobilePlatformLayers";
import { IntelligenceLoop } from "@/components/IntelligenceLoop";
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
      {/* MOBILE-FIRST BRIEF: Social Proof = "HOLD / HIDE FOR NOW" — placeholder
          proof erodes trust while we have no real logos + one verified metric.
          Desktop keeps it; restore on mobile (drop max-lg:hidden) once real. */}
      <Section tone="surface" className="!py-14 max-lg:hidden">
        <Container>
          <LogoMarquee label="Trusted by HR, people and business leaders across industries" />
        </Container>
      </Section>

      {/* ================================== PLATFORM OVERVIEW + PERSONA TABS */}
      {/* max-lg:bg-* keeps the mobile band rhythm alternating once the feature
          sections below are hidden (see the accordion note). */}
      <Section
        tone="base"
        id="platform"
        reveal
        glow="top"
        className="max-lg:bg-[image:var(--section-alt)]"
      >
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

      {/* =========================================== THE INTELLIGENCE LOOP */}
      {/* MOBILE-FIRST BRIEF, priority 3: "Why Vadal / AI-Native — keep, elevate
          above the product list… This is the wedge vs Actimo, CultureMonkey and
          inFeedo. Surfacing it early answers 'why you, not them' before the
          user browses the catalog." Score → Insight → Action → Impact was only
          ever a line of text; this is it drawn. */}
      <Section tone="surface" id="loop" reveal className="scroll-mt-20 max-lg:bg-none">
        <Container>
          <SectionHead
            eyebrow="Why Vadal.ai"
            title="A loop, not a report"
            lede="Score, insight, action, impact. Four steps most tools treat as separate products, connected here so each one makes the next one smarter."
          />
          <div className="mt-14">
            <IntelligenceLoop />
          </div>
        </Container>
      </Section>

      {/* ==================================== PRODUCT LAYERS (MOBILE ONLY) */}
      {/* MOBILE-FIRST BRIEF: "Product Layers (5 accordion sections) — keep,
          accordions, collapsed by default… Accordions turn a huge desktop
          mega-menu into a compact, tappable index — the single biggest
          scroll-reducer on mobile." This replaces the four long feature
          narratives below, which are desktop-only from here down. */}
      <Section tone="surface" id="layers" className="scroll-mt-20 lg:hidden">
        <Container>
          <SectionHead
            eyebrow="The platform"
            title="Everything your workforce needs, in five layers"
            lede="Tap a layer to see its modules, and any module to see what you get."
          />
          <div className="mt-10">
            <MobilePlatformLayers />
          </div>
        </Container>
      </Section>

      {/* ========================================================= SURVEYS */}
      {/* Desktop-only: superseded on mobile by the accordion index above. */}
      <Section tone="base" id="surveys" reveal glow="right" className="scroll-mt-20 max-lg:hidden">
        <SurveysSection />
      </Section>

      {/* ======================================================= ANALYTICS */}
      <Section tone="surface" id="analytics" reveal glow="left" className="scroll-mt-20 max-lg:hidden">
        <AnalyticsSection />
      </Section>

      {/* ======================================================== FEEDBACK */}
      <Section tone="base" id="feedback" reveal className="scroll-mt-20 max-lg:hidden">
        <FeedbackSection />
      </Section>

      {/* ===================================================== ACTION BAND */}
      {/* Kept on mobile — the brief's mid-page conversion moment. */}
      <Section tone="surface" id="action" reveal className="scroll-mt-20 max-lg:bg-none">
        <ActionBand />
      </Section>

      {/* ========================================================= PRIVACY */}
      <Section tone="base" id="privacy" reveal className="scroll-mt-20 max-lg:hidden">
        <PrivacySection />
      </Section>

      {/* ==================================================== INTEGRATIONS */}
      {/* MOBILE-FIRST BRIEF: the Enterprise AI Platform layer (integrations)
          "serves IT/procurement, not first-time visitors" — desktop only. */}
      <Section tone="surface" id="integrations" reveal glow="right" className="scroll-mt-20 max-lg:hidden">
        <IntegrationsSection />
      </Section>

      {/* ============================================ SECURITY & COMPLIANCE */}
      {/* MOBILE-FIRST BRIEF: Security = "Low / move lower / link out — trust
          badges only… evaluated later, usually on desktop". On phones the
          footer's SOC 2 badge + /security link carry it. */}
      <Section tone="base" id="security" reveal className="scroll-mt-20 max-lg:hidden">
        <EnterprisePanel
          items={securitySection.cards}
          title={securitySection.title}
          lede={securitySection.lede}
          ctaLabel="See our security"
          ctaHref="/security"
        />
      </Section>

      {/* ================================================== IMPLEMENTATION */}
      {/* MOBILE-FIRST BRIEF: rollout detail isn't in the mobile IA — it's an
          evaluation-stage question, not a first-visit one. Desktop only. */}
      <Section tone="surface" id="implementation" reveal className="scroll-mt-20 max-lg:hidden">
        <ImplementationSection />
      </Section>

      {/* ==================================================== TESTIMONIALS */}
      {/* MOBILE-FIRST BRIEF: Social Proof = "HOLD / HIDE FOR NOW" until we have
          real customer stories + one verified metric. Desktop only. */}
      <Section tone="base" reveal className="max-lg:hidden">
        <Container>
          <SectionHead
            eyebrow="Customer stories"
            title="What our customers love about us"
            lede="From head office to the frontline, intelligence people can feel."
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
      {/* full-bleed photographic band — a bright, softly defocused office
          conversation (the questions being asked), spanning the viewport with
          content centred in a Container. Replaced the abstract watercolor sky,
          which said nothing about the section. */}
      <Section tone="base" reveal className="!py-0">
        <div className="photo-band-faq relative isolate overflow-hidden border-y border-[var(--line)] py-14 sm:py-20 lg:py-28">
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
              {/* frosted like the cards — it sits on the busiest part of the
                  photograph, where bare text loses contrast */}
              <p className="mt-8 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/55 bg-white/65 px-4 py-2 text-[15px] text-[var(--foreground)] backdrop-blur-md">
                  Still curious?{" "}
                  <Link
                    href="/demo"
                    className="font-bold text-[var(--brand)] underline-offset-4 hover:underline"
                  >
                    Talk to our team →
                  </Link>
                </span>
              </p>
            </div>
          </Container>
        </div>
      </Section>
    </>
  );
}
