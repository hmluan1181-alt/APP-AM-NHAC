import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../services/audioEngine';
import { VisualizerMode } from '../types/music';

interface AudioVisualizerProps {
  mode?: VisualizerMode;
  className?: string;
  isPlaying?: boolean;
  barColor?: string;
  mini?: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  mode = 'bars',
  className = '',
  isPlaying = false,
  mini = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const bufferLength = 64;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animId = requestAnimationFrame(render);

      // Fetch audio data
      if (mode === 'wave') {
        audioEngine.getTimeDomainData(dataArray);
      } else {
        audioEngine.getFrequencyData(dataArray);
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (!isPlaying) {
        // Idle state: subtle flat line or gentle breathing wave
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = mini ? 1.5 : 2;
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        return;
      }

      if (mode === 'bars') {
        const barWidth = (width / bufferLength) * (mini ? 1.8 : 1.5);
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * (mini ? 0.9 : 0.85);

          // Gradient from rose to indigo/cyan
          const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
          gradient.addColorStop(0, '#f43f5e'); // rose-500
          gradient.addColorStop(0.5, '#a855f7'); // purple-500
          gradient.addColorStop(1, '#06b6d4'); // cyan-500

          ctx.fillStyle = gradient;
          const roundedRadius = mini ? 2 : 3;

          // Draw rounded top bar
          const barY = height - barHeight;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(x, barY, Math.max(1, barWidth - 2), barHeight, [roundedRadius, roundedRadius, 0, 0]) : ctx.rect(x, barY, Math.max(1, barWidth - 2), barHeight);
          ctx.fill();

          x += barWidth;
        }
      } else if (mode === 'wave') {
        ctx.lineWidth = mini ? 1.5 : 2.5;
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#f43f5e');
        gradient.addColorStop(0.5, '#ec4899');
        gradient.addColorStop(1, '#8b5cf6');
        ctx.strokeStyle = gradient;

        ctx.beginPath();
        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
      } else if (mode === 'circle') {
        // Circular / Radial spectrum
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) * 0.55;

        for (let i = 0; i < bufferLength; i++) {
          const val = dataArray[i] / 255;
          const barLen = val * (radius * 0.7);
          const rad = (i / bufferLength) * Math.PI * 2;

          const x1 = centerX + Math.cos(rad) * radius;
          const y1 = centerY + Math.sin(rad) * radius;
          const x2 = centerX + Math.cos(rad) * (radius + barLen);
          const y2 = centerY + Math.sin(rad) * (radius + barLen);

          ctx.strokeStyle = `hsl(${(i * 6) % 360}, 90%, 65%)`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [mode, isPlaying, mini]);

  return (
    <canvas
      ref={canvasRef}
      width={mini ? 120 : 380}
      height={mini ? 32 : 120}
      className={`rounded-lg pointer-events-none ${className}`}
    />
  );
};
