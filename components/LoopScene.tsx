import { Stage, Card, Row, Stat, Bars, Spark, Chip, Bar, Avatar } from "./ui-stage";

/* ============================================================================
   LoopScene — the four journey stages, as the product itself.

   Density is the thing to watch here. The first pass centred three short rows
   inside a flex-1 card and left half the frame empty — a 13:10 panel is ~430px
   tall at the size this renders, and three 20px rows do not fill it. So every
   scene now:
     - carries FOUR rows, not three
     - gives each row two lines (what it is, and where it came from)
     - lays them out with justify-between rather than centring a short stack
     - closes with a submerged footer, which also anchors the waterline

   The rule still holds — one idea and one number per stage. Denser, not busier.
   ========================================================================== */

const TEAL = "#19c6b4", CYAN = "#22b8dd", INDIGO = "#5c7cf9", VIOLET = "#7c5cf8";

const Head = ({ title, chip, tone = "calm", delay = 0 }: {
  title: string; chip: string; tone?: "calm" | "good" | "warn"; delay?: number;
}) => (
  <Card delay={delay} className="flex shrink-0 items-center justify-between px-3.5 py-2.5">
    <span className="text-[12px] font-bold text-[#0d2f2a]">{title}</span>
    <Chip tone={tone}>{chip}</Chip>
  </Card>
);

const Foot = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <Card sub delay={delay} className="shrink-0 px-3.5 py-2">
    <p className="text-[10.5px] font-semibold text-white/90">{children}</p>
  </Card>
);

/* ═══════════════════════════════════════════════════ 1. LISTEN */
export function SceneScore() {
  const msgs = [
    ["Can we get clarity on the return-to-office policy?", "Chat · now"],
    ["Another weekend on-call — we can't keep shipping like this.", "Chat · 12m"],
    ["Onboarding docs are out of date again.", "Survey · 41m"],
  ];
  return (
    <Stage hue={TEAL} className="h-full">
      {/* Measured, not estimated. The quotes were nested in a flex-1 wrapper
          that resolved to 119px while its three cards needed 133, so the first
          one rode up over the channel stats. They are direct siblings now, and
          the spark is trimmed to 46px, which brings the column to 288 inside
          294 — justify-between then spreads the remaining 6px evenly instead of
          pooling it into one void. */}
      <div className="flex h-full flex-col justify-between gap-2">
        <Head title="Live signal" chip="38 today" tone="good" />
        <Card delay={110} className="h-[46px] shrink-0 px-3.5 py-1">
          <Spark data={[18, 26, 22, 34, 30, 41, 38]} />
        </Card>
        <Card delay={190} className="flex shrink-0 items-center justify-between px-3.5 py-1.5">
          {[["Chat", "1,640"], ["Survey", "620"], ["Feed", "412"], ["1:1s", "96"]].map(([k, v]) => (
            <span key={k} className="text-center">
              <span className="block text-[12.5px] font-bold leading-none tracking-[-0.02em] text-[#0d2f2a]">{v}</span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.08em] text-[#0d2f2a]/70">{k}</span>
            </span>
          ))}
        </Card>
        {msgs.map(([t, m], i) => (
          <Card key={i} sub delay={270 + i * 90} className="shrink-0 px-3.5 py-1.5">
            <p className="line-clamp-1 text-[11px] font-medium leading-snug text-white">&ldquo;{t}&rdquo;</p>
            <p className="text-[9.5px] leading-snug text-white/88">{m}</p>
          </Card>
        ))}
      </div>
    </Stage>
  );
}

/* ═══════════════════════════════════════════════ 2. UNDERSTAND */
export function SceneInsight() {
  const themes = [
    ["Workload & on-call", 72, "warn", "214 people · up 12 pts"],
    ["Career growth", 54, "calm", "168 people · flat"],
    ["Manager support", 38, "calm", "96 people · down 4 pts"],
    ["Tools & access", 24, "calm", "61 people · down 9 pts"],
  ] as const;
  return (
    <Stage hue={CYAN} className="h-full">
      <div className="flex h-full flex-col gap-2">
        <Head title="What&rsquo;s driving it" chip="4 themes" />
        <Card delay={110} className="flex min-h-0 flex-1 flex-col justify-between px-3.5 py-3">
          {themes.map(([name, pct, tone, sub], i) => (
            <Row key={name} delay={200 + i * 90}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11.5px] font-semibold text-[#0d2f2a]">{name}</span>
                <Chip tone={tone}>{pct}%</Chip>
              </div>
              <p className="mb-1.5 mt-0.5 text-[9.5px] text-[#0d2f2a]/72">{sub}</p>
              <Bar pct={pct} delay={320 + i * 90} />
            </Row>
          ))}
        </Card>
        <Foot delay={620}>Biggest mover: Workload &amp; on-call, +12 vs last month</Foot>
      </div>
    </Stage>
  );
}

