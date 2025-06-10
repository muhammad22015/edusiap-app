import React, { useEffect, useState } from 'react';
import { VideoCard } from './VideoCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Video {
  video_id: number;
  title: string;
  video_link: string;
  thumbnail: string;
}

interface VideoGridProps {
  searchQuery: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ searchQuery }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/videos`);
        const data = await response.json();
        
        if (Array.isArray(data.response)) {
          setVideos(data.response);
        } else {
          console.warn('Data response bukan array:', data.response);
          setVideos([]);
        }
      } catch (error) {
        console.error('Gagal mengambil data video:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on search query
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-[101px] px-0 py-4">
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Memuat video...</p>
        </div>
      ) : (
        <div className="grid gap-12 grid-cols-2 max-lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard
                key={video.video_id}
                id={video.video_id}
                title={video.title}
                video_link={video.video_link}
                thumbnail={video.thumbnail}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery 
                  ? `Tidak ditemukan video dengan judul "${searchQuery}"` 
                  : 'Tidak ada video yang tersedia'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};