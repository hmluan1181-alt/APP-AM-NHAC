import React, { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Plus, Check } from 'lucide-react';
import { Song } from '../types/music';
import { useMusic } from '../context/MusicContext';

interface SongRowProps {
  song: Song;
  index: number;
  playlistContext?: Song[];
}

export const SongRow: React.FC<SongRowProps> = ({ song, index, playlistContext }) => {
  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
    favorites,
    toggleFavorite,
    playlists,
    addSongToPlaylist,
    language,
  } = useMusic();

  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const isCurrent = currentSong?.id === song.id;
  const isFav = favorites.includes(song.id);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatPlays = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const handleRowClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, playlistContext);
    }
  };

  return (
    <div
      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition select-none ${
        isCurrent
          ? 'bg-rose-500/10 border border-rose-500/30 text-white'
          : 'hover:bg-slate-900/80 text-slate-300'
      }`}
    >
      {/* LEFT: Index / Play Icon + Cover + Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1" onClick={handleRowClick}>
        <div className="w-7 text-center shrink-0">
          {isCurrent && isPlaying ? (
            <div className="flex items-end justify-center gap-0.5 h-4">
              <span className="w-1 bg-rose-500 rounded-full h-full animate-bounce"></span>
              <span className="w-1 bg-rose-500 rounded-full h-2/3 animate-bounce delay-75"></span>
              <span className="w-1 bg-rose-500 rounded-full h-4/5 animate-bounce delay-150"></span>
            </div>
          ) : (
            <span className="text-xs font-mono text-slate-500 group-hover:hidden">
              {index + 1}
            </span>
          )}
          <button
            className={`hidden group-hover:flex items-center justify-center text-slate-200 hover:text-rose-400`}
            aria-label="Phát"
          >
            {isCurrent && isPlaying ? (
              <Pause className="w-4 h-4 fill-rose-500 text-rose-500" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </button>
        </div>

        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-11 h-11 rounded-lg object-cover shrink-0 shadow"
        />

        <div className="min-w-0 pr-2">
          <div className={`text-sm font-semibold truncate ${isCurrent ? 'text-rose-400' : 'text-slate-100'}`}>
            {song.title}
          </div>
          <div className="text-xs text-slate-400 truncate flex items-center gap-2">
            <span>{song.artist}</span>
            {song.album && <span className="hidden md:inline text-slate-500">• {song.album}</span>}
          </div>
        </div>
      </div>

      {/* MIDDLE: Genre & Plays */}
      <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400 shrink-0 px-4">
        <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50">
          {song.genre}
        </span>
        <span className="hidden md:inline font-mono">{formatPlays(song.plays)} {language === 'vi' ? 'lượt' : 'plays'}</span>
      </div>

      {/* RIGHT: Actions & Duration */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(song.id);
          }}
          className={`p-1.5 rounded-full hover:bg-slate-800 transition ${
            isFav ? 'text-rose-500' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={isFav ? 'Bỏ thích' : 'Yêu thích'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Add to playlist menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPlaylistMenu(!showPlaylistMenu);
            }}
            className="p-1.5 text-slate-500 hover:text-white rounded-full hover:bg-slate-800 transition"
            title="Thêm vào playlist"
          >
            <Plus className="w-4 h-4" />
          </button>

          {showPlaylistMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 bottom-full mb-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-40 text-xs animate-in fade-in"
            >
              <div className="px-2 py-1 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                {language === 'vi' ? 'Thêm vào danh sách' : 'Add to Playlist'}
              </div>
              <div className="max-h-36 overflow-y-auto space-y-0.5 mt-1">
                {playlists.map((pl) => {
                  const inPlaylist = pl.songIds.includes(song.id);
                  return (
                    <button
                      key={pl.id}
                      onClick={() => {
                        addSongToPlaylist(pl.id, song.id);
                        setShowPlaylistMenu(false);
                      }}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-800 text-left text-slate-300 hover:text-white transition"
                    >
                      <span className="truncate">{pl.title}</span>
                      {inPlaylist && <Check className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <span className="text-xs font-mono text-slate-400 w-12 text-right">
          {formatTime(song.duration)}
        </span>
      </div>
    </div>
  );
};
