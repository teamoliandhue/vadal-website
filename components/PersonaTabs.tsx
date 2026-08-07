"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { personaTabs } from "@/lib/content";

/* ============================================================================
   PersonaTabs — "who is it for" switcher.

   Each persona is a single editorial card: a brand-graded photograph with the
   stat overlaid, a short lede, three benefit chips, and the persona's deep
   links. Keeps the APG tabs pattern — roving tabindex, arrow/Home/End keys,
   and every panel rendered (hidden when inactive) so aria-controls stays valid.

   It now advances on its own, because five personas behind five unlabelled
   pills meant most visitors only ever saw the first one. Three things make
   that bearable rather than annoying:

   - the active pill carries a progress track, so the change is expected
     rather than something that happens while you're mid-sentence
   - it pauses on hover or keyboard focus, and while the section is off screen
   - it stops for good the moment someone picks a tab themselves

   The advance is driven by the progress bar's own animationend rather than a
   timer, so the bar and the switch can't drift apart.

   Auto-advance is disabled outright under prefers-reduced-motion. That has to
   happen here in JS: the global reduce-motion rule in globals.css clamps every
   animation to 0.001ms, so leaving it to CSS would fire animationend instantly
   and strobe through all five personas.
   ========================================================================== */

const CYCLE_MS = 6500;

export function PersonaTabs() {
  const [active, setActive] = useState(0);
  // two independent reasons to hold: pointer/focus is on it, or it's off screen
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [auto, setAuto] = useState(false);
  const paused = hovered || !visible;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  // only ever turn auto-advance on for visitors who haven't asked for less
  // motion — see the note above about the global 0.001ms clamp
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAuto(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // don't cycle through personas while the section is off screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (i: number, manual = false) => {
    const n = personaTabs.length;
    const next = (i + n) % n;
    setActive(next);
    if (manual) setAuto(false); // they've taken the wheel; stop moving it for them
    return next;
  };

  const focusTab = (i: number) => {
    tabRefs.current[select(i, true)]?.focus();
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
    <div
      ref={rootRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {/* tab bar */}
      <div role="tablist" aria-label="Who Vadal.ai is for" className="flex flex-wrap justify-center gap-2">
        {personaTabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`persona-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`persona-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i, true)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative overflow-hidden rounded-full px-4 py-2 text-[14px] font-semibold transition-all duration-200 ${
                on
                  ? "bg-[var(--foreground)] text-white shadow-[0_8px_24px_-10px_rgba(10,10,12,0.5)]"
                  : "border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--foreground)]"
              }`}
            >
              {t.tab}
              {/* the progress track doubles as the clock: when it finishes, the
                  next persona comes up */}
              {on && auto && (
                <span
                  key={active}
                  aria-hidden="true"
                  onAnimationEnd={() => setActive((a) => (a + 1) % personaTabs.length)}
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-white/60"
                  style={{
                    animation: `persona-progress ${CYCLE_MS}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          );
        })}
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
            {/* deliberately outside the keyed wrapper below, so switching
                persona never remounts (and re-decodes) the photograph */}
            <div className="relative isolate min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[440px]">
              <img
                src={tab.photo}
                alt=""
                className="absolute inset-0 h-full w-full object-cover motion-reduce:animate-none"
                style={{ animation: "ken-burns 18s ease-in-out infinite alternate" }}
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
            {/* keyed on the active index so the copy animates in on each
                change instead of snapping */}
            <div
              key={i === active ? `on-${active}` : `off-${i}`}
              className="flex flex-col p-6 sm:p-8 lg:p-10"
              style={i === active ? { animation: "persona-in 460ms cubic-bezier(0.22,1,0.36,1) both" } : undefined}
            >
              <h3 className="text-[clamp(1.35rem,1.05rem+1vw,1.8rem)] font-extrabold leading-tight tracking-[-0.02em] text-[var(--foreground)] text-balance">
                {tab.title}
              </h3>
              <p className="mt-3.5 text-[15.5px] leading-relaxed text-[var(--muted)]">{tab.lede}</p>

              {/* benefit chips — scannable instead of prose */}
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
                {tab.benefits.map((b) => (
                  <li
                    key={b.label}
                    className="flex items-center gap-2.5 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3 transition-colors duration-200 hover:border-[var(--line-strong)] sm:flex-col sm:items-start sm:gap-3 sm:py-4"
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

              {/* deep links as pills — lead action is ink/black, matching the
                  Button `dark` variant rather than competing with the violet
                  primary CTAs elsewhere on the page */}
              <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
                {tab.links.map((l, li) => (
                  <Link
                    key={l.href + l.label}
                    href={l.href}
                    className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-bold transition-all duration-200 ${
                      li === 0
                        ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-label)] shadow-[0_8px_24px_-10px_rgba(10,10,12,0.5)] hover:-translate-y-0.5 hover:bg-[var(--btn-primary-bg-hover)] active:bg-[var(--btn-primary-bg-active)]"
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
