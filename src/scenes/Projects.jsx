import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Github, Youtube, ExternalLink, Globe, X, ArrowUpRight } from "lucide-react";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { createPortal } from "react-dom";

const projects = [
  {
    id: 1,
    title: "FridgeMind: Winner of Hack the 6ix, Deloitte AI For Green",
    caption: "FridgeMind",
    letterSpacingCap: 0.6,
    sticker: "Winner",
    badge: "Hack the 6ix Winner",
    description: "An intelligent recipe recommendation system built on a custom OS using QNX that analyzes available ingredients in your fridge and suggests personalized meals based on dietary preferences and nutritional goals.",
    hoverText: "Built by training a custom YOLOv5 model on a dataset of 300+ labeled food images, working together with a real time footage stream to identify ingredients in your fridge. Along with that, I created an Expo Go app that the device pairs with and uses Gemini's LLM API to generate customized recipes, and AssemblyAI for both speech-to-text and text-to-speech, making the system hands-free and accessible for everyone. Other features include expiry date tracking (recommends recipes with ingredients about to expire first), meal planning, shopping list generation, and nutritional tracking.",
    image: `${process.env.PUBLIC_URL}/assets/base-fridgemind-proj.webp`,
    modalImage: `${process.env.PUBLIC_URL}/assets/project-5.webp`,
    gradient: "from-indigo-500 to-purple-500",
    tags: ['Raspberry Pi/QNX', 'Yolov5', 'Python', 'FastAPI', 'Expo Go' ],
    links: [
      { href: "https://devpost.com/software/fridge-mind", icon: <ExternalLink size={16} />, label: "Devpost" },
      { href: "https://youtube.com/shorts/sylrchlKfYk?feature=share", icon: <Youtube size={16} />, label: "Demo" },
      { href: "https://github.com/HreemPandya/fridge-mind", icon: <Github size={16} />, label: "Code" },
    ],
  },
  {
    id: 2,
    title: "Cliara: AI-Powered Shell with Natural Language & Macros",
    caption: "Cliara",
    letterSpacingCap: 0.1,
    sticker: "PyPI",
    description: "An AI-powered shell that wraps your existing terminal (bash, zsh, PowerShell) and adds natural language commands, reusable macros, and smart workflows. Use ? <query> to describe what you want and get shell commands, or ? fix to correct failed commands. Includes Cliara Cloud (GitHub login, 150 free queries/month), semantic history search, smart push and smart deploy (auto-detects Vercel, Netlify, Docker).",
    hoverText: "Built with Python, OpenAI, and Anthropic APIs for natural language command generation. Uses prompt-toolkit for a rich REPL experience and Rich for formatted terminal output. The FastAPI backend powers Cliara Cloud with GitHub OAuth and usage tracking. Features include semantic history search across your shell history, smart push that generates commit messages from diffs, and smart deploy that auto-detects Vercel, Netlify, Docker, and PyPI deployment targets. Wraps bash, zsh, and PowerShell so you keep your existing setup while adding AI superpowers.",
    image: `${process.env.PUBLIC_URL}/assets/base-cliara.webp`,
    // object-cover + default center crops the monitor header; bias toward top so the Cliara logo stays in frame
    imageObjectClass: "object-[50%_18%] md:object-[50%_20%] origin-top",
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-cliara.webp`,
    gradient: "from-emerald-500 to-teal-500",
    tags: ['Python', 'LLMs', 'FastAPI', 'OpenAI', 'Anthropic', 'Shell', 'PyPI'],
    badge: "Published on PyPI",
    links: [
      { href: "https://github.com/HreemPandya/cliara-app", icon: <Github size={16} />, label: "Code" },
      { href: "https://pypi.org/project/cliara/", icon: <ExternalLink size={16} />, label: "PyPI" },
    ],
  },
  {
    id: 3,
    title: "InvestEd: AI-Powered Financial Education @ Hack the North",
    caption: "InvestEd",
    letterSpacingCap: 0.1,
    description: "Banking app that turns finances into something engaging. Portfolius AI explains spending habits, highlights overspending, and generates personalized explainer videos so you know exactly where your money goes and how to invest smarter.",
    hoverText: "Frontend: Next.js and Tailwind with a banking-inspired layout, including trend charts, portfolio views, and interactive elements like rebalance actions, wired to a FastAPI service layer. Backend: REST endpoints orchestrate an async pipeline where user and spending context is summarized, then Cohere's LLM drafts structured, plain-language narration and scene beats for each explainer. Manim (Python) renders motion graphics and captions at 720p/30fps; audio is synthesized with ElevenLabs so Portfolius has a consistent voice. Finished assets land in Supabase Storage with URLs served back to the client for reliable in-app playback without blocking the UI during generation.",
    image: `${process.env.PUBLIC_URL}/assets/project-8.webp`,
    gradient: "from-emerald-500 to-cyan-500",
    tags: ['Next.js', 'Tailwind', 'FastAPI', 'Cohere', 'Manim', 'ElevenLabs', 'Supabase'],
    links: [
      { href: "https://github.com/HreemPandya/invested", icon: <Github size={16} />, label: "Code" },
    ],
  },
  {
    id: 4,
    title: "BeMyEyes: Accessibility Tool",
    caption: "BeMyEyes",
    letterSpacingCap: 0.6,
    description: "A wearable assistive device for visually impaired users that integrates ultrasonic distance sensors for obstacle detection auricularly, real-time object recognition via OpenCV using an embedded camera, and Google TTS output for contextual feedback.",
    hoverText: "Built on an Arduino microcontroller with ultrasonic distance sensors for auricular obstacle detection and an embedded camera for real-time image capture. Uses a Python-based companion system with OpenCV for object recognition and Google TTS for contextual audio feedback. Communication between hardware and processing modules is handled via serial over USB, ensuring low-latency data transfer. The system implements non-blocking sensor polling for continuous environment scanning, progressive alert tones mapped to obstacle proximity, and modular firmware for easy expansion to additional sensors or features.",
    image: `${process.env.PUBLIC_URL}/assets/base-bemyeyes-crop.webp`,
    // Card only: nudge crop up slightly so the top gutter is covered (no zoom)
    cardImageObjectClass: "-translate-y-[5px]",
    modalImage: `${process.env.PUBLIC_URL}/assets/project-3-copy.webp`,
    gradient: "from-green-500 to-blue-500",
    tags: ['Arduino', 'OpenCV', 'IoT', 'Embedded System'],
    links: [
      { href: "https://devpost.com/software/bemyeyes", icon: <ExternalLink size={16} />, label: "Devpost" },
      { href: "https://github.com/HreemPandya/be-my-eyes", icon: <Github size={16} />, label: "Code" },
    ],
  },
  {
    id: 8,
    title: "HackCanada Judging: Scale Without the Spreadsheet Chaos",
    caption: "HackCanada",
    letterSpacingCap: 0.6,
    description: "Judging platform for HackCanada 2026 that absorbed the operational friction of a massive event: 210+ projects, 50+ judges, and 700+ participants. One place to manage projects, judges, rooms, and schedules; deployed on Vercel with TypeScript and Supabase.",
    hoverText: "Instead of brittle spreadsheets and scattered updates, judges allocate virtual investment across projects so rankings reflect relative preference and budget constraints, not opaque 1 to 10 scores, while organizers configure tracks, rooms, and calendar blocks from one admin surface. The Next.js App Router frontend uses React Server and Client Components where it matters, TypeScript end to end, Tailwind and shadcn/ui for consistent forms and tables, and Recharts for live breakdowns of allocations and progress. Supabase backs auth, relational data for projects, judges, rooms, and schedules, and row level security so each role only sees what it should. Queries stay indexed for list views at hundreds of rows, and the app is deployed on Vercel with preview environments so the team could iterate safely right up to event day.",
    image: `${process.env.PUBLIC_URL}/assets/project-4.webp`,
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-hc.webp`,
    gradient: "from-violet-500 to-indigo-500",
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'Tailwind'],
    links: [
      { href: "https://hackcanada-judging.vercel.app/", icon: <Globe size={16} />, label: "Website" },
      { href: "https://github.com/Hack-Canada/judging-platform", icon: <Github size={16} />, label: "Code" },
    ],
  },
  {
    id: 5,
    title: "GestureGroove: AI Music Controller",
    caption: "GestureGroove",
    letterSpacingCap: 0.6,
    description: "A real-time gesture recognition app built on React that translates hand movements into music control using OpenCV for hand tracking and MediaPipe for gesture classification",
    hoverText: "The browser captures webcam frames through getUserMedia, then OpenCV handles acquisition and preprocessing while MediaPipe Hands tracks 21 landmarks per hand at interactive frame rates. Landmarks are normalized to screen space, smoothed over a short sliding window, and fed into rules that look at palm orientation, finger spread, and motion vectors so static poses and swipes map to different commands. Debouncing and minimum hold times cut accidental toggles when the hand jitters. The React UI runs the loop with requestAnimationFrame-friendly updates so the overlay and control panel stay responsive. Playback and library access go through the Spotify Web API with OAuth, mapping gestures to skip, play, pause, volume, and effect parameters so the whole stack stays in the browser without a native plugin.",
    image: `${process.env.PUBLIC_URL}/assets/project-6.webp`,
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-gesture.webp`,
    gradient: "from-cyan-500 to-blue-500",
    tags: ['OpenCV', 'MediaPipe', 'Spotify API', 'React'],
    links: [
      { href: "https://gesturegroove.vercel.app/", icon: <Globe size={16} />, label: "Demo" },
      { href: "https://github.com/HreemPandya/GestureGroove", icon: <Github size={16} />, label: "Code" },
    ],
  },
  {
    id: 6,
    title: "CrisisCompass: First Responder's Emergency Management Tool",
    caption: "CrisisCompass",
    letterSpacingCap: 0.6,
    description: "Developed at NewHacks 2024, this React web application helps first responders and volunteers prioritize and manage local emergencies by aggregating and scraping real-time data from news outlets using OpenAI API to analyze and rank incidents based on urgency and using geolocation to rank incidents by proximity.",
    hoverText: "Designed to help first responders and volunteers act faster during emergencies, CrisisCompass merges ingestion, scoring, and map-ready views in one place. A Flask REST API exposes routes for listing incidents, triggering refresh jobs, and serving ranked results to the client. Workers scrape and normalize headlines and blurbs from news and social-style sources, strip boilerplate, then call the OpenAI API with structured prompts to label incident type, extract location hints and severity cues, and produce a comparable urgency score. Geolocation or inferred coordinates feed a proximity sort alongside urgency so nearby high-risk events bubble up. The React front end polls or refetches on an interval, renders cards with urgency badges and severity icons, and keeps layout responsive for laptops in a command center. Error handling and timeouts on external calls prevent one slow source from stalling the whole dashboard when every second counts.",
    image: `${process.env.PUBLIC_URL}/assets/base-crisis.webp`,
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-crisis.webp`,
    gradient: "from-red-500 to-orange-500",
    tags: ['React', 'OpenAI API', 'Flask', 'Web Scraping'],
    links: [
      { href: "https://github.com/HreemPandya/Crisis-Compass", icon: <Github size={16} />, label: "Code" },
      { href: "https://youtu.be/pfCfrTvsKqc", icon: <Youtube size={16} />, label: "Demo" },
    ],
  },
  {
    id: 7,
    title: "SecureEdu: Educational Material Encryption System",
    caption: "SecureEdu",
    letterSpacingCap: 0.6,
    description: "A secure learning platform built from STM32 microcontrollers that encrypts and transmits educational materials, using AES-based encryption and EEPROM-stored keys. Implements a progressive hint-based learning system where content is unlocked incrementally via access keys, ensuring controlled information disclosure",
    hoverText: "SecureEdu runs on STM32 microcontrollers that use AES encryption to keep textbook sections, quiz solutions, and hints safe from unauthorized access. For secure communication between devices, it integrates Diffie-Hellman Key Exchange so encryption keys are never exposed during transfer. On the hardware side, we configured UART, I2C, and GPIO peripherals to connect an LCD display, which gives students real-time feedback as they interact with the system, and a 4x4 keypad, which they use to securely enter access keys. The whole setup powers a progressive hint-based learning system, where you can unlock just the right amount of help without giving away the entire answer, all while keeping the data transmission secure.",
    image: `${process.env.PUBLIC_URL}/assets/base-securedu-copy.webp`,
    modalImage: `${process.env.PUBLIC_URL}/assets/expanded-secure.webp`,
    gradient: "from-blue-500 to-teal-500",
    tags: ['STM32', 'C Programming', 'Embedded Systems','AES Encryption'],
    links: [
      { href: "https://github.com/HreemPandya/SecureEdu", icon: <Github size={16} />, label: "Code" },
      { href: "https://youtube.com/shorts/-U43X7I6Ihs?feature=share", icon: <Youtube size={16} />, label: "Demo" },
    ],
  },
];

