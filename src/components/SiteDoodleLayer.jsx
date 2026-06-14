import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Pencil, X, Undo2, Trash2 } from "lucide-react";

// Same physics DNA as DoodleBoard, promoted to a site-wide layer.
// Strokes live in DOCUMENT space (pageX/pageY) so ink stays anchored to the
// page while you scroll — the fixed canvas just renders a scrolled window.
//
// Perf model: TWO canvases.
//   • base  — settled ink. Repainted only when it changes (commit / scroll /
//             resize / theme / physics tick). Costs nothing while you draw.
//   • live  — only the in-progress stroke. Cheap clear+redraw of ONE stroke
//             per frame, so latency stays flat no matter how much history.
const GRAVITY = 0.12;
const DAMPING = 0.985;
const BOUNCE = 0.4;
const SAMPLE_DISTANCE = 5;
const STROKE_WIDTH = 2.5;
const MAX_DPR = 2; // beyond 2x the visual gain is nil but fill cost is quadratic

// ---- element collision (ink ricochets off real on-page blocks) ----
// Falling ink treats visible content blocks as solid: it drapes over the TOP
// edge, slides/bounces off the SIDES, and rests on top. Obstacles are measured
// in document space and indexed in a static spatial grid, so the per-point test
// each frame is one Map lookup against a tiny candidate list (not every block).
const OBSTACLE_SELECTOR =
  '#projects .rounded-2xl,[aria-label^="Areas of expertise"],h1,h2,h3,p,img';
const OBSTACLE_BOUNCE = 0.32; // restitution off element edges in Fall
const OBSTACLE_BOUNCE_DRIFT = 0.5; // livelier bounce so Drift keeps wandering
const OBSTACLE_MIN_W = 40; // ignore tiny things (icons, single tags)
const OBSTACLE_MIN_H = 14;
const OBSTACLE_PAD = 2; // inflate rects by ~half the stroke width
const REST_SPEED = 0.5; // supported + slower than this → snap to rest (lets rAF idle)
const GRID_CELL = 220; // spatial-hash cell size in px
const GRID_STRIDE = 8192; // key = cy * stride + cx (cx range is tiny)

// Swept, direction-aware resolve against blocks in the point's grid cell.
// Classifies the collision by which edge the point CROSSED this frame (using its
// previous position p − v), so it can't tunnel through or get ejected out the far
// side of a block. Returns 1 when the point is supported (landed on / rests on a block).
//   • crossed a TOP edge falling   → land on the highest such top
//   • crossed a SIDE face          → ricochet off it
//   • already inside (e.g. drawn on a block) → rest in place
function collidePoint(p, obst, bounce) {
  const grid = obst.grid;
  if (grid.size === 0) return 0;
  const cell = obst.cell;
  const arr = grid.get(Math.floor(p.y / cell) * GRID_STRIDE + Math.floor(p.x / cell));
  if (!arr) return 0;

  const prevX = p.x - p.vx;
  const prevY = p.y - p.vy;
  let topY = Infinity; // highest top edge we dropped onto
  let underB = Infinity; // nearest underside we rose into
  let sideHit = 0; // 1 left face, 2 right face
  let sideX = 0;
  let inside = false;

  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    const l = a.l - OBSTACLE_PAD;
    const r = a.r + OBSTACLE_PAD;
    const t = a.t - OBSTACLE_PAD;
    const b = a.b + OBSTACLE_PAD;
    if (p.x <= l || p.x >= r || p.y <= t || p.y >= b) continue; // not penetrating now
    if (p.vy > 0 && prevY <= t) {
      if (t < topY) topY = t; // came down through the top → land
    } else if (p.vy < 0 && prevY >= b) {
      if (b < underB) underB = b; // came up through the bottom
    } else if (p.vx > 0 && prevX <= l) {
      if (!sideHit) { sideHit = 1; sideX = l; }
    } else if (p.vx < 0 && prevX >= r) {
      if (!sideHit) { sideHit = 2; sideX = r; }
    } else {
      inside = true; // no clean crossing → originated inside this block
    }
  }

  if (topY !== Infinity) {
    p.y = topY;
    if (p.vy > 0) p.vy = -p.vy * bounce;
    p.vx *= 0.82; // friction along the surface
    return 1;
  }
  if (sideHit) {
    p.x = sideX;
    p.vx = -p.vx * bounce;
    return 0;
  }
  if (underB !== Infinity) {
    p.y = underB;
    if (p.vy < 0) p.vy = -p.vy * bounce;
    return 0;
  }
  return inside ? 1 : 0; // resting on a block it was drawn on
}

