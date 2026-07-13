import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, animate } from "framer-motion";
import { Pencil, Undo2, Trash2 } from "lucide-react";

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
const SAMPLE_DISTANCE = 5;
const STROKE_WIDTH = 2.5;
const MAX_DPR = 2; // beyond 2x the visual gain is nil but fill cost is quadratic

// ---- rope model ----
// A stroke is a chain of points joined by fixed-length segments and integrated
// with Verlet (velocity is implicit in the previous position). Distance
// constraints keep the line at its DRAWN length, so it can't stretch as it
// falls; and because the constraints transmit the pull of the hanging part, an
// overhang drags the supported part off a ledge once enough of it hangs over.
const CONSTRAINT_ITERS = 6; // relaxation passes per frame (higher = stiffer rope)
const SURFACE_FRICTION = 0.9; // tangential damping while a point rests on a surface

// ---- element collision ----
// Only real "blocks" are solid — project cards, the expertise panel, images.
// Text (headings/paragraphs) is intentionally NOT solid, so ink falls past it
// and only drapes/rests on blocks. Obstacles are measured in document space and
// indexed in a static spatial grid, so each per-point test is one Map lookup.
const OBSTACLE_SELECTOR =
  '#projects .rounded-2xl,[aria-label^="Areas of expertise"],img';
const OBSTACLE_MIN_W = 40; // ignore tiny things (icons, single tags)
const OBSTACLE_MIN_H = 14;
const OBSTACLE_PAD = 2; // inflate rects by ~half the stroke width
const GRID_CELL = 220; // spatial-hash cell size in px
const GRID_STRIDE = 8192; // key = cy * stride + cx (cx range is tiny)

// Give a stroke its rope state: fixed segment lengths (captured from its drawn
// shape) and a Verlet "previous position" per point. Idempotent — only fills in
// what's missing, so re-entering Fall/Drift never re-stretches an existing line.
function primeStroke(stroke) {
  const pts = stroke.points;
  if (!stroke.seg || stroke.seg.length !== pts.length - 1) {
    const seg = new Array(Math.max(0, pts.length - 1));
    for (let i = 0; i < pts.length - 1; i++) {
      const dx = pts[i + 1].x - pts[i].x;
      const dy = pts[i + 1].y - pts[i].y;
      seg[i] = Math.sqrt(dx * dx + dy * dy) || 0.0001;
    }
    stroke.seg = seg;
  }
  for (const p of pts) {
    if (p.px === undefined) {
      p.px = p.x;
      p.py = p.y;
    }
  }
}

// One Jakobsen relaxation pass: nudge each adjacent pair back toward its rest
// length, splitting the correction so the chain behaves as one inextensible line.
function satisfyConstraints(pts, seg) {
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 1e-6) continue;
    const diff = ((d - seg[i]) / d) * 0.5;
    const ox = dx * diff;
    const oy = dy * diff;
    a.x += ox;
    a.y += oy;
    b.x -= ox;
    b.y -= oy;
  }
}

// Push a point out of any solid block / floor / wall it has entered, choosing the
// entry face from its previous position (px, py) so it lands ON a top edge rather
// than tunneling through. Returns 1 when it's resting on a surface (so friction
// can be applied), 0 otherwise.
function resolveCollision(p, obst, floorY, docW) {
  let support = 0;
  if (p.x < 2) p.x = 2;
  else if (p.x > docW - 2) p.x = docW - 2;

  const grid = obst.grid;
  if (grid.size > 0) {
    const cell = obst.cell;
    const arr = grid.get(Math.floor(p.y / cell) * GRID_STRIDE + Math.floor(p.x / cell));
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        const a = arr[i];
        const l = a.l - OBSTACLE_PAD;
        const r = a.r + OBSTACLE_PAD;
        const tp = a.t - OBSTACLE_PAD;
        const bt = a.b + OBSTACLE_PAD;
        if (p.x <= l || p.x >= r || p.y <= tp || p.y >= bt) continue; // not penetrating
        if (p.py <= tp) { p.y = tp; support = 1; } // dropped onto the top → rest there
        else if (p.py >= bt) { p.y = bt; } // rose into the underside
        else if (p.px <= l) { p.x = l; } // came in from the left face
        else if (p.px >= r) { p.x = r; } // came in from the right face
        else {
          // already inside (drawn on it / pushed in by a constraint) → eject the nearest edge
          const dl = p.x - l;
          const dr = r - p.x;
          const dt = p.y - tp;
          const db = bt - p.y;
          const m = Math.min(dl, dr, dt, db);
          if (m === dt) { p.y = tp; support = 1; }
          else if (m === db) { p.y = bt; }
          else if (m === dl) { p.x = l; }
          else { p.x = r; }
        }
      }
    }
  }

  if (p.y > floorY) { p.y = floorY; support = 1; }
  else if (p.y < 2) { p.y = 2; }
  return support;
}

