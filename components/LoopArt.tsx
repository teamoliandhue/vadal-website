"use client";

import { useEffect, useRef } from "react";

/* ============================================================================
   LoopArt — the five "Why Vadal.ai" scenes, as living particle fields.

   The first attempt at this borrowed a style from elsewhere: isometric slabs,
   slate outlines, hand-drawn coins and paper. It read as a different product's
   illustration set pasted into ours. Vadal already has a visual identity, and
   it is the hero: a globe made of thousands of luminous points, aurora colour
   running teal → blue → violet across it, no outlines, soft glow. These scenes
   belong to that.

   The idea: every card is the SAME field of particles, doing something
   different. Score gathers them from everywhere into one measure. Insight
   sorts them into bands. Action moves them, one owned lane at a time. Impact
   lifts them from a baseline to a higher one. The Loop sends them round and
   back to where they started. Motion is not decoration on top of a picture —
   the motion is the picture. Freeze any of them and you get a pleasant
   scatter; play them and each one becomes its argument.

   Drawn on canvas rather than as SVG because a few hundred glowing points
   redrawn every frame is exactly what canvas is for. Each scene is a small
   simulation with attractors, so the particles ease toward where they should be
   rather than tweening along fixed paths — that ease is what makes them look
   alive rather than looped.

   Respects prefers-reduced-motion by settling the field and drawing it once.
   Pauses when off-screen so the five of them cost nothing scrolled past.
   ========================================================================== */

type Vec = { x: number; y: number };
type P = Vec & { vx: number; vy: number };

/* aurora ramp, teal → blue → violet, sampled at t ∈ [0,1] */
function aurora(t: number): [number, number, number] {
  const a: [number, number, number] = [35, 215, 190];
  const b: [number, number, number] = [59, 158, 255];
  const c: [number, number, number] = [124, 92, 248];
  const f = t < 0.5 ? t * 2 : (t - 0.5) * 2;
  const [p, q] = t < 0.5 ? [a, b] : [b, c];
  return [0, 1, 2].map((k) => Math.round(p[k] + (q[k] - p[k]) * f)) as [number, number, number];
}
const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/* deterministic per-particle noise: each run looks the same, nothing pops */
const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/* the world is 320×220 units; the canvas fits it into whatever box it's in */
const W = 400, H = 170;
const TAU = Math.PI * 2;

/* ---------------------------------------------------------------- scenes */
/* Each scene seeds its particles, then per frame says where each one WANTS
   to be plus how it should look. The engine does the easing and the glow. */
type Scene = {
  n: number;
  spawn: (i: number) => Vec;
  target: (i: number, t: number) => Vec;
  hue: (i: number, t: number) => number;
  alpha?: (i: number, t: number) => number;
  size?: (i: number, t: number) => number;
  /** anything drawn under the particles: a track, a baseline, a marker */
  under?: (ctx: CanvasRenderingContext2D, t: number) => void;
};

/* Score — signals from everywhere gather into one number that keeps growing.
   Particles stream in from four edges (the channels) and stack into a column
   whose top edge breathes upward like a live reading. */
const SCORE_COLS = 34;
const SCORE: Scene = {
  n: 260,
  spawn: (i) => {
    const u = hash(i);
    switch (i % 4) {
      case 0: return { x: -10, y: 20 + u * 120 };
      case 1: return { x: W + 10, y: 20 + u * 120 };
      case 2: return { x: 30 + u * 340, y: -10 };
      default: return { x: 30 + u * 340, y: H + 10 };
    }
  },
  target: (i, t) => {
    const c = i % SCORE_COLS;
    const row = Math.floor(i / SCORE_COLS);
    const rise = 0.5 + 0.5 * Math.sin(t * 0.35);
    const rows = 6 + Math.round(rise * 4);
    const cx = W / 2 - (SCORE_COLS / 2) * 9.6 + c * 9.6 + (hash(i * 3) - 0.5) * 3;
    return { x: cx, y: 138 - (row % rows) * 9 + Math.sin(t * 1.3 + c * 0.35) * 1.6 };
  },
  hue: (i) => (i % SCORE_COLS) / SCORE_COLS,
  alpha: (i) => 0.55 + 0.45 * hash(i * 7),
  under: (ctx) => {
    ctx.strokeStyle = "rgba(35,215,190,0.28)";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(30, 145); ctx.lineTo(370, 145); ctx.stroke();
  },
};

/* Insight — the same cloud separates into three bands of different height and
   colour, and the middle one swells: the driver that matters, pulling ahead. */
