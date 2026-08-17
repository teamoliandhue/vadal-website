import { Container, Section, SectionHead } from "./ui";
import { StoryArt, archetypeFor, PLATE } from "./StoryArt";

/* ============================================================================
   ProductScreens — §6 of the content spec, as illustrations.

   The spec names every screen a product page should show (111 across the 25
   pages). This section has been three things: empty dashed frames, then real
   Figma exports plus 84 generated stand-ins, and now an illustration each.

   The decision behind the change: the site does not show product UI. Real
   captures go stale the moment the product moves, and generated ones assert
   that a specific interface exists with specific numbers in it — which 84 of
   these were. What the section is actually for is telling a reader what each
   capability does, and a drawing does that without pretending to be a
   photograph of anything.

   The screen NAMES stay exactly as the spec words them, because they are the
   content. Each resolves to one of ten archetypes in StoryArt — a dashboard, a
   feed, a builder, a board, and so on. "Driver-Level Peer Gap View" over the
   dashboard scene reads as "this is a dashboard about that", which is true.
   ========================================================================== */

function Frame({ label }: { label: string }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
        <div className="aspect-[3/2]" style={{ background: PLATE }}>
          <StoryArt screen={label} />
        </div>
      </div>
      <figcaption className="mt-3 text-[14px] font-semibold text-[var(--foreground)]">
        {label}
      </figcaption>
    </figure>
  );
}

export function ProductScreens({
  screens,
  name,
}: {
  screens: string[];
  slug?: string;
  name: string;
}) {
  if (!screens.length) return null;

  return (
    <Section tone="surface">
      <Container>
        <SectionHead eyebrow="What you get" title={`${name}, screen by screen`} />
        <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
          {screens.map((s) => (
            <Frame key={s} label={s} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
