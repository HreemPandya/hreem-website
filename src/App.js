import Navbar from "./scenes/Navbar";
import Landing from "./scenes/Landing";
import DotGroup from "./scenes/DotGroup";
import LineGradient from "./components/LineGradient";
import Projects from "./scenes/Projects";
import Contact from "./scenes/Contact";
import Footer from "./scenes/Footer";
import useMediaQuery from "./hooks/useMediaQuery";
import { useEffect, useState } from "react";
import AboutMe from "./scenes/AboutMe";
import { motion } from "framer-motion";

function App() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1060px)");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(isDarkMode ? "dark-mode" : "light-mode");
  }, [isDarkMode]);

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

      <div id="contact" className="max-w-7xl mx-auto min-w-0 px-4 sm:px-6">
        <motion.div onViewportEnter={() => setSelectedPage("contact")}>
          <Contact isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;