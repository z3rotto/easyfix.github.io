import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

dotenv.config();

const app = express();

// Apply a rate limiter to the API endpoint to prevent abuse
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per window
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes.'
});

app.use(express.json());
app.use(express.static('.'));

app.post('/api/generateContent', apiLimiter, async (req, res) => {
  const apiKey = req.body.apiKey || process.env.API_KEY;
  if (!apiKey) {
    return res.status(400).json({ error: 'API key not configured' });
  }
  const requestBody = { ...req.body };
  delete requestBody.apiKey;
  try {
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
