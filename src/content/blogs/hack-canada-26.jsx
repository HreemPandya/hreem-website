import React from "react";

// Edit this file to write the `hack-canada-26` blog post.

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
  "hc-pic": { src: "hc-pic.jpeg", alt: "Hack Canada '26" },
  "tech team": { src: "tech-team.jpeg", alt: "Hack Canada tech team" },
  "hc team": { src: "hc-team.jpeg", alt: "Hack Canada organizing team" },
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

export default function HackCanada26({ isDarkMode }) {
  const body = isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]";
  const link = linkClass(isDarkMode);

  return (
    <div className="mt-14 md:mt-20 space-y-6">
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        hackathons had always interested me from the builder's side, but i became curious about everything happening behind the scenes. after hearing about hackcanada during 1b and regretting that i had missed it, i knew i wanted to be involved when applications opened for the 2026 organizing team. one of my long-term goals is to experience hackathons from every angle, hacker, organizer, volunteer, judge, and sponsor, so joining the team felt like the natural next step.
      </p>

      <ImagePlaceholder label="hc-pic" isDarkMode={isDarkMode} />

      <SectionHeading isDarkMode={isDarkMode}>joining the team</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        i applied to the tech team and was offered a frontend position by <a href="https://www.linkedin.com/in/james-cao-890702265/" target="_blank" rel="noreferrer" className={link}>james</a>. most of our work centred around two systems: the public hackcanada website and the judging platform. both would eventually be used by hundreds of hackers, judges, and sponsors, which meant even small details mattered.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>the website</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        the <a href="https://hackcanada.org/" target="_blank" rel="noreferrer" className={link}>website</a> acted as the main source of truth leading up to the event. schedules changed, information evolved, and new details constantly needed to be reflected clearly. it was not always the most visible work, but it shaped the first impression of the event and helped keep everyone informed.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>the judging platform</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        the <a href="https://hackcanada-judging.vercel.app/" target="_blank" rel="noreferrer" className={link}>judging platform</a> was different since it needed to handle hundreds of submissions, organize judge assignments, collect scores, and produce final results under tight time pressure. it was a system where a seemingly minor decision could affect the entire judging process later.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>the team</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        none of this was individual work. <a href="https://www.linkedin.com/in/faizmustansar/" target="_blank" rel="noreferrer" className={link}>faiz</a>, our tech lead, and <a href="https://www.linkedin.com/in/adelynntran810/" target="_blank" rel="noreferrer" className={link}>adelynn</a> were the people i worked most closely with. the three of us spent months building, reviewing, testing, and solving problems together. hackathon organizing depends heavily on trust because every team's work is connected, and i could not have asked for a better team to work with.
      </p>

      <ImagePlaceholder label="tech team" isDarkMode={isDarkMode} />

      <SectionHeading isDarkMode={isDarkMode}>event day, march 7 2026</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        when event weekend finally arrived, it was exciting to watch months of work turn into something real. more than 700 hackers filled the venue for 36 hours, and the experience was a mix of planned responsibilities and completely unexpected ones. between checking systems, speaking with organizers, catching up with university friends, there was never much downtime.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>when things broke</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        the most difficult moment came during judging. the number of submissions exceeded what we had expected, and a late change to the judging setup created problems that resulted in roughly an hour long delay. suddenly, everyone needed an update at once. messages were coming through discord and people were asking questions in person, and the team still needed enough focus to actually solve the issue.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        we eventually stabilized the platform and moved judging forward, but the experience stayed with me. the technical problem was only one part of it. there were also strong reactions from participants, disagreements surrounding judging, and situations where people searched for personal social media accounts. seeing that side of an event gave me a very different understanding of how much weight an organizer's decisions can carry.
      </p>

      <ImagePlaceholder label="hc team" isDarkMode={isDarkMode} />

      <SectionHeading isDarkMode={isDarkMode}>what i learned</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        that lesson extends far beyond hackathons. in engineering, decisions often need to be made with limited time and incomplete information. they may not satisfy everyone, but sometimes the priority is keeping the system, product, or event moving safely and fairly. organizing also introduced a different kind of pressure. as a hacker, you build intensely for 36 or 48 hours. as an organizer, you build for months knowing that nearly all of it will be tested on a single weekend.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>hacker to organizer</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        moving from hacker to organizer changed how i view these events. hackers focus on their own project and experience, while organizers are responsible for the experience of everyone in the room, which requires a sense of awareness, patience, and accountability that is different than what hackers experience.
      </p>

      <SectionHeading isDarkMode={isDarkMode}>on organizers</SectionHeading>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        the experience also gave me a much greater appreciation for the people who organize hackathons. their best work is often invisible because, when everything goes well, participants rarely notice how many problems were prevented behind the scenes. one hacker took the time to thank me during the event, and that small interaction made the months of effort feel recognized.
      </p>

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        thank you to james, faiz, ade, and everyone else on the hackcanada team. building this event with all of you was an unforgettable experience, and i am genuinely excited to see what each of you goes on to accomplish.
      </p>
    </div>
  );
}
