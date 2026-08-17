import {
  INK, CREAM, CREAM_D, BUTTER, BUTTER_D, PERI, PERI_D, PERI_L, TEAL, TEAL_D,
  SKY, SKY_D, CORAL, LEAF, PAPER, GLASS,
  iso, Block, Stairs, Sheet, Folder, Coin, Spark, F, type Faces,
} from "./iso-kit";

/* ============================================================================
   StoryArt — one illustration per kind of screen, instead of a screenshot.

   The decision behind this file: the site no longer shows product UI. Real
   captures would have to keep pace with the product, and invented ones — which
   is what 84 of the 111 screens were — assert that a specific interface exists
   with specific numbers in it. Neither is what these sections are for. They
   are explaining what a capability DOES, and an illustration says that without
   claiming to be a photograph of anything.

   111 named screens across 25 product pages resolve to ten archetypes, because
   that is genuinely how many distinct kinds of thing they are: a dashboard, a
   feed, a builder, a board, a directory, a report, a heatmap, a conversation,
   something guarded, and something in the hand. Each gets one scene, drawn from
   the shared iso-kit so the whole site is one illustration set.

   Naming a screen "Driver-Level Peer Gap View" and drawing the dashboard
   archetype is honest: it says "this is a dashboard about that". Drawing a
   bespoke fiction for each would be back where we started.
   ========================================================================== */

export type Archetype =
  | "dashboard" | "feed" | "builder" | "board" | "directory"
  | "report" | "heatmap" | "chat" | "guard" | "mobile";

/* Which archetype a screen name belongs to. Ordered most-specific first: a
   "Mobile Task View" is a phone before it is a board, and an "Audit Log
   Viewer" is guarded before it is a dashboard. */
export function archetypeFor(screen: string): Archetype {
  const t = screen.toLowerCase();
  if (/\bmobile\b|\bapp\b/.test(t)) return "mobile";
  if (/audit|security|access|permission|governance|compliance|escalation|risk alert|guardrail/.test(t)) return "guard";
  if (/builder|composer|configuration|workflow|template librar|scheduling/.test(t)) return "builder";
  if (/heatmap|skills map|cluster/.test(t)) return "heatmap";
  if (/chat|copilot|conversation|assistant|ask |360 feedback/.test(t)) return "chat";
  if (/report|board-ready|executive summary|summary panel/.test(t)) return "report";
  if (/directory|catalog|catalogue|\bhub\b|portal|\blibrar/.test(t)) return "directory";
  if (/\bfeed\b|stream|timeline|journey|roadmap|pipeline/.test(t)) return "feed";
  /* \bboard\b, not board — "Workforce Health Dashboard" contains the word as a
     substring, and an unbounded match sent 21 dashboards to the board scene. */
  if (/\bplan\b|action plan|\btask\b|\bcase\b|inbox|tracker|accountability|\bboard\b/.test(t)) return "board";
  return "dashboard";
}

/* --------------------------------------------------------------- staging */
const VW = 300, VH = 210;
const OX = 150, OY = 132;
const at = (x: number, y: number, z = 0): [number, number] => {
  const p = iso(x, y, z);
  return [OX + p[0], OY + p[1]];
};
function At({ x, y, z = 0, children }: { x: number; y: number; z?: number; children: React.ReactNode }) {
  const [tx, ty] = at(x, y, z);
  return <g transform={`translate(${tx} ${ty})`}>{children}</g>;
}
/** local offset inside a station, without re-applying the scene origin */
const L = (x: number, y: number, z = 0) => {
  const p = iso(x, y, z);
  return `translate(${p[0]} ${p[1]})`;
};

const Frame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox={`0 0 ${VW} ${VH}`} className="h-full w-full" role="img" aria-label={label}>
    <g stroke={INK} strokeLinecap="round">{children}</g>
  </svg>
);

/** the slab every scene stands on */
const Ground = ({ c = F.cream }: { c?: Faces }) => <Block x={-70} y={-58} w={140} d={116} h={12} c={c} />;

/* ═════════════════════════════════════════════════════════ 1. DASHBOARD */
/* Numbers you read at a glance: a stepped set of columns on a plinth, one
   taller than the rest, with a reading panel behind them. */
function ArtDashboard() {
  return (
    <Frame label="A dashboard: measures side by side, one standing out">
      <At x={0} y={0}>
        <Ground c={F.butter} />
        <Block x={-46} y={-20} w={20} d={40} h={34} c={F.teal} />
        <Block x={-20} y={-20} w={20} d={40} h={58} c={F.teal} />
        <Block x={6} y={-20} w={20} d={40} h={86} c={F.teal} />
        <Block x={32} y={-20} w={20} d={40} h={46} c={F.sky} />
      </At>
      <g className="ls-drift"><Sheet x={26} y={30} r={-14} s={0.78} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-1.2s" }}><Spark x={252} y={54} s={0.8} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.6s" }}><Coin x={258} y={140} s={0.78} /></g>
    </Frame>
  );
}

