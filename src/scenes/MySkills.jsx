import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";

const MySkills = () => {
  const languages = [
    { name: "JavaScript", image: "assets/js.png", hoverText: "Did a Udemy course on this... Best $30 ever spent 🤪🤪" },
    { name: "Python", image: "assets/python.png", hoverText: "i luv u python 💙" },
    { name: "C++", image: "assets/c++.png", hoverText: "ECE150 Course, My intro to C++ programming. Tell me why it did not feel like an intro..." },
    { name: "C", image: "assets/c.png", hoverText: "Fun fact: Programmed my STM32 project in C!" },
    { name: "Java", image: "assets/java.png", hoverText: "i luv you a bit less then python ❤️‍🩹" },
    { name: "SQL", image: "assets/sql.png", hoverText: "Arguably took me the longest to get a grasp of, dont ask me why" },
    { name: "HTML", image: "assets/html.png", hoverText: "i never used the < and > buttons this much in my life" },
    { name: "CSS", image: "assets/css.png", hoverText: "I used a LOT of this for the portfolio (but Tailwind 😉)" },
  ];

  const tools = [
    { name: "React", image: "assets/react.png", hoverText: "IMO this has one of the best logos of any tools" },
    { name: "Git", image: "assets/git.png", hoverText: "Version control... the good old days..." },
    { name: "GitHub", image: "assets/github.png", hoverText: "i need... commits." },
    { name: "VS Code", image: "assets/vscode.png", hoverText: "Monokai Pro Extension has the best color scheme, don't argue with me" },
    { name: "Intellij", image: "assets/intellij.png", hoverText: "My first IDE ever installed, believe it or not " },
    { name: "Pycharm", image: "assets/pycharm.png", hoverText: "I went from using IDLE to this... I was appalled" },
    { name: "GitLab", image: "assets/gitlab.png", hoverText: "I luv this for version control management" },
    { name: "PowerShell", image: "assets/powershell.png", hoverText: "Ever since I got a Windows Laptop... this probably single-handedly caused my screen time to go up" },
  ];

  return (
    <section id="skills" className="pt-2 pb-16">
      {/* HEADER */}
      <div className="md:flex md:justify-between md:gap-16 mt-8">
        <motion.div
          className="md:w-1/3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <p className="font-playfair font-semibold text-4xl mb-4">
            MY <span className="text-green-300">SKILLS</span>
          </p>
          <LineGradient width="w-1/3" />
          <p className="mt-4 mb-4">
            Below is a categorized list of the programming languages and tools
            I have experience with. Each of them hold a place in my heart. Some dear to me... some not. Hover over them to learn my relationship which each of these skills
          </p>
        </motion.div>
      </div>

      {/* LANGUAGES AND TOOLS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        {/* Languages */}
        <div>
          <h3 className="font-playfair font-semibold text-2xl text-green-300 mb-4">
            Programming Languages
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <div
                  className="relative w-24 h-24 flex flex-col items-center justify-center rounded-full border-2 border-green-300 bg-deep-blue text-center transition-transform duration-300 group-hover:scale-110 group-hover:blur-md shadow-lg"
                >
                  <img
                    alt={language.name}
                    src={language.image}
                    className="w-10 h-10 object-contain"
                  />
                  <p className="font-playfair font-semibold text-xs text-white mt-2">
                    {language.name}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-playfair font-bold opacity-0 group-hover:opacity-100">
                  {language.hoverText}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="font-playfair font-semibold text-2xl text-green-300 mb-4">
            Technologies & Tools
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <div
                  className="relative w-24 h-24 flex flex-col items-center justify-center rounded-full border-2 border-green-300 bg-deep-blue text-center transition-transform duration-300 group-hover:scale-110 group-hover:blur-md shadow-lg"
                >
                  <img
                    alt={tool.name}
                    src={tool.image}
                    className="w-10 h-10 object-contain"
                  />
                  <p className="font-playfair font-semibold text-xs text-white mt-2">
                    {tool.name}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-playfair font-bold opacity-0 group-hover:opacity-100">
                  {tool.hoverText}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySkills;
