import { motion } from 'framer-motion';
import { Waves, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative text-text-main bg-bg-dark font-sans">
      <main className="grow w-full flex flex-col items-center py-20 px-4">
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
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">1. Introducción</h2>
                <p>Bienvenido a TikTokSaver ("nosotros", "nuestro" o "la Plataforma"). Su privacidad es de suma importancia para nosotros. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web y utiliza nuestros servicios de descarga de contenido.</p>
                <p className="mt-2">Lea detenidamente esta política de privacidad. Si no está de acuerdo con los términos de esta política de privacidad, no acceda al sitio.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">2. Recopilación de Información</h2>
                <p>Nuestro servicio está diseñado para funcionar sin requerir el registro de usuarios ni la recopilación de información de identificación personal (PII). No solicitamos nombres, correos electrónicos ni números de teléfono.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Datos de Uso:</strong> Podemos recopilar información anónima sobre cómo se accede y utiliza el Servicio ("Datos de Uso"). Estos Datos de Uso pueden incluir información como la dirección de Protocolo de Internet (IP) de su computadora (de forma anonimizada), tipo de navegador, versión del navegador, las páginas de nuestro Servicio que visita, la hora y fecha de su visita y el tiempo dedicado a esas páginas.</li>
                  <li><strong>URLs Procesadas:</strong> Las URLs de los videos que usted ingresa para descargar se envían a nuestros servidores únicamente con el propósito de procesar la solicitud. No mantenemos un historial vinculado a usuarios específicos de estas descargas.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">3. Uso de la Información</h2>
                <p>La información limitada que recopilamos se utiliza para:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Proporcionar y mantener nuestro Servicio.</li>
                  <li>Detectar, prevenir y abordar problemas técnicos.</li>
                  <li>Monitorizar el uso del Servicio para mejorar la experiencia del usuario.</li>
                  <li>Defender nuestros derechos legales y proteger la seguridad de los usuarios.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">4. Cookies y Tecnologías de Rastreo</h2>
                <p>No utilizamos cookies invasivas ni rastreadores publicitarios. Podemos utilizar almacenamiento local (LocalStorage) o cookies de sesión esenciales para recordar sus preferencias de configuración (como el idioma o el tema oscuro) y asegurar el correcto funcionamiento técnico del sitio.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">5. Servicios de Terceros</h2>
                <p>Nuestro servicio interactúa con plataformas de terceros (como TikTok, Instagram, Facebook) para recuperar el contenido solicitado. No somos responsables de las prácticas de privacidad de estos sitios de terceros. Le recomendamos revisar las políticas de privacidad de cualquier sitio que visite.</p>
                <p className="mt-2">Podemos utilizar servicios de análisis de terceros anónimos (como estadísticas de servidor) para evaluar el tráfico, pero estos datos no se cruzan con perfiles de usuarios individuales.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">6. Seguridad de los Datos</h2>
                <p>Valoramos su confianza al proporcionarnos su información, por lo que nos esforzamos por utilizar medios comercialmente aceptables para protegerla. Sin embargo, recuerde que ningún método de transmisión a través de Internet o método de almacenamiento electrónico es 100% seguro y confiable, y no podemos garantizar su seguridad absoluta.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">7. Privacidad de los Menores</h2>
                <p>Nuestros Servicios no están dirigidos a personas menores de 13 años. No recopilamos a sabiendas información de identificación personal de niños menores de 13 años. Si descubrimos que un niño menor de 13 años nos ha proporcionado información personal, la eliminamos inmediatamente de nuestros servidores.</p>
              </section>

              <section>
                <h2 className="text-white font-bold uppercase tracking-wider mb-3 text-lg">8. Cambios a Esta Política</h2>
                <p>Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le recomendamos que revise esta página periódicamente para ver si hay cambios. Le notificaremos de cualquier cambio publicando la nueva Política de Privacidad en esta página. Estos cambios son efectivos inmediatamente después de su publicación.</p>
              </section>
            </div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