/* ══════════════════════════════════════════════════════════════ 2. FEED */
/* Things arriving in order: a stack of cards on a plinth, the newest lifted
   clear of the rest and drifting. */
function ArtFeed() {
  return (
    <Frame label="A feed: entries stacked in order, the newest arriving on top">
      <At x={0} y={0}>
        <Ground c={F.sky} />
        <Block x={-40} y={-34} w={80} d={68} h={10} c={F.cream} />
        <Block x={-34} y={-28} w={68} d={56} h={9} c={F.peri} />
        <Block x={-34} y={-28} z={9} w={68} d={56} h={9} c={F.peri} />
        <Block x={-34} y={-28} z={18} w={68} d={56} h={9} c={F.peri} />
        <g className="ls-rise">
          <Block x={-34} y={-28} z={30} w={68} d={56} h={9} c={F.teal} />
        </g>
      </At>
      <g className="ls-drift" style={{ animationDelay: "-0.8s" }}><Sheet x={30} y={26} r={-12} s={0.76} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.2s" }}><Sheet x={244} y={40} r={13} s={0.7} /></g>
      <g className="ls-twinkle"><Spark x={60} y={148} s={0.7} /></g>
    </Frame>
  );
}

/* ═══════════════════════════════════════════════════════════ 3. BUILDER */
/* Something being assembled: a base plate with pieces set into it and one
   piece still in the air, waiting to be placed. */
function ArtBuilder() {
  return (
    <Frame label="A builder: pieces being assembled on a base, one still in the air">
      <At x={0} y={0}>
        <Ground c={F.peri} />
        <Block x={-44} y={-36} w={88} d={72} h={8} c={F.cream} />
        <Block x={-36} y={-28} w={30} d={26} h={16} c={F.teal} />
        <Block x={-36} y={2} w={30} d={26} h={16} c={F.sky} />
        <Block x={2} y={2} w={30} d={26} h={16} c={F.butter} />
        {/* the empty socket the floating piece belongs in */}
        <Block x={2} y={-28} w={30} d={26} h={3} c={{ top: CREAM_D, left: "#cbc2b2", right: CREAM_D }} />
      </At>
      {/* the piece, hovering above its socket */}
      <g className="ls-rise">
        <g transform={`translate(${at(17, -15, 60)[0]} ${at(17, -15, 60)[1]})`}>
          <Block x={-15} y={-13} w={30} d={26} h={16} c={{ top: CORAL, left: "#d0614a", right: "#f7b09e" }} />
        </g>
      </g>
      <g className="ls-twinkle" style={{ animationDelay: "-0.6s" }}><Spark x={244} y={62} s={0.8} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2s" }}><Folder x={26} y={34} r={-10} s={0.72} /></g>
    </Frame>
  );
}

/* ═════════════════════════════════════════════════════════════ 4. BOARD */
/* Work with an owner: three lanes on a plinth, blocks sitting in them, and a
   flag over the lane that is finished. */
function ArtBoard() {
  return (
    <Frame label="A board: work moving across lanes, one lane finished">
      <At x={0} y={0}>
        <Ground c={F.peri} />
        <Block x={-46} y={-38} w={92} d={76} h={8} c={F.cream} />
        {/* three lanes */}
        <Block x={-40} y={-32} w={24} d={64} h={4} c={{ top: "#eae5f8", left: "#d4cdf1", right: "#eae5f8" }} />
        <Block x={-10} y={-32} w={24} d={64} h={4} c={{ top: "#eae5f8", left: "#d4cdf1", right: "#eae5f8" }} />
        <Block x={20} y={-32} w={24} d={64} h={4} c={{ top: "#eae5f8", left: "#d4cdf1", right: "#eae5f8" }} />
        {/* cards in them */}
        <Block x={-38} y={-28} z={4} w={20} d={22} h={10} c={F.sky} />
        <Block x={-38} y={2} z={4} w={20} d={22} h={10} c={F.sky} />
        <Block x={-8} y={-28} z={4} w={20} d={22} h={10} c={F.butter} />
        <Block x={22} y={-28} z={4} w={20} d={22} h={10} c={F.teal} />
      </At>
      {/* the flag over the done lane */}
      <g transform={`translate(${at(32, -18, 20)[0]} ${at(32, -18, 20)[1]})`} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M0 0 v-30" />
        <path d="M0 -28 l20 6 l-20 6 Z" fill={CORAL} />
      </g>
      <g className="ls-drift" style={{ animationDelay: "-1.4s" }}><Sheet x={24} y={30} r={-13} s={0.74} /></g>
      <g className="ls-twinkle" style={{ animationDelay: "-2.4s" }}><Spark x={254} y={132} s={0.72} /></g>
    </Frame>
  );
}

