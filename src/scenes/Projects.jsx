import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa"; // React Icons

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const projects = [
  {
    id: 1,
    title: "CrisisCompass",
    description:
      "Crisis Compass: Developed at NewHacks 2024, this web application helps first responders and volunteers prioritize and manage emergencies by aggregating real-time data from social media, news, and other sources.",
    hoverText: "Using PowerShell automation, the tool ranks emergencies by analyzing type, location, and critical keywords, ensuring resources are dispatched effectively to the most urgent situations. A responsive React interface provides real-time data aggregation from social media and news sources, displaying incidents on an organized dashboard with urgency badges and severity icons for clear situational awareness. The inspiration for this project came from personal experiences of my team members, including my own memory of being stranded during a flash flood as a child. I vividly recall sitting on a table in a flooded market with my dad, fearing whether first responders would arrive in time. That sense of helplessness is something no one should endure. Recognizing that emergency delays are often due to resource constraints and overwhelming demand, we developed CrisisCompass to help first responders allocate units more effectively, reducing fear and uncertainty for those in need and saving more lives.",
    image: `${process.env.PUBLIC_URL}/assets/project-1.png`,
    darkModeBg: "bg-green-900",
    lightModeBg: "bg-[#E76F51]", // Red in light mode
    darkTextColor: "text-white",
    lightTextColor: "text-white",
    links: [
      { href: "https://github.com/HreemPandya/Crisis-Compass", icon: <FaGithub size={30} /> },
      { href: "https://www.youtube.com/watch?v=pfCfrTvsKqc", icon: (isDarkMode) => <FaYoutube size={30} className={isDarkMode ? "text-white" : "text-black"} /> },
    ],
  },
  {
    id: 2,
    title: "SecureEdu",
    description:
      "SecureEdu: A secure learning platform to encrypt and transmit educational materials such as textbook sections and quiz solutions, enabling a progressive hint-based learning system.",
    hoverText: "The microcontrollers uses AES encryption to secure solutions and integrates Diffie-Hellman Key Exchange for secure communication and key distribution. Hardware peripherals, including UART, I2C, and GPIO, were configured to integrate an LCD display for real-time feedback and a 4x4 keypad for secure input of access keys. The inspiration for this project came from my partner and me noticing how readily visible textbook solutions often disrupt genuine learning. We found ourselves working backward from solutions instead of attempting problems independently, which hindered our understanding. SecureEdu addresses this by encrypting solutions and allowing students to unlock hints step-by-step, helping them engage with problems more thoughtfully and learn the steps required to solve them.The project was not without challenges. It was my first time using STM32IDE, which involved a steep learning curve in navigating a new development environment and programming in C for a full-scale project. Wiring and configuring hardware components like the LCD display and 4x4 keypad were entirely new experiences",
    image: `${process.env.PUBLIC_URL}/assets/project-2.png`,
    darkModeBg: "bg-[#f8cc54]",
    lightModeBg: "bg-[#6BA7A5]", // Muted teal in light mode
    darkTextColor: "text-black",
    lightTextColor: "text-black",
    links: [{ href: "https://github.com/HreemPandya/SecureEdu", icon: <FaGithub size={30} /> }],
  },
  {
    id: 3,
    title: "NASH Weather",
    description:
      "NASH Weather: A website that recommends indoor or outdoor activities in your local area based on real-time weather conditions.",
    hoverText: "One of my first hackathons was a website that recommended indoor or outdoor activities in your local area based on real-time weather conditions. It also marked my first encounter with Flask. To learn it I stumbled upon a FreeCodeCamp YouTube video explaining it and binged it. The real adventure began when I started working with the weather APIs. I spent almost eight straight hours trying to figure out how to integrate the API data with the back-end logic for recommending activities. Desperate for energy and answers, 15-year-old me decided to try black coffee for the first time. Bold move, right? Well, it backfired spectacularly. I did figure out the solution about 20 minutes after drinking the coffee, but I also spent the rest of the night wide awake questioning my life choices. My family didn’t sleep either, probably because I wouldn’t stop pacing around. Despite the caffeine-induced chaos, this hackathon taught me one of the most valuable lessons of my tech journey: persistence beats frustration. Whether you’re wrestling with a new programming language or building something you’ve never attempted before, patience (not coffee) is the real MVP. ",
    image: `${process.env.PUBLIC_URL}/assets/project-3.png`,
    darkModeBg: "bg-green-900",
    lightModeBg: "bg-[#E76F51]",
    darkTextColor: "text-white",
    lightTextColor: "text-white",
    links: [{ href: "https://github.com/HreemPandya/NASH-Weather", icon: <FaGithub size={30} /> }],
  },
  {
    id: 4,
    title: "RingSense",
    description:
      "RingSense: Co-founded a small business specializing in affordable, custom-designed resin rings. Managed marketing strategies and social media campaigns.",
    hoverText: "This experience closely tied into another interest of mine aside from computer engineering; business and strategy. This role was particularly meaningful to me as it combined my passion for merging technology with business strategy. Being unanimously selected as VP of Sales by the company was both enlightening and pressure-filled, as it placed the responsibility of driving sales and managing a team of 12 on my shoulders. While developing the website came naturally, leading a larger team and making executive decisions was a steep learning curve. I’ll admit, some of my early calls didn’t pan out as expected, but those experiences became invaluable lessons. I quickly realized that a strong, cooperative team directly impacts the quality of results. By fostering collaboration and aligning our efforts, we secured multiple pop-up venues, developed detailed business plans and shareholder reports, and achieved a positive return on investment. This experience taught me that effective leadership and internal synergy are the foundation for achieving meaningful business outcomes",
    image: `${process.env.PUBLIC_URL}/assets/project-4.png`,
    darkModeBg: "bg-[#f8cc54]",
    lightModeBg: "bg-[#6BA7A5]",
    darkTextColor: "text-black",
    lightTextColor: "text-black",
    links: [
      { href: "https://www.instagram.com/ringsense.yyc/", icon: (isDarkMode) => <FaInstagram size={30} className={isDarkMode ? "text-white" : "text-black"} /> },
    ],
  },
];

