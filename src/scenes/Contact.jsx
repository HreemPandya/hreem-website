import { useState } from "react";
import { motion } from "framer-motion";

const Contact = ({ isDarkMode }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      id="contact"
      className={`pt-32 md:pt-48 pb-16 md:pb-32 transition-colors duration-300 ${isDarkMode ? "bg-transparent" : "bg-transparent"} relative overflow-hidden`}
    >
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* ENHANCED HEADER */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className={`backdrop-blur-xl rounded-3xl p-6 md:p-10 border max-w-4xl mx-auto relative overflow-hidden ${isDarkMode ? 'bg-[#111827] border-white/[0.06]' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] shadow-lg'}`}>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`inline-flex items-center gap-2 md:gap-3 backdrop-blur-lg rounded-full px-4 py-2 md:px-6 md:py-3 border mb-4 md:mb-6 ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/40 border-gray-200/40'}`}
              >
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
                <span className={`text-xs md:text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-[var(--lm-text-muted)]'}`}>Available for new opportunities</span>
              </motion.div>

              <motion.h1 
                className="font-playfair font-bold text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className={isDarkMode ? 'text-amber-500' : 'text-[#4A6B4E]'}>
                  Let's Create
                </span>
                <br />
                <span className={isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}>
                  Something Amazing
                </span>
              </motion.h1>

              <motion.div 
                className={`w-24 h-[2px] md:w-32 rounded-full mx-auto mb-6 md:mb-8 ${isDarkMode ? 'bg-amber-500/60' : 'bg-[#4A6B4E]/60'}`}
                initial={{ width: 0 }}
                whileInView={{ width: window.innerWidth < 768 ? 96 : 128 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              <motion.p 
                className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Ready to bring ideas to life? Whether it's a collaboration, project opportunity, or just to say hello, I'd love to hear from you 😄!
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ENHANCED FORM CONTAINER - Stack on mobile */}
        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Contact Form - Full width on mobile, 3 columns on desktop */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className={`backdrop-blur-xl rounded-3xl border p-6 md:p-8 transition-all duration-500 relative overflow-hidden ${isDarkMode ? 'bg-[#111827] border-white/[0.06]' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] hover:border-[var(--lm-accent)]/30 shadow-lg'}`}>
              {isDarkMode && <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] via-transparent to-transparent" />}
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-amber-500/20' : 'bg-[#4A6B4E]/20'}`}>
                    <svg className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-amber-400' : 'text-[#4A6B4E]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className={`text-xl md:text-2xl font-playfair font-bold ${isDarkMode ? 'text-amber-500' : 'text-[#4A6B4E]'}`}>
                    Send me a message
                  </h2>
                </div>

                <form
                  action="https://formsubmit.co/hreempandya@gmail.com"
                  method="POST"
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* Hidden Inputs for FormSubmit */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://hreempandya.github.io/hreem-website/" />

                  {/* Name and Email Row - Stack on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <motion.div
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <label className={`block text-sm font-semibold mb-2 md:mb-3 ${isDarkMode ? 'text-amber-500' : 'text-[#4A6B4E]'}`}>
                        Your Name *
                      </label>
                      <input
                        className={`w-full p-3 md:p-4 backdrop-blur-lg border rounded-xl font-medium focus:outline-none transition-all duration-300 ${isDarkMode ? 'bg-[#111827] border-white/[0.08] text-[#F0F4F8] placeholder-[#8B9DB0] focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] text-[var(--lm-text-primary)] placeholder-[var(--lm-text-muted)] focus:border-[var(--lm-accent)]/50 focus:ring-1 focus:ring-[var(--lm-accent)]/20'}`}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </motion.div>

                    <motion.div
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <label className={`block text-sm font-semibold mb-2 md:mb-3 ${isDarkMode ? 'text-amber-500' : 'text-[#4A6B4E]'}`}>
                        Email Address *
                      </label>
                      <input
                        className={`w-full p-3 md:p-4 backdrop-blur-lg border rounded-xl font-medium focus:outline-none transition-all duration-300 ${isDarkMode ? 'bg-[#111827] border-white/[0.08] text-[#F0F4F8] placeholder-[#8B9DB0] focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] text-[var(--lm-text-primary)] placeholder-[var(--lm-text-muted)] focus:border-[var(--lm-accent)]/50 focus:ring-1 focus:ring-[var(--lm-accent)]/20'}`}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Message Field */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <label className={`block text-sm font-semibold mb-2 md:mb-3 ${isDarkMode ? 'text-amber-500' : 'text-[#4A6B4E]'}`}>
                      Your Message *
                    </label>
                    <textarea
                      className={`w-full p-3 md:p-4 backdrop-blur-lg border rounded-xl font-medium focus:outline-none transition-all duration-300 resize-none ${isDarkMode ? 'bg-[#111827] border-white/[0.08] text-[#F0F4F8] placeholder-[#8B9DB0] focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] text-[var(--lm-text-primary)] placeholder-[var(--lm-text-muted)] focus:border-[var(--lm-accent)]/50 focus:ring-1 focus:ring-[var(--lm-accent)]/20'}`}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, ideas, or just say hello! I'd love to hear from you..."
                      rows={window.innerWidth < 768 ? "4" : "6"}
                      required
                    ></textarea>
                  </motion.div>

                  {/* Enhanced Submit Button */}
                  <motion.button
                    type="submit"
                    className={`w-full font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all duration-200 ${isDarkMode ? 'bg-amber-500 text-[#07090D]' : 'text-white'}`}
                    style={!isDarkMode ? { backgroundColor: '#4A6B4E' } : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2 md:gap-3">
                      Send Message
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  </motion.button>
                </form>

                {/* SUCCESS MESSAGE POPUP */}
                {submitted && (
                  <motion.div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl shadow-2xl border border-green-400/30 backdrop-blur-lg z-50"
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold text-sm md:text-base">Message sent successfully!</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Info Sidebar - Full width on mobile, 2 columns on desktop */}
          <motion.div
            className="lg:col-span-2 space-y-4 md:space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            {/* Contact Info Header */}
            <div className={`backdrop-blur-xl rounded-2xl p-4 md:p-6 border transition-all duration-300 ${isDarkMode ? 'bg-[#111827] border-white/[0.06]' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] hover:border-[var(--lm-accent)]/30 shadow-lg'}`}>
              <h3 className={`text-lg md:text-xl font-playfair font-bold mb-3 md:mb-4 ${isDarkMode ? 'text-amber-500' : 'text-[#4A6B4E]'}`}>
                Get in Touch
              </h3>
              <p className={`leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-[#8B9DB0]' : 'text-[var(--lm-text-muted)]'}`}>
                I'm always open to discussing new opportunities, creative projects, or just having a friendly chat about tech!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3 md:space-y-4">
              {/* Email Card */}
              <motion.a
                href="mailto:hreempandya@gmail.com"
                className={`backdrop-blur-xl rounded-xl p-4 md:p-5 border transition-all duration-300 group cursor-pointer block ${isDarkMode ? 'bg-[#111827] border-white/[0.06] hover:border-amber-500/20' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] hover:border-[#4A6B4E]/30 hover:scale-[1.02] shadow-lg'}`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-[#4A6B4E]/20'}`}>
                    <svg className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-amber-400' : 'text-[#4A6B4E]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'}`}>Email</h4>
                    <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-[var(--lm-text-muted)]'}`}>hreempandya@gmail.com</p>
                  </div>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div
                className={`backdrop-blur-xl rounded-xl p-4 md:p-5 border transition-all duration-300 group cursor-pointer ${isDarkMode ? 'bg-[#111827] border-white/[0.06] hover:border-amber-500/20' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] hover:border-[#4A6B4E]/30 hover:scale-[1.02] shadow-lg'}`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-[#4A6B4E]/20'}`}>
                    <svg className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-amber-400' : 'text-[#4A6B4E]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-[var(--lm-text-primary)]'}`}>Location</h4>
                    <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-[var(--lm-text-muted)]'}`}>Waterloo, Ontario, Canada</p>
                  </div>
                </div>
              </motion.div>

              {/* Response Time Card */}
              <motion.div
                className={`backdrop-blur-xl rounded-xl p-4 md:p-5 border transition-all duration-300 group cursor-pointer ${isDarkMode ? 'bg-[#111827] border-white/[0.06] hover:border-amber-500/20' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] hover:border-[#4A6B4E]/30 hover:scale-[1.02] shadow-lg'}`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-[var(--lm-accent)]/20 text-[var(--lm-accent)]'}`}>
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm md:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Response Time</h4>
                    <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Usually within 24 hours</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className={`backdrop-blur-xl rounded-2xl p-4 md:p-6 border transition-all duration-300 ${isDarkMode ? 'bg-[#111827] border-white/[0.06]' : 'bg-[var(--lm-bg-surface)] border-[var(--lm-border)] hover:border-[var(--lm-accent)]/30 shadow-lg'}`}>
              <h4 className={`font-semibold mb-3 md:mb-4 text-sm md:text-base ${isDarkMode ? 'text-[#F0F4F8]' : 'text-[var(--lm-text-primary)]'}`}>Connect with me</h4>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {[
                  { href: "https://www.linkedin.com/in/hreem-pandya-7b74a0275/", icon: "linkedin", color: "from-cyan-400 to-blue-500", label: "LinkedIn" },
                  { href: "https://github.com/HreemPandya", icon: "github", color: "from-gray-600 to-gray-800", label: "GitHub" },
                  { href: "https://x.com/HreemPandya", icon: "x", color: "from-gray-800 to-black", label: "X" },
                  { href: "https://www.instagram.com/hreempandya", icon: "instagram", color: "from-pink-500 to-purple-600", label: "Instagram" }
                ].map((social, index) => (
                  <motion.a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg transition-all duration-300 text-xs md:text-sm font-medium ${
                      isDarkMode
                        ? 'bg-white/[0.04] border border-white/[0.06] text-[#8B9DB0] hover:bg-white/[0.08] hover:text-[#F0F4F8] hover:border-amber-500/20'
                        : 'bg-[var(--lm-accent-muted)] border border-[var(--lm-border)] text-[var(--lm-accent)] hover:bg-[var(--lm-accent)]/20 hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon === 'linkedin' && (
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {social.icon === 'github' && (
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {social.icon === 'x' && (
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                      </svg>
                    )}
                    <span className="text-xs hidden sm:inline">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;