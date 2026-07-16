import React from "react";

// Edit this file to write the `jamhacks-10` blog post.
// Use plain JSX: paragraphs, images, and any small components you need.
// Keep the root element simple — BlogPost will provide surrounding layout.

const linkClass = (isDarkMode) =>
  `font-medium border-b transition-colors ${
    isDarkMode
      ? "border-amber-500/50 text-amber-400 hover:border-amber-400"
      : "border-[var(--lm-accent)]/50 text-[var(--lm-accent)] hover:border-[var(--lm-accent)]"
  }`;

function SectionHeading({ children, isDarkMode }) {
  return (
    <h2
      className={`!mt-10 border-l-2 pl-4 font-playfair text-xl font-bold md:text-2xl ${
        isDarkMode ? "border-amber-500/40 text-white" : "border-[var(--lm-accent)]/50 text-[var(--lm-text-primary)]"
      }`}
    >
      {children}
    </h2>
  );
}

const IMAGES = {
  "the venue": { src: "jam-10.jpeg", alt: "JamHacks 10 venue" },
  "picking winners": { src: "jam-present.jpeg", alt: "JamHacks 10 presentations" },
};

function ImagePlaceholder({ label, isDarkMode }) {
  const image = IMAGES[label];

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
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed py-16 ${
        isDarkMode ? "border-white/15 text-[#8B9DB0]/50" : "border-black/10 text-[var(--lm-text-muted)]/60"
      }`}
    >
      <span className="font-mono text-xs uppercase tracking-wider">photo placeholder</span>
      <span className="font-mono text-[10px] opacity-70">{label}</span>
    </div>
  );
}

export default function Jamhacks10({ isDarkMode }) {
  const body = isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]";
  const link = linkClass(isDarkMode);

  return (
    <div className="mt-14 md:mt-20 space-y-6">
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        i had already experienced hackathons as both a builder and an organizer, so judging felt like the natural next step. one of my long-term goals is to experience hackathons from every angle, hacker, organizer, volunteer, judge, and eventually even sponsor. when i received the email saying i had been selected to judge <a href="https://jamhacks-10.devpost.com/" target="_blank" rel="noreferrer" className={link}>jamhacks</a>, i was genuinely surprised and incredibly excited.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        judging is difficult to prepare for because so much of it depends on your own experience and perspective. i had spent plenty of time on the other side of the table, trying to use five minutes to convince a judge that my project was worth remembering, even when it was not as polished as i wanted it to be. now, i would be the one listening, asking questions, and deciding what stood out.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>the venue (jun 14th, 2026)</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        jamhacks took place in pse, formerly known as e7, at waterloo. since i lived nearby and walked through that building regularly for class, it was strange seeing such a familiar space transformed into a full hackathon venue. it reminded me how much effort goes into creating an environment where hundreds of people can build, collaborate, and compete over a single weekend.
      </p>

      <ImagePlaceholder label="the venue" isDarkMode={isDarkMode} />

      <SectionHeading isDarkMode={isDarkMode}>met with friends</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        i also ran into a few hackcanada organizers at the event, including faiz, who i somehow ended up being paired with for judging. the judging groups were randomized, so being assigned together was a funny coincidence. it was great to work with someone i already trusted, especially in a role where decisions had to be made quickly.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>the pitches</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        we judged around 20 projects in roughly an hour and a half. there were far too many impressive ideas to list, but seeing pitches from the judge's perspective completely changed how i thought about demos. as a hacker, it is tempting to spend the entire pitch showing every feature and explaining why the technology is cool. as a judge, i found myself paying just as much attention to the problem, the people affected by it, and whether the project could create meaningful impact.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        many teams understood that balance incredibly well. the strongest presentations did not just explain what they had built, they made it clear why it needed to exist. that experience gave me a new perspective on how i want to structure my own future hackathon demos: lead with the problem, show the impact, and then let the technology support the story.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        another thing that stood out was how much responsibility comes with giving feedback. even when a project was not selected as a winner, the people presenting it had spent an entire weekend building it. i wanted every conversation to leave the team with something useful, whether that was encouragement, a technical suggestion, or a question that helped them think differently about their idea.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>picking winners</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        after judging ended, all the judges gathered in one room for nearly two hours to decide the track and overall winners. listening to everyone explain how they interpreted the criteria showed me how much thought goes into decisions that may appear simple from the outside. each judge noticed different strengths, and the final results came from a long discussion rather than one person's opinion.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        that room was also a reminder of the talent surrounding me. people brought experience from engineering, entrepreneurship, design, research, and industry, yet everyone approached the discussion with the same goal: recognize the teams that had built something thoughtful and meaningful. being trusted to contribute to that conversation was one of the most rewarding parts of the experience.
      </p>

      <ImagePlaceholder label="picking winners" isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        once the winners were chosen, it was suddenly over. hours of focused judging and discussion disappeared quickly, but the responsibility was energizing rather than exhausting. there is something uniquely satisfying about being trusted to make decisions that matter, especially when those decisions are grounded in careful thought and genuine appreciation for the work in front of you.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        thank you to the jamhacks 10 team for believing in my experience and giving me the opportunity to judge. and to every hacker who built something that weekend: whether or not you won, you left with more knowledge, stronger skills, and a project that did not exist before. that is what makes hackathons worth returning to.
      </p>
    </div>
  );
}
