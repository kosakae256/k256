import { useEffect, useRef } from 'react';

interface Element {
  x: number;
  y: number;
  color: string;
}

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const elements = useRef<Element[]>([]);

  // アニメーションを更新する関数
  const animate = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 画面をクリア

    // 各要素を描画
    elements.current.forEach((element, index) => {
      ctx.beginPath();
      ctx.arc(element.x, element.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = element.color;
      ctx.fill();
      ctx.closePath();

      // 要素を左に移動
      element.x -= 2;

      // 画面外に出たら要素を削除
      if (element.x < 0) {
        elements.current.splice(index, 1);
      }
    });

    // 次のフレームのために再度アニメーションを呼び出し
    requestAnimationFrame(animate);
  };

  // 要素を追加する関数
  const addElement = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    // 親要素の幅を取得（最大幅）
    const parentWidth = parentElement.getBoundingClientRect().width;

    elements.current.push({
      x: parentWidth, // 親要素の最大幅から開始
      y: Math.random() * canvas.height,
      color: 'red',
    });
  };

  // 初期化とアニメーション開始
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    // 親要素の幅を取得（最大幅）
    const parentWidth = parentElement.getBoundingClientRect().width;

    canvas.width = parentWidth; // 親要素の幅に合わせてcanvasの幅を設定
    canvas.height = 600; // 高さはウィンドウの高さに設定

    animate();
  }, []);

  return (
    <div className="h-full w-full border border-4">
      <canvas ref={canvasRef} />
      <button onClick={addElement}>要素を追加</button>
    </div>
  );
};

export default Canvas;
