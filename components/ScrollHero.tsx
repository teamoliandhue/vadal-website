"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Container, Pill } from "./ui";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { HeroBento } from "./HeroBento";
import { HeroEmailForm } from "./HeroEmailForm";
import { heroV2, type IconName } from "@/lib/content";

/* ============================================================================
   ScrollHero — a Maze-style scroll-driven transformation.

   Particles are born across the real product cards; as you scroll the cards
   dissolve into them, the particles fan out across the screen as a sparse
   field, then gather into a slowly spinning globe — revealing the next
   headline, "One platform. Every decision." (The globe is the original form,
   restored by founder request after an interlude as a "V" mark.)

   Runs on a <canvas> driven by scroll progress (0→1). Enabled only on large
   screens without a reduced-motion preference; otherwise the hero and the
   reveal render as ordinary stacked sections.
   ========================================================================== */

type Particle = {
  hx: number; hy: number; // born-from-card position
  sx: number; sy: number; // spread (full-screen field) position
  phi: number; theta: number; // position on the globe (latitude, longitude)
  size: number;
  spark: boolean; // the occasional apricot AI sparkle among the triangles
  rot: number; // per-particle rotation (radians)
};

// the AI spark glyph (24u viewBox, centred at 12,12) — drawn for the ~5% of
// particles flagged `spark`
const SPARK_PATH = "M12 1.5c.5 5.6 2.4 7.9 8 8.5-5.6.6-7.5 2.9-8 8.5-.5-5.6-2.4-7.9-8-8.5 5.6-.6 7.5-2.9 8-8.5Z";
const SPARK = "#FF8A5B";


const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Aurora gradient: teal → blue → violet (+ a little spark apricot)
const STOPS = [
  [35, 215, 190],
  [59, 158, 255],
  [124, 92, 248],
];
function aurora(t: number) {
  t = clamp(t, 0, 1) * 2;
  const i = Math.min(1, Math.floor(t));
  const f = t - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return `rgb(${Math.round(lerp(a[0], b[0], f))},${Math.round(lerp(a[1], b[1], f))},${Math.round(lerp(a[2], b[2], f))})`;
}
/** same ramp with an alpha channel. aurora() returns `rgb(...)`, so appending
    a hex alpha to it produces invalid CSS and silently renders nothing. */
function auroraA(t: number, alpha: number) {
  t = clamp(t, 0, 1) * 2;
  const i = Math.min(1, Math.floor(t));
  const f = t - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const c = [0, 1, 2].map((k) => Math.round(lerp(a[k], b[k], f)));
  return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
}
// precomputed aurora wash, indexed by horizontal screen position
const PALETTE = Array.from({ length: 33 }, (_, i) => aurora(i / 32));

// Key features that fly in and dock around the "V" as it forms. Order matches
// FEATURE_DOCK below (upper-L, upper-R, mid-L, mid-R, lower-L, lower-R).
const HERO_FEATURES: { name: string; icon: IconName }[] = [
  { name: "Surveys", icon: "pulse" },
  { name: "Analytics", icon: "chart" },
  { name: "Listening", icon: "chat" },
  { name: "Action planning", icon: "checks" },
  { name: "Recognition", icon: "heart" },
  { name: "AI copilot", icon: "spark" },
];
// dock positions around the V, as fractions of (markW, markH) from its centre
const FEATURE_DOCK: [number, number][] = [
  [-0.94, -0.5], [0.94, -0.5],
  [-1.16, 0.0], [1.16, 0.0],
  [-0.82, 0.46], [0.82, 0.46],
];
// dot colour per chip — aurora spread so left reads teal, right reads violet
const FEATURE_DOT = FEATURE_DOCK.map(([dx]) => aurora((dx + 1.2) / 2.4));
/** the matching soft tint behind each chip's glyph */
const FEATURE_TINT = FEATURE_DOCK.map(([dx]) => auroraA((dx + 1.2) / 2.4, 0.14));

