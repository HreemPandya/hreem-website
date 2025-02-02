import { useState } from "react"; // Import useState for popup
import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";

const Contact = ({ isDarkMode }) => {
  const [submitted, setSubmitted] = useState(false); // State for popup

  const inputBackground = isDarkMode ? "bg-[#FFF176]" : "bg-[#A7C7C7]"; // Yellow in dark mode, muted teal in light mode
  const buttonBackground = isDarkMode ? "bg-[#2F855A]" : "bg-[#E76F51]"; // Green in dark mode, red in light mode
  const textColor = isDarkMode ? "text-black" : "text-white"; // Text should contrast with background

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Show success message
    setTimeout(() => setSubmitted(false), 3000); // Hide after 3 sec

    e.target.submit(); // ✅ Submit the form after showing popup
  };

  return (
    <section
      id="contact"
      className={`pt-32 pb-16 transition-colors duration-300 ${
        isDarkMode ? "bg-[#010026] text-white" : "bg-[#F5E6D3] text-gray-800"
      }`}
    >
      {/* HEADER */}
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
        <p className="font-playfair font-semibold text-4xl">
          <span className={isDarkMode ? "text-green-300" : "text-[#E76F51]"}>
            WANT TO CONNECT?
          </span>{" "}
          <span className={isDarkMode ? "text-white" : "text-black"}>
            LET'S DO IT!
          </span>
        </p>
        <div className="flex justify-center mt-5">
          <LineGradient width="w-2/3" />
        </div>
      </motion.div>

      {/* FORM */}
      <div className="flex justify-center mt-10 relative">
        <motion.form
          action="https://formsubmit.co/hreempandya@gmail.com"
          method="POST"
          className="w-3/5 flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
          onSubmit={handleSubmit} // Call the handleSubmit function
        >
          {/* Hidden Inputs for FormSubmit */}
          <input type="hidden" name="_captcha" value="false" /> {/* ✅ Disable Captcha */}
          <input type="hidden" name="_next" value="https://hreempandya.github.io/hreem-website/" /> {/* ✅ Redirect after submission */}

          {/* Form Inputs */}
          <input
            className={`${inputBackground} text-black placeholder-gray-700 font-semibold w-full p-3 focus:outline-none rounded-lg`}
            type="text"
            name="name"
            placeholder="NAME"
            required
          />
          <input
            className={`${inputBackground} text-black placeholder-gray-700 font-semibold w-full p-3 focus:outline-none rounded-lg`}
            type="email"
            name="email"
            placeholder="EMAIL"
            required
          />
          <textarea
            className={`${inputBackground} text-black placeholder-gray-700 font-semibold w-full p-3 focus:outline-none rounded-lg`}
            name="message"
            placeholder="MESSAGE"
            rows="4"
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className={`${buttonBackground} ${textColor} font-semibold p-3 mt-5 rounded-lg hover:opacity-80 transition duration-300`}
          >
            SEND ME A MESSAGE
          </button>
        </motion.form>

        {/* SUCCESS MESSAGE POPUP */}
        {submitted && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-[-50px] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            ✅ Your message has been sent!
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
