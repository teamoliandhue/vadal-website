import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { DemoForm } from "@/components/DemoForm";
import { sampleCustomers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "See Vadal.ai on your own use case. Book a personalised demo and we'll tailor it to your industry — retail, facilities, finance, hospitality, manufacturing or logistics.",
};

const points = [
  { t: "Tailored to your industry", d: "We'll shape the demo around your organization, not a generic script." },
  { t: "See the AI on real questions", d: "Watch the Vadal.ai copilot answer the things your leaders actually ask." },
  { t: "A clear rollout plan", d: "Leave knowing exactly how a 5-week implementation would run for you." },
];

export default function DemoPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
      <Container className="grid items-start gap-12 pt-16 pb-24 sm:pt-20 lg:grid-cols-2 lg:gap-16">
        {/* left: value */}
        <div className="lg:pt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[12px] font-bold text-[var(--brand)]">
            <SparkMark size={14} /> Book a free demo
          </span>
          <h1 className="display-lg mt-5 font-extrabold">
            See your workforce intelligence, live on a real demo
          </h1>
          <p className="mt-5 max-w-md text-[18px] leading-relaxed text-[var(--muted)]">
            AI-powered surveys, predictive analytics and action planning — the whole loop, on
            your use case. Fill out the form and we&apos;ll get in touch within 24 hours.
          </p>

          <ul className="mt-9 space-y-5">
            {points.map((p) => (
              <li key={p.t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
                  <Icon name="check" size={18} strokeWidth={2.4} />
                </span>
                <div>
                  <p className="text-[16px] font-bold">{p.t}</p>
                  <p className="text-[14px] leading-relaxed text-[var(--muted)]">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-[var(--line)] pt-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-2)]">
              Trusted by people teams worldwide
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {sampleCustomers.slice(0, 5).map((c) => (
                <span key={c} className="text-[14px] font-bold text-[var(--muted)]">{c}</span>
              ))}
            </div>
            <p className="mt-3 text-[12px] text-[var(--muted-2)]">Company names shown are illustrative samples.</p>
          </div>
        </div>

        {/* right: form */}
        <div className="lg:sticky lg:top-24">
          <DemoForm />
        </div>
      </Container>
    </section>
  );
}
