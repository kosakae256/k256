'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navItems } from '@/constants/play/navItems';
import { AiOutlineClose } from 'react-icons/ai';

interface PlayNavigatorProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlayNavigator({ setSideBar }: PlayNavigatorProps) {
  const pathName = usePathname();

  return (
    <>
      <div className="md:w-[16rem] max-md:w-0 h-full z-0" />
      <nav className="md:w-[16rem] max-md:w-full px-6 md:block bg-white fixed h-full z-20 overflow-y-auto pb-16 flex flex-col">
        <div className="w-full h-16 flex items-center">
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-transform duration-300 rounded-lg"
            onClick={() => setSideBar(false)}
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name} className="group">
              {/* 選択中の要素 */}
              {pathName == item.href && (
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg transition-transform duration-300 
                 text-blue-500 group-hover:bg-gray-100 group-hover:scale-105"
                >
                  <item.iconEnable size={'1.5em'} />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              )}
              {/* 選択されていない要素 */}
              {pathName == item.href || (
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg transition-transform duration-300 
                group-hover:bg-gray-100 group-hover:scale-105"
                  onClick={() => setSideBar(false)}
                >
                  <item.iconDisable size={'1.5em'} />
                  <span className="group-hover:font-semibold">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
