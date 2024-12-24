"use client";

import { IoIosArrowForward } from "react-icons/io";
import { LuPanelLeft } from "react-icons/lu";

type fileListProp = {
  switchShowLeftContainer: () => void;
};

export default function Filelist({ switchShowLeftContainer }: fileListProp) {
  return (
    <div className="h-full w-full flex flex-col bg-white">
      <div className="h-8 w-full flex items-center">
        <span className="m-6 text-xs">エクスプローラー</span>
        <button onClick={switchShowLeftContainer} className="ml-auto mr-2">
          <LuPanelLeft size={20} />
        </button>
      </div>
      <div className="flex-1 w-full flex">
        <IoIosArrowForward className="w-4 mx-1" />
        <span className="text-xs font-bold">portfolio.k256.dev</span>
      </div>
    </div>
  );
}
