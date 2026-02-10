import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SITE_NAME = 'TikTokSaver';
const DEFAULT_IMAGE = '/og-image.png'; // Should add this image later
const BASE_URL = 'https://tiktoksaver.app'; // Replace with real domain

const SeoHead = ({ 
  title, 
  description, 
  keywords = 'tiktok downloader, instagram downloader, facebook video downloader, no watermark, free video download',
  image = DEFAULT_IMAGE,
  url = BASE_URL
}: SeoHeadProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
    </Helmet>
  );
};

export default SeoHead;
