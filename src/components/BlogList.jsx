import { motion } from "framer-motion";
import { blogs } from "../data/blogs";

// Compact "Latest Blogs" list, embedded under the GitHub contributions in
// AboutMe. Rows route to #/blog/<slug> via the hash router in App.js.
const BlogList = ({ isDarkMode }) => {
  return (
    <motion.div
      id="writing"
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className={`font-mono text-xs uppercase tracking-wider ${isDarkMode ? "text-amber-500/80" : "text-[var(--lm-accent)]/80"}`}>
        Latest Blogs
      </p>

      <div className={`border-t ${isDarkMode ? "border-white/10" : "border-[var(--lm-border)]"}`}>
        {blogs.map((post) => (
          <a
            key={post.slug}
            href={`#/blog/${post.slug}`}
            className={`group flex items-center justify-between gap-3 py-3 border-b transition-colors duration-300 ${
              isDarkMode
                ? "border-white/10 hover:border-amber-500/40"
                : "border-[var(--lm-border)] hover:border-[var(--lm-accent)]/50"
            }`}
          >
            <span
              className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode
                  ? "text-[#F0F4F8] group-hover:text-amber-400"
                  : "text-[var(--lm-text-primary)] group-hover:text-[var(--lm-accent)]"
              }`}
            >
              {post.title}
            </span>
            <span
              className={`shrink-0 text-sm transition-all duration-300 group-hover:translate-x-0.5 ${
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
      </div>
    </motion.div>
  );
};

export default BlogList;
