import { Button, Container, Pill } from "./ui";
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
   ========================================================================== */

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora-wash pointer-events-none absolute inset-0 -z-10" />
      <Container className="grid w-full items-center gap-12 py-12 lg:grid-cols-[56%_44%] lg:gap-10 lg:py-16">
        <div className="flex flex-col items-start gap-5">
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
          <p className="max-w-lg text-[16px] font-normal leading-relaxed text-[var(--muted)] text-pretty sm:text-[17px]">
            {heroV2.lede}
          </p>
          <HeroEmailForm />
          <Button href="/platform" variant="ghost" size="lg" className="w-full justify-center sm:w-auto">
            <Icon name="play" size={15} className="text-[var(--brand)]" />
            {heroV2.secondaryCta}
          </Button>
        </div>
        <div>
          <HeroBento />
        </div>
      </Container>
    </section>
  );
}
