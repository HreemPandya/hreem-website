import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionTransitions } from "@/lib/motion-tokens";

// EasyUI "LockInput": on focus a ring scales in from 0.94 to 1 so the field
// feels like it snaps shut around the caret. Renders an <input>, or a
// <textarea> with `as="textarea"`. Forwards its ref so react-hook-form's
// register() works unchanged.
const LockInput = forwardRef(
  ({ as = "input", isDarkMode, hasError, className, onFocus, onBlur, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const Field = as;

    const ring = hasError
      ? "0 0 0 2px rgba(244, 63, 94, 0.45)"
      : isDarkMode
        ? "0 0 0 2px rgba(245, 158, 11, 0.35)"
        : "0 0 0 2px rgba(74, 107, 78, 0.3)";
    const edge = hasError
      ? "inset 0 0 0 1px rgba(244, 63, 94, 0.6)"
      : isDarkMode
        ? "inset 0 0 0 1px rgba(245, 158, 11, 0.6)"
        : "inset 0 0 0 1px rgba(74, 107, 78, 0.6)";

    return (
      <div className="relative w-full">
        <Field
          ref={ref}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 md:text-[15px]",
            "disabled:cursor-not-allowed disabled:opacity-60",
            isDarkMode
              ? "bg-white/[0.03] text-white placeholder:text-[#8B9DB0]/70"
              : "bg-[var(--lm-bg-surface)]/70 text-[var(--lm-text-primary)] placeholder:text-[var(--lm-text-muted)]/70",
            hasError
              ? isDarkMode
                ? "border-red-400/60"
                : "border-red-500/60"
              : isDarkMode
                ? "border-white/[0.08]"
                : "border-[var(--lm-border)]",
            className
          )}
          {...props}
        />
        {/* Outer ring: scales in from the center for the "lock" feel. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg"
          initial={false}
          animate={{ opacity: isFocused ? 1 : 0, scale: isFocused ? 1 : 0.94 }}
          transition={motionTransitions.springSnappy}
          style={{ boxShadow: ring }}
        />
        {/* Inner edge: tweens the border to the accent. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg"
          initial={false}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={motionTransitions.springSnappy}
          style={{ boxShadow: edge }}
        />
      </div>
    );
  }
);

LockInput.displayName = "LockInput";

export default LockInput;
