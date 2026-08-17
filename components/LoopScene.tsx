/* ============================================================================
   LoopScene — the five "Why Vadal.ai" stations, as small isometric scenes.

   Reference: the illustration style of a single continuous scene built from
   bold flat colour blocks — butter yellow, periwinkle, teal, cream — sitting on
   a warm off-white ground, drawn with one confident dark outline, with big
   architectural masses that have real weight and a few recognisable objects
   (a stair, a dome, a bell jar, a flag) doing the storytelling. Documents,
   coins and four-point sparkles float around it.

   One scene per card, and each is minimal on purpose: a single object that
   IS the idea, on its own slab, with one or two of the reference's floating
   punctuation marks. The full panorama that preceded this had all five in one
   landscape; that was a picture to look at, where the cards need a picture
   each to sit beside their own copy.

   Score is the collector — a stepped stack, tallest column still rising.
   Insight is a glass dome over three sorted blocks.
   Action is the domed hall, where the work happens.
   Impact is the tower with the bell jar and the flag — the lift, measured.
   The Loop is the return arc, landing back where it started.

   Every solid goes through one iso() so all five share a ground plane and a
   viewing angle. Same outline, same palette, same slab. Motion is slow and
   few: a drift, a twinkle, one column that rises, one arc whose dashes crawl.
   ========================================================================== */

import {
  INK, CREAM, CREAM_D, BUTTER, PERI, PERI_L, TEAL, CORAL, PAPER, GLASS,
  iso, Block, Stairs, Sheet, Folder, Coin, Spark, F, type Faces,
} from "./iso-kit";

/* --------------------------------------------------------------- scenes */
/* Each scene lives in a 260×200 box with its slab centred on the same ground
   point, so five of them side by side share one horizon. */
const VW = 260, VH = 200;
const OX = 130, OY = 128;
const at = (x: number, y: number, z = 0): [number, number] => {
  const p = iso(x, y, z);
  return [OX + p[0], OY + p[1]];
};
/** a group placed on the iso ground */
function At({ x, y, z = 0, children }: { x: number; y: number; z?: number; children: React.ReactNode }) {
  const [tx, ty] = at(x, y, z);
  return <g transform={`translate(${tx} ${ty})`}>{children}</g>;
}

const Frame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox={`0 0 ${VW} ${VH}`} className="h-full w-full" role="img" aria-label={label}>
    <g stroke={INK} strokeLinecap="round">{children}</g>
  </svg>
);

/* the ground slab every scene stands on — the same one, five times */
const Ground = ({ c = F.cream }: { c?: Faces }) => <Block x={-62} y={-52} w={124} d={104} h={12} c={c} />;

/* ═══════════════════════════════════════════════════════════════ 1. SCORE */
export function SceneScore() {
  return (
    <Frame label="A stepped collector, its tallest column still rising">
      <At x={0} y={0}>
        <Ground c={F.butter} />
        <Block x={-40} y={-16} w={22} d={44} h={30} c={F.teal} />
        <Block x={-12} y={-16} w={22} d={44} h={54} c={F.teal} />
        <Block x={16} y={-16} w={22} d={44} h={80} c={F.teal} />
        <g className="ls-rise">
          <Block x={16} y={-16} z={80} w={22} d={44} h={14} c={F.teal} />
        </g>
      </At>
      <g className="ls-drift" style={{ animationDelay: "0s" }}><Sheet x={30} y={26} r={-14} s={0.8} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-1.2s" }}><Spark x={214} y={48} s={0.8} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.6s" }}><Coin x={222} y={128} s={0.8} /></g>
    </Frame>
  );
}

/* ═════════════════════════════════════════════════════════════ 2. INSIGHT */
export function SceneInsight() {
  return (
    <Frame label="A glass dome over three sorted blocks">
      <At x={0} y={0}>
        <Ground c={F.peri} />
        <Block x={-46} y={-38} w={92} d={76} h={8} c={F.cream} />
        <Block x={-34} y={-14} w={20} d={36} h={30} c={F.teal} />
        <Block x={-8} y={-14} w={20} d={36} h={48} c={F.sky} />
        <Block x={18} y={-14} w={20} d={36} h={20} c={{ top: CORAL, left: "#d0614a", right: "#f7b09e" }} />
        {/* the dome */}
        <g transform={`translate(${iso(0,0,20)[0]} ${iso(0,0,20)[1]})`} strokeWidth="2.4">
          <path d="M-56 0 A 56 56 0 0 1 56 0" fill={GLASS} fillOpacity="0.55" />
          <ellipse cx="0" cy="0" rx="56" ry="28" fill="none" />
          <path d="M-40 -34 q -6 10 -8 24" fill="none" stroke={PAPER} strokeWidth="5" strokeLinecap="round" />
        </g>
      </At>
      <g className="ls-drift" style={{ animationDelay: "-0.8s" }}><Sheet x={20} y={30} r={-12} s={0.78} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "0s" }}><Spark x={224} y={60} s={0.85} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-2s" }}><Spark x={38} y={140} s={0.65} /></g>
    </Frame>
  );
}

