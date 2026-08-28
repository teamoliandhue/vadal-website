/* ============================================================================
   LoopScene — the five "Why Vadal.ai" stations, as small isometric scenes.

   Reference: the illustration style of a single continuous scene built from
   bold flat colour blocks — butter yellow, periwinkle, teal, cream — sitting on
   a warm off-white ground, drawn with one confident dark outline, with big
   architectural masses that have real weight and a few recognisable objects
   (a stair, a dome, a flag) doing the storytelling. Documents,
   coins and four-point sparkles float around it.

   One scene per card, and each is minimal on purpose: a single object that
   IS the idea, on its own slab, with one or two of the reference's floating
   punctuation marks. The full panorama that preceded this had all five in one
   landscape; that was a picture to look at, where the cards need a picture
   each to sit beside their own copy.

   Score is the collector — a stepped stack, tallest column still rising.
   Insight is a glass dome over three sorted blocks.
   Action is a board of work: lanes, owned cards, one still landing.
   Impact is the tower rising past its baseline, flag planted — the lift, measured.
   The Loop is the return arc, landing back where it started.

   Every solid goes through one iso() so all five share a ground plane and a
   viewing angle. Same outline, same palette, same slab. Motion is slow and
   few: a drift, a twinkle, one column that rises, one arc whose dashes crawl.
   ========================================================================== */


import {
  INK, CREAM, CREAM_D, BUTTER, BUTTER_L, PERI, PERI_D, PERI_L, TEAL, TEAL_D, TEAL_L,
  SKY, CORAL, LEAF, PAPER, GLASS,
  iso, type Faces, Block, F, Stairs, Sheet, Folder, Coin, Spark, At, Frame, Ground,
} from "./iso-kit";


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
  /* Rebuilt twice. The original drew a domed hall as a flat front elevation —
     plain rects and a face-on triangle inside a single translate() — set on the
     isometric ground. It broke the family's language (every other scene is real
     Block solids on the shared projection) and it broke geometrically: the
     dome's base line met the pediment only at its apex point, so most of the
     dome hung over open air. That is the floating cap.

     A lie-flat kanban replaced it and had to go too: two rows across three
     lanes overlap heavily once the cards are raised to the board's top face,
     because rows and lanes both run diagonally in this projection, so the
     cards collided and the tick read against the wrong one.

     So the plan stands up instead. "Plans with an owner, a deadline and
     visible progress" is a thing you read, and an upright board gives it both
     legibility and the height the other four scenes have. Rows are drawn in
     plain 2-D inside FACE, a matrix that maps (across, up) straight onto the
     board's front face, so nothing overlaps and the geometry cannot drift. */
  const BY = -12, BD = 8;              // the board slab's depth in y
  const FY = BY + BD;                  // the face we draw on
  /* (u,w) -> iso(u, FY, w): across the face, and up it */
  const FACE = `matrix(1 0.5 0 -1 ${-FY} ${FY / 2})`;
  const ROWS = [58, 42, 26];           // three rows, top to bottom
  const P = (x: number, y: number, z: number) => iso(x, y, z).join(" ");

  /* One line of the plan: its checkbox, the task, and who owns it. `w` is a
     height up the face and is passed POSITIVE — FACE's d = -1 already flips the
     axis, so negating here as well sends the rows back down below the board. */
  const Row = ({ w, done, dot }: { w: number; done: boolean; dot: string }) => (
    <g>
      <rect x={-32} y={w - 5.5} width={11} height={11} rx={2}
        fill={done ? LEAF : PAPER} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {/* the tick's deltas run negative-down: FACE flips the axis, so a check
          written the usual way comes out as a caret */}
      {done && (
        <path d={`M-29 ${w} l2 -2.2 l4.2 5`} fill="none" stroke={PAPER}
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          vectorEffect="non-scaling-stroke" />
      )}
      <path d={`M-15 ${w} h${done ? 22 : 30}`} strokeWidth="3.4" strokeLinecap="round"
        opacity={done ? 0.3 : 0.6} vectorEffect="non-scaling-stroke" />
      <circle cx={26} cy={w} r={5} fill={dot} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </g>
  );

  return (
    <Frame label="An upright plan board: three tasks, each with an owner, the last being ticked off">
      <At x={0} y={0}>
        <Ground c={F.peri} />
        {/* the board and the plinth it stands on */}
        <Block x={-44} y={BY - 4} w={88} d={16} h={6} c={F.cream} />
        <Block x={-40} y={BY} w={80} d={BD} h={58} z={18} c={F.cream} />

        {/* the plan, read straight off the board's face */}
        <g transform={FACE} stroke={INK} strokeLinejoin="round">
          <rect x={-32} y={65} width={64} height={9} rx={2.5}
            fill={SKY} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <Row w={ROWS[0]} done dot={TEAL_D} />
          <Row w={ROWS[1]} done dot={CORAL} />
          <Row w={ROWS[2]} done={false} dot={PERI_D} />
        </g>

        {/* two cards on the desk in front, one still being placed. The motion
            lives here rather than on a tick flying at the open row: the rows sit
            16 units apart on a 58-tall face, so a 9.5-radius badge hovering over
            row three always fouls row two. */}
        <Block x={-32} y={16} w={24} d={20} h={4} c={F.butter} sw={2} />
        <g className="ls-rise">
          <Block x={2} y={16} z={6} w={24} d={20} h={4} c={F.teal} sw={2} />
        </g>
      </At>

      <g className="ls-drift" style={{ animationDelay: "-1.6s" }}><Folder x={28} y={40} r={-10} s={0.75} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-0.5s" }}><Spark x={228} y={54} s={0.8} /></g>
      <g className="ls-drift" style={{ animationDelay: "-3s" }}><Coin x={228} y={148} s={0.75} /></g>
    </Frame>
  );
}

