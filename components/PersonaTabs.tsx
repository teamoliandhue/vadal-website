"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { personaTabs } from "@/lib/content";

/* ============================================================================
   PersonaTabs — "who is it for".

   Rebuilt. The previous version was a grey card behind five identical pills:
   every persona looked the same, so nothing signalled that moving across the
   tabs means anything.

   The idea here is that the five personas are a journey outward — one person,
   their manager, HR, the exec, the company — so each owns a stop on the
   brand's own teal → violet ramp. The tab indicator, the ambient glow behind
   the card, the stat and the benefit rules all take that persona's colour, so
   the whole section changes temperature as it advances. That is the design,
   not decoration: the colour is the progression.

   Composition changed too:
   - a real segmented control with one indicator that slides between tabs,
     instead of five separate pills lighting up
   - the stat is a frosted card on the photograph rather than loose text in a
     dark corner, and counts up when its persona comes round
   - benefits lost their grey boxes for accent rules, so the eye goes to the
     copy rather than to five identical containers

   Motion, all of it disabled under prefers-reduced-motion:
   - the indicator slides, and carries the auto-advance progress track
   - panel copy enters from the side you're travelling toward
   - benefits stagger in; the photograph drifts

   Auto-advance is gated in JS on the media query rather than left to CSS. The
   global reduce-motion rule in globals.css clamps animations to 0.001ms, so a
   CSS-driven cycle would fire animationend instantly and strobe all five.
   ========================================================================== */

const CYCLE_MS = 7000;

/** each persona sits one stop further along the aurora ramp */
const ACCENT: Record<string, string> = {
  employees: "#19c6b4",
  managers: "#2bb0e6",
  hrs: "#3b9eff",
  chros: "#5c7cf9",
  company: "#7c5cf8",
};
const accentOf = (id: string) => ACCENT[id] ?? "#7c5cf8";

/** "89%" → ["", 89, "%"] · "5 hrs" → ["", 5, " hrs"] · "+62" → ["+", 62, ""] */
function splitStat(v: string): [string, number, string] | null {
  const m = v.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  return m ? [m[1], parseFloat(m[2]), m[3]] : null;
}

function Stat({ value, run }: { value: string; run: boolean }) {
  const parts = splitStat(value);
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!parts || !run) return;
    const target = parts[1];
    const DUR = 900;
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / DUR);
      // ease-out so it settles rather than stopping dead
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // rAF stops dead while the tab is in the background, which would leave a
    // half-counted number on screen ("1%" instead of "18%") for anyone who
    // switches away mid-count. Snap to the real figure instead — a stat that
    // reads wrong is far worse than one that skipped its animation.
    const settle = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        setN(target);
      }
    };
    document.addEventListener("visibilitychange", settle);
    settle();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", settle);
    };
  }, [run, value]);

  if (!parts) return <>{value}</>;
  const [pre, target, post] = parts;
  const shown = n === null ? target : n;
  const dp = String(target).includes(".") ? 1 : 0;
  return (
    <>
      {pre}
      {shown.toFixed(dp)}
      {post}
    </>
  );
}

