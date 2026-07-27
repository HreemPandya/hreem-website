// One-time helper to obtain a Spotify refresh token for the now-playing widget.
//
// Usage (PowerShell):
//   $env:SPOTIFY_CLIENT_ID="xxx"; $env:SPOTIFY_CLIENT_SECRET="yyy"; node scripts/spotify-auth.js
//
// Usage (bash/git-bash):
//   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.js
//
// Prereq: in your Spotify app settings (developer.spotify.com/dashboard),
// add this exact Redirect URI:  http://127.0.0.1:8888/callback
//
// The script prints an authorize URL, you approve in the browser, and it
// prints the refresh token. Paste that token into Vercel as
// SPOTIFY_REFRESH_TOKEN. Nothing is written to disk.

const http = require("http");
const { URL } = require("url");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPE =
  "user-read-currently-playing user-read-playback-state user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET env vars.");
  process.exit(1);
}

const authorizeUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
  }).toString();

async function exchangeCode(code) {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });
  return res.json();
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (u.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const code = u.searchParams.get("code");
  const err = u.searchParams.get("error");
  if (err) {
    res.writeHead(200, { "Content-Type": "text/plain" }).end(`Authorization failed: ${err}`);
    console.error("Authorization denied:", err);
    server.close();
    process.exit(1);
  }

  const data = await exchangeCode(code);
  res.writeHead(200, { "Content-Type": "text/plain" }).end(
    "Done. You can close this tab and return to the terminal."
  );

  if (data.refresh_token) {
    console.log("\n=== SUCCESS ===");
    console.log("SPOTIFY_REFRESH_TOKEN=" + data.refresh_token);
    console.log("\nPaste that value into Vercel -> Environment Variables, then Redeploy.\n");
  } else {
    console.error("\nNo refresh token in response:", JSON.stringify(data, null, 2));
  }

  server.close();
  process.exit(0);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("\n1. Make sure this Redirect URI is registered in your Spotify app:");
  console.log("   " + REDIRECT_URI);
  console.log("\n2. Open this URL in your browser and approve:\n");
  console.log("   " + authorizeUrl + "\n");
  console.log("Waiting for the redirect back to 127.0.0.1...\n");
});
