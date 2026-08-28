/* ============================================================================
   iso-kit — the shared vocabulary every illustration on the site is drawn in.

   One isometric projection, one dark outline, one flat palette, one ground
   slab. It lived inside LoopScene until the platform cards needed the same
   language: those were drawn in a flat line-and-bar style, which made the site
   read as two different products depending on how far you had scrolled.

   Anything illustrated here should be built from these primitives, not from
   fresh paths — that is what keeps five scenes and six scenes sharing a
   horizon and a light source instead of merely looking similar.

   2:1 isometric: x runs down-right, y runs down-left, z is up. Every solid
   goes through iso() so all of them share a ground plane and a viewing angle.
   ========================================================================== */

/* --------------------------------------------------------------- palette */
export const INK = "#33475b";        // one outline, everywhere
export const GROUND = "#fbf7f1";     // warm off-white
export const CREAM = "#f3ede3";
export const CREAM_D = "#dfd6c8";
export const BUTTER = "#f9c86e";
export const BUTTER_D = "#e6ac47";
export const BUTTER_L = "#fde3a8";
export const PERI = "#9b98e0";
export const PERI_D = "#7d79cc";
export const PERI_L = "#c8c5f0";
export const TEAL = "#8fd3d0";
export const TEAL_D = "#5db8b6";
export const TEAL_L = "#c7ebe9";
export const SKY = "#bfe6f2";
export const SKY_D = "#8fcfe3";
export const CORAL = "#f27c62";
export const LEAF = "#7fc39a";
export const LEAF_D = "#4f9e73";
export const PAPER = "#fffdf8";
export const GLASS = "#e6f6fb";

/* ------------------------------------------------------------ projection */
/* 2:1 isometric. x runs down-right, y runs down-left, z is up. */
export const iso = (x: number, y: number, z: number): [number, number] => [x - y, (x + y) / 2 - z];
export const P = (pts: [number, number][]) => "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ") + " Z";

export type Faces = { top: string; left: string; right: string };
/** an isometric block with its two visible sides */
export function Block({ x, y, z = 0, w, d, h, c, sw = 2.4 }: {
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

export const F = {
  butter: { top: BUTTER, left: BUTTER_D, right: BUTTER_L },
  peri: { top: PERI, left: PERI_D, right: PERI_L },
  teal: { top: TEAL, left: TEAL_D, right: TEAL_L },
  cream: { top: CREAM, left: CREAM_D, right: "#faf6ef" },
  sky: { top: SKY, left: SKY_D, right: "#e3f4f9" },
};

/** a run of steps climbing +x, from ground to height h */
export function Stairs({ x, y, z = 0, w, d, h, n = 6, c }: {
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
export function Sheet({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
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
export function Folder({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeWidth={2.4 / s} strokeLinejoin="round">
      <path d="M0 8 h14 l5 -6 h19 v30 h-38 Z" fill={BUTTER_D} />
      <path d="M0 12 h38 v20 h-38 Z" fill={BUTTER} />
    </g>
  );
}

export function Coin({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeWidth={2.4 / s}>
      <circle r="12" fill={BUTTER} />
      <circle r="7.5" fill="none" strokeWidth={1.8 / s} />
      <path d="M-2.5 -3.5 v7 M0 -3.5 v7 M2.5 -3.5 v7" strokeWidth={1.4 / s} strokeLinecap="round" />
    </g>
  );
}

export function Spark({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
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

/* --------------------------------------------------------------- scenes */
/* Each scene lives in a 260×200 box with its slab centred on the same ground
   point, so five of them side by side share one horizon. */
export const VW = 260, VH = 200;
export const OX = 130, OY = 128;
export const at = (x: number, y: number, z = 0): [number, number] => {
  const p = iso(x, y, z);
  return [OX + p[0], OY + p[1]];
};
/** a group placed on the iso ground */
export function At({ x, y, z = 0, children }: { x: number; y: number; z?: number; children: React.ReactNode }) {
  const [tx, ty] = at(x, y, z);
  return <g transform={`translate(${tx} ${ty})`}>{children}</g>;
}

export const Frame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox={`0 0 ${VW} ${VH}`} className="h-full w-full" role="img" aria-label={label}>
    <g stroke={INK} strokeLinecap="round">{children}</g>
  </svg>
);

/* the ground slab every scene stands on — the same one, five times */
export const Ground = ({ c = F.cream }: { c?: Faces }) => <Block x={-62} y={-52} w={124} d={104} h={12} c={c} />;

/* ------------------------------------------------------- the banner format */
/* The journey scenes are 260x200 — a picture that sits beside a paragraph. The
   platform cards need the same world in a letterbox instead: a card's
   illustration band is wide and short, and a 13:10 scene dropped into it either
   letterboxes with dead air down both sides or crops the slab.

   Same projection, same palette, same outline — only the slab's footprint is
   flatter and the frame is shorter. Origin is x=130, y=75, which centres a
   140x80 ground slab with a 10-unit margin top and bottom and 20 each side. */
export const WVW = 260, WVH = 140;
const WOX = 130, WOY = 75;

export function WideAt({ x, y, z = 0, children }: {
  x: number; y: number; z?: number; children: React.ReactNode;
}) {
  const p = iso(x, y, z);
  return <g transform={`translate(${WOX + p[0]} ${WOY + p[1]})`}>{children}</g>;
}

export const WideFrame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox={`0 0 ${WVW} ${WVH}`} className="h-full w-full" role="img" aria-label={label}>
    <g stroke={INK} strokeLinecap="round">{children}</g>
  </svg>
);

/** the flatter slab the banner scenes stand on */
export const WideGround = ({ c = F.cream }: { c?: Faces }) => (
  <Block x={-70} y={-40} w={140} d={80} h={10} c={c} />
);
