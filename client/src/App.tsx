import { useState } from 'react';
import { Search, Download, Music, Loader2, Video, Sparkles, Zap, Shield, Play, ExternalLink, Heart, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

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
        setError(response.data.error || 'Could not fetch video. Please check the URL.');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Error processing request. The link might be invalid or private.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Download in seconds', color: 'from-yellow-500 to-orange-500' },
    { icon: Shield, title: 'No Watermark', desc: 'Clean video output', color: 'from-cyan-500 to-blue-500' },
    { icon: Music, title: 'Extract Audio', desc: 'Get MP3 files easily', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <>
      {/* Animated Background */}
      <div className="bg-animated">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative group cursor-pointer">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fe2c55] to-[#25f4ee] rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-[#fe2c55] via-[#ff0050] to-[#25f4ee] flex items-center justify-center shadow-2xl transform rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                <Video className="text-white w-12 h-12 drop-shadow-lg" />
              </div>
              
              {/* Sparkle badge */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-[#25f4ee] to-[#00d4ff] flex items-center justify-center shadow-xl border-2 border-[#0a0a0f]"
              >
                <Sparkles className="text-white w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-5 tracking-tight"
          >
            TikTok<span className="gradient-text">Saver</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
          >
            Download TikTok videos without watermark.
            <br />
            <span className="text-white/90 font-medium">Fast, free, and unlimited.</span>
          </motion.p>
        </motion.div>

        {/* Main Input Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-8 md:p-12 w-full max-w-2xl"
        >
          {/* Input Group */}
          <div className="relative mb-6">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              placeholder="Paste TikTok video URL here..."
              className="input-glow w-full rounded-2xl px-16 py-5 text-lg font-medium"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
            />
            {url && (
              <button 
                onClick={() => setUrl('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                ✕
              </button>
            )}
          </div>

          {/* Download Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            disabled={loading || !url}
            className="btn-primary w-full py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-6 h-6" />
                Download Video
              </>
            )}
          </motion.button>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10, height: 0 }} 
                animate={{ opacity: 1, y: 0, height: 'auto' }} 
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mt-6 error-box p-5 rounded-2xl text-center font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12 max-w-3xl px-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.15 }}
              className="feature-card flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">{feature.title}</p>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Result Card */}
        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="glass-panel p-6 md:p-10 w-full max-w-2xl mt-12 relative overflow-hidden"
            >
              {/* Background glows */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#25f4ee]/15 to-transparent blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#fe2c55]/15 to-transparent blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                {/* Video Preview */}
                <div className="w-full md:w-2/5 shrink-0">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[9/16] bg-black group cursor-pointer">
                    <img 
                      src={data.result.cover} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-10 h-10 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    
                    {/* Success Badge */}
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-semibold">Ready</span>
                    </div>
                  </div>
                </div>

                {/* Video Info & Download Buttons */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    {/* Author */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#fe2c55] to-[#25f4ee] p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#0a0a0f] overflow-hidden">
                          {data.result.author?.avatar ? (
                            <img src={data.result.author.avatar} className="w-full h-full object-cover" alt="Author" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#fe2c55]/50 to-[#25f4ee]/50 flex items-center justify-center">
                              <Heart className="w-6 h-6 text-white/50" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{data.result.author?.nickname || "TikTok User"}</p>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <Heart className="w-3 h-3" /> Video Creator
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8">
                      {data.result.desc || "TikTok Video"}
                    </p>
                  </div>

                  {/* Download Buttons */}
                  <div className="space-y-4">
                    <button 
                      onClick={() => window.open(data.result.video[0], '_blank')}
                      className="download-btn w-full p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
                    >
                      <Download className="w-6 h-6" />
                      Download Video (HD)
                      <ExternalLink className="w-5 h-5 ml-auto opacity-60" />
                    </button>
                    
                    {data.result.music && (
                      <button 
                        onClick={() => window.open(data.result.music, '_blank')}
                        className="download-btn audio-btn w-full p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
                      >
                        <Music className="w-6 h-6" />
                        Download Audio (MP3)
                        <ExternalLink className="w-5 h-5 ml-auto opacity-60" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-gray-500 text-sm font-medium">
            <Clock className="w-4 h-4" />
            Fast & Unlimited Downloads
          </p>
          <p className="mt-3 text-gray-600 text-xs">
            © 2026 TikTokSaver • For personal use only
          </p>
        </motion.footer>
      </div>
    </>
  );
}

export default App;
