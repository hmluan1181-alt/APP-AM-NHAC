import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  Maximize2,
  Mic2,
  SlidersHorizontal,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { AudioVisualizer } from './AudioVisualizer';

export const PlayerBar: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    repeatMode,
    isShuffle,
    favorites,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextSong,
    prevSong,
    toggleFavorite,
    toggleShuffle,
    cycleRepeatMode,
    setIsFullPlayerOpen,
    setIsLyricsOpen,
    setIsEqualizerOpen,
  } = useMusic();

  const [isHoveringSeek, setIsHoveringSeek] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);

  if (!currentSong) return null;

  const isFav = favorites.includes(currentSong.id);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    seek(val);
  };

  return (
    <footer className="h-20 bg-slate-950/95 border-t border-slate-800/80 px-4 md:px-6 flex items-center justify-between z-30 select-none relative backdrop-blur-lg">
      {/* LEFT: Current Track Info */}
      <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
        <div
          onClick={() => setIsFullPlayerOpen(true)}
          className="relative group cursor-pointer w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-md"
        >
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className={`w-full h-full object-cover transition-transform group-hover:scale-110 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="min-w-0 pr-2">
          <div
            onClick={() => setIsFullPlayerOpen(true)}
            className="text-sm font-semibold text-white truncate cursor-pointer hover:text-rose-400 transition"
          >
            {currentSong.title}
          </div>
          <div className="text-xs text-slate-400 truncate hover:text-slate-200 cursor-pointer">
            {currentSong.artist}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className={`p-1.5 rounded-full hover:bg-slate-800 transition ${
              isFav ? 'text-rose-500' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Thích bài hát"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={() => setIsLyricsOpen(true)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition hidden sm:inline-flex"
            aria-label="Lời bài hát"
            title="Lời bài hát Karaoke"
          >
            <Mic2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CENTER: Player Controls & Scrubber */}
      <div className="flex flex-col items-center justify-center max-w-xl w-2/4 px-2">
        <div className="flex items-center gap-3 sm:gap-5 mb-1.5">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`p-1.5 rounded-full hover:bg-slate-800/80 transition ${
              isShuffle ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Phát ngẫu nhiên"
            title="Phát ngẫu nhiên (Shuffle)"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          {/* Previous */}
          <button
            onClick={prevSong}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition active:scale-95"
            aria-label="Bài trước"
            title="Bài trước"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Play / Pause with glowing gradient ring */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition"
            aria-label={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={nextSong}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition active:scale-95"
            aria-label="Bài tiếp theo"
            title="Bài kế tiếp"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Repeat mode */}
          <button
            onClick={cycleRepeatMode}
            className={`p-1.5 rounded-full hover:bg-slate-800/80 transition ${
              repeatMode !== 'off' ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Lặp lại"
            title={`Lặp lại: ${repeatMode === 'one' ? 'Bài hiện tại' : repeatMode === 'all' ? 'Toàn bộ' : 'Tắt'}`}
          >
            {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
          </button>
        </div>

        {/* Progress Bar & Timestamps */}
        <div className="w-full flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <div className="relative flex-1 flex items-center group">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.5}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 transition-all hover:h-2"
              style={{
                background: `linear-gradient(to right, #f43f5e ${progressPercent}%, #334155 ${progressPercent}%)`,
              }}
            />
          </div>
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT: Visualizer, Equalizer, Volume, Fullscreen */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[180px]">
        {/* Realtime Mini Visualizer */}
        <div className="hidden lg:block">
          <AudioVisualizer isPlaying={isPlaying} mini={true} mode="bars" />
        </div>

        {/* EQ shortcut */}
        <button
          onClick={() => setIsEqualizerOpen(true)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition hidden sm:inline-flex"
          title="Chỉnh âm Equalizer"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-slate-400 hover:text-white transition"
            aria-label={isMuted ? 'Bật âm' : 'Tắt âm'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 sm:w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>

        {/* Expand / Fullscreen */}
        <button
          onClick={() => setIsFullPlayerOpen(true)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Mở toàn màn hình"
          title="Mở trình phát đầy đủ"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
