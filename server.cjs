require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS
const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://workaferaw-motion-archive.vercel.app',
    'https://portfolio-workaferaws-projects.vercel.app'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.post('/api/chat', async (req, res) => {
  console.log('Received chat request:', { 
    messageLength: req.body.message?.length,
    hasPrePrompt: !!req.body.prePrompt 
  });

  const userMessage = req.body.message;
  const prePrompt = req.body.prePrompt;
  const geminiApiKey = process.env.GEMINI_API_KEY; 

  if (!geminiApiKey) {
    console.error('API key missing');
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  if (!userMessage) {
    console.error('No message provided');
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    console.log('Sending request to Gemini API');
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
      return res.status(response.status).json({ 
        error: 'Error from Gemini API', 
        details: errorData,
        status: response.status 
      });
    }

    const data = await response.json();
    console.log('Received response from Gemini API');
    res.json(data.candidates[0].content.parts[0].text);

  } catch (error) {
    console.error('Proxy server error:', error);
    res.status(500).json({ 
      error: 'Internal server error.',
      message: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Gemini Proxy Server running on http://localhost:${port}`);
  console.log('CORS enabled for origins:', corsOptions.origin);
}); 