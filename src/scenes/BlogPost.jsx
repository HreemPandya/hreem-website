import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { blogs, getBlog } from "../data/blogs";

// Individual blog page. Intentionally styled as a left-aligned "draft desk"
// (mono breadcrumb index, accent rail) rather than a centered article, so it
// reads as its own thing. Posts with an empty `content` array (see
// data/blogs.js) fall back to a "draft in progress" placeholder with a
// blinking caret + shimmer.
const BlogPost = ({ slug, isDarkMode }) => {
  const post = getBlog(slug);
  const index = blogs.findIndex((b) => b.slug === slug);
  const [BlogContent, setBlogContent] = useState(null);

  useEffect(() => {
    let mounted = true;
    // Try dynamically importing a JSX blog component at src/content/blogs/<slug>.jsx
    import(`../content/blogs/${slug}.jsx`)
      .then((mod) => {
        if (mounted && mod && mod.default) setBlogContent(() => mod.default);
      })
      .catch(() => {
        // no custom component — leave BlogContent null to fall back to data blocks
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

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

          {BlogContent ? (
            <div className="mt-14 md:mt-20">
              <BlogContent isDarkMode={isDarkMode} />
            </div>
          ) : post.content && post.content.length > 0 ? (
            /* Post body: paragraphs and images, in the order given in data/blogs.js */
            <div className="mt-14 md:mt-20 space-y-6">
              {post.content.map((block, i) =>
                block.type === "image" ? (
                  <figure key={i} className="!mt-10">
                    <div
                      className={`overflow-hidden rounded-sm border ${
                        isDarkMode ? "border-white/10" : "border-[var(--lm-accent)]/15"
                      }`}
                    >
                      <img
                        src={block.src}
                        alt={block.alt ?? ""}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption
                        className={`mt-2 font-mono text-xs ${
                          isDarkMode ? "text-[#8B9DB0]/70" : "text-[var(--lm-text-muted)]/80"
                        }`}
                      >
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                ) : (
                  <p
                    key={i}
                    className={`text-base md:text-lg leading-relaxed ${
                      isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"
                    }`}
                  >
                    {block.text}
                  </p>
                )
              )}
            </div>
          ) : (
            /* Draft-in-progress state */
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
          )}
        </motion.article>
      </div>
    </main>
  );
};

export default BlogPost;