// Per-print resting tilt (deg). Cycled by global index so the line stays "hung"
// and slightly disoriented without looking random or messy.
const HANG_ANGLES = [-4, 3.5, -2.5, 4, -3.5, 2.5, -1.5, 3];

// Split the projects into rows so each row gets its own wire.
const chunk = (arr, size) => {
  const rows = [];
  for (let i = 0; i < arr.length; i += size) rows.push(arr.slice(i, i + size));
  return rows;
};

// Handwritten project name that stretches to span the print, so each one reads
// like it was inked across the bottom border by hand. Long names shrink just
// enough to fit; short names spread their letters out to fill the same width,
// so every caption spans the card at a consistent height.
const FitCaption = ({ text, letterSpacingCap = 0.6 }) => {
  const wrapRef = useRef(null);
  const inkRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const ink = inkRef.current;
    if (!wrap || !ink) return undefined;

    const fit = () => {
      // Reset any prior fit so we measure the natural, unstyled width.
      ink.style.letterSpacing = "0px";
      ink.style.paddingLeft = "0px";
      ink.style.fontSize = "";
      const base = parseFloat(getComputedStyle(ink).fontSize) || 28;
      const target = wrap.clientWidth * 0.9;
      const natural = ink.scrollWidth;
      if (!natural) return;

      if (natural > target) {
        // Too long: scale the ink down so it fits inside the print.
        ink.style.fontSize = `${(base * target) / natural}px`;
      } else {
        // Room to spare: spread the letters to fill the width. letter-spacing
        // adds a gap after every glyph (N of them, trailing one included), and
        // we pad the leading edge by one more to re-center, so the extra width
        // is spacing * (N + 1) -- divide by that so we hit the target exactly.
        // letterSpacingCap (per-project) caps how wide that gap is allowed to get.
        const spacing = Math.min((target - natural) / (text.length + 1), base * letterSpacingCap);
        ink.style.letterSpacing = `${spacing}px`;
        ink.style.paddingLeft = `${spacing}px`;
      }
    };

    fit();
    window.addEventListener("resize", fit);
    // Refit once the handwriting font finishes loading (first paint may measure
    // the fallback font and get the width wrong).
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, [text, letterSpacingCap]);

  return (
    <div ref={wrapRef} className="polaroid__caption">
      <span ref={inkRef} className="polaroid__caption-ink">
        {text}
      </span>
    </div>
  );
};