/* ══════════════════════════════════════════════════════════════ 3. ACTION */
export function SceneAction() {
  return (
    <Frame label="A small domed hall with a colonnade, where the work happens">
      <At x={0} y={0}>
        <Ground c={F.peri} />
        <Block x={-44} y={-40} w={88} d={80} h={10} c={F.cream} />
        <Stairs x={-78} y={-14} w={34} d={30} h={22} n={4} c={F.peri} />
        <g transform={`translate(${iso(0,0,22)[0]} ${iso(0,0,22)[1]})`} strokeWidth="2.4" strokeLinejoin="round">
          <rect x="-46" y="-22" width="92" height="30" fill={CREAM} />
          <path d="M-52 -22 L0 -52 L52 -22 Z" fill={CREAM_D} />
          <circle cx="0" cy="-36" r="3" fill={PERI} strokeWidth="1.6" />
          <path d="M-38 -52 A 38 32 0 0 1 38 -52 Z" fill={BUTTER} />
          <path d="M-38 -52 A 38 32 0 0 1 38 -52 M0 -52 v-32" fill="none" strokeWidth="1.8" />
          <circle cx="0" cy="-84" r="3.5" fill={CORAL} />
          {[-34, -11, 12, 35].map((cx) => (
            <g key={cx}>
              <rect x={cx - 5} y="8" width="10" height="38" fill={PAPER} />
              <path d={`M${cx - 7} 8 h14 M${cx - 7} 46 h14`} strokeWidth="2" />
            </g>
          ))}
          {[-22.5, 0.5, 23.5].map((cx) => (
            <path key={cx} d={`M${cx - 5} 46 v-22 a 5 5 0 0 1 10 0 v22 Z`} fill={INK} fillOpacity="0.5" strokeWidth="1.4" />
          ))}
          <rect x="-52" y="46" width="104" height="8" fill={CREAM_D} />
        </g>
      </At>
      <g className="ls-drift" style={{ animationDelay: "-1.6s" }}><Folder x={16} y={40} r={-10} s={0.75} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-0.5s" }}><Spark x={226} y={54} s={0.8} /></g>
      <g className="ls-drift" style={{ animationDelay: "-3s" }}><Coin x={230} y={140} s={0.75} /></g>
    </Frame>
  );
}

/* ══════════════════════════════════════════════════════════════ 4. IMPACT */
export function SceneImpact() {
  return (
    <Frame label="A tall tower with a bell jar and a flag: the lift, measured">
      <At x={0} y={12}>
        <Ground c={F.butter} />
        <Block x={-30} y={-24} w={60} d={48} h={92} c={F.peri} />
        <Stairs x={-64} y={-8} w={34} d={26} h={22} n={4} c={F.butter} />
        {/* bell jar */}
        <g transform={`translate(${iso(0,0,92)[0]} ${iso(0,0,92)[1]})`} strokeWidth="2.4">
          <ellipse cx="0" cy="0" rx="26" ry="13" fill={PERI_L} />
          <path d="M-26 0 v-30 a 26 26 0 0 1 52 0 v30" fill={GLASS} fillOpacity="0.6" />
          <ellipse cx="0" cy="0" rx="26" ry="13" fill="none" />
          <circle cx="0" cy="-20" r="10" fill={TEAL} />
          <path d="M-4.5 -20 l3.5 3.5 l6 -7.5" fill="none" strokeWidth="2.4" />
        </g>
        {/* flag */}
        <g transform={`translate(${iso(30,-24,92)[0]} ${iso(30,-24,92)[1]})`} strokeWidth="2.4" strokeLinejoin="round">
          <path d="M0 0 v-34" />
          <path d="M0 -32 l22 7 l-22 7 Z" fill={CORAL} />
        </g>
      </At>
      <g className="ls-drift" style={{ animationDelay: "-2.2s" }}><Sheet x={22} y={28} r={-14} s={0.75} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-1s" }}><Spark x={214} y={100} s={0.75} /></g>
      <g className="ls-drift" style={{ animationDelay: "-0.4s" }}><Coin x={40} y={140} s={0.75} /></g>
    </Frame>
  );
}

/* ════════════════════════════════════════════════════════════════ 5. LOOP */
export function SceneLoop() {
  return (
    <Frame label="A return arc landing back where it started">
      <At x={0} y={0}>
        <Ground c={F.sky} />
        {/* two small posts: where it leaves, where it lands */}
        <Block x={-44} y={-10} w={22} d={22} h={26} c={F.peri} />
        <Block x={22} y={-10} w={22} d={22} h={26} c={F.teal} />
      </At>
      {/* the arc, from the right post over to the left, dashes travelling */}
      <g className="ls-arc">
        <path d="M188 92 C 176 30, 84 30, 76 88" fill="none" stroke={PERI_L} strokeWidth="11" strokeLinecap="round" />
        <path d="M188 92 C 176 30, 84 30, 76 88" fill="none" stroke={INK} strokeWidth="2.4" strokeDasharray="8 7" strokeLinecap="round" />
        <path d="M76 88 l 12 -12 M76 88 l 14 3" fill="none" strokeWidth="2.6" />
      </g>
      <g className="ls-twinkle" style={{ animationDelay: "0s" }}><Spark x={130} y={38} s={0.9} /></g>
      <g className="ls-drift" style={{ animationDelay: "-1.4s" }}><Sheet x={216} y={40} r={12} s={0.72} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.8s" }}><Coin x={38} y={140} s={0.72} /></g>
    </Frame>
  );
}

export const LOOP_SCENES = {
  score: SceneScore,
  insight: SceneInsight,
  action: SceneAction,
  impact: SceneImpact,
  loop: SceneLoop,
} as const;
