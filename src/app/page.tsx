import { VideoGallery } from './HomePage/VideoGallery';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoGallery />
    </Suspense>
  );
}