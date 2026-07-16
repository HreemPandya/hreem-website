import React from "react";
import LineGradient from "../../components/LineGradient";

// Edit this file to write the `uw-comp-eng` blog post.

const linkClass = (isDarkMode) =>
  `font-medium border-b transition-colors ${
    isDarkMode
      ? "border-amber-500/50 text-amber-400 hover:border-amber-400"
      : "border-[var(--lm-accent)]/50 text-[var(--lm-accent)] hover:border-[var(--lm-accent)]"
  }`;

// Small accent-rail heading used to mark the start of each academic term.
function TermHeading({ term, isDarkMode }) {
  return (
    <div className="!mt-6">
      <LineGradient isDarkMode={isDarkMode} />
      <div className={`mt-8 border-l-2 pl-4 ${isDarkMode ? "border-amber-500/40" : "border-[var(--lm-accent)]/50"}`}>
        <p className={`font-mono text-xs uppercase tracking-[0.2em] ${isDarkMode ? "text-amber-500/70" : "text-[var(--lm-accent)]/70"}`}>
          term
        </p>
        <h2 className={`font-playfair text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}`}>
          {term}
        </h2>
      </div>
    </div>
  );
}

const TERM_IMAGES = {
  "1A": { src: "waterloo-sign.jpg", alt: "Waterloo sign" },
  "1B": { src: "1B-image.jpeg", alt: "1B term photo" },
  "2A": { src: "2A-image.jpeg", alt: "2A term photo" },
  "2B": { src: "2B-image.jpg", alt: "2B term photo" },
};

function ImagePlaceholder({ label, isDarkMode }) {
  const image = TERM_IMAGES[label];

  if (image) {
    return (
      <figure className={`overflow-hidden rounded-2xl border ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/${image.src}`}
          alt={image.alt}
          className="h-auto w-full object-cover"
        />
      </figure>
    );
  }

  return (
    <div className={`rounded-2xl border border-dashed px-4 py-10 text-center font-mono text-xs uppercase tracking-[0.2em] ${isDarkMode ? "border-white/10 text-amber-500/70" : "border-black/10 text-[var(--lm-accent)]/70"}`}>
      {label} placeholder
    </div>
  );
}