const STORAGE_KEY = "hreem-site-doodles-v1";
const HINT_KEY = "hreem-doodle-hint-dismissed";
const MAX_STROKES = 80;
const MAX_POINTS = 6000;
const VELOCITY_EPS = 0.08;
const GLOW_ALPHA_EPS = 0.002;
const TWITCH_THROTTLE_MS = 1400;

// Drop the pen with its centre within this many px of the holder centre and it
// snaps home. Generous so "bring it back to the corner" reliably docks it.
const PEN_SNAP_RADIUS = 90;
// Where the pen lifts to when popped out by a tap / keyboard (offset from holder).
const PEN_DEPLOY_OFFSET = { x: -8, y: -150 };
const PEN_SPRING = { type: "spring", stiffness: 500, damping: 32 };
// Key that opens/closes the mode panel while the pen is out.
const MODE_PANEL_KEY = "m";

const MODES = [
  { id: "stay", label: "Stay", hint: "ink stays where you put it" },
  { id: "fall", label: "Fall", hint: "ink tumbles down to the cat" },
  { id: "drift", label: "Drift", hint: "ink floats on a lazy breeze" },
  { id: "glow", label: "Glow", hint: "ink glows, then fades away" },
];

// Modes safe under prefers-reduced-motion: nothing moves on its own.
const REDUCED_MODE_IDS = new Set(["stay", "glow"]);

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
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

