import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Ambient "living background": a whisper of motion behind everything.
//   • dark mode  → fireflies drifting and softly pulsing
//   • light mode → leaves tumbling slowly down on a lazy breeze
//
// Deliberately faint. It should read as atmosphere you half-notice, never as a
// thing competing for attention. One <canvas>, one rAF loop throttled to ~30fps
// (slow drift doesn't need 60, and it keeps laptops/phones cool). It lives at
// z-[-1] — above the page background, behind all content — so it never touches
// the doodle layer (z-34+) or steals input (pointer-events: none).

const MAX_DPR = 2;
const FPS = 30;
const FRAME_MS = 1000 / FPS;
const DT_CAP = 0.05; // clamp the step after a stall / tab wake-up (seconds)

// warm firefly glow — tuned to the dark-mode amber accent
const FIREFLY_CORE = "255, 222, 150";
const FIREFLY_EDGE = "245, 158, 11";

// muted sage / olive / tan — tuned to the light-mode "Sage & Cream" palette
const LEAF_COLORS = [
  "74, 107, 78",
  "108, 122, 76",
  "150, 134, 92",
  "120, 110, 70",
];

// Leaf silhouettes in a unit box centred on the origin (x, y roughly in
// [-0.5, 0.5]). `body` is the blade outline; `veins` is the midrib + a couple
// of side veins, stroked faintly so each leaf reads as a real leaf, not a blob.
const LEAF_SHAPES = [
  {
    body: "M0 -0.5 C0.26 -0.18 0.24 0.28 0 0.5 C-0.24 0.28 -0.26 -0.18 0 -0.5 Z",
    veins:
      "M0 -0.46 L0 0.46 M0 -0.18 L0.12 -0.04 M0 -0.18 L-0.12 -0.04 M0 0.08 L0.13 0.22 M0 0.08 L-0.13 0.22",
  },
  {
    body: "M0 -0.5 C0.35 -0.1 0.3 0.34 0 0.48 C-0.3 0.34 -0.35 -0.1 0 -0.5 Z",
    veins:
      "M0 -0.46 L0 0.44 M0 -0.16 L0.16 -0.02 M0 -0.16 L-0.16 -0.02 M0 0.1 L0.17 0.24 M0 0.1 L-0.17 0.24",
  },
  {
    body: "M0.03 -0.5 C0.2 -0.2 0.22 0.3 0 0.5 C-0.22 0.28 -0.19 -0.22 0.03 -0.5 Z",
    veins: "M0.02 -0.46 L0 0.44 M0 -0.14 L0.12 -0.02 M0 0.12 L0.13 0.24",
  },
];

const rnd = (a, b) => a + Math.random() * (b - a);

