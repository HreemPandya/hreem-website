import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

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

// Compact, theme-aware social row. Icons inherit the current text color, so a
// single color class themes them and lets each link hover to the accent.
const SocialMediaIcons = ({ isDarkMode, size = 18, className = "" }) => {
  const tone = isDarkMode
    ? "text-[#8B9DB0] hover:text-amber-400"
    : "text-[var(--lm-text-muted)] hover:text-[var(--lm-accent)]";

  return (
    <div className={`flex items-center gap-0.5 sm:gap-1.5 ${className}`}>
      {LINKS.map(({ label, href, Icon }) => {
        const external = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg outline-none transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tone}`}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaIcons;