const SiteDoodleLayer = ({ isDarkMode }) => {
  const reduceMotion = useReducedMotion();
  // Interaction is a small state machine:
  //   penOut   — the pen has been lifted out of its holder
  //   armed    — a mode was chosen from the panel; only now can you draw
  //   panelOpen— the mode panel is showing (toggled by the M shortcut)
  // Drawing is enabled only when penOut && armed.
  const [penOut, setPenOut] = useState(false);
  const [armed, setArmed] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mode, setMode] = useState("stay");
  const [showHint, setShowHint] = useState(false);
  const [hasInk, setHasInk] = useState(false);
  const [nearHolder, setNearHolder] = useState(false);

  const canDraw = penOut && armed;

  // The pen is a draggable object whose (x, y) are an offset from its docked home
  // in the bottom-right holder. The holder is a FIXED element, so a dropped pen
  // follows the viewport as you scroll; drag it back near the holder to dock it.
  const penX = useMotionValue(0);
  const penY = useMotionValue(0);
  const draggingRef = useRef(false);
  const penOutRef = useRef(false);

  const baseCanvasRef = useRef(null);
  const liveCanvasRef = useRef(null);
  // 2D contexts are cached once (getContext returns the same instance anyway) so
  // the per-frame render path never pays a getContext lookup.
  const baseCtxRef = useRef(null);
  const liveCtxRef = useRef(null);
  const strokesRef = useRef([]);
  const currentStrokeRef = useRef([]);
  const isDrawingRef = useRef(false);
  const rafRef = useRef(null);
  const lastPointRef = useRef(null);
  const frameCountRef = useRef(0);
  const modeRef = useRef(mode);
  const activeRef = useRef(false);
  const worldRef = useRef({ floorY: 0, catL: -1, catR: -1, docW: 1024, docH: 4000 });
  const obstaclesRef = useRef({ rects: [], grid: new Map(), cell: GRID_CELL });
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
  activeRef.current = canDraw;
  penOutRef.current = penOut;

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

  // ----- physics (document space; floor is the footer cat's ground line) -----
  // Advances one physics step and returns whether anything is still in motion,
  // so the frame loop can decide to continue WITHOUT a second full scan over
  // every point (the old separate strokesSettled pass).
  const runPhysics = useCallback(() => {
    const { floorY, docW } = worldRef.current;
    const modeNow = modeRef.current;
    const t = frameCountRef.current * 0.016;
    let moving = false;

    if (modeNow === "fall") {
      const obst = obstaclesRef.current;
      strokesRef.current.forEach((stroke) => {
        primeStroke(stroke);
        const pts = stroke.points;
        const seg = stroke.seg;

        // 1. integrate each point (Verlet — gravity is added straight to position)
        for (const p of pts) {
          p.support = 0;
          const vx = (p.x - p.px) * DAMPING;
          const vy = (p.y - p.py) * DAMPING;
          p.px = p.x;
          p.py = p.y;
          p.x += vx;
          p.y += vy + GRAVITY;
        }

        // 2. relax the chain back to its drawn length, then push points out of
        //    solids — interleaved so the line keeps its length AND an overhang
        //    can drag the supported part off a block.
        for (let k = 0; k < CONSTRAINT_ITERS; k++) {
          satisfyConstraints(pts, seg);
          for (const p of pts) p.support |= resolveCollision(p, obst, floorY, docW);
        }

        // 3. derive velocity (for the settle check), apply surface friction, and
        //    poke the cat the first time a point lands hard on the floor.
        for (const p of pts) {
          let vx = p.x - p.px;
          const vy = p.y - p.py;
          if (p.support) {
            vx *= SURFACE_FRICTION;
            p.px = p.x - vx;
          }
          p.vx = vx;
          p.vy = vy;
          if (!moving && (Math.abs(vx) >= VELOCITY_EPS || Math.abs(vy) >= VELOCITY_EPS)) {
            moving = true;
          }
          if (!p.landed && p.y >= floorY - 0.5 && vy > 0.4) {
            p.landed = true;
            pokeCat();
          }
        }
        stroke.bbox = computeBBox(pts);
      });
    } else if (modeNow === "drift") {
      const obst = obstaclesRef.current;
      const wind = Math.sin(t * 0.5) * 0.08;
      strokesRef.current.forEach((stroke) => {
        primeStroke(stroke);
        const pts = stroke.points;
        const seg = stroke.seg;
        for (const p of pts) {
          const vx = (p.x - p.px) * DAMPING;
          const vy = (p.y - p.py) * DAMPING;
          p.px = p.x;
          p.py = p.y;
          p.x += vx + wind;
          p.y += vy + 0.02;
        }
        for (let k = 0; k < CONSTRAINT_ITERS; k++) {
          satisfyConstraints(pts, seg);
          for (const p of pts) resolveCollision(p, obst, floorY, docW);
        }
        for (const p of pts) {
          p.vx = p.x - p.px;
          p.vy = p.y - p.py;
        }
        stroke.bbox = computeBBox(pts);
      });
      moving = true; // drift never settles — it floats forever on the breeze
    } else if (modeNow === "glow") {
      strokesRef.current.forEach((stroke) => {
        stroke.alpha = Math.max(0, stroke.alpha - 0.004);
        if (stroke.alpha > GLOW_ALPHA_EPS) moving = true;
      });
    }

    frameCountRef.current += 1;
    // layout can shift under long falls (lazy images etc.) — re-measure occasionally
    if (frameCountRef.current % 180 === 0 && modeNow !== "stay") {
      measureWorld();
      measureObstacles();
    }
    return moving;
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
    const ctx = baseCtxRef.current;
    if (!canvas || !ctx) return;
    const dpr = dprRef.current;
    const scrollY = window.scrollY;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, -scrollY * dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const modeNow = modeRef.current;
    const glow = modeNow === "glow";
    const viewTop = scrollY - 80;
    const viewBottom = scrollY + window.innerHeight + 80;
    const strokes = strokesRef.current;

    // Fast path (stay / fall / drift): no stroke is ever removed here, so walk
    // the array in place — no per-frame .filter() allocation while animating.
    if (!glow) {
      for (let i = 0; i < strokes.length; i++) {
        const s = strokes[i];
        const bb = s.bbox;
        if (bb && (bb.maxY < viewTop || bb.minY > viewBottom)) continue;
        drawStroke(ctx, s.points, false, s.alpha);
      }
      return;
    }

    // Glow is the only mode that retires faded strokes, so only it compacts.
    let removed = false;
    strokesRef.current = strokes.filter((s) => {
      if (s.alpha <= 0) {
        removed = true;
        return false;
      }
      const bb = s.bbox;
      const culled = bb && (bb.maxY < viewTop || bb.minY > viewBottom);
      if (!culled) drawStroke(ctx, s.points, true, s.alpha);
      return true;
    });
    if (removed) {
      setHasInk(strokesRef.current.length > 0);
    }
  }, [drawStroke]);

  const renderLive = useCallback(() => {
    const canvas = liveCanvasRef.current;
    const ctx = liveCtxRef.current;
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
    const ctx = liveCtxRef.current;
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

    let moving = false;
    if (physicsActive) {
      moving = runPhysics();
      baseDirtyRef.current = true;
    }
    if (baseDirtyRef.current) {
      renderBase();
      baseDirtyRef.current = false;
    }
    if (isDrawingRef.current) renderLive();

    // fall stops once nothing moves; drift never settles; glow ends when faded —
    // all three are captured by runPhysics's `moving` return, no extra scan.
    if (physicsActive && moving) {
      rafRef.current = requestAnimationFrame(frame);
    }
  }, [runPhysics, renderBase, renderLive]);

  const kick = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(frame);
  }, [frame]);

  // ----- input (only reachable while the layer is active) -----
  const handlePointerDown = useCallback(
    (e) => {
      if (!activeRef.current || draggingRef.current || e.button > 0) return;
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
      // keep memory bounded: drop oldest ink first
      while (strokesRef.current.length > MAX_STROKES) strokesRef.current.shift();
      let total = strokesRef.current.reduce((n, s) => n + s.points.length, 0);
      while (total > MAX_POINTS && strokesRef.current.length > 1) {
        total -= strokesRef.current.shift().points.length;
      }
      setHasInk(true);
      baseDirtyRef.current = true;
    }
    isDrawingRef.current = false;
    currentStrokeRef.current = [];
    lastPointRef.current = null;
    // Commit the finished stroke onto the base layer FIRST, then wipe the live
    // layer. Doing it in this order (rather than clear-now-repaint-next-frame)
    // means the released ink never blinks out for a frame — important now that
    // the live canvas is desynchronized and can present ahead of the base one.
    if (baseDirtyRef.current) {
      renderBase();
      baseDirtyRef.current = false;
    }
    clearLive();
    kick(); // start the fall / drift / glow animation if this mode has one
  }, [kick, clearLive, renderBase]);

  const handleUndo = useCallback(() => {
    strokesRef.current.pop();
    setHasInk(strokesRef.current.length > 0);
    baseDirtyRef.current = true;
    kick();
  }, [kick]);

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
    baseDirtyRef.current = true;
    kick();
    clearLive();
  }, [kick, clearLive]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    safeStorage.set(HINT_KEY, "1");
  }, []);

  // ----- the pen: lift it out, drop it on the page, or drag it back to dock -----
  // The pen and the holder share the same box (both inset-0 of the holder slot),
  // so the pen's distance from its docked home is exactly the drag offset. Using
  // the motion values directly is immune to ref/rect/transform timing quirks.
  const penHolderDistance = useCallback(
    () => Math.hypot(penX.get(), penY.get()),
    [penX, penY]
  );

  // Pen home: snaps to the holder, drawing fully off. The spring is deferred a
  // frame so framer-motion's own drag-release (which writes x/y on the same
  // frame onDragEnd fires) can't clobber it — without this, dropping the pen on
  // the holder flips state to "docked" but the glyph never travels back.
  const dockPen = useCallback(() => {
    setNearHolder(false);
    setPanelOpen(false);
    setArmed(false);
    setPenOut(false);
    requestAnimationFrame(() => {
      animate(penX, 0, PEN_SPRING);
      animate(penY, 0, PEN_SPRING);
    });
  }, [penX, penY]);

  // Pen is out (you're holding it) but NOT armed yet — press M to pick a mode.
  const liftPen = useCallback(() => {
    dismissHint();
    measureWorld();
    setArmed(false);
    setPenOut(true);
  }, [dismissHint, measureWorld]);

  // Pop the pen out to a default spot (tap / keyboard, no specific drop point).
  const deployPen = useCallback(() => {
    animate(penX, PEN_DEPLOY_OFFSET.x, PEN_SPRING);
    animate(penY, PEN_DEPLOY_OFFSET.y, PEN_SPRING);
    liftPen();
  }, [penX, penY, liftPen]);

  const handlePenDragStart = useCallback(() => {
    draggingRef.current = true;
    dismissHint();
  }, [dismissHint]);

  // Highlight the holder while the pen hovers over it (the snap target).
  const handlePenDrag = useCallback(() => {
    const within = penHolderDistance() < PEN_SNAP_RADIUS;
    setNearHolder((prev) => (prev === within ? prev : within));
  }, [penHolderDistance]);

  const handlePenDragEnd = useCallback(() => {
    draggingRef.current = false;
    setNearHolder(false);
    if (penHolderDistance() < PEN_SNAP_RADIUS) dockPen();
    else liftPen();
  }, [penHolderDistance, dockPen, liftPen]);

  // Keyboard parity for the drag: pop the pen out / dock it.
  const handlePenKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      if (penOutRef.current) dockPen();
      else deployPen();
    },
    [dockPen, deployPen]
  );

  // Choosing a mode from the panel arms the pen (drawing turns on) and closes it.
  const selectMode = useCallback((id) => {
    setMode(id);
    setArmed(true);
    setPanelOpen(false);
  }, []);

  // ----- canvas sizing + scroll/resize redraws -----
  useEffect(() => {
    const base = baseCanvasRef.current;
    const live = liveCanvasRef.current;
    if (!base || !live) return;

    // Cache contexts once. The live (in-progress) stroke uses `desynchronized`:
    // a low-latency hint that lets the browser skip a compositor round-trip, so
    // ink tracks the pointer with noticeably less lag (the dominant fix for
    // "drawing feels delayed right after opening").
    if (!baseCtxRef.current) baseCtxRef.current = base.getContext("2d");
    if (!liveCtxRef.current) liveCtxRef.current = live.getContext("2d", { desynchronized: true });

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

  // Doodles are ephemeral — never persisted. Purge any legacy saved ink, and wipe
  // the in-memory ink when the page is hidden / unloaded, so leaving and coming
  // back (reload, navigation, bfcache restore) always starts on a blank page.
  useEffect(() => {
    safeStorage.remove(STORAGE_KEY);
    const wipe = () => {
      strokesRef.current = [];
      currentStrokeRef.current = [];
    };
    window.addEventListener("pagehide", wipe);
    return () => window.removeEventListener("pagehide", wipe);
  }, []);

  // first-visit hint
  useEffect(() => {
    if (safeStorage.get(HINT_KEY)) return;
    const timers = hintTimersRef.current;
    timers.push(setTimeout(() => setShowHint(true), 2500));
    timers.push(setTimeout(() => setShowHint(false), 16000));
    return () => timers.forEach(clearTimeout);
  }, []);

  // While the pen is out: M toggles the mode panel, Esc docks the pen.
  useEffect(() => {
    if (!penOut) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        dockPen();
        return;
      }
      const el = e.target;
      const typing =
        el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (!typing && e.key.toLowerCase() === MODE_PANEL_KEY) {
        e.preventDefault();
        setPanelOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [penOut, dockPen]);

  // mode / theme changes need a base repaint (and physics kick)
  useEffect(() => {
    if (mode === "fall" || mode === "drift") {
      measureWorld();
      measureObstacles();
    }
    baseDirtyRef.current = true;
    kick();
  }, [mode, isDarkMode, measureWorld, measureObstacles, kick]);

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
        className={`fixed inset-0 z-[35] ${canDraw ? "doodle-cursor" : ""}`}
        style={{
          pointerEvents: canDraw ? "auto" : "none",
          touchAction: canDraw ? "none" : "auto",
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
          {showHint && !penOut && (
            <motion.button
              type="button"
              onClick={dismissHint}
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
              psst, grab the pen and{" "}
              <span className={isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}>
                draw on this site
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Pen is out but no mode picked yet — nudge toward the M shortcut. */}
        <AnimatePresence>
          {penOut && !armed && !panelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className={`rounded-xl border px-3 py-2 text-xs shadow-lg backdrop-blur-xl ${
                isDarkMode
                  ? "border-amber-500/25 bg-[#0B0F18]/90 text-[#8B9DB0]"
                  : "border-[var(--lm-border)] bg-white/95 text-[var(--lm-text-muted)]"
              }`}
            >
              press{" "}
              <kbd className={`rounded px-1 font-mono ${isDarkMode ? "bg-white/10 text-amber-300" : "bg-[var(--lm-accent)]/10 text-[var(--lm-accent)]"}`}>
                M
              </kbd>{" "}
              to pick a mode and draw
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {panelOpen && (
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
                    onClick={() => selectMode(m.id)}
                    className={chipClass(armed && mode === m.id)}
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
                M toggles this · esc docks the pen · doodles clear when you leave
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Static holder circle (never moves) + the draggable pen glyph inside it.
            Only the pen lifts out and becomes your cursor; drag it back near the
            holder to put it away. */}
        <div className="relative h-11 w-11">
          {/* Holder — stays put. Filled circle when the pen is resting in it;
              an empty dashed ring (the drop target) while the pen is out. */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-full shadow-lg transition-all duration-200 ${
              penOut
                ? `border-2 border-dashed ${
                    nearHolder
                      ? isDarkMode
                        ? "scale-110 border-amber-400 bg-amber-500/10"
                        : "scale-110 border-[#4A6B4E] bg-[#4A6B4E]/10"
                      : isDarkMode
                        ? "border-amber-500/30 bg-[#0B0F18]/50"
                        : "border-[#4A6B4E]/35 bg-white/60"
                  }`
                : isDarkMode
                  ? "border border-amber-500/35 bg-[#0B0F18]/80"
                  : "border border-[#4A6B4E]/40 bg-white/90"
            }`}
          />

          {/* The pen — the ONLY thing that moves. Transparent hit-area, just the
              glyph, so the holder circle stays in place when you lift it out. */}
          <motion.button
            type="button"
            drag
            dragMomentum={false}
            dragElastic={0}
            style={{ x: penX, y: penY, touchAction: "none" }}
            onDragStart={handlePenDragStart}
            onDrag={handlePenDrag}
            onDragEnd={handlePenDragEnd}
            onTap={() => { if (!penOutRef.current) deployPen(); }}
            onKeyDown={handlePenKeyDown}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            whileDrag={{ scale: 1.25, rotate: -14 }}
            aria-pressed={penOut}
            aria-label={penOut ? "Pen (drag back to the holder to put it away)" : "Pick up the pen to draw"}
            title={penOut ? "Drag back to the holder to stop (Esc)" : "Pick up the pen to draw"}
            className={`absolute inset-0 z-10 inline-flex cursor-grab items-center justify-center rounded-full bg-transparent transition-colors active:cursor-grabbing ${
              isDarkMode ? "text-amber-400" : "text-[#4A6B4E]"
            }`}
          >
            <Pencil size={19} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]" />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default SiteDoodleLayer;
