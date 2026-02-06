const { Downloader } = require('@tobyg74/tiktok-api-dl');

async function test() {
  const url = 'https://www.tiktok.com/@marisolis1224/video/7574566208268176671';
  console.log('Fetching:', url);
  try {
    const result = await Downloader(url, { version: "v1" });
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
