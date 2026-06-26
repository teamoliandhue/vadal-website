"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Container } from "./ui";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import { HeroBento } from "./HeroBento";

/* ============================================================================
   ScrollHero — a Maze-style scroll-driven transformation.

   The screen is filled with a hidden field of card-sized rectangles. As you
   scroll they fade in and shrink in place; the four real product cards fade out
   and "become" four of those rectangles. Then every rectangle shrinks and
   travels inward, gathering into a glowing Aurora circle — revealing the next
   headline, "One platform. Every employee."

   Runs on a <canvas> driven by scroll progress (0→1). Enabled only on large
   screens without a reduced-motion preference; otherwise the hero and the
   reveal render as ordinary stacked sections.
   ========================================================================== */

type Particle = {
  hx: number; hy: number; // born-from-card position
  sx: number; sy: number; // spread (full-screen field) position
  phi: number; theta: number; // position on the globe (latitude, longitude)
  size: number;
  spark: boolean;
  rot: number; // per-particle rotation (radians)
};

// Vadal AI spark (sparkle) — same path as <SparkMark>, viewBox 0 0 24 24.
const SPARK_PATH = "M12 1.5c.5 5.6 2.4 7.9 8 8.5-5.6.6-7.5 2.9-8 8.5-.5-5.6-2.4-7.9-8-8.5 5.6-.6 7.5-2.9 8-8.5Z";


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
// precomputed aurora wash, indexed by horizontal screen position
const PALETTE = Array.from({ length: 33 }, (_, i) => aurora(i / 32));
const SPARK = "#FF8A5B";

export function ScrollHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const bentoColRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
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

    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let ocx = 0;
    let ocy = 0;
    let R = 0;

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
      R = Math.min(W, H) * 0.18;
      const minWH = Math.min(W, H);

      // particles are born across the cards, fan out across the whole screen as
      // a SPARSE field of distinct squares, then gather into the circle.
      const N = 1100;
      particles = new Array(N).fill(0).map(() => {
        let pick = Math.random() * totalArea;
        let rr = useRects[0];
        for (const r of useRects) {
          pick -= r.width * r.height;
          if (pick <= 0) { rr = r; break; }
        }
        // uniform point on the unit sphere (for the spinning globe)
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
    const sparkPath = new Path2D(SPARK_PATH); // client-only (Path2D not on server)

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

      // PARTICLES — emerge from the card positions as the cards dissolve, fan
      // out across the screen as a sparse field, then gather into the globe.
      const partA = smooth(0.05, 0.18, p);
      if (partA > 0.001) {
        const shrink = Math.pow(clamp((p - 0.06) / 0.5, 0, 1), 1.25);
        const sizeFactor = lerp(1.5, 0.85, shrink);
        const spin = nowMs * 0.00025; // time-based, smooth globe rotation (~25s/turn)
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
            // orange → the AI spark (sparkle). Path is 24u, centred at (12,12).
            const k = (s * 1.9) / 24;
            ctx!.scale(k, k);
            ctx!.translate(-12, -12);
            ctx!.fill(sparkPath);
          } else {
            // teal / violet → an equilateral triangle pointing down
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
            <div ref={textColRef} className="flex flex-col items-start gap-6">
              <h1 className="hero-display text-[var(--foreground)]">
                A better way to reach
                <br />&amp; <span className="aurora-text">engage</span> employees
              </h1>
              <p className="max-w-lg text-[19px] font-normal leading-relaxed text-[var(--muted)] text-pretty">
                In a world that never sits still, Vadal helps you reach, train and hear every
                employee — especially the people who don&apos;t sit at a desk.
              </p>
              <div className="mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Button href="/demo" size="lg" icon>
                  Book demo
                </Button>
                <Button href="/platform" variant="ghost" size="lg">
                  <Icon name="play" size={15} className="text-[var(--brand)]" />
                  Watch the 2-min tour
                </Button>
              </div>
            </div>
            <div ref={bentoColRef} className="will-change-transform">
              <HeroBento />
            </div>
          </Container>
        </div>

        {enabled && (
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
        )}

        {/* --------------------------------------------------------- reveal */}
        <div
          ref={revealRef}
          className={
            enabled
              ? "absolute inset-x-0 bottom-0 top-[58%] z-30 flex items-start justify-center opacity-0"
              : "relative z-10 flex items-center justify-center border-t border-[var(--line)] py-16 sm:py-24"
          }
          style={enabled ? { pointerEvents: "none" } : undefined}
        >
          <Container className="text-center">
            <h2 className="display-lg font-semibold">
              One platform.
              <br />
              <span className="aurora-text">Every employee.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-[var(--muted)]">
              Vadal brings communication, training, culture and tasks into one place — so
              engagement keeps pace with your people.
            </p>
            <div className="mt-8 flex justify-center">
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
