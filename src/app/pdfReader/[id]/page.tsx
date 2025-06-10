"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Storybook {
  book_id: number;
  title: string;
  book_link: string;
  thumbnail: string;
}

const getEmbedLink = (url: string) => {
  if (url.includes("drive.google.com")) {
    return url.replace("/view?usp=sharing", "/preview");
  }
  return url;
};

const getDownloadLink = (url: string) => {
  // Ambil ID file dari Google Drive URL
  const match = url.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return url;
};

const StorybookDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Storybook | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`https://edusiap-api2-498867854322.asia-southeast2.run.app/storybook/read?id=${id}`);
      const data = await res.json();
      if (data && data.response) {
        setBook(data.response);
      }
    };
    if (id) fetchBook();
  }, [id]);

  if (!book) {
    return <div className="text-center p-8">Memuat buku...</div>;
  }

  return (
    <div className="flex min-h-screen bg-orange-100 relative">
      {/* Background doodle */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 z-0 bg-[url('/doodle.jpg')] bg-no-repeat bg-center bg-cover"
        // style={{
        //   backgroundImage: "url('/doodle.jpg')",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   zIndex: 0,
        // }}
      />

      <Sidebar />
      <main className="flex-1 ml-[97px] relative z-10 max-sm:ml-0">
        <Header />
        <div className="flex flex-col items-center w-full px-4 py-10 mt-20">
          <h1 className="text-3xl font-bold mb-4 text-lime-800 text-center max-sm:text-3xl">{book.title}</h1>

          <iframe
            src={getEmbedLink(book.book_link)}
            width="450"
            height="600"
            allow="autoplay"
            className="max-w-4xl border-2 border-gray-300 rounded-md max-sm:w-[250px] max-sm:h-[360px]"
          ></iframe>

          {/* Tombol berada di bawah iframe */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => router.push("/pdfReader")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Tutup Buku
            </button>
            <a
              href={getDownloadLink(book.book_link)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Download Buku
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StorybookDetail;
