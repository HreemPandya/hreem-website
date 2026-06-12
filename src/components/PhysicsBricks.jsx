import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const PILLARS = [
  { title: "AI & ML", tech: "LangChain · MCP · TensorFlow · PyTorch" },
  { title: "Languages", tech: "Python · C++ · C · TypeScript" },
  { title: "Embedded & Hardware", tech: "Arduino · STM32 · OpenCV · Raspberry Pi" },
  { title: "Systems & Tooling", tech: "Git · Docker · Linux · Bash" },
];

const brickClass = (isDarkMode) =>
  `rounded-xl px-4 py-3 md:px-5 md:py-4 border backdrop-blur-xl ${
    isDarkMode
      ? "bg-[#111827] border-white/[0.06]"
      : "bg-[var(--lm-bg-surface)] border-[var(--lm-border)] shadow-lg"
  }`;

const BrickContent = ({ pillar, isDarkMode }) => (
  <>
    <h3
      className={`font-playfair font-bold text-sm md:text-base mb-1 ${
        isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"
      }`}
    >
      {pillar.title}
    </h3>
    <p className={`text-xs md:text-sm ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
      {pillar.tech}
    </p>
  </>
);

// Original framer-motion version: mobile, coarse pointers, reduced motion,
// or if the physics engine fails to load.
const StaticBricks = ({ isDarkMode }) => (
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
        className={`flex-shrink-0 transition-all duration-300 ${brickClass(isDarkMode)} ${
          isDarkMode ? "hover:border-amber-500/30" : "hover:border-[var(--lm-accent)]/40"
        }`}
      >
        <BrickContent pillar={pillar} isDarkMode={isDarkMode} />
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
      Events.on(mouseConstraint, "startdrag", () => setGrabbing(true));
      Events.on(mouseConstraint, "enddrag", () => setGrabbing(false));
      setGrabbing(false);

      let raf = null;
      let running = false;
      const tick = () => {
        Engine.update(engine, 1000 / 60);
        bodies.forEach((b, i) => {
          const el = brickRefs.current[i];
          if (!el) return;
          el.style.opacity = "1";
          el.style.transform = `translate(${b.position.x - sizes[i].w / 2}px, ${
            b.position.y - sizes[i].h / 2
          }px) rotate(${b.angle}rad)`;
        });
        if (running) raf = requestAnimationFrame(tick);
      };
      const run = () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(tick);
      };
      const pause = () => {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      };
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
        aria-label="Areas of expertise — draggable physics bricks"
      >
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.title}
            ref={(el) => {
              brickRefs.current[i] = el;
            }}
            className={`absolute left-0 top-0 w-max select-none opacity-0 will-change-transform ${brickClass(
              isDarkMode
            )}`}
            style={{ pointerEvents: "none" }}
          >
            <BrickContent pillar={pillar} isDarkMode={isDarkMode} />
          </div>
        ))}
      </div>
      <p className={`mt-2 text-xs ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        These obey real gravity — grab one.{" "}
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
    return <StaticBricks isDarkMode={isDarkMode} />;
  }
  return <PhysicsArena isDarkMode={isDarkMode} onFail={onFail} />;
};

export default PhysicsBricks;
