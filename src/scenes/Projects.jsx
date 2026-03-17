import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaYoutube, FaTimes, FaExternalLinkAlt} from "react-icons/fa";
import { useState, useRef } from "react";
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const projects = [
  {
    id: 1,
    title: "FridgeMind: Winner of Hack the 6ix, Deliotte AI For Green",
    badge: "Hack the 6ix Winner",
    description: "An intelligent recipe recommendation system built on a custom OS using QNX that analyzes available ingredients in your fridge and suggests personalized meals based on dietary preferences and nutritional goals.",
    hoverText: "Built by training a custom YOLOv5 model on a dataset of 300+ labeled food images, working together with a real time footage stream to identify ingredients in your fridge. Along with that, I created an Expo Go app that the device pairs with and uses Gemini's LLM API to generate customized recipes, and AssemblyAI for both speech-to-text and text-to-speech, making the system hands-free and accessible for everyone. Other features include expiry date tracking (recommends recipes with ingredients about to expire first), meal planning, shopping list generation, and nutritional tracking.",
    image: `${process.env.PUBLIC_URL}/assets/project-5.png`,
    gradient: "from-indigo-500 to-purple-500",
    titleColor: "text-orange-600", // Orange to match FridgeMind tags
    tags: ['Raspberry Pi/QNX', 'Yolov5', 'Python', 'FastAPI', 'Expo Go' ],
    links: [
      { href: "https://devpost.com/software/fridge-mind", icon: <FaExternalLinkAlt size={20} />, label: "Devpost" },
      { href: "https://youtube.com/shorts/sylrchlKfYk?feature=share", icon: <FaYoutube size={20} />, label: "Demo" },
      { href: "https://github.com/HreemPandya/fridge-mind", icon: <FaGithub size={20} />, label: "Code" },
    ],
  },
  {
    id: 2,
    title: "Cliara: AI-Powered Shell with Natural Language & Macros",
    description: "An AI-powered shell that wraps your existing terminal (bash, zsh, PowerShell) and adds natural language commands, reusable macros, and smart workflows. Use ? <query> to describe what you want and get shell commands, or ? fix to correct failed commands. Includes Cliara Cloud (GitHub login, 150 free queries/month), semantic history search, smart push (auto-commit messages), and smart deploy (auto-detects Vercel, Netlify, Docker, PyPI). Published on PyPI.",
    hoverText: "Built with Python, OpenAI, and Anthropic APIs for natural language command generation. Uses prompt-toolkit for a rich REPL experience and Rich for formatted terminal output. The FastAPI backend powers Cliara Cloud with GitHub OAuth and usage tracking. Features include semantic history search across your shell history, smart push that generates commit messages from diffs, and smart deploy that auto-detects Vercel, Netlify, Docker, and PyPI deployment targets. Wraps bash, zsh, and PowerShell so you keep your existing setup while adding AI superpowers.",
    image: `${process.env.PUBLIC_URL}/assets/project-7.png`,
    gradient: "from-emerald-500 to-teal-500",
    titleColor: "text-emerald-600",
    tags: ['Python', 'OpenAI', 'Anthropic', 'prompt-toolkit', 'Rich', 'FastAPI', 'PyPI'],
    badge: "Published on PyPI",
    links: [
      { href: "https://github.com/HreemPandya/cliara-app", icon: <FaGithub size={20} />, label: "Code" },
      { href: "https://pypi.org/project/cliara/", icon: <FaExternalLinkAlt size={20} />, label: "PyPI" },
    ],
  },
  {
    id: 3,
    title: "BeMyEyes: Accessibility Tool",
    description: "A wearable assistive device for visually impaired users that integrates ultrasonic distance sensors for obstacle detection auricularly, real-time object recognition via OpenCV using an embedded camera, and Google TTS output for contextual feedback.",
    hoverText: "Built on an Arduino microcontroller with ultrasonic distance sensors for auricular obstacle detection and an embedded camera for real-time image capture. Uses a Python-based companion system with OpenCV for object recognition and Google TTS for contextual audio feedback. Communication between hardware and processing modules is handled via serial over USB, ensuring low-latency data transfer. The system implements non-blocking sensor polling for continuous environment scanning, progressive alert tones mapped to obstacle proximity, and modular firmware for easy expansion to additional sensors or features.",
    image: `${process.env.PUBLIC_URL}/assets/project-3.png`,
    gradient: "from-green-500 to-blue-500",
    titleColor: "text-cyan-600", // Cyan to match BeMyEyes tags
    tags: ['Arduino', 'OpenCV', 'IoT', 'Embedded System'],
    links: [
      { href: "https://devpost.com/software/bemyeyes", icon: <FaExternalLinkAlt size={20} />, label: "Devpost" },
      { href: "https://github.com/HreemPandya/be-my-eyes", icon: <FaGithub size={20} />, label: "Code" },
    ],
  },
  {
    id: 4,
    title: "GestureGroove: AI Music Controller",
    description: "A real-time gesture recognition app built on React that translates hand movements into music control using OpenCV for hand tracking and MediaPipe for gesture classification",
    hoverText: "Developed using OpenCV for video capture and MediaPipe Hands for real-time, 21-point hand landmark detection at low latency. GestureGroove interprets spatial coordinates and motion vectors to classify predefined gestures, which are mapped to playback controls and musical parameters such as pitch, volume, and audio effects. The system features debounced gesture recognition to prevent false triggers, asynchronous event handling for responsive UI feedback, and seamless integration with the Spotify Web API for track control and choice.",
    image: `${process.env.PUBLIC_URL}/assets/project-6.png`,
    gradient: "from-cyan-500 to-blue-500",
    titleColor: "text-green-600", // Green to match GestureGroove tags
    tags: ['OpenCV', 'MediaPipe', 'Spotify API', 'React'],
    links: [
      { href: "https://gesturegroove.vercel.app/", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path></svg>, label: "Demo" },
      { href: "https://github.com/HreemPandya/GestureGroove", icon: <FaGithub size={20} />, label: "Code" },
    ],
  },
  {
    id: 5,
    title: "CrisisCompass: First Responder's Emergency Management Tool",
    description: "Developed at NewHacks 2024, this React web application helps first responders and volunteers prioritize and manage local emergencies by aggregating and scraping real-time data from news outlets using OpenAI API to analyze and rank incidents based on urgency and using geolocation to rank incidents by proximity.",
    hoverText: "Designed to help first responders and volunteers act faster during emergencies, CrisisCompass ranks incidents so the most urgent situations receive immediate attention. Built with a Flask-based backend API that aggregates, processes, and web scrapes emergency reports from trusted news and social media sources, it analyzes type, location, and critical keywords using OpenAI API to guide resource allocation during crises. A responsive React dashboard presents real-time updates with urgency badges and severity icons, ensuring clear situational awareness when every second counts.",
    image: `${process.env.PUBLIC_URL}/assets/project-1.png`,
    gradient: "from-red-500 to-orange-500",
    titleColor: "text-orange-600", // Orange to match CrisisCompass tags (changed from red)
    tags: ['React', 'OpenAI API', 'Flask', 'Web Scraping'],
    links: [
      { href: "https://github.com/HreemPandya/Crisis-Compass", icon: <FaGithub size={20} />, label: "Code" },
      { href: "https://youtu.be/pfCfrTvsKqc", icon: <FaYoutube size={20} />, label: "Demo" },
    ],
  },
  {
    id: 6,
    title: "SecureEdu: Educational Material Encryption System",
    description: "A secure learning platform built from STM32 microcontrollers that encrypts and transmits educational materials, using AES-based encryption and EEPROM-stored keys. Implements a progressive hint-based learning system where content is unlocked incrementally via access keys, ensuring controlled information disclosure",
    hoverText: "SecureEdu runs on STM32 microcontrollers that use AES encryption to keep textbook sections, quiz solutions, and hints safe from unauthorized access. For secure communication between devices, it integrates Diffie-Hellman Key Exchange so encryption keys are never exposed during transfer. On the hardware side, we configured UART, I2C, and GPIO peripherals to connect an LCD display, which gives students real-time feedback as they interact with the system, and a 4x4 keypad, which they use to securely enter access keys. The whole setup powers a progressive hint-based learning system, where you can unlock just the right amount of help without giving away the entire answer, all while keeping the data transmission secure.",
    image: `${process.env.PUBLIC_URL}/assets/project-2.png`,
    gradient: "from-blue-500 to-teal-500",
    titleColor: "text-teal-600", // Teal to match SecureEdu tags (changed from blue)
    tags: ['STM32', 'C Programming', 'Embedded Systems','AES Encryption'],
    links: [
      { href: "https://github.com/HreemPandya/SecureEdu", icon: <FaGithub size={20} />, label: "Code" },
      { href: "https://youtube.com/shorts/-U43X7I6Ihs?feature=share", icon: <FaYoutube size={20} />, label: "Demo" },
    ],
  },
  {
    id: 7,
    title: "TaxWiz: LLM-Driven Tax Advisor",
    description: "An AI-powered tax assistant built with TypeScript, OpenAI API and the Vercel AI SDK that guides users through complex tax questions via an intuitive, conversational interface. Features intelligent document parsing to extract and interpret key information from uploaded tax forms, enabling accurate, context-aware responses and simplifying the tax filing process.",
    hoverText: "Built a chat-based LLM tax assistant in TypeScript using the OpenAI API, with structured evaluations to fine-tune prompts and improve how the assistant interacts with users. Used Tailwind CSS to quickly spin up dynamic, consistent UI components, and added robust document parsing so it can handle different file formats and pull out key details. Next.js powers the server-side logic for processing queries",
    image: `${process.env.PUBLIC_URL}/assets/project-4.png`,
    gradient: "from-purple-500 to-pink-500",
    titleColor: "text-purple-600", // Purple to match TaxWiz tags
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'OpenAI API'],
    links: [
      { href: "https://github.com/HreemPandya/taxwiz-chatbot", icon: <FaGithub size={20} />, label: "Code" },
      { href: "https://taxwiz-chatbot.vercel.app/", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path></svg>, label: "Demo" },
    ],
  },
];

