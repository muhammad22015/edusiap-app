"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface Playlist {
  playlist_id: number;
  title: string;
  category: string;
  upload_date: string;
  first_video_url: string;
}

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch("https://edusiap-api2-498867854322.asia-southeast2.run.app/playlists");
        const data = await res.json();
        if (data && data.response) {
          setPlaylists(data.response);
        }
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="flex min-h-screen bg-orange-100 relative">
      {/* Doodle Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 z-0 bg-[url('/doodle.jpg')] bg-no-repeat bg-center bg-cover"
       
      ></div>

      <Sidebar />
      <main className="flex-1 ml-[97px] relative z-10">
        <Header />
        <div className="flex flex-col items-center w-full px-4 py-10">
          <h1 className="text-4xl font-bold mb-8 text-black text-center">
            Playlist EduSiap!
          </h1>

          {/* Grid daftar playlist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {playlists.map((playlist) => (
              <div
                key={playlist.playlist_id}
                onClick={() =>
                  router.push(`/Playlist/${playlist.playlist_id}`)
                }
                className="relative cursor-pointer p-4 bg-white rounded-lg shadow
                  transition-transform duration-300
                  hover:scale-110 hover:shadow-2xl"
              >
                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-[#F6E9DA]/100 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                {/* Konten playlist */}
                <div className="relative z-20">
                  <h2 className="text-xl font-semibold text-center text-lime-900">
                    {playlist.title}
                  </h2>
                  <p className="text-sm text-center text-gray-600">
                    Kategori: {playlist.category}
                  </p>
                  <p className="text-xs text-center text-gray-500">
                    Upload: {new Date(playlist.upload_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaylistPage;
