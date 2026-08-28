import {
  INK, CREAM, BUTTER, PERI, PERI_D, PERI_L, TEAL, TEAL_D, TEAL_L, SKY, SKY_D,
  CORAL, LEAF, PAPER, GLASS,
  iso, Block, F, Stairs, Sheet, Folder, Coin, Spark, WideAt, WideFrame, WideGround,
} from "./iso-kit";

/* ============================================================================
   PlatformScenes — one banner illustration per platform layer.

   These were flat line-and-bar diagrams: a node graph, a waveform, a phone
   outline, a rising line, a hub, a bar chart. They read fine on their own but
   they put the site in two illustration languages — the journey section three
   screens above is isometric, and a visitor scrolling from one to the other met
   what looked like two different products.

   So they are rebuilt in the shared iso language: same projection, same ink
   outline, same flat palette, same floating paper-and-coin punctuation. Drawn
   in the banner frame (260x140) rather than the journey frame (260x200),
   because a card's illustration band is wide and short.

   Each composition is deliberately unlike the five journey scenes AND unlike
   the other five here — a stepped stack, a dome, an upright board, a flagged
   tower and a return arc are taken, so these are a constellation, a ripple, an
   app grid, a climb, a vault and a stack of layers.
   ========================================================================== */

const P = (x: number, y: number, z: number) => iso(x, y, z).join(" ");

/* ── 1. Workforce Experience ─ a team, gathered round one place ───────────── */
function SceneExperience() {
  const SAT: [number, number][] = [[-52, -18], [-10, -50], [26, 18], [-14, 22]];
  return (
    <WideFrame label="Four smaller blocks gathered around a taller one, wired to it">
      <WideAt x={0} y={0}>
        <WideGround c={F.butter} />
        {SAT.map(([x, y], i) => (
          <path key={`w${i}`} d={`M ${P(x + 9, y + 9, 10)} L ${P(0, 0, 10)}`} strokeWidth="1.8" opacity="0.5" />
        ))}
        {/* back to front, so the near blocks overlap the far ones */}
        {[...SAT].sort((a, b) => a[0] + a[1] - (b[0] + b[1])).map(([x, y], i) => (
          <Block key={i} x={x} y={y} z={10} w={18} d={18} h={i % 2 ? 14 : 20}
            c={i % 2 ? F.teal : F.sky} sw={2} />
        ))}
        <Block x={-14} y={-14} z={10} w={28} d={28} h={38} c={F.peri} />
        <g transform={`translate(${P(0, 0, 48)})`} strokeWidth="2.2" strokeLinejoin="round">
          <ellipse cx="0" cy="0" rx="12" ry="6" fill={PERI_L} strokeWidth="2" />
          <path d="M0 -4 c -5 -8 -13 -3 -8 4 c 3 4 8 7 8 7 s 5 -3 8 -7 c 5 -7 -3 -12 -8 -4 Z" fill={CORAL} />
        </g>
      </WideAt>
      <g className="ls-drift" style={{ animationDelay: "-0.6s" }}><Sheet x={26} y={16} r={-13} s={0.6} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-1.4s" }}><Spark x={226} y={30} s={0.6} /></g>
    </WideFrame>
  );
}

/* ── 2. Engagement & Listening ─ a signal going out, and coming back ──────── */
function SceneListening() {
  return (
    <WideFrame label="Ripples spreading across the ground from a listening post">
      <WideAt x={0} y={0}>
        <WideGround c={F.cream} />
        {/* rings on the ground plane: a circle in this projection is an
            ellipse exactly half as tall as it is wide */}
        {[62, 44, 26].map((r, i) => (
          <ellipse key={r} cx={iso(0, 0, 10)[0]} cy={iso(0, 0, 10)[1]} rx={r} ry={r / 2}
            fill="none" strokeWidth="2.2" strokeDasharray="7 5" opacity={0.35 + i * 0.2} />
        ))}
        <Block x={-13} y={-13} z={10} w={26} d={26} h={26} c={F.teal} />
        <g transform={`translate(${P(0, 0, 36)})`} strokeWidth="2.2">
          <ellipse cx="0" cy="0" rx="12" ry="6" fill={TEAL_L} strokeWidth="2" />
          <path d="M0 -2 v-9" strokeWidth="2" />
          <circle cx="0" cy="-14" r="5" fill={CORAL} strokeWidth="2" />
        </g>
        {/* two messages coming back in */}
        {/* z was 26/20 and put the near bubble 5 units above the frame */}
        {[[-56, -34, -15], [40, -30, -13]].map(([x, y, z], i) => (
          <g key={i} className="ls-drift" style={{ animationDelay: i ? "-2.4s" : "-0.9s" }}>
            <g transform={`translate(${P(x, y, -z)}) scale(0.82)`} strokeWidth="2.7" strokeLinejoin="round">
              <path d="M0 0 h34 a4 4 0 0 1 4 4 v14 a4 4 0 0 1 -4 4 h-22 l-7 7 v-7 h-5 a4 4 0 0 1 -4 -4 v-14 a4 4 0 0 1 4 -4 Z"
                fill={PAPER} />
              <path d="M7 8 h20 M7 14 h13" strokeWidth="1.8" opacity="0.5" />
            </g>
          </g>
        ))}
      </WideAt>
      <g className="ls-twinkle" style={{ animationDelay: "-0.4s" }}><Spark x={228} y={104} s={0.6} /></g>
    </WideFrame>
  );
}

