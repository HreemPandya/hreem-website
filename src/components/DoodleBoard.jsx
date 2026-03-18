import { useRef, useEffect, useCallback, useState } from "react";

const GRAVITY = 0.12;
const DAMPING = 0.985;
const BOUNCE = 0.4;
const SAMPLE_DISTANCE = 6;
const STROKE_WIDTH = 2.5;

const MODES = [
  { id: "gravity", label: "↓", title: "Gravity" },
  { id: "glow", label: "✦", title: "Glow" },
  { id: "static", label: "—", title: "Static" },
  { id: "drift", label: "~", title: "Drift" },
];

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

  const handleClear = useCallback(() => {
    strokesRef.current = [];
  }, []);

  return (
    <div className="space-y-2" style={{ marginTop: topSpacing }}>
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] min-h-[200px] max-h-[340px] rounded-xl overflow-hidden border transition-colors duration-300 touch-none"
        style={{
          borderColor: isDarkMode ? "rgba(245, 158, 11, 0.2)" : "rgba(74, 107, 78, 0.25)",
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
        <div className="absolute bottom-1.5 left-1.5 flex gap-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              title={m.title}
              onClick={() => setMode(m.id)}
              className={`w-5 h-5 rounded text-[10px] flex items-center justify-center transition-colors ${
                mode === m.id
                  ? isDarkMode
                    ? "bg-amber-500/90 text-[#07090D]"
                    : "bg-[var(--lm-accent)] text-white"
                  : isDarkMode
                    ? "bg-white/15 text-white/70 hover:bg-white/25"
                    : "bg-[var(--lm-accent)]/20 text-[var(--lm-accent)]/80 hover:bg-[var(--lm-accent)]/30"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <p className={`text-xs ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        Draw — {mode === "gravity" && "it falls"}
        {mode === "glow" && "it glows & fades"}
        {mode === "static" && "it stays"}
        {mode === "drift" && "it drifts"}.{" "}
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
