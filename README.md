# TikTok Downloader (No Watermark)

A modern, fast web application to download TikTok videos without watermarks and extract audio.

## Getting Started

### Prerequisites

- Node.js installed.

### Setup

1.  **Install Dependencies** (If not already done):
    Note: The initial setup might still be running in the background. If you see folders `node_modules` in both `client` and `server`, you are simpler ready.

    ```bash
    cd server
    npm install
    cd ../client
    npm install
    ```

2.  **Start the Backend Server**:
    Open a terminal in the `server` folder:

    ```bash
    cd server
    node index.js
    ```

    The server will run on `http://localhost:3000`.

3.  **Start the Frontend Client**:
    Open a _new_ terminal in the `client` folder:
    ```bash
    cd client
    npm run dev
    ```
    Open the link shown (usually `http://localhost:5173`) in your browser.

## Features

- **No Watermark**: Downloads the clean video.
- **Audio Extraction**: Option to download just the MP3.
- **Modern UI**: Glassmorphism design with smooth animations.
