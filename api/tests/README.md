# API Tests

This directory contains integration tests for the various scraper libraries used by the TikTok/Instagram/Facebook downloader bot.

## Structure

### Facebook (`/facebook`)

Tests for Facebook video downloading libraries.

- `test_fb_scrapper_interface.js`: Interface check for `fb-downloader-scrapper`
- `test_fb_scrapper_run.js`: Execution test for `fb-downloader-scrapper` (Primary method used in production)
- `test_fb_video_downloader_run.js`: Execution test for `facebook-video-downloader`
- `test_fb_xavia_interface.js`: Interface check for `@xaviabot/fb-downloader`

### Instagram (`/instagram`)

Tests for Instagram downloading libraries.

- `test_insta_direct_interface.js`: Interface check for `instagram-url-direct`

### TikTok (`/tiktok`)

Tests for TikTok downloading libraries.

- `test_tiktok_tobyg74_interface.js`: Interface check for `@tobyg74/tiktok-api-dl`
