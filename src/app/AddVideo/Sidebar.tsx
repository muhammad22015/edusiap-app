import React from 'react';

interface SidebarItem {
  label: string;
  icon?: string;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Home' },
  { label: 'History' },
  { label: 'Saved Video' },
  { label: 'Story Books', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13c02d72c4854b421290f13ee8d0cdd9303fa59e?placeholderIfAbsent=true&apiKey=600b45a3b00b44838808f9741fb53917' },
  { label: 'Admin' },
  { label: 'Add Video' },
  { label: 'Manage Video' },
];

const Sidebar: React.FC = () => {
  return (
    <nav className="flex overflow-hidden flex-col items-center px-5 py-52 text-xs leading-loose text-center bg-orange-300 text-zinc-700 w-[97px] max-md:hidden max-md:py-24" aria-label="Sidebar">
      {sidebarItems.map((item, index) => (
        <React.Fragment key={item.label}>
          {item.icon ? (
            <img
              src={item.icon}
              alt={`${item.label} icon`}
              className="object-contain self-stretch mt-11 w-full aspect-square max-md:mt-10 max-md:mr-1 max-md:ml-1"
            />
          ) : (
            <div className={`${index > 0 ? 'mt-20 max-md:mt-10' : ''} ${item.label === 'Saved Video' ? 'text-xs leading-3' : ''}`}>
              {item.label}
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Sidebar;