// A single polaroid pinned to the wire. The clip (peg) stays upright while the
// print tilts around its top-center, so it pivots from the clip like a real
// hanging photo. Click / Enter / Space opens the existing modal.
const Polaroid = ({ project, isDarkMode, openModal, index = 0, reduceMotion }) => {
  const angle = HANG_ANGLES[index % HANG_ANGLES.length];

  return (
    <div className="relative flex w-40 flex-col items-center xs:w-44 sm:w-48 md:w-52">
      <span
        className="polaroid__peg absolute left-1/2 top-[-13px] z-20 -translate-x-1/2"
        aria-hidden="true"
      />
      <motion.div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Open details for ${project.title}`}
        onClick={() => openModal(project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(project);
          }
        }}
        className={`polaroid group relative w-full cursor-pointer select-none rounded-[2px] p-2.5 pb-8 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isDarkMode
            ? "focus-visible:ring-amber-400 focus-visible:ring-offset-[#07090D]"
            : "focus-visible:ring-[#4A6B4E] focus-visible:ring-offset-[#f7f5f0]"
        }`}
        style={{ transformOrigin: "top center" }}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24, rotate: angle * 2 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: angle }}
        viewport={{ once: true, amount: 0.3 }}
        transition={
          reduceMotion
            ? { duration: 0.3, delay: index * 0.04 }
            : { type: "spring", stiffness: 140, damping: 9, delay: index * 0.06 }
        }
        whileHover={reduceMotion ? {} : { rotate: 0, y: -8, scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="relative overflow-hidden rounded-[2px] ring-1 ring-black/[0.06]">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className={`aspect-square w-full object-cover [filter:saturate(1.08)_contrast(1.03)] transition-transform duration-700 group-hover:scale-105 ${
              project.cardImageObjectClass ?? project.imageObjectClass ?? ""
            }`}
          />
          {/* Color tint kept light so the photo stays true; it lifts a little on hover. */}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.16]`}
          />
          {project.sticker && <span className="polaroid__sticker">{project.sticker}</span>}
        </div>
        <FitCaption
          text={project.caption ?? project.title}
          letterSpacingCap={project.letterSpacingCap}
        />
      </motion.div>
    </div>
  );
};

