const { getFbVideoInfo } = require("fb-downloader-scrapper");

async function run() {
    try {
        const url = 'https://www.facebook.com/share/r/1883wfYMLo/'; 
        console.log("Probando:", url);
        const data = await getFbVideoInfo(url);
        console.log("Resultado:", data);
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
