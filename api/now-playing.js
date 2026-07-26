// Vercel serverless function: proxies the Spotify "currently playing" endpoint
// so the client secret and refresh token never reach the browser. Deployed
// separately from the GitHub Pages static site — see api/README.md.
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";

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

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate=30");

  try {
    const accessToken = await getAccessToken();
    const nowRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (nowRes.status === 204 || nowRes.status === 202) {
      return res.status(200).json({ isPlaying: false });
    }
    if (!nowRes.ok) {
      throw new Error(`now-playing failed: ${nowRes.status}`);
    }

    const data = await nowRes.json();
    const item = data?.item;
    if (!item || !data.is_playing) {
      return res.status(200).json({ isPlaying: false });
    }

    return res.status(200).json({
      isPlaying: true,
      title: item.name,
      artist: (item.artists || []).map((a) => a.name).join(", "),
      album: item.album?.name ?? null,
      albumArt: item.album?.images?.[1]?.url || item.album?.images?.[0]?.url || null,
      songUrl: item.external_urls?.spotify ?? null,
    });
  } catch (err) {
    return res.status(500).json({ isPlaying: false, error: "spotify_unavailable" });
  }
};
