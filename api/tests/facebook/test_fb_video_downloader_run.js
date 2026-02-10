const fbDownloader = require('facebook-video-downloader');

const url = 'https://www.facebook.com/share/r/16Teggn3Qf/'; // El mismo enlace que falló

console.log('Testing URL:', url);

async function test() {
  try {
    const result = await fbDownloader(url);
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
