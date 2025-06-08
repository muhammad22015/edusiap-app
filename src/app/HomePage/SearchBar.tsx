import React, { useState } from 'react';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 mx-5 my-0 h-[59px] max-w-[649px] max-sm:max-w-full">
      <svg id="121:1044" width="649" height="59" viewBox="0 0 649 59" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-bar" style={{ width: '100%', height: '100%' }}>
        <path d="M10 0.5H639C644.247 0.5 648.5 4.7533 648.5 10V49C648.5 54.2467 644.247 58.5 639 58.5H10C4.7533 58.5 0.5 54.2467 0.5 49V10C0.5 4.7533 4.75329 0.5 10 0.5Z" stroke="black"></path>
      </svg>
      <label htmlFor="search-input" className="sr-only">Search</label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        className="absolute top-2/4 left-[23px] text-3xl text-black -translate-y-2/4 bg-transparent border-none w-[80%] focus:outline-none"
        aria-label="Search input"
      />
    

      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          className="absolute right-[140px] top-1/2 transform -translate-y-1/2 cursor-pointer"
          aria-label="Clear search"
        >
          <svg id="121:1180" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-x">
            <path d="M36 12L12 36M12 12L36 36" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      )}
      <button
        type="submit"
        className="absolute right-5 top-2/4 rounded-xl border border-black border-solid -translate-y-2/4 bg-zinc-300 h-[59px] w-[77px]"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
};