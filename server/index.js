const express = require('express');
const cors = require('cors');
const { Downloader } = require('@tobyg74/tiktok-api-dl');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Image Proxy to bypass referrer protection
app.get('/api/proxy-image', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('URL required');

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    const headers = {
      'Content-Type': response.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
    };
    
    res.set(headers);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Proxy image error:', error);
    res.status(500).send('Error fetching image');
  }
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
  // Basic validation, let the library handle complex cases
  if (!url.includes('tiktok.com')) {
     return res.status(400).json({
      status: 'error',
      error: 'Please provide a valid TikTok URL'
    });
  }

  console.log(`[${new Date().toISOString()}] Fetching: ${url}`);

  try {
    // Attempt with version "v1"
    let result = await Downloader(url, { version: "v1" });
    
    // If v1 fails/returns empty, try "v2"
    if (!result || result.status !== 'success') {
      console.log('v1 failed or empty, trying v2...');
      result = await Downloader(url, { version: "v2" });
    }

    console.log('Result status:', result?.status);

    if (result && result.status === 'success' && result.result) {
      // Transform result to match frontend expectations
      // Frontend expects: result.video as string[]
      // Library returns: result.video as { noWatermark: string, watermark: string, ... } or string[] depending on version
      
      const originalResult = result.result;
      let finalVideo = [];

      if (Array.isArray(originalResult.video)) {
        finalVideo = originalResult.video;
      } else if (typeof originalResult.video === 'object' && originalResult.video !== null) {
        // Extract URLs from object
        if (originalResult.video.noWatermark) finalVideo.push(originalResult.video.noWatermark);
        if (originalResult.video.watermark) finalVideo.push(originalResult.video.watermark);
        // Fallback or other properties
        if (finalVideo.length === 0 && originalResult.video.downloadAddr) finalVideo.push(originalResult.video.downloadAddr);
      } else if (typeof originalResult.video === 'string') {
        finalVideo.push(originalResult.video);
      }

      // Ensure we have at least one video URL
      if (finalVideo.length === 0) {
         console.error('No video URLs found in result:', originalResult);
         throw new Error('No video URLs found');
      }

      // Construct safe response
      const cleanResult = {
        status: 'success',
        result: {
            ...originalResult,
            video: finalVideo, // Ensure it's an array
            music: originalResult.music?.playUrl?.[0] || originalResult.music?.play_url?.uri || originalResult.music, // Normalize music URL if needed
            cover: Array.isArray(originalResult.cover) ? originalResult.cover[0] : 
                   (originalResult.cover || 
                    originalResult.coverLarge?.[0] || 
                    originalResult.coverMedium?.[0] || 
                    originalResult.coverThumb?.[0] ||
                    originalResult.video?.cover ||
                    originalResult.ai_dynamic_cover ||
                    originalResult.origin_cover),
            desc: originalResult.description || originalResult.desc,
            author: {
                nickname: originalResult.author?.nickname || originalResult.author?.unique_id,
                avatar: originalResult.author?.avatarLarger || originalResult.author?.avatarThumb || originalResult.author?.avatar
            }
        }
      };

      res.json(cleanResult);
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
