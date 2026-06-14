import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Live GitHub contribution heatmap, rendered to match the site's theme.
// Data: free public mirror of GitHub's contribution graph (no token needed,
// CORS-enabled). Falls back to a small link if the service is unreachable.
const API = (username, year) =>
  `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const GAP = 2; // px gap between squares
const MONTH_ROW_H = 14; // px height of the month-label row
const WEEKDAY_W = 18; // px width of the M/W/F axis column

// Level 0 is a neutral "empty" cell; 1–4 ramp through the active theme accent
// (amber in dark mode, green in light mode) like GitHub's green ramp.
const rampFor = (isDarkMode) =>
  isDarkMode
    ? [
        "rgba(255, 255, 255, 0.06)",
        "rgba(245, 158, 11, 0.30)",
        "rgba(245, 158, 11, 0.52)",
        "rgba(245, 158, 11, 0.76)",
        "#F59E0B",
      ]
    : [
        "rgba(74, 107, 78, 0.10)",
        "rgba(74, 107, 78, 0.32)",
        "rgba(74, 107, 78, 0.52)",
        "rgba(74, 107, 78, 0.74)",
        "#4A6B4E",
      ];

// Parse "YYYY-MM-DD" as a local date (avoids UTC off-by-one on weekday math).
const parseDay = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const fmtDate = (s) => {
  const d = parseDay(s);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const GitHubContributions = ({
  isDarkMode,
  username = "HreemPandya",
  year = 2026,
}) => {
  const [contributions, setContributions] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    fetch(API(username, year), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const days = Array.isArray(data?.contributions) ? data.contributions : [];
        setContributions(days);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [username, year]);

  // Build the week-column grid: pad the first week so it starts on Sunday,
  // then chunk into 7-day columns (matching GitHub's layout).
  const { cells, numWeeks, monthLabels } = useMemo(() => {
    if (!contributions || contributions.length === 0) {
      return { cells: [], numWeeks: 0, monthLabels: [] };
    }
    const leadPad = parseDay(contributions[0].date).getDay(); // 0 = Sun
    const built = [];
    for (let i = 0; i < leadPad; i++) built.push(null);
    for (const d of contributions) built.push(d);
    while (built.length % 7 !== 0) built.push(null);

    const weeks = built.length / 7;
    const labels = [];
    let lastMonth = -1;
    let lastLabelWeek = -Infinity;
    for (let w = 0; w < weeks; w++) {
      let month = -1;
      for (let r = 0; r < 7; r++) {
        const c = built[w * 7 + r];
        if (c) {
          month = parseDay(c.date).getMonth();
          break;
        }
      }
      if (month !== -1 && month !== lastMonth) {
        if (w - lastLabelWeek >= 3) {
          labels.push({ key: `${month}-${w}`, label: MONTHS[month], week: w });
          lastLabelWeek = w;
        }
        lastMonth = month;
      }
    }
    return { cells: built, numWeeks: weeks, monthLabels: labels };
  }, [contributions]);

  const ramp = rampFor(isDarkMode);
  const mutedText = isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]";

  // Same column template for the month-label row and the cell grid so the
  // labels line up with their week. Columns flex to fit width — no scrolling.
  const gridColumns = `${WEEKDAY_W}px repeat(${numWeeks}, minmax(0, 1fr))`;

  if (status === "error") {
    return (
      <p data-doodle-ignore className={`text-sm ${mutedText}`}>
        Commit graph is on{" "}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className={`font-medium border-b transition-colors ${
            isDarkMode
              ? "border-amber-500/50 text-amber-400 hover:border-amber-400"
              : "border-[var(--lm-accent)]/50 text-[var(--lm-accent)] hover:border-[var(--lm-accent)]"
          }`}
        >
          GitHub
        </a>.
      </p>
    );
  }

  return (
    <motion.div
      data-doodle-ignore
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {status === "loading" ? (
        <div className="flex h-[110px] items-center">
          <span className={`font-mono text-xs ${mutedText}`}>loading&hellip;</span>
        </div>
      ) : (
        <>
          {/* Month labels */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridColumns,
              columnGap: GAP,
              height: MONTH_ROW_H,
            }}
          >
            {monthLabels.map((m) => (
              <span
                key={m.key}
                className={`font-mono ${mutedText}`}
                style={{
                  gridColumn: m.week + 2,
                  gridRow: 1,
                  fontSize: 9,
                  lineHeight: `${MONTH_ROW_H}px`,
                  whiteSpace: "nowrap",
                  overflow: "visible",
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Weekday axis + day cells share one grid so rows stay aligned */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridColumns,
              gridTemplateRows: "repeat(7, auto)",
              gap: GAP,
            }}
          >
            {["", "M", "", "W", "", "F", ""].map((d, r) => (
              <span
                key={`wd-${r}`}
                className={`flex items-center font-mono ${mutedText}`}
                style={{ gridColumn: 1, gridRow: r + 1, fontSize: 8 }}
              >
                {d}
              </span>
            ))}

            {cells.map((c, i) => {
              const w = Math.floor(i / 7);
              const r = i % 7;
              return c ? (
                <div
                  key={i}
                  title={`${c.count} contribution${c.count === 1 ? "" : "s"} on ${fmtDate(c.date)}`}
                  style={{
                    gridColumn: w + 2,
                    gridRow: r + 1,
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: 2,
                    backgroundColor: ramp[c.level] ?? ramp[0],
                  }}
                />
              ) : (
                <div
                  key={i}
                  style={{ gridColumn: w + 2, gridRow: r + 1, width: "100%", aspectRatio: "1 / 1" }}
                />
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default GitHubContributions;
