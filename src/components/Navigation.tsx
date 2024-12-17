import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Gamepad, BookOpen, Tv, Upload, Video } from 'lucide-react';
import { Button } from './ui/Button';
import { UploadModal } from './UploadModal';

export function Navigation() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              VideoStream
            </Link>
            
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/movies"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Film className="h-4 w-4" />
                Movies
              </Link>
              <Link
                to="/series"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Tv className="h-4 w-4" />
                Series
              </Link>
              <Link
                to="/education"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <BookOpen className="h-4 w-4" />
                Education
              </Link>
              <Link
                to="/gaming"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Gamepad className="h-4 w-4" />
                Gaming
              </Link>
              <Link
                to="/stream"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Video className="h-4 w-4" />
                Go Live
              </Link>
            </div>
          </div>

          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </nav>
  );
}