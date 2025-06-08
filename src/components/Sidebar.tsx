import React, { useState, useEffect, useRef }  from 'react';
import { SidebarIcon } from './SidebarIcon';

const sidebarIcons = [
  { name: 'Beranda', svg: '<svg id="121:1266" layer-name="homeIcon" width="65" height="71" viewBox="0 0 65 71" fill="none" xmlns="http://www.w3.org/2000/svg" class="home-icon"> <g clip-path="url(#clip0_121_1266)"> <path d="M32.3469 5.46155L6.31946 24.1458H12.8263V49.0581H25.8401V36.6019H38.8538V49.0581H51.8675V23.9589L58.3744 24.1458L32.3469 5.46155Z" fill="#454545"></path> </g> <defs> <clipPath id="clip0_121_1266"> <rect width="65" height="71" fill="white"></rect> </clipPath> </defs> </svg>' },
  { name: 'Riwayat Tontonan', svg: '<svg id="121:1268" layer-name="historyIcon" width="65" height="71" viewBox="0 0 65 71" fill="none" xmlns="http://www.w3.org/2000/svg" class="history-icon"> <g clip-path="url(#clip0_121_1268)">  <path d="M32.5 5.46155C19.0938 5.46155 8.125 16.5212 8.125 30.0385C8.125 43.5558 19.0938 54.6154 32.5 54.6154C45.9062 54.6154 56.875 43.5558 56.875 30.0385C56.875 16.5212 45.9062 5.46155 32.5 5.46155ZM32.5 11.6058C42.6156 11.6058 50.7812 19.839 50.7812 30.0385C50.7812 40.2379 42.6156 48.4712 32.5 48.4712C22.3844 48.4712 14.2188 40.2379 14.2188 30.0385C14.2188 19.839 22.3844 11.6058 32.5 11.6058ZM29.4531 17.75V31.3902L30.4281 32.1889L33.475 35.2611L35.5469 37.5959L39.9344 33.172L37.6188 31.083L35.5469 28.9939V17.8729H29.4531V17.75Z" fill="#454545"></path> </g> <defs> <clipPath id="clip0_121_1268"> <rect width="65" height="71" fill="white"></rect> </clipPath> </defs> </svg>' },
  { name: 'Daftar Putar', svg: '<svg id="121:1423" layer-name="historyIcon" width="65" height="71" viewBox="0 0 65 71" fill="none" xmlns="http://www.w3.org/2000/svg" class="saved-video-icon"> <g clip-path="url(#clip0_121_1423)"> <path d="M11.9687 20C10.3062 20 9 21.3656 9 22.9687V46.7184C9 48.3809 10.3656 49.6871 11.9687 49.6871H41.6558C43.3183 49.6871 44.6245 48.3809 44.6245 46.7184V37.8123L50.5619 43.7497H56.4993V25.9374H50.5619L44.6245 31.8748V22.9687C44.6245 21.3062 43.3183 20 41.6558 20H11.9687Z" fill="#454545"></path> </g> <defs> <clipPath id="clip0_121_1423"> <rect width="65" height="71" fill="white"></rect> </clipPath> </defs> </svg>' },
  { name: 'Buku Cerita', svg: '<svg id="151:544" layer-name="famicons:book" width="65" height="71" viewBox="0 0 65 71" fill="none" xmlns="http://www.w3.org/2000/svg" class="book-icon"><g transform="translate(8, 4) scale(1.1)"> <path d="M18.565 6.79297C15.2484 5.20947 10.6126 4.43379 4.40626 4.40625C3.82093 4.3983 3.24709 4.56898 2.76125 4.89553C2.36248 5.16507 2.03605 5.52847 1.81067 5.95378C1.58529 6.37908 1.46788 6.85324 1.46875 7.33457V33.5977C1.46875 35.373 2.73188 36.7123 4.40626 36.7123C10.9303 36.7123 17.4745 37.3219 21.3942 41.0268C21.4478 41.0777 21.5152 41.1117 21.588 41.1247C21.6608 41.1376 21.7358 41.1288 21.8037 41.0995C21.8715 41.0702 21.9293 41.0215 21.9698 40.9596C22.0102 40.8977 22.0316 40.8253 22.0313 40.7514V9.80574C22.0314 9.59696 21.9867 9.3906 21.9002 9.20056C21.8137 9.01053 21.6875 8.84126 21.53 8.70418C20.6322 7.93661 19.6348 7.29373 18.565 6.79297ZM44.2388 4.89277C43.7527 4.56704 43.1788 4.39731 42.5938 4.40625C36.3874 4.43379 31.7516 5.2058 28.435 6.79297C27.3652 7.29281 26.3676 7.93443 25.469 8.70051C25.3119 8.83779 25.1859 9.00712 25.0996 9.19712C25.0133 9.38712 24.9687 9.59339 24.9688 9.80207V40.7495C24.9687 40.8206 24.9897 40.8901 25.0289 40.9493C25.0682 41.0085 25.1241 41.0548 25.1896 41.0823C25.2551 41.1099 25.3273 41.1175 25.3971 41.1041C25.4669 41.0908 25.5312 41.0572 25.582 41.0075C27.9384 38.6667 32.0738 36.7096 42.5974 36.7105C43.3765 36.7105 44.1237 36.401 44.6746 35.8501C45.2254 35.2992 45.5349 34.5521 45.5349 33.773V7.33549C45.536 6.85321 45.4183 6.37809 45.1923 5.95207C44.9662 5.52605 44.6387 5.16225 44.2388 4.89277Z" fill="#454545"></path></g> </svg>' },
  { name: 'User', svg: '<svg id="151:534" layer-name="userIcon" width="65" height="71" viewBox="0 0 65 71" fill="none" xmlns="http://www.w3.org/2000/svg" class="user-icon"> <g clip-path="url(#clip0_151_534)"> <path d="M33 11C27.225 11 22.5 16.88 22.5 24.125C22.5 31.37 27.225 37.25 33 37.25C38.775 37.25 43.5 31.37 43.5 24.125C43.5 16.88 38.775 11 33 11ZM22.0275 37.25C16.4625 37.5125 12 42.08 12 47.75V53H54V47.75C54 42.08 49.59 37.5125 43.9725 37.25C41.1375 40.4525 37.2525 42.5 33 42.5C28.7475 42.5 24.8625 40.4525 22.0275 37.25Z" fill="#454545"></path> </g> <defs> <clipPath id="clip0_151_534"> <rect width="65" height="71" fill="white"></rect> </clipPath> </defs> </svg>' },
];

