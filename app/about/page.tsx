import type { Metadata } from "next";
import { Button, Container, Eyebrow, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SparkMark } from "@/components/Brand";
import { type IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vadal.ai exists so every workforce decision is a confident one — AI-powered engagement, intelligence and action for every leader and every employee.",
};

const values: { t: string; d: string; icon: IconName }[] = [
  { t: "Every voice counts", d: "We design for the cleaner, the cashier and the CHRO alike. If a voice can't reach the platform, the intelligence is incomplete.", icon: "heart" },
  { t: "Decisions over dashboards", d: "We measure ourselves by the decisions our intelligence improves, not by the length of a feature list.", icon: "chart" },
  { t: "Clarity, always", d: "Plain language, honest metrics, explainable AI. Intelligence everyone can use — and verify.", icon: "spark" },
  { t: "Earned trust", d: "Security and anonymity aren't add-ons. People speak freely because we protect them by design.", icon: "shield" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash animate-aurora pointer-events-none absolute inset-0 -z-10" />
        <Container className="pt-16 pb-12 text-center sm:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <Pill aurora><SparkMark size={14} /> Go beyond engagement</Pill>
            <h1 className="display-xl font-extrabold">
              Every voice heard.
              <br />Every decision <span className="aurora-text">confident</span>.
            </h1>
            <p className="max-w-xl text-[18px] leading-relaxed text-[var(--muted)]">
              Most tools stop at measuring how people feel. We built Vadal.ai to go further —
              unifying workforce, talent and organizational data into intelligence that leaders
              can actually act on, for every employee from the frontline to the boardroom.
            </p>
          </div>
        </Container>
      </section>

      {/* team photo band */}
      <Container className="pb-6">
        <figure className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line)] shadow-[var(--shadow-lg)]">
          <img
            src="/people/team-collab.webp"
            alt="The Vadal.ai team collaborating in the office"
            className="aspect-[16/10] w-full object-cover sm:aspect-[2.4/1]"
            loading="lazy"
          />
        </figure>
      </Container>

      {/* mission */}
      <Section tone="surface">
        <Container size="narrow">
          <div className="space-y-6 text-[18px] leading-relaxed text-[var(--foreground)]">
            <p>
              When people feel informed, recognised and heard, they do their best work — and
              they stay. But in most organizations, feedback disappears into annual reports,
              analytics live in silos, and by the time leaders see a problem, it has already
              become attrition.
            </p>
            <p className="text-[var(--muted)]">
              Vadal.ai closes that gap. One AI-powered platform brings engagement surveys,
              continuous listening, people analytics and action planning together — and turns
              what your workforce is telling you into decisions leaders can stand behind. We
              don&apos;t just help you <i>measure</i> engagement. We help you <b>lead</b> with it.
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
            <h2 className="mt-3 text-[24px] font-extrabold">Build the intelligent side of work</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
              We&apos;re a small, craft-obsessed team building AI that makes work better for
              millions of people. If that sounds like your kind of problem, hit us up.
            </p>
            <div className="mt-6"><Button href="/contact" variant="secondary" icon>Get in touch</Button></div>
          </div>
          <div id="partners" className="scroll-mt-24 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--card)] p-8">
            <Eyebrow>Partners</Eyebrow>
            <h2 className="mt-3 text-[24px] font-extrabold">Grow with Vadal.ai</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
              Consultancies, resellers and HRMS platforms — let&apos;s bring workforce
              intelligence to more organizations together.
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
