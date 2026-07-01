import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge conditional class lists (clsx) and resolve Tailwind conflicts (twMerge).
// Used by every shadcn/ui component.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
