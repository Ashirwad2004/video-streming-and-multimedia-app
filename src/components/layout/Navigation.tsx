import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '../ui/Button';
import { CategoryNav } from './CategoryNav';
import { UploadModal } from '../upload/UploadModal';

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
            <div className="ml-10">
              <CategoryNav />
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