const express = require('express');
const cors = require('cors');
const { TiktokDL } = require('@tobyg74/tiktok-api-dl');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/download', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ 
      status: 'error',
      error: 'URL is required' 
    });
  }

  // Validate TikTok URL
  const tiktokRegex = /^https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\/.+/i;
  if (!tiktokRegex.test(url)) {
    return res.status(400).json({
      status: 'error',
      error: 'Please provide a valid TikTok URL'
    });
  }

  console.log(`[${new Date().toISOString()}] Fetching: ${url}`);

  try {
    // Try v1 first, fallback to v2 if needed
    let result = await TiktokDL(url, { version: "v1" });
    
    if (!result || !result.result) {
      console.log('v1 failed, trying v2...');
      result = await TiktokDL(url, { version: "v2" });
    }

    if (!result || !result.result) {
      console.log('v2 failed, trying v3...');
      result = await TiktokDL(url, { version: "v3" });
    }
    
    console.log('Result status:', result?.status);

    if (result && result.result) {
      res.json({
        status: 'success',
        result: result.result
      });
    } else {
      res.status(500).json({ 
        status: 'error',
        error: 'Could not retrieve video data. The video might be private or deleted.',
        details: result?.message || 'Unknown error'
      });
    }

  } catch (error) {
    console.error('Error downloading:', error.message);
    res.status(500).json({ 
      status: 'error',
      error: 'Failed to process the video. Please try again.',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/download?url=<tiktok_url>`);
});
