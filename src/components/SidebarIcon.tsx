'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getUserIdFromToken } from '@/lib/auth';

interface SidebarIconProps {
  name: string;
  svg: string;
}

export const SidebarIcon: React.FC<SidebarIconProps> = ({ name, svg }) => {
  const router = useRouter();

  const handleClick = () => {
    const userId = getUserIdFromToken();
    
    switch (name) {
      case 'Buku Cerita':
        router.push('/pdfReader');
        break;
      case 'Beranda':
        router.push('/');
        break;
      case 'User':
        router.push('/Profile');
        break;
      case 'Daftar Putar':
        router.push('/Playlist');
        break;
      case 'Riwayat Tontonan':
        router.push('/History');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="sidebar-icon cursor-pointer"
      title={name}
      onClick={handleClick}
    >
      <div dangerouslySetInnerHTML={{ __html: svg }} className='flex items-center justify-evenly scale-75'></div>
      <span className='block relative -top-4 w-full text-center text-gray-700 font-bold text-lg'>{name}</span>
    </div>
  );
};