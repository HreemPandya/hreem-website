import SocialMediaIcons from "../components/SocialMediaIcons";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Landing = ({ setSelectedPage }) => {
  return (
    <section
      id="home"
      className="md:flex md:justify-between md:items-center gap-16 md:h-full py-10"
    >
      {/* IMAGE SECTION */}
<div className="basis-3/5 z-10 mt-1 md:mt-8 flex justify-center md:order-2">
  <div
    className="relative z-0 ml-20 w-full max-w-[400px] md:max-w-[600px] mask-image"
  >
    <img
      alt="profile"
      className="w-full h-full object-cover"
      src="assets/profile-image.png"
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
          {/* New "Hi, I'm" text */}
          <p className="text-4xl font-playfair text-white text-center md:text-start mb-2">
            Hi, I'm
          </p>

          {/* Main heading */}
          <p className="text-6xl font-playfair z-10 text-center md:text-start">
            Hreem {""}
            <span
              className="relative text-deep-blue font-semibold z-20 before:content-brush
    before:absolute before:-left-[43px] before:-top-[141px] before:bg-contain before:bg-no-repeat before:z-[-1]"
            >
              Pandya
            </span>


          </p>

          <p className="mt-10 mb-7 text-sm text-center md:text-start">
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
          {/* Contact Me Button */}
          <AnchorLink
            className="bg-gradient-to-r from-green-400 to-green-600 text-deep-blue rounded-sm py-3 px-7 font-semibold
              hover:bg-green-500 hover:text-white transition duration-500"
            onClick={() => setSelectedPage("contact")}
            href="#contact"
          >
            Contact Me
          </AnchorLink>

          {/* Let's Talk Button */}
          <AnchorLink
            className="rounded-r-sm bg-gradient-to-r from-green-400 to-green-600 py-0.5 pr-0.5"
            onClick={() => setSelectedPage("contact")}
            href="#contact"
          >
            <div className="bg-deep-blue hover:text-yellow transition duration-500 w-full h-full flex items-center justify-center px-10 font-playfair border-2 border-transparent hover:border-green-500">
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
          <SocialMediaIcons />
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;
