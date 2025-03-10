'use client';
import ButtonLink from '@/components/button/BackBottun';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CameraPage() {
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error('Error accessing camera:', error));
  }, []);

  const handleCapture = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      setLoading(true);
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
      canvasRef.current.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'image.png');

        try {
          const response = await fetch('http://localhost:8001/api/upload', {
            method: 'POST',
            body: formData,
          });
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          router.push(`/kao/preview?image=${encodeURIComponent(imageUrl)}`);
        } catch (error) {
          console.error('Upload error:', error);
          setLoading(false);
        }
      }, 'image/png');
    }
  }, [router]);

  return (
    <body>
      <div className="relative w-full h-screen bg-black">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          ></video>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>

        <button
          onClick={handleCapture}
          className="absolute bottom-10 left-1/2 opacity-50 transform -translate-x-1/2 bg-white w-16 h-16 rounded-full shadow-lg"
        ></button>

        <div className="relative z-50 flex flex-col text-white">
          <div className="h-10 w-full flex items-center justify-start">
            <ButtonLink href="/kao">＜Back</ButtonLink>
          </div>
        </div>
      </div>
    </body>
  );
}