export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <nav 
      ref={sidebarRef}
      className={`flex flex-col items-center bg-orange-300 h-screen fixed
        ${isExpanded ? 'w-[180px]' : 'w-[60px]'}
        ${isExpanded ? 'max-sm:bg-orange-300' : 'max-sm:bg-transparent'}
        sm:w-[120px] transition-all duration-300 ease-in-out z-51`} 
      aria-label="Main Navigation"
    >
      <button 
        className={`my-5 scale-50 rounded-full p-6 
          ${isExpanded ? 'max-sm:bg-transparent' : 'max-sm:bg-white'}
          ${isExpanded ? 'max-sm:border-none' : 'max-sm:border-4'}
          ${isExpanded ? 'max-sm:border-none' : 'max-sm:border-gray-300'}
        `} 
        aria-label="Menu"
        onClick={toggleSidebar}
      >
        <svg id="121:1265" width="44" height="38" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="menu-svg scale-125">
          <path d="M0 0V5.45194H43.6155V0H0ZM0 16.1923V21.6442H43.6155V16.1923H0ZM0 32.5481V38H43.6155V32.5481H0Z" fill="#454545"></path>
        </svg>
      </button>
      
      <div className={`flex flex-col items-center h-full justify-evenly 
        ${isExpanded ? 'flex' : 'hidden sm:flex'}`}
      >
        {sidebarIcons.map((icon, index) => (
          <SidebarIcon key={index} name={icon.name} svg={icon.svg} />
        ))}
      </div>
    </nav>
  );
};
