import { useMemo } from 'react';
import { generateMockVideos, validCategories } from '../utils/mockData';
import { Video } from '../types/video';

export function useVideos(category: string): Video[] {
  return useMemo(() => {
    // Ensure category is valid, default to trending if not
    const validCategory = validCategories.includes(category as any) 
      ? category 
      : 'trending';
    return generateMockVideos(validCategory as any);
  }, [category]);
}