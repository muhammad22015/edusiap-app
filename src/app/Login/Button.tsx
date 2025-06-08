import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="mb-8 w-full h-8 text-sm font-bold text-white bg-lime-900 rounded-xl cursor-pointer border-[none]"
    >
      {children}
    </button>
  );
};

export default Button;