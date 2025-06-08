import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between self-center w-full max-w-[1246px] max-md:max-w-full">
      <h1 className="my-auto text-3xl leading-none text-black">Logo</h1>
      <form className="flex flex-wrap gap-10 self-start pl-6 rounded-xl border border-black border-solid max-md:max-w-full" role="search">
        <label htmlFor="search-input" className="sr-only">Search</label>
        <input
          type="search"
          id="search-input"
          placeholder="Search"
          className="my-auto text-3xl leading-none text-black bg-transparent border-none"
          aria-label="Search"
        />
        <div className="flex gap-3.5">
          <button type="submit" aria-label="Submit search">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/93c80a53910f748a26e50774352cc02abae78105?placeholderIfAbsent=true&apiKey=600b45a3b00b44838808f9741fb53917"
              alt=""
              className="object-contain shrink-0 my-auto w-12 aspect-square"
            />
          </button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4747bbf821bbd7629b347237bd7ca8a1a2aaa9e?placeholderIfAbsent=true&apiKey=600b45a3b00b44838808f9741fb53917"
            alt="User avatar"
            className="object-contain shrink-0 rounded-xl aspect-[1.31] w-[77px]"
          />
        </div>
      </form>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b32a9b46168cbdd6fd9f2ca3c5aa570f357c0cb5?placeholderIfAbsent=true&apiKey=600b45a3b00b44838808f9741fb53917"
        alt="Notification icon"
        className="object-contain shrink-0 rounded-xl aspect-[0.96] w-[66px]"
      />
    </header>
  );
};

export default Header;