// Project card with optional cursor-based tilt and featured layout
const ProjectCard = ({ project, isDarkMode, openModal, featured, index = 0 }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform({ rotateX: -y * 8, rotateY: x * 8 });
  };

  const handleMouseLeave = () => setTransform({ rotateX: 0, rotateY: 0 });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const tagCount = isMobile ? 2 : 3;

  return (
    <motion.div
      className={`relative group cursor-pointer ${featured ? 'w-full' : ''}`}
      variants={featured ? {} : { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
      transition={featured ? {} : { delay: index * 0.1 }}
      whileHover={!featured && !isMobile ? { scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <div
        ref={cardRef}
        className="h-full"
        onClick={() => openModal(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
      <div className={`backdrop-blur-xl rounded-2xl border overflow-hidden transition-all duration-300 h-full ${featured ? 'md:flex md:flex-row' : ''} ${isDarkMode ? 'bg-[#111827] border-amber-500/20 group-hover:border-amber-500/40 group-hover:shadow-[0_12px_40px_rgba(245,158,11,0.08)]' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] hover:border-[var(--lm-accent)]/30 shadow-lg group-hover:shadow-xl'}`}>
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 h-48 md:h-72' : 'h-36 md:h-48'}`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
          {featured && project.badge && (
            <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${isDarkMode ? 'bg-amber-500 text-[#07090D]' : 'bg-[#4A6B4E] text-white'}`}>
              {project.badge}
            </span>
          )}
        </div>
        <div className={`p-4 md:p-6 ${featured ? 'md:flex md:flex-col md:justify-center md:w-1/2' : ''}`}>
          <h3 className={`font-playfair text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:underline underline-offset-4 decoration-2 ${featured ? 'md:text-2xl' : ''} ${isDarkMode ? 'text-white' : project.titleColor} line-clamp-2`}>
            {project.title}
          </h3>
          <p className={`text-sm leading-relaxed mb-3 md:mb-4 ${featured ? 'line-clamp-4 md:line-clamp-none' : 'line-clamp-3'} ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
            {project.tags.slice(0, tagCount).map(tag => (
              <span key={tag} className={`px-2.5 py-0.5 text-xs rounded-full border font-medium ${isDarkMode ? 'bg-amber-500/[0.12] text-amber-300 border-amber-500/[0.2]' : 'bg-[var(--lm-accent-muted)] text-[var(--lm-accent)] border-[var(--lm-border)]'}`}>
                {tag}
              </span>
            ))}
            {project.tags.length > tagCount && (
              <span className={`px-2.5 py-0.5 text-xs rounded-full border font-medium ${isDarkMode ? 'bg-amber-500/[0.12] text-amber-300 border-amber-500/[0.2]' : 'bg-[var(--lm-accent-muted)] text-[var(--lm-accent)] border-[var(--lm-border)]'}`}>
                +{project.tags.length - tagCount} more
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {project.links.slice(0, 2).map((link, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1 px-2 py-1.5 md:px-3 md:py-2 text-xs rounded-full border font-medium transition-all duration-300 cursor-pointer ${isDarkMode ? 'bg-white/[0.04] border-white/[0.06] text-[#8B9DB0] hover:bg-white/[0.08] hover:text-[#F0F4F8] hover:border-amber-500/30' : 'bg-[var(--lm-accent-muted)] text-[var(--lm-accent)] border-[var(--lm-border)] hover:bg-[var(--lm-accent)]/20'}`}
                onClick={(e) => { e.stopPropagation(); window.open(link.href, '_blank'); }}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ isDarkMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className={`pt-12 md:pt-20 pb-16 md:pb-24 transition-colors duration-300 ${isDarkMode ? "bg-transparent" : "bg-transparent"} relative overflow-hidden`}
    >
      {/* Static background orbs */}
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
        </div>
      )}

      <div className="relative z-10">
        {/* Section header — minimal banner */}
        <motion.div
          className="max-w-7xl mx-auto px-4 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-2 ${isDarkMode ? 'text-amber-500/80' : 'text-[var(--lm-accent)]/80'}`}>
              Projects
            </p>
            <h2 className={`font-playfair text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'}`}>
              Featured Work
            </h2>
            <div className={`mt-3 w-12 h-[1px] ${isDarkMode ? 'bg-amber-500/60' : 'bg-[var(--lm-accent)]/60'}`} />
          </div>
        </motion.div>

        {/* FEATURED PROJECTS - FridgeMind & Cliara (full-width) */}
        <motion.div
          className="max-w-7xl mx-auto px-4 space-y-6 md:space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProjectCard featured project={projects[0]} isDarkMode={isDarkMode} openModal={openModal} />
          <ProjectCard featured project={projects[1]} isDarkMode={isDarkMode} openModal={openModal} />
        </motion.div>

        {/* PROJECTS GRID - Remaining projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12 max-w-7xl mx-auto px-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.slice(2).map((project, index) => (
            <ProjectCard key={project.id} project={project} isDarkMode={isDarkMode} openModal={openModal} index={index} />
          ))}
        </motion.div>

        {/* Call to Action — minimal banner */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-12 md:mt-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={`text-sm md:text-base ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}>
            Interested in collaborating?
          </p>
          <motion.a
            href="#contact"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm border transition-colors ${isDarkMode ? 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10' : 'border-[var(--lm-accent)]/40 text-[var(--lm-accent)] hover:bg-[var(--lm-accent)]/10'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's Connect
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* PROJECT MODAL - Mobile optimized */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-[#07090D]/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={`backdrop-blur-xl rounded-3xl border max-w-6xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-[#0B0F18] border-white/[0.06]' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] shadow-2xl'}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className={`absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full transition-colors ${isDarkMode ? 'bg-black/50 hover:bg-black/70' : 'bg-[var(--lm-bg-surface)] hover:opacity-90 shadow-lg'}`}
              >
                <FaTimes className={`${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'}`} size={window.innerWidth < 768 ? 16 : 20} />
              </button>

              {/* Mobile: Stack layout, Desktop: Side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[700px]">
                {/* Image Section */}
                <div className="relative overflow-hidden h-64 md:h-auto">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${selectedProject.gradient} opacity-30`} />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h2 className={`font-playfair text-2xl md:text-4xl font-bold mb-4 md:mb-6 ${isDarkMode ? 'text-[#F0F4F8]' : 'text-[var(--lm-text-primary)]'}`}>
                    {selectedProject.title}
                  </h2>
                  
                  <p className={`text-base md:text-lg leading-relaxed mb-4 md:mb-6 ${isDarkMode ? 'text-[#8B9DB0]' : 'text-gray-700'}`}>
                    {selectedProject.description}
                  </p>

                  <div className="mb-4 md:mb-6">
                    <h4 className={`text-lg md:text-xl font-semibold mb-2 md:mb-3 ${isDarkMode ? 'text-[#F0F4F8]' : 'text-[var(--lm-text-primary)]'}`}>Technical Details</h4>
                    <p className={`leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}>
                      {selectedProject.hoverText}
                    </p>
                  </div>

                  {/* All Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className={`px-2.5 py-1 md:px-3 md:py-2 rounded-full text-xs md:text-sm border ${
                        isDarkMode
                          ? 'bg-amber-500/[0.12] text-amber-300 border-amber-500/[0.2]'
                          : 'bg-[var(--lm-accent-muted)] text-[var(--lm-accent)] border-[var(--lm-border)]'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {selectedProject.links.map((link, idx) => (
                      <motion.a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.95] transition-all duration-200 text-sm md:text-base ${isDarkMode ? 'bg-amber-500 text-[#07090D]' : 'text-white'}`}
                        style={!isDarkMode ? { backgroundColor: '#4A6B4E' } : undefined}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.icon}
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;