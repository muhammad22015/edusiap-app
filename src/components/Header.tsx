"use client";
import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import LogoutButton from './LogoutButton';
import { getUserIdFromToken, isAuthenticated } from '@/lib/auth';
import { apiClient } from '@/lib/apiClient';

interface HeaderProps {
  initialSearch?: string;
}

interface UserProfile {
  avatar?: string;
  username?: string;
}

export const Header: React.FC<HeaderProps> = ({ initialSearch = '' }) => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated());
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = getUserIdFromToken();
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await apiClient(`/user-profile/?id=${userId}`);
        if (response.status === "Authorized" && response.response) {
          setUserProfile({
            avatar: response.response.avatar || 'https://avatar.iran.liara.run/public/31',
            username: response.response.user?.username
          });
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleSearch = (query: string) => {
    const isHomepage = pathname === '/';
    const url = `/${query ? `?q=${encodeURIComponent(query)}` : ''}`;
    
    if (isHomepage) {
      router.replace(url, { scroll: false });
    } else {
      router.push(url);
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-[120px] right-0 z-50 bg-orange-100 px-4 sm:px-20 flex justify-between items-center h-[101px] max-sm:bg-transparent max-sm:left-[50px] max-sm:top-3 max-sm:w-full">
      <div className='max-xl:hidden'>
        <Link href="/" passHref>
            <Image 
              src="/3-removebg-preview.png" 
              alt="logo" 
              width={170} 
              height={170} 
              className="w-[170px] h-auto cursor-pointer" // Added cursor-pointer
            />
        </Link>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 max-sm:max-w-3/4 max-sm:left-3/7">
        <SearchBar 
          onSearch={handleSearch}
          initialValue={initialSearch}
        />
      </div>

      {!loading && (
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div 
              className="relative"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <div className="rounded-full h-[69px] w-[69px] object-cover border-2 border-orange-300 overflow-hidden cursor-pointer max-xl:hidden">
                <img 
                  src={userProfile?.avatar || 'https://avatar.iran.liara.run/public/31'} 
                  alt={userProfile?.username || 'User profile'}
                  className="w-full h-full object-cover"
                />
              </div>

              {isProfileHovered && (
                <div className="absolute flex flex-col gap-1 right-0 w-48 rounded-md py-1 z-50">
                  <Link 
                    href="/Profile" 
                    passHref 
                    className="block px-4 py-2 text-sm bg-white border rounded-lg border-orange-400 text-gray-700 transition-colors hover:scale-105 hover:bg-orange-300 duration-200"
                    onClick={() => setIsProfileHovered(false)}
                  >
                    My Profile
                  </Link>
                  <LogoutButton 
                    className="block px-4 py-2 text-sm bg-white border rounded-lg border-orange-400 text-gray-700 transition-colors hover:scale-105 hover:bg-orange-300 duration-200 text-left" 
                    onLogout={() => setIsLoggedIn(false)}
                  />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors duration-200 max-xl:hidden"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};