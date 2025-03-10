'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ButtonLink from '@/components/button/BackBottun';

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('image');
  const router = useRouter();

  return (
    <body>
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-white">No image available</p>
        )}
        <div className="absolute z-50 left-0 top-0 flex flex-col text-white">
          <div className="h-10 w-full flex items-center justify-start">
            <ButtonLink href="/kao/take">＜Back</ButtonLink>
          </div>
        </div>
      </div>
    </body>
  );
}
