# easyfix.github.io

This project now includes a small Node.js proxy to keep your API key secure. You can also provide your own Google API key directly in the app settings for testing.

The interface shows a short onboarding on first launch explaining the main features. A button in the settings tab allows you to view the tutorial again.

## Development setup

1. Install dependencies with `npm install`.
2. Create a `.env` file in the project root containing:
   
   ```
   API_KEY=YOUR_GEMINI_API_KEY
   ```
3. Start the server with `npm start` and open `http://localhost:3000` in your browser.

When running `npm start` the client calls `/api/generateContent`, which the proxy forwards to the official API adding the key from `.env` or the one saved in your browser settings.

If you host `index.html` on a static site such as GitHub Pages the app detects the absence of the proxy and sends requests directly to the Google API. In this case just enter your API key in the settings screen; it will be stored locally in your browser.
