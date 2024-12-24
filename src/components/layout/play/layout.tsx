'use client';

import { useState } from 'react';
import PlayHeader from './header';
import PlayNavigator from './navigator';
import { TbMenu2 } from 'react-icons/tb';
import PlayExplanation from './explanation';

export default function PlayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sideBar, setSideBar] = useState<boolean>(true);
  return (
    <body className="bg-gray-100">
      <div className="flex flex-col relative h-screen">
        <PlayHeader />
        <div className="flex pt-16 flex-1 relative w-full">
          {sideBar ? <PlayNavigator setSideBar={setSideBar} /> : null}
          <div className={'flex-1 h-full relative'}>
            {sideBar || (
              <button
                className="w-8 h-8 fixed top-20 left-2 bg-white flex items-center justify-center p-5 shadow-xl hover:scale-105 transition-transform duration-300 rounded-xl"
                onClick={() => setSideBar((rev) => !rev)}
              >
                <div className="m-8">
                  <TbMenu2 size={32} />
                </div>
              </button>
            )}
            {children}
          </div>
        </div>
        {/* <PlayExplanation /> */}
      </div>
    </body>
  );
}
