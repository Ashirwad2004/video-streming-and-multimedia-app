import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoThumbnailProps {
  src: string;
  alt: string;
  duration: number;
}

export function VideoThumbnail({ src, alt, duration }: VideoThumbnailProps) {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-lg">
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
        <Play className="h-12 w-12 text-white" />
      </div>
      <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
        {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}