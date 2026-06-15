import { motion } from "framer-motion";
import { blogs, getBlog } from "../data/blogs";

// Individual blog page. Intentionally styled as a left-aligned "draft desk"
// (mono breadcrumb index, accent rail, blinking caret + shimmer) rather than a
// centered article, so it reads as its own thing. Every post is currently a
// "draft in progress" placeholder.
const BlogPost = ({ slug, isDarkMode }) => {
  const post = getBlog(slug);
  const index = blogs.findIndex((b) => b.slug === slug);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.hash = "#writing";
  };

  const backLink = (
    <button
      type="button"
      onClick={goBack}
      className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${
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
        <div className="mx-auto max-w-2xl px-6 py-12">
          {backLink}
          <div className="mt-24">
            <h1 className={`font-playfair text-3xl font-bold ${isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}`}>
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
      <div className="mx-auto max-w-2xl px-6 py-10 md:py-14">
        {backLink}

        <motion.article
          className="mt-16 md:mt-24"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Breadcrumb: writing / NN */}
          <p className={`font-mono text-xs uppercase tracking-[0.25em] ${isDarkMode ? "text-amber-500/70" : "text-[var(--lm-accent)]/70"}`}>
            writing
            <span className="mx-2 opacity-40">/</span>
            <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          </p>

          {/* Title with accent rail */}
          <div className={`mt-5 border-l-2 pl-5 ${isDarkMode ? "border-amber-500/40" : "border-[var(--lm-accent)]/50"}`}>
            <h1 className={`font-playfair text-4xl font-bold leading-tight md:text-5xl ${isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}`}>
              {post.title}
            </h1>
            {post.blurb && (
              <p className={`mt-3 text-base md:text-lg ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
                {post.blurb}
              </p>
            )}
          </div>

          {/* Draft-in-progress state */}
          <div className="mt-14 md:mt-20">
            <p className="font-mono text-sm">
              <span className={isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}>
                &#9998; draft in progress
              </span>
              <motion.span
                className={`ml-1 inline-block ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
                aria-hidden="true"
              >
                &#9612;
              </motion.span>
            </p>

            <p className={`mt-3 max-w-md text-sm md:text-base ${isDarkMode ? "text-[#8B9DB0]/80" : "text-[var(--lm-text-muted)]"}`}>
              this entry is still being written. i&apos;m putting it together now, check back soon.
            </p>

            {/* Indeterminate shimmer to signal it's being built */}
            <div className={`mt-7 h-1 w-full max-w-xs overflow-hidden rounded-full ${isDarkMode ? "bg-white/[0.06]" : "bg-[var(--lm-accent)]/10"}`}>
              <motion.div
                className={`h-full w-1/3 rounded-full bg-gradient-to-r from-transparent ${
                  isDarkMode ? "via-amber-500/70" : "via-[var(--lm-accent)]"
                } to-transparent`}
                animate={{ x: ["-120%", "360%"] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.article>
      </div>
    </main>
  );
};

export default BlogPost;