export default function UwCompEng({ isDarkMode }) {
  const link = linkClass(isDarkMode);
  const body = isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]";
  const courseCode = isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]";

  return (
    <div className="mt-14 md:mt-1 space-y-6">
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        currently finishing up my second year at waterloo, and here are my thoughts of each term
      </p>

      <TermHeading term="1A" isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        fresh off moving from calgary, i was introduced to waterloo culture in a big way. i quickly realized that everyone here had once been &ldquo;the smart kid,&rdquo; which made starting from zero both exciting and terrifying. during my first few months, i pushed myself to meet as many people as possible, all while sharing the same goals: succeed academically and land a co-op. joined design teams like{" "}
        <a href="https://www.uwarg.com/" target="_blank" rel="noreferrer" className={link}>uwarg</a> and{" "}
        <a href="https://www.waterloorocketry.com/" target="_blank" rel="noreferrer" className={link}>rocketry</a> too.
      </p>
      <div>
        <p className={`font-mono text-xs uppercase tracking-wider ${body}`}>courses</p>
        <ul className={`mt-2 list-disc pl-5 space-y-2 ${body}`}>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 150 - fundamentals of programming</strong> - learned to code in C++, nice course to brush up my C++ knowledge
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 105 - classic mechanics</strong> - grateful to have passed, beast of a physics course
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 198 - project studio</strong> - design course, building a project which required two STM32 Nucleo boards with external peripherals through a serial protocol such as UART. really cool course that allowed me to think like a real engineer
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 190 - engineering profession and practice</strong> - ethics course that i actually enjoyed. find myself applying a lot of principles here in my co-ops
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>math 115 - linear algebra for engineering</strong> - eddie is an amazing prof and it was a fun class. contender for fav course ever
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>math 117 - calc 1</strong> - calc course, nothing new
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>engl 192 - comms</strong> - english course, read "The Worlds I See" by Fei-Fei Li in this class and it reinvented my perspective on what it means to be passionate about something. highly recommend reading it if you haven't already.
          </li>
        </ul>
      </div>
      <ImagePlaceholder label="1A" isDarkMode={isDarkMode} />

      <TermHeading term="1B" isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        one of my more difficult terms, not only because of the co-op search, but also because the courses only got harder. i learned a valuable lesson: to focus on myself and my accomplishments instead of letting comparison steal my joy.
      </p>
      <div>
        <p className={`font-mono text-xs uppercase tracking-wider ${body}`}>courses</p>
        <ul className={`mt-2 list-disc pl-5 space-y-2 ${body}`}>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 106 - electricity and magnetism</strong> - continuation of 105, even harder
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 140 - linear circuits</strong> - first circuits course, enjoyed it a lot and taught a lot of fundamentals needed
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 124 - digital circuits and systems</strong> - digital logic course, really got to understand the logic inside a typical computer
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 192 - eng economics and society impact</strong> - econ class, finance is not my strong suit
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 108 - discrete math</strong> - interesting math course, topics i have never seen before
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>math 119 - calc 2</strong> - cool math course, better than calc 1
          </li>
        </ul>
      </div>
      <ImagePlaceholder label="1B" isDarkMode={isDarkMode} />

      <TermHeading term="2A" isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        second year felt great. i had adjusted to the workload, moved into computer architecture courses, and landed a co-op at{" "}
        <a href="https://environicsanalytics.com/en-ca" target="_blank" rel="noreferrer" className={link}>environics analytics</a> early, making the term pretty chill, except for chemistry.
      </p>
      <div>
        <p className={`font-mono text-xs uppercase tracking-wider ${body}`}>courses</p>
        <ul className={`mt-2 list-disc pl-5 space-y-2 ${body}`}>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 109 - materials chemistry</strong> - hardest course so far, because of the quantum part of it
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 204 - numerical methods</strong> - math course with a weird final with almost all b's
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 205 - diff equations</strong> - more calc!
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 222 - digital computers</strong> - tough but very interesting course on computer organization, assembly programming, memory, and i/o systems.
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 240 - circuits 2</strong> - huge jump from circuits 1, but applicable in real chip design
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 250 - dsa</strong> - foundational course for all things programming. really neat!
          </li>
        </ul>
      </div>
      <ImagePlaceholder label="2A" isDarkMode={isDarkMode} />

      <TermHeading term="2B" isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        current semester, landed a coop with compass group in their ai/data branch{" "}
        <a href="https://www.cdai.ai/" target="_blank" rel="noreferrer" className={link}>cdai</a>. courses have now started to correlate with each other a lot more which is cool application wise and tragic memorization wise.
      </p>
      <div>
        <p className={`font-mono text-xs uppercase tracking-wider ${body}`}>courses</p>
        <ul className={`mt-2 list-disc pl-5 space-y-2 ${body}`}>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 203 - probability</strong> - first stats course all the way in second year. good to brush up on it
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 207 - signals &amp; systems</strong> - have heard this course gets insane after midterms (update: the people were right)
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 208 - discrete math &amp; logic 2</strong> - more discrete math, using esbmc is cool (uw based application)
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 224 - embedded microprocessor systems</strong> - timing diagrams, bus systems, memory systems, peripherals, parallel interfaces, serial interfaces. neat stuff
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 252 - systems program &amp; concurrency</strong> - c course, very much low level programming
          </li>
          <li>
            <strong className={`font-mono ${courseCode}`}>ece 298 - instrument &amp; prototyping lab</strong> - second design course where i built an automated water reservoir and irrigation system, involving embedded programming, sensor and motor integration, and pcb design in proteus.
          </li>
        </ul>
      </div>
      <ImagePlaceholder label="2B" isDarkMode={isDarkMode} />
    </div>
  );
}
