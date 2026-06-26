"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* ============================================================================
   Reveal — fades + rises its children in when they scroll into view, via
   IntersectionObserver. SSR/no-JS safe: content renders visible by default and
   is only hidden-then-revealed once JS runs and motion is allowed. Never wrap a
   `position: sticky` subtree — the transform would break the sticky context.
   ========================================================================== */

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;

    el.classList.add("reveal-on-scroll");
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-revealed");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
