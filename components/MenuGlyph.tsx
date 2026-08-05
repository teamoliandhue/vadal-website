import type { ReactNode } from "react";

/* ============================================================================
   MenuGlyph — the illustration in each mega-menu feature card.

   All three cards used to share one dotted sphere, which was decoration rather
   than information: it said the same thing on Solutions, Resources and Science.
   Each section now gets a mark drawn from what that section actually is —

     solutions  concentric target with a path landing in the bullseye
                ("tuned to the outcomes you're accountable for")
     resources  a stack of guides, the top one carrying benchmark bars
                ("guides, benchmarks and community")
     science    scattered observations with a trend fitted through them
                ("feedback grounded in AI-powered intelligence")

   They keep the brand's aurora ramp so the cards still read as a set, but the
   silhouettes are deliberately different: circular, rectangular, and a plotted
   field. Gradient ids are namespaced per kind — more than one card can be in
   the DOM at once, and duplicate ids would cross-wire the fills.
   ========================================================================== */

export type GlyphKind = "solutions" | "resources" | "science";

const RAMP: Record<GlyphKind, [string, string, string]> = {
  solutions: ["#23d7be", "#3b9eff", "#7c5cf8"],
  resources: ["#3b9eff", "#5b7cf8", "#7c5cf8"],
  science: ["#23d7be", "#3b9eff", "#7c5cf8"],
};

function Frame({ kind, children }: { kind: GlyphKind; children: ReactNode }) {
  const [a, b, c] = RAMP[kind];
  return (
    <svg width={104} height={104} viewBox="0 0 104 104" fill="none" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="52%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

/* Outcomes you aim at, and the path that lands on one. */
function SolutionsGlyph() {
  const g = "url(#g-solutions)";
  return (
    <Frame kind="solutions">
      <circle cx="56" cy="50" r="42" stroke={g} strokeWidth="6" opacity="0.22" />
      <circle cx="56" cy="50" r="28" stroke={g} strokeWidth="6" opacity="0.5" />
      <circle cx="56" cy="50" r="12" fill={g} />
      {/* the approach path, arriving from outside and landing on centre */}
      <path
        d="M10 92 C 26 78, 34 70, 44 60"
        stroke={g}
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M50 54 L38 57 L47 66 Z" fill={g} />
    </Frame>
  );
}

/* A shelf of guides; the top one is a benchmark. */
function ResourcesGlyph() {
  const g = "url(#g-resources)";
  return (
    <Frame kind="resources">
      <rect x="16" y="24" width="64" height="50" rx="9" fill={g} opacity="0.2" transform="rotate(-9 52 52)" />
      <rect x="20" y="28" width="64" height="50" rx="9" fill={g} opacity="0.4" transform="rotate(-4 52 52)" />
      <rect x="23" y="33" width="62" height="48" rx="9" fill={g} />
      {/* title rule + three rising bars = the benchmark inside the guide */}
      <rect x="33" y="43" width="26" height="4.5" rx="2.25" fill="#fff" opacity="0.55" />
      <rect x="33" y="61" width="8" height="10" rx="2.5" fill="#fff" opacity="0.9" />
      <rect x="46" y="55" width="8" height="16" rx="2.5" fill="#fff" opacity="0.9" />
      <rect x="59" y="48" width="8" height="23" rx="2.5" fill="#fff" opacity="0.9" />
    </Frame>
  );
}

/* Observations, and the trend fitted through them. */
function ScienceGlyph() {
  const g = "url(#g-science)";
  return (
    <Frame kind="science">
      <path
        d="M20 16 V84 H88"
        stroke="var(--line-strong)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M27 75 C 44 71, 52 50, 84 27"
        stroke={g}
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* on-trend observations */}
      {[
        [30, 73],
        [41, 66],
        [50, 57],
        [61, 45],
        [72, 36],
        [81, 29],
      ].map(([cx, cy]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r="4.5" fill={g} />
      ))}
      {/* and the spread around it — a fit, not a straight line through points */}
      <circle cx="38" cy="55" r="3.5" fill={g} opacity="0.45" />
      <circle cx="57" cy="70" r="3.5" fill={g} opacity="0.45" />
      <circle cx="70" cy="52" r="3.5" fill={g} opacity="0.45" />
    </Frame>
  );
}

export function MenuGlyph({ kind }: { kind: GlyphKind }) {
  if (kind === "resources") return <ResourcesGlyph />;
  if (kind === "science") return <ScienceGlyph />;
  return <SolutionsGlyph />;
}
