import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song, Playlist, RepeatMode, EqualizerPreset, ViewTab } from '../types/music';
import { INITIAL_SONGS, INITIAL_PLAYLISTS } from '../data/mockSongs';
import { audioEngine } from '../services/audioEngine';

interface MusicContextType {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeatMode: RepeatMode;
  isShuffle: boolean;
  playbackRate: number;
  equalizerPreset: EqualizerPreset;
  favorites: string[];
  history: string[];
  playlists: Playlist[];
  activePlaylistId: string | null;
  queue: Song[];
  queueIndex: number;
  isLyricsOpen: boolean;
  isEqualizerOpen: boolean;
  isSleepTimerOpen: boolean;
  sleepTimerRemaining: number | null;
  isFullPlayerOpen: boolean;
  language: 'vi' | 'en';
  searchQuery: string;
  currentTab: ViewTab;
  selectedPlaylistId: string | null;
  playSong: (song: Song, newQueue?: Song[]) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  nextSong: () => void;
  prevSong: () => void;
  toggleFavorite: (songId: string) => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  setEqualizerPreset: (preset: EqualizerPreset) => void;
  setPlaybackRate: (rate: number) => void;
  setSleepTimer: (minutes: number | null) => void;
  createPlaylist: (title: string, description: string) => string;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  setSearchQuery: (q: string) => void;
  setCurrentTab: (tab: ViewTab) => void;
  setSelectedPlaylistId: (id: string | null) => void;
  setIsLyricsOpen: (open: boolean) => void;
  setIsEqualizerOpen: (open: boolean) => void;
  setIsSleepTimerOpen: (open: boolean) => void;
  setIsFullPlayerOpen: (open: boolean) => void;
  setLanguage: (lang: 'vi' | 'en') => void;
  reorderQueue: (newQueue: Song[]) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [songs] = useState<Song[]>(INITIAL_SONGS);
  const [currentSong, setCurrentSong] = useState<Song | null>(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(INITIAL_SONGS[0].duration);
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('amnhac_vol');
    return saved ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [playbackRate, setPlaybackRateState] = useState<number>(1);
  const [equalizerPreset, setEqualizerPresetState] = useState<EqualizerPreset>('flat');

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('amnhac_favorites');
      return saved ? JSON.parse(saved) : ['song-1', 'song-2', 'song-3'];
    } catch {
      return ['song-1', 'song-2', 'song-3'];
    }
  });

  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('amnhac_history');
      return saved ? JSON.parse(saved) : ['song-1'];
    } catch {
      return ['song-1'];
    }
  });

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem('amnhac_playlists');
      return saved ? JSON.parse(saved) : INITIAL_PLAYLISTS;
    } catch {
      return INITIAL_PLAYLISTS;
    }
  });

  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const [queue, setQueue] = useState<Song[]>(INITIAL_SONGS);
  const [queueIndex, setQueueIndex] = useState<number>(0);

  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);
  const [isEqualizerOpen, setIsEqualizerOpen] = useState<boolean>(false);
  const [isSleepTimerOpen, setIsSleepTimerOpen] = useState<boolean>(false);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<ViewTab>('explore');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  const sleepIntervalRef = useRef<number | null>(null);

  // Sync favorites & playlists to localStorage
  useEffect(() => {
    localStorage.setItem('amnhac_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('amnhac_playlists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('amnhac_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('amnhac_vol', volume.toString());
    audioEngine.setVolume(volume);
  }, [volume]);

  // Handle audio element events
  useEffect(() => {
    const audio = audioEngine.getAudioElement();

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audioEngine.play();
      } else {
        nextSong();
      }
    };

    const handleError = () => {
      console.warn('Audio element error, maintaining state and fallback synth');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [repeatMode, queueIndex, queue, isShuffle]);

  // Sleep timer interval countdown
  useEffect(() => {
    if (sleepTimerRemaining === null) {
      if (sleepIntervalRef.current) clearInterval(sleepIntervalRef.current);
      return;
    }

    if (sleepTimerRemaining <= 0) {
      // Pause playback when timer hits 0
      audioEngine.pause();
      setIsPlaying(false);
      setSleepTimerRemaining(null);
      if (sleepIntervalRef.current) clearInterval(sleepIntervalRef.current);
      return;
    }

    sleepIntervalRef.current = window.setInterval(() => {
      setSleepTimerRemaining((prev) => {
        if (prev === null || prev <= 1) {
          audioEngine.pause();
          setIsPlaying(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (sleepIntervalRef.current) clearInterval(sleepIntervalRef.current);
    };
  }, [sleepTimerRemaining]);

  const playSong = async (song: Song, newQueue?: Song[]) => {
    const activeQueue = newQueue || queue;
    if (newQueue) {
      setQueue(newQueue);
    }
    const idx = activeQueue.findIndex((s) => s.id === song.id);
    setQueueIndex(idx >= 0 ? idx : 0);
    setCurrentSong(song);
    setDuration(song.duration);
    setCurrentTime(0);

    // Add to history
    setHistory((prev) => [song.id, ...prev.filter((id) => id !== song.id)].slice(0, 50));

    await audioEngine.loadTrack(song.audioUrl);
    await audioEngine.play();
    setIsPlaying(true);
  };

  const togglePlay = async () => {
    if (!currentSong && songs.length > 0) {
      playSong(songs[0]);
      return;
    }

    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      if (!audioEngine.getAudioElement().src && currentSong) {
        await audioEngine.loadTrack(currentSong.audioUrl);
      }
      await audioEngine.play();
      setIsPlaying(true);
    }
  };

  const seek = (time: number) => {
    audioEngine.seek(time);
    setCurrentTime(time);
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    audioEngine.setVolume(vol);
    if (vol > 0 && isMuted) {
      setIsMuted(false);
      audioEngine.setMuted(false);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioEngine.setMuted(nextMuted);
  };

  const nextSong = () => {
    if (queue.length === 0) return;
    let nextIdx: number;

    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
      if (nextIdx === queueIndex && queue.length > 1) {
        nextIdx = (nextIdx + 1) % queue.length;
      }
    } else {
      nextIdx = queueIndex + 1;
      if (nextIdx >= queue.length) {
        if (repeatMode === 'off') {
          setIsPlaying(false);
          audioEngine.pause();
          return;
        }
        nextIdx = 0; // Loop queue
      }
    }

    const nextTrack = queue[nextIdx];
    if (nextTrack) {
      setQueueIndex(nextIdx);
      playSong(nextTrack, queue);
    }
  };

  const prevSong = () => {
    if (queue.length === 0) return;
    // If song played more than 3 seconds, replay from start
    if (currentTime > 3) {
      seek(0);
      return;
    }

    let prevIdx = queueIndex - 1;
    if (prevIdx < 0) {
      prevIdx = queue.length - 1;
    }
    const prevTrack = queue[prevIdx];
    if (prevTrack) {
      setQueueIndex(prevIdx);
      playSong(prevTrack, queue);
    }
  };

  const toggleFavorite = (songId: string) => {
    setFavorites((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const cycleRepeatMode = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const setEqualizerPreset = (preset: EqualizerPreset) => {
    setEqualizerPresetState(preset);
    audioEngine.applyEqualizerPreset(preset);
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
    audioEngine.setPlaybackRate(rate);
  };

  const setSleepTimer = (minutes: number | null) => {
    if (minutes === null) {
      setSleepTimerRemaining(null);
    } else {
      setSleepTimerRemaining(minutes * 60);
    }
  };

  const createPlaylist = (title: string, description: string): string => {
    const newId = `pl-custom-${Date.now()}`;
    const newPlaylist: Playlist = {
      id: newId,
      title: title.trim() || 'Playlist Mới',
      description: description.trim() || 'Danh sách phát tự tạo',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      songIds: [],
      createdAt: new Date().toISOString().split('T')[0],
      isCustom: true,
    };
    setPlaylists((prev) => [newPlaylist, ...prev]);
    return newId;
  };

  const deletePlaylist = (id: string) => {
    setPlaylists((prev) => prev.filter((pl) => pl.id !== id));
    if (selectedPlaylistId === id) {
      setSelectedPlaylistId(null);
      setCurrentTab('playlists');
    }
  };

  const addSongToPlaylist = (playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId && !pl.songIds.includes(songId)) {
          return { ...pl, songIds: [...pl.songIds, songId] };
        }
        return pl;
      })
    );
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          return { ...pl, songIds: pl.songIds.filter((id) => id !== songId) };
        }
        return pl;
      })
    );
  };

  const reorderQueue = (newQueue: Song[]) => {
    setQueue(newQueue);
    if (currentSong) {
      const idx = newQueue.findIndex((s) => s.id === currentSong.id);
      setQueueIndex(idx >= 0 ? idx : 0);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        repeatMode,
        isShuffle,
        playbackRate,
        equalizerPreset,
        favorites,
        history,
        playlists,
        activePlaylistId,
        queue,
        queueIndex,
        isLyricsOpen,
        isEqualizerOpen,
        isSleepTimerOpen,
        sleepTimerRemaining,
        isFullPlayerOpen,
        language,
        searchQuery,
        currentTab,
        selectedPlaylistId,
        playSong,
        togglePlay,
        seek,
        setVolume,
        toggleMute,
        nextSong,
        prevSong,
        toggleFavorite,
        toggleShuffle,
        cycleRepeatMode,
        setEqualizerPreset,
        setPlaybackRate,
        setSleepTimer,
        createPlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        setSearchQuery,
        setCurrentTab,
        setSelectedPlaylistId,
        setIsLyricsOpen,
        setIsEqualizerOpen,
        setIsSleepTimerOpen,
        setIsFullPlayerOpen,
        setLanguage,
        reorderQueue,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