/* ═════════════════════════════════════════════════════════ 5. DIRECTORY */
/* Many things to choose from: a grid of small blocks on a wide plinth, each a
   different colour, one raised because it is selected. */
function ArtDirectory() {
  const cells: [number, number, Faces][] = [
    [-40, -30, F.teal], [-10, -30, F.sky], [20, -30, F.butter],
    [-40, 4, F.sky], [-10, 4, F.butter], [20, 4, F.peri],
  ];
  return (
    <Frame label="A directory: many options laid out, one picked">
      <At x={0} y={0}>
        <Ground c={F.cream} />
        {cells.map(([cx, cy, c], i) => (
          <Block key={i} x={cx} y={cy} w={24} d={26} h={i === 1 ? 22 : 12} c={c} />
        ))}
      </At>
      <g className="ls-twinkle"><Spark x={244} y={56} s={0.82} /></g>
      <g className="ls-drift" style={{ animationDelay: "-1.8s" }}><Folder x={24} y={32} r={-11} s={0.72} /></g>
      <g className="ls-drift" style={{ animationDelay: "-3s" }}><Coin x={256} y={144} s={0.74} /></g>
    </Frame>
  );
}

/* ════════════════════════════════════════════════════════════ 6. REPORT */
/* Something to hand over: a bound document on a plinth with pages lifting off
   it, and a seal. */
function ArtReport() {
  return (
    <Frame label="A report: a bound document with pages lifting from it">
      <At x={0} y={0}>
        <Ground c={F.butter} />
        <Block x={-34} y={-30} w={68} d={60} h={12} c={F.peri} />
        <Block x={-30} y={-26} z={12} w={60} d={52} h={7} c={F.cream} />
        <Block x={-30} y={-26} z={19} w={60} d={52} h={7} c={{ top: PAPER, left: CREAM_D, right: CREAM }} />
      </At>
      <g className="ls-drift" style={{ animationDelay: "-0.5s" }}><Sheet x={200} y={30} r={14} s={0.82} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.1s" }}><Sheet x={44} y={22} r={-15} s={0.74} /></g>
      <g transform={`translate(${at(44, 12, 12)[0]} ${at(44, 12, 12)[1]})`} strokeWidth="2.4">
        <circle r="12" fill={CORAL} />
        <path d="M-5 0 l4 4 l7 -8" fill="none" strokeWidth="2.4" />
      </g>
      <g className="ls-twinkle" style={{ animationDelay: "-1.5s" }}><Spark x={252} y={140} s={0.72} /></g>
    </Frame>
  );
}

/* ═══════════════════════════════════════════════════════════ 7. HEATMAP */
/* A pattern across a population: an even grid of tiles where a few run hot. */
function ArtHeatmap() {
  const tiles: [number, number, Faces][] = [];
  const tone: Faces[] = [F.teal, F.sky, { top: CORAL, left: "#d0614a", right: "#f7b09e" }, F.butter];
  const pick = [0, 1, 0, 1, 1, 2, 0, 3, 1, 2, 0, 1];
  let k = 0;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) tiles.push([-45 + c * 24, -34 + r * 24, tone[pick[k++]]]);
  return (
    <Frame label="A heatmap: an even grid where a few cells run hot">
      <At x={0} y={0}>
        <Ground c={F.peri} />
        {tiles.map(([cx, cy, c], i) => (
          <Block key={i} x={cx} y={cy} w={20} d={20} h={pick[i] === 2 ? 16 : 7} c={c} />
        ))}
      </At>
      <g className="ls-twinkle"><Spark x={250} y={54} s={0.78} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.3s" }}><Sheet x={26} y={28} r={-12} s={0.72} /></g>
    </Frame>
  );
}

/* ══════════════════════════════════════════════════════════════ 8. CHAT */
/* A conversation: two blocks facing each other across a plinth, and a bubble
   rising between them. */
