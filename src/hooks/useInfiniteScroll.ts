import { useEffect, useRef, useState, useMemo } from 'react';

export function useInfiniteScroll<T>(items: T[], itemsPerPage: number = 12) {
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);

  // Memoize displayed items to prevent unnecessary recalculations
  const displayedItems = useMemo(() => 
    items.slice(0, page * itemsPerPage),
    [items, page, itemsPerPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedItems.length < items.length) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [displayedItems.length, items.length]);

  return { displayedItems, loader };
}