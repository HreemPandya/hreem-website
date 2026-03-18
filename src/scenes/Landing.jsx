import React from 'react';
import SocialMediaIcons from "../components/SocialMediaIcons";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

// One-time staggered reveal tagline (no looping typewriter)
const StaggeredTagline = ({ isDarkMode }) => {
  const words = ["Computer Engineer", "·", "Full Stack Developer", "·", "AI & ML Explorer"];
  return (
    <div className="w-full max-w-md mx-auto md:mx-0 flex flex-wrap gap-x-2 gap-y-1 justify-center md:justify-start">
      <h2 className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium font-playfair tracking-wide leading-relaxed flex flex-wrap gap-x-2 gap-y-1 justify-center md:justify-start`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={word === "·" ? (isDarkMode ? "text-amber-500/80" : "text-[var(--lm-accent)]/80") : isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
          >
            {word}
          </motion.span>
        ))}
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
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-amber-500/[0.05] blur-[120px]" />
        </div>
      )}
      {!isDarkMode && (
        <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--lm-accent)]/5 via-transparent to-transparent" />
        </div>
      )}

      <section
        className={`${isDarkMode ? 'bg-transparent' : 'bg-transparent'} flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-16 min-h-screen py-8 md:py-10 transition-colors duration-300 pt-20 md:pt-32 relative z-10 px-4`}
      >
        {/* IMAGE SECTION - Overlap for asymmetry, flip between dark/light pics */}
        <div className="basis-3/5 z-10 flex justify-center md:order-2 order-1 md:-ml-8 lg:-ml-12">
          <motion.div 
            className="relative z-0 w-full max-w-[280px] md:max-w-[400px] lg:max-w-[600px] overflow-hidden rounded-3xl"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="relative w-full aspect-[3/4]"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Front face: dark mode (orange-pfp) */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              >
                <img
                  alt="profile"
                  className={`absolute inset-0 w-full h-full object-cover object-center scale-[2.2] -translate-x-14 hover:scale-[2.25] hover:-translate-x-8 transition-transform duration-500 shadow-[0_0_40px_rgba(245,158,11,0.12)] border border-amber-500/15`}
                  src={`${process.env.PUBLIC_URL}/assets/orange-pfp.png`}
                />
              </div>
              {/* Back face: light mode (light-mode-pic) */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <img
                  alt="profile"
                  className={`absolute inset-0 w-full h-full object-cover object-center scale-[1.05] hover:scale-[1.1] transition-transform duration-500 shadow-2xl border border-[var(--lm-border)]`}
                  src={`${process.env.PUBLIC_URL}/assets/light-mode-pic.png`}
                />
              </div>
            </motion.div>
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
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair ${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'} text-center md:text-start mb-4 md:mb-6 font-bold leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>

            <motion.p 
              className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair z-10 text-center md:text-start ${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'} mb-6 md:mb-8 leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hreem {""}
              <span className={`relative font-semibold z-10 ${isDarkMode ? 'bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent' : 'text-[var(--lm-accent)]'}`}>
                Pandya
              </span>
            </motion.p>

            {/* Staggered tagline (one-time reveal) */}
            <motion.div
              className="mt-6 md:mt-8 mb-6 md:mb-8 text-center md:text-start flex justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <StaggeredTagline isDarkMode={isDarkMode} />
            </motion.div>
          </motion.div>

          {/* CALL TO ACTIONS */}
          <motion.div
            className="flex mt-5 justify-center md:justify-start gap-3 md:gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <AnchorLink
              className={`rounded-full py-2.5 px-5 md:py-3 md:px-7 font-semibold transition-all duration-200 text-sm md:text-base hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] ${isDarkMode ? 'btn-enhanced bg-amber-500 hover:bg-amber-400 text-[#07090D]' : 'hover:opacity-90 text-white'}`}
              style={!isDarkMode ? { backgroundColor: '#4A6B4E' } : undefined}
              onClick={() => setSelectedPage("contact")}
              href="#contact"
            >
              Contact Me
            </AnchorLink>

            <AnchorLink
              className={`rounded-full py-2.5 px-5 md:py-3 md:px-7 font-semibold transition-all duration-200 backdrop-blur-sm text-sm md:text-base ${isDarkMode ? 'border border-white/[0.12] text-[#F0F4F8] hover:bg-white/[0.05]' : 'border-2 border-[#4A6B4E] text-[#4A6B4E] hover:bg-[#4A6B4E] hover:text-white bg-[var(--lm-bg-surface)]'}`}
              onClick={() => setSelectedPage("projects")}
              href="#projects"
            >
              View My Work
            </AnchorLink>
          </motion.div>

          <motion.div
            className="flex mt-5 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
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