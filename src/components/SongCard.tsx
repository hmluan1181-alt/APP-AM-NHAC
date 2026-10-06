import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Song } from '../types/music';
import { useMusic } from '../context/MusicContext';

interface SongCardProps {
  song: Song;
  playlistContext?: Song[];
}

export const SongCard: React.FC<SongCardProps> = ({ song, playlistContext }) => {
  const { currentSong, isPlaying, playSong, togglePlay, favorites, toggleFavorite } = useMusic();

  const isCurrent = currentSong?.id === song.id;
  const isFav = favorites.includes(song.id);

  const handleClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, playlistContext);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-slate-900/60 hover:bg-slate-850 p-3 rounded-2xl border border-slate-800/60 hover:border-slate-700/80 transition-all duration-200 cursor-pointer flex flex-col select-none"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-md mb-3 bg-slate-950">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Icon (Top right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(song.id);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full bg-slate-950/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity ${
            isFav ? 'opacity-100 text-rose-500' : 'text-slate-300 hover:text-white'
          }`}
          aria-label="Yêu thích"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Play / Pause button overlay */}
        <div
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/40 transition-all duration-200 ${
            isCurrent
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
          }`}
        >
          {isCurrent && isPlaying ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5" />
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold truncate ${isCurrent ? 'text-rose-400' : 'text-white'}`}>
          {song.title}
        </h4>
        <p className="text-xs text-slate-400 truncate mt-0.5">{song.artist}</p>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-medium">
          {song.genre}
        </span>
        <span className="font-mono">
          {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};
