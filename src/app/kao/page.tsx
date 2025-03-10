import Button from '@/components/button/simpleButton';
import Image from 'next/image';

export default function Home() {
  return (
    <body>
      <div className="relative h-screen w-screen flex overflow-hidden bg-gray-900">
        {/* 背景画像 */}
        <Image
          src="/haikei.jpg"
          alt="Space background"
          fill
          className="object-cover"
        />

        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="z-10 relative h-full w-full text-white flex flex-col">
          {/* 箱1 idea置くだけ */}
          <div className="h-80 w-full flex items-center justify-center">
            <span className="text-7xl">IDEA</span>
          </div>

          <div className="flex-1 flex flex-col space-y-4 items-center justify-end py-16">
            <Button href="/kao/take">Start!</Button>
          </div>
        </div>
      </div>
    </body>
  );
}
