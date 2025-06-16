# easyfix.github.io

This project now includes a small Node.js proxy to keep your API key secure.

## Development setup

1. Install dependencies with `npm install`.
2. Create a `.env` file in the project root containing:
   
   ```
   API_KEY=YOUR_GEMINI_API_KEY
   ```
3. Start the server with `npm start` and open `http://localhost:3000` in your browser.

The client will call `/api/generateContent`, which the proxy forwards to the official API adding the key from `.env`.
