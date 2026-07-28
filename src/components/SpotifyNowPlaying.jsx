import { useEffect, useRef, useState } from "react";

// Compact Spotify strip: album art + track/artist, polling a small Vercel
// proxy (api/now-playing.js) that holds the refresh token server-side. Always
// visible: shows the live track when playing, otherwise falls back to the last
// played track, and a neutral placeholder if Spotify is unreachable.
//
// Spotify has no push API for playback, so "real time" = a short poll plus an
// immediate refetch whenever the tab regains focus/visibility (covers the
// common "switch song, then look at the site" case).
const API_URL =
  process.env.REACT_APP_SPOTIFY_API_URL ||
  "https://hreem-website.vercel.app/api/now-playing";
const POLL_MS = 5000;

const SpotifyGlyph = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.14 4.32-1.32 9.719-.66 13.439 1.62.361.181.54.78.302 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const SpotifyNowPlaying = ({ isDarkMode }) => {
  // null = still loading / unreachable; otherwise the normalized track payload.
  const [track, setTrack] = useState(null);
  const loadRef = useRef(null);

  useEffect(() => {
    if (!API_URL) return;
    let cancelled = false;

    const load = () => {
      // no-store keeps the browser from serving its own cache; the Vercel CDN
      // still shares a short (s-maxage) copy across pollers to bound function runs.
      fetch(API_URL, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (cancelled) return;
          setTrack(json && json.title ? json : null);
        })
        .catch(() => {
          if (!cancelled) setTrack(null);
        });
    };
    loadRef.current = load;

    load();
    const timer = setInterval(load, POLL_MS);

    // Instant refresh when the user comes back to the tab.
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", load);

    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", load);
    };
  }, []);

  const mutedText = isDarkMode ? "text-[#8B9DB0]" : "text-[var(--lm-text-muted)]";
  const accentDot = isDarkMode ? "bg-amber-400" : "bg-[var(--lm-accent)]";
  const captionColor = isDarkMode ? "text-amber-500/80" : "text-[var(--lm-accent)]/80";
  const idleDot = isDarkMode ? "bg-white/25" : "bg-black/20";

  const isPlaying = !!track?.isPlaying;
  const hasTrack = !!track?.title;
  const caption = isPlaying ? "banger song, give it a listen" : hasTrack ? "Last played" : "Not playing";

  return (
    <div data-doodle-ignore className="mt-2.5">
      <p className={`mb-1.5 font-mono text-[10px] uppercase tracking-wider ${captionColor}`}>
        {caption}
      </p>
      <a
        href={track?.songUrl || "https://open.spotify.com"}
        target="_blank"
        rel="noreferrer"
        className={`group flex max-w-full items-center gap-2.5 rounded-md border px-2.5 py-2 transition-colors ${
          isDarkMode
            ? "border-white/10 bg-[#07090D]/50 hover:border-amber-500/30"
            : "border-[var(--lm-accent)]/15 bg-[color:rgba(248,246,242,0.6)] hover:border-[var(--lm-accent)]/40"
        }`}
      >
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-sm">
          {track?.albumArt ? (
            <img src={track.albumArt} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className={`flex h-full w-full items-center justify-center ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}>
              <SpotifyGlyph className={`h-5 w-5 ${isDarkMode ? "text-white/25" : "text-black/20"}`} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 leading-tight">
          <p className={`truncate text-[13px] font-medium ${isDarkMode ? "text-[#F0F4F8]" : "text-[var(--lm-text-primary)]"}`}>
            {track?.title || "Nothing playing right now"}
          </p>
          <p className={`truncate font-mono text-[10px] ${mutedText}`}>
            {track?.artist || "hopefully i'll lock back in soon"}
          </p>
        </div>

        {isPlaying ? (
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${accentDot}`} />
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${accentDot}`} />
          </span>
        ) : (
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${idleDot}`} />
        )}

        <SpotifyGlyph
          className={`h-3.5 w-3.5 shrink-0 transition-colors ${
            isDarkMode ? "text-white/40 group-hover:text-amber-400" : "text-black/30 group-hover:text-[var(--lm-accent)]"
          }`}
        />
      </a>
    </div>
  );
};

export default SpotifyNowPlaying;
