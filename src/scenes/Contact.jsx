import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import SocialMediaIcons from "../components/SocialMediaIcons";

const CONTACT_SENT_KEY = "hreem-contact-form-sent";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = ({ isDarkMode }) => {
  const reduceMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CONTACT_SENT_KEY)) setSent(true);
    } catch {
      /* private mode / storage blocked */
    }
  }, []);

  const onSubmit = async (data) => {
    setError(null);
    try {
      const body = new FormData();
      Object.entries(data).forEach(([key, value]) => body.append(key, value));
      body.append("_captcha", "false");

      const res = await fetch("https://formsubmit.co/ajax/hreempandya@gmail.com", {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Request failed");

      reset();
      setSent(true);
      try {
        sessionStorage.setItem(CONTACT_SENT_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
    } catch {
      setError("Something went wrong. Please try again or email directly.");
    }
  };

  const inputBase = `w-full py-2.5 text-[15px] md:text-base border-b bg-transparent focus:outline-none transition-colors placeholder:opacity-50 disabled:opacity-60 disabled:cursor-not-allowed ${
    isDarkMode
      ? "text-white placeholder-[#8B9DB0]"
      : "text-[var(--lm-text-primary)] placeholder-[var(--lm-text-muted)]"
  }`;

  // Border color reflects validity: red once a field has an error, accent otherwise.
  const borderClass = (hasError) =>
    hasError
      ? isDarkMode
        ? "border-red-400/70 focus:border-red-400"
        : "border-red-500/70 focus:border-red-500"
      : isDarkMode
        ? "border-white/[0.1] focus:border-amber-500/60"
        : "border-[var(--lm-border)] focus:border-[var(--lm-accent)]/60";

  const fieldError = (name, id) => (
    <AnimatePresence initial={false}>
      {errors[name] && (
        <motion.p
          id={id}
          role="alert"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, height: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, height: "auto" }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.18 }}
          className={`mt-1.5 text-xs ${isDarkMode ? "text-red-400" : "text-red-500"}`}
        >
          {errors[name].message}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <section
      id="contact"
      className={`pt-12 md:pt-20 pb-8 md:pb-32 transition-colors duration-300 relative overflow-hidden`}
    >
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
        </div>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6">
        {/* Minimal header */}
        <motion.div
          className="mb-8 md:mb-12"
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
            className={`text-sm md:text-base mb-6 ${
              isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"
            }`}
          >
            Have a project in mind or just want to say hello? Drop a message.
          </p>

          <form
            action="https://formsubmit.co/hreempandya@gmail.com"
            method="POST"
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <input type="hidden" name="_captcha" value="false" />

            <div>
              <input
                className={`${inputBase} ${borderClass(!!errors.name)}`}
                type="text"
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                disabled={sent}
                {...register("name", { required: "Please enter your name." })}
              />
              {fieldError("name", "name-error")}
            </div>

            <div>
              <input
                className={`${inputBase} ${borderClass(!!errors.email)}`}
                type="email"
                placeholder="Email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={sent}
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address." },
                })}
              />
              {fieldError("email", "email-error")}
            </div>

            <div>
              <textarea
                className={`${inputBase} ${borderClass(!!errors.message)} resize-none min-h-[100px]`}
                placeholder="Your message"
                rows={3}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                disabled={sent}
                {...register("message", {
                  required: "Please enter a message.",
                  minLength: { value: 10, message: "A little more detail, please (10+ characters)." },
                })}
              />
              {fieldError("message", "message-error")}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`inline-flex items-center gap-2.5 text-sm font-medium ${
                      isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"
                    }`}
                  >
                    <motion.span
                      initial={reduceMotion ? {} : { scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
                        isDarkMode ? "bg-amber-500/15" : "bg-[var(--lm-accent)]/12"
                      }`}
                    >
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M5 13l4 4L19 7"
                          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                        />
                      </motion.svg>
                    </motion.span>
                    Message sent. Thanks for reaching out!
                  </motion.div>
                ) : (
                  <motion.button
                    key="btn"
                    type="submit"
                    disabled={isSubmitting}
                    exit={{ opacity: 0 }}
                    className={`inline-flex min-h-[44px] items-center justify-center px-6 py-2.5 rounded-full font-medium text-sm border transition-colors ${
                      isDarkMode
                        ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                        : "border-[var(--lm-accent)]/40 text-[var(--lm-accent)] hover:bg-[var(--lm-accent)]/10"
                    } ${isSubmitting ? "opacity-60 cursor-wait" : ""}`}
                    whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                    whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                  >
                    {isSubmitting && (
                      <span
                        className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                        aria-hidden="true"
                      />
                    )}
                    {isSubmitting ? "Sending…" : "Send message"}
                  </motion.button>
                )}
              </AnimatePresence>

              {error && (
                <span className={`text-sm ${isDarkMode ? "text-red-400" : "text-red-600"}`} role="alert">
                  {error}
                </span>
              )}
            </div>
          </form>
        </motion.div>

        {/* Email + social — inline, no boxes */}
        <motion.div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:mt-12 md:pt-8"
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
