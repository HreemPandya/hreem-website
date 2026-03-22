import { useRef, useEffect, useCallback, useState } from "react";

const GRAVITY = 0.12;
const DAMPING = 0.985;
const BOUNCE = 0.4;
const SAMPLE_DISTANCE = 6;
const STROKE_WIDTH = 2.5;

const MODES = [
  { id: "gravity", label: "↓", title: "Gravity" },
  { id: "glow", label: "✦", title: "Glow" },
  { id: "static", label: "-", title: "Static" },
  { id: "drift", label: "~", title: "Drift" },
  { id: "orbit", label: "↻", title: "Orbit" },
  { id: "magnet", label: "⊕", title: "Magnet" },
  { id: "jitter", label: "⁕", title: "Jitter" },
  { id: "wave", label: "≈", title: "Wave" },
  { id: "repel", label: "⊖", title: "Repel" },
  { id: "rise", label: "↑", title: "Rise" },
  { id: "pinball", label: "●", title: "Pinball" },
  { id: "zig", label: "↯", title: "Zigzag" },
];

const MODE_HINTS = {
  gravity: "it falls",
  glow: "it glows & fades",
  static: "it stays",
  drift: "it drifts",
  orbit: "it orbits",
  magnet: "it gathers",
  jitter: "it jitters",
  wave: "it waves",
  repel: "it pushes out",
  rise: "it rises",
  pinball: "it ricochets",
  zig: "it zigzags",
};

