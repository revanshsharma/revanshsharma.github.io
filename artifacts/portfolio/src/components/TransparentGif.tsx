import React, { useEffect, useRef } from "react";

interface Props {
  src: string;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders an animated GIF on a canvas, removing the cyan sprite background
 * (#5BC8F5 ≈ R<150, G>145, B>185) on every animation frame.
 */
export const TransparentGif = ({ src, height, className, style }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    imgRef.current = img;

    const draw = () => {
      const canvas = canvasRef.current;
      const image = imgRef.current;
      if (!canvas || !image || image.naturalWidth === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const aspect = image.naturalWidth / image.naturalHeight;
      const w = Math.round(height * aspect);
      const h = height;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) { rafRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(image, 0, 0, w, h);

      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        // Cyan background: ~#5BC8F5 and similar teal/sky tones
        if (r < 150 && g > 145 && b > 185 && b > r + 60) {
          d[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [src, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ imageRendering: "pixelated", display: "block", ...style }}
    />
  );
};
