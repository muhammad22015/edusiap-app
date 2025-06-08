// components/SearchBar.tsx
"use client";
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Cari...',
  initialValue = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  // Sync with initialValue
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative w-full transition-all duration-200 ${isFocused ? 'ring-orange-500' : ''}`}
    >
      <div className="relative">
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-14 bg-white text-black rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:outline-none text-lg transition-all duration-200 max-sm:text-sm max-sm:h-10 max-sm:pl-8 max-sm:-translate-x-2"
          aria-label="Search input"
        />
        
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 max-sm:scale-75 max-sm:left-0">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <path 
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M21 21L16.65 16.65" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Clear button (visible when there's text) */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-24 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors max-sm:right-4"
            aria-label="Clear search"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500"
            >
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Search button */}
        <button
          type="submit"
          className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-12 w-20 rounded-lg font-medium transition-colors duration-200 max-sm:h-8 max-sm:text-sm max-sm:w-14 max-sm:right-10 max-sm:hidden ${
            searchTerm 
              ? 'bg-orange-500 text-white hover:bg-orange-600' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!searchTerm}
          aria-label="Submit search"
        >
          Cari
        </button>
      </div>
    </form>
  );
};