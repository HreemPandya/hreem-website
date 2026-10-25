import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// EasyUI "Skeleton": a quiet block with a slow light sweep. Size it with className.
export const Skeleton = ({ isDarkMode, className, style }) => (
  <div
    aria-hidden="true"
    className={cn(
      "relative overflow-hidden rounded-md",
      isDarkMode ? "bg-white/[0.05]" : "bg-[var(--lm-accent)]/[0.08]",
      className
    )}
    style={style}
  >
    <motion.span
      className="absolute inset-0"
      style={{
        background: `linear-gradient(90deg, transparent, ${
          isDarkMode ? "rgba(245,158,11,0.10)" : "rgba(255,255,255,0.7)"
        }, transparent)`,
      }}
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.2 }}
    />
  </div>
);

const WIDTHS = ["100%", "94%", "98%", "88%"];

// Paragraph-shaped stack of skeleton lines; the last line is short like real prose.
export const SkeletonText = ({ lines = 3, isDarkMode, className }) => (
  <div aria-hidden="true" className={cn("space-y-2.5", className)}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        isDarkMode={isDarkMode}
        className="h-3.5"
        style={{ width: i === lines - 1 && lines > 1 ? "62%" : WIDTHS[i % WIDTHS.length] }}
      />
    ))}
  </div>
);
