'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SidebarIconProps {
  name: string;
  svg: string;
}

export const SidebarIcon: React.FC<SidebarIconProps> = ({ name, svg }) => {
  const router = useRouter();

  const handleClick = () => {
    if (name === 'Buku Cerita') {
      router.push('/pdfReader');
    }
    if (name == 'Beranda') {
      router.push('/')
    }
    if (name == 'User') {
      router.push('/Profile')
    }
    if (name == 'Daftar Putar') {
      router.push('/Playlist')
    }
    if (name == 'Riwayat Tontonan') {
      router.push('/History')
    } 
  };

  

  return (
    <div
      className="sidebar-icon my-2 cursor-pointer"
      title={name}
      onClick={handleClick}
    >
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};
