"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Video {
  video_id: number;
  video_url: string;
  title: string;
  description: string;
  video_link: string;
  thumbnail: string;
}

interface PlaylistVideo {
  video: Video;
  position: number;
  video_id: number;
}

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [videos, setVideos] = useState<PlaylistVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const res = await fetch(`${API_URL}/playlists-videos?id=${id}`);
        const data = await res.json();
        if (data && data.response) {
          setVideos(data.response);
        }
      } catch (err) {
        console.error("Failed to fetch playlist videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-orange-100 relative">
      {/* Doodle Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 z-0 bg-[url('/doodle.jpg')] bg-no-repeat bg-center bg-cover"
        // style={{
        //   backgroundImage: "url(/doodle.jpg)",
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "110% auto",
        //   backgroundPosition: "center",
        //   zIndex: 0,
        // }}
      />

      <Sidebar />
      <main className="flex-1 ml-[97px] relative z-10">
        <Header />
        <div className="flex flex-col items-center w-full px-4 py-10">
          <h1 className="text-3xl font-bold mb-8 text-black text-center">
            Video Playlist {id}
          </h1>

          {loading ? (
            <p className="text-center">Memuat video...</p>
          ) : videos.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada video dalam playlist ini.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
              {videos.map((item) => {
                const { thumbnail, title } = item.video;

                return (
                  <div
                    key={`${item.video_id}-${item.position}`}
                    onClick={() => router.push(`/WatchVideo/${item.video_id}`)}
                    className="relative group bg-white p-6 rounded-lg shadow-md cursor-pointer 
                               transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    {/* Overlay timbul saat hover */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      bg-[#F6E9DA]/80 z-20 pointer-events-none"
                    />

                    {/* Konten utama */}
                    <div className="relative z-30">
                      <div className="w-full mb-4">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-56 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-full h-56 bg-gray-200 rounded-md flex items-center justify-center">
                            <span>Thumbnail unavailable</span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-lg font-semibold text-lime-900 mb-2 text-center">
                        {title}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlaylistDetailPage;