/* ── 3. Digital Workplace ─ the whole workplace, as tiles you carry ───────── */
function SceneWorkplace() {
  const TILE = [
    { x: -54, y: -30, c: F.teal }, { x: -18, y: -30, c: F.sky }, { x: 18, y: -30, c: F.butter },
    { x: -54, y: 4, c: F.sky }, { x: -18, y: 4, c: F.butter }, { x: 18, y: 4, c: F.teal },
  ];
  return (
    <WideFrame label="Six app tiles laid out on a slab, one lifting off">
      <WideAt x={0} y={0}>
        <WideGround c={F.peri} />
        {TILE.map((t, i) => ({ ...t, i })).sort((a, b) => a.x + a.y - (b.x + b.y)).map((t) => (
          <g key={t.i} className={t.i === 5 ? "ls-rise" : undefined}>
            {t.i === 5 && (
              <path
                d={`M ${P(t.x, t.y, 15)} L ${P(t.x + 30, t.y, 15)} L ${P(t.x + 30, t.y + 26, 15)} L ${P(t.x, t.y + 26, 15)} Z`}
                fill="none" strokeWidth="1.8" strokeDasharray="4 4" opacity="0.4"
              />
            )}
            <Block x={t.x} y={t.y} z={t.i === 5 ? 28 : 10} w={30} d={26} h={5} c={t.c} sw={2} />
            <circle cx={iso(t.x + 9, t.y + 9, (t.i === 5 ? 28 : 10) + 5)[0]}
              cy={iso(t.x + 9, t.y + 9, (t.i === 5 ? 28 : 10) + 5)[1]}
              r="3.4" fill={INK} opacity="0.28" strokeWidth="0" />
            <path d={`M ${P(t.x + 6, t.y + 17, (t.i === 5 ? 28 : 10) + 5)} L ${P(t.x + 22, t.y + 17, (t.i === 5 ? 28 : 10) + 5)}`}
              strokeWidth="1.8" opacity="0.35" />
          </g>
        ))}
      </WideAt>
      <g className="ls-drift" style={{ animationDelay: "-1.9s" }}><Folder x={22} y={18} r={-11} s={0.6} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-0.7s" }}><Spark x={230} y={26} s={0.6} /></g>
    </WideFrame>
  );
}

/* ── 4. Talent Intelligence ─ the climb, with the next step already there ─── */
function SceneTalent() {
  return (
    <WideFrame label="A stair climbing to a platform, a marker standing on top">
      <WideAt x={0} y={0}>
        <WideGround c={F.butter} />
        {/* The stair IS the picture. Paired with a large block it lost: the
            treads sat behind it and read as three fins poking out from a cube. */}
        <Stairs x={-54} y={-18} w={76} d={36} h={40} n={4} c={F.peri} />
        <g transform={`translate(${P(3, 0, 40)})`} strokeWidth="2.2" strokeLinejoin="round">
          <ellipse cx="0" cy="0" rx="11" ry="5.5" fill={TEAL_L} strokeWidth="2" />
          <path d="M0 -2 v-26" />
          <path d="M0 -26 l19 5.5 l-19 5.5 Z" fill={CORAL} />
        </g>
        {/* a marker already part-way up, so the climb reads as underway */}
        <Block x={-30} y={-4} z={20} w={13} d={13} h={13} c={F.teal} sw={2} />
      </WideAt>
      <g className="ls-drift" style={{ animationDelay: "-1.2s" }}><Sheet x={24} y={20} r={-12} s={0.6} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.8s" }}><Coin x={228} y={104} s={0.6} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-0.3s" }}><Spark x={224} y={28} s={0.6} /></g>
    </WideFrame>
  );
}

