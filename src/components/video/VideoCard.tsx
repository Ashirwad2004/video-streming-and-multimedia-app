import { motion } from 'framer-motion';
import { VideoThumbnail } from './VideoThumbnail';
import { VideoMeta } from './VideoMeta';
import { Video } from '../../types/video';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <VideoThumbnail
        src={video.thumbnail}
        alt={video.title}
        duration={video.duration}
      />
      <VideoMeta
        title={video.title}
        views={video.views}
        uploadDate={video.uploadedAt}
        uploaderName={video.uploader.name}
        uploaderAvatar={video.uploader.avatar}
      />
    </motion.div>
  );
}