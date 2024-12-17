import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { VideoCard } from '../components/video/VideoCard';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useVideos } from '../hooks/useVideos';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function CategoryPage() {
  const { category = 'movies' } = useParams();
  const videos = useVideos(category);
  const { displayedItems, loader } = useInfiniteScroll(videos);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold capitalize text-gray-900">{category}</h1>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {displayedItems.map((video) => (
            <motion.div key={video.id} variants={item}>
              <VideoCard video={video} />
            </motion.div>
          ))}
        </motion.div>

        <div ref={loader} className="mt-8 flex justify-center">
          {displayedItems.length < videos.length && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-8 w-8 rounded-full border-4 border-blue-500 border-t-transparent"
            />
          )}
        </div>
      </div>
    </div>
  );
}