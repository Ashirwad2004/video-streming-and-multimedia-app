import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Video } from '../types/video';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-12 w-12 text-white" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{video.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{video.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <img
            src={video.uploader.avatar}
            alt={video.uploader.name}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm text-gray-700">{video.uploader.name}</span>
        </div>
      </div>
    </motion.div>
  );
}