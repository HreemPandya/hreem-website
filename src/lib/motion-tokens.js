// Shared spring/ease presets for the EasyUI-derived components in components/ui.
// Ported from EasyUI's motion tokens so the ported pieces move the same way.
export const motionTransitions = {
  // Near-critically damped: no overshoot. Accordions, fades.
  springGentle: { type: "spring", stiffness: 170, damping: 26, mass: 0.9 },
  // Buttons, hover indicators, dock icons. Settles in ~200ms.
  springSnappy: { type: "spring", stiffness: 380, damping: 30, mass: 0.5 },
  // Shared-layout morphs (layoutId dialogs, sliding pills). Long, fluid settle.
  springMorph: { type: "spring", stiffness: 220, damping: 32, mass: 1.0 },
  easeSoft: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  easeFast: { duration: 0.2, ease: [0.2, 0, 0, 1] },
};
