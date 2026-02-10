# TikTokSaver - Multi-Platform Video Downloader

Una aplicación web de alto rendimiento y diseño minimalista ("Cyber-Brutalist") diseñada para descargar contenido multimedia (video y audio) de TikTok, Instagram y Facebook sin marcas de agua.

<<<<<<< HEAD
<img width="1350" height="641" alt="App Screenshot" src="https://github.com/user-attachments/assets/ce7886bb-a9b7-4572-be67-9b2ef306d0a8" />
=======
<img width="1349" height="641" alt="image" src="https://github.com/user-attachments/assets/1eac6070-6ee4-4962-a269-6830339c71cc" />
>>>>>>> 5cb7b0fa20b0e2a7228685954cbe0a90d1be0bfd

## ⚡ Características Principales

- **Soporte Multi-Plataforma**: Descarga videos de:
  - **TikTok**: Sin marca de agua, HD, Audio MP3, Slideshows.
  - **Instagram**: Reels, Videos, Imágenes.
  - **Facebook**: Videos HD/SD.
- **Sin Marca de Agua**: Garantizamos la descarga del video limpio siempre que sea posible.
- **Extracción de Audio**: Convierte y descarga el audio de tus videos favoritos en MP3.
- **Metadatos Completos**: Descarga también la portada (thumbnail) del video.
- **Interfaz Cyber-Brutalist**: Diseño moderno, oscuro y de alto contraste con acentos neón (`#ccff00`).
- **SEO Optimizado**:
  - Meta etiquetas dinámicas con `react-helmet-async`.
  - Mapa del sitio (`sitemap.xml`) y `robots.txt` configurados para indexación.
- **Enfoque en Privacidad**: Proxy de descarga integrado para evitar rastreo y bloqueos por Referer.
- **Responsivo**: Experiencia fluida en móviles y escritorio.

## 📄 Documentación

Para una visión detallada de los requisitos y especificaciones del producto, consulta el [Documento de Requisitos del Producto (PRD)](./PRD.md).

## 🛠️ Tecnologías

### Frontend (Client)

- **React 18** + **Vite**
- **Tailwind CSS** (Estilos utilitarios)
- **Framer Motion** (Animaciones fluidas)
- **React Helmet Async** (SEO)
- **Lucide React** (Iconografía)
- **Axios** (Peticiones HTTP)

### Backend (API)

- **Node.js** + **Express**
- **Bun** (Runtime recomendado)
- **Scraping Libraries**:
  - `@tobyg74/tiktok-api-dl`
  - `instagram-url-direct`
  - `fb-downloader-scrapper`

## 🚀 Instalación y Ejecución

### Prerrequisitos

- **Bun** (v1.0+ recomendado para mayor velocidad)
- Node.js (v18+ si no usas Bun)

### Pasos

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/tu-usuario/tiktoksaver.git
    cd tiktoksaver
    ```

2.  **Configurar y Ejecutar el Backend (API)**

    ```bash
    cd api
    bun install
    bun start
    ```

    _El servidor API correrá en `http://localhost:3000`_

3.  **Configurar y Ejecutar el Frontend (Cliente)**
    Abre una nueva terminal:

    ```bash
    cd client
    bun install
    bun dev
    ```

    _El cliente correrá en `http://localhost:5173`_

4.  **¡Listo!**
    Abre tu navegador en `http://localhost:5173`.

## 🎨 Sistema de Diseño "Echo Oracle"

La aplicación utiliza un sistema de diseño personalizado:

- **Fondos**: Negro Mate Profundo (`#0e0e0e`, `#1a1a1a`).
- **Acento**: Verde Lima Neón (`#ccff00`).
- **Tipografía**: Inter (Bold/Black, Mayúsculas para títulos).
- **Componentes**: Tarjetas sólidas, bordes definidos, micro-interacciones rápidas.

## 📜 Licencia

Este proyecto es para fines educativos. El uso de este software para descargar contenido protegido por derechos de autor sin permiso puede violar los términos de servicio de las plataformas respectivas.
