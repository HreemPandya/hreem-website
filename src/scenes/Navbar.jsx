import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { FiSun, FiMoon } from "react-icons/fi";

const Link = ({ page, selectedPage, setSelectedPage, isDarkMode }) => {
  const lowerCasePage = page.toLowerCase();
  return (
    <AnchorLink
      className={`${
        selectedPage === lowerCasePage
          ? `${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold scale-110 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`
          : `${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
      } transition-all duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} hover:scale-105 relative group px-3 py-2 rounded-lg`}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
      {/* Hover effect underline */}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
    </AnchorLink>
  );
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage, isDarkMode, toggleTheme }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 z-50 transition-all duration-100"
        style={{ 
          width: `${Math.min(100, (window.pageYOffset / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100)}%` 
        }}
      />

      <nav className={`z-40 w-full fixed top-0 py-6 transition-all duration-300 ${
        isTopOfPage 
          ? 'bg-transparent backdrop-blur-none' 
          : isDarkMode 
            ? 'bg-black/20 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg'
      }`}>
        <div className="flex items-center justify-between mx-auto w-5/6">
          {/* Enhanced Logo */}
          <div className="relative group">
            <h4 className="font-playfair text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-pointer">
              HP
            </h4>
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </div>

          {/* DESKTOP NAV */}
          {isDesktop ? (
            <div className="flex items-center justify-between gap-8 font-opensans text-sm font-semibold">
              {/* Navigation Links with glass effect */}
              <div className={`flex items-center gap-6 backdrop-blur-lg rounded-full px-6 py-3 border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-white/70 border-gray-200/50 shadow-md'
              }`}>
                <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
                <Link page="Skills" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
                <Link page="Projects" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
                <Link page="About Me" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
                <Link page="Contact" selectedPage={selectedPage} setSelectedPage={setSelectedPage} isDarkMode={isDarkMode} />
              </div>

              {/* Fixed Toggle Switch */}
              <div className="relative">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    className="sr-only"
                  />
                  <div className={`relative w-14 h-7 rounded-full transition-all duration-300 shadow-lg ${
                    isDarkMode 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500" 
                      : "bg-gradient-to-r from-teal-400 to-blue-500"
                  }`}>
                    <div
                      className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-all duration-300 shadow-md flex items-center justify-center
                        ${isDarkMode ? "translate-x-7" : ""}`}
                    >
                      {isDarkMode ? (
                        <FiMoon className="text-purple-500 w-3 h-3" />
                      ) : (
                        <FiSun className="text-yellow-500 w-3 h-3" />
                      )}
                    </div>
                  </div>
                </label>
                
                {/* Fixed glow effect - now properly contained */}
                <div className={`absolute inset-0 w-14 h-7 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 pointer-events-none ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500" 
                    : "bg-gradient-to-r from-teal-400 to-blue-500"
                }`} />
              </div>
            </div>
          ) : (
            /* Mobile Menu Button */
            <button
              className={`rounded-full p-3 transition-all duration-300 backdrop-blur-lg border hover:scale-110 ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                  : 'bg-white/70 border-gray-200/50 hover:bg-white/90 shadow-md'
              }`}
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 transition-all duration-300 ${
                  isDarkMode ? 'bg-white' : 'bg-gray-700'
                } ${isMenuToggled ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-5 h-0.5 transition-all duration-300 mt-1 ${
                  isDarkMode ? 'bg-white' : 'bg-gray-700'
                } ${isMenuToggled ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 transition-all duration-300 mt-1 ${
                  isDarkMode ? 'bg-white' : 'bg-gray-700'
                } ${isMenuToggled ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          )}

          {/* ENHANCED MOBILE MENU POPUP */}
          {!isDesktop && isMenuToggled && (
            <div className={`fixed right-0 top-0 h-full w-80 backdrop-blur-xl border-l transform transition-transform duration-300 ${
              isDarkMode 
                ? 'bg-black/90 border-white/10' 
                : 'bg-white/95 border-gray-200/50 shadow-2xl'
            } ${isMenuToggled ? 'translate-x-0' : 'translate-x-full'}`}>
              {/* Close Button */}
              <div className="flex justify-end p-8">
                <button 
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                  className={`p-2 rounded-full transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col gap-6 px-8 py-4">
                {['Home', 'Skills', 'Projects', 'About Me', 'Contact'].map((page, index) => (
                  <div key={page} 
                       className="transform translate-x-8 opacity-0 animate-slide-in"
                       style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
                    <AnchorLink
                      className={`block text-2xl transition-all duration-300 py-2 ${
                        isDarkMode 
                          ? 'text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text'
                          : 'text-gray-800 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:bg-clip-text'
                      }`}
                      href={`#${page.toLowerCase()}`}
                      onClick={() => {
                        setSelectedPage(page.toLowerCase());
                        setIsMenuToggled(false);
                      }}
                    >
                      {page}
                    </AnchorLink>
                  </div>
                ))}

                {/* Mobile Toggle Switch */}
                <div className="mt-8 transform translate-x-8 opacity-0 animate-slide-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={toggleTheme}
                      className="sr-only"
                    />
                    <div className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500" 
                        : "bg-gradient-to-r from-teal-400 to-blue-500"
                    }`}>
                      <div
                        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-all duration-300 flex items-center justify-center
                          ${isDarkMode ? "translate-x-7" : ""}`}
                      >
                        {isDarkMode ? (
                          <FiMoon className="text-purple-500 w-3 h-3" />
                        ) : (
                          <FiSun className="text-yellow-500 w-3 h-3" />
                        )}
                      </div>
                    </div>
                    <span className={`ml-4 text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        @keyframes slide-in {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;