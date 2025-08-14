import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Creative Carousel Component
const CreativeCarousel = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  // 8 artwork images
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
      className="relative h-full min-h-[800px] flex flex-col justify-center items-center overflow-hidden"
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
                y: offset * 180, // Increased spacing between slides
                scale: isCenter ? 1 : 0.82 - absOffset * 0.08,
                opacity: isCenter ? 1 : 0.5 - absOffset * 0.15,
                rotateX: offset * -12, // Slightly reduced rotation for better spacing
                z: -absOffset * 60 // Increased depth
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
                  height: isCenter ? '240px' : `${200 - absOffset * 25}px`, // Increased heights
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

      {/* Navigation Arrows */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
        <motion.button
          onClick={() => moveSlide(-1)}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 ${
            isDarkMode 
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : 'bg-black/10 hover:bg-black/20 text-gray-800'
          } border border-white/20 shadow-lg`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ↑
        </motion.button>
        <motion.button
          onClick={() => moveSlide(1)}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-200 ${
            isDarkMode 
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : 'bg-black/10 hover:bg-black/20 text-gray-800'
          } border border-white/20 shadow-lg`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ↓
        </motion.button>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-40">
        {artworks.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
                : isDarkMode ? 'bg-white/30 hover:bg-white/50' : 'bg-gray-600/50 hover:bg-gray-600/70'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const AboutMe = ({ isDarkMode }) => {
  return (
    <section id="about me" className={`pt-32 pb-32 relative transition-colors duration-300 ${isDarkMode ? 'bg-transparent' : 'bg-transparent'} overflow-hidden`}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
             style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className={`absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
             style={{ animationDelay: '4s', animationDuration: '6s' }} />
        <div className={`absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
             style={{ animationDelay: '2s', animationDuration: '7s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Simple Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h1 
            className="font-playfair text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About Me
          </motion.h1>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        {/* Status Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 group ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                💻
              </div>
              <div>
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Currently Working on:</h3>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                  WattGuard: A Smart Home Energy Monitor
                </p>
              </div>
            </div>
          </div>

          <div className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 group ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Currently Learning:</h3>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                  Rust Language and Advanced AI/ML Concepts
                </p>
              </div>
            </div>
          </div>

          <div className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 group ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                🎵
              </div>
              <div>
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Obsession:</h3>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                  Learning and Playing the Ukulele
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About Me */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Who Am I */}
            <div className={`backdrop-blur-lg rounded-3xl p-8 border transition-all duration-500 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <h2 className="text-2xl font-playfair font-bold bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent">
                  Who Am I?
                </h2>
              </div>
              <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm a 19-year-old <span className="font-semibold text-purple-400">Computer Engineering student</span> passionate about full-stack development, AI/ML, and embedded systems. I love creating projects that make a real difference, whether that's for entire communities or niche groups often overlooked by mainstream solutions.
              </p>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                My work blends <span className="font-semibold text-teal-400">NLP, computer vision, and LLMs</span> with secure, scalable architectures and hardware integration. I'm constantly learning, exploring new technologies, and finding creative ways to turn ideas into impactful, human-centered solutions.
              </p>
            </div>

            {/* My Journey */}
            <div className={`backdrop-blur-lg rounded-3xl p-8 border transition-all duration-500 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-2xl font-playfair font-bold text-green-500">
                  My Journey
                </h2>
              </div>
              <p className={`text-lg leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                My journey into tech started when I was 13, taking my first Python classes at my local YMCA. Around the same time, I got my first
                hand-me-down laptop, and I couldn't stop exploring what I could do with it. I went from messing around with small scripts to 
                buying Udemy courses, learning new languages, and eventually building my own projects just for the fun (and challenge) of it.
              </p>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm now in my <span className="font-semibold text-green-500">second year of Computer Engineering</span>, working towards a 
                <span className="font-semibold text-teal-400"> Bachelor of Applied Science at the University of Waterloo</span>, and I'm still 
                chasing that same curiosity that got me started.
              </p>
            </div>

            {/* What I'm Doing Now */}
            <div className={`backdrop-blur-lg rounded-3xl p-8 border transition-all duration-500 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h2 className="text-2xl font-playfair font-bold text-orange-500">
                  What I'm Doing Now
                </h2>
              </div>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm exploring my passions through different technologies and work experiences, but my mission stays the same,
                <span className="font-semibold text-orange-400"> build tech that people will look back upon and think "that saved me time/money"</span>. 
                Every project and every internship is a new way to learn and push that goal forward. Along with programming, I also love to draw digitally, work out and go on hikes. Check out my art on <a href="https://www.instagram.com/hreemdoodles" target="_blank" rel="noreferrer" className="font-semibold text-orange-500 transition-colors duration-200 underline decoration-orange-400 hover:decoration-orange-700">Instagram</a>!
              </p>
            </div>
          </motion.div>

          {/* Right Column - Creative Journey */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Creative Journey Carousel */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-playfair font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  My Creative Journey
                </h3>
                <motion.a
                  href="https://www.instagram.com/hreemdoodles"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.40-1.439-1.40z"/>
                  </svg>
                  View Art
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