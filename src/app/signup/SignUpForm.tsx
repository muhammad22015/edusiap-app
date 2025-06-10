'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api';
import InputField from './InputField';
import SocialButton from './SocialButton';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2000); // Arahkan setelah 2 detik

      return () => clearTimeout(timer);
    }
  }, [redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = await registerUser({
        username: name,
        email,
        password,
      });

      setSuccess(data.status || 'Registrasi berhasil! Silakan verifikasi email.');
      setName('');
      setEmail('');
      setPassword('');
      setRedirect(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal terhubung ke server');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F6E9DA]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0d52516637309c6a7d9f01766fd46c0a52b6a06?placeholderIfAbsent=true&apiKey=600b45a3b00b44838808f9741fb53917"
        alt="Login Background"
        className="object-cover absolute inset-0 w-full h-full z-0"
      />
      <div className="relative z-10 p-8 w-full bg-white bg-opacity-80 max-w-[465px] rounded-[30px] shadow-lg backdrop-blur-sm max-md:max-w-[400px] max-sm:p-5 max-sm:rounded-3xl">
        <div className="mx-auto w-full max-w-[404px]">
          <h1 className="mb-2.5 text-3xl font-bold text-black xl:text-4xl">Welcome!</h1>
          <p className="mb-4 text-base text-black xl:text-xl">Silahkan Buat Akun Anda!</p>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-700 text-sm mb-4">{success}</p>}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              type="text"
              placeholder="Masukkan Nama"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              label="Email address"
              type="email"
              placeholder="Masukkan Alamat Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative mb-5">
              <InputField
                label="Password"
                type="password"
                placeholder="Masukkan Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <button
                type="button"
                className="absolute top-0 right-0 text-xs text-blue-900 cursor-pointer xl:text-lg"
              >
                forgot password
              </button> */}
            </div>

            {/* <div className="flex gap-1.5 items-center mb-5">
              <input
                type="checkbox"
                id="remember"
                className="rounded-sm border border-black border-solid h-[9px] w-[9px] xl:w-4 xl:h-4"
              />
              <label htmlFor="remember" className="text-xs text-black xl:text-lg">
                Remember for 30 days
              </label>
            </div> */}

            <button
              type="submit"
              className="p-2.5 mb-5 w-full text-sm font-bold text-white bg-lime-900 rounded-xl cursor-pointer border-[none] xl:text-xl"
            >
              Sign Up
            </button>
          </form>

          {/* <div className="flex gap-6 justify-between mb-5 max-sm:flex-col max-sm:gap-2.5"> */}
            {/* <SocialButton icon="google" text="Sign in with Google" /> */}
            {/* <SocialButton icon="apple" text="Sign in with Apple" /> */}
          {/* </div> */}

          <div className="text-sm text-center text-black xl:text-lg">
            <span>Sudah Punya Akun? </span>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-blue-700 cursor-pointer hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
