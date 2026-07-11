import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { Sun, Moon } from "lucide-react";

// Sections in order. `page` is the anchor/selection key (must match the section
// ids in App.js, incl. the space in "about me"); `label` is what the eye reads.
const NAV_ITEMS = [
  { label: "Home", page: "home" },
  { label: "Projects", page: "projects" },
  { label: "About", page: "about me" },
  { label: "Contact", page: "contact" },
];

// A quick, imperfect grease-pencil underline — the mark a photographer makes on a
// contact sheet to pick a frame. The wavy stroke stays crisp at any width
// (non-scaling-stroke) and is revealed by a left-to-right wipe (scaleX from the
// left edge), so it reads as being drawn in. Active is always shown; otherwise it
// wipes in on hover/focus of the parent `group`.
const SketchUnderline = ({ color, active }) => (
  <span
    className={`pointer-events-none absolute -bottom-[5px] left-0 h-[6px] w-full origin-left transition-transform duration-300 ease-out ${
      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
    }`}
    aria-hidden="true"
  >
    <svg className="h-full w-full overflow-visible" viewBox="0 0 100 6" preserveAspectRatio="none" fill="none">
      <path
        d="M1.5,4 C22,1 30,5.4 50,3.2 C70,1 78,5 98.5,2.6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </span>
);

// A hand-drawn ring for the theme toggle — the same grease-pencil gesture, closed
// into a wobbly circle that doesn't quite meet its own tail. Scales/fades in on hover.
const SketchRing = ({ color }) => (
  <span
    className="pointer-events-none absolute -inset-1 origin-center scale-90 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
    aria-hidden="true"
  >
    <svg className="h-full w-full" viewBox="0 0 44 44" fill="none">
      <path
        d="M23,4 C33,3.5 40.5,11 40.5,22 C40.5,32 32.5,40.5 21.5,40.5 C11,40.5 3.5,32.5 3.5,21.5 C3.5,11.5 12,4 22,4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </span>
);

const NavLink = ({ item, selectedPage, setSelectedPage, isDarkMode }) => {
  const isActive = selectedPage === item.page;
  const accent = isDarkMode ? "#F59E0B" : "#4A6B4E";

  return (
    <AnchorLink
      href={`#${item.page}`}
      onClick={() => setSelectedPage(item.page)}
      aria-current={isActive ? "true" : undefined}
      className="group relative py-1 outline-none"
    >
      <span
        className={`relative font-sans text-[13px] uppercase tracking-[0.18em] transition-colors ${
          isActive
            ? isDarkMode
              ? "text-[#F0F4F8]"
              : "text-[var(--lm-text-primary)]"
            : isDarkMode
              ? "text-[#8B9DB0] group-hover:text-[#F0F4F8]"
              : "text-[var(--lm-text-muted)] group-hover:text-[var(--lm-text-primary)]"
        }`}
      >
        {item.label}
        <SketchUnderline color={accent} active={isActive} />
      </span>
    </AnchorLink>
  );
};

