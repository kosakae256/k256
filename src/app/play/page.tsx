import { navItems } from '@/constants/play/navItems';
import Link from 'next/link';

export default function Play() {
  return (
    <div className="p-20 flex flex-col ">
      <h2 className="font-bold text-2xl pb-20">
        k256.dev作のおもちゃを遊ぶ用の場所
      </h2>
      <nav className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-12">
        {navItems.slice(1).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="bg-white aspect-square rounded-3xl text-blue-500 shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center"
          >
            <item.iconEnable size={'10em'} />
            <h1 className="font-bold text-4xl">{item.name}</h1>
          </Link>
        ))}
      </nav>
    </div>
  );
}
