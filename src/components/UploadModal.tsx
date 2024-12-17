import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { storage, db } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const validateFile = (file: File, allowedTypes: string[], maxSize: number) => {
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }
    if (file.size > maxSize) {
      throw new Error(`File size must be less than ${Math.round(maxSize / (1024 * 1024 * 1024))}GB`);
    }
  };

  const handleUpload = async () => {
    if (!selectedVideo || !title.trim() || !thumbnail) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError('');
      setUploading(true);
      const videoId = uuidv4();
      
      // Upload thumbnail
      const thumbnailRef = ref(storage, `thumbnails/${videoId}`);
      const thumbnailUpload = await uploadBytesResumable(thumbnailRef, thumbnail);
      const thumbnailUrl = await getDownloadURL(thumbnailUpload.ref);

      // Upload video with larger chunk size for better performance
      const videoRef = ref(storage, `videos/${videoId}`);
      const uploadTask = uploadBytesResumable(videoRef, selectedVideo, {
        customMetadata: {
          contentType: selectedVideo.type,
        },
      });

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          setError('Failed to upload video. Please try again.');
          setUploading(false);
        },
        async () => {
          try {
            const videoUrl = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, 'videos'), {
              id: videoId,
              title,
              description,
              url: videoUrl,
              thumbnail: thumbnailUrl,
              uploadedAt: new Date(),
              views: 0,
              category: 'movies', // Default category
              uploader: {
                name: 'Anonymous User',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + videoId,
              },
            });
            
            setUploading(false);
            resetForm();
            onClose();
          } catch (error) {
            console.error('Error saving to Firestore:', error);
            setError('Failed to save video information. Please try again.');
            setUploading(false);
          }
        }
      );
    } catch (error) {
      console.error('Error during upload:', error);
      setError('An error occurred during upload. Please try again.');
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setThumbnail(null);
    setThumbnailPreview('');
    setUploadProgress(0);
    setSelectedVideo(null);
    setError('');
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        validateFile(file, ALLOWED_VIDEO_TYPES, MAX_FILE_SIZE);
        setSelectedVideo(file);
        setError('');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
  }, []);

  const onThumbnailDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        validateFile(file, ALLOWED_IMAGE_TYPES, 5 * 1024 * 1024); // 5MB max for thumbnails
        setThumbnail(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setError('');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    disabled: uploading,
    maxSize: MAX_FILE_SIZE,
  });

  const { 
    getRootProps: getThumbnailRootProps, 
    getInputProps: getThumbnailInputProps,
    isDragActive: isThumbnailDragActive 
  } = useDropzone({
    onDrop: onThumbnailDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    disabled: uploading,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

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
          
          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={uploading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
                disabled={uploading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail <span className="text-red-500">*</span>
              </label>
              <div
                {...getThumbnailRootProps()}
                className={`mt-1 flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed ${
                  isThumbnailDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } ${thumbnailPreview ? 'p-0' : 'p-4'}`}
              >
                <input {...getThumbnailInputProps()} />
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drop a thumbnail image here, or click to select
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Max size: 5MB. Supported formats: JPG, PNG, WebP
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Video <span className="text-red-500">*</span>
              </label>
              <div
                {...getRootProps()}
                className={`mt-1 rounded-lg border-2 border-dashed p-8 text-center ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {selectedVideo ? selectedVideo.name : 'Drag & drop your video here, or click to select'}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Max size: 1GB. Supported formats: MP4, MOV, AVI
                </p>
              </div>
            </div>

            {uploading && (
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading... {Math.round(uploadProgress)}%
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploading || !title.trim() || !thumbnail || !selectedVideo}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}