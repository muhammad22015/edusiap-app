// HomePage/VideoCard.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { watchVideo } from '@/lib/api';

interface VideoCardProps {
  id: number;
  title: string;
  video_link: string;
  thumbnail: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ id, title, thumbnail }) => {
  const { isAuthenticated } = useAuth();

  const handleVideoClick = async (e: React.MouseEvent) => {
    if (isAuthenticated) {
      try {
        e.preventDefault(); // Prevent immediate navigation
        await watchVideo(id);
      } catch (error) {
        console.error('Failed to update video history:', error);
      } finally {
        // Navigate after API call completes (success or fail)
        window.location.href = `/WatchVideo/${id}`;
      }
    }
    // If not authenticated, default Link behavior will handle navigation
  };

  return (
    <Link href={`/WatchVideo/${id}`} passHref>
      <div 
        className="flex flex-col gap-3.5 items-center cursor-pointer relative group"
        onClick={isAuthenticated ? handleVideoClick : undefined}
      >
        {/* Container with scaling and shadow on hover */}
        <div
          className="w-full h-[220px] rounded-[30px] max-md:h-auto max-md:w-full overflow-hidden
                     shadow-md bg-opacity-80 transition-transform duration-300 ease-in-out transform 
                     group-hover:scale-110 group-hover:shadow-2xl"
          style={{ backgroundColor: 'rgba(246, 233, 218, 0.8)' }}
        >
          <Image
            src={thumbnail}
            alt={title}
            width={400}
            height={220}
            className="w-full h-full object-cover"
            unoptimized={true}
          />
        </div>

        {/* Title */}
        <h2 className="text-xl leading-7 text-black max-sm:text-xl lg:text-2xl xl:text-2xl text-center">
          {title}
        </h2>
      </div>
    </Link>
  );
};