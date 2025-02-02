import Navbar from "./scenes/Navbar";
import Landing from "./scenes/Landing";
import DotGroup from "./scenes/DotGroup";
import MySkills from "./scenes/MySkills";
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

  // Toggle Theme Function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(isDarkMode ? "dark-mode" : "light-mode");

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage("home");
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkMode]);

  return (
    <div className={`app transition-colors duration-500`}>
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

      {/* Content Sections - No Individual Background Transitions */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div onViewportEnter={() => setSelectedPage("home")}>
          <Landing setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <LineGradient />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div onViewportEnter={() => setSelectedPage("skills")}>
          <MySkills isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <LineGradient />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div onViewportEnter={() => setSelectedPage("projects")}>
          <Projects isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <LineGradient />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div onViewportEnter={() => setSelectedPage("about me")}>
          <AboutMe isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <LineGradient />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div onViewportEnter={() => setSelectedPage("contact")}>
          <Contact isDarkMode={isDarkMode} />
        </motion.div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
