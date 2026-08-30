"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { platformLayers } from "@/lib/platform-nav";
import { PLATFORM_SCENES } from "./PlatformScenes";

/* ============================================================================
   PlatformReveal — what the scroll actually pays off with.

   The globe used to resolve into "One platform. Every decision." and a button
   that sent you somewhere else. That restated the value proposition the reader
   met thirty seconds earlier at the top of the hero, so 2.6 screens of
   scrolling bought them nothing new, at the most valuable point on the page.

   This answers the question they actually have by then — how big is this, and
   what is in it. Content comes from lib/platform-nav, the same source the mega
   menu and /platform use, so this cannot drift from them.

   Each layer carries a small diagram of what it does. They are drawn in the
   flat chart language of the hero bento — line, bar, node — deliberately NOT
   the isometric language of the journey section above: two illustrated
   sections back to back in the same style read as one long thing, and these
   are cards to scan rather than scenes to watch.

   Everything animates off a single `on` flag set when the grid reaches the
   viewport, so the six diagrams draw themselves in one wave rather than each
   running its own timer. Motion is transition-driven, not keyframe-driven, so
   the global prefers-reduced-motion rule (which clamps durations to 0.001ms)
   turns it into an instant, correct final state instead of a strobe.
   ========================================================================== */

/* the aurora ramp, one stop per layer — teal at the human end, violet at the
   intelligence end, matching the order the platform is actually built in */
const LAYER_TINT = ["#19c6b4", "#22b8dd", "#3b9eff", "#5c7cf9", "#7c5cf8", "#8f5cf0"];

export function PlatformReveal() {
  const total = platformLayers.reduce((a, l) => a + l.modules.length, 0);
  /* Three states, not a boolean, because the hidden state must never be what
     the server renders: an SSR'd opacity:0 leaves every card permanently
     invisible with JavaScript off. "ready" is the final state and is what both
     the server and the first client paint emit, so no-JS readers get the whole
     grid. Only once mounted, and only if the grid is still below the fold, do
     we arm the hidden state — which is why the arming is never seen. */
  const [phase, setPhase] = useState<"ready" | "armed" | "playing">("ready");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return; // already in view
    setPhase("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setPhase("playing");
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const on = phase !== "armed";

  return (
    <div className="w-full">
      <p className="text-center text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--muted-2)]">
        The platform
      </p>
      <h2 className="display-lg mt-2 text-center font-semibold">
        Six layers. <span className="aurora-text">One platform.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-[16px] leading-relaxed text-[var(--muted)]">
        Every layer runs on the same data, the same AI and the same permissions. Start with one, add the rest when you need them.
      </p>

      <div ref={gridRef} className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {platformLayers.map((layer, i) => {
          const tint = LAYER_TINT[i % LAYER_TINT.length];
          return (
            <Link
              key={layer.id}
              href={`/platform#${layer.id}`}
              className={`group relative flex flex-col overflow-hidden rounded-[var(--r-lg)] border bg-[var(--card)] text-left shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] motion-reduce:transition-none`}
              style={{
                borderColor: "var(--line)",
                opacity: on ? 1 : 0,
                transform: on ? "translateY(0)" : "translateY(14px)",
                transitionDelay: on ? `${i * 70}ms` : "0ms",
              }}
            >
              {/* the layer's stop on the ramp */}
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2.5px] z-10" style={{ background: tint }} />

              {/* what this layer does, as a picture — drawn in the same
                  isometric language as the journey section, so the site keeps
                  one illustration voice from top to bottom */}
              {/* the stage paints its own gradient, so the band is just a clip */}
              <div className="relative w-full overflow-hidden" aria-hidden="true">
                <span
                  className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${tint}40, transparent 70%)` }}
                />
                <div className="relative aspect-[26/14]">{PLATFORM_SCENES[layer.id]?.()}</div>
              </div>

              <div className="flex flex-1 flex-col border-t border-[var(--line)] p-5">
                <span className="flex items-baseline gap-2">
                  <span className="text-[16px] font-bold leading-tight tracking-[-0.01em] text-[var(--foreground)]">
                    {layer.name}
                  </span>
                  <span
                    className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums"
                    style={{ background: `${tint}1a`, color: tint }}
                  >
                    {layer.modules.length}
                  </span>
                </span>
                <span className="mt-1.5 text-[13.5px] leading-snug text-[var(--muted)]">{layer.lede}</span>

                {/* the products themselves — chips, because a run-on list of
                    twenty-five names joined by dots is not scannable */}
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {layer.modules.map((m) => (
                    <span
                      key={m.name}
                      className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1 text-[11.5px] font-medium leading-none text-[var(--muted)] transition-colors duration-300"
                    >
                      {m.name}
                    </span>
                  ))}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-10 text-center text-[15px] text-[var(--muted)]">
        <b className="font-bold text-[var(--foreground)]">{total} products</b> across six layers, on one
        AI platform — <Link href="/platform" className="font-semibold text-[var(--brand)] underline-offset-4 hover:underline">see them all</Link>
      </p>
    </div>
  );
}
