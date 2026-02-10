
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    ga_initialized?: boolean;
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Reemplaza 'G-XXXXXXXXXX' con tu ID de medición de Google Analytics
    // O mejor aún, usa una variable de entorno: process.env.REACT_APP_GA_ID
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'PENDIENTE_SETUP'; 

    if (GA_MEASUREMENT_ID !== 'PENDIENTE_SETUP') {
       if (!window.ga_initialized) {
          ReactGA.initialize(GA_MEASUREMENT_ID);
          window.ga_initialized = true;
       }
       
       ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    } else {
        console.warn('Google Analytics ID no configurado. Añade VITE_GA_MEASUREMENT_ID en tu archivo .env');
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;
