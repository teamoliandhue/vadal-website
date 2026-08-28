import Link from "next/link";
import { platformLayers } from "@/lib/platform-nav";

/* ============================================================================
   PlatformReveal — what the scroll actually pays off with.

   The globe used to resolve into "One platform. Every decision." and a button
   that sent you somewhere else. That restated the value proposition the reader
   had met thirty seconds earlier at the top of the hero, so 2.6 screens of
   scrolling bought them nothing new, at the most valuable point on the page.

   This answers the question they actually have by then — how big is this, and
   what is in it. The six layers assemble in front of the receding globe, each
   with its outcome and the products inside it, and the last frame is the whole
   platform visible at once.

   The layers arrive on a stagger rather than one scroll-step each: six
   separate steps would have cost more scroll than the globe did, and the point
   is to spend less of it, not more. Content comes from lib/platform-nav, which
   is the same source the mega menu and /platform use, so this cannot drift
   from them.
   ========================================================================== */

/* the aurora ramp, one stop per layer — teal at the human end, violet at the
   intelligence end, matching the order the platform is actually built in */
const LAYER_TINT = ["#19c6b4", "#22b8dd", "#3b9eff", "#5c7cf9", "#7c5cf8", "#8f5cf0"];

export function PlatformReveal({ animated = false }: { animated?: boolean }) {
  const total = platformLayers.reduce((a, l) => a + l.modules.length, 0);

  return (
    <div className="w-full">
      <p
        className={`text-center font-semibold uppercase tracking-[0.14em] text-[var(--muted-2)] ${
          animated ? "text-[min(11.5px,1.5vh)]" : "text-[11.5px]"
        }`}
      >
        The platform
      </p>
      <h2
        className={
          animated
            ? "mt-[min(0.5rem,1vh)] text-center text-[min(clamp(1.6rem,2.9vw,2.6rem),4.4vh)] font-semibold leading-[1.1] tracking-[-0.025em]"
            : "display-lg mt-2 text-center font-semibold"
        }
      >
        Six layers. <span className="aurora-text">One platform.</span>
      </h2>

      <div
        className={`grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 ${
          animated ? "mt-[min(1.25rem,2.2vh)]" : "mt-10"
        }`}
      >
        {platformLayers.map((layer, i) => {
          const tint = LAYER_TINT[i % LAYER_TINT.length];
          return (
            <Link
              key={layer.id}
              href={`/platform#${layer.id}`}
              className="group relative flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-3.5 text-left shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
              style={
                animated
                  ? { animation: `persona-in 620ms cubic-bezier(0.22,1,0.36,1) both`, animationDelay: `${i * 70}ms` }
                  : undefined
              }
            >
              {/* the layer's stop on the ramp, as a hairline along the top */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: tint }}
              />
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: tint }} />
                <span className="text-[13.5px] font-bold leading-tight tracking-[-0.01em] text-[var(--foreground)]">
                  {layer.name}
                </span>
                <span className="ml-auto shrink-0 text-[11px] font-bold tabular-nums" style={{ color: tint }}>
                  {layer.modules.length}
                </span>
              </span>
              <span className="mt-1 text-[12px] leading-snug text-[var(--muted)]">{layer.lede}</span>
              {/* the products themselves — the answer to "what is in it" */}
              <span className="mt-2 line-clamp-2 text-[11px] leading-snug text-[var(--muted-2)]">
                {layer.modules.map((m) => m.name).join(" · ")}
              </span>
            </Link>
          );
        })}
      </div>

      <p
        className={`text-center text-[var(--muted)] ${
          animated ? "mt-[min(1rem,1.8vh)] text-[min(14px,1.9vh)]" : "mt-8 text-[15px]"
        }`}
      >
        <b className="font-bold text-[var(--foreground)]">{total} products</b> across six layers, on one
        AI platform — <Link href="/platform" className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline">see them all</Link>
      </p>
    </div>
  );
}
