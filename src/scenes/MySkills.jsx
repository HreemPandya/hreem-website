import LineGradient from "../components/LineGradient";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

const MySkills = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillsData = [
    // Programming Languages
    { 
      name: "JavaScript", 
      image: `${process.env.PUBLIC_URL}/assets/js.png`, 
      category: "languages",
      experience: "3 years",
      projects: 8,
      hoverText: "Did a Udemy course on this... Best $30 ever spent 🤪🤪",
      color: "from-cyan-500 to-blue-600"
    },
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
        whileHover={{ y: -10, rotateY: 10 }}
      >
        <div className={`relative backdrop-blur-lg rounded-3xl p-6 border transition-all duration-500 overflow-hidden h-48 ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/30 group-hover:bg-white/10' : 'bg-white/30 border-gray-200/30 hover:border-gray-300 group-hover:bg-white/50 shadow-lg'}`}>
          
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${skill.color} blur-xl`} />
          
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 bg-gradient-to-r ${skill.color} rounded-full opacity-50`}
                animate={{
                  x: [0, Math.random() * 120 - 60],
                  y: [0, Math.random() * 120 - 60],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
                style={{
                  left: `${5 + (i % 4) * 30}%`,
                  top: `${15 + Math.floor(i / 4) * 25}%`
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4">
              <motion.img 
                src={skill.image} 
                alt={skill.name}
                className="w-16 h-16 object-contain mx-auto"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            
            <div className="mb-3">
              <h3 className={`font-playfair font-bold text-lg transition-all duration-300 ${isDarkMode ? 'text-white group-hover:text-transparent' : 'text-gray-900 group-hover:text-transparent'} group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400 group-hover:bg-clip-text`}>
                {skill.name}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{skill.experience}</p>
            </div>

            <div className="relative">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} opacity-80 blur-sm`} />
              <div className={`relative px-4 py-2 rounded-full bg-gradient-to-r ${skill.color} text-white text-sm font-semibold shadow-lg`}>
                {skill.projects} project{skill.projects !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-3xl p-6 flex items-center justify-center z-20"
            >
              <p className="text-white text-center font-playfair leading-relaxed text-sm">
                {skill.hoverText}
              </p>
            </motion.div>
          )}

          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-r ${skill.color} rounded-full opacity-40`}
                animate={{
                  x: [0, 80, 0],
                  y: [0, -50, 0],
                  opacity: [0.4, 0.9, 0.4],
                  scale: [0.8, 1.8, 0.8]
                }}
                transition={{
                  duration: 2.5 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${65 + i * 3}%`
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="w-full min-h-screen transition-colors duration-300 relative py-20">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className={`absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: isDarkMode ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-3xl ${isDarkMode ? 'opacity-100' : 'opacity-50'}`}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: isDarkMode ? [0.3, 0.1, 0.3] : [0.15, 0.05, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair font-bold text-5xl mb-6">
            MY <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">SKILLSET</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 rounded-full mx-auto mb-6" />
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            An interactive showcase of my technical expertise. Hover over each skill to discover my personal journey and relationship with these technologies.
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`flex backdrop-blur-lg rounded-2xl p-2 border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-gray-200/30 shadow-lg'}`}>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={`${selectedCategory}-${skill.name}`} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
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
              className={`text-center backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MySkills;