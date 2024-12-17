import { formatViews } from '../../utils/format';
import { formatDate } from '../../utils/date';

interface VideoMetaProps {
  title: string;
  views: number;
  uploadDate: Date;
  uploaderName: string;
  uploaderAvatar: string;
}

export function VideoMeta({ title, views, uploadDate, uploaderName, uploaderAvatar }: VideoMetaProps) {
  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
        <span>{formatViews(views)}</span>
        <span>•</span>
        <span>{formatDate(uploadDate)}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <img
          src={uploaderAvatar}
          alt={uploaderName}
          className="h-6 w-6 rounded-full"
        />
        <span className="text-sm text-gray-700">{uploaderName}</span>
      </div>
    </div>
  );
}