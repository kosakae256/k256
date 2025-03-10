// components/ButtonLink.js
import React from 'react';
import Link from 'next/link';

interface ButtonProps2 {
  children: React.ReactNode;
  href: string;
}

const ButtonLink: React.FC<ButtonProps2> = ({ children, href }) => {
  return (
    <Link href={href}>
      <button className="text-xl">{children}</button>
    </Link>
  );
};

export default ButtonLink;
