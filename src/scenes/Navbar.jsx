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
          ? `${isDarkMode ? 'text-[#F0F4F8] border-b border-violet-500/60' : 'text-gray-900'} font-bold scale-110`
          : `${isDarkMode ? 'text-[#8B9DB0]' : 'text-gray-700'}`
      } transition-all duration-300 ${isDarkMode ? 'hover:text-[#F0F4F8]' : 'hover:text-gray-900'} hover:scale-105 relative group px-3 py-2 rounded-lg`}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
      {/* Hover effect underline */}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
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
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-violet-600 to-cyan-400 z-50 transition-all duration-100"
        style={{ 
          width: `${Math.min(100, (window.pageYOffset / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100)}%` 
        }}
      />

      <nav className={`z-40 w-full fixed top-0 py-6 transition-all duration-300 ${
        isTopOfPage 
          ? 'bg-transparent backdrop-blur-none' 
          : isDarkMode 
            ? 'bg-[#07090D]/80 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg'
      }`}>
        <div className="flex items-center justify-between mx-auto w-5/6">
          {/* Enhanced Logo */}
          <div className="relative group">
            <h4 className="font-playfair text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-pointer">
              HP
            </h4>
          </div>

          {/* DESKTOP NAV */}
          {isDesktop ? (
            <div className="flex items-center justify-between gap-8 font-opensans text-sm font-semibold">
              {/* Navigation Links with glass effect */}
              <div className={`flex items-center gap-6 backdrop-blur-xl rounded-full px-6 py-3 border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/[0.04] border-white/[0.06]' 
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
                      ? "bg-gradient-to-r from-violet-600 to-cyan-500" 
                      : "bg-gradient-to-r from-teal-400 to-blue-500"
                  }`}>
                    <div
                      className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-all duration-300 shadow-md flex items-center justify-center
                        ${isDarkMode ? "translate-x-7" : ""}`}
                    >
                      {isDarkMode ? (
                        <FiMoon className="text-violet-500 w-3 h-3" />
                      ) : (
                        <FiSun className="text-yellow-500 w-3 h-3" />
                      )}
                    </div>
                  </div>
                </label>
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

          {/* ENHANCED DROPDOWN MOBILE MENU */}
          {!isDesktop && isMenuToggled && (
            <>
              {/* Backdrop overlay for better UX */}
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                onClick={() => setIsMenuToggled(false)}
              />
              
              {/* Enhanced dropdown menu */}
              <div className="absolute top-full left-0 right-0 mt-3 mx-4 rounded-2xl overflow-hidden z-40"
                   style={{ 
                     backgroundColor: isDarkMode ? '#0B0F18' : '#ffffff',
                     boxShadow: isDarkMode 
                       ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
                       : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                     border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e5e7eb'
                   }}>
                
                {/* Menu header */}
                <div className="px-6 py-4 border-b" 
                     style={{ 
                       backgroundColor: isDarkMode ? '#111827' : '#f8fafc',
                       borderBottomColor: isDarkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
                     }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" 
                          style={{ color: isDarkMode ? '#F0F4F8' : '#475569' }}>
                      Navigation
                    </span>
                    <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"></div>
                  </div>
                </div>

                {/* Menu items with enhanced styling */}
                <div className="py-2">
                  {['Home', 'Skills', 'Projects', 'About Me', 'Contact'].map((page) => {
                    const isActive = selectedPage === page.toLowerCase();

                    return (
                      <AnchorLink
                        key={page}
                        className="flex items-center px-6 py-4 text-base font-medium transition-all duration-300 relative group"
                        style={{
                          color: isActive 
                            ? '#F0F4F8'
                            : isDarkMode ? '#8B9DB0' : '#374151',
                          backgroundColor: isActive 
                            ? 'rgba(124, 58, 237, 0.15)'
                            : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.target.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.04)' : '#f1f5f9';
                            e.target.style.transform = 'translateX(4px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.transform = 'translateX(0px)';
                          }
                        }}
                        href={`#${page.toLowerCase()}`}
                        onClick={() => {
                          setSelectedPage(page.toLowerCase());
                          setIsMenuToggled(false);
                        }}
                      >
                        {/* Dot indicator */}
                        <div className={`mr-3 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-violet-500' : isDarkMode ? 'bg-white/20' : 'bg-gray-400/50'}`} />
                        
                        {/* Page name */}
                        <span className="flex-1">{page}</span>
                        
                        {/* Active indicator */}
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 ml-2"></div>
                        )}
                      </AnchorLink>
                    );
                  })}
                </div>

                {/* Theme toggle section with enhanced design */}
                <div className="px-6 py-4 border-t" 
                     style={{ 
                       backgroundColor: isDarkMode ? '#111827' : '#f8fafc',
                       borderTopColor: isDarkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
                     }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">
                        {isDarkMode ? '🌙' : '☀️'}
                      </span>
                      <div>
                        <span className="text-sm font-medium" 
                              style={{ color: isDarkMode ? '#e2e8f0' : '#374151' }}>
                          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                        </span>
                        <p className="text-xs" 
                           style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                          {isDarkMode ? 'Currently active' : 'Currently active'}
                        </p>
                      </div>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        className="sr-only peer"
                      />
                      <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        isDarkMode 
                          ? "bg-gradient-to-r from-violet-600 to-cyan-500" 
                          : "bg-gradient-to-r from-teal-400 to-blue-500"
                      }`}>
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md flex items-center justify-center
                            ${isDarkMode ? "translate-x-6" : ""}`}
                        >
                          {isDarkMode ? (
                            <FiMoon className="text-violet-500 w-2.5 h-2.5" />
                          ) : (
                            <FiSun className="text-yellow-500 w-2.5 h-2.5" />
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      <style>{`
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