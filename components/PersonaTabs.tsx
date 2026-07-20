"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { personaTabs } from "@/lib/content";

/* ============================================================================
   PersonaTabs — "who is it for" switcher, redesigned per founder feedback
   ("boring, visually dull"). The old version led with two paragraphs of prose
   in a flat white card; the photo-less stat panel sat below the fold.

   Now each persona is a single editorial card:
   - a cinematic persona photograph (Higgsfield, brand-graded) with the big
     aurora stat overlaid on a dark gradient scrim — image first, not prose
   - a short lede instead of the two-paragraph wall (full copy lives on the
     linked pages)
   - three icon benefit chips that make the value scannable
   - the persona's deep links as pill buttons

   Keeps the APG tabs pattern: roving tabindex, arrow/Home/End keys, and all
   panels rendered (hidden when inactive) so aria-controls stays valid.
   ========================================================================== */

export function PersonaTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = personaTabs.length;
    const next = (i + n) % n;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTab(i + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTab(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(personaTabs.length - 1);
    }
  };

  return (
    <div>
      {/* tab bar */}
      <div role="tablist" aria-label="Who Vadal.ai is for" className="flex flex-wrap justify-center gap-2">
        {personaTabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`persona-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`persona-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-all duration-200 ${
              i === active
                ? "bg-[var(--foreground)] text-white shadow-[0_8px_24px_-10px_rgba(10,10,12,0.5)]"
                : "border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--foreground)]"
            }`}
          >
            {t.tab}
          </button>
        ))}
      </div>

      {/* panels — all rendered; inactive ones hidden */}
      {personaTabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`persona-panel-${tab.id}`}
          aria-labelledby={`persona-tab-${tab.id}`}
          hidden={i !== active}
          className="mt-8"
        >
          <div className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-md)] lg:grid lg:grid-cols-[1fr_1.2fr]">
            {/* -------- photo with stat overlay: the visual leads, everywhere */}
            <div className="relative isolate min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[440px]">
              <img
                src={tab.photo}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* scrim so the stat reads over any photo */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(200deg, rgba(13,11,22,0) 30%, rgba(13,11,22,0.42) 68%, rgba(20,15,46,0.86) 100%)",
                }}
              />
              {/* persona chip */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-bold text-[var(--foreground)] shadow-[var(--shadow-sm)] backdrop-blur">
                <SparkMark size={12} /> {tab.tab}
              </span>
              {/* the stat, big and aurora, on the image */}
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6">
                <div className="aurora-text text-[clamp(2.6rem,2rem+2.4vw,3.8rem)] font-extrabold leading-none tracking-[-0.03em]">
                  {tab.stat.value}
                </div>
                <p className="mt-1.5 max-w-[18rem] text-[14.5px] font-medium leading-snug text-white/85">
                  {tab.stat.label}
                </p>
              </div>
            </div>

            {/* ------------------------------------------------ the message */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <h3 className="text-[clamp(1.35rem,1.05rem+1vw,1.8rem)] font-extrabold leading-tight tracking-[-0.02em] text-[var(--foreground)] text-balance">
                {tab.title}
              </h3>
              <p className="mt-3.5 text-[15.5px] leading-relaxed text-[var(--muted)]">{tab.lede}</p>

              {/* benefit chips — scannable instead of prose */}
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
                {tab.benefits.map((b) => (
                  <li
                    key={b.label}
                    className="flex items-center gap-2.5 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3 sm:flex-col sm:items-start sm:gap-3 sm:py-4"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[var(--brand-tint)] text-[var(--brand)]">
                      <Icon name={b.icon} size={17} />
                    </span>
                    <span className="text-[13.5px] font-semibold leading-snug text-[var(--foreground)]">
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* deep links as pills */}
              <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
                {tab.links.map((l, li) => (
                  <Link
                    key={l.href + l.label}
                    href={l.href}
                    className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-bold transition-all duration-200 ${
                      li === 0
                        ? "bg-[var(--brand)] text-white shadow-[0_6px_16px_-6px_rgba(124,92,248,0.7)] hover:bg-[var(--brand-hover)]"
                        : "border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--line-strong)]"
                    }`}
                  >
                    {l.label}
                    <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
