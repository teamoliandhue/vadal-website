import { Container } from "./ui";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="relative">
      <div className="aurora-wash pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-60" />
      <Container size="narrow" className="py-16 sm:py-24">
        <p className="eyebrow">Legal</p>
        <h1 className="display-md mt-3 font-extrabold">{title}</h1>
        <p className="mt-3 text-[13px] text-[var(--muted-2)]">Last updated {updated}</p>

        <div className="mt-6 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface)] p-4 text-[13px] leading-relaxed text-[var(--muted)]">
          This is template legal copy created for the Vadal website build. Replace it with
          counsel-reviewed text before launch.
        </div>

        <p className="mt-8 text-[17px] leading-relaxed text-[var(--muted)]">{intro}</p>

        <div className="mt-10 space-y-9">
          {sections.map((s, i) => (
            <div key={s.heading}>
              <h2 className="text-[20px] font-bold">
                <span className="mr-2 text-[var(--muted-2)]">{i + 1}.</span>
                {s.heading}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
