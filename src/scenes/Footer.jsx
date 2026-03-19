import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

const CAT_MEOW_AUDIO = "/assets/cat-meow.mp3";

const Footer = ({ isDarkMode }) => {
  const lastMeowRef = useRef(0);
  const audioRef = useRef(null);
  const MEOW_COOLDOWN_MS = 2000;

  const playMeow = useCallback(() => {
    try {
      const audio = audioRef.current || new Audio(CAT_MEOW_AUDIO);
      if (!audioRef.current) audioRef.current = audio;
      audio.volume = 0.25;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {
      // Audio not supported
    }
  }, []);

  const handleCatHover = useCallback(() => {
    const now = Date.now();
    if (now - lastMeowRef.current >= MEOW_COOLDOWN_MS) {
      lastMeowRef.current = now;
      playMeow();
    }
  }, [playMeow]);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about me", label: "About" },
    { href: "#contact", label: "Contact" },
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

          {/* Right: Sleeping cat (Coding Artist tutorial) */}
          <motion.div
            className="flex flex-col items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className="footer-cat-wrapper"
              data-theme={isDarkMode ? "dark" : "light"}
              onMouseEnter={handleCatHover}
            >
              <div
                className="footer-cat-container"
                data-theme={isDarkMode ? "dark" : "light"}
              >
                <div className="footer-cat-shadow" />
                <div className="footer-cat">
                  <div className="footer-cat-ear" />
                  <div className="footer-cat-eye" />
                  <div className="footer-cat-mouth" />
                  <div className="footer-cat-nose" />
                  <div className="footer-cat-tail" />
                  <div className="footer-cat-body" />
                  <div className="footer-cat-bubble" />
                </div>
              </div>
            </div>
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
