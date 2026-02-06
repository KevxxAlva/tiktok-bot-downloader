# TikTokSaver - TikTok Downloader

A high-performance, minimalist web application to download TikTok videos without watermarks and extract audio (MP3).

## ⚡ Features

- **No Watermark**: Downloads clean, high-quality videos directly from TikTok.
- **Audio Extraction**: One-click MP3 download support.
- **Cyber-Brutalist UI**: A reimagined interface featuring a minimal dark aesthetic with neon lime accents (`#ccff00`).
- **Privacy Focused**: Includes a server-side image proxy to bypass hotlinking restrictions and protect user privacy.
- **Responsive**: Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

**Frontend:**

- **React 18** (via Vite)
- **Tailwind CSS** (v4 compatible)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

**Backend:**

- **Node.js** & **Express**
- **@tobyg74/tiktok-api-dl** (Scraping/API)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (or bun/yarn)

### Installation

1.  **Clone the repository**

2.  **Install Application Dependencies**

    This project is a monorepo structure with `client` and `server` folders.

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

### Running the App

You need to run both the backend and frontend terminals simultaneously.

1.  **Start the Backend Server**

    ```bash
    cd server
    node index.js
    ```

    _Server runs on port 3000._

2.  **Start the Frontend**

    ```bash
    cd client
    npm run dev
    ```

    _Client runs on port 5173._

3.  **Access the App**
    Open `http://localhost:5173` in your browser.

## 🎨 Design System

The application uses a custom **"Echo Oracle"** inspired design system:

- **Backgrounds**: Deep matte black (`#0e0e0e`, `#1a1a1a`).
- **Accent**: Neon Lime (`#ccff00`).
- **Typography**: Inter (Bold/Black weights, Uppercase).
- **Components**: Solid matte cards, sharp edges, and high-contrast controls.
