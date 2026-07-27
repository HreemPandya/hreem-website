// Vercel serverless function: proxies the Spotify playback endpoints so the
// client secret and refresh token never reach the browser. Returns the live
// track when playing, else the most recently played track. Deployed separately
// from the GitHub Pages static site — see api/README.md.
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) throw new Error(`token refresh failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

// Normalize a Spotify track object into the shape the widget consumes.
function shapeTrack(item, isPlaying) {
  if (!item) return null;
  return {
    isPlaying,
    title: item.name,
    artist: (item.artists || []).map((a) => a.name).join(", "),
    album: item.album?.name ?? null,
    albumArt: item.album?.images?.[1]?.url || item.album?.images?.[0]?.url || null,
    songUrl: item.external_urls?.spotify ?? null,
  };
}

async function getRecent(accessToken) {
  const res = await fetch(RECENT_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return { isPlaying: false };
  const data = await res.json();
  const item = data?.items?.[0]?.track;
  return shapeTrack(item, false) || { isPlaying: false };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Short shared cache: bounds how often the function actually runs while
  // keeping the widget within a few seconds of live.
  res.setHeader("Cache-Control", "s-maxage=5, stale-while-revalidate=10");

  try {
    const accessToken = await getAccessToken();
    const nowRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 204/202 = nothing playing → fall back to recently played.
    if (nowRes.status === 204 || nowRes.status === 202) {
      return res.status(200).json(await getRecent(accessToken));
    }
    if (!nowRes.ok) {
      throw new Error(`now-playing failed: ${nowRes.status}`);
    }

    const data = await nowRes.json();
    const item = data?.item;
    if (!item || !data.is_playing) {
      return res.status(200).json(await getRecent(accessToken));
    }

    return res.status(200).json(shapeTrack(item, true));
  } catch (err) {
    return res.status(500).json({ isPlaying: false, error: "spotify_unavailable" });
  }
};
