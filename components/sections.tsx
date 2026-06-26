import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { Button, CheckItem, Container, Eyebrow } from "./ui";
import {
  sampleCustomers,
  solutionsNav,
  type IconName,
  type Testimonial,
} from "@/lib/content";

/* --------------------------------------------------------- Logo marquee */
function LogoChip({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 px-7">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--surface-2)] text-[var(--muted)]">
        <Icon name="globe" size={15} />
      </span>
      <span className="whitespace-nowrap text-[15px] font-bold tracking-[-0.01em] text-[var(--muted)]">
        {name}
      </span>
    </div>
  );
}

export function LogoMarquee({ label }: { label?: string }) {
  return (
    <div className="w-full">
      {label && (
        <p className="mb-7 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-2)]">
          {label}
        </p>
      )}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="marquee-track flex animate-marquee hover:[animation-play-state:paused]">
          {[...sampleCustomers, ...sampleCustomers].map((c, i) => (
            <LogoChip key={i} name={c} />
          ))}
        </div>
      </div>
      <p className="mt-5 text-center text-[12px] text-[var(--muted-2)]">
        Company names shown are illustrative samples.
      </p>
    </div>
  );
}

/* --------------------------------------------------------- Solution grid */
export function SolutionGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {solutionsNav.map((s, i) => (
        <Link
          key={s.slug}
          href={`/solutions/${s.slug}`}
          className="group relative flex flex-col gap-4 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
        >
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--brand-tint)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative grid h-12 w-12 place-items-center rounded-[14px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
            <Icon name={s.icon} size={24} />
          </span>
          <div className="relative">
            <h3 className="text-[18px] font-bold text-[var(--foreground)]">{s.name}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{s.blurb}</p>
          </div>
          <span className="relative mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--brand)]">
            Explore
            <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}

/* --------------------------------------------- Solutions panel (Maze-style) */
export function SolutionsPanel() {
  return (
    <Container>
      <div
        className="relative overflow-hidden rounded-[32px] p-5 sm:p-10"
        style={{
          backgroundColor: "#2978F0",
          backgroundImage: "url('/textures/crowd-blue.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* depth — a soft top highlight and a gentle bottom shade over the halftone */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(120% 75% at 50% -8%, rgba(255,255,255,0.24), transparent 55%), linear-gradient(180deg, transparent 58%, rgba(8,30,78,0.22))",
          }}
        />

        <div className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(2rem,1.1rem+2.6vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
              The key areas Vadal helps you succeed in
            </h2>
            <div className="mt-5 flex justify-center">
              <Button href="/platform" variant="dark" size="lg" icon>
                Explore the platform
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
            {solutionsNav.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group flex flex-col gap-2.5 rounded-[var(--r-lg)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              >
                <span className="inline-flex items-center gap-2 self-start rounded-md border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-[2px]" style={{ background: "#FF8A5B" }} />
                  {s.name}
                </span>
                <p className="text-[14px] leading-relaxed text-[var(--muted)]">{s.detail}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-0.5 text-[13px] font-semibold text-[var(--brand)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  Explore <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------ Stat band */
export function StatBand({
  stats,
  note,
}: {
  stats: { value: string; label: string }[];
  note?: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="aurora-text text-[clamp(2.4rem,1.6rem+2.5vw,3.4rem)] font-extrabold leading-none tracking-[-0.03em]">
              {s.value}
            </div>
            <p className="mx-auto mt-3 max-w-[180px] text-[14px] leading-snug text-[var(--muted)]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-10 text-center text-[12px] text-[var(--muted-2)]">{note}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------ Result cards (Paraform) */
/* One image-backed card per data point — brand mark + tag top-left, big plain
   number bottom-left, short description beneath it. Backgrounds alternate
   pale (dark text) and deep (white text). The grid is driven by the data:
   N cards, laid out in a single row on desktop. */
type ResultStat = { value: string; label: string; tag?: string };

const RESULT_BG = [
  { img: "result-cool", dark: false },
  { img: "result-aurora", dark: true },
  { img: "result-warm", dark: false },
  { img: "result-indigo", dark: true },
];

export function ResultCards({
  stats,
  note,
}: {
  stats: ResultStat[];
  note?: string;
}) {
  const n = stats.length;
  const cols =
    n >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : n === 3
        ? "sm:grid-cols-3"
        : n === 2
          ? "sm:grid-cols-2"
          : "";

  return (
    <div>
      <div className={`grid grid-cols-1 gap-4 sm:gap-5 ${cols}`} data-reveal-stagger>
        {stats.map((s, i) => {
          const t = RESULT_BG[i % RESULT_BG.length];
          return (
            <div
              key={s.label}
              className="group relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[var(--r-2xl)] p-7 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
            >
              {/* background image + legibility scrim (ordered by DOM, not z-index) */}
              <img
                src={`/textures/${t.img}.webp`}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className={`absolute inset-0 ${
                  t.dark
                    ? "bg-gradient-to-t from-black/55 via-black/10 to-black/5"
                    : "bg-gradient-to-t from-white/60 via-white/5 to-white/10"
                }`}
              />

              {/* top-left: brand mark + category tag (the "logo" slot) */}
              <div className="relative flex items-center gap-2">
                <SparkMark size={16} />
                {s.tag && (
                  <span
                    className={`text-[12px] font-bold uppercase tracking-[0.13em] ${
                      t.dark ? "text-white/85" : "text-[var(--ink-deep)]/70"
                    }`}
                  >
                    {s.tag}
                  </span>
                )}
              </div>

              {/* bottom-left: big number + description */}
              <div className="relative">
                <div
                  className={`text-[clamp(2.6rem,1.9rem+2.2vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.03em] ${
                    t.dark ? "text-white" : "text-[var(--ink-deep)]"
                  }`}
                >
                  {s.value}
                </div>
                <p
                  className={`mt-3.5 max-w-[15rem] text-[15px] leading-snug ${
                    t.dark ? "text-white/80" : "text-[var(--ink-deep)]/75"
                  }`}
                >
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {note && (
        <p className="mt-8 text-center text-[12px] text-[var(--muted-2)]">{note}</p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------- Feature row */
/* A Maze-style colored "stage" — the product mock floats inside a rounded,
   bordered panel with a halftone dot texture that thins toward the centre.
   Tones map to brand surfaces (Aurora = intelligence). */
export type PanelTone = "violet" | "blue" | "spark" | "aurora";

const PANEL_TONES: Record<PanelTone, { bg: string; dot: string }> = {
  violet: { bg: "#7c5cf8", dot: "rgba(255,255,255,0.20)" },
  blue: { bg: "#46abfb", dot: "rgba(255,255,255,0.22)" },
  spark: { bg: "#ff8a5b", dot: "rgba(255,255,255,0.24)" },
  aurora: { bg: "var(--aurora)", dot: "rgba(255,255,255,0.18)" },
};

export function PanelStage({
  tone = "violet",
  children,
  className = "",
}: {
  tone?: PanelTone;
  children: ReactNode;
  className?: string;
}) {
  const t = PANEL_TONES[tone];
  return (
    <div
      className={`relative isolate overflow-hidden rounded-[var(--r-2xl)] p-6 sm:p-8 lg:p-10 ${className}`}
      style={{ background: t.bg }}
    >
      {/* halftone dots — dense at the edges, clearing toward the centre card */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(${t.dot} 1.4px, transparent 1.6px)`,
          backgroundSize: "13px 13px",
          maskImage: "radial-gradient(115% 115% at 50% 50%, transparent 36%, #000 100%)",
          WebkitMaskImage: "radial-gradient(115% 115% at 50% 50%, transparent 36%, #000 100%)",
        }}
      />
      {/* soft top sheen for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white/15 to-transparent" aria-hidden="true" />
      <div className="flex justify-center">{children}</div>
    </div>
  );
}

export function FeatureRow({
  eyebrow,
  title,
  body,
  bullets,
  ctaLabel,
  ctaHref,
  visual,
  reverse = false,
  aurora = false,
  panelTone,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  visual: ReactNode;
  reverse?: boolean;
  aurora?: boolean;
  panelTone?: PanelTone;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <Eyebrow aurora={aurora}>{eyebrow}</Eyebrow>
        <h3 className="display-md mt-3 font-extrabold">{title}</h3>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[var(--muted)]">{body}</p>
        {bullets && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <CheckItem key={b}>{b}</CheckItem>
            ))}
          </ul>
        )}
        {ctaLabel && (
          <div className="mt-8">
            <Button href={ctaHref || "#"} variant="secondary" icon>
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
      <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
        {panelTone ? (
          <PanelStage tone={panelTone}>{visual}</PanelStage>
        ) : (
          <>
            <div className="aurora-wash pointer-events-none absolute -inset-6 -z-10 rounded-[var(--r-2xl)] opacity-70" />
            {visual}
          </>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- Testimonials */
export function TestimonialCard({ t, featured = false }: { t: Testimonial; featured?: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col gap-5 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)] ${
        featured ? "shadow-[var(--shadow-md)]" : ""
      }`}
    >
      <SparkMark size={20} className="opacity-90" />
      <blockquote className="text-[16px] leading-relaxed text-[var(--foreground)] text-pretty">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-[var(--line)] pt-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--brand-tint)] text-[13px] font-bold text-[var(--brand)]">
          {t.initials}
        </span>
        <span>
          <span className="block text-[14px] font-bold text-[var(--foreground)]">{t.name}</span>
          <span className="block text-[13px] text-[var(--muted)]">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* ----------------------------------------------- Enterprise services */
export function ServiceGrid({
  items,
}: {
  items: { title: string; body: string; icon: IconName }[];
}) {
  const cols =
    items.length % 4 === 0
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : items.length % 3 === 0
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map((s) => (
        <div
          key={s.title}
          className="group relative flex flex-col gap-3 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--brand-tint)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--brand-tint)] text-[var(--brand)] transition-colors duration-300 group-hover:bg-[var(--brand)] group-hover:text-white">
            <Icon name={s.icon} size={22} />
          </span>
          <h3 className="relative text-[18px] font-bold">{s.title}</h3>
          <p className="relative text-[14px] leading-relaxed text-[var(--muted)]">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------- Enterprise panel (Maze-style, teal) */
export function EnterprisePanel({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <Container>
      <div
        className="relative overflow-hidden rounded-[32px] px-5 py-14 sm:px-10 sm:py-16 lg:py-20"
        style={{
          backgroundColor: "#39C7C0",
          backgroundImage: "url('/textures/crowd-teal.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* depth — soft top highlight + gentle bottom shade over the halftone */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(120% 75% at 50% -8%, rgba(255,255,255,0.3), transparent 55%), linear-gradient(180deg, transparent 58%, rgba(6,52,50,0.2))",
          }}
        />

        <div className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(2rem,1.1rem+2.6vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--ink-deep)]">
              Enterprise services for enterprise needs
            </h2>
            <div className="mt-7 flex justify-center">
              <Button href="/contact" variant="dark" size="lg" icon>
                Contact sales
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {items.map((s) => (
              <div
                key={s.title}
                className="group flex flex-col gap-3.5 rounded-[var(--r-lg)] bg-[var(--card)] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              >
                <span className="inline-flex items-center gap-2 self-start rounded-md border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-[2px]" style={{ background: "#FF8A5B" }} />
                  {s.title}
                </span>
                <p className="text-[15px] leading-relaxed text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
