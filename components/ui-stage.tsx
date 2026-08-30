/* ============================================================================
   ui-stage — product UI floating on a lit gradient, instead of illustration.

   Reference: a deep aqua field, light at the top and saturated at the bottom,
   with a soft band of lighter water crossing the middle and the UI sitting half
   above it / half submerged. What makes that image work is not the UI — it is
   the backdrop doing all the atmosphere so the UI can stay plain.

   So the stage is three layers, all BEHIND the UI:
     1. a vertical ramp, light -> hue -> deep
     2. a wide radial bloom top-centre, which is the "light source"
     3. a soft band across the middle, plus a darker floor for depth

   There was a fourth — a waterline drawn ON TOP of the cards, so the lower
   half read as submerged. It went: over a product screenshot it is not
   atmosphere, it is a dimming film across live UI, and it made every card look
   like it had a panel sitting on it. The backdrop stays strictly behind.

   Hue is per platform layer, generated from a single aurora stop, so eleven
   stages share one recipe and differ only in colour. Nothing is downloaded —
   a gradient this smooth is smaller and sharper as CSS than as a JPEG, and it
   recolours per layer for free.
   ========================================================================== */

const hx = (c: string): [number, number, number] => [
  parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16),
];
const rgba = (c: string, a: number) => { const v = hx(c); return `rgba(${v[0]},${v[1]},${v[2]},${a})`; };
const toward = (c: string, t: string, k: number) => {
  const A = hx(c), B = hx(t);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(",")})`;
};

export function Stage({
  hue, children, className = "", pad = "p-4 sm:p-5",
}: {
  hue: string; children: React.ReactNode; className?: string; pad?: string;
}) {
  /* Saturated deliberately. The first pass sat at 0.62 white / 0.52 deep and
     read as a pale wash — the reference's whole effect comes from real range
     between a bright top and a genuinely deep floor. */
  const light = toward(hue, "#ffffff", 0.44);
  const mid = hue;
  const deep = toward(hue, "#042b26", 0.66);
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {/* 1 — the ramp */}
      <div className="absolute inset-0 -z-30"
        style={{ background: `linear-gradient(176deg, ${light} 0%, ${mid} 46%, ${deep} 100%)` }} />
      {/* 2 — the light source */}
      <div className="absolute inset-x-0 -top-1/3 -z-20 h-2/3"
        style={{ background: `radial-gradient(60% 100% at 50% 100%, ${rgba("#ffffff", 0.55)}, transparent 70%)` }} />
      {/* 3 — the horizon: one soft band is what turns a gradient into a place */}
      <div aria-hidden className="pointer-events-none absolute inset-x-[-10%] top-[44%] -z-10 h-[30%] blur-[22px]"
        style={{ background: `linear-gradient(180deg, transparent, ${rgba("#ffffff", 0.5)} 45%, transparent)` }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/5"
        style={{ background: `linear-gradient(180deg, transparent, ${rgba("#03231f", 0.4)})` }} />

      <div className={`relative h-full ${pad}`}>{children}</div>

    </div>
  );
}

/* ------------------------------------------------------------ UI pieces --- */
/* Deliberately plain. The stage supplies the drama; a card that also tries to
   be dramatic ends up competing with it and both lose. */

export const Card = ({ children, className = "", delay = 0, sub = false }: {
  children: React.ReactNode; className?: string; delay?: number; sub?: boolean;
}) => (
  <div
    /* The submerged card is DARK glass with light type, not light glass with
       dark type. Every one of these sits in the bottom third of the stage,
       where the ramp is deepest — dark ink there measured 2.2-3.7:1 against the
       real pixels. Inverting it puts them all above 7:1 and it reads better
       too: frosted dark glass on deep colour is what "below the surface"
       actually looks like. */
    className={`ui-in rounded-[14px] border ${sub
      ? "border-white/25 bg-[#062420]/55 text-white backdrop-blur-md"
      : "border-white/60 bg-white/92 shadow-[0_10px_28px_-12px_rgba(4,32,28,0.45)]"} ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export const Row = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => (
  <div className={`ui-in ${className}`} style={{ animationDelay: `${delay}ms` }}>{children}</div>
);

/** the one big number a scene is allowed */
export const Stat = ({ value, unit, label }: { value: string; unit?: string; label: string }) => (
  <div>
    <p className="flex items-baseline gap-1 text-[26px] font-bold leading-none tracking-[-0.03em] text-[#0d2f2a]">
      {value}
      {unit && <span className="text-[13px] font-semibold text-[#0d2f2a]/72">{unit}</span>}
    </p>
    <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#0d2f2a]/70">{label}</p>
  </div>
);

/** bars that grow from the baseline, staggered */
export const Bars = ({ data, hi }: { data: number[]; hi?: number }) => {
  const max = Math.max(...data);
  return (
    <div className="flex h-full items-end gap-[5px]">
      {data.map((v, i) => (
        <span key={i} className="ui-bar flex-1 rounded-[3px]"
          style={{
            ["--h" as string]: `${Math.max(9, (v / max) * 100)}%`,
            background: hi === i ? "#0d6b60" : "rgba(13,47,42,0.28)",
            animationDelay: `${240 + i * 60}ms`,
          }} />
      ))}
    </div>
  );
};

/** a trend that draws itself, on a normalised path so length never matters */
export function Spark({ data, w = 150, h = 44, delay = 320 }: {
  data: number[]; w?: number; h?: number; delay?: number;
}) {
  const max = Math.max(...data) * 1.08, min = Math.min(...data) * 0.92;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / (max - min || 1)) * h,
  ] as const);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block h-full w-full" preserveAspectRatio="none" aria-hidden>
      <path d={`${d} L${w} ${h} L0 ${h} Z`} fill="rgba(13,107,96,0.14)" className="ui-fade"
        style={{ animationDelay: `${delay + 500}ms` }} />
      <path d={d} fill="none" stroke="#0d6b60" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        pathLength={1} className="ui-draw" style={{ animationDelay: `${delay}ms` }}
        vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export const Chip = ({ children, tone = "calm" }: { children: React.ReactNode; tone?: "calm" | "good" | "warn" }) => (
  <span className={`rounded-full px-2 py-[3px] text-[10px] font-bold leading-none ${
    tone === "good" ? "bg-[#0d6b60]/14 text-[#0d6b60]"
      : tone === "warn" ? "bg-[#f27c62]/18 text-[#9c3d29]"
        : "bg-[#0d2f2a]/8 text-[#0d2f2a]/80"}`}>{children}</span>
);

export const Toggle = ({ on = true }: { on?: boolean }) => (
  <span className={`ui-in inline-flex h-[18px] w-[32px] items-center rounded-full p-[2px] ${on ? "bg-[#0d6b60]" : "bg-[#0d2f2a]/20"}`}>
    <span className={`h-[14px] w-[14px] rounded-full bg-white transition-transform ${on ? "translate-x-[14px]" : ""}`} />
  </span>
);

export const Bar = ({ pct, delay = 0 }: { pct: number; delay?: number }) => (
  <span className="block h-[5px] w-full overflow-hidden rounded-full bg-[#0d2f2a]/12">
    <span className="ui-grow block h-full rounded-full bg-[#0d6b60]"
      style={{ ["--w" as string]: `${pct}%`, animationDelay: `${delay}ms` }} />
  </span>
);

export const Avatar = ({ i }: { i: number }) => (
  <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-[9px] font-bold text-white"
    style={{ background: ["#0d6b60", "#2b7a8c", "#4a6fb5", "#6b5bb5"][i % 4] }}>
    {["RM", "SA", "JP", "KD"][i % 4]}
  </span>
);