/* ══════════════════════════════════════════════════════════════ 4. IMPACT */
export function SceneImpact() {
  /* Placed from the same At(0,0) origin as the other four scenes. The previous
     version offset the group to (0,12) and stood a 92-tall tower under a bell
     jar: the jar's crown landed 14 units above the viewBox and was sliced off,
     and the offset pushed the scene 12 units left of where the others sit.
     Measured, not guessed — the content bbox now clears the frame all round.

     The bell jar is gone with it. "Prove what actually changed" is a lift
     against a baseline, so that is what this draws: a plinth, a tower, a
     dashed baseline that carries round both visible faces, a coral rise
     measuring the height gained above it, and the flag planted on the cap. */
  const GH = 12;                                          // the ground slab's top
  const P = { x: -36, y: -30, w: 72, d: 60, h: 8, z: GH }; // plinth
  const T = { x: -30, y: -24, w: 60, d: 48, h: 54, z: 20 };// tower
  const C = { x: -34, y: -28, w: 68, d: 56, h: 6, z: 74 }; // cap
  const TOP = C.z + C.h;                                   // 80
  const BASE = 40;                                         // the baseline height
  const L = (x: number, y: number, z: number) => iso(x, y, z).join(" ");
  return (
    <Frame label="A tower rising past a dashed baseline, flag planted on top: the lift, measured">
      <At x={0} y={0}>
        <Ground c={F.butter} />
        <Block {...P} c={F.cream} />
        <Block {...T} c={F.peri} />
        <Block {...C} c={F.teal} />

        {/* the baseline — carried round both visible faces so it reads as a
            level, not a stray line on one wall */}
        <g strokeWidth="2" strokeDasharray="5 5" opacity="0.6">
          <path
            d={`M ${L(T.x, T.y + T.d, BASE)} L ${L(T.x + T.w, T.y + T.d, BASE)} L ${L(T.x + T.w, T.y, BASE)}`}
            fill="none"
          />
        </g>

        {/* the lift above it, measured up the tower's right face */}
        <g stroke={CORAL} strokeWidth="2.4" strokeLinejoin="round">
          <path d={`M ${L(T.x + T.w, T.y + 8, BASE)} L ${L(T.x + T.w, T.y + 8, T.z + T.h)}`} />
          <path d={`M ${L(T.x + T.w, T.y + 8, T.z + T.h)} l -5 10 h 10 Z`} fill={CORAL} />
          <path d={`M ${L(T.x + T.w, T.y + 2, BASE)} L ${L(T.x + T.w, T.y + 14, BASE)}`} strokeWidth="2" />
        </g>

        {/* the flag, on a collar so it reads as planted rather than punched in */}
        <g transform={`translate(${L(0, 0, TOP)})`} strokeWidth="2.4" strokeLinejoin="round">
          <ellipse cx="0" cy="0" rx="11" ry="5.5" fill={TEAL_L} strokeWidth="2" />
          <path d="M0 -2 v-30" />
          <path d="M0 -30 l22 6.5 l-22 6.5 Z" fill={CORAL} />
        </g>
      </At>

      <g className="ls-drift" style={{ animationDelay: "-2.2s" }}><Sheet x={26} y={34} r={-14} s={0.75} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-1s" }}><Spark x={220} y={62} s={0.8} /></g>
      <g className="ls-drift" style={{ animationDelay: "-0.4s" }}><Coin x={38} y={152} s={0.75} /></g>
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
