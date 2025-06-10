'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import { loginUser } from '@/lib/api';
import { setTokens } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await loginUser({ email, password });
      
      if (result.status === "Login Berhasil") {
        // Store both tokens
        setTokens(result.accesstoken, result.refreshtoken);
        router.push('/'); // Redirect to home/dashboard
        return { status: 'Login Berhasil' };
      }
      return { status: result.error || 'Login Gagal' };
    } catch (error) {
      console.error('Login error:', error);
      return { status: error instanceof Error ? error.message : 'Terjadi kesalahan saat login.' };
    }
  };

  const handleForgotPassword = () => {
    console.log('User clicked forgot password');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleGoToGallery = () => {
    router.push('/');
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
      onGoToGallery={handleGoToGallery}
      onContinueWithoutLogin={handleGoToGallery}
    />
  );
}
