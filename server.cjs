require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  const prePrompt = req.body.prePrompt;
  const geminiApiKey = process.env.DEEPSEEK_API_KEY; 

  if (!geminiApiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured on server.' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: prePrompt + '\n\n' + userMessage }] },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return res.status(response.status).json({ error: 'Error from Gemini API', details: errorData });
    }

    const data = await response.json();
    res.json(data.candidates[0].content.parts[0].text);

  } catch (error) {
    console.error('Proxy server error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Gemini Proxy Server running on http://localhost:${port}`);
}); 