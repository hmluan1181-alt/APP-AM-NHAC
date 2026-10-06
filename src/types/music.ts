export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  lyrics: LyricLine[];
  genre: string;
  plays: number;
  releaseYear?: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  songIds: string[];
  createdAt: string;
  isCustom?: boolean;
}

export type RepeatMode = 'off' | 'all' | 'one';

export type EqualizerPreset = 'flat' | 'bass-boost' | 'vocal' | 'electronic' | 'acoustic' | 'rock';

export type VisualizerMode = 'bars' | 'wave' | 'circle';

export type ViewTab = 'explore' | 'charts' | 'genres' | 'artists' | 'favorites' | 'playlists' | 'history' | 'playlist-detail';
