/* ============================================================================
   LoopArt — the five "Why Vadal.ai" scenes, as isometric line illustrations.

   The cards used to hold small replicas of product UI: a bar chart, a driver
   list, two task rows. They were accurate and completely inert — a reader
   already sees the real product further down the page, so a shrunken copy of
   it earned nothing here. This section is the argument, not the demo, so it
   wants pictures of the idea.

   Style follows the reference set: a dark slate outline on every shape, flat
   pastel fills, scenes built on floating isometric slabs, with paper, coins
   and four-point sparkles drifting around them. Palette is Vadal's own ramp
   rather than the reference's yellows — teal at Score through violet at
   Impact — so each scene still belongs to the stage it illustrates.

   Everything is drawn from the `iso()` projection below rather than by hand,
   which is what keeps eight separate scenes sitting on the same ground plane.
   All of it is SVG: a few kB, sharp at any size, and animatable.
   ========================================================================== */

/* --------------------------------------------------------------- palette */
const INK = "#2f4a55";        // the outline on every shape
const PAPER = "#fdfcf8";
const CREAM = "#f7f2ea";
const SHADE = "#dfe3ea";      // the underside of a slab

const TEAL = "#8fd8c6";
const TEAL_D = "#5cbfa6";
const MINT = "#d4f0e6";
const SKY = "#a9d3ef";
const SKY_D = "#6fb3e0";
const PERI = "#a9a7e8";
const PERI_D = "#8683d6";
const LILAC = "#ded9f7";
const CORAL = "#f2896a";
const SUN = "#f8c978";

/* ------------------------------------------------------------ projection */
/* 2:1 isometric. x runs down-right, y runs down-left, z is up. Every scene
   uses this, which is why the slabs all read as the same ground plane. */
