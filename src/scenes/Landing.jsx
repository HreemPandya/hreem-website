import React from 'react';
import SocialMediaIcons from "../components/SocialMediaIcons";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Landing = ({ setSelectedPage, isDarkMode }) => {
  // Theme variables
  const backgroundColor = isDarkMode ? 'bg-deep-blue' : 'bg-[#F5E6D3]';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';

  return (
    <section
      id="home"
      className={`${backgroundColor} md:flex md:justify-between md:items-center gap-16 md:h-full py-10 transition-colors duration-300 pt-32`}
    >
      {/* IMAGE SECTION */}
      <div className="basis-3/5 z-10 mt-16 md:mt-24 flex justify-center md:order-2">
        <div className="relative z-0 ml-20 w-full max-w-[400px] md:max-w-[600px] mask-image">
          <img
            alt="profile"
            className="w-full h-full object-cover"
            src={`${process.env.PUBLIC_URL}/assets/light-mode-pic.png`}
          />
        </div>
      </div>

      {/* MAIN TEXT */}
      <div className="z-30 basis-2/5 mt-12 md:mt-32">
        {/* HEADINGS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <p className={`text-4xl font-playfair ${textColor} text-center md:text-start mb-2`}>
            Hi, I'm
          </p>

          <p className={`text-6xl font-playfair z-10 text-center md:text-start ${textColor}`}>
            Hreem {""}
            <span className={`relative font-semibold z-10 
                before:absolute before:-left-[47px] before:-top-[130px] before:w-[350px] before:h-[350px] before:bg-contain before:bg-no-repeat before:z-[-1]
                after:absolute after:-left-[27px] after:-top-[0px] after:w-[300px] after:h-[100px] after:bg-contain after:bg-no-repeat after:z-[-1]
                ${isDarkMode
                ? "before:bg-green-brush text-deep-blue after:hidden"
                : "after:bg-red-brush text-gray-800 before:hidden"
              }`}>
              Pandya
            </span>
          </p>

          <p className={`mt-10 mb-7 text-sm text-center md:text-start ${textColor}`}>
            An aspiring computer engineer passionate about AI, quantum computing, and web development, I love creating innovative solutions that blend hardware and software seamlessly.
          </p>
        </motion.div>

        {/* CALL TO ACTIONS */}
        <motion.div
          className="flex mt-5 justify-center md:justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <AnchorLink
            className={`${isDarkMode ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-[#E76F51] to-[#E76F51]'} text-deep-blue rounded-sm py-3 px-7 font-semibold hover:opacity-90 transition duration-500`}
            onClick={() => setSelectedPage("contact")}
            href="#contact"
          >
            Contact Me
          </AnchorLink>

          <AnchorLink
            className={`rounded-r-sm ${isDarkMode ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-[#E76F51] to-[#E76F51]'} py-0.5 pr-0.5`}
            onClick={() => setSelectedPage("contact")}
            href="#contact"
          >
            <div className={`${backgroundColor} ${isDarkMode ? "hover:text-yellow" : "hover:text-[#E76F51]"} transition duration-500 w-full h-full flex items-center justify-center px-10 font-playfair ${textColor}`}>
              Let's talk.
            </div>


          </AnchorLink>
        </motion.div>

        <motion.div
          className="flex mt-5 justify-center md:justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <SocialMediaIcons isDarkMode={isDarkMode} forceWhite={isDarkMode} />
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;