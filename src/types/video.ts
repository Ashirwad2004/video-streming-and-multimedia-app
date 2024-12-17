export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: 'trending' | 'movies' | 'series' | 'education' | 'gaming';
  duration: number;
  views: number;
  uploadedAt: Date;
  uploader: {
    name: string;
    avatar: string;
  };
}