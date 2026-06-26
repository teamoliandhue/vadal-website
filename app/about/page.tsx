import type { Metadata } from "next";
import { Button, Container, Eyebrow, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { type IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vadal exists to keep companies human at scale — an engagement OS for the whole workforce, especially the people who don't sit at a desk.",
};

const values: { t: string; d: string; icon: IconName }[] = [
  { t: "Human first", d: "We design for the cleaner, the cashier, the driver — not just head office. If it doesn't work for the frontline, it doesn't ship.", icon: "heart" },
  { t: "Outcomes over features", d: "We measure ourselves by engagement that actually moves, not by the length of a feature list.", icon: "chart" },
  { t: "Clarity, always", d: "Plain language, honest metrics, no jargon walls. Intelligence everyone can use.", icon: "spark" },
  { t: "Earned trust", d: "Security and anonymity aren't add-ons. People speak freely because we protect them by design.", icon: "shield" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash animate-aurora pointer-events-none absolute inset-0 -z-10" />
        <Container className="pt-16 pb-12 text-center sm:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <Pill aurora><SparkMark size={14} /> Human pulse × Daily ritual</Pill>
            <h1 className="display-xl font-extrabold">
              Keep companies <span className="aurora-text">human</span>, at scale
            </h1>
            <p className="max-w-xl text-[18px] leading-relaxed text-[var(--muted)]">
              Most engagement tools are built for the desk. We built Vadal for everyone else —
              the millions of people who keep the world running with a phone in their pocket and
              no corporate inbox in sight.
            </p>
          </div>
        </Container>
      </section>

      {/* mission */}
      <Section tone="surface">
        <Container size="narrow">
          <div className="space-y-6 text-[18px] leading-relaxed text-[var(--foreground)]">
            <p>
              When people feel informed, recognised and heard, they do their best work — and
              they stay. But on the frontline, that&apos;s exactly where the tools fall short.
              Updates don&apos;t land. Training never gets finished. Feedback disappears. And
              leaders are left guessing.
            </p>
            <p className="text-[var(--muted)]">
              Vadal is the engagement operating system that closes that gap. One warm,
              mobile-first app brings communication, training, culture, onboarding and tasks
              together — and gives leaders the analytics and AI to act on what they learn. We
              don&apos;t just help you <i>measure</i> engagement. We help you <b>drive</b> it.
            </p>
          </div>

          <div className="mt-10 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-7">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">The spine of everything we build</p>
            <p className="mt-3 text-[22px] font-extrabold sm:text-[26px]">
              Score <span className="text-[var(--muted-2)]">→</span> Insight{" "}
              <span className="text-[var(--muted-2)]">→</span> Action{" "}
              <span className="text-[var(--muted-2)]">→</span>{" "}
              <span className="aurora-text">Impact</span>
            </p>
          </div>
        </Container>
      </Section>

      {/* values */}
      <Section tone="base">
        <Container>
          <SectionHead eyebrow="What we believe" title="The principles behind the product" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.t} className="flex gap-4 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)]">
                  <Icon name={v.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-[17px] font-bold">{v.t}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--muted)]">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* careers + partners */}
      <Section tone="surface">
        <Container className="grid gap-5 md:grid-cols-2">
          <div id="careers" className="scroll-mt-24 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-8">
            <Eyebrow>Careers</Eyebrow>
            <h2 className="mt-3 text-[24px] font-extrabold">Build the human side of work</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
              We&apos;re a small, craft-obsessed team building for a huge, underserved audience.
              If that sounds like your kind of problem, hit us up.
            </p>
            <div className="mt-6"><Button href="/contact" variant="secondary" icon>Get in touch</Button></div>
          </div>
          <div id="partners" className="scroll-mt-24 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-8">
            <Eyebrow>Partners</Eyebrow>
            <h2 className="mt-3 text-[24px] font-extrabold">Grow with Vadal</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
              Consultancies, resellers and HRMS platforms — let&apos;s bring better engagement to
              more frontline teams together.
            </p>
            <div className="mt-6"><Button href="/contact" variant="ghost" icon>Become a partner</Button></div>
          </div>
        </Container>
      </Section>

      {/* locations */}
      <Section tone="base">
        <Container>
          <SectionHead eyebrow="Locations" title="Where to find us" lede="Addresses below are illustrative samples." />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { city: "Bengaluru", note: "HQ · India" },
              { city: "Mumbai", note: "India" },
              { city: "London", note: "United Kingdom" },
            ].map((l) => (
              <div key={l.city} className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 text-center">
                <Icon name="globe" size={22} className="mx-auto text-[var(--brand)]" />
                <p className="mt-3 text-[17px] font-bold">{l.city}</p>
                <p className="text-[13px] text-[var(--muted)]">{l.note}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
