import React from "react";

// Edit this file to write the `yc-ai-startup-school-2025` blog post.

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
  "the trip": { src: "palm-tree.jpeg", alt: "Palm tree in San Francisco" },
  "first day": { src: "berk.jpeg", alt: "Berkeley at night" },
  "startup school venue": { src: "sam-alt.jpeg", alt: "Sam Altman speaking at startup school" },
  "last day": { src: "sf-building.jpeg", alt: "San Francisco building" },
  "sf": { src: "sf-pic.jpeg", alt: "San Francisco" },
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

export default function YcAiStartupSchool2025({ isDarkMode }) {
  const body = isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]";
  const link = linkClass(isDarkMode);

  return (
    <div className="mt-14 md:mt-20 space-y-6">
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        my first trip to san francisco ended up being one of the coolest experiences of my life: <a href="https://events.ycombinator.com/ai-sus" target="_blank" rel="noreferrer" className={link}>yc's first-ever ai startup school</a>. i was in the middle of my first co-op at skrimp when i found out i had been accepted, and i booked my flight almost immediately. opportunities like that do not come around often, so i knew i had to take advantage of it.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        the trip became even better when several of my university friends were accepted too, turning what started as a solo trip into a mini vacation. we arrived early in the morning, dropped our bags at the hotel, and immediately headed to the first of more than 15 events we would attend.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        people often ask what you actually do at startup school, and my answer is simple: you barely sleep for three days. there were nonstop events hosted by yc startups, founders, investors, and people across the tech community. whether it was 3 p.m. or 3 a.m., there was always somewhere to go and someone new to meet.
      </p>

      <ImagePlaceholder label="the trip" isDarkMode={isDarkMode} />

      <SectionHeading isDarkMode={isDarkMode}>first day</SectionHeading>
      <ul className={`list-disc space-y-3 pl-5 ${body}`}>
        <li>
          the day before the school officially began, we attended a yc founders picnic. it was the perfect introduction to the city and the community. we met founders and builders from all over, several of whom invited us to events they were hosting later that night.
        </li>
        <li>we explored the bay area, saw the golden gate bridge for the first time, and walked into nearly every interesting store we passed.</li>
        <li>
          that night, we went to a toma house party that had the energy of both a social event and a hackathon. laptops and monitors were set up everywhere, with people building projects while music played around them. i had never seen anything like it.
        </li>
        <li>
          later, some people we met invited us to another event in berkeley, so we made our way across the bay, met even more builders, and explored the campus around midnight. we barely slept afterward.
        </li>
      </ul>

      <ImagePlaceholder label="first day" isDarkMode={isDarkMode} />

      <SectionHeading isDarkMode={isDarkMode}>second day (first day of school)</SectionHeading>
      <ul className={`list-disc space-y-3 pl-5 ${body}`}>
        <li>
          the next morning was the first official day of startup school. the venue was packed with an unbelievable number of talented builders, with the line stretching outside the pier. we received merch bags, an exclusive yc x sf shirt, and listened to speakers including{" "}
          <a href="https://www.linkedin.com/in/garrytan/" target="_blank" rel="noreferrer" className={link}>garry tan</a>,{" "}
          <a href="https://www.linkedin.com/in/sam-altman/" target="_blank" rel="noreferrer" className={link}>sam altman</a>,{" "}
          <a href="https://www.linkedin.com/in/satyanadella/" target="_blank" rel="noreferrer" className={link}>satya nadella</a>,{" "}
          <a href="https://www.linkedin.com/in/andrewyng/" target="_blank" rel="noreferrer" className={link}>andrew ng</a>, and{" "}
          <a href="https://x.com/elonmusk" target="_blank" rel="noreferrer" className={link}>elon musk</a>.
        </li>
        <li>
          after exploring the venue and meeting even more people, we headed to rippling's afterparty at a bowling alley. i spoke with employees and recruiters, spent time with friends, and enjoyed the food and bowling. somehow, we still decided the night was not over.
        </li>
        <li>
          we later visited a hacker house, which was another completely new experience for me. the entire space was designed around building, with shared work areas and people constantly discussing ideas. i met students from mit, berkeley, brown, princeton, and several other schools.
        </li>
        <li>
          we then ended up sneaking into the{" "}
          <a href="https://cluely.com/" target="_blank" rel="noreferrer" className={link}>cluely</a> party before the cops came and shut it down, and we headed back through the city late at night.
        </li>
      </ul>

      <ImagePlaceholder label="startup school venue" isDarkMode={isDarkMode} />

      <SectionHeading isDarkMode={isDarkMode}>third day (second day of school)</SectionHeading>
      <ul className={`list-disc space-y-3 pl-5 ${body}`}>
        <li>by the third day, the lack of sleep had finally caught up with us.</li>
        <li>
          i spent the morning attending workshops before deciding to explore more of the venue. while walking around, i met a podcaster and ended up pitching skrimp live on his show.
        </li>
        <li>
          later, i took a waymo for the first time, which felt completely unreal, and finished the trip by exploring a few more san francisco cafés before heading home.
        </li>
      </ul>

      <ImagePlaceholder label="last day" isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        the trip had almost no structure, and that was what made it so memorable. we rarely knew where we would be a few hours later, who we would meet, or what invitation would change the direction of the day.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        more than anything, the experience showed me why the san francisco tech scene feels so different. nearly everyone you meet is building something, thinking ambitiously, or willing to introduce you to someone who can change your perspective. i returned home with new friendships, countless connections, and a much stronger desire to keep building things that could eventually bring me back.
      </p>

      <ImagePlaceholder label="sf" isDarkMode={isDarkMode} />
    </div>
  );
}
