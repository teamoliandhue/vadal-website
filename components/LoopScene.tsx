/* ============================================================================
   LoopScene — the "Why Vadal.ai" argument as one isometric landscape.

   Reference: the illustration style of a single continuous scene built from
   bold flat colour blocks — butter yellow, periwinkle, teal, cream — sitting on
   a warm off-white ground, drawn with one confident dark outline, with big
   architectural masses that have real weight and a few recognisable objects
   (a stair, a dome, a bell jar, a flag) doing the storytelling. Documents,
   coins and four-point sparkles float around it.

   The earlier attempt cut this into five card-sized fragments on tiny grey
   slabs, which lost everything the reference has: scale, weight and the sense
   of one place. So this is one wide panorama, and Score → Insight → Action →
   Impact are stations across it, left to right, joined by stairs. Impact stands
   tallest, and a return arc runs from it back to Score — the loop.

   Every solid is projected through iso() below, so the whole landscape shares
   a ground plane. Colours are the reference's own palette, warmed and named.
   The scene is SVG, so it is sharp at any width and the drifting objects can
   move; the motion is slow and few, the way the reference would move if it
   moved at all.
   ========================================================================== */

/* --------------------------------------------------------------- palette */
const INK = "#33475b";        // one outline, everywhere
const GROUND = "#fbf7f1";     // warm off-white
const CREAM = "#f3ede3";
const CREAM_D = "#dfd6c8";
const BUTTER = "#f9c86e";
const BUTTER_D = "#e6ac47";
const BUTTER_L = "#fde3a8";
const PERI = "#9b98e0";
const PERI_D = "#7d79cc";
const PERI_L = "#c8c5f0";
const TEAL = "#8fd3d0";
const TEAL_D = "#5db8b6";
const TEAL_L = "#c7ebe9";
const SKY = "#bfe6f2";
const SKY_D = "#8fcfe3";
const CORAL = "#f27c62";
const LEAF = "#7fc39a";
const LEAF_D = "#4f9e73";
const PAPER = "#fffdf8";
const GLASS = "#e6f6fb";

/* ------------------------------------------------------------ projection */
/* 2:1 isometric. x runs down-right, y runs down-left, z is up. */
const iso = (x: number, y: number, z: number): [number, number] => [x - y, (x + y) / 2 - z];
const P = (pts: [number, number][]) => "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ") + " Z";

type Faces = { top: string; left: string; right: string };
/** an isometric block with its two visible sides */
function Block({ x, y, z = 0, w, d, h, c, sw = 2.4 }: {
  x: number; y: number; z?: number; w: number; d: number; h: number; c: Faces; sw?: number;
}) {
  const p = (dx: number, dy: number, dz: number) => iso(x + dx, y + dy, z + dz);
  return (
    <g strokeWidth={sw} strokeLinejoin="round">
      <path d={P([p(w, 0, h), p(w, 0, 0), p(w, d, 0), p(w, d, h)])} fill={c.right} />
      <path d={P([p(0, d, h), p(0, d, 0), p(w, d, 0), p(w, d, h)])} fill={c.left} />
      <path d={P([p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)])} fill={c.top} />
    </g>
  );
}

const F = {
  butter: { top: BUTTER, left: BUTTER_D, right: BUTTER_L },
  peri: { top: PERI, left: PERI_D, right: PERI_L },
  teal: { top: TEAL, left: TEAL_D, right: TEAL_L },
  cream: { top: CREAM, left: CREAM_D, right: "#faf6ef" },
  sky: { top: SKY, left: SKY_D, right: "#e3f4f9" },
};

/** a run of steps climbing +x, from ground to height h */
function Stairs({ x, y, z = 0, w, d, h, n = 6, c }: {
  x: number; y: number; z?: number; w: number; d: number; h: number; n?: number; c: Faces;
}) {
  const stepW = w / n, stepH = h / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <Block key={i} x={x + i * stepW} y={y} z={z} w={stepW} d={d} h={stepH * (i + 1)} c={c} sw={2} />
      ))}
    </g>
  );
}

