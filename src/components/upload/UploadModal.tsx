import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { DropZone } from './DropZone';
import { UploadForm } from './UploadForm';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (data: { title: string; description: string }) => {
    if (!selectedFile) return;

    setUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg rounded-lg bg-white p-6"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            disabled={uploading}
          >
            <X className="h-6 w-6" />
          </button>
          
          <h2 className="text-2xl font-semibold text-gray-900">Upload Video</h2>
          
          {!selectedFile ? (
            <div className="mt-6">
              <DropZone
                onFileSelect={setSelectedFile}
                accept={{ 'video/*': ['.mp4', '.mov', '.avi'] }}
              />
            </div>
          ) : (
            <div className="mt-6">
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Selected file: {selectedFile.name}</p>
              </div>
              <UploadForm onSubmit={handleUpload} />
            </div>
          )}

          {!selectedFile && (
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}