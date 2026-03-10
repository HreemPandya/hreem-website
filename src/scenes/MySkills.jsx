import LineGradient from "../components/LineGradient";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

const MySkills = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillsData = [
    // Programming Languages
    { 
      name: "Python", 
      image: `${process.env.PUBLIC_URL}/assets/python.png`, 
      category: "languages",
      experience: "6 years",
      projects: 12,
      hoverText: "i luv u python 💙",
      color: "from-green-500 to-yellow-600"
    },
    { 
      name: "C++", 
      image: `${process.env.PUBLIC_URL}/assets/c++.png`, 
      category: "languages",
      experience: "1 year",
      projects: 3,
      hoverText: "ECE150 Course, My intro to C++ programming. Tell me why it did not feel like an intro...",
      color: "from-purple-400 to-blue-500"
    },
    { 
      name: "C", 
      image: `${process.env.PUBLIC_URL}/assets/c.png`, 
      category: "languages",
      experience: "1 year",
      projects: 2,
      hoverText: "Fun fact: Programmed SecureEdu project in C!",
      color: "from-gray-400 to-blue-600"
    },
    { 
      name: "Java", 
      image: `${process.env.PUBLIC_URL}/assets/java.png`, 
      category: "languages",
      experience: "3 years",
      projects: 4,
      hoverText: "i luv you a bit less then python ❤️‍🩹",
      color: "from-orange-500 to-red-600"
    },
    { 
      name: "SQL", 
      image: `${process.env.PUBLIC_URL}/assets/sql.png`, 
      category: "languages",
      experience: "1 year",
      projects: 2,
      hoverText: "Arguably took me the longest to get a grasp of, dont ask me why",
      color: "from-gray-500 to-blue-600"
    },
    { 
      name: "HTML", 
      image: `${process.env.PUBLIC_URL}/assets/html.png`, 
      category: "languages",
      experience: "3 years",
      projects: 10,
      hoverText: "i never used the < and > buttons this much in my life",
      color: "from-orange-500 to-red-600"
    },
    { 
      name: "CSS", 
      image: `${process.env.PUBLIC_URL}/assets/css.png`, 
      category: "languages",
      experience: "3 years",
      projects: 10,
      hoverText: "I used a LOT of this for the portfolio (but Tailwind 😉)",
      color: "from-purple-500 to-pink-600"
    },
    
    // Tools & Technologies
    { 
      name: "React", 
      image: `${process.env.PUBLIC_URL}/assets/react.png`, 
      category: "tools",
      experience: "2 years",
      projects: 7,
      hoverText: "IMO this has one of the best logos of any tools",
      color: "from-cyan-500 to-blue-600"
    },
    { 
      name: "TypeScript", 
      image: `${process.env.PUBLIC_URL}/assets/typescript.png`, 
      category: "languages",
      experience: "1 year",
      projects: 3,
      hoverText: "Main language I used for my previous internship. Loved it!",
      color: "from-cyan-500 to-blue-600"
    },
    { 
      name: "Go", 
      image: `${process.env.PUBLIC_URL}/assets/go.png`, 
      category: "languages",
      experience: "4 months",
      projects: 1,
      hoverText: "Worst transit system in Ontario but a fast, simple, and perfect language for backend services",
      color: "from-cyan-400 to-blue-500"
    },
    { 
      name: "Swift", 
      image: `${process.env.PUBLIC_URL}/assets/swift.png`, 
      category: "languages",
      experience: "6 months",
      projects: 1,
      hoverText: "Apple > Android",
      color: "from-orange-500 to-pink-500"
    },
    { 
      name: "Kotlin", 
      image: `${process.env.PUBLIC_URL}/assets/kotlin.png`, 
      category: "languages",
      experience: "5 months",
      projects: 1,
      hoverText: "Well this is awkward after what I said about Swift... I only used it for a class project",
      color: "from-purple-500 to-indigo-600"
    },
    { 
      name: "Next.js", 
      image: `${process.env.PUBLIC_URL}/assets/nextjs.png`, 
      category: "tools",
      experience: "1.5 years",
      projects: 3,
      hoverText: "Makes my React skills more complete",
      color: "from-gray-800 to-black"
    },
    { 
      name: "Docker", 
      image: `${process.env.PUBLIC_URL}/assets/docker.png`, 
      category: "tools",
      experience: "1 year",
      projects: 2,
      hoverText: "Containerization is beautiful. Wish I learned it sooner",
      color: "from-cyan-500 to-blue-600"
    },
    { 
      name: "PostgreSQL", 
      image: `${process.env.PUBLIC_URL}/assets/postgresql.png`, 
      category: "tools",
      experience: "1 year",
      projects: 3,
      hoverText: "My go-to database for most projects",
      color: "from-purple-500 to-indigo-600"
    },
    { 
      name: "AWS", 
      image: `${process.env.PUBLIC_URL}/assets/aws.png`, 
      category: "tools",
      experience: "6 months",
      projects: 1,
      hoverText: "NGL the whole ecosystem is incredible, but the learning curve is steep",
      color: "from-orange-500 to-red-600"
    },
    { 
      name: "TensorFlow", 
      image: `${process.env.PUBLIC_URL}/assets/tensorflow.png`, 
      category: "tools",
      experience: "8 months",
      projects: 2,
      hoverText: "AI/ML is all the rage now and this was my intro to it",
      color: "from-orange-500 to-red-600"
    },
    { 
      name: "Firebase", 
      image: `${process.env.PUBLIC_URL}/assets/firebase.png`, 
      category: "tools",
      experience: "4 months",
      projects: 1,
      hoverText: "Firebase was a game changer for flyer processing pipeline as apart of my internship",
      color: "from-orange-500 to-red-600"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Skills', icon: '🚀', count: skillsData.length },
    { id: 'languages', name: 'Languages', icon: '💻', count: skillsData.filter(s => s.category === 'languages').length },
    { id: 'tools', name: 'Tools', icon: '🛠️', count: skillsData.filter(s => s.category === 'tools').length }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  const SkillCard = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
      >
        <div className={`relative backdrop-blur-xl rounded-3xl p-4 md:p-6 border transition-all duration-300 overflow-hidden h-40 md:h-48 ${isDarkMode ? 'bg-[#111827] border-white/[0.06] hover:border-violet-500/20 group-hover:shadow-[0_8px_32px_rgba(124,58,237,0.10)]' : 'bg-white/30 border-gray-200/30 hover:border-gray-300 group-hover:bg-white/50 shadow-lg'}`}>
          
          {/* Subtle dot grid top-right corner */}
          {isDarkMode && (
            <div className="absolute top-3 right-3 grid grid-cols-3 gap-[3px] opacity-30 pointer-events-none">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-violet-400" />
              ))}
            </div>
          )}
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <div className="mb-3 md:mb-4">
              <motion.img 
                src={skill.image} 
                alt={skill.name}
                className="w-12 h-12 md:w-16 md:h-16 object-contain mx-auto"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            
            <div className="mb-2 md:mb-3">
              <h3 className={`font-playfair font-bold text-base md:text-lg transition-all duration-300 ${isDarkMode ? 'text-white group-hover:text-transparent' : 'text-gray-900 group-hover:text-transparent'} group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text`}>
                {skill.name}
              </h3>
              <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{skill.experience}</p>
            </div>

            <div className="relative">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} opacity-80 blur-sm`} />
              <div className={`relative px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r ${skill.color} text-white text-xs md:text-sm font-semibold shadow-lg`}>
                {skill.projects} project{skill.projects !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Mobile: Show hover text on tap/touch */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute inset-0 backdrop-blur-md rounded-3xl p-4 md:p-6 flex items-center justify-center z-20 ${isDarkMode ? 'bg-[#07090D]/95' : 'bg-black/90'}`}
            >
              <p className="text-white text-center font-playfair leading-relaxed text-xs md:text-sm">
                {skill.hoverText}
              </p>
            </motion.div>
          )}

        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="w-full min-h-screen transition-colors duration-300 relative py-16 md:py-20">
      {isDarkMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-violet-600/[0.06] blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-cyan-400/[0.04] blur-[100px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair font-bold text-3xl md:text-5xl mb-4 md:mb-6">
            MY <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">SKILLSET</span>
          </h2>
          <div className="w-24 h-[2px] md:w-32 bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full mx-auto mb-4 md:mb-6" />
          <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-[#8B9DB0]' : 'text-gray-700'}`}>
            An interactive showcase of my technical expertise. {window.innerWidth >= 768 ? 'Hover over' : 'Tap'} each skill to discover my personal journey and relationship with these technologies.
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`flex backdrop-blur-xl rounded-2xl p-1.5 md:p-2 border ${isDarkMode ? 'bg-white/[0.04] border-white/[0.06]' : 'bg-white/30 border-gray-200/30 shadow-lg'} overflow-x-auto`}>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg'
                    : isDarkMode 
                      ? 'text-[#8B9DB0] hover:text-[#F0F4F8] hover:bg-white/[0.04]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={`${selectedCategory}-${skill.name}`} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {[
            { label: "Programming Languages", value: "12", icon: "💻" },
            { label: "Development Tools", value: "7", icon: "🛠️" },
            { label: "Years of Experience", value: "3+", icon: "⭐" }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className={`text-center backdrop-blur-xl rounded-2xl p-4 md:p-6 border transition-all duration-300 ${isDarkMode ? 'bg-[#111827] border-white/[0.06] hover:border-violet-500/20' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
              <div className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-cyan-400' : 'bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent'}`}>
                {stat.value}
              </div>
              <div className={`text-sm md:text-base ${isDarkMode ? 'text-[#8B9DB0]' : 'text-gray-600'}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MySkills;