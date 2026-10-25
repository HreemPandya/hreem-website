import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import FloatingActionDock from "./ui/floating-action-dock";

// lucide ships only the legacy Twitter bird, so draw the current X mark inline.
const XMark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// NOTE: X points at a best-guess handle (consistent with the others) — confirm/replace.
const LINKS = [
  { label: "GitHub", href: "https://github.com/HreemPandya", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hreem-pandya-7b74a0275/", Icon: Linkedin },
  { label: "X", href: "https://x.com/hreempandya", Icon: XMark },
  { label: "Email", href: "mailto:hreempandya@gmail.com", Icon: Mail },
];

// Theme-aware social row, rendered as a magnifying dock (icons swell toward
// the cursor, with a label tooltip).
const SocialMediaIcons = ({ isDarkMode, size = 18, className = "" }) => (
  <FloatingActionDock items={LINKS} isDarkMode={isDarkMode} iconSize={size} className={className} />
);

export default SocialMediaIcons;
