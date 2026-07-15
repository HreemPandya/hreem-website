import React from "react";

// Edit this file to write the `uw-comp-eng` blog post.

export default function UwCompEng({ isDarkMode }) {
  return (
    <div className="mt-14 md:mt-20 space-y-6">
      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        currently finishing up my second year at waterloo, and i thought now would be the perfect time to document my experience so far. 
      </p>
      

      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
fresh off moving from calgary, i was introduced to waterloo culture in a big way. i quickly realized that everyone here had once been “the smart kid,” which made starting from zero both exciting and terrifying. during my first few months, i pushed myself to meet as many people as possible, all while sharing the same goals: succeed academically and land a co-op. joined design teams like uwarg and rocketry too      </p>
      <div>
        <p className={`mt-2 font-medium ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
          Below are the courses I took:
        </p>
        <ul className={`mt-2 list-disc pl-5 space-y-2 ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
          <li>
            <strong className={`font-mono ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
              ece 150 - fundamentals of programming
            </strong> - learned to code in C++, nice course to brush up my C++ knowledge
          </li>
          <li>
            <strong className={`font-mono ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
              ece 105 - classic mechanics
            </strong> - grateful to have passed, beast of a course, even if you think you are a master at physics
          </li>
          <li>
            <strong className={`font-mono ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
              ece 198 - project studio
            </strong> - design course, building a project which required two STM32 Nucleo boards with external peripherals through a serial protocol such as UART. really cool course that allowed me to think like a real engineer
          </li>
          <li>
            <strong className={`font-mono ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
              ece 190 - engineering profession and practice
            </strong> - ethics course that i actually enjoyed. find myself applying a lot of principles here in my co-ops
          </li>
          <li>
            <strong className={`font-mono ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
              math 115 - linear algebra for engineering
            </strong> - eddie is an amazing prof and it was a fun class. contender for fav course ever
          </li>
          <li>
            <strong className={`font-mono ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
              math 117 - calc 1
            </strong> - calc course, nothing new
          </li>
          <li>
            <strong className={`font-mono ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
              engl 192 - comms
            </strong> - english course, read "The Worlds I See" by Fei-Fei Li in this class and it was an amazing piece of literature for the young ambitious student i was.
          </li>
        </ul>
      </div>
      <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
one of my more difficult terms, not only because of the co-op search, but also because the courses only got harder. i learned a valuable lesson: to focus on myself and my accomplishments instead of letting comparison steal my joy.      </p>
    </div>
    
  );
}
