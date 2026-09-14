import Link from "next/link";
import { Container, Pill } from "./ui";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { HeroBento } from "./HeroBento";
import { HeroEmailForm } from "./HeroEmailForm";
import { heroV2 } from "@/lib/content";

/* ============================================================================
   Hero — the headline, the sign-up, and the product beside it.

   This replaces ScrollHero, which pinned the page for 215vh and ran a canvas
   of ~1,100 particles: they were born across the product cards, dissolved them,
   fanned out into a full-screen field, then gathered into a spinning globe with
   the capability chips orbiting it.

   It went because the middle of it was the problem. The formed globe read well
   and the cards dissolving read well, but between them the screen was a wall of
   scattered violet triangles over the headline for the better part of a screen
   of scrolling — visually noisy, and it said nothing. A visitor's first
   interaction with the site was two and a bit screens of scrolling before any
   new information arrived.

   What the animation was carrying is all still here, and closer to hand:
   the six capabilities are the cycling stage in HeroBento rather than chips
   orbiting a sphere, and the platform itself is now a section of its own right
   below, instead of a payoff you had to scroll 215vh to reach.

   No canvas, no scroll listener, no pin — the hero is server-rendered markup.

   Proportions follow granola.ai: the headline is the loudest thing on the
   page by a wide margin, the supporting copy is two short lines rather than a
   paragraph, and the product visual runs off the right edge instead of sitting
   inside the grid. That last part is what makes it read as a window onto
   something larger rather than a screenshot pasted beside the text — the
   column is allowed to overflow, and the section clips it.
   ========================================================================== */

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora-wash pointer-events-none absolute inset-0 -z-10" />
      {/* the right column is wider than the space it is given, so the product
          bleeds past the container edge and the section crops it */}
      <Container className="grid w-full items-center gap-10 py-12 lg:grid-cols-[52%_48%] lg:gap-8 lg:py-14">
        <div className="hero-copy flex flex-col items-start gap-4">
          <Pill aurora>
            <SparkMark size={14} animate />
            {/* the full positioning line wraps awkwardly at phone widths */}
            <span className="sm:hidden">AI-Powered Decision Intelligence</span>
            <span className="hidden sm:inline">{heroV2.pill}</span>
          </Pill>
          <h1 className="hero-display text-[var(--foreground)]">
            {heroV2.titleA}
            <br />
            <span className="aurora-text">{heroV2.titleB}</span>
          </h1>
          <p className="max-w-md text-[17px] font-normal leading-relaxed text-[var(--muted)] text-pretty sm:text-[18px]">
            {heroV2.lede}
          </p>
          <HeroEmailForm />
          {/* One row, not three stacked ones. This was a caption, then two
              checks, then a full-width secondary button — four elements of
              competing weight under a single CTA.

              --muted, not --muted-2: against the hero wash the lighter token
              measures 2.62:1, under the 4.5:1 AA floor for normal text. This
              is the copy meant to remove friction at the CTA, so it has to be
              legible. --muted measures 4.63:1. */}
          <div className="-mt-1 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-[var(--muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={13} strokeWidth={2.6} className="text-[var(--success)]" />
              Free personalised demo
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={13} strokeWidth={2.6} className="text-[var(--success)]" />
              Enterprise-ready from day one
            </span>
            <Link
              href="/platform"
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            >
              <Icon name="play" size={13} />
              {heroV2.secondaryCta}
            </Link>
          </div>
        </div>
        {/* The bleed is graded by width. A flat 124% put the sixth capability
            button 83px off-screen at 1280 and 40px at 1366 — fine while the
            rail was decorative glyphs, not fine now that each one is a labelled
            control you are meant to be able to click. Full bleed returns at
            2xl, where there is room for it. */}
        <div className="hero-product-column lg:w-[100%] xl:w-[108%] 2xl:w-[124%]">
          <HeroBento />
        </div>
      </Container>
    </section>
  );
}
