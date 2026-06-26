"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { testimonials, type Testimonial } from "@/lib/content";

/* ============================================================================
   TestimonialCarousel — a horizontally-stacked card carousel. All cards live on
   one track that slides; the active card is centred and scaled up while its
   neighbours peek, faded and slightly smaller. Each card is equal height, with
   a real portrait on a textured brand backdrop and the customer's logo.
   ========================================================================== */

/* simple monochrome wordmark per (illustrative) customer */
function Wordmark({ company }: { company: string }) {
  const marks: Record<string, ReactNode> = {
    "Northwind Retail": (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 5l4 5-4 5M9 5l4 5-4 5" />
      </svg>
    ),
    "Meridian Facilities": (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <rect x="3" y="9" width="3" height="8" rx="0.5" />
        <rect x="8.5" y="4" width="3" height="13" rx="0.5" />
        <rect x="14" y="11" width="3" height="6" rx="0.5" />
      </svg>
    ),
    "Rivermark Logistics": (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M2 12c2-3.5 5 3.5 8 0s4-3.5 6 0" />
        <path d="M2 7c2-3.5 5 3.5 8 0s4-3.5 6 0" opacity="0.5" />
      </svg>
    ),
    "Forge Industries": (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 3l7 13H3z" />
      </svg>
    ),
  };
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-[var(--ink-deep)]">
      {marks[company]}
      <span className="text-[14px] font-extrabold tracking-[-0.02em]">{company}</span>
    </span>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lg)]">
      <div className="grid w-full grid-cols-1 sm:grid-cols-[minmax(200px,32%)_1fr]">
        {/* portrait on a textured backdrop */}
        <div
          className="relative min-h-[180px] overflow-hidden sm:min-h-0"
          style={
            t.tex
              ? { backgroundImage: `url('${t.tex}')`, backgroundSize: "cover", backgroundPosition: "center" }
              : { background: "var(--brand)" }
          }
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/15" aria-hidden="true" />
          <div className="absolute inset-0 grid place-items-center p-5">
            <div className="grid aspect-square w-[190px] max-w-[82%] place-items-center overflow-hidden rounded-[22px] bg-white shadow-[0_18px_44px_-14px_rgba(13,11,22,0.55)]">
              {t.photo ? (
                <img src={t.photo} alt={t.name} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <span className="text-[36px] font-extrabold text-[var(--brand)]">{t.initials}</span>
              )}
            </div>
          </div>
        </div>

        {/* quote */}
        <figure className="flex flex-col p-6 sm:p-9">
          <span className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-[var(--brand-tint)] text-[24px] font-extrabold leading-none text-[var(--brand)]" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="mt-4 flex-1 text-[clamp(1.05rem,0.85rem+0.7vw,1.4rem)] font-medium leading-snug tracking-[-0.01em] text-[var(--foreground)] text-pretty">
            {t.quote}
          </blockquote>
          <figcaption className="mt-6 flex items-end justify-between gap-4 border-t border-[var(--line)] pt-5">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold text-[var(--foreground)]">{t.name}</p>
              <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--muted-2)]">
                {t.role}
              </p>
            </div>
            <Wordmark company={t.company} />
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const [cw, setCw] = useState(1120); // container width (measured after mount)
  const viewportRef = useRef<HTMLDivElement>(null);
  const n = testimonials.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setCw(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const gap = 24;
  const cardW = cw < 640 ? cw - 24 : Math.min(940, cw - 120);
  const translateX = cw / 2 - cardW / 2 - i * (cardW + gap);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        else if (e.key === "ArrowRight") go(1);
      }}
    >
      {/* sliding track */}
      <div ref={viewportRef} className="overflow-hidden py-2">
        <div
          className="flex items-stretch transition-transform duration-[550ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{ gap: `${gap}px`, transform: `translate3d(${translateX}px,0,0)` }}
          aria-live="polite"
        >
          {testimonials.map((t, k) => {
            const active = k === i;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Testimonial ${k + 1} of ${n}: ${t.name}, ${t.company}`}
                aria-current={active}
                tabIndex={active ? 0 : -1}
                className="shrink-0 cursor-pointer text-left transition-[opacity,transform] duration-500 ease-out sm:h-[340px]"
                style={{
                  width: `${cardW}px`,
                  opacity: active ? 1 : 0.45,
                  transform: active ? "scale(1)" : "scale(0.92)",
                }}
              >
                <Card t={t} />
              </button>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div className="mx-auto mt-8 flex max-w-[940px] items-center justify-between">
        <div className="flex items-center gap-1">
          {testimonials.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show testimonial ${k + 1}`}
              aria-current={k === i}
              className="group grid place-items-center px-1 py-2.5"
            >
              <span
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  k === i ? "w-7 bg-[var(--brand)]" : "w-2.5 bg-[var(--line-strong)] group-hover:bg-[var(--muted-2)]"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] active:scale-95"
          >
            <Icon name="arrow" size={18} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] active:scale-95"
          >
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
