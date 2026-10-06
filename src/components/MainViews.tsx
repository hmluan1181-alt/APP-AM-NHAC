import React, { useState } from 'react';
import {
  Play,
  Pause,
  Shuffle,
  Heart,
  TrendingUp,
  Clock,
  Sparkles,
  ListMusic,
  PlusCircle,
  Trash2,
  Share2,
  Disc3,
  Music,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { SongRow } from './SongRow';
import { SongCard } from './SongCard';
import { GENRES, ARTISTS } from '../data/mockSongs';
import { Song } from '../types/music';

// ----------------- EXPLORE VIEW -----------------
export const ExploreView: React.FC = () => {
  const { songs, playSong, currentSong, isPlaying, togglePlay, language, setCurrentTab, setSelectedPlaylistId } = useMusic();
  const featuredSong = songs[0]; // "Cắt Đôi Nỗi Sầu"
  const isFeaturedPlaying = currentSong?.id === featuredSong?.id && isPlaying;

  return (
    <div className="space-y-8 pb-12">
      {/* HERO BANNER */}
      {featuredSong && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-900/40 via-purple-900/30 to-slate-900 border border-slate-800/80 p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Ca khúc thịnh hành số 1' : '#1 Trending Track'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {featuredSong.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-medium">
              {featuredSong.artist} • <span className="text-rose-400 font-semibold">{featuredSong.genre}</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">
              {language === 'vi'
                ? 'Bản hit bùng nổ hàng triệu lượt nghe với giai điệu lôi cuốn, drop âm nhạc đỉnh cao và phong cách hiện đại.'
                : 'Mega hit with millions of streams, high-energy rhythm and modern dance production.'}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  if (currentSong?.id === featuredSong.id) togglePlay();
                  else playSong(featuredSong, songs);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-500/30 transition hover:scale-105 active:scale-95"
              >
                {isFeaturedPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>{language === 'vi' ? 'Tạm dừng' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                    <span>{language === 'vi' ? 'Phát ngay' : 'Play Now'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative w-48 h-48 sm:w-60 sm:h-60 shrink-0">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 relative">
              <img
                src={featuredSong.coverUrl}
                alt={featuredSong.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Spinning decorative vinyl */}
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-slate-950/80 border border-slate-700 flex items-center justify-center text-rose-500 shadow-lg">
              <Disc3 className="w-10 h-10 animate-spin-slow" />
            </div>
          </div>
        </div>
      )}

      {/* RECOMMENDED SONGS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{language === 'vi' ? 'Gợi ý bài hát nổi bật' : 'Recommended Songs'}</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {songs.slice(0, 5).map((song) => (
            <SongCard key={song.id} song={song} playlistContext={songs} />
          ))}
        </div>
      </div>

      {/* TOP TRACKS LIST */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-500" />
            <span>{language === 'vi' ? 'Bảng xếp hạng tuần này' : 'Top Weekly Hits'}</span>
          </h3>
          <button
            onClick={() => setCurrentTab('charts')}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition"
          >
            {language === 'vi' ? 'Xem tất cả' : 'View All'} →
          </button>
        </div>
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-2 divide-y divide-slate-850">
          {songs.slice(0, 6).map((song, idx) => (
            <SongRow key={song.id} song={song} index={idx} playlistContext={songs} />
          ))}
        </div>
      </div>

      {/* GENRES PREVIEW */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">
          {language === 'vi' ? 'Khám phá theo thể loại' : 'Explore by Genre'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {GENRES.map((g) => (
            <button
              key={g.id}
              onClick={() => setCurrentTab('genres')}
              className={`p-4 rounded-2xl bg-gradient-to-br ${g.color} text-white font-bold text-sm shadow-md hover:scale-105 transition flex flex-col items-center justify-center gap-2 text-center`}
            >
              <span className="text-2xl">{g.icon}</span>
              <span>{g.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ----------------- CHARTS VIEW -----------------
export const ChartsView: React.FC = () => {
  const { songs, playSong, language } = useMusic();
  const sorted = [...songs].sort((a, b) => b.plays - a.plays);

  return (
    <div className="space-y-6 pb-12">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {language === 'vi' ? 'Cập nhật hàng ngày' : 'Daily Updated'}
          </span>
          <h2 className="text-3xl font-black text-white mt-1">
            {language === 'vi' ? 'Bảng Xếp Hạng Âm Nhạc Việt Nam' : 'Vietnam Top Charts'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {language === 'vi' ? 'Các ca khúc được nghe nhiều nhất và thịnh hành nhất hiện nay' : 'Most played tracks right now'}
          </p>
        </div>
        <button
          onClick={() => playSong(sorted[0], sorted)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{language === 'vi' ? 'Phát tất cả' : 'Play All'}</span>
        </button>
      </div>

      <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-3 space-y-1">
        {sorted.map((song, idx) => (
          <div key={song.id} className="relative flex items-center">
            {/* Badges for top 3 */}
            <div className="w-10 text-center shrink-0">
              {idx === 0 && <span className="text-lg font-black text-amber-400">🥇</span>}
              {idx === 1 && <span className="text-lg font-black text-slate-300">🥈</span>}
              {idx === 2 && <span className="text-lg font-black text-amber-600">🥉</span>}
              {idx > 2 && <span className="text-sm font-bold text-slate-500">#{idx + 1}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <SongRow song={song} index={idx} playlistContext={sorted} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ----------------- GENRES VIEW -----------------
export const GenresView: React.FC = () => {
  const { songs, language } = useMusic();
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const filtered = selectedGenre === 'all'
    ? songs
    : songs.filter((s) => s.genre.toLowerCase().includes(selectedGenre.toLowerCase()));

  return (
    <div className="space-y-6 pb-12">
      <h2 className="text-2xl font-bold text-white">
        {language === 'vi' ? 'Thể Loại Âm Nhạc' : 'Music Genres'}
      </h2>

      {/* Genre Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedGenre('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 ${
            selectedGenre === 'all'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {language === 'vi' ? 'Tất cả' : 'All'}
        </button>
        {GENRES.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGenre(g.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              selectedGenre === g.id
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>{g.icon}</span>
            <span>{g.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-2 divide-y divide-slate-850">
        {filtered.length > 0 ? (
          filtered.map((song, idx) => (
            <SongRow key={song.id} song={song} index={idx} playlistContext={filtered} />
          ))
        ) : (
          <div className="p-8 text-center text-slate-500 text-sm">
            {language === 'vi' ? 'Không tìm thấy bài hát nào thuộc thể loại này.' : 'No songs found in this genre.'}
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------- ARTISTS VIEW -----------------
export const ArtistsView: React.FC = () => {
  const { songs, playSong, language } = useMusic();
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const artistSongs = selectedArtist
    ? songs.filter((s) => s.artist.toLowerCase().includes(selectedArtist.toLowerCase()))
    : [];

  return (
    <div className="space-y-6 pb-12">
      <h2 className="text-2xl font-bold text-white">
        {language === 'vi' ? 'Nghệ Sĩ Nổi Bật' : 'Featured Artists'}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {ARTISTS.map((art) => (
          <div
            key={art.name}
            onClick={() => setSelectedArtist(art.name)}
            className={`p-4 rounded-2xl border text-center cursor-pointer transition ${
              selectedArtist === art.name
                ? 'bg-rose-500/20 border-rose-500'
                : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
            }`}
          >
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-slate-700 mb-3">
              <img src={art.avatar} alt={art.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-white text-sm truncate">{art.name}</h4>
            <p className="text-xs text-rose-400 font-medium mt-0.5">{art.followers} {language === 'vi' ? 'theo dõi' : 'fans'}</p>
          </div>
        ))}
      </div>

      {selectedArtist && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              {language === 'vi' ? 'Bài hát của' : 'Songs by'} {selectedArtist} ({artistSongs.length})
            </h3>
            {artistSongs.length > 0 && (
              <button
                onClick={() => playSong(artistSongs[0], artistSongs)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 text-white text-xs font-bold shadow transition"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{language === 'vi' ? 'Phát tất cả' : 'Play All'}</span>
              </button>
            )}
          </div>
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-2 divide-y divide-slate-850">
            {artistSongs.map((song, idx) => (
              <SongRow key={song.id} song={song} index={idx} playlistContext={artistSongs} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------- FAVORITES VIEW -----------------
export const FavoritesView: React.FC = () => {
  const { songs, favorites, playSong, language } = useMusic();
  const favSongs = songs.filter((s) => favorites.includes(s.id));

  return (
    <div className="space-y-6 pb-12">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-600/30 via-pink-600/20 to-purple-600/30 border border-rose-500/30 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-xl shadow-rose-500/30 text-white shrink-0">
          <Heart className="w-16 h-16 fill-white" />
        </div>
        <div className="space-y-2 text-center sm:text-left flex-1">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            {language === 'vi' ? 'Bộ sưu tập của bạn' : 'Your Collection'}
          </span>
          <h2 className="text-3xl font-black text-white">
            {language === 'vi' ? 'Bài Hát Yêu Thích' : 'Liked Songs'}
          </h2>
          <p className="text-sm text-slate-300">
            {favSongs.length} {language === 'vi' ? 'bài hát đã lưu' : 'saved tracks'}
          </p>
          {favSongs.length > 0 && (
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
              <button
                onClick={() => playSong(favSongs[0], favSongs)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{language === 'vi' ? 'Phát ngẫu nhiên' : 'Play All'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-2 divide-y divide-slate-850">
        {favSongs.length > 0 ? (
          favSongs.map((song, idx) => (
            <SongRow key={song.id} song={song} index={idx} playlistContext={favSongs} />
          ))
        ) : (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Heart className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-sm">
              {language === 'vi'
                ? 'Bạn chưa có bài hát yêu thích nào. Hãy nhấn biểu tượng trái tim để lưu bài hát!'
                : 'No favorite songs yet. Click the heart icon to save songs you love!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------- PLAYLISTS VIEW -----------------
export const PlaylistsView: React.FC<{ onOpenCreate: () => void }> = ({ onOpenCreate }) => {
  const { playlists, setSelectedPlaylistId, setCurrentTab, language } = useMusic();

  const handleOpenDetail = (id: string) => {
    setSelectedPlaylistId(id);
    setCurrentTab('playlist-detail');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {language === 'vi' ? 'Danh Sách Phát Của Bạn' : 'Playlists'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'vi' ? 'Tất cả các danh sách phát tuyển chọn và tự tạo' : 'All curated and custom playlists'}
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-lg shadow-rose-500/20 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === 'vi' ? 'Tạo playlist' : 'New Playlist'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {playlists.map((pl) => (
          <div
            key={pl.id}
            onClick={() => handleOpenDetail(pl.id)}
            className="group p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer transition flex flex-col"
          >
            <div className="aspect-square w-full rounded-xl overflow-hidden mb-3 relative shadow">
              <img src={pl.coverUrl} alt={pl.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            </div>
            <h4 className="font-bold text-white text-sm truncate">{pl.title}</h4>
            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{pl.description}</p>
            <span className="text-[11px] text-rose-400 font-medium mt-2">
              {pl.songIds.length} {language === 'vi' ? 'bài hát' : 'tracks'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ----------------- PLAYLIST DETAIL VIEW -----------------
export const PlaylistDetailView: React.FC = () => {
  const {
    playlists,
    selectedPlaylistId,
    songs,
    playSong,
    deletePlaylist,
    removeSongFromPlaylist,
    setCurrentTab,
    language,
  } = useMusic();

  const playlist = playlists.find((p) => p.id === selectedPlaylistId);
  if (!playlist) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>{language === 'vi' ? 'Không tìm thấy playlist.' : 'Playlist not found.'}</p>
        <button
          onClick={() => setCurrentTab('playlists')}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
        >
          {language === 'vi' ? 'Quay lại' : 'Back'}
        </button>
      </div>
    );
  }

  const playlistSongs = songs.filter((s) => playlist.songIds.includes(s.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl shrink-0">
          <img src={playlist.coverUrl} alt={playlist.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            {language === 'vi' ? 'Danh sách phát' : 'Playlist'}
          </span>
          <h2 className="text-3xl font-black text-white">{playlist.title}</h2>
          <p className="text-xs sm:text-sm text-slate-400">{playlist.description}</p>
          <p className="text-xs text-slate-500">
            {playlistSongs.length} {language === 'vi' ? 'bài hát' : 'songs'} • {language === 'vi' ? 'Tạo ngày' : 'Created on'} {playlist.createdAt}
          </p>
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
            {playlistSongs.length > 0 && (
              <button
                onClick={() => playSong(playlistSongs[0], playlistSongs)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{language === 'vi' ? 'Phát tất cả' : 'Play All'}</span>
              </button>
            )}
            {playlist.isCustom && (
              <button
                onClick={() => deletePlaylist(playlist.id)}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                title={language === 'vi' ? 'Xóa playlist' : 'Delete Playlist'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-2 divide-y divide-slate-850">
        {playlistSongs.length > 0 ? (
          playlistSongs.map((song, idx) => (
            <div key={song.id} className="flex items-center justify-between group">
              <div className="flex-1">
                <SongRow song={song} index={idx} playlistContext={playlistSongs} />
              </div>
              {playlist.isCustom && (
                <button
                  onClick={() => removeSongFromPlaylist(playlist.id, song.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-400 transition pr-4"
                  title="Xóa khỏi playlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-500 text-sm">
            {language === 'vi' ? 'Playlist này chưa có bài hát nào. Nhấn biểu tượng + trên bài hát để thêm vào!' : 'No songs in this playlist yet.'}
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------- HISTORY VIEW -----------------
export const HistoryView: React.FC = () => {
  const { songs, history, playSong, language } = useMusic();
  const historySongs = history
    .map((id) => songs.find((s) => s.id === id))
    .filter((s): s is Song => s !== undefined);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-rose-500" />
            <span>{language === 'vi' ? 'Lịch Sử Nghe Nhạc' : 'Recently Played'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'vi' ? 'Các bài hát bạn đã thưởng thức gần đây' : 'Your recent listening history'}
          </p>
        </div>
        {historySongs.length > 0 && (
          <button
            onClick={() => playSong(historySongs[0], historySongs)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 text-white font-semibold text-xs shadow transition"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{language === 'vi' ? 'Phát lại tất cả' : 'Replay All'}</span>
          </button>
        )}
      </div>

      <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-2 divide-y divide-slate-850">
        {historySongs.length > 0 ? (
          historySongs.map((song, idx) => (
            <SongRow key={`${song.id}-${idx}`} song={song} index={idx} playlistContext={historySongs} />
          ))
        ) : (
          <div className="p-12 text-center text-slate-500 text-sm">
            {language === 'vi' ? 'Chưa có lịch sử bài hát nào.' : 'No listening history yet.'}
          </div>
        )}
      </div>
    </div>
  );
};
