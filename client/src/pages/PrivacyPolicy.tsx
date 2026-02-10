
import { motion } from 'framer-motion';
import { Waves, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center py-20 px-4">
      <SeoHead 
        title="Política de Privacidad" 
        description="Política de privacidad de TikTokSaver. Conoce cómo protegemos tus datos y respetamos tu privacidad."
        url="/privacy-policy"
      />
      <div className="w-full max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#ccff00] transition-colors mb-8 uppercase font-bold text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="mb-6 text-[#ccff00]">
             <Waves className="w-12 h-12" strokeWidth={3} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tighter">Política de Privacidad</h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed font-light">
            <section>
              <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">1. Recopilación de Datos</h2>
              <p>TikTokSaver no recopila, almacena ni comparte información personal de los usuarios. Las URL procesadas se utilizan únicamente para recuperar el contenido solicitado y no se guardan registros permanentes de las mismas.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">2. Uso de Cookies</h2>
              <p>Este sitio no utiliza cookies de rastreo ni herramientas de análisis de terceros. Almacenamos únicamente preferencias locales básicas (como el modo oscuro o idioma) en el almacenamiento local de su navegador si es necesario.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">3. Servicios de Terceros</h2>
              <p>Esta aplicación actúa como un intermediario para procesar contenido público de TikTok. Al utilizar este servicio, usted también está sujeto a los términos y políticas de la plataforma de origen.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">4. Cambios en la Política</h2>
              <p>Nos reservamos el derecho de modificar esta política en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en esta página.</p>
            </section>
          </div>
        </motion.div>
      </div>
      
      <footer className="mt-auto py-8 text-center border-t border-[#1a1a1a] w-full">
        <p className="text-gray-700 text-xs uppercase font-bold tracking-widest">© 2026 UNIVERSAL DOWNLOADER</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
