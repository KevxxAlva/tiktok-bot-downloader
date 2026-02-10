import { Github, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full mt-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold text-white tracking-tighter">
                            UNIVERSAL <span className="text-[#ccff00]">DOWNLOADER</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            La herramienta definitiva para descargar contenido de tus redes sociales favoritas sin marcas de agua. Rápido, gratuito y seguro.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                            v2.5.0 Stable Release
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/privacy" className="text-gray-400 hover:text-[#ccff00] transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#ccff00] transition-colors"></span>
                                    Política de Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-400 hover:text-[#ccff00] transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#ccff00] transition-colors"></span>
                                    Términos de Servicio
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social/Connect Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Conectar</h4>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/KevxxAlva/tiktok-bot-downloader"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#ccff00] hover:text-black transition-all duration-300"
                                aria-label="Github"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            Hecho con <Heart className="w-3 h-3 inline text-red-500 mx-1 animate-pulse" /> por <span className="text-gray-300">Kevin Alvarez</span>
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Universal Downloader. Todos los derechos reservados.</p>
                    <p className="text-center md:text-right max-w-lg opacity-60 hover:opacity-100 transition-opacity">
                        Esta herramienta es solo para fines educativos. No estamos afiliados a TikTok, ByteDance Ltd, Meta ni Instagram.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