/* ── 5. Enterprise AI Platform ─ everything wired into one secured core ───── */
function SceneEnterprise() {
  const NODE: [number, number][] = [[-62, -30], [-62, 16], [34, -30], [34, 16]];
  const FY = 22;                                     // the vault's front face
  const FACE = `matrix(1 0.5 0 -1 ${-FY} ${FY / 2})`;
  return (
    <WideFrame label="Four connected nodes feeding one vault with a shield on its face">
      <WideAt x={0} y={0}>
        <WideGround c={F.sky} />
        {NODE.map(([x, y], i) => (
          <path key={`l${i}`} d={`M ${P(x + 8, y + 8, 10)} L ${P(0, 0, 10)}`} strokeWidth="1.8" opacity="0.45" />
        ))}
        {NODE.filter(([x, y]) => x + y < 0).map(([x, y], i) => (
          <Block key={`b${i}`} x={x} y={y} z={10} w={16} d={16} h={10} c={F.cream} sw={2} />
        ))}
        <Block x={-24} y={-22} z={10} w={48} d={44} h={40} c={F.peri} />
        {/* The shield, drawn on the vault's front face. Written with +y as UP:
            FACE's d = -1 already flips the axis, so a path authored the normal
            way comes out upside down — which is what turned this into a blob. */}
        <g transform={FACE} stroke={INK} strokeLinejoin="round">
          <path d="M-13 44 L13 44 L13 30 L0 16 L-13 30 Z" fill={LEAF}
            strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M-6 33 l4.5 -4.6 l8 9" fill="none" stroke={PAPER} strokeWidth="2.6"
            strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </g>
        {NODE.filter(([x, y]) => x + y >= 0).map(([x, y], i) => (
          <Block key={`f${i}`} x={x} y={y} z={10} w={16} d={16} h={10} c={F.cream} sw={2} />
        ))}
      </WideAt>
      <g className="ls-twinkle" style={{ animationDelay: "-1.1s" }}><Spark x={226} y={28} s={0.6} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.2s" }}><Coin x={30} y={106} s={0.6} /></g>
    </WideFrame>
  );
}

/* ── 6. Workforce Intelligence ─ scattered data, resolved into layers ─────── */
function SceneIntelligence() {
  const L = [
    { x: -46, y: -30, w: 92, d: 60, z: 10, c: F.peri },
    { x: -38, y: -24, w: 76, d: 48, z: 24, c: F.sky },
    { x: -30, y: -18, w: 60, d: 36, z: 38, c: F.teal },
  ];
  return (
    <WideFrame label="Three data layers stacked into one view, a reading rising off the top">
      <WideAt x={0} y={0}>
        <WideGround c={F.cream} />
        {L.map((p, i) => (
          <g key={i}>
            <Block x={p.x} y={p.y} z={p.z} w={p.w} d={p.d} h={5} c={p.c} sw={2} />
            {/* the seam back to the layer beneath, so they read as stacked */}
            {i > 0 && (
              <path d={`M ${P(p.x, p.y + p.d, p.z)} L ${P(p.x, p.y + p.d, L[i - 1].z + 5)}`}
                strokeWidth="1.6" opacity="0.3" />
            )}
          </g>
        ))}
        {/* the reading the three layers add up to */}
        <g transform={`translate(${P(0, 0, 43)})`}>
          <path d="M-26 6 L-10 -6 L4 0 L20 -16" fill="none" strokeWidth="2.6"
            strokeLinecap="round" strokeLinejoin="round" stroke={CORAL} />
          <circle cx="20" cy="-16" r="4.5" fill={CORAL} strokeWidth="2" />
        </g>
      </WideAt>
      <g className="ls-drift" style={{ animationDelay: "-0.5s" }}><Sheet x={22} y={18} r={-12} s={0.6} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-2.1s" }}><Spark x={228} y={30} s={0.6} /></g>
    </WideFrame>
  );
}

/** layer id → its scene, in the order platformLayers declares them */
export const PLATFORM_SCENES: Record<string, () => React.ReactNode> = {
  "workforce-experience": SceneExperience,
  "ai-engagement": SceneListening,
  "digital-workplace": SceneWorkplace,
  "talent-intelligence": SceneTalent,
  "enterprise-platform": SceneEnterprise,
  "workforce-intelligence": SceneIntelligence,
};
