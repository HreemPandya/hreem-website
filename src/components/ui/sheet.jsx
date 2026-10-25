import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// EasyUI "Sheet", trimmed to the right-side drawer the mobile nav needs. Slides
// in from the edge, and can be dragged (or swiped) back out to dismiss; let go
// early and it springs back. Handles scroll lock, Esc, a Tab trap, and hands
// focus back to the opener on close.
const spring = { type: "spring", stiffness: 380, damping: 38, mass: 0.9 };
const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const Sheet = ({ open, onClose, isDarkMode, label, className, children }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const returnTo = document.activeElement;
    panelRef.current?.focus({ preventScroll: true });

    const { overflow, overscrollBehavior } = document.body.style;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.overscrollBehavior = overscrollBehavior;
      document.removeEventListener("keydown", onKey);
      returnTo?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  const trapTab = (e) => {
    if (e.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
    if (!nodes?.length) {
      e.preventDefault();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120]" data-doodle-ignore>
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            className={cn(
              "absolute inset-0 cursor-default border-0 p-0 [-webkit-tap-highlight-color:transparent]",
              isDarkMode ? "bg-[#07090D]/55 backdrop-blur-md" : "bg-[var(--lm-bg-base)]/55 backdrop-blur-md"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            onKeyDown={trapTab}
            className={cn(
              "absolute inset-y-0 right-0 flex h-full w-[84vw] max-w-[22rem] flex-col overflow-y-auto overscroll-contain border-l outline-none",
              "pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)]",
              isDarkMode
                ? "border-white/[0.06] bg-[#0B0F18] shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
                : "border-[var(--lm-border)] bg-[var(--lm-bg-surface)] shadow-[-20px_0_40px_rgba(0,0,0,0.08)]",
              className
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={spring}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 96 || info.velocity.x > 500) onClose();
            }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Sheet;
