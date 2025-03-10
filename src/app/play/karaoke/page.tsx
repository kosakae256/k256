'use client';

import Canvas from '@/features/play/karaoke/canvas';
import { PitchDetector } from 'pitchy';
import { useEffect, useRef, useState } from 'react';

// 音階リスト
const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

const getNoteFromPitch = (frequency: number): string => {
  if (frequency <= 0) return 'N/A';
  const A4 = 440; // 基準音 A4
  const noteNumber = Math.round(12 * Math.log2(frequency / A4) + 49);
  const noteIndex = (noteNumber - 21) % 12; // MIDI番号21からの音階を計算
  return NOTE_NAMES[noteIndex];
};

export default function Karaoke() {
  const [pitch, setPitch] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null); // 音階表示用
  const [clarity, setClarity] = useState<number | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const detectorRef = useRef<any>(null);
  const inputRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const audioContext = new window.AudioContext();
        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 2048;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyserNode);

        const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
        detector.minVolumeDecibels = -30;

        const input = new Float32Array(detector.inputLength);

        audioContextRef.current = audioContext;
        analyserNodeRef.current = analyserNode;
        detectorRef.current = detector;
        inputRef.current = input;
      } catch (err) {
        console.error('オーディオの初期化に失敗しました:', err);
      }
    };

    initializeAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const updatePitch = () => {
      if (!isListening) return;
      if (!analyserNodeRef.current || !detectorRef.current || !inputRef.current)
        return;

      const analyserNode = analyserNodeRef.current;
      const detector = detectorRef.current;
      const input = inputRef.current;

      analyserNode.getFloatTimeDomainData(input);
      const [detectedPitch, detectedClarity] = detector.findPitch(
        input,
        audioContextRef.current!.sampleRate,
      );

      setPitch(Math.round(detectedPitch * 10) / 10);
      setClarity(Math.round(detectedClarity * 100));

      if (detectedPitch > 0) {
        setNote(getNoteFromPitch(detectedPitch)); // ピッチから音階を取得
      }

      window.setTimeout(updatePitch, 100);
    };

    if (isListening) {
      updatePitch();
    }
  }, [isListening]);

  const handleStartListening = () => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsListening(true);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>リアルタイム音声ピッチ検出</h1>
      <button onClick={handleStartListening} disabled={isListening}>
        開始
      </button>
      <button onClick={handleStopListening} disabled={!isListening}>
        停止
      </button>
      <div style={{ marginTop: '1rem' }}>
        <p>
          <strong>ピッチ:</strong> {pitch ? `${pitch} Hz` : '未検出'}
        </p>
        <p>
          <strong>音階:</strong> {note ? note : '未検出'}
        </p>
        <p>
          <strong>明瞭度:</strong>{' '}
          {clarity !== null ? `${clarity} %` : '未検出'}
        </p>
      </div>
      <Canvas />
    </div>
  );
}
