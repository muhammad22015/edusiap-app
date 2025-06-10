"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Storybook {
  book_id: number;
  title: string;
  book_link: string;
  thumbnail: string;
}

const PdfReaderPage = () => {
  const [books, setBooks] = useState<Storybook[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(`${API_URL}/storybook`);
      const data = await res.json();
      if (data && data.response) {
        setBooks(data.response);
      }
    };
    fetchBooks();
  }, []);

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
      <main className="flex-1 ml-[120px] relative z-10">
        <Header />
        <div className="flex flex-col items-center w-full py-10">
          <h1 className="text-4xl font-bold mb-8 text-black text-center">
            Buku Cerita Anak!
          </h1>

          {/* Grid dengan gap horizontal tipis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-3 w-full max-w-6xl place-items-center">
  {books.map((book) => (
    <div
      key={book.book_id}
      onClick={() => router.push(`/pdfReader/${book.book_id}`)}
      className="
        relative 
        group 
        cursor-pointer 
        rounded-lg 
        shadow-lg 
        bg-white 
        transition-transform 
        duration-300 
        transform 
        hover:scale-110 
        hover:shadow-2xl
        w-full
        max-w-[320px]
      "
    >
      {/* Overlay hover */}
      <div
        className="
          absolute inset-0 rounded-lg 
          bg-[#F6E9DA]/70
          pointer-events-none 
          z-20
          scale-90
          opacity-0
          transition-all duration-300
          group-hover:opacity-70
          group-hover:scale-105
        "
      />

      {/* Konten utama */}
      <div className="relative z-30 p-4">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="object-contain rounded-md mb-4 block w-full"
        />
        <h2 className="text-xl font-semibold text-center text-lime-900 break-words">
          {book.title}
        </h2>
      </div>
    </div>
  ))}
</div>

        </div>
      </main>
    </div>
  );
};

export default PdfReaderPage;