const STORAGE_KEY = "hreem-site-doodles-v1";
const HINT_KEY = "hreem-doodle-hint-dismissed";
const MAX_STROKES = 80;
const MAX_POINTS = 6000;
const VELOCITY_EPS = 0.08;
const GLOW_ALPHA_EPS = 0.002;
const TWITCH_THROTTLE_MS = 1400;

const MODES = [
  { id: "stay", label: "Stay", hint: "ink stays where you put it" },
  { id: "fall", label: "Fall", hint: "ink tumbles down to the cat" },
  { id: "drift", label: "Drift", hint: "ink floats on a lazy breeze" },
  { id: "glow", label: "Glow", hint: "ink glows, then fades away" },
];

// Modes safe under prefers-reduced-motion: nothing moves on its own.
const REDUCED_MODE_IDS = new Set(["stay", "glow"]);

function strokesSettled(strokes) {
  for (const s of strokes) {
    for (const p of s.points) {
      if (Math.abs(p.vx ?? 0) >= VELOCITY_EPS || Math.abs(p.vy ?? 0) >= VELOCITY_EPS) {
        return false;
      }
    }
  }
  return true;
}

function computeBBox(points) {
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { minY, maxY };
}

const safeStorage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* private mode / storage blocked */
    }
  },
};

