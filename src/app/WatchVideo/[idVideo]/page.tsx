'use client';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getQuizScore } from '@/lib/api';
import { getAccessToken } from '@/lib/auth'; // Import function to check login status

interface Video {
  video_id: number;
  title: string;
  video_link: string;
}

interface QuizScoreResponse {
  status: string;
  response: {
    user_id: number;
    quiz_id: number;
    score: number;
  } | null;
}

export default function WatchVideoPage() {
  const { idVideo } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = getAccessToken();
      setIsLoggedIn(!!token);
    };
    
    checkLoginStatus();
    
    // Optional: Check periodically in case token changes
    const interval = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/videos?id=${idVideo}`);
        const data = await res.json();

        if (data.status === 'Authorized') {
          setVideo(data.response[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchVideo();
  }, [idVideo]);

  useEffect(() => {
    const fetchQuizScore = async () => {
      if (!idVideo || !isLoggedIn) return; // Only fetch if logged in

      setScoreLoading(true);
      setScoreError(null);

      try {
        const response: QuizScoreResponse = await getQuizScore(Number(idVideo));
        if (response.status === "Authorized" && response.response) {
          setQuizScore(response.response.score);
        } else {
          setQuizScore(null);
        }
      } catch (error: unknown) {
        let errorMessage = 'Failed to load quiz score';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        setScoreError(errorMessage);
        setQuizScore(null);
      } finally {
        setScoreLoading(false);
      }
    };

    fetchQuizScore();
  }, [idVideo, isLoggedIn]);

  const handleQuizClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert('Please login first to take the quiz!');
    }
  };

  return (
    <div className="flex min-h-screen bg-orange-100 relative">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/doodle.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '110% auto',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      ></div>

      <Sidebar />
      <main className="flex-1 py-0 max-xl:px-5 ml-[120px] mt-[120px] mb-[30px] max-sm:ml-0 relative z-10">
        <Header />
        <div className="flex flex-col w-full items-center justify-center">
          {loading ? (
            <p className="text-center text-xl text-gray-600 mt-20">Loading video...</p>
          ) : video ? (
            <>
              <div className="w-full max-w-6xl flex justify-center items-center mb-6 relative px-4">
                {/* Transparent box behind video */}
                <div className="absolute w-full h-full bg-white opacity-60 rounded-2xl z-0" />
                <iframe
                  className="bg-white w-full h-[600px] rounded-2xl border border-black 
                             max-xl:h-[400px] max-md:h-[300px] max-sm:h-[200px] relative z-10"
                  src={video.video_link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <h1 className="text-3xl font-bold text-black mt-6 px-10 
                             max-sm:text-lg max-sm:mt-0 max-sm:px-5 max-xl:text-2xl text-center">
                {video.title}
              </h1>

              {/* Quiz Score Section - Only show if logged in */}
              {isLoggedIn && (
                <div className="mt-6 text-center px-4">
                  {scoreLoading ? (
                    <div className="text-xl text-gray-600">Loading Score Quiz...</div>
                  ) : scoreError ? (
                    <div className="text-xl text-red-600">{scoreError}</div>
                  ) : quizScore !== null ? (
                    <div>
                      <h2 className="text-2xl font-bold text-green-800 mb-2 max-md:text-xl max-sm:text-lg">
                        Hasil Quiz Kamu
                      </h2>
                      <div className="text-4xl font-bold text-green-600 mb-4 max-md:text-3xl max-sm:text-2xl">
                        {quizScore}/100
                      </div>
                      <p className="text-lg text-gray-700 max-md:text-base max-sm:text-sm">
                        {quizScore >= 90
                          ? 'Excellent! 🎉'
                          : quizScore >= 70
                          ? 'Good job! 👍'
                          : 'Keep practicing! 💪'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-xl text-gray-600">
                     Belum Ada Score. Silahkan Selesaikan Quiz untuk Melihat Score!
                    </div>
                  )}
                </div>
              )}

              {/* Login prompt for non-logged in users */}
              {!isLoggedIn && (
                <div className="mt-6 text-center px-4">
                  <div className="text-xl text-blue-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    Silahkan <Link href="/login" className="font-bold underline hover:text-blue-800">login</Link> Untuk Mengambil Quiz!
                  </div>
                </div>
              )}

              {/* Quiz Button */}
              <div className="flex flex-row gap-8 h-16 w-full items-center justify-center mt-6 max-sm:mt-0">
                {isLoggedIn ? (
                  <Link href={`/WatchVideo/${idVideo}/quiz`}>
                    <button className="w-48 h-14 bg-green-800 rounded-2xl text-2xl text-white 
                      max-xl:w-32 max-xl:h-12 max-xl:text-xl 
                      max-sm:text-lg max-sm:w-24 max-sm:h-10
                      transition-transform duration-300 ease-in-out transform 
                      hover:scale-110 hover:shadow-2xl cursor-pointer">
                      QUIZ
                    </button>
                  </Link>
                ) : (
                  <button 
                    onClick={handleQuizClick}
                    className="w-48 h-14 bg-gray-400 rounded-2xl text-2xl text-gray-200 
                      max-xl:w-32 max-xl:h-12 max-xl:text-xl 
                      max-sm:text-lg max-sm:w-24 max-sm:h-10
                      cursor-not-allowed opacity-50 
                      transition-all duration-300 ease-in-out
                      hover:bg-gray-500 hover:opacity-60
                      relative group"
                    disabled
                  >
                    QUIZ
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                                    bg-black text-white text-sm px-3 py-1 rounded-lg
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                    whitespace-nowrap pointer-events-none">
                      Silahkan Login!
                    </div>
                  </button>
                )}
              </div>

              {/* Additional visual indicator for non-logged users */}
              {!isLoggedIn && (
                <div className="flex items-center justify-center mt-2">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span>🔒</span>
                    <span>Silahkan Login Untuk Mengakses QUIZ</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-xl text-gray-600 mt-20">Video not found.</p>
          )}
        </div>
      </main>
    </div>
  );
}