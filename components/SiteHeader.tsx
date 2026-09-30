"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo, SparkMark } from "./Brand";
import { Icon } from "./Icon";
import { MenuGlyph, type GlyphKind } from "./MenuGlyph";
import { Button, Container } from "./ui";
import { MobileTabBar } from "./MobileTabBar";
import {
  headerNav,
  resourcesMenu,
  scienceMenu,
  solutionsByOutcome,
  solutionsByWorkforce,
  solutionsNav,
  type MenuItem,
} from "@/lib/content";
import { groupHue } from "@/lib/page-theme";
import { platformLayers } from "@/lib/platform-nav";
import { LANDING_ONLY } from "@/lib/flags";

type MegaId = "platform" | "solutions" | "resources" | "science";

export function SiteHeader() {
  const pathname = usePathname();
  // which top-level section the current URL belongs to, so the nav can say
  // "you are here" instead of only reacting to hover
  const currentSection = (() => {
    if (pathname.startsWith("/platform")) return "/platform";
    if (pathname.startsWith("/solutions")) return "/solutions";
    if (pathname.startsWith("/resources")) return "/resources";
    if (pathname.startsWith("/science")) return "/science";
    if (pathname.startsWith("/pricing")) return "/pricing";
    return null;
  })();

  const [scrolled, setScrolled] = useState(false);
  const [hideBar, setHideBar] = useState(false);
  const lastY = useRef(0);
  // one bottom sheet, two scopes: the Platform tab opens the catalogue,
  // More opens everything else. Previously both routed to the same sheet,
  // so "Platform" and "More" overlapped confusingly.
  const [sheet, setSheet] = useState<"platform" | "more" | null>(null);
  const mobileOpen = sheet !== null;
  const [megaOpen, setMegaOpen] = useState<MegaId | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // phones: retract the bar going down, bring it back the moment you go up,
      // so reading gets the whole screen (desktop keeps it pinned)
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        setHideBar(y > 240 && dy > 0);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // If the viewport grows past the lg breakpoint while the mobile menu is
  // open, close it — otherwise the body scroll-lock survives with the menu
  // (and its toggle) display:none'd, freezing the page. Listens on both the
  // media query and window resize for robustness.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setSheet(null);
    };
    mq.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  // Escape closes whichever overlay is open, returning focus to its trigger
  useEffect(() => {
    if (!mobileOpen && !megaOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchOpen) searchBtnRef.current?.focus();
        if (mobileOpen) mobileBtnRef.current?.focus();
        setSheet(null);
        setMegaOpen(null);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, megaOpen, searchOpen]);

  // NOTE: the retract transform below lives on the inner bar, never on
  // <header> itself. A transform on <header> would make it the containing
  // block for the position:fixed nav island nested inside it, pinning the
  // island to the header instead of the viewport.
  const closeSearch = () => {
    setSearchOpen(false);
    searchBtnRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ease-out ${
          hideBar && !mobileOpen && !searchOpen ? "max-lg:-translate-y-full" : ""
        } ${
          scrolled || megaOpen || searchOpen
            ? "border-b border-[var(--line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* phones get a slimmer bar — it holds only the logo, so 68px was pure
            dead space above the fold */}
        <Container className="flex h-[52px] items-center justify-between gap-4 lg:h-[68px]">
          <Logo size={29} className="origin-left max-lg:scale-[0.8]" />

          {/* desktop nav — hidden in landing-only (beginning) stage */}
          {/* nav is the positioning context — mega panels center under the
              whole nav, not the item, so wide panels never clip offscreen */}
          {!LANDING_ONLY && (
            <nav className="relative hidden items-center gap-0.5 lg:flex" aria-label="Main">
              {headerNav.map((item) =>
                item.mega ? (
                  <div
                    key={item.label}
                    onMouseEnter={() => setMegaOpen(item.mega as MegaId)}
                    onMouseLeave={() => setMegaOpen(null)}
                    onFocus={() => setMegaOpen(item.mega as MegaId)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(null);
                    }}
                  >
                    <Link
                      href={item.href}
                      data-current={currentSection === item.href ? "true" : undefined}
                      aria-current={currentSection === item.href ? "page" : undefined}
                      className="nav-underline flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
                      aria-expanded={megaOpen === item.mega}
                    >
                      {item.label}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        className={`transition-transform ${megaOpen === item.mega ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    {megaOpen === item.mega && (
                      <MegaPanel id={item.mega as MegaId} onNavigate={() => setMegaOpen(null)} />
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-current={currentSection === item.href ? "true" : undefined}
                    aria-current={currentSection === item.href ? "page" : undefined}
                    className="nav-underline rounded-full px-3.5 py-2 text-[14px] font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          )}

          {/* right actions */}
          <div className="flex items-center gap-1.5">
            {!LANDING_ONLY && (
              <button
                ref={searchBtnRef}
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                aria-expanded={searchOpen}
                className="hidden h-10 w-10 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)] lg:grid"
              >
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="6.2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m13.8 13.8 3.4 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {!LANDING_ONLY && (
              <Link
                href="/login"
                className="hidden rounded-full px-3.5 py-2 text-[14px] font-semibold text-[var(--muted)] transition-colors hover:text-[var(--foreground)] lg:block"
              >
                Login
              </Link>
            )}
            {/* on phones the demo CTA lives in the bottom bar's raised centre
                action, so the header one would be a duplicate */}
            <Button href="/demo" size="md" className="max-lg:hidden">
              Book a demo
            </Button>
          </div>
        </Container>
      </div>

      {!LANDING_ONLY && searchOpen && <SearchPanel onClose={closeSearch} />}
      {!LANDING_ONLY && sheet && <MobileMenu view={sheet} onClose={() => setSheet(null)} />}

      {/* app-shell bottom navigation — phones only. Its "More" tab replaces the
          header hamburger and drives the same MobileMenu. */}
      {!LANDING_ONLY && (
        <MobileTabBar
          openSheet={sheet}
          onToggleSheet={(v) => setSheet((cur) => (cur === v ? null : v))}
          moreBtnRef={mobileBtnRef}
        />
      )}
    </header>
  );
}

/* ------------------------------------------------------------ shared bits */

/* ---------- Maze-style editorial menu building blocks ----------
   The look: one color-tinted featured card with an illustration, then clean
   grouped text-link columns — no per-link icons or bullets, generous rhythm. */

/* aurora "halftone globe" — a gradient sphere with a dot texture + inner shade */
function MenuFeatureCard({
  title,
  href,
  desc,
  glyph,
  onNavigate,
}: {
  title: string;
  href: string;
  desc: string;
  glyph: GlyphKind;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[var(--r-lg)] p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
      style={{ background: "var(--aurora-soft)" }}
    >
      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[15.5px] font-extrabold text-[var(--ink-deep)]">
          {title}
          <Icon name="arrow" size={16} className="text-[var(--brand)] transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="-mr-1.5 -mt-1.5">
          <MenuGlyph kind={glyph} />
        </span>
      </div>
      <p className="relative max-w-[15rem] text-[13px] leading-relaxed text-[var(--foreground)]/75">
        {desc}
      </p>
    </Link>
  );
}

function MenuGroup({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
      <div>{children}</div>
    </div>
  );
}

function MenuTextLink({
  name,
  href,
  tag,
  onNavigate,
}: {
  name: string;
  href: string;
  tag?: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex items-center gap-2 py-[7px] text-[14.5px] font-medium text-[var(--foreground)] transition-colors hover:text-[var(--brand)]"
    >
      <span>{name}</span>
      {tag && (
        <span className="rounded-[5px] bg-[var(--brand-tint)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--brand)]">
          {tag}
        </span>
      )}
      <Icon
        name="arrow"
        size={13}
        className="-translate-x-1 text-[var(--brand)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
      />
    </Link>
  );
}

function PanelShell({
  width,
  children,
  footer,
}: {
  width: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  /* The panels are positioned from the nav, and the nav is not centred in the
     viewport — the logo is wider than the actions — so every panel sat 44px
     left of centre, and at 1024px a wide one ran into the edge. Centre on the
     viewport instead: offset by the distance between the two centres. Measured
     from the nav, which does not animate, rather than from the panel, which is
     mid-entrance (scaled) when this runs. max-w keeps a 16px gutter. */
  const ref = useRef<HTMLDivElement>(null);
  const [dx, setDx] = useState(0);
  useLayoutEffect(() => {
    const fit = () => {
      const host = ref.current?.offsetParent as HTMLElement | null;
      if (!host) return;
      const r = host.getBoundingClientRect();
      setDx(Math.round(window.innerWidth / 2 - (r.left + r.width / 2)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div
      ref={ref}
      className={`absolute left-1/2 top-full z-50 max-w-[calc(100vw-32px)] pt-3 ${width}`}
      /* `translate`, not `transform`: menu-in animates transform, and the two
         properties compose — an inline transform would be overwritten for the
         length of the entrance and the panel would jump sideways at its end */
      style={{ animation: "menu-in 0.22s cubic-bezier(0.22,1,0.36,1)", translate: `calc(-50% + ${dx}px) 0` }}
    >
      <div className="menu-panel">
        {children}
        {footer}
      </div>
    </div>
  );
}

function PanelFooter({ links, onNavigate }: { links: { label: string; href: string; spark?: boolean }[]; onNavigate: () => void }) {
  return (
    <div className={`relative z-[1] grid border-t border-[var(--line)] bg-gradient-to-b from-[var(--surface)] to-[var(--card)] ${links.length > 1 ? "grid-cols-2" : ""}`}>
      {links.map((l, i) => (
        <Link
          key={l.href + l.label}
          href={l.href}
          onClick={onNavigate}
          className={`menu-row group flex items-center justify-between gap-2 px-5 py-3.5 text-[13px] font-semibold hover:bg-[var(--surface-2)] ${
            i < links.length - 1 ? "border-r border-[var(--line)]" : ""
          }`}
        >
          <span className="inline-flex items-center gap-2">
            {l.spark && <SparkMark size={15} />}
            {l.label}
          </span>
          <Icon name="arrow" size={16} className="text-[var(--brand)] transition-transform group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ mega panels */

function MegaPanel({ id, onNavigate }: { id: MegaId; onNavigate: () => void }) {
  if (id === "platform") return <PlatformMega onNavigate={onNavigate} />;
  if (id === "solutions") return <SolutionsMega onNavigate={onNavigate} />;
  if (id === "resources") return <ResourcesMega onNavigate={onNavigate} />;
  return <ScienceMega onNavigate={onNavigate} />;
}

/* A pillar's colour, taken from the same hue family its pages use
   (lib/page-theme), so Listen is teal in the menu and teal when you land on it.
   The glyph and ink are dark enough to clear AA on the tint they sit on. */
function pillarTone(id: string): React.CSSProperties {
  const h = groupHue(id);
  return {
    ["--tile" as string]: `hsl(${h} 80% 94.5%)`,
    ["--ink" as string]: `hsl(${h} 62% 30%)`,
    ["--wash" as string]: `hsl(${h} 70% 97.5%)`,
    ["--ring" as string]: `hsl(${h} 55% 78%)`,
  };
}

/** where a pillar's name goes: its only module, or its section on /platform */
function pillarHref(l: (typeof platformLayers)[number]) {
  const linked = l.modules.filter((m) => m.slug);
  return linked.length === 1 ? `/platform/${linked[0].slug}` : `/platform#${l.id}`;
}

/** "Written As You" → "Written as you", keeping acronyms like AI and 1:1 */
function sentenceCase(t: string) {
  return t
    .split(" ")
    .map((w, i) => (/^[A-Z0-9:]{2,}$/.test(w) || i === 0 ? w : w.toLowerCase()))
    .join(" ");
}

/* What a one-module product shows in its bottom row: the first capabilities
   from its own data, skipping any that just restate its descriptor
   ("Micro-learning" / "Microlearning"), as many as fit on one line. */
function capabilityTags(l: (typeof platformLayers)[number]) {
  const norm = (t: string) => t.toLowerCase().replace(/[^a-z]/g, "");
  const mod = l.modules.find((m) => m.slug);
  const out: string[] = [];
  let chars = 0;
  for (const line of mod?.lines ?? []) {
    const t = sentenceCase(line.split(",")[0].trim());
    if (norm(t) === norm(l.short) || norm(t) === norm(l.name)) continue;
    if (out.length === 2 || (out.length > 0 && chars + t.length > 31)) break;
    out.push(t);
    chars += t.length;
  }
  return out;
}

/* One product, one card. Every card has the same anatomy — icon, name, plain
   descriptor, and a bottom row pinned to the base so the rows line up across
   the grid. A product with several modules lists them as tinted chips, each its
   own link. A one-module product lists what it does as outlined tags, and the
   whole card is its link, so nothing in it is a dead click. The header link is
   stretched over the card either way; the chips sit above it. */
function ProductCard({
  l,
  n,
  pathname,
  onNavigate,
}: {
  l: (typeof platformLayers)[number];
  n: number;
  pathname: string;
  onNavigate: () => void;
}) {
  const mods = l.modules.filter((m) => m.slug);
  const multi = mods.length > 1;
  const here = mods.some((m) => pathname === `/platform/${m.slug}`);
  const tags = multi ? [] : capabilityTags(l);
  return (
    <li
      style={{ ...pillarTone(l.id), animationDelay: `${n * 24}ms` }}
      data-here={here || undefined}
      className="pm-card group relative flex flex-col rounded-[16px] p-3 xl:p-3.5"
    >
      <Link
        href={pillarHref(l)}
        onClick={onNavigate}
        aria-current={here && !multi ? "page" : undefined}
        aria-label={`${l.name} — ${l.short}`}
        className="pm-stretch flex items-start gap-3"
      >
        <span className="pm-icon grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-[var(--tile)] text-[var(--ink)]">
          <Icon name={l.icon} size={18} />
        </span>
        <span className="min-w-0 flex-1 pt-0.5">
          <span className="block text-[15px] font-bold leading-tight tracking-[-0.01em] text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--ink)]">
            {l.name}
          </span>
          <span className="mt-1 block text-[12px] leading-snug text-[var(--muted)] xl:text-[12.5px]">{l.short}</span>
        </span>
        {/* the product's own number, 01–09; on hover it gives way to an arrow */}
        <span className="pm-corner relative -mr-0.5 mt-0.5 h-5 w-6 shrink-0 text-right" aria-hidden="true">
          <span className="pm-num absolute inset-0 text-[11px] font-semibold tabular-nums tracking-[0.04em] text-[var(--muted)]">
            {String(n).padStart(2, "0")}
          </span>
          <Icon name="arrow" size={15} className="pm-arrow absolute right-0 top-0.5 text-[var(--ink)]" />
        </span>
      </Link>

      <div className="relative z-[1] mt-auto flex flex-wrap gap-1.5 pt-3">
        {multi
          ? mods.map((m, mi) => {
              const on = pathname === `/platform/${m.slug}`;
              return (
                <Link
                  key={m.slug}
                  href={`/platform/${m.slug}`}
                  onClick={onNavigate}
                  aria-current={on ? "page" : undefined}
                  data-on={on || undefined}
                  className="pm-chip inline-flex h-6 items-center rounded-full px-2 text-[11.5px] font-semibold"
                >
                  {m.name}
                </Link>
              );
            }).flatMap((chip, mi) =>
              /* more than four modules will not fit one line; left to wrap they
                 break 4 + 1 and orphan the last. Break them evenly instead. */
              mods.length > 4 && mi === Math.ceil(mods.length / 2)
                ? [<span key="break" className="basis-full" aria-hidden="true" />, chip]
                : [chip],
            )
          : tags.map((t, ti) => (
              <span
                key={t}
                aria-hidden="true"
                className={`pm-tag pointer-events-none h-6 items-center rounded-full border px-2 text-[11.5px] font-medium text-[var(--muted)] ${ti > 0 ? "hidden xl:inline-flex" : "inline-flex"}`}
              >
                {t}
              </span>
            ))}
      </div>
    </li>
  );
}

/* The platform menu is the product's own shape: nine HR products, one AI that
   acts, and the platform underneath.

   It used to be a rail of eleven names with the modules one hover away and a
   thumbnail of the whole app beside them. That hid the catalogue behind
   hover-hunting, the names carried no meaning on their own ("iThrive",
   "Flow", "Broadcast"), single-module products opened a pane with one row in
   it, and the thumbnail was too small to read.

   Now all nine are on screen at once, as a 3×3 grid in the product's own order.
   Each carries the product's plain descriptor so the name explains itself, and
   its modules as direct links. Nudge gets its own panel because it is not a
   tenth product — it is the assistant running through the other nine. Every
   item is a plain link, so keyboard order is reading order with no bespoke
   handling, and nothing swaps on hover. */
function PlatformMega({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const products = platformLayers.filter((l) => l.id !== "nudge" && l.id !== "platform");
  const nudge = platformLayers.find((l) => l.id === "nudge");
  const platform = platformLayers.find((l) => l.id === "platform");
  const hereIn = (l: (typeof platformLayers)[number]) =>
    l.modules.some((m) => m.slug && pathname === `/platform/${m.slug}`);

  return (
    <PanelShell
      width="w-[min(1180px,94vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[
            { label: "Explore the whole platform", href: "/platform", spark: true },
            { label: "Book a personalized demo", href: "/demo" },
          ]}
        />
      }
    >
      <div className="grid grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_296px]">
        {/* --------------------------------------------------- the nine */}
        <div className="pm-well p-3.5">
          <p className="px-1.5 pb-2.5 pt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Nine HR products
          </p>
          <ul className="grid grid-cols-3 gap-2">
            {products.map((l, i) => (
              <ProductCard key={l.id} l={l} n={i + 1} pathname={pathname} onNavigate={onNavigate} />
            ))}
          </ul>

          {/* the platform underneath the nine — the same card language, one row */}
          {platform && (
            <div style={pillarTone(platform.id)} className="pm-card pm-card--static mt-2 flex items-center gap-4 rounded-[16px] p-3">
              <span className="flex w-[236px] shrink-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-[var(--tile)] text-[var(--ink)]">
                  <Icon name={platform.icon} size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold leading-tight tracking-[-0.01em] text-[var(--foreground)]">{platform.name}</span>
                  <span className="mt-1 block text-[12px] leading-snug text-[var(--muted)]">{platform.short}</span>
                </span>
              </span>
              <ul className="grid flex-1 grid-cols-3 gap-1.5">
                {platform.modules
                  .filter((m) => m.slug)
                  .map((m) => {
                    const on = pathname === `/platform/${m.slug}`;
                    return (
                      <li key={m.slug}>
                        <Link
                          href={`/platform/${m.slug}`}
                          onClick={onNavigate}
                          aria-current={on ? "page" : undefined}
                          data-on={on || undefined}
                          className="pm-sub group/sub flex items-center gap-2.5 rounded-[12px] px-2 py-1.5"
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[var(--tile)] text-[var(--ink)]">
                            <Icon name={m.icon} size={15} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13.5px] font-semibold leading-tight text-[var(--foreground)] group-hover/sub:text-[var(--ink)]">{m.name}</span>
                            <span className="mt-0.5 hidden truncate text-[11.5px] leading-tight text-[var(--muted)] xl:block">{m.hook}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>

        {/* ---------------------------------------------------- the assistant */}
        <div className="flex flex-col border-l border-[var(--line)] bg-[var(--surface)]/60 p-4">
          {nudge && (
            <Link
              href={pillarHref(nudge)}
              onClick={onNavigate}
              aria-current={hereIn(nudge) ? "page" : undefined}
              className="pm-nudge group relative isolate flex flex-1 flex-col overflow-hidden rounded-[16px] p-5 text-white"
            >
              <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#cfd6ff]">
                <SparkMark size={14} />
                Nudge · the AI layer
              </span>
              <span className="mt-2.5 text-[17px] font-bold leading-snug tracking-[-0.01em]">{nudge.lede}</span>
              <span className="mt-1.5 text-[12.5px] leading-relaxed text-[#c9cde0]">{nudge.description}</span>
              {/* a real exchange, verbatim from the product's own tour: the
                  question, and what Nudge actually says back */}
              <span className="mt-4 flex flex-col gap-2" aria-hidden="true">
                <span className="self-end rounded-[12px] rounded-br-[4px] bg-white/[0.14] px-3 py-1.5 text-[12px] text-white">
                  How is the team feeling?
                </span>
                <span className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/[0.1]">
                    <SparkMark size={12} />
                  </span>
                  <span
                    className="rounded-[12px] rounded-tl-[4px] border bg-white/[0.06] px-3 py-2 text-[12px] leading-relaxed text-[#e7e9f5]"
                    /* inline, not border-white/10: the unlayered `* { border-color }`
                       in globals.css beats a layered utility and painted it grey */
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    I read 8,486 responses. Net sentiment is <b className="font-bold text-white">+52</b>, up 4 this quarter.
                  </span>
                </span>
                {/* the second is the one where it acts rather than answers;
                    below xl the column is too narrow to hold both */}
                <span className="mt-2 hidden self-end rounded-[12px] rounded-br-[4px] bg-white/[0.14] px-3 py-1.5 text-[12px] text-white xl:block">
                  Write up the onboarding win for LinkedIn.
                </span>
                <span className="hidden items-start gap-2 xl:flex">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/[0.1]">
                    <SparkMark size={12} />
                  </span>
                  <span
                    className="rounded-[12px] rounded-tl-[4px] border bg-white/[0.06] px-3 py-2 text-[12px] leading-relaxed text-[#e7e9f5]"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    Drafted in your voice. <span className="font-semibold text-[#8ff0d8]">Policy check passed</span> — it&apos;s your tap.
                  </span>
                </span>
              </span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-bold text-white">
                Meet Nudge
                <Icon name="arrow" size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )}

        </div>
      </div>
    </PanelShell>
  );
}

function SolutionsMega({ onNavigate }: { onNavigate: () => void }) {
  return (
    <PanelShell
      width="w-[min(980px,94vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "View all solutions", href: "/solutions", spark: true }]}
        />
      }
    >
      <div className="grid grid-cols-[240px_1fr_1fr_1fr] gap-5 p-5">
        <MenuFeatureCard
          title="Solutions"
          href="/solutions"
          glyph="solutions"
          desc="Workforce intelligence tuned to the outcomes you're accountable for and the workforce you run."
          onNavigate={onNavigate}
        />
        <div className="border-l border-[var(--line)] pl-5">
          <MenuGroup label="By outcome">
            {solutionsByOutcome.map((s) => (
              <MenuTextLink key={s.name} name={s.name} href={s.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
        <div className="border-l border-[var(--line)] pl-5">
          <MenuGroup label="By workforce">
            {solutionsByWorkforce.map((s) => (
              <MenuTextLink key={s.name} name={s.name} href={s.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
        {/* "By need" surfaces the six solution pages that were previously in no
            menu at all — reachable only from the /solutions page body. */}
        <div className="border-l border-[var(--line)] pl-5">
          <MenuGroup label="By need">
            {solutionsNav.map((s) => (
              <MenuTextLink
                key={s.slug}
                name={s.name}
                href={`/solutions/${s.slug}`}
                onNavigate={onNavigate}
              />
            ))}
          </MenuGroup>
        </div>
      </div>
    </PanelShell>
  );
}

function ResourcesMega({ onNavigate }: { onNavigate: () => void }) {
  return (
    <PanelShell
      width="w-[min(960px,94vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "Browse all resources", href: "/resources", spark: true }]}
        />
      }
    >
      <div className="grid grid-cols-[248px_1fr_1fr_1fr] gap-6 p-5">
        <MenuFeatureCard
          title="Resources"
          href="/resources"
          glyph="resources"
          desc="Guides, benchmarks and community for leaders turning employee feedback into decisions."
          onNavigate={onNavigate}
        />
        {resourcesMenu.map((group) => (
          <div key={group.label} className="border-l border-[var(--line)] pl-6">
            <MenuGroup label={group.label}>
              {group.items.map((item) => (
                <MenuTextLink key={item.name} name={item.name} href={item.href} onNavigate={onNavigate} />
              ))}
            </MenuGroup>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function ScienceMega({ onNavigate }: { onNavigate: () => void }) {
  const first = scienceMenu.items.slice(0, 3);
  const second = scienceMenu.items.slice(3);
  return (
    <PanelShell
      width="w-[min(740px,94vw)]"
      footer={
        <PanelFooter
          onNavigate={onNavigate}
          links={[{ label: "Explore the science", href: "/science", spark: true }]}
        />
      }
    >
      <div className="grid grid-cols-[248px_1fr_1fr] gap-6 p-5">
        <MenuFeatureCard
          title="The Science"
          href="/science"
          glyph="science"
          desc={scienceMenu.heading}
          onNavigate={onNavigate}
        />
        <div className="border-l border-[var(--line)] pl-6">
          <MenuGroup label="People & method">
            {first.map((item) => (
              <MenuTextLink key={item.name} name={item.name} href={item.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
        <div className="border-l border-[var(--line)] pl-6">
          <MenuGroup label="Platform & benchmarks">
            {second.map((item) => (
              <MenuTextLink key={item.name} name={item.name} href={item.href} onNavigate={onNavigate} />
            ))}
          </MenuGroup>
        </div>
      </div>
    </PanelShell>
  );
}

/* ----------------------------------------------------------------- search */

type SearchEntry = { label: string; href: string; group: string };

function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const l of platformLayers) {
    entries.push({ label: l.name, href: `/platform#${l.id}`, group: "Platform" });
    for (const m of l.modules)
      entries.push({
        label: m.name,
        href: m.slug ? `/platform/${m.slug}` : `/platform#${l.id}`,
        group: l.name,
      });
  }
  for (const s of [...solutionsByOutcome, ...solutionsByWorkforce])
    entries.push({ label: s.name, href: s.href, group: "Solutions" });
  for (const s of solutionsNav)
    entries.push({ label: s.name, href: `/solutions/${s.slug}`, group: "Solutions" });
  for (const g of resourcesMenu) for (const it of g.items) entries.push({ label: it.name, href: it.href, group: "Resources" });
  for (const it of scienceMenu.items) entries.push({ label: it.name, href: it.href, group: "Science" });
  entries.push(
    { label: "Pricing", href: "/pricing", group: "Company" },
    { label: "Book a demo", href: "/demo", group: "Company" },
    { label: "Customers", href: "/customers", group: "Company" },
    { label: "About", href: "/about", group: "Company" },
    { label: "Security", href: "/security", group: "Company" },
    { label: "Contact", href: "/contact", group: "Company" },
  );
  return entries;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildSearchIndex, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = q.trim()
    ? index.filter((e) => e.label.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8)
    : [];

  return (
    <div className="absolute inset-x-0 top-full hidden border-b border-[var(--line)] bg-[rgba(255,255,255,0.96)] shadow-[var(--shadow-lg)] backdrop-blur-xl lg:block">
      <Container className="py-4">
        <div className="mx-auto max-w-xl">
          <div className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--card)] px-5">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 text-[var(--muted)]">
              <circle cx="9" cy="9" r="6.2" stroke="currentColor" strokeWidth="1.8" />
              <path d="m13.8 13.8 3.4 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the platform, solutions, resources…"
              aria-label="Search"
              className="h-11 w-full bg-transparent text-[16px] outline-none placeholder:text-[var(--muted)] sm:text-[15px]"
            />
            <button onClick={onClose} aria-label="Close search" className="text-[13px] font-semibold text-[var(--muted)] hover:text-[var(--foreground)]">
              Esc
            </button>
          </div>
          {results.length > 0 && (
            <ul className="mt-2 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-md)]">
              {results.map((r) => (
                <li key={r.group + r.href + r.label}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-2.5 text-[14px] font-semibold transition-colors hover:bg-[var(--surface)]"
                  >
                    {r.label}
                    <span className="text-[12px] font-medium text-[var(--muted)]">{r.group}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {q.trim() && results.length === 0 && (
            <p className="mt-3 text-center text-[13px] text-[var(--muted)]">
              No matches, try the <Link href="/platform" onClick={onClose} className="font-semibold text-[var(--brand)]">platform overview</Link>.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------ mobile menu */

function MobileGroup({ label, children, defaultOpen = false }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-[var(--line)]" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between px-2 py-3.5 text-[16px] font-semibold [&::-webkit-details-marker]:hidden">
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-open:rotate-180" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}

function MobileLink({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="flex items-center gap-2.5 rounded-[var(--r-md)] px-2 py-2 text-[14.5px] font-semibold text-[var(--foreground)]"
    >
      {item.icon && (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-[var(--brand-tint)] text-[var(--brand)]">
          <Icon name={item.icon} size={14} />
        </span>
      )}
      {item.name}
    </Link>
  );
}

/* The brief: "hamburger opens full module menu". A nested accordion — layer,
   then its modules as name + hook — is the only way 16 modules stay scannable
   on a phone. Rows navigate straight to the product page; the four benefit
   lines belong to the landing-page accordion, not to the menu. */
/* The same shape as the desktop menu, sized for a thumb. A product with one
   module is a single row that goes straight to it — it used to open an
   accordion holding one row with the same name, two taps for one page. Only
   products with several modules expand. It opens on the product you are in. */
function MobileLayerGroup({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const products = platformLayers.filter((l) => l.id !== "nudge" && l.id !== "platform");
  const nudge = platformLayers.find((l) => l.id === "nudge");
  const platform = platformLayers.find((l) => l.id === "platform");
  const current = platformLayers.find((l) => l.modules.some((m) => m.slug && pathname === `/platform/${m.slug}`));
  const [open, setOpen] = useState<string | null>(current?.id ?? null);

  const row = (l: (typeof platformLayers)[number]) => {
    const linked = l.modules.filter((m) => m.slug);
    const multi = linked.length > 1;
    const on = open === l.id;
    const head = (
      <>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[var(--tile)] text-[var(--ink)]">
          <Icon name={l.icon} size={15} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-tight text-[var(--foreground)]">{l.name}</span>
          <span className="mt-0.5 block truncate text-[12.5px] text-[var(--muted)]">{l.short}</span>
        </span>
      </>
    );
    return (
      <li key={l.id} style={pillarTone(l.id)} className="overflow-hidden rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--card)]">
        {multi ? (
          <>
            <button
              type="button"
              onClick={() => setOpen(on ? null : l.id)}
              aria-expanded={on}
              className={`flex min-h-[56px] w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${on ? "bg-[var(--wash)]" : ""}`}
            >
              {head}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"
                className={`shrink-0 text-[var(--muted)] transition-transform ${on ? "rotate-180" : ""}`}>
                <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {on && (
              <ul className="border-t border-[var(--line)]">
                {linked.map((m) => {
                  const here = pathname === `/platform/${m.slug}`;
                  return (
                    <li key={m.slug}>
                      <Link
                        href={`/platform/${m.slug}`}
                        onClick={onClose}
                        aria-current={here ? "page" : undefined}
                        className={`flex min-h-[48px] items-center gap-2 border-b border-[var(--line)] py-2.5 pl-[56px] pr-3 last:border-b-0 ${here ? "bg-[var(--wash)]" : ""}`}
                      >
                        <span className="min-w-0 flex-1">
                          <span className={`block text-[14px] font-semibold leading-tight ${here ? "text-[var(--ink)]" : "text-[var(--foreground)]"}`}>{m.name}</span>
                          <span className="mt-0.5 block text-[12px] leading-snug text-[var(--muted)]">{m.hook}</span>
                        </span>
                        <Icon name="arrow" size={14} className="shrink-0 text-[var(--muted)]" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <Link
            href={pillarHref(l)}
            onClick={onClose}
            aria-current={pathname === pillarHref(l) ? "page" : undefined}
            className={`flex min-h-[56px] items-center gap-3 px-3 py-2.5 ${pathname === pillarHref(l) ? "bg-[var(--wash)]" : ""}`}
          >
            {head}
            <Icon name="arrow" size={14} className="shrink-0 text-[var(--muted)]" />
          </Link>
        )}
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-3 pb-1">
      <p className="px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Nine HR products</p>
      <ul className="flex flex-col gap-1.5">{products.map(row)}</ul>

      {nudge && (
        <Link href={pillarHref(nudge)} onClick={onClose} className="pm-nudge flex items-center gap-3 rounded-[var(--r-md)] px-3.5 py-3 text-white">
          <SparkMark size={18} />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold leading-tight">{nudge.name}</span>
            <span className="mt-0.5 block text-[12.5px] text-[#c9cde0]">{nudge.lede}</span>
          </span>
          <Icon name="arrow" size={14} className="shrink-0 text-white/70" />
        </Link>
      )}

      {platform && <ul className="flex flex-col gap-1.5">{row(platform)}</ul>}
    </div>
  );
}

function MobileMenu({ view, onClose }: { view: "platform" | "more"; onClose: () => void }) {
  const panelRef = useRef<HTMLElement>(null);
  const [q, setQ] = useState("");
  const [dragY, setDragY] = useState(0);
  const dragging = useRef(false);
  const startY = useRef(0);
  const index = useMemo(buildSearchIndex, []);

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>("a, button, summary")?.focus();
  }, []);

  const query = q.trim().toLowerCase();
  const results = query ? index.filter((e) => e.label.toLowerCase().includes(query)).slice(0, 10) : [];

  // drag the grabber down to dismiss — past ~110px it closes, else it springs back
  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setDragY(Math.max(0, e.clientY - startY.current));
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (dragY > 110) onClose();
    setDragY(0);
  };

  // A bottom sheet, not a modal — the page stays visible behind it and the
  // island above stays usable, so no aria-modal (there's no focus trap).
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-30 bg-[rgba(13,11,22,0.32)] backdrop-blur-[2px] lg:hidden"
      />
      <nav
        ref={panelRef}
        id="mobile-menu"
        aria-label="Mobile menu"
        style={{ transform: `translateY(${dragY}px)`, transition: dragging.current ? "none" : "transform 260ms cubic-bezier(0.22,1,0.36,1)" }}
        className="fixed inset-x-0 bottom-0 z-40 flex max-h-[86vh] flex-col overflow-hidden rounded-t-[26px] border-t border-white/70 bg-[rgba(255,255,255,0.96)] shadow-[0_-12px_40px_-12px_rgba(13,11,22,0.3)] backdrop-blur-2xl lg:hidden"
      >
        {/* grabber */}
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="flex shrink-0 cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing"
        >
          <span className="h-1.5 w-11 rounded-full bg-[var(--line-strong)]" />
        </div>

        {/* search — mobile had no way to search the 40-page site until now */}
        <div className="shrink-0 px-5 pb-3 pt-1">
          <div className="flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 text-[var(--muted)]">
              <circle cx="9" cy="9" r="6.2" stroke="currentColor" strokeWidth="1.8" />
              <path d="m13.8 13.8 3.4 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, solutions…"
              aria-label="Search"
              className="h-11 w-full bg-transparent text-[16px] outline-none placeholder:text-[var(--muted)]"
            />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear search" className="shrink-0 text-[13px] font-semibold text-[var(--muted)]">
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {query ? (
            <Container className="flex flex-col pb-[calc(96px+env(safe-area-inset-bottom))]">
              {results.length > 0 ? (
                results.map((r) => (
                  <Link
                    key={r.group + r.href + r.label}
                    href={r.href}
                    onClick={onClose}
                    className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-2 py-3.5 text-[15.5px] font-semibold"
                  >
                    {r.label}
                    <span className="shrink-0 text-[12px] font-medium text-[var(--muted)]">{r.group}</span>
                  </Link>
                ))
              ) : (
                <p className="px-2 py-8 text-center text-[14px] text-[var(--muted)]">
                  No matches for “{q.trim()}”. Try the{" "}
                  <Link href="/platform" onClick={onClose} className="font-semibold text-[var(--brand)]">
                    platform overview
                  </Link>
                  .
                </p>
              )}
            </Container>
          ) : (
            // pb clears the floating island so the last links stay reachable
            <Container className="flex flex-col pb-[calc(96px+env(safe-area-inset-bottom))]">
        {view === "platform" ? (
          <>
            <MobileLayerGroup onClose={onClose} />
            <Link
              href="/platform"
              onClick={onClose}
              className="mt-4 flex items-center justify-between rounded-[var(--r-md)] border border-[var(--line)] px-3.5 py-3 text-[14.5px] font-bold text-[var(--brand)]"
            >
              View the full platform
              <Icon name="arrow" size={15} />
            </Link>
          </>
        ) : (
          <>
        <MobileGroup label="Solutions">
          <p className="px-2 pb-1 pt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">By outcome</p>
          {solutionsByOutcome.map((s) => (
            <MobileLink key={s.name} item={s} onClose={onClose} />
          ))}
          <p className="px-2 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">By workforce</p>
          {solutionsByWorkforce.map((s) => (
            <MobileLink key={s.name} item={s} onClose={onClose} />
          ))}
          <p className="px-2 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">By need</p>
          {solutionsNav.map((s) => (
            <MobileLink
              key={s.slug}
              item={{ name: s.name, href: `/solutions/${s.slug}`, icon: s.icon }}
              onClose={onClose}
            />
          ))}
        </MobileGroup>
        <MobileGroup label="Resources">
          {resourcesMenu.flatMap((g) => g.items).map((r) => (
            <MobileLink key={r.name} item={r} onClose={onClose} />
          ))}
        </MobileGroup>
        <MobileGroup label="Science">
          {scienceMenu.items.map((s) => (
            <MobileLink key={s.name} item={s} onClose={onClose} />
          ))}
        </MobileGroup>
        <Link href="/pricing" onClick={onClose} className="border-b border-[var(--line)] px-2 py-3.5 text-[16px] font-semibold">
          Pricing
        </Link>
        <Link href="/login" onClick={onClose} className="px-2 py-3.5 text-[16px] font-semibold text-[var(--muted)]">
          Login
        </Link>
        <Button href="/demo" size="lg" className="mt-3 w-full" icon>
          Book a demo
        </Button>
          </>
        )}
      </Container>
          )}
        </div>
      </nav>
    </>
  );
}
