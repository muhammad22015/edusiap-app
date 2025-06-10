import React from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  id,
  value,
  onChange,
}) => {
  return (
    <div className="relative mb-5">
      <label htmlFor={id} className="mb-1.5 text-sm text-black block xl:text-xl">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="p-2.5 w-full text-xs rounded-xl border border-solid border-zinc-400 text-neutral-700 xl:text-xl"
        />
      </div>
    </div>
  );
};

export default InputField;
