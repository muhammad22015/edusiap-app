"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { apiClient } from "@/lib/apiClient";
import { getUserIdFromToken } from "@/lib/auth";

interface Video {
  video_id: number;
  video_url: string;
  title: string;
  description: string;
  video_link: string;
  thumbnail?: string;
}

interface History {
  history_id: number;
  video_id: number;
  user_id: number;
  watched_at: string;
  video?: Video | null;
}

const HistoryPage = () => {
  const [histories, setHistories] = useState<History[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError("User not authenticated");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const historyData = await apiClient(`/history?id=${userId}`);
        const videoData = await apiClient("/videos");

        const videoList: Video[] = videoData.response;

        const combined = historyData.response.map((history: History) => {
          const matchedVideo = videoList.find((v) => v.video_id === history.video_id);
          return {
            ...history,
            video: matchedVideo || null,
          };
        });

        setHistories(combined);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat memuat data.");
        if (err.message.includes("Session expired")) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-orange-100 relative">
      {/* Background doodle yang responsif */}
      <div className="pointer-events-none absolute inset-0 opacity-20 z-0 bg-[url('/doodle.jpg')] bg-no-repeat bg-center bg-cover" />

      <Sidebar />
      <main className="flex-1 ml-[97px] relative z-10">
        <Header />
        <div className="flex flex-col items-center w-full px-4 py-10">
          <h1 className="text-4xl font-bold mb-8 text-black text-center">
            Riwayat Video yang Ditonton
          </h1>

          {loading ? (
            <p className="text-gray-700">Memuat data...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : histories.length === 0 ? (
            <p className="text-gray-600">Belum ada riwayat video.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
              {histories.map((item) => (
                <div
                  key={`${item.history_id}-${item.video_id}`}
                  onClick={() => router.push(`/WatchVideo/${item.video_id}`)}
                  className="relative p-4 bg-white rounded-lg shadow transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer group"
                >
                  {/* Overlay transparan saat hover */}
                  <div className="absolute inset-0 bg-[#F6E9DA]/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                  {/* Konten kartu */}
                  <div className="relative z-20">
                    <div className="w-full mb-4">
                      {item.video?.thumbnail ? (
                        <img
                          src={item.video.thumbnail}
                          alt={item.video.title}
                          className="w-full h-56 object-contain rounded-md"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-gray-500">Thumbnail tidak tersedia</span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-center text-lime-900">
                      {item.video?.title ?? "Judul tidak tersedia"}
                    </h2>
                    <p className="text-sm text-center text-gray-600">
                      Ditonton pada:{" "}
                      {new Date(item.watched_at).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
