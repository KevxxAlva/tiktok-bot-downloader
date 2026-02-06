import { useState } from 'react';
import { Download, Music, Loader2, Activity, Waves, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface DownloadResult {
  result: {
    video: string[];
    music: string;
    cover: string;
    desc: string;
    author: {
      nickname: string;
      avatar: string;
    }
  }
}

function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DownloadResult | null>(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'video' | 'audio'>('video');

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.get(`/api/download?url=${encodeURIComponent(url)}`);
      if (response.data.status === 'success' || response.data.result) {
        setData(response.data);
      } else {
        setError(response.data.error || 'Could not fetch video. Please check the URL.');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Error processing request.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-20 px-4">
      
      {/* Brand / Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 flex flex-col items-center"
      >
        <div className="mb-6 text-[#ccff00]">
          <Waves className="w-16 h-16" strokeWidth={3} />
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          TikTok<br className="md:hidden" /> Downloader
        </h1>
        <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase font-medium max-w-md">
          Descarga videos sin marca de agua.<br />
          Velocidad pura. Sin distracciones.
        </p>
      </motion.div>

      {/* Main Container */}
      <div className="w-full max-w-xl">
        
        {/* Input Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="PEGA EL ENLACE DE TIKTOK AQUÍ..."
              className="input-minimal w-full rounded-lg px-6 py-4 text-lg font-bold tracking-wide placeholder:text-gray-600 uppercase"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
            />
            
            {/* Mode Switch (Visual Only for now, purely aesthetic) */}
            <div className="bg-[#1a1a1a] rounded-lg p-1 flex border border-[#333] shrink-0">
              <button 
                onClick={() => setMode('video')}
                className={`px-6 py-2 rounded font-bold uppercase text-sm transition-colors ${mode === 'video' ? 'bg-[#ccff00] text-black' : 'text-gray-500 hover:text-white'}`}
              >
                Video
              </button>
              <button 
                onClick={() => setMode('audio')}
                className={`px-6 py-2 rounded font-bold uppercase text-sm transition-colors ${mode === 'audio' ? 'bg-[#ccff00] text-black' : 'text-gray-500 hover:text-white'}`}
              >
                Audio
              </button>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={loading || !url}
            className="btn-lime w-full py-4 rounded-lg text-lg flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                PROCESANDO
              </>
            ) : (
              <>
                REVELAR CONTENIDO
              </>
            )}
          </button>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 bg-red-900/20 border border-red-900/50 text-red-400 text-center uppercase font-bold text-sm tracking-wide rounded"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Area */}
        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="card-matte p-8"
            >
              <div className="text-center mb-8">
                <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em] mb-2">Objetivo Localizado</p>
                <h3 className="text-white text-xl font-bold line-clamp-1">{data.result.author?.nickname}</h3>
              </div>

              <div className="flex flex-col gap-6">
                {/* Simplified Preview */}
                <div className="w-full aspect-square md:aspect-video bg-black rounded overflow-hidden relative border border-[#333] group">
                  {data.result.cover ? (
                    <img 
                      src={`/api/proxy-image?url=${encodeURIComponent(data.result.cover)}`} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      alt="Cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      <Activity />
                    </div>
                  )}
                  {/* Overlay text */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black to-transparent">
                     <p className="text-white text-xs line-clamp-1 opacity-70 font-mono">{data.result.desc}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => window.open(data.result.video[0], '_blank')}
                    className="btn-lime py-3 rounded flex items-center justify-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    DESCARGAR VIDEO
                  </button>
                  
                  {data.result.music && (
                    <button 
                      onClick={() => window.open(data.result.music, '_blank')}
                      className="btn-secondary py-3 rounded flex items-center justify-center gap-2 text-sm uppercase"
                    >
                      <Music className="w-4 h-4" />
                      DESCARGAR MP3
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#333] flex justify-between items-center text-xs text-gray-600 uppercase font-mono">
                <span>Ref: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"/>
                  Listo
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <footer className="mt-auto pt-20 pb-6 text-center w-full max-w-xl mx-auto border-t border-[#1a1a1a]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-600 uppercase font-bold tracking-widest">
          <div className="flex items-center gap-2">
            <span>© 2026 TikTokSaver</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors">
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
    </div>
  );
}

export default Home;
