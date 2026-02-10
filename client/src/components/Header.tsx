import { Waves, Github } from 'lucide-react';

const Header = () => (
  <nav className="w-full max-w-5xl flex justify-between items-center mb-20 scroll-smooth">
    <div className="flex items-center gap-3">
      <div className="bg-[#ccff00] p-1.5 rounded-sm">
        <Waves className="w-5 h-5 text-black" strokeWidth={3} />
      </div>
      <span className="font-black tracking-tight text-xl text-white">UNIVERSAL DOWNLOADER</span>
    </div>

    <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-wider text-gray-500">
      <a href="#Guia" className="hover:text-[#ccff00] transition-colors hidden md:block">Cómo funciona</a>
      <a
        href="https://github.com/KevxxAlva/tiktok-bot-downloader"
        target="_blank"
        rel="noreferrer"
        className="text-white hover:text-[#ccff00] transition-colors"
      >
        <Github className="w-6 h-6" />
      </a>
    </div>
  </nav>
);

export default Header;
