import React from 'react';
import {
  Compass,
  TrendingUp,
  Grid,
  Users,
  Heart,
  ListMusic,
  History,
  PlusCircle,
  Radio,
  Music2,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { ViewTab } from '../types/music';

interface SidebarProps {
  openCreatePlaylistModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ openCreatePlaylistModal }) => {
  const {
    currentTab,
    setCurrentTab,
    playlists,
    setSelectedPlaylistId,
    language,
    favorites,
  } = useMusic();

  const navItems: { id: ViewTab; labelVi: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'explore', labelVi: 'Khám phá', labelEn: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { id: 'charts', labelVi: 'Bảng xếp hạng', labelEn: 'Top Charts', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'genres', labelVi: 'Thể loại', labelEn: 'Genres', icon: <Grid className="w-5 h-5" /> },
    { id: 'artists', labelVi: 'Nghệ sĩ', labelEn: 'Artists', icon: <Users className="w-5 h-5" /> },
  ];

  const libraryItems: { id: ViewTab; labelVi: string; labelEn: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'favorites',
      labelVi: 'Bài hát yêu thích',
      labelEn: 'Liked Songs',
      icon: <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />,
      badge: favorites.length,
    },
    { id: 'playlists', labelVi: 'Danh sách phát', labelEn: 'Playlists', icon: <ListMusic className="w-5 h-5" /> },
    { id: 'history', labelVi: 'Lịch sử nghe', labelEn: 'History', icon: <History className="w-5 h-5" /> },
  ];

  const handleSelectPlaylist = (id: string) => {
    setSelectedPlaylistId(id);
    setCurrentTab('playlist-detail');
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-850 flex flex-col h-full select-none shrink-0">
      {/* Brand Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-900">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white">
          <Music2 className="w-5 h-5 animate-pulse-slow" />
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            App Âm Nhạc
          </h1>
          <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Online & Hi-Fi Audio
          </p>
        </div>
      </div>

      {/* Main Nav Links */}
      <div className="px-3 py-4 flex-1 overflow-y-auto space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {language === 'vi' ? 'Menu chính' : 'Main Menu'}
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setSelectedPlaylistId(null);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/10 text-rose-400 font-semibold border-l-2 border-rose-500'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  {item.icon}
                  <span>{language === 'vi' ? item.labelVi : item.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* My Library */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>{language === 'vi' ? 'Thư viện' : 'My Library'}</span>
          </div>
          <div className="space-y-1">
            {libraryItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setSelectedPlaylistId(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/10 text-rose-400 font-semibold border-l-2 border-rose-500'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{language === 'vi' ? item.labelVi : item.labelEn}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Playlists Quick List */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {language === 'vi' ? 'Danh sách phát' : 'Playlists'}
            </span>
            <button
              onClick={openCreatePlaylistModal}
              className="text-slate-400 hover:text-rose-400 transition"
              title={language === 'vi' ? 'Tạo playlist mới' : 'New Playlist'}
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {playlists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => handleSelectPlaylist(pl.id)}
                className="w-full text-left px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-900/50 rounded-lg truncate transition flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-rose-500/70 shrink-0"></div>
                <span className="truncate">{pl.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
