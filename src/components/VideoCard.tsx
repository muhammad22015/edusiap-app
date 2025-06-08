import React from 'react';

interface VideoCardProps {
  title: string;
  uploader: string;
  thumbnail: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, uploader, thumbnail }) => {
  return (
    <div className="flex flex-col gap-3.5 items-center">
      <img
        src={thumbnail}
        alt={`${title} thumbnail`}
        className="h-[230px] rounded-[30px] w-[402px] max-md:w-full max-md:h-auto"
      />
      <h2 className="text-3xl leading-7 text-black max-sm:text-2xl">{title}</h2>
      <p className="text-3xl leading-7 text-black max-sm:text-2xl">{uploader}</p>
    </div>
  );
};