import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaYoutube, FaTimes, FaExternalLinkAlt} from "react-icons/fa";
import { useState, useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { createPortal } from "react-dom";
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
    image: `${process.env.PUBLIC_URL}/assets/base-fridgemind-proj.png`,
    modalImage: `${process.env.PUBLIC_URL}/assets/project-5.png`,
    gradient: "from-indigo-500 to-purple-500",
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
    description: "An AI-powered shell that wraps your existing terminal (bash, zsh, PowerShell) and adds natural language commands, reusable macros, and smart workflows. Use ? <query> to describe what you want and get shell commands, or ? fix to correct failed commands. Includes Cliara Cloud (GitHub login, 150 free queries/month), semantic history search, smart push and smart deploy (auto-detects Vercel, Netlify, Docker).",
    hoverText: "Built with Python, OpenAI, and Anthropic APIs for natural language command generation. Uses prompt-toolkit for a rich REPL experience and Rich for formatted terminal output. The FastAPI backend powers Cliara Cloud with GitHub OAuth and usage tracking. Features include semantic history search across your shell history, smart push that generates commit messages from diffs, and smart deploy that auto-detects Vercel, Netlify, Docker, and PyPI deployment targets. Wraps bash, zsh, and PowerShell so you keep your existing setup while adding AI superpowers.",
    image: `${process.env.PUBLIC_URL}/assets/base-cliara.png`,
    // object-cover + default center crops the monitor header; bias toward top so the Cliara logo stays in frame
    imageObjectClass: "object-[50%_18%] md:object-[50%_20%] origin-top",
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-cliara.png`,
    gradient: "from-emerald-500 to-teal-500",
    tags: ['Python', 'LLMs', 'FastAPI', 'OpenAI', 'Anthropic', 'Shell', 'PyPI'],
    badge: "Published on PyPI",
    links: [
      { href: "https://github.com/HreemPandya/cliara-app", icon: <FaGithub size={20} />, label: "Code" },
      { href: "https://pypi.org/project/cliara/", icon: <FaExternalLinkAlt size={20} />, label: "PyPI" },
    ],
  },
  {
    id: 3,
    title: "InvestEd: AI-Powered Financial Education @ Hack the North",
    description: "Banking app that turns finances into something engaging. Portfolius AI explains spending habits, highlights overspending, and generates personalized explainer videos so you know exactly where your money goes and how to invest smarter.",
    hoverText: "Frontend: Next.js and Tailwind with a banking-inspired layout, including trend charts, portfolio views, and interactive elements like rebalance actions, wired to a FastAPI service layer. Backend: REST endpoints orchestrate an async pipeline where user and spending context is summarized, then Cohere's LLM drafts structured, plain-language narration and scene beats for each explainer. Manim (Python) renders motion graphics and captions at 720p/30fps; audio is synthesized with ElevenLabs so Portfolius has a consistent voice. Finished assets land in Supabase Storage with URLs served back to the client for reliable in-app playback without blocking the UI during generation.",
    image: `${process.env.PUBLIC_URL}/assets/project-8.png`,
    gradient: "from-emerald-500 to-cyan-500",
    tags: ['Next.js', 'Tailwind', 'FastAPI', 'Cohere', 'Manim', 'ElevenLabs', 'Supabase'],
    links: [
      { href: "https://github.com/HreemPandya/invested", icon: <FaGithub size={20} />, label: "Code" },
    ],
  },
  {
    id: 4,
    title: "BeMyEyes: Accessibility Tool",
    description: "A wearable assistive device for visually impaired users that integrates ultrasonic distance sensors for obstacle detection auricularly, real-time object recognition via OpenCV using an embedded camera, and Google TTS output for contextual feedback.",
    hoverText: "Built on an Arduino microcontroller with ultrasonic distance sensors for auricular obstacle detection and an embedded camera for real-time image capture. Uses a Python-based companion system with OpenCV for object recognition and Google TTS for contextual audio feedback. Communication between hardware and processing modules is handled via serial over USB, ensuring low-latency data transfer. The system implements non-blocking sensor polling for continuous environment scanning, progressive alert tones mapped to obstacle proximity, and modular firmware for easy expansion to additional sensors or features.",
    image: `${process.env.PUBLIC_URL}/assets/base-bemyeyes-crop.png`,
    // Card only: nudge crop up slightly so the top gutter is covered (no zoom)
    cardImageObjectClass: "-translate-y-[5px]",
    modalImage: `${process.env.PUBLIC_URL}/assets/project-3-copy.png`,
    gradient: "from-green-500 to-blue-500",
    tags: ['Arduino', 'OpenCV', 'IoT', 'Embedded System'],
    links: [
      { href: "https://devpost.com/software/bemyeyes", icon: <FaExternalLinkAlt size={20} />, label: "Devpost" },
      { href: "https://github.com/HreemPandya/be-my-eyes", icon: <FaGithub size={20} />, label: "Code" },
    ],
  },
  {
    id: 8,
    title: "HackCanada Judging: Scale Without the Spreadsheet Chaos",
    description: "Judging platform for HackCanada 2026 that absorbed the operational friction of a massive event: 210+ projects, 50+ judges, and 700+ participants. One place to manage projects, judges, rooms, and schedules; deployed on Vercel with TypeScript and Supabase.",
    hoverText: "Instead of brittle spreadsheets and scattered updates, judges allocate virtual investment across projects so rankings reflect relative preference and budget constraints, not opaque 1 to 10 scores, while organizers configure tracks, rooms, and calendar blocks from one admin surface. The Next.js App Router frontend uses React Server and Client Components where it matters, TypeScript end to end, Tailwind and shadcn/ui for consistent forms and tables, and Recharts for live breakdowns of allocations and progress. Supabase backs auth, relational data for projects, judges, rooms, and schedules, and row level security so each role only sees what it should. Queries stay indexed for list views at hundreds of rows, and the app is deployed on Vercel with preview environments so the team could iterate safely right up to event day.",
    image: `${process.env.PUBLIC_URL}/assets/project-4.png`,
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-hc.png`,
    gradient: "from-violet-500 to-indigo-500",
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'Tailwind'],
    links: [
      { href: "https://hackcanada-judging.vercel.app/", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path></svg>, label: "Website" },
      { href: "https://github.com/Hack-Canada/judging-platform", icon: <FaGithub size={20} />, label: "Code" },
    ],
  },
  {
    id: 5,
    title: "GestureGroove: AI Music Controller",
    description: "A real-time gesture recognition app built on React that translates hand movements into music control using OpenCV for hand tracking and MediaPipe for gesture classification",
    hoverText: "The browser captures webcam frames through getUserMedia, then OpenCV handles acquisition and preprocessing while MediaPipe Hands tracks 21 landmarks per hand at interactive frame rates. Landmarks are normalized to screen space, smoothed over a short sliding window, and fed into rules that look at palm orientation, finger spread, and motion vectors so static poses and swipes map to different commands. Debouncing and minimum hold times cut accidental toggles when the hand jitters. The React UI runs the loop with requestAnimationFrame-friendly updates so the overlay and control panel stay responsive. Playback and library access go through the Spotify Web API with OAuth, mapping gestures to skip, play, pause, volume, and effect parameters so the whole stack stays in the browser without a native plugin.",
    image: `${process.env.PUBLIC_URL}/assets/project-6.png`,
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-gesture.png`,
    gradient: "from-cyan-500 to-blue-500",
    tags: ['OpenCV', 'MediaPipe', 'Spotify API', 'React'],
    links: [
      { href: "https://gesturegroove.vercel.app/", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path></svg>, label: "Demo" },
      { href: "https://github.com/HreemPandya/GestureGroove", icon: <FaGithub size={20} />, label: "Code" },
    ],
  },
  {
    id: 6,
    title: "CrisisCompass: First Responder's Emergency Management Tool",
    description: "Developed at NewHacks 2024, this React web application helps first responders and volunteers prioritize and manage local emergencies by aggregating and scraping real-time data from news outlets using OpenAI API to analyze and rank incidents based on urgency and using geolocation to rank incidents by proximity.",
    hoverText: "Designed to help first responders and volunteers act faster during emergencies, CrisisCompass merges ingestion, scoring, and map-ready views in one place. A Flask REST API exposes routes for listing incidents, triggering refresh jobs, and serving ranked results to the client. Workers scrape and normalize headlines and blurbs from news and social-style sources, strip boilerplate, then call the OpenAI API with structured prompts to label incident type, extract location hints and severity cues, and produce a comparable urgency score. Geolocation or inferred coordinates feed a proximity sort alongside urgency so nearby high-risk events bubble up. The React front end polls or refetches on an interval, renders cards with urgency badges and severity icons, and keeps layout responsive for laptops in a command center. Error handling and timeouts on external calls prevent one slow source from stalling the whole dashboard when every second counts.",
    image: `${process.env.PUBLIC_URL}/assets/base-crisis.png`,
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-crisis.png`,
    gradient: "from-red-500 to-orange-500",
    tags: ['React', 'OpenAI API', 'Flask', 'Web Scraping'],
    links: [
      { href: "https://github.com/HreemPandya/Crisis-Compass", icon: <FaGithub size={20} />, label: "Code" },
      { href: "https://youtu.be/pfCfrTvsKqc", icon: <FaYoutube size={20} />, label: "Demo" },
    ],
  },
  {
    id: 7,
    title: "SecureEdu: Educational Material Encryption System",
    description: "A secure learning platform built from STM32 microcontrollers that encrypts and transmits educational materials, using AES-based encryption and EEPROM-stored keys. Implements a progressive hint-based learning system where content is unlocked incrementally via access keys, ensuring controlled information disclosure",
    hoverText: "SecureEdu runs on STM32 microcontrollers that use AES encryption to keep textbook sections, quiz solutions, and hints safe from unauthorized access. For secure communication between devices, it integrates Diffie-Hellman Key Exchange so encryption keys are never exposed during transfer. On the hardware side, we configured UART, I2C, and GPIO peripherals to connect an LCD display, which gives students real-time feedback as they interact with the system, and a 4x4 keypad, which they use to securely enter access keys. The whole setup powers a progressive hint-based learning system, where you can unlock just the right amount of help without giving away the entire answer, all while keeping the data transmission secure.",
    image: `${process.env.PUBLIC_URL}/assets/base-securedu-copy.png`,
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-secure.png`,
    gradient: "from-blue-500 to-teal-500",
    tags: ['STM32', 'C Programming', 'Embedded Systems','AES Encryption'],
    links: [
      { href: "https://github.com/HreemPandya/SecureEdu", icon: <FaGithub size={20} />, label: "Code" },
      { href: "https://youtube.com/shorts/-U43X7I6Ihs?feature=share", icon: <FaYoutube size={20} />, label: "Demo" },
    ],
  },
];

// Project card with optional cursor-based tilt and featured layout
const ProjectCard = ({ project, isDarkMode, openModal, featured, index = 0 }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform({ rotateX: -y * 8, rotateY: x * 8 });
  };

  const handleMouseLeave = () => setTransform({ rotateX: 0, rotateY: 0 });

  const tagCount = featured ? (isMobile ? 3 : 4) : isMobile ? 2 : 3;

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
      <div className={`rounded-2xl border overflow-hidden transition-all duration-300 h-full ${featured ? "md:flex md:flex-row md:h-72" : ""} ${isDarkMode ? "border-amber-500/20 bg-[#111827] backdrop-blur-xl group-hover:border-amber-500/40 group-hover:shadow-[0_12px_40px_rgba(245,158,11,0.08)]" : "border-[var(--lm-border)] bg-[var(--lm-bg-surface)] shadow-lg group-hover:border-[var(--lm-accent)]/40 group-hover:shadow-xl"}`}>
        <div
          className={`relative overflow-hidden ${
            featured ? "h-48 md:h-full md:w-1/2 md:min-h-0 md:flex-shrink-0" : "h-36 md:h-48"
          }`}
        >
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${project.cardImageObjectClass ?? project.imageObjectClass ?? ""} group-hover:scale-110`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
          {featured && project.badge && (
            <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${isDarkMode ? 'bg-amber-500 text-[#07090D]' : 'bg-[#4A6B4E] text-white'}`}>
              {project.badge}
            </span>
          )}
        </div>
        <div
          className={`p-4 ${
            featured
              ? "md:flex md:h-full md:min-h-0 md:w-1/2 md:flex-col md:justify-start md:overflow-hidden md:px-5 md:py-4"
              : "md:p-6"
          }`}
        >
          <h3
            className={`font-playfair text-lg font-bold group-hover:underline underline-offset-4 decoration-2 line-clamp-2 ${
              featured ? "mb-1.5 md:mb-2 md:text-2xl md:leading-tight" : "mb-2 md:mb-3 md:text-xl"
            } ${isDarkMode ? "text-white" : "text-[var(--lm-accent)]"}`}
          >
            {project.title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              featured ? "mb-2 line-clamp-3 md:mb-2" : "mb-3 line-clamp-3 md:mb-4"
            } ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}
          >
            {project.description}
          </p>
          <div
            className={`flex flex-wrap gap-1.5 md:gap-2 ${
              featured ? "mb-2 shrink-0 md:mb-2" : "mb-3 md:mb-4"
            }`}
          >
            {project.tags.slice(0, tagCount).map(tag => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  isDarkMode
                    ? "border-amber-500/[0.2] bg-amber-500/[0.12] text-amber-300"
                    : "border-[var(--lm-accent)]/45 bg-white text-[#1e3324] shadow-sm"
                }`}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > tagCount && (
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  isDarkMode
                    ? "border-amber-500/[0.2] bg-amber-500/[0.12] text-amber-300"
                    : "border-[var(--lm-accent)]/45 bg-white text-[#1e3324] shadow-sm"
                }`}
              >
                +{project.tags.length - tagCount} more
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.links.slice(0, 2).map((link, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.open(link.href, "_blank");
                  }
                }}
                className={`flex min-h-[44px] cursor-pointer items-center gap-1 rounded-full border px-3 py-2 text-xs font-semibold transition-all duration-300 md:min-h-0 md:px-3 md:py-2 ${
                  isDarkMode
                    ? "border-white/[0.06] bg-white/[0.04] text-[#8B9DB0] hover:border-amber-500/30 hover:bg-white/[0.08] hover:text-[#F0F4F8]"
                    : "border-2 border-[var(--lm-accent)] bg-[var(--lm-bg-surface)] text-[var(--lm-accent)] shadow-sm hover:bg-[var(--lm-accent-muted)] [&_svg]:shrink-0 [&_svg]:text-[var(--lm-accent)]"
                }`}
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
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border-2 transition-colors shadow-md ${isDarkMode ? 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10' : 'bg-white border-[#4A6B4E]/55 text-[#2D4A32] hover:bg-[#4A6B4E]/12 hover:border-[#4A6B4E] hover:shadow-lg'}`}
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

      {/* PROJECT MODAL — portaled to body so fixed + z-index aren’t trapped by section overflow-hidden */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
          <motion.div
            className={`fixed inset-0 z-[1100] flex items-center justify-center p-4 ${
              isDarkMode ? "bg-[#07090D]/95 backdrop-blur-xl" : "bg-[#2a2a2a]/50"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={`max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border shadow-2xl ${
                isDarkMode
                  ? "border-white/[0.06] bg-[#0B0F18] backdrop-blur-xl"
                  : "lm-project-modal border-[var(--lm-border)] bg-lm-bg-surface text-[var(--lm-text-primary)] shadow-[0_24px_64px_-16px_rgba(42,42,42,0.18)]"
              }`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close project details"
                className={`absolute right-4 top-4 z-10 rounded-full p-2 transition-colors md:right-6 md:top-6 ${
                  isDarkMode
                    ? "bg-black/50 hover:bg-black/70"
                    : "border border-[var(--lm-border)] bg-white/95 text-[var(--lm-text-primary)] shadow-sm hover:bg-white"
                }`}
              >
                <FaTimes
                  className={`h-4 w-4 md:h-5 md:w-5 ${isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}`}
                />
              </button>

              {/* Mobile: Stack layout, Desktop: Side by side — content top-aligned so short copy (e.g. InvestEd) does not float with huge vertical gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch min-h-[400px] md:min-h-[min(700px,85vh)]">
                {/* Image Section */}
                <div
                  className={`relative h-64 overflow-hidden md:h-full md:min-h-0 ${
                    isDarkMode ? "" : "bg-lm-bg-surface"
                  }`}
                >
                  <img
                    src={selectedProject.modalImage ?? selectedProject.image}
                    alt={selectedProject.title}
                    className={`w-full h-full object-cover ${selectedProject.imageObjectClass ?? ""}`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${selectedProject.gradient} ${
                      isDarkMode ? "opacity-30" : "opacity-[0.12]"
                    }`}
                  />
                </div>

                {/* Content Section — light mode uses lm-* tokens (Sage & Cream) */}
                <div
                  className={`flex min-h-0 flex-col justify-start gap-4 p-6 md:gap-5 md:p-8 md:pt-10 ${
                    isDarkMode ? "" : "bg-lm-bg-surface"
                  }`}
                >
                  <h2
                    className={`font-playfair text-2xl font-bold md:text-4xl ${
                      isDarkMode ? "text-[#F0F4F8]" : "text-[var(--lm-text-primary)]"
                    }`}
                  >
                    {selectedProject.title}
                  </h2>
                  <p
                    className={`text-base leading-relaxed md:text-lg ${
                      isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"
                    }`}
                  >
                    {selectedProject.description}
                  </p>

                  <div>
                    <h4
                      className={`mb-2 text-lg font-semibold md:mb-3 md:text-xl ${
                        isDarkMode ? "text-[#F0F4F8]" : "text-[var(--lm-text-primary)]"
                      }`}
                    >
                      Technical Details
                    </h4>
                    <p
                      className={`text-sm leading-relaxed md:text-base ${
                        isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"
                      }`}
                    >
                      {selectedProject.hoverText}
                    </p>
                  </div>

                  {/* All Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-2.5 py-1 text-xs md:px-3 md:py-2 md:text-sm ${
                          isDarkMode
                            ? "border-amber-500/[0.2] bg-amber-500/[0.12] text-amber-300"
                            : "border-[var(--lm-border)] bg-[var(--lm-accent-muted)] text-[var(--lm-accent)]"
                        }`}
                      >
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
                        className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.95] md:gap-3 md:px-6 md:py-3 md:text-base ${
                          isDarkMode
                            ? "border-transparent bg-amber-500 text-[#07090D] hover:opacity-90 [&_svg]:text-[#07090D]"
                            : "border-[var(--lm-accent)] bg-[var(--lm-bg-surface)] text-[var(--lm-accent)] shadow-sm hover:bg-[var(--lm-accent-muted)] [&_svg]:shrink-0 [&_svg]:text-[var(--lm-accent)]"
                        }`}
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
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Projects;