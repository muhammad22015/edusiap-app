import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  forgotPassword?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  required,
  forgotPassword
}) => {
  return (
    <div className="relative mb-5">
      <label htmlFor={id} className="mb-2 text-sm text-black">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="p-2.5 w-full h-8 text-xs rounded-xl border border-solid border-zinc-400 text-neutral-700"
      />
      {forgotPassword && (
        <button
          type="button"
          onClick={forgotPassword}
          className="absolute top-0 right-1 text-xs text-blue-900 cursor-pointer"
        >
          forgot password
        </button>
      )}
    </div>
  );
};

export default InputField;