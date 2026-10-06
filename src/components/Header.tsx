import React from 'react';
import { Search, Globe, Sliders, Moon, Volume2, Sparkles, Clock, X } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    language,
    setLanguage,
    setIsEqualizerOpen,
    setIsSleepTimerOpen,
    sleepTimerRemaining,
    equalizerPreset,
  } = useMusic();

  const formatTimerBadge = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <header className="h-16 px-4 md:px-8 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar */}
      <div className="relative w-full max-w-xs sm:max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            language === 'vi'
              ? 'Tìm kiếm bài hát, nghệ sĩ, thể loại...'
              : 'Search songs, artists, genres...'
          }
          className="w-full bg-slate-900/90 text-sm pl-10 pr-9 py-2 rounded-full border border-slate-700/60 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500/50 text-slate-200 placeholder-slate-400 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            aria-label="Xóa tìm kiếm"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Action shortcuts */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Sleep Timer button */}
        <button
          onClick={() => setIsSleepTimerOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
            sleepTimerRemaining !== null
              ? 'bg-rose-500/10 border-rose-500 text-rose-400'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
          }`}
          title={language === 'vi' ? 'Hẹn giờ tắt nhạc' : 'Sleep Timer'}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {sleepTimerRemaining !== null ? formatTimerBadge(sleepTimerRemaining) : (language === 'vi' ? 'Hẹn giờ' : 'Timer')}
          </span>
        </button>

        {/* Equalizer button */}
        <button
          onClick={() => setIsEqualizerOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
            equalizerPreset !== 'flat'
              ? 'bg-purple-500/10 border-purple-500 text-purple-300'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
          }`}
          title="Equalizer & Sound FX"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">EQ</span>
        </button>

        {/* Language switch */}
        <button
          onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          title="Ngôn ngữ / Language"
        >
          <Globe className="w-3.5 h-3.5 text-rose-400" />
          <span>{language.toUpperCase()}</span>
        </button>
      </div>
    </header>
  );
};
