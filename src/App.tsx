import React, { useState } from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PlayerBar } from './components/PlayerBar';
import { FullPlayerModal } from './components/FullPlayerModal';
import { EqualizerModal } from './components/EqualizerModal';
import { SleepTimerModal } from './components/SleepTimerModal';
import { CreatePlaylistModal } from './components/CreatePlaylistModal';
import {
  ExploreView,
  ChartsView,
  GenresView,
  ArtistsView,
  FavoritesView,
  PlaylistsView,
  PlaylistDetailView,
  HistoryView,
} from './components/MainViews';
import { SongRow } from './components/SongRow';
import { Compass, TrendingUp, ListMusic, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentTab, setCurrentTab, searchQuery, songs, language } = useMusic();
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);

  // Search filter
  const searchResults = searchQuery.trim()
    ? songs.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.album && s.album.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : null;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Top Main Section: Sidebar + Main Scrollable Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar openCreatePlaylistModal={() => setIsCreatePlaylistOpen(true)} />
        </div>

        {/* Center Main Stage */}
        <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <Header />

          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            {/* If searching, show search results */}
            {searchResults !== null ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">
                  {language === 'vi' ? 'Kết quả tìm kiếm cho:' : 'Search results for:'}{' '}
                  <span className="text-rose-400">"{searchQuery}"</span>
                </h2>
                {searchResults.length > 0 ? (
                  <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-2 divide-y divide-slate-850">
                    {searchResults.map((song, idx) => (
                      <SongRow key={song.id} song={song} index={idx} playlistContext={searchResults} />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-500 text-sm">
                    {language === 'vi'
                      ? 'Không tìm thấy bài hát nào phù hợp.'
                      : 'No matching songs found.'}
                  </div>
                )}
              </div>
            ) : (
              /* Normal View Tabs */
              <>
                {currentTab === 'explore' && <ExploreView />}
                {currentTab === 'charts' && <ChartsView />}
                {currentTab === 'genres' && <GenresView />}
                {currentTab === 'artists' && <ArtistsView />}
                {currentTab === 'favorites' && <FavoritesView />}
                {currentTab === 'playlists' && (
                  <PlaylistsView onOpenCreate={() => setIsCreatePlaylistOpen(true)} />
                )}
                {currentTab === 'playlist-detail' && <PlaylistDetailView />}
                {currentTab === 'history' && <HistoryView />}
              </>
            )}
          </main>

          {/* Mobile Bottom Navigation Bar */}
          <div className="md:hidden flex items-center justify-around bg-slate-950/95 border-t border-slate-850 py-2.5 px-2 z-20">
            <button
              onClick={() => setCurrentTab('explore')}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
                currentTab === 'explore' ? 'text-rose-500' : 'text-slate-400'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>{language === 'vi' ? 'Khám phá' : 'Explore'}</span>
            </button>
            <button
              onClick={() => setCurrentTab('charts')}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
                currentTab === 'charts' ? 'text-rose-500' : 'text-slate-400'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>{language === 'vi' ? 'BXH' : 'Charts'}</span>
            </button>
            <button
              onClick={() => setCurrentTab('playlists')}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
                currentTab === 'playlists' ? 'text-rose-500' : 'text-slate-400'
              }`}
            >
              <ListMusic className="w-5 h-5" />
              <span>{language === 'vi' ? 'Playlist' : 'Playlists'}</span>
            </button>
            <button
              onClick={() => setCurrentTab('favorites')}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium ${
                currentTab === 'favorites' ? 'text-rose-500' : 'text-slate-400'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>{language === 'vi' ? 'Yêu thích' : 'Favorites'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Player Bar */}
      <PlayerBar />

      {/* Global Modals */}
      <FullPlayerModal />
      <EqualizerModal />
      <SleepTimerModal />
      <CreatePlaylistModal
        isOpen={isCreatePlaylistOpen}
        onClose={() => setIsCreatePlaylistOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}
