import React, { useState } from 'react';
import { Search, Download, Music, Loader2, Video, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface DownloadResult {
  result: {
    video: string[]; // array of urls usually
    music: string;
    cover: string;
    desc: string;
    author: {
      nickname: string;
      avatar: string;
    }
  }
}

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DownloadResult | null>(null);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await axios.get(`/api/download?url=${encodeURIComponent(url)}`);
      console.log(response.data);
      if (response.data.status === 'success' || response.data.result) {
          setData(response.data);
      } else {
          setError('Could not fetch video. Please check the URL.');
      }
    } catch (err) {
      setError('Error processing request. The link might be invalid or private.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (fileUrl: string, filename: string) => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.target = '_blank';
      link.download = filename; // This might not work for cross-origin, but target blank helps
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      
      {/* Header / Logo Area */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#25F4EE] to-[#FE2C55] flex items-center justify-center">
                <Video className="text-white w-6 h-6" />
            </div>
        </div>
        <h1 className="text-5xl font-bold mb-2 tracking-tight">
          TikTok<span className="gradient-text">Downloader</span>
        </h1>
        <p className="text-white/60 text-lg">Download content without watermark. Fast & Free.</p>
      </motion.div>

      {/* Main Input Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 w-full max-w-2xl flex flex-col gap-6"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Paste TikTok link here..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-lg text-white placeholder-white/40 focus:bg-white/10 transition-all pr-12"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
            <Search className="w-6 h-6" />
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={loading || !url}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
            ${loading || !url ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-gradient-to-r from-[#FE2C55] to-[#FF0050] hover:shadow-[0_0_30px_rgba(254,44,85,0.4)] text-white'}
          `}
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Generate Download <CheckCircle2 className="w-5 h-5 ml-1" />
            </>
          )}
        </button>

        {error && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-center"
            >
                {error}
            </motion.div>
        )}

      </motion.div>

      {/* Result Card */}
      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-panel p-6 w-full max-w-2xl mt-8 flex flex-col md:flex-row gap-6 relative overflow-hidden"
          >
             {/* Background glow for result */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#25F4EE] opacity-5 blur-[100px] pointer-events-none" />

             <div className="w-full md:w-1/3 shrink-0 rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10 aspect-[3/4] relative group">
                {/* Simplified cover display - using Image if available or just a placeholder */}
                <img 
                    src={data.result.cover} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                />
             </div>

             <div className="flex-1 flex flex-col justify-center gap-4">
                <div>
                    <h3 className="text-xl font-bold line-clamp-2 md:line-clamp-3 mb-2">{data.result.desc || "TikTok Video"}</h3>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                         <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden">
                                {data.result.author?.avatar && <img src={data.result.author.avatar} className="w-full h-full" />}
                             </div>
                             <span>{data.result.author?.nickname || "User"}</span>
                         </div>
                    </div>
                </div>

                <div className="h-px bg-white/10 w-full my-2"></div>

                <div className="grid grid-cols-1 gap-3">
                    <button 
                        onClick={() => window.open(data.result.video[0], '_blank')}
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg font-medium transition-colors border border-white/5"
                    >
                        <Download className="w-5 h-5 text-[#25F4EE]" />
                        Download Video (No Watermark)
                    </button>
                    {data.result.music && (
                        <button 
                            onClick={() => window.open(data.result.music, '_blank')}
                            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 p-3 rounded-lg text-sm transition-colors"
                        >
                            <Music className="w-4 h-4" />
                            Download MP3 Audio
                        </button>
                    )}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App
