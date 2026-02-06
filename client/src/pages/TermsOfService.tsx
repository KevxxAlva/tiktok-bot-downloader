
import { motion } from 'framer-motion';
import { Waves, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center py-20 px-4">
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
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tighter">Términos de Servicio</h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed font-light">
            <section>
              <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">1. Aceptación de los Términos</h2>
              <p>Al acceder y utilizar TikTokSaver, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al servicio.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">2. Uso Educativo</h2>
              <p>Esta herramienta ha sido creada exclusivamente con fines educativos y de demostración técnica. El usuario es el único responsable del uso que haga del contenido descargado.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">3. Propiedad Intelectual</h2>
              <p>No reclamamos ningún derecho de propiedad sobre los videos descargados a través de este servicio. Todo el contenido pertenece a sus respectivos creadores y a la plataforma TikTok. Respetamos los derechos de propiedad intelectual y esperamos que nuestros usuarios hagan lo mismo.</p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">4. Limitación de Responsabilidad</h2>
              <p>TikTokSaver se proporciona "tal cual", sin garantías de ningún tipo. No seremos responsables de ningún daño, directo o indirecto, que surja del uso o la imposibilidad de uso de este servicio.</p>
            </section>
          </div>
        </motion.div>
      </div>

      <footer className="mt-auto py-8 text-center border-t border-[#1a1a1a] w-full">
        <p className="text-gray-700 text-xs uppercase font-bold tracking-widest">© 2026 TikTokSaver</p>
      </footer>
    </div>
  );
};

export default TermsOfService;
