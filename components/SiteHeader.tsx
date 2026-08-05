"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo, SparkMark } from "./Brand";
import { Icon } from "./Icon";
import { PRODUCT_SHOTS } from "./ProductShot";
import { Button, Container } from "./ui";
import { MobileTabBar } from "./MobileTabBar";
import {
  headerNav,
  resourcesMenu,
  scienceMenu,
  solutionsByOutcome,
  solutionsByWorkforce,
  solutionsNav,
  surveyTypes,
  type MenuItem,
} from "@/lib/content";
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
function AuroraOrb({ size = 104 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <div className="absolute inset-0 rounded-full" style={{ background: "var(--aurora)" }} />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.5px)",
          backgroundSize: "7px 7px",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 58%, transparent 72%)",
          maskImage: "radial-gradient(circle at 50% 50%, #000 58%, transparent 72%)",
          opacity: 0.85,
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "inset 0 -10px 22px rgba(13,11,22,0.22), inset 0 8px 16px rgba(255,255,255,0.45)" }}
      />
    </div>
  );
}

function MenuFeatureCard({
  title,
  href,
  desc,
  onNavigate,
}: {
  title: string;
  href: string;
  desc: string;
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
          <AuroraOrb />
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
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted-2)]">{label}</p>
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
  return (
    <div
      className={`absolute left-1/2 top-full z-50 max-w-[calc(100vw-24px)] -translate-x-1/2 pt-3 ${width}`}
      style={{ animation: "menu-in 0.22s cubic-bezier(0.22,1,0.36,1)" }}
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

/* Two-pane platform mega: a rail of the platform layers on the left, the
   hovered/focused layer's modules on the right. The catalog is far too big for
   a flat grid (25 modules), and this is the only shape that gives every module
   room for its benefit hook — which is how the brief describes the taxonomy.
   Rail items are real links to /platform#<layer>, so the menu stays navigable
   and keyboard-accessible without bespoke key handling: focus swaps the pane. */
function PlatformMega({ onNavigate }: { onNavigate: () => void }) {
  // open on the layer the visitor is currently inside, so the menu picks up
  // where the page left off rather than always resetting to the first layer
  const pathname = usePathname();
  const contextual = Math.max(
    0,
    platformLayers.findIndex(
      (l) =>
        pathname === `/platform#${l.id}` ||
        l.modules.some((m) => m.slug && pathname === `/platform/${m.slug}`),
    ),
  );
  const [active, setActive] = useState(contextual);
  const intent = useRef<number | null>(null);

  // small delay so a diagonal mouse path across the rail doesn't strobe the pane
  const point = (i: number) => {
    if (intent.current) window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => setActive(i), 70);
  };
  const pointNow = (i: number) => {
    if (intent.current) window.clearTimeout(intent.current);
    setActive(i);
  };
  useEffect(() => () => {
    if (intent.current) window.clearTimeout(intent.current);
  }, []);

  const layer = platformLayers[active];

  // the preview follows the hovered module; scoped to a layer so switching rails
  // can't leave a stale index pointing at the wrong (or a missing) module
  const [hover, setHover] = useState<{ l: number; m: number } | null>(null);
  const setHoverMod = (m: number) => setHover({ l: active, m });
  const previewMod =
    (hover?.l === active ? layer.modules[hover.m] : null) ??
    layer.modules.find((m) => m.slug && PRODUCT_SHOTS[m.slug]) ??
    layer.modules[0];
  const preview = {
    mod: previewMod,
    shot: previewMod.slug ? PRODUCT_SHOTS[previewMod.slug] : undefined,
  };

  return (
    <PanelShell
      width="w-[min(1060px,94vw)]"
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
      <div className="grid grid-cols-[292px_minmax(0,1fr)_300px]">
        {/* ------------------------------------------------------- layer rail */}
        <div
          className="flex flex-col gap-0.5 border-r border-[var(--line)] bg-[var(--surface)]/50 p-3"
          onMouseLeave={() => {
            if (intent.current) window.clearTimeout(intent.current);
          }}
        >
          {platformLayers.map((l, i) => {
            const on = i === active;
            return (
              <Link
                key={l.id}
                href={`/platform#${l.id}`}
                onClick={onNavigate}
                onMouseEnter={() => point(i)}
                onFocus={() => pointNow(i)}
                aria-current={on ? "true" : undefined}
                className={`group flex items-center gap-3 rounded-[var(--r-md)] px-3 py-2.5 text-left transition-colors ${
                  on ? "bg-[var(--card)] shadow-[var(--shadow-sm)]" : "hover:bg-[var(--card)]/70"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-[9px] transition-colors ${
                    on ? "bg-[var(--brand)] text-white" : "bg-[var(--brand-tint)] text-[var(--brand)]"
                  }`}
                >
                  <Icon name={l.icon} size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[14px] font-semibold leading-tight ${
                      on ? "text-[var(--brand)]" : "text-[var(--foreground)]"
                    }`}
                  >
                    {l.name}
                  </span>
                </span>
                <Icon
                  name="arrow"
                  size={14}
                  className={`shrink-0 transition-all ${
                    on ? "text-[var(--brand)] opacity-100" : "text-[var(--muted-2)] opacity-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* ------------------------------------------------------ module pane */}
        <div className="flex min-w-0 flex-col p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted-2)]">
            {layer.name}
          </p>
          <p className="mt-1 text-[13.5px] text-[var(--muted)]">{layer.lede}</p>

          {/* one column, not two: a layer holds 3–5 modules, so a 2-up grid made
              two short rows and left the rest of the pane blank. Full-width rows
              with a glyph fill the height the six-item rail sets. */}
          <div className="mt-3 flex flex-col gap-0.5">
            {layer.modules.map((m, mi) => {
              const on = m === preview.mod;
              return (
                <Link
                  key={m.slug ?? m.name}
                  href={m.slug ? `/platform/${m.slug}` : `/platform#${layer.id}`}
                  onClick={onNavigate}
                  onMouseEnter={() => setHoverMod(mi)}
                  onFocus={() => setHoverMod(mi)}
                  className={`group flex items-center gap-3 rounded-[var(--r-md)] px-3 py-2.5 transition-colors ${
                    on ? "bg-[var(--surface)]" : "hover:bg-[var(--surface)]"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-[10px] transition-colors ${
                      on ? "bg-[var(--brand)] text-white" : "bg-[var(--brand-tint)] text-[var(--brand)]"
                    }`}
                  >
                    <Icon name={m.icon} size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span
                        className={`text-[14.5px] font-semibold leading-tight ${
                          on ? "text-[var(--brand)]" : "text-[var(--foreground)]"
                        }`}
                      >
                        {m.name}
                      </span>
                      {m.isNew && (
                        <span className="rounded-[5px] bg-[var(--brand-tint)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--brand)]">
                          New
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-[var(--muted)]">
                      {m.hook}
                    </span>
                  </span>
                  <Icon
                    name="arrow"
                    size={14}
                    className={`shrink-0 transition-opacity ${
                      on ? "text-[var(--brand)] opacity-100" : "text-[var(--muted-2)] opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <Link
            href={`/platform#${layer.id}`}
            onClick={onNavigate}
            className="group mt-auto flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4 text-[13px] font-bold text-[var(--brand)]"
          >
            <span>
              See all {layer.modules.length} in {layer.name}
            </span>
            <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ----------------------------------------------------- live preview */}
        {/* The pane is as tall as the six-item rail, so a four-module layer left
            roughly a third of the panel empty — and the menu showed none of the
            product screenshots we already ship. This fills that space with the
            actual screen behind whichever module is hovered. */}
        <div className="flex flex-col border-l border-[var(--line)] bg-[var(--surface)]/40 p-5">
          {preview.shot ? (
            <figure className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
              <img
                key={preview.shot.file}
                src={`/product/${preview.shot.file}.webp`}
                alt=""
                className="min-h-[168px] w-full flex-1 object-cover object-left-top"
                loading="lazy"
              />
              <figcaption className="border-t border-[var(--line)] px-3.5 py-2 text-[11.5px] font-semibold text-[var(--muted)]">
                {preview.shot.label}
              </figcaption>
            </figure>
          ) : (
            <div className="grid min-h-[196px] flex-1 place-items-center rounded-[var(--r-lg)] border border-dashed border-[var(--line-strong)] bg-[var(--card)]">
              <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[var(--brand-tint)] text-[var(--brand)]">
                <Icon name={layer.icon} size={22} />
              </span>
            </div>
          )}
          <p className="mt-3.5 text-[14px] font-bold text-[var(--foreground)]">{preview.mod.name}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[var(--muted)]">{preview.mod.hook}</p>
          {preview.mod.slug && (
            <Link
              href={`/platform/${preview.mod.slug}`}
              onClick={onNavigate}
              className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--brand)]"
            >
              Explore {preview.mod.name}
              <Icon name="arrow" size={13} />
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
  for (const s of surveyTypes) entries.push({ label: s.name, href: s.href, group: "Surveys" });
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
              className="h-11 w-full bg-transparent text-[16px] outline-none placeholder:text-[var(--muted-2)] sm:text-[15px]"
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
                    <span className="text-[12px] font-medium text-[var(--muted-2)]">{r.group}</span>
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
   then its modules as name + hook — is the only way 25 modules stay scannable
   on a phone. Rows navigate straight to the product page; the four benefit
   lines belong to the landing-page accordion, not to the menu. */
function MobileLayerGroup({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>(platformLayers[0].id);
  return (
    <div className="flex flex-col gap-1.5 pb-1">
      {platformLayers.map((l) => {
        const on = open === l.id;
        return (
          <div key={l.id} className="overflow-hidden rounded-[var(--r-md)] border border-[var(--line)]">
            <button
              type="button"
              onClick={() => setOpen(on ? null : l.id)}
              aria-expanded={on}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${
                on ? "bg-[var(--surface)]" : ""
              }`}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-[var(--brand-tint)] text-[var(--brand)]">
                <Icon name={l.icon} size={14} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14.5px] font-semibold leading-tight text-[var(--foreground)]">
                  {l.name}
                </span>
                <span className="mt-0.5 block truncate text-[12px] text-[var(--muted)]">{l.lede}</span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
                className={`shrink-0 text-[var(--muted-2)] transition-transform ${on ? "rotate-180" : ""}`}
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {on && (
              <div className="border-t border-[var(--line)]">
                {l.modules.map((m) => (
                  <Link
                    key={m.slug ?? m.name}
                    href={m.slug ? `/platform/${m.slug}` : `/platform#${l.id}`}
                    onClick={onClose}
                    className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2.5 last:border-b-0"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-[14px] font-semibold leading-tight text-[var(--foreground)]">
                          {m.name}
                        </span>
                        {m.isNew && (
                          <span className="rounded-full bg-[var(--brand-tint)] px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.06em] text-[var(--brand)]">
                            New
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-[12px] leading-snug text-[var(--muted)]">
                        {m.hook}
                      </span>
                    </span>
                    <Icon name="arrow" size={14} className="shrink-0 text-[var(--muted-2)]" />
                  </Link>
                ))}
                <Link
                  href={`/platform#${l.id}`}
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-bold text-[var(--brand)]"
                >
                  View {l.name}
                  <Icon name="arrow" size={13} />
                </Link>
              </div>
            )}
          </div>
        );
      })}
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
              className="h-11 w-full bg-transparent text-[16px] outline-none placeholder:text-[var(--muted-2)]"
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
                    <span className="shrink-0 text-[12px] font-medium text-[var(--muted-2)]">{r.group}</span>
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
          <p className="px-2 pb-1 pt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">By outcome</p>
          {solutionsByOutcome.map((s) => (
            <MobileLink key={s.name} item={s} onClose={onClose} />
          ))}
          <p className="px-2 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">By workforce</p>
          {solutionsByWorkforce.map((s) => (
            <MobileLink key={s.name} item={s} onClose={onClose} />
          ))}
          <p className="px-2 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-2)]">By need</p>
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
