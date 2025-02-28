import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";

const AboutMe = ({ isDarkMode }) => {
  return (
    <section id="about me" className={`pt-32 pb-16 relative transition-colors duration-300 ${isDarkMode ? 'bg-[#010026] text-white' : 'bg-[#F5E6D3] text-gray-800'}`}>
      {/* HEADING */}
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
        style={{
          marginLeft: "-4px",
        }}
      >
        <p className={`font-playfair font-semibold text-4xl mb-2 text-center ${isDarkMode ? 'text-green-300' : 'text-[#E76F51]'}`}>
          ABOUT ME
        </p>
        <div className="flex justify-center">
          <LineGradient width="w-1/3" />
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-8 mt-10">
        {/* LEFT SECTION: MY DRAWINGS */}
        <motion.div
          className="flex flex-col items-center gap-6 w-full md:w-1/3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {/* Label */}
          <h2 className={`font-playfair text-xl mb-5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>My Drawings</h2>

          {/* Images */}
          <div className="flex flex-col items-center gap-4">
            {/* Drawing 1 (Smallest) */}
            <div className={`w-36 h-28 bg-gray-400 flex items-center justify-center border-4 ${isDarkMode ? 'border-green-500' : 'border-[#E76F51]'} hover:scale-110 transition-transform duration-300`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/drawing1.png`}
                alt="Drawing 1"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Drawing 2 (Medium) */}
            <div className={`w-48 h-36 bg-gray-400 flex items-center justify-center border-4 ${isDarkMode ? 'border-green-500' : 'border-[#E76F51]'} hover:scale-110 transition-transform duration-300`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/drawing2.png`}
                alt="Drawing 2"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Drawing 3 (Largest) */}
            <div className={`w-56 h-44 bg-gray-400 flex items-center justify-center border-4 ${isDarkMode ? 'border-green-500' : 'border-[#E76F51]'} hover:scale-110 transition-transform duration-300`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/drawing3.png`}
                alt="Drawing 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SECTION: PARAGRAPH */}
        <motion.div
          className="relative w-full md:w-2/3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          style={{
            top: "calc(-150px)",
          }}
        >
          <div
            className={`p-6 rounded-lg shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1E2A47] text-white' : 'bg-[#E6D3C1] text-gray-900'}`}
            style={{
              height: "auto",
            }}
          >
            <p className="text-xl font-light leading-8">
              🎨 <strong>Creative Beyond Code </strong> - I know it’s hard to
              believe, but I do enjoy other things besides computer engineering
              and programming in general. I am an avid artist and love to draw
              digitally. I initially started with sketches on paper, and to be
              honest, they hold a special place in my heart. ✏️ Something about
              bringing life and realism to paper with just a pencil is so
              thrilling.
              <br />
              <br />
              🖌️ However, I eventually transitioned more toward digital art. It
              allows for different ideas to be tested easily on one platform,
              not to mention the simplicity of adding colors. You
              can see some of my drawings, both sketched and digital (the middle
              one being a cartoon of me drawn when I was just 14).
              <br />
              <br />
              🏋️ <strong>Fitness Enthusiast </strong>- I love to work out
              (although, in making this website, I may or may not have skipped a
              week or two 😅).
              <br />
              <br />
              🍴 <strong>Foodie Extraordinaire </strong>- What’s better than
              completely destroying my workout regime by being a foodie? Because
              that is what I am as well. I love trying out new foods, especially
              from different cultures and cuisines.
              <br />
              <br />
              🏓 <strong>Sports Lover </strong>- I’m also really into ping pong
              🏓, badminton 🏸, and swimming 🏊. I almost achieved my bronze
              medallion before COVID hit!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
