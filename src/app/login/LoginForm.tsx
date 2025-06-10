'use client';

import React from 'react';
import SocialButton from './SocialSignIn';

type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<{ status: string }>;
  onForgotPassword: () => void;
  onSignUp: () => void;
  onGoToGallery: () => void;
  onContinueWithoutLogin: () => void; // Add this new prop
};

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onGoToGallery,
  onContinueWithoutLogin,
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResponse = await onSubmit(email, password);
      if (loginResponse.status === "Login Berhasil") {
        onGoToGallery();
      } else {
        setErrorMessage(loginResponse.status);
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F6E9DA]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0d52516637309c6a7d9f01766fd46c0a52b6a06?placeholderIfAbsent=true&apiKey=600b45a3b00b44838808f9741fb53917"
        alt="Login Background"
        className="object-cover absolute inset-0 w-full h-full z-0"
      />
      <div className="relative z-10 p-8 w-full bg-white bg-opacity-80 max-w-[465px] rounded-[30px] shadow-lg backdrop-blur-sm max-md:max-w-[400px] max-sm:w-80 max-sm:p-4 max-sm:rounded-3xl">
        <div className="mx-auto w-full max-w-[404px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-black max-sm:text-xl xl:text-3xl">Welcome back!</h2>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-black xl:text-lg">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-black rounded text-black xl:text-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-black xl:text-lg">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-black rounded text-black xl:text-lg"
                required
              />
            </div>

            {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}

            <div className="flex items-center justify-between">
              {/* Remember me and forgot password options */}
            </div>

            <button
              type="submit"
              className="p-2.5 w-full text-sm font-bold text-white bg-lime-900 rounded-xl cursor-pointer xl:text-xl"
            >
              Login
            </button>
          </form>

          {/* Add the Continue without login button */}
          <button
            onClick={onContinueWithoutLogin}
            className="p-2.5 mt-4 w-full text-sm font-bold text-lime-900 bg-transparent border-2 border-lime-900 rounded-xl cursor-pointer hover:bg-lime-50 transition-colors xl:text-xl"
          >
            Lanjutkan tanpa login
          </button>

          <div className="flex gap-6 justify-between my-5 max-sm:flex-col max-sm:gap-2.5">
            {/* Social login buttons */}
          </div>

          <p className="text-center text-sm text-black xl:text-lg">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={onSignUp}
              className="text-blue-600 hover:underline"
            >
              Daftar Sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
