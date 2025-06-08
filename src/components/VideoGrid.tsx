import React from 'react';
import { VideoCard } from './VideoCard';

const videoData = [
  { id: 1, title: 'Judul Video 1', uploader: 'Uploader Video 1', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
  { id: 2, title: 'Judul Video 2', uploader: 'Uploader Video 2', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
  { id: 3, title: 'Judul Video 3', uploader: 'Uploader Video 3', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8819b79c2b055f6b97e15a4b4ef5d4f0e37618c4' },
  { id: 4, title: 'Judul Video 4', uploader: 'Uploader Video 4', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
  { id: 5, title: 'Judul Video 5', uploader: 'Uploader Video 5', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
  { id: 6, title: 'Judul Video 6', uploader: 'Uploader Video 6', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/68842a156117e1eaa6cbe4eb01fe2265a5d63ab2' },
  { id: 7, title: 'Judul Video 7', uploader: 'Uploader Video 7', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1e3afc0b78ef02b0beb0621c6b5ff12864414dc9' },
  { id: 8, title: 'Judul Video 8', uploader: 'Uploader Video 8', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1e3afc0b78ef02b0beb0621c6b5ff12864414dc9' },
  { id: 9, title: 'Judul Video 9', uploader: 'Uploader Video 9', thumbnail: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ce8c9c3998b0933c31020dd1b28849d4cc3003ca' },
];

export const VideoGrid: React.FC = () => {
  return (
    <div className="grid gap-12 px-0 py-4 grid-cols-[repeat(3,1fr)] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
      {videoData.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
};