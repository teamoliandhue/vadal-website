import { Stage, Card, Row, Stat, Bars, Spark, Chip, Bar, Toggle, Avatar } from "./ui-stage";

/* ============================================================================
   PlatformScenes — one product surface per platform layer, on its own stage.

   The banner band is short and wide, so each of these is ONE card, not a
   stack: at this height a second card leaves both too cramped to read. Colour
   follows the layer's stop on the aurora ramp, so scanning the six cards reads
   as the ramp from the human end to the intelligence end.
   ========================================================================== */

const TEAL = "#19c6b4", CYAN = "#22b8dd", BLUE = "#3b9eff",
      INDIGO = "#5c7cf9", VIOLET = "#7c5cf8", PLUM = "#8f5cf0";

/* ── 1. Workforce Experience ─ recognition landing in the feed ────────────── */
function SceneExperience() {
  return (
    <Stage hue={TEAL} className="h-full" pad="p-3.5">
      <Card delay={0} className="flex h-full flex-col justify-center gap-2 px-3.5 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-bold text-[#0d2f2a]">Wall of fame</span>
          <Chip tone="good">+250</Chip>
        </div>
        {[0, 1].map((i) => (
          <Row key={i} delay={170 + i * 120} className="flex items-center gap-2">
            <Avatar i={i} />
            <span className="flex-1 truncate text-[11px] font-semibold text-[#0d2f2a]">
              {["Rohan Mehta", "Sara Ahmed"][i]}
            </span>
            <span className="text-[10px] text-[#0d2f2a]/72">{["Ownership", "Craft"][i]}</span>
          </Row>
        ))}
      </Card>
    </Stage>
  );
}

/* ── 2. Engagement & Listening ─ the signal, live ─────────────────────────── */
function SceneListening() {
  return (
    <Stage hue={CYAN} className="h-full" pad="p-3.5">
      <Card delay={0} className="flex h-full flex-col px-3.5 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-bold text-[#0d2f2a]">Live signal</span>
          <Chip tone="good">38 today</Chip>
        </div>
        <div className="mt-2 min-h-0 flex-1"><Spark data={[18, 26, 22, 34, 30, 41, 38]} delay={280} /></div>
      </Card>
    </Stage>
  );
}

/* ── 3. Digital Workplace ─ the day, on a phone ───────────────────────────── */
function SceneWorkplace() {
  return (
    <Stage hue={BLUE} className="h-full" pad="p-3.5">
      <Card delay={0} className="flex h-full flex-col justify-center gap-2 px-3.5 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-bold text-[#0d2f2a]">Your day</span>
          <Chip>4 tasks</Chip>
        </div>
        {["Approve leave request", "Finish onboarding module"].map((t, i) => (
          <Row key={t} delay={170 + i * 120} className="flex items-center gap-2">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: i ? "#0d2f2a33" : "#0d6b60" }} />
            <span className="flex-1 truncate text-[11px] font-semibold text-[#0d2f2a]">{t}</span>
            <Toggle on={i === 0} />
          </Row>
        ))}
      </Card>
    </Stage>
  );
}

/* ── 4. Talent Intelligence ─ flight risk, before it lands ────────────────── */
function SceneTalent() {
  return (
    <Stage hue={INDIGO} className="h-full" pad="p-3.5">
      <Card delay={0} className="flex h-full items-center gap-3.5 px-3.5 py-3">
        <Stat value="12" label="at flight risk" />
        <div className="min-h-0 flex-1 self-stretch py-1">
          <Bars data={[22, 26, 21, 30, 25, 18, 12]} hi={6} />
        </div>
      </Card>
    </Stage>
  );
}

/* ── 5. Enterprise AI Platform ─ every source, one permission model ───────── */
function SceneEnterprise() {
  return (
    <Stage hue={VIOLET} className="h-full" pad="p-3.5">
      <Card delay={0} className="flex h-full flex-col justify-center gap-2 px-3.5 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-bold text-[#0d2f2a]">Connected sources</span>
          <Chip tone="good">SSO on</Chip>
        </div>
        {[["Workday", 100], ["Slack", 100], ["Okta", 72]].map(([n, p], i) => (
          <Row key={n as string} delay={170 + i * 110} className="flex items-center gap-2.5">
            <span className="w-[52px] shrink-0 text-[10.5px] font-semibold text-[#0d2f2a]">{n}</span>
            <span className="flex-1"><Bar pct={p as number} delay={280 + i * 110} /></span>
          </Row>
        ))}
      </Card>
    </Stage>
  );
}

/* ── 6. Workforce Intelligence ─ the read the board asks for ──────────────── */
function SceneIntelligence() {
  return (
    <Stage hue={PLUM} className="h-full" pad="p-3.5">
      <Card delay={0} className="flex h-full items-center gap-3.5 px-3.5 py-3">
        <Stat value="+18" unit="pts" label="eNPS vs baseline" />
        <div className="min-h-0 flex-1 self-stretch py-1">
          <Spark data={[26, 30, 28, 38, 47, 58]} delay={260} />
        </div>
      </Card>
    </Stage>
  );
}

export const PLATFORM_SCENES: Record<string, () => React.ReactNode> = {
  "workforce-experience": SceneExperience,
  "ai-engagement": SceneListening,
  "digital-workplace": SceneWorkplace,
  "talent-intelligence": SceneTalent,
  "enterprise-platform": SceneEnterprise,
  "decision-intelligence": SceneIntelligence,
};