const INSIGHT: Scene = {
  n: 240,
  spawn: (i) => ({ x: 40 + hash(i) * 320, y: 20 + hash(i * 5) * 120 }),
  target: (i, t) => {
    const band = i % 3;
    const j = Math.floor(i / 3);
    const heights = [0.55, 0.62 + 0.28 * (0.5 + 0.5 * Math.sin(t * 0.5)), 0.42];
    const cx = [90, 200, 310][band];
    const cols = 9;
    const c = j % cols;
    const row = Math.floor(j / cols);
    const maxRows = Math.max(1, Math.floor(15 * heights[band]));
    return {
      x: cx - (cols / 2) * 8.5 + c * 8.5 + (hash(i * 11) - 0.5) * 3,
      y: 142 - (row % maxRows) * 9 + Math.sin(t * 1.1 + c) * 1.4,
    };
  },
  hue: (i) => [0.05, 0.5, 0.92][i % 3],
  alpha: (i) => (i % 3 === 1 ? 0.95 : 0.6),
  under: (ctx) => {
    ctx.strokeStyle = "rgba(59,158,255,0.22)";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(30, 148); ctx.lineTo(370, 148); ctx.stroke();
  },
};

/* Action — three lanes, each led by an owner marker with its stream behind
   it. Nothing drifts; everything is going somewhere on purpose. */
const LANE_SPEED = [0.55, 0.42, 0.68];
const laneU = (i: number, t: number) => (t * LANE_SPEED[i % 3] * 0.16 + hash(i * 13)) % 1;
const ACTION: Scene = {
  n: 210,
  spawn: (i) => ({ x: -20 - hash(i) * 200, y: 46 + (i % 3) * 40 }),
  target: (i, t) => {
    const u = laneU(i, t);
    const y = 46 + (i % 3) * 40;
    return { x: 20 + u * 360, y: y + Math.sin(u * TAU * 2 + Math.floor(i / 3)) * 3 };
  },
  hue: (i) => [0.1, 0.5, 0.9][i % 3],
  alpha: (i, t) => Math.sin(laneU(i, t) * Math.PI) * 0.9,
  size: (i, t) => 1.4 + Math.sin(laneU(i, t) * Math.PI) * 1.2,
  under: (ctx, t) => {
    for (let l = 0; l < 3; l++) {
      const y = 46 + l * 40;
      const c = aurora([0.1, 0.5, 0.9][l]);
      ctx.strokeStyle = rgba(c, 0.18);
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(380, y); ctx.stroke();
      const x = 20 + ((t * LANE_SPEED[l] * 0.16) % 1) * 360;
      ctx.fillStyle = rgba(c, 0.95);
      ctx.shadowColor = rgba(c, 0.9);
      ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath(); ctx.arc(x, y, 2, 0, TAU); ctx.fill();
    }
  },
};

/* Impact — a low baseline and a high one. A wave sweeps left to right lifting
   particles from the low level to the high, and the colour climbs the ramp
   with them. Then it resets and proves it again. */
const IMPACT_COLS = 36;
const impactLift = (i: number, t: number) => {
  const c = i % IMPACT_COLS;
  const front = ((t * 0.22) % 1.4) * IMPACT_COLS;
  return c < front ? Math.min(1, (front - c) * 0.6) : 0;
};
const IMPACT: Scene = {
  n: 250,
  spawn: (i) => ({ x: 30 + hash(i) * 340, y: 136 + hash(i * 3) * 8 }),
  target: (i, t) => {
    const c = i % IMPACT_COLS;
    const row = Math.floor(i / IMPACT_COLS);
    const lift = impactLift(i, t);
    const highY = 62 - row * 8, lowY = 140 - row * 8;
    return {
      x: 30 + c * 9.6 + (hash(i * 3) - 0.5) * 3,
      y: lowY + (highY - lowY) * lift + Math.sin(t * 1.4 + c * 0.4) * 1.2,
    };
  },
  hue: (i, t) => 0.08 + impactLift(i, t) * 0.84,
  alpha: (i) => 0.55 + 0.4 * hash(i * 9),
  under: (ctx) => {
    ctx.setLineDash([3, 5]);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(35,215,190,0.35)";
    ctx.beginPath(); ctx.moveTo(30, 146); ctx.lineTo(370, 146); ctx.stroke();
    ctx.strokeStyle = "rgba(124,92,248,0.35)";
    ctx.beginPath(); ctx.moveTo(30, 66); ctx.lineTo(370, 66); ctx.stroke();
    ctx.setLineDash([]);
  },
};

/* The Loop — the field becomes a ring and travels it, hue cycling once per
   revolution so the colour returns to where it began. Four brighter markers
   ride it: the stages. Near side brighter than far — depth. */
