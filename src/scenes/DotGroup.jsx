import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const DotGroup = ({ selectedPage, setSelectedPage, isDarkMode }) => {
  const selectedStyles = `relative bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 w-3 h-3 rounded-full 
    before:absolute before:w-6 before:h-6 before:rounded-full before:border-2 before:border-white/30 
    before:left-[-50%] before:top-[-50%] z-10 shadow-lg shadow-purple-500/25`;

  const unselectedStyles = isDarkMode 
    ? "bg-white/30 w-3 h-3 rounded-full hover:bg-white/50 transition-all duration-300 hover:scale-110"
    : "bg-amber-800/60 w-3 h-3 rounded-full hover:bg-amber-800/80 transition-all duration-300 hover:scale-110";

  return (
    <div className="fixed right-7 top-[60%] flex flex-col gap-6">
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