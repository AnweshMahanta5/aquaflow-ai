# AquaFlow AI

Interactive water flow visualizer + Gemini AI assistant + dynamic plumber locator.

## How to run

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Enable Gemini (AI)

Edit `src/services/gemini.js` and replace:

```js
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
```

with your real API key from Google AI Studio.

The "Ask Gemini" button in the AI panel will then call the live Gemini model.
There is **no hardcoded AI answer** – everything comes from Gemini.

## Enable Google Maps (dynamic plumbers)

Edit `src/config.js` and replace:

```js
export const GOOGLE_MAPS_EMBED_API_KEY = 'YOUR_GOOGLE_MAPS_EMBED_API_KEY_HERE';
```

with your Google Maps Embed API key.

The plumber locator will then use your current location (via browser geolocation)
and show live "plumber" results around you. If geolocation or the key is not
available, it falls back to a generic "plumber near me" search in Google Maps.