export function PersonaTabs() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [motion, setMotion] = useState(false); // may we animate at all?
  const [auto, setAuto] = useState(false); // is the deck still advancing itself?
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);

  const paused = hovered || !visible;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const tab = personaTabs[active];
  const accent = accentOf(tab.id);

  // motion (and therefore auto-advance) only for visitors who haven't opted out
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMotion(!mq.matches);
      setAuto(!mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // hold while the section is off screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // measure where the sliding indicator should sit
  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active];
      const track = trackRef.current;
      if (!el || !track) return;
      setInd({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    // fonts landing late would otherwise leave the indicator misplaced
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const go = (i: number, manual = false) => {
    const n = personaTabs.length;
    const next = (i + n) % n;
    setDir(next === active ? dir : next > active ? 1 : -1);
    setActive(next);
    if (manual) setAuto(false); // they've taken the wheel; stop moving it for them
    return next;
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const k = e.key;
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(k)) return;
    e.preventDefault();
    const to = k === "ArrowRight" ? i + 1 : k === "ArrowLeft" ? i - 1 : k === "Home" ? 0 : personaTabs.length - 1;
    tabRefs.current[go(to, true)]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {/* ambient light in the persona's colour — the section changes
          temperature as it moves along the ramp */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-[560px] -z-10 transition-[background] duration-700 ease-out"
        style={{ background: `radial-gradient(58% 52% at 50% 0%, ${accent}26, transparent 72%)` }}
      />

      {/* ------------------------------------------------- segmented control */}
      <div className="flex justify-center">
        <div
          ref={trackRef}
          role="tablist"
          aria-label="Who Vadal.ai is for"
          className="relative inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-[var(--line)] bg-[var(--card)] p-1.5 shadow-[var(--shadow-sm)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* the one indicator that travels, rather than five pills lighting up */}
          {ind && (
            <span
              aria-hidden="true"
              className="absolute bottom-1.5 top-1.5 -z-0 rounded-full transition-[transform,width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(${ind.x - 6}px)`, width: ind.w, background: accent }}
            >
              {/* auto-advance clock, riding the indicator */}
              {auto && (
                <span
                  key={active}
                  onAnimationEnd={() => go(active + 1)}
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left rounded-full bg-white/70"
                  style={{
                    animation: `persona-progress ${CYCLE_MS}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </span>
          )}

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
                onClick={() => go(i, true)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-300 ${
                  on ? "text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {t.tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------ panels */}
      {personaTabs.map((t, i) => {
        const on = i === active;
        const a = accentOf(t.id);
        return (
          <div
            key={t.id}
            role="tabpanel"
            id={`persona-panel-${t.id}`}
            aria-labelledby={`persona-tab-${t.id}`}
            hidden={!on}
            className="mt-9"
          >
            <div
              className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--card)] transition-shadow duration-700 lg:grid lg:grid-cols-[0.85fr_1fr]"
              style={{ boxShadow: `0 24px 60px -30px ${a}66, var(--shadow-md)` }}
            >
              {/* ------------------------------------------------- photograph */}
              {/* outside the keyed wrapper below, so changing persona never
                  remounts or re-decodes the image */}
              <div className="relative isolate min-h-[320px] overflow-hidden sm:min-h-[380px] lg:min-h-[470px]">
                <img
                  src={t.photo}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover motion-reduce:animate-none"
                  style={{ animation: "ken-burns 22s ease-in-out infinite alternate" }}
                  loading={i === 0 ? "eager" : "lazy"}
                />
                {/* persona-tinted grade, so the photo belongs to its colour */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 mix-blend-soft-light"
                  style={{ background: `linear-gradient(150deg, ${a} 0%, transparent 55%)` }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(195deg, rgba(13,11,22,0) 42%, rgba(13,11,22,0.35) 72%, rgba(13,11,22,0.78) 100%)",
                  }}
                />

                {/* the stat, as a frosted card rather than loose text */}
                {on && (
                  <div
                    key={`stat-${active}`}
                    className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6"
                    style={{ animation: "persona-in 620ms cubic-bezier(0.22,1,0.36,1) both", animationDelay: "120ms" }}
                  >
                    <div className="inline-flex flex-col rounded-[var(--r-lg)] border border-white/25 bg-white/12 px-5 py-4 backdrop-blur-xl">
                      <span
                        className="text-[clamp(2.2rem,1.7rem+2vw,3.1rem)] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
                        style={{ color: "#fff", textShadow: `0 2px 18px ${a}` }}
                      >
                        <Stat value={t.stat.value} run={motion} />
                      </span>
                      <span className="mt-2 max-w-[16rem] text-[13.5px] font-medium leading-snug text-white/90">
                        {t.stat.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* ---------------------------------------------------- message */}
              <div
                key={on ? `on-${active}` : `off-${i}`}
                className="flex flex-col p-6 sm:p-8 lg:p-11"
                style={
                  on
                    ? ({
                        animation: "persona-slide 520ms cubic-bezier(0.22,1,0.36,1) both",
                        ["--from" as string]: `${dir * 22}px`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <span
                  className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em]"
                  style={{ background: `${a}1f`, color: a }}
                >
                  <Icon name={t.icon} size={14} />
                  {t.short}
                </span>

                <h3 className="mt-5 text-[clamp(1.4rem,1.1rem+1.1vw,1.95rem)] font-extrabold leading-tight tracking-[-0.02em] text-[var(--foreground)] text-balance">
                  {t.title}
                </h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--muted)]">{t.lede}</p>

                {/* benefits — accent rules instead of five identical grey boxes */}
                <ul className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-3">
                  {t.benefits.map((b, bi) => (
                    <li
                      key={b.label}
                      className="border-t-2 pt-3.5"
                      style={
                        on
                          ? ({
                              borderColor: a,
                              animation: "persona-in 520ms cubic-bezier(0.22,1,0.36,1) both",
                              animationDelay: `${180 + bi * 90}ms`,
                            } as React.CSSProperties)
                          : { borderColor: a }
                      }
                    >
                      <Icon name={b.icon} size={18} style={{ color: a }} />
                      <span className="mt-2 block text-[14px] font-semibold leading-snug text-[var(--foreground)]">
                        {b.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
                  {t.links.map((l, li) => (
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
        );
      })}
    </div>
  );
}