const DoodleBoard = ({ isDarkMode, topSpacing = "2.5rem" }) => {
  const [mode, setMode] = useState("gravity");
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const strokesRef = useRef([]);
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef([]);
  const animationRef = useRef(null);
  const lastPointRef = useRef(null);
  const frameCountRef = useRef(0);

  const strokeColor = isDarkMode ? "rgba(245, 158, 11, 0.85)" : "rgba(74, 107, 78, 0.85)";
  const glowColor = isDarkMode ? "rgba(245, 158, 11, 0.3)" : "rgba(74, 107, 78, 0.3)";

  const getCanvasPoint = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      vx: 0,
      vy: 0,
    };
  }, []);

  const samplePoint = useCallback((x, y) => {
    const last = lastPointRef.current;
    if (!last) {
      lastPointRef.current = { x, y };
      return { x, y, vx: 0, vy: 0 };
    }
    const dist = Math.hypot(x - last.x, y - last.y);
    if (dist < SAMPLE_DISTANCE) return null;
    lastPointRef.current = { x, y };
    return { x, y, vx: 0, vy: 0 };
  }, []);

  const handlePointerDown = useCallback(
    (e) => {
      isDrawingRef.current = true;
      const p = getCanvasPoint(e);
      if (p) {
        currentStrokeRef.current = [{ ...p }];
        lastPointRef.current = { x: p.x, y: p.y };
      }
    },
    [getCanvasPoint]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDrawingRef.current) return;
      const raw = getCanvasPoint(e);
      if (!raw) return;
      const p = samplePoint(raw.x, raw.y);
      if (p) currentStrokeRef.current.push(p);
    },
    [getCanvasPoint, samplePoint]
  );

  const handlePointerUp = useCallback(() => {
    if (isDrawingRef.current && currentStrokeRef.current.length > 1) {
      strokesRef.current.push({
        points: [...currentStrokeRef.current],
        alpha: 1,
      });
    }
    isDrawingRef.current = false;
    currentStrokeRef.current = [];
    lastPointRef.current = null;
  }, []);

  const runPhysics = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const t = frameCountRef.current * 0.016;

    strokesRef.current.forEach((stroke) => {
      const pts = stroke.points;

      if (mode === "gravity") {
        pts.forEach((p) => {
          p.vy += GRAVITY;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > h - 2) { p.y = h - 2; p.vy *= -BOUNCE; p.vx *= 0.8; }
          if (p.y < 2) { p.y = 2; p.vy *= -BOUNCE; }
          if (p.x < 2) { p.x = 2; p.vx *= -BOUNCE; }
          if (p.x > w - 2) { p.x = w - 2; p.vx *= -BOUNCE; }
        });
      } else if (mode === "drift") {
        const wind = Math.sin(t * 0.5) * 0.08;
        pts.forEach((p) => {
          p.vx += wind;
          p.vy += 0.02;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > h - 2) { p.y = h - 2; p.vy *= -0.3; }
          if (p.y < 2) { p.y = 2; p.vy *= -0.3; }
          if (p.x < 2) { p.x = 2; p.vx *= -0.3; }
          if (p.x > w - 2) { p.x = w - 2; p.vx *= -0.3; }
        });
      } else if (mode === "glow") {
        stroke.alpha = Math.max(0, stroke.alpha - 0.004);
      } else if (mode === "orbit") {
        const cx = w * 0.5;
        const cy = h * 0.5;
        const omega = 0.003;
        const cos = Math.cos(omega);
        const sin = Math.sin(omega);
        pts.forEach((p) => {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const nx = dx * cos - dy * sin;
          const ny = dx * sin + dy * cos;
          p.x = cx + nx;
          p.y = cy + ny;
        });
      } else if (mode === "magnet") {
        const cx = w * 0.5;
        const cy = h * 0.5;
        const pull = 0.004;
        pts.forEach((p) => {
          p.vx += (cx - p.x) * pull;
          p.vy += (cy - p.y) * pull;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        });
      } else if (mode === "jitter") {
        pts.forEach((p) => {
          p.x += (Math.random() - 0.5) * 3;
          p.y += (Math.random() - 0.5) * 3;
          p.x = Math.max(2, Math.min(w - 2, p.x));
          p.y = Math.max(2, Math.min(h - 2, p.y));
        });
      } else if (mode === "wave") {
        const wave = Math.sin(t * 0.6) * 0.12;
        pts.forEach((p) => {
          p.vx += wave + Math.sin(t * 0.4 + p.y * 0.015) * 0.06;
          p.vy += 0.015;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > h - 2) { p.y = h - 2; p.vy *= -0.3; }
          if (p.y < 2) { p.y = 2; p.vy *= -0.3; }
          if (p.x < 2) { p.x = 2; p.vx *= -0.3; }
          if (p.x > w - 2) { p.x = w - 2; p.vx *= -0.3; }
        });
      } else if (mode === "repel") {
        const cx = w * 0.5;
        const cy = h * 0.5;
        const push = 0.004;
        pts.forEach((p) => {
          p.vx += (p.x - cx) * push;
          p.vy += (p.y - cy) * push;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        });
      } else if (mode === "rise") {
        pts.forEach((p) => {
          p.vy -= GRAVITY;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < 2) { p.y = 2; p.vy *= -BOUNCE; p.vx *= 0.8; }
          if (p.y > h - 2) { p.y = h - 2; p.vy *= -BOUNCE; }
          if (p.x < 2) { p.x = 2; p.vx *= -BOUNCE; }
          if (p.x > w - 2) { p.x = w - 2; p.vx *= -BOUNCE; }
        });
      } else if (mode === "pinball") {
        // Super-bouncy: near-elastic floor, heavy falls, very little vertical drag
        const pinDampX = 0.982;
        const pinDampY = 0.993;
        const pinFloorBounce = 0.995;
        const pinFloorKick = 0.55;
        const pinWallBounce = 0.88;
        const pinCeilBounce = 0.78;
        pts.forEach((p) => {
          p.vy += GRAVITY * 1.05;
          p.vx += (Math.random() - 0.5) * 0.08;
          p.vy += (Math.random() - 0.5) * 0.03;
          p.vx *= pinDampX;
          p.vy *= pinDampY;
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > h - 2) {
            p.y = h - 2;
            const impact = Math.max(Math.abs(p.vy), 2);
            p.vy = -(impact * pinFloorBounce + pinFloorKick);
            p.vx *= 0.985;
          }
          if (p.y < 2) {
            p.y = 2;
            p.vy *= -pinCeilBounce;
            p.vx *= 0.94;
          }
          if (p.x < 2) {
            p.x = 2;
            p.vx *= -pinWallBounce;
            p.vy *= 0.94;
          }
          if (p.x > w - 2) {
            p.x = w - 2;
            p.vx *= -pinWallBounce;
            p.vy *= 0.94;
          }
        });
      } else if (mode === "zig") {
        pts.forEach((p) => {
          p.vx += Math.sin(t * 3 + p.y * 0.05) * 0.35;
          p.vy += 0.012;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > h - 2) { p.y = h - 2; p.vy *= -0.3; }
          if (p.y < 2) { p.y = 2; p.vy *= -0.3; }
          if (p.x < 2) { p.x = 2; p.vx *= -0.3; }
          if (p.x > w - 2) { p.x = w - 2; p.vx *= -0.3; }
        });
      }
    });

    frameCountRef.current += 1;
  }, [mode]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const drawStroke = (points, alpha = 1) => {
      if (!points || points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      if (mode === "glow") {
        ctx.shadowBlur = 12;
        ctx.shadowColor = glowColor;
        ctx.strokeStyle = strokeColor.replace(/[\d.]+\)$/, `${alpha})`);
      } else {
        ctx.strokeStyle = strokeColor;
      }
      ctx.lineWidth = STROKE_WIDTH;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    strokesRef.current = strokesRef.current.filter((s) => {
      if (mode === "glow" && s.alpha <= 0) return false;
      drawStroke(s.points, s.alpha);
      return true;
    });

    drawStroke(currentStrokeRef.current);

    runPhysics();
    animationRef.current = requestAnimationFrame(draw);
  }, [strokeColor, glowColor, mode, runPhysics]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    const raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  const handleClear = useCallback((e) => {
    e?.stopPropagation?.();
    strokesRef.current = [];
    currentStrokeRef.current = [];
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  return (
    <div className="space-y-2" style={{ marginTop: topSpacing }}>
      <div
        className="overflow-hidden rounded-xl border transition-colors duration-300"
        style={{
          borderColor: isDarkMode ? "rgba(245, 158, 11, 0.2)" : "rgba(74, 107, 78, 0.25)",
        }}
      >
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] min-h-[200px] max-h-[340px] touch-none"
          style={{
            backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.6)" : "rgba(248, 246, 242, 0.8)",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            style={{ touchAction: "none" }}
          />
          <button
            type="button"
            aria-label="Clear doodle"
            title="Clear"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleClear}
            className={`absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-md text-base font-light leading-none shadow-sm transition-colors ${
              isDarkMode
                ? "border border-white/15 bg-[#07090D]/75 text-amber-400/95 hover:bg-white/10 hover:text-amber-300"
                : "border border-[var(--lm-accent)]/25 bg-[color:rgba(252,250,247,0.95)] text-[var(--lm-accent)] hover:bg-[var(--lm-accent)]/10"
            }`}
          >
            ×
          </button>
        </div>
        <div
          className={`flex min-h-[2.75rem] w-full overflow-x-auto overflow-y-hidden border-t [-webkit-overflow-scrolling:touch] sm:min-h-[2.25rem] ${
            isDarkMode ? "border-white/10 bg-[#07090D]/55" : "border-[var(--lm-accent)]/20 bg-[color:rgba(248,246,242,0.92)]"
          }`}
        >
          {MODES.map((m, i) => (
            <button
              key={m.id}
              type="button"
              title={m.title}
              onClick={() => setMode(m.id)}
              className={`flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center text-[11px] leading-none transition-colors sm:min-h-[2.25rem] sm:min-w-0 sm:flex-1 ${
                i > 0 ? (isDarkMode ? "border-l border-white/10" : "border-l border-[var(--lm-accent)]/15") : ""
              } ${
                mode === m.id
                  ? isDarkMode
                    ? "bg-amber-500/90 text-[#07090D]"
                    : "bg-[color:rgba(74,107,78,0.22)] text-[var(--lm-text-primary)] ring-2 ring-[var(--lm-accent)] ring-inset"
                  : isDarkMode
                    ? "text-white/75 hover:bg-white/10"
                    : "text-[var(--lm-accent)]/85 hover:bg-[var(--lm-accent)]/12"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <p className={`text-xs ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        Draw: {MODE_HINTS[mode] ?? "it draws"}.{" "}
        <button
          type="button"
          onClick={handleClear}
          className={`underline hover:no-underline ${isDarkMode ? "text-amber-500/80 hover:text-amber-400" : "text-[var(--lm-accent)]/80 hover:text-[var(--lm-accent)]"}`}
        >
          Clear
        </button>
      </p>
    </div>
  );
};

export default DoodleBoard;
