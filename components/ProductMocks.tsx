import { ProductShot } from "./ProductShot";

/* ============================================================================
   Product visuals — REAL screenshots of the Vadal product (vadal.vercel.app,
   light "lite" mode), replacing the earlier hand-coded mockups. The component
   names are kept so every existing usage site picks up the real screens.

   - Desktop screens are framed in browser chrome via <ProductShot>.
   - PhoneMock frames a real mobile capture in a device bezel.
   Regenerate captures with scratchpad/capture-mobile.mjs (Playwright, light +
   reduced-motion) and the desktop shots with the original capture-shots.mjs.
   ========================================================================== */

/* The branded employee app — a real mobile screen in a phone bezel. */
export function PhoneMock({
  className = "",
  shot = "mobile-home",
}: {
  className?: string;
  shot?: "mobile-home" | "mobile-recognition" | "mobile-pulse";
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[266px] rounded-[42px] border border-[var(--line)] bg-[var(--ink-deep)] p-[10px] shadow-[var(--shadow-lg)]">
        <div className="overflow-hidden rounded-[33px] bg-[var(--surface)]">
          <img
            src={`/product/${shot}.webp`}
            alt="The Vadal.ai mobile app home screen"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

/* People analytics / engagement dashboard. */
export function DashboardMock({ className = "" }: { className?: string }) {
  return <ProductShot shot={{ file: "analytics", label: "Analytics" }} className={className} />;
}

/* Voice of the employee — continuous listening & sentiment. */
export function VoiceCard({ className = "" }: { className?: string }) {
  return <ProductShot shot={{ file: "sentiment", label: "Sentiment" }} className={className} />;
}

/* Company-wide communication & campaigns. */
export function BroadcastCard({ className = "" }: { className?: string }) {
  return <ProductShot shot={{ file: "campaigns", label: "Campaigns" }} className={className} />;
}

/* Ask Vadal — the AI knowledge assistant. */
export function ChatMock({ className = "" }: { className?: string }) {
  return <ProductShot shot={{ file: "knowledge", label: "Ask Vadal" }} className={className} />;
}
