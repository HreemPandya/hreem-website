import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { FiSun, FiMoon } from "react-icons/fi"; // Import icons

const Link = ({ page, selectedPage, setSelectedPage, isDarkMode }) => {
  const lowerCasePage = page.toLowerCase();
  return (
    <AnchorLink
      className={`${selectedPage === lowerCasePage
          ? "text-white font-bold scale-110"
          : "text-deep-blue"
        } transition duration-300 
        ${isDarkMode ? "hover:text-yellow" : "hover:text-[#6BA7A5]"}`}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </AnchorLink>
  );
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage, isDarkMode, toggleTheme }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const navbarBackground = isDarkMode
    ? "bg-gradient-to-r from-green-400 to-green-600"
    : "bg-gradient-to-r from-[#E76F51] to-[#E76F51]";

  return (
    <nav className={`${navbarBackground} z-40 w-full fixed top-0 py-6 transition-colors duration-300`}>
      <div className="flex items-center justify-between mx-auto w-5/6">
        {/* Logo */}
        <h4 className="font-playfair text-4xl font-extrabold text-deep-blue">HP</h4>
        {/* DESKTOP NAV */}
        {isDesktop ? (
          <div className="flex items-center justify-between gap-16 font-opensans text-sm font-semibold">
            <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
            <Link page="Skills" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
            <Link page="Projects" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
            <Link page="About Me" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
            <Link page="Contact" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />

            {/* Toggle Switch for Dark Mode */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
                className="sr-only"
              />
              <div className={`relative w-12 h-6 rounded-full transition duration-300 ${isDarkMode ? "bg-[#f8cc54]" : "bg-[#6BA7A5]"}`}>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300
            ${isDarkMode ? "translate-x-6" : ""}`}
                ></div>
              </div>
              <span className="ml-2 text-lg">{isDarkMode ? <FiMoon className="text-black" /> : <FiSun className="text-white" />}</span>
            </label>
          </div>
        ) : (
          <button
            className={`rounded-full p-2 transition duration-300 ${isDarkMode ? "bg-green-600" : "bg-[#6BA7A5]"}`}
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <img alt="menu-icon" src={`${process.env.PUBLIC_URL}/assets/menu-icon.svg`} />
          </button>
        )}


        {/* MOBILE MENU POPUP */}
        {!isDesktop && isMenuToggled && (
          <div className={`fixed right-0 bottom-0 h-full ${isDarkMode ? "bg-green-900" : "bg-[#E76F51]"} w-[300px]`}>
            {/* CLOSE ICON */}
            <div className="flex justify-end p-12">
              <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <img alt="close-icon" src={`${process.env.PUBLIC_URL}/assets/close-icon.svg`} />
              </button>
            </div>

            {/* MENU ITEMS */}
            <div className="flex flex-col gap-10 ml-[33%] text-2xl">
              <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
              <Link page="Skills" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
              <Link page="Projects" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
              <Link page="About Me" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
              <Link page="Contact" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />

              {/* Toggle Switch inside Mobile Menu */}
              <label className="flex items-center cursor-pointer mt-4">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  className="sr-only"
                />
                <div className={`relative w-12 h-6 rounded-full transition duration-300 ${isDarkMode ? "bg-[#f8cc54]" : "bg-[#6BA7A5]"}`}>
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300
                      ${isDarkMode ? "translate-x-6" : ""}`}
                  ></div>
                </div>
                <span className="ml-2 text-lg">{isDarkMode ? <FiMoon className="text-black" /> : <FiSun className="text-white" />}</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
