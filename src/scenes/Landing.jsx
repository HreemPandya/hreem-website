import React, { useEffect } from 'react';
import SocialMediaIcons from "../components/SocialMediaIcons";
import { motion, useReducedMotion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

const PUBLIC = process.env.PUBLIC_URL || "";

const LandingTagline = ({ isDarkMode }) => (
  <div className="w-full max-w-md mx-auto md:mx-0 flex justify-center md:justify-start">
    <motion.h2
      className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium font-playfair tracking-wide leading-relaxed text-center md:text-start ${
        isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"
      }`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.65 }}
    >
      Comp Eng @ uWaterloo
    </motion.h2>
  </div>
);

const Landing = ({ setSelectedPage, isDarkMode }) => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const urls = [
      `${PUBLIC}/assets/orange-pfp-hero.webp`,
      `${PUBLIC}/assets/light-mode-hero.webp`,
    ];
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => {});
    });
  }, []);

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
        className={`${isDarkMode ? 'bg-transparent' : 'bg-transparent'} flex min-h-screen min-w-0 flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-16 py-8 md:py-10 pt-20 md:pt-32 relative z-10 px-4 sm:px-5`}
      >
        {/* IMAGE SECTION - Overlap for asymmetry, flip between dark/light pics */}
        <div className="basis-3/5 z-10 flex justify-center md:order-2 order-1 md:-ml-8 lg:-ml-12">
          <motion.div 
            className="relative z-0 w-full max-w-[280px] md:max-w-[400px] lg:max-w-[600px] overflow-hidden rounded-3xl"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {/* Opacity crossfade: Safari/iOS often breaks 3D backface-visibility, showing a mirrored dark image in light mode */}
            <div className="relative w-full aspect-[3/4] [contain:layout_paint]">
              <motion.div
                className={`absolute inset-0 rounded-3xl overflow-hidden ${isDarkMode ? "z-[2]" : "z-[1] pointer-events-none"}`}
                initial={false}
                animate={{
                  opacity: isDarkMode ? 1 : 0,
                  rotateY: reduceMotion ? 0 : isDarkMode ? 0 : -12,
                }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                aria-hidden={!isDarkMode}
              >
                <picture className="absolute inset-0 block h-full w-full">
                  <source srcSet={`${PUBLIC}/assets/orange-pfp-hero.webp`} type="image/webp" />
                  <img
                    alt="Hreem Pandya"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-[2.2] -translate-x-14 shadow-[0_0_40px_rgba(245,158,11,0.12)] border border-amber-500/15"
                    src={`${PUBLIC}/assets/orange-pfp-hero.png`}
                    width={1200}
                    height={1600}
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>
              </motion.div>
              <motion.div
                className={`absolute inset-0 rounded-3xl overflow-hidden ${isDarkMode ? "z-[1] pointer-events-none" : "z-[2]"}`}
                initial={false}
                animate={{
                  opacity: isDarkMode ? 0 : 1,
                  rotateY: reduceMotion ? 0 : isDarkMode ? 12 : 0,
                }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                aria-hidden={isDarkMode}
              >
                <picture className="absolute inset-0 block h-full w-full">
                  <source srcSet={`${PUBLIC}/assets/light-mode-hero.webp`} type="image/webp" />
                  <img
                    alt="Hreem Pandya"
                    className="absolute inset-0 w-full h-full object-cover scale-[1.5] -translate-x-14 shadow-2xl border border-[var(--lm-border)]"
                    src={`${PUBLIC}/assets/light-mode-hero.png`}
                    width={1200}
                    height={1600}
                    decoding="async"
                  />
                </picture>
              </motion.div>
            </div>
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
              className={`text-[clamp(1.875rem,6vw,2.25rem)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair ${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'} text-center md:text-start mb-4 md:mb-6 font-bold leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>

            <motion.p 
              className={`text-[clamp(2rem,7vw,2.5rem)] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair z-10 text-center md:text-start break-words ${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'} mb-6 md:mb-8 leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hreem {""}
              <span className={`relative font-semibold z-10 ${isDarkMode ? 'bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent' : 'text-[var(--lm-accent)]'}`}>
                Pandya
              </span>
            </motion.p>

            <div className="mt-6 md:mt-8 mb-6 md:mb-8">
              <LandingTagline isDarkMode={isDarkMode} />
            </div>
          </motion.div>

          {/* CALL TO ACTIONS */}
          <motion.div
            className="flex mt-5 justify-center md:justify-start gap-3 md:gap-4 flex-wrap sm:flex-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <AnchorLink
              className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full py-2.5 px-5 md:py-3 md:px-7 font-semibold transition-all duration-200 text-sm md:text-base hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full max-w-[280px] sm:w-auto sm:max-w-none ${isDarkMode ? 'btn-enhanced bg-amber-500 hover:bg-amber-400 text-[#07090D]' : 'hover:opacity-90 text-white'}`}
              style={!isDarkMode ? { backgroundColor: '#4A6B4E' } : undefined}
              onClick={() => setSelectedPage("contact")}
              href="#contact"
            >
              Contact Me
            </AnchorLink>

            <AnchorLink
              className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full py-2.5 px-5 md:py-3 md:px-7 font-semibold transition-all duration-200 backdrop-blur-sm text-sm md:text-base w-full max-w-[280px] sm:w-auto sm:max-w-none ${isDarkMode ? 'border border-white/[0.12] text-[#F0F4F8] hover:bg-white/[0.05]' : 'border-2 border-[#4A6B4E] text-[#4A6B4E] hover:bg-[#4A6B4E] hover:text-white bg-[var(--lm-bg-surface)]'}`}
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