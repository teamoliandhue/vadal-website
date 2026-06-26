import type { ReactNode } from "react";
import { Icon } from "./Icon";

/* ============================================================================
   Hero bento — a compact, Maze-style mosaic mixing a REAL frontline photo with
   live Vadal product moments (demo org "oliandhue"). Four tiles:
   a real voice, a live score (area chart), one AI answer, a live vote.

   Brand law: violet = the user's ACTIONS only (poll). The Aurora gradient =
   INTELLIGENCE only → one tile ("Ask Vadal"). Body copy ≥14px.

   NOTE: figures (82▲4, 1,820 votes, "14% over target") are ILLUSTRATIVE sample
   data; the portrait is a licensed Unsplash placeholder — swap for Vadal's own
   employee photography and approved numbers before launch.
   ========================================================================== */

function Tile({
  area,
  delay,
  className = "",
  float = false,
  shadow = "sm",
  children,
}: {
  area: string;
  delay: number;
  className?: string;
  float?: boolean;
  shadow?: "sm" | "lg";
  children: ReactNode;
}) {
  const sh = shadow === "lg" ? "shadow-[var(--shadow-lg)]" : "shadow-[var(--shadow-sm)]";
  return (
    <div
      className={`ba-${area} reveal ${float ? "lg:animate-float" : ""} ${sh} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

const card = "h-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)]";

export function HeroBento() {
  return (
    <div className="hero-bento">
      {/* ------------------------------------ voice of the frontline (photo) */}
      <Tile area="photo" delay={0.05} shadow="lg" className="min-h-[230px]">
        <figure className={`${card} group relative h-full`}>
          <img
            src="/people/frontline-portrait.jpg"
            alt="A frontline colleague sharing feedback on the Vadal app"
            className="h-full w-full object-cover"
            loading="eager"
          />
          {/* top chip */}
          <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-[rgba(255,255,255,0.92)] px-2.5 py-1 text-[12px] font-semibold text-[var(--foreground)] shadow-[var(--shadow-sm)] backdrop-blur">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--danger)]" aria-hidden="true" />
            Voice of the frontline
          </span>
          {/* caption */}
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(13,11,22,0.82)] via-[rgba(13,11,22,0.32)] to-transparent px-4 pb-4 pt-12">
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-white">Maya · Store 14</p>
                <p className="truncate text-[12px] text-white/80">“Feedback on the new shift app”</p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[rgba(255,255,255,0.96)] shadow-[var(--shadow-md)]" aria-hidden="true">
                <Icon name="play" size={15} className="translate-x-[1px] text-[var(--ink-deep)]" />
              </span>
            </div>
          </figcaption>
        </figure>
      </Tile>

      {/* ----------------------------------------------------- channels feed */}
      <Tile area="channels" delay={0.12} shadow="lg">
        <div className={`${card} flex h-full flex-col gap-1 p-4`}>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">
            Channels
          </p>
          {[
            { e: "🏠", n: "All channels", m: "Everything", active: true },
            { e: "📣", n: "#company", m: "6 this week" },
            { e: "🏆", n: "#wins", m: "23 this week" },
            { e: "🌿", n: "#wellbeing", m: "9 this week" },
            { e: "👋", n: "#people", m: "11 this week" },
          ].map((c) => (
            <div
              key={c.n}
              className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-1.5 ${
                c.active ? "bg-[var(--brand-tint)]" : ""
              }`}
            >
              <span className="text-[14px] leading-none">{c.e}</span>
              <span
                className={`min-w-0 flex-1 truncate text-[13px] font-semibold ${
                  c.active ? "text-[var(--brand)]" : "text-[var(--foreground)]"
                }`}
              >
                {c.n}
              </span>
              <span className="shrink-0 text-[11px] text-[var(--muted-2)]">{c.m}</span>
            </div>
          ))}
        </div>
      </Tile>

      {/* ------------------------------------------ Ask Vadal (Aurora = AI) */}
      <Tile area="ask" delay={0.18} float shadow="lg">
        <div className="relative flex h-full flex-col gap-2.5 overflow-hidden rounded-[var(--r-lg)] bg-[#141419] p-5 shadow-[var(--shadow-aurora)]">
          {/* corner aurora glow — intelligence */}
          <div
            className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full opacity-45 blur-3xl"
            style={{ background: "var(--aurora)" }}
            aria-hidden="true"
          />

          {/* header */}
          <div className="relative flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white"
              style={{ background: "var(--aurora)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spark" aria-hidden="true">
                <path
                  d="M12 1.5c.5 5.6 2.4 7.9 8 8.5-5.6.6-7.5 2.9-8 8.5-.5-5.6-2.4-7.9-8-8.5 5.6-.6 7.5-2.9 8-8.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="text-[16px] font-bold tracking-[-0.01em] text-white">Ask Vadal</span>
            <span className="rounded-[9px] border border-white/15 px-2 py-[1px] text-[11px] font-medium text-[#d4d4d8]">
              AI
            </span>
          </div>

          {/* prompt input */}
          <div className="relative flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.07] px-4 py-3">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#a1a1aa]" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.4-3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="min-w-0 flex-1 truncate text-[14px] text-[#a1a1aa]">Ask vadal.ai</span>
            <span className="shrink-0 text-[12px] font-medium text-[#71717a]">⌘K</span>
          </div>

          {/* quick actions — 2 prominent chips */}
          <div className="relative grid grid-cols-2 gap-2.5">
            {["Prep my 1:1", "Apply leave"].map((q) => (
              <span
                key={q}
                className="rounded-[14px] border border-white/[0.07] bg-white/[0.05] px-3 py-3 text-[14px] font-medium text-[#d4d4d8]"
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      </Tile>
    </div>
  );
}
