import React from 'react';

type ButtonProps = {
  children: string;
  size?: "large" | "thin" | "default";
  onClick: () => void;
  className?: string;
}

const Button:React.FC<ButtonProps> = ({children, onClick, size= "default", className = ""}) => {
  return (
    <button onClick={onClick} className={`${size === "large" ? "py-2.5" : "py-1.5"} ${size === "thin" ? "min-w-[168px]" : "min-w-[128px]"} h-fit w-fit flex justify-center items-center rounded-xl text-white font-medium leading-5 bg-violet-600 hover:bg-violet-700 transition-colors ${className}`}>
      {children}
    </button>
  );
};

export default Button;