const LOOP_N = 300;
const LOOP_RX = 140, LOOP_RY = 58, LOOP_CY = H / 2 + 4;
const loopA = (i: number, t: number) => (i / LOOP_N) * TAU + t * 0.28;
/* one place that turns an angle into a point on the ring, used by the particle
   band and by the four markers alike, so they can never drift apart */
const onRing = (a: number, dr = 0) => ({ x: W / 2 + Math.cos(a) * (LOOP_RX + dr), y: LOOP_CY + Math.sin(a) * (LOOP_RY + dr * 0.6) });
const LOOP: Scene = {
  n: LOOP_N,
  spawn: (i) => ({ x: W / 2 + (hash(i) - 0.5) * 80, y: H / 2 + (hash(i * 3) - 0.5) * 50 }),
  target: (i, t) => {
    const a = loopA(i, t);
    const jitter = (hash(i * 17) - 0.5) * 10;
    return onRing(a, jitter);
  },
  hue: (i) => (i / LOOP_N) % 1,
  alpha: (i, t) => 0.35 + 0.6 * ((Math.sin(loopA(i, t)) + 1) / 2),
  size: (i, t) => 1.2 + 1.3 * ((Math.sin(loopA(i, t)) + 1) / 2),
  under: (ctx, t) => {
    for (let k = 0; k < 4; k++) {
      /* the markers sit at four particle indices, so they ride the band exactly */
      const a = loopA((k * LOOP_N) / 4, t);
      const { x, y } = onRing(a);
      const near = (Math.sin(a) + 1) / 2;
      const c = aurora(k / 3);
      ctx.fillStyle = rgba(c, 0.5 + 0.5 * near);
      ctx.shadowColor = rgba(c, 0.9);
      ctx.shadowBlur = 18;
      ctx.beginPath(); ctx.arc(x, y, 5.5 + near * 2.5, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(255,255,255,${0.6 + 0.4 * near})`;
      ctx.beginPath(); ctx.arc(x, y, 2.4, 0, TAU); ctx.fill();
    }
  },
};

const SCENES = { score: SCORE, insight: INSIGHT, action: ACTION, impact: IMPACT, loop: LOOP } as const;
export type SceneName = keyof typeof SCENES;

/* --------------------------------------------------------------- engine */
export function LoopArt({ scene, className = "" }: { scene: SceneName; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const S = SCENES[scene];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = 1, cw = 0, ch = 0, scale = 1;
    const size = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cw = Math.max(1, Math.round(r.width));
      ch = Math.max(1, Math.round(r.height));
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      scale = Math.min(cw / W, ch / H);
    };
    size();

    const ps: P[] = Array.from({ length: S.n }, (_, i) => ({ ...S.spawn(i), vx: 0, vy: 0 }));

    let raf = 0, running = false;
    /* start mid-scene so the first frame is a formed field, not spawn points */
    let t0 = performance.now() - 4000;

    const frame = (nowMs: number) => {
      const t = (nowMs - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.translate((cw - W * scale) / 2, (ch - H * scale) / 2);
      ctx.scale(scale, scale);

      ctx.save(); S.under?.(ctx, t); ctx.restore();

      /* additive glow: soft halo under a crisp core, and 'lighter' compositing
         so overlapping points bloom — the same look as the hero globe */
      ctx.globalCompositeOperation = "lighter";
      const k = reduce ? 1 : 0.085;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const tg = S.target(i, t);
        /* critically damped ease: arrives without overshoot, follows a moving
           target smoothly */
        p.vx = (p.vx + (tg.x - p.x) * k) * 0.72;
        p.vy = (p.vy + (tg.y - p.y) * k) * 0.72;
        p.x += p.vx; p.y += p.vy;

        const c = aurora(S.hue(i, t));
        const alpha = S.alpha ? S.alpha(i, t) : 0.8;
        const r = S.size ? S.size(i, t) : 2.2;
        ctx.fillStyle = rgba(c, alpha * 0.22);
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 3.2, 0, TAU); ctx.fill();
        ctx.fillStyle = rgba(c, alpha);
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      frame(now);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      /* paint one frame now rather than waiting for the first tick, so a card
         scrolling into view never shows an empty plate for a frame */
      frame(performance.now());
      raf = requestAnimationFrame(loop);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    if (reduce) {
      /* settle the field, then leave it as a still */
      for (let s = 0; s < 240; s++) frame(t0 + 4000 + s * 16);
    }

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.05 });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { size(); if (!running) frame(performance.now()); });
    ro.observe(canvas);

    return () => { stop(); io.disconnect(); ro.disconnect(); };
  }, [scene]);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
