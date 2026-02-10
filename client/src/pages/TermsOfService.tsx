import { motion } from 'framer-motion';
import { Waves, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative text-text-main bg-bg-dark font-sans">
      <main className="grow w-full flex flex-col items-center py-20 px-4">
        <SeoHead 
          title="Términos de Servicio" 
          description="Términos y condiciones de uso para TikTokSaver."
          url="/terms-of-service"
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
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tighter">Términos de Servicio</h1>
            
            <div className="space-y-8 text-gray-300 leading-relaxed font-light">
              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">1. Aceptación de los Términos</h2>
                <p>Al acceder y utilizar el sitio web y los servicios de TikTokSaver ("Servicio"), usted acepta cumplir y estar legalmente obligado por los términos y condiciones de estos Términos de Servicio ("Términos"). Si no acepta estos Términos, no debe acceder ni utilizar el Servicio.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">2. Descripción del Servicio</h2>
                <p>TikTokSaver es una herramienta basada en la web que permite a los usuarios descargar videos y audio de plataformas de redes sociales (como TikTok, Instagram, Facebook) para uso personal, educativo y no comercial. El Servicio se proporciona "tal cual" y "según disponibilidad".</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">3. Uso Permitido y Restricciones</h2>
                <p>Usted acepta utilizar el Servicio únicamente para fines legales y de acuerdo con estos Términos.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Uso Personal:</strong> Las descargas deben ser estrictamente para uso personal, educativo o de archivo privado.</li>
                  <li><strong>Respeto a los Derechos de Autor:</strong> Usted no debe utilizar este Servicio para infringir los derechos de propiedad intelectual de terceros. La descarga y redistribución de contenido protegido por derechos de autor sin el permiso del propietario está estrictamente prohibida.</li>
                  <li><strong>Prohibiciones:</strong> No debe utilizar el Servicio para descargar contenido ilegal, dañino, amenazante, abusivo, acosador, difamatorio, vulgar, obsceno, invasivo de la privacidad de otros o que incite al odio.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">4. Propiedad Intelectual</h2>
                <p>Todos los derechos, títulos e intereses en y para el Servicio (excluyendo el contenido proporcionado por los usuarios o terceros) son y seguirán siendo propiedad exclusiva de TikTokSaver y sus licenciantes. El contenido descargado a través de nuestro servicio sigue siendo propiedad de sus respectivos creadores y alojado en las plataformas de origen.</p>
                <p className="mt-2">No estamos afiliados, asociados, autorizados, respaldados ni conectados oficialmente de ninguna manera con TikTok, ByteDance Ltd., Facebook, Meta, Instagram o cualquiera de sus subsidiarias o afiliadas.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">5. Descargo de Responsabilidad de Garantías</h2>
                <p>El uso del Servicio es bajo su propio riesgo. El Servicio se proporciona sin garantías de ningún tipo, ya sean expresas o implícitas, incluidas, entre otras, las garantías implícitas de comerciabilidad, idoneidad para un propósito particular, no infracción o curso de ejecución.</p>
                <p className="mt-2">TikTokSaver no garantiza que a) el Servicio funcionará ininterrumpidamente, será seguro o estará disponible en cualquier momento o lugar en particular; b) se corregirá cualquier error o defecto; o c) los resultados del uso del Servicio cumplirán con sus requisitos.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">6. Limitación de Responsabilidad</h2>
                <p>En ningún caso TikTokSaver, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluidos, entre otros, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de su acceso o uso o la imposibilidad de acceder o usar el Servicio.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">7. Modificaciones al Servicio</h2>
                <p>Nos reservamos el derecho de retirar o modificar nuestro Servicio, y cualquier servicio o material que proporcionemos, a nuestra entera discreción y sin previo aviso. No seremos responsables si, por cualquier motivo, todo o parte del Servicio no está disponible en cualquier momento o durante cualquier período.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">8. Ley Aplicable</h2>
                <p>Estos Términos se regirán e interpretarán de acuerdo con las leyes vigentes, sin tener en cuenta sus disposiciones sobre conflictos de leyes. Nuestra falta de hacer valer cualquier derecho o disposición de estos Términos no se considerará una renuncia a esos derechos.</p>
              </section>
            </div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
