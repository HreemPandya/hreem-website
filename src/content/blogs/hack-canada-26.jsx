import React from "react";

// Edit this file to write the `hack-canada-26` blog post.

export default function HackCanada26({ isDarkMode }) {
  return (
    <div className="mt-14 md:mt-20 space-y-6">
      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        Helping organize Hack Canada '26 was a wild ride — logistics, mentors, and an amazing student community made it worthwhile.
      </p>

      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        To write: timeline of planning, biggest challenges, and tips for future volunteers.
      </p>
    </div>
  );
}