function ArtChat() {
  return (
    <Frame label="A conversation: a question and an answer, with a reply rising between them">
      <At x={0} y={0}>
        <Ground c={F.sky} />
        <Block x={-44} y={-14} w={30} d={30} h={26} c={F.peri} />
        <Block x={16} y={-14} w={30} d={30} h={26} c={F.teal} />
      </At>
      {/* the reply */}
      <g className="ls-rise">
        <g transform={`translate(${at(-14, -12, 62)[0]} ${at(-14, -12, 62)[1]})`} strokeWidth="2.4" strokeLinejoin="round">
          <path d="M0 0 h44 a7 7 0 0 1 7 7 v20 a7 7 0 0 1 -7 7 h-28 l-11 10 v-10 h-5 a7 7 0 0 1 -7 -7 v-20 a7 7 0 0 1 7 -7 Z"
                fill={PAPER} />
          <path d="M10 12 h26 M10 21 h17" strokeWidth="1.8" />
        </g>
      </g>
      <g className="ls-twinkle" style={{ animationDelay: "-0.7s" }}><Spark x={252} y={64} s={0.8} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.5s" }}><Coin x={38} y={148} s={0.72} /></g>
    </Frame>
  );
}

/* ═════════════════════════════════════════════════════════════ 9. GUARD */
/* Something protected: a block under a glass dome on a plinth, with a seal. */
function ArtGuard() {
  return (
    <Frame label="Something protected: kept under glass, with a seal">
      <At x={0} y={0}>
        <Ground c={F.peri} />
        <Block x={-34} y={-30} w={68} d={60} h={8} c={F.cream} />
        <Block x={-18} y={-16} w={36} d={32} h={30} c={F.teal} />
        <g transform={L(0, 0, 20)} strokeWidth="2.4">
          <path d="M-50 0 A 50 50 0 0 1 50 0" fill={GLASS} fillOpacity="0.55" />
          <ellipse cx="0" cy="0" rx="50" ry="25" fill="none" />
          <path d="M-34 -30 q -6 9 -8 21" fill="none" stroke={PAPER} strokeWidth="5" strokeLinecap="round" />
        </g>
      </At>
      <g transform={`translate(${at(48, 30, 16)[0]} ${at(48, 30, 16)[1]})`} strokeWidth="2.4">
        <circle r="13" fill={BUTTER} />
        <path d="M-4 -1 v-4 a4 4 0 0 1 8 0 v4" fill="none" strokeWidth="2" />
        <rect x="-6" y="-1" width="12" height="10" rx="2" fill={PAPER} strokeWidth="2" />
      </g>
      <g className="ls-twinkle"><Spark x={38} y={54} s={0.76} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.2s" }}><Sheet x={250} y={128} r={13} s={0.7} /></g>
    </Frame>
  );
}

/* ════════════════════════════════════════════════════════════ 10. MOBILE */
/* In the hand: a phone standing upright on the plinth, screen toward us. */
function ArtMobile() {
  return (
    <Frame label="In the hand: the same thing on a phone">
      <At x={0} y={0}>
        <Ground c={F.butter} />
        <Block x={-24} y={-20} w={48} d={40} h={10} c={F.cream} />
      </At>
      <g transform={`translate(${at(0, 0, 10)[0]} ${at(0, 0, 10)[1]})`} strokeWidth="2.4" strokeLinejoin="round">
        <rect x="-30" y="-108" width="60" height="108" rx="12" fill={PERI} />
        <rect x="-24" y="-100" width="48" height="88" rx="6" fill={PAPER} />
        <path d="M-8 -104 h16" strokeWidth="2" />
        <rect x="-17" y="-92" width="34" height="12" rx="3" fill={TEAL} strokeWidth="1.8" />
        <path d="M-17 -70 h34 M-17 -60 h22 M-17 -50 h30 M-17 -40 h18" strokeWidth="1.8" />
        <rect x="-17" y="-32" width="20" height="10" rx="3" fill={CORAL} strokeWidth="1.8" />
      </g>
      <g className="ls-twinkle" style={{ animationDelay: "-0.9s" }}><Spark x={246} y={70} s={0.78} /></g>
      <g className="ls-drift" style={{ animationDelay: "-2.4s" }}><Sheet x={30} y={40} r={-13} s={0.72} /></g>
    </Frame>
  );
}

const ART: Record<Archetype, () => React.ReactElement> = {
  dashboard: ArtDashboard,
  feed: ArtFeed,
  builder: ArtBuilder,
  board: ArtBoard,
  directory: ArtDirectory,
  report: ArtReport,
  heatmap: ArtHeatmap,
  chat: ArtChat,
  guard: ArtGuard,
  mobile: ArtMobile,
};

/** the illustration for a named screen */
export function StoryArt({ screen, archetype }: { screen?: string; archetype?: Archetype }) {
  const key = archetype ?? archetypeFor(screen ?? "");
  const Scene = ART[key];
  return <Scene />;
}

/** the warm plate the reference draws everything on */
export const PLATE = "#fbf7f1";
