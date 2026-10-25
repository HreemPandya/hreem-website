import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionTransitions } from "@/lib/motion-tokens";

// EasyUI "Floating Action Dock": macOS-style magnification. Each icon grows
// with the cursor's distance to its center, with a tooltip label above it.
// Items are links here ({ label, href, icon }) since the site uses it for socials.
// `base`/`peak` are the resting and fully-magnified tile sizes in px.
const DockIcon = ({ item, mouseX, isDarkMode, base, peak, iconSize }) => {
  const ref = useRef(null);
  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - b.x - b.width / 2;
  });
  const sizeSync = useTransform(distance, [-90, 0, 90], [base, peak, base]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 180, damping: 14 });
  const external = item.href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={item.href}
      aria-label={item.label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      style={{ width: size, height: size }}
      whileTap={{ scale: 0.88 }}
      transition={motionTransitions.springSnappy}
      className={cn(
        "group relative flex shrink-0 items-center justify-center rounded-lg outline-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        isDarkMode
          ? "text-[#8B9DB0] hover:bg-white/[0.05] hover:text-amber-400"
          : "text-[var(--lm-text-muted)] hover:bg-[var(--lm-accent)]/[0.08] hover:text-[var(--lm-accent)]"
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded border px-2 py-0.5 text-[11px] font-medium opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100",
          isDarkMode
            ? "border-white/[0.08] bg-[#0B0F18] text-[#F0F4F8]"
            : "border-[var(--lm-border)] bg-[var(--lm-bg-surface)] text-[var(--lm-text-primary)]"
        )}
      >
        {item.label}
      </span>
      <item.Icon size={iconSize} />
    </motion.a>
  );
};

const FloatingActionDock = ({ items, isDarkMode, base = 36, peak = 46, iconSize = 18, className }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("flex items-center gap-0.5 sm:gap-1", className)}
      style={{ height: base }}
    >
      {items.map((item) => (
        <DockIcon
          key={item.label}
          item={item}
          mouseX={mouseX}
          isDarkMode={isDarkMode}
          base={base}
          peak={peak}
          iconSize={iconSize}
        />
      ))}
    </div>
  );
};

export default FloatingActionDock;
