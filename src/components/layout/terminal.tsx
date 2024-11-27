"use client";
import { IoClose } from "react-icons/io5";

type TermimalProp = {
  switchShowTerminal: () => void;
};

export default function Terminal({ switchShowTerminal }: TermimalProp) {
  return (
    <div className="h-full w-full flex flex-col bg-white">
      <div className="h-8 w-full flex items-center">
        <span className="ml-4 text-xs underline underline-offset-4 decoration-blue-500">
          ターミナル
        </span>
        <button onClick={switchShowTerminal} className="ml-auto mr-2">
          <IoClose size={20} />
        </button>
      </div>
      <div className="flex-1 w-full ml-4 text-xs">portfolio.k256.dev $ </div>
    </div>
  );
}
