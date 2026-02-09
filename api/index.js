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

// Main Download Endpoint - Multi-Platform
app.get('/api/download', async (req, res) => {
  const { url, platform = 'tiktok' } = req.query;

  if (!url) {
    return res.status(400).json({ status: 'error', error: 'URL is required' });
  }

  console.log(`[${new Date().toISOString()}] Platform: ${platform}, URL: ${url}`);

  try {
    let result;

    switch (platform) {
      case 'instagram':
        result = await downloadInstagram(url);
        break;
      case 'tiktok':
      default:
        result = await downloadTikTok(url);
        break;
    }

    return res.json(result);
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ 
      status: 'error', 
      error: error.message || 'Failed to process request' 
    });
  }
});

// TikTok Download Function
async function downloadTikTok(url) {
  console.log(`[TikWM] Fetching: ${url}`);

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
      
      // 1. Standard Clean Video (H.264 Compatible) - ONLY if not a slideshow
      // We prioritize 'play' over 'hdplay' because 'hdplay' often uses HEVC codec which fails on Windows Media Player.
      // If it's a slideshow (images), we skip video downloads because TikWM often returns a broken/black video render.
      if (!data.images || data.images.length === 0) {
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
      
      // Images (Slideshow)
      if (data.images && Array.isArray(data.images)) {
          console.log(`[TikWM] Found ${data.images.length} images`);
      }

      if (downloads.length === 0 && (!data.images || data.images.length === 0)) {
          throw new Error('Could not find a watermark-free version. The video might be private or region-locked.');
      }

      const cleanResult = {
        status: 'success',
        result: {
            downloads: downloads, 
            video: downloads.length > 0 ? [downloads[0].url] : [],
            images: data.images || [], // New field for images
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
      return cleanResult;
    } else {
       console.error('TikWM Error:', tikData);
       throw new Error(tikData.msg || 'Could not fetch video info from provider.');
    }

  } catch (error) {
    console.error('Error downloading from TikTok:', error);
    throw error;
  }
}

const { instagramGetUrl } = require("instagram-url-direct");

// Instagram Download Function
async function downloadInstagram(url) {
  console.log(`[Instagram] Fetching: ${url}`);

  try {
    const data = await instagramGetUrl(url);
    
    if (!data.url_list || data.url_list.length === 0) {
      throw new Error('No media found in this Instagram post.');
    }

    const downloads = [];
    const images = [];
    const videos = [];

    // Process all media (images & videos)
    data.url_list.forEach((mediaUrl) => {
      // Instagram URLs usually contain query params, we clean them if needed
      // but keep them intact for download validity.
      // Detecting type is tricky sometimes, so we default to download option.

      // Guess type from URL or just offer generic download
      // Usually, images end in .jpg/.webp, videos in .mp4
      
      // Let's create a generic "Media" option
      downloads.push({
          type: 'normal', // Treat everything as normal download
          label: 'Descargar Medio',
          url: mediaUrl,
          size: null
      });

      // Also categorize for preview
      // (This is a simplified check, ideally we'd check headers)
      if (mediaUrl.includes('.mp4')) {
          videos.push(mediaUrl);
      } else {
          images.push(mediaUrl);
      }
    });

    const cleanResult = {
      status: 'success',
      result: {
        downloads: downloads,
        video: videos,
        images: images,
        music: null, // Instagram generally doesn't expose separate audio
        cover: images.length > 0 ? images[0] : '', // Use first image as cover
        desc: 'Instagram Post', // Description isn't always available
        author: {
          nickname: 'Instagram User', // We don't get author name easily
          avatar: ''
        }
      }
    };

    console.log(`[Instagram] Found ${downloads.length} items`);
    return cleanResult;

  } catch (error) {
    console.error('Error downloading from Instagram:', error);
    throw new Error('Could not fetch Instagram content: ' + error.message);
  }
}

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

    if (contentType && !contentType.includes('video') && !contentType.includes('audio') && !contentType.includes('octet-stream')) {
        console.warn(`[Proxy] Unusual content-type: ${contentType}, proceeding anyway.`);
    }

    // We buffer the file to ensure we have it all and can set correct Content-Length
    const arrayBuffer = await response.arrayBuffer();
    const mediaBuffer = Buffer.from(arrayBuffer);

    // Smart filename correction based on Content-Type
    let finalFilename = safeFilename;
    if (contentType) {
        if (contentType.includes('audio') && finalFilename.endsWith('.mp4')) {
            finalFilename = finalFilename.replace('.mp4', '.mp3');
        } else if (contentType.includes('image') && finalFilename.endsWith('.mp4')) {
             finalFilename = finalFilename.replace('.mp4', '.jpeg');
        }
    }

    res.setHeader('Content-Disposition', `attachment; filename="${finalFilename}"`);
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    res.setHeader('Content-Length', mediaBuffer.length);

    res.end(mediaBuffer);
    
  } catch (error) {
    console.error('Proxy download error:', error);
    if (!res.headersSent) res.status(500).send(`Error downloading file: ${error.message}`);
  }
});

// For local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
