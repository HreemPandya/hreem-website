import { useState } from "react";
import { motion } from "framer-motion";
import SocialMediaIcons from "../components/SocialMediaIcons";

const Contact = ({ isDarkMode }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    e.target.submit();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputBase = `w-full py-3 border-b bg-transparent focus:outline-none transition-colors placeholder:opacity-50 ${
    isDarkMode
      ? "border-white/[0.1] text-white placeholder-[#8B9DB0] focus:border-amber-500/60"
      : "border-[var(--lm-border)] text-[var(--lm-text-primary)] placeholder-[var(--lm-text-muted)] focus:border-[var(--lm-accent)]/60"
  }`;

  return (
    <section
      id="contact"
      className={`pt-12 md:pt-20 pb-20 md:pb-32 transition-colors duration-300 relative overflow-hidden`}
    >
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6">
        {/* Minimal header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            className={`font-mono text-xs uppercase tracking-[0.2em] mb-2 ${
              isDarkMode ? "text-amber-500/70" : "text-[var(--lm-accent)]/70"
            }`}
          >
            Contact
          </p>
          <h1
            className={`font-playfair text-2xl md:text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"
            }`}
          >
            Get in touch
          </h1>
          <div
            className={`mt-3 w-12 h-[1px] ${
              isDarkMode ? "bg-amber-500/60" : "bg-[var(--lm-accent)]/60"
            }`}
          />
        </motion.div>

        {/* Simple form — no box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p
            className={`text-sm md:text-base mb-8 ${
              isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"
            }`}
          >
            Have a project in mind or just want to say hello? Drop a message.
          </p>

          <form
            action="https://formsubmit.co/hreempandya@gmail.com"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value="https://hreempandya.github.io/hreem-website/"
            />

            <div>
              <input
                className={inputBase}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <input
                className={inputBase}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <textarea
                className={`${inputBase} resize-none min-h-[120px]`}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message"
                rows={4}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <motion.button
                type="submit"
                className={`px-5 py-2.5 rounded-full font-medium text-sm border transition-colors ${
                  isDarkMode
                    ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                    : "border-[var(--lm-accent)]/40 text-[var(--lm-accent)] hover:bg-[var(--lm-accent)]/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send message
              </motion.button>
              {submitted && (
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"
                  }`}
                >
                  Sent!
                </span>
              )}
            </div>
          </form>
        </motion.div>

        {/* Email + social — inline, no boxes */}
        <motion.div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{
            borderColor: isDarkMode ? "rgba(255,255,255,0.06)" : "var(--lm-border)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="mailto:hreempandya@gmail.com"
            className={`font-medium text-sm hover:opacity-80 transition-opacity ${
              isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"
            }`}
          >
            hreempandya@gmail.com
          </a>
          <div className="-my-6 md:-my-4">
              <SocialMediaIcons isDarkMode={isDarkMode} forceWhite={isDarkMode} />
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
