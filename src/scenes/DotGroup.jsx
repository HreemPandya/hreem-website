import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const SAGE = '#4A6B4E';

const DotGroup = ({ selectedPage, setSelectedPage, isDarkMode }) => {
  const selectedStyles = isDarkMode 
    ? "bg-amber-500 w-2.5 h-2.5 rounded-full ring-1 ring-offset-1 ring-offset-transparent ring-amber-500/30 z-10"
    : "w-2.5 h-2.5 rounded-full ring-1 ring-offset-1 ring-offset-transparent ring-[#4A6B4E]/30 z-10";

  const unselectedStyles = isDarkMode 
    ? "bg-amber-500/30 w-1.5 h-1.5 rounded-full hover:bg-amber-500/50 transition-all duration-300"
    : "w-1.5 h-1.5 rounded-full hover:scale-110 transition-all duration-300";

  const selectedStyle = !isDarkMode ? { backgroundColor: SAGE } : undefined;
  const unselectedStyle = !isDarkMode ? { backgroundColor: 'rgba(74, 107, 78, 0.4)' } : undefined;

  // Hide on mobile to avoid clutter, show on tablet and up
  const isVisible = window.innerWidth >= 768;

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 md:right-7 top-[60%] flex flex-col gap-4 md:gap-6 z-30">
      <AnchorLink
        className={selectedPage === "home" ? selectedStyles : unselectedStyles}
        style={selectedPage === "home" ? selectedStyle : unselectedStyle}
        href="#home"
        onClick={() => setSelectedPage("home")}
      />
      <AnchorLink
        className={selectedPage === "projects" ? selectedStyles : unselectedStyles}
        style={selectedPage === "projects" ? selectedStyle : unselectedStyle}
        href="#projects"
        onClick={() => setSelectedPage("projects")}
      />
      <AnchorLink
        className={selectedPage === "about me" ? selectedStyles : unselectedStyles}
        style={selectedPage === "about me" ? selectedStyle : unselectedStyle}
        href="#about me"
        onClick={() => setSelectedPage("about me")}
      />
      <AnchorLink
        className={selectedPage === "contact" ? selectedStyles : unselectedStyles}
        style={selectedPage === "contact" ? selectedStyle : unselectedStyle}
        href="#contact"
        onClick={() => setSelectedPage("contact")}
      />
    </div>
  );
};

export default DotGroup;