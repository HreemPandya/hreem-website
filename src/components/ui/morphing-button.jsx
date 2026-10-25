import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTransitions } from "@/lib/motion-tokens";

// EasyUI "Morphing Button": one pill that morphs between idle, loading, success
// and error without changing size, so the form row never jumps. Themed to the
// site accent (amber in dark mode, sage in light mode).
const MorphingButton = ({
  status = "idle",
  idleText = "Send",
  loadingText = "Sending...",
  successText = "Sent",
  errorText = "Failed",
  idleIcon = <Send className="h-3.5 w-3.5" />,
  isDarkMode,
  disabled = false,
  className,
  ...props
}) => {
  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  const tone = isError
    ? isDarkMode
      ? "border-red-400/50 bg-red-500/10 text-red-400"
      : "border-red-500/50 bg-red-500/10 text-red-600"
    : isSuccess
      ? isDarkMode
        ? "border-amber-500/60 bg-amber-500/15 text-amber-400"
        : "border-[var(--lm-accent)]/60 bg-[var(--lm-accent)]/12 text-[var(--lm-accent)]"
      : isDarkMode
        ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
        : "border-[var(--lm-accent)]/40 text-[var(--lm-accent)] hover:bg-[var(--lm-accent)]/10";

  const swap = (key, children, from) => (
    <motion.span
      key={key}
      initial={from}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ ...from, y: from.y ? -from.y : 0 }}
      transition={motionTransitions.springSnappy}
      className="flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  return (
    <motion.button
      whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
      transition={motionTransitions.springSnappy}
      disabled={disabled || isLoading}
      aria-live="polite"
      className={cn(
        "relative inline-flex min-h-[44px] min-w-[160px] select-none items-center justify-center overflow-hidden rounded-full border px-6 py-2.5 text-sm font-medium outline-none transition-colors duration-200",
        tone,
        isLoading && "cursor-wait",
        disabled && !isSuccess && "cursor-not-allowed opacity-40",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoading &&
          swap(
            "loading",
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>{loadingText}</span>
            </>,
            { opacity: 0, y: 6 }
          )}
        {isSuccess &&
          swap(
            "success",
            <>
              <Check className="h-3.5 w-3.5" />
              <span>{successText}</span>
            </>,
            { opacity: 0, scale: 0.8 }
          )}
        {isError &&
          swap(
            "error",
            <>
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errorText}</span>
            </>,
            { opacity: 0, scale: 0.8 }
          )}
        {status === "idle" &&
          swap(
            "idle",
            <>
              {idleIcon}
              <span>{idleText}</span>
            </>,
            { opacity: 0, y: -6 }
          )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MorphingButton;