const SiteDoodleLayer = ({ isDarkMode }) => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState("stay");
  const [showHint, setShowHint] = useState(false);
  const [hasInk, setHasInk] = useState(false);

  const baseCanvasRef = useRef(null);
  const liveCanvasRef = useRef(null);
  const strokesRef = useRef([]);
  const currentStrokeRef = useRef([]);
  const isDrawingRef = useRef(false);
  const rafRef = useRef(null);
  const lastPointRef = useRef(null);
  const frameCountRef = useRef(0);
  const modeRef = useRef(mode);
  const activeRef = useRef(active);
  const worldRef = useRef({ floorY: 0, catL: -1, catR: -1, docW: 1024, docH: 4000 });
  const obstaclesRef = useRef({ rects: [], grid: new Map(), cell: GRID_CELL });
  const saveTimerRef = useRef(null);
  const lastTwitchRef = useRef(0);
  const hintTimersRef = useRef([]);
  const baseDirtyRef = useRef(false);
  const dprRef = useRef(1);
  // colors read through a ref so render fns stay stable across theme changes
  const colorsRef = useRef({ stroke: "", glow: "" });
  colorsRef.current = {
    stroke: isDarkMode ? "rgba(245, 158, 11, 0.85)" : "rgba(74, 107, 78, 0.85)",
    glow: isDarkMode ? "rgba(245, 158, 11, 0.3)" : "rgba(74, 107, 78, 0.3)",
  };

  modeRef.current = mode;
  activeRef.current = active;

  const visibleModes = reduceMotion ? MODES.filter((m) => REDUCED_MODE_IDS.has(m.id)) : MODES;

  // ----- world geometry (floor = the cat's ground line in the footer) -----
  const measureWorld = useCallback(() => {
    const docEl = document.documentElement;
    const docW = docEl.clientWidth;
    const docH = docEl.scrollHeight;
    let floorY = docH - 24;
    let catL = -1;
    let catR = -1;
    const cats = document.querySelectorAll(".footer-cat-container");
    for (const el of cats) {
      const r = el.getBoundingClientRect();
      if (r.width > 10 && r.height > 10) {
        floorY = Math.min(docH - 8, r.bottom + window.scrollY - 10);
        catL = r.left - 80;
        catR = r.right + 40;
        break;
      }
    }
    worldRef.current = { floorY, catL, catR, docW, docH };
  }, []);

  // ----- solid blocks the falling ink ricochets off (document space) -----
  // Only built for fall/drift; otherwise cleared so it costs nothing.
  const measureObstacles = useCallback(() => {
    const modeNow = modeRef.current;
    if (modeNow !== "fall" && modeNow !== "drift") {
      obstaclesRef.current = { rects: [], grid: new Map(), cell: GRID_CELL };
      return;
    }
    const sx = window.scrollX;
    const sy = window.scrollY;
    const maxH = window.innerHeight * 1.1; // taller than the screen ⇒ a backdrop, not a block
    const cands = [];
    const nodes = document.querySelectorAll(OBSTACLE_SELECTOR);
    for (const el of nodes) {
      // skip animated/movable widgets, the footer (keep the floor→cat path clean),
      // and the doodle UI itself
      if (el.closest("[data-doodle-ignore]") || el.closest("#site-footer")) continue;
      const r = el.getBoundingClientRect();
      if (r.width < OBSTACLE_MIN_W || r.height < OBSTACLE_MIN_H) continue;
      if (r.height > maxH) continue; // full-bleed background images / section backdrops
      const pos = getComputedStyle(el).position;
      if (pos === "fixed" || pos === "sticky") continue; // scroll-anchored ≠ document space
      cands.push({
        el,
        l: r.left + sx,
        t: r.top + sy,
        r: r.right + sx,
        b: r.bottom + sy,
      });
    }

    // Collapse nesting by DOM ancestry: a card absorbs ONLY its own descendants
    // (its heading/paragraph/image) into one clean rectangle, while standalone
    // blocks survive. Geometry-only nesting would wrongly let an unrelated
    // overlapping element swallow a card.
    const kept = cands.filter(
      (a) => !cands.some((b) => b.el !== a.el && b.el.contains(a.el))
    );

    // Spatial hash — static for the life of a fall, so per-point lookup is O(1)-ish.
    const rects = kept.map((k) => ({ l: k.l, t: k.t, r: k.r, b: k.b }));
    const grid = new Map();
    for (let i = 0; i < rects.length; i++) {
      const a = rects[i];
      const cx0 = Math.floor((a.l - OBSTACLE_PAD) / GRID_CELL);
      const cx1 = Math.floor((a.r + OBSTACLE_PAD) / GRID_CELL);
      const cy0 = Math.floor((a.t - OBSTACLE_PAD) / GRID_CELL);
      const cy1 = Math.floor((a.b + OBSTACLE_PAD) / GRID_CELL);
      for (let cy = cy0; cy <= cy1; cy++) {
        for (let cx = cx0; cx <= cx1; cx++) {
          const key = cy * GRID_STRIDE + cx;
          let bucket = grid.get(key);
          if (!bucket) {
            bucket = [];
            grid.set(key, bucket);
          }
          bucket.push(a);
        }
      }
    }
    obstaclesRef.current = { rects, grid, cell: GRID_CELL };
  }, []);

  const pokeCat = useCallback(() => {
    const now = Date.now();
    if (now - lastTwitchRef.current < TWITCH_THROTTLE_MS) return;
    lastTwitchRef.current = now;
    window.dispatchEvent(new CustomEvent("hreem:doodle-landed"));
  }, []);

  // ----- persistence -----
  const persist = useCallback(() => {
    const { docW } = worldRef.current;
    const data = {
      v: 1,
      w: docW,
      strokes: strokesRef.current.map((s) => ({
        pts: s.points.map((p) => [Math.round(p.x), Math.round(p.y)]),
      })),
    };
    safeStorage.set(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const scheduleSave = useCallback(() => {
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(persist, 800);
  }, [persist]);

  // ----- physics (document space; floor is the footer cat's ground line) -----
  const runPhysics = useCallback(() => {
    const { floorY, catL, catR, docW } = worldRef.current;
    const modeNow = modeRef.current;
    const t = frameCountRef.current * 0.016;
    const catCx = catL > 0 ? (catL + catR) / 2 : null;

    strokesRef.current.forEach((stroke) => {
      const pts = stroke.points;

      if (modeNow === "fall") {
        const obst = obstaclesRef.current;
        for (const p of pts) {
          if (p.rest) continue; // already settled — frozen until cleared/redrawn
          p.vy += GRAVITY;
          if (catCx !== null) p.vx += Math.sign(catCx - p.x) * 0.006;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;

          // ricochet off / rest on real page blocks on the way down
          let onSurface = collidePoint(p, obst, OBSTACLE_BOUNCE);

          if (p.y > floorY) {
            p.y = floorY;
            if (!p.landed && Math.abs(p.vy) > 0.5) {
              p.landed = true;
              pokeCat();
            }
            p.vy *= -BOUNCE;
            p.vx *= 0.8;
            onSurface = 1;
          }
          if (p.y < 2) { p.y = 2; p.vy *= -BOUNCE; }
          if (p.x < 2) { p.x = 2; p.vx *= -BOUNCE; }
          if (p.x > docW - 2) { p.x = docW - 2; p.vx *= -BOUNCE; }

          // supported + slow on both axes → freeze for good. Without this, the
          // gentle pull toward the cat keeps nudging settled ink so it creeps
          // off edges forever and the rAF loop never idles.
          if (onSurface && Math.abs(p.vy) < REST_SPEED && Math.abs(p.vx) < REST_SPEED) {
            p.vx = 0;
            p.vy = 0;
            p.rest = true;
          }
        }
        stroke.bbox = computeBBox(pts);
      } else if (modeNow === "drift") {
        const obst = obstaclesRef.current;
        const wind = Math.sin(t * 0.5) * 0.08;
        for (const p of pts) {
          p.rest = false; // the breeze re-animates everything
          p.vx += wind;
          p.vy += 0.02;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
          collidePoint(p, obst, OBSTACLE_BOUNCE_DRIFT); // bump around blocks, keep floating
          if (p.y > floorY) { p.y = floorY; p.vy *= -0.3; }
          if (p.y < 2) { p.y = 2; p.vy *= -0.3; }
          if (p.x < 2) { p.x = 2; p.vx *= -0.3; }
          if (p.x > docW - 2) { p.x = docW - 2; p.vx *= -0.3; }
        }
        stroke.bbox = computeBBox(pts);
      } else if (modeNow === "glow") {
        stroke.alpha = Math.max(0, stroke.alpha - 0.004);
      }
    });

    frameCountRef.current += 1;
    // layout can shift under long falls (lazy images etc.) — re-measure occasionally
    if (frameCountRef.current % 180 === 0 && modeNow !== "stay") {
      measureWorld();
      measureObstacles();
    }
  }, [measureWorld, measureObstacles, pokeCat]);

  // ----- shared stroke renderer: quadratic smoothing for silky lines -----
  const drawStroke = useCallback((ctx, points, glow, alpha) => {
    const n = points.length;
    if (n < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    if (n === 2) {
      ctx.lineTo(points[1].x, points[1].y);
    } else {
      for (let i = 1; i < n - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.quadraticCurveTo(points[n - 2].x, points[n - 2].y, points[n - 1].x, points[n - 1].y);
    }
    const { stroke, glow: glowCol } = colorsRef.current;
    if (glow) {
      ctx.shadowBlur = 12;
      ctx.shadowColor = glowCol;
      ctx.strokeStyle = stroke.replace(/[\d.]+\)$/, `${alpha})`);
    } else {
      ctx.shadowBlur = 0;
      ctx.strokeStyle = stroke;
    }
    ctx.lineWidth = STROKE_WIDTH;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, []);

  const renderBase = useCallback(() => {
    const canvas = baseCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = dprRef.current;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, -window.scrollY * dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const modeNow = modeRef.current;
    const viewTop = window.scrollY - 80;
    const viewBottom = window.scrollY + window.innerHeight + 80;

    let removed = false;
    strokesRef.current = strokesRef.current.filter((s) => {
      if (modeNow === "glow" && s.alpha <= 0) {
        removed = true;
        return false;
      }
      const bb = s.bbox;
      const culled = bb && (bb.maxY < viewTop || bb.minY > viewBottom);
      if (!culled) drawStroke(ctx, s.points, modeNow === "glow", s.alpha);
      return true;
    });
    if (removed) {
      setHasInk(strokesRef.current.length > 0);
      scheduleSave();
    }
  }, [drawStroke, scheduleSave]);

  const renderLive = useCallback(() => {
    const canvas = liveCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = dprRef.current;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pts = currentStrokeRef.current;
    if (pts.length < 2) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, -window.scrollY * dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    drawStroke(ctx, pts, modeRef.current === "glow", 1);
  }, [drawStroke]);

  const clearLive = useCallback(() => {
    const canvas = liveCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const frame = useCallback(() => {
    rafRef.current = null;
    const modeNow = modeRef.current;
    const strokes = strokesRef.current;

    let physicsActive = false;
    if (strokes.length > 0) {
      if (modeNow === "fall" || modeNow === "drift") physicsActive = true;
      else if (modeNow === "glow") physicsActive = strokes.some((s) => s.alpha > GLOW_ALPHA_EPS);
    }

    if (physicsActive) {
      runPhysics();
      baseDirtyRef.current = true;
    }
    if (baseDirtyRef.current) {
      renderBase();
      baseDirtyRef.current = false;
    }
    if (isDrawingRef.current) renderLive();

    let cont = false;
    if (physicsActive) {
      if (modeNow === "fall") cont = !strokesSettled(strokes);
      else if (modeNow === "drift") cont = true;
      else if (modeNow === "glow") cont = strokes.some((s) => s.alpha > GLOW_ALPHA_EPS);
    }

    if (cont) {
      rafRef.current = requestAnimationFrame(frame);
    } else if (modeNow === "fall" || modeNow === "glow") {
      scheduleSave();
    }
  }, [runPhysics, renderBase, renderLive, scheduleSave]);

  const kick = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(frame);
  }, [frame]);

  // ----- input (only reachable while the layer is active) -----
  const handlePointerDown = useCallback(
    (e) => {
      if (!activeRef.current || e.button > 0) return;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      isDrawingRef.current = true;
      const p = { x: e.clientX, y: e.clientY + window.scrollY, vx: 0, vy: 0 };
      currentStrokeRef.current = [p];
      lastPointRef.current = { x: p.x, y: p.y };
      kick();
    },
    [kick]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDrawingRef.current) return;
      // coalesced events recover every sub-frame sample the browser captured,
      // so fast strokes stay accurate on high-refresh displays
      const events = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
      const batch = events && events.length ? events : [e];
      const scrollY = window.scrollY;
      for (const ev of batch) {
        const x = ev.clientX;
        const y = ev.clientY + scrollY;
        const last = lastPointRef.current;
        if (last && Math.hypot(x - last.x, y - last.y) < SAMPLE_DISTANCE) continue;
        lastPointRef.current = { x, y };
        currentStrokeRef.current.push({ x, y, vx: 0, vy: 0 });
      }
      kick();
    },
    [kick]
  );

  const handlePointerUp = useCallback(() => {
    if (isDrawingRef.current && currentStrokeRef.current.length > 1) {
      const points = [...currentStrokeRef.current];
      strokesRef.current.push({ points, alpha: 1, bbox: computeBBox(points) });
      // keep memory + storage bounded: drop oldest ink first
      while (strokesRef.current.length > MAX_STROKES) strokesRef.current.shift();
      let total = strokesRef.current.reduce((n, s) => n + s.points.length, 0);
      while (total > MAX_POINTS && strokesRef.current.length > 1) {
        total -= strokesRef.current.shift().points.length;
      }
      setHasInk(true);
      scheduleSave();
      baseDirtyRef.current = true;
    }
    isDrawingRef.current = false;
    currentStrokeRef.current = [];
    lastPointRef.current = null;
    clearLive();
    kick();
  }, [kick, clearLive, scheduleSave]);

  const handleUndo = useCallback(() => {
    strokesRef.current.pop();
    setHasInk(strokesRef.current.length > 0);
    persist();
    baseDirtyRef.current = true;
    kick();
  }, [persist, kick]);

  const handleClear = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    strokesRef.current = [];
    currentStrokeRef.current = [];
    isDrawingRef.current = false;
    lastPointRef.current = null;
    setHasInk(false);
    persist();
    baseDirtyRef.current = true;
    kick();
    clearLive();
  }, [persist, kick, clearLive]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    safeStorage.set(HINT_KEY, "1");
  }, []);

  const toggleActive = useCallback(() => {
    dismissHint();
    setActive((a) => {
      const next = !a;
      if (next) measureWorld();
      return next;
    });
  }, [dismissHint, measureWorld]);

  // ----- canvas sizing + scroll/resize redraws -----
  useEffect(() => {
    const base = baseCanvasRef.current;
    const live = liveCanvasRef.current;
    if (!base || !live) return;

    const resize = () => {
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      dprRef.current = dpr;
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (const c of [base, live]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;
      }
      measureWorld();
      measureObstacles();
      baseDirtyRef.current = true;
      kick();
    };

    const onScroll = () => {
      if (strokesRef.current.length === 0 && !isDrawingRef.current) return;
      baseDirtyRef.current = true;
      kick();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [measureWorld, measureObstacles, kick]);

  // restore saved doodles once layout has had a moment to settle
  useEffect(() => {
    const timer = setTimeout(() => {
      const raw = safeStorage.get(STORAGE_KEY);
      if (!raw) return;
      try {
        const data = JSON.parse(raw);
        if (data?.v !== 1 || !Array.isArray(data.strokes) || data.strokes.length === 0) return;
        measureWorld();
        const { floorY, docW } = worldRef.current;
        const scale = data.w > 0 ? docW / data.w : 1;
        strokesRef.current = data.strokes
          .filter((s) => Array.isArray(s?.pts) && s.pts.length > 1)
          .map((s) => {
            const points = s.pts.map(([x, y]) => ({
              x: Math.max(2, Math.min(docW - 2, x * scale)),
              y: Math.max(2, Math.min(floorY, y)),
              vx: 0,
              vy: 0,
            }));
            return { points, alpha: 1, bbox: computeBBox(points) };
          });
        if (strokesRef.current.length > 0) {
          setHasInk(true);
          baseDirtyRef.current = true;
          kick();
        }
      } catch {
        /* corrupted save — start fresh */
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [measureWorld, kick]);

  // first-visit hint
  useEffect(() => {
    if (safeStorage.get(HINT_KEY)) return;
    const timers = hintTimersRef.current;
    timers.push(setTimeout(() => setShowHint(true), 2500));
    timers.push(setTimeout(() => setShowHint(false), 16000));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Esc exits draw mode
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActive(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // mode / theme changes need a base repaint (and physics kick)
  useEffect(() => {
    if (mode === "fall" || mode === "drift") {
      measureWorld();
      measureObstacles();
    }
    baseDirtyRef.current = true;
    kick();
  }, [mode, isDarkMode, measureWorld, measureObstacles, kick]);

  useEffect(() => () => clearTimeout(saveTimerRef.current), []);

  const activeModeHint = MODES.find((m) => m.id === mode)?.hint ?? "";

  const chipClass = (selected) =>
    `w-full rounded-md px-2.5 py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
      selected
        ? isDarkMode
          ? "bg-amber-500 text-[#07090D]"
          : "bg-[#4A6B4E] text-white"
        : isDarkMode
          ? "text-[#8B9DB0] hover:bg-white/[0.06] hover:text-[#F0F4F8]"
          : "text-[var(--lm-text-muted)] hover:bg-[var(--lm-accent)]/10 hover:text-[var(--lm-text-primary)]"
    }`;

  const iconBtnClass = `inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
    isDarkMode
      ? "text-[#8B9DB0] hover:bg-white/[0.06] hover:text-[#F0F4F8]"
      : "text-[var(--lm-text-muted)] hover:bg-[var(--lm-accent)]/10 hover:text-[var(--lm-text-primary)]"
  }`;

  return (
    <>
      <canvas
        ref={baseCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[34]"
      />
      <canvas
        ref={liveCanvasRef}
        aria-hidden="true"
        className={`fixed inset-0 z-[35] ${active ? "doodle-cursor" : ""}`}
        style={{
          pointerEvents: active ? "auto" : "none",
          touchAction: active ? "none" : "auto",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      <div
        data-doodle-ignore
        className="fixed right-5 z-[45] flex flex-col items-end gap-2"
        style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <AnimatePresence>
          {showHint && !active && (
            <motion.button
              type="button"
              onClick={toggleActive}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl border px-3 py-2 text-xs shadow-lg backdrop-blur-xl ${
                isDarkMode
                  ? "border-amber-500/25 bg-[#0B0F18]/90 text-[#8B9DB0]"
                  : "border-[var(--lm-border)] bg-white/95 text-[var(--lm-text-muted)]"
              }`}
            >
              psst, you can{" "}
              <span className={isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}>
                draw on this site
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className={`w-44 rounded-xl border p-2 shadow-2xl backdrop-blur-xl ${
                isDarkMode
                  ? "border-white/10 bg-[#0B0F18]/95"
                  : "border-[var(--lm-border)] bg-white/95"
              }`}
            >
              <div className="flex flex-col gap-0.5">
                {visibleModes.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={chipClass(mode === m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <div
                className={`my-2 h-px ${isDarkMode ? "bg-white/[0.08]" : "bg-[var(--lm-border)]"}`}
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={!hasInk}
                  aria-label="Undo last stroke"
                  title="Undo"
                  className={iconBtnClass}
                >
                  <Undo2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={!hasInk}
                  aria-label="Clear all doodles"
                  title="Clear"
                  className={iconBtnClass}
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p
                className={`mt-2 px-0.5 text-[10px] leading-relaxed ${
                  isDarkMode ? "text-[#8B9DB0]/80" : "text-[var(--lm-text-muted)]/80"
                }`}
              >
                {activeModeHint}
                <br />
                esc to stop · doodles are saved
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={toggleActive}
          aria-pressed={active}
          aria-label={active ? "Stop drawing" : "Draw on this site"}
          title={active ? "Stop drawing (Esc)" : "Draw on this site"}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-colors ${
            active
              ? isDarkMode
                ? "border-transparent bg-amber-500 text-[#07090D]"
                : "border-transparent bg-[#4A6B4E] text-white"
              : isDarkMode
                ? "border-amber-500/35 bg-[#0B0F18]/80 text-amber-400 hover:bg-amber-500/10"
                : "border-[#4A6B4E]/40 bg-white/90 text-[#4A6B4E] hover:bg-[#4A6B4E]/10"
          }`}
        >
          {active ? <X size={17} /> : <Pencil size={17} />}
        </motion.button>
      </div>
    </>
  );
};

export default SiteDoodleLayer;
