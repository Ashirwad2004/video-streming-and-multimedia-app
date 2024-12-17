import { Video } from '../types/video';

const categories = ['trending', 'movies', 'series', 'education', 'gaming'] as const;
const titles = [
  'Epic Adventure in the Unknown', 'The Secret of Success', 'Gaming Masterclass',
  'Learn Programming Fast', 'Movie Review', 'Top 10 Series', 'Tutorial Series',
  'Behind the Scenes', 'Documentary Special', 'Live Gaming Session'
];

// Cache generated videos by category
const videoCache = new Map<string, Video[]>();

function generateRandomVideo(category: typeof categories[number]): Video {
  const id = Math.random().toString(36).substring(7);
  const views = Math.floor(Math.random() * 1000000);
  const duration = Math.floor(Math.random() * 3600);
  const daysAgo = Math.floor(Math.random() * 30);
  const title = titles[Math.floor(Math.random() * titles.length)];

  return {
    id,
    title: `${title} - ${id}`,
    description: `This is a ${category} video about ${title.toLowerCase()}`,
    thumbnail: `https://source.unsplash.com/random/1280x720?${category}&sig=${id}`,
    url: '#',
    category,
    duration,
    views,
    uploadedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
    uploader: {
      name: `Creator${Math.floor(Math.random() * 100)}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
    },
  };
}

export function generateMockVideos(category: typeof categories[number]): Video[] {
  // Return cached videos if they exist
  if (videoCache.has(category)) {
    return videoCache.get(category)!;
  }

  // Generate and cache new videos
  const videos = Array.from({ length: 100 }, () => generateRandomVideo(category));
  videoCache.set(category, videos);
  return videos;
}

// Add trending category to valid categories
export const validCategories = categories;