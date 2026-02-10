import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto pt-20 pb-6 text-center w-full max-w-xl mx-auto border-t border-[#1a1a1a]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-600 uppercase font-bold tracking-widest">
        <div className="flex items-center gap-2">
          <span>© 2026 UNIVERSAL DOWNLOADER</span>
          <a href="https://github.com/KevxxAlva/tiktok-bot-downloader" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors">
            <Github className="w-4 h-4 mb-0.5" />
          </a>
        </div>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-[#ccff00] transition-colors">Política de Privacidad</Link>
          <Link to="/terms" className="hover:text-[#ccff00] transition-colors">Términos de Servicio</Link>
        </div>
      </div>
      <p className="mt-4 text-[10px] text-gray-700 max-w-md mx-auto">
        Esta herramienta es solo para fines educativos. No estamos afiliados a TikTok ni a ByteDance Ltd.
      </p>
    </footer>
  );
};

export default Footer;
