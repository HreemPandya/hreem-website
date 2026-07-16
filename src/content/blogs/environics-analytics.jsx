import React from "react";

// Edit this file to write the `environics-analytics` blog post.

const FACTS = [
  { label: "timeline", value: "4 months, 2 days/week in office" },
  { label: "role", value: "ai intern" },
  { label: "team", value: "ai team, 4 people" },
];

const TOOLS = ["langgraph", "snowflake", "python", "mcp creation", "chromadb"];

function QuickFacts({ isDarkMode }) {
  const label = `font-mono text-xs uppercase tracking-wider ${isDarkMode ? "text-amber-500/70" : "text-[var(--lm-accent)]/70"}`;
  const value = `mt-1 text-base ${isDarkMode ? "text-[#F0F4F8]" : "text-[var(--lm-text-primary)]"}`;

  return (
    <div className={`grid grid-cols-2 gap-x-8 gap-y-6 rounded-2xl border p-6 ${isDarkMode ? "border-white/10" : "border-[var(--lm-border)]"}`}>
      <div className="space-y-5">
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <p className={label}>{fact.label}</p>
            <p className={value}>{fact.value}</p>
          </div>
        ))}
      </div>
      <div>
        <p className={label}>tools</p>
        <div className="mt-1 space-y-1.5">
          {TOOLS.map((tool) => (
            <p key={tool} className={value}>{tool}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

const IMAGES = {
  "the team": { src: "ea-logo-building.jpeg", alt: "Environics Analytics office building" },
  "office life": { src: "ea-office.jpg", alt: "Environics Analytics office" },
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

export default function EnvironicsAnalytics({ isDarkMode }) {
  const body = isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]";

  return (
    <div className="mt-14 md:mt-20 space-y-6">
      <QuickFacts isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        this was my first in-person internship, working two days a week from environics analytics office at bloor and yonge in downtown toronto.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        my title was ai intern, which was intentionally broad. my role was to build ai tools that leveraged environics 60+ datasets for internal teams and external clients. i was part of a four-person ai team with layne, my manager, robin, our technical lead, garvit, the other ai intern, and me. together, we formed a small but powerful team helping drive the company's ai initiative.
      </p>

      <ImagePlaceholder label="the team" isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        our goal was simple: reduce repetitive work, modernize legacy processes, and make ai useful beyond technical teams. garvit and i spent the first few weeks researching and testing newer agentic tools, including speckit, langgraph, and anthropic's newly open-sourced agent skills, to understand what could realistically be used in production.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        during this time, i also became more immersed in the environics culture. one memorable part was salad house, a tiny food spot near the office that was somehow the go-to for half the company. exploring different downtown food spots with garvit became one of the perks of working in the city.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        after the research phase, we began building. our projects ranged from a company-wide ai education module to my first major project for the metadata team, where i automated an excel-heavy legacy workflow involving dataset variables.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        during my midterm check-in, my manager told me that to truly make a lasting impact, he wanted an employee to come to him and say, &ldquo;hreem helped me do this&rdquo; or &ldquo;hreem taught me this.&rdquo; i took that seriously because impact mattered more to me than simply completing tasks. ironically, the metadata team gave him that exact feedback the very next day.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        from there, i worked with teams across qa, data development, data insights, product, leadership, business insights, and it. whenever i had extra capacity, i asked for more work. over time, the teams i supported climbed to the top of the company's internal ai-usage dashboard, and many employees shared how much the tools had improved their workflows.
      </p>

      <ImagePlaceholder label="office life" isDarkMode={isDarkMode} />

      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        the best part of the experience was the people. i worked alongside incredibly talented individuals with years of experience in data and analytics, including the opportunity to build a tool directly for our ceo, jan kestle. everyone at environics had a story, whether it involved marathons, d&amp;d, or a completely unique path into the industry.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
i was also fortunate to have benji as a mentor, who went far beyond what i expected from a typical mentorship. he would take me out for coffee and genuinely check in on how i was feeling, not just at work, but also about university, life, and the future. because he had also attended waterloo, we had a lot to relate to, and he gave me fresh perspectives on choosing a career path and eventually transitioning into full-time work.      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        technically, the role strengthened my skills in agentic ai systems, rag, workflow automation, prompt engineering, data processing, software testing, and building reliable tools for non-technical users. more importantly, it taught me how to understand a team's real problem, communicate clearly, and build something people would actually use.
      </p>
      <p className={`text-base md:text-lg leading-relaxed ${body}`}>
        a quick thank you to the amazing people at environics analytics who pushed me, trusted me, and showed me what it feels like to be part of a team where your work genuinely matters.
      </p>
    </div>
  );
}
