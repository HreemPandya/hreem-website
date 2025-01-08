import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";

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
      "Crisis Compass: Developed at NewHacks 2024, this web application helps first responders and volunteers prioritize and manage emergencies by aggregating real-time data from social media, news, and other sources. Repo and Video Below!",
    hoverText: "Using PowerShell automation, the tool ranks emergencies by analyzing type, location, and critical keywords, ensuring resources are dispatched effectively to the most urgent situations. A responsive React interface provides real-time data aggregation from social media and news sources, displaying incidents on an organized dashboard with urgency badges and severity icons for clear situational awareness. The inspiration for this project came from personal experiences of my team members, including my own memory of being stranded during a flash flood as a child. I vividly recall sitting on a table in a flooded market with my dad, fearing whether first responders would arrive in time. That sense of helplessness is something no one should endure. Recognizing that emergency delays are often due to resource constraints and overwhelming demand, we developed CrisisCompass to help first responders allocate units more effectively, reducing fear and uncertainty for those in need and saving more lives.",
    image: "../assets/project-1.png",
    bgColor: "bg-green-900",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "SecureEdu",
    description:
      "SecureEdu: Designed and developed a secure learning platform to encrypt and transmit educational materials such as textbook sections and quiz solutions, enabling a progressive hint-based learning system. Repo Below!",
    hoverText: "The microcontrollers uses AES encryption to secure solutions and integrates Diffie-Hellman Key Exchange for secure communication and key distribution. Hardware peripherals, including UART, I2C, and GPIO, were configured to integrate an LCD display for real-time feedback and a 4x4 keypad for secure input of access keys. The inspiration for this project came from my partner and me noticing how readily visible textbook solutions often disrupt genuine learning. We found ourselves working backward from solutions instead of attempting problems independently, which hindered our understanding. SecureEdu addresses this by encrypting solutions and allowing students to unlock hints step-by-step, helping them engage with problems more thoughtfully and learn the steps required to solve them.The project was not without challenges. It was my first time using STM32IDE, which involved a steep learning curve in navigating a new development environment and programming in C for a full-scale project. Wiring and configuring hardware components like the LCD display and 4x4 keypad were entirely new experiences",
    image: "../assets/project-2.png",
    bgColor: "bg-yellow",
    textColor: "text-black",
  },
  {
    id: 3,
    title: "NASH Weather",
    description:
      "NASH Weather: A website that recommends indoor or outdoor activities in your local area based on real-time weather conditions. Repo Below!",
    hoverText: "One of my first hackathons was a website that recommended indoor or outdoor activities in your local area based on real-time weather conditions. It also marked my first encounter with Flask. To learn it I stumbled upon a FreeCodeCamp YouTube video explaining it and binged it. The real adventure began when I started working with the weather APIs. I spent almost eight straight hours trying to figure out how to integrate the API data with the back-end logic for recommending activities. Desperate for energy and answers, 15-year-old me decided to try black coffee for the first time. Bold move, right? Well, it backfired spectacularly. I did figure out the solution about 20 minutes after drinking the coffee, but I also spent the rest of the night wide awake questioning my life choices. My family didn’t sleep either, probably because I wouldn’t stop pacing around. Despite the caffeine-induced chaos, this hackathon taught me one of the most valuable lessons of my tech journey: persistence beats frustration. Whether you’re wrestling with a new programming language or building something you’ve never attempted before, patience (not coffee) is the real MVP. ",
    image: "../assets/project-3.png",
    bgColor: "bg-green-900",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "RingSense",
    description:
      "RingSense: Co-founded a small business specializing in affordable, custom-designed resin rings. As VP of Sales, I was in charge of developing marketing strategies, managing social media campaigns to build brand awareness, and overseeing product promotions. Instagram of Company to the Right!",
    hoverText: "This experience closely tied into another interest of mine aside from computer engineering; business and strategy. This role was particularly meaningful to me as it combined my passion for merging technology with business strategy. Being unanimously selected as VP of Sales by the company was both enlightening and pressure-filled, as it placed the responsibility of driving sales and managing a team of 12 on my shoulders. While developing the website came naturally, leading a larger team and making executive decisions was a steep learning curve. I’ll admit, some of my early calls didn’t pan out as expected, but those experiences became invaluable lessons. I quickly realized that a strong, cooperative team directly impacts the quality of results. By fostering collaboration and aligning our efforts, we secured multiple pop-up venues, developed detailed business plans and shareholder reports, and achieved a positive return on investment. This experience taught me that effective leadership and internal synergy are the foundation for achieving meaningful business outcomes",
    image: "../assets/project-4.png",
    bgColor: "bg-yellow",
    textColor: "text-black",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="pt-48 pb-48">
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
            <span className="text-green-300">PRO</span>JECTS
          </p>
          <div className="flex justify-center mt-5">
            <LineGradient width="w-2/3" />
          </div>
        </div>
        <p className="mt-10 mb-10">
          Below are some of the projects I worked on and the skills I
          learned while working on them. Feel free to take a look at them further through the corresponding links!
        </p>
      </motion.div>

      {/* PROJECTS */}
      <div className="flex flex-col gap-12 sm:gap-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`grid sm:grid-cols-3 items-center`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {index % 2 === 0 ? (
              <>
                {/* Square (Description) */}
                <div
                  className={`flex flex-col justify-center items-center p-10 ${project.bgColor}
                  text-2xl font-playfair font-semibold ${project.textColor}`}
                  style={{
                    width: "400px",
                    height: "400px",
                    marginLeft: "10%",
                    position: "relative",
                  }}
                >
                  {project.description}
                  {project.id === 1 && (
                    <div className="absolute bottom-4 flex justify-end w-full pr-4">
                      <a
                        href="https://github.com/HreemPandya/Crisis-Compass"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="assets/gitlogo.png"
                          alt="GitHub"
                          className="w-8 h-8 transition-transform duration-300 hover:scale-110"
                        />
                      </a>
                      <a
                        href="https://www.youtube.com/watch?v=pfCfrTvsKqc"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="assets/youtube.png"
                          alt="YouTube"
                          className="w-8 h-8 transition-transform duration-300 hover:scale-110"
                        />
                      </a>
                    </div>
                  )}
                  {project.id === 3 && (
                    <div className="absolute bottom-4 flex justify-end w-full pr-4">
                      <a
                        href="https://github.com/HreemPandya/NASH-Weather"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="assets/gitlogo.png"
                          alt="GitHub"
                          className="w-8 h-8 transition-transform duration-300 hover:scale-110"
                        />
                      </a>
                    </div>
                  )}
                </div>
                {/* Rectangle (Image with Hover Text) */}
                <div
                  className="relative col-span-2 bg-gray-200"
                  style={{
                    width: "800px",
                    height: "400px",
                    marginLeft: "5%",
                  }}
                >
                  <div
                    className="absolute h-full w-full opacity-0 hover:opacity-90 transition duration-500
                    bg-white z-30 flex flex-col justify-center items-center text-center p-16 text-black"
                  >
                    <p className="text-2xl font-playfair">{project.title}</p>
                    <p className="mt-7">{project.hoverText}</p>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Rectangle (Image with Hover Text) */}
                <div
                  className="relative col-span-2 bg-gray-200"
                  style={{
                    width: "800px",
                    height: "400px",
                    marginRight: "5%",
                  }}
                >
                  <div
                    className="absolute h-full w-full opacity-0 hover:opacity-90 transition duration-500
                    bg-white z-30 flex flex-col justify-center items-center text-center p-16 text-black"
                  >
                    <p className="text-2xl font-playfair">{project.title}</p>
                    <p className="mt-7">{project.hoverText}</p>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Square (Description) */}
                <div
                  className={`flex flex-col justify-center items-center p-10 ${project.bgColor}
                  text-2xl font-playfair font-semibold ${project.textColor}`}
                  style={{
                    width: "400px",
                    height: "400px",
                    marginRight: "10%",
                    position: "relative",
                  }}
                >
                  {project.description}
                  {project.id === 2 && (
                    <div className="absolute bottom-4 flex justify-end w-full pr-4">
                      <a
                        href="https://github.com/HreemPandya/SecureEdu"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="assets/gitlogo.png"
                          alt="GitHub"
                          className="w-8 h-8 transition-transform duration-300 hover:scale-110"
                        />
                      </a>
                    </div>
                  )}
                  {project.id === 4 && (
                    <div className="absolute bottom-4 flex justify-end w-full pr-4">
                      <a
                        href="https://www.instagram.com/ringsense.yyc/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src="assets/instagram1.png"
                          alt="Instagram"
                          className="w-8 h-8 transition-transform duration-300 hover:scale-110"
                        />
                      </a>
                    </div>
                  )}
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
