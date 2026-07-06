"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { personaTabs } from "@/lib/content";

/* ============================================================================
   PersonaTabs — "who is it for" switcher (CultureMonkey-style):
   For Employees · Managers · HRs · CHROs · Company. A pill tab bar on top,
   then a two-column card: narrative + deep links on the left, a deep-aurora
   stat visual on the right.

   Follows the APG tabs pattern: roving tabindex, Left/Right/Home/End keys,
   and every panel rendered (hidden when inactive) so aria-controls always
   points at a real element.
   ========================================================================== */

const PANEL = "linear-gradient(150deg, #140f2e 0%, #221a4d 52%, #3a2885 100%)";

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
          className="mt-8 grid items-stretch gap-5 lg:grid-cols-[1.5fr_1fr]"
        >
          {/* narrative */}
          <div className="flex flex-col rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--card)] p-7 shadow-[var(--shadow-sm)] sm:p-9">
            <h3 className="text-[clamp(1.4rem,1.1rem+1vw,1.9rem)] font-extrabold leading-tight tracking-[-0.02em] text-[var(--foreground)]">
              {tab.title}
            </h3>
            {tab.body.map((p) => (
              <p key={p.slice(0, 32)} className="mt-4 text-[15.5px] leading-relaxed text-[var(--muted)]">
                {p}
              </p>
            ))}
            <div className="mt-auto flex flex-wrap gap-x-7 gap-y-3 pt-7">
              {tab.links.map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 text-[14.5px] font-bold text-[var(--brand)]"
                >
                  {l.label}
                  <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* stat visual */}
          <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-[var(--r-2xl)] p-7 sm:p-8" style={{ background: PANEL }}>
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(124,92,248,0.7), transparent 70%)" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.13) 1.2px, transparent 1.5px)",
                backgroundSize: "16px 16px",
                maskImage: "linear-gradient(115deg, transparent 45%, #000 100%)",
                WebkitMaskImage: "linear-gradient(115deg, transparent 45%, #000 100%)",
              }}
            />
            <div className="relative flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-white/12 text-white backdrop-blur">
                <Icon name={tab.icon} size={22} />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/85 backdrop-blur">
                <SparkMark size={12} /> {tab.tab}
              </span>
            </div>
            <div className="relative pt-10">
              <div className="aurora-text text-[clamp(3rem,2.2rem+2.6vw,4.2rem)] font-extrabold leading-none tracking-[-0.03em]">
                {tab.stat.value}
              </div>
              <p className="mt-3 max-w-[16rem] text-[15px] leading-snug text-white/75">{tab.stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
