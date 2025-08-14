import { useState } from "react";
import LineGradient from "../components/LineGradient";
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
      className={`pt-48 pb-32 transition-colors duration-300 ${isDarkMode ? "bg-transparent" : "bg-transparent"} relative overflow-hidden`}
    >
      {/* Enhanced Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
             style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className={`absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
             style={{ animationDelay: '4s', animationDuration: '6s' }} />
        <div className={`absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-green-500/8 to-yellow-500/8 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
             style={{ animationDelay: '2s', animationDuration: '7s' }} />
        <div className={`absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} 
             style={{ animationDelay: '6s', animationDuration: '9s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* ENHANCED HEADER */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className={`backdrop-blur-lg rounded-3xl p-10 border max-w-4xl mx-auto relative overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-gray-200/30 shadow-lg'}`}>
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-pulse" />
            <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`inline-flex items-center gap-3 backdrop-blur-lg rounded-full px-6 py-3 border mb-6 ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/40 border-gray-200/40'}`}
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Available for new opportunities</span>
              </motion.div>

              <motion.h1 
                className="font-playfair font-bold text-5xl md:text-6xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">
                  Let's Create
                </span>
                <br />
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                  Something Amazing
                </span>
              </motion.h1>

              <motion.div 
                className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 rounded-full mx-auto mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              <motion.p 
                className={`text-xl leading-relaxed max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Ready to bring ideas to life? Whether it's a collaboration, project opportunity, or just to say hello, I'd love to hear from you 😄!
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ENHANCED FORM CONTAINER */}
        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          {/* Contact Form - Takes up 3 columns */}
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
            <div className={`backdrop-blur-lg rounded-3xl border p-8 transition-all duration-500 relative overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/8' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
              {/* Form decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-500/5" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-playfair font-bold bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent">
                    Send me a message
                  </h2>
                </div>

                <form
                  action="https://formsubmit.co/hreempandya@gmail.com"
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* Hidden Inputs for FormSubmit */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://hreempandya.github.io/hreem-website/" />

                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <label className="block text-sm font-semibold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Your Name *
                      </label>
                      <input
                        className={`w-full p-4 backdrop-blur-lg border rounded-xl font-medium focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-opacity-50 ${isDarkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/15 group-hover:border-white/30' : 'bg-white/40 border-gray-200/40 text-gray-900 placeholder-gray-600 focus:bg-white/60 group-hover:border-gray-300'}`}
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
                      <label className="block text-sm font-semibold mb-3 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                        Email Address *
                      </label>
                      <input
                        className={`w-full p-4 backdrop-blur-lg border rounded-xl font-medium focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 group-hover:border-opacity-50 ${isDarkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/15 group-hover:border-white/30' : 'bg-white/40 border-gray-200/40 text-gray-900 placeholder-gray-600 focus:bg-white/60 group-hover:border-gray-300'}`}
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
                    <label className="block text-sm font-semibold mb-3 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                      Your Message *
                    </label>
                    <textarea
                      className={`w-full p-4 backdrop-blur-lg border rounded-xl font-medium focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 group-hover:border-opacity-50 resize-none ${isDarkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/15 group-hover:border-white/30' : 'bg-white/40 border-gray-200/40 text-gray-900 placeholder-gray-600 focus:bg-white/60 group-hover:border-gray-300'}`}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, ideas, or just say hello! I'd love to hear from you..."
                      rows="6"
                      required
                    ></textarea>
                  </motion.div>

                  {/* Enhanced Submit Button */}
                  <motion.button
                    type="submit"
                    className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 text-white font-bold py-4 px-8 rounded-xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.button>
                </form>

                {/* SUCCESS MESSAGE POPUP */}
                {submitted && (
                  <motion.div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl shadow-2xl border border-green-400/30 backdrop-blur-lg z-50"
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold">Message sent successfully!</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Info Sidebar - Takes up 2 columns */}
          <motion.div
            className="lg:col-span-2 space-y-6"
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
            <div className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/8' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
              <h3 className="text-xl font-playfair font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Get in Touch
              </h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm always open to discussing new opportunities, creative projects, or just having a friendly chat about tech!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <motion.a
                href="mailto:hreempandya@gmail.com"
                className={`backdrop-blur-lg rounded-xl p-5 border transition-all duration-300 group cursor-pointer block ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.02]' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 hover:scale-[1.02] shadow-lg'}`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>hreempandya@gmail.com</p>
                  </div>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div
                className={`backdrop-blur-lg rounded-xl p-5 border transition-all duration-300 group cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.02]' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 hover:scale-[1.02] shadow-lg'}`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Waterloo, Ontario, Canada</p>
                  </div>
                </div>
              </motion.div>

              {/* Response Time Card */}
              <motion.div
                className={`backdrop-blur-lg rounded-xl p-5 border transition-all duration-300 group cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.02]' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 hover:scale-[1.02] shadow-lg'}`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Response Time</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Usually within 24 hours</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/8' : 'bg-white/30 border-gray-200/30 hover:bg-white/50 shadow-lg'}`}>
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Connect with me</h4>
              <div className="grid grid-cols-2 gap-3">
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
                    className={`flex items-center gap-3 p-3 bg-gradient-to-r ${social.color} rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 text-white text-sm font-medium`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon === 'linkedin' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {social.icon === 'github' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {social.icon === 'x' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    <span className="text-xs">{social.label}</span>
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