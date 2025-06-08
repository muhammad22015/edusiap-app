import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import UploadForm from './UploadForm';

const UploadVideo: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-wrap bg-orange-100">
      <Sidebar />
      <main className="flex flex-col grow shrink-0 self-end mt-5 basis-0 w-fit max-md:max-w-full">
        <Header />
        <UploadForm />
      </main>
    </div>
  );
};

export default UploadVideo;