const ThemeToggle = ({ isDarkMode, toggleTheme, className = "" }) => {
  const accent = isDarkMode ? "#F59E0B" : "#4A6B4E";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Lights on" : "Lights off"}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full outline-none transition-colors ${
        isDarkMode
          ? "text-amber-400 hover:text-amber-300"
          : "text-[var(--lm-accent)] hover:opacity-80"
      } ${className}`}
    >
      <SketchRing color={accent} />
      {isDarkMode ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
    </button>
  );
};

// Compact stacked-lines menu glyph that morphs into an X. No border/pill — just
// the mark and a small label, so it reads hand-set rather than boxed.
const MenuGlyph = ({ open, isDarkMode }) => {
  const bar = isDarkMode ? "bg-[#F0F4F8]" : "bg-[var(--lm-text-primary)]";
  return (
    <span className="relative flex h-3 w-5 flex-col justify-between">
      <span className={`h-[2px] w-full origin-center rounded-full transition-all duration-300 ${bar} ${open ? "translate-y-[5px] rotate-45" : ""}`} />
      <span className={`h-[2px] w-full rounded-full transition-all duration-300 ${bar} ${open ? "opacity-0" : ""}`} />
      <span className={`h-[2px] w-full origin-center rounded-full transition-all duration-300 ${bar} ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
    </span>
  );
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage, isDarkMode, toggleTheme }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const mobileMenuOpen = !isDesktop && isMenuToggled;
  const accent = isDarkMode ? "#F59E0B" : "#4A6B4E";

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuToggled(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav
      data-doodle-ignore
      className={`fixed top-0 w-full transition-all duration-300 ${
        mobileMenuOpen ? "z-[120]" : "z-40"
      } ${isTopOfPage ? "py-6" : "py-4"} ${
        isTopOfPage
          ? "bg-transparent"
          : isDarkMode
            ? "border-b border-white/[0.06] bg-[#07090D]/70 backdrop-blur-md"
            : "border-b border-[var(--lm-border)] bg-[var(--lm-bg-base)]/80 backdrop-blur-md"
      }`}
      aria-label="Primary"
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-end px-4 sm:px-6 md:w-5/6 md:px-0">
        {/* DESKTOP NAV */}
        {isDesktop ? (
          <div className="flex items-center gap-5 md:gap-7">
            <div className="flex items-center gap-5 md:gap-7">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.page}
                  item={item}
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>

            {/* Hairline divider, then the reimagined theme toggle */}
            <span
              className={`h-5 w-px ${isDarkMode ? "bg-white/10" : "bg-[var(--lm-accent)]/20"}`}
              aria-hidden="true"
            />
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
        ) : (
          /* MOBILE trigger — un-boxed: just the stacked-lines glyph */
          <button
            type="button"
            aria-expanded={isMenuToggled}
            aria-label={isMenuToggled ? "Close menu" : "Open menu"}
            className={`flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg outline-none transition-opacity hover:opacity-80 ${
              isDarkMode ? "text-[#F0F4F8]" : "text-[var(--lm-text-primary)]"
            }`}
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <MenuGlyph open={isMenuToggled} isDarkMode={isDarkMode} />
          </button>
        )}

        {/* Mobile: full-screen dim + blur; tapping outside the panel closes it.
            Rendered through a portal for reliable hit-testing + stacking. */}
        {mobileMenuOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <>
              <button
                type="button"
                aria-label="Close menu"
                className={`fixed inset-0 z-[100] cursor-default border-0 p-0 touch-manipulation [-webkit-tap-highlight-color:transparent] motion-reduce:backdrop-blur-sm ${
                  isDarkMode
                    ? "bg-[#07090D]/55 backdrop-blur-xl supports-[backdrop-filter]:bg-[#07090D]/40"
                    : "bg-[var(--lm-bg-base)]/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-[var(--lm-bg-base)]/45"
                }`}
                onClick={() => setIsMenuToggled(false)}
              />
              <div
                className="fixed left-4 right-4 top-[calc(5.25rem+env(safe-area-inset-top,0px))] z-[130] max-h-[min(70vh,calc(100dvh-6rem-env(safe-area-inset-bottom,0px)))] overflow-y-auto overscroll-contain rounded-2xl"
                style={{
                  backgroundColor: isDarkMode ? "#0B0F18" : "var(--lm-bg-surface)",
                  boxShadow: isDarkMode
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                    : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  border: isDarkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid var(--lm-border)",
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
              >
                <div className="px-3 pb-2 pt-3">
                  {NAV_ITEMS.map((item) => {
                    const isActive = selectedPage === item.page;
                    return (
                      <AnchorLink
                        key={item.page}
                        href={`#${item.page}`}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex min-h-[44px] items-center rounded-xl px-3 py-3 transition-colors"
                        style={{
                          backgroundColor: isActive
                            ? isDarkMode
                              ? "rgba(245, 158, 11, 0.10)"
                              : "rgba(74, 107, 78, 0.10)"
                            : "transparent",
                        }}
                        onClick={() => {
                          setSelectedPage(item.page);
                          setIsMenuToggled(false);
                        }}
                      >
                        <span
                          className="relative font-sans text-base uppercase tracking-[0.14em]"
                          style={{
                            color: isActive
                              ? isDarkMode
                                ? "#F0F4F8"
                                : "var(--lm-text-primary)"
                              : isDarkMode
                                ? "#8B9DB0"
                                : "var(--lm-text-muted)",
                          }}
                        >
                          {item.label}
                          <SketchUnderline color={accent} active={isActive} />
                        </span>
                      </AnchorLink>
                    );
                  })}
                </div>

                {/* Theme row — label + the same grease-pencil toggle, no switch track */}
                <div
                  className="mt-1 flex items-center justify-between px-6 py-4"
                  style={{
                    borderTop: isDarkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid var(--lm-border)",
                  }}
                >
                  <div className="min-w-0">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: isDarkMode ? "rgba(245,158,11,0.6)" : "rgba(74,107,78,0.7)" }}
                    >
                      {isDarkMode ? "Darkroom" : "Daylight"}
                    </p>
                    <p
                      className="mt-0.5 font-sans text-sm"
                      style={{ color: isDarkMode ? "#F0F4F8" : "var(--lm-text-primary)" }}
                    >
                      {isDarkMode ? "Dark mode" : "Light mode"}
                    </p>
                  </div>
                  <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} className="h-11 w-11" />
                </div>
              </div>
            </>,
            document.body
          )}
      </div>
    </nav>
  );
};

export default Navbar;
