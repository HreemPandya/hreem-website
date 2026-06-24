import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const PILLARS = [
  { title: "AI & ML", tech: "LangChain · MCP · TensorFlow · PyTorch" },
  { title: "Languages", tech: "Python · C++ · C · TypeScript" },
  { title: "Embedded & Hardware", tech: "Arduino · STM32 · OpenCV · Raspberry Pi" },
  { title: "Systems & Tooling", tech: "Git · Docker · Linux · Bash" },
];

// Theme-neutral: colors come from the global .expertise-brick* CSS rules (keyed
// on html.dark-mode / html.light-mode), so these classNames are stable and a
// theme toggle never re-renders the physics-driven brick DOM.
const BRICK_CLASS = "expertise-brick rounded-xl px-4 py-3 md:px-5 md:py-4 backdrop-blur-xl";

const BrickContent = ({ pillar }) => (
  <>
    <h3 className="expertise-brick-title font-playfair font-bold text-sm md:text-base mb-1">
      {pillar.title}
    </h3>
    <p className="expertise-brick-tech text-xs md:text-sm">{pillar.tech}</p>
  </>
);

// Original framer-motion version: mobile, coarse pointers, reduced motion,
// or if the physics engine fails to load.
const StaticBricks = () => (
  <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-16">
    {PILLARS.map((pillar, index) => (
      <motion.div
        key={pillar.title}
        initial={{ opacity: 0, y: -80, rotate: -2 }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotate: index % 2 === 0 ? -1 : 1,
          transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.1 },
        }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -2, rotate: 0, transition: { duration: 0.2 } }}
        className={`flex-shrink-0 ${BRICK_CLASS}`}
      >
        <BrickContent pillar={pillar} />
      </motion.div>
    ))}
  </div>
);

