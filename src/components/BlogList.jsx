import { motion } from "framer-motion";
import { blogs } from "../data/blogs";

// Compact "Latest Blogs" index, embedded under the GitHub contributions in
// AboutMe. Deliberately styled as a numbered ledger (mono index + kicker +
// left accent rail on hover) rather than a plain divider list. Rows route to
// #/blog/<slug> via the hash router in App.js.
const BlogList = ({ isDarkMode }) => {
  return (
    <motion.div
      id="writing"
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <p className={`font-mono text-xs uppercase tracking-[0.2em] ${isDarkMode ? "text-amber-500/80" : "text-[var(--lm-accent)]/80"}`}>
          Latest Blogs
        </p>
        <span className={`h-px flex-1 ${isDarkMode ? "bg-white/10" : "bg-[var(--lm-border)]"}`} />
        <span className={`font-mono text-[10px] tabular-nums ${isDarkMode ? "text-[#8B9DB0]/60" : "text-[var(--lm-text-muted)]/60"}`}>
          {String(blogs.length).padStart(2, "0")}
        </span>
      </div>

      <div className="space-y-0.5">
        {blogs.map((post, i) => (
          <a
            key={post.slug}
            href={`#/blog/${post.slug}`}
            className={`group flex items-baseline gap-4 border-l-2 border-transparent py-3 pl-3 transition-all duration-300 hover:pl-4 ${
              isDarkMode ? "hover:border-amber-500/50" : "hover:border-[var(--lm-accent)]/60"
            }`}
          >
            <span
              className={`font-mono text-xs tabular-nums transition-colors duration-300 ${
                isDarkMode
                  ? "text-amber-500/50 group-hover:text-amber-400"
                  : "text-[var(--lm-accent)]/50 group-hover:text-[var(--lm-accent)]"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`truncate text-sm md:text-base transition-colors duration-300 ${
                    isDarkMode
                      ? "text-[#F0F4F8] group-hover:text-amber-400"
                      : "text-[var(--lm-text-primary)] group-hover:text-[var(--lm-accent)]"
                  }`}
                >
                  {post.title}
                </span>
                <span
                  className={`shrink-0 -translate-x-1 text-sm opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                    isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"
                  }`}
                  aria-hidden="true"
                >
                  &#8599;
                </span>
              </div>
              <span
                className={`mt-0.5 block font-mono text-[10px] uppercase tracking-wider ${
                  isDarkMode ? "text-[#8B9DB0]/70" : "text-[var(--lm-text-muted)]/70"
                }`}
              >
                {post.kicker}
              </span>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogList;