const Projects = ({ isDarkMode }) => {
  return (
    <section
      id="projects"
      className={`pt-48 pb-48 transition-colors duration-300 ${isDarkMode ? "bg-[#010026] text-white" : "bg-[#F5E6D3] text-gray-800"
        }`}
    >
      {/* HEADINGS */}
      <motion.div
        className="md:w-2/5 mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div>
          <p className="font-playfair font-semibold text-4xl">
            <span className={isDarkMode ? "text-green-300" : "text-[#E76F51]"}>PRO</span>JECTS
          </p>
          <div className="flex justify-center mt-5">
            <LineGradient width="w-2/3" />
          </div>
        </div>
        <p className="mt-10 mb-10 text-md">Below are some of the projects I worked on and the skills I learned while working on them.</p>
      </motion.div>

      {/* PROJECTS */}
      <div className="flex flex-col gap-12 sm:gap-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="grid sm:grid-cols-3 items-center"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Alternating Every 2nd Project */}
            {index % 2 === 0 ? (
              <>
                {/* Description → Image */}
                <div
                  className={`flex flex-col justify-center items-center p-10 ${isDarkMode ? project.darkModeBg : project.lightModeBg}`}
                  style={{ width: "400px", height: "400px", marginLeft: "10%", position: "relative" }}
                >
                  <p className={`font-playfair font-bold text-2xl text-center ${isDarkMode ? project.darkTextColor : project.lightTextColor}`}>
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="absolute bottom-4 flex justify-end w-full pr-4 space-x-3">
                    {project.links.map((link, idx) => (
                      <a key={idx} href={link.href} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-300">
                        {typeof link.icon === "function" ? link.icon(isDarkMode) : link.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Image with Hover Effect */}
                <div className="relative col-span-2 bg-gray-200" style={{ width: "800px", height: "400px", marginLeft: "5%" }}>
                  <div
                    className={`absolute h-full w-full opacity-0 hover:opacity-90 transition duration-500 
  ${isDarkMode ? "bg-white text-black" : "bg-black text-white"} 
  z-30 flex flex-col justify-center items-center text-center p-16`}
                  >
                    <p className="text-2xl font-playfair">{project.title}</p>
                    <p className="mt-7">{project.hoverText}</p>
                  </div>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
              </>
            ) : (
              <>
                {/* Image → Description */}
                <div className="relative col-span-2 bg-gray-200" style={{ width: "800px", height: "400px", marginRight: "5%" }}>
                  <div
                    className={`absolute h-full w-full opacity-0 hover:opacity-90 transition duration-500 
  ${isDarkMode ? "bg-white text-black" : "bg-black text-white"} 
  z-30 flex flex-col justify-center items-center text-center p-16`}
                  >
                    <p className="text-2xl font-playfair">{project.title}</p>
                    <p className="mt-7">{project.hoverText}</p>
                  </div>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <div
                  className={`flex flex-col justify-center items-center p-10 ${isDarkMode ? project.darkModeBg : project.lightModeBg}`}
                  style={{ width: "400px", height: "400px", marginRight: "10%", position: "relative" }}
                >
                  <p className={`font-playfair font-bold text-2xl text-center ${isDarkMode ? project.darkTextColor : project.lightTextColor}`}>
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="absolute bottom-4 flex justify-end w-full pr-4 space-x-3">
                    {project.links.map((link, idx) => (
                      <a key={idx} href={link.href} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-300">
                        {typeof link.icon === "function" ? link.icon(isDarkMode) : link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;