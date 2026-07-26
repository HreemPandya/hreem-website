# Spotify now-playing proxy

Deployed on Vercel as a standalone serverless function (separate from the
GitHub Pages static build, which can't hold secrets or run server code).

## Setup

1. Import this repo into a new Vercel project (Vercel builds the whole repo,
   but only `/api/now-playing` is actually used — the CRA build it also
   produces is harmless and can be ignored).
2. In the Vercel project's Settings → Environment Variables, add:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN` — from a one-time OAuth authorize with scope
     `user-read-currently-playing` (and `user-read-playback-state`) against
     your own Spotify account.

   Never put these in a committed `.env` file — this repo's root `.env` is
   tracked by git.
3. Deploy. The live endpoint will be
   `https://<your-vercel-project>.vercel.app/api/now-playing`.
4. The frontend (deployed separately on GitHub Pages via `npm run deploy`)
   calls this endpoint cross-origin. The live URL
   `https://hreem-website.vercel.app/api/now-playing` is baked in as the
   default in `src/components/SpotifyNowPlaying.jsx`, so no build-time env var
   is required. Override with `REACT_APP_SPOTIFY_API_URL` only if the Vercel
   project URL changes.
