"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* ============================================================================
   SmoothScroll — buttery momentum scrolling via Lenis.

   Lenis is rAF-driven, and rAF is paused while a document is hidden. So we gate
   it on visibility: it only runs while the page is actually visible (real,
   focused browser) and falls back to native scroll otherwise — which keeps the
   page reliably scrollable in headless/backgrounded contexts. Disabled entirely
   for prefers-reduced-motion. Touch devices keep native scrolling.

   Works alongside the scroll-driven hero/showcase: Lenis smooths the real
   window scroll, so position:sticky and getBoundingClientRect stay correct.
   ========================================================================== */

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | null = null;
    let raf = 0;

    const start = () => {
      if (lenis || document.hidden) return;
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 3), // quick to respond, soft to settle
        smoothWheel: true,
        anchors: true, // smooth in-page #anchor links too
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!lenis) return;
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenis = null;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  return null;
}
