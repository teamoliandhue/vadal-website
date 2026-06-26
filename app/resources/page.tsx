import type { Metadata } from "next";
import { Container, Pill, Section, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { NewsletterForm } from "@/components/NewsletterForm";
import { type IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, blog posts, webinars and templates on employee engagement, internal communication and the deskless workforce.",
};

const categories: { t: string; icon: IconName }[] = [
  { t: "Blog", icon: "broadcast" },
  { t: "Guides & ebooks", icon: "graduation" },
  { t: "Webinars", icon: "play" },
  { t: "Templates", icon: "checks" },
];

const featured = [
  { tag: "Guide", title: "The frontline engagement playbook", read: "18 min read", icon: "rocket" as IconName },
  { tag: "Ebook", title: "Optimising employee lifetime value", read: "Download", icon: "chart" as IconName },
  { tag: "Webinar", title: "Reaching the deskless 80% of your workforce", read: "42 min", icon: "play" as IconName },
];

const posts = [
  "Why employee communications fail — and 5 ways to fix them",
  "Onboarding that starts before day one",
  "Pulse surveys vs. annual surveys: what frontline teams need",
  "Building a recognition habit across shifts",
  "The internal comms content calendar, explained",
  "Turning engagement scores into manager action",
];

export default function ResourcesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <Container className="pt-16 pb-10 text-center sm:pt-24">
          <SectionHead
            eyebrow="Resources"
            title="Ideas for engaging the whole workforce"
            lede="Practical guides, research and templates for people teams building a better frontline experience. Sample content shown."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <span key={c.t} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-[13px] font-semibold text-[var(--muted)]">
                <Icon name={c.icon} size={15} className="text-[var(--brand)]" /> {c.t}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <Section tone="surface" className="!pt-10">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((f) => (
              <div key={f.title} className="flex flex-col gap-4 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-7">
                <div className="flex items-center justify-between">
                  <Pill>{f.tag}</Pill>
                  <Icon name={f.icon} size={22} className="text-[var(--brand)]" />
                </div>
                <h3 className="text-[19px] font-bold leading-snug">{f.title}</h3>
                <span className="mt-auto text-[13px] font-semibold text-[var(--muted-2)]">{f.read} · sample</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="base">
        <Container>
          <SectionHead eyebrow="From the blog" title="Latest reads" align="left" />
          <div className="mt-8 divide-y divide-[var(--line)] rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)]">
            {posts.map((p) => (
              <div key={p} className="flex items-center justify-between gap-4 px-6 py-5">
                <span className="text-[16px] font-semibold">{p}</span>
                <span className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--muted-2)]">Sample</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--card)] p-8 text-center sm:p-12">
            <h2 className="display-md mx-auto max-w-lg font-extrabold">Get engagement ideas in your inbox</h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-[var(--muted)]">No spam — just the occasional useful thing for people teams.</p>
            <NewsletterForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
