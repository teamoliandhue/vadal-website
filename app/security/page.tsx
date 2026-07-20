import type { Metadata } from "next";
import { Button, Container, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { type IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Vadal.ai protects your people data, encryption, SSO/SCIM, role-based access, anonymity min-N gating and privacy by design.",
};

const controls: { t: string; d: string; icon: IconName }[] = [
  { t: "Encrypted in transit & at rest", d: "TLS everywhere and encryption at rest, so data is protected on the wire and on disk.", icon: "lock" },
  { t: "SSO & SCIM", d: "Single sign-on and automated provisioning with your identity provider, joiners and leavers handled for you.", icon: "users" },
  { t: "Role-based access", d: "Granular roles and permissions, with audit trails on sensitive actions.", icon: "shield" },
  { t: "Anonymity by design", d: "Survey and sentiment results are min-N gated, so individuals can never be identified. People speak freely.", icon: "heart" },
  { t: "Data residency options", d: "Choose where your data lives to meet regional and contractual requirements.", icon: "globe" },
  { t: "Reliability", d: "Monitored infrastructure with backups and a tested recovery plan.", icon: "checks" },
];

export default function SecurityPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <Pill><Icon name="shield" size={14} className="text-[var(--brand)]" /> Trust & security</Pill>
            <h1 className="display-lg font-extrabold">Security your people can count on</h1>
            <p className="max-w-xl text-[18px] leading-relaxed text-[var(--muted)]">
              Engagement only works when people trust the platform. Vadal is built to enterprise
              standards, and anonymity is protected by design, so honesty is safe.
            </p>
            <p className="text-[12px] text-[var(--muted-2)]">
              Specific certifications and standards below are illustrative; confirm Vadal&apos;s
              current attestations before publishing.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="surface" className="!pt-10">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {controls.map((c) => (
              <div key={c.t} className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6">
                <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)]">
                  <Icon name={c.icon} size={22} />
                </span>
                <h3 className="mt-4 text-[16px] font-bold">{c.t}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--muted)]">{c.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="base">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["SOC 2 (sample)", "ISO 27001 (sample)", "GDPR-ready", "SSO / SAML", "SCIM", "Min-N anonymity"].map((b) => (
              <span key={b} className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-[13px] font-semibold text-[var(--muted)]">
                {b}
              </span>
            ))}
          </div>
          <div className="mt-10 text-center"><Button href="/demo" size="lg" icon>Talk to us about security</Button></div>
        </Container>
      </Section>
    </>
  );
}
