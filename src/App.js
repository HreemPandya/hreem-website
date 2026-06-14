import Navbar from "./scenes/Navbar";
import Landing from "./scenes/Landing";
import DotGroup from "./scenes/DotGroup";
import LineGradient from "./components/LineGradient";
import Projects from "./scenes/Projects";
import Contact from "./scenes/Contact";
import Footer from "./scenes/Footer";
import SiteDoodleLayer from "./components/SiteDoodleLayer";
import useMediaQuery from "./hooks/useMediaQuery";
import { useEffect, useState } from "react";
import AboutMe from "./scenes/AboutMe";
import Writing from "./scenes/Writing";
import BlogPost from "./scenes/BlogPost";
import { motion } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollMax = scrollHeight - clientHeight;

      if (scrollTop === 0) {
        setIsTopOfPage(true);
        setSelectedPage("home");
      } else {
        setIsTopOfPage(false);
      }

      const indicator = document.querySelector(".scroll-indicator");
      if (indicator) indicator.style.width = (scrollMax > 0 ? (scrollTop / scrollMax) * 100 : 0) + "%";
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (route.name === "blog") {
    return (
      <div className={`app min-w-0 ${isDarkMode ? 'noise-overlay' : ''}`}>
        <BlogPost slug={route.slug} isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className={`app min-w-0 ${isDarkMode ? 'noise-overlay' : ''}`}>
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
        <motion.div onViewportEnter={() => setSelectedPage("home")}>
          <Landing setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <LineGradient isDarkMode={isDarkMode} />

      <div id="projects" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <motion.div onViewportEnter={() => setSelectedPage("projects")}>
          <Projects isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <LineGradient isDarkMode={isDarkMode} />

      <div id="about me" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <motion.div onViewportEnter={() => setSelectedPage("about me")}>
          <AboutMe isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <LineGradient isDarkMode={isDarkMode} />

      <div id="writing-wrap" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <Writing isDarkMode={isDarkMode} />
      </div>

      <LineGradient isDarkMode={isDarkMode} />

      <div id="contact" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <motion.div onViewportEnter={() => setSelectedPage("contact")}>
          <Contact isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <Footer isDarkMode={isDarkMode} />

      <SiteDoodleLayer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;