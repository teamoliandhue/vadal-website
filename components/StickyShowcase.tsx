"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container, Eyebrow } from "./ui";

/* ============================================================================
   StickyShowcase — a Paraform-style "stop-scroll" feature carousel.

   The section pins to the viewport (sticky) and, as the user scrolls, it
   advances through a set of steps: a segmented progress bar fills, the big
   stat swaps, and the right-hand visual cross-fades. Driven by the section's
   scroll position (rAF-throttled), so it tracks the scrollbar 1:1.

   Mobile (<lg) and prefers-reduced-motion fall back to a simple stacked
   layout — every step rendered in order, no pinning.
   ========================================================================== */

export type ShowcaseStep = {
  heading: string;
  body: string;
  stat: string;
  statLabel: string;
  visual: ReactNode;
  bg?: string; // textured colored backdrop image for the visual
};

/* the product card floats inside a textured colored stage (a brand halftone) */
function Stage({ bg, children }: { bg?: string; children: ReactNode }) {
  if (!bg) return <div className="flex justify-center">{children}</div>;
  return (
    <div
      className="relative flex h-full min-h-[420px] w-full items-center justify-center overflow-hidden rounded-[28px] p-6 shadow-[var(--shadow-lg)] sm:p-9"
      style={{ backgroundImage: `url('${bg}')`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* soft top sheen + gentle bottom shade for depth so the card lifts off */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-black/15"
        aria-hidden="true"
      />
      <div className="relative flex w-full flex-col items-center">{children}</div>
    </div>
  );
}

export function StickyShowcase({
  eyebrow,
  steps,
  note,
}: {
  eyebrow?: string;
  steps: ShowcaseStep[];
  note?: string;
}) {
  const N = steps.length;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [seg, setSeg] = useState(0); // 0..1 progress within the active step
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncRM = () => setReduced(rm.matches);
    syncRM();
    rm.addEventListener?.("change", syncRM);

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh; // scrollable distance while pinned
      const top = el.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 0; // 0..1 across all steps
      const f = p * N; // 0..N
      let idx = Math.floor(f + 1e-6);
      if (idx > N - 1) idx = N - 1;
      if (idx < 0) idx = 0;
      setActive(idx);
      setSeg(Math.min(Math.max(f - idx, 0), 1));
    };
    // Read synchronously on scroll — the browser already coalesces scroll
    // events to the frame rate, and this stays correct in environments that
    // throttle requestAnimationFrame.
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      rm.removeEventListener?.("change", syncRM);
    };
  }, [N]);

  /* ------------------------------------------- stacked fallback (mobile / RM) */
  const stacked = (
    <div className={reduced ? "" : "lg:hidden"}>
      <Container>
        {eyebrow && <Eyebrow className="mb-10">{eyebrow}</Eyebrow>}
        <div className="space-y-20">
          {steps.map((s, i) => (
            <div key={i} className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-[26px] font-extrabold leading-tight tracking-[-0.025em] text-balance">
                  {s.heading}
                </h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-[var(--muted)]">
                  {s.body}
                </p>
                <div className="mt-7">
                  <div className="text-[46px] font-semibold leading-none tracking-[-0.03em] text-[var(--ink-deep)]">
                    {s.stat}
                  </div>
                  <div className="mt-2 text-[14px] text-[var(--muted)]">{s.statLabel}</div>
                </div>
              </div>
              <Stage bg={s.bg}>{s.visual}</Stage>
            </div>
          ))}
        </div>
        {note && <p className="mt-10 text-[12px] text-[var(--muted-2)]">{note}</p>}
      </Container>
    </div>
  );

  /* ----------------------------------------------------- pinned desktop stage */
  const pinned = (
    <div
      ref={ref}
      className={reduced ? "hidden" : "relative hidden lg:block"}
      style={{ height: `${N * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="w-full">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {/* ----- left: heading / body / progress / stat */}
            <div className="flex h-[540px] flex-col justify-between py-2">
              <div>
                {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
                <div className="relative h-[210px]">
                  {steps.map((s, i) => (
                    <div
                      key={i}
                      className="absolute inset-x-0 top-0 transition-all duration-500 ease-out"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: i === active ? "translateY(0)" : "translateY(14px)",
                        pointerEvents: i === active ? "auto" : "none",
                      }}
                      aria-hidden={i !== active}
                    >
                      <h3 className="text-[30px] font-extrabold leading-[1.12] tracking-[-0.028em] text-balance">
                        {s.heading}
                      </h3>
                      <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[var(--muted)]">
                        {s.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* segmented progress — active step is a wide pill that fills */}
                <div className="mb-9 flex items-center gap-2" aria-hidden="true">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className="h-2 overflow-hidden rounded-full bg-[var(--surface-2)] transition-all duration-500 ease-out"
                      style={{ width: i === active ? 46 : 8 }}
                    >
                      <div
                        className="h-full rounded-full bg-[var(--ink-deep)]"
                        style={{
                          width:
                            i < active ? "100%" : i === active ? `${seg * 100}%` : "0%",
                          transition: i === active ? "width 120ms linear" : "width 400ms ease-out",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* big stat */}
                <div className="relative h-[96px]">
                  {steps.map((s, i) => (
                    <div
                      key={i}
                      className="absolute inset-x-0 top-0 transition-all duration-500 ease-out"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: i === active ? "translateY(0)" : "translateY(12px)",
                      }}
                      aria-hidden={i !== active}
                    >
                      <div className="text-[58px] font-semibold leading-none tracking-[-0.035em] text-[var(--ink-deep)]">
                        {s.stat}
                      </div>
                      <div className="mt-2.5 text-[15px] text-[var(--muted)]">{s.statLabel}</div>
                    </div>
                  ))}
                </div>
                {note && <p className="mt-5 text-[11px] text-[var(--muted-2)]">{note}</p>}
              </div>
            </div>

            {/* ----- right: cross-fading visual stack */}
            <div className="relative h-[540px]">
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={i}
                    className="absolute inset-0 transition-all duration-700 ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0) scale(1)"
                        : "translateY(22px) scale(0.965)",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    aria-hidden={!isActive}
                  >
                    <Stage bg={s.bg}>{s.visual}</Stage>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );

  return (
    <>
      {pinned}
      {stacked}
    </>
  );
}