/** a sheet of paper, drawn flat, ruled — the reference's recurring object */
function Sheet({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeWidth={2.4 / s} strokeLinejoin="round">
      <path d="M0 4 Q14 -4 30 4 L30 40 Q16 32 0 40 Z" fill={PAPER} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M6 ${13 + i * 6.5} h${i % 2 ? 12 : 18}`} strokeWidth={1.8 / s} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** a folder, the other recurring object */
function Folder({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeWidth={2.4 / s} strokeLinejoin="round">
      <path d="M0 8 h14 l5 -6 h19 v30 h-38 Z" fill={BUTTER_D} />
      <path d="M0 12 h38 v20 h-38 Z" fill={BUTTER} />
    </g>
  );
}

function Coin({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={2.4 / s}>
      <circle r="12" fill={BUTTER} />
      <circle r="7.5" fill="none" strokeWidth={1.8 / s} />
      <path d="M-2.5 -3.5 v7 M0 -3.5 v7 M2.5 -3.5 v7" strokeWidth={1.4 / s} strokeLinecap="round" />
    </g>
  );
}

function Spark({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -11 C1.4 -3.5 3.5 -1.4 11 0 C3.5 1.4 1.4 3.5 0 11 C-1.4 3.5 -3.5 1.4 -11 0 C-3.5 -1.4 -1.4 -3.5 0 -11 Z"
      fill={PERI_L}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  );
}

/* --------------------------------------------------------------- scene */
export function LoopScene() {
  /* the ground plane runs left→right; stations sit at increasing x on the
     iso grid, which is what carries them across the picture and slightly down */
  const ORIGIN: [number, number] = [640, 330];
  const at = (x: number, y: number, z = 0): [number, number] => {
    const p = iso(x, y, z);
    return [ORIGIN[0] + p[0], ORIGIN[1] + p[1]];
  };
  const G = ({ x, y, z = 0, children }: { x: number; y: number; z?: number; children: React.ReactNode }) => {
    const [tx, ty] = at(x, y, z);
    return <g transform={`translate(${tx} ${ty})`}>{children}</g>;
  };

  return (
    <svg viewBox="0 0 1280 560" className="h-auto w-full" role="img"
         aria-label="An isometric landscape: signals gathered into a score, sorted into insight, carried up stairs into owned action, rising to a measured impact, and looping back to the start">
      <defs>
        <clipPath id="ls-clip"><rect x="0" y="0" width="1280" height="560" rx="28" /></clipPath>
      </defs>
      <g clipPath="url(#ls-clip)" stroke={INK} strokeLinecap="round">
        <rect x="0" y="0" width="1280" height="560" fill={GROUND} stroke="none" />

        {/* ─────────────────────────────── the return arc: Impact back to Score.
            Drawn first so it sits behind everything, a soft violet band that
            travels back across the sky. It IS the loop. */}
        <g className="ls-arc">
          <path d="M1040 96 C 900 -30, 320 -30, 205 150" fill="none" stroke={PERI_L} strokeWidth="14" strokeLinecap="round" />
          <path d="M1040 96 C 900 -30, 320 -30, 205 150" fill="none" stroke={INK} strokeWidth="2.4" strokeDasharray="10 9" strokeLinecap="round" />
          <path d="M205 150 l 22 -18 M205 150 l 26 2" fill="none" strokeWidth="2.6" />
        </g>

        {/* ═══════════════════════════════════════════ 1. SCORE — the arch.
            The reference opens on a teal arch with a stair up its side. Ours
            is the entrance: signals come in through it and gather. */}
        <G x={-240} y={240}>
          <Block x={0} y={0} w={40} d={120} h={230} c={F.teal} />
          <Block x={40} y={0} w={40} d={120} h={230} c={F.teal} />
          {/* the archway cut through */}
          <path d={`M ${iso(80,120,0)[0]-40} ${iso(80,120,0)[1]-58} a 42 60 0 0 1 84 0 v 58 h -84 Z`}
                fill={GROUND} strokeWidth="2.4" transform={`translate(-42 -110)`} />
          {/* stair climbing the arch's far shoulder */}
          <Stairs x={-6} y={-30} w={86} d={26} h={230} n={8} c={F.teal} />
        </G>
        {/* the collector below the arch: a stepped plinth with a live column */}
        <G x={-200} y={230}>
          <Block x={0} y={0} w={130} d={110} h={34} c={F.butter} />
          <Block x={24} y={20} w={30} d={70} h={40} c={F.teal} />
          <Block x={60} y={20} w={30} d={70} h={70} c={F.teal} />
          <Block x={96} y={20} w={30} d={70} h={104} c={F.teal} />
          {/* the reading, rising */}
          <g className="ls-rise">
            <Block x={96} y={20} z={104} w={30} d={70} h={16} c={F.teal} />
          </g>
        </G>

        {/* stairs from Score up to Insight */}
        <G x={-70} y={100}>
          <Stairs x={0} y={0} w={110} d={40} h={44} n={7} c={F.peri} />
        </G>

        {/* ═══════════════════════════════════════ 2. INSIGHT — the lens.
            A periwinkle plinth with a glass dome on it — the reference's bell
            jar — and inside, three sorted piles at three heights: what the
            number is made of. */}
        <G x={-10} y={40}>
          <Block x={0} y={0} w={170} d={130} h={44} c={F.peri} />
          <Block x={16} y={16} w={138} d={98} h={12} c={F.cream} />
          {/* the three drivers, sorted */}
          <Block x={34} y={40} w={26} d={50} h={38} c={F.teal} />
          <Block x={72} y={40} w={26} d={50} h={62} c={F.sky} />
          <Block x={110} y={40} w={26} d={50} h={26} c={{ top: CORAL, left: "#d0614a", right: "#f7b09e" }} />
          {/* the dome over them */}
          <g strokeWidth="2.4">
            <path d={`M ${iso(16,114,56)[0]} ${iso(16,114,56)[1]} A 76 76 0 0 1 ${iso(154,16,56)[0]} ${iso(154,16,56)[1]}`}
                  fill={GLASS} fillOpacity="0.55" />
            <ellipse cx={iso(85,65,56)[0]} cy={iso(85,65,56)[1]} rx="86" ry="43" fill="none" />
            <path d={`M ${iso(50,110,120)[0]} ${iso(50,110,120)[1]} q -18 -12 -22 -34`} fill="none" stroke={PAPER} strokeWidth="6" strokeLinecap="round" />
          </g>
        </G>

        {/* ═════════════════════════════════════════════ 3. ACTION — the hall.
            The reference's centrepiece is a domed pavilion on a stepped
            plinth with stairs up both sides. Ours is where the work happens:
            columns, a butter dome, a flag of an owner's colour on top. */}
        <G x={140} y={-140}>
          <Block x={0} y={0} w={220} d={190} h={40} c={F.peri} />
          <Block x={30} y={30} w={160} d={130} h={26} c={F.cream} />
          {/* stairs up the front-left and front-right */}
          <Stairs x={-70} y={40} w={70} d={60} h={40} n={6} c={F.peri} />
          <Stairs x={220} y={40} w={70} d={60} h={40} n={6} c={F.peri} />
          {/* the hall body */}
          <g>
            <g transform={`translate(${iso(110,95,66)[0]} ${iso(110,95,66)[1]})`} strokeWidth="2.4" strokeLinejoin="round">
              {/* pediment block */}
              <rect x="-88" y="-40" width="176" height="52" fill={CREAM} />
              <path d="M-96 -40 L0 -92 L96 -40 Z" fill={CREAM_D} />
              <circle cx="-14" cy="-58" r="4" fill={PERI} strokeWidth="1.8" />
              <circle cx="0" cy="-64" r="4" fill={PERI} strokeWidth="1.8" />
              <circle cx="14" cy="-58" r="4" fill={PERI} strokeWidth="1.8" />
              {/* dome */}
              <path d="M-72 -92 A 72 60 0 0 1 72 -92 Z" fill={BUTTER} />
              <path d="M-72 -92 A 72 60 0 0 1 72 -92" fill="none" />
              <path d="M-36 -92 A 36 60 0 0 1 36 -92 M0 -92 v-60" fill="none" strokeWidth="1.8" />
              <circle cx="0" cy="-152" r="5" fill={CORAL} />
              {/* colonnade */}
              {[-70, -35, 0, 35, 70].map((cx) => (
                <g key={cx}>
                  <rect x={cx - 8} y="12" width="16" height="70" fill={PAPER} />
                  <path d={`M${cx - 12} 12 h24 M${cx - 12} 82 h24`} strokeWidth="2.4" />
                </g>
              ))}
              {/* the dark doorways between columns */}
              {[-52, -17, 18, 53].map((cx) => (
                <path key={cx} d={`M${cx - 9} 82 v-40 a 9 9 0 0 1 18 0 v40 Z`} fill={INK} fillOpacity="0.55" strokeWidth="1.6" />
              ))}
              <rect x="-96" y="82" width="192" height="12" fill={CREAM_D} />
            </g>
          </g>
        </G>

        {/* ═══════════════════════════════════════════ 4. IMPACT — the tower.
            The reference ends on a tall periwinkle tower with a bell jar and a
            feather. Ours is the tallest thing on the page — the lift, measured
            — with a butter plinth, a coral flag and a stair up its side. */}
        <G x={242} y={-242}>
          <Block x={0} y={0} w={130} d={120} h={44} c={F.butter} />
          <Block x={16} y={20} w={100} d={80} h={210} c={F.peri} />
          {/* the top: a bell jar with the score inside, glowing teal */}
          <g transform={`translate(${iso(66,60,254)[0]} ${iso(66,60,254)[1]})`}>
            <g strokeWidth="2.4">
              <ellipse cx="0" cy="0" rx="46" ry="23" fill={PERI_L} />
              <path d="M-46 0 v-58 a 46 46 0 0 1 92 0 v58" fill={GLASS} fillOpacity="0.6" />
              <ellipse cx="0" cy="0" rx="46" ry="23" fill="none" />
              <path d="M-30 -66 q -6 12 -6 26" fill="none" stroke={PAPER} strokeWidth="6" strokeLinecap="round" />
              {/* the score inside, sitting on its plinth */}
              <circle cx="0" cy="-30" r="16" fill={TEAL} />
              <path d="M-7 -30 l5 5 l9 -11" fill="none" strokeWidth="3" />
            </g>
          </g>
          {/* the flag */}
          <g transform={`translate(${iso(116,20,254)[0]} ${iso(116,20,254)[1]})`}>
            <g strokeWidth="2.4" strokeLinejoin="round">
              <path d="M0 0 v-46" />
              <path d="M0 -44 l30 9 l-30 10 Z" fill={CORAL} />
            </g>
          </g>
          {/* stair up the tower's front */}
          <Stairs x={-64} y={30} w={64} d={44} h={44} n={6} c={F.butter} />
        </G>

        {/* the garden plinth at the far right — the reference's closing note.
            The impact landing somewhere living: a tree, saplings, a ladder. */}
        <G x={285} y={-285}>
          <Block x={0} y={0} w={170} d={130} h={30} c={F.sky} />
          <g transform={`translate(${iso(130,30,30)[0]} ${iso(130,30,30)[1]})`}>
            <g strokeWidth="2.4">
              <path d="M0 0 v-30" />
              <path d="M0 -30 c-16 -4 -22 -22 -12 -36 c4 -14 20 -14 24 0 c10 14 4 32 -12 36 Z" fill={LEAF} />
              <path d="M0 -30 c-16 -4 -22 -22 -12 -36" fill="none" />
            </g>
          </g>
          {[[36, 90], [66, 96], [96, 102]].map(([sx, sy], i) => (
            <g key={i} transform={`translate(${iso(sx,sy,30)[0]} ${iso(sx,sy,30)[1]})`}>
              <g strokeWidth="2">
                <ellipse cx="0" cy="0" rx="9" ry="4.5" fill={PAPER} />
                <path d="M0 -2 c-6 -2 -8 -10 -3 -14 c2 -6 8 -6 10 0 c5 4 3 12 -3 14 Z" fill={LEAF_D} />
              </g>
            </g>
          ))}
          <g transform={`translate(${iso(20,110,0)[0]} ${iso(20,110,0)[1]})`}>
            <g strokeWidth="2.4">
              <path d="M0 0 l14 -40 M10 0 l14 -40 M2 -10 h10 M5 -20 h10 M8 -30 h10" fill="none" />
            </g>
          </g>
        </G>

        {/* stairs from Action across to Impact */}
        <G x={245} y={-245}>
          <Stairs x={0} y={0} w={110} d={40} h={44} n={7} c={F.butter} />
        </G>

        {/* ─────────────────────────────────────── the drifting objects.
            Papers, folders, coins and sparkles: the reference's punctuation.
            Each on its own slow drift so the scene breathes without any one
            thing demanding attention. */}
        <g className="ls-drift" style={{ animationDelay: "0s" }}><Sheet x={222} y={64} r={-16} /></g>
        <g className="ls-drift" style={{ animationDelay: "-1.4s" }}><Folder x={430} y={40} r={-10} /></g>
        <g className="ls-drift" style={{ animationDelay: "-2.8s" }}><Sheet x={760} y={70} r={12} s={0.9} /></g>
        <g className="ls-drift" style={{ animationDelay: "-4.2s" }}><Folder x={880} y={116} r={12} s={0.85} /></g>
        <g className="ls-drift" style={{ animationDelay: "-0.7s" }}><Coin x={96} y={330} /></g>
        <g className="ls-drift" style={{ animationDelay: "-2.1s" }}><Coin x={700} y={128} s={0.9} /></g>
        <g className="ls-drift" style={{ animationDelay: "-3.5s" }}><Coin x={1000} y={200} s={0.85} /></g>
        <g className="ls-twinkle" style={{ animationDelay: "0s" }}><Spark x={172} y={148} /></g>
        <g className="ls-twinkle" style={{ animationDelay: "-1.1s" }}><Spark x={330} y={200} s={0.8} /></g>
        <g className="ls-twinkle" style={{ animationDelay: "-2.2s" }}><Spark x={588} y={112} s={0.9} /></g>
        <g className="ls-twinkle" style={{ animationDelay: "-3.3s" }}><Spark x={942} y={92} s={0.75} /></g>
        <g className="ls-twinkle" style={{ animationDelay: "-0.6s" }}><Spark x={1150} y={280} s={0.85} /></g>
        <g className="ls-twinkle" style={{ animationDelay: "-1.7s" }}><Spark x={72} y={210} s={0.7} /></g>
      </g>
    </svg>
  );
}
