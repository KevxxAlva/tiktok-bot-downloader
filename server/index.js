const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Image Proxy
app.get('/api/proxy-image', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('URL required');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    const headers = {
      'Content-Type': response.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000',
    };
    
    res.set(headers);
    res.send(Buffer.from(buffer));
  } catch (error) {
    if (error.name === 'AbortError') return res.status(504).send('Timeout');
    console.error('Proxy image error:', error);
    res.status(500).send('Error');
  } finally {
    clearTimeout(timeoutId);
  }
});

// Main Download Endpoint using TikWM API
app.get('/api/download', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: 'error', error: 'URL is required' });
  }

  console.log(`[${new Date().toISOString()}] Fetching via TikWM: ${url}`);

  try {
    const formData = new FormData();
    formData.append('url', url);
    formData.append('hd', '1');

    const tikResponse = await fetch('https://www.tikwm.com/api/', {
      method: 'POST',
      body: formData,
    });

    const tikData = await tikResponse.json();

    if (tikData.code === 0 && tikData.data) {
      const data = tikData.data;
      
      const downloads = [];
      
      // 1. Standard Clean Video (H.264 Compatible)
      // We prioritize 'play' over 'hdplay' here because 'hdplay' often uses HEVC codec which fails on Windows Media Player (`0xc00d5212`).
      if (data.play) {
          downloads.push({
              type: 'normal',
              label: 'Sin Marca',
              url: data.play,
              size: data.size
          });
      } else if (data.hdplay && !data.hdplay.includes('error')) {
          // Fallback to HD if standard is missing
          downloads.push({
              type: 'normal',
              label: 'Sin Marca',
              url: data.hdplay,
              size: data.hd_size
          });
      }


      // Watermarked Video (Original/HD)
      if (data.wmplay) {
          downloads.push({
              type: 'watermark',
              label: 'Con Marca (HD)',
              url: data.wmplay,
              size: data.wm_size || data.size // Fallback size
          });
      }

      // Music
      if (data.music) {
          downloads.push({
              type: 'music',
              label: 'Audio MP3',
              url: data.music,
              size: null
          });
      }
      
      if (downloads.length === 0) {
          return res.status(404).json({ 
              status: 'error', 
              error: 'Could not find a watermark-free version. The video might be private or region-locked.' 
          });
      }

      const cleanResult = {
        status: 'success',
        result: {
            downloads: downloads, // New structured list
            video: [downloads[0].url], // Keep for legacy/fallback
            music: data.music,
            cover: data.cover,
            desc: data.title,
            author: {
                nickname: data.author.nickname,
                avatar: data.author.avatar
            }
        }
      };

      console.log('Sending structured downloads:', downloads.map(d => d.type));
      return res.json(cleanResult);
    } else {
       console.error('TikWM Error:', tikData);
       return res.status(500).json({ 
           status: 'error', 
           error: 'Could not fetch video info from provider.',
           details: tikData.msg 
       });
    }

  } catch (error) {
    console.error('Error downloading:', error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

// Video Proxy Streamer
app.get('/api/proxy-download', async (req, res) => {
  const { url, filename } = req.query;
  if (!url) return res.status(400).send('URL required');

  // Sanitize filename to prevent header errors with special characters/emojis
  const safeFilename = (filename || 'tiktok_video.mp4').replace(/[^a-zA-Z0-9._-]/g, '_');

  console.log(`[Proxy] Downloading: ${url}`);

  try {
    // Retry logic with different headers
    let response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://www.tiktok.com/',
            'Range': 'bytes=0-',
        }
    });

    if (response.status === 403) {
        console.log('[Proxy] 403 detected, retrying without Referer...');
        response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            }
        });
    }

    if (!response.ok) throw new Error(`Failed to fetch video: ${response.statusText}`);

    const contentType = response.headers.get('content-type');
    console.log(`[Proxy] Content-Type: ${contentType}`);

    if (contentType && !contentType.includes('video') && !contentType.includes('octet-stream')) {
        throw new Error('Target is not a video file');
    }

    // We buffer the file to ensure we have it all and can set correct Content-Length
    const arrayBuffer = await response.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', videoBuffer.length);

    res.end(videoBuffer);
    
  } catch (error) {
    console.error('Proxy download error:', error);
    if (!res.headersSent) res.status(500).send('Error downloading video');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
