import React from 'react';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-5 h-[101px]">
      <h1 className="text-3xl text-black">Logo</h1>
      <SearchBar />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/80479b3752c51b9cbb466836e9396b3b4d62b33e"
        alt="Profile"
        className="rounded-xl h-[69px] w-[69px]"
      />
    </header>
  );
};