/* ═════════════════════════════════════════════════════ 3. ACT */
export function SceneAction() {
  const plans = [
    ["Rebalance on-call rota", "Workload & on-call", "Due Fri", 100],
    ["Publish RTO decision", "Policy clarity", "Due 12 Jun", 100],
    ["Career ladder v2", "Career growth", "Due Q3", 45],
    ["Manager coaching cycle", "Manager support", "Due Q3", 20],
  ] as const;
  return (
    <Stage hue={INDIGO} className="h-full">
      <div className="flex h-full flex-col gap-2">
        <Head title="Action plan" chip="2 of 4 done" tone="good" />
        <Card delay={110} className="flex min-h-0 flex-1 flex-col justify-between px-3.5 py-3">
          {plans.map(([name, from, due, pct], i) => {
            const done = pct === 100;
            return (
              <Row key={name} delay={200 + i * 90} className="flex items-center gap-2.5">
                <span className={`grid h-[17px] w-[17px] shrink-0 place-items-center rounded-[5px] border ${
                  done ? "border-[#0d6b60] bg-[#0d6b60]" : "border-[#0d2f2a]/25"}`}>
                  {done && (
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M2 5.2 4 7.2 8 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[11.5px] font-semibold ${done ? "text-[#0d2f2a]/72 line-through" : "text-[#0d2f2a]"}`}>{name}</span>
                  <span className="mt-[3px] block truncate text-[9.5px] text-[#0d2f2a]/72">from {from}</span>
                  {!done && <span className="mt-1.5 block w-[76%]"><Bar pct={pct} delay={330 + i * 90} /></span>}
                </span>
                <Avatar i={i} />
                <span className="w-[54px] shrink-0 text-right text-[9.5px] font-semibold text-[#0d2f2a]/72">{due}</span>
              </Row>
            );
          })}
        </Card>
        <Foot delay={620}>Every plan traces back to the theme that raised it</Foot>
      </div>
    </Stage>
  );
}

/* ═══════════════════════════════════════════════════ 4. PROVE */
export function SceneImpact() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return (
    <Stage hue={VIOLET} className="h-full">
      <div className="flex h-full flex-col gap-2">
        <Card delay={0} className="flex shrink-0 items-center justify-between px-3.5 py-3">
          <Stat value="+18" unit="pts" label="eNPS vs baseline" />
          <div className="text-right">
            <Chip tone="good">above peer set</Chip>
            <p className="mt-1.5 text-[10px] text-[#0d2f2a]/72">peer median +6</p>
          </div>
        </Card>
        <Card delay={140} className="flex min-h-0 flex-1 flex-col px-3.5 py-3">
          <p className="mb-2 shrink-0 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#0d2f2a]/70">
            Six months since the on-call fix
          </p>
          <div className="min-h-0 flex-1"><Bars data={[26, 30, 28, 38, 47, 58]} hi={5} /></div>
          <div className="mt-1.5 flex shrink-0 justify-between">
            {months.map((m) => <span key={m} className="flex-1 text-center text-[9px] font-medium text-[#0d2f2a]/72">{m}</span>)}
          </div>
        </Card>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          <Card sub delay={560} className="px-3 py-2">
            <p className="text-[13px] font-bold leading-none text-white">−9%</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/78">regretted attrition</p>
          </Card>
          <Card sub delay={640} className="px-3 py-2">
            <p className="text-[13px] font-bold leading-none text-white">+11</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/78">manager score</p>
          </Card>
        </div>
      </div>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════ 5. LOOP */
export function SceneLoop() {
  const steps = [
    ["Listen", TEAL, 100, "2,768 signals"],
    ["Understand", CYAN, 100, "4 themes"],
    ["Act", INDIGO, 100, "4 plans owned"],
    ["Prove", VIOLET, 64, "measuring"],
  ] as const;
  return (
    <Stage hue={TEAL} className="h-full">
      <div className="flex h-full flex-col gap-2">
        <Head title="This quarter&rsquo;s loop" chip="Q2" />
        <Card delay={110} className="flex min-h-0 flex-1 flex-col justify-between px-3.5 py-3">
          {steps.map(([name, c, pct, sub], i) => (
            <Row key={name} delay={200 + i * 90} className="flex items-center gap-2.5">
              <span className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: c }} />
              <span className="min-w-0 flex-1">
                <span className="block text-[11.5px] font-semibold text-[#0d2f2a]">{name}</span>
                <span className="mt-[3px] block text-[9.5px] text-[#0d2f2a]/72">{sub}</span>
              </span>
              <span className="w-[74px] shrink-0"><Bar pct={pct} delay={320 + i * 90} /></span>
            </Row>
          ))}
        </Card>
        <Foot delay={620}>Impact becomes next month&rsquo;s score — a loop, not a report</Foot>
      </div>
    </Stage>
  );
}

export const LOOP_SCENES = {
  score: SceneScore,
  insight: SceneInsight,
  action: SceneAction,
  impact: SceneImpact,
  loop: SceneLoop,
} as const;
