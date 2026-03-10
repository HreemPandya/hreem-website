import React, { useEffect, useState } from 'react';
import SocialMediaIcons from "../components/SocialMediaIcons";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

// Typewriter Effect Component
const TypewriterEffect = ({ isDarkMode }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const titles = [
    "Computer Engineer",
    "Full Stack Developer",
    "Tech Enthusiast",
    "Digital Artist",
    "AI and ML Explorer",
  ];

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    let timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % titles.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentTitle.substring(0, currentText.length - 1));
        }, 30);
      }
    } else {
      if (currentText === currentTitle) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentTitle.substring(0, currentText.length + 1));
        }, 60);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, titles]);

  return (
    <div className="w-full max-w-md mx-auto md:mx-0">
      <h2 className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium font-playfair ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'} tracking-wide text-center md:text-left leading-relaxed`}>
        {currentText}
        <span className={isDarkMode ? 'text-violet-400' : 'text-purple-500'}>|</span>
      </h2>
    </div>
  );
};

const Landing = ({ setSelectedPage, isDarkMode }) => {
  return (
    <>
      {/* Background Decorations */}
      {isDarkMode && (
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-600/[0.06] blur-[120px]" />
          <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-400/[0.04] blur-[100px]" />
        </div>
      )}
      {!isDarkMode && (
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-teal-100/30`} />
        </div>
      )}

      <section
        className={`${isDarkMode ? 'bg-transparent' : 'bg-transparent'} flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-16 min-h-screen py-8 md:py-10 transition-colors duration-300 pt-20 md:pt-32 relative z-10 px-4`}
      >
        {/* Glass morphism overlay */}
        <div className={`absolute inset-0 backdrop-blur-sm rounded-3xl border ${isDarkMode ? 'bg-transparent border-white/[0.06]' : 'bg-white/20 border-gray-200/30'}`} 
             style={{ margin: '1rem md:2rem', zIndex: -1 }} />

        {/* IMAGE SECTION - On top for mobile */}
        <div className="basis-3/5 z-10 flex justify-center md:order-2 order-1">
          <motion.div 
            className="relative z-0 w-full max-w-[280px] md:max-w-[400px] lg:max-w-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <img
              alt="profile"
              className={`relative w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-500 ${isDarkMode ? 'shadow-[0_0_60px_rgba(124,58,237,0.18)] border border-violet-500/20' : 'shadow-2xl'}`}
              src={`${process.env.PUBLIC_URL}/assets/light-mode-pic.png`}
            />
          </motion.div>
        </div>

        {/* MAIN TEXT - Below image on mobile */}
        <div className="z-30 basis-2/5 order-2 md:order-1">
          {/* HEADINGS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <motion.p 
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center md:text-start mb-4 md:mb-6 animate-fade-in font-bold leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>

            <motion.p 
              className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair z-10 text-center md:text-start ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 md:mb-8 leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hreem {""}
              <span className="relative font-semibold z-10 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Pandya
              </span>
            </motion.p>

            {/* Auto-typing job titles */}
            <motion.div
              className="mt-6 md:mt-8 mb-6 md:mb-8 text-center md:text-start flex justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TypewriterEffect isDarkMode={isDarkMode} />
            </motion.div>
          </motion.div>

          {/* CALL TO ACTIONS */}
          <motion.div
            className="flex mt-5 justify-center md:justify-start gap-3 md:gap-4 flex-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <AnchorLink
              className="btn-enhanced bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-full py-2.5 px-5 md:py-3 md:px-7 font-semibold transition-all duration-200 text-sm md:text-base hover:opacity-90 hover:scale-[1.02]"
              onClick={() => setSelectedPage("contact")}
              href="#contact"
            >
              Contact Me
            </AnchorLink>

            <AnchorLink
              className={`rounded-full py-2.5 px-5 md:py-3 md:px-7 font-semibold transition-all duration-200 backdrop-blur-sm text-sm md:text-base ${isDarkMode ? 'border border-white/[0.12] text-[#F0F4F8] hover:bg-white/[0.05]' : 'border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white bg-white/30'}`}
              onClick={() => setSelectedPage("projects")}
              href="#projects"
            >
              View My Work
            </AnchorLink>
          </motion.div>

          <motion.div
            className="flex mt-5 justify-center md:justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="transform hover:scale-110 transition-transform duration-300">
              <SocialMediaIcons isDarkMode={isDarkMode} forceWhite={isDarkMode} />
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </>
  );
};

export default Landing;