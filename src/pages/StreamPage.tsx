import { LiveStream } from '../components/LiveStream';

export function StreamPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Go Live</h1>
        <LiveStream />
      </div>
    </div>
  );
}