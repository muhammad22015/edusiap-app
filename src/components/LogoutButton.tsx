// components/LogoutButton.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/lib/api';
import { getRefreshToken, clearTokens } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  className?: string;
  onLogout?: () => void; // Add this line
}

// components/LogoutButton.tsx
export default function LogoutButton({ className }: LogoutButtonProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token found');
      
      await logoutUser(refreshToken);
      clearTokens();
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Handle HTML error responses
      if (error instanceof Error && error.message.startsWith('<!DOCTYPE')) {
        alert('Session expired. Please login again.');
      } else {
        alert(error instanceof Error ? error.message : 'Logout failed');
      }
      
      // Force cleanup and redirect if logout failed
      clearTokens();
      logout();
      router.push('/login');
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      Keluar
    </button>
  );
}