import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// EasyUI "Morphing Icon": cross-fades two icons with a coordinated rotate and
// scale, so `from` spins out as `to` spins in.
const MorphingIcon = ({ from, to, active = false, duration = 0.35, size = 18, className }) => {
  const ease = [0.4, 0, 0.2, 1];
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: active ? 0 : 1, scale: active ? 0.65 : 1, rotate: active ? -90 : 0 }}
        transition={{ duration, ease }}
        aria-hidden={active}
      >
        {from}
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.65, rotate: active ? 0 : 90 }}
        transition={{ duration, ease }}
        aria-hidden={!active}
      >
        {to}
      </motion.span>
    </span>
  );
};

export default MorphingIcon;
