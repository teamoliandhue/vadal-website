import { ProductShot } from "./ProductShot";
import { StoryArt, PLATE } from "./StoryArt";

/* ============================================================================
   Product visuals — the named surfaces of the product, as illustrations.

   These were real screenshots of the app build. The site no longer shows
   product UI, so each is now the archetype illustration for what that surface
   IS: analytics is a dashboard, sentiment a heatmap, campaigns a feed, Ask
   Vadal a conversation. The component names are unchanged so every existing
   usage site picks up the new visual without edits.
   ========================================================================== */

/* The branded employee app — a real mobile screen in a phone bezel. */
export function PhoneMock({ className = "" }: { className?: string; shot?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[266px] rounded-[42px] border border-[var(--line)] bg-[var(--ink-deep)] p-[10px] shadow-[var(--shadow-lg)]">
        <div className="aspect-[9/17] overflow-hidden rounded-[33px]" style={{ background: PLATE }}>
          <StoryArt archetype="mobile" />
        </div>
      </div>
    </div>
  );
}

/* People analytics / engagement dashboard. */
export function DashboardMock({ className = "" }: { className?: string }) {
  return <ProductShot shot={{ label: "Analytics", archetype: "dashboard" }} className={className} />;
}

/* Voice of the employee — continuous listening & sentiment. */
export function VoiceCard({ className = "" }: { className?: string }) {
  return <ProductShot shot={{ label: "Sentiment", archetype: "heatmap" }} className={className} />;
}

/* Company-wide communication & campaigns. */
export function BroadcastCard({ className = "" }: { className?: string }) {
  return <ProductShot shot={{ label: "Campaigns", archetype: "feed" }} className={className} />;
}

/* Ask Vadal — the AI knowledge assistant. */
export function ChatMock({ className = "" }: { className?: string }) {
  return <ProductShot shot={{ label: "Ask Vadal", archetype: "chat" }} className={className} />;
}
