import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const DotGroup = ({ selectedPage, setSelectedPage, isDarkMode }) => {
  const selectedStyles = isDarkMode
    ? `relative bg-[#f8cc54] w-3 h-3 rounded-full before:absolute before:w-6 before:h-6 before:rounded-full before:border-2 before:border-[#f8cc54] before:left-[-50%] before:top-[-50%] z-10`
    : `relative bg-[#6BA7A5] w-3 h-3 rounded-full before:absolute before:w-6 before:h-6 before:rounded-full before:border-2 before:border-[#6BA7A5] before:left-[-50%] before:top-[-50%] z-10`;

  const unselectedStyles = isDarkMode
    ? "bg-gray-500 w-3 h-3 rounded-full"
    : "bg-[#D3B8A1] w-3 h-3 rounded-full";

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