import React from "react";

// Edit this file to write the `jamhacks-10` blog post.
// Use plain JSX: paragraphs, images, and any small components you need.
// Keep the root element simple — BlogPost will provide surrounding layout.

export default function Jamhacks10({ isDarkMode }) {
  return (
    <div className="mt-14 md:mt-20 space-y-6">
      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        I had the privilege of judging at JamHacks 10 this year. It was an incredible opportunity to see high-schoolers imagine and build bold projects over a weekend.
      </p>

      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        in progress.
      </p>

      {/* Example image — drop your file in public/assets/blog/ and update `src` accordingly */}
      {/*
      <figure className="!mt-10">
        <div className={`overflow-hidden rounded-sm border ${isDarkMode ? "border-white/10" : "border-[var(--lm-accent)]/15"}`}>
          <img src={`${process.env.PUBLIC_URL}/assets/blog/jamhacks-judging.webp`} alt="Judging at JamHacks" className="w-full object-cover" />
        </div>
        <figcaption className={`mt-2 font-mono text-xs ${isDarkMode ? "text-[#8B9DB0]/70" : "text-[var(--lm-text-muted)]/80"}`}>
          Judges listening to a demo.
        </figcaption>
      </figure>
      */}
    </div>
  );
}
