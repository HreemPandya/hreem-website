import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const DotGroup = ({ selectedPage, setSelectedPage, isDarkMode }) => {
  const selectedStyles = `bg-violet-500 w-2.5 h-2.5 rounded-full ring-1 ring-offset-1 ring-offset-transparent ring-violet-500/30 z-10`;

  const unselectedStyles = isDarkMode 
    ? "bg-white/20 w-1.5 h-1.5 rounded-full hover:bg-white/40 transition-all duration-300"
    : "bg-amber-800/60 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full hover:bg-amber-800/80 transition-all duration-300 hover:scale-110";

  // Hide on mobile to avoid clutter, show on tablet and up
  const isVisible = window.innerWidth >= 768;

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 md:right-7 top-[60%] flex flex-col gap-4 md:gap-6 z-30">
      <AnchorLink
        className={selectedPage === "home" ? selectedStyles : unselectedStyles}
        href="#home"
        onClick={() => setSelectedPage("home")}
      />
      <AnchorLink
        className={selectedPage === "skills" ? selectedStyles : unselectedStyles}
        href="#skills"
        onClick={() => setSelectedPage("skills")}
      />
      <AnchorLink
        className={selectedPage === "projects" ? selectedStyles : unselectedStyles}
        href="#projects"
        onClick={() => setSelectedPage("projects")}
      />
      <AnchorLink
        className={selectedPage === "about me" ? selectedStyles : unselectedStyles}
        href="#about me"
        onClick={() => setSelectedPage("about me")}
      />
      <AnchorLink
        className={selectedPage === "contact" ? selectedStyles : unselectedStyles}
        href="#contact"
        onClick={() => setSelectedPage("contact")}
      />
    </div>
  );
};

export default DotGroup;