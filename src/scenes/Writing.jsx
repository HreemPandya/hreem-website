import { motion } from "framer-motion";
import { blogs } from "../data/blogs";

// "Latest Blogs" — a simple link list. Each row routes to #/blog/<slug>,
// handled by the lightweight hash router in App.js.
const Writing = ({ isDarkMode }) => {
  return (
    <section id="writing" className="pt-12 md:pt-20 pb-16 md:pb-28 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header — mirrors the eyebrow + serif title pattern used across the site */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className={`font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-2 ${isDarkMode ? "text-amber-500/70" : "text-[var(--lm-accent)]/70"}`}>
            Latest Blogs
          </p>
          <h2 className={`font-playfair text-3xl md:text-4xl font-bold ${isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}`}>
            writing
          </h2>
        </motion.div>

        {/* List */}
        <motion.div
          className={`border-t ${isDarkMode ? "border-white/10" : "border-[var(--lm-border)]"}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {blogs.map((post) => (
            <a
              key={post.slug}
              href={`#/blog/${post.slug}`}
              className={`group flex items-center justify-between gap-4 py-5 md:py-6 border-b transition-colors duration-300 ${
                isDarkMode
                  ? "border-white/10 hover:border-amber-500/40"
                  : "border-[var(--lm-border)] hover:border-[var(--lm-accent)]/50"
              }`}
            >
              <span
                className={`text-lg md:text-xl transition-colors duration-300 ${
                  isDarkMode
                    ? "text-[#F0F4F8] group-hover:text-amber-400"
                    : "text-[var(--lm-text-primary)] group-hover:text-[var(--lm-accent)]"
                }`}
              >
                {post.title}
              </span>
              <span
                className={`shrink-0 text-lg transition-all duration-300 group-hover:translate-x-1 ${
                  isDarkMode
                    ? "text-[#8B9DB0] group-hover:text-amber-400"
                    : "text-[var(--lm-text-muted)] group-hover:text-[var(--lm-accent)]"
                }`}
                aria-hidden="true"
              >
                &rarr;
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Writing;