// One reusable amber glow sprite. Drawn once, then stamped per firefly with
// drawImage + globalAlpha — far cheaper than building a radial gradient a frame.
function makeGlowSprite() {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, `rgba(${FIREFLY_CORE}, 0.95)`);
  grd.addColorStop(0.35, `rgba(${FIREFLY_EDGE}, 0.5)`);
  grd.addColorStop(1, `rgba(${FIREFLY_EDGE}, 0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, s, s);
  return c;
}

const LivingBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);

    const isDark = isDarkMode;
    const glow = isDark ? makeGlowSprite() : null;
    const leafPaths = isDark
      ? null
      : LEAF_SHAPES.map((s) => ({
          body: new Path2D(s.body),
          veins: new Path2D(s.veins),
        }));

    // ----- particle sets (seeded for the active theme) -----
    let fireflies = [];
    let leaves = [];

    const seed = () => {
      const mobile = w < 640;
      if (isDark) {
        const n = mobile ? 9 : Math.min(20, Math.round(w / 90));
        fireflies = Array.from({ length: n }, () => ({
          x: rnd(0, w),
          y: rnd(0, h),
          r: rnd(7, 15),
          baseA: rnd(0.12, 0.24),
          vx: rnd(-8, 8),
          vy: rnd(-8, 8),
          phase: rnd(0, Math.PI * 2),
          pulse: rnd(0.5, 1.1),
        }));
      } else {
        const n = mobile ? 6 : Math.min(12, Math.round(w / 150));
        leaves = Array.from({ length: n }, () => ({
          x: rnd(0, w),
          y: rnd(-h * 0.2, h),
          size: rnd(14, 26),
          rot: rnd(0, Math.PI * 2),
          vrot: rnd(-0.5, 0.5),
          fall: rnd(9, 20),
          swayA: rnd(8, 20),
          swayPhase: rnd(0, Math.PI * 2),
          swaySpeed: rnd(0.3, 0.7),
          color: LEAF_COLORS[Math.floor(rnd(0, LEAF_COLORS.length))],
          alpha: rnd(0.07, 0.14),
          shape: Math.floor(rnd(0, LEAF_SHAPES.length)),
        }));
      }
    };

    const sizeCanvas = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // gentle, optional cursor life — fireflies only, and very weak
    const pointer = { x: 0, y: 0, until: 0 };
    const onPointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.until = performance.now() + 1500; // relax shortly after the cursor stops
    };

    const drawFireflies = () => {
      ctx.globalAlpha = 1;
      for (const f of fireflies) {
        const a = f.baseA * (0.45 + 0.55 * (0.5 + 0.5 * Math.sin(f.phase)));
        const d = f.r * 2;
        ctx.globalAlpha = a;
        ctx.drawImage(glow, f.x - f.r, f.y - f.r, d, d);
      }
      ctx.globalAlpha = 1;
    };

    const drawLeaves = () => {
      for (const l of leaves) {
        const sway = Math.sin(l.swayPhase) * l.swayA;
        ctx.save();
        ctx.translate(l.x + sway, l.y);
        ctx.rotate(l.rot);
        ctx.scale(l.size, l.size);
        const p = leafPaths[l.shape];
        ctx.fillStyle = `rgba(${l.color}, ${l.alpha})`;
        ctx.fill(p.body);
        ctx.lineWidth = 0.028;
        ctx.strokeStyle = `rgba(${l.color}, ${l.alpha * 1.25})`;
        ctx.stroke(p.veins);
        ctx.restore();
      }
    };

    const step = (dt, now) => {
      if (isDark) {
        const cursorOn = now < pointer.until;
        for (const f of fireflies) {
          // slow random wander
          f.vx += rnd(-5, 5) * dt;
          f.vy += rnd(-5, 5) * dt;
          if (cursorOn) {
            const dx = pointer.x - f.x;
            const dy = pointer.y - f.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > 1 && d2 < 170 * 170) {
              const dist = Math.sqrt(d2);
              const pull = (1 - dist / 170) * 14; // faint draw toward the cursor
              f.vx += (dx / dist) * pull * dt;
              f.vy += (dy / dist) * pull * dt;
            }
          }
          const sp = Math.hypot(f.vx, f.vy);
          const MAX = 16;
          if (sp > MAX) {
            f.vx *= MAX / sp;
            f.vy *= MAX / sp;
          }
          f.x += f.vx * dt;
          f.y += f.vy * dt;
          if (f.x < -20) f.x = w + 20;
          else if (f.x > w + 20) f.x = -20;
          if (f.y < -20) f.y = h + 20;
          else if (f.y > h + 20) f.y = -20;
          f.phase += f.pulse * dt;
        }
      } else {
        for (const l of leaves) {
          l.y += l.fall * dt;
          l.rot += l.vrot * dt;
          l.swayPhase += l.swaySpeed * dt;
          if (l.y - l.size > h) {
            l.y = -l.size;
            l.x = rnd(0, w);
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      if (isDark) drawFireflies();
      else drawLeaves();
    };

    sizeCanvas();
    seed();

    // Reduced motion: paint a single static, faint frame and stop. No loop, no
    // listeners — purely decorative atmosphere with nothing moving on its own.
    if (reduceMotion) {
      render();
      return undefined;
    }

    let raf = null;
    let last = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const elapsed = now - last;
      if (elapsed < FRAME_MS) return; // throttle to ~30fps
      last = now - (elapsed % FRAME_MS);
      step(Math.min(DT_CAP, elapsed / 1000), now);
      render();
    };
    raf = requestAnimationFrame(loop);

    // Don't burn cycles painting a tab nobody's looking at.
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sizeCanvas();
        seed();
        if (document.hidden) render();
      }, 150);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isDarkMode, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-doodle-ignore
      className="pointer-events-none fixed inset-0 z-[-1]"
    />
  );
};

export default LivingBackground;
