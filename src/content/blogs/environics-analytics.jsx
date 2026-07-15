import React from "react";

// Edit this file to write the `environics-analytics` blog post.

export default function EnvironicsAnalytics({ isDarkMode }) {
  return (
    <div className="mt-14 md:mt-20 space-y-6">
      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        My AI internship at Environics Analytics taught me a lot about applied data science in industry settings.
      </p>

      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        Draft ideas: projects I contributed to, stack used, and key takeaways.
      </p>
    </div>
  );
}
