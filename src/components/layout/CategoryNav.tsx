import { Link } from 'react-router-dom';
import { Film, Gamepad, BookOpen, Tv } from 'lucide-react';

const categories = [
  { name: 'Movies', icon: Film, path: '/movies' },
  { name: 'Series', icon: Tv, path: '/series' },
  { name: 'Education', icon: BookOpen, path: '/education' },
  { name: 'Gaming', icon: Gamepad, path: '/gaming' },
] as const;

export function CategoryNav() {
  return (
    <div className="flex items-center space-x-4">
      {categories.map(({ name, icon: Icon, path }) => (
        <Link
          key={path}
          to={path}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Icon className="h-4 w-4" />
          {name}
        </Link>
      ))}
    </div>
  );
}