// Real physics: the bricks drop into the arena, stack, and can be grabbed
// and flicked around. matter-js is loaded lazily the first time the section
// scrolls into view so it never weighs down initial page load.
const PhysicsArena = ({ isDarkMode, onFail }) => {
  const containerRef = useRef(null);
  const brickRefs = useRef([]);
  // Stable per-brick ref callbacks (created once). Inline arrow refs change
  // identity every render, so React would detach/reattach every brick on a theme
  // toggle — these don't, keeping matter-js's element handles intact.
  const setBrickRef = useRef(
    PILLARS.map((_, i) => (el) => {
      brickRefs.current[i] = el;
    })
  ).current;
  const worldRef = useRef(null);
  const [simKey, setSimKey] = useState(0);

  const spawnFor = useCallback((sizes, W) => {
    const gap = 18;
    const margin = 28;
    const totalW = sizes.reduce((n, s) => n + s.w, 0) + gap * (sizes.length - 1);
    let cursor = Math.max(margin, (W - totalW) / 2);
    return sizes.map((s, i) => {
      const fits = totalW <= W - margin * 2;
      const x = fits
        ? cursor + s.w / 2
        : (W / (sizes.length + 1)) * (i + 1);
      cursor += s.w + gap;
      return {
        x: Math.max(s.w / 2 + 4, Math.min(W - s.w / 2 - 4, x)),
        y: -60 - i * 95,
        angle: (i % 2 ? 1 : -1) * 0.05,
      };
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    let teardown = null;
    let started = false;

    const init = async () => {
      let Matter;
      try {
        const mod = await import("matter-js");
        Matter = mod.default ?? mod;
      } catch {
        if (!cancelled) onFail();
        return;
      }
      if (cancelled || !containerRef.current) return;

      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Events, Sleeping } = Matter;
      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      if (W < 50 || H < 50) {
        onFail();
        return;
      }

      const els = brickRefs.current.filter(Boolean);
      const sizes = els.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));
      const spawns = spawnFor(sizes, W);

      const engine = Engine.create({ enableSleeping: true });
      const wallOpts = { isStatic: true, friction: 0.9, restitution: 0.1 };
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + 30, W + 600, 60, wallOpts), // floor
        Bodies.rectangle(-30, H / 2 - 300, 60, H + 1200, wallOpts), // left
        Bodies.rectangle(W + 30, H / 2 - 300, 60, H + 1200, wallOpts), // right
        Bodies.rectangle(W / 2, -560, W + 600, 60, wallOpts), // ceiling, far up
      ]);

      const bodies = els.map((el, i) =>
        Bodies.rectangle(spawns[i].x, spawns[i].y, sizes[i].w, sizes[i].h, {
          chamfer: { radius: 12 },
          friction: 0.4,
          frictionAir: 0.012,
          restitution: 0.18,
          angle: spawns[i].angle,
          sleepThreshold: 70,
        })
      );
      Composite.add(engine.world, bodies);

      const mouse = Mouse.create(container);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, damping: 0.1, render: { visible: false } },
      });
      // matter's Mouse swallows wheel + touch gestures; hand both back to the
      // page so the section never hijacks scrolling (drag stays mouse-only)
      try {
        mouse.element.removeEventListener("wheel", mouse.mousewheel);
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        mouse.element.removeEventListener("touchmove", mouse.touchmove ?? mouse.mousemove);
        mouse.element.removeEventListener("touchstart", mouse.touchstart ?? mouse.mousedown);
        mouse.element.removeEventListener("touchend", mouse.touchend ?? mouse.mouseup);
      } catch {
        /* listener names vary across matter versions */
      }
      Composite.add(engine.world, mouseConstraint);

      const setGrabbing = (on) => {
        container.style.cursor = on ? "grabbing" : "grab";
      };
      Events.on(mouseConstraint, "startdrag", () => {
        setGrabbing(true);
        run();
      });
      Events.on(mouseConstraint, "enddrag", () => {
        setGrabbing(false);
        run();
      });
      setGrabbing(false);

      let raf = null;
      let running = false;
      let lastTs = 0;
      let acc = 0;
      const STEP = 1000 / 60; // fixed physics step → frame-rate independent
      const MAX_FRAME = STEP * 5; // clamp after a stall to avoid a spiral of death

      const render = () => {
        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i];
          const el = brickRefs.current[i];
          if (!el) continue;
          // translate3d keeps each brick on its own GPU layer (composited, no repaint)
          el.style.transform = `translate3d(${b.position.x - sizes[i].w / 2}px, ${
            b.position.y - sizes[i].h / 2
          }px, 0) rotate(${b.angle}rad)`;
        }
      };

      const allAsleep = () => {
        for (const b of bodies) if (!b.isSleeping) return false;
        return true;
      };

      const tick = (now) => {
        if (!running) return;
        if (!lastTs) lastTs = now;
        let delta = now - lastTs;
        lastTs = now;
        if (delta > MAX_FRAME) delta = MAX_FRAME;
        acc += delta;
        let stepped = false;
        while (acc >= STEP) {
          Engine.update(engine, STEP);
          acc -= STEP;
          stepped = true;
        }
        if (stepped) render();
        // idle the loop once everything settles; a grab (mousedown) restarts it
        if (allAsleep() && !mouseConstraint.body) {
          running = false;
          raf = null;
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      const run = () => {
        if (running) return;
        running = true;
        lastTs = 0;
        acc = 0;
        raf = requestAnimationFrame(tick);
      };
      const pause = () => {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      };
      // place bricks at their spawn (above the arena) before revealing, so
      // there's no one-frame flash at the top-left untransformed origin
      render();
      els.forEach((el) => {
        el.style.opacity = "1";
      });

      // wake the (possibly idle) loop the instant a grab begins, so matter's
      // own drag detection — which only runs inside Engine.update — can engage
      const wake = () => run();
      container.addEventListener("mousedown", wake);

      // matter's Mouse only listens for mouseup on its own element, so releasing
      // the button after the cursor has left the arena (flicking a brick out, or
      // scrolling/moving past it mid-drag) never resets mouse.button. The
      // constraint then stays latched to the old brick and ignores every later
      // grab. Catch the release on window so a drag always ends, then wake the
      // loop so MouseConstraint can process the release and fire enddrag.
      const endDragAnywhere = () => {
        if (mouse.button === -1) return;
        mouse.button = -1;
        run();
      };
      window.addEventListener("mouseup", endDragAnywhere);
      window.addEventListener("blur", endDragAnywhere);
      run();

      worldRef.current = {
        reset: () => {
          const fresh = spawnFor(sizes, W);
          bodies.forEach((b, i) => {
            Body.setPosition(b, { x: fresh[i].x, y: fresh[i].y });
            Body.setVelocity(b, { x: 0, y: 0 });
            Body.setAngularVelocity(b, 0);
            Body.setAngle(b, fresh[i].angle);
            Sleeping.set(b, false);
          });
          run();
        },
        run,
        pause,
      };

      teardown = () => {
        pause();
        container.removeEventListener("mousedown", wake);
        window.removeEventListener("mouseup", endDragAnywhere);
        window.removeEventListener("blur", endDragAnywhere);
        Events.off(mouseConstraint);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        try {
          mouse.element.removeEventListener("mousemove", mouse.mousemove);
          mouse.element.removeEventListener("mousedown", mouse.mousedown);
          mouse.element.removeEventListener("mouseup", mouse.mouseup);
        } catch {
          /* best-effort cleanup */
        }
        worldRef.current = null;
      };
    };

    // drop the bricks the first time the arena is actually seen,
    // and pause the engine whenever it scrolls back out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && !started) {
          started = true;
          init();
        } else if (worldRef.current) {
          if (visible) worldRef.current.run();
          else worldRef.current.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(container);

    // arena width changes (window resize) → rebuild the world
    let resizeTimer = null;
    let lastW = container.getBoundingClientRect().width;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      if (Math.abs(w - lastW) < 40) return;
      lastW = w;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setSimKey((k) => k + 1), 300);
    });
    ro.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      ro.disconnect();
      clearTimeout(resizeTimer);
      if (teardown) teardown();
    };
  }, [simKey, onFail, spawnFor]);

  return (
    <div className="mb-8 md:mb-16">
      <div
        ref={containerRef}
        className={`relative h-52 w-full overflow-hidden border-b ${
          isDarkMode ? "border-white/10" : "border-[var(--lm-accent)]/25"
        }`}
        style={{ touchAction: "pan-y" }}
        role="group"
        aria-label="Areas of expertise, draggable physics bricks"
      >
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.title}
            ref={setBrickRef[i]}
            className={`${BRICK_CLASS} absolute left-0 top-0 w-max select-none opacity-0 will-change-transform`}
            style={{ pointerEvents: "none" }}
          >
            <BrickContent pillar={pillar} />
          </div>
        ))}
      </div>
      <p className={`mt-2 text-xs ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        These obey real gravity, grab one.{" "}
        <button
          type="button"
          onClick={() => worldRef.current?.reset()}
          className={`underline hover:no-underline ${
            isDarkMode
              ? "text-amber-500/80 hover:text-amber-400"
              : "text-[var(--lm-accent)]/80 hover:text-[var(--lm-accent)]"
          }`}
        >
          Drop again
        </button>
      </p>
    </div>
  );
};

const PhysicsBricks = ({ isDarkMode }) => {
  const finePointer = useMediaQuery("(min-width: 768px) and (pointer: fine)");
  const reduceMotion = useReducedMotion();
  const [engineFailed, setEngineFailed] = useState(false);
  const onFail = useCallback(() => setEngineFailed(true), []);

  if (!finePointer || reduceMotion || engineFailed) {
    return <StaticBricks />;
  }
  return <PhysicsArena isDarkMode={isDarkMode} onFail={onFail} />;
};

export default PhysicsBricks;
