import { motion } from "framer-motion";
import { getBlog } from "../data/blogs";

// Individual blog page. For now every post is intentionally a minimal
// "still building" placeholder — keep it simple and on-brand.
const BlogPost = ({ slug, isDarkMode }) => {
  const post = getBlog(slug);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.hash = "#writing";
  };

  const backLink = (
    <button
      type="button"
      onClick={goBack}
      className={`inline-flex items-center gap-2 text-sm transition-colors duration-300 ${
        isDarkMode
          ? "text-[#8B9DB0] hover:text-amber-400"
          : "text-[var(--lm-text-muted)] hover:text-[var(--lm-accent)]"
      }`}
    >
      <span aria-hidden="true">&larr;</span> back
    </button>
  );

  if (!post) {
    return (
      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {backLink}
          <div className="mt-24 text-center">
            <h1 className={`font-playfair italic text-3xl ${isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}`}>
              post not found
            </h1>
            <p className={`mt-3 text-sm ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
              that page doesn&apos;t exist yet.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-10 md:py-14">
        {backLink}

        <motion.div
          className="mt-20 md:mt-28 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`font-mono text-xs uppercase tracking-[0.25em] mb-4 ${isDarkMode ? "text-amber-500/70" : "text-[var(--lm-accent)]/70"}`}>
            {post.kicker}
          </p>

          <h1 className={`font-playfair italic text-4xl md:text-5xl leading-tight ${isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}`}>
            {post.title}
          </h1>

          {post.blurb && (
            <p className={`mt-4 text-base md:text-lg ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
              {post.blurb}
            </p>
          )}

          {/* Divider */}
          <div className={`mx-auto my-10 md:my-12 h-px w-16 ${isDarkMode ? "bg-white/15" : "bg-[var(--lm-border)]"}`} />

          {/* Under construction */}
          <motion.span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider ${
              isDarkMode
                ? "border-amber-500/30 text-amber-400/90"
                : "border-[var(--lm-accent)]/30 text-[var(--lm-accent)]"
            }`}
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span aria-hidden="true">&#10022;</span> still building
          </motion.span>

          <p className={`mt-5 text-sm md:text-base ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
            this one&apos;s still being written — check back soon.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default BlogPost;
