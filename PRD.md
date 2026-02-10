# Documento de Requisitos del Producto (PRD)

**Nombre del Proyecto:** TikTokSaver / Multi-Platform Video Downloader
**Versión:** 1.0 (Borrador Actual)
**Estado:** En Desarrollo Activo

## 1. Resumen del Producto

Una aplicación web de alto rendimiento y diseño minimalista ("Cyber-Brutalist") diseñada para descargar contenido multimedia (video y audio) de múltiples redes sociales populares (TikTok, Instagram, Facebook) sin marcas de agua. La plataforma prioriza la velocidad, la privacidad del usuario y una experiencia visual premium.

## 2. Problema a Resolver

Los usuarios a menudo desean guardar videos de redes sociales para verlos sin conexión o compartirlos en otras plataformas, pero se encuentran con:

- Marcas de agua intrusivas (especialmente en TikTok).
- Interfaces llenas de publicidad abusiva en los descargadores actuales.
- Restricciones de descarga directa (CORS, hotlinking).
- Dificultad para extraer solo el audio de un video viral.

## 3. Público Objetivo

- **Creadores de Contenido:** Que necesitan reutilizar material o guardar sus propios videos limpios.
- **Usuarios Generales:** Consumidores de redes sociales que desean archivar videos favoritos.
- **Archivistas Digitales:** Usuarios que guardan contenido antes de que sea eliminado.

## 4. Requerimientos Funcionales

### 4.1. Soporte Multi-Plataforma

El sistema debe ser capaz de procesar enlaces de las siguientes fuentes:

- **TikTok:**
  - Detección automática de videos.
  - Extracción de video sin marca de agua (Prioridad).
  - Extracción de video HD (si está disponible).
  - Extracción de audio (MP3).
  - Soporte para "Slideshows" (descarga de imágenes).
- **Instagram:**
  - Descarga de Reels y Posts de video.
  - Descarga de imágenes de posts estáticos.
  - Soporte para carruseles (múltiples medios en un enlace).
- **Facebook:**
  - Extracción de videos en calidad SD y HD.
  - Manejo de videos públicos de Watch/Reels.

### 4.2. Core del Descargador

- **Proxy de Descarga (`/api/proxy-download`):**
  - El servidor debe actuar como intermediario para descargar el archivo final.
  - Debe inyectar los encabezados necesarios (`User-Agent`, `Referer`) para evitar errores 403 (Forbidden) de las redes sociales.
  - Debe renombrar inteligentemente los archivos (ej. convertir `.mp4` a `.mp3` si el contenido es audio) y sanitizar los nombres de archivo.
- **Proxy de Imágenes (`/api/proxy-image`):**
  - Evitar restricciones de hotlinking para mostrar miniaturas y avatares en el frontend.

### 4.3. Interfaz de Usuario (Frontend)

- **Selector de Plataforma:** Switch claro para elegir entre TikTok, Instagram y Facebook.
- **Input Inteligente:** Campo de texto que acepta URLs y permite la ejecución con "Enter".
- **Feedback Visual:**
  - Indicadores de carga ("Procesando...").
  - Manejo de errores explícito (ej. "Enlace privado o inválido").
- **Vista de Resultados:** Tarjeta que muestra:
  - Portada del video/imagen.
  - Descripción/Título.
  - Botones de acción claros (Descargar Video, Descargar Audio, Descargar Cover).

## 5. Requerimientos No Funcionales

### 5.1. Diseño y UX (Estética "Echo Oracle")

- **Estilo Visual:** Cyber-Brutalist.
- **Paleta de Colores:** Fondo Negro Mate (`#0e0e0e`) con acentos Verde Lima Neón (`#ccff00`).
- **Tipografía:** Inter (Pesos Bold/Black, todo en mayúsculas para encabezados).
- **Animaciones:** Uso de `framer-motion` para transiciones suaves al mostrar resultados.
- **Responsividad:** Totalmente funcional en móviles (diseño _Mobile-First_) y escritorio.

### 5.2. Tecnología y Rendimiento

- **Frontend:** React 18 + Vite (SPA).
- **Estilos:** Tailwind CSS v4 (o compatible).
- **Backend:** Node.js con entorno de ejecución **Bun** (para mayor velocidad de instalación y ejecución).
- **Arquitectura:** Monorepo (Cliente + API en el mismo proyecto).

## 6. Flujo de Usuario

1.  **Inicio:** El usuario entra a la web. Ve un diseño limpio con el selector de plataforma.
2.  **Input:** Selecciona la plataforma (ej. TikTok) y pega el enlace.
3.  **Procesamiento:** El usuario hace clic en "Revelar Contenido". El frontend llama a `/api/download`.
    - _Backend:_ Identifica la red social, usa la librería correspondiente (`@tobyg74/tiktok-api-dl`, etc.) y devuelve metadatos (URLs directas, título, cover).
4.  **Resultados:** Se muestra la tarjeta de resultados.
5.  **Descarga Final:** El usuario hace clic en "Descargar Video".
    - El enlace apunta a `/api/proxy-download` para forzar la descarga del archivo binario y evitar que el navegador solo reproduzca el video.

## 7. Roadmap (Futuro)

- **Soporte YouTube:** Implementar descarga de videos de YouTube (Solicitado recientemente).
- **Historial Local:** Guardar un historial de descargas recientes en el navegador.
- **PWA:** Convertir la web en una Progressive Web App instalable.
- **Manejo de Errores Avanzado:** Mejor detección de enlaces rotos o contenido geobloqueado.

---

### Notas Técnicas para Desarrolladores

- **Dependencia Crítica:** El proyecto depende en gran medida de librerías de scraping de terceros. Es vital mantener `package.json` actualizado y monitorear si las APIs de TikTok/IG/FB cambian sus métodos de acceso.
- **Ejecución:** Se recomienda usar `bun dev` en `client` y `bun start` en `server` para el desarrollo.
