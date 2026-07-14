import Navbar from "./scenes/Navbar";
import Landing from "./scenes/Landing";
import DotGroup from "./scenes/DotGroup";
import LineGradient from "./components/LineGradient";
import useMediaQuery from "./hooks/useMediaQuery";
import { useEffect, useState, lazy, Suspense } from "react";

// Section anchors, top to bottom — used by the scroll-spy that highlights the
// nav/dot for whichever section you're currently viewing.
const SECTION_IDS = ["home", "projects", "about me", "contact"];

// Below-the-fold / non-critical scenes are code-split so the initial download is
// just the shell + the above-the-fold hero. Each loads its own chunk right after
// first paint (react-hook-form rides with Contact, react-icons with Projects,
// matter-js stays lazy inside PhysicsBricks), so time-to-interactive drops.
const Projects = lazy(() => import("./scenes/Projects"));
const AboutMe = lazy(() => import("./scenes/AboutMe"));
const Contact = lazy(() => import("./scenes/Contact"));
const Footer = lazy(() => import("./scenes/Footer"));
const SiteDoodleLayer = lazy(() => import("./components/SiteDoodleLayer"));
const LivingBackground = lazy(() => import("./components/LivingBackground"));
const BlogPost = lazy(() => import("./scenes/BlogPost"));

// Minimal hash router so blog links open shareable "pages" without breaking the
// gh-pages deploy (hash routes never 404 on refresh). Section anchors like
// #home / #projects fall through to the main site.
const parseRoute = (hash) => {
  const match = (hash || "").match(/^#\/blog\/([\w-]+)/);
  return match ? { name: "blog", slug: match[1] } : { name: "home" };
};

function App() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1060px)");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [route, setRoute] = useState(() =>
    parseRoute(typeof window !== "undefined" ? window.location.hash : "")
  );
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(isDarkMode ? "dark-mode" : "light-mode");
  }, [isDarkMode]);

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Land at the top when opening a blog page.
  useEffect(() => {
    if (route.name === "blog") window.scrollTo(0, 0);
  }, [route]);

  // gtag's initial pageview only fires once on load, so blog navigation
  // (a hash change, not a full reload) needs its own manual page_view.
  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    const page_path = route.name === "blog" ? `/blog/${route.slug}` : "/";
    window.gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [route]);

  useEffect(() => {
    // rAF-coalesce scroll work to once per frame, and keep the layout reads and
    // the style write together so they never interleave into a forced reflow.
    let ticking = false;
    const update = () => {
      ticking = false;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollMax = scrollHeight - clientHeight;

      setIsTopOfPage(scrollTop === 0);

      // Scroll-spy: the active section is the last one whose top has scrolled
      // above a reference line in the upper part of the viewport. This replaces
      // framer-motion's onViewportEnter, which tracked the wrong section here:
      // the lazy sections all mount at zero height, so every section's "enter"
      // fired at once on load (leaving the last, contact, wrongly selected) and
      // never re-fired for projects/home on scroll — and CSS zoom skewed its
      // IntersectionObserver math. A per-frame geometry check is reliable.
      const refLine = clientHeight * 0.4;
      let active = "home";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= refLine) active = id;
      }
      if (scrollTop === 0) active = "home";
      setSelectedPage(active);

      const indicator = document.querySelector(".scroll-indicator");
      if (indicator) indicator.style.width = (scrollMax > 0 ? (scrollTop / scrollMax) * 100 : 0) + "%";
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (route.name === "blog") {
    return (
      <div className={`app min-w-0 ${isDarkMode ? 'noise-overlay' : ''}`}>
        <Suspense fallback={null}>
          <LivingBackground isDarkMode={isDarkMode} />
        </Suspense>
        <Suspense fallback={null}>
          <BlogPost slug={route.slug} isDarkMode={isDarkMode} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className={`app min-w-0 ${isDarkMode ? 'noise-overlay' : ''}`}>
      <Suspense fallback={null}>
        <LivingBackground isDarkMode={isDarkMode} />
      </Suspense>
      <div className="scroll-indicator"></div>
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {isDesktop && (
        <DotGroup
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Content Sections - Added proper IDs for navigation */}
      <div id="home" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <Landing isDarkMode={isDarkMode} />
      </div>

      <LineGradient isDarkMode={isDarkMode} />

      <div id="projects" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <Suspense fallback={null}>
          <Projects isDarkMode={isDarkMode} />
        </Suspense>
      </div>

      <LineGradient isDarkMode={isDarkMode} />

      <div id="about me" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <Suspense fallback={null}>
          <AboutMe isDarkMode={isDarkMode} />
        </Suspense>
      </div>

      <LineGradient isDarkMode={isDarkMode} />

      <div id="contact" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <Suspense fallback={null}>
          <Contact isDarkMode={isDarkMode} />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <Footer isDarkMode={isDarkMode} />
      </Suspense>

      <Suspense fallback={null}>
        <SiteDoodleLayer isDarkMode={isDarkMode} />
      </Suspense>
    </div>
  );
}

export default App;
