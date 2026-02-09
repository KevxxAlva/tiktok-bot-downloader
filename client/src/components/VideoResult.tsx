import { motion, AnimatePresence } from 'framer-motion';
import { Download, Music, Activity } from 'lucide-react';
import type { DownloadResult } from '../types';

interface VideoResultProps {
  data: DownloadResult | null;
}

const VideoResult = ({ data }: VideoResultProps) => {
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key="result"
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
            <div className="w-full h-64 md:h-96 bg-black rounded-lg overflow-hidden relative border border-[#333] group flex items-center justify-center">
              {data.result.cover ? (
                <img
                  src={`/api/proxy-image?url=${encodeURIComponent(data.result.cover)}`}
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
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

            {/* Dynamic Download Buttons */}
            <div className="grid grid-cols-1 gap-3">
              {data.result.downloads.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const cleanNickname = data.result.author.nickname.replace(/[^a-zA-Z0-9]/g, '_');
                    const ext = option.type === 'music' ? 'mp3' : 'mp4';
                    const filename = `tiktok_${cleanNickname}_${option.type}.${ext}`;
                    window.location.href = `/api/proxy-download?url=${encodeURIComponent(option.url)}&filename=${filename}`;
                  }}
                  className={`
                        w-full py-4 rounded font-bold uppercase text-sm flex items-center justify-center gap-3 transition-all
                        ${option.type === 'hd' ? 'bg-[#ccff00] text-black hover:bg-[#b3ff00]' :
                      option.type === 'watermark' ? 'bg-transparent text-[#ccff00] border border-[#ccff00] hover:bg-[#ccff00] hover:text-black' :
                        option.type === 'music' ? 'bg-[#ff8800] text-white hover:bg-[#ff6600]' :
                          'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] border border-[#444]'}
                      `}
                >
                  {option.type === 'music' ? <Music className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                  <span>
                    {option.label}
                    {option.size ? <span className="opacity-60 ml-2 text-xs">({typeof option.size === 'number' ? (option.size / 1024 / 1024).toFixed(1) + ' MB' : option.size})</span> : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#333] flex justify-between items-center text-xs text-gray-600 uppercase font-mono">
            <span>Ref: {Math.random().toString(36).substring(7).toUpperCase()}</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" />
              Listo
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoResult;
