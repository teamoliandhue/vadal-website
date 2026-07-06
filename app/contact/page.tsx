import type { Metadata } from "next";
import { Button, Container, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { type IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Vadal.ai team — sales, support, partnerships or press.",
};

const channels: { t: string; d: string; cta: string; href: string; icon: IconName }[] = [
  { t: "Talk to sales", d: "See Vadal on your use case with a tailored walkthrough.", cta: "Book a demo", href: "/demo", icon: "broadcast" },
  { t: "Get support", d: "Already a customer? Reach our team or browse 200+ help articles.", cta: "Visit help centre", href: "/resources", icon: "lifebuoy" },
  { t: "Partnerships", d: "Consultancies, resellers and HRMS platforms — let's talk.", cta: "Become a partner", href: "/about#partners", icon: "plug" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <SectionHead
            eyebrow="Contact"
            title="Let's talk"
            lede="Whatever you need — a demo, a hand, or a partnership — we'll point you to the right person fast."
          />
        </Container>
      </section>

      <Section tone="surface" className="!pt-10">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {channels.map((c) => (
              <div key={c.t} className="flex flex-col gap-4 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-7">
                <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[var(--brand-tint)] text-[var(--brand)]">
                  <Icon name={c.icon} size={24} />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold">{c.t}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--muted)]">{c.d}</p>
                </div>
                <div className="mt-auto"><Button href={c.href} variant="secondary" icon>{c.cta}</Button></div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { l: "General", v: "hello@vadal.ai" },
              { l: "Support", v: "support@vadal.ai" },
              { l: "Press", v: "press@vadal.ai" },
            ].map((e) => (
              <div key={e.l} className="rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--card)] p-5">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">{e.l}</p>
                <p className="mt-2 text-[15px] font-semibold text-[var(--brand)]">{e.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-[12px] text-[var(--muted-2)]">Contact details shown are illustrative samples.</p>
        </Container>
      </Section>

      <Section tone="base">
        <Container>
          <div className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--surface)] p-8 text-center sm:p-14">
            <Pill className="mx-auto">Prefer to see it live?</Pill>
            <h2 className="display-md mx-auto mt-4 max-w-xl font-extrabold">
              Book a personalised demo and we&apos;ll tailor it to your industry
            </h2>
            <div className="mt-7 flex justify-center"><Button href="/demo" size="lg" icon>Book a free demo</Button></div>
          </div>
        </Container>
      </Section>
    </>
  );
}
