import { useState } from "react";

const PUBLIC = process.env.PUBLIC_URL || "";

// Roles, most recent first. Drop logo files in /public/assets (cdai.png, etc.).
// Fill in each `date` (rendered only when set) and `description` (shown under
// every row, always expanded). Until a logo file exists, the row shows the org's initial.
const EXPERIENCE = [
  {
    title: "Data & AI Engineer",
    org: "Compass Data & AI (CDAI)",
    logo: "cdai.png",
    date: "Sept 2026 - Dec 2026", // e.g. "2025 - Present"
    description: "incoming for fall 2026",
  },
  {
    title: "AI Intern",
    org: "Environics Analytics",
    logo: "environics.png",
    date: "Jan 2026 - Apr 2026",
    description: "building ai tools for canada's largest collection of actionable marketing data",
  },
  {
    title: "Founding Software Engineer",
    org: "Skrimp.ai",
    logo: "skrimp.png",
    date: "May 2025 - Aug 2025",
    description: "founding engineer for a waterloo based startup, turning messy grocery flyers into structured data powering smarter, discounted meal planning for canadians.",
  },
  {
    title: "Autonomy Software Engineer",
    org: "WARG",
    logo: "warg.png",
    date: "",
    description: "ml-powered landing detection with yolov8 and built control algorithms for autonomous drone navigation",
  },
];

// Logo tile with graceful fallback: shows the org's initial until its image loads.
const Logo = ({ src, org, isDarkMode }) => {
  const [failed, setFailed] = useState(false);
  const initial = org?.charAt(0)?.toUpperCase() || "?";
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
        isDarkMode ? "bg-white/[0.06]" : "bg-[var(--lm-accent)]/10"
      }`}
    >
      {failed ? (
        <span className={`font-playfair text-base font-bold ${isDarkMode ? "text-amber-400" : "text-[var(--lm-accent)]"}`}>
          {initial}
        </span>
      ) : (
        <img
          src={`${PUBLIC}/assets/${src}`}
          alt={`${org} logo`}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

const ExperienceRow = ({ item, isDarkMode }) => {
  return (
    <div className={`border-b ${isDarkMode ? "border-white/[0.06]" : "border-[var(--lm-border)]"}`}>
      <div className="flex w-full items-center gap-3 py-6 text-left">
        <Logo src={item.logo} org={item.org} isDarkMode={isDarkMode} />
        <div className="min-w-0 flex-1">
          <p className={`truncate font-semibold leading-tight ${isDarkMode ? "text-white" : "text-[var(--lm-text-primary)]"}`}>
            {item.title}
          </p>
          <p className={`truncate text-sm font-medium ${isDarkMode ? "text-amber-400/90" : "text-[var(--lm-accent)]"}`}>
            {item.org}
          </p>
        </div>
        {item.date && (
          <span className={`shrink-0 font-mono text-[11px] uppercase tracking-wider tabular-nums ${isDarkMode ? "text-[#8B9DB0]/70" : "text-[var(--lm-text-muted)]/70"}`}>
            {item.date}
          </span>
        )}
      </div>
      <p className={`pb-6 pl-[52px] text-sm leading-relaxed ${isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]"}`}>
        {item.description}
      </p>
    </div>
  );
};

const ExperienceList = ({ isDarkMode }) => (
  <div className="w-full">
    {EXPERIENCE.map((item) => (
      <ExperienceRow key={item.title} item={item} isDarkMode={isDarkMode} />
    ))}
  </div>
);

export default ExperienceList;
