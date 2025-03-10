'use client';
import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href: string; // 遷移先のURLを受け取る
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  disabled = false,
}) => {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className={`border border-white w-48 py-3 text-white text-lg bg-gray-900 rounded-md bg-opacity-70`}
        disabled={disabled}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
