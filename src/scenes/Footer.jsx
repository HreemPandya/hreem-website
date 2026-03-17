import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Footer = ({ isDarkMode }) => {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about me", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://www.linkedin.com/in/hreem-pandya-7b74a0275/", icon: "linkedin" },
    { href: "https://github.com/HreemPandya", icon: "github" },
    { href: "https://www.youtube.com/@hreempandya2596/videos", icon: "youtube" },
    { href: "https://www.instagram.com/hreempandya", icon: "instagram" },
  ];

  return (
    <footer
      className={`relative w-full py-12 md:py-16 mt-20 md:mt-24 overflow-hidden ${
        isDarkMode ? "bg-[#07090D]" : "bg-[var(--lm-bg-base)]"
      }`}
    >
      {/* Subtle top border + accent glow */}
      <div
        className={`absolute top-0 left-0 right-0 h-px ${
          isDarkMode ? "bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" : "bg-gradient-to-r from-transparent via-[var(--lm-accent)]/30 to-transparent"
        }`}
      />
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-amber-500/[0.03] blur-[80px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
          {/* Left: Brand + Nav */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h2
                className={`font-playfair font-bold text-xl md:text-2xl ${
                  isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"
                }`}
              >
                Hreem Pandya
              </h2>
              <p
                className={`mt-1 font-mono text-xs uppercase tracking-wider ${
                  isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"
                }`}
              >
                Full Stack Developer · Computer Eng
              </p>
            </div>

            {/* Quick nav — matches portfolio best practices */}
            <nav className="flex flex-wrap gap-x-6 gap-y-1">
              {navLinks.map((link) => (
                <AnchorLink
                  key={link.label}
                  href={link.href}
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode
                      ? "text-[#8B9DB0] hover:text-amber-400"
                      : "text-[var(--lm-text-muted)] hover:text-[var(--lm-accent)]"
                  }`}
                >
                  {link.label}
                </AnchorLink>
              ))}
            </nav>
          </motion.div>

          {/* Right: Social + CTA */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div>
              <p
                className={`font-mono text-xs uppercase tracking-wider mb-3 ${
                  isDarkMode ? "text-amber-500/70" : "text-[var(--lm-accent)]/70"
                }`}
              >
                Connect
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-[#8B9DB0] hover:text-amber-400" : "text-[var(--lm-text-muted)] hover:text-[var(--lm-accent)]"
                    }`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.icon}
                  >
                    {social.icon === "linkedin" && (
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {social.icon === "github" && (
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {social.icon === "youtube" && (
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )}
                    {social.icon === "instagram" && (
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.40-1.439-1.40z" />
                      </svg>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>

            <AnchorLink
              href="#contact"
              className={`inline-flex items-center gap-2 text-sm font-medium w-fit transition-colors ${
                isDarkMode
                  ? "text-amber-400/90 hover:text-amber-400"
                  : "text-[var(--lm-accent)] hover:opacity-80"
              }`}
            >
              Get in touch
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AnchorLink>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className={`mt-12 md:mt-16 pt-6 md:pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t ${isDarkMode ? "border-white/[0.06]" : "border-[var(--lm-border)]"}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p
            className={`text-xs ${
              isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"
            }`}
          >
            © {new Date().getFullYear()} Hreem Pandya
          </p>
          <p
            className={`text-xs ${
              isDarkMode ? "text-[#8B9DB0]/80" : "text-[var(--lm-text-muted)]/80"
            }`}
          >
            Built with React
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
