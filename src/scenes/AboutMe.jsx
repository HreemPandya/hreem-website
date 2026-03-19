import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import DoodleBoard from "../components/DoodleBoard";

// Expertise Bricks — falling from top, stacking
const ExpertiseBricks = ({ isDarkMode }) => {
  const pillars = [
    { title: "Full-Stack & AI/ML", tech: "Python · React · TensorFlow · Expo" },
    { title: "Embedded & Hardware", tech: "C · Arduino · STM32 · OpenCV" },
    { title: "Accessibility & Impact", tech: "Voice · CV · Inclusive design" },
    { title: "Web & Backend", tech: "React · Flask · PostgreSQL · Docker" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-16">
      {pillars.map((pillar, index) => (
        <motion.div
          key={pillar.title}
          initial={{ opacity: 0, y: -80, rotate: -2 }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: index % 2 === 0 ? -1 : 1,
            transition: {
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.1,
            },
          }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -2, rotate: 0, transition: { duration: 0.2 } }}
          className={`flex-shrink-0 rounded-xl px-4 py-3 md:px-5 md:py-4 border backdrop-blur-xl transition-all duration-300 ${
            isDarkMode
              ? "bg-[#111827] border-white/[0.06] hover:border-amber-500/30"
              : "bg-[var(--lm-bg-surface)] border-[var(--lm-border)] hover:border-[var(--lm-accent)]/40 shadow-lg"
          }`}
        >
          <h3 className={`font-playfair font-bold text-sm md:text-base mb-1 ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
            {pillar.title}
          </h3>
          <p className={`text-xs md:text-sm ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
            {pillar.tech}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// 8 artwork images (shared)
const artworks = [
  { src: `${process.env.PUBLIC_URL}/assets/drawing1.png`, alt: "Digital Art 1", id: 1 },
  { src: `${process.env.PUBLIC_URL}/assets/drawing2.png`, alt: "Digital Art 2", id: 2 },
  { src: `${process.env.PUBLIC_URL}/assets/drawing3.png`, alt: "Digital Art 3", id: 3 },
  { src: `${process.env.PUBLIC_URL}/assets/drawing4.png`, alt: "Digital Art 4", id: 4 },
  { src: `${process.env.PUBLIC_URL}/assets/drawing5.png`, alt: "Digital Art 5", id: 5 },
  { src: `${process.env.PUBLIC_URL}/assets/drawing6.png`, alt: "Digital Art 6", id: 6 },
  { src: `${process.env.PUBLIC_URL}/assets/drawing7.png`, alt: "Digital Art 7", id: 7 },
  { src: `${process.env.PUBLIC_URL}/assets/drawing8.png`, alt: "Digital Art 8", id: 8 }
];

// Creative Carousel Component
const CreativeCarousel = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const offsetRadius = 2; // Show 2 slides above and below center
  const visibleSlides = 5; // Total visible slides

  // Auto rotation
  useEffect(() => {
    if (autoRotate) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + direction + artworks.length) % artworks.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRotate, direction, artworks.length]);

  const moveSlide = (dir) => {
    setCurrentIndex(prev => (prev + dir + artworks.length) % artworks.length);
  };

  const getPresentableSlides = () => {
    const presentableSlides = [];
    for (let i = -offsetRadius; i <= offsetRadius; i++) {
      const index = (currentIndex + i + artworks.length) % artworks.length;
      presentableSlides.push({
        ...artworks[index],
        offset: i
      });
    }
    return presentableSlides;
  };

  const handleMouseMove = (e, containerRef) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const midpoint = rect.height / 2;
    
    if (y < midpoint * 0.4) {
      setDirection(-1);
      setAutoRotate(true);
    } else if (y > midpoint * 1.6) {
      setDirection(1);
      setAutoRotate(true);
    } else {
      setAutoRotate(false);
    }
  };

  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef}
      className="relative h-full min-h-[400px] md:min-h-[800px] flex flex-col justify-center items-center overflow-hidden"
      onMouseMove={(e) => handleMouseMove(e, containerRef)}
      onMouseLeave={() => {
        setAutoRotate(true);
        setDirection(1);
      }}
      style={{ perspective: '1000px' }}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        {getPresentableSlides().map((slide, index) => {
          const offset = slide.offset;
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;
          
          return (
            <motion.div
              key={slide.id}
              className="absolute w-full"
              initial={{ opacity: 0, y: 0, scale: 0.7 }}
              animate={{
                y: offset * (window.innerWidth < 768 ? 80 : 180), // Reduced spacing on mobile
                scale: isCenter ? 1 : 0.82 - absOffset * 0.08,
                opacity: isCenter ? 1 : 0.5 - absOffset * 0.15,
                rotateX: offset * -12,
                z: -absOffset * 60
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 35,
                mass: 1.2
              }}
              style={{
                zIndex: visibleSlides - absOffset,
                transformStyle: 'preserve-3d'
              }}
            >
              <div 
                className={`mx-auto rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                  isCenter ? 'w-full' : 'w-[88%]'
                }`}
                style={{
                  height: isCenter 
                    ? (window.innerWidth < 768 ? '140px' : '240px') 
                    : `${(window.innerWidth < 768 ? 120 : 200) - absOffset * 25}px`,
                  filter: !isCenter ? `blur(${absOffset * 0.8}px)` : 'none'
                }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay for non-center slides */}
                {!isCenter && (
                  <div 
                    className="absolute inset-0 bg-black"
                    style={{ opacity: absOffset * 0.25 }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Minimal dot rail — dots only, no chevrons or backdrop */}
      <div className="absolute left-3 md:left-4 top-[15%] -translate-y-1/2 flex flex-col items-center gap-4 z-50">
        {artworks.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-colors duration-200 ${
              index === currentIndex
                ? isDarkMode
                  ? 'bg-amber-500 w-1.5 h-1.5 md:w-2 md:h-2'
                  : 'bg-[#4A6B4E] w-2 h-2 md:w-2.5 md:h-2.5'
                : isDarkMode
                  ? 'bg-white/25 hover:bg-white/50 w-1 h-1 md:w-1.5 md:h-1.5'
                  : 'bg-[#9BBE9E] hover:bg-[#7A9D7D] w-1.5 h-1.5 md:w-2 md:h-2'
            }`}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to artwork ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

const AboutMe = ({ isDarkMode }) => {
  return (
    <section id="about me" className={`pt-12 md:pt-20 pb-16 md:pb-32 relative transition-colors duration-300 ${isDarkMode ? 'bg-transparent' : 'bg-transparent'} overflow-hidden`}>
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header — minimal, no underline flourish */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className={`font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-2 ${isDarkMode ? 'text-amber-500/70' : 'text-[var(--lm-accent)]/70'}`}>
            About
          </p>
          <h1 className={`font-playfair text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'}`}>
            Hreem Pandya
          </h1>
        </motion.div>

        {/* Expertise Bricks */}
        <ExpertiseBricks isDarkMode={isDarkMode} />

        {/* Main Content — editorial layout, no emoji cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column — narrative */}
          <motion.div 
            className="space-y-10 md:space-y-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`space-y-4 pl-0 md:pl-6 md:border-l-2 md:border-transparent transition-colors duration-300 ${isDarkMode ? 'md:hover:border-amber-500/40' : 'md:hover:border-[#4A6B4E]'}`}
            >
              <p className={`text-lg md:text-xl leading-relaxed ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}>
                19, Computer Engineering at Waterloo. I build things — full-stack apps, AI stuff, sometimes hardware that talks to the real world.
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}>
                Started with Python at 13 when my local YMCA ran a class. Got a hand-me-down laptop around the same time and couldn't stop messing with it. Udemy courses, new languages, projects for the fun of it. Now in second year, still chasing that same curiosity.
              </p>
            </motion.div>

            {/* Approach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`space-y-3 pl-0 md:pl-6 md:border-l-2 md:border-transparent transition-colors duration-300 ${isDarkMode ? 'md:hover:border-amber-500/40' : 'md:hover:border-[#4A6B4E]'}`}
            >
              <p className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? 'text-amber-500/80' : 'text-[var(--lm-accent)]/80'}`}>
                Approach
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}>
                Build tech that saves people time or money. That's the goal. Every project and internship pushes it. FridgeMind, BeMyEyes, SecureEdu — each one taught me something different about shipping real systems.
              </p>
            </motion.div>

            {/* Beyond code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`space-y-3 pl-0 md:pl-6 md:border-l-2 md:border-transparent transition-colors duration-300 ${isDarkMode ? 'md:hover:border-amber-500/40' : 'md:hover:border-[#4A6B4E]'}`}
            >
              <p className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? 'text-amber-500/80' : 'text-[var(--lm-accent)]/80'}`}>
                Off the keyboard
              </p>
              <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}>
                Digital art, workouts, hikes. Art lives on <a href="https://www.instagram.com/hreemdoodles" target="_blank" rel="noreferrer" className={`font-medium border-b transition-colors ${isDarkMode ? 'border-amber-500/50 text-amber-400 hover:border-amber-400' : 'border-[var(--lm-accent)]/50 text-[var(--lm-accent)] hover:border-[var(--lm-accent)]'}`}>Instagram</a>.
              </p>
              <DoodleBoard isDarkMode={isDarkMode} topSpacing="3rem" />
            </motion.div>
          </motion.div>

          {/* Right Column — Art carousel (lg:order-first = appears left on desktop) */}
          <motion.div 
            className="lg:order-first space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <p className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? 'text-amber-500/80' : 'text-[var(--lm-accent)]/80'}`}>
                  Art
                </p>
                <motion.a
                  href="https://www.instagram.com/hreemdoodles"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border transition-colors ${isDarkMode ? 'border-amber-500/40 text-amber-400 hover:border-amber-400' : 'border-[var(--lm-accent)]/40 text-[var(--lm-accent)] hover:border-[var(--lm-accent)]'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.40-1.439-1.40z"/>
                  </svg>
                  @hreemdoodles
                </motion.a>
              </div>
              
              {/* Interactive Carousel */}
              <CreativeCarousel isDarkMode={isDarkMode} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;