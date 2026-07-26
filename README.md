# Shake for Love 🥂 — a wedding party game

Guests scan a QR code, pick a name + avatar, then race to **shake their phone**
the most times in 20–30 seconds. Everything updates live on a big screen
(projector/TV), ending in a podium for the top 3.

## Files
- `host.html` — put this on the **projector / TV / laptop screen** everyone can see. Creates the room, shows the QR code + room code, live join count, controls Start, shows the live leaderboard and final podium.
- `play.html` — this is what **guests open on their own phones** (via QR code or by typing the room code).
- `firebase-config.js` — shared config both pages load. You only edit this one file.
- `style.css` — shared visual styling.

## 1. Create a free Firebase project (5 minutes)
1. Go to https://console.firebase.google.com → **Add project** → name it anything (e.g. "wedding-game").
2. Once created, click **Realtime Database** in the left menu → **Create Database** → pick a region → start in **test mode** (fine for a one-night party; see security note below).
3. Click the gear icon → **Project settings** → scroll to **Your apps** → click the **</> (Web)** icon → register an app (nickname anything, no need for hosting).
4. Firebase shows you a `firebaseConfig` object. Copy it.

## 2. Paste your config
Open `firebase-config.js` and replace the placeholder values with the ones Firebase gave you:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## 3. Put it online (guests need a real URL to scan)
QR codes need a real hosted URL — `file://` won't work on other people's phones.
Easiest free options:

**Option A — Firebase Hosting (recommended, same project):**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # choose your project, public dir = this folder
firebase deploy
```
You'll get a URL like `https://your-project.web.app`.

**Option B — Any static host**: Netlify Drop (netlify.com/drop), Vercel, GitHub Pages, or even a personal server. Just upload all 4 files to the same folder — no build step needed.

## 4. Night-of checklist
1. Open `host.html` **on the laptop/screen connected to the projector**.
2. Pick a round length (20/25/30s) and click **Create Room**.
3. Put the QR code on screen. Announce the room code out loud too, in case scanning is slow.
4. Guests open the link (scan QR, or go to your URL's `play.html` and type the 4-letter code), enter their name, pick an avatar, and wait.
5. Once enough guests have joined, click **Start Game** — everyone gets a synced 5-second countdown, then 20–30 seconds to shake.
6. The podium appears automatically when time's up. Click **Start a New Round** to play again with the same group (scores reset, room stays open).

## Notes on shaking
- Uses the phone's motion sensor (`devicemotion`). Works on Android automatically.
- **iOS 13+** requires a one-tap permission prompt — this happens automatically during the 5-second countdown screen.
- If motion access is denied or on a device with no motion sensor (e.g. testing on a laptop), guests can just **tap the screen rapidly** instead — it counts the same.

## Security note
Test mode leaves the database open to anyone with the URL for 30 days — totally fine for a single wedding night. If you want it locked down afterward, go to **Realtime Database → Rules** and set:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
to `false`/`false` once the party's over, or add your own auth.

## Customizing
- **Avatars**: edit the `AVATARS` array near the top of `play.html`'s script.
- **Colors/fonts**: edit the CSS variables at the top of `style.css`.
- **Round length**: fixed at 60 seconds. To change it, edit `const duration = 60;` near the top of `host.html`'s script.

## Recent changes
- **Round length**: locked to 60 seconds (was a 20/25/30s picker).
- **Faster join flow**: room code, name, and avatar are now all on one screen (`play.html`) — no extra page between typing your name and getting into the room. Each join also gets a brand-new session id every time (no leftover data carried over from a previous join).
- **Shake meter**: the champagne glass is now a heart that fills with love as you shake — "Shake until the love overflows! 💕"
- **Bilingual**: English + Chinese (中文) shown together throughout `host.html` and `play.html`.
- **Music**: the host screen plays two hidden YouTube embeds — one for the lobby/game (loops continuously from "Create Room" through the shake round) and a separate one that switches in for the podium celebration, then switches back if you start a new round. The two tracks are set near the top of `host.html`'s script (`GAME_MUSIC_ID` / `PODIUM_MUSIC_ID`, currently `s2IKf3Qlt6g` and `teUWsONJkk8`) — swap the IDs to change songs. A speaker icon top-right lets you mute/unmute both. This needs the host laptop to have internet access at the venue (same as Firebase already requires) since the audio streams live from YouTube rather than being downloaded into the files.
- **Guest list on guests' phones**: guests now see the full list of who's joined (names + avatars) on their own phone while waiting, same as the host screen.
