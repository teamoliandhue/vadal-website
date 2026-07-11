import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

/* -------------------------------------------------------------- Container */
export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[1320px]" : "max-w-[1200px]";
  return <div className={`mx-auto w-full ${max} px-5 sm:px-7 ${className}`}>{children}</div>;
}

/* ----------------------------------------------------------------- Button */
/* Mirrors the Figma button design system (node 67-293). Variant names keep the
   site's intent: `primary` = the violet brand action (brand-law: violet =
   action), `dark` = the ink "primary" style, `ai` = the Aurora glow button. */
type ButtonVariant = "primary" | "secondary" | "ghost" | "dark" | "ai" | "danger";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
  icon?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
};

const BTN_VARIANTS: Record<ButtonVariant, string> = {
  // violet brand — the primary user action
  primary:
    "bg-[var(--btn-brand-bg)] text-[var(--btn-brand-label)] shadow-[0_6px_18px_-6px_rgba(124,92,248,0.5)] hover:bg-[var(--btn-brand-bg-hover)] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-8px_rgba(124,92,248,0.55)] active:bg-[var(--btn-brand-bg-active)]",
  // ink/black
  dark:
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-label)] shadow-[0_8px_24px_-10px_rgba(10,10,12,0.5)] hover:bg-[var(--btn-primary-bg-hover)] hover:-translate-y-0.5 active:bg-[var(--btn-primary-bg-active)]",
  // violet tint
  secondary:
    "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-label)] hover:bg-[var(--btn-secondary-bg-hover)] active:bg-[var(--btn-secondary-bg-active)]",
  // white + hairline border (tertiary)
  ghost:
    "border border-[var(--btn-tertiary-border)] bg-[var(--btn-tertiary-bg)] text-[var(--btn-tertiary-label)] hover:bg-[var(--btn-tertiary-bg-hover)] active:bg-[var(--btn-tertiary-bg-hover)]",
  // red
  danger:
    "bg-[var(--btn-danger-bg)] text-[var(--btn-danger-label)] shadow-[0_6px_18px_-6px_rgba(212,74,80,0.5)] hover:bg-[var(--btn-danger-bg-hover)] hover:-translate-y-0.5 active:bg-[var(--btn-danger-bg-active)]",
  // Aurora gradient + AI glow — intelligence actions only
  ai:
    "aurora-fill text-white shadow-[var(--btn-ai-glow)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-6px_rgba(124,92,248,0.5),0_3px_12px_-2px_rgba(255,138,91,0.32)]",
};

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  children,
  href = "#",
  variant = "primary",
  size = "md",
  className = "",
  icon = false,
  type,
  disabled = false,
  loading = false,
}: ButtonProps) {
  const base =
    "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0 active:scale-[0.98]";
  const sizes = size === "lg" ? "h-12 px-6 text-[15px]" : "h-10 px-4 text-[14px]";
  const disabledCls =
    "cursor-not-allowed border-transparent bg-[var(--btn-disabled-bg)] text-[var(--btn-disabled-label)] shadow-none hover:translate-y-0";

  const isInert = disabled || loading;
  const cls = `${base} ${sizes} ${isInert ? disabledCls : BTN_VARIANTS[variant]} ${className}`;

  const inner = (
    <>
      {loading && <Spinner />}
      {children}
      {icon && !loading && (
        <Icon
          name="arrow"
          size={size === "lg" ? 17 : 16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (type || isInert) {
    return (
      <button
        type={type ?? "button"}
        disabled={isInert}
        aria-busy={loading || undefined}
        className={cls}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* --------------------------------------------------------------- Eyebrow */
export function Eyebrow({
  children,
  className = "",
  aurora = false,
  mark = true,
}: {
  children: ReactNode;
  className?: string;
  aurora?: boolean;
  /** the signature aurora tick before the label (default on) */
  mark?: boolean;
}) {
  return (
    <p className={`eyebrow ${mark ? "eyebrow-mark" : ""} ${aurora ? "aurora-text" : ""} ${className}`}>
      {children}
    </p>
  );
}

/* ---------------------------------------------------------- Section shell */
export function Section({
  children,
  className = "",
  tone = "base",
  id,
  reveal = false,
  glow,
}: {
  children: ReactNode;
  className?: string;
  tone?: "base" | "surface" | "dark";
  id?: string;
  reveal?: boolean;
  /** subtle aurora bloom backdrop — used sparingly on signature sections */
  glow?: "left" | "right" | "top";
}) {
  const tones: Record<string, string> = {
    base: "bg-[var(--background)]",
    surface: "bg-[var(--surface)]",
    dark: "on-dark bg-[var(--background)] text-[var(--foreground)]",
  };
  // corner blooms — teal/blue/violet, kept low-opacity so the canvas stays calm
  const glows: Record<string, string> = {
    left: "left-[-8%] top-[10%] h-[380px] w-[380px] bg-[radial-gradient(circle,rgba(35,215,190,0.14),transparent_70%)]",
    right: "right-[-8%] top-[6%] h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(124,92,248,0.14),transparent_70%)]",
    top: "left-1/2 top-[-14%] h-[340px] w-[720px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(59,158,255,0.12),transparent_70%)]",
  };
  return (
    // tightened rhythm (was py-14/20/28) — founder feedback 2026-07-07:
    // less dead canvas between sections, Maze-style density.
    // overflow-hidden only when a glow is present (else it'd clip overflowing
    // badges like the pricing "Most popular" pill and hover lifts).
    <section
      id={id}
      className={`relative py-10 sm:py-14 lg:py-16 ${glow ? "overflow-hidden" : ""} ${tones[tone]} ${className}`}
    >
      {glow && <div className={`section-glow ${glows[glow]}`} aria-hidden="true" />}
      {reveal ? <Reveal>{children}</Reveal> : children}
    </section>
  );
}

/* ----------------------------------------------------------- Section head */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "center",
  aurora = false,
  className = "",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  aurora?: boolean;
  className?: string;
  /** Heading level — pass "h1" when SectionHead is the page hero */
  as?: "h1" | "h2";
}) {
  const a = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-4 ${a} ${align === "center" ? "max-w-2xl" : ""} ${className}`}>
      {eyebrow && <Eyebrow aurora={aurora}>{eyebrow}</Eyebrow>}
      <Heading className="display-md font-extrabold text-balance">{title}</Heading>
      {lede && (
        <p className="text-[16px] leading-relaxed text-[var(--muted)] text-pretty sm:text-[17px]">{lede}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- Check item */
export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--brand-tint)] text-[var(--brand)]">
        <Icon name="check" size={13} strokeWidth={2.4} />
      </span>
      <span className="text-[15px] leading-snug text-[var(--foreground)]">{children}</span>
    </li>
  );
}

/* --------------------------------------------------------------- Pill tag */
export function Pill({
  children,
  aurora = false,
  className = "",
}: {
  children: ReactNode;
  aurora?: boolean;
  className?: string;
}) {
  if (aurora) {
    return (
      <span
        className={`aurora-ring inline-flex items-center gap-1.5 rounded-full bg-[var(--card)] px-3 py-1 text-[12px] font-semibold ${className}`}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[12px] font-semibold text-[var(--muted)] ${className}`}
    >
      {children}
    </span>
  );
}
