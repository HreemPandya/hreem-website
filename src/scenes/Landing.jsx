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
      <h2 className={`text-xl md:text-2xl lg:text-3xl font-medium font-playfair ${isDarkMode ? 'text-teal-400' : 'text-blue-600'} tracking-wide text-center md:text-left leading-relaxed`}>
        {currentText}
        <span className="animate-pulse text-purple-500">|</span>
      </h2>
    </div>
  );
};

const Landing = ({ setSelectedPage, isDarkMode }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const shapes = document.querySelectorAll('.floating-shape');
      
      shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        if (shape) {
          shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-[-2] overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-teal-500/20' : 'bg-gradient-to-br from-purple-100/30 via-transparent to-teal-100/30'}`} />
        
        {/* Floating shapes */}
        <div className={`floating-shape absolute w-64 h-64 rounded-full ${isDarkMode ? 'opacity-10' : 'opacity-5'} bg-gradient-to-r from-purple-500 to-pink-500 top-1/4 left-1/4 animate-pulse`} 
             style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className={`floating-shape absolute w-48 h-48 rounded-full ${isDarkMode ? 'opacity-10' : 'opacity-5'} bg-gradient-to-r from-blue-500 to-teal-500 top-3/4 right-1/4 animate-pulse`} 
             style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className={`floating-shape absolute w-32 h-32 rounded-full ${isDarkMode ? 'opacity-10' : 'opacity-5'} bg-gradient-to-r from-green-500 to-blue-500 bottom-1/4 left-3/4 animate-pulse`} 
             style={{ animationDelay: '4s', animationDuration: '5s' }} />
      </div>

      <section
        className={`${isDarkMode ? 'bg-transparent' : 'bg-transparent'} md:flex md:justify-between md:items-center gap-16 md:h-full py-10 transition-colors duration-300 pt-32 relative z-10`}
      >
        {/* Glass morphism overlay */}
        <div className={`absolute inset-0 backdrop-blur-sm rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/20 border-gray-200/30'}`} 
             style={{ margin: '2rem', zIndex: -1 }} />

        {/* IMAGE SECTION */}
        <div className="basis-3/5 z-10 mt-16 md:mt-24 flex justify-center md:order-2">
          <motion.div 
            className="relative z-0 ml-20 w-full max-w-[400px] md:max-w-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
            
            <img
              alt="profile"
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              src={`${process.env.PUBLIC_URL}/assets/light-mode-pic.png`}
            />
            
            {/* Floating elements around image */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" 
                 style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full animate-bounce" 
                 style={{ animationDelay: '2s' }} />
          </motion.div>
        </div>

        {/* MAIN TEXT */}
        <div className="z-30 basis-2/5 mt-12 md:mt-32">
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
              className={`text-5xl md:text-6xl lg:text-7xl font-playfair ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center md:text-start mb-6 animate-fade-in font-bold leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>

            <motion.p 
              className={`text-6xl md:text-7xl lg:text-8xl font-playfair z-10 text-center md:text-start ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8 leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hreem {""}
              <span className={`relative font-semibold z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 bg-clip-text text-transparent animate-pulse
                  before:absolute before:-left-[47px] before:-top-[130px] before:w-[350px] before:h-[350px] before:bg-contain before:bg-no-repeat before:z-[-1]
                  after:absolute after:-left-[27px] after:-top-[0px] after:w-[300px] after:h-[100px] after:bg-contain after:bg-no-repeat after:z-[-1]`}>
                Pandya
              </span>
            </motion.p>

            {/* Auto-typing job titles */}
            <motion.div
              className="mt-8 mb-8 text-center md:text-start flex justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TypewriterEffect isDarkMode={isDarkMode} />
            </motion.div>
          </motion.div>

          {/* CALL TO ACTIONS */}
          <motion.div
            className="flex mt-5 justify-center md:justify-start gap-4 flex-wrap"
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-3 px-7 font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              onClick={() => setSelectedPage("contact")}
              href="#contact"
            >
              <span className="relative z-10">Contact Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </AnchorLink>

            <AnchorLink
              className={`border-2 border-teal-500 text-teal-500 rounded-full py-3 px-7 font-semibold hover:bg-teal-500 hover:text-white hover:scale-105 transition-all duration-500 backdrop-blur-sm ${isDarkMode ? 'bg-white/10' : 'bg-white/30'}`}
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

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .floating-shape {
          filter: blur(1px);
        }
      `}</style>
    </>
  );
};

export default Landing;