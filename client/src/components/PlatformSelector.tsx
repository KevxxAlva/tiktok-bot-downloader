import { motion } from 'framer-motion';
import { Music2, Instagram, Facebook, Youtube } from 'lucide-react';

export type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube';

interface PlatformSelectorProps {
  selected: Platform;
  onSelect: (platform: Platform) => void;
}

const platforms = [
  { 
    id: 'tiktok' as Platform, 
    name: 'TikTok', 
    icon: Music2, 
    color: '#ccff00',
    textColor: '#000'
  },
  { 
    id: 'instagram' as Platform, 
    name: 'Instagram', 
    icon: Instagram, 
    gradient: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
    textColor: '#fff'
  },
  { 
    id: 'facebook' as Platform, 
    name: 'Facebook', 
    icon: Facebook, 
    color: '#1877F2',
    textColor: '#fff'
  },
  { 
    id: 'youtube' as Platform, 
    name: 'YouTube', 
    icon: Youtube, 
    color: '#FF0000',
    textColor: '#fff'
  },
];

const PlatformSelector = ({ selected, onSelect }: PlatformSelectorProps) => {
  return (
    <div className="w-full max-w-2xl mb-8">
      <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em] mb-4 text-center">
        Selecciona la plataforma
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selected === platform.id;
          
          return (
            <motion.button
              key={platform.id}
              onClick={() => onSelect(platform.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative overflow-hidden rounded-xl p-4 
                flex flex-col items-center gap-2
                transition-all duration-300
                ${isSelected 
                  ? 'ring-2 ring-offset-2 ring-offset-black' 
                  : 'opacity-50 hover:opacity-75'
                }
              `}
              style={{
                background: platform.gradient || platform.color,
                color: platform.textColor,
                ringColor: platform.color
              }}
            >
              {isSelected && (
                <motion.div
                  layoutId="platform-indicator"
                  className="absolute inset-0 bg-white/10"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
              
              <Icon 
                className="w-8 h-8 relative z-10" 
                strokeWidth={2.5}
              />
              <span className="text-sm font-bold uppercase tracking-wider relative z-10">
                {platform.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;
