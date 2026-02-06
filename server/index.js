const express = require('express');
const cors = require('cors');
const { TiktokDL } = require('@tobyg74/tiktok-api-dl');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/download', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  console.log(`Fetching: ${url}`);

  try {
    const result = await TiktokDL(url, {
      version: "v1" 
    });
    
    // Log for debugging
    console.log('Result:', result);

    if (result && result.result) {
       res.json(result);
    } else {
       res.status(500).json({ error: 'Could not retrieve video data', raw: result });
    }

  } catch (error) {
    console.error('Error downloading:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
