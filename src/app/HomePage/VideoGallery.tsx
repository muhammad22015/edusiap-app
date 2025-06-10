"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { VideoGrid } from './VideoGrid';
import { useSearchParams } from 'next/navigation';

// Create a separate component for the search params logic
const VideoGalleryContent: React.FC = () => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  return (
    <>
      <Header initialSearch={searchQuery} />
      <VideoGrid searchQuery={searchQuery} />
    </>
  );
};

// Loading component for Suspense fallback
const VideoGalleryLoading: React.FC = () => (
  <>
    <Header initialSearch="" />
    <VideoGrid searchQuery="" />
  </>
);

export const VideoGallery: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="ml-[120px] flex-1 px-20 py-0 max-md:px-5 max-md:py-0 max-sm:ml-0">
        <Suspense fallback={<VideoGalleryLoading />}>
          <VideoGalleryContent />
        </Suspense>
      </main>
    </div>
  );
};