export function ScrollHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const bentoColRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);

  // decide whether to run the animation (robust across mount/resize timing)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      const force = (window as unknown as { __forceHero?: boolean }).__forceHero;
      if (typeof force === "boolean") return setEnabled(force);
      setEnabled(!mq.matches && window.innerWidth >= 1024);
    };
    decide();
    const r1 = requestAnimationFrame(decide);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(decide));
    mq.addEventListener("change", decide);
    window.addEventListener("resize", decide);
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      mq.removeEventListener("change", decide);
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sparkPath = new Path2D(SPARK_PATH); // client-only (Path2D not on server)

    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let ocx = 0;
    let ocy = 0;
    let R = 1; // globe radius
    let chipDock: { x: number; y: number }[] = [];    // docked target per feature chip
    let chipScatter: { x: number; y: number }[] = []; // scattered start per feature chip

    function build() {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(W * dpr);
      canvas!.height = Math.floor(H * dpr);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // measure the real cards — the particles are born across them, then the
      // cards dissolve (fade + blur + slight shrink) as the particles emerge.
      const bento = bentoColRef.current;
      if (bento) {
        bento.style.transform = "";
        bento.style.opacity = "";
        bento.style.filter = "";
      }
      const cardEls = stickyRef.current
        ? Array.from(stickyRef.current.querySelectorAll<HTMLElement>(".hero-bento > *"))
        : [];
      const rects = cardEls
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 4 && r.height > 4);
      const useRects =
        rects.length > 0
          ? rects
          : [{ left: W * 0.6, top: H * 0.2, width: W * 0.32, height: H * 0.52 } as DOMRect];
      const totalArea = useRects.reduce((a, r) => a + r.width * r.height, 0);

      ocx = W * 0.5;
      ocy = H * 0.34;
      const minWH = Math.min(W, H);
      R = minWH * 0.18;                // globe radius
      const span = R * 2.1;            // chip-dock span, ≈ the old mark's width

      // feature chips: docked around the globe, scattered across the upper screen
      chipDock = FEATURE_DOCK.map(([dx, dy]) => ({ x: ocx + dx * span, y: ocy + dy * span }));
      chipScatter = FEATURE_DOCK.map(() => ({
        x: W * (0.12 + 0.76 * Math.random()),
        y: H * (0.08 + 0.46 * Math.random()),
      }));

      // particles are born across the cards, fan out across the whole screen as
      // a SPARSE field, then gather onto the spinning globe.
      const N = 1100;
      particles = new Array(N).fill(0).map(() => {
        let pick = Math.random() * totalArea;
        let rr = useRects[0];
        for (const r of useRects) {
          pick -= r.width * r.height;
          if (pick <= 0) { rr = r; break; }
        }
        // uniform point on the unit sphere
        const sphereU = Math.random();
        const sphereV = Math.random();
        return {
          hx: rr.left + Math.random() * rr.width,
          hy: rr.top + Math.random() * rr.height,
          sx: -0.05 * W + Math.random() * 1.1 * W,
          sy: -0.05 * H + Math.random() * 1.1 * H,
          phi: Math.acos(2 * sphereV - 1),
          theta: 2 * Math.PI * sphereU,
          size: minWH * (0.006 + Math.pow(Math.random(), 1.7) * 0.014),
          spark: Math.random() < 0.05,
          rot: Math.random() * Math.PI * 2,
        };
      });
    }

    let progress = 0;
    let lastDrawn = -1;

    function draw() {
      const p = progress;
      const nowMs = performance.now();

      // the cards dissolve — fade + blur + a slight shrink — exactly as the
      // particle cloud emerges from where they were (a direct card → particles
      // transform, no colour-wash overlay).
      if (bentoColRef.current) {
        const f = smooth(0.05, 0.2, p);
        bentoColRef.current.style.opacity = String(1 - f);
        bentoColRef.current.style.transform = `scale(${1 - 0.05 * f})`;
        bentoColRef.current.style.filter = f > 0.001 ? `blur(${6 * f}px)` : "";
      }
      if (textColRef.current) {
        textColRef.current.style.opacity = String(1 - smooth(0.1, 0.3, p));
      }
      if (heroRef.current) heroRef.current.style.pointerEvents = p > 0.06 ? "none" : "auto";

      const revealOp = smooth(0.76, 0.96, p);
      if (revealRef.current) {
        revealRef.current.style.opacity = String(revealOp);
        revealRef.current.style.pointerEvents = revealOp < 0.5 ? "none" : "auto";
        revealRef.current.style.transform = `translateY(${18 * (1 - revealOp)}px)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = String(clamp(1 - revealOp * 1.4, 0, 1));

      ctx!.clearRect(0, 0, W, H);

      // PARTICLES — emerge from the cards, fan out across the screen, then
      // gather onto the globe: a sphere that spins on its vertical axis so the
      // particles circulate, near-side ones larger & brighter.
      const partA = smooth(0.05, 0.18, p);
      if (partA > 0.001) {
        const shrink = Math.pow(clamp((p - 0.06) / 0.5, 0, 1), 1.25);
        const sizeFactor = lerp(1.5, 0.85, shrink);
        const spin = nowMs * 0.00025; // smooth, time-based rotation (~25s/turn)
        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i];
          let x: number;
          let y: number;
          let depthT = 1; // 0 = far side of the globe, 1 = near side
          let gphase = 0; // 0 = scattered field, 1 = settled on the globe
          if (p <= 0.46) {
            // hold at the card position while emerging, then fan out
            const u = easeInOut(clamp((p - 0.18) / 0.28, 0, 1));
            x = lerp(pt.hx, pt.sx, u);
            y = lerp(pt.hy, pt.sy, u);
          } else {
            // project the particle's sphere point, rotated around the Y axis
            gphase = easeInOut(clamp((p - 0.46) / 0.22, 0, 1));
            const a = pt.theta + spin;
            const sinPhi = Math.sin(pt.phi);
            const gx = ocx + sinPhi * Math.cos(a) * R;
            const gy = ocy - Math.cos(pt.phi) * R;
            depthT = (sinPhi * Math.sin(a) + 1) / 2;
            x = lerp(pt.sx, gx, gphase);
            y = lerp(pt.sy, gy, gphase);
          }
          // aurora wash by screen position, so the globe reads teal → violet
          const idx = clamp(Math.round(((x - (ocx - R)) / (2 * R)) * 32), 0, 32);
          ctx!.fillStyle = pt.spark ? SPARK : PALETTE[idx];
          // depth cues ramp in as the globe forms: near particles bigger & brighter
          const depthSize = lerp(1, 0.5 + 0.5 * depthT, gphase);
          ctx!.globalAlpha = partA * lerp(1, 0.32 + 0.68 * depthT, gphase);
          const s = pt.size * sizeFactor * depthSize;
          ctx!.save();
          ctx!.translate(x, y);
          ctx!.rotate(pt.rot);
          if (pt.spark) {
            const k = (s * 1.9) / 24;
            ctx!.scale(k, k);
            ctx!.translate(-12, -12);
            ctx!.fill(sparkPath);
          } else {
            // brand triangle, pointing down
            const r = s * 0.66;
            ctx!.beginPath();
            ctx!.moveTo(0, r);
            ctx!.lineTo(r * 0.866, -r * 0.5);
            ctx!.lineTo(-r * 0.866, -r * 0.5);
            ctx!.closePath();
            ctx!.fill();
          }
          ctx!.restore();
        }
        ctx!.globalAlpha = 1;
      }

      // FEATURE CHIPS — fade in scattered, then fly in and dock around the V,
      // where they stay through the reveal ("every capability, one platform").
      const chipEls = chipRefs.current;
      if (chipEls.length && chipDock.length) {
        const chipOp = smooth(0.3, 0.44, p);
        const dockPhase = easeInOut(clamp((p - 0.46) / 0.26, 0, 1));
        for (let i = 0; i < chipEls.length; i++) {
          const el = chipEls[i];
          const sc = chipScatter[i];
          const dk = chipDock[i];
          if (!el || !sc || !dk) continue;
          const cx = lerp(sc.x, dk.x, dockPhase);
          const cy = lerp(sc.y, dk.y, dockPhase);
          el.style.opacity = String(chipOp);
          el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${lerp(0.9, 1, dockPhase)})`;
        }
      }
    }

    function compute() {
      const total = track!.offsetHeight - window.innerHeight;
      const scrolled = clamp(-track!.getBoundingClientRect().top, 0, Math.max(1, total));
      progress = total > 0 ? scrolled / total : 0;
    }

    let raf = 0;
    let running = false;
    function loop() {
      compute();
      // redraw on scroll change, and every frame once the globe is forming so
      // its continuous spin stays smooth even when the page isn't scrolling
      if (Math.abs(progress - lastDrawn) > 0.0005 || progress > 0.42) {
        draw();
        lastDrawn = progress;
      }
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    build();
    draw();
    const t = window.setTimeout(() => {
      build();
      draw();
    }, 900);

    // only burn frames while the hero is actually on screen
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(track);

    const onResize = () => {
      build();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
      // clear any inline styles the animation left behind so the static
      // fallback (if the viewport/motion preference changes) renders clean
      for (const r of [heroRef, textColRef, bentoColRef, revealRef, cueRef]) {
        if (r.current) {
          r.current.style.opacity = "";
          r.current.style.transform = "";
          r.current.style.pointerEvents = "";
          r.current.style.filter = "";
        }
      }
      for (const el of chipRefs.current) {
        if (el) { el.style.opacity = "0"; el.style.transform = ""; }
      }
    };
  }, [enabled]);

  return (
    <section ref={trackRef} className="relative" style={{ height: enabled ? "260vh" : undefined }}>
      <div ref={stickyRef} className={enabled ? "sticky top-0 h-screen overflow-hidden" : "relative"}>
        <div className="aurora-wash pointer-events-none absolute inset-0 -z-10" />

        {/* ----------------------------------------------------------- hero */}
        <div
          ref={heroRef}
          className={enabled ? "absolute inset-0 z-10 flex items-center pb-16" : "relative z-10 flex items-center"}
        >
          <Container className="grid w-full items-center gap-12 py-12 lg:grid-cols-[56%_44%] lg:gap-10 lg:py-6">
            <div ref={textColRef} className="flex flex-col items-start gap-5">
              <Pill aurora>
                <SparkMark size={14} animate />
                {/* the full positioning line wraps awkwardly at phone widths */}
                <span className="sm:hidden">AI-Powered Decision Intelligence</span>
                <span className="hidden sm:inline">{heroV2.pill}</span>
              </Pill>
              <h1 className="hero-display text-[var(--foreground)]">
                {heroV2.titleA}
                <br />
                <span className="aurora-text">{heroV2.titleB}</span>
              </h1>
              <p className="max-w-lg text-[16px] font-normal leading-relaxed text-[var(--muted)] text-pretty sm:text-[17px]">
                {heroV2.lede}
              </p>
              <HeroEmailForm />
              <Button href="/platform" variant="ghost" size="lg" className="w-full justify-center sm:w-auto">
                <Icon name="play" size={15} className="text-[var(--brand)]" />
                {heroV2.secondaryCta}
              </Button>
            </div>
            <div ref={bentoColRef} className="will-change-transform">
              <HeroBento />
            </div>
          </Container>
        </div>

        {enabled && (
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
        )}

        {/* ----------------------- feature chips (dock around the globe) */}
        {enabled && (
          <div className="pointer-events-none absolute inset-0 z-[25]" aria-hidden="true">
            {HERO_FEATURES.map((f, i) => (
              <div
                key={f.name}
                ref={(el) => { chipRefs.current[i] = el; }}
                className="absolute left-0 top-0 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--card)] py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold text-[var(--foreground)] shadow-[var(--shadow-md)] will-change-transform"
                style={{ opacity: 0 }}
              >
                {/* the dot became a glyph: same aurora position along the ramp,
                    but the chip now says what the capability IS */}
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                  style={{ background: FEATURE_TINT[i], color: FEATURE_DOT[i] }}
                >
                  <Icon name={f.icon} size={13} />
                </span>
                {f.name}
              </div>
            ))}
          </div>
        )}

        {/* --------------------------------------------------------- reveal */}
        {/* In animated mode the reveal must fit inside the bottom ~44% of the
            pinned viewport — cap type by viewport HEIGHT too (min of the width
            clamp and a vh cap) so nothing clips on short laptop screens. */}
        <div
          ref={revealRef}
          className={
            enabled
              ? "absolute inset-x-0 bottom-0 top-[56%] z-30 flex items-start justify-center opacity-0"
              : "relative z-10 flex items-center justify-center border-t border-[var(--line)] py-16 sm:py-24"
          }
          style={enabled ? { pointerEvents: "none" } : undefined}
        >
          <Container className="text-center">
            <h2
              className={
                enabled
                  ? "text-[min(clamp(2.2rem,4.4vw,4.2rem),7.2vh)] font-semibold leading-[1.06] tracking-[-0.025em]"
                  : "display-lg font-semibold"
              }
            >
              One platform.
              <br />
              <span className="aurora-text">Every decision.</span>
            </h2>
            <p
              className={`mx-auto max-w-xl leading-relaxed text-[var(--muted)] ${
                enabled ? "mt-[min(1.25rem,2vh)] text-[min(18px,2.2vh)]" : "mt-5 text-[18px]"
              }`}
            >
              Vadal.ai unifies engagement, workforce intelligence and action planning in one
              place, so every people decision is a confident one.
            </p>
            <div className={`flex justify-center ${enabled ? "mt-[min(2rem,3vh)]" : "mt-8"}`}>
              <Button href="/platform" size="lg" icon>
                Explore the platform
              </Button>
            </div>
          </Container>
        </div>

        {enabled && (
          <div ref={cueRef} className="absolute inset-x-0 bottom-7 z-30 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-[13px] font-medium text-[var(--muted)] shadow-[var(--shadow-sm)]">
              <SparkMark size={13} />
              Scroll to continue
              <Icon name="arrow" size={14} className="rotate-90 text-[var(--brand)]" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
