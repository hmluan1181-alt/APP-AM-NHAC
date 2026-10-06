import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Volume2,
  VolumeX,
  Mic2,
  ListMusic,
  Activity,
  Sliders,
  Disc,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { AudioVisualizer } from './AudioVisualizer';
import { VisualizerMode } from '../types/music';

export const FullPlayerModal: React.FC = () => {
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
    queue,
    queueIndex,
    isFullPlayerOpen,
    setIsFullPlayerOpen,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextSong,
    prevSong,
    toggleFavorite,
    toggleShuffle,
    cycleRepeatMode,
    playSong,
    language,
    setIsEqualizerOpen,
  } = useMusic();

  const [activeTab, setActiveTab] = useState<'visual' | 'lyrics' | 'queue'>('visual');
  const [visualMode, setVisualMode] = useState<VisualizerMode>('bars');
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  if (!isFullPlayerOpen || !currentSong) return null;

  const isFav = favorites.includes(currentSong.id);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Auto-scroll lyrics to current line
  const activeLyricIndex = currentSong.lyrics.reduce((acc, line, idx) => {
    if (currentTime >= line.time) return idx;
    return acc;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Background Ambient Glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none blur-3xl scale-125 transition-all duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, #f43f5e 0%, #6366f1 50%, transparent 80%)`,
        }}
      />

      {/* TOP HEADER */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-800/50 relative z-10">
        <div className="flex items-center gap-2">
          <Disc className={`w-5 h-5 text-rose-500 ${isPlaying ? 'animate-spin-slow' : ''}`} />
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
            {language === 'vi' ? 'Đang phát' : 'Now Playing'}
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-slate-900 rounded-full border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
              activeTab === 'visual' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Giao diện' : 'Visualizer'}</span>
          </button>
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
              activeTab === 'lyrics' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic2 className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Lời bài hát' : 'Lyrics'}</span>
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition ${
              activeTab === 'queue' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Danh sách chờ' : 'Queue'}</span>
          </button>
        </div>

        <button
          onClick={() => setIsFullPlayerOpen(false)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
          aria-label="Đóng"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* CENTER CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center justify-center relative z-10 max-w-4xl mx-auto w-full">
        {activeTab === 'visual' && (
          <div className="flex flex-col items-center text-center space-y-6 w-full">
            {/* Spinning Vinyl & Artwork */}
            <div className="relative group my-2">
              <div
                className={`w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-slate-800 shadow-2xl overflow-hidden relative transition-transform ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
                style={{
                  boxShadow: '0 0 50px rgba(244, 63, 94, 0.25)',
                }}
              >
                <img
                  src={currentSong.coverUrl}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
                {/* Vinyl Center Hole */}
                <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-700 flex items-center justify-center shadow-inner">
                  <div className="w-5 h-5 rounded-full bg-rose-500/80"></div>
                </div>
              </div>
            </div>

            {/* Song Meta */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentSong.title}
              </h2>
              <p className="text-base text-rose-400 font-medium mt-1">{currentSong.artist}</p>
              {currentSong.album && (
                <p className="text-xs text-slate-500 mt-1">{currentSong.album}</p>
              )}
            </div>

            {/* Visualizer & Mode Selector */}
            <div className="w-full max-w-md flex flex-col items-center gap-3">
              <AudioVisualizer isPlaying={isPlaying} mode={visualMode} className="w-full h-24" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVisualMode('bars')}
                  className={`px-2.5 py-1 text-xs rounded-lg transition ${
                    visualMode === 'bars' ? 'bg-slate-800 text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bars
                </button>
                <button
                  onClick={() => setVisualMode('wave')}
                  className={`px-2.5 py-1 text-xs rounded-lg transition ${
                    visualMode === 'wave' ? 'bg-slate-800 text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Waveform
                </button>
                <button
                  onClick={() => setVisualMode('circle')}
                  className={`px-2.5 py-1 text-xs rounded-lg transition ${
                    visualMode === 'circle' ? 'bg-slate-800 text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Radial
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lyrics' && (
          <div
            ref={lyricsContainerRef}
            className="w-full max-w-2xl text-center space-y-6 py-8 h-[400px] overflow-y-auto"
          >
            {currentSong.lyrics && currentSong.lyrics.length > 0 ? (
              currentSong.lyrics.map((line, idx) => {
                const isCurrent = idx === activeLyricIndex;
                return (
                  <p
                    key={idx}
                    onClick={() => seek(line.time)}
                    className={`cursor-pointer transition-all duration-300 select-none py-2 px-4 rounded-xl ${
                      isCurrent
                        ? 'text-2xl sm:text-3xl font-extrabold text-white bg-rose-500/10 scale-105 text-rose-300'
                        : 'text-base sm:text-lg text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {line.text}
                  </p>
                );
              })
            ) : (
              <p className="text-slate-500 italic">
                {language === 'vi' ? 'Không có lời cho bài hát này.' : 'No lyrics available for this track.'}
              </p>
            )}
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="w-full max-w-xl space-y-2 py-4 h-[400px] overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              {language === 'vi' ? 'Danh sách bài hát đang chờ' : 'Up Next in Queue'} ({queue.length})
            </h3>
            {queue.map((s, idx) => {
              const isCurrent = s.id === currentSong.id;
              return (
                <div
                  key={`${s.id}-${idx}`}
                  onClick={() => playSong(s)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                    isCurrent
                      ? 'bg-rose-500/20 border border-rose-500/50 text-white'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono w-5 text-slate-500">{idx + 1}</span>
                    <img src={s.coverUrl} alt={s.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{s.title}</div>
                      <div className="text-xs text-slate-400 truncate">{s.artist}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{formatTime(s.duration)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="p-6 bg-slate-950/90 border-t border-slate-800/80 max-w-3xl mx-auto w-full relative z-10">
        {/* Scrubber */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-4">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.5}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          <span className="w-10">{formatTime(duration)}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className={`p-2 rounded-full transition ${
              isFav ? 'text-rose-500' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Thích"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-full transition ${
                isShuffle ? 'text-rose-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Phát ngẫu nhiên"
            >
              <Shuffle className="w-5 h-5" />
            </button>

            <button
              onClick={prevSong}
              className="p-2 text-slate-200 hover:text-white transition active:scale-95"
              title="Bài trước"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition"
              aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white ml-0.5" />
              )}
            </button>

            <button
              onClick={nextSong}
              className="p-2 text-slate-200 hover:text-white transition active:scale-95"
              title="Bài kế tiếp"
            >
              <SkipForward className="w-6 h-6" />
            </button>

            <button
              onClick={cycleRepeatMode}
              className={`p-2 rounded-full transition ${
                repeatMode !== 'off' ? 'text-rose-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Lặp lại"
            >
              {repeatMode === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={() => setIsEqualizerOpen(true)}
            className="p-2 text-slate-400 hover:text-white rounded-full transition"
            title="EQ"
          >
            <Sliders className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
