# TikTokSaver - Descargador de TikTok

Una aplicación web minimalista de alto rendimiento para descargar videos de TikTok sin marca de agua y extraer audio (MP3).

<img width="1350" height="640" alt="image" src="https://github.com/user-attachments/assets/63bfac12-c366-4e1a-a584-44adad91920e" />

## ⚡ Características

- **Sin Marca de Agua**: Descarga videos limpios y de alta calidad directamente desde TikTok.
- **Extracción de Audio**: Soporte para descarga de MP3 con un solo clic.
- **Interfaz Cyber-Brutalist**: Una interfaz reimaginada con una estética minimalista oscura y acentos en verde lima neón (`#ccff00`).
- **Enfoque en Privacidad**: Incluye un proxy de imágenes en el servidor para evitar restricciones de hotlinking y proteger la privacidad del usuario.
- **Responsivo**: Totalmente optimizado para dispositivos de escritorio y móviles.

## 🛠️ Tecnologías

**Frontend:**

- **React 18** (vía Vite)
- **Tailwind CSS** (compatible con v4)
- **Framer Motion** (Animaciones)
- **Lucide React** (Iconos)

**Backend:**

- **Node.js** y **Express**
- **@tobyg74/tiktok-api-dl** (Scraping/API)

## 🚀 Comenzando

### Prerrequisitos

- **Bun** (v1.0+ recomendado)
- Node.js (Opcional, entorno compatible)

### Instalación

1.  **Clonar el repositorio**

2.  **Instalar Dependencias de la Aplicación**

    Este proyecto tiene una estructura de monorepo con carpetas `client` y `server`.

    ```bash
    # Instalar dependencias del servidor
    cd server
    bun install

    # Instalar dependencias del cliente
    cd ../client
    bun install
    ```

### Ejecutando la App

Necesitas ejecutar las terminales del backend y frontend simultáneamente.

1.  **Iniciar el Servidor Backend**

    ```bash
    cd server
    bun start
    ```

    _El servidor corre en el puerto 3000._

2.  **Iniciar el Frontend**

    ```bash
    cd client
    bun dev
    ```

    _El cliente corre en el puerto 5173._

3.  **Acceder a la App**
    Abre `http://localhost:5173` en tu navegador.

## 🎨 Sistema de Diseño

La aplicación utiliza un sistema de diseño personalizado inspirado en **"Echo Oracle"**:

- **Fondos**: Negro mate profundo (`#0e0e0e`, `#1a1a1a`).
- **Acento**: Verde Lima Neón (`#ccff00`).
- **Tipografía**: Inter (Pesos Bold/Black, Mayúsculas).
- **Componentes**: Tarjetas sólidas mate, bordes afilados y controles de alto contraste.
