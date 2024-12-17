import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button } from './ui/Button';
import { Video, Camera, StopCircle } from 'lucide-react';

export function LiveStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const handleStartStream = async () => {
    setIsStreaming(true);
    const stream = webcamRef.current?.stream;
    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.start();
    }
  };

  const handleStopStream = () => {
    mediaRecorderRef.current?.stop();
    setIsStreaming(false);
  };

  const handleDataAvailable = ({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => [...prev, data]);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Stream</h2>
        <div className="flex gap-2">
          {!isStreaming ? (
            <Button
              onClick={handleStartStream}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Start Stream
            </Button>
          ) : (
            <Button
              onClick={handleStopStream}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <StopCircle className="h-4 w-4" />
              Stop Stream
            </Button>
          )}
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <Webcam
          ref={webcamRef}
          audio={true}
          className="h-full w-full object-cover"
        />
        {isStreaming && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-sm text-white">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            Live
          </div>
        )}
      </div>
    </div>
  );
}