const S = 1;
const iso = (x: number, y: number, z: number): [number, number] => [
  (x - y) * S,
  ((x + y) * S) / 2 - z * S,
];
const pt = (p: [number, number]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const poly = (pts: [number, number][]) => pts.map(pt).join(" L ");

/** an isometric box: top face plus the two faces that face the viewer */
function Box({
  x = 0, y = 0, z = 0, w, d, h,
  top = PERI, left = PERI_D, right = LILAC, sw = 2.2,
}: {
  x?: number; y?: number; z?: number; w: number; d: number; h: number;
  top?: string; left?: string; right?: string; sw?: number;
}) {
  const P = (dx: number, dy: number, dz: number) => iso(x + dx, y + dy, z + dz);
  const topFace = `M ${poly([P(0, 0, h), P(w, 0, h), P(w, d, h), P(0, d, h)])} Z`;
  const rightFace = `M ${poly([P(w, 0, h), P(w, 0, 0), P(w, d, 0), P(w, d, h)])} Z`;
  const leftFace = `M ${poly([P(0, d, h), P(0, d, 0), P(w, d, 0), P(w, d, h)])} Z`;
  return (
    <g strokeWidth={sw} strokeLinejoin="round">
      <path d={rightFace} fill={right} />
      <path d={leftFace} fill={left} />
      <path d={topFace} fill={top} />
    </g>
  );
}

/** a flat disc-ish slab the scenes stand on */
function Slab({ x = 0, y = 0, w, d, h = 10, tone = CREAM, side = SHADE }: {
  x?: number; y?: number; w: number; d: number; h?: number; tone?: string; side?: string;
}) {
  return <Box x={x} y={y} w={w} d={d} h={h} top={tone} left={side} right={side} />;
}

/** a sheet of paper, drawn flat-on with ruled lines — the reference's motif */
function Sheet({ x, y, r = 0, s = 1, lines = 4, fill = PAPER }: {
  x: number; y: number; r?: number; s?: number; lines?: number; fill?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeWidth={2.2 / s} strokeLinejoin="round">
      <path d="M0 0 h26 v34 h-26 Z" fill={fill} />
      {Array.from({ length: lines }, (_, i) => (
        <path key={i} d={`M5 ${8 + i * 6.5} h${i % 2 ? 11 : 16}`} strokeWidth={1.6 / s} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** the four-point sparkle that punctuates every reference illustration */
function Spark({ x, y, s = 1.25, fill = PAPER, delay = 0 }: {
  x: number; y: number; s?: number; fill?: string; delay?: number;
}) {
  return (
    <path
      className="il-spark"
      style={{ animationDelay: `${delay}ms` }}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -9 C1.2 -3 3 -1.2 9 0 C3 1.2 1.2 3 0 9 C-1.2 3 -3 1.2 -9 0 C-3 -1.2 -1.2 -3 0 -9 Z"
      fill={fill}
      strokeWidth={2 / s}
      strokeLinejoin="round"
    />
  );
}

/** a coin, seen face-on */
function Coin({ x, y, s = 1.15, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <g className="il-float" style={{ animationDelay: `${delay}ms` }} transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={2.2 / s}>
      <circle r="10" fill={SUN} />
      <circle r="6" fill="none" strokeWidth={1.6 / s} />
    </g>
  );
}

/** a wrapper that drifts its children up and down */
function Drift({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <g className={`il-float ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </g>
  );
}

const Frame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox="14 12 292 218" className="h-full w-full" role="img" aria-label={label}>
    <g stroke={INK} strokeLinecap="round">{children}</g>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ 1. SCORE */
/* Signals arriving from every channel and collecting into one measure. The
   funnel is the point: many inputs, one number, and it never stops. */
export function ArtScore() {
  return (
    <Frame label="Signals from every channel collecting into one continuous score">
      <g transform="translate(160 176)">
        <Slab x={-52} y={-52} w={104} d={104} h={11} tone={MINT} side="#b6ded0" />
      </g>
      {/* the collector — a rising stack, tallest at the front */}
      <g transform="translate(160 150)">
        {[0, 1, 2].map((i) => (
          <Box key={i} x={-34 + i * 24} y={-14} w={18} d={28} h={16 + i * 16}
               top={i === 2 ? TEAL_D : TEAL} left="#6cc7af" right={MINT} />
        ))}
      </g>
      {/* channels feeding in */}
      <Drift delay={0}><Sheet x={44} y={44} r={-14} s={0.92} /></Drift>
      <Drift delay={-900}><Sheet x={228} y={36} r={13} s={0.86} /></Drift>
      <Drift delay={-1800}>
        <g transform="translate(74 112)" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M0 0 h34 a5 5 0 0 1 5 5 v16 a5 5 0 0 1 -5 5 h-22 l-9 8 v-8 h-3 a5 5 0 0 1 -5 -5 v-16 a5 5 0 0 1 5 -5 Z" fill={SKY} />
        </g>
      </Drift>
      <Drift delay={-2400}>
        <g transform="translate(214 108)" strokeWidth="2.2" strokeLinejoin="round">
          <rect x="0" y="0" width="24" height="38" rx="5" fill={LILAC} />
          <path d="M9 5 h6" strokeWidth="1.8" />
        </g>
      </Drift>
      <Spark x={104} y={30} s={0.9} fill={SUN} delay={0} />
      <Spark x={252} y={82} s={0.75} fill={TEAL} delay={-700} />
      <Spark x={58} y={92} s={0.6} fill={CORAL} delay={-1400} />
      <Coin x={276} y={140} s={0.8} delay={-1100} />
    </Frame>
  );
}

/* ═════════════════════════════════════════════════════════════ 2. INSIGHT */
/* The same pile of feedback, sorted. A lens over the stack, themes lifting
   out of it as separate coloured piles — what the number is made of. */
export function ArtInsight() {
  return (
    <Frame label="A lens over collected feedback, sorting it into the themes behind the score">
      <g transform="translate(150 180)">
        <Slab x={-56} y={-46} w={112} d={92} h={11} tone="#dbeafb" side="#b9d6f0" />
      </g>
      {/* three sorted piles, different heights — the drivers */}
      <g transform="translate(150 156)">
        <Box x={-40} y={-20} w={22} d={30} h={40} top={SKY_D} left="#4f9ed4" right={SKY} />
        <Box x={-10} y={-20} w={22} d={30} h={26} top={CORAL} left="#d9704f" right="#f6b6a1" />
        <Box x={20} y={-20} w={22} d={30} h={54} top={SKY} left={SKY_D} right="#cfe6f8" />
      </g>
      {/* the lens */}
      <Drift delay={-600}>
        <g transform="translate(196 52)" strokeWidth="2.4" strokeLinejoin="round">
          <circle cx="0" cy="0" r="30" fill="#e8f4fd" fillOpacity="0.92" />
          <circle cx="0" cy="0" r="30" fill="none" />
          <path d="M-9 4 l7 -9 l7 6 l9 -13" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M21 22 l16 17" strokeWidth="6" strokeLinecap="round" />
          <path d="M21 22 l16 17" strokeWidth="2.6" stroke={PAPER} strokeLinecap="round" />
        </g>
      </Drift>
      <Drift delay={0}><Sheet x={30} y={40} r={-16} s={0.9} /></Drift>
      <Drift delay={-1500}><Sheet x={70} y={16} r={9} s={0.72} /></Drift>
      <Spark x={116} y={60} s={0.8} fill={SUN} delay={-300} />
      <Spark x={262} y={116} s={0.65} fill={SKY_D} delay={-1200} />
      <Spark x={44} y={132} s={0.55} fill={CORAL} delay={-1900} />
    </Frame>
  );
}

/* ══════════════════════════════════════════════════════════════ 3. ACTION */
/* Insight becomes work someone owns. A board on a plinth, cards crossing it,
   each one carrying a person — the owner is the whole idea of this stage. */
export function ArtAction() {
  return (
    <Frame label="Recommendations becoming owned tasks moving across a board">
      <g transform="translate(160 196)">
        <Slab x={-56} y={-42} w={112} d={84} h={11} tone={LILAC} side="#c2bcec" />
      </g>
      {/* the board */}
      <g transform="translate(98 78)" strokeWidth="2.4" strokeLinejoin="round">
        <rect x="0" y="0" width="128" height="96" rx="9" fill={PAPER} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={9 + i * 40} y="10" width="32" height="76" rx="6" fill={i === 2 ? "#e4f6ee" : CREAM} strokeWidth="1.8" />
        ))}
        {/* cards, each with an owner dot */}
        <g strokeWidth="1.8">
          <rect x="13" y="16" width="24" height="17" rx="4" fill={PERI} />
          <circle cx="21" cy="24.5" r="3.4" fill={PAPER} />
          <rect x="13" y="38" width="24" height="17" rx="4" fill={LILAC} />
          <circle cx="21" cy="46.5" r="3.4" fill={PAPER} />
          <rect x="53" y="16" width="24" height="17" rx="4" fill={SKY} />
          <circle cx="61" cy="24.5" r="3.4" fill={PAPER} />
          <rect x="93" y="16" width="24" height="17" rx="4" fill={TEAL} />
          <path d="M99 24.5 l4 4 l7 -8" strokeWidth="2.4" fill="none" />
        </g>
        {/* the one in flight, sliding from the middle column to done */}
        <g className="il-slide">
          <rect x="53" y="38" width="24" height="17" rx="4" fill={CORAL} strokeWidth="1.8" />
          <circle cx="61" cy="46.5" r="3.4" fill={PAPER} strokeWidth="1.8" />
        </g>
      </g>
      <Drift delay={-800}><Sheet x={26} y={62} r={-12} s={0.78} /></Drift>
      <Drift delay={-1600}><Sheet x={262} y={54} r={15} s={0.72} /></Drift>
      <Spark x={70} y={30} s={0.75} fill={SUN} delay={-400} />
      <Spark x={252} y={150} s={0.6} fill={PERI_D} delay={-1300} />
      <Coin x={44} y={150} s={0.72} delay={-500} />
    </Frame>
  );
}

/* ══════════════════════════════════════════════════════════════ 4. IMPACT */
/* Measured against where it started. Two plinths at different heights, a path
   climbing between them, a flag at the top — before, after, and the distance
   travelled, which is the only honest way to read a change. */
export function ArtImpact() {
  return (
    <Frame label="A climb from a baseline to a higher measured result, marked with a flag">
      <g transform="translate(154 178)">
        <Slab x={-60} y={-44} w={120} d={88} h={11} tone="#efe9fb" side="#d6cdf2" />
      </g>
      <g transform="translate(154 156)">
        {/* before — low, pale */}
        <Box x={-46} y={-16} w={26} d={30} h={22} top={LILAC} left="#c2bcec" right="#e9e5f9" />
        {/* the step between */}
        <Box x={-14} y={-16} w={26} d={30} h={48} top="#bdb7ef" left="#9d96e0" right={LILAC} />
        {/* after — the tall one, in full violet */}
        <Box x={18} y={-16} w={26} d={30} h={78} top={PERI_D} left="#6f6bc8" right={PERI} />
      </g>
      {/* the rising arrow */}
      <Drift delay={-400}>
        <path d="M84 148 C118 146 140 122 160 96 C176 76 194 58 216 48"
              fill="none" strokeWidth="2.8" strokeDasharray="7 7" strokeLinecap="round" />
        <path d="M216 48 l-13 2 M216 48 l1 13" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </Drift>
      {/* the flag on top */}
      <Drift delay={-1000}>
        <g transform="translate(206 30)" strokeWidth="2.4" strokeLinejoin="round">
          <path d="M0 0 v34" />
          <path d="M0 2 l24 7 l-24 8 Z" fill={CORAL} />
        </g>
      </Drift>
      <Spark x={112} y={54} s={0.8} fill={SUN} delay={-200} />
      <Spark x={64} y={104} s={0.6} fill={PERI_D} delay={-1100} />
      <Spark x={272} y={104} s={0.7} fill={TEAL} delay={-1800} />
      <Coin x={42} y={62} s={0.78} delay={-900} />
      <Coin x={280} y={158} s={0.68} delay={-1500} />
    </Frame>
  );
}

/* ════════════════════════════════════════════════════════════════ 5. LOOP */
/* The closing card. A ring with the four stages riding it, and the whole ring
   turning — the fourth arriving back at the first is the argument the section
   is named for, so here it is as the picture rather than as a sentence. */
export function ArtLoop() {
  const R = 66;
  const NODES = [
    { c: TEAL_D, a: -90 },
    { c: SKY_D, a: 0 },
    { c: PERI_D, a: 90 },
    { c: CORAL, a: 180 },
  ];
  return (
    <Frame label="The four stages riding a ring that turns back on itself">
      {/* the same ground plane the other four scenes stand on */}
      <g transform="translate(160 190)">
        <Slab x={-58} y={-40} w={116} d={80} h={10} tone="#e7f0fb" side="#c6d8ef" />
      </g>
      <g transform="translate(160 138)">
        <g transform="scale(1 0.54)">
          {/* the track, and the lit arc travelling it */}
          <circle r={R} fill="none" strokeWidth="10" stroke="#dbe3ee" />
          <circle r={R} fill="none" strokeWidth="2.4" stroke={INK} strokeOpacity="0.85" />
          <g className="il-turn">
            <circle r={R} fill="none" strokeWidth="5.5" strokeDasharray="52 363"
                    strokeLinecap="round" stroke={PERI_D} />
          </g>
        </g>
        <g className="il-turn">
          {NODES.map((n, i) => {
            const rad = (n.a * Math.PI) / 180;
            return (
              <g key={i} transform={`translate(${(Math.cos(rad) * R).toFixed(1)} ${(Math.sin(rad) * R * 0.54).toFixed(1)})`}>
                <g className="il-unturn">
                  <circle r="16" fill={n.c} strokeWidth="2.4" />
                  <circle r="6.5" fill={PAPER} strokeWidth="2" />
                </g>
              </g>
            );
          })}
        </g>
      </g>
      <Drift delay={-500}><Sheet x={26} y={30} r={-15} s={0.8} /></Drift>
      <Drift delay={-1400}><Sheet x={258} y={150} r={12} s={0.74} /></Drift>
      <Spark x={92} y={44} s={0.8} fill={SUN} delay={-300} />
      <Spark x={244} y={54} s={0.62} fill={TEAL} delay={-1000} />
      <Spark x={56} y={168} s={0.66} fill={SKY_D} delay={-1700} />
      <Coin x={272} y={200} s={0.7} delay={-800} />
    </Frame>
  );
}

export const LOOP_ART: Record<string, () => React.ReactElement> = {
  score: ArtScore,
  insight: ArtInsight,
  action: ArtAction,
  impact: ArtImpact,
  loop: ArtLoop,
};
