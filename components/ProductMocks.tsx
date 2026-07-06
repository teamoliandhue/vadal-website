import { SparkMark } from "./Brand";
import { Icon } from "./Icon";

/* ============================================================================
   In-browser mockups of the Vadal product (demo tenant: "oliandhue").
   Built from the design tokens rather than stock screenshots, so the brand
   reads 1:1. Decorative — marked aria-hidden.
   ========================================================================== */

/* The branded employee app — the home screen of the workday. */
export function PhoneMock({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="relative w-[266px] rounded-[42px] border border-[var(--line)] bg-[var(--ink-deep)] p-[10px] shadow-[var(--shadow-lg)]">
        <div className="overflow-hidden rounded-[33px] bg-[var(--surface)]">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold text-[var(--foreground)]">
            <span>9:41</span>
            <span className="flex items-center gap-1 opacity-70">
              <span>oliandhue</span>
            </span>
          </div>

          {/* greeting */}
          <div className="px-4 pt-2">
            <p className="text-[11px] font-semibold text-[var(--muted)]">Good morning,</p>
            <p className="text-[18px] font-extrabold leading-tight text-[var(--foreground)]">Aanya 👋</p>
          </div>

          {/* mood check */}
          <div className="mx-4 mt-3 rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-3">
            <p className="text-[11px] font-semibold text-[var(--foreground)]">How are you feeling today?</p>
            <div className="mt-2 flex justify-between text-[16px]">
              <span>😕</span><span>🙂</span>
              <span className="grid h-7 w-7 -translate-y-0.5 place-items-center rounded-full bg-[var(--brand)] text-[13px]">😄</span>
              <span>😍</span><span>🤩</span>
            </div>
          </div>

          {/* Ask AI card — Aurora = intelligence */}
          <div className="mx-4 mt-3 rounded-[16px] p-[1.5px]" style={{ background: "var(--aurora)" }}>
            <div className="rounded-[15px] bg-[var(--card)] p-3">
              <div className="flex items-center gap-1.5">
                <SparkMark size={14} />
                <span className="aurora-text text-[11px] font-bold">Ask Vadal</span>
              </div>
              <p className="mt-1.5 text-[11px] leading-snug text-[var(--muted)]">
                &ldquo;What&apos;s changed for my team this week?&rdquo;
              </p>
            </div>
          </div>

          {/* quick poll */}
          <div className="mx-4 mt-3 rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-3">
            <p className="text-[11px] font-bold text-[var(--foreground)]">Quick poll · Friday lunch?</p>
            <div className="mt-2 space-y-1.5">
              {[["Pizza", 62], ["Salad bar", 38]].map(([label, pct]) => (
                <div key={label as string} className="relative h-6 overflow-hidden rounded-full bg-[var(--surface)]">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-[var(--brand-tint-2)]" style={{ width: `${pct}%` }} />
                  <div className="absolute inset-0 flex items-center justify-between px-2.5 text-[10px] font-semibold">
                    <span className="text-[var(--foreground)]">{label}</span>
                    <span className="text-[var(--brand)]">{pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* recognition */}
          <div className="mx-4 my-3 flex items-center gap-2.5 rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[var(--spark)]/20 text-[15px]">🎉</div>
            <p className="text-[11px] leading-snug text-[var(--foreground)]">
              <b>Marcus</b> recognised you for <b className="text-[var(--brand)]">Team Player</b>
            </p>
          </div>

          {/* tab bar */}
          <div className="flex items-center justify-around border-t border-[var(--line)] bg-[var(--card)] px-2 py-2.5">
            {(["phone", "chat", "pulse", "users"] as const).map((n, i) => (
              <Icon key={n} name={n} size={18} className={i === 0 ? "text-[var(--brand)]" : "text-[var(--muted-2)]"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* A published company broadcast with live read-reach — comms "moment". */
export function BroadcastCard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-md ${className}`} aria-hidden="true">
      <div className="overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lg)]">
        <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-5 py-3.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
            <Icon name="broadcast" size={17} />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-bold leading-tight text-[var(--foreground)]">Internal Comms · HQ</p>
            <p className="text-[11px] text-[var(--muted)]">Sent to all sites · just now</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[var(--success)]/15 px-2.5 py-1 text-[11px] font-bold text-[#0a9c5b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" /> Delivered
          </span>
        </div>

        <div className="px-5 py-4">
          <p className="text-[15px] font-bold leading-snug text-[var(--foreground)]">
            🎉 The new shift app is live today
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">
            Swap shifts, see your rota and clock in — all from your phone. Tap below for the 2-min walkthrough.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#7c5cf8", "#23d7be", "#3b9eff", "#ff8a5b"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--card)] text-[10px] font-bold text-white"
                  style={{ background: c }}
                >
                  {["MJ", "AK", "RB", "PT"][i]}
                </span>
              ))}
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--card)] bg-[var(--surface-2)] text-[10px] font-bold text-[var(--muted)]">
                +2k
              </span>
            </div>
            <span className="text-[12px] font-semibold text-[var(--muted)]">1,980 read</span>
          </div>

          <div className="mt-3.5">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-[var(--muted)]">Read rate</span>
              <span className="text-[var(--foreground)]">94%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
              <div className="h-full rounded-full bg-[var(--brand)]" style={{ width: "94%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* A "voice of the frontline" photo card — recognition + sentiment overlay. */
export function VoiceCard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-md ${className}`} aria-hidden="true">
      <figure className="group relative overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--ink-deep)] shadow-[var(--shadow-lg)]">
        <img
          src="/people/frontline-portrait.jpg"
          alt=""
          className="h-[420px] w-full object-cover"
          loading="lazy"
        />
        {/* recognition chip */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[rgba(255,255,255,0.92)] px-3 py-1.5 text-[12px] font-bold text-[var(--foreground)] shadow-[var(--shadow-sm)] backdrop-blur">
          🎉 Recognised · Team Player
        </span>
        {/* bottom caption */}
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(13,11,22,0.9)] via-[rgba(13,11,22,0.35)] to-transparent px-5 pb-5 pt-16">
          <p className="text-[16px] font-bold text-white">Maya · Store 14</p>
          <p className="mt-0.5 text-[13px] text-white/80">“I finally feel like the floor has a voice.”</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" /> Mood: thriving
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <Icon name="heart" size={12} /> 4.9 wellbeing
            </span>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

/* A secure team-chat moment for the communication section. */
export function ChatMock({ className = "" }: { className?: string }) {
  const msgs = [
    { me: false, name: "Store 14", text: "Morning team — new window display goes live at 10am 🪟" },
    { me: true, name: "You", text: "On it. Photos in the channel when done 👍" },
    { me: false, name: "Priya", text: "Looks brilliant — nice work everyone!" },
  ];
  return (
    <div className={`mx-auto w-full max-w-sm rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-4 shadow-[var(--shadow-md)] ${className}`} aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
          <Icon name="users" size={16} />
        </span>
        <div>
          <p className="text-[13px] font-bold leading-none">Store Ops · West</p>
          <p className="mt-0.5 text-[11px] text-[var(--muted)]">28 members · secure</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-[#0a9c5b]">
          <Icon name="lock" size={12} /> E2E
        </span>
      </div>
      <div className="space-y-3 py-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] rounded-[14px] px-3.5 py-2 text-[13px] leading-snug ${
                m.me
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--surface)] text-[var(--foreground)]"
              }`}
            >
              {!m.me && <span className="mb-0.5 block text-[11px] font-bold text-[var(--muted)]">{m.name}</span>}
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-[13px] text-[var(--muted)]">
        Message Store Ops…
        <span className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-[var(--brand)] text-white">
          <Icon name="arrow" size={14} />
        </span>
      </div>
    </div>
  );
}

/* The analytics / Pulse dashboard with an Aurora "Ask Vadal" insight. */
export function DashboardMock({ className = "" }: { className?: string }) {
  const bars = [52, 64, 58, 71, 66, 78, 74, 83];
  const heat = [
    [3, 2, 3, 1],
    [2, 3, 3, 2],
    [3, 3, 2, 3],
    [1, 2, 3, 3],
  ];
  const heatColor = ["#f3d3d1", "#f7e6c9", "#cfe9d8", "#bfe8d4"];
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lg)]">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--surface)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex items-center gap-1.5 rounded-md bg-[var(--card)] px-3 py-1 text-[11px] text-[var(--muted)]">
            <Icon name="lock" size={11} /> app.vadal.ai/analytics
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Engagement score</p>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-[34px] font-extrabold leading-none text-[var(--foreground)]">78</span>
                <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[var(--success)]/15 px-2 py-0.5 text-[11px] font-bold text-[#0a9c5b]">
                  ▲ 6 pts
                </span>
              </div>
            </div>
            <div className="flex gap-1.5">
              <span className="rounded-md border border-[var(--line)] px-2.5 py-1 text-[11px] font-semibold text-[var(--muted)]">This quarter</span>
              <span className="rounded-md bg-[var(--brand-tint)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand)]">By site</span>
            </div>
          </div>

          {/* trend bars */}
          <div className="mt-5 flex h-24 items-end gap-2">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 rounded-t-md" style={{ height: `${b}%`, background: i === bars.length - 1 ? "var(--brand)" : "var(--brand-tint-2)" }} />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            {/* heatmap */}
            <div>
              <p className="text-[11px] font-bold text-[var(--foreground)]">Driver heatmap</p>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {heat.flat().map((v, i) => (
                  <span key={i} className="aspect-square rounded-[5px]" style={{ background: heatColor[v] }} />
                ))}
              </div>
            </div>
            {/* Ask Vadal AI insight — Aurora */}
            <div className="rounded-[14px] p-[1.5px]" style={{ background: "var(--aurora)" }}>
              <div className="h-full rounded-[13px] bg-[var(--card)] p-3">
                <div className="flex items-center gap-1.5">
                  <SparkMark size={14} />
                  <span className="aurora-text text-[11px] font-bold">Vadal AI</span>
                </div>
                <p className="mt-1.5 text-[11px] leading-snug text-[var(--muted)]">
                  Recognition is up <b className="text-[var(--foreground)]">3×</b> at North sites — the lift in your score traces straight back to it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