// One wire's worth of polaroids. The wire shows in the gaps between prints.
const PhotoLine = ({ items, startIndex, isDarkMode, openModal, reduceMotion }) => (
  <div className="photo-line relative">
    <span
      className="photo-line__string absolute left-[6%] right-[6%] top-0"
      aria-hidden="true"
    />
    <div className="relative flex flex-wrap items-start justify-center gap-x-8 gap-y-14 md:gap-x-12">
      {items.map((project, i) => (
        <Polaroid
          key={project.id}
          project={project}
          isDarkMode={isDarkMode}
          openModal={openModal}
          index={startIndex + i}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  </div>
);

const Projects = ({ isDarkMode }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const reduceMotion = useReducedMotion();
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // How many polaroids share a wire, by viewport. Screens are min-width, so we
  // test from the bottom up.
  const isXS = useMediaQuery("(max-width: 479px)");
  const isSM = useMediaQuery("(max-width: 767px)");
  const isMD = useMediaQuery("(max-width: 1059px)");
  const perRow = isXS ? 1 : isSM ? 2 : isMD ? 3 : 4;
  const rows = chunk(projects, perRow);

  const openModal = (project) => {
    // Remember what had focus so we can hand it back when the dialog closes.
    lastFocusedRef.current = document.activeElement;
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Dialog behavior: Esc to close, focus trap, background scroll lock, and
  // focus restoration to the opener. Runs only while a project is open.
  useEffect(() => {
    if (!selectedProject) return undefined;

    const previouslyFocused = lastFocusedRef.current;

    // Lock the page behind the modal; pad for the removed scrollbar so the
    // content doesn't jump sideways as it disappears.
    const html = document.documentElement;
    const scrollbarW = window.innerWidth - html.clientWidth;
    const prevOverflow = html.style.overflow;
    const prevBodyPad = document.body.style.paddingRight;
    html.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;

    const focusableSel =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      modalRef.current
        ? Array.from(modalRef.current.querySelectorAll(focusableSel)).filter(
            (el) => el.offsetParent !== null
          )
        : [];

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSelectedProject(null);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        modalRef.current?.focus({ preventScroll: true });
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !modalRef.current?.contains(active))) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && (active === last || !modalRef.current?.contains(active))) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // Move focus into the dialog once it's committed.
    const focusTimer = window.setTimeout(() => {
      const focusable = getFocusable();
      (focusable[0] ?? modalRef.current)?.focus({ preventScroll: true });
    }, 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(focusTimer);
      html.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevBodyPad;
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className={`pt-12 md:pt-20 pb-8 md:pb-12 transition-colors duration-300 ${isDarkMode ? "bg-transparent" : "bg-transparent"} relative overflow-hidden`}
    >
      {/* Darkroom safelight: a warm glow behind the hung prints */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute left-1/2 top-1/3 h-[460px] w-[680px] max-w-[90%] -translate-x-1/2 rounded-full blur-[130px] ${
            isDarkMode ? "bg-amber-500/[0.05]" : "bg-[#4A6B4E]/[0.05]"
          }`}
        />
      </div>

      <div className="relative z-10">
        {/* Section header — minimal banner */}
        <motion.div
          className="max-w-7xl mx-auto px-4 mb-10 md:mb-16"
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

        {/* The drying line — polaroids strung up across the page.
            data-doodle-ignore: these prints are tilted + animated (and hold
            <img>s), so the site doodle layer must not treat them as colliders. */}
        <div data-doodle-ignore className="max-w-7xl mx-auto px-4 space-y-14 md:space-y-20">
          {rows.map((row, r) => (
            <PhotoLine
              key={r}
              items={row}
              startIndex={r * perRow}
              isDarkMode={isDarkMode}
              openModal={openModal}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

      </div>

      {/* PROJECT MODAL — portaled to body so fixed + z-index aren’t trapped by section overflow-hidden */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
          <motion.div
            data-doodle-ignore
            className={`fixed inset-0 z-[1100] flex items-center justify-center p-4 ${
              isDarkMode ? "bg-[#07090D]/95 backdrop-blur-xl" : "bg-[#2a2a2a]/50"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              tabIndex={-1}
              className={`max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border shadow-2xl outline-none ${
                isDarkMode
                  ? "border-white/[0.06] bg-[#0B0F18] backdrop-blur-xl"
                  : "lm-project-modal border-[var(--lm-border)] bg-lm-bg-surface text-[var(--lm-text-primary)] shadow-[0_24px_64px_-16px_rgba(42,42,42,0.18)]"
              }`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
              transition={reduceMotion ? { duration: 0.15 } : { type: "spring", damping: 30, stiffness: 400 }}
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
                <X
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
                    decoding="async"
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
                  <div className="flex flex-col gap-3">
                    {selectedProject.badge && (
                      <span
                        className={`inline-flex w-fit items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] ${
                          isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"
                        }`}
                      >
                        <span aria-hidden="true">★</span>
                        {selectedProject.badge}
                      </span>
                    )}
                    <h2
                      id="project-modal-title"
                      className={`font-playfair text-2xl font-bold md:text-4xl ${
                        isDarkMode ? "text-[#F0F4F8]" : "text-[var(--lm-text-primary)]"
                      }`}
                    >
                      {selectedProject.title}
                    </h2>
                    <div
                      className={`h-[2px] w-12 rounded-full ${
                        isDarkMode ? "bg-amber-500/60" : "bg-[var(--lm-accent)]/60"
                      }`}
                    />
                  </div>
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

                  {/* Tech stack — a monospace "spec sheet" line rather than generic
                      pill tags, so it reads as a build credit and feels less templated. */}
                  <div className={`border-t pt-4 ${isDarkMode ? "border-white/[0.06]" : "border-[var(--lm-border)]"}`}>
                    <p
                      className={`mb-2.5 font-mono text-[11px] uppercase tracking-[0.2em] ${
                        isDarkMode ? "text-amber-500/80" : "text-[var(--lm-accent)]/80"
                      }`}
                    >
                      Built with
                    </p>
                    <div
                      className={`flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs md:text-sm ${
                        isDarkMode ? "text-[#B8C7D6]" : "text-[var(--lm-text-primary)]"
                      }`}
                    >
                      {selectedProject.tags.map((tag, i) => (
                        <span key={tag} className="inline-flex items-center gap-2">
                          {i > 0 && (
                            <span
                              className={isDarkMode ? "text-amber-500/40" : "text-[var(--lm-accent)]/40"}
                              aria-hidden="true"
                            >
                              ·
                            </span>
                          )}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Links — small, translucent pills that inherit the
                      accent color (icons are lucide outlines, matching the navbar). */}
                  <div className="flex flex-wrap gap-2 md:gap-2.5">
                    {selectedProject.links.map((link, idx) => (
                      <motion.a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 md:text-sm [&_svg]:shrink-0 ${
                          isDarkMode
                            ? "border-amber-500/25 bg-amber-500/10 text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/20"
                            : "border-[var(--lm-accent)]/30 bg-[var(--lm-accent)]/[0.08] text-[var(--lm-accent)] hover:border-[var(--lm-accent)]/50 hover:bg-[var(--lm-accent)